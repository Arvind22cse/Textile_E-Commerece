import React, { useState, useEffect } from "react";

const ManageCarts = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/carts") // Update with your API endpoint
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((error) => console.error("Error fetching carts:", error));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Carts</h2>
      {carts.length === 0 ? (
        <p>No carts available.</p>
      ) : (
        <div className="space-y-4">
          {carts.map((cart) => (
            <div key={cart.id} className="border p-4 rounded shadow-md">
              <p><strong>Cart ID:</strong> {cart.id}</p>
              <p><strong>User ID:</strong> {cart.user_id}</p>
              <p><strong>Total Price:</strong> ₹{cart.total_price}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {cart.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCarts;