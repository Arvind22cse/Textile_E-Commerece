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

    res.status(201).json({ status: "ok", message: "User created", isAdmin: newUser.isAdmin,
      username : name,
      useremail : email
     });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred" });
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
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
      message: "Login successfully",
      username : user.name,
      useremail : user.email,
      islogin : true,
      uid: user._id, 
      accessToken: jwtToken,
      isAdmin: user.isAdmin  // Send isAdmin status for frontend handling
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred",
     });
  }
});

module.exports = router;
// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/User.model");

// // Error responses
// const authResponse = {
//   invalidInput: { status: "error", message: "Invalid input provided" },
//   emailExists: { status: "error", message: "Email already registered" },
//   authFailed: { status: "error", message: "Authentication failed" },
//   serverError: { status: "error", message: "An unexpected error occurred" },
//   registerSuccess: { status: "ok", message: "User created successfully" },
//   loginSuccess: { status: "ok", message: "Login successful" },
//   logoutSuccess: { status: "ok", message: "Logout successful" }
// };

// // Register a new user
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   // Basic validation
//   if (!name || !email || !password) {
//     return res.status(400).json(authResponse.invalidInput);
//   }

//   try {
//     // Check if email exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json(authResponse.emailExists);
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     // Check if first user (make admin)
//     const isFirstUser = (await User.countDocuments()) === 0;

//     // Create user
//     const newUser = await User.create({ 
//       name, 
//       email,
//       phone, 
//       password: passwordHash,
//       isAdmin: isFirstUser
//     });

//     // Automatically log in user after registration
//     req.session.user = {
//       id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin
//     };

//     res.status(201).json({
//       ...authResponse.registerSuccess,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin
//       }
//     });

//   } catch (err) {
//     console.error("Registration Error:", err);
//     res.status(500).json(authResponse.serverError);
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Basic validation
//   if (!email || !password) {
//     return res.status(400).json(authResponse.invalidInput);
//   }

//   try {
//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json(authResponse.authFailed);
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json(authResponse.authFailed);
//     }

//     // Create session
//     req.session.user = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin
//     };

//     res.json({
//       ...authResponse.loginSuccess,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin
//       }
//     });

//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json(authResponse.serverError);
//   }
// });

// // Logout route
// router.post("/logout", (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error("Logout Error:", err);
//       return res.status(500).json(authResponse.serverError);
//     }
//     res.clearCookie("connect.sid"); // The default session cookie name
//     res.json(authResponse.logoutSuccess);
//   });
// });

// // Check authentication status
// router.get("/check-auth", (req, res) => {
//   if (req.session.user) {
//     res.json({
//       status: "ok",
//       isAuthenticated: true,
//       user: req.session.user
//     });
//   } else {
//     res.json({
//       status: "ok",
//       isAuthenticated: false,
//       user: null
//     });
//   }
// });

// module.exports = router;