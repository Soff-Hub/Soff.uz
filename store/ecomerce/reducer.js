import { useCookies } from 'react-cookie';
import { ReactDOM } from 'react';
import { actionTypes } from './action';


// const loacl = localStorage.getItem('cart')

// const userData = JSON.parse( cookies);
export const initalState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    cartDataItems: [],
    wishlist: []
};


function reducer(state = initalState, action) {

    switch (action.type) {
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            for (let i = 0; i < action.payload.length; i++) {
                if (
                    state.wishlistItems.every(
                        (el) => el.id !== action.payload[i].id
                    )
                ) {
                    return {
                        ...state,
                        ...{
                            wishlistItems: [
                                ...state.wishlistItems,
                                ...action.payload[i],
                            ],
                        },
                    };
                } else return state;
            }
        case actionTypes.SET_cart_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.SET_COMPARE_ITEMS_SUCCESS:
            return {
                ...state,
                compareItems: action.payload,
            };
        case actionTypes.SET_CARTDATA_SUCCESS:
            return {
                ...state,
                cartDataItems: action.payload,
            };

        case actionTypes.SET_CARTDATA_SUCCESS_ITEM:
            return {
                ...state,
                cartDataItems: [...state.cartDataItems, ...action.payload],
            };
        default:
            return state;

        case actionTypes.SET_SAVED_SUCCESS:
            return {
                ...state,
                wishlist: action.payload,
            };
        case actionTypes.SET_SAVED_ITEM_SUCCESS:
            return {
                ...state,
                wishlist: [...state.wishlist, ...action.payload],
            };
    }
}

export default reducer;
