// node imports
const express = require("express");

// internal imports
const postController = require("../controllers/post");
const auth = require("../middleware/auth");
const imageParser = require("../middleware/imageParser");

const router = express.Router();

// POST /post
router.post("/", auth, imageParser.single("image"), postController.createPost);

// GET /post
router.get("/", auth, postController.getPosts);

// GET /post/<postId>
router.get("/:postId", auth, postController.getPostDetails);

// DELETE /post/<postId>
router.delete("/:postId", auth, postController.deletePost);

module.exports = router;
