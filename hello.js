var { graphql, buildSchema } = require('graphql');
const fs = require('fs');

/*
var schema = buildSchema(`
  type Query {
    hello: String,
    name: String,
    age: Int
  }
`);
*/

const input_data = fs.readFileSync('data/sample-schema.gql').toString();
console.log("File read in.");

var schema = buildSchema(input_data);
console.log("Schema built successfully.");

var root = {
  hello: () => 'Hello world!',
  name: () => 'Amin Harig',
  age: () => 24
};

graphql(schema, '{ hello, name, age }', root).then((response) => {
  console.log(response);
  console.log("---");
  console.log("Name: " + response.data.name);
  console.log("Age: " + response.data.age)
});
