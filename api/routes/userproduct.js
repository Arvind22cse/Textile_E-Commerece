const router = require("express").Router();
const UserProd = require("../models/userprod.model.js");

// Create a new order (user + product details)
// router.post("/create", async (req, res) => {
//   const { name, email, shippingaddress, phone, pincode, orderedProducts } = req.body;
//   console.log(name,email,shippingaddress,phone,pincode,orderedProducts);
//   try {
//     if (!name || !email || !shippingaddress || !phone || !pincode || !orderedProducts?.length) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newUserOrder = new UserProd({
//       name,
//       email,
//       shippingaddress,
//       phone,
//       pincode,
//       orderedProducts,
//     });

//     const saved = await newUserOrder.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

const Product = require("../models/Product.model");

router.post("/create", async (req, res) => {
  const { name, email, shippingaddress, phone, pincode, orderedProducts } = req.body;

  try {
    if (!name || !email || !shippingaddress || !phone || !pincode || !orderedProducts?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Loop and update stock
    for (const item of orderedProducts) {
      const product = await Product.findById(item.productID);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productID}` });
      }

      if (product.availableStock < item.quantity) {
        return res.status(400).json({ message: `Only ${product.availableStock} left for ${product.title}` });
      }

      product.availableStock -= item.quantity;
      await product.save();
    }

    // Save the order
    const newUserOrder = new UserProd({
      name,
      email,
      shippingaddress,
      phone,
      pincode,
      orderedProducts,
    });

    const saved = await newUserOrder.save();
    res.status(201).json(saved);

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const userProd = await UserProd.find().populate("orderedProducts.productID");;
    res.json(userProd);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json(productResponse.unexpectedError);
  }
});
// const getUserOrders = async (req, res) => {
//     try {
//       const users = await User.find().populate("orderedProducts.productID");
//       res.status(200).json(users);
//     } catch (err) {
//       console.error("Error fetching user orders:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   };


module.exports = router;
