const { Router } = require("express");
const commentRouter = Router();

const commentController = require("./comment.controller");

commentRouter.post("/", commentController.createBulkComments); // create bulk comments
commentRouter.patch("/:commentId", commentController.updateCommentById); // update comment by id
commentRouter.post("/find-or-create", commentController.findOrCreateComment); // find or create comment
commentRouter.get("/search", commentController.getCommentsByWord); // get comments by word

// get recent comments for a specific post
commentRouter.get(
  "/newest/:postId",
  commentController.getRecentCommentsForPost,
);

// get comment details by PK
commentRouter.get("/:id", commentController.getCommentDetailsByPk);
module.exports = commentRouter;
