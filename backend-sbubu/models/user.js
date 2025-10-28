"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
const generateOverlayKey = require("../helpers/generateOverlayKey");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Donation, {
        foreignKey: "UserId",
        as: "ReceivedDonations",
      });
      User.hasMany(models.BannedWord, {
        foreignKey: "UserId",
        as: "BannedWords",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is requirede",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      username: {
        type: "DataTypes.STRING",
        allowNull: false,
        unique: {
          msg: "Username is already taken",
        },
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is already registered",
        },
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overlayKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Overlay key must be unique",
        },
        validate: {
          notNull: {
            msg: "Overlay key is required",
          },
          notEmpty: {
            msg: "Overlay key is required",
          },
        },
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalEarnings: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      alertSettings: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          soundEnabled: true,
          soundUrl: "/sounds/alamakDuitNi.mp3",
          minAmount: 5000,
          displayDuration: 10,
          animationType: "slide",
        },
      },
      overlaySettings: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          theme: "default",
          fontFamily: "Arial",
          fontSize: 24,
          textColor: "#FFFFFF",
          backgroundColor: "rgba(0,0,0,0.8)",
        },
      },
      bankAccount: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          bankName: null,
          accountNumber: null,
          accountHolderName: null,
        },
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "/image/defaultBanner2.jpg",
      },
      socialMediaLinks: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          instagram: null,
          twitter: null,
          tiktok: null,
          youtube: null,
          facebook: null,
          threads: null,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
    user.overlayKey = generateOverlayKey();
  });
  return User;
};

// banner, social media links, bio, totalEarnings, alertSettings, overlaySettings, bankAccount
