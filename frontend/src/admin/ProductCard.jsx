import React from "react";

const ProductCard = ({ product, handleEditClick, deleteProduct }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold text-green-600">₹{product.price}</p>
      <div className="flex justify-between mt-3">
        <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">
          Edit
        </button>
        <button onClick={() => deleteProduct(product._id)} className="bg-red-600 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
