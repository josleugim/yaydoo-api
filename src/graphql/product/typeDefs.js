'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        _id: ID!
    }
    
    extend type Query {
        products: [Product]
    }
    
    extend type Mutation {
        addProduct: Product
    }
`;

module.exports = typeDefs;
