import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/latest");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {error && <p className="text-red-500 text-center col-span-full">{error}</p>}

      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <div className="border p-4 rounded-lg shadow-lg bg-white cursor-pointer">
            <img
              src={`http://localhost:5000/uploads/${product.image}` || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-3 text-lg font-semibold text-center">{product.title}</h3>
            <p className="text-gray-600 text-center">{product.description}</p>
            <p className="text-center font-bold text-green-600">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ProductGrid;
