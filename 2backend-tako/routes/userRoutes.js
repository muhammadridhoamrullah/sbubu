const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/register", UserController.register);

module.exports = userRouter;
