'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const rootTypeDefs = `
type Query
type Mutation
schema {
  query: Query
  mutation: Mutation
}
`;

const productTypeDefs = require('../graphql/product/typeDefs');
const productResolvers = require('../graphql/product/resolvers');
const userTypeDefs = require('../graphql/user/typeDefs');
const userResolvers = require('../graphql/user/resolvers');
const authTypeDefs = require('../graphql/auth/typeDefs');
const authResolvers = require('../graphql/auth/resolvers');

const schema = makeExecutableSchema(
    {
        typeDefs: [
            rootTypeDefs, productTypeDefs, userTypeDefs, authTypeDefs
        ],
        resolvers: merge(productResolvers, userResolvers, authResolvers)
    }
);

module.exports = { schema };
