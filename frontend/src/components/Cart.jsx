import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    address: "",
    phone: "",
    pincode: "",
  });
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("islogin") === "true");
    setUsername(localStorage.getItem("username") || "");
    setUseremail(localStorage.getItem("useremail") || "");
  }, []);
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-gray-600">
        Your cart is empty. <Link to="/" className="text-blue-600 underline">Continue Shopping</Link>
      </div>
    );
  }
  const handleUserInput = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  
  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed.");
      return;
    }
    setShowForm(true);
  };
  
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    const totalAmount = calculateTotal();
  
    const options = {
      key: "rzp_test_4rdgre6savrrmw",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Kumar Textiles",
      description: "Cart Order Payment",
      handler: async function (response) {
        try {
          const orderedProducts = cartItems.map(item => ({
            productID: item.id,
            quantity: item.quantity
          }));
  
          await axios.post("http://localhost:5000/userprod/create", {
            name: username,
            email: useremail,
            shippingaddress: userDetails.address,
            phone: userDetails.phone,
            pincode: userDetails.pincode,
            orderedProducts
          });
  
          alert("Order placed successfully!");
          localStorage.removeItem("cartItems");
          setCartItems([]);
          setShowForm(false);
        } catch (error) {
          console.error("Order saving failed:", error);
          alert("Payment succeeded, but order failed. Please contact support.");
        }
      },
      prefill: {
        name: username,
        email: useremail,
        contact: userDetails.phone,
      },
      theme: {
        color: "#f37254",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row bg-white shadow rounded-lg p-4">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="w-32 h-32 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-green-600 font-semibold">Price: ₹{item.price}</p>
                <p className="text-gray-800 font-semibold">Subtotal: ₹{item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 font-bold mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Summary</h3>
          <p className="text-lg mb-2">Total Items: {cartItems.length}</p>
          <p className="text-xl font-bold">Total Price: ₹{calculateTotal()}</p>
          <button
  onClick={handleProceedToCheckout}
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
>
  Proceed to Checkout
</button>


        </div>
      </div>
      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-red-500 font-bold"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Enter Delivery Details</h2>
      <form onSubmit={handleOrderSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={username}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={useremail}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={userDetails.address}
          onChange={handleUserInput}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleUserInput}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={userDetails.pincode}
          onChange={handleUserInput}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Confirm Purchase
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );

};

export default CartPage;
