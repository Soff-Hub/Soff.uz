import { actionTypes } from './action';

// const accessToken = localStorage.getItem('ss')

export const initState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [],
    data: {},
    products:{},
};

function reducer(state = initState, actions) {
  
    switch (actions.type) {
        case actionTypes.LOGIN_REQUEST:
           console.log('==', actions);
            localStorage.setItem('user', JSON.stringify(actions.user));
            localStorage.setItem('data', JSON.stringify(actions.data));
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ user: actions.user },
                ...{data : actions.data}
            };
        case actionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('data')
            localStorage.removeItem('qayta_token')
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
            console.log('actions', actions);
            localStorage.setItem('data', JSON.stringify(actions.data));
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ data: actions.data },
            };
       
            default:
            return state;
    }
}

export default reducer;
