// node imports
const express = require("express");
const { body } = require("express-validator");

// internal imports
const authController = require("../controllers/auth");

const router = express.Router();

// POST /auth/signup
router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty(),
  ],
  authController.signup
);

// POST /auth/login
router.post(
  "/login",
  [body("email").notEmpty(), body("password").notEmpty()],
  authController.login
);

module.exports = router;
