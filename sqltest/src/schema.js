const { gql } = require('apollo-server');

const typeDefs = gql(`
  type Pilot {
          Pilot_Id: Int!
          Name: String!
          Age: Int!
  }
  type Aircraft {
          Aircraft_ID: Int!
          Aircraft: String!
          Description: String!
          Max_Gross_Weight: String!
          Total_disk_area: String!
          Max_disk_Loading: String!
  }
  type Match {
          Round: Int
          Location: String
          Country: String
          Date: String
          Fastest_Qualifying: String
          Winning_Pilot: String
          Winning_Aircraft: String
  }
  type Airport {
          Airport_ID: Int
          Airport_Name: String
          Total_Passengers: Int
          Change_2007: String
          International_Passengers: Int
          Domestic_Passengers: Int
          Transit_Passengers: Int
          Aircraft_Movements: Int
          Freight_Metric_Tonnes: Int
  }
  type AirportAircraft {
          ID: Int
          Airport_ID: Int
          Aircraft_ID: Int
  }
  type Query {
    pilots: [Pilot]
    aircrafts: [Aircraft]
    airports: [Airport]
    matches: [Match]
    aircraftAirportAssigns: [AirportAircraft]
  }
`);

module.exports = typeDefs;
