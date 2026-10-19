const Comment = require("./comment.model");
const Sequelize = require("sequelize");
const User = require("../users/user.model");
const Post = require("../posts/post.model");

// create bulk comments
async function createBulkComments(comments) {
  return await Comment.bulkCreate(comments, { validate: true });
}

// update a comment by its id (only by its owner)
async function updateCommentById(id, content, userId) {
  return await Comment.update({ content }, { where: { id, userId } });
}

// get comment by its id
async function getCommentById(id) {
  return await Comment.findByPk(id);
}

// find or create a comment by postId, userId, and content
async function findOrCreateComment(postId, userId, content) {
  return await Comment.findOrCreate({ where: { postId, userId, content } });
}

// retrieve all comments that contain a specific word, and return their count as well
async function getCommentsByWord(word) {
  return await Comment.findAndCountAll({
    where: {
      content: {
        [Sequelize.Op.like]: `%${word}%`,
      },
    },
  });
}

// Retrieve the 3 most recent comments for a specific post, ordered by creation date
async function getRecentCommentsForPost(postId) {
  return await Comment.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
    attributes: ["id", "content", "createdAt"],
  });
}

// Get Specific Comment By PK with User and Post Information.
async function getCommentDetailsByPk(id) {
  return await Comment.findByPk(id, {
    attributes: ["id", "content"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });
}

module.exports = {
  createBulkComments,
  updateCommentById,
  getCommentById,
  findOrCreateComment,
  getCommentsByWord,
  getRecentCommentsForPost,
  getCommentDetailsByPk,
};
