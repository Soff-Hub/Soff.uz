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
};


function reducer(state = initalState, action) {
    // console.log('state', state.wishlistItems);

    switch (action.type) {
        // SET_WISHLIST_ITEMS_SUCCESS
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            // console.log(action);
            // localStorage.setItem('wishlist', JSON.stringify(action.payload))
            if (
                state.wishlistItems.every(
                    (el) => el.id !== action.payload[0].id
                )
            ) {
                return {
                    ...state,
                    ...{
                        wishlistItems: [
                            ...state.wishlistItems,
                            ...action.payload,
                        ],
                    },
                };
            } else return state;

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
    }
}

export default reducer;
