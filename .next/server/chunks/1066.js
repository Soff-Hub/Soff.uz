;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1302e9fe-ee49-44c5-9a7f-a96fcfb0fea8",e._sentryDebugIdIdentifier="sentry-dbid-1302e9fe-ee49-44c5-9a7f-a96fcfb0fea8");})();}catch(e){}};
"use strict";
exports.id = 1066;
exports.ids = [1066];
exports.modules = {

/***/ 1066:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9752);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3558);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_4__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const useCreateChat = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(user?.access);
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useMutation)({
        mutationFn: async (id)=>{
            const formData = new FormData();
            formData.append("participant_id", id);
            const { data  } = await axios.post("chats/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return data;
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({
                queryKey: [
                    "chats"
                ]
            });
            antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Chat yaratildi");
            push(`/chat${data?.chat_id ? `?chatId=${data?.chat_id}` : ""}`);
        },
        onError: (error)=>{
            const errorMsg = error?.response?.data?.detail || "Xatolik yuz berdi";
            antd__WEBPACK_IMPORTED_MODULE_2__.message.error(errorMsg);
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useCreateChat);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=1066.js.map