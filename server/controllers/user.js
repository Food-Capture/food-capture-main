// node imports
const asyncHandler = require("express-async-handler");

// internal imports
const User = require("../models/User");

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  // userId retrieved from token - user can only request their own information
  const user = await User.findById(req.userId, "name email");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // found
  res.json({ user });
});
