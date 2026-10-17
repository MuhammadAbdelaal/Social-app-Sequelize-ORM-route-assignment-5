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

module.exports = {
  createBulkComments,
  updateCommentById,
};
