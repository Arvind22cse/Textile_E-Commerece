const mongoose = require('mongoose');

const UserProdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shippingaddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    orderedProducts: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        orderedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userprod", UserProdSchema);
