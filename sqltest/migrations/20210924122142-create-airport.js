'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Airports', {
      Airport_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Airport_Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Total_Passengers: {
        type: Sequelize.REAL
      },
      Change_2007: {
        type: Sequelize.STRING
      },
      International_Passengers: {
        type: Sequelize.REAL
      },
      Domestic_Passengers: {
        type: Sequelize.REAL
      },
      Transit_Passengers: {
        type: Sequelize.REAL
      },
      Aircraft_Movements: {
        type: Sequelize.REAL
      },
      Freight_Metric_Tonnes: {
        type: Sequelize.REAL
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
    await queryInterface.dropTable('Airports');
  }
};
