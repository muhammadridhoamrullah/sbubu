class UserController {
  static async test(req, res, next) {
    try {
      res.status(200).json({ message: "User route is working!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
