export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    ISLOGINNING: 'ISLOGINNING',
    ACCOUNT_LINKS: 'ACCOUNT_LINKS',
};

export function login({ user, data }) {
    console.log(user, data);
    return { type: actionTypes.LOGIN_REQUEST, user, data };
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

export function accountLinksReducers(payload) {
    return { type: actionTypes.ACCOUNT_LINKS, payload };
}


