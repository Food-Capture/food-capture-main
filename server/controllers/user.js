// node imports
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

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

exports.updateProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  // image found - upload
  if (req.file) {
    // delete image if exists
    if (user.profilePic && user.profilePic.id) {
      // remove existing image
      await cloudinary.uploader.destroy(user.profilePic.id);
    }

    // upload image
    user.profilePic = { url: req.file.path, id: req.file.filename };
    await user.save();
  }

  res.json(req.file);
});
