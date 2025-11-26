import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function OrderPlaced(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(()=>{ (async()=>{ const res = await API.get(`/orders/my`); setOrder(res.data.find(o=>o._id===id)); })(); },[id]);

  if(!order) return <div className="p-6">Order placed — loading details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-semibold">Congratulations — Order placed!</h1>
      <p className="mt-2">Order ID: {order._id}</p>
      <Link to="/orders" className="mt-4 inline-block text-blue-600">Go to Your Orders</Link>
    </div>
  );
}
