const Joi = require("joi");

module.exports.registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(3).max(50).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  dob: Joi.date().iso().required(), //YYYY-MM-DD
  country: Joi.string().min(2).max(50).required(),
});

module.exports.loginValidation = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
}).or("username", "email");

module.exports.searchUserValidation = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
}).or("username", "email");
