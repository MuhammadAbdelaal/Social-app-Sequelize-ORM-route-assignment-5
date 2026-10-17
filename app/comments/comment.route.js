const { Router } = require("express");
const commentRouter = Router();

const commentController = require("./comment.controller");

commentRouter.post("/", commentController.createBulkComments); // create bulk comments
commentRouter.patch("/:commentId", commentController.updateCommentById); // update comment by id

module.exports = commentRouter;
