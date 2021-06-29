'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        role: Roles!
        email: String!
        password: String!
    }
    
    enum Roles {
        admin
        vendor
        customer
    }
    
    input UserInput {
        name: String
        role: Roles
        email: String
        password: String
    }
    
    extend type Mutation {
        addUser(input: UserInput!): User
    }
`;

module.exports = typeDefs;