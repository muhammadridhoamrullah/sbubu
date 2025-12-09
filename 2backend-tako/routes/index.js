const donationRouter = require("./donationRoutes");
const userRouter = require("./userRoutes");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/donation", donationRouter);

module.exports = router;
