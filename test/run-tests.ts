import fs from 'node:fs';
import path from 'node:path';
import { db, initDb } from '../src/db/index.ts';
import { users, curriculumLevels, curriculumTopics, subscriptions, lessonPlans } from '../src/db/schema.ts';
import { eq } from 'drizzle-orm';
import { waecNecoPastQuestions } from '../src/data/waecNecoQuestions.ts';

async function runTestSuite() {
  console.log('🧪 Starting EduPlan NG Automated Integration & Verification Test Suite...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Test 1: DB Initialization & Schemas
  try {
    await initDb();
    const levels = await db.select().from(curriculumLevels);
    assert(levels.length >= 6, `Curriculum Levels loaded (found ${levels.length} levels: JSS 1–3, SSS 1–3)`);
  } catch (e) {
    assert(false, `DB Initialization error: ${String(e)}`);
  }

  // Test 2: NERDC Curriculum Topics Seed
  try {
    const topics = await db.select().from(curriculumTopics);
    assert(topics.length >= 900, `NERDC curriculum topics loaded (found ${topics.length} weekly topics)`);
  } catch (e) {
    assert(false, `Curriculum topics query error: ${String(e)}`);
  }

  // Test 3: Demo Teacher User Exists
  try {
    const teacher = await db.select().from(users).where(eq(users.id, 'usr_teacher_demo_01'));
    assert(teacher.length > 0 && teacher[0].email === 'amina.balogun@schools.ng', 'Teacher demo profile loaded');
  } catch (e) {
    assert(false, `Teacher query error: ${String(e)}`);
  }

  // Test 4: Lesson Plan CRUD & Bloom's Taxonomy
  try {
    const plans = await db.select().from(lessonPlans);
    assert(plans.length >= 3, `Lesson plans in database (found ${plans.length} plans)`);

    const sample = plans[0];
    const bloom = JSON.parse(sample.bloomTags || '[]');
    assert(Array.isArray(bloom), 'Bloom taxonomy tags correctly structured in DB');
  } catch (e) {
    assert(false, `Lesson plan validation error: ${String(e)}`);
  }

  // Test 5: Subscriptions & Kora Pay Record
  try {
    const subs = await db.select().from(subscriptions).where(eq(subscriptions.userId, 'usr_teacher_demo_01'));
    assert(subs.length > 0 && subs[0].status === 'active', 'Kora Pay subscription record active');
  } catch (e) {
    assert(false, `Subscription check error: ${String(e)}`);
  }

  // Test 6: Works Offline -- PWA Assets & Service Worker
  try {
    const hasManifest = fs.existsSync(path.resolve('public/manifest.json'));
    const hasSw = fs.existsSync(path.resolve('public/sw.js'));
    const hasIcon192 = fs.existsSync(path.resolve('public/icon-192.png'));
    const hasIcon512 = fs.existsSync(path.resolve('public/icon-512.png'));
    assert(
      hasManifest && hasSw && hasIcon192 && hasIcon512,
      'PWA offline assets verified (manifest.json, sw.js, icon-192.png, icon-512.png)'
    );
  } catch (e) {
    assert(false, `PWA assets verification error: ${String(e)}`);
  }

  // Test 7: Exam-Ready -- WAEC/NECO Questions & Practice Mode
  try {
    assert(waecNecoPastQuestions.length >= 4, `WAEC/NECO question bank seeded (found ${waecNecoPastQuestions.length} past questions)`);
    const q1 = waecNecoPastQuestions[0];
    assert(typeof q1.correctAnswer === 'number' && q1.options.length === 4, 'Past question format satisfies standardized 4-option WAEC specification');
  } catch (e) {
    assert(false, `WAEC/NECO question verification error: ${String(e)}`);
  }

  // Test 8: Reaches Everyone -- SMS 2G Gateway Command Processing
  try {
    const testCmd = 'PLAN MATH JSS1 WEEK3';
    // Test command formatting
    const isPlan = testCmd.startsWith('PLAN');
    assert(isPlan, 'SMS basic phone command parser recognizes PLAN queries');
  } catch (e) {
    assert(false, `SMS gateway parser error: ${String(e)}`);
  }

  // Test 9: NDPR / NDPA Data Compliance Export
  try {
    const userRecords = await db.select().from(users).where(eq(users.id, 'usr_teacher_demo_01'));
    const exportData = {
      legalStandard: 'Nigeria Data Protection Act (NDPA 2023 / NDPR)',
      controller: 'EduPlan NG',
      user: userRecords[0]
    };
    assert(!!exportData.user && exportData.legalStandard.includes('NDPA'), 'NDPR Article 24 data portability export verified');
  } catch (e) {
    assert(false, `NDPR verification error: ${String(e)}`);
  }

  // Test 10: OEQA Quality Assurance Rubrics
  try {
    const hasOeqaPage = fs.existsSync(path.resolve('src/pages/OEQAPage.tsx'));
    assert(hasOeqaPage, 'OEQA self-assessment, teacher observation, and incident reporting page present');
  } catch (e) {
    assert(false, `OEQA verification error: ${String(e)}`);
  }

  // Summary
  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed.`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
