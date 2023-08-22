import { actionTypes } from './action';

// const accessToken = localStorage.getItem('ss')

export const initState = {
    isLoggedIn: false,
    user: null,
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
            localStorage.removeItem('user')
            return {
                ...state,
                ...{ isLoggedIn: false },
                ...{user: null}
            };
        case actionTypes.ISLOGINNING:
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('user', user);
            
            return user?.access
                ? { ...state, ...{ isLoggedIn: true }, ...{ user: user } }
                : { ...state, ...{ isLoggedIn: false }, ...{ user: null } };
        default:
            return state;
    }
}

export default reducer;
