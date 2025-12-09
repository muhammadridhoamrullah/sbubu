"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Donations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      OrderId: {
        type: Sequelize.STRING,
        unique: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      donorName: {
        type: Sequelize.STRING,
      },
      donorEmail: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.TEXT,
      },
      messageType: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      midtransToken: {
        type: Sequelize.STRING,
      },
      midtransResponse: {
        type: Sequelize.JSONB,
      },
      paidAt: {
        type: Sequelize.DATE,
      },
      originalMessage: {
        type: Sequelize.TEXT,
      },
      youtubeUrl: {
        type: Sequelize.STRING,
      },
      youtubeId: {
        type: Sequelize.STRING,
      },
      startTimeYoutube: {
        type: Sequelize.INTEGER,
      },
      durationYoutube: {
        type: Sequelize.INTEGER,
      },
      tiktokUrl: {
        type: Sequelize.STRING,
      },
      voiceUrl: {
        type: Sequelize.STRING,
      },
      voiceDuration: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Donations");
  },
};
