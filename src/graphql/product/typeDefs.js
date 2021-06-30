'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        _id: ID!
        vendor: User
        name: String!
        sku: String!
        quantity: Int!
        price: Float!
        createdAt: String
        updatedAt: String
        isActive: Boolean
    }
    
    input ProductInput {
        name: String
        sku: String
        quantity: Int
        price: Float
    }
    
    extend type Query {
        products: [Product]
    }
    
    extend type Mutation {
        addProduct(input: ProductInput!): Product
    }
`;

module.exports = typeDefs;
