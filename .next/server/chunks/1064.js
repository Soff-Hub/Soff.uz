"use strict";
exports.id = 1064;
exports.ids = [1064];
exports.modules = {

/***/ 1064:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ baseUrlUseApi)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__]);
_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const baseUrlUseApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
const useApi = (key, endpoint, method = "GET", options = {})=>{
    const queryClient = useQueryClient();
    const fetcher = async ({ body  } = {})=>{
        const config = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            ...body ? {
                body: JSON.stringify(body)
            } : {}
        };
        const response = await fetch(endpoint, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };
    const queryResult = method === "GET" ? useQuery([
        key
    ], fetcher, options) : undefined;
    const mutationResult = method !== "GET" ? useMutation(fetcher, {
        onSuccess: (data)=>{
            queryClient.invalidateQueries([
                key
            ]);
            if (options.onSuccess) options.onSuccess(data);
        },
        ...options
    }) : undefined;
    // Return appropriate result based on method
    return method === "GET" ? queryResult : mutationResult;
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (useApi)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=1064.js.map