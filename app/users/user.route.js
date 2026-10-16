const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

userRouter.post("/signup", userController.createUser); // create user / signup

// create or update by id ==> Skip validation
userRouter.put("/:id", userController.createOrUpdateUser);

// get user by email (query param)
userRouter.get("/by-email", userController.getUserByEmail);

module.exports = userRouter;
