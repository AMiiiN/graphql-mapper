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
        Level_of_Membership: Int
        Address: String!
        Happy_Hours: [HappyHour]
    }
    type HappyHour implements BaseType {
        ID: ID!
        Shop_ID: Shop!
        Month: String!
        Staff_in_charge: Int
        Members: [Member]
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
        Open_Year: 2010,
        Happy_Hours: happyhours.filter(obj => ((obj.ID <= 2) || (obj.ID == 5) || (obj.ID == 6)))
    },
    {
        ID: 2,
        Address: "1111 Main Street",
        Number_of_staff: 19,
        Score: 38,
        Open_Year: 2008,
        Happy_Hours: happyhours.filter(obj => obj.ID == 7)
    },
    {
        ID: 3,
        Address: "1330 Baltimore Street",
        Number_of_staff: 42,
        Score: 36,
        Open_Year: 2010,
        Happy_Hours: happyhours.filter(obj => obj.ID >= 8)
    },
    {
        ID: 4,
        Address: "909 Walnut Street",
        Number_of_staff: 27,
        Score: 32,
        Open_Year: 2010,
        Happy_Hours: []
    },
    {
        ID: 5,
        Address: "414 E. 12th Street",
        Number_of_staff: 24,
        Score: 30,
        Open_Year: 2011,
        Happy_Hours: happyhours.filter(obj => obj.ID == 4)
    },
    {
        ID: 6,
        Address: "1201 Walnut Street",
        Number_of_staff: 34,
        Score: 30,
        Open_Year: 2010,
        Happy_Hours: []
    },
    {
        ID: 7,
        Address: "2345 McGee Street",
        Number_of_staff: 425,
        Score: 40,
        Open_Year: 2008,
        Happy_Hours: []
    },
    {
        ID: 8,
        Address: "909 Main Street",
        Number_of_staff: 28,
        Score: 30,
        Open_Year: 2011,
        Happy_Hours: []
    },
    {
        ID: 9,
        Address: "1100 Main Street",
        Number_of_staff: 23,
        Score: 30,
        Open_Year: 2006,
        Happy_Hours: []
    },
    {
        ID: 10,
        Address: "324 E. 11th Street",
        Number_of_staff: 16,
        Score: 28,
        Open_Year: 2008,
        Happy_Hours: happyhours.filter(obj => obj.ID == 3)
    }
];
const members = [
    {
        ID: 1,
        Name: 'Ashby, Lazale',
        Membership_Card: 'Black',
        Age: 29,
        Time_of_purchase: 18,
        Level_of_membership: 5,
        Address: 'Hartford',
        Happy_Hours: []
    },
    {
        ID: 2,
        Name: 'Breton, Robert',
        Membership_Card: 'White',
        Age: 67,
        Time_of_purchase: 41,
        Level_of_membership: 4,
        Address: 'Waterbury',
        Happy_Hours: []
    },
    {
        ID: 3,
        Name: 'Campbell, Jessie',
        Membership_Card: 'Black',
        Age: 34,
        Time_of_purchase: 20,
        Level_of_membership: 6,
        Address: 'Hartford',
        Happy_Hours: happyhours.filter(obj => ((obj.ID == 1) || (obj.ID) == 4))
    },
    {
        ID: 4,
        Name: 'Cobb, Sedrick',
        Membership_Card: 'Black',
        Age: 51,
        Time_of_purchase: 27,
        Level_of_membership: 2,
        Address: 'Waterbury',
        Happy_Hours: []
    },
    {
        ID: 5,
        Name: 'Hayes, Steven',
        Membership_Card: 'White',
        Age: 50,
        Time_of_purchase: 44,
        Level_of_membership: 3,
        Address: 'Cheshire',
        Happy_Hours: happyhours.filter(obj => ((obj.ID == 2) || (obj.ID) == 5))
    },
    {
        ID: 6,
        Name: 'Komisarjevsky, Joshua',
        Membership_Card: 'White',
        Age: 33,
        Time_of_purchase: 26,
        Level_of_membership: 2,
        Address: 'Cheshire',
        Happy_Hours: []
    },
    {
        ID: 7,
        Name: 'Peeler, Russell',
        Membership_Card: 'Black',
        Age: 42,
        Time_of_purchase: 26,
        Level_of_membership: 6,
        Address: 'Bridgeport',
        Happy_Hours: []
    },
    {
        ID: 8,
        Name: 'Reynolds, Richard',
        Membership_Card: 'Black',
        Age: 45,
        Time_of_purchase: 24,
        Level_of_membership: 1,
        Address: 'Waterbury',
        Happy_Hours: []
    },
    {
        ID: 9,
        Name: 'Rizzo, Todd',
        Membership_Card: 'White',
        Age: 35,
        Time_of_purchase: 18,
        Level_of_membership: 4,
        Address: 'Waterbury',
        Happy_Hours: happyhours.filter(obj => ((obj.ID == 7) || (obj.ID) == 8))
    },
    {
        ID: 10,
        Name: 'Webb, Daniel',
        Membership_Card: 'Black',
        Age: 51,
        Time_of_purchase: 27,
        Level_of_membership: 22,
        Address: 'Hartford',
        Happy_Hours: []
    }
];
const happyhours = [
    {
        ID: 1,
        Shop: shops.filter(obj => obj.ID == 1),
        Month: 'May',
        Staff_in_charge: 10,
        Members: members.filter(obj => obj.ID == 3)
    },
    {
        ID: 2,
        Shop: shops.filter(obj => obj.ID == 1),
        Month: 'April',
        Staff_in_charge: 12,
        Members: members.filter(obj => obj.ID == 5)
    },
    {
        ID: 3,
        Shop: shops.filter(obj => obj.ID == 10),
        Month: 'June',
        Staff_in_charge: 15,
        Members: []
    },
    {
        ID: 4,
        Shop: shops.filter(obj => obj.ID == 5),
        Month: 'July',
        Staff_in_charge: 5,
        Members: members.filter(obj => obj.ID == 3)
    },
    {
        ID: 5,
        Shop: shops.filter(obj => obj.ID == 1),
        Month: 'May',
        Staff_in_charge: 10,
        Members: members.filter(obj => obj.ID == 5)
    },
    {
        ID: 6,
        Shop: shops.filter(obj => obj.ID == 1),
        Month: 'April',
        Staff_in_charge: 12,
        Members: []
    },
    {
        ID: 7,
        Shop: shops.filter(obj => obj.ID == 2),
        Month: 'June',
        Staff_in_charge: 5,
        Members: members.filter(obj => obj.ID == 9)
    },
    {
        ID: 8,
        Shop: shops.filter(obj => obj.ID == 3),
        Month: 'July',
        Staff_in_charge: 15,
        Members: members.filter(obj => obj.ID == 9)
    },
    {
        ID: 9,
        Shop: shops.filter(obj => obj.ID == 3),
        Month: 'May',
        Staff_in_charge: 3,
        Members: []
    },
    {
        ID: 10,
        Shop: shops.filter(obj => obj.ID == 3),
        Month: 'April',
        Staff_in_charge: 4,
        Members: []
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
          if (obj.Open_Year) {
            return "Shop"
          }
          if (obj.Membership_Card) {
            return "Member"
          }
          if (obj.Month) {
            return "HappyHour"
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