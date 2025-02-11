
import mongoose from "mongoose";

// Ensure DB_URI is loaded from .env
const DB_URI = process.env.MONGO_DB_URI;

if (!DB_URI) {
  console.error("❌ Database URI (MONGO_DB_URI) is missing in .env file.");
  process.exit(1); // Stop execution if no DB URI is found
}

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to database.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

export default connectDB;
