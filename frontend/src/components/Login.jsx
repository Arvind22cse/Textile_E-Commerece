import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleCloseClick, handleLoginSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {email, password });
      const { accessToken, isAdmin } = response.data;
      const loginstatus = response.data.islogin;
      localStorage.setItem("user", JSON.stringify({ email: email, name: response.data.name }));


      localStorage.setItem("token", accessToken);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("islogin", true);
      
      localStorage.setItem("username",response.data.username);
      localStorage.setItem("useremail",response.data.useremail);
      
      handleLoginSuccess(isAdmin ? "admin" : "user");
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
      localStorage.setItem("islogin", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{ backdropFilter: "blur(10px)" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96">
        <button onClick={handleCloseClick} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" name="username" placeholder="Enter your email" required className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" placeholder="Enter your password" required className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full flex justify-center items-center" disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
