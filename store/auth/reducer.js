import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [],
    data: {},
    products: {},
    shop: [],
    category_lists: [],
    top_category_lists: [],
    category: true,
    categorySlug: [],
};

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.LOGIN_REQUEST:
            localStorage.setItem('user', JSON.stringify(actions.user));
            localStorage.setItem('data', JSON.stringify(actions.data));
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ user: actions.user },
                ...{ data: actions.data },
            };
        case actionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('data');
            localStorage.removeItem('qayta_token');
            localStorage.removeItem('via_');
            localStorage.removeItem('qayta_');
            return {
                ...state,
                ...{ isLoggedIn: false },
                ...{ user: null },
            };
        case actionTypes.ISLOGINNING:
            const user = JSON.parse(localStorage.getItem('user'));

            return user?.access
                ? { ...state, ...{ isLoggedIn: true }, ...{ user: user } }
                : { ...state, ...{ isLoggedIn: false }, ...{ user: null } };

        case actionTypes.ACCOUNT_LINKS:
            return { ...state, ...{ accountLinks: actions.payload } };

        case actionTypes.MYPODUCTS_LISTS:
            return { ...state, ...{ products: actions.payload } };

        case actionTypes.DATA:
            localStorage.setItem('data', JSON.stringify(actions.data));
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ data: actions.data },
            };
        case actionTypes.ONESHOPDOC:
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ shop: actions.payload },
            };

        case actionTypes.CATEGORY_LISTS:
            return { ...state, ...{ category_lists: actions.payload } };

        case actionTypes.TOP_CATEGORY_LISTS:
            return { ...state, ...{ top_category_lists: actions.payload } };

        case actionTypes.CATEGORY:
            return { ...state, ...{ category: actions.payload } };

        case actionTypes.CATEGORY_SLUG:
            return { ...state, ...{ categorySlug: actions.payload } };
        default:
            return state;
    }
}

export default reducer;
