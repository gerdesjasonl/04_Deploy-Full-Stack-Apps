import db from '../config/connection.js';
import { Word } from '../models/index.js';
import cleanDB from './cleanDB.js';

const loadJSON = async () => {
  const module = await import('./wordSeeds.json', { assert: { type: 'json' } });
  return module.default;
};

const seedDatabase = async () => {
  try {
    await db();
    await cleanDB();

    // Load JSON dynamically
    const wordData = await loadJSON();
    await Word.insertMany(wordData);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Execute the function
seedDatabase();
