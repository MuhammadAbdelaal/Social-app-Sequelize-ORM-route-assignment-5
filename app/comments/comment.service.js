const commentRepository = require("./comment.repository");

// create bulk comments
async function createBulkComments(comments) {
  return await commentRepository.createBulkComments(comments);
}

// update a comment by its id (only by its owner)
async function updateCommentById(id, content, userId) {
  // check if the comment exists
  const comment = await commentRepository.getCommentById(id);
  if (!comment) {
    const error = new Error("Comment not found.");
    error.statusCode = 404;
    throw error;
  }
  // check if the user is the owner of the comment
  if (comment.userId !== userId) {
    const error = new Error("You are not authorized to update this comment.");
    error.statusCode = 403;
    throw error;
  }
  // update the comment
  return await commentRepository.updateCommentById(id, content, userId);
}

// find or create a comment by postId, userId, and content
async function findOrCreateComment(postId, userId, content) {
  const [comment, created] = await commentRepository.findOrCreateComment(
    postId,
    userId,
    content,
  );

  return { comment, created };
}

// get comments by word
async function getCommentsByWord(word) {
  const { count, rows } = await commentRepository.getCommentsByWord(word);
  // if no comments
  if (!count) {
    const error = new Error("No comments found.");
    error.statusCode = 404;
    throw error;
  }
  return { count, comments: rows };
}

// get recent comments for a specific post
async function getRecentCommentsForPost(postId) {
  return await commentRepository.getRecentCommentsForPost(postId);
}

// Get Specific Comment By PK with User and Post Information.
async function getCommentDetailsByPk(id) {
  const comment = await commentRepository.getCommentDetailsByPk(id);
  if (!comment) {
    const error = new Error("no comment found.");
    error.statusCode = 404;
    throw error;
  }
  return comment;
}

module.exports = {
  createBulkComments,
  updateCommentById,
  findOrCreateComment,
  getCommentsByWord,
  getRecentCommentsForPost,
  getCommentDetailsByPk,
};
