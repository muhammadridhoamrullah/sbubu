const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);
userRouter.patch("/verifyEmail", UserController.verifyEmail);
userRouter.post("/login", UserController.login);

module.exports = userRouter;
