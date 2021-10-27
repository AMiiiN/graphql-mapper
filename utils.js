const fs = require('fs');
var { graphql, buildSchema } = require('graphql');
const { gql } = require('apollo-server');

function buildSchemaFromPath(path) {
  var input_data = fs.readFileSync(path).toString();
  var schema = buildSchema(input_data);
  return schema;
}

function buildApolloSchemaFromPath(path) {
  var input = fs.readFileSync(path).toString();
  var schema = gql(input);
  return schema;
}

function buildQuery(typeName, fieldNames, minimize) {
  var query = "";

  if (minimize) {
    query = "query MyQuery { " + typeName + " { ";
    fieldNames.forEach( (fieldName) => {
      query += fieldName;
      if (fieldNames[fieldNames.length-1] != fieldName) {
        query += ", ";
      }
    });
    query += " } }";
  }
  else {
    var query = "query MyQuery {\n";
    query += "\t " + typeName + " {";
    fieldNames.forEach( (fieldName) => {
      query += "\n\t\t" + fieldName;
    });
    query += "\n\t}\n}";
  }
  return query;
}

function buildCurl(query) {
  var curl = `curl --request POST \\
  --header 'content-type: application/json' \\
  --url http://localhost:4000/ \\
  --data '{"query":"`; //XXX"}'`;
  curl += query + "\"}'";
  return curl;
}

module.exports = { buildSchemaFromPath, buildApolloSchemaFromPath,
  buildQuery, buildCurl };
