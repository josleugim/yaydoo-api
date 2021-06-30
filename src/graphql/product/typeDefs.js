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
    
    input InputFilters {
        name: String
        sku: String
        minPrice: Int
        maxPrice: Int
        vendorId: ID
    }
    
    extend type Query {
        products(filters: InputFilters): [Product]
    }
    
    extend type Mutation {
        addProduct(input: ProductInput!): Product
    }
`;

module.exports = typeDefs;
