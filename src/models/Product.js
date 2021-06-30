'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { formatDate } = require('../helpers/common');

const ProductSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    createdAt: {
        type: Date, default: formatDate(moment().tz('America/Mexico_City').format())
    },
    updatedAt: { type: Date },
    isActive: {
        type: Boolean,
        default: true
    }
});

ProductSchema.set('toObject', { getters: true, virtuals: true });

ProductSchema.virtual('vendor', {
    ref: 'User',
    localField: 'vendorId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Product', ProductSchema);