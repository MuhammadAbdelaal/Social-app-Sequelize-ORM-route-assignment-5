const Post = require("./post.model");

// create post based on user id
async function createPost({ title, content, userId }) {
  const post = new Post({ title, content, userId });
  await post.save();
  return post;
}

// delete post by its id
async function deletePostById(id) {
  return await Post.destroy({ where: { id } });
}

// get post by its id
async function getPostById(id) {
  return await Post.findByPk(id);
}

module.exports = {
  createPost,
  deletePostById,
  getPostById,
};
