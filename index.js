'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}`)
});
