import fs from 'node:fs';
import path from 'node:path';
import { createClient, type Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.ts';
import { seedDatabase } from './seed.ts';
import { runMultiSourceIsolationMigration } from './migrations/multi-source-isolation.ts';
import { applyRlsPolicies } from './migrations/rls-policies.ts';
import { runStatePolicyMigration } from './migrations/state-policy-migration.ts';
import { generateAllCurriculumJson } from '../../scripts/generate-curriculum-json.ts';

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
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN curriculum_version TEXT DEFAULT 'v1.2';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN recommended_textbook TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN is_outdated INTEGER DEFAULT 0;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN outdated_reason TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN latest_curriculum_version TEXT DEFAULT 'v1.2';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_notes ADD COLUMN is_outdated INTEGER DEFAULT 0;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_notes ADD COLUMN outdated_reason TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_notes ADD COLUMN latest_curriculum_version TEXT DEFAULT 'v1.4';`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_plans ADD COLUMN school_id TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE lesson_notes ADD COLUMN school_id TEXT;`);
  } catch (_) {}

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_sync_hashes (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      version TEXT NOT NULL DEFAULT 'v1.2',
      last_checked_at TEXT NOT NULL,
      last_changed_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_diff_logs (
      id TEXT PRIMARY KEY,
      sync_id TEXT NOT NULL,
      source TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      old_version TEXT NOT NULL,
      new_version TEXT NOT NULL,
      diff_summary TEXT NOT NULL,
      affected_plans_count INTEGER DEFAULT 0,
      timestamp TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS curriculum_versions (
      id TEXT PRIMARY KEY,
      version TEXT NOT NULL,
      source TEXT NOT NULL,
      level TEXT NOT NULL,
      subject TEXT NOT NULL,
      term INTEGER DEFAULT 1,
      week INTEGER,
      content_hash TEXT NOT NULL,
      raw_url TEXT,
      status TEXT NOT NULL DEFAULT 'APPROVED',
      change_summary TEXT NOT NULL,
      extracted_data TEXT,
      approved_by TEXT,
      is_gazetted INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS active_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_token TEXT NOT NULL UNIQUE,
      ip_address TEXT NOT NULL,
      user_agent TEXT NOT NULL,
      device_fingerprint TEXT,
      last_activity TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS lesson_notes (
      id TEXT PRIMARY KEY,
      lesson_plan_id TEXT,
      user_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      level TEXT NOT NULL,
      term INTEGER NOT NULL,
      week INTEGER NOT NULL,
      topic TEXT NOT NULL,
      curriculum_version TEXT NOT NULL DEFAULT 'v1.2',
      chalkboard_header TEXT,
      subtopics TEXT,
      definitions TEXT,
      worked_examples TEXT,
      blackboard_summary TEXT,
      seatwork_drill TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS textbooks (
      id TEXT PRIMARY KEY,
      class_level TEXT NOT NULL,
      subject TEXT NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      publisher TEXT NOT NULL,
      edition TEXT NOT NULL,
      is_government_approved INTEGER NOT NULL DEFAULT 1,
      approved_by TEXT DEFAULT 'NERDC & Lagos State Ministry of Basic Education',
      approval_date TEXT,
      created_at TEXT NOT NULL
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
      school_id TEXT,
      source_id TEXT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'curriculum_update',
      class_level TEXT,
      subject TEXT,
      read INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  try {
    await targetClient.execute(`ALTER TABLE notifications ADD COLUMN source_id TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE notifications ADD COLUMN school_id TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE notifications ADD COLUMN class_level TEXT;`);
  } catch (_) {}
  try {
    await targetClient.execute(`ALTER TABLE notifications ADD COLUMN subject TEXT;`);
  } catch (_) {}

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

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS manual_review_queue (
      id TEXT PRIMARY KEY,
      source_id TEXT NOT NULL,
      source_name TEXT NOT NULL,
      portal_url TEXT NOT NULL,
      reason TEXT NOT NULL,
      robots_txt_status TEXT DEFAULT 'DISALLOWED',
      class_level TEXT,
      subject TEXT,
      status TEXT DEFAULT 'PENDING_UPLOAD',
      uploaded_file_name TEXT,
      uploaded_by TEXT,
      admin_notes TEXT,
      detected_hash TEXT,
      created_at TEXT NOT NULL,
      resolved_at TEXT
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      school_id TEXT NOT NULL,
      admission_number TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      class_level TEXT NOT NULL,
      guardian_name TEXT NOT NULL,
      guardian_phone TEXT NOT NULL,
      guardian_email TEXT,
      parental_consent INTEGER NOT NULL DEFAULT 0,
      consent_status TEXT NOT NULL DEFAULT 'PENDING',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  try {
    await targetClient.execute(`ALTER TABLE students ADD COLUMN parental_consent INTEGER NOT NULL DEFAULT 0;`);
  } catch (_) {}
  try {
    await targetClient.execute(`UPDATE students SET parental_consent = 1 WHERE consent_status = 'GRANTED';`);
  } catch (_) {}

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS fee_records (
      id TEXT PRIMARY KEY,
      school_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      term INTEGER NOT NULL,
      session TEXT NOT NULL DEFAULT '2026/2027',
      amount_due INTEGER NOT NULL,
      amount_paid INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'unpaid',
      paid_at TEXT,
      receipt_number TEXT,
      created_at TEXT NOT NULL
    );
  `);

  await targetClient.execute(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id TEXT PRIMARY KEY,
      school_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload TEXT,
      timestamp TEXT NOT NULL
    );
  `);
}

async function applySqlitePragmas(targetClient: Client) {
  try {
    await targetClient.execute('PRAGMA journal_mode = WAL;');
    await targetClient.execute('PRAGMA synchronous = NORMAL;');
    await targetClient.execute('PRAGMA temp_store = MEMORY;');
  } catch (_) {}
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
      await applySqlitePragmas(activeClient);
      return activeClient;
    }
  }
  await applySqlitePragmas(activeClient);
  return activeClient;
}

// Auto-initialize SQLite tables and auto-seed if empty
export async function initDb() {
  let currentClient = await ensureConnectedClient();
  try {
    await runTableDDL(currentClient);
  } catch (err: any) {
    const fallbackUrl = 'file:/tmp/local.db';
    console.log(`[DB] Primary SQLite init fallback (${err?.message || 'error'}) — switching to ${fallbackUrl}.`);
    activeClient = createClient({ url: fallbackUrl });
    activeDb = drizzle(activeClient, { schema });
    currentClient = activeClient;
    await applySqlitePragmas(currentClient);
    await runTableDDL(currentClient);
  }

  // Run Phase 1 Multi-Source Isolation & NDPA 2023 tables migration
  try {
    await runMultiSourceIsolationMigration(currentClient);
  } catch (err) {
    console.warn('[DB] Multi-source migration error:', err);
  }

  // Run Phase 2C Row-Level Security & Multi-Tenant Isolation
  try {
    await applyRlsPolicies(currentClient);
  } catch (err) {
    console.warn('[DB] RLS policies initialization error:', err);
  }

  // Run Phase 5 State Policy Enforcement Migration
  try {
    await runStatePolicyMigration(currentClient);
  } catch (err) {
    console.warn('[DB] State policy migration error:', err);
  }

  // Auto-seed users & legacy NERDC topics if empty
  try {
    const userCountRes = await currentClient.execute('SELECT COUNT(*) as cnt FROM users');
    const userCount = Number((userCountRes.rows[0] as any)?.cnt ?? 0);
    if (userCount === 0) {
      console.log('[DB] Users table empty — running automatic seedDatabase()...');
      await seedDatabase();
    }
  } catch (err) {
    console.warn('[DB] Auto-seed users warning:', err);
  }

  // Auto-seed strictly isolated 6-source curriculum catalog & source_curriculum table if missing
  try {
    const scCountRes = await currentClient.execute('SELECT COUNT(*) as cnt FROM source_curriculum');
    const scCount = Number((scCountRes.rows[0] as any)?.cnt ?? 0);
    const waecDirExists = fs.existsSync(path.resolve(process.cwd(), 'curriculum-data', 'waec'));
    if (scCount < 400 || !waecDirExists) {
      console.log(`[DB] Isolated curriculum incomplete (${scCount} rows, waecDir=${waecDirExists}) — running generateAllCurriculumJson()...`);
      await generateAllCurriculumJson(currentClient);
    }
  } catch (err) {
    console.warn('[DB] Auto-seed 6-source curriculum warning:', err);
  }
}
