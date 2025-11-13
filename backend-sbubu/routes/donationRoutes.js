const DonationController = require("../controllers/donationController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");
const donationRouter = require("express").Router();

donationRouter.post(
  "/generateMidtransToken",
  DonationController.generateMidtransToken
);

donationRouter.post(
  "/:username/create",
  upload.single("voiceFile"),
  DonationController.createDonation
);
donationRouter.post("/midtrans-webhook", DonationController.midtransWebhook);

// pake authentication dulu kalo mau liat ini
donationRouter.get(
  "/my-history",
  authentication,
  DonationController.getMyDonationHistory
);

donationRouter.get("/:username", DonationController.getStreamerDonations);

donationRouter.get(
  "/transaction/:orderId",
  DonationController.getDonationByOrderId
);

module.exports = donationRouter;
