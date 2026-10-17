import { createClient, type Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.ts';
import { seedDatabase } from './seed.ts';

let initialUrl = process.env.DATABASE_URL || 'file:local.db';
let initialToken = process.env.DATABASE_AUTH_TOKEN;

// If DATABASE_URL points to Turso/remote but token is missing, fall back to local SQLite to prevent 401 crash
const isRemoteUrl = initialUrl.startsWith('libsql://') || initialUrl.startsWith('https://');
if (isRemoteUrl && !initialToken) {
  console.warn('[DB] DATABASE_URL points to remote Turso but DATABASE_AUTH_TOKEN is not provided. Falling back to file:local.db');
  initialUrl = 'file:local.db';
  initialToken = undefined;
}

let activeClient = createClient({
  url: initialUrl,
  authToken: initialToken,
});

let activeDb = drizzle(activeClient, { schema });

// Export transparent Proxy objects so db and client stay live even if reconnected
export const client: Client = new Proxy({} as Client, {
  get(_, prop: string | symbol) {
    const val = (activeClient as any)[prop];
    return typeof val === 'function' ? val.bind(activeClient) : val;
  },
});

export const db: ReturnType<typeof drizzle> = new Proxy({} as any, {
  get(_, prop: string | symbol) {
    const val = (activeDb as any)[prop];
    return typeof val === 'function' ? val.bind(activeDb) : val;
  },
});

async function runTableDDL(targetClient: Client) {
  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      school_name TEXT DEFAULT 'Federal Government College, Lagos',
      state TEXT DEFAULT 'Lagos',
      lga TEXT DEFAULT 'Ikeja',
      assigned_levels TEXT DEFAULT '["jss-1","jss-2"]',
      assigned_subjects TEXT DEFAULT '["Mathematics","English Studies"]',
      role TEXT DEFAULT 'teacher',
      onboarding_completed_at TEXT,
      streak_count INTEGER DEFAULT 1,
      last_active_date TEXT,
      referral_code TEXT DEFAULT 'EDU-TEACH-2026',
      referred_by TEXT,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_levels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      code TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_subjects (
      id TEXT PRIMARY KEY,
      level_id TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      term_count INTEGER DEFAULT 3
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_topics (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      level_id TEXT NOT NULL,
      term INTEGER NOT NULL,
      week INTEGER NOT NULL,
      topic TEXT NOT NULL,
      subtopics TEXT NOT NULL,
      objectives TEXT NOT NULL,
      teacher_activities TEXT NOT NULL,
      student_activities TEXT NOT NULL,
      materials TEXT NOT NULL,
      evaluation TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS lesson_plans (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      term INTEGER NOT NULL,
      week INTEGER NOT NULL,
      duration TEXT DEFAULT '40 mins',
      previous_knowledge TEXT,
      introduction TEXT,
      teacher_activity TEXT,
      student_activity TEXT,
      evaluation TEXT,
      assignment TEXT,
      reference_materials TEXT,
      objectives TEXT NOT NULL,
      materials TEXT NOT NULL,
      differentiated_instruction TEXT,
      bloom_tags TEXT,
      language TEXT DEFAULT 'en',
      status TEXT DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS lesson_plan_sections (
      id TEXT PRIMARY KEY,
      lesson_plan_id TEXT NOT NULL,
      section_type TEXT NOT NULL,
      content TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size TEXT NOT NULL,
      topic_tag TEXT,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plan TEXT NOT NULL,
      status TEXT NOT NULL,
      kora_reference TEXT NOT NULL,
      amount INTEGER NOT NULL,
      currency TEXT DEFAULT 'NGN',
      start_date TEXT NOT NULL,
      expiry_date TEXT NOT NULL,
      auto_renew INTEGER DEFAULT 1,
      receipt_url TEXT
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'system',
      read INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS schemes_of_work (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      term INTEGER NOT NULL,
      academic_year TEXT DEFAULT '2026/2027',
      weeks_data TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      term INTEGER NOT NULL,
      week INTEGER NOT NULL,
      topic TEXT NOT NULL,
      assessment_type TEXT NOT NULL,
      questions TEXT NOT NULL,
      marking_scheme TEXT NOT NULL,
      school_header TEXT DEFAULT 'Ministry of Basic Education — Term Assessment',
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS grade_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      term INTEGER NOT NULL,
      student_name TEXT NOT NULL,
      student_reg_no TEXT NOT NULL,
      ca1_score INTEGER DEFAULT 0,
      ca2_score INTEGER DEFAULT 0,
      exam_score INTEGER DEFAULT 0,
      total_score INTEGER DEFAULT 0,
      grade_letter TEXT NOT NULL,
      remark TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS timetables (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      level TEXT NOT NULL,
      schedule_data TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS attendance_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      level TEXT NOT NULL,
      class_name TEXT NOT NULL,
      date TEXT NOT NULL,
      present_count INTEGER NOT NULL,
      absent_count INTEGER NOT NULL,
      total_count INTEGER NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL
    );
  `);
}

// Auto-initialize SQLite tables and auto-seed if empty
export async function initDb() {
  try {
    await runTableDDL(activeClient);
  } catch (err: any) {
    console.warn(`[DB] Error initializing on primary URL (${initialUrl}): ${err?.message || err}. Falling back to file:local.db.`);
    activeClient = createClient({ url: 'file:local.db' });
    activeDb = drizzle(activeClient, { schema });
    await runTableDDL(activeClient);
  }

  // Check if curriculum is seeded. If empty, automatically seed!
  try {
    const existingLevels = await db.select().from(schema.curriculumLevels).limit(1);
    if (existingLevels.length === 0) {
      console.log('🌱 Curriculum table is empty. Auto-seeding database...');
      await seedDatabase();
    }
  } catch (err) {
    console.warn('[DB] Auto-seed check warning:', err);
  }
}
