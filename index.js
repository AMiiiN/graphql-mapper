const fs = require('fs');
var utils = require("./utils");
const { graphql, buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server');

// Import GraphQL data
const data = require('./data/aircraft/aircraft');
const typeDefs = data.schema;
const resolvers = data.resolver;

// Create ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Launch ApolloServer
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
