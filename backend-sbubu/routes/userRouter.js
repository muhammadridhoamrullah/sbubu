const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

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

userRouter.put(
  "/editProfile",
  upload.fields([
    { name: "avatarUrl", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  authentication,
  UserController.editProfile
);

module.exports = userRouter;
