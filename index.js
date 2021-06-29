'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require('./src/config/mongoose');
const app = express();
require('./src/config/express')(app);
const { schema } = require('./src/config/graphQL');

const server = new ApolloServer({
    schema,
    formatError: (err) => {
        console.error(err)
        return err;
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}${server.graphqlPath}`);
});
