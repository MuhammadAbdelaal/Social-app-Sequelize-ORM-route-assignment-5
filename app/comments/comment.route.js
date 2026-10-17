const { Router } = require("express");
const commentRouter = Router();

const commentController = require("./comment.controller");

commentRouter.post("/", commentController.createBulkComments); // create bulk comments

module.exports = commentRouter;
