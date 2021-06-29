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

module.exports = {
    create
}