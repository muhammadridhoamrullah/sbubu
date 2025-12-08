"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      avatarUrl: {
        type: Sequelize.STRING,
        defaultValue: "/assets/image/defaultAvatar.jpg",
      },
      overlayKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      lastLoginAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      bannerUrl: {
        type: Sequelize.STRING,
        defaultValue: "/assets/image/defaultBanner.jpg",
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      nomorTelepon: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      zonaWaktu: {
        type: Sequelize.STRING,
        defaultValue: "Asia/Jakarta",
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
    await queryInterface.dropTable("Users");
  },
};
