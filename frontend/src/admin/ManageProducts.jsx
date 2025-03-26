import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const colorOptions = ["Black", "Blue", "Brown", "Cream", "Green", "Grey", "Navy", "OffWhite", "Sandal", "Violet", "White"];
const styleOptions = ["Checked Fabrics", "Plain Fabrics", "Self Design Fabrics"];
const materialOptions = ["100% Cotton", "Cotton Blend", "Giza Cotton", "Linen Cotton", "Poly Viscose Blend", "Polyster", "Viscose Blend", "Wool Blend"];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    availableStock: "",
    color: "",
    style: "",
    material: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products", getAuthHeaders());
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setProductData({ ...productData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      if (editingId) {
        await axios.put(`http://localhost:5000/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data", ...getAuthHeaders().headers },
        });
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/products/", formData, {
          headers: { "Content-Type": "multipart/form-data", ...getAuthHeaders().headers },
        });
      }
      fetchProducts();
      setProductData({ title: "", description: "", price: "", availableStock: "", color: "", style: "", material: "", image: null });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setProductData({
      title: product.title,
      description: product.description,
      price: product.price,
      availableStock: product.availableStock,
      color: product.color,
      style: product.style,
      material: product.material,
      image: null,
    });
    setEditingId(product._id);
    setPreviewImage(`http://localhost:5000/uploads/${product.image}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`, getAuthHeaders());
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>
      <div className="border p-4 rounded-lg shadow-md bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h3>
        <input type="text" name="title" placeholder="Title" value={productData.title} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
        <textarea name="description" placeholder="Description" value={productData.description} onChange={handleInputChange} className="border p-2 rounded w-full mb-2"></textarea>
        <input type="text" name="price" placeholder="Price" value={productData.price} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
        <input type="text" name="availableStock" placeholder="Available Stock" value={productData.availableStock} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
        <select name="color" value={productData.color} onChange={handleInputChange} className="border p-2 rounded w-full mb-2">
          <option value="">Select Color</option>
          {colorOptions.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>
        <select name="style" value={productData.style} onChange={handleInputChange} className="border p-2 rounded w-full mb-2">
          <option value="">Select Style</option>
          {styleOptions.map((style) => <option key={style} value={style}>{style}</option>)}
        </select>
        <select name="material" value={productData.material} onChange={handleInputChange} className="border p-2 rounded w-full mb-2">
          <option value="">Select Material</option>
          {materialOptions.map((material) => <option key={material} value={material}>{material}</option>)}
        </select>

        <input type="file" accept="image/*" onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
        {previewImage && <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />}

        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded w-full mt-2">{editingId ? "Update" : "Add"} Product</button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} handleEditClick={handleEdit} deleteProduct={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
