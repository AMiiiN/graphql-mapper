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

module.exports = { buildSchemaFromPath, buildApolloSchemaFromPath };
