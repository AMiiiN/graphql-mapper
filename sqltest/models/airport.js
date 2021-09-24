'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Airport_Aircraft);
    }

  };
  Airport.init({
    Airport_ID: DataTypes.INTEGER,
    Airport_Name: DataTypes.STRING,
    Total_Passengers: DataTypes.REAL,
    Change_2007: DataTypes.STRING,
    International_Passengers: DataTypes.REAL,
    Domestic_Passengers: DataTypes.REAL,
    Transit_Passengers: DataTypes.REAL,
    Aircraft_Movements: DataTypes.REAL,
    Freight_Metric_Tonnes: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};
