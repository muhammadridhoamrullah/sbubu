const DonationController = require("../controllers/donationController");

const donationRouter = require("express").Router();

donationRouter.post(
  "/generateMidtransToken",
  DonationController.generateMidtransToken
);

module.exports = donationRouter;
