// node imports
const bcrypt = require("bcrypt");
// sends errors directly to express error handler
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// internal imports
const User = require("../models/User");

// signup
exports.signup = asyncHandler(async (req, res, next) => {
  // checking validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Missing Fields");
    err.statusCode = 422;
    throw err;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // check if email already used
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    const err = new Error("Email already exists");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ name, email, password: hashedPassword });
  const result = await user.save();

  const token = jwt.sign(
    {
      name: result.name,
      email: result.email,
      userId: result._id.toString(),
    },
    process.env.JWT_KEY
  );

  res.status(201).json({ token, userId: result._id.toString() });
});

// login
exports.login = asyncHandler(async (req, res, next) => {
  // checking validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Missing Fields");
    err.statusCode = 422;
    throw err;
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 401;
    throw err;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error("Incorrect Password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      userId: user._id.toString(),
    },
    process.env.JWT_KEY
  );
  res.json({ token, userId: user._id.toString() });
});
