import { all, put, takeEvery } from 'redux-saga/effects';
import { actionTypes, setCartDataItemsSuccess, setCartItemDataItemsSuccess, setSavedItemSuccess, setSavedSuccess } from './action';

import {
    setCartItemsSuccess,
    setWishlistTtemsSuccess,
    setCompareItemsSuccess,
} from './action';

// new
function* getWishlistItems({ payload }) {
    try {
        yield put(setWishlistTtemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartItems({ payload }) {
    try {
        yield put(setCartItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCompareItems({ payload }) {
    try {
        yield put(setCompareItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartDataItems({ payload }) {
    try {
        yield put(setCartDataItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartItemDataItems({ payload }) {
    try {
        yield put(setCartItemDataItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}


function* getSaved({ payload }) {
    try {
        yield put(setSavedSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getSavedItem({ payload }) {
    try {
        yield put(setSavedItemSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}





export default function* rootSaga() {
    // new
    yield all([takeEvery(actionTypes.SET_WISHLIST_ITEMS, getWishlistItems)]);
    yield all([takeEvery(actionTypes.SET_cart, getCartItems)]);
    yield all([takeEvery(actionTypes.SET_COMPARE_ITEMS, getCompareItems)]);
    yield all([takeEvery(actionTypes.SET_CARTDATA, getCartDataItems)]);
    yield all([takeEvery(actionTypes.SET_CARTDATA_ITEM, getCartItemDataItems)]);

    yield all([takeEvery(actionTypes.SET_SAVED, getSaved)]);
    yield all([takeEvery(actionTypes.SET_SAVED_ITEM, getSavedItem)]);

}
