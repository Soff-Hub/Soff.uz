import { actionTypes } from './action';

// const accessToken = localStorage.getItem('ss')

export const initState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [],
};

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.LOGIN_REQUEST:
            localStorage.setItem('user', JSON.stringify(actions.user));
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ user: actions.user },
            };
        case actionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
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
        default:
            return state;
    }
}

export default reducer;
