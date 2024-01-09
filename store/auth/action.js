export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    ISLOGINNING: 'ISLOGINNING',
    ACCOUNT_LINKS: 'ACCOUNT_LINKS',
    MYPODUCTS_LISTS: 'MYPODUCTS_LISTS',
    ONESHOPDOC: 'ONESHOPDOC',
    CATEGORY_LISTS: 'CATEGORY_LISTS',
    TOP_CATEGORY_LISTS: 'TOP_CATEGORY_LISTS',
    CATEGORY: 'CATEGORY',
    CATEGORY_SLUG:'CATEGORY_SLUG',
};

export function login({ user, data }) {
    console.log('action', user, data);
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
export function MyProductsEdit(payload) {
    return { type: actionTypes.MYPODUCTS_LISTS, payload };
}
export function OneShopDoc(payload) {
    return { type: actionTypes.ONESHOPDOC, payload };
}
export function Category_Lists(payload) {
    return { type: actionTypes.CATEGORY_LISTS, payload };
}

export function TopCategory_Lists(payload) {
    return { type: actionTypes.TOP_CATEGORY_LISTS, payload };
}
export function Category(payload) {
    return { type: actionTypes.CATEGORY, payload };
}
export function CategorySlug(payload) {
    return { type: actionTypes.CATEGORY_SLUG, payload };
}



