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

module.exports = {
  createBulkComments,
};
