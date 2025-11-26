import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch cart items
  const fetchCart = async () => {
    if (!userId) return;
    try {
      const { data } = await API.get(`/cart/${userId}`);
      setCart(data.items || []);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // redirect if not logged in
      return;
    }
    fetchCart();
  }, [userId]);

  // Update quantity
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;
    try {
      await API.put("/cart/update", { userId, productId, quantity: qty });
      fetchCart();
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/remove/${userId}/${productId}`);
      fetchCart();
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  // Calculate total
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{item.product.name}</h2>
              <p>${item.product.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                className="bg-gray-300 px-2 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
                className="bg-gray-300 px-2 rounded"
              >
                +
              </button>
            </div>

            <div>
              <button
                onClick={() => removeItem(item.product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ${total}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
