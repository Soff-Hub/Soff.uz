"use strict";
exports.id = 4333;
exports.ids = [4333];
exports.modules = {

/***/ 6246:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var _base_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5956);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const axiosInstance = (token)=>{
    return axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: `${_base_url__WEBPACK_IMPORTED_MODULE_1__/* .f_base_url */ .RI}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axiosInstance);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4333:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PQ": () => (/* binding */ useFPost),
/* harmony export */   "oh": () => (/* binding */ useFGet)
/* harmony export */ });
/* unused harmony exports useFPatch, useFDelete */
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var _api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6246);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const useFGet = (key, url, { enabled =true , token , ...options } = {})=>{
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)({
        queryKey: Array.isArray(key) ? key : [
            key
        ],
        queryFn: async ()=>{
            const { data  } = await (0,_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(token).get(url);
            return data;
        },
        enabled,
        ...options
    });
};
const useFPost = ({ url , token , onSuccess , onError , ...options } = {})=>{
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQueryClient)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useMutation)({
        mutationFn: async (body)=>{
            const { data  } = await (0,_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(token).post(url, body);
            return data;
        },
        onSuccess: (data, variables, context)=>{
            if (onSuccess) onSuccess(data, variables, context);
            // invalidate cache
            queryClient.invalidateQueries();
        },
        onError,
        ...options
    });
};
const useFPatch = ({ url , token , onSuccess , onError , ...options } = {})=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body)=>{
            const { data  } = await axiosInstance(token).patch(url, body);
            return data;
        },
        onSuccess: (data, variables, context)=>{
            if (onSuccess) onSuccess(data, variables, context);
            queryClient.invalidateQueries();
        },
        onError,
        ...options
    });
};
const useFDelete = ({ url , token , onSuccess , onError , ...options } = {})=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id)=>{
            const { data  } = await axiosInstance(token).delete(`${url}/${id}`);
            return data;
        },
        onSuccess: (data, variables, context)=>{
            if (onSuccess) onSuccess(data, variables, context);
            queryClient.invalidateQueries();
        },
        onError,
        ...options
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;