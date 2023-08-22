import { all, put, takeEvery } from 'redux-saga/effects';
import {notification } from 'antd';

import { actionTypes, loginSuccess, logOutSuccess } from './action';

const modalSuccess = type => {
    notification[type]({
        message: 'Xush kelibsiz saytimizga!',
        description: 'Siz muvaffaqqiyatli kirdingiz!',
    });
};

const modalWarning = type => {
    notification[type]({

        message: 'Xayr!',
        description: 'Siz profilingizdan chiqib kettingiz!',
    });
};

function* loginSaga() {
    try {
        yield put(loginSuccess());
        modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
