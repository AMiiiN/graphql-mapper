var { graphql, buildSchema } = require('graphql');
const fs = require('fs');
var utils = require("./utils");
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Path to the GraphQL data file
const src_path = "data/sample.gql";

// Create GraphQL schema from file
var schema = utils.buildSchemaFromPath(src_path);

var root = {
  hello: () => 'Hello world!',
  name: () => 'Amin Harig',
  age: () => 24
};

// // Execute GraphQL query
// graphql(schema, '{ hello, name, age }', root).then((response) => {
//   console.log(response);
//   console.log("---");
//   console.log("Name: " + response.data.name);
//   console.log("Age: " + response.data.age)
// });

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
