import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);
  

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-lg max-w-2xl mx-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded" />
              <span className="w-1/3 font-semibold">{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="border p-2 w-16 text-center"
              />
              <span className="text-lg font-semibold">₹{item.price * item.quantity}</span>
              <button onClick={() => handleRemoveItem(item.id)} className="text-red-600 hover:text-red-800">
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-6 text-xl font-bold">
            <span>Total:</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          <Link to="/checkout" className="mt-6 bg-green-600 text-white px-6 py-3 rounded w-full text-center block font-semibold">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;