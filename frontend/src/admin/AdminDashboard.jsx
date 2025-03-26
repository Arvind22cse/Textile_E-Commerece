import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/users" className="block bg-blue-600 text-white px-6 py-3 rounded text-center">
          Manage Users
        </Link>
        <Link to="/admin/orders" className="block bg-green-600 text-white px-6 py-3 rounded text-center">
          Manage Orders
        </Link>
        <Link to="/admin/products" className="block bg-yellow-600 text-white px-6 py-3 rounded text-center">
          Manage Products
        </Link>
        <Link to="/admin/carts" className="block bg-purple-600 text-white px-6 py-3 rounded text-center">
          Manage Carts
        </Link>
        <Link to="/admin/payments" className="block bg-red-600 text-white px-6 py-3 rounded text-center">
          Manage Payments
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
