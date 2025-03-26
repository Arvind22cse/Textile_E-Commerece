import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShippingFast, FaUndo, FaLock, FaStar, FaRulerCombined } from "react-icons/fa";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((response) => {
        const productData = response.data;
        const formattedProduct = {
          id: productData._id,
          name: productData.title,
          description: productData.description,
          price: productData.price,
          originalPrice: productData.originalPrice || productData.price + 100,
          availability: productData.availableStock > 0 ? "In Stock" : "Out of Stock",
          rating: productData.rating || 4,
          reviews: productData.reviews || 10,
          image: productData.image, // Only one image
        };
        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (!product) return <div className="text-center text-lg font-semibold">Product not found</div>;

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cartItems.push({ ...product, quantity: parseInt(quantity) });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`Added ${quantity} meter(s) of ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} meter(s) of ${product.name}!`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 my-2">{product.description}</p>

          {/* Price and Discount */}
          <p className="text-xl text-gray-700 my-2">
            <span className="line-through mr-2 text-red-500">₹{product.originalPrice}</span>
            <span className="text-green-600 font-bold">₹{product.price}</span>
          </p>

          {/* Stock Availability */}
          <p className={`my-2 font-semibold ${product.availability === "Out of Stock" ? "text-red-500" : "text-green-600"}`}>
            {product.availability}
          </p>

          {/* Ratings & Reviews */}
          <div className="flex items-center space-x-1 text-yellow-500">
            {Array.from({ length: product.rating }).map((_, index) => (
              <FaStar key={index} />
            ))}
            <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
          </div>

          {/* Quantity Selector */}
          <div className="my-4">
            <label htmlFor="quantity" className="block font-semibold">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-24"
            />
          </div>

          {/* Add to Cart & Buy Now */}
          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded w-1/2">ADD TO CART</button>
            <button onClick={handleBuyNow} className="bg-red-600 text-white px-4 py-2 rounded w-1/2">BUY IT NOW</button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6">
            <p className="flex items-center text-green-600">
              <FaShippingFast className="mr-2" /> Free delivery within 3-5 days
            </p>
            <p className="flex items-center">
              <FaLock className="mr-2" /> Secure payment & checkout
            </p>
            <p className="flex items-center">
              <FaUndo className="mr-2" /> 7-day easy returns
            </p>
          </div>

          {/* Size Guide */}
          <button className="text-blue-600 flex items-center mt-4" onClick={() => alert("Size guide will be displayed.")}>
            <FaRulerCombined className="mr-2" /> Size Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
