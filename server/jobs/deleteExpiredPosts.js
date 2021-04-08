const Post = require("../models/Post");
const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const deleteExpiredPosts = async () => {
  console.log("deleting expired posts...");

  // THIS IS TESTING CODE
  // TEST THAT JOB IS WORKING
  await mongoose.connect(process.env.MDB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const posts = await Post.find({ collectBy: { $lt: new Date() } });

  // delete each post
  for (post of posts) {
    if (post.image && post.image.id) {
      await cloudinary.uploader.destroy(post.image.id);
    }

    // carry out deletion
    await Post.findByIdAndDelete(post._id);
  }
  console.log(posts.length + " posts deleted");
};

deleteExpiredPosts();
