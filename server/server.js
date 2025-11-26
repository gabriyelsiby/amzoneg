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

// -----------------------------------------------------
// 🔥 CORS FIX — Works for:
// - Localhost
// - Your production frontend
// - All Vercel preview deployments
// -----------------------------------------------------

const allowedOrigins = [
  process.env.CLIENT_URL_LOCAL || "http://localhost:5173",
  process.env.CLIENT_URL_PROD, 
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, server-to-server calls with no origin
      if (!origin) return callback(null, true);

      // Allow exact origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow any *.vercel.app domain
      if (/https:\/\/.*\.vercel\.app/.test(origin)) return callback(null, true);

      // Block everything else
      return callback(new Error("CORS blocked: " + origin), false);
    },
    credentials: true,
  })
);

app.use(express.json());

// -----------------------------------------------------
// ROUTES
// -----------------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Health-check
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "API running" });
});

// -----------------------------------------------------
// MONGOOSE CACHED CONNECTION (Vercel serverless safe)
// -----------------------------------------------------
const mongooseOptions = {};

let cached = global.mongoose;
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, mongooseOptions)
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected (cached)");
  return cached.conn;
}

// -----------------------------------------------------
// LOCAL DEV SERVER — NOT RUN ON VERCEL
// -----------------------------------------------------
if (!process.env.VERCEL && process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Local server running on port ${PORT}`)
    );
  });
}

export default app;
