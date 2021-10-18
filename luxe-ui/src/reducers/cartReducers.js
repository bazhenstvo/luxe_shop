import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    WISHLIST_CLEAR_ITEMS,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload
            const existItem = state.wishlistItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item]
                }
            }

        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(x => x.product !== action.payload)
            }

        case WISHLIST_CLEAR_ITEMS:
            return {
                ...state,
                wishlistItems: []
            }

        default:
            return state
    }
}