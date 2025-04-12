import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = ({ handleLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Admin Panel</div>
      <div className="space-x-6">
        <Link to="/admin" className="hover:text-gray-400">Home</Link>

        <Link to="/admin/orders" className="hover:text-gray-400">Manage Orders</Link>
        <Link to="/admin/products" className="hover:text-gray-400">Manage Products</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default AdminNavbar;
