export type AppLanguage = 'en' | 'yo' | 'ig' | 'ha';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  dashboard: string;
  curriculum: string;
  lessonPlans: string;
  schemeOfWork: string;
  assessments: string;
  gradeBook: string;
  resources: string;
  progress: string;
  calendar: string;
  parentComms: string;
  communityLibrary: string;
  timetable: string;
  settings: string;
  pricing: string;
  admin: string;
  createPlan: string;
  generateScheme: string;
  newAssessment: string;
  saveDraft: string;
  publish: string;
  exportPdf: string;
  exportWord: string;
  shareWhatsApp: string;
  bloomTaxonomy: string;
  differentiatedInstruction: string;
  strugglingLearners: string;
  onLevelLearners: string;
  advancedLearners: string;
  objectives: string;
  materials: string;
  teacherActivity: string;
  studentActivity: string;
  evaluation: string;
  assignment: string;
  dayStreak: string;
  termCoverage: string;
  nextLesson: string;
  activePlan: string;
  upgradeNow: string;
}

export const translations: Record<AppLanguage, TranslationDictionary> = {
  en: {
    appName: 'EduPlan NG',
    tagline: 'Acquisition-Grade Nigerian Curriculum & Lesson Planning Platform',
    dashboard: 'Dashboard',
    curriculum: 'NERDC Curriculum',
    lessonPlans: 'Lesson Plans',
    schemeOfWork: 'Scheme of Work',
    assessments: 'Exams & CA Tests',
    gradeBook: 'Broadsheet & Grades',
    resources: 'Teaching Resources',
    progress: 'Curriculum Coverage',
    calendar: 'Academic Calendar',
    parentComms: 'Parent Messages',
    communityLibrary: 'Community Library',
    timetable: 'Timetable & Roll Call',
    settings: 'Settings',
    pricing: 'Subscription & Plans',
    admin: 'School Admin',
    createPlan: 'Create Lesson Plan',
    generateScheme: 'Generate Scheme of Work',
    newAssessment: 'Generate Exam / CA Test',
    saveDraft: 'Save Draft',
    publish: 'Publish Plan',
    exportPdf: 'Export to PDF',
    exportWord: 'Export to Word (.docx)',
    shareWhatsApp: 'Share on WhatsApp',
    bloomTaxonomy: 'Bloom\'s Taxonomy Alignment',
    differentiatedInstruction: 'Differentiated Instruction',
    strugglingLearners: 'Struggling (Tier 1)',
    onLevelLearners: 'On-Level (Tier 2)',
    advancedLearners: 'Advanced (Tier 3)',
    objectives: 'Behavioral Objectives',
    materials: 'Instructional Materials',
    teacherActivity: 'Teacher\'s Activity',
    studentActivity: 'Students\' Activity',
    evaluation: 'Evaluation & Exit Questions',
    assignment: 'Homework / Assignment',
    dayStreak: 'Day Streak',
    termCoverage: 'Term Coverage',
    nextLesson: 'Next Scheduled Lesson',
    activePlan: 'Active Subscription',
    upgradeNow: 'Upgrade to Pro',
  },
  yo: {
    appName: 'EduPlan NG',
    tagline: 'Ètò Ẹ̀kọ́ Nàìjíríà fún Àwọn Olùkọ́',
    dashboard: 'Pẹpẹ Iṣẹ́',
    curriculum: 'Ètò Ẹ̀kọ́ NERDC',
    lessonPlans: 'Àkọsílẹ̀ Ẹ̀kọ́',
    schemeOfWork: 'Ìtòlẹ́sẹẹsẹ Ẹ̀kọ́',
    assessments: 'Àwọn Ìdánwò & CA',
    gradeBook: 'Ìwé Máàkì & Àbájáde',
    resources: 'Àwọn Ohun Èlò Ẹ̀kọ́',
    progress: 'Ìtẹ̀síwájú Ẹ̀kọ́',
    calendar: 'Kàlẹ́ńdà Ilé-Ẹ̀kọ́',
    parentComms: 'Ifiranṣẹ si Awọn Obi',
    communityLibrary: 'Àkójọpọ̀ Ẹ̀kọ́ Àwọn Olùkọ́',
    timetable: 'Ètò Àkókò Ẹ̀kọ́',
    settings: 'Ètò Àkọọ́lẹ̀',
    pricing: 'Ìsanwó & Àwọn Ètò',
    admin: 'Olùdarí Ilé-Ẹ̀kọ́',
    createPlan: 'Kọ Àkọsílẹ̀ Ẹ̀kọ́ Tuntun',
    generateScheme: 'Ṣẹ̀dá Ìtòlẹ́sẹẹsẹ Ẹ̀kọ́',
    newAssessment: 'Ṣe Ìdánwò Tuntun',
    saveDraft: 'Fipamọ́ Sí Àkọ́kọ́',
    publish: 'Tẹ Iṣẹ́ Jáde',
    exportPdf: 'Gba Wọle bíi PDF',
    exportWord: 'Gba Wọle bíi Word',
    shareWhatsApp: 'Pín lórí WhatsApp',
    bloomTaxonomy: 'Ìtòlẹ́sẹẹsẹ Bloom',
    differentiatedInstruction: 'Ẹ̀kọ́ Ìyàtọ̀ fún Akẹ́kọ̀ọ́',
    strugglingLearners: 'Àwọn tó nílò ìrànwọ́',
    onLevelLearners: 'Àwọn tó wà ní ìwọ̀ntúnwọ̀nsì',
    advancedLearners: 'Àwọn tó ní ìmọ̀ tó ga',
    objectives: 'Àwọn Àfojúsùn Ẹ̀kọ́',
    materials: 'Àwọn Ohun Èlò Ìkọ́ni',
    teacherActivity: 'Iṣẹ́ Olùkọ́',
    studentActivity: 'Iṣẹ́ Akẹ́kọ̀ọ́',
    evaluation: 'Ìgbéléwọ̀n & Ìbéèrè',
    assignment: 'Iṣẹ́ Àmurele',
    dayStreak: 'Ọjọ́ Ìtẹ̀lé',
    termCoverage: 'Ìpín Ẹ̀kọ́ Tí a Kọ́',
    nextLesson: 'Ẹ̀kọ́ Tó Kàn',
    activePlan: 'Ètò Ìsanwó Tó Ń Ṣiṣẹ́',
    upgradeNow: 'Ṣe Àlékún sí Pro',
  },
  ig: {
    appName: 'EduPlan NG',
    tagline: 'Usoro Nkuzi na Atụmatụ Ọmụmụ maka Ndị Nkuzi Naịjirịa',
    dashboard: 'Ebe Ọrụ',
    curriculum: 'Usoro Ọmụmụ NERDC',
    lessonPlans: 'Atụmatụ Nkuzi',
    schemeOfWork: 'Nhazi Ọrụ',
    assessments: 'Ule & Ule Nyocha',
    gradeBook: 'Akwụkwọ Akara Ule',
    resources: 'Ngwa Nkuzi',
    progress: 'Ọganihu Ọmụmụ',
    calendar: 'Kalenda Ụlọ Akwụkwọ',
    parentComms: 'Ozi Maka Ndị Nne na Nna',
    communityLibrary: 'Ọba Akwụkwọ Ndị Nkuzi',
    timetable: 'Nhazi Oge',
    settings: 'Ntọala',
    pricing: 'Ụgwọ & Atụmatụ',
    admin: 'Ndị Isi Ụlọ Akwụkwọ',
    createPlan: 'Mepụta Atụmatụ Nkuzi',
    generateScheme: 'Hazie Nhazi Ọrụ',
    newAssessment: 'Mepụta Ule',
    saveDraft: 'Chekwaa Dịka Nchọpụta',
    publish: 'Bipụta Atụmatụ',
    exportPdf: 'Wepụta Dịka PDF',
    exportWord: 'Wepụta Dịka Word',
    shareWhatsApp: 'Kekọrịta na WhatsApp',
    bloomTaxonomy: 'Usoro Ọgụgụ Isi nke Bloom',
    differentiatedInstruction: 'Nkuzi Dịgasị Iche',
    strugglingLearners: 'Ndị Chọrọ Enyemaka',
    onLevelLearners: 'Ndị Nọ n\'Ọkwa Kwesịrị',
    advancedLearners: 'Ndị Nwere Nkà dị Elu',
    objectives: 'Ebumnuche Nkuzi',
    materials: 'Ngwa eji Ezi Ihe',
    teacherActivity: 'Ọrụ Onye Nkuzi',
    studentActivity: 'Ọrụ Ụmụ Akwụkwọ',
    evaluation: 'Nyocha Nkuzi',
    assignment: 'Ọrụ Ụlọ',
    dayStreak: 'Ụbọchị Na-aga n\'Ihu',
    termCoverage: 'Ọnụọgụgụ Nkụzi',
    nextLesson: 'Nkuzi Na-esote',
    activePlan: 'Ndebanye Aha Na-arụ Ọrụ',
    upgradeNow: 'Gaa na Pro',
  },
  ha: {
    appName: 'EduPlan NG',
    tagline: 'Tsarin Shirya Darasi na Malamai a Najeriya',
    dashboard: 'Dandali',
    curriculum: 'Karatun NERDC',
    lessonPlans: 'Shirin Darasi',
    schemeOfWork: 'Tsarin Aiki na Wa\'adi',
    assessments: 'Gwajin Karatu da Jarrabawa',
    gradeBook: 'Littafin Makin Ɗalibai',
    resources: 'Kayan Karatun Malami',
    progress: 'Ci Gaban Karatu',
    calendar: 'Kalandar Makaranta',
    parentComms: 'Saƙonni ga Iyaye',
    communityLibrary: 'Laburaren Al\'ummar Malamai',
    timetable: 'Jadawalin Lokaci',
    settings: 'Saituna',
    pricing: 'Farashi da Shirye-shirye',
    admin: 'Hukumar Makaranta',
    createPlan: 'Ƙirƙiri Shirin Darasi',
    generateScheme: 'Ƙirƙiri Tsarin Aiki',
    newAssessment: 'Ƙirƙiri Jarrabawa',
    saveDraft: 'Ajiye a Tsarin Shirye-shirye',
    publish: 'Buga Shirin Darasi',
    exportPdf: 'Fitar a Tsarin PDF',
    exportWord: 'Fitar a Tsarin Word',
    shareWhatsApp: 'Aika a WhatsApp',
    bloomTaxonomy: 'Rabe-raben Ilimi na Bloom',
    differentiatedInstruction: 'Koyarwa ta Hanyoyi Daban-daban',
    strugglingLearners: 'Ɗaliban da ke buƙatar tallafi',
    onLevelLearners: 'Ɗaliban matsakaicin matsayi',
    advancedLearners: 'Ɗalibai masu basirar gaba',
    objectives: 'Makasudin Koyi',
    materials: 'Kayan Aikin Koyarwa',
    teacherActivity: 'Ayyukan Malami',
    studentActivity: 'Ayyukan Ɗalibi',
    evaluation: 'Gwajin Fahimta',
    assignment: 'Aikin Gida',
    dayStreak: 'Yawan Kwanaki a Jere',
    termCoverage: 'Yawan Abin da aka Karanta',
    nextLesson: 'Darasi na Gaba',
    activePlan: 'Biyan Kuɗin da ke Aiki',
    upgradeNow: 'Haɓaka zuwa Pro',
  }
};
