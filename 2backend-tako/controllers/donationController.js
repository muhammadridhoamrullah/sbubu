class DonationController {
  static async test(req, res, next) {
    try {
      res.status(200).json({
        message: "Donation route is working!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DonationController;
