const minimize_graphql = true;
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

// Function for mapping SQL types to GraphQL scalar types
function mapFieldType(type) {
  var ground_type = type.split("(")[0]; // ignore size constraints like in VARCHAR(20)
  var result_graphql_type = '';
  switch(ground_type.toUpperCase()) {
    case 'INTEGER':
      result_graphql_type = 'Int';
      break;
    case 'INT':
      result_graphql_type = 'Int';
      break;
    case 'TEXT':
      result_graphql_type = 'String';
      break;
    case 'VARCHAR':
      result_graphql_type = 'String';
      break;
    case 'CHAR':
      result_graphql_type = 'String';
      break;
    case 'BOOLEAN':
      result_graphql_type = 'Boolean';
      break;
    default:
      console.log("Error: Could not determine field type (" + ground_type + ")");
  }
  return result_graphql_type;
}

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
        if (minimize_graphql) {
          key_select += ', ';
        }
        else {
          key_select += ',\n\t\t';
        }
      }
    }
  }

  // Put together GraphQL query result according to minimization settings
  if (minimize_graphql) {
    result_query = "{ " + key_from + " { " + key_select + " } }";
  }
  else {
    result_query = "\n{\n\t" + key_from + " {\n\t\t" + key_select + " \n\t} \n}";
  }

  return result_query;
}

// Map CREATE TABLE operations
function handleCreate(query) {
  var graphql_query = "";
  var table_name = "";
  var field_names = [];
  var field_types = [];
  var field_primary_keys = [];
  var field_uniques = [];
  var field_not_nulls = [];

  var first_split = query.split("(");

  // If '(' occurs more than once, we need to concatenate the string back together
  if (first_split.length > 2) { // it does occur more than once
    var temp_split = [];
    for (var i=1; i<first_split.length; i++) {
      temp_split.push(first_split[i]);
    }
    temp_split = temp_split.join("(");
    first_split = [first_split[0], temp_split];
  }

  // First, treat the "CREATE TABLE tableName" part
  var create_table_statement = first_split[0];
  table_name = create_table_statement.split(" ")[2]; // 0: "CREATE", 1: "TABLE", 2: tableName

  // Now, treat the field names part
  var field_statements_total = first_split[1].split(");")[0];
  field_statements = field_statements_total.split(",");
  for (var i=0; i<field_statements.length; i++) {
    // For each statement, remove the newlines and tabs
    field_statements[i] = field_statements[i].replace("\n", "");
    field_statements[i] = field_statements[i].replace("\t", "");

    // Process the current field field statement
    current_field_tokens = field_statements[i].split(" ").filter(tkn => tkn != '');

    // Check for special PRIMARY KEY ('ID')-like statement
    if (current_field_tokens[0] == 'PRIMARY') {
      // Concatenate everything that comes after PRIMARY KEY
      // Example: PRIMARY KEY (Pilot_Id, Age) => Pilot_Id,Age
      var toi = current_field_tokens[2].replace("(", "").replace(")", "").replace("\n", "").replace("\t", "");

      // Find that field and get its index
      for (var j=0; j<field_names.length; j++) {
        if (field_names[j] == toi) {
          // Here, j is the index, so set primary key, not null and unique properties
          field_primary_keys[j] = true;
          field_not_nulls[j] = true;
          field_uniques[j] = true;
          break;  // stop searching further
        }
      }
      break;  // break out of the standard procedure for new field definitions
    }

    // Standard procedure for new field definitions starts here
    field_names.push(current_field_tokens[0]);  // First token is the field name
    field_types.push(mapFieldType(current_field_tokens[1]));

    // Check if other tags are included
    if (current_field_tokens.length > 2) {
      // There are other tags
      // First, check if field is a primary key
      if (current_field_tokens[2] == 'PRIMARY') {
        field_primary_keys.push(true);
        field_uniques.push(true);
        field_not_nulls.push(true);
      }
      else if (current_field_tokens[2] == 'NOT') {
        field_primary_keys.push(false);
        field_not_nulls.push(true);

        // check if also unique tag is included at position n+2
        if (current_field_tokens.length > 4) {
          field_uniques.push(true);
        }
        else {
          field_uniques.push(false);
        }

      }
      else if (current_field_tokens[2] == 'UNIQUE') {
        field_primary_keys.push(false);
        field_uniques.push(true);
        field_not_nulls.push(false);  // after the 'unique' tag, 'not null' can't follow, it would have to be in front of 'unique'
      }
    }
  }

  // Build the GraphQL query (minimized)
  //
  graphql_query += '{ type ' + table_name + ' ';

  // Check if primary key exists
  if (field_primary_keys.includes(true)) {
    // In case that multiple fields are primary keys, go through all of them
    for (var i=0; i<field_primary_keys.length; i++) {
      if (field_primary_keys[i]) {
        graphql_query += "@key(fields: \"" + field_names[i] + "\") ";
      }
    }
  }

  graphql_query += '{ ';

  for (var i=0; i<field_names.length; i++) {
    graphql_query += field_names[i] + ": " + field_types[i];
    if (field_not_nulls[i]) {
      graphql_query += '!';
    }
    if (i<field_names.length-1) {
      graphql_query += ',';
    }
    graphql_query += " ";
  }
  graphql_query += '} }';

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

// Coordinate query handling
function processQuery(query) {
  var result = '';
  // Handle query according to the operation type
  switch(current_operation_type) {
    case 'SELECT':
      result = handleSelect(query);
      break;
    case 'CREATE':
      result = handleCreate(query);
      break;
    case 'DROP':
      result = handleDrop(query);
      break;
    case 'ALTER':
      result = handleAlter(query);
      break;
    case 'TRUNCATE':
      result = handleTruncate(query);
      break;
    case 'INSERT':
      result = handleInsert(query);
      break;
    case 'UPDATE':
      result = handleUpdate(query);
      break;
    case 'DELETE':
      result = handleDelete(query);
      break;
    default:
      console.log("ERROR: Query " + (i+1) + " could not be resolved");
  }
  return result;
}

var queries = [];

/*
// Read in sample queries from JSON file
var inputJSON = require('./extracted_train.json');
for (var i=0; i<3; i++) {
  queries.push(inputJSON.queries[i].query);
}
*/

queries.push(`CREATE TABLE contacts (
	contact_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name varchar(11) NOT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT(256) NOT NULL UNIQUE
);`);

queries.push(`CREATE TABLE pilot (
  Pilot_Id int(11) NOT NULL,
  Name varchar(50) NOT NULL,
  Age int(11) NOT NULL,
  PRIMARY KEY (Pilot_Id)
);`);

queries.push(`SELECT Pilot_Id, Name, avg(Age) FROM pilot`);

var gqlQueries = [];
// Loop for each SQL query

for (var i=0; i < queries.length; i++) {

  // Read in first word of the current query to determine
  // what kind of operation needs to be executed
  var current_sql_query = queries[i];
  var current_graphql_result = '';
  var current_operation_type = queries[i].split(" ")[0];

  current_graphql_result = processQuery(current_sql_query);

  //console.log("Original query " + i + ": " + current_sql_query);
  console.log("\nGraphQL query " + i + " : " + current_graphql_result);

}

console.log("\n");
