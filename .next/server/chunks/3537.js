;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5f614624-effa-42ca-b522-02695b9f63d9",e._sentryDebugIdIdentifier="sentry-dbid-5f614624-effa-42ca-b522-02695b9f63d9");})();}catch(e){}};
"use strict";
exports.id = 3537;
exports.ids = [3537];
exports.modules = {

/***/ 6138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useDebounce)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7567);


function useDebounce(value, delay) {
    const { startTimeout , stopTimeout  } = (0,_useTimeManager__WEBPACK_IMPORTED_MODULE_1__/* .useTimeManager */ .h)();
    const { 0: debouncedValue , 1: setDebouncedValue  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handler = startTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            stopTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
}


/***/ }),

/***/ 3356:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export transformSimilarDocument */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9752);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9410);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_utilities_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7971);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const transformSimilarDocument = (item)=>{
    if (item.document) {
        return item;
    }
    return {
        ...item,
        poster_url: item.poster || item.poster_url,
        price: parseFloat(item.discount_price) || 0,
        discount_price: parseFloat(item.discount_price) || 0,
        views_count: item.views_count || 0,
        document: {
            file_type: item.file_type || ".zip",
            file_size: (0,_shared_utilities_utils__WEBPACK_IMPORTED_MODULE_4__/* .formatFileSize */ .sS)(item.file_size || 0),
            page_count: item.page_count || 0,
            content_type: item.content_type || "file"
        }
    };
};
function useSimilarSearch({ defaultData , defaultType ="file"  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { page ="1" , type =defaultType , keyword , search , category , parentCategoryId , childCategoryId , order_by , price_from , price_to , page_from , page_to , file_type ,  } = router.query;
    const similarDocumentsEnabled = defaultData?.count < 50 && Number(page) === 1 && Boolean(search || keyword);
    const searchParams = new URLSearchParams({
        page,
        type,
        limit: "50"
    });
    if (keyword || search) searchParams.append("search", keyword || search);
    if (category || parentCategoryId) searchParams.append("category", parentCategoryId || category);
    if (order_by) searchParams.append("order_by", order_by);
    if (childCategoryId) searchParams.append("child_category", childCategoryId);
    if (file_type) {
        if (Array.isArray(file_type)) {
            file_type.forEach((ft)=>searchParams.append("file_type", ft));
        } else {
            searchParams.append("file_type", file_type);
        }
    }
    if (page_from) searchParams.append("page_from", page_from);
    if (page_to) searchParams.append("page_to", page_to);
    if (price_from) searchParams.append("price_from", price_from);
    if (price_to) searchParams.append("price_to", price_to);
    const { data: similarDocuments , isFetching: isFetchingSimilarDocuments  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
        queryKey: [
            "similar-documents",
            searchParams.toString()
        ],
        queryFn: async ()=>{
            const res = await fetch(`${_repositories_useApi__WEBPACK_IMPORTED_MODULE_2__/* .baseUrlUseApi */ .q}customer/same-google-search/?${searchParams.toString()}&similar_documents=true`);
            return await res.json();
        },
        enabled: similarDocumentsEnabled
    });
    const filteredSimilarDocuments = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        if (!similarDocuments || !similarDocuments.results) return {
            count: 0,
            results: []
        };
        const defaultDataIds = defaultData?.results?.reduce((ids, doc)=>{
            ids.add(doc.id);
            return ids;
        }, new Set());
        let count = similarDocuments.count;
        const results = similarDocuments.results.filter((doc)=>{
            if (!defaultDataIds.has(doc.id)) {
                count--;
                return true;
            }
            return false;
        });
        return {
            count,
            results
        };
    }, [
        similarDocuments,
        defaultData
    ]);
    const mergedData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        const initialResults = defaultData && defaultData.results || [];
        const similarResults = filteredSimilarDocuments.results;
        const transformedInitialResults = initialResults.map(transformSimilarDocument);
        const transformedSimilarResults = similarResults.map(transformSimilarDocument);
        return {
            results: [
                ...transformedInitialResults,
                ...transformedSimilarResults, 
            ],
            count: (defaultData?.count || 0) + filteredSimilarDocuments.count
        };
    }, [
        defaultData,
        filteredSimilarDocuments,
        isFetchingSimilarDocuments
    ]);
    // console.log({
    //     similarDocuments,
    //     defaultData,
    //     mergedData,
    //     isFetchingSimilarDocuments,
    //     similarDocumentsEnabled,
    // });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (similarDocuments && similarDocuments.results && similarDocuments.results.length) {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    similar_documents: "true"
                }
            }, undefined, {
                shallow: true
            });
        }
    }, [
        similarDocuments
    ]);
    return {
        mergedData,
        similarDocuments: filteredSimilarDocuments,
        isFetchingSimilarDocuments
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSimilarSearch);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=3537.js.map