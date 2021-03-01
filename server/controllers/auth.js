// node imports
const bcrypt = require("bcrypt");
// sends errors directly to express error handler
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/User");

// signup
exports.signup = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

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
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  // TODO: send http codes in error
  if (!user) {
    throw new Error("User not found");
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    throw new Error("Wrong password");
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
