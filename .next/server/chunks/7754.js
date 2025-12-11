"use strict";
exports.id = 7754;
exports.ids = [7754];
exports.modules = {

/***/ 7754:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XD": () => (/* binding */ useGet),
/* harmony export */   "aH": () => (/* binding */ usePatch)
/* harmony export */ });
/* unused harmony exports usePost, usePut, useDelete */
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8310);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _repositories_api__WEBPACK_IMPORTED_MODULE_1__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _repositories_api__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const getRequest = (url, config, instance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>instance.get(url, config).then((res)=>res.data);
const postRequest = (url, payload, config, instance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>instance.post(url, payload, config).then((res)=>res.data);
const putRequest = (url, payload, config, instance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>instance.put(url, payload, config).then((res)=>res.data);
const patchRequest = (url, payload, config, instance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>instance.patch(url, payload, config).then((res)=>res.data);
const deleteRequest = (url, config, instance = api)=>instance.delete(url, config).then((res)=>res.data);
const useGet = (key, url, params, options = {}, apiInstance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)([
        key,
        url,
        params
    ], ()=>getRequest(url, {
            params
        }, apiInstance), {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        ...options
    });
const createMutation = (requestFn)=>(key, options = {}, apiInstance = _repositories_api__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)=>{
        const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQueryClient)();
        return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useMutation)(({ url , payload  })=>requestFn(url, payload, {}, apiInstance), {
            ...options,
            onSuccess: (...args)=>{
                if (key) queryClient.invalidateQueries([
                    key
                ]);
                options?.onSuccess?.(...args);
            }
        });
    };
const usePost = createMutation(postRequest);
const usePut = createMutation(putRequest);
const usePatch = createMutation(patchRequest);
const useDelete = (key, options = {}, apiInstance = api)=>{
    const queryClient = useQueryClient();
    return useMutation((url)=>deleteRequest(url, {}, apiInstance), {
        ...options,
        onSuccess: (...args)=>{
            if (key) queryClient.invalidateQueries([
                key
            ]);
            options?.onSuccess?.(...args);
        }
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=7754.js.map