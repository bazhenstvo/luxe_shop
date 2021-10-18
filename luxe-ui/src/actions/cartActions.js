import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD, WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, PAYMENT_SUCCESS, PAYMENT_FAIL,
} from '../constants/cartConstants'


export const addToCart = (slug, qty, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ROOT}/v1/products/${slug}/`)
    // const {userData} = await axios.get(`/v1/authentication/users/me/`, {withCredentials: true})
    console.log(data)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product_id: data.id,
            product: data.slug,
            title: data.title,
            productImages: data.productImages,
            productSizes: data.productSizes,
            price: data.price,
            numberInStock: data.numberInStock,
            qty,
            size
            // userId: userData.id
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addToWishlist = (slug, qty, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ROOT}/v1/products/${slug}/`)
    console.log(data)

    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            product: data.slug,
            title: data.title,
            productImages: data.productImages,
            productSizes: data.productSizes,
            price: data.price,
            numberInStock: data.numberInStock,
            qty,
            size
        }
    })
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const addToCartfromWishlist = (slug, qty, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ROOT}/v1/products/${slug}/`)
    console.log(data)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.slug,
            title: data.title,
            productImages: data.productImages,
            productSizes: data.productSizes,
            price: data.price,
            numberInStock: data.numberInStock,
            qty,
            size
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
