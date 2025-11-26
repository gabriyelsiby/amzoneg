import React from "react"; 
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-800 font-bold mt-1">${product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
