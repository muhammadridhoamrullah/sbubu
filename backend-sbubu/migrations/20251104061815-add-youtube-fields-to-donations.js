"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Donations", "videoId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Donations", "startTime", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Donations", "mediaDuration", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Donations", "videoId");
    await queryInterface.removeColumn("Donations", "startTime");
    await queryInterface.removeColumn("Donations", "mediaDuration");
  },
};
