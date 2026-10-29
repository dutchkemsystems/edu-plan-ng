import {
  CurriculumLevel,
  CurriculumSubject,
  CurriculumTopic,
  LessonPlan,
  ResourceItem,
  TeacherUser,
  NotificationItem,
  SchemeOfWork,
  AssessmentItem,
  GradeRecord,
  DashboardStats
} from '../types/index.ts';

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem('eduplan_token');
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null) {
  try {
    if (token) localStorage.setItem('eduplan_token', token);
    else localStorage.removeItem('eduplan_token');
  } catch {}
}

export function isUserLoggedOut(): boolean {
  try {
    return localStorage.getItem('eduplan_logged_out') === 'true';
  } catch {
    return false;
  }
}

export function setLoggedOutFlag(loggedOut: boolean) {
  try {
    if (loggedOut) localStorage.setItem('eduplan_logged_out', 'true');
    else localStorage.removeItem('eduplan_logged_out');
  } catch {}
}

export async function fetchCurrentUser(): Promise<TeacherUser> {
  const token = getAuthToken();
  const loggedOut = isUserLoggedOut();
  if (loggedOut) {
    throw new Error('User is logged out');
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // If no token stored at all and user hasn't explicitly logged out, provide default demo teacher on initial preview
    headers['Authorization'] = `Bearer auth_tok_usr_teacher_demo_01`;
  }
  const res = await fetch(`${API_BASE}/auth/me`, { headers });
  if (!res.ok) {
    setAuthToken(null);
    throw new Error('Could not fetch user');
  }
  return res.json();
}

export async function signInUser(email: string, password?: string): Promise<{ success: boolean; user: TeacherUser; token?: string }> {
  setLoggedOutFlag(false);
  if (typeof document !== 'undefined') {
    document.cookie = 'eduplan_logged_out=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax';
  }

  const res = await fetch(`${API_BASE}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password: password || 'default_pass' }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || 'Authentication failed');
  }

  const data = await res.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  if (data.user && typeof localStorage !== 'undefined') {
    localStorage.setItem('eduplan_auth_user', JSON.stringify(data.user));
  }

  // Dispatch auth state event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('eduplan_auth_state_changed', { detail: data.user }));
  }

  return data;
}

export async function signOutUser(hardRedirect: boolean = false, redirectUrl: string = '/'): Promise<{ success: boolean }> {
  setLoggedOutFlag(true);

  // 1. Server-side session invalidation
  try {
    const token = getAuthToken();
    await fetch(`${API_BASE}/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: 'include'
    });
  } catch (e) {
    console.warn('[Auth] Server sign out non-blocking warning:', e);
  }

  // 2. Cookie cleanup
  if (typeof document !== 'undefined') {
    const cookieNames = ['eduplan_session', 'better-auth.session_token', 'auth_token', 'session'];
    cookieNames.forEach((name) => {
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax`;
    });
    document.cookie = 'eduplan_logged_out=true; Path=/; Max-Age=31536000; SameSite=Lax';
  }

  // 3. Clear client-side state
  setAuthToken(null);
  if (typeof localStorage !== 'undefined') {
    try {
      const region = localStorage.getItem('eduplan_region');
      localStorage.clear();
      if (region) localStorage.setItem('eduplan_region', region);
      localStorage.setItem('eduplan_logged_out', 'true');
    } catch {}
  }
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.clear();
    } catch {}
  }

  // 4. Invalidate caches
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const keys = await window.caches.keys();
      await Promise.all(keys.map((k) => window.caches.delete(k)));
    } catch {}
  }

  // 5. Hard redirect if requested to ensure complete wipe of React memory
  if (hardRedirect && typeof window !== 'undefined') {
    window.location.href = redirectUrl;
  }

  return { success: true };
}

export async function signUpUser(data: {
  email: string;
  password?: string;
  name: string;
  schoolName: string;
  state?: string;
  lga?: string;
}): Promise<{ success: boolean; user: TeacherUser }> {
  setLoggedOutFlag(false);
  const res = await fetch(`${API_BASE}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }
  const result = await res.json();
  if (result.token) {
    setAuthToken(result.token);
  }
  return result;
}

export async function updateProfile(data: Partial<TeacherUser>): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function completeOnboarding(data: {
  userId?: string;
  levels: string[];
  subjects: string[];
  schoolName: string;
}) {
  const res = await fetch(`${API_BASE}/auth/onboarding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchCurriculumLevels(): Promise<CurriculumLevel[]> {
  const res = await fetch(`${API_BASE}/curriculum/levels`);
  if (!res.ok) throw new Error('Failed to load levels');
  return res.json();
}

export async function fetchLevelDetail(levelId: string): Promise<{ level: CurriculumLevel; subjects: CurriculumSubject[] }> {
  const res = await fetch(`${API_BASE}/curriculum/levels/${levelId}`);
  if (!res.ok) throw new Error('Failed to load level detail');
  return res.json();
}

export async function fetchSubjectDetail(levelId: string, subjectId: string): Promise<{
  subject: CurriculumSubject;
  terms: { term: number; name: string; weeks: CurriculumTopic[] }[];
}> {
  const res = await fetch(`${API_BASE}/curriculum/levels/${levelId}/subjects/${subjectId}`);
  if (!res.ok) throw new Error('Failed to load subject detail');
  return res.json();
}

export async function fetchLessonPlans(): Promise<LessonPlan[]> {
  const res = await fetch(`${API_BASE}/lesson-plans`);
  if (!res.ok) throw new Error('Failed to load lesson plans');
  return res.json();
}

export async function fetchLessonPlan(id: string): Promise<LessonPlan> {
  const res = await fetch(`${API_BASE}/lesson-plans/${id}`);
  if (!res.ok) throw new Error('Failed to load lesson plan');
  return res.json();
}

export async function createLessonPlan(data: Partial<LessonPlan>): Promise<{ success: boolean; lessonPlan: LessonPlan }> {
  const res = await fetch(`${API_BASE}/lesson-plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create lesson plan');
  return res.json();
}

export async function updateLessonPlan(id: string, data: Partial<LessonPlan>): Promise<{ success: boolean; message: string; updatedAt: string }> {
  const res = await fetch(`${API_BASE}/lesson-plans/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update lesson plan');
  return res.json();
}

export async function deleteLessonPlan(id: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/lesson-plans/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function duplicateLessonPlan(id: string): Promise<{ success: boolean; lessonPlan: LessonPlan }> {
  const res = await fetch(`${API_BASE}/lesson-plans/${id}/duplicate`, { method: 'POST' });
  return res.json();
}

export async function requestAIAssist(payload: {
  topic: string;
  level: string;
  subject: string;
  prompt: string;
  actionType: 'bloom' | 'differentiate' | 'generate' | 'local_examples' | 'translate';
  language?: string;
}): Promise<{ success: boolean; content: string; provider: string }> {
  const res = await fetch(`${API_BASE}/lesson-plans/ai-assist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function autoGeneratePlanAndNote(payload: {
  level: string;
  subject: string;
  topic?: string;
  week?: number;
  term?: number;
  language?: string;
}): Promise<{ success: boolean; data: any; provider: string }> {
  const res = await fetch(`${API_BASE}/lesson-plans/auto-generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to auto-generate statutory content');
  return res.json();
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/dashboard/stats`);
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function fetchNotifications(): Promise<{ notifications: NotificationItem[]; unreadCount: number }> {
  const res = await fetch(`${API_BASE}/notifications`);
  return res.json();
}

export async function markNotificationRead(id: string) {
  return fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PATCH' });
}

export async function markAllNotificationsRead() {
  return fetch(`${API_BASE}/notifications/mark-all-read`, { method: 'POST' });
}

export async function deleteNotification(id: string) {
  return fetch(`${API_BASE}/notifications/${id}`, { method: 'DELETE' });
}

export async function fetchResources(params?: { level?: string; subject?: string; type?: string; search?: string }): Promise<ResourceItem[]> {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_BASE}/resources?${query}`);
  return res.json();
}

export async function createResource(data: Partial<ResourceItem>): Promise<{ success: boolean; resource: ResourceItem }> {
  const res = await fetch(`${API_BASE}/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteResource(id: string) {
  return fetch(`${API_BASE}/resources/${id}`, { method: 'DELETE' });
}

export async function initializeKoraPayment(data: {
  plan?: string;
  planId?: string;
  email: string;
  name: string;
  amount?: number;
  interval?: 'monthly' | 'annual';
  userId?: string;
  redirectUrl?: string;
}) {
  const payload = {
    ...data,
    planId: data.planId || data.plan,
    plan: data.plan || data.planId,
  };
  const res = await fetch(`${API_BASE}/payments/initialize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchSchemes(): Promise<SchemeOfWork[]> {
  const res = await fetch(`${API_BASE}/schemes`);
  return res.json();
}

export async function generateScheme(data: { level: string; subject: string; term: number; academicYear?: string }) {
  const res = await fetch(`${API_BASE}/schemes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchAssessments(): Promise<AssessmentItem[]> {
  const res = await fetch(`${API_BASE}/assessments`);
  return res.json();
}

export async function generateAssessment(data: {
  level: string;
  subject: string;
  term: number;
  week: number;
  topic: string;
  assessmentType: 'ca_test' | 'mid_term' | 'final_exam';
  schoolHeader?: string;
}) {
  const res = await fetch(`${API_BASE}/assessments/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchGrades(): Promise<GradeRecord[]> {
  const res = await fetch(`${API_BASE}/grades`);
  return res.json();
}

export async function createGrade(data: Partial<GradeRecord>) {
  const res = await fetch(`${API_BASE}/grades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function searchGlobal(q: string) {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
  return res.json();
}

export async function requestTeacherCoach(data: {
  topic: string;
  subject?: string;
  level?: string;
  queryType: 'deep_dive' | 'large_class' | 'nigerian_analogy' | 'waec_secrets' | 'bilingual_bridge' | 'general';
  prompt?: string;
  language?: string;
}): Promise<{ success: boolean; content: string; provider: string }> {
  const res = await fetch(`${API_BASE}/ai/teacher-coach`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function generateDedicatedLessonPlan(data: {
  level: string;
  subject: string;
  topic: string;
  subtopics?: string[];
  week: number;
  term: number;
  durationMinutes?: number;
  language?: string;
}) {
  const res = await fetch(`${API_BASE}/ai/lesson-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function generateDedicatedLessonNote(data: {
  level: string;
  subject: string;
  topic: string;
  week: number;
  term: number;
}) {
  const res = await fetch(`${API_BASE}/ai/lesson-note`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function triggerCurriculumSync() {
  const res = await fetch(`${API_BASE}/cron/curriculum-sync`, {
    method: 'POST',
  });
  return res.json();
}
