const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const checkoutRouter = require('./routes/checkout');
const userprod = require('./routes/userproduct');

const { handleMalformedJson } = require('./middlewares/handleError');

const app = express();

// MongoDB connection
mongoose.set('strictQuery', true);
const url = "mongodb+srv://arvindm22cse:31-Aug-04@kumartextiles.iw7hdi2.mongodb.net/?retryWrites=true&w=majority&appName=Kumartextiles";
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Connected to database"))
  .catch(err => console.error("Database connection error:", err));

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(handleMalformedJson); 
app.use("/uploads", express.static("uploads"));
// Handle common req errors

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/checkout", checkoutRouter);
app.use("/userprod", userprod);
// Server status
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`);
});
