const errorHandler = require("../middlewares/errorHandling");
const userRouter = require("./userRouter");

const router = require("express").Router();

router.use(userRouter);

router.use(errorHandler);
module.exports = router;
