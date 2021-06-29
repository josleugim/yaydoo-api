'use strict';

const User = require('../models/User');
const { encrypt } = require('../services/crypto');

const create = async (userInput) => {
    const user = {
        hashed_pwd: encrypt(userInput.password)
    };

    delete userInput.password

    return await User.create({ ...user, ...userInput })
};

const findOne = async query => {
    return User
        .findOne(query)
        .catch(err => console.log(err))
};

module.exports = {
    create,
    findOne
}