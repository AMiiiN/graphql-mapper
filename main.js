const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();
const { identifyType, identifyFields } = require("./nlqprocessing");
const { buildQuery } = require("./utils");

const similarityThreshold = 0.8;

// Get the user input
var rawInput = prompt("Please enter your query: ");

// TODO: Get the type-level and field-level names
// Type-level: array of strings e.g. ["Pilots", "Aircrafts"]
// Field-level: array of arrays of strings e.g. [['Name', 'Age'], ['Model', 'Brand']] in order of type-level fields
var typeLevelNames = [];
var fieldLevelNames = [];

// SAMPLES
typeLevelNames = ['Pilots', 'Aircrafts', 'Airports'];
fieldLevelNames = [['Name', 'Age', 'Email'], ['Model', 'Brand'], ['Name', 'City', 'Country', 'Passengers per year']];
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

// TODO: Create corresponding GraphQL query
var generatedQuery = buildQuery(idTypeName, idFieldNames);
console.log("Generated query: \n" + generatedQuery);
