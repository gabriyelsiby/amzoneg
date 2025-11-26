import mongoose from "mongoose";

const mongooseOptions = {
  // add options here if needed
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

let cached = global.mongoose;
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, mongooseOptions).then(m => m);
  }
  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected (cached)");
    return cached.conn;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error; // let caller handle errors (avoid process.exit in serverless)
  }
};

export default connectDB;
