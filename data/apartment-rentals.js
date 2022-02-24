const { gql } = require('apollo-server');
const { stdResolvers } = require('./../../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Apartment_Building implements BaseType {
        ID: ID!
        Short_name: String
        Name: String
        Description: String
        Address: String
        Manager: String
        Phone: String
    }
    type Apartment implements BaseType {
        ID: ID!
        Building: Apartment_Building
        Type_code: String
        Number: Int
        Bathrooms: Int
        Bedrooms: Int
        Rooms: Int
        Facilities: [String]
    }
    type Guest implements BaseType {
        ID: ID!
        Gender: Int
        First_name: String
        Last_name: String
        Date_of_birth: String
    }
    type Booking implements BaseType {
        ID: ID!
        Apartment: Apartment
        Guest: Guest
        Status_code: String
        Start_date: String
        End_date: String
    }
`);