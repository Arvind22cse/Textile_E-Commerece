const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const ObjectId = require('mongoose').Types.ObjectId;

const { verifyToken } = require('../middlewares/verifyAuth');
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

router.get("/payment", verifyToken, async (req, res) => {
  try {
    // Get the user's cart
    const cart = await Cart.findOne({ userID: ObjectId(req.user.uid) });

    // If the cart doesn't exist or there are no products in it, return an error
    if (!cart || cart.products.length === 0) {
      return res.status(400).json(checkoutResponse.cartIsEmpty);
    }

    // Populate product details (title and price) for each product in the cart
    const populatedCart = await cart.populate({
      path: 'products.productID',
      select: ['title', 'price']
    });

    // Calculate the total amount of the cart
    let cartTotal = 0;
    for (let product of populatedCart.products) {
      cartTotal += product.quantity * product.productID.price;
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal * 100,  // Convert amount to the smallest currency unit (in paise for INR)
      currency: "inr",          // Currency is in INR
    });

    // Return the client secret and the order details
    return res.json({
      clientSecret: paymentIntent.client_secret,
      finalOrder: {
        ...populatedCart._doc,   // Include the populated cart details in the response
        amount: cartTotal,       // Send the total amount
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred during payment creation.",
    });
  }
});

const checkoutResponse = {
  cartIsEmpty: {
    status: "error",
    message: "Cannot checkout an empty cart",
  }
};

module.exports = router;
