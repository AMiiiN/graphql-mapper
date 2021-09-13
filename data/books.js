const { gql } = require('apollo-server');

const schema = gql(`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`);

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolver = {
  Query: {
    books: () => books,
  },
};

module.exports = { schema, resolver };
