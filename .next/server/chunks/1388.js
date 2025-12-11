exports.id = 1388;
exports.ids = [1388];
exports.modules = {

/***/ 8160:
/***/ ((module) => {

// Exports
module.exports = {
	"modal": "detail_modal__haFlm",
	"ant-modal-content": "detail_ant-modal-content__JWY1X",
	"title": "detail_title__jN10W",
	"wrapper": "detail_wrapper__xJpEC",
	"galleryBox": "detail_galleryBox__8vANj",
	"newImage": "detail_newImage__N0Id1",
	"infoBox": "detail_infoBox__L1ChD",
	"ant-descriptions-bordered": "detail_ant-descriptions-bordered__OHj8_",
	"ant-descriptions-title": "detail_ant-descriptions-title__7qyTN"
};


/***/ }),

/***/ 6897:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__ErA_a",
	"image": "style_image__rWrQu",
	"overlay": "style_overlay__C18V9",
	"title": "style_title__cTi3_",
	"description": "style_description__kSN3b",
	"actions": "style_actions__rOpR7",
	"content": "style_content__lNt9z",
	"viewdiv": "style_viewdiv__iA8xg",
	"addBtn": "style_addBtn__mpWKq"
};


/***/ }),

/***/ 1388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ui_PortfolioSection)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/freeleance/services/service-deatail/styles/detail.module.scss
var detail_module = __webpack_require__(1393);
var detail_module_default = /*#__PURE__*/__webpack_require__.n(detail_module);
// EXTERNAL MODULE: ./components/freeleance/services/service-deatail/ui/styles/style.module.scss
var style_module = __webpack_require__(6897);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./shared/utilities/TruncateTitle.js
var TruncateTitle = __webpack_require__(696);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./components/freeleance/services/service-deatail/ui/styles/detail.module.scss
var styles_detail_module = __webpack_require__(8160);
var styles_detail_module_default = /*#__PURE__*/__webpack_require__.n(styles_detail_module);
// EXTERNAL MODULE: ./shared/utilities/useResponsive.js + 1 modules
var useResponsive = __webpack_require__(6603);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./components/freeleance/services/service-deatail/ui/PortfolioDetailModal.jsx






const getYouTubeEmbed = (url)=>{
    if (!url) return null;
    try {
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    } catch  {
        return null;
    }
};
const PortfolioDetailModal = ({ open , onClose , portfolio  })=>{
    const { isMobile  } = (0,useResponsive/* default */.Z)();
    const galleryImages = (0,external_react_.useMemo)(()=>portfolio?.portfolio_images || [], [
        portfolio?.portfolio_images
    ]);
    const galleryVideos = (0,external_react_.useMemo)(()=>portfolio?.videos || [], [
        portfolio?.videos
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Modal, {
        open: open,
        onCancel: onClose,
        footer: null,
        title: /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: (styles_detail_module_default()).title,
            children: portfolio?.title
        }),
        width: "90%",
        centered: true,
        className: (styles_detail_module_default()).modal,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (styles_detail_module_default()).wrapper,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (styles_detail_module_default()).infoBox,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Descriptions, {
                            title: "Portfolio Ma'lumotlari",
                            bordered: true,
                            size: "small",
                            column: 1,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Descriptions.Item, {
                                    label: "Kategoriya",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Tag, {
                                        color: "blue",
                                        children: portfolio?.category?.title
                                    })
                                }),
                                !isMobile && /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Descriptions.Item, {
                                    label: "Tavsif",
                                    children: portfolio?.description
                                })
                            ]
                        }),
                        isMobile && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "border rounded-3 p-2 mt-3",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                    className: "my-2",
                                    children: "Tavsif"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: portfolio?.description
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (styles_detail_module_default()).galleryBox,
                    children: [
                        galleryImages.length > 0 ? galleryImages.map((img, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                style: {
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    src: img?.image || "/static/img/orqafon1.avif",
                                    alt: `Image ${idx + 1}`,
                                    width: 800,
                                    height: 450,
                                    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px",
                                    style: {
                                        objectFit: "contain",
                                        maxWidth: "100%",
                                        height: "auto",
                                        borderRadius: "8px"
                                    },
                                    loading: idx === 0 ? "eager" : "lazy",
                                    className: "rounded"
                                })
                            }, idx)) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-gray-500 text-center mt-4",
                            children: "Rasm topilmadi."
                        }),
                        galleryVideos.length > 0 ? galleryVideos.map((video, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "video-wrapper",
                                style: {
                                    width: "100%"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("iframe", {
                                    src: `${getYouTubeEmbed(video.video_url)}?modestbranding=1&rel=0&controls=1&showinfo=0`,
                                    style: {
                                        height: "500px",
                                        width: "100%"
                                    },
                                    title: `video-${index}`,
                                    frameBorder: "0",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true
                                })
                            }, index)) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-gray-500 text-center mt-4",
                            children: "Video topilmadi."
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const ui_PortfolioDetailModal = (PortfolioDetailModal);

;// CONCATENATED MODULE: ./components/freeleance/services/service-deatail/ui/PortfolioCard.jsx






const PortfolioCard = ({ portfolio , disableClick =false  })=>{
    const { 0: open , 1: setOpen  } = (0,external_react_.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                onClick: !disableClick ? ()=>setOpen(true) : undefined,
                className: (style_module_default()).card,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: portfolio?.portfolio_images[0]?.image || "/static/img/orqafon1.avif",
                        alt: "Project",
                        className: (style_module_default()).image,
                        width: 400,
                        height: 300,
                        sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px",
                        style: {
                            objectFit: "cover",
                            width: "100%",
                            height: "100%"
                        },
                        loading: "lazy"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).overlay,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).content,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: (style_module_default()).title,
                                    children: (0,TruncateTitle/* truncateTitle */.e)(portfolio?.title, 12)
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).description,
                                    children: (0,TruncateTitle/* truncateTitle */.e)(portfolio?.description, 16)
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ui_PortfolioDetailModal, {
                open: open,
                onClose: ()=>setOpen(false),
                portfolio: portfolio
            })
        ]
    });
};
/* harmony default export */ const ui_PortfolioCard = (PortfolioCard);

;// CONCATENATED MODULE: ./components/freeleance/services/service-deatail/ui/PortfolioSection.jsx




const PortfolioSection = ({ portfolios  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (detail_module_default()).portfolioSection,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                children: [
                    "Portfolio ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        children: [
                            "(",
                            portfolios.length,
                            " ta portfolio)"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "row row-gap-5",
                children: portfolios?.map((portfolio)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(ui_PortfolioCard, {
                            portfolio: portfolio
                        })
                    }, portfolio?.id))
            })
        ]
    });
};
/* harmony default export */ const ui_PortfolioSection = (PortfolioSection);


/***/ }),

/***/ 696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ truncateTitle)
/* harmony export */ });
/* unused harmony export TruncateText */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const truncateTitle = (title, maxLength = 7)=>{
    if (!title) return "";
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};
const TruncateText = ({ text , lines =1 , as: Component = "span" , className ="" , ...props })=>{
    const baseStyle = lines === 1 ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        overflowWrap: "anywhere"
    } : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: String(lines),
        overflow: "hidden",
        wordBreak: "break-all",
        overflowWrap: "anywhere"
    };
    return /*#__PURE__*/ _jsx(Component, {
        className: className,
        style: baseStyle,
        title: text,
        ...props,
        children: text
    });
};


/***/ })

};
;
//# sourceMappingURL=1388.js.map