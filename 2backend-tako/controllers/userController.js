class UserController {
  static async register(req, res, next) {
    try {
      res.status(200).json({
        message: "Yey Jalan",
      });
    } catch (error) {
      console.log(error, "error");

      next(error);
    }
  }
}

module.exports = UserController;
