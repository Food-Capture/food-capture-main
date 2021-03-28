// node imports
const express = require("express");

// internal imports
const postController = require("../controllers/post");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /post
router.post("/", auth, postController.createPost);

// GET /post
router.get("/", auth, postController.getPosts);

// GET /post/<postId>
router.get("/:postId", auth, postController.getPostDetails);

module.exports = router;
