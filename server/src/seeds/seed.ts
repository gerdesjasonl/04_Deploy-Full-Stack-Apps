import db from '../config/connection.js';
import { Word } from '../models/index.js';
import cleanDB from './cleanDB.js';

const wordData = (await import('./wordSeeds.json', { assert: { type: 'json' } })).default;
try {
  await db();
  await cleanDB();

  // bulk create each model
  await Word.insertMany(wordData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
