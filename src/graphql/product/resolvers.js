'use strict';
const { findAll, create } = require('../../repositories/ProductRepository');
const { formatDate } = require('../../helpers/common');
const moment = require('moment-timezone');

const ProductResolver = {
    Query: {
        products: (async (root, {type, status}, context) => {
            return await findAll({});
        })
    },
    Mutation: {
        addProduct: (async (root, { input }, context) => {
            input.updatedAt = formatDate(moment().tz('America/Mexico_City').format());
            const product = await create(input);
            return product.toObject();
        })
    }
};

module.exports = ProductResolver;
