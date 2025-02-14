require("dotenv/config");
const mongoose = require("mongoose");

// Local mongo url 
const MONGO_URL = "mongodb://127.0.0.1:27017/user";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Database connection failed", e);
  }
};

module.exports = connectDB; 