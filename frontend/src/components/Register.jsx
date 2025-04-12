import React from "react";
import axios from "axios";
const Register = ({ handleCloseClick }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password')
    };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5000/auth/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.status === 201) {
        // Handle successful registration
        console.log('Registration successful');
       
      } else {
        // Handle errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96">
        <button onClick={handleCloseClick} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="relative">
              <input type="text" name="name" placeholder="Input your name" className="w-full p-3 pl-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <i className="absolute left-3 top-3 text-gray-400 fas fa-user"></i>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input type="email" name="email" placeholder="Input your email" className="w-full p-3 pl-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <i className="absolute left-3 top-3 text-gray-400 fas fa-envelope"></i>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <input type="tel" name="phone" placeholder="Input your phone number" className="w-full p-3 pl-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <i className="absolute left-3 top-3 text-gray-400 fas fa-phone"></i>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type="password" name="password" placeholder="Input your password" className="w-full p-3 pl-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <i className="absolute left-3 top-3 text-gray-400 fas fa-lock"></i>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center">
            <i className="fas fa-user-plus mr-2"></i> REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;