import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const productsData = [
  { id: 1, category: "men", type: "topwear", name: "Unstitched Cotton Shirt Material", price: 100, originalPrice: 1299, color: "blue", style: "plain", material: "cotton", availability: "In stock", image: "path/to/image1.jpg" },
  { id: 2, category: "women", type: "topwear", name: "Unstitched Silk Shirt Material", price: 200, originalPrice: 1599, color: "green", style: "checked", material: "silk", availability: "In stock", image: "path/to/image2.jpg" },
  { id: 3, category: "kids", type: "topwear", name: "Unstitched Linen Shirt Material", price: 220, originalPrice: 1799, color: "red", style: "plain", material: "linen", availability: "In stock", image: "path/to/image3.jpg" },
  { id: 4, category: "men", type: "bottomwear", name: "Unstitched Cotton Blend Shirt Material", price: 110, originalPrice: 1399, color: "black", style: "self-design", material: "cotton-blend", availability: "In stock", image: "path/to/image4.jpg" },
  // Add more products as needed
];

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    price: { from: "", to: "" },
    color: [],
    style: [],
    material: [],
    availability: [],
  });

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (type === "checkbox") {
        if (checked) {
          newFilters[name].push(value);
        } else {
          newFilters[name] = newFilters[name].filter((item) => item !== value);
        }
      } else {
        const [filterCategory, filterType] = name.split(".");
        newFilters[filterCategory][filterType] = value;
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      price: { from: "", to: "" },
      color: [],
      style: [],
      material: [],
      availability: [],
    });
  };

  const filteredProducts = productsData.filter((product) => {
    const priceMatch = (filters.price.from === "" || product.price >= parseFloat(filters.price.from)) &&
                       (filters.price.to === "" || product.price <= parseFloat(filters.price.to));
    const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
    const styleMatch = filters.style.length === 0 || filters.style.includes(product.style);
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material);
    const availabilityMatch = filters.availability.length === 0 || filters.availability.includes(product.availability);
    return priceMatch && colorMatch && styleMatch && materialMatch && availabilityMatch;
  });

  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-4">
        <div className="flex">
          <div className="w-1/4 p-4">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <div className="mb-6">
              <h3 className="font-bold mb-2">Price</h3>
              <div className="flex space-x-2">
                <input type="number" name="price.from" placeholder="From" className="border p-2 rounded w-full" onChange={handleFilterChange} />
                <input type="number" name="price.to" placeholder="To" className="border p-2 rounded w-full" onChange={handleFilterChange} />
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-2">Color</h3>
              <div>
                <input type="checkbox" id="black" name="color" value="black" onChange={handleFilterChange} />
                <label htmlFor="black" className="ml-2">Black</label>
              </div>
              <div>
                <input type="checkbox" id="blue" name="color" value="blue" onChange={handleFilterChange} />
                <label htmlFor="blue" className="ml-2">Blue</label>
              </div>
              <div>
                <input type="checkbox" id="brown" name="color" value="brown" onChange={handleFilterChange} />
                <label htmlFor="brown" className="ml-2">Brown</label>
              </div>
              <div>
                <input type="checkbox" id="cream" name="color" value="cream" onChange={handleFilterChange} />
                <label htmlFor="cream" className="ml-2">Cream</label>
              </div>
              <div>
                <input type="checkbox" id="green" name="color" value="green" onChange={handleFilterChange} />
                <label htmlFor="green" className="ml-2">Green</label>
              </div>
              <div>
                <input type="checkbox" id="grey" name="color" value="grey" onChange={handleFilterChange} />
                <label htmlFor="grey" className="ml-2">Grey</label>
              </div>
              <div>
                <input type="checkbox" id="navy" name="color" value="navy" onChange={handleFilterChange} />
                <label htmlFor="navy" className="ml-2">Navy</label>
              </div>
              <div>
                <input type="checkbox" id="offwhite" name="color" value="offwhite" onChange={handleFilterChange} />
                <label htmlFor="offwhite" className="ml-2">OffWhite</label>
              </div>
              <div>
                <input type="checkbox" id="sandal" name="color" value="sandal" onChange={handleFilterChange} />
                <label htmlFor="sandal" className="ml-2">Sandal</label>
              </div>
              <div>
                <input type="checkbox" id="violet" name="color" value="violet" onChange={handleFilterChange} />
                <label htmlFor="violet" className="ml-2">Violet</label>
              </div>
              <div>
                <input type="checkbox" id="white" name="color" value="white" onChange={handleFilterChange} />
                <label htmlFor="white" className="ml-2">White</label>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-2">Style</h3>
              <div>
                <input type="checkbox" id="checked" name="style" value="checked" onChange={handleFilterChange} />
                <label htmlFor="checked" className="ml-2">Checked Fabrics</label>
              </div>
              <div>
                <input type="checkbox" id="plain" name="style" value="plain" onChange={handleFilterChange} />
                <label htmlFor="plain" className="ml-2">Plain Fabrics</label>
              </div>
              <div>
                <input type="checkbox" id="self-design" name="style" value="self-design" onChange={handleFilterChange} />
                <label htmlFor="self-design" className="ml-2">Self Design Fabrics</label>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-2">Material</h3>
              <div>
                <input type="checkbox" id="cotton" name="material" value="cotton" onChange={handleFilterChange} />
                <label htmlFor="cotton" className="ml-2">100% Cotton</label>
              </div>
              <div>
                <input type="checkbox" id="cotton-blend" name="material" value="cotton-blend" onChange={handleFilterChange} />
                <label htmlFor="cotton-blend" className="ml-2">Cotton Blend</label>
              </div>
              <div>
                <input type="checkbox" id="giza-cotton" name="material" value="giza-cotton" onChange={handleFilterChange} />
                <label htmlFor="giza-cotton" className="ml-2">Giza Cotton</label>
              </div>
              <div>
                <input type="checkbox" id="linen-cotton" name="material" value="linen-cotton" onChange={handleFilterChange} />
                <label htmlFor="linen-cotton" className="ml-2">Linen Cotton</label>
              </div>
              <div>
                <input type="checkbox" id="poly-viscose" name="material" value="poly-viscose" onChange={handleFilterChange} />
                <label htmlFor="poly-viscose" className="ml-2">Poly Viscose Blend</label>
              </div>
              <div>
                <input type="checkbox" id="polyster" name="material" value="polyster" onChange={handleFilterChange} />
                <label htmlFor="polyster" className="ml-2">Polyster</label>
              </div>
              <div>
                <input type="checkbox" id="viscose-blend" name="material" value="viscose-blend" onChange={handleFilterChange} />
                <label htmlFor="viscose-blend" className="ml-2">Viscose Blend</label>
              </div>
              <div>
                <input type="checkbox" id="wool-blend" name="material" value="wool-blend" onChange={handleFilterChange} />
                <label htmlFor="wool-blend" className="ml-2">Wool Blend</label>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-2">Availability</h3>
              <div>
                <input type="checkbox" id="in-stock" name="availability" value="in-stock" onChange={handleFilterChange} />
                <label htmlFor="in-stock" className="ml-2">In stock</label>
              </div>
              <div>
                <input type="checkbox" id="out-of-stock" name="availability" value="out-of-stock" onChange={handleFilterChange} />
                <label htmlFor="out-of-stock" className="ml-2">Out of stock</label>
              </div>
            </div>
            <button onClick={clearFilters} className="bg-black text-white px-4 py-2 rounded">Clear Filters</button>
          </div>
          <div className="w-3/4 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Collections</h2>
              <select className="border border-gray-300 p-2 rounded">
                <option>Sort by: Relevant</option>
                <option>Sort by: Low to High</option>
                <option>Sort by: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="border p-4 rounded-lg shadow-lg">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                  <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;