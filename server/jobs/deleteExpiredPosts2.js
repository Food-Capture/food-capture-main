const Post = require("../models/Post");

const deleteExpiredPosts = async () => {
  console.log("deleting expired posts...");

  // THIS IS TESTING CODE
  // TEST THAT JOB IS WORKING
  const posts = await Post.find({ collectBy: { $lt: new Date() } });
  console.log(posts.length);
};

deleteExpiredPosts();
