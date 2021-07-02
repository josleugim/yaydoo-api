'use strict';
const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

ShoppingCartSchema.set('toObject', { getters: true, virtuals: true });

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
