import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Place an order
export const placeOrder = async (req, res) => {
    const { userId, paymentMethod } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0)
            return res.status(400).json({ message: "Cart is empty" });

        let totalAmount = 0;
        const orderItems = cart.items.map(item => {
            totalAmount += item.product.price * item.quantity;
            return { product: item.product._id, quantity: item.quantity };
        });

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,    // ✅ use correct field name
            paymentMethod
        });

        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ user: userId }).populate("items.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("items.product");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
