import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin user already exists. Skipping.');
    } else {
      await Admin.create({
        username: 'admin',
        password: 'changeme123',
      });
      console.log('✅ Admin user created');
      console.log('   Username: admin');
      console.log('   Password: changeme123');
      console.log('   IMPORTANT: Change this password after first login.');
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
