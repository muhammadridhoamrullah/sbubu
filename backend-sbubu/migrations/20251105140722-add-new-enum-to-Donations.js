"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Donations_messageType"
      ADD VALUE IF NOT EXISTS 'youtube'
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Donations_messageType"
      ADD VALUE IF NOT EXISTS 'reels'
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Donations_messageType"
      ADD VALUE IF NOT EXISTS 'tiktok'
    `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
