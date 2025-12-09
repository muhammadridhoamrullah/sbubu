const DonationController = require("../controllers/donationController");

const donationRouter = require("express").Router();

donationRouter.get("/test", DonationController.test);

module.exports = donationRouter;
