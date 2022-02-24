const { gql } = require('apollo-server');
const { stdResolvers } = require('./../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Author implements BaseType {
        ID: ID!
        Homepage: String
        Name: String
        Domain: [Domain]
        Organization: Organization
        Publications: [Publication]
        Dummy_author: Int
    }
    type Conference implements BaseType {
        ID: ID!
        Name: String
        Domain: [Domain]
        Dummy_conference: Int
    }
    type Domain implements BaseType {
        ID: ID!
        Name: Text
        Authors: [Author]
        Conferences: [Conference]
        Journals: [Journal]
        Dummy_domain: Int
    }
    type Journal implements BaseType {
        ID: ID!
        Homepage: String
        Name: String
        Domain: [Domain]
        Dummy_journal: Int
    }
    type Keyword implements BaseType {
        ID: ID!
        Keyword: String
        Domain: [Domain]
    }
    type Publication implements BaseType {
        ID: ID!
        Abstract: String
        Conference: Conference
        Number_citations: Int
        Journal: Journal
        Reference_number: Int
        Title: String
        Year: Int
        Domain: [Domain]
        Keywords: [Keyword]
        Authors: [Author]
        Citing: [Publication]
        Citations: [Publication]
    }
    type Organization implements BaseType {
        ID: ID!
        Continent: String
        Homepage: String
        Name: String
    }

`);

const authors = [];
const conferences = [];
const publications = [];
const journals = [];
const keywords = [];
const organizations = [];
const domains = [];
const allTypes = {
    "authors": authors,
    "conferences": conferences,
    "publications": publications,
    "journals": journals,
    "keywords": keywords,
    "organizations": organizations,
    "domains": domains
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Dummy_author) {
            return "Author"
          }
          if (obj.Dummy_conference) {
            return "Conference"
          }
          if (obj.Dummy_domain) {
            return "Domain"
          }
          if (obj.Dummy_journal) {
              return "Journal"
          }
          if (obj.Keyword) {
              return "Keyword"
          }
          if (obj.Citations) {
              return "Publication"
          }
          if (obj.Continent) {
              return "Organization"
          }
        }
    },
    Query: {
        authors: () => authors,
        conferences: () => conferences,
        journals: () => journals,
        domains: () => domains,
        keywords: () => keywords,
        publications: () => publications,
        organizations: () => organizations,
        // standard resolvers
        ...stdResolvers(allTypes),
    }
};

const typeLevelNames = ['authors', 'conferences', 'domains', 'journals', 'keywords', 'publications', 'organizations'];
const fieldLevelNames = [['ID', 'Homepage', 'Name', 'Domain', 'Organization', 'Publications'],
['ID', 'Name', 'Domain'],
['ID', 'Name', 'Authors', 'Conferences', 'Journals'],
['ID', 'Homepage', 'Name', 'Domain'],
['ID', 'Keyword', 'Domain'],
['ID', 'Abstract', 'Conference', 'Number_citations', 'Journal', 'Reference_number', 'Title', 'Year', 'Domain', 'Keywords', 'Authors', 'Citing', 'Citations'],
['ID', 'Continent', 'Homepage', 'Name']];

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames };