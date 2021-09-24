'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport_Aircraft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airport, { foreignKey: 'Airport_ID' });
      this.belongsTo(models.Aircraft, { foreignKey: 'Aircraft_ID' });
    }

  };
  Airport_Aircraft.init({
    Airport_ID: DataTypes.INTEGER,
    Aircraft_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Airport_Aircraft',
  });
  return Airport_Aircraft;
};
