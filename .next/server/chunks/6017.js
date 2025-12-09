;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ccc08f96-e4d6-4338-9bd5-5aea519edaa1",e._sentryDebugIdIdentifier="sentry-dbid-ccc08f96-e4d6-4338-9bd5-5aea519edaa1");})();}catch(e){}};
"use strict";
exports.id = 6017;
exports.ids = [6017];
exports.modules = {

/***/ 6017:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "a7": () => (/* binding */ begin),
/* harmony export */   "ni": () => (/* binding */ logOut),
/* harmony export */   "sZ": () => (/* binding */ checkAuthorization),
/* harmony export */   "x4": () => (/* binding */ login)
/* harmony export */ });
/* unused harmony export setAccountLinks */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2880);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, jwt_decode__WEBPACK_IMPORTED_MODULE_1__]);
([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, jwt_decode__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



// Boshlang'ich holat
const initialState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [
        {
            text: "Sotib olinganlar",
            url: "/account/sellerproducts",
            icon: "fa-solid fa-bag-shopping"
        },
        {
            text: "Buyurtmalarim",
            url: "/order/my-orders",
            icon: "fas fa-truck"
        }, 
    ],
    data: {},
    id: null,
    status: "idle",
    error: null
};
// Asenkron funksiyalarni yaratish
const login = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("auth/login", async ({ user , data  }, { rejectWithValue  })=>{
    try {
        // API chaqiruv
        localStorage.setItem("user", JSON.stringify(user));
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default().set("token", user?.access, {
            expires: (0,jwt_decode__WEBPACK_IMPORTED_MODULE_1__.jwtDecode)(user?.access)?.exp || 8
        });
        // Store data in localStorage for backward compatibility, but not in Redux state
        if (data) {
            localStorage.setItem("data", JSON.stringify({
                ...data,
                password: null
            }));
        }
        return {
            user,
            data: data ? {
                ...data,
                password: null
            } : {},
            status: "succeeded"
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const logOut = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("auth/logOut", async (_, { rejectWithValue  })=>{
    try {
        // API chaqiruv
        localStorage.clear();
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default().remove("token");
        return;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const checkAuthorization = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("auth/checkAuthorization", async (_, { rejectWithValue  })=>{
    try {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
        const token = js_cookie__WEBPACK_IMPORTED_MODULE_2___default().get("token");
        if (!token) js_cookie__WEBPACK_IMPORTED_MODULE_2___default().set("token", user?.access, {
            expires: (0,jwt_decode__WEBPACK_IMPORTED_MODULE_1__.jwtDecode)(user?.access)?.exp || 8
        });
        if (user?.access) {
            return {
                isLoggedIn: true,
                user,
                status: "succeeded"
            };
        } else {
            return {
                isLoggedIn: false,
                user: null,
                status: "failed"
            };
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        setAccountLinks: (state, action)=>{
            state.accountLinks = action.payload;
        },
        begin: (state, action)=>{
            state.id = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.status = "loading";
        }).addCase(login.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.data = action.payload.data || {};
        }).addCase(login.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload;
        }).addCase(logOut.fulfilled, (state)=>{
            state.isLoggedIn = false;
            state.user = null;
            state.data = {};
            state.status = "idle";
        }).addCase(checkAuthorization.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload;
        }).addCase(checkAuthorization.fulfilled, (state, action)=>{
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.status = action.payload.status;
        });
    }
});
// Reducer va actionlarni eksport qilish
const { setAccountLinks , begin  } = authSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=6017.js.map