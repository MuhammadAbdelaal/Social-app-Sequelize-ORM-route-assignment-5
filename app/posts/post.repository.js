const Post = require("./post.model");
const Comment = require("../comments/comment.model");
const User = require("../users/user.model");
const Sequelize = require("sequelize");

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

// retreive all posts, including their owner (user) and their comments
async function getAllPostsWithDetails() {
  const posts = await Post.findAll({
    attributes: ["id", "title"],
    include: [
      { model: User, attributes: ["id", "name"] },
      { model: Comment, attributes: ["id", "content"] },
    ],
  });
  return posts;
}

// get all posts, and count the number of comments for each post
async function getAllPostsWithCommentsCount() {
  const posts = await Post.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentsCount"],
    ],
    include: {
      model: Comment,
      attributes: [],
    },
    group: ["post.id"],
  });
  return posts;
}

module.exports = {
  createPost,
  deletePostById,
  getPostById,
  getAllPostsWithDetails,
  getAllPostsWithCommentsCount,
};
