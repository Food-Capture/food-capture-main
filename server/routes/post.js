// node imports
const express = require("express");

// internal imports
const postController = require("../controllers/post");
const { route } = require("./auth");

const router = express.Router();

//TODO: insert auth middleware (do not do for now for easier testing)

// POST /post
router.post("/", postController.createPost);

// GET /post
router.post("/", postController.getPosts);

// GET /post/<postId>
route.post("/:postId", postController.getPostDetails);

module.exports = router;
