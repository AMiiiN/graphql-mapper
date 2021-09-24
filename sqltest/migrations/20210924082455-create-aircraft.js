'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Aircraft', {
      Aircraft_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Aircraft: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Max_Gross_Weight: {
        type: Sequelize.STRING
      },
      Total_disk_area: {
        type: Sequelize.STRING
      },
      Max_disk_Loading: {
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
    await queryInterface.dropTable('Aircraft');
  }
};
