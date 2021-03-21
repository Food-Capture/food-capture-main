// node imports
const asyncHandler = require("express-async-handler");

// internal imports
const Post = require("../models/Post");

// create
exports.createPost = asyncHandler(async (req, res, next) => {
  const title = req.body.title;
  const location = req.body.location;
  const containsMeat = req.body.containsMeat;
  const allergens = req.body.allergens;
  const collectBy = req.body.collectBy;
  const description = req.body.description;

  const post = new Post({
    title,
    location,
    containsMeat,
    allergens,
    collectBy,
    description,
  });
  const result = await post.save();

  res.status(201).json({ post: result });
});

// get posts
exports.getPosts = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const postsPerPage = 10;
  let filter = {};

  const result = await Post.paginate(filter, {
    page,
    limit: postsPerPage,
    sort: { createdAt: -1 },
  });

  res.json({
    content: result.docs,
    totalCount: result.total,
    totalPages: Math.ceil(result.total / postsPerPage),
  });
});

// get post details
exports.getPostDetails = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  // return post details
  const result = await Post.findById(postId);

  // post not found
  if (!result) {
    const error = new Error("No content with this id found");
    error.statusCode = 404;
    throw error;
  }

  res.json(result);
});

// TODO: delete and update
