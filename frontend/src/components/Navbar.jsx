import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseClick = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLoginSuccess = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
    setShowDropdown(false);
    alert("Logged out successfully!");
    localStorage.setItem("islogin", false);
    navigate("/");
  };

  if (loggedIn && userRole === "admin") {
    return <AdminNavbar handleLogout={handleLogout} />;
  }

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">KUMAR TEXTILE</div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/cart" className="hover:text-gray-400">Cart</Link>
        </div>
        <div className="space-x-4 flex items-center">
          {loggedIn ? (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="text-white flex items-center focus:outline-none">
                <FaUser size={24} className="mr-2" /> Profile
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={handleLoginClick} className="bg-blue-500 px-4 py-2 rounded">Login</button>
              <button onClick={handleRegisterClick} className="bg-green-500 px-4 py-2 rounded">Register</button>
            </>
          )}
          {loggedIn && userRole === "user" && (
            <Link to="/cart">
              <FaShoppingCart size={24} className="cursor-pointer" />
            </Link>
          )}
        </div>
      </nav>
      {showLogin && <Login handleCloseClick={handleCloseClick} handleLoginSuccess={handleLoginSuccess} />}
      {showRegister && <Register handleCloseClick={handleCloseClick} />}
     

    
    </>

  );
};

export default Navbar;
