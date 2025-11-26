import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// ------------------- CORS -------------------
const rawOrigins = process.env.CLIENT_URLS || `${process.env.CLIENT_URL_LOCAL},${process.env.CLIENT_URL_PROD}`;
const allowedOrigins = rawOrigins
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ------------------- MONGOOSE with caching (serverless-safe) -------------------
const mongooseOptions = {
  // keep defaults or add specific options if needed
  // useNewUrlParser: true,
  // useUnifiedTopology: true
};

let cached = global.mongoose;
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, mongooseOptions).then(m => m);
  }
  cached.conn = await cached.promise;
  console.log("MongoDB connected (cached)");
  return cached.conn;
}

// Only start a standalone HTTP server locally — serverless platforms shouldn't call this.
if (!process.env.VERCEL && process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

export default app;
