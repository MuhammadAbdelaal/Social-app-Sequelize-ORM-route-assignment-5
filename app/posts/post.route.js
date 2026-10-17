const { Router } = require("express");
const postRouter = Router();

const postController = require("./post.controller");

// create post "/posts"
postRouter.post("/", postController.createPost);

module.exports = postRouter;
