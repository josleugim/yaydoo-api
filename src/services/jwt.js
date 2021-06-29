'use strict';

const jwt = require('jsonwebtoken');

const verify = token => {
    if (!token) {
        throw new Error('No token provided');
    }

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return err;
            }
            return decoded
        })
    }
};

module.exports = {
    verify
}