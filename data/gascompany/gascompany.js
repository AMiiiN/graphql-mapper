const { gql } = require('apollo-server');
const { stdResolvers } = require('./../../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Company implements BaseType {
        ID: ID!
        Rank: Int
        Name: String
        Headquarters: String
        Main_Industry: String
        Sales: Float
        Profits: Float
        Assets: Float
        Market_Value: Float
        Stations: [GasStation]
    }
    type GasStation implements BaseType {
        ID: ID!
        Open_Year: Int
        Location: String
        Manager_Name: String
        Vice_Name: String
        Representative_Name: String
        Company: Company
        Rank_of_Year: Int
    }
    type Query {
        companies: [Company]
        stations: [GasStation]
        avg(type: String, field: String): Float
        min(type: String, field: String): Float
        max(type: String, field: String): Float
        sum(type: String, field: String): Float
        count(type: String): Int
        getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
    }
`);

var gas_stations = [];
var companies = [
    {
        ID: 1,
        Rank: 1,
        Name: 'ExxonMobil',
        Headquarters: 'USA',
        Main_Industry: 'Oil and gas',
        Sales: 433.5,
        Profits: 41.1,
        Assets: 331.1,
        Market_Value: 407.4,
        Stations: gas_stations.filter(obj => ((obj.ID == 11) || (obj.ID == 4)))
    },
    {
        ID: 2,
        Rank: 3,
        Name: 'General Electric',
        Headquarters: 'USA',
        Main_Industry: 'Conglomerate',
        Sales: 147.3,
        Profits: 14.2,
        Assets: 717.2,
        Market_Value: 213.7,
        Stations: []
    },
    {
        ID: 3,
        Rank: 4,
        Name: 'Royal Dutch Shell',
        Headquarters: 'Netherlands',
        Main_Industry: 'Oil and gas',
        Sales: 470.2,
        Profits: 30.9,
        Assets: 340.5,
        Market_Value: 227.6,
        Stations: gas_stations.filter(obj => obj.ID == 1)
    },
    {
        ID: 4,
        Rank: 5,
        Name: 'Industrial and Commercial Bank of China',
        Headquarters: 'China',
        Main_Industry: 'Banking',
        Sales: 82.6,
        Profits: 25.1,
        Assets: 2039.1,
        Market_Value: 237.4,
        Stations: []
    },
    {
        ID: 5,
        Rank: 6,
        Name: 'HSBC',
        Headquarters: 'UK',
        Main_Industry: 'Banking',
        Sales: 102,
        Profits: 16.2,
        Assets: 2550,
        Market_Value: 164.3,
        Stations: []
    },
    {
        ID: 6,
        Rank: 7,
        Name: 'PetroChina',
        Headquarters: 'China',
        Main_Industry: 'Oil and gas',
        Sales: 310.1,
        Profits: 20.6,
        Assets: 304.7,
        Market_Value: 294.7,
        Stations: gas_stations.filter(obj => obj.ID == 6)
    },
    {
        ID: 7,
        Rank: 8,
        Name: 'Berkshire Hathaway',
        Headquarters: 'USA',
        Main_Industry: 'Conglomerate',
        Sales: 143.7,
        Profits: 10.3,
        Assets: 392.6,
        Market_Value: 202.2,
        Stations: []
    },
    {
        ID: 8,
        Rank: 9,
        Name: 'Wells Fargo',
        Headquarters: 'USA',
        Main_Industry: 'Banking',
        Sales: 87.6,
        Profits: 15.9,
        Assets: 1313.9,
        Market_Value: 178.7,
        Stations: []
    },
    {
        ID: 9,
        Rank: 10,
        Name: 'Petrobras',
        Headquarters: 'Brazil',
        Main_Industry: 'Oil and gas',
        Sales: 145.9,
        Profits: 20.1,
        Assets: 319.4,
        Market_Value: 180.0,
        Stations: gas_stations.filter(obj => obj.ID == 7)
    },
    {
        ID: 10,
        Rank: 11,
        Name: 'BP',
        Headquarters: 'UK',
        Main_Industry: 'Oil and gas',
        Sales: 375.5,
        Profits: 25.7,
        Assets: 292.5,
        Market_Value: 147.4,
        Stations: gas_stations.filter(obj => obj.ID == 10)
    }
];
gas_stations = [
    {
        ID: 1,
        Open_Year: 1998,
        Location: "Herne Hill",
        Manager_Name: "Brian Wingrave",
        Vice_Name: "Russell Denman",
        Representative_Name: "Clive Burr",
        Company: companies.filter(obj => obj.ID == 3),
        Rank_of_Year: 2
    },
    {
        ID: 2,
        Open_Year: 1999,
        Location: "Channel Hill",
        Manager_Name: "Simon Marloe",
        Vice_Name: "Russell Brown",
        Representative_Name: "Rob Jefferies",
        Company: null,
        Rank_of_Year: null
    },
    {
        ID: 3,
        Open_Year: 2000,
        Location: "Reading North",
        Manager_Name: "Simon Cope Derek Marloe",
        Vice_Name: "James Colin",
        Representative_Name: "Dave Edwards Roger",
        Company: null,
        Rank_of_Year: null
    },
    {
        ID: 4,
        Open_Year: 2002,
        Location: "Herne St",
        Manager_Name: "Colin Denman",
        Vice_Name: "Martin Garnham",
        Representative_Name: "Ray Hughes",
        Company: companies.filter(obj => obj.ID == 1),
        Rank_of_Year: 13
    },
    {
        ID: 5,
        Open_Year: 2003,
        Location: "Reading",
        Manager_Name: "Colin Denman",
        Vice_Name: "Martin Freeman",
        Representative_Name: "Andrew Russell",
        Company: null,
        Rank_of_Year: null
    },
    {
        ID: 6,
        Open_Year: 2004,
        Location: "Herne Ave",
        Manager_Name: "Tom Whit",
        Vice_Name: "Simon Gaywood",
        Representative_Name: "Tony Gibb",
        Company: companies.filter(obj => obj.ID == 6),
        Rank_of_Year: 3
    },
    {
        ID: 7,
        Open_Year: 2005,
        Location: "Henry Hill",
        Manager_Name: "Bryan Taylor",
        Vice_Name: "James Holland-Leader",
        Representative_Name: "Simon Gaywood",
        Company: companies.filter(obj => obj.ID == 9),
        Rank_of_Year: 4
    },
    {
        ID: 8,
        Open_Year: 2006,
        Location: "Jane Ave",
        Manager_Name: "Bryan Denman",
        Vice_Name: "James Holland-Leader",
        Representative_Name: "Simon Gaywood",
        Company: null,
        Rank_of_Year: null
    },
    {
        ID: 9,
        Open_Year: 2007,
        Location: "Maindy Hill",
        Manager_Name: "Tony Bristow",
        Vice_Name: "Jame Marloe",
        Representative_Name: "Courtney Rowe",
        Company: null,
        Rank_of_Year: null
    },
    {
        ID: 10,
        Open_Year: 2008,
        Location: "Maindy Ave",
        Manager_Name: "Luke Rowe",
        Vice_Name: "Tony Bristow",
        Representative_Name: "Chris Pyatt",
        Company: companies.filter(obj => obj.ID == 10),
        Rank_of_Year: 9
    },
    {
        ID: 11,
        Open_Year: 2009,
        Location: "Newport Rd",
        Manager_Name: "Jon Rowe",
        Vice_Name: "Steve Parsons",
        Representative_Name: "Tim Read",
        Company: companies.filter(obj => obj.ID == 1),
        Rank_of_Year: 1
    }
];
companies = [
    {
        ID: 1,
        Rank: 1,
        Name: 'ExxonMobil',
        Headquarters: 'USA',
        Main_Industry: 'Oil and gas',
        Sales: 433.5,
        Profits: 41.1,
        Assets: 331.1,
        Market_Value: 407.4,
        Stations: gas_stations.filter(obj => ((obj.ID == 11) || (obj.ID == 4)))
    },
    {
        ID: 2,
        Rank: 3,
        Name: 'General Electric',
        Headquarters: 'USA',
        Main_Industry: 'Conglomerate',
        Sales: 147.3,
        Profits: 14.2,
        Assets: 717.2,
        Market_Value: 213.7,
        Stations: []
    },
    {
        ID: 3,
        Rank: 4,
        Name: 'Royal Dutch Shell',
        Headquarters: 'Netherlands',
        Main_Industry: 'Oil and gas',
        Sales: 470.2,
        Profits: 30.9,
        Assets: 340.5,
        Market_Value: 227.6,
        Stations: gas_stations.filter(obj => obj.ID == 1)
    },
    {
        ID: 4,
        Rank: 5,
        Name: 'Industrial and Commercial Bank of China',
        Headquarters: 'China',
        Main_Industry: 'Banking',
        Sales: 82.6,
        Profits: 25.1,
        Assets: 2039.1,
        Market_Value: 237.4,
        Stations: []
    },
    {
        ID: 5,
        Rank: 6,
        Name: 'HSBC',
        Headquarters: 'UK',
        Main_Industry: 'Banking',
        Sales: 102,
        Profits: 16.2,
        Assets: 2550,
        Market_Value: 164.3,
        Stations: []
    },
    {
        ID: 6,
        Rank: 7,
        Name: 'PetroChina',
        Headquarters: 'China',
        Main_Industry: 'Oil and gas',
        Sales: 310.1,
        Profits: 20.6,
        Assets: 304.7,
        Market_Value: 294.7,
        Stations: gas_stations.filter(obj => obj.ID == 6)
    },
    {
        ID: 7,
        Rank: 8,
        Name: 'Berkshire Hathaway',
        Headquarters: 'USA',
        Main_Industry: 'Conglomerate',
        Sales: 143.7,
        Profits: 10.3,
        Assets: 392.6,
        Market_Value: 202.2,
        Stations: []
    },
    {
        ID: 8,
        Rank: 9,
        Name: 'Wells Fargo',
        Headquarters: 'USA',
        Main_Industry: 'Banking',
        Sales: 87.6,
        Profits: 15.9,
        Assets: 1313.9,
        Market_Value: 178.7,
        Stations: []
    },
    {
        ID: 9,
        Rank: 10,
        Name: 'Petrobras',
        Headquarters: 'Brazil',
        Main_Industry: 'Oil and gas',
        Sales: 145.9,
        Profits: 20.1,
        Assets: 319.4,
        Market_Value: 180.0,
        Stations: gas_stations.filter(obj => obj.ID == 7)
    },
    {
        ID: 10,
        Rank: 11,
        Name: 'BP',
        Headquarters: 'UK',
        Main_Industry: 'Oil and gas',
        Sales: 375.5,
        Profits: 25.7,
        Assets: 292.5,
        Market_Value: 147.4,
        Stations: gas_stations.filter(obj => obj.ID == 10)
    }
];

const allTypes = {
    "companies": companies,
    "stations": gas_stations
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
            if (obj.Headquarters) {
                return "Company"
            }
            if (obj.Open_Year) {
                return "GasStation"
            }
        }
    },
    Query: {
        companies: () => companies,
        stations: () => gas_stations,
        // standard resolvers
        ...stdResolvers(allTypes)
    }
};

const typeLevelNames = ['companies', 'stations'];
const fieldLevelNames = [
    ['ID', 'Rank', 'Name', 'Headquarters', 'Main_Industry', 'Sales', 'Profits', 'Assets', 'Market_Value', 'Stations'],
    ['ID', 'Open_Year', 'Location', 'Manager_Name', 'Vice_Name', 'Representative_Name', 'Company', 'Rank_of_Year']
];

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames };
