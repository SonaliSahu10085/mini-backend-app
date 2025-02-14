require("dotenv/config");
const jwt = require("jsonwebtoken");

// User authentication middleware
const isLoggedIn = (req, res, next) => {
  // Get token from header
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Access Denied. User must be logged in to access this route." });

  // Extract the token
  const token = authorization.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attach user data to request
      console.log(req.user);
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        error: "Token invalid or expired",
        format: "Bearer <your-token>",
      });
  }
};

module.exports = isLoggedIn;
