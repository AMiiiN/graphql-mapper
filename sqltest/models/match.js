'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Match.init({
    Round: DataTypes.REAL,
    Location: DataTypes.STRING,
    Country: DataTypes.STRING,
    Date: DataTypes.STRING,
    Fastest_Qualifying: DataTypes.STRING,
    Winning_Pilot: DataTypes.STRING,
    Winning_Aircraft: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};