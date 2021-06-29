'use strict';
const { findOne } = require('../../repositories/UserRepository');
const { decrypt } = require('../../services/crypto');
const jwt = require('jsonwebtoken');

const AuthResolver = {
    Mutation: {
        login: (async (root, { input }, context) => {
            const loginQuery = {
                email: input.email
            };

            const user = await findOne(loginQuery);
            if (!user) {
                throw new Error('User not found');
            }

            if (decrypt(user.hashed_pwd) !== input.password) {
                throw new Error('Incorrect account');
            }

            const token = jwt.sign(
                {
                    data:
                        {
                            userId: user._id,
                            role: user.role
                        }
                    },
                process.env.TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            return {
                token,
                email: user.email,
                role: user.role
            }
        })
    }
};

module.exports = AuthResolver;