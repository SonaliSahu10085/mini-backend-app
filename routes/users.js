const express = require("express");
const router = express.Router();
const { registerUser, loginUser, searchUser } = require("../controllers/userController");
const isLoggedIn = require("../middleware/authUser");

/* user registration route */
router.post("/register", registerUser);

/* user login route */
router.post("/login", loginUser);

/* search user route - by username or email */
router.get("/search", isLoggedIn, searchUser);

module.exports = router;
