import { createClient, type Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.ts';
import { seedDatabase } from './seed.ts';

let initialUrl = process.env.DATABASE_URL || 'file:local.db';
let initialToken = process.env.DATABASE_AUTH_TOKEN;

if (initialUrl.includes('dutchkem-edu-plan-platform')) {
  initialUrl = 'file:local.db';
  initialToken = undefined;
}

const isRemoteUrl = initialUrl.startsWith('libsql://') || initialUrl.startsWith('https://');
if (isRemoteUrl && !initialToken) {
  console.log('[DB] DATABASE_URL points to remote Turso without auth token. Defaulting to file:local.db');
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
    CREATE TABLE IF NOT EXISTS schools (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      b2b_tier TEXT NOT NULL DEFAULT 'bronze',
      state TEXT DEFAULT 'Lagos',
      lga TEXT DEFAULT 'Ikeja',
      admin_user_id TEXT,
      max_teachers INTEGER DEFAULT 15,
      status TEXT DEFAULT 'active',
      subscription_plan TEXT DEFAULT 'bronze',
      subscription_expires_at TEXT,
      virtual_account_number TEXT,
      virtual_bank_name TEXT,
      custom_domain TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      account_type TEXT DEFAULT 'b2c_individual',
      school_id TEXT,
      school_name TEXT DEFAULT 'Federal Government College, Lagos',
      state TEXT DEFAULT 'Lagos',
      lga TEXT DEFAULT 'Ikeja',
      assigned_levels TEXT DEFAULT '["jss-1","jss-2"]',
      assigned_subjects TEXT DEFAULT '["Mathematics","English Studies"]',
      role TEXT DEFAULT 'teacher',
      b2b_tier TEXT,
      onboarding_completed_at TEXT,
      streak_count INTEGER DEFAULT 1,
      last_active_date TEXT,
      referral_code TEXT DEFAULT 'EDU-TEACH-2026',
      referred_by TEXT,
      referral_points INTEGER DEFAULT 0,
      referrals_count INTEGER DEFAULT 0,
      trial_ends_at TEXT,
      subscription_plan TEXT,
      subscription_expires_at TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Safe migrations for newly added columns if table already existed
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN account_type TEXT DEFAULT 'b2c_individual';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN school_id TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN b2b_tier TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN referral_points INTEGER DEFAULT 0;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN referrals_count INTEGER DEFAULT 0;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN trial_ends_at TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN subscription_plan TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE users ADD COLUMN subscription_expires_at TEXT;`);
  } catch (_) {}


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
      remedial_task TEXT,
      standard_task TEXT,
      advanced_task TEXT,
      bloom_tags TEXT,
      language TEXT DEFAULT 'en',
      status TEXT DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN remedial_task TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN standard_task TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN advanced_task TEXT;`);
  } catch (_) {}

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
      account_type TEXT DEFAULT 'b2c',
      school_id TEXT,
      plan TEXT NOT NULL,
      tier TEXT DEFAULT 'full_session',
      status TEXT NOT NULL,
      kora_reference TEXT NOT NULL,
      amount INTEGER NOT NULL,
      currency TEXT DEFAULT 'NGN',
      virtual_account_number TEXT,
      virtual_bank_name TEXT,
      payment_method TEXT DEFAULT 'bank_transfer',
      start_date TEXT NOT NULL,
      expiry_date TEXT NOT NULL,
      auto_renew INTEGER DEFAULT 1,
      receipt_url TEXT
    );
  `);

  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN account_type TEXT DEFAULT 'b2c';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN school_id TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN tier TEXT DEFAULT 'full_session';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN virtual_account_number TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN virtual_bank_name TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE subscriptions ADD COLUMN payment_method TEXT DEFAULT 'bank_transfer';`);
  } catch (_) {}

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS referrals (
      id TEXT PRIMARY KEY,
      referrer_id TEXT NOT NULL,
      referred_user_id TEXT,
      referred_school_id TEXT,
      account_type TEXT DEFAULT 'b2c',
      status TEXT DEFAULT 'pending',
      reward_type TEXT DEFAULT 'free_month',
      reward_value INTEGER DEFAULT 1,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      school_id TEXT,
      account_type TEXT DEFAULT 'b2c',
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      resource_id TEXT,
      ip_address TEXT,
      user_agent TEXT,
      details TEXT,
      timestamp TEXT NOT NULL
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

// Verify client connection or seamlessly switch to local SQLite
async function ensureConnectedClient(): Promise<Client> {
  if (isRemoteUrl) {
    try {
      await activeClient.execute('SELECT 1');
      console.log(`[DB] Connected successfully to remote database.`);
      return activeClient;
    } catch {
      console.log('[DB] Remote database endpoint unavailable. Initialized local SQLite database (file:local.db).');
      activeClient = createClient({ url: 'file:local.db' });
      activeDb = drizzle(activeClient, { schema });
      return activeClient;
    }
  }
  return activeClient;
}

// Auto-initialize SQLite tables and auto-seed if empty
export async function initDb() {
  const currentClient = await ensureConnectedClient();
  try {
    await runTableDDL(currentClient);
  } catch (err: any) {
    console.log('[DB] Initializing local SQLite database (file:local.db).');
    activeClient = createClient({ url: 'file:local.db' });
    activeDb = drizzle(activeClient, { schema });
    await runTableDDL(activeClient);
  }

  // Check if curriculum is fully seeded with all core subjects. If incomplete, seed now!
  try {
    const existingSubjects = await db.select().from(schema.curriculumSubjects);
    if (existingSubjects.length < 30) {
      console.log(`🌱 Curriculum subjects count is ${existingSubjects.length} (< 30). Seeding all statutory core subjects across JSS & SSS...`);
      await seedDatabase();
    }
  } catch (err) {
    console.warn('[DB] Auto-seed check warning:', err);
  }
}
