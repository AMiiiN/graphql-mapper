var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    name: String,
    age: Int
  }
`);

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

// Test
