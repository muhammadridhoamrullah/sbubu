const errorHandler = require("../middlewares/errorHandling");
const donationRouter = require("./donationRoutes");
const userRouter = require("./userRoutes");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/donation", donationRouter);
router.use(errorHandler);

module.exports = router;
