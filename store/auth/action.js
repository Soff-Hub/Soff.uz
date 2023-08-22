export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',

    ISLOGINNING: 'ISLOGINNING'
};

export function login({ user }) {
    console.log(user);
    return { type: actionTypes.LOGIN_REQUEST, user };
}

export function loginSuccess({ user }) {
    return { type: actionTypes.LOGIN_SUCCESS, user };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}


export function isLoginning() {
    return { type: actionTypes.ISLOGINNING };
}
