const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");

const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);
userRouter.patch("/verifyEmail", UserController.verifyEmail);
userRouter.post("/login", UserController.login);

userRouter.get("/me", authentication, UserController.getMyProfile);
userRouter.post(
  "/add-banned-word",
  authentication,
  UserController.addBannedWord
);

module.exports = userRouter;
