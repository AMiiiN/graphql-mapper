const { gql } = require('apollo-server');

const schema = gql(`
  interface BaseType {
    ID: ID!
  }
  type Pilot implements BaseType {
          ID: ID!
          Name: String!
          Age: Int!
  }
  type Aircraft implements BaseType {
          ID: ID!
          Name: String!
          Description: String!
          Max_Gross_Weight: String!
          Total_disk_area: String!
          Max_disk_Loading: String!
  }
  type Match implements BaseType {
          ID: ID!
          Round: Int
          Location: String
          Country: String
          Date: String
          Fastest_Qualifying: String
          Winning_Pilot: String
          Winning_Aircraft: String
  }
  type Airport implements BaseType {
          ID: ID!
          Airport_Name: String
          Total_Passengers: Int
          Change_2007: String
          International_Passengers: Int
          Domestic_Passengers: Int
          Transit_Passengers: Int
          Aircraft_Movements: Int
          Freight_Metric_Tonnes: Int
  }
  type AirportAircraft implements BaseType {
          ID: ID!
          Airport_ID: Int
          Aircraft_ID: Int
  }
  type Query {
    pilots: [Pilot]
    aircrafts: [Aircraft]
    airports: [Airport]
    matches: [Match]
    aircraftAirportAssigns: [AirportAircraft]
    avg(type: String, field: String): Float
    min(type: String, field: String): Float
    max(type: String, field: String): Float
    getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
  }
`);

const pilots = [
  {
    ID: 1,
    Name: 'Prof. Zackery Collins',
    Age: 23
  },
  {
    ID: 2,
    Name: 'Katheryn Gorczany IV',
    Age: 20
  },
  {
    ID: 3,
    Name: 'Mr. Cristian Halvorson II',
    Age: 23
  },
  {
    ID: 4,
    Name: 'Ayana Spencer',
    Age: 25
  },
  {
    ID: 5,
    Name: 'Ellen Ledner III',
    Age: 31
  },
  {
    ID: 6,
    Name: 'Elisha Hickle V',
    Age: 37
  },
  {
    ID: 7,
    Name: 'Dr. Jade Bradtke V',
    Age: 26
  },
  {
    ID: 8,
    Name: 'Winnifred Boyle',
    Age: 30
  },
  {
    ID: 9,
    Name: 'Della Lindgren',
    Age: 29
  },
  {
    ID: 10,
    Name: 'Maxwell Graham',
    Age: 26
  },
  {
    ID: 11,
    Name: 'Blaise Muller',
    Age: 33
  },
  {
    ID: 12,
    Name: 'Baylee Steuber',
    Age: 30
  }
];
const aircrafts = [
  {
    ID: 1,
    Name: 'Robinson R-22',
    Description: 'Light utility helicopter',
    Max_Gross_Weight: '1,370 lb (635 kg)',
    Total_disk_area: '497 ft² (46.2 m²)',
    Max_disk_Loading: '2.6 lb/ft² (14 kg/m²)'
  },
  {
    ID: 2,
    Name: 'Bell 206B3 JetRanger',
    Description: 'Turboshaft utility helicopter',
    Max_Gross_Weight: '3,200 lb (1,451 kg)',
    Total_disk_area: '872 ft² (81.1 m²)',
    Max_disk_Loading: '3.7 lb/ft² (18 kg/m²)'
  },
  {
    ID: 3,
    Name: 'CH-47D Chinook',
    Description: 'Tandem rotor helicopter',
    Max_Gross_Weight: '50,000 lb (22,680 kg)',
    Total_disk_area: '5,655 ft² (526 m²)',
    Max_disk_Loading: '8.8 lb/ft² (43 kg/m²)'
  },
  {
    ID: 4,
    Name: 'Mil Mi-26',
    Description: 'Heavy-lift helicopter',
    Max_Gross_Weight: '123,500 lb (56,000 kg)',
    Total_disk_area: '8,495 ft² (789 m²)',
    Max_disk_Loading: '14.5 lb/ft² (71 kg/m²)'
  },
  {
    ID: 5,
    Name: 'CH-53E Super Stallion',
    Description: 'Heavy-lift helicopter',
    Max_Gross_Weight: '73,500 lb (33,300 kg)',
    Total_disk_area: '4,900 ft² (460 m²)',
    Max_disk_Loading: '15 lb/ft² (72 kg/m²)'
  }
];
const airports = [
  {
    ID: 1,
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
    ID: 2,
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
    ID: 3,
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
    ID: 4,
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
    ID: 5,
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
    ID: 6,
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
    ID: 7,
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
    ID: 8,
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
    ID: 9,
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
    ID: 10,
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
    ID: 1,
    Round: 1,
    Location: "Mina' Zayid , Abu Dhabi",
    Country: "United Arab Emirates",
    Date: "March 26–27",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 1,
    Winning_Aircraft: 1
  },
  {
    ID: 2,
    Round: 2,
    Location: "Swan River , Perth",
    Country: "Australia",
    Date: "April 17–18",
    Fastest_Qualifying: "Paul Bonhomme",
    Winning_Pilot: 4,
    Winning_Aircraft: 1
  },
  {
    ID: 3,
    Round: 3,
    Location: "Flamengo Beach , Rio de Janeiro",
    Country: "Brazil",
    Date: "May 8–9",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 6,
    Winning_Aircraft: 2
  },
  {
    ID: 4,
    Round: 4,
    Location: "Windsor , Ontario",
    Country: "Canada",
    Date: "June 5–6",
    Fastest_Qualifying: "Nigel Lamb",
    Winning_Pilot: 4,
    Winning_Aircraft: 4
  },
  {
    ID: 5,
    Round: 5,
    Location: "New York City",
    Country: "United States",
    Date: "June 19–20",
    Fastest_Qualifying: "Hannes Arch",
    Winning_Pilot: 9,
    Winning_Aircraft: 3
  },
  {
    ID: 6,
    Round: 6,
    Location: "EuroSpeedway Lausitz",
    Country: "Germany",
    Date: "August 7–8",
    Fastest_Qualifying: "Paul Bonhomme",
    Winning_Pilot: 2,
    Winning_Aircraft: 4
  },
  {
    ID: 7,
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

const allTypes = {
  "pilots": pilots,
  "aircrafts": aircrafts,
  "airports": airports,
  "matches": matches,
  "aircraftAirportAssigns": aircraftAirportAssigns
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
      if (obj.Total_Passengers) {
        return "Airport"
      }
      if (obj.Airport_ID && obj.Aircraft_ID) {
        return "AircraftAirportAssigns"
      }
    }
  },
  Query: {
    pilots: () => pilots,
    aircrafts: () => aircrafts,
    airports: () => airports,
    matches: () => matches,
    aircraftAirportAssigns: () => aircraftAirportAssigns,

    // Aggregations
    avg: (obj, args) => {
      return calcAverage(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
    },
    max: (obj, args) => {
      return getMax(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
    },
    min: (obj, args) => {
      return getMin(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
    },
    getSpecificInstances: (obj, args) => {
      var referenceValue;
      var targetInstances;
      if (args.op == "min") {
        referenceValue = getMin(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        targetInstances = allTypes[args.type].filter(instance => instance[args.field] == referenceValue);
      }
      if (args.op == "max") {
        referenceValue = getMax(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        targetInstances = allTypes[args.type].filter(instance => instance[args.field] == referenceValue);
      }
      if (args.op == "=") {
        targetInstances = allTypes[args.type].filter(instance => instance[args.field] == args.value);
      }
      if (args.op == "<") {
        targetInstances = allTypes[args.type].filter(instance => instance[args.field] < args.value);
      }
      if (args.op == ">") {
        targetInstances = allTypes[args.type].filter(instanve => instance[args.field] > args.value);
      }
      return targetInstances;
    }
  }
};

/* This is for connecting GraphQL to an existing SQLite database
const { models } = require('./dbconnector')
const resolverDB = {
  Query: {
    async pilots(root, { arg }) {
      console.log("arg: " + arg);
      return models.pilots.findAll({});
    },
    pilotById: (root, arg) => {
      return models.pilots.findByPk(arg.id);
    },
    aircrafts: () => aircrafts
  }
};
*/

module.exports = { schema, resolver };

// Helper functions
//
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
function getMax(arr) {
  var max = arr[0];
  for (var i=1; i<arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
function getMin(arr) {
  var min = arr[0];
  for (var i=1; i<arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}
