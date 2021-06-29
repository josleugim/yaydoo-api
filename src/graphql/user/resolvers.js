'use strict';

const { create } = require('../../repositories/UserRepository');

const userResolver = {
    Mutation: {
        addUser: (async (root, { input }, context) => {
            const user = await create(input);
            return user.toObject();
        })
    }
}

module.exports = userResolver;