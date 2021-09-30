const fs = require('fs');
const training_json = require('./cosql_train.json');

var totalCountQueries = 0;
var entireJSON = {};

var currentJSON = {};
for (var i=0; i<training_json.length; i++) {
  var finalQuery = training_json[i].final.query;
  var currentDBID = training_json[i].database_id;
  currentJSON = {
    "query": finalQuery,
    "databaseID": currentDBID
  };
  entireJSON.push(currentJSON);
  //console.log(training_json[i].final.query);
  totalCountQueries++;

  for (var j=0; j<training_json[i].interaction.length; j++) {
    //console.log(training_json[i].interaction[j].query);
    totalCountQueries++;
  }

}

console.log("-- Total extracted queries: " + totalCountQueries);
