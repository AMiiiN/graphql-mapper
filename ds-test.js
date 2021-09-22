const fs = require('fs');
var utils = require("./utils");
const { graphql, buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server');
const aircraftDB = require("./data/aircraft/aircraft-db");

// Import GraphQL data
const data = require('./data/aircraft/aircraft');
const typeDefs = data.schema;
const resolvers = data.resolverDB;

const knex = require('knex')({
  client: 'sqlite',
  connection: {
    filename: "./data/aircraft/aircraft.sqlite"
  },
  useNullAsDefault: true
});
const db = new aircraftDB(knex);

// Create ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => ({ db }) });

// Launch ApolloServer
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
