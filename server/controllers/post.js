// node imports
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

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
  let image = null;
  if (req.file) {
    image = { url: req.file.path, id: req.file.filename };
  }

  const post = new Post({
    title,
    location,
    containsMeat,
    allergens,
    collectBy,
    description,
    image,
  });
  const result = await post.save();

  res.status(201).json({ post: result });
});

// get posts
exports.getPosts = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const postsPerPage = 10;
  const currentDate = new Date();
  console.log(currentDate);
  let filter = { collectBy: { $gt: currentDate } };

  const result = await Post.paginate(filter, {
    page,
    limit: postsPerPage,
    sort: { createdAt: -1 },
  });

  res.status(200).json({
    posts: result.docs,
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
    const error = new Error("No post with this id found");
    error.statusCode = 404;
    throw error;
  }

  res.json(result);
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  // find post
  const post = await Post.findById(postId);

  // post not found
  if (!post) {
    const error = new Error("No post with this id found");
    error.statusCode = 404;
    throw error;
  }

  // delete image of post
  if (post.image && post.image.id) {
    await cloudinary.uploader.destroy(post.image.id);
  }

  // carry out deletion
  await Post.findByIdAndDelete(postId);

  res.json({ message: "Post deleted" });
});

// TODO: update
