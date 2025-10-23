"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "banner", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "/image/defaultBanner2.jpg",
    });

    await queryInterface.addColumn("Users", "socialMediaLinks", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        instagram: null,
        twitter: null,
        tiktok: null,
        youtube: null,
        facebook: null,
        threads: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "banner");
    await queryInterface.removeColumn("Users", "socialMediaLinks");
  },
};
