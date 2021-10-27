const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();
const { identifyType, identifyFields } = require("./nlqprocessing");
const { buildQuery, buildCurl } = require("./utils");
const http = require('http');

/*const { ApolloClient, gql } = require("@apollo/client/core");
const { cache } = require("./cache");

// Set up Apollo Client
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql"
});
*/

const similarityThreshold = 0.8;

// Get the user input
var rawInput = prompt("Please enter your query: ");

// TODO: Get the type-level and field-level names
// Type-level: array of strings e.g. ["Pilots", "Aircrafts"]
// Field-level: array of arrays of strings e.g. [['Name', 'Age'], ['Model', 'Brand']] in order of type-level fields
var typeLevelNames = [];
var fieldLevelNames = [];

// SAMPLES
typeLevelNames = ['pilots', 'aircrafts', 'airports'];
fieldLevelNames = [['Name', 'Age', 'Email'],
['Model', 'Brand', 'Description'],
['Name', 'City', 'Country', 'Passengers_per_year']];
// SAMPLES

// Find the one with the highest similarity to the user input
var idTypeName = identifyType(rawInput, typeLevelNames, similarityThreshold);
if (idTypeName == null) {
  console.log("Error: No fitting database found.");
  return;
}

// Filter the field-level names (keep only the ones that belong to the identified type)
var idTypeIndex = typeLevelNames.indexOf(idTypeName);
fieldLevelNames = fieldLevelNames[idTypeIndex];

// Identify the requested fields
var idFieldNames = identifyFields(rawInput, fieldLevelNames, similarityThreshold);
if (idFieldNames.length == 0) {
  console.log("Error: No fitting fields found.");
  return;
}

// Notify about the identified types and fields
console.log("Looking up the fields " + idFieldNames + " in \"" + idTypeName + "\".");

// Build the corresponding GraphQL query
var generatedQuery = buildQuery(idTypeName, idFieldNames, false);
var minimizedQuery = buildQuery(idTypeName, idFieldNames, true);
console.log("Generated query: \n" + generatedQuery);

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
console.log("Generated curl: \n" + generatedCurl);

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
