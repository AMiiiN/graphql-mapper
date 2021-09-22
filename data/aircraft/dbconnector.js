const { Sequelize } = require('sequelize');
//var { casual } = require('casual');

const db = new Sequelize('aircraft', null, null, {
  dialect: 'sqlite',
  storage: './aircraft.sqlite'
});

const PilotModel = db.define('pilot', {
  Pilot_Id: { type: Sequelize.INTEGER },
  Name: { type: Sequelize.STRING },
  Age: { type: Sequelize.INTEGER }
});

const models = db.models;

module.exports = { models };
