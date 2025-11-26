import express from "express";
import { placeOrder, getUserOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

// Place an order
router.post("/place", placeOrder);

// Get all orders for a user
router.get("/user/:userId", getUserOrders); // ✅ matches frontend call

// Get specific order
router.get("/:id", getOrderById);

export default router;
