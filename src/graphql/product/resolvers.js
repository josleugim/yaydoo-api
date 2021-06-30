'use strict';
const { findAll, create } = require('../../repositories/ProductRepository');
const { formatDate } = require('../../helpers/common');
const moment = require('moment-timezone');
const { authenticated, validateRole } = require('../../services/auth');

const ProductResolver = {
    Query: {
        products: authenticated(validateRole(['customer', 'vendor'])(async (root, {type, status}, context) => {
            const query = {};
            if (context.currentUser.role === 'vendor') {
                query.vendorId = context.currentUser._id;
            }

            return await findAll(query);
        }))
    },
    Mutation: {
        addProduct: authenticated(validateRole(['vendor'])(async (root, { input }, context) => {
            input.updatedAt = formatDate(moment().tz('America/Mexico_City').format());
            input.vendorId = context.currentUser._id;

            const product = await create(input);
            return product.toObject();
        }))
    }
};

module.exports = ProductResolver;
