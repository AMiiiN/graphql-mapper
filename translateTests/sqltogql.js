const query_type_keywords = [
  'SELECT',
  'CREATE',
  'DROP',
  'ALTER',
  'TRUNCATE',
  'INSERT',
  'UPDATE',
  'DELETE'
];

// Handle SELECT operations
function handleSelect(query) {
  var result_query = "";

  // Split the query string on keywords
  var tempSplit = query;
  tempSplit = tempSplit.split("SELECT")[1];
  tempSplit = tempSplit.split("FROM");

  key_select = tempSplit[0].replace(/\s/g, '');
  key_from = tempSplit[1].replace(/\s/g, '');

  // Check whether SELECT (multiple attributes) separated by commata
  if (key_select.includes(',')) {
    var temp = key_select.split(',');
    key_select = '';
    for (var a=0; a<temp.length; a++) {
      key_select += temp[a];
      if (a != temp.length-1) {
        key_select += ', ';
      }
    }
  }

  result_query = "{ " + key_from + " { " + key_select + " } }";

  return result_query;
}

// Map CREATE TABLE operations
function handleCreate(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map DROP TABLE operations
function handleDrop(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map ALTER TABLE operations
function handleAlter(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map TRUNCATE operations
function handleTruncate(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map INSERT INTO operations
function handleInsert(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map UPDATE operations
function handleUpdate(query) {
  var graphql_query = "";
  return graphql_query;
}

// Map DELETE operations
function handleDelete(query) {
  var graphql_query = "";
  return graphql_query;
}

// Read in sample queries from JSON file
var inputJSON = require('./extracted_train.json');
var queries = [];
//for (var i=0; i<inputJSON.queries.length; i++) {
for (var i=0; i<3; i++) {
  queries.push(inputJSON.queries[i].query);
}

var gqlQueries = [];
// Loop for each SQL query

for (var i=0; i < queries.length; i++) {

  // Read in first word of the current query to determine
  // what kind of operation needs to be executed
  var current_sql_query = queries[i];
  var current_graphql_result = '';
  var current_operation_type = queries[i].split(" ")[0];

  // Handle query according to the operation type
  switch(current_operation_type) {
    case 'SELECT':
      current_graphql_result = handleSelect(current_sql_query);
      break;
    case 'CREATE':
      current_graphql_result = handleCreate(current_sql_query);
      break;
    case 'DROP':
      current_graphql_result = handleDrop(current_sql_query);
      break;
    case 'ALTER':
      current_graphql_result = handleAlter(current_sql_query);
      break;
    case 'TRUNCATE':
      current_graphql_result = handleTruncate(current_sql_query);
      break;
    case 'INSERT':
      current_graphql_result = handleInsert(current_sql_query);
      break;
    case 'UPDATE':
      current_graphql_result = handleUpdate(current_sql_query);
      break;
    case 'DELETE':
      current_graphql_result = handleDelete(current_sql_query);
      break;
    default:
      console.log("ERROR: Query " + (i+1) + " could not be resolved");
  }

  console.log("Original query " + i + ": " + current_sql_query);
  console.log("GraphQL query " + i + " : " + current_graphql_result);

}