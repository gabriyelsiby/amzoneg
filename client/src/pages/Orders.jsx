import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login"); // redirect if not logged in
        return;
      }

      try {
        const { data } = await API.get(`/orders/user/${userId}`);
        setOrders(data || []);
      } catch (error) {
        console.log("Error fetching orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded shadow flex flex-col md:flex-row justify-between"
          >
            <div>
              <h2 className="font-semibold mb-2">Order ID: {order._id}</h2>
              {order.items.map((item) => (
                <p key={item.product._id}>
                  {item.product.name} x {item.quantity} = $
                  {item.product.price * item.quantity}
                </p>
              ))}
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <p className="font-semibold">Total: ${order.total}</p>
              <p className="text-sm text-gray-600">
                Payment: {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-600">
                Status: {order.status || "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
