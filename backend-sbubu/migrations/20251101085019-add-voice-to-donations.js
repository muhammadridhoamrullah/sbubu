"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Donations", "voiceUrl", {
      type: Sequelize.STRING(500),
      allowNull: true,
      comment: "URL to voice note file (e.g., /uploads/voices/voice-123.webm)",
    });

    // Add voiceDuration column
    await queryInterface.addColumn("Donations", "voiceDuration", {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "Voice note duration in seconds",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Donations", "voiceUrl");
    await queryInterface.removeColumn("Donations", "voiceDuration");
  },
};
