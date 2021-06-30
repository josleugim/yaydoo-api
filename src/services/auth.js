'use strict';

const jwt = require('jsonwebtoken');
const { findById } = require('../repositories/UserRepository');

const tradeTokenForUser = token => {
    if (token) {
        return jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err)
            }

            if (decoded.data.userId) {
                return await findById(decoded.data.userId);
            }
        })
    }
};

const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error('Unauthenticated');
    }

    return next(root, args, context, info);
};

const validateRole = roles => next => (root, args, context, info) => {
    if (roles.includes(context.currentUser.role)) {
        return next(root, args, context, info);
    }

    throw new Error('Unauthorized');
};

module.exports = {
    tradeTokenForUser,
    authenticated,
    validateRole
}