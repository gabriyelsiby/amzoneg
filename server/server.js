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

// -------------------------------------------
// ⭐ CORS CONFIG — FULLY FIXED FOR VERCEL
// -------------------------------------------
const FRONTEND_URL = process.env.CLIENT_URL_PROD || "https://amzoneg-y334-client.vercel.app";
const LOCAL_URL = process.env.CLIENT_URL_LOCAL || "http://localhost:5173";

const allowedOrigins = [FRONTEND_URL, LOCAL_URL];

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      // Allow frontend + localhost
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow all Vercel preview deployments (important)
      if (/https:\/\/.*\.vercel\.app/.test(origin)) return callback(null, true);

      // Block everything else
      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());

// -------------------------------------------
// ROUTES
// -------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "API running successfully" });
});

// -------------------------------------------
// ⭐ CACHED MONGODB CONNECTION (Vercel safe)
// -------------------------------------------
let cached = global.mongoose;
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}

// -------------------------------------------
// LOCAL DEV ONLY — NOT USED IN VERCEL
// -------------------------------------------
if (!process.env.VERCEL) {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server running on port", PORT));
  });
}

export default app;
export { connectDB };
