const Post = require("./post.model");

async function createPost({ title, content, userId }) {
  const post = new Post({ title, content, userId });
  await post.save();
  return post;
}

module.exports = {
  createPost,
};
