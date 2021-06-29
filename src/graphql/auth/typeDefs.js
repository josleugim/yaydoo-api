'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
    type AuthPayLoad {
        token: String
        email: String
        role: String
    }
    
    input LoginInput {
        email: String!
        password: String!
    }
    
    extend type Mutation {
        login(input: LoginInput!): AuthPayLoad
    }
`;

module.exports = typeDefs;