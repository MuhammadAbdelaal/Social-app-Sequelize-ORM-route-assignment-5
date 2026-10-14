const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

userRouter.post("/signup", userController.createUser);

module.exports = userRouter;
