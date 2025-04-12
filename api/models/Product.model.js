const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableStock: {
      type: Number,
      required: true, // Admin must enter the initial stock quantity
    },
    color: { type: String },
    style: { type: String },
    material: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
