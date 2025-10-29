"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BannedWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BannedWord.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Creator",
      });
    }
  }
  BannedWord.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Banned word cannot be null.",
          },
          notEmpty: {
            msg: "Banned word cannot be empty.",
          },
        },
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Banned word must be unique.",
        },
        validate: {
          notNull: {
            msg: "Banned word cannot be null.",
          },
          notEmpty: {
            msg: "Banned word cannot be empty.",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId cannot be null.",
          },
          notEmpty: {
            msg: "UserId cannot be empty.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BannedWord",
      paranoid: false,
      timestamps: true,
    }
  );
  return BannedWord;
};
