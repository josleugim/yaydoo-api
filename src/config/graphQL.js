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

const schema = makeExecutableSchema(
    {
        typeDefs: [
            rootTypeDefs, productTypeDefs, userTypeDefs
        ],
        resolvers: merge(productResolvers, userResolvers)
    }
);

module.exports = { schema };
