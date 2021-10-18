const { gql } = require('apollo-server');

const schema = gql(`
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
    pilotById(id: Int): Pilot
    pilotsOlderThan(age: Int): [Pilot]
    avg(type: String, field: String): Float
    aircrafts: [Aircraft]
    airports: [Airport]
    matches: [Match]
    aircraftAirportAssigns: [AirportAircraft]
  }
`);

const pilots = [
  {
    Pilot_Id: 1,
    Name: 'Prof. Zackery Collins',
    Age: 23
  },
  {
    Pilot_Id: 2,
    Name: 'Katheryn Gorczany IV',
    Age: 20
  },
  {
    Pilot_Id: 3,
    Name: 'Mr. Cristian Halvorson II',
    Age: 23
  },
  {
    Pilot_Id: 4,
    Name: 'Ayana Spencer',
    Age: 25
  },
  {
    Pilot_Id: 5,
    Name: 'Ellen Ledner III',
    Age: 31
  },
  {
    Pilot_Id: 6,
    Name: 'Elisha Hickle V',
    Age: 37
  },
  {
    Pilot_Id: 7,
    Name: 'Dr. Jade Bradtke V',
    Age: 26
  },
  {
    Pilot_Id: 8,
    Name: 'Winnifred Boyle',
    Age: 30
  },
  {
    Pilot_Id: 9,
    Name: 'Della Lindgren',
    Age: 29
  },
  {
    Pilot_Id: 10,
    Name: 'Maxwell Graham',
    Age: 26
  },
  {
    Pilot_Id: 11,
    Name: 'Blaise Muller',
    Age: 33
  },
  {
    Pilot_Id: 12,
    Name: 'Baylee Steuber',
    Age: 30
  }
];
const aircrafts = [
  {
    Aircraft_ID: 1,
    Aircraft: 'Robinson R-22',
    Description: 'Light utility helicopter',
    Max_Gross_Weight: '1,370 lb (635 kg)',
    Total_disk_area: '497 ft² (46.2 m²)',
    Max_disk_Loading: '2.6 lb/ft² (14 kg/m²)'
  },
  {
    Aircraft_ID: 2,
    Aircraft: 'Bell 206B3 JetRanger',
    Description: 'Turboshaft utility helicopter',
    Max_Gross_Weight: '3,200 lb (1,451 kg)',
    Total_disk_area: '872 ft² (81.1 m²)',
    Max_disk_Loading: '3.7 lb/ft² (18 kg/m²)'
  },
  {
    Aircraft_ID: 3,
    Aircraft: 'CH-47D Chinook',
    Description: 'Tandem rotor helicopter',
    Max_Gross_Weight: '50,000 lb (22,680 kg)',
    Total_disk_area: '5,655 ft² (526 m²)',
    Max_disk_Loading: '8.8 lb/ft² (43 kg/m²)'
  },
  {
    Aircraft_ID: 4,
    Aircraft: 'Mil Mi-26',
    Description: 'Heavy-lift helicopter',
    Max_Gross_Weight: '123,500 lb (56,000 kg)',
    Total_disk_area: '8,495 ft² (789 m²)',
    Max_disk_Loading: '14.5 lb/ft² (71 kg/m²)'
  },
  {
    Aircraft_ID: 5,
    Aircraft: 'CH-53E Super Stallion',
    Description: 'Heavy-lift helicopter',
    Max_Gross_Weight: '73,500 lb (33,300 kg)',
    Total_disk_area: '4,900 ft² (460 m²)',
    Max_disk_Loading: '15 lb/ft² (72 kg/m²)'
  }
];
const airports = [
  {
    Airport_ID: 1,
    Airport_Name: 'London Heathrow',
    Total_Passengers: 67054745,
    Change_2007: '1.5%',
    International_Passengers: 61344438,
    Domestic_Passengers: 5562516,
    Transit_Passengers: 147791,
    Aircraft_Movements: 478693,
    Freight_Metric_Tonnes: 1397054
  },
  {
    Airport_ID: 2,
    Airport_Name: 'London Gatwick',
    Total_Passengers: 34205887,
    Change_2007: '2.9%',
    International_Passengers: 30431051,
    Domestic_Passengers: 3730963,
    Transit_Passengers: 43873,
    Aircraft_Movements: 263653,
    Freight_Metric_Tonnes: 107702
  },
  {
    Airport_ID: 3,
    Airport_Name: 'London Stansted',
    Total_Passengers: 22360364,
    Change_2007: '6.0%',
    International_Passengers: 19996947,
    Domestic_Passengers: 2343428,
    Transit_Passengers: 19989,
    Aircraft_Movements: 193282,
    Freight_Metric_Tonnes: 197738
  },
  {
    Airport_ID: 4,
    Airport_Name: 'Manchester',
    Total_Passengers: 21219195,
    Change_2007: '4.0%',
    International_Passengers: 18119230,
    Domestic_Passengers: 2943719,
    Transit_Passengers: 156246,
    Aircraft_Movements: 204610,
    Freight_Metric_Tonnes: 141781
  },
  {
    Airport_ID: 5,
    Airport_Name: 'London Luton',
    Total_Passengers: 10180734,
    Change_2007: '2.6%',
    International_Passengers: 8853224,
    Domestic_Passengers: 1320678,
    Transit_Passengers: 6832,
    Aircraft_Movements: 117859,
    Freight_Metric_Tonnes: 40518
  },
  {
    Airport_ID: 6,
    Airport_Name: 'Birmingham Airport',
    Total_Passengers: 9627589,
    Change_2007: '4.3%',
    International_Passengers: 8105162,
    Domestic_Passengers: 1471538,
    Transit_Passengers: 50889,
    Aircraft_Movements: 112227,
    Freight_Metric_Tonnes: 12192
  },
  {
    Airport_ID: 7,
    Airport_Name: 'Edinburgh',
    Total_Passengers: 9006702,
    Change_2007: '0.5%',
    International_Passengers: 3711140,
    Domestic_Passengers: 5281038,
    Transit_Passengers: 14524,
    Aircraft_Movements: 125550,
    Freight_Metric_Tonnes: 12418
  },
  {
    Airport_ID: 8,
    Airport_Name: 'Glasgow International',
    Total_Passengers: 8178891,
    Change_2007: '7.0%',
    International_Passengers: 3943139,
    Domestic_Passengers: 4192121,
    Transit_Passengers: 43631,
    Aircraft_Movements: 100087,
    Freight_Metric_Tonnes: 3546
  },
  {
    Airport_ID: 9,
    Airport_Name: 'Bristol',
    Total_Passengers: 6267114,
    Change_2007: '5.7%',
    International_Passengers: 5057051,
    Domestic_Passengers: 1171605,
    Transit_Passengers: 38458,
    Aircraft_Movements: 76517,
    Freight_Metric_Tonnes: 3
  },
  {
    Airport_ID: 10,
    Airport_Name: 'East Midlands',
    Total_Passengers: 5620673,
    Change_2007: '3.8%',
    International_Passengers: 4870184,
    Domestic_Passengers: 746094,
    Transit_Passengers: 4395,
    Aircraft_Movements: 93038,
    Freight_Metric_Tonnes: 261507
  }
];
const matches = [
  {
    Round: 1,
    Location: "Mina' Zayid , Abu Dhabi",
    Country: "United Arab Emirates",
    Date: "March 26–27",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 1,
    Winning_Aircraft: 1
  },
  {
    Round: 2,
    Location: "Swan River , Perth",
    Country: "Australia",
    Date: "April 17–18",
    Fastest_Qualifying: "Paul Bonhomme",
    Winning_Pilot: 4,
    Winning_Aircraft: 1
  },
  {
    Round: 3,
    Location: "Flamengo Beach , Rio de Janeiro",
    Country: "Brazil",
    Date: "May 8–9",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 6,
    Winning_Aircraft: 2
  },
  {
    Round: 4,
    Location: "Windsor , Ontario",
    Country: "Canada",
    Date: "June 5–6",
    Fastest_Qualifying: "Nigel Lamb",
    Winning_Pilot: 4,
    Winning_Aircraft: 4
  },
  {
    Round: 5,
    Location: "New York City",
    Country: "United States",
    Date: "June 19–20",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 9,
    Winning_Aircraft: 3
  },
  {
    Round: 6,
    Location: "EuroSpeedway Lausitz",
    Country: "Germany",
    Date: "August 7–8",
    Fastest_Qualifying: "Paul Bonhomme",
    Winning_Pilot: 2,
    Winning_Aircraft: 4
  },
  {
    Round: 7,
    Location: "River Danube , Budapest",
    Country: "Hungary",
    Date: "Cancelled",
    Fastest_Qualifying: "Cancelled",
    Winning_Pilot: 6,
    Winning_Aircraft: 5
  }
];
const aircraftAirportAssigns = [
  {
    ID: 1,
    Airport_ID: 6,
    Aircraft_ID: 5
  },
  {
    ID: 2,
    Airport_ID: 2,
    Aircraft_ID: 1
  },
  {
    ID: 3,
    Airport_ID: 1,
    Aircraft_ID: 2
  },
  {
    ID: 4,
    Airport_ID: 9,
    Aircraft_ID: 3
  }
];

const resolver = {
  Query: {
    pilots: () => pilots,
    pilotById: (obj, args) => {
      return pilots.filter(pilot => pilot.Pilot_Id == args.id)[0]; // returns exactly one pilot object
    },
    pilotsOlderThan: (obj, args) => {
      return pilots.filter(pilot => pilot.Age >= args.age);
    },
    avg: (obj, args) => {
      var type_name = args.type;
      var field_name = args.field;
      var average_res = 0;
      switch(type_name) {
        case "pilots":
          average_res = calcAverage(formFieldArrayFromAllInstances(pilots, field_name));
          break;
        case "aircrafts":
          average_res = calcAverage(formFieldArrayFromAllInstances(aircrafts, field_name));
          break;
        case "airports":
          average_res = calcAverage(formFieldArrayFromAllInstances(airports, field_name));
          break;
        case "matches":
          average_res = calcAverage(formFieldArrayFromAllInstances(matches, field_name));
          break;
        case 'aircraftAirportAssigns':
          average_res = calcAverage(formFieldArrayFromAllInstances(aircraftAirportAssigns, field_name));
          break;
        default:
          console.log("Error: invalid type name in GraphQL query for average");
      }
      return average_res;
    },
    aircrafts: () => aircrafts,
    airports: () => airports,
    matches: () => matches,
    aircraftAirportAssigns: () => aircraftAirportAssigns
  }
};

const { models } = require('./dbconnector')
const resolverDB = {
  Query: {
    async pilots(root, { arg }) {
      console.log("arg: " + arg);
      return models.pilots.findAll({});
    },
    aircrafts: () => aircrafts
  }
};

module.exports = { schema, resolver, resolverDB };

function formFieldArrayFromAllInstances(arr, field_name) {
  var res = [];
  for (var i=0; i<arr.length; i++) {
    res.push(arr[i][field_name]);
  }
  return res;
}

function calcAverage(arr) {
  var sum = 0.0;
  for (var i=0; i<arr.length; i++) {
    sum += arr[i];
  }
  return (sum / arr.length);
}
