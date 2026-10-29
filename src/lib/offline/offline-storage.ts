/**
 * EduPlan NG - Offline Storage & Sync Engine
 * Built for Nigerian classroom environments with intermittent electricity (NEPA) and low network connectivity.
 * 
 * Features:
 * - Persistent caching for Lesson Plans and Statutory Schemes of Work
 * - Offline queue for newly created/edited lesson notes
 * - Offline queue for Student CBT Quiz submissions
 * - Automatic background drain and sync when network connectivity is restored
 */

export interface OfflineDraftPlan {
  id: string;
  tempId?: boolean;
  title: string;
  level: string;
  subject: string;
  term: number;
  week: number;
  duration?: string;
  topic?: string;
  objectives: string[];
  materials: string[];
  previousKnowledge?: string;
  introduction?: string;
  teacherActivity?: string;
  studentActivity?: string;
  evaluation?: string;
  assignment?: string;
  references?: string;
  bloomTags?: string[];
  status: 'draft' | 'completed' | 'pending_sync';
  savedOfflineAt: string;
  syncError?: string;
}

export interface OfflineQuizSubmission {
  id: string;
  quizId: string;
  studentName: string;
  parentPhone: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  selectedAnswers: Record<number, number>;
  submittedAt: string;
  synced: boolean;
}

const STORAGE_KEYS = {
  OFFLINE_DRAFTS: 'eduplan_offline_draft_plans',
  CACHED_PLANS: 'eduplan_cached_plans_store',
  CACHED_SCHEMES: 'eduplan_cached_schemes_store',
  OFFLINE_QUIZ_QUEUE: 'eduplan_offline_quiz_submissions',
  LAST_SYNC_TIME: 'eduplan_last_offline_sync_ts',
};

// Safe JSON parse from LocalStorage
function safeGetItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.warn(`[OfflineStorage] Failed to read ${key}:`, e);
    return defaultValue;
  }
}

function safeSetItem(key: string, value: any): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[OfflineStorage] Failed to write ${key}:`, e);
  }
}

export const offlineStorage = {
  /**
   * Check if client is currently online
   */
  isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  },

  /**
   * Save a draft lesson plan locally while offline
   */
  saveDraftPlan(plan: Partial<OfflineDraftPlan> & { title: string }): OfflineDraftPlan {
    const drafts = safeGetItem<OfflineDraftPlan[]>(STORAGE_KEYS.OFFLINE_DRAFTS, []);
    const planId = plan.id || `offline_lp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    const draftItem: OfflineDraftPlan = {
      id: planId,
      tempId: !plan.id || plan.id.startsWith('offline_'),
      title: plan.title || 'Untitled Offline Lesson Plan',
      level: plan.level || 'jss-1',
      subject: plan.subject || 'Mathematics',
      term: plan.term || 1,
      week: plan.week || 1,
      duration: plan.duration || '40 Minutes',
      topic: plan.topic || plan.title,
      objectives: plan.objectives || [],
      materials: plan.materials || [],
      previousKnowledge: plan.previousKnowledge || '',
      introduction: plan.introduction || '',
      teacherActivity: plan.teacherActivity || '',
      studentActivity: plan.studentActivity || '',
      evaluation: plan.evaluation || '',
      assignment: plan.assignment || '',
      references: plan.references || 'NERDC Approved Curriculum Standard',
      bloomTags: plan.bloomTags || ['Understanding', 'Application'],
      status: 'pending_sync',
      savedOfflineAt: new Date().toISOString(),
    };

    const existingIdx = drafts.findIndex((d) => d.id === planId);
    if (existingIdx >= 0) {
      drafts[existingIdx] = draftItem;
    } else {
      drafts.unshift(draftItem);
    }

    safeSetItem(STORAGE_KEYS.OFFLINE_DRAFTS, drafts);
    return draftItem;
  },

  /**
   * Get all pending draft lesson plans saved offline
   */
  getOfflineDraftPlans(): OfflineDraftPlan[] {
    return safeGetItem<OfflineDraftPlan[]>(STORAGE_KEYS.OFFLINE_DRAFTS, []);
  },

  /**
   * Remove a draft plan after successful server sync
   */
  removeOfflineDraftPlan(planId: string): void {
    const drafts = safeGetItem<OfflineDraftPlan[]>(STORAGE_KEYS.OFFLINE_DRAFTS, []);
    const filtered = drafts.filter((d) => d.id !== planId);
    safeSetItem(STORAGE_KEYS.OFFLINE_DRAFTS, filtered);
  },

  /**
   * Cache fetched online lesson plans for offline reading
   */
  cacheLessonPlans(plans: any[]): void {
    safeSetItem(STORAGE_KEYS.CACHED_PLANS, plans.slice(0, 50));
  },

  /**
   * Retrieve cached lesson plans when offline
   */
  getCachedLessonPlans(): any[] {
    return safeGetItem<any[]>(STORAGE_KEYS.CACHED_PLANS, []);
  },

  /**
   * Queue a student CBT quiz submission offline
   */
  queueQuizSubmission(submission: Omit<OfflineQuizSubmission, 'id' | 'synced' | 'submittedAt'>): OfflineQuizSubmission {
    const queue = safeGetItem<OfflineQuizSubmission[]>(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, []);
    const item: OfflineQuizSubmission = {
      ...submission,
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      synced: false,
    };
    queue.push(item);
    safeSetItem(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, queue);
    return item;
  },

  /**
   * Get pending offline quiz submissions
   */
  getPendingQuizSubmissions(): OfflineQuizSubmission[] {
    const queue = safeGetItem<OfflineQuizSubmission[]>(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, []);
    return queue.filter((q) => !q.synced);
  },

  /**
   * Total count of pending items awaiting sync
   */
  getPendingCount(): number {
    const drafts = safeGetItem<OfflineDraftPlan[]>(STORAGE_KEYS.OFFLINE_DRAFTS, []).filter(
      (d) => d.status === 'pending_sync'
    );
    const quizzes = safeGetItem<OfflineQuizSubmission[]>(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, []).filter(
      (q) => !q.synced
    );
    return drafts.length + quizzes.length;
  },

  /**
   * Drain and synchronize all pending drafts and quizzes to the server
   */
  async syncAllPending(): Promise<{ syncedPlans: number; syncedQuizzes: number; errors: string[] }> {
    if (!this.isOnline()) {
      return { syncedPlans: 0, syncedQuizzes: 0, errors: ['Device is currently offline.'] };
    }

    let syncedPlans = 0;
    let syncedQuizzes = 0;
    const errors: string[] = [];

    // 1. Sync Draft Lesson Plans
    const drafts = safeGetItem<OfflineDraftPlan[]>(STORAGE_KEYS.OFFLINE_DRAFTS, []);
    for (const draft of drafts) {
      if (draft.status !== 'pending_sync') continue;
      try {
        const payload = {
          id: draft.id,
          title: draft.title,
          level: draft.level,
          subject: draft.subject,
          term: draft.term,
          week: draft.week,
          duration: draft.duration,
          previousKnowledge: draft.previousKnowledge,
          introduction: draft.introduction,
          teacherActivity: draft.teacherActivity,
          studentActivity: draft.studentActivity,
          evaluation: draft.evaluation,
          assignment: draft.assignment,
          references: draft.references,
          objectives: draft.objectives,
          materials: draft.materials,
          differentiatedInstruction: (draft as any).differentiatedInstruction,
          remedialTask: (draft as any).remedialTask || null,
          standardTask: (draft as any).standardTask || null,
          advancedTask: (draft as any).advancedTask || null,
          bloomTags: draft.bloomTags,
          status: 'draft',
        };

        const res = await fetch('/api/lesson-plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          syncedPlans++;
          this.removeOfflineDraftPlan(draft.id);
        } else {
          errors.push(`Failed to sync plan "${draft.title}"`);
        }
      } catch (err) {
        errors.push(`Network error syncing plan "${draft.title}"`);
      }
    }

    // 2. Sync Offline Quiz Submissions
    const quizzes = safeGetItem<OfflineQuizSubmission[]>(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, []);
    const remainingQuizzes: OfflineQuizSubmission[] = [];

    for (const q of quizzes) {
      if (q.synced) continue;
      try {
        const res = await fetch('/api/quizzes/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(q),
        });

        if (res.ok) {
          syncedQuizzes++;
        } else {
          remainingQuizzes.push(q);
          errors.push(`Failed to sync quiz submission for ${q.studentName}`);
        }
      } catch (err) {
        remainingQuizzes.push(q);
        errors.push(`Network error syncing quiz for ${q.studentName}`);
      }
    }

    safeSetItem(STORAGE_KEYS.OFFLINE_QUIZ_QUEUE, remainingQuizzes);
    safeSetItem(STORAGE_KEYS.LAST_SYNC_TIME, new Date().toISOString());

    return { syncedPlans, syncedQuizzes, errors };
  },

  getLastSyncTime(): string | null {
    return safeGetItem<string | null>(STORAGE_KEYS.LAST_SYNC_TIME, null);
  },
};
