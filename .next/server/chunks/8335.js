"use strict";
exports.id = 8335;
exports.ids = [8335];
exports.modules = {

/***/ 3608:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$Y": () => (/* binding */ basePostUrl),
/* harmony export */   "FH": () => (/* binding */ baseUrl),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "iq": () => (/* binding */ baseUrlAuth)
/* harmony export */ });
/* unused harmony exports baseStoreURL, baseUrlSoffNew, customHeaders, serializeQuery */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// BASE DOMAINS
const baseDomain = `${"https://api.soff.uz"}/api/v1/`;
const basePostUrl = `${"https://api.soff.uz"}`;
const baseStoreURL = (/* unused pure expression or super */ null && (`${"https://api.soff.uz"}`));
const baseUrlAuth = `${"https://api.soff.uz"}/`;
const baseUrlSoffNew = `${process.env.NEXT_PUBLIC_BASE_URL_SOFFNEW}/`;
const customHeaders = {
    Accept: "application/json"
};
const baseUrl = `${baseDomain}`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseUrl,
    headers: customHeaders
}));
const serializeQuery = (query)=>{
    return Object.keys(query).map((key)=>`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join("&");
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3772:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const baseURL =  false ? 0 : "https://api.soff.uz";
const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL
});
api.interceptors.request.use((config)=>{
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(storedUser)?.access}`;
    }
    return config;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8749:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RI": () => (/* binding */ f_base_url),
/* harmony export */   "dC": () => (/* binding */ f_base_ws_url),
/* harmony export */   "t8": () => (/* binding */ d_base_url)
/* harmony export */ });
/* unused harmony export d_base_ws_url */
const d_base_url = "https://api.soff.uz";
const f_base_url = "https://freelance.soff.uz";
const d_base_ws_url = (/* unused pure expression or super */ null && ("wss://api.soff.uz/"));
const f_base_ws_url = "wss://freelance.soff.uz/api/v1/ws/";


/***/ }),

/***/ 6603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ utilities_useResponsive)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./shared/hooks/useIsomorphicLayoutEffect.js

const useIsomorphicLayoutEffect =  false ? 0 : external_react_.useEffect;
/* harmony default export */ const hooks_useIsomorphicLayoutEffect = (useIsomorphicLayoutEffect);

;// CONCATENATED MODULE: ./shared/utilities/useResponsive.js


const useResponsive = ()=>{
    const { 0: isMobile , 1: setIsMobile  } = (0,external_react_.useState)(false);
    const { 0: isTablet , 1: setIsTablet  } = (0,external_react_.useState)(false);
    const { 0: isDesktop , 1: setIsDesktop  } = (0,external_react_.useState)(false);
    const { 0: size , 1: setSize  } = (0,external_react_.useState)(0);
    hooks_useIsomorphicLayoutEffect(()=>{
        setSize(window.innerWidth);
        const handleResize = ()=>{
            const { innerWidth  } = window;
            setIsMobile(innerWidth < 576);
            setIsTablet(innerWidth >= 576 && innerWidth < 992);
            setIsDesktop(innerWidth >= 992);
            setSize(innerWidth);
        };
        // Initial call to set the initial state based on window width
        handleResize();
        // Add event listener for resize events
        window.addEventListener("resize", handleResize, {
            passive: true
        });
        // Cleanup event listener on unmount
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    return {
        isMobile,
        isTablet,
        isDesktop,
        size
    };
};
/* harmony default export */ const utilities_useResponsive = (useResponsive);


/***/ }),

/***/ 4729:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ apiFreelanceSlice),
/* harmony export */   "b": () => (/* binding */ apiSoffSlice)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9943);
/* harmony import */ var _shared_api_base_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8749);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3015);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9880);
/* harmony import */ var _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2160);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_2__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_3__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_4__]);
([_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_2__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_3__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const getToken = ()=>{
    if (false) {}
    return null;
};
// Retry function: only retry on server errors (5xx) or connection errors, not on 4xx errors
const retryLogic = (failureCount, error)=>{
    if (failureCount >= 3) {
        return false;
    }
    if (!error.status) {
        return true;
    }
    if (error.status >= 500) {
        return true;
    }
    return false;
};
// Custom base query wrapper to handle 403 errors
const baseQueryWithLogout = (baseQuery)=>{
    return async (args, api, extraOptions)=>{
        const result = await baseQuery(args, api, extraOptions);
        // Handle 403 Forbidden errors
        if (result.error && result.error.status === 403) {
            if (false) {}
        }
        return result;
    };
};
const apiSoffSlice = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
    reducerPath: "apiSoff",
    baseQuery: baseQueryWithLogout((0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
        baseUrl: _shared_api_base_url__WEBPACK_IMPORTED_MODULE_5__/* .d_base_url */ .t8,
        prepareHeaders: (headers)=>{
            const token = getToken();
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    })),
    tagTypes: [
        "Profile"
    ],
    endpoints: ()=>({})
});
// Configure retry logic globally for all endpoints
apiSoffSlice.enhanceEndpoints({
    addTagTypes: [
        "Profile"
    ],
    endpoints: {
        "*": {
            retry: retryLogic
        }
    }
});
const apiFreelanceSlice = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
    reducerPath: "apiFreelance",
    baseQuery: baseQueryWithLogout((0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
        baseUrl: _shared_api_base_url__WEBPACK_IMPORTED_MODULE_5__/* .f_base_url */ .RI,
        prepareHeaders: (headers)=>{
            const token = getToken();
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    })),
    tagTypes: [
        "Directions"
    ],
    endpoints: ()=>({})
});
// Configure retry logic globally for all endpoints
apiFreelanceSlice.enhanceEndpoints({
    addTagTypes: [
        "Directions"
    ],
    endpoints: {
        "*": {
            retry: retryLogic
        }
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2160:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EE": () => (/* binding */ setSavedPrfileData),
/* harmony export */   "I0": () => (/* binding */ setSavedItem),
/* harmony export */   "Ih": () => (/* binding */ setSaved),
/* harmony export */   "PF": () => (/* binding */ setCartItemDataItems),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "x9": () => (/* binding */ setCartDataItems)
/* harmony export */ });
/* unused harmony exports setWishlistItems, initLocalCart, setCartItems, setCompareItems, setRepliedCount */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3608);
/* harmony import */ var _shared_api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3772);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_1__, _shared_api_api__WEBPACK_IMPORTED_MODULE_2__]);
([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_1__, _shared_api_api__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



// Boshlang'ich holat
const initialState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    cartDataItems: [],
    wishlist: [],
    replied_count: 0,
    profile: null,
    status: "loading",
    error: null
};
// Asenkron thunk funksiyalari
const setWishlistItems = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("ecommerce/setWishlistItems", async (payload, { rejectWithValue  })=>{
    try {
        // Bu yerda API chaqiruvi yoki boshqa logika bo'lishi mumkin
        return payload; // Thunk orqali qaytariladi
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const initLocalCart = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("ecommerce/initLocalCart", async (payload, { rejectWithValue  })=>{
    const wishL = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (wishL.length > 0 || cart.length > 0) {
        try {
            const resp1 = await _shared_api_api__WEBPACK_IMPORTED_MODULE_2__/* ["default"].post */ .Z.post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_1__/* .baseUrl */ .FH + "customer/documents-list/", {
                documents: [
                    ...wishL,
                    ...cart
                ]
            });
            return {
                wishlist: wishL.map((el, i)=>resp1.data?.data?.[i]),
                cart: cart.map((el, i)=>resp1.data?.data?.[wishL.length + i])
            };
        } catch (error) {
            return {
                wishlist: wishL.map((el, i)=>resp.data?.data?.[i]),
                cart: cart.map((el, i)=>resp.data?.data?.[wishL.length + i])
            };
        }
    } else {
        return {
            wishlist: [],
            cart: []
        };
    }
});
const setCartItems = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("ecommerce/setCartItems", async (payload, { rejectWithValue  })=>{
    try {
        localStorage.setItem("cart", JSON.stringify(payload));
        return payload;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// Slice yaratish
const ecommerceSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "ecommerce",
    initialState,
    reducers: {
        setCompareItems: (state, action)=>{
            state.compareItems = action.payload;
        },
        setCartDataItems: (state, action)=>{
            const localData = action.payload.map((item)=>item.id);
            localStorage.setItem("cart", JSON.stringify(localData));
            state.cartDataItems = action.payload;
        },
        setCartItemDataItems: (state, action)=>{
            const localData = JSON.parse(localStorage.getItem("cart")) || [];
            localStorage.setItem("cart", JSON.stringify([
                ...localData,
                action.payload[0].id
            ]));
            state.cartDataItems.push(action.payload[0]);
        },
        setSaved: (state, action)=>{
            const localData = action.payload.map((item)=>item.id);
            localStorage.setItem("wishlist", JSON.stringify(localData));
            state.wishlist = action.payload;
        },
        setSavedItem: (state, action)=>{
            const localData = JSON.parse(localStorage.getItem("wishlist")) || [];
            localStorage.setItem("wishlist", JSON.stringify([
                ...localData,
                action.payload[0].id
            ]));
            state.wishlist.push(action.payload[0]);
        },
        setRepliedCount: (state, action)=>{
            state.replied_count = action.payload;
        },
        setSavedPrfileData: (state, action)=>{
            state.profile = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(setWishlistItems.pending, (state)=>{
            state.status = "loading";
        }).addCase(setWishlistItems.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.wishlistItems = action.payload;
        }).addCase(setWishlistItems.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload;
        }).addCase(setCartItems.pending, (state)=>{
            state.status = "loading";
        }).addCase(setCartItems.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.cartItems = action.payload;
        }).addCase(setCartItems.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload;
        }).addCase(initLocalCart.fulfilled, (state, action)=>{
            state.wishlist = action.payload.wishlist;
            state.cartDataItems = action.payload.cart;
            state.status = "idle";
        });
    }
});
// Actionlarni eksport qilish
const { setCompareItems , setCartDataItems , setCartItemDataItems , setSaved , setSavedItem , setRepliedCount , setSavedPrfileData ,  } = ecommerceSlice.actions;
// Reducerni eksport qilish
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ecommerceSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9880:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mx": () => (/* binding */ useGetProfileQuery),
/* harmony export */   "P5": () => (/* binding */ useGetDirectionsQuery),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "kS": () => (/* binding */ logout)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
/* harmony import */ var _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4729);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__]);
([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const initialState = {
    user: null,
    directions: [],
    loading: false,
    error: null
};
const userProfile = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "userProfile",
    initialState,
    reducers: {
        logout: (state)=>{
            state.user = null;
            _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__/* .apiSoffSlice.util.resetApiState */ .b.util.resetApiState();
            _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__/* .apiFreelanceSlice.util.resetApiState */ .L.util.resetApiState();
        },
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
        },
        setDirections: (state, action)=>{
            state.directions = action.payload;
        }
    }
});
const extendedSoffSlice = _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__/* .apiSoffSlice.injectEndpoints */ .b.injectEndpoints({
    endpoints: (builder)=>({
            getProfile: builder.query({
                query: ()=>"/auth/profile",
                providesTags: [
                    "Profile"
                ],
                // Keep cached data for 5 minutes (300 seconds)
                keepUnusedDataFor: 300,
                onQueryStarted: async (_arg, { dispatch , queryFulfilled  })=>{
                    try {
                        const { data  } = await queryFulfilled;
                        dispatch(userProfile.actions.setUser(data));
                    } catch (error) {
                        dispatch(userProfile.actions.setError(error.message || "Pro'filni olishda xatolik yuz berdi"));
                    }
                }
            })
        })
});
const extendedFreelanceSlice = _api_apiSlice__WEBPACK_IMPORTED_MODULE_1__/* .apiFreelanceSlice.injectEndpoints */ .L.injectEndpoints({
    endpoints: (builder)=>({
            getDirections: builder.query({
                query: ()=>"api/v1/categories/all-directions",
                providesTags: [
                    "Directions"
                ],
                transformResponse: (response)=>response.map((dir)=>({
                            label: dir.title,
                            value: dir.value
                        })),
                onQueryStarted: async (_arg, { dispatch , queryFulfilled  })=>{
                    try {
                        const { data  } = await queryFulfilled;
                        dispatch(userProfile.actions.setDirections(data));
                    } catch (error) {
                        dispatch(userProfile.actions.setError(error.message || "Yo'nalishlarni olishda xatolik yuz berdi"));
                    }
                }
            })
        })
});
const { useGetProfileQuery  } = extendedSoffSlice;
const { useGetDirectionsQuery  } = extendedFreelanceSlice;
const { logout  } = userProfile.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userProfile.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=8335.js.map