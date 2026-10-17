const { Router } = require("express");
const postRouter = Router();

const postController = require("./post.controller");

// create post "/posts"
postRouter.post("/", postController.createPost);

// delete post by id
postRouter.delete("/:postId", postController.deletePost);

module.exports = postRouter;
