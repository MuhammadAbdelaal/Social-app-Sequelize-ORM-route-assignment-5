const { Router } = require("express");
const commentRouter = Router();

const commentController = require("./comment.controller");

commentRouter.post("/", commentController.createBulkComments); // create bulk comments
commentRouter.patch("/:commentId", commentController.updateCommentById); // update comment by id
commentRouter.post("/find-or-create", commentController.findOrCreateComment); // find or create comment
module.exports = commentRouter;
