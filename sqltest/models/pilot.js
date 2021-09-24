'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pilot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pilot.init({
    Pilot_Id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pilot',
  });
  return Pilot;
};