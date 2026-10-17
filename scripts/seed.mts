import { initDb } from '../src/db/index.ts';
import { seedDatabase } from '../src/db/seed.ts';

async function seed() {
  console.log('🔄 Initializing database schema...');
  await initDb();
  await seedDatabase();
}

seed().catch((err) => {
  console.error('❌ Database seeding error:', err);
  process.exit(1);
});
