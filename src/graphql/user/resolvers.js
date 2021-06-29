'use strict';

const { create } = require('../../repositories/UserRepository');

const userResolver = {
    Mutation: {
        addVendor: (async (root, { input }, context) => {
            input.role = 'vendor';
            const user = await create(input);
            return user.toObject();
        })
    }
}

module.exports = userResolver;