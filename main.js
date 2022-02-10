const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();
const { identifyOperation, identifyType, identifyFields } = require("./nlqprocessing");
const { buildQuery, buildCurl } = require("./utils");
const https = require('https');
var { typeLevelNames, fieldLevelNames } = require('./data/aircraft/aircraft');

const similarityThreshold = 0.80;
const operationTypes = ['avg', 'min', 'max'];

// Get the user input
var rawInput = prompt("Please enter your query: ");

// TODO: Get the type-level and field-level names
// Type-level: array of strings e.g. ["Pilots", "Aircrafts"]
// Field-level: array of arrays of strings e.g. [['Name', 'Age'], ['Model', 'Brand']] in order of type-level fields
//var typeLevelNames = [];
//var fieldLevelNames = [];

// SAMPLES
//typeLevelNames = ['pilots', 'aircrafts', 'airports', 'matches'];
//fieldLevelNames = [['ID', 'Name', 'Age', 'Email'],
//['ID', 'Name_Model', 'Description', 'Max_Weight', 'Total_disk_area', 'Max_disk_Loading'],
//['ID', 'Name', 'Total_Ps', 'Change_2007', 'International_Ps', 'Domestic_Ps', 'Transit_Ps', 'Aircraft_Movements', 'Freight_Metric_Tonnes'],
//['ID', 'Round', 'Location', 'Country', 'Date', 'Fastest_Qualifying', 'Winning_Pilot', 'Winning_Aircraft']];
// SAMPLES

// Find special (aggregated) operation types
console.log("-------------------------------------------------");
var operationTypeName = identifyOperation(rawInput, 0.9);

// Find the one with the highest similarity to the user input
var idTypeName = identifyType(rawInput, typeLevelNames, similarityThreshold);
if (idTypeName == null) {
  console.log("\nError: No corresponding type found.");
  return;
}

// Filter the field-level names (keep only the ones that belong to the identified type)
var idTypeIndex = typeLevelNames.indexOf(idTypeName);
fieldLevelNames = fieldLevelNames[idTypeIndex];

// Identify the requested fields
var idFieldNames = identifyFields(rawInput, fieldLevelNames, similarityThreshold);
if (idFieldNames.length == 0) {
  console.log("\nError: No corresponding fields found.");
  return;
}

// Notify about the identified types and fields
console.log("\n--> Looking up the fields " + idFieldNames + " in \"" + idTypeName + "\".");

// Build the corresponding GraphQL query
var generatedQuery = buildQuery(operationTypeName, idTypeName, idFieldNames, false);
var minimizedQuery = buildQuery(operationTypeName, idTypeName, idFieldNames, true);
console.log("-------------------------------------------------");
console.log("Generated query: \n\n" + generatedQuery);

/*
// Run the query in the client
client
  .query({
    query: gql(generatedQuery)
  })
  .then(result => console.log("Server response: \n" + result));
  */

// Generate cURL
var generatedCurl = buildCurl(minimizedQuery);
//console.log("Generated curl: \n" + generatedCurl);

const child_process = require('child_process');

function runCmd(cmd)
{
    var resp = child_process.execSync(cmd, {stdio: 'pipe'});
    var result = resp.toString('UTF8');
    return result;
}

var result = runCmd(generatedCurl);
console.log("-------------------------------------------------");
console.log("Result received from GraphQL server: \n");
console.log(result);
console.log("-------------------------------------------------");

/*
// Run cURL
var post_options = {
  hostname: 'http://localhost:4000/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
var post_data = "{\"query\":\"" + minimizedQuery + "\"}";

// Set up the request
 var post_req = http.request(post_options, function(res) {
   res.setEncoding('utf8');
   res.on('data', function (chunk) {
       console.log('\n\nResponse: ' + chunk);
   });
 });

 // post the data
 post_req.write(post_data);
 post_req.end();
*/
