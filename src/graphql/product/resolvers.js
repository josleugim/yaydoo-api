'use strict';

const { findAll, create } = require('../../repositories/ProductRepository');
const { formatDate } = require('../../helpers/common');
const moment = require('moment-timezone');
const { authenticated, validateRole } = require('../../services/auth');

const ProductResolver = {
    Query: {
        products: authenticated(validateRole(['customer', 'vendor', 'admin'])(async (root, {filters = {}}, context) => {
            const query = {};
            if (context.currentUser.role === 'vendor') {
                query.vendorId = context.currentUser._id;
            }

            if (filters.name) {
                query.name = { $regex: `${filters.name}` }
            }

            if (filters.sku) {
                query.sku = { $regex: filters.sku };
            }

            if (filters.minPrice > 0 && filters.maxPrice > 0) {
                query.price = { $gte: Number(filters.minPrice), $lte: Number(filters.maxPrice) }
            }

            if (filters.vendorId && context.currentUser.role === 'admin') {
                query.vendorId = filters.vendorId;
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
