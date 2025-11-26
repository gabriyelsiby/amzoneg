import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const { data } = await API.get(`/cart/${userId}`);
      setCart(data.items || []);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [userId]);

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    try {
      await API.post("/orders/place", {
        userId,
        items: cart,
        totalAmount: total,   // ✅ correct field
        paymentMethod,
      });

      alert("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (error) {
      console.log("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  if (cart.length === 0)
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between border p-4 rounded"
          >
            <p>
              {item.product.name} x {item.quantity}
            </p>
            <p>${item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">${total}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold mr-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="stripe">Online Payment (Demo)</option>
        </select>
      </div>

      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
