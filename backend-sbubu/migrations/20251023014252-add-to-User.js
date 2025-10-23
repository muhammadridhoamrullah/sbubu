"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "bio", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn("Users", "totalEarnings", {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("Users", "alertSettings", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        soundEnabled: true,
        soundUrl: "/sounds/alamakDuitNi.mp3",
        minAmount: 5000,
        displayDuration: 10,
        animationType: "slide",
      },
    });

    await queryInterface.addColumn("Users", "overlaySettings", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        theme: "default",
        fontFamily: "Arial",
        fontSize: 24,
        textColor: "#FFFFFF",
        backgroundColor: "rgba(0,0,0,0.8)",
      },
    });

    await queryInterface.addColumn("Users", "bankAccount", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        bankName: null,
        accountNumber: null,
        accountHolderName: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "bio");
    await queryInterface.removeColumn("Users", "totalEarnings");
    await queryInterface.removeColumn("Users", "alertSettings");
    await queryInterface.removeColumn("Users", "overlaySettings");
    await queryInterface.removeColumn("Users", "bankAccount");
  },
};
