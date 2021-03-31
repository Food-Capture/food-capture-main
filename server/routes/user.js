// node imports
const express = require("express");

// internal imports
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const imageParser = require("../middleware/imageParser");

const router = express.Router();

// GET /user
router.get("/", auth, userController.getUserDetails);

// POST /user/image
router.post(
  "/image",
  auth,
  imageParser.single("image"),
  userController.updateProfilePic
);

module.exports = router;
