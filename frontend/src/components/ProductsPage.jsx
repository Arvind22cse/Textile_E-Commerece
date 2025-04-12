import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filterStyle, setFilterStyle] = useState("All");
  const [uniqueStyles, setUniqueStyles] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
        console.log(products);
        // Extract unique styles from the data
        const styles = [...new Set(res.data.map((item) => item.style).filter(Boolean))];
        setUniqueStyles(styles);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filterStyle === "All"
      ? products
      : products.filter((p) => p.style === filterStyle);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Filter by Style:</label>
        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="All">All</option>
          {uniqueStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
          <p className="mt-2 text-blue-600 font-bold">₹{product.price.toFixed(2)}</p>
          
          {/* Out of Stock Info */}
          <p className={`mt-1 text-sm font-medium ${product.availableStock <= 0 ? "text-red-500" : "text-green-600"}`}>
            {product.availableStock <= 0 ? "Out of Stock" : `Stock: ${product.availableStock}`}
          </p>
        </Link>
        
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
