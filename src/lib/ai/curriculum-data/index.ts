/**
 * EduPlan NG - Official Nigerian Curriculum Catalog & Strict Class Isolation Engine
 *
 * Mandate:
 * - Isolated curriculum files per class and subject (jss1-basic-science.json, jss2-basic-science.json, etc.)
 * - Zero cross-class topic bleeding (e.g. JSS1 and JSS2 topics are strictly segregated)
 * - Version-aware tracking with stamped versioning and outdated plan detection
 * - Government-approved textbook citations (NERDC & Lagos State OEQA)
 */

import jss1BasicScience from './jss1-basic-science.json' with { type: 'json' };
import jss2BasicScience from './jss2-basic-science.json' with { type: 'json' };
import jss3BasicScience from './jss3-basic-science.json' with { type: 'json' };
import jss1Mathematics from './jss1-mathematics.json' with { type: 'json' };
import jss2Mathematics from './jss2-mathematics.json' with { type: 'json' };
import jss3Mathematics from './jss3-mathematics.json' with { type: 'json' };
import sss1Mathematics from './sss1-mathematics.json' with { type: 'json' };
import sss2Mathematics from './sss2-mathematics.json' with { type: 'json' };
import sss3Mathematics from './sss3-mathematics.json' with { type: 'json' };
import jss1English from './jss1-english.json' with { type: 'json' };
import jss2English from './jss2-english.json' with { type: 'json' };
import jss3English from './jss3-english.json' with { type: 'json' };
import sss1Biology from './sss1-biology.json' with { type: 'json' };
import sss2Biology from './sss2-biology.json' with { type: 'json' };
import sss3Biology from './sss3-biology.json' with { type: 'json' };
import jss1BasicTech from './jss1-basic-technology.json' with { type: 'json' };
import jss2BasicTech from './jss2-basic-technology.json' with { type: 'json' };
import jss3BasicTech from './jss3-basic-technology.json' with { type: 'json' };
import jss1Civic from './jss1-civic.json' with { type: 'json' };
import jss2Civic from './jss2-civic.json' with { type: 'json' };
import jss3Civic from './jss3-civic.json' with { type: 'json' };
import jss1SocialStudies from './jss1-social-studies.json' with { type: 'json' };
import jss2SocialStudies from './jss2-social-studies.json' with { type: 'json' };
import jss3SocialStudies from './jss3-social-studies.json' with { type: 'json' };
import sss1Chemistry from './sss1-chemistry.json' with { type: 'json' };
import sss2Chemistry from './sss2-chemistry.json' with { type: 'json' };
import sss3Chemistry from './sss3-chemistry.json' with { type: 'json' };
import sss1Physics from './sss1-physics.json' with { type: 'json' };
import sss2Physics from './sss2-physics.json' with { type: 'json' };
import sss3Physics from './sss3-physics.json' with { type: 'json' };
import sss1Economics from './sss1-economics.json' with { type: 'json' };
import sss2Economics from './sss2-economics.json' with { type: 'json' };
import sss3Economics from './sss3-economics.json' with { type: 'json' };
import sss1English from './sss1-english.json' with { type: 'json' };
import sss2English from './sss2-english.json' with { type: 'json' };
import sss3English from './sss3-english.json' with { type: 'json' };

// Agricultural Science (JSS 1-3 & SSS 1-3)
import jss1Agric from './jss1-agricultural-science.json' with { type: 'json' };
import jss2Agric from './jss2-agricultural-science.json' with { type: 'json' };
import jss3Agric from './jss3-agricultural-science.json' with { type: 'json' };
import sss1Agric from './sss1-agricultural-science.json' with { type: 'json' };
import sss2Agric from './sss2-agricultural-science.json' with { type: 'json' };
import sss3Agric from './sss3-agricultural-science.json' with { type: 'json' };

// Business Studies (JSS 1-3)
import jss1Bus from './jss1-business-studies.json' with { type: 'json' };
import jss2Bus from './jss2-business-studies.json' with { type: 'json' };
import jss3Bus from './jss3-business-studies.json' with { type: 'json' };

// Government (SSS 1-3)
import sss1Gov from './sss1-government.json' with { type: 'json' };
import sss2Gov from './sss2-government.json' with { type: 'json' };
import sss3Gov from './sss3-government.json' with { type: 'json' };

// Financial Accounting (SSS 1-3)
import sss1Acc from './sss1-financial-accounting.json' with { type: 'json' };
import sss2Acc from './sss2-financial-accounting.json' with { type: 'json' };
import sss3Acc from './sss3-financial-accounting.json' with { type: 'json' };

// Commerce (SSS 1-3)
import sss1Com from './sss1-commerce.json' with { type: 'json' };
import sss2Com from './sss2-commerce.json' with { type: 'json' };
import sss3Com from './sss3-commerce.json' with { type: 'json' };

// Geography (SSS 1-3)
import sss1Geo from './sss1-geography.json' with { type: 'json' };
import sss2Geo from './sss2-geography.json' with { type: 'json' };
import sss3Geo from './sss3-geography.json' with { type: 'json' };

// Literature-in-English (SSS 1-3)
import sss1Lit from './sss1-literature.json' with { type: 'json' };
import sss2Lit from './sss2-literature.json' with { type: 'json' };
import sss3Lit from './sss3-literature.json' with { type: 'json' };

// Computer Studies (JSS 1-3) & Data Processing (SSS 1-3)
import jss1Cmp from './jss1-computer-studies.json' with { type: 'json' };
import jss2Cmp from './jss2-computer-studies.json' with { type: 'json' };
import jss3Cmp from './jss3-computer-studies.json' with { type: 'json' };
import sss1Dpr from './sss1-data-processing.json' with { type: 'json' };
import sss2Dpr from './sss2-data-processing.json' with { type: 'json' };
import sss3Dpr from './sss3-data-processing.json' with { type: 'json' };

// Physical and Health Education (JSS 1-3)
import jss1Phe from './jss1-phe.json' with { type: 'json' };
import jss2Phe from './jss2-phe.json' with { type: 'json' };
import jss3Phe from './jss3-phe.json' with { type: 'json' };

// Cultural and Creative Arts (JSS 1-3)
import jss1Cca from './jss1-cca.json' with { type: 'json' };
import jss2Cca from './jss2-cca.json' with { type: 'json' };
import jss3Cca from './jss3-cca.json' with { type: 'json' };

// Christian Religious Studies (JSS 1-3)
import jss1Crs from './jss1-crs.json' with { type: 'json' };
import jss2Crs from './jss2-crs.json' with { type: 'json' };
import jss3Crs from './jss3-crs.json' with { type: 'json' };

// Islamic Religious Studies (JSS 1-3)
import jss1Irs from './jss1-irs.json' with { type: 'json' };
import jss2Irs from './jss2-irs.json' with { type: 'json' };
import jss3Irs from './jss3-irs.json' with { type: 'json' };

// Home Economics (JSS 1-3)
import jss1Hec from './jss1-home-economics.json' with { type: 'json' };
import jss2Hec from './jss2-home-economics.json' with { type: 'json' };
import jss3Hec from './jss3-home-economics.json' with { type: 'json' };

// French Language (JSS 1-3)
import jss1Fre from './jss1-french.json' with { type: 'json' };
import jss2Fre from './jss2-french.json' with { type: 'json' };
import jss3Fre from './jss3-french.json' with { type: 'json' };

// Èdè Yorùbá (JSS 1-3)
import jss1Yor from './jss1-yoruba.json' with { type: 'json' };
import jss2Yor from './jss2-yoruba.json' with { type: 'json' };
import jss3Yor from './jss3-yoruba.json' with { type: 'json' };

// Asụsụ Igbo (JSS 1-3)
import jss1Igb from './jss1-igbo.json' with { type: 'json' };
import jss2Igb from './jss2-igbo.json' with { type: 'json' };
import jss3Igb from './jss3-igbo.json' with { type: 'json' };

// Harshen Hausa (JSS 1-3)
import jss1Hau from './jss1-hausa.json' with { type: 'json' };
import jss2Hau from './jss2-hausa.json' with { type: 'json' };
import jss3Hau from './jss3-hausa.json' with { type: 'json' };

// Technical Drawing (SSS 1-3)
import sss1Td from './sss1-technical-drawing.json' with { type: 'json' };
import sss2Td from './sss2-technical-drawing.json' with { type: 'json' };
import sss3Td from './sss3-technical-drawing.json' with { type: 'json' };

// Further Mathematics (SSS 1-3)
import sss1Fmth from './sss1-further-mathematics.json' with { type: 'json' };
import sss2Fmth from './sss2-further-mathematics.json' with { type: 'json' };
import sss3Fmth from './sss3-further-mathematics.json' with { type: 'json' };

// Civic Education (Senior SSS 1-3)
import sss1Civic from './sss1-civic.json' with { type: 'json' };
import sss2Civic from './sss2-civic.json' with { type: 'json' };
import sss3Civic from './sss3-civic.json' with { type: 'json' };

// Christian Religious Studies (Senior SSS 1-3)
import sss1CrsSenior from './sss1-crs.json' with { type: 'json' };
import sss2CrsSenior from './sss2-crs.json' with { type: 'json' };
import sss3CrsSenior from './sss3-crs.json' with { type: 'json' };

// Islamic Religious Studies (Senior SSS 1-3)
import sss1IrsSenior from './sss1-irs.json' with { type: 'json' };
import sss2IrsSenior from './sss2-irs.json' with { type: 'json' };
import sss3IrsSenior from './sss3-irs.json' with { type: 'json' };

// Marketing & Salesmanship (SSS 1-3)
import sss1Mkt from './sss1-marketing.json' with { type: 'json' };
import sss2Mkt from './sss2-marketing.json' with { type: 'json' };
import sss3Mkt from './sss3-marketing.json' with { type: 'json' };

// History & Heritage Studies (SSS 1-3)
import sss1His from './sss1-history.json' with { type: 'json' };
import sss2His from './sss2-history.json' with { type: 'json' };
import sss3His from './sss3-history.json' with { type: 'json' };

export interface CurriculumTopicEntry {
  term: number;
  week: number;
  topic: string;
  subtopics?: string[];
  objectives?: string[];
  learningObjectives?: string[];
}

export interface CurriculumTextbookMetadata {
  title?: string;
  author?: string;
  publisher?: string;
  edition?: string;
  isGovernmentApproved?: boolean;
  approvedBy?: string;
  approvalDate?: string;
}

export interface CurriculumCatalog {
  classLevel: string; // e.g. "jss-1", "jss-2", "sss-1", "JSS 1", etc.
  subject: string;
  subjectCode?: string;
  version?: string;
  curriculumVersion?: string;
  lastUpdated: string;
  sourceUrl: string;
  accreditationBody?: string;
  approvedBy?: string;
  recommendedTextbook?: CurriculumTextbookMetadata;
  topics: CurriculumTopicEntry[];
}

// Registry of all isolated class curriculum files
const CATALOG_REGISTRY: Record<string, CurriculumCatalog> = {
  // Basic Science (JSS 1-3)
  'jss-1:basic science': jss1BasicScience as CurriculumCatalog,
  'jss-1:basic-science': jss1BasicScience as CurriculumCatalog,
  'jss-2:basic science': jss2BasicScience as CurriculumCatalog,
  'jss-2:basic-science': jss2BasicScience as CurriculumCatalog,
  'jss-3:basic science': jss3BasicScience as CurriculumCatalog,
  'jss-3:basic-science': jss3BasicScience as CurriculumCatalog,

  // Mathematics (JSS 1-3 & SSS 1-3)
  'jss-1:mathematics': jss1Mathematics as CurriculumCatalog,
  'jss-1:general mathematics': jss1Mathematics as CurriculumCatalog,
  'jss-2:mathematics': jss2Mathematics as CurriculumCatalog,
  'jss-2:general mathematics': jss2Mathematics as CurriculumCatalog,
  'jss-3:mathematics': jss3Mathematics as CurriculumCatalog,
  'jss-3:general mathematics': jss3Mathematics as CurriculumCatalog,
  'sss-1:mathematics': sss1Mathematics as CurriculumCatalog,
  'sss-1:general mathematics': sss1Mathematics as CurriculumCatalog,
  'sss-2:mathematics': sss2Mathematics as CurriculumCatalog,
  'sss-2:general mathematics': sss2Mathematics as CurriculumCatalog,
  'sss-3:mathematics': sss3Mathematics as CurriculumCatalog,
  'sss-3:general mathematics': sss3Mathematics as CurriculumCatalog,

  // English Studies (JSS 1-3)
  'jss-1:english studies': jss1English as CurriculumCatalog,
  'jss-1:english': jss1English as CurriculumCatalog,
  'jss-2:english studies': jss2English as CurriculumCatalog,
  'jss-2:english': jss2English as CurriculumCatalog,
  'jss-3:english studies': jss3English as CurriculumCatalog,
  'jss-3:english': jss3English as CurriculumCatalog,

  // Biology (SSS 1-3)
  'sss-1:biology': sss1Biology as CurriculumCatalog,
  'sss-2:biology': sss2Biology as CurriculumCatalog,
  'sss-3:biology': sss3Biology as CurriculumCatalog,

  // Basic Technology (JSS 1-3)
  'jss-1:basic technology': jss1BasicTech as CurriculumCatalog,
  'jss-1:basic-technology': jss1BasicTech as CurriculumCatalog,
  'jss-2:basic technology': jss2BasicTech as CurriculumCatalog,
  'jss-2:basic-technology': jss2BasicTech as CurriculumCatalog,
  'jss-3:basic technology': jss3BasicTech as CurriculumCatalog,
  'jss-3:basic-technology': jss3BasicTech as CurriculumCatalog,

  // Civic Education (JSS 1-3)
  'jss-1:civic education': jss1Civic as CurriculumCatalog,
  'jss-1:civic-education': jss1Civic as CurriculumCatalog,
  'jss-2:civic education': jss2Civic as CurriculumCatalog,
  'jss-2:civic-education': jss2Civic as CurriculumCatalog,
  'jss-3:civic education': jss3Civic as CurriculumCatalog,
  'jss-3:civic-education': jss3Civic as CurriculumCatalog,

  // Social Studies (JSS 1-3)
  'jss-1:social studies': jss1SocialStudies as CurriculumCatalog,
  'jss-1:social-studies': jss1SocialStudies as CurriculumCatalog,
  'jss-2:social studies': jss2SocialStudies as CurriculumCatalog,
  'jss-2:social-studies': jss2SocialStudies as CurriculumCatalog,
  'jss-3:social studies': jss3SocialStudies as CurriculumCatalog,
  'jss-3:social-studies': jss3SocialStudies as CurriculumCatalog,

  // Chemistry (SSS 1-3)
  'sss-1:chemistry': sss1Chemistry as CurriculumCatalog,
  'sss-2:chemistry': sss2Chemistry as CurriculumCatalog,
  'sss-3:chemistry': sss3Chemistry as CurriculumCatalog,

  // Physics (SSS 1-3)
  'sss-1:physics': sss1Physics as CurriculumCatalog,
  'sss-2:physics': sss2Physics as CurriculumCatalog,
  'sss-3:physics': sss3Physics as CurriculumCatalog,

  // Economics (SSS 1-3)
  'sss-1:economics': sss1Economics as CurriculumCatalog,
  'sss-2:economics': sss2Economics as CurriculumCatalog,
  'sss-3:economics': sss3Economics as CurriculumCatalog,

  // Senior English Language (SSS 1-3)
  'sss-1:english language': sss1English as CurriculumCatalog,
  'sss-1:english': sss1English as CurriculumCatalog,
  'sss-2:english language': sss2English as CurriculumCatalog,
  'sss-2:english': sss2English as CurriculumCatalog,
  'sss-3:english language': sss3English as CurriculumCatalog,
  'sss-3:english': sss3English as CurriculumCatalog,

  // Agricultural Science (JSS 1-3 & SSS 1-3)
  'jss-1:agricultural science': jss1Agric as CurriculumCatalog,
  'jss-1:agricultural-science': jss1Agric as CurriculumCatalog,
  'jss-1:agric': jss1Agric as CurriculumCatalog,
  'jss-2:agricultural science': jss2Agric as CurriculumCatalog,
  'jss-2:agricultural-science': jss2Agric as CurriculumCatalog,
  'jss-2:agric': jss2Agric as CurriculumCatalog,
  'jss-3:agricultural science': jss3Agric as CurriculumCatalog,
  'jss-3:agricultural-science': jss3Agric as CurriculumCatalog,
  'jss-3:agric': jss3Agric as CurriculumCatalog,
  'sss-1:agricultural science': sss1Agric as CurriculumCatalog,
  'sss-1:agricultural-science': sss1Agric as CurriculumCatalog,
  'sss-1:agric': sss1Agric as CurriculumCatalog,
  'sss-2:agricultural science': sss2Agric as CurriculumCatalog,
  'sss-2:agricultural-science': sss2Agric as CurriculumCatalog,
  'sss-2:agric': sss2Agric as CurriculumCatalog,
  'sss-3:agricultural science': sss3Agric as CurriculumCatalog,
  'sss-3:agricultural-science': sss3Agric as CurriculumCatalog,
  'sss-3:agric': sss3Agric as CurriculumCatalog,

  // Business Studies (JSS 1-3)
  'jss-1:business studies': jss1Bus as CurriculumCatalog,
  'jss-1:business-studies': jss1Bus as CurriculumCatalog,
  'jss-1:business': jss1Bus as CurriculumCatalog,
  'jss-2:business studies': jss2Bus as CurriculumCatalog,
  'jss-2:business-studies': jss2Bus as CurriculumCatalog,
  'jss-2:business': jss2Bus as CurriculumCatalog,
  'jss-3:business studies': jss3Bus as CurriculumCatalog,
  'jss-3:business-studies': jss3Bus as CurriculumCatalog,
  'jss-3:business': jss3Bus as CurriculumCatalog,

  // Government (SSS 1-3)
  'sss-1:government': sss1Gov as CurriculumCatalog,
  'sss-1:gov': sss1Gov as CurriculumCatalog,
  'sss-2:government': sss2Gov as CurriculumCatalog,
  'sss-2:gov': sss2Gov as CurriculumCatalog,
  'sss-3:government': sss3Gov as CurriculumCatalog,
  'sss-3:gov': sss3Gov as CurriculumCatalog,

  // Financial Accounting (SSS 1-3)
  'sss-1:financial accounting': sss1Acc as CurriculumCatalog,
  'sss-1:financial-accounting': sss1Acc as CurriculumCatalog,
  'sss-1:accounting': sss1Acc as CurriculumCatalog,
  'sss-2:financial accounting': sss2Acc as CurriculumCatalog,
  'sss-2:financial-accounting': sss2Acc as CurriculumCatalog,
  'sss-2:accounting': sss2Acc as CurriculumCatalog,
  'sss-3:financial accounting': sss3Acc as CurriculumCatalog,
  'sss-3:financial-accounting': sss3Acc as CurriculumCatalog,
  'sss-3:accounting': sss3Acc as CurriculumCatalog,

  // Commerce (SSS 1-3)
  'sss-1:commerce': sss1Com as CurriculumCatalog,
  'sss-2:commerce': sss2Com as CurriculumCatalog,
  'sss-3:commerce': sss3Com as CurriculumCatalog,

  // Geography (SSS 1-3)
  'sss-1:geography': sss1Geo as CurriculumCatalog,
  'sss-2:geography': sss2Geo as CurriculumCatalog,
  'sss-3:geography': sss3Geo as CurriculumCatalog,

  // Literature-in-English (SSS 1-3)
  'sss-1:literature-in-english': sss1Lit as CurriculumCatalog,
  'sss-1:literature in english': sss1Lit as CurriculumCatalog,
  'sss-1:literature': sss1Lit as CurriculumCatalog,
  'sss-2:literature-in-english': sss2Lit as CurriculumCatalog,
  'sss-2:literature in english': sss2Lit as CurriculumCatalog,
  'sss-2:literature': sss2Lit as CurriculumCatalog,
  'sss-3:literature-in-english': sss3Lit as CurriculumCatalog,
  'sss-3:literature in english': sss3Lit as CurriculumCatalog,
  'sss-3:literature': sss3Lit as CurriculumCatalog,

  // Computer Studies (JSS 1-3) & Data Processing (SSS 1-3)
  'jss-1:computer studies': jss1Cmp as CurriculumCatalog,
  'jss-1:computer-studies': jss1Cmp as CurriculumCatalog,
  'jss-1:computer studies (ict)': jss1Cmp as CurriculumCatalog,
  'jss-1:ict': jss1Cmp as CurriculumCatalog,
  'jss-2:computer studies': jss2Cmp as CurriculumCatalog,
  'jss-2:computer-studies': jss2Cmp as CurriculumCatalog,
  'jss-2:computer studies (ict)': jss2Cmp as CurriculumCatalog,
  'jss-2:ict': jss2Cmp as CurriculumCatalog,
  'jss-3:computer studies': jss3Cmp as CurriculumCatalog,
  'jss-3:computer-studies': jss3Cmp as CurriculumCatalog,
  'jss-3:computer studies (ict)': jss3Cmp as CurriculumCatalog,
  'jss-3:ict': jss3Cmp as CurriculumCatalog,
  'sss-1:data processing': sss1Dpr as CurriculumCatalog,
  'sss-1:data-processing': sss1Dpr as CurriculumCatalog,
  'sss-1:data processing & ict': sss1Dpr as CurriculumCatalog,
  'sss-2:data processing': sss2Dpr as CurriculumCatalog,
  'sss-2:data-processing': sss2Dpr as CurriculumCatalog,
  'sss-2:data processing & ict': sss2Dpr as CurriculumCatalog,
  'sss-3:data processing': sss3Dpr as CurriculumCatalog,
  'sss-3:data-processing': sss3Dpr as CurriculumCatalog,
  'sss-3:data processing & ict': sss3Dpr as CurriculumCatalog,

  // Physical and Health Education (JSS 1-3)
  'jss-1:physical and health education': jss1Phe as CurriculumCatalog,
  'jss-1:physical and health education (phe)': jss1Phe as CurriculumCatalog,
  'jss-1:phe': jss1Phe as CurriculumCatalog,
  'jss-2:physical and health education': jss2Phe as CurriculumCatalog,
  'jss-2:physical and health education (phe)': jss2Phe as CurriculumCatalog,
  'jss-2:phe': jss2Phe as CurriculumCatalog,
  'jss-3:physical and health education': jss3Phe as CurriculumCatalog,
  'jss-3:physical and health education (phe)': jss3Phe as CurriculumCatalog,
  'jss-3:phe': jss3Phe as CurriculumCatalog,

  // Cultural and Creative Arts (JSS 1-3)
  'jss-1:cultural and creative arts': jss1Cca as CurriculumCatalog,
  'jss-1:cultural and creative arts (cca)': jss1Cca as CurriculumCatalog,
  'jss-1:cca': jss1Cca as CurriculumCatalog,
  'jss-2:cultural and creative arts': jss2Cca as CurriculumCatalog,
  'jss-2:cultural and creative arts (cca)': jss2Cca as CurriculumCatalog,
  'jss-2:cca': jss2Cca as CurriculumCatalog,
  'jss-3:cultural and creative arts': jss3Cca as CurriculumCatalog,
  'jss-3:cultural and creative arts (cca)': jss3Cca as CurriculumCatalog,
  'jss-3:cca': jss3Cca as CurriculumCatalog,

  // Christian Religious Studies (JSS 1-3)
  'jss-1:christian religious studies': jss1Crs as CurriculumCatalog,
  'jss-1:christian religious studies (crs)': jss1Crs as CurriculumCatalog,
  'jss-1:crs': jss1Crs as CurriculumCatalog,
  'jss-2:christian religious studies': jss2Crs as CurriculumCatalog,
  'jss-2:christian religious studies (crs)': jss2Crs as CurriculumCatalog,
  'jss-2:crs': jss2Crs as CurriculumCatalog,
  'jss-3:christian religious studies': jss3Crs as CurriculumCatalog,
  'jss-3:christian religious studies (crs)': jss3Crs as CurriculumCatalog,
  'jss-3:crs': jss3Crs as CurriculumCatalog,

  // Islamic Religious Studies (JSS 1-3)
  'jss-1:islamic religious studies': jss1Irs as CurriculumCatalog,
  'jss-1:islamic religious studies (irs)': jss1Irs as CurriculumCatalog,
  'jss-1:irs': jss1Irs as CurriculumCatalog,
  'jss-2:islamic religious studies': jss2Irs as CurriculumCatalog,
  'jss-2:islamic religious studies (irs)': jss2Irs as CurriculumCatalog,
  'jss-2:irs': jss2Irs as CurriculumCatalog,
  'jss-3:islamic religious studies': jss3Irs as CurriculumCatalog,
  'jss-3:islamic religious studies (irs)': jss3Irs as CurriculumCatalog,
  'jss-3:irs': jss3Irs as CurriculumCatalog,

  // Home Economics (JSS 1-3)
  'jss-1:home economics': jss1Hec as CurriculumCatalog,
  'jss-1:home-economics': jss1Hec as CurriculumCatalog,
  'jss-1:hec': jss1Hec as CurriculumCatalog,
  'jss-2:home economics': jss2Hec as CurriculumCatalog,
  'jss-2:home-economics': jss2Hec as CurriculumCatalog,
  'jss-2:hec': jss2Hec as CurriculumCatalog,
  'jss-3:home economics': jss3Hec as CurriculumCatalog,
  'jss-3:home-economics': jss3Hec as CurriculumCatalog,
  'jss-3:hec': jss3Hec as CurriculumCatalog,

  // French Language (JSS 1-3)
  'jss-1:french': jss1Fre as CurriculumCatalog,
  'jss-1:french language': jss1Fre as CurriculumCatalog,
  'jss-1:fre': jss1Fre as CurriculumCatalog,
  'jss-2:french': jss2Fre as CurriculumCatalog,
  'jss-2:french language': jss2Fre as CurriculumCatalog,
  'jss-2:fre': jss2Fre as CurriculumCatalog,
  'jss-3:french': jss3Fre as CurriculumCatalog,
  'jss-3:french language': jss3Fre as CurriculumCatalog,
  'jss-3:fre': jss3Fre as CurriculumCatalog,

  // Èdè Yorùbá (JSS 1-3)
  'jss-1:ede yoruba': jss1Yor as CurriculumCatalog,
  'jss-1:yoruba': jss1Yor as CurriculumCatalog,
  'jss-1:yor': jss1Yor as CurriculumCatalog,
  'jss-2:ede yoruba': jss2Yor as CurriculumCatalog,
  'jss-2:yoruba': jss2Yor as CurriculumCatalog,
  'jss-2:yor': jss2Yor as CurriculumCatalog,
  'jss-3:ede yoruba': jss3Yor as CurriculumCatalog,
  'jss-3:yoruba': jss3Yor as CurriculumCatalog,
  'jss-3:yor': jss3Yor as CurriculumCatalog,

  // Asụsụ Igbo (JSS 1-3)
  'jss-1:asusu igbo': jss1Igb as CurriculumCatalog,
  'jss-1:igbo': jss1Igb as CurriculumCatalog,
  'jss-1:igb': jss1Igb as CurriculumCatalog,
  'jss-2:asusu igbo': jss2Igb as CurriculumCatalog,
  'jss-2:igbo': jss2Igb as CurriculumCatalog,
  'jss-2:igb': jss2Igb as CurriculumCatalog,
  'jss-3:asusu igbo': jss3Igb as CurriculumCatalog,
  'jss-3:igbo': jss3Igb as CurriculumCatalog,
  'jss-3:igb': jss3Igb as CurriculumCatalog,

  // Harshen Hausa (JSS 1-3)
  'jss-1:harshen hausa': jss1Hau as CurriculumCatalog,
  'jss-1:hausa': jss1Hau as CurriculumCatalog,
  'jss-1:hau': jss1Hau as CurriculumCatalog,
  'jss-2:harshen hausa': jss2Hau as CurriculumCatalog,
  'jss-2:hausa': jss2Hau as CurriculumCatalog,
  'jss-2:hau': jss2Hau as CurriculumCatalog,
  'jss-3:harshen hausa': jss3Hau as CurriculumCatalog,
  'jss-3:hausa': jss3Hau as CurriculumCatalog,
  'jss-3:hau': jss3Hau as CurriculumCatalog,

  // Technical Drawing (SSS 1-3)
  'sss-1:technical drawing': sss1Td as CurriculumCatalog,
  'sss-1:technical-drawing': sss1Td as CurriculumCatalog,
  'sss-1:td': sss1Td as CurriculumCatalog,
  'sss-2:technical drawing': sss2Td as CurriculumCatalog,
  'sss-2:technical-drawing': sss2Td as CurriculumCatalog,
  'sss-2:td': sss2Td as CurriculumCatalog,
  'sss-3:technical drawing': sss3Td as CurriculumCatalog,
  'sss-3:technical-drawing': sss3Td as CurriculumCatalog,
  'sss-3:td': sss3Td as CurriculumCatalog,

  // Further Mathematics (SSS 1-3)
  'sss-1:further mathematics': sss1Fmth as CurriculumCatalog,
  'sss-1:further-mathematics': sss1Fmth as CurriculumCatalog,
  'sss-1:fmth': sss1Fmth as CurriculumCatalog,
  'sss-2:further mathematics': sss2Fmth as CurriculumCatalog,
  'sss-2:further-mathematics': sss2Fmth as CurriculumCatalog,
  'sss-2:fmth': sss2Fmth as CurriculumCatalog,
  'sss-3:further mathematics': sss3Fmth as CurriculumCatalog,
  'sss-3:further-mathematics': sss3Fmth as CurriculumCatalog,
  'sss-3:fmth': sss3Fmth as CurriculumCatalog,

  // Civic Education (Senior SSS 1-3)
  'sss-1:civic education': sss1Civic as CurriculumCatalog,
  'sss-1:civic-education': sss1Civic as CurriculumCatalog,
  'sss-1:civic': sss1Civic as CurriculumCatalog,
  'sss-1:cve': sss1Civic as CurriculumCatalog,
  'sss-2:civic education': sss2Civic as CurriculumCatalog,
  'sss-2:civic-education': sss2Civic as CurriculumCatalog,
  'sss-2:civic': sss2Civic as CurriculumCatalog,
  'sss-2:cve': sss2Civic as CurriculumCatalog,
  'sss-3:civic education': sss3Civic as CurriculumCatalog,
  'sss-3:civic-education': sss3Civic as CurriculumCatalog,
  'sss-3:civic': sss3Civic as CurriculumCatalog,
  'sss-3:cve': sss3Civic as CurriculumCatalog,

  // Christian Religious Studies (Senior SSS 1-3)
  'sss-1:christian religious studies': sss1CrsSenior as CurriculumCatalog,
  'sss-1:christian religious studies (crs)': sss1CrsSenior as CurriculumCatalog,
  'sss-1:crs': sss1CrsSenior as CurriculumCatalog,
  'sss-2:christian religious studies': sss2CrsSenior as CurriculumCatalog,
  'sss-2:christian religious studies (crs)': sss2CrsSenior as CurriculumCatalog,
  'sss-2:crs': sss2CrsSenior as CurriculumCatalog,
  'sss-3:christian religious studies': sss3CrsSenior as CurriculumCatalog,
  'sss-3:christian religious studies (crs)': sss3CrsSenior as CurriculumCatalog,
  'sss-3:crs': sss3CrsSenior as CurriculumCatalog,

  // Islamic Religious Studies (Senior SSS 1-3)
  'sss-1:islamic religious studies': sss1IrsSenior as CurriculumCatalog,
  'sss-1:islamic religious studies (irs)': sss1IrsSenior as CurriculumCatalog,
  'sss-1:irs': sss1IrsSenior as CurriculumCatalog,
  'sss-2:islamic religious studies': sss2IrsSenior as CurriculumCatalog,
  'sss-2:islamic religious studies (irs)': sss2IrsSenior as CurriculumCatalog,
  'sss-2:irs': sss2IrsSenior as CurriculumCatalog,
  'sss-3:islamic religious studies': sss3IrsSenior as CurriculumCatalog,
  'sss-3:islamic religious studies (irs)': sss3IrsSenior as CurriculumCatalog,
  'sss-3:irs': sss3IrsSenior as CurriculumCatalog,

  // Marketing & Salesmanship (SSS 1-3)
  'sss-1:marketing': sss1Mkt as CurriculumCatalog,
  'sss-1:marketing & salesmanship': sss1Mkt as CurriculumCatalog,
  'sss-1:marketing and salesmanship': sss1Mkt as CurriculumCatalog,
  'sss-1:mkt': sss1Mkt as CurriculumCatalog,
  'sss-2:marketing': sss2Mkt as CurriculumCatalog,
  'sss-2:marketing & salesmanship': sss2Mkt as CurriculumCatalog,
  'sss-2:marketing and salesmanship': sss2Mkt as CurriculumCatalog,
  'sss-2:mkt': sss2Mkt as CurriculumCatalog,
  'sss-3:marketing': sss3Mkt as CurriculumCatalog,
  'sss-3:marketing & salesmanship': sss3Mkt as CurriculumCatalog,
  'sss-3:marketing and salesmanship': sss3Mkt as CurriculumCatalog,
  'sss-3:mkt': sss3Mkt as CurriculumCatalog,

  // History & Heritage Studies (SSS 1-3)
  'sss-1:history': sss1His as CurriculumCatalog,
  'sss-1:history & heritage studies': sss1His as CurriculumCatalog,
  'sss-1:history and heritage studies': sss1His as CurriculumCatalog,
  'sss-1:his': sss1His as CurriculumCatalog,
  'sss-2:history': sss2His as CurriculumCatalog,
  'sss-2:history & heritage studies': sss2His as CurriculumCatalog,
  'sss-2:history and heritage studies': sss2His as CurriculumCatalog,
  'sss-2:his': sss2His as CurriculumCatalog,
  'sss-3:history': sss3His as CurriculumCatalog,
  'sss-3:history & heritage studies': sss3His as CurriculumCatalog,
  'sss-3:history and heritage studies': sss3His as CurriculumCatalog,
  'sss-3:his': sss3His as CurriculumCatalog,
};

/**
 * Normalizes level strings e.g. "JSS1", "jss1", "jss-1", "JSS 1" -> "jss-1"
 */
export function normalizeClassLevel(rawLevel: string): string {
  const clean = rawLevel.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean === 'jss1') return 'jss-1';
  if (clean === 'jss2') return 'jss-2';
  if (clean === 'jss3') return 'jss-3';
  if (clean === 'sss1') return 'sss-1';
  if (clean === 'sss2') return 'sss-2';
  if (clean === 'sss3') return 'sss-3';
  return rawLevel.toLowerCase().trim();
}

/**
 * Normalizes subject names e.g. "Basic Science", "basic-science", "Èdè Yorùbá" -> "basic science", "ede yoruba"
 */
export function normalizeSubjectName(rawSubject: string): string {
  return rawSubject
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[-_]/g, ' ')
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ');
}

/**
 * Retrieves the isolated curriculum catalog for an exact class level and subject.
 */
export function getCurriculumCatalog(classLevel: string, subject: string): CurriculumCatalog | null {
  const normLevel = normalizeClassLevel(classLevel);
  const normSubject = normalizeSubjectName(subject);
  const key = `${normLevel}:${normSubject}`;
  if (CATALOG_REGISTRY[key]) return CATALOG_REGISTRY[key];
  
  // Secondary fallback: check catalog subjects directly
  for (const catalog of Object.values(CATALOG_REGISTRY)) {
    if (
      normalizeClassLevel(catalog.classLevel) === normLevel &&
      normalizeSubjectName(catalog.subject) === normSubject
    ) {
      return catalog;
    }
  }
  return null;
}

/**
 * Returns all registered curriculum catalogs.
 */
export function listAllCurriculums(): CurriculumCatalog[] {
  // Deduplicate entries by classLevel and subject
  const seen = new Set<string>();
  const results: CurriculumCatalog[] = [];
  for (const catalog of Object.values(CATALOG_REGISTRY)) {
    const key = `${normalizeClassLevel(catalog.classLevel)}:${normalizeSubjectName(catalog.subject)}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(catalog);
    }
  }
  return results;
}

/**
 * Returns the current curriculum version for a class and subject (defaults to "v1.2")
 */
export function getLatestCurriculumVersion(classLevel: string, subject: string): string {
  const catalog = getCurriculumCatalog(classLevel, subject);
  return catalog?.version || catalog?.curriculumVersion || 'v1.2';
}

/**
 * Compares semantic versioning (e.g. "v1.0" < "v1.2")
 */
export function compareCurriculumVersions(a: string, b: string): number {
  const cleanA = a.replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
  const cleanB = b.replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
  const len = Math.max(cleanA.length, cleanB.length);
  for (let i = 0; i < len; i++) {
    const valA = cleanA[i] ?? 0;
    const valB = cleanB[i] ?? 0;
    if (valA > valB) return 1;
    if (valA < valB) return -1;
  }
  return 0;
}

/**
 * Checks if a stored lesson plan is outdated compared to the latest curriculum version.
 */
export function isPlanOutdated(classLevel: string, subject: string, planVersion?: string): boolean {
  if (!planVersion) return true;
  const latestVersion = getLatestCurriculumVersion(classLevel, subject);
  return compareCurriculumVersions(planVersion, latestVersion) < 0;
}

const STOPWORDS = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'class', 'week', 'term', 'that', 'this', 'their', 'of', 'in', 'on', 'at', 'to', 'by']);

function matchesTopicText(candidateTopic: string, queryTopic: string): boolean {
  const cLower = candidateTopic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const qLower = queryTopic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (cLower === qLower || cLower.includes(qLower) || qLower.includes(cLower)) {
    return true;
  }
  const qWords = qLower.split(/[\s,:\-\(\)\/]+/).filter(w => w.length >= 3 && !STOPWORDS.has(w));
  if (qWords.length === 0) return false;
  const matchCount = qWords.filter(w => cLower.includes(w)).length;
  if (qWords.length <= 2) {
    return matchCount === qWords.length;
  }
  return matchCount >= 2 && (matchCount / qWords.length >= 0.5);
}

/**
 * Strict Class Isolation Topic Validation.
 * Enforces that a topic belongs strictly to the requested class catalog and rejects cross-class bleeding.
 */
export function validateTopicInCurriculum(
  classLevel: string,
  subject: string,
  topic: string
): {
  isValid: boolean;
  catalogVersion: string;
  error?: string;
  matchedTopic?: string;
  recommendedTextbook?: CurriculumTextbookMetadata;
} {
  const normLevel = normalizeClassLevel(classLevel);
  const catalog = getCurriculumCatalog(classLevel, subject);

  if (!catalog) {
    // If not yet seeded in standalone JSON catalog, allow with default version stamp
    return {
      isValid: true,
      catalogVersion: 'v1.2',
    };
  }

  const cleanQueryTopic = topic.toLowerCase().trim();
  const currentVersion = catalog.version || catalog.curriculumVersion || 'v1.2';

  // 1. Check if the topic matches any topic in the current class's catalog
  const match = catalog.topics.find(t => matchesTopicText(t.topic, cleanQueryTopic));

  if (match) {
    return {
      isValid: true,
      catalogVersion: currentVersion,
      matchedTopic: match.topic,
      recommendedTextbook: catalog.recommendedTextbook,
    };
  }

  // 2. Check if this topic actually belongs to a DIFFERENT class in the same subject (Class Bleed Detection)
  for (const otherCatalog of Object.values(CATALOG_REGISTRY)) {
    const otherNormLevel = normalizeClassLevel(otherCatalog.classLevel);
    if (otherNormLevel !== normLevel && normalizeSubjectName(otherCatalog.subject) === normalizeSubjectName(subject)) {
      const bleedMatch = otherCatalog.topics.find(t => matchesTopicText(t.topic, cleanQueryTopic));

      if (bleedMatch) {
        return {
          isValid: false,
          catalogVersion: currentVersion,
          error: `Cross-Class Isolation Violation: The topic "${topic}" belongs strictly to ${otherCatalog.classLevel.toUpperCase()} ${otherCatalog.subject}, but was requested for ${normLevel.toUpperCase()}. Cross-class topic bleeding between classes is strictly prohibited by NERDC guidelines.`,
        };
      }
    }
  }

  // 3. Topic is not found in the class catalog
  return {
    isValid: false,
    catalogVersion: currentVersion,
    error: `Topic "${topic}" was not found in the approved ${normLevel.toUpperCase()} ${subject} curriculum (Version ${currentVersion}).`,
  };
}
