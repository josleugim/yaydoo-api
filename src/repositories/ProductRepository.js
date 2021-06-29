'use strict';

const Product = require('../models/Product');

const findAll = async (query) => {
    return await Product
        .find(query)
        .catch(err => console.log(err))
};

const create = async (productInput) => {
    return await Product
        .create(productInput);
};

module.exports = {
    findAll,
    create
}