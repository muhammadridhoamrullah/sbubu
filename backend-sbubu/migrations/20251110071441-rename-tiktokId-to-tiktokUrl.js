"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Donations", "tiktokId", "tiktokUrl");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Donations", "tiktokUrl", "tiktokId");
  },
};
