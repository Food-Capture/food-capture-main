const Post = require("../models/Post");
const mongoose = require("mongoose");
require("dotenv").config();

const deleteExpiredPosts = async () => {
  console.log("deleting expired posts...");

  // THIS IS TESTING CODE
  // TEST THAT JOB IS WORKING
  await mongoose.connect(process.env.MDB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const posts = await Post.find({ collectBy: { $lt: new Date() } });
  console.log(posts.length);
};

deleteExpiredPosts();
