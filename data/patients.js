const { gql } = require('apollo-server');
const { stdResolvers } = require('./../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Patient implements BaseType {
        ID: ID!
        First_Name: String
        Last_Name: String
        Diagnosis: String
        Stay_length: Int
        Age: Int
        Gender: String
    }
    type Query {
        patients: [Patient]
        avg(type: String, field: String): Float
        min(type: String, field: String): Float
        max(type: String, field: String): Float
        sum(type: String, field: String): Float
        count(type: String): Int
        getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
    }
`);

var patients = [
    {
        "ID": 1,
        "First_Name": "Baker",
        "Last_Name": "Harrington",
        "Diagnosis": "heart disease",
        "Stay_length": 8,
        "Age": 50,
        "Gender": "female"
    },
    {
        "ID": 2,
        "First_Name": "Florence",
        "Last_Name": "Patterson",
        "Diagnosis": "tuberculosis",
        "Stay_length": 8,
        "Age": 94,
        "Gender": "male"
    },
    {
        "ID": 3,
        "First_Name": "Sasha",
        "Last_Name": "Hoffman",
        "Diagnosis": "liver disease",
        "Stay_length": 8,
        "Age": 4,
        "Gender": "other"
    },
    {
        "ID": 4,
        "First_Name": "Maya",
        "Last_Name": "Woods",
        "Diagnosis": "liver disease",
        "Stay_length": 2,
        "Age": 41,
        "Gender": "male"
    },
    {
        "ID": 5,
        "First_Name": "Baker",
        "Last_Name": "Morris",
        "Diagnosis": "tuberculosis",
        "Stay_length": 7,
        "Age": 76,
        "Gender": "other"
    },
    {
        "ID": 6,
        "First_Name": "Florence",
        "Last_Name": "Morris",
        "Diagnosis": "stroke",
        "Stay_length": 2,
        "Age": 53,
        "Gender": "female"
    },
    {
        "ID": 7,
        "First_Name": "Bruce",
        "Last_Name": "Blake",
        "Diagnosis": "stroke",
        "Stay_length": 13,
        "Age": 45,
        "Gender": "male"
    },
    {
        "ID": 8,
        "First_Name": "Tate",
        "Last_Name": "Patterson",
        "Diagnosis": "tuberculosis",
        "Stay_length": 20,
        "Age": 57,
        "Gender": "other"
    },
    {
        "ID": 9,
        "First_Name": "Tara",
        "Last_Name": "Ford",
        "Diagnosis": "allergies",
        "Stay_length": 16,
        "Age": 52,
        "Gender": "female"
    },
    {
        "ID": 10,
        "First_Name": "Maya",
        "Last_Name": "Patterson",
        "Diagnosis": "flu",
        "Stay_length": 14,
        "Age": 58,
        "Gender": "female"
    },
    {
        "ID": 11,
        "First_Name": "Tate",
        "Last_Name": "Gibson",
        "Diagnosis": "cancer",
        "Stay_length": 9,
        "Age": 83,
        "Gender": "female"
    },
    {
        "ID": 12,
        "First_Name": "Tara",
        "Last_Name": "Ford",
        "Diagnosis": "asthma",
        "Stay_length": 2,
        "Age": 23,
        "Gender": "other"
    },
    {
        "ID": 13,
        "First_Name": "Bruce",
        "Last_Name": "Silva",
        "Diagnosis": "heart disease",
        "Stay_length": 20,
        "Age": 62,
        "Gender": "other"
    },
    {
        "ID": 14,
        "First_Name": "Baker",
        "Last_Name": "Gibson",
        "Diagnosis": "allergies",
        "Stay_length": 1,
        "Age": 57,
        "Gender": "male"
    },
    {
        "ID": 15,
        "First_Name": "Maya",
        "Last_Name": "Silva",
        "Diagnosis": "hiv",
        "Stay_length": 15,
        "Age": 9,
        "Gender": "male"
    },
    {
        "ID": 16,
        "First_Name": "Florence",
        "Last_Name": "Ford",
        "Diagnosis": "diabetes",
        "Stay_length": 7,
        "Age": 75,
        "Gender": "male"
    },
    {
        "ID": 17,
        "First_Name": "Bruce",
        "Last_Name": "Guerrero",
        "Diagnosis": "tuberculosis",
        "Stay_length": 19,
        "Age": 28,
        "Gender": "male"
    },
    {
        "ID": 18,
        "First_Name": "Ian",
        "Last_Name": "Morris",
        "Diagnosis": "flu",
        "Stay_length": 12,
        "Age": 50,
        "Gender": "other"
    },
    {
        "ID": 19,
        "First_Name": "Bruce",
        "Last_Name": "Hoffman",
        "Diagnosis": "stroke",
        "Stay_length": 8,
        "Age": 2,
        "Gender": "female"
    },
    {
        "ID": 20,
        "First_Name": "Maya",
        "Last_Name": "Harrington",
        "Diagnosis": "cancer",
        "Stay_length": 11,
        "Age": 31,
        "Gender": "female"
    },
    {
        "ID": 21,
        "First_Name": "Bruce",
        "Last_Name": "Gibson",
        "Diagnosis": "allergies",
        "Stay_length": 1,
        "Age": 87,
        "Gender": "other"
    },
    {
        "ID": 22,
        "First_Name": "Tate",
        "Last_Name": "Guerrero",
        "Diagnosis": "diarrhea",
        "Stay_length": 15,
        "Age": 17,
        "Gender": "other"
    },
    {
        "ID": 23,
        "First_Name": "Maya",
        "Last_Name": "Woods",
        "Diagnosis": "stroke",
        "Stay_length": 3,
        "Age": 98,
        "Gender": "male"
    },
    {
        "ID": 24,
        "First_Name": "Tara",
        "Last_Name": "Patterson",
        "Diagnosis": "allergies",
        "Stay_length": 9,
        "Age": 79,
        "Gender": "male"
    },
    {
        "ID": 25,
        "First_Name": "August",
        "Last_Name": "Hoffman",
        "Diagnosis": "heart disease",
        "Stay_length": 18,
        "Age": 59,
        "Gender": "male"
    },
    /*{
        "ID": ,
        "First_Name": "",
        "Last_Name": "",
        "Diagnosis": "",
        "Stay_length": ,
        "Age": ,
        "Gender": ""
    },*/
];

const allTypes = {
    "patients": patients
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
            if (obj.Diagnosis) {
                return "Patient"
            }
        }
    },
    Query: {
        patients: () => patients,
        // standard resolvers
        ...stdResolvers(allTypes)
    }
};

const typeLevelNames = ['patients'];
const fieldLevelNames = [
    ['ID', 'First_Name', 'Last_Name', 'Diagnosis', 'Stay_length', 'Age', 'Gender']
];

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames };
