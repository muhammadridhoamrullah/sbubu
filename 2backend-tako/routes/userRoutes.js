const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);

module.exports = userRouter;
