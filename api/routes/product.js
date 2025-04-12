const express = require("express");
const multer = require("multer");
const { verifyToken, verifyAdminAccess } = require("../middlewares/verifyAuth");
const Product = require("../models/Product.model");

const router = express.Router();

// 🔹 Response Messages
const productResponse = {
  productAdded: { status: "ok", message: "Product has been added" },
  productUpdated: { status: "ok", message: "Product has been updated" },
  productDeleted: { status: "ok", message: "Product has been deleted" },
  unexpectedError: { status: "error", message: "An unexpected error occurred" },
};

// 🔹 Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ **1. Get All Products (Public)**
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});

router.get("/latest", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching products" });
  }
});

// ✅ **2. Get Single Product by ID (Public)**
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});
// router.get("/", async (req, res) => {
//   try {
//     const product = await Product.find({});
//     if (!product) {
//       return res.status(404).json({ status: "error", message: "Product not found" });
//     }
//     res.json(product);
//   } catch (err) {
//     console.error("Error fetching product:", err);
//     res.status(500).json(productResponse.unexpectedError);
//   }
// });


// ✅ **3. Add a New Product (Admin Only, with Image Upload)**
router.post("/", verifyAdminAccess, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, availableStock, color, style, material } = req.body;
    console.log(req.body);
    if (!title || !description || !price || !availableStock || !req.file) {
      return res.status(400).json({ status: "error", message: "Missing required fields (title, description, price, availableStock, or image)" });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      availableStock,
      color,
      style,
      material,
      image: req.file.filename,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});

// ✅ **4. Update Product (Admin Only)**
router.put("/:id", verifyAdminAccess, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, availableStock, color, style, material } = req.body;
    let updateData = { title, description, price, availableStock, color, style, material };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});

// ✅ **5. Delete Product (Admin Only)**
router.delete("/:id", verifyAdminAccess, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json(productResponse.productDeleted);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});

module.exports = router;
