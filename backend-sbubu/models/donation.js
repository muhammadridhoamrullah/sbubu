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
      // define association here
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
        unique: {
          msg: "OrderId sudah digunakan",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "OrderId tidak boleh kosong",
          },
          notEmpty: {
            msg: "OrderId tidak boleh kosong",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId tidak boleh kosong",
          },
          notEmpty: {
            msg: "UserId tidak boleh kosong",
          },
        },
      },
      donorName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 100],
            msg: "Nama donor harus antara 2 hingga 100 karakter",
          },
        },
      },
      donorEmail: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [5000],
            msg: "Jumlah donasi minimal adalah 5000",
          },
        },
      },
      message: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 500],
            msg: "Pesan donasi maksimal 500 karakter",
          },
        },
      },
      messageType: {
        type: DataTypes.ENUM,
        values: ["text", "gif", "voice", "media"],
        defaultValue: "text",
        allowNull: false,
      },
      mediaUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "mediaUrl harus berupa URL yang valid",
          },
        },
      },
      gifUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "gifUrl harus berupa URL yang valid",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      midtransToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      midtransResponse: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      originalMessage: {
        type: DataTypes.TEXT,
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
      videoId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mediaDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Donation",
      timestamps: true,
    }
  );
  return Donation;
};
