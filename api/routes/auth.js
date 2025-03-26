const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

// 🔹 Register a new user (First user becomes admin)
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already registered" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // First registered user becomes admin, others are regular users
    const newUser = await User.create({ 
      name, 
      email,
      phone, 
      password: passwordHash,
      isAdmin: false ,
    });

    res.status(201).json({ status: "ok", message: "User created", isAdmin: newUser.isAdmin });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred" });
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }

    // Check password
    const isValidLogin = await bcrypt.compare(password, user.password);
    if (!isValidLogin) {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }

    // Generate JWT token (Use environment variable for security)
    const jwtToken = jwt.sign(
      { uid: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "default_secret", // Use .env variable
      { expiresIn: "3d" }
    );

    res.json({ 
      status: "ok", 
      message: "Login successful", 
      accessToken: jwtToken,
      isAdmin: user.isAdmin  // Send isAdmin status for frontend handling
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred" });
  }
});

module.exports = router;
