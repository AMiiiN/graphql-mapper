const fs = require('fs');
const training_json = require('./cosql_train.json');

var totalCountQueries = 0;
var entireJSON = {};
var queriesJSON = [];
entireJSON.queries = queriesJSON;

const desired_database = "aircraft";

var currentJSON = {};
for (var i=0; i<training_json.length; i++) {
  var finalQuery = training_json[i].final.utterance;
  var currentDBID = training_json[i].database_id;
  if (currentDBID != desired_database) {
    continue;
  }
  currentJSON = {
    "query": finalQuery,
    "databaseID": currentDBID
  };
  entireJSON.queries.push(currentJSON);
  //console.log(training_json[i].final.query);
  totalCountQueries++;

  for (var j=0; j<training_json[i].interaction.length; j++) {
    //console.log(training_json[i].interaction[j].query);
    finalQuery = training_json[i].interaction[j].utterance;
    currentJSON = {
      "query": finalQuery,
      "databaseID": currentDBID
    };
    entireJSON.queries.push(currentJSON);
    totalCountQueries++;
  }

}

var export_filename = 'extracted_queries_aircraft.json';
fs.writeFileSync(export_filename, JSON.stringify(entireJSON, null, 3));
console.log("-- Total extracted queries: " + totalCountQueries);
console.log("File saved as " + export_filename);
