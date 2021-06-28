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

const schema = makeExecutableSchema(
    {
        typeDefs: [
            rootTypeDefs, productTypeDefs
        ],
        resolvers: merge(productResolvers)
    }
);

module.exports = { schema };
