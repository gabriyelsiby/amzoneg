import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || userId === "undefined") {
      alert("Please login to add products to cart.");
      navigate("/login");
      return;
    }

    try {
      const payload = { userId, productId: id, quantity };
      console.log("Adding to cart:", payload); // debug log

      await API.post(`/cart/add`, payload);
      alert("Product added to cart!");
      navigate("/cart");
    } catch (error) {
      console.log("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl text-green-600">${product.price}</p>
        <p>{product.description}</p>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <label className="font-semibold">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-1 w-20 rounded"
          />
        </div>

        {/* Add to Cart */}
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
