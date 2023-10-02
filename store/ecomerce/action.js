export const actionTypes = {
    // new

    SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',
    SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

    SET_cart: 'SET_cart',
    SET_cart_SUCCESS: 'SET_cart_SUCCESS',

    SET_COMPARE_ITEMS: 'SET_COMPARE_ITEMS',
    SET_COMPARE_ITEMS_SUCCESS: 'SET_COMPARE_ITEMS_SUCCESS',

    SET_CARTDATA: 'SET_CARTDATA',
    SET_CARTDATA_SUCCESS: 'SET_CARTDATA_SUCCESS',

    SET_CARTDATA_ITEM: 'SET_CARTDATA_ITEM',
    SET_CARTDATA_SUCCESS_ITEM: 'SET_CARTDATA_SUCCESS_ITEM',
};

// new
export function setWishlistTtems(payload) {
    console.log(localStorage.getItem('hgf') || false);
    return { type: actionTypes.SET_WISHLIST_ITEMS, payload };
}

export function setWishlistTtemsSuccess(payload) {
    // console.log(payload);
    return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}

export function setCartItems(payload) {
    localStorage.setItem('cart', JSON.stringify(payload))
    // console.log(payload);
    return { type: actionTypes.SET_cart, payload };
}

export function setCartItemsSuccess(payload) {
    return { type: actionTypes.SET_cart_SUCCESS, payload };
}

export function setCompareItems(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS, payload };
}

export function setCompareItemsSuccess(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS_SUCCESS, payload };
}

export function setCartDataItems(payload) {
    const localData = []
    for (let i = 0; i < payload.length; i++) {
        localData.push(payload[i].id)
    }
    localStorage.setItem('cart', JSON.stringify(localData))
    return { type: actionTypes.SET_CARTDATA, payload };
}

export function setCartDataItemsSuccess(payload) {
    return { type: actionTypes.SET_CARTDATA_SUCCESS, payload };
}


export function setCartItemDataItems(payload) {
    const localData = JSON.parse(localStorage.getItem('cart')) || []
    localStorage.setItem('cart', JSON.stringify([...localData, payload[0].id]))
    return { type: actionTypes.SET_CARTDATA_ITEM, payload };
}

export function setCartItemDataItemsSuccess(payload) {
    return { type: actionTypes.SET_CARTDATA_SUCCESS_ITEM, payload };
}

