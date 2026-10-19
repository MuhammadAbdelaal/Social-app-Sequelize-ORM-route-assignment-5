const commentService = require("./comment.service");

// create bulk comments Api (1)
async function createBulkComments(req, res, next) {
  const { comments } = req.body || {};
  // if comments is not array or empty array, return error
  if (!Array.isArray(comments) || comments.length === 0) {
    return res
      .status(400)
      .json({ message: "Comments must be a non-empty array." });
  }
  try {
    // call the service to create bulk comments
    await commentService.createBulkComments(comments);
    return res.status(201).json({ message: "Comments created." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// update a comment by its id (only by its owner)
async function updateCommentById(req, res, next) {
  const { commentId: id } = req.params;
  // check if id is an integer after converting it to number
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "CommentId must be an integer." });
  }

  const { content, userId } = req.body || {};

  // if userId or content is not provided, return error
  if (!Number.isInteger(userId) || !content) {
    return res
      .status(400)
      .json({ message: "An integer userId and a content are required." });
  }
  // call the service to update the comment
  try {
    await commentService.updateCommentById(id, content, userId);
    return res.status(200).json({ message: "Comment updated." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// find or create a comment by postId, userId, and content
async function findOrCreateComment(req, res, next) {
  const { postId, userId, content } = req.body || {};
  // check if postId, userId, and content are provided
  if (!postId || !userId || !content) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const result = await commentService.findOrCreateComment(
      postId,
      userId,
      content,
    );
    return res.status(result.created ? 201 : 200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  createBulkComments,
  updateCommentById,
  findOrCreateComment,
};
