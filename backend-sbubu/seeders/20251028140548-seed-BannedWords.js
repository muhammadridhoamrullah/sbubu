"use strict";
let data = require("../data/bannedWords.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.UserId = 8;
      return el;
    });
    await queryInterface.bulkInsert("BannedWords", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BannedWords", null, {});
  },
};
