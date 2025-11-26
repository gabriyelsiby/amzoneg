import React, { useEffect, useState } from "react"; // <-- add React here
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        🎉 Congratulations! 🎉
      </h1>
      <p className="text-lg mb-6">Your order has been placed successfully.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
