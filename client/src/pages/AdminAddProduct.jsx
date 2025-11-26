import { useState } from "react";
import API from "../services/api";

export default function AdminAddProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", image: "", stock: 10 });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", form); // backend needs POST /products (admin route)
      alert("Product added");
      setForm({ name: "", description: "", price: "", category: "", image: "", stock: 10 });
    } catch (err) {
      alert("You must be admin or logged in");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required/>
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required/>
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
