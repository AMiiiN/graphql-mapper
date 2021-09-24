'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      Round: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Location: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
      Date: {
        type: Sequelize.STRING
      },
      Fastest_Qualifying: {
        type: Sequelize.STRING
      },
      Winning_Pilot: {
        foreignKey: true,
        type: Sequelize.STRING
      },
      Winning_Aircraft: {
        foreignKey: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};
