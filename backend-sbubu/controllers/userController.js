const { Op } = require("sequelize");
const generateOverlayKey = require("../helpers/generateOverlayKey");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User, BannedWord } = require("../models/index");
const {
  sendVerificationEmail,
  sendLoginNotificationEmail,
} = require("../services/serviceEmail");
const { comparePassword } = require("../helpers/bcrypt");
const { clearCacheBannedWords } = require("../helpers/checkBannedWords");
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

      res.status(200).json({
        access_token,
        username: findUser.username,
        email: findUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyProfile(req, res, next) {
    try {
      const userId = req.user.id;

      const findUser = await User.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (!findUser) throw { name: "USER_NOT_FOUND" };

      res.status(200).json({
        user: findUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBannedWord(req, res, next) {
    try {
      const UserId = req.user.id;
      const { type, value } = req.body;

      if (!value) {
        throw { name: "BANNED_WORD_REQUIRED" };
      }

      // Split kata-kata berdasarkan koma dan trim spasi
      const wordsArray = value
        .split(",")
        .map((el) => el.trim().toLowerCase())
        .filter((el) => el.length > 0); // Hapus elemen kosong

      console.log(wordsArray, "<<WordsAerray");

      // Cek jika wordsArray kosong setelah pemrosesan
      if (wordsArray.length === 0) {
        throw { name: "BANNED_WORD_VALIDATION" };
      }

      // Siapkan data untuk bulkCreate

      const bannedWordsData = wordsArray.map((el) => ({
        value: el,
        type,
        UserId,
      }));

      console.log(bannedWordsData, "<< bannedWordsData");

      // Simpan ke database menggunakan bulkCreate
      const created = await BannedWord.bulkCreate(bannedWordsData, {
        ignoreDuplicates: true, // Mengabaikan duplikat berdasarkan constraint unik
      });

      // Clear cache
      clearCacheBannedWords();

      res.status(201).json({
        message: `${created.length} banned words/url/title added successfully`,
        value: created.map((el) => el.value),
      });
    } catch (error) {
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const userId = req.user.id;

      const { avatarUrl, banner, name, bio, username, socialMediaLinks } =
        req.body;

      const findUser = await User.findByPk(userId);
      if (!findUser) throw { name: "USER_NOT_FOUND" };

      const updateData = {};

      if (avatarUrl) updateData.avatarUrl = avatarUrl;
      if (banner) updateData.banner = banner;
      if (name) updateData.name = name;
      if (bio) updateData.bio = bio;
      if (username) {
        // Cek username sudah ada atau belum
        const checkUsername = await User.findOne({
          where: {
            username,
          },
        });

        if (checkUsername && checkUsername.id !== userId) {
          throw { name: "USER_REGISTER_USERNAME_UNIQUE" };
        }
        updateData.username = username;
      }
      if (socialMediaLinks) {
        try {
          const newSocialMediaLinks = JSON.parse(socialMediaLinks);

          const existingSocialMediaLinks = findUser.socialMediaLinks || {};

          // Gabungkan existing dengan yang baru
          let gabungkanSocialMediaLinks = {
            youtube:
              newSocialMediaLinks.youtube !== undefined
                ? newSocialMediaLinks.youtube
                : existingSocialMediaLinks.youtube || "",
            instagram:
              newSocialMediaLinks.instagram !== undefined
                ? newSocialMediaLinks.instagram
                : existingSocialMediaLinks.instagram || "",
            twitter:
              newSocialMediaLinks.twitter !== undefined
                ? newSocialMediaLinks.twitter
                : existingSocialMediaLinks.twitter || "",
            tiktok:
              newSocialMediaLinks.tiktok !== undefined
                ? newSocialMediaLinks.tiktok
                : existingSocialMediaLinks || "",
            threads:
              newSocialMediaLinks.threads !== undefined
                ? newSocialMediaLinks.threads
                : existingSocialMediaLinks.threads || "",
          };

          updateData.socialMediaLinks = gabungkanSocialMediaLinks;
        } catch (error) {
          // Jika gagal parsing JSON, abaikan pembaruan socialMediaLinks
          console.log("Gagal parsing socialMediaLinks:", error);
        }
      }

      // Handle file uploads
      if (req.files) {
        if (req.files.avatarUrl && req.files.avatarUrl.length > 0) {
          updateData.avatarUrl = req.files.avatarUrl[0].path;
        }

        if (req.files.banner && req.files.banner.length > 0) {
          updateData.banner = req.files.banner[0].path;
        }
      }

      // Update user
      await User.update(updateData, {
        where: {
          id: userId,
        },
      });

      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      res
        .status(200)
        .json({ message: "Profile updated successfully", user: updatedUser });
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
// USER_NOT_FOUND
// BANNED_WORD_REQUIRED
// BANNED_WORD_VALIDATION

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
