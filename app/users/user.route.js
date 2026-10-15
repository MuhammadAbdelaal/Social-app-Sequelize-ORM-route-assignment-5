const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

userRouter.post("/signup", userController.createUser); // create user / signup
userRouter.put("/:id", userController.createOrUpdateUser); // create or update by id

module.exports = userRouter;
