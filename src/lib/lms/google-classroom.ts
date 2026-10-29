/**
 * EduPlan NG - Google Classroom LMS Integration & Export Engine
 * Facilitates seamless export of lesson notes, homework assignments, and schemes of work
 * into Google Classroom and Google Workspace for Education.
 */

export interface GoogleClassroomCourseworkPayload {
  title: string;
  description: string;
  materials?: Array<{
    link?: { url: string; title: string };
    youtubeVideo?: { id: string; title: string };
    driveFile?: { driveFile: { id: string; title: string }; shareMode: string };
  }>;
  state: 'PUBLISHED' | 'DRAFT';
  maxPoints: number;
  workType: 'ASSIGNMENT' | 'SHORT_ANSWER_QUESTION' | 'MULTIPLE_CHOICE_QUESTION';
  submissionModificationMode: 'MODIFIABLE_UNTIL_TURNED_IN';
  dueDate?: {
    year: number;
    month: number;
    day: number;
  };
  dueTime?: {
    hours: number;
    minutes: number;
  };
  scheduledTime?: string;
  topicId?: string;
  metadata?: {
    standard: string;
    level: string;
    subject: string;
    term: string;
    waecAlignment?: string;
    chalkboardSummary?: string;
  };
}

/**
 * Generates an official Google Classroom Share deep-link URL
 * Opens the native Google Classroom Class selector modal
 */
export function getGoogleClassroomShareUrl(options: {
  url: string;
  title: string;
  body?: string;
}): string {
  const baseUrl = 'https://classroom.google.com/share';
  const params = new URLSearchParams({
    url: options.url,
    title: options.title,
  });
  if (options.body) {
    params.set('body', options.body.slice(0, 500));
  }
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Transforms a Nigerian NERDC Lesson Plan into a Google Classroom Assignment Coursework JSON object
 */
export function buildClassroomPayloadFromLessonPlan(plan: {
  title: string;
  level: string;
  subject: string;
  term?: number | string;
  week?: number | string;
  objectives?: string[];
  materials?: string[];
  evaluation?: string;
  assignment?: string;
  studentActivity?: string;
  bloomTags?: string[];
}): GoogleClassroomCourseworkPayload {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const objectivesList = (plan.objectives || [])
    .map((obj, i) => `  ${i + 1}. ${obj}`)
    .join('\n');

  const instructions = [
    `📚 SUBJECT: ${plan.subject} (${String(plan.level).toUpperCase()})`,
    `🗓️ TERM & WEEK: Term ${plan.term || 1}, Week ${plan.week || 1}`,
    `🎯 NERDC LEARNING OBJECTIVES:\n${objectivesList || '  - Master the statutory weekly competencies.'}`,
    `\n📝 STUDENT INSTRUCTION:\n${plan.studentActivity || 'Read classroom notes, participate in guided practice, and complete evaluation drills.'}`,
    `\n✏️ HOMEWORK ASSIGNMENT:\n${plan.assignment || 'Complete the exercises assigned in the NERDC approved textbook.'}`,
    `\n🔍 FORMATIVE EVALUATION:\n${plan.evaluation || 'Answer the chalkboard assessment questions in your standard exercise book.'}`,
    `\n🇳🇬 Curriculum standard: Nigerian Educational Research and Development Council (NERDC) & Lagos State OEQA.`,
  ].join('\n');

  return {
    title: `${plan.subject} (${String(plan.level).toUpperCase()} Wk ${plan.week || 1}): ${plan.title}`,
    description: instructions,
    state: 'PUBLISHED',
    maxPoints: 100,
    workType: 'ASSIGNMENT',
    submissionModificationMode: 'MODIFIABLE_UNTIL_TURNED_IN',
    dueDate: {
      year: nextWeek.getFullYear(),
      month: nextWeek.getMonth() + 1,
      day: nextWeek.getDate(),
    },
    dueTime: {
      hours: 17,
      minutes: 0,
    },
    materials: [
      {
        link: {
          url: typeof window !== 'undefined' ? window.location.origin + '/quiz/sample-quiz-01' : 'https://eduplan.ng',
          title: 'EduPlan NG CBT Practice Quiz & Chalkboard Companion',
        },
      },
    ],
    metadata: {
      standard: 'NERDC National Curriculum',
      level: String(plan.level),
      subject: plan.subject,
      term: String(plan.term || 1),
    },
  };
}

/**
 * Downloads the coursework payload as a JSON file for Google Classroom API / LMS import
 */
export function downloadGoogleClassroomCourseworkJson(
  payload: GoogleClassroomCourseworkPayload,
  fileName: string = 'google-classroom-coursework.json'
): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Exports assignments to a standard CSV for batch import into Google Classroom or compatible LMS
 */
export function downloadGoogleClassroomCsv(
  items: Array<{
    title: string;
    instructions: string;
    maxPoints: number;
    subject: string;
    level: string;
    dueDate?: string;
  }>,
  fileName: string = 'google-classroom-assignments.csv'
): void {
  const headers = ['Title', 'Instructions', 'Max Points', 'Subject', 'Class Level', 'Due Date'];
  const rows = items.map((item) => [
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.instructions.replace(/"/g, '""')}"`,
    item.maxPoints,
    `"${item.subject}"`,
    `"${item.level}"`,
    `"${item.dueDate || 'Next Week'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
}
