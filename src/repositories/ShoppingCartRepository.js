'use strict';

const ShoppingCart = require('../models/ShoppingCart');

const create = async (shoppingCartInput) => {
    return await ShoppingCart
        .create(shoppingCartInput);
};

const findAll = async (query) => {
    return await ShoppingCart
        .find(query)
        .populate('productId')
        .populate('customerId')
        .catch(err => console.log(err))
}

const findByProductId = async (id) => {
    return await ShoppingCart
        .findOne({ productId: id })
        .catch(err => console.log(err))
}

const incrementQuantity = async (id, quantity) => {
    return await ShoppingCart
        .findOneAndUpdate({ _id: id }, { $inc: { quantity: quantity } }, { new: true })
        .catch(err => console.log(err))
}

const removeById = async (id, customerId) => {
    return await ShoppingCart
        .deleteOne({_id: id, customerId: customerId})
        .catch(err => console.log(err))
}

module.exports = {
    create,
    findAll,
    findByProductId,
    incrementQuantity,
    removeById
}
