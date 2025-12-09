"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donation.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Recipient",
      });
    }
  }
  Donation.init(
    {
      OrderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "OrderId must be unique",
        },
        validate: {
          notNull: {
            msg: "OrderId is required",
          },
          notEmpty: {
            msg: "OrderId is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      donorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Donor Name is required",
          },
          notEmpty: {
            msg: "Donor Name is required",
          },
          len: {
            args: [1, 100],
            msg: "Maximal Donor Name length is 100 characters",
          },
        },
      },
      donorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Donor Email is required",
          },
          notEmpty: {
            msg: "Donor Email is required",
          },
          isEmail: {
            msg: "Invalid Email Format",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount is required",
          },
          notEmpty: {
            msg: "Amount is required",
          },
          min: {
            args: [5000],
            msg: "Minimal donation is Rp. 5000",
          },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 500],
            msg: "Maximal message donation is 500 characters",
          },
        },
      },
      messageType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      midtransToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      midtransResponse: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      originalMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      youtubeUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      youtubeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startTimeYoutube: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      durationYoutube: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      voiceUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      voiceDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Donation",
      timestamps: true,
      paranoid: false,
    }
  );
  return Donation;
};
