import { actionTypes } from './action';

export const initalState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
};

function reducer(state = initalState, action) {
    switch (action.type) {
        // SET_WISHLIST_ITEMS_SUCCESS
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            console.log(action);
            if(state.wishlistItems.every(el => el.id !== action.payload[0].id)) {
                return {
                    ...state,
                    ...{ wishlistItems: [...state.wishlistItems, ...action.payload] },
                };
            } else return state
        case actionTypes.SET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.SET_COMPARE_ITEMS_SUCCESS:
            return {
                ...state,
                compareItems: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
