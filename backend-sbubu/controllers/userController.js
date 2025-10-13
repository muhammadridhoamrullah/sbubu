const { Op } = require("sequelize");
const generateOverlayKey = require("../helpers/generateOverlayKey");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const {
  sendVerificationEmail,
  sendLoginNotificationEmail,
} = require("../services/serviceEmail");
const { comparePassword } = require("../helpers/bcrypt");
class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, email, password, role, avatarUrl } = req.body;
      const overlayKey = generateOverlayKey();

      if (!name || !username || !email || !password) {
        throw { name: "USER_REGISTER_VALIDATION" };
      }

      // CEK USERNAME SUDAH ADA TAU BELUM
      const checkUsername = await User.findOne({
        where: {
          username,
        },
      });

      if (checkUsername) throw { name: "USER_REGISTER_USERNAME_UNIQUE" };

      // CEK EMAIL SUDAH ADA ATAU BELUM
      const checkEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (checkEmail) throw { name: "USER_REGISTER_EMAIL_UNIQUE" };

      const newUser = await User.create({
        ...req.body,
        overlayKey,
      });

      const token = signToken({
        id: newUser.id,
      });

      const link = `http://localhost:3000/verifyEmail?token=${token}`;

      const dataVerif = {
        username,
        email,
        link,
      };

      await sendVerificationEmail(dataVerif);

      res.status(201).json({
        message: `User ${newUser.username} created, please check your email for verification`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const decoded = verifyToken(token);

      if (!decoded) throw { name: "INVALID_TOKEN" };

      const findUser = await User.findByPk(decoded.id);
      if (!findUser) throw { name: "INVALID_TOKEN" };

      if (findUser.isEmailVerified)
        throw { name: "USER_VERIFY_EMAIL_ALREADY_VERIFIED" };

      const updatingUser = await User.update(
        {
          isEmailVerified: true,
        },
        {
          where: {
            id: findUser.id,
          },
        }
      );

      if (updatingUser[0] === 0) throw { name: "USER_FAILED_TO_VERIFY" };

      res.status(200).json({ message: "Email successfully verified" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) throw { name: "USER_LOGIN_VALIDATION" };

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { username: identifier }],
        },
      });

      if (!findUser) throw { name: "USER_LOGIN_EMAIL_PASSWORD_INVALID" };

      const checkPassword = comparePassword(password, findUser.password);

      if (!checkPassword) throw { name: "USER_LOGIN_EMAIL_PASSWORD_INVALID" };

      if (!findUser.isEmailVerified)
        throw { name: "USER_LOGIN_EMAIL_NOT_VERIFIED" };

      const access_token = signToken({
        id: findUser.id,
      });

      await User.update(
        {
          lastLoginAt: new Date(),
        },
        {
          where: {
            id: findUser.id,
          },
        }
      );

      const dataLogin = {
        email: findUser.email,
        username: findUser.username,
      };

      sendLoginNotificationEmail(dataLogin);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

// USER_REGISTER_VALIDATION
// USER_REGISTER_USERNAME_UNIQUE
// USER_REGISTER_EMAIL_UNIQUE
// INVALID_TOKEN
// USER_VERIFY_EMAIL_ALREADY_VERIFIED
// USER_FAILED_TO_VERIFY
// USER_LOGIN_VALIDATION
// USER_LOGIN_EMAIL_PASSWORD_INVALID
// USER_LOGIN_EMAIL_NOT_VERIFIED

// name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notEmpty: {
//             msg: "Name is requirede",
//           },
//           notNull: {
//             msg: "Name is required",
//           },
//         },
//       },
//       username: {
//         type: "DataTypes.STRING",
//         allowNull: false,
//         unique: {
//           msg: "Username is already taken",
//         },
//         validate: {
//           notEmpty: {
//             msg: "Username is required",
//           },
//           notNull: {
//             msg: "Username is required",
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: {
//           msg: "Email is already registered",
//         },
//         validate: {
//           isEmail: {
//             msg: "Invalid email format",
//           },
//           notEmpty: {
//             msg: "Email is required",
//           },
//           notNull: {
//             msg: "Email is required",
//           },
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notEmpty: {
//             msg: "Password is required",
//           },
//           notNull: {
//             msg: "Password is required",
//           },
//         },
//       },
//       role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "user",
//       },
//       avatarUrl: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       overlayKey: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: {
//           msg: "Overlay key must be unique",
//         },
//         validate: {
//           notNull: {
//             msg: "Overlay key is required",
//           },
//           notEmpty: {
//             msg: "Overlay key is required",
//           },
//         },
//       },
