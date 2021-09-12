const fs = require('fs');
var { graphql, buildSchema } = require('graphql');

function buildSchemaFromPath(path) {
  var input_data = fs.readFileSync(path).toString();
  var schema = buildSchema(input_data);
  return schema;
}

module.exports = { buildSchemaFromPath };
