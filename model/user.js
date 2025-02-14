const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
