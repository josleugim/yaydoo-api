'use strict';

const { create, findAll, findByProductId, incrementQuantity, removeById } = require('../../repositories/ShoppingCartRepository');
const { authenticated, validateRole } = require('../../services/auth');

const ShoppingCartResolver = {
    Query: {
        myShoppingCart: authenticated(validateRole(['customer'])(async (root, { filters = {} }, context) => {
            return await findAll({customerId: context.currentUser._id});
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
        })),
        removeById: authenticated(validateRole(['customer'])(async (root, { id }, context) => {
            const isRemoved = await removeById(id, context.currentUser._id);
            return isRemoved.deletedCount > 0;
        }))
    }
};

module.exports = ShoppingCartResolver;
