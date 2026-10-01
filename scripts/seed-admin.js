const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load env vars (adjust path if needed)
require('dotenv').config({ path: '.env.local' });

// Simple Admin Schema matching the models/Admin.ts structure
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'SUPER_ADMIN' },
  isActive: { type: Boolean, default: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function seedAdmin() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const email = 'admin@bestelectric.com';
    const plainPassword = 'securepassword123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin account with email ${email} already exists!`);
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    // Create the admin
    await Admin.create({
      email,
      passwordHash,
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    });

    console.log('\n✅ Admin account created successfully!');
    console.log('-------------------------------------------');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${plainPassword}`);
    console.log('-------------------------------------------');
    console.log('Please change the password after logging in (if functionality is implemented).\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
