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


const FRONTEND_PROD = process.env.CLIENT_URL_PROD || "https://amzoneg-y334-client.vercel.app";
const FRONTEND_LOCAL = process.env.CLIENT_URL_LOCAL || "http://localhost:5173";

const allowedOrigins = [FRONTEND_PROD, FRONTEND_LOCAL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 

      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (/https:\/\/.*\.vercel\.app/.test(origin)) return callback(null, true);

      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API running on Vercel" });
});


let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB Connected");
  return cached.conn;
}


if (!process.env.VERCEL) {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  });
}

export default app;
