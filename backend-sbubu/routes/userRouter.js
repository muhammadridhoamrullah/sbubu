const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/test", UserController.test);

module.exports = userRouter;
