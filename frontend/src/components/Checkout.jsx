import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode || !formData.phone) {
      alert("Please fill in all shipping details.");
      return;
    }

    // Create order object
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem("cartItems");

    alert("Order placed successfully!");
    navigate("/orders"); // Redirect to Orders Page
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
        <input type="text" name="fullName" placeholder="Full Name" className="border p-2 w-full mb-2" value={formData.fullName} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="border p-2 w-full mb-2" value={formData.address} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" className="border p-2 w-full mb-2" value={formData.city} onChange={handleChange} />
        <input type="text" name="zipCode" placeholder="ZIP Code" className="border p-2 w-full mb-2" value={formData.zipCode} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" className="border p-2 w-full mb-2" value={formData.phone} onChange={handleChange} />
      </div>

      {/* Place Order Button */}
      <button onClick={handlePlaceOrder} className="bg-blue-600 text-white px-6 py-2 rounded w-full font-semibold">
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
