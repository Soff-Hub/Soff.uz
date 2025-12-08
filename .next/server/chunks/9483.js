exports.id = 9483;
exports.ids = [9483];
exports.modules = {

/***/ 9483:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yet_another_react_lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5717);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
/* harmony import */ var yet_another_react_lightbox_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8069);
/* harmony import */ var yet_another_react_lightbox_styles_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(yet_another_react_lightbox_styles_css__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([yet_another_react_lightbox__WEBPACK_IMPORTED_MODULE_1__, react_icons_io5__WEBPACK_IMPORTED_MODULE_3__]);
([yet_another_react_lightbox__WEBPACK_IMPORTED_MODULE_1__, react_icons_io5__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function getYouTubeThumbnail(url) {
    const match = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}
const ImageLightBox = ({ gallery =[]  })=>{
    const { 0: isOpen , 1: setIsOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const slidesGallery = Array.isArray(gallery) ? gallery.map((image)=>({
            src: image?.image_url || image?.thumbUrl || getYouTubeThumbnail(image?.video_url)
        })) : [];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "m-0",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                type: "button",
                onClick: ()=>setIsOpen(true),
                "aria-label": "Rasmlarni to'liq ekranda ko'rish",
                style: {
                    border: "none",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "5px"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_3__.IoExpandOutline, {
                    className: "fs-1 text-success"
                })
            }),
            isOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(yet_another_react_lightbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
                open: isOpen,
                close: ()=>setIsOpen(false),
                slides: slidesGallery,
                render: {
                    slide: ({ slide  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: slide.src,
                            alt: "",
                            style: {
                                maxWidth: "100vw",
                                maxHeight: "100vh",
                                objectFit: "contain",
                                margin: "auto",
                                display: "block"
                            },
                            onError: (e)=>{
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = "/static/img/no-document.png";
                            }
                        })
                }
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageLightBox);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8069:
/***/ (() => {



/***/ })

};
;