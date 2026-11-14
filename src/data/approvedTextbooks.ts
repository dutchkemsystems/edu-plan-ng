/**
 * Official Government-Approved Textbooks & Author Registry (NERDC & Lagos State OEQA)
 * 
 * Statutory compliance list for Nigerian Basic and Senior Secondary Education.
 * Every lesson plan generated or evaluated must cite the exact approved textbook and author.
 */

export interface ApprovedTextbookRecord {
  id: string;
  classLevel: string; // 'jss-1', 'jss-2', 'jss-3', 'sss-1', 'sss-2', 'sss-3'
  subject: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  isGovernmentApproved: number; // 1 = true
  approvedBy: string;
  approvalDate: string;
  isbn?: string;
}

export const APPROVED_TEXTBOOKS: ApprovedTextbookRecord[] = [
  // --- JUNIOR SECONDARY MATHEMATICS ---
  {
    id: 'tb_jss1_mth_01',
    classLevel: 'jss-1',
    subject: 'Mathematics',
    title: 'New General Mathematics for Junior Secondary Schools 1',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc (in association with Pearson Education)',
    edition: '5th Edition (NERDC Aligned)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic and Secondary Education (OEQA)',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-444-6'
  },
  {
    id: 'tb_jss2_mth_01',
    classLevel: 'jss-2',
    subject: 'Mathematics',
    title: 'New General Mathematics for Junior Secondary Schools 2',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc',
    edition: '5th Edition (NERDC Aligned)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic and Secondary Education (OEQA)',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-445-3'
  },
  {
    id: 'tb_jss3_mth_01',
    classLevel: 'jss-3',
    subject: 'Mathematics',
    title: 'New General Mathematics for Junior Secondary Schools 3',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc',
    edition: '5th Edition (NERDC Aligned)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic and Secondary Education (OEQA)',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-446-0'
  },

  // --- SENIOR SECONDARY GENERAL MATHEMATICS ---
  {
    id: 'tb_sss1_gmth_01',
    classLevel: 'sss-1',
    subject: 'General Mathematics',
    title: 'New General Mathematics for Senior Secondary Schools 1',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc',
    edition: '4th Edition (WASSCE / NECO Compliant)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-501-6'
  },
  {
    id: 'tb_sss2_gmth_01',
    classLevel: 'sss-2',
    subject: 'General Mathematics',
    title: 'New General Mathematics for Senior Secondary Schools 2',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc',
    edition: '4th Edition (WASSCE / NECO Compliant)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-502-3'
  },
  {
    id: 'tb_sss3_gmth_01',
    classLevel: 'sss-3',
    subject: 'General Mathematics',
    title: 'New General Mathematics for Senior Secondary Schools 3',
    author: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima, G.U. Garba',
    publisher: 'Learn Africa Plc',
    edition: '4th Edition (WASSCE / NECO Compliant)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-15',
    isbn: '978-978-139-503-0'
  },

  // --- JUNIOR SECONDARY ENGLISH STUDIES ---
  {
    id: 'tb_jss1_eng_01',
    classLevel: 'jss-1',
    subject: 'English Studies',
    title: 'Junior English Project for Junior Secondary Schools 1',
    author: 'N. Grant, D. Babalola, S. Nnamonu',
    publisher: 'Pearson Education / Learn Africa Plc',
    edition: 'Revised 3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-10',
    isbn: '978-058-202-341-2'
  },
  {
    id: 'tb_jss2_eng_01',
    classLevel: 'jss-2',
    subject: 'English Studies',
    title: 'Junior English Project for Junior Secondary Schools 2',
    author: 'N. Grant, D. Babalola, S. Nnamonu',
    publisher: 'Pearson Education / Learn Africa Plc',
    edition: 'Revised 3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-10',
    isbn: '978-058-202-342-9'
  },
  {
    id: 'tb_jss3_eng_01',
    classLevel: 'jss-3',
    subject: 'English Studies',
    title: 'Junior English Project for Junior Secondary Schools 3',
    author: 'N. Grant, D. Babalola, S. Nnamonu',
    publisher: 'Pearson Education / Learn Africa Plc',
    edition: 'Revised 3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-10',
    isbn: '978-058-202-343-6'
  },

  // --- SENIOR SECONDARY ENGLISH LANGUAGE ---
  {
    id: 'tb_sss1_eng_01',
    classLevel: 'sss-1',
    subject: 'English Language',
    title: 'Intensive English for Senior Secondary Schools 1',
    author: 'B.O. Oluikpe, J.O.J. Nwachukwu-Agbada, et al.',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: '3rd Edition (WASSCE Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-10',
    isbn: '978-175-120-112-9'
  },
  {
    id: 'tb_sss2_eng_01',
    classLevel: 'sss-2',
    subject: 'English Language',
    title: 'Intensive English for Senior Secondary Schools 2',
    author: 'B.O. Oluikpe, J.O.J. Nwachukwu-Agbada, et al.',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: '3rd Edition (WASSCE Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-10',
    isbn: '978-175-120-113-6'
  },
  {
    id: 'tb_sss3_eng_01',
    classLevel: 'sss-3',
    subject: 'English Language',
    title: 'Countdown to WASSCE/SSCE English Language',
    author: 'J.O. Ogunsanwo, B.A. Adeyemi, et al.',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: 'Updated Exam Prep Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-10',
    isbn: '978-020-410-098-1'
  },

  // --- BASIC SCIENCE (JSS 1-3) ---
  {
    id: 'tb_jss1_bsc_01',
    classLevel: 'jss-1',
    subject: 'Basic Science',
    title: 'STAN Basic Science for Junior Secondary Schools 1',
    author: 'Science Teachers Association of Nigeria (STAN) Curriculum Team',
    publisher: 'HEBN Publishers Plc / University Press Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-301-4'
  },
  {
    id: 'tb_jss2_bsc_01',
    classLevel: 'jss-2',
    subject: 'Basic Science',
    title: 'STAN Basic Science for Junior Secondary Schools 2',
    author: 'Science Teachers Association of Nigeria (STAN) Curriculum Team',
    publisher: 'HEBN Publishers Plc / University Press Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-302-1'
  },
  {
    id: 'tb_jss3_bsc_01',
    classLevel: 'jss-3',
    subject: 'Basic Science',
    title: 'STAN Basic Science for Junior Secondary Schools 3',
    author: 'Science Teachers Association of Nigeria (STAN) Curriculum Team',
    publisher: 'HEBN Publishers Plc / University Press Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-303-8'
  },

  // --- BIOLOGY (SSS 1-3) ---
  {
    id: 'tb_sss1_bio_01',
    classLevel: 'sss-1',
    subject: 'Biology',
    title: 'Essential Biology for Senior Secondary Schools (SSS 1)',
    author: 'M.C. Michael',
    publisher: 'Tonad Publishers Limited',
    edition: '7th Revised Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-03-01',
    isbn: '978-978-081-222-2'
  },
  {
    id: 'tb_sss2_bio_01',
    classLevel: 'sss-2',
    subject: 'Biology',
    title: 'Essential Biology for Senior Secondary Schools (SSS 2)',
    author: 'M.C. Michael',
    publisher: 'Tonad Publishers Limited',
    edition: '7th Revised Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-03-01',
    isbn: '978-978-081-223-9'
  },
  {
    id: 'tb_sss3_bio_01',
    classLevel: 'sss-3',
    subject: 'Biology',
    title: 'Modern Biology for Senior Secondary Schools',
    author: 'S.T. Ramalingam',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: '6th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-03-01',
    isbn: '978-175-102-441-4'
  },

  // --- CHEMISTRY (SSS 1-3) ---
  {
    id: 'tb_sss1_chm_01',
    classLevel: 'sss-1',
    subject: 'Chemistry',
    title: 'New School Chemistry for Senior Secondary Schools',
    author: 'Osei Yaw Ababio',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-30',
    isbn: '978-175-015-882-0'
  },
  {
    id: 'tb_sss2_chm_01',
    classLevel: 'sss-2',
    subject: 'Chemistry',
    title: 'Essential Chemistry for Senior Secondary Schools',
    author: 'I.A. Odesina',
    publisher: 'Tonad Publishers Limited',
    edition: '5th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-30',
    isbn: '978-978-081-554-1'
  },
  {
    id: 'tb_sss3_chm_01',
    classLevel: 'sss-3',
    subject: 'Chemistry',
    title: 'New School Chemistry for Senior Secondary Schools (Advanced Modules)',
    author: 'Osei Yaw Ababio',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-30',
    isbn: '978-175-015-883-7'
  },

  // --- PHYSICS (SSS 1-3) ---
  {
    id: 'tb_sss1_phy_01',
    classLevel: 'sss-1',
    subject: 'Physics',
    title: 'New School Physics for Senior Secondary Schools',
    author: 'M.W. Anyakoha',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: '5th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-15',
    isbn: '978-175-104-120-6'
  },
  {
    id: 'tb_sss2_phy_01',
    classLevel: 'sss-2',
    subject: 'Physics',
    title: 'Senior Secondary Physics (Volume 2)',
    author: 'P.N. Okeke, M.W. Anyakoha',
    publisher: 'Macmillan Nigeria Publishers',
    edition: 'Revised Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-15',
    isbn: '978-033-339-440-1'
  },
  {
    id: 'tb_sss3_phy_01',
    classLevel: 'sss-3',
    subject: 'Physics',
    title: 'New School Physics for Senior Secondary Schools (SS 3)',
    author: 'M.W. Anyakoha',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: '5th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-15',
    isbn: '978-175-104-121-3'
  },

  // --- ECONOMICS (SSS 1-3) ---
  {
    id: 'tb_sss1_eco_01',
    classLevel: 'sss-1',
    subject: 'Economics',
    title: 'Comprehensive Economics for Senior Secondary Schools',
    author: 'J.U. Anyaele',
    publisher: 'Johnson Publishers Ltd',
    edition: '6th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-978-311-200-5'
  },
  {
    id: 'tb_sss2_eco_01',
    classLevel: 'sss-2',
    subject: 'Economics',
    title: 'Essential Economics for Senior Secondary Schools',
    author: 'C.E. Ande',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-432-8'
  },
  {
    id: 'tb_sss3_eco_01',
    classLevel: 'sss-3',
    subject: 'Economics',
    title: 'Comprehensive Economics for Senior Secondary Schools (Final Exam Series)',
    author: 'J.U. Anyaele',
    publisher: 'Johnson Publishers Ltd',
    edition: '6th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-978-311-201-2'
  },

  // --- BASIC TECHNOLOGY (JSS 1-3) ---
  {
    id: 'tb_jss1_btech_01',
    classLevel: 'jss-1',
    subject: 'Basic Technology',
    title: 'Basic Technology for Junior Secondary Schools 1',
    author: 'G.N. Nneji, J.E. Ekpenyong, S.A. Odewumi',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-18',
    isbn: '978-020-330-112-4'
  },
  {
    id: 'tb_jss2_btech_01',
    classLevel: 'jss-2',
    subject: 'Basic Technology',
    title: 'Basic Technology for Junior Secondary Schools 2',
    author: 'G.N. Nneji, J.E. Ekpenyong, S.A. Odewumi',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-18',
    isbn: '978-020-330-113-1'
  },
  {
    id: 'tb_jss3_btech_01',
    classLevel: 'jss-3',
    subject: 'Basic Technology',
    title: 'Basic Technology for Junior Secondary Schools 3',
    author: 'G.N. Nneji, J.E. Ekpenyong, S.A. Odewumi',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-18',
    isbn: '978-020-330-114-8'
  },

  // --- AGRICULTURAL SCIENCE (JSS 1-3 & SSS 1-3) ---
  {
    id: 'tb_jss1_agr_01',
    classLevel: 'jss-1',
    subject: 'Agricultural Science',
    title: 'Junior Secondary Agricultural Science 1',
    author: 'O. Akinsanmi',
    publisher: 'Longman Nigeria Plc',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-058-258-201-9'
  },
  {
    id: 'tb_jss2_agr_01',
    classLevel: 'jss-2',
    subject: 'Agricultural Science',
    title: 'Junior Secondary Agricultural Science 2',
    author: 'O. Akinsanmi',
    publisher: 'Longman Nigeria Plc',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-058-258-202-6'
  },
  {
    id: 'tb_jss3_agr_01',
    classLevel: 'jss-3',
    subject: 'Agricultural Science',
    title: 'Junior Secondary Agricultural Science 3',
    author: 'O. Akinsanmi',
    publisher: 'Longman Nigeria Plc',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-058-258-203-3'
  },
  {
    id: 'tb_sss1_agr_01',
    classLevel: 'sss-1',
    subject: 'Agricultural Science',
    title: 'Senior Secondary Agricultural Science',
    author: 'O. Akinsanmi',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '5th Edition (WAEC/NECO Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-020-410-555-8'
  },
  {
    id: 'tb_sss2_agr_01',
    classLevel: 'sss-2',
    subject: 'Agricultural Science',
    title: 'Essential Agricultural Science for Senior Secondary Schools',
    author: 'O.A. Iwena',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-978-081-778-9'
  },
  {
    id: 'tb_sss3_agr_01',
    classLevel: 'sss-3',
    subject: 'Agricultural Science',
    title: 'Comprehensive Agricultural Science for Senior Secondary Schools',
    author: 'A.N. Ojo, E.O. Taiwo',
    publisher: 'University Press Plc',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-05',
    isbn: '978-978-030-881-2'
  },

  // --- CIVIC EDUCATION (JSS 1-3 & SSS 1-3) ---
  {
    id: 'tb_jss1_civ_01',
    classLevel: 'jss-1',
    subject: 'Civic Education',
    title: 'Civic Education for Junior Secondary Schools 1',
    author: 'R.W. Okunloye, B.E. Udoh',
    publisher: 'Rasmed Publications Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-401-1'
  },
  {
    id: 'tb_jss2_civ_01',
    classLevel: 'jss-2',
    subject: 'Civic Education',
    title: 'Civic Education for Junior Secondary Schools 2',
    author: 'R.W. Okunloye, B.E. Udoh',
    publisher: 'Rasmed Publications Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-402-8'
  },
  {
    id: 'tb_jss3_civ_01',
    classLevel: 'jss-3',
    subject: 'Civic Education',
    title: 'Civic Education for Junior Secondary Schools 3',
    author: 'R.W. Okunloye, B.E. Udoh',
    publisher: 'Rasmed Publications Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Basic Education',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-403-5'
  },
  {
    id: 'tb_sss1_civ_01',
    classLevel: 'sss-1',
    subject: 'Civic Education',
    title: 'Civic Education for Senior Secondary Schools 1',
    author: 'R.W. Okunloye, S.N. Opara',
    publisher: 'Rasmed Publications Limited',
    edition: '4th Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-510-0'
  },
  {
    id: 'tb_sss2_civ_01',
    classLevel: 'sss-2',
    subject: 'Civic Education',
    title: 'Civic Education for Senior Secondary Schools 2',
    author: 'R.W. Okunloye, S.N. Opara',
    publisher: 'Rasmed Publications Limited',
    edition: '4th Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-511-7'
  },
  {
    id: 'tb_sss3_civ_01',
    classLevel: 'sss-3',
    subject: 'Civic Education',
    title: 'Civic Education for Senior Secondary Schools 3',
    author: 'R.W. Okunloye, S.N. Opara',
    publisher: 'Rasmed Publications Limited',
    edition: '4th Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-25',
    isbn: '978-978-812-512-4'
  },

  // --- SOCIAL STUDIES (JSS 1-3) ---
  {
    id: 'tb_jss1_sos_01',
    classLevel: 'jss-1',
    subject: 'Social Studies',
    title: 'Social Studies for Junior Secondary Schools 1',
    author: 'Dayo Olagunju, F.A. Adebayo',
    publisher: 'Longman Nigeria Plc',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-10',
    isbn: '978-058-232-110-4'
  },
  {
    id: 'tb_jss2_sos_01',
    classLevel: 'jss-2',
    subject: 'Social Studies',
    title: 'Social Studies for Junior Secondary Schools 2',
    author: 'Dayo Olagunju, F.A. Adebayo',
    publisher: 'Longman Nigeria Plc',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-10',
    isbn: '978-058-232-111-1'
  },
  {
    id: 'tb_jss3_sos_01',
    classLevel: 'jss-3',
    subject: 'Social Studies',
    title: 'Social Studies for Junior Secondary Schools 3',
    author: 'Dayo Olagunju, F.A. Adebayo',
    publisher: 'Longman Nigeria Plc',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-10',
    isbn: '978-058-232-112-8'
  },

  // --- BUSINESS STUDIES (JSS 1-3) ---
  {
    id: 'tb_jss1_bus_01',
    classLevel: 'jss-1',
    subject: 'Business Studies',
    title: 'WABP Business Studies for Junior Secondary Schools 1',
    author: 'Egbe T. Ehiametalor, K.A. Awoyinfa, et al.',
    publisher: 'West African Book Publishers (WABP) Ltd',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-12',
    isbn: '978-153-098-441-2'
  },
  {
    id: 'tb_jss2_bus_01',
    classLevel: 'jss-2',
    subject: 'Business Studies',
    title: 'WABP Business Studies for Junior Secondary Schools 2',
    author: 'Egbe T. Ehiametalor, K.A. Awoyinfa, et al.',
    publisher: 'West African Book Publishers (WABP) Ltd',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-12',
    isbn: '978-153-098-442-9'
  },
  {
    id: 'tb_jss3_bus_01',
    classLevel: 'jss-3',
    subject: 'Business Studies',
    title: 'WABP Business Studies for Junior Secondary Schools 3',
    author: 'Egbe T. Ehiametalor, K.A. Awoyinfa, et al.',
    publisher: 'West African Book Publishers (WABP) Ltd',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-12',
    isbn: '978-153-098-443-6'
  },

  // --- HOME ECONOMICS (JSS 1-3) ---
  {
    id: 'tb_jss1_hec_01',
    classLevel: 'jss-1',
    subject: 'Home Economics',
    title: 'Home Economics for Junior Secondary Schools 1',
    author: 'Elizabeth Anyakoha',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-14',
    isbn: '978-175-088-210-9'
  },
  {
    id: 'tb_jss2_hec_01',
    classLevel: 'jss-2',
    subject: 'Home Economics',
    title: 'Home Economics for Junior Secondary Schools 2',
    author: 'Elizabeth Anyakoha',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-14',
    isbn: '978-175-088-211-6'
  },
  {
    id: 'tb_jss3_hec_01',
    classLevel: 'jss-3',
    subject: 'Home Economics',
    title: 'Home Economics for Junior Secondary Schools 3',
    author: 'Elizabeth Anyakoha',
    publisher: 'Africana First Publishers (AFP) Plc',
    edition: 'Revised Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-02-14',
    isbn: '978-175-088-212-3'
  },

  // --- COMPUTER STUDIES (JSS 1-3) & DATA PROCESSING (SSS 1-3) ---
  {
    id: 'tb_jss1_cmp_01',
    classLevel: 'jss-1',
    subject: 'Computer Studies',
    title: 'Computer Studies for Junior Secondary Schools 1',
    author: 'O.A. Otuka, S.S. Iloanusi, et al.',
    publisher: 'Spectrum Books Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-029-612-4'
  },
  {
    id: 'tb_jss2_cmp_01',
    classLevel: 'jss-2',
    subject: 'Computer Studies',
    title: 'Computer Studies for Junior Secondary Schools 2',
    author: 'O.A. Otuka, S.S. Iloanusi, et al.',
    publisher: 'Spectrum Books Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-029-613-1'
  },
  {
    id: 'tb_jss3_cmp_01',
    classLevel: 'jss-3',
    subject: 'Computer Studies',
    title: 'Computer Studies for Junior Secondary Schools 3',
    author: 'O.A. Otuka, S.S. Iloanusi, et al.',
    publisher: 'Spectrum Books Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-029-614-8'
  },
  {
    id: 'tb_sss1_dpr_01',
    classLevel: 'sss-1',
    subject: 'Data Processing & ICT',
    title: 'Data Processing for Senior Secondary Schools 1',
    author: 'O.A. Otuka, J.A. Balogun',
    publisher: 'Learn Africa Plc',
    edition: '2nd Edition (WAEC/NECO Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-139-661-7'
  },
  {
    id: 'tb_sss2_dpr_01',
    classLevel: 'sss-2',
    subject: 'Data Processing & ICT',
    title: 'Data Processing for Senior Secondary Schools 2',
    author: 'O.A. Otuka, J.A. Balogun',
    publisher: 'Learn Africa Plc',
    edition: '2nd Edition (WAEC/NECO Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-139-662-4'
  },
  {
    id: 'tb_sss3_dpr_01',
    classLevel: 'sss-3',
    subject: 'Data Processing & ICT',
    title: 'Data Processing for Senior Secondary Schools 3',
    author: 'O.A. Otuka, J.A. Balogun',
    publisher: 'Learn Africa Plc',
    edition: '2nd Edition (WAEC/NECO Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-22',
    isbn: '978-978-139-663-1'
  },

  // --- TECHNICAL DRAWING (SSS 1-3) ---
  {
    id: 'tb_sss1_td_01',
    classLevel: 'sss-1',
    subject: 'Technical Drawing',
    title: 'Technical Drawing for Senior Secondary Schools (Book 1)',
    author: 'J.N. Green',
    publisher: 'Spectrum Books Limited',
    edition: 'Metric Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-18',
    isbn: '978-024-553-112-3'
  },
  {
    id: 'tb_sss2_td_01',
    classLevel: 'sss-2',
    subject: 'Technical Drawing',
    title: 'Technical Drawing for Senior Secondary Schools (Book 2)',
    author: 'J.N. Green',
    publisher: 'Spectrum Books Limited',
    edition: 'Metric Edition 2024',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-18',
    isbn: '978-024-553-113-0'
  },
  {
    id: 'tb_sss3_td_01',
    classLevel: 'sss-3',
    subject: 'Technical Drawing',
    title: 'Geometrical and Engineering Drawing for Senior Secondary Schools',
    author: 'K. Morling',
    publisher: 'Edward Arnold / Learn Africa',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-18',
    isbn: '978-071-313-221-8'
  },

  // --- FURTHER MATHEMATICS (SSS 1-3) ---
  {
    id: 'tb_sss1_fmth_01',
    classLevel: 'sss-1',
    subject: 'Further Mathematics',
    title: 'Further Mathematics Project 1',
    author: 'M.R. Tuttuh-Adegun, D. Godspower Adegoke',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-28',
    isbn: '978-020-410-662-3'
  },
  {
    id: 'tb_sss2_fmth_01',
    classLevel: 'sss-2',
    subject: 'Further Mathematics',
    title: 'Further Mathematics Project 2',
    author: 'M.R. Tuttuh-Adegun, D. Godspower Adegoke',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-28',
    isbn: '978-020-410-663-0'
  },
  {
    id: 'tb_sss3_fmth_01',
    classLevel: 'sss-3',
    subject: 'Further Mathematics',
    title: 'Further Mathematics Project 3',
    author: 'M.R. Tuttuh-Adegun, D. Godspower Adegoke',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: '3rd Edition (NERDC Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-28',
    isbn: '978-020-410-664-7'
  },

  // --- GOVERNMENT (SSS 1-3) ---
  {
    id: 'tb_sss1_gov_01',
    classLevel: 'sss-1',
    subject: 'Government',
    title: 'Essential Government for Senior Secondary Schools 1',
    author: 'Dibie C. Chris',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-12',
    isbn: '978-978-081-331-1'
  },
  {
    id: 'tb_sss2_gov_01',
    classLevel: 'sss-2',
    subject: 'Government',
    title: 'Essential Government for Senior Secondary Schools 2',
    author: 'Dibie C. Chris',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-12',
    isbn: '978-978-081-332-8'
  },
  {
    id: 'tb_sss3_gov_01',
    classLevel: 'sss-3',
    subject: 'Government',
    title: 'Comprehensive Government for Senior Secondary Schools',
    author: 'J.U. Anyaele',
    publisher: 'Johnson Publishers Ltd',
    edition: '5th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-12',
    isbn: '978-978-311-401-6'
  },

  // --- FINANCIAL ACCOUNTING (SSS 1-3) ---
  {
    id: 'tb_sss1_acc_01',
    classLevel: 'sss-1',
    subject: 'Financial Accounting',
    title: 'Essential Financial Accounting for Senior Secondary Schools 1',
    author: 'R.A. Ibrahim, O.A. Longe',
    publisher: 'Tonad Publishers Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-440-3'
  },
  {
    id: 'tb_sss2_acc_01',
    classLevel: 'sss-2',
    subject: 'Financial Accounting',
    title: 'Essential Financial Accounting for Senior Secondary Schools 2',
    author: 'R.A. Ibrahim, O.A. Longe',
    publisher: 'Tonad Publishers Limited',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-978-081-441-0'
  },
  {
    id: 'tb_sss3_acc_01',
    classLevel: 'sss-3',
    subject: 'Financial Accounting',
    title: 'Simplified Book-keeping and Accounting for Senior Secondary Schools',
    author: 'F. Wood, A. Sangster',
    publisher: 'Pearson / Learn Africa',
    edition: 'International Nigerian Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-20',
    isbn: '978-027-371-120-4'
  },

  // --- COMMERCE (SSS 1-3) ---
  {
    id: 'tb_sss1_com_01',
    classLevel: 'sss-1',
    subject: 'Commerce',
    title: 'Essential Commerce for Senior Secondary Schools 1',
    author: 'O.A. Longe',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-24',
    isbn: '978-978-081-280-2'
  },
  {
    id: 'tb_sss2_com_01',
    classLevel: 'sss-2',
    subject: 'Commerce',
    title: 'Essential Commerce for Senior Secondary Schools 2',
    author: 'O.A. Longe',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-24',
    isbn: '978-978-081-281-9'
  },
  {
    id: 'tb_sss3_com_01',
    classLevel: 'sss-3',
    subject: 'Commerce',
    title: 'Senior Secondary Commerce for West Africa',
    author: 'P.E. Agbonlahor, M.O. Okolo',
    publisher: 'Longman Nigeria Plc',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-24',
    isbn: '978-058-258-441-9'
  },

  // --- GEOGRAPHY (SSS 1-3) ---
  {
    id: 'tb_sss1_geo_01',
    classLevel: 'sss-1',
    subject: 'Geography',
    title: 'Essential Geography for Senior Secondary Schools 1',
    author: 'O.A. Iwena',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-08',
    isbn: '978-978-081-610-4'
  },
  {
    id: 'tb_sss2_geo_01',
    classLevel: 'sss-2',
    subject: 'Geography',
    title: 'Essential Geography for Senior Secondary Schools 2',
    author: 'O.A. Iwena',
    publisher: 'Tonad Publishers Limited',
    edition: '4th Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-08',
    isbn: '978-978-081-611-1'
  },
  {
    id: 'tb_sss3_geo_01',
    classLevel: 'sss-3',
    subject: 'Geography',
    title: 'A Regional Geography of Africa',
    author: 'N.P. Iloeje',
    publisher: 'Heinemann Educational Books (Nigeria) Plc',
    edition: 'New Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-08',
    isbn: '978-978-129-331-2'
  },

  // --- LITERATURE-IN-ENGLISH (SSS 1-3) ---
  {
    id: 'tb_sss1_lit_01',
    classLevel: 'sss-1',
    subject: 'Literature-in-English',
    title: 'Exam Focus: Literature in English for WASSCE & SSCE',
    author: 'J.O.J. Nwachukwu-Agbada, F.U. Mowah, et al.',
    publisher: 'University Press Plc',
    edition: 'Prescribed WAEC Syllabus Edition (2021-2025)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & WAEC Syllabus Committee',
    approvalDate: '2024-01-14',
    isbn: '978-978-030-990-1'
  },
  {
    id: 'tb_sss2_lit_01',
    classLevel: 'sss-2',
    subject: 'Literature-in-English',
    title: 'A Selection of African Poetry and Drama (WAEC Approved)',
    author: 'K.E. Senanu, T. Vincent',
    publisher: 'Longman Group Ltd',
    edition: 'Harmonized Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & WAEC Syllabus Committee',
    approvalDate: '2024-01-14',
    isbn: '978-058-264-210-2'
  },
  {
    id: 'tb_sss3_lit_01',
    classLevel: 'sss-3',
    subject: 'Literature-in-English',
    title: 'A Handbook of African and Non-African Prose for Senior Schools',
    author: 'J.A. Adegoke',
    publisher: 'Evans Brothers (Nigeria Publishers) Ltd',
    edition: 'Final Review Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & WAEC Syllabus Committee',
    approvalDate: '2024-01-14',
    isbn: '978-020-410-880-1'
  },

  // --- MARKETING & SALESMANSHIP (SSS 1-3) ---
  {
    id: 'tb_sss1_mkt_01',
    classLevel: 'sss-1',
    subject: 'Marketing & Salesmanship',
    title: 'Marketing for Senior Secondary Schools 1',
    author: 'S.O. Onu, C.N. Agwu',
    publisher: 'Melrose Books and Publishing Limited',
    edition: '2nd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-20',
    isbn: '978-978-843-112-6'
  },
  {
    id: 'tb_sss2_mkt_01',
    classLevel: 'sss-2',
    subject: 'Marketing & Salesmanship',
    title: 'Marketing for Senior Secondary Schools 2',
    author: 'S.O. Onu, C.N. Agwu',
    publisher: 'Melrose Books and Publishing Limited',
    edition: '2nd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-20',
    isbn: '978-978-843-113-3'
  },
  {
    id: 'tb_sss3_mkt_01',
    classLevel: 'sss-3',
    subject: 'Marketing & Salesmanship',
    title: 'Marketing for Senior Secondary Schools 3',
    author: 'S.O. Onu, C.N. Agwu',
    publisher: 'Melrose Books and Publishing Limited',
    edition: '2nd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-02-20',
    isbn: '978-978-843-114-0'
  },

  // --- HISTORY & HERITAGE STUDIES (SSS 1-3) ---
  {
    id: 'tb_sss1_his_01',
    classLevel: 'sss-1',
    subject: 'History & Heritage Studies',
    title: 'Groundwork of Nigerian History',
    author: 'Obaro Ikime (Historical Society of Nigeria)',
    publisher: 'Heinemann Educational Books (Nigeria) Plc',
    edition: 'National Heritage Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-10',
    isbn: '978-978-129-954-3'
  },
  {
    id: 'tb_sss2_his_01',
    classLevel: 'sss-2',
    subject: 'History & Heritage Studies',
    title: 'A History of Nigeria (Colonial and Pre-Colonial Eras)',
    author: 'Toyin Falola, Matthew M. Heaton',
    publisher: 'Cambridge University Press / University Press Plc',
    edition: 'Revised Nigerian Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-10',
    isbn: '978-052-168-157-5'
  },
  {
    id: 'tb_sss3_his_01',
    classLevel: 'sss-3',
    subject: 'History & Heritage Studies',
    title: 'History of West Africa (Volume 2): The 19th and 20th Centuries',
    author: 'J.F. Ade Ajayi, Michael Crowder',
    publisher: 'Longman Group Ltd',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-10',
    isbn: '978-058-264-519-6'
  },

  // --- CHRISTIAN RELIGIOUS STUDIES (JSS & SSS) ---
  {
    id: 'tb_jss1_crs_01',
    classLevel: 'jss-1',
    subject: 'Christian Religious Studies',
    title: 'Christian Religious Knowledge for Junior Secondary Schools 1',
    author: 'T.N.O. Quarcoopome, E.O. Babalola',
    publisher: 'African Universities Press',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-15',
    isbn: '978-978-148-112-2'
  },
  {
    id: 'tb_sss1_crs_01',
    classLevel: 'sss-1',
    subject: 'Christian Religious Studies',
    title: 'Christian Religious Knowledge for Senior Secondary Schools',
    author: 'T.N.O. Quarcoopome',
    publisher: 'African Universities Press',
    edition: '4th Edition (WASSCE Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-15',
    isbn: '978-978-148-220-4'
  },

  // --- ISLAMIC RELIGIOUS STUDIES (JSS & SSS) ---
  {
    id: 'tb_jss1_irs_01',
    classLevel: 'jss-1',
    subject: 'Islamic Religious Studies',
    title: 'Islamic Studies for Junior Secondary Schools 1',
    author: 'M.O.A. Abdul, B.A. Lemu',
    publisher: 'Islamic Publications Bureau',
    edition: '3rd Edition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-15',
    isbn: '978-978-249-110-8'
  },
  {
    id: 'tb_sss1_irs_01',
    classLevel: 'sss-1',
    subject: 'Islamic Religious Studies',
    title: 'Islamic Studies for Senior Secondary Schools',
    author: 'B. Aisha Lemu',
    publisher: 'Islamic Education Trust / Islamic Publications Bureau',
    edition: '4th Edition (WASSCE Standard)',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State OEQA',
    approvalDate: '2024-01-15',
    isbn: '978-978-249-221-1'
  },

  // --- NIGERIAN LANGUAGES: YORÙBÁ, IGBO, HAUSA ---
  {
    id: 'tb_jss1_yor_01',
    classLevel: 'jss-1',
    subject: 'Èdè Yorùbá',
    title: 'Káàrọ̀ Oòduà: Ẹ̀kọ́ Èdè Yorùbá Titun fún Ilé-Ẹ̀kọ́ Gíga Kékeré 1',
    author: 'Olúyẹmisí Adébọ̀wálé, Ọládélé Awóbùlúyì',
    publisher: 'University Press Plc',
    edition: 'Àtúnṣe Kẹta',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-18',
    isbn: '978-978-030-412-8'
  },
  {
    id: 'tb_jss1_igb_01',
    classLevel: 'jss-1',
    subject: 'Asụsụ Igbo',
    title: 'Ụtọasụsụ na Agụmagụ Igbo Maka Ndị Nta 1',
    author: 'F.C. Ogbalu, E.N. Emenanjo',
    publisher: 'Varsity Press Limited / University Publishing Co',
    edition: 'Mbipụta Nke Anọ',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-18',
    isbn: '978-978-160-221-3'
  },
  {
    id: 'tb_jss1_hau_01',
    classLevel: 'jss-1',
    subject: 'Harshen Hausa',
    title: 'Koyar Da Harshen Hausa A Sauƙaƙe don Ƙananan Makarantun Sakandare 1',
    author: 'Dalhatu Muhammad, Bello Sa\'id',
    publisher: 'Northern Nigerian Publishing Company (NNPC)',
    edition: 'Buga Na Uku',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-18',
    isbn: '978-978-135-224-8'
  },

  // --- FRENCH LANGUAGE ---
  {
    id: 'tb_jss1_fre_01',
    classLevel: 'jss-1',
    subject: 'French Language',
    title: 'Transafrique: Méthode de Français pour le Nigeria (Livre 1)',
    author: 'Nicole McBride, Siméon Ahouandjinou, et al.',
    publisher: 'Longman Nigeria Plc',
    edition: 'Nouvelle Édition',
    isGovernmentApproved: 1,
    approvedBy: 'NERDC & Lagos State Ministry of Education',
    approvalDate: '2024-01-20',
    isbn: '978-058-258-710-6'
  }
];

/**
 * Look up approved textbook metadata for a given class level and subject.
 */
export function getApprovedTextbookForSubject(classLevel: string, subject: string): ApprovedTextbookRecord | null {
  const normLevel = classLevel.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanLevel = normLevel === 'jss1' ? 'jss-1' :
                     normLevel === 'jss2' ? 'jss-2' :
                     normLevel === 'jss3' ? 'jss-3' :
                     normLevel === 'sss1' ? 'sss-1' :
                     normLevel === 'sss2' ? 'sss-2' :
                     normLevel === 'sss3' ? 'sss-3' : classLevel.toLowerCase().trim();

  const normSubject = subject.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[-_]/g, ' ')
    .replace(/&/g, 'and');

  // Exact match
  const match = APPROVED_TEXTBOOKS.find(tb => {
    const tbLevel = tb.classLevel.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reqLevel = cleanLevel.replace(/[^a-z0-9]/g, '');
    if (tbLevel !== reqLevel) return false;

    const tbSub = tb.subject.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/[-_]/g, ' ')
      .replace(/&/g, 'and');

    return tbSub === normSubject || tbSub.includes(normSubject) || normSubject.includes(tbSub);
  });

  if (match) return match;

  // Fallback: match by subject across any class if specific class not found
  const fallback = APPROVED_TEXTBOOKS.find(tb => {
    const tbSub = tb.subject.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/[-_]/g, ' ')
      .replace(/&/g, 'and');

    const isClassCategoryMatch =
      (cleanLevel.startsWith('jss') && tb.classLevel.startsWith('jss')) ||
      (cleanLevel.startsWith('sss') && tb.classLevel.startsWith('sss'));

    return isClassCategoryMatch && (tbSub === normSubject || tbSub.includes(normSubject) || normSubject.includes(tbSub));
  });

  return fallback || null;
}
