;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="dcd0961a-d7ec-47d5-871e-4fb8b4f63845",e._sentryDebugIdIdentifier="sentry-dbid-dcd0961a-d7ec-47d5-871e-4fb8b4f63845");})();}catch(e){}};
"use strict";
exports.id = 7941;
exports.ids = [7941];
exports.modules = {

/***/ 7941:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useAuth)
/* harmony export */ });
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1869);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__]);
_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function useAuth() {
    const registerUser = (url, e)=>{
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + url, e).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const registerGoogleUser = (params, e)=>{
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + `auth/social/login/${e}/${params}`).then((ress)=>{
            return ress;
        }).catch((error)=>{
            return Promise.reject(error);
        });
        return user;
    };
    const loginUser = (e)=>{
        let endPoint = "auth/login/";
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, e).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const verifyCode = (e)=>{
        const endPoint = "auth/verify/";
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, {
            ...e,
            user: localStorage.getItem("token")
        }).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const NewVerifyCode = (e)=>{
        const endPoint = "auth/reset-password-verify/";
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("qayta_token")} `
            }
        };
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, e, config).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const qaytaKodYuborish = (data)=>{
        let endPoint = "auth/get-new-code/";
        // let endPoint = 'auth/get-new-code/';
        let config = {
            Authorization: `Bearer ${localStorage.getItem("token")} `
        };
        let user = (0,_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
            url: _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint,
            method: "POST",
            headers: config,
            data: data
        }).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const qaytaKodYuborishParol = (data)=>{
        let endPoint = "auth/get-new-code/";
        // let endPoint = 'auth/get-new-code/';
        let config = {
            Authorization: `Bearer ${localStorage.getItem("qayta_token")} `
        };
        let user = (0,_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
            url: _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint,
            method: "POST",
            headers: config,
            data: data
        }).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const qaytaRaqamYuborishAuth = (e)=>{
        let endPoint = "auth/reset-password/";
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, e).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const qaytaParolYuborishAuth = (e)=>{
        let endPoint = "auth/reset-password-confirm/";
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("qayta_token")} `
            }
        };
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, e, config).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const logOutAuth = (e)=>{
        let endPoint = "auth/logout/";
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")} `
            }
        };
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrlAuth */ .iq + endPoint, e, config).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    const feedbackPost = (e)=>{
        let endPoint = "customer/feedback-create/";
        let user = _repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint, e).then((ress)=>{
            return ress;
        }).catch((error)=>{
            if (error.response) {
                return error.response;
            }
        });
        return user;
    };
    return {
        registerUser,
        loginUser,
        verifyCode,
        qaytaKodYuborish,
        qaytaRaqamYuborishAuth,
        NewVerifyCode,
        qaytaParolYuborishAuth,
        logOutAuth,
        qaytaKodYuborishParol,
        feedbackPost,
        registerGoogleUser
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=7941.js.map