const { gql } = require('apollo-server');
const { stdResolvers } = require('./../../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Shop implements BaseType {
        ID: ID!
        Address: String!
        Staff: Int
        Score: Int
        Open_Year: Int
        Happy_Hours: [HappyHour]
    }
    type Member implements BaseType {
        ID: ID!
        Name: String!
        Membership_Card: String
        Age: Int
        Time_of_Purchase: Int
        Level_of_Membership: String
        Address: String!
    }
    type HappyHour implements BaseType {
        ID: ID!
        Shop_ID: Shop!
        Month: String
        Staff_in_charge: Int
    }
    type Query {
        shops: [Shop]
        members: [Member]
        happyhours: [HappyHour]
        avg(type: String, field: String): Float
        min(type: String, field: String): Float
        max(type: String, field: String): Float
        sum(type: String, field: String): Float
        count(type: String): Int
        getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
    }
`);

const shops = [
    {
        ID: 1,
        Address: "1200 Main Street",
        Number_of_staff: 13,
        Score: 42,
        Open_Year: 2010
    },
    {
        ID: 2,
        Address: "1111 Main Street",
        Number_of_staff: 19,
        Score: 38,
        Open_Year: 2008
    },
    {
        ID: 3,
        Address: "1330 Baltimore Street",
        Number_of_staff: 42,
        Score: 36,
        Open_Year: 2010
    },
    {
        ID: 4,
        Address: "909 Walnut Street",
        Number_of_staff: 27,
        Score: 32,
        Open_Year: 2010
    },
    {
        ID: 5,
        Address: "414 E. 12th Street",
        Number_of_staff: 24,
        Score: 30,
        Open_Year: 2011
    },
    {
        ID: 6,
        Address: "1201 Walnut Street",
        Number_of_staff: 34,
        Score: 30,
        Open_Year: 2010
    },
    {
        ID: 7,
        Address: "2345 McGee Street",
        Number_of_staff: 425,
        Score: 40,
        Open_Year: 2008
    },
    {
        ID: 8,
        Address: "909 Main Street",
        Number_of_staff: 28,
        Score: 30,
        Open_Year: 2011
    },
    {
        ID: 9,
        Address: "1100 Main Street",
        Number_of_staff: 23,
        Score: 30,
        Open_Year: 2006
    },
    {
        ID: 10,
        Address: "324 E. 11th Street",
        Number_of_staff: 16,
        Score: 28,
        Open_Year: 2008
    }
];
const members = [
    {
        ID: ,
        Name: xxxxx,
        Membership_Card: xxxxx,
        Age: ,
        Time_of_purchase: xxxx,
        Level_of_membership: xxxx,
        Address: xxxxxx
    },
];
const happyhours = [
    {
        ID: xxxx,
        Shop: xxxx,
        Month: xxxx,
        Num_Staff_in_charge: xxxxx
    }
];
const allTypes = {
    "shops": shops,
    "members": members,
    "happyhours": happyhours
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Age) {
            return "Pilot"
          }
          if (obj.Description) {
            return "Aircraft"
          }
          if (obj.Round) {
            return "Match"
          }
          if (obj.Total_Ps) {
            return "Airport"
          }
        }
    },
    Query: {
        shops: () => shops,
        members: () => members,
        happyhours: () => happyhours,
        // standard resolvers
        ...stdResolvers(allTypes),
    }
};

const typeLevelNames = ['shops', 'members', 'happyhours'];
const fieldLevelNames = [['ID', 'Address', 'Staff', 'Score', 'Open_Year', 'Happy_Hours'],
['ID', 'Name', 'Membership_Card', 'Age', 'Time_of_purchase', 'Level_of_membership', 'Address'],
['ID', 'Shop_ID', 'Month', 'Staff_in_charge']];

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames };