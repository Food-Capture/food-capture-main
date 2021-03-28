// node imports
const express = require("express");

// internal imports
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /user
router.get("/", auth, userController.getUserDetails);

module.exports = router;
