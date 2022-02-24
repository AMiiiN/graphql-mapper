const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();
const { buildQuery } = require("./utils");

// Read in questions from text file
const fs = require('fs');
const readline = require('readline');
var questions = [];
function readQuestions(inputFile) {
    var questions = [];
    fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach(function(line){
        //console.log(line);
        questions.push(line);
    })
    return questions;
}
questions = readQuestions("questions.txt");
console.log(questions.length + " questions loaded.");

// Run routine

const similarityThreshold = 0.80;
const operationTypes = ['avg', 'min', 'max'];

const { identifyOperation, identifyType, identifyFields } = require("./nlqprocessing");

var queries = [];
// for each question
for (var i=0; i<questions.length; i++) {
    var { typeLevelNames, fieldLevelNames } = require('./data/aircraft/aircraft');
    console.log("Question: " + questions[i]);
    // Find special (aggregated) operation types
    var operationTypeName = identifyOperation(questions[i], 0.9, false);

    // Find the one with the highest similarity to the user input
    var idTypeName = identifyType(questions[i], typeLevelNames, similarityThreshold, false);
    if (idTypeName == null) {
        console.log("\nError: No corresponding type found.");
        queries.push("No types found.");
    }

    // Filter the field-level names (keep only the ones that belong to the identified type)
    var idTypeIndex = typeLevelNames.indexOf(idTypeName);
    fieldLevelNames = fieldLevelNames[idTypeIndex];

    // Identify the requested fields
    var idFieldNames = identifyFields(questions[i], fieldLevelNames, similarityThreshold, false);
    if (idFieldNames.length == 0) {
        console.log("\nError: No corresponding fields found.");
        queries.push("No fields found.");
    }

    // Build the corresponding GraphQL query
    var minimizedQuery = buildQuery(operationTypeName, idTypeName, idFieldNames, true);
    console.log(minimizedQuery);
    queries.push(minimizedQuery);
}

// Write log
var queriesString = '';
for (var i=0; i<queries.length; i++) {
    queriesString += queries[i] + "\n";
}
try {
  const data = fs.writeFileSync('log.txt', queriesString)
  //file written successfully
} catch (err) {
  console.error(err)
}


