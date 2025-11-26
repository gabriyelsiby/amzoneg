import React from "react";
import API from "../api/api";

export default function CartItem({ item, fetchCart }) {
  const handleQuantity = async (type) => {
    try {
      if (type === "inc") await API.put(`/cart/${item._id}`, { quantity: item.quantity + 1 });
      else if (type === "dec" && item.quantity > 1)
        await API.put(`/cart/${item._id}`, { quantity: item.quantity - 1 });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async () => {
    try {
      await API.delete(`/cart/${item._id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between border p-4 mt-2">
      <div>
        <p>{item.product.name}</p>
        <p>${item.product.price}</p>
        <div className="flex gap-2 mt-1">
          <button onClick={() => handleQuantity("dec")}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantity("inc")}>+</button>
        </div>
      </div>
      <button onClick={handleRemove} className="text-red-500">Remove</button>
    </div>
  );
}
