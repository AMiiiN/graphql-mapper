'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aircraft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Airport_Aircraft);
    }

  };

  Aircraft.init({
    Aircraft_ID: DataTypes.INTEGER,
    Aircraft: DataTypes.STRING,
    Description: DataTypes.STRING,
    Max_Gross_Weight: DataTypes.STRING,
    Total_disk_area: DataTypes.STRING,
    Max_disk_Loading: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Aircraft',
  });
  return Aircraft;
};
