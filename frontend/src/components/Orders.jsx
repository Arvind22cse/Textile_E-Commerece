import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                <span className={`px-3 py-1 rounded text-white ${order.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600">Date: {order.date}</p>
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold mt-2">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
