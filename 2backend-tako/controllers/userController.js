const { signToken, signTokenEmail } = require("../helpers/jwt");
const { User, Donation } = require("../models/index");
const { sendVerificationEmail } = require("../services/emailService");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, email, password } = req.body;

      // Validasi input, semua field harus diisi
      if (!name || !username || !email || !password) {
        throw { name: "USER_REGISTER_VALIDATION" };
      }

      // Cek apakah username sudah ada
      const checkUsername = await User.findOne({
        where: { username },
      });

      if (checkUsername) throw { name: "USER_REGIS_USERNAME_ALREADY_EXISTS" };

      // Cek apakah email sudah ada
      const checkEmail = await User.findOne({ where: { email } });

      if (checkEmail) throw { name: "USER_REGIS_EMAIL_ALREADY_EXISTS" };

      // Buat user baru
      const newUser = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password,
      });

      // Buat token JWT untuk verifikasi email
      const token = signTokenEmail({ id: newUser.id });

      // Link verifikasi email
      const link = `http://localhost:3000/verify-email?token=${token}`;

      const dataVerifyEmail = {
        username,
        email,
        link,
      };

      await sendVerificationEmail(dataVerifyEmail);

      res.status(201).json({
        message: `User ${newUser.username} registered successfully. Please check your email to verify your account.`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

// USER_REGISTER_VALIDATION
// USER_REGIS_USERNAME_ALREADY_EXISTS
// USER_REGIS_EMAIL_ALREADY_EXISTS
