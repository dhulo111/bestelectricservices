import mongoose from 'mongoose';
import { Service } from '../src/models/Service';

import { mockServicesData } from '../src/lib/mock-data/services';

const servicesData = mockServicesData;

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully.");

    console.log("Clearing existing services...");
    await Service.deleteMany({});
    console.log("Cleared.");

    console.log("Inserting new services...");
    await Service.insertMany(servicesData);
    console.log(`Successfully inserted ${servicesData.length} services.`);

  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
