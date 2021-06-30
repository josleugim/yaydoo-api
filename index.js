'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require('./src/config/mongoose');
const app = express();
require('./src/config/express')(app);
const { schema } = require('./src/config/graphQL');
const { tradeTokenForUser } = require('./src/services/auth');

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        let authToken = null;
        let currentUser = null;
        try {
            if (req.headers.authorization) {
                authToken = req.headers.authorization
            }
            if (authToken) {
                currentUser = await tradeTokenForUser(authToken.toString())
            }
        } catch (err) {
            console.log(err)
        }

        return {
            authToken,
            currentUser
        }
    },
    formatError: (err) => {
        console.error(err)
        return err;
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}${server.graphqlPath}`);
});
