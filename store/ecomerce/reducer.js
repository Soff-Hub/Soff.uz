import { actionTypes } from './action';

export const initalState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    cartDataItems: [],
    wishlist: [],
    replied_count: 0,
    profile: null,
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
                cartDataItems: action.payload,
            };
        case actionTypes.REPLIED_COUNT:
            return {
                ...state,
                replied_count: action.payload,
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
        case actionTypes.PROFILE_DATA:
            return {
                ...state,
                profile: action.payload,
            };
    }
}

export default reducer;
