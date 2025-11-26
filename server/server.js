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
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL_LOCAL || "http://localhost:5173",
      process.env.CLIENT_URL_PROD || "https://amazonedemo-sks5-jeg7ootzd-gabriyel-sibys-projects-72d0d689.vercel.app"
    ],
    credentials: true,
  })
);


app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("DB connection error:", error);
        process.exit(1);
    }
};
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
