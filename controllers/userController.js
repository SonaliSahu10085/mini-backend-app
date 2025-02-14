require("dotenv/config");
const {
  registerValidation,
  loginValidation,
  searchUserValidation,
} = require("../utils/serverValidator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  //Applying server side validation
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, email, password, fullName, gender, dob, country } =
    req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // converting password into irrevisible string
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // creating new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      gender,
      dob,
      country,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.loginUser = async (req, res) => {
  //Applying server side validation
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password} = req.body;

  try {
    const user = await User.findOne({  email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generating access token for user authencation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    res.json({
      token,
      message: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(e);
  }
};

module.exports.searchUser = async (req, res) => {
  if (typeof req.user === "undefined") {
    return res.status(400).json({
      message: "Access denied. User must be logged in to access this route.",
    });
  }

  // Applying server side validation
  const { error } = searchUserValidation.validate(req.query);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email } = req.query;

  try {
    // Currect logged in user.
    const loggedInUser = await User.findOne({ _id: req.user.id });
    console.log(loggedInUser);

    // Searcing user
    const user = await User.findOne({ $or: [{ username }, { email }] }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sending info. of searched user
    res.json({ message: "User infomation", user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
