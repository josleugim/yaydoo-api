'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
    type ShoppingCart {
        _id: ID!
        productId: Product
        customerId: User
        quantity: Int
    }
    
    input ShoppingCartInput {
        productId: ID!
        quantity: Int
    }
    
    extend type Query {
        shoppingCarts: [ShoppingCart]
    }
    
    extend type Mutation {
        addShoppingCart(input: ShoppingCartInput): ShoppingCart
    }
`;

module.exports = typeDefs;
