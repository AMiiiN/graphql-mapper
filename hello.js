var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    name: String
  }
`);

var root = {
  hello: () => 'Hello world!',
  name: () => 'Amin Harig'
};

graphql(schema, '{ hello, name }', root).then((response) => {
  console.log(response);
  console.log("---");
  console.log("Name: " + response.data.name);
});
