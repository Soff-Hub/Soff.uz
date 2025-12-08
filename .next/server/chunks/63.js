exports.id = 63;
exports.ids = [63];
exports.modules = {

/***/ 4715:
/***/ ((module) => {

// Exports
module.exports = {
	"commentSection": "comment_commentSection__QxWyp",
	"title": "comment_title__1_Rpm",
	"commentItem": "comment_commentItem__b0QvI",
	"avatar": "comment_avatar__xBxqM",
	"userName": "comment_userName__35cUS",
	"commentText": "comment_commentText__sH9yr",
	"rating": "comment_rating__snw9a",
	"commentHeader": "comment_commentHeader___LWPG",
	"userInfo": "comment_userInfo__SCVqQ"
};


/***/ }),

/***/ 6145:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6246);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGetComments = (id, type)=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(user?.access);
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useInfiniteQuery)({
        queryKey: [
            "comments",
            id
        ],
        queryFn: async ({ pageParam =1  })=>{
            const { data  } = await axios.get(`customer/service/feedbacks/?${type}=${id}&page=${pageParam}`);
            return data;
        },
        getNextPageParam: (lastPage, allPages)=>{
            const loaded = allPages.length * 10;
            if (loaded < lastPage.total) {
                return allPages.length + 1;
            }
            return undefined;
        },
        enabled: !!id,
        retry: false
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGetComments);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 63:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4715);
/* harmony import */ var _styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _api_useGetComments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6145);
/* harmony import */ var _shared_utilities_cn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7150);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_useGetComments__WEBPACK_IMPORTED_MODULE_5__]);
_api_useGetComments__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const CommentSection = ({ id , type  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { data , fetchNextPage , hasNextPage , isFetchingNextPage ,  } = (0,_api_useGetComments__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(id, type);
    const comments = data?.pages.flatMap((page)=>page.items) || [];
    const handleUserClick = (sellerId)=>{
        router.push(`/seller/${sellerId}`);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().commentSection),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().title),
                children: "Fikrlar"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.List, {
                itemLayout: "horizontal",
                dataSource: comments,
                locale: {
                    emptyText: "Hozircha izohlar yo'q"
                },
                renderItem: (item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item, {
                        className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().commentItem),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item.Meta, {
                            avatar: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                                src: item.user?.photo_url || "/static/img/ozodbek.png",
                                size: 48,
                                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().avatar),
                                onClick: ()=>handleUserClick(item.user?.soff_seller_id)
                            }),
                            title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().commentHeader),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().userInfo),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().userName),
                                                onClick: ()=>handleUserClick(item.user?.soff_seller_id),
                                                children: item.user?.full_name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Rate, {
                                                disabled: true,
                                                defaultValue: item.quality,
                                                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().rating)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        style: {
                                            color: "gray",
                                            fontSize: "12px"
                                        },
                                        children: dayjs__WEBPACK_IMPORTED_MODULE_4___default()(item.created_at).format("YYYY-MM-DD")
                                    })
                                ]
                            }),
                            description: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_comment_module_scss__WEBPACK_IMPORTED_MODULE_8___default().commentText),
                                children: item.comment
                            })
                        })
                    })
            }),
            hasNextPage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    textAlign: "center",
                    marginTop: 16
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    onClick: ()=>fetchNextPage(),
                    loading: isFetchingNextPage,
                    shape: "round",
                    children: isFetchingNextPage ? "Yuklanmoqda..." : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_6__.cn)("flex", "items-center", "gap-2"),
                        children: [
                            "Ko'proq ko‘rsatish ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__.DownOutlined, {})
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_6__.cn)("mt-2", "text-[12px]", "text-center"),
                children: [
                    data?.pages[0].total,
                    " tadan ",
                    comments?.length,
                    " ta ko'rsatilgan"
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;