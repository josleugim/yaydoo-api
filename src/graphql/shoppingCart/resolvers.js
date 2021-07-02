'use strict';

const { create, findAll, findByProductId, incrementQuantity } = require('../../repositories/ShoppingCartRepository');
const { authenticated, validateRole } = require('../../services/auth');

const ShoppingCartResolver = {
    Query: {
        shoppingCarts: authenticated(validateRole(['customer'])(async (root, { filters = {} }, context) => {
            return await findAll({});
        }))
    },
    Mutation: {
        addShoppingCart: authenticated(validateRole(['customer'])(async (root, { input }, context) => {
            let quantity = 1;
            if (input.quantity) {
                quantity = input.quantity
            }

            input.customerId = context.currentUser._id;

            const productExists = await findByProductId(input.productId);

            if (productExists) {
                const shoppingCart = await incrementQuantity(productExists._id, quantity);
                return shoppingCart.toObject();
            }

            if (!productExists) {
                const shoppingCart = await create(input);
                return shoppingCart.toObject();
            }
        }))
    }
};

module.exports = ShoppingCartResolver;
