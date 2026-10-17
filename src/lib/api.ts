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

export async function fetchCurrentUser(): Promise<TeacherUser> {
  const res = await fetch(`${API_BASE}/auth/me`);
  if (!res.ok) throw new Error('Could not fetch user');
  return res.json();
}

export async function signInUser(email: string, password?: string): Promise<{ success: boolean; user: TeacherUser }> {
  const res = await fetch(`${API_BASE}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: password || 'default_pass' }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Authentication failed');
  }
  return res.json();
}

export async function signUpUser(data: {
  email: string;
  password?: string;
  name: string;
  schoolName: string;
  state?: string;
  lga?: string;
}): Promise<{ success: boolean; user: TeacherUser }> {
  const res = await fetch(`${API_BASE}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }
  return res.json();
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
  plan: string;
  email: string;
  name: string;
  amount?: number;
  interval?: 'monthly' | 'annual';
}) {
  const res = await fetch(`${API_BASE}/payment/initialize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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
