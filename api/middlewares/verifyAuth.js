const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: "error", message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access token not found",
    });
  }
  
  jwt.verify(token, "default_secret", (err, user) => {
    console.log("User:", user);
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Access token is invalid",
      });
    }
    
    req.user = user;
    next();
  });
};

// Middleware to verify authorization (access to own resource or admin access)
const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.uid === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    }
  });
};

// Middleware to verify admin access
const verifyAdminAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    }
  });
};

module.exports = { 
  verifyToken,
  verifyAuthorization,
  verifyAdminAccess,
};
