;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f3cca784-944e-4e6f-ad54-e95986a63a6a",e._sentryDebugIdIdentifier="sentry-dbid-f3cca784-944e-4e6f-ad54-e95986a63a6a");})();}catch(e){}};
"use strict";
(() => {
var exports = {};
exports.id = 5260;
exports.ids = [5260];
exports.modules = {

/***/ 3144:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8454);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1869);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1218);
/* harmony import */ var _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1401);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_3__, _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_6__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_3__, _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const video_url = "https://www.youtube.com/watch?v=oJre9mbRE2U";
// Lazy load ProductVideoBanner
const ProductVideoBanner = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(null, {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/product/ProductVideoBanner"
        ]
    },
    ssr: false
});
// Lazy load heavy components
const LastAddedProducts = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(null, {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/details-components/LastAddedProducts"
        ]
    },
    ssr: false
});
const SimilarProducts = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(null, {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/details-components/SimilarProducts"
        ]
    },
    ssr: false
});
const AISoffiaPresentation = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(null, {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/elements/AISoffiaPresentation"
        ]
    },
    ssr: false
});
// Conditionally load Joyride only when needed (first visit)
const Joyride = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(null, {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "react-joyride"
        ]
    },
    ssr: false
});
const FileProductDetatails = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(()=>Promise.all(/* import() */[__webpack_require__.e(7567), __webpack_require__.e(9075), __webpack_require__.e(280), __webpack_require__.e(75), __webpack_require__.e(5419), __webpack_require__.e(1080), __webpack_require__.e(1708), __webpack_require__.e(2653), __webpack_require__.e(2789), __webpack_require__.e(5168), __webpack_require__.e(9245), __webpack_require__.e(5931), __webpack_require__.e(9706), __webpack_require__.e(9257), __webpack_require__.e(5533), __webpack_require__.e(772)]).then(__webpack_require__.bind(__webpack_require__, 772)), {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/details-components/file-products-detail/details-page"
        ]
    },
    ssr: true
});
const ThreeDesignProductDetails = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(()=>Promise.all(/* import() */[__webpack_require__.e(7567), __webpack_require__.e(9075), __webpack_require__.e(280), __webpack_require__.e(75), __webpack_require__.e(5419), __webpack_require__.e(1080), __webpack_require__.e(1708), __webpack_require__.e(2653), __webpack_require__.e(2789), __webpack_require__.e(5168), __webpack_require__.e(9245), __webpack_require__.e(5931), __webpack_require__.e(9706), __webpack_require__.e(9257), __webpack_require__.e(1395), __webpack_require__.e(5533), __webpack_require__.e(6218)]).then(__webpack_require__.bind(__webpack_require__, 6218)), {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/details-components/templates-details/details-page"
        ]
    },
    ssr: true
});
const VideosProductDetails = next_dynamic__WEBPACK_IMPORTED_MODULE_7___default()(()=>Promise.all(/* import() */[__webpack_require__.e(7567), __webpack_require__.e(9075), __webpack_require__.e(280), __webpack_require__.e(75), __webpack_require__.e(5419), __webpack_require__.e(1080), __webpack_require__.e(1708), __webpack_require__.e(2653), __webpack_require__.e(2789), __webpack_require__.e(9245), __webpack_require__.e(9706), __webpack_require__.e(1469)]).then(__webpack_require__.bind(__webpack_require__, 1469)), {
    loadableGenerated: {
        modules: [
            "product/[pid].jsx -> " + "~/components/details-components/video-tutorials/details-page"
        ]
    },
    ssr: true
});
const steps = [
    {
        target: ".product-short-view",
        content: "Bu yerda mahsulotning bir qismi joylashgan.",
        disableBeacon: false
    },
    {
        target: ".product-price-section",
        content: "Bu yerda narxi va sotib olish tugmasi bor. Bosib sotib olasiz."
    }, 
];
const joyrideLocales = {
    back: "Oldingisi",
    last: "Tushundim",
    close: "Yopish",
    next: "Keyingisi",
    open: "Ochish",
    skip: "Bilaman"
};
const productsContentDetails = (contentType)=>{
    switch(contentType){
        case "file":
            return FileProductDetatails;
        case "3d":
        case "template":
        case "website":
        case "design":
            return ThreeDesignProductDetails;
        case "video":
            return VideosProductDetails;
        default:
            return ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    children: "Mahsulot topilmadi"
                });
    }
};
function ProductDefaultPage({ defaultProducts  }) {
    const { 0: isPlay , 1: setIsPlay  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: showJoyride , 1: setShowJoyride  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const similarRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const lastProductsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    // Memoize expensive computations
    const contentType = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>defaultProducts?.document?.content_type, [
        defaultProducts?.document?.content_type
    ]);
    const DetailComponent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>productsContentDetails(contentType), [
        contentType
    ]);
    const shouldShowAISoffia = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>contentType === "file", [
        contentType
    ]);
    // Check if Joyride should run (only on first visit)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return;
    }, []);
    // Memoize Meta props to prevent unnecessary re-renders
    const metaProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const removeHTMLTags = (html)=>html.replace(/<[^>]+>/g, "");
        const title = defaultProducts?.title || "Soff.uz - Intellektual mulk marketi";
        const description = defaultProducts?.description ? removeHTMLTags(defaultProducts.description) : `${defaultProducts?.title || ""} + ${defaultProducts?.tag?.map((e)=>e?.name)?.join(", ") || "soff.uz - Intellektual mulk marketi"}`;
        const keywords = [
            {
                name: defaultProducts?.title
            },
            {
                name: defaultProducts?.slug
            },
            ...defaultProducts?.tag || [],
            {
                name: defaultProducts?.seller?.first_name
            },
            {
                name: defaultProducts?.seller?.last_name
            }, 
        ].filter((kw)=>kw.name); // Remove undefined/null keywords
        return {
            title,
            description,
            keywords,
            image: defaultProducts?.poster_url || "https://soff.uz/static/img/soff/logo-dark.png",
            type: "product",
            url: "https://soff.uz",
            author: defaultProducts?.seller ? `${defaultProducts.seller.first_name} ${defaultProducts.seller.last_name}` : "Soff.uz"
        };
    }, [
        defaultProducts
    ]);
    // Memoize container class name
    const containerClassName = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>`ps-page--product ${defaultProducts?.price === 0 ? "" : "pt-2"}`, [
        defaultProducts?.price
    ]);
    const handleJoyrideCallback = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((data)=>{
        if (data.status === "finished" || data.status === "skipped") {
            localStorage.setItem("product-tour-completed", "true");
            setShowJoyride(false);
        }
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                ...metaProps
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProductVideoBanner, {
                        videoUrl: video_url
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "container mb-5",
                        style: {
                            position: "relative"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: containerClassName,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "ps-container p-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "ps-page__container",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailComponent, {
                                            product: defaultProducts,
                                            isPlay: isPlay,
                                            setIsPlay: setIsPlay
                                        })
                                    }),
                                    shouldShowAISoffia && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AISoffiaPresentation, {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        ref: similarRef,
                                        className: "my-5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                style: {
                                                    fontSize: "25px",
                                                    fontWeight: 400
                                                },
                                                className: "py-4 similar_title",
                                                children: "O'xshash mahsulotlar"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SimilarProducts, {})
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        ref: lastProductsRef,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                style: {
                                                    fontSize: "25px",
                                                    fontWeight: 400
                                                },
                                                className: "py-4 similar_title",
                                                children: "So'ngi yuklangan mahsulotlar"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LastAddedProducts, {
                                                contentType: contentType
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    showJoyride && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Joyride, {
                        steps: steps,
                        run: showJoyride,
                        continuous: true,
                        showProgress: false,
                        callback: handleJoyrideCallback,
                        styles: {
                            options: {
                                arrowColor: "#e3ffeb",
                                primaryColor: "#00A44F",
                                textColor: "#004a14",
                                width: 300,
                                zIndex: 100
                            }
                        },
                        locale: joyrideLocales
                    })
                ]
            })
        ]
    });
}
async function getServerSideProps$1({ query , req , res  }) {
    const { pid  } = query;
    // Early return if pid is missing
    if (!pid) {
        return {
            notFound: true
        };
    }
    const cookies = cookie__WEBPACK_IMPORTED_MODULE_4__.parse(req.headers.cookie || "");
    const token = cookies.token;
    const deviceId = (0,_shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_6__/* .getOrCreateDeviceId */ .n)({
        req,
        res
    });
    // Prepare headers once
    const headers = {
        "X-Device-ID": deviceId,
        ...token && {
            Authorization: `Bearer ${token}`
        }
    };
    let defaultProducts = null;
    try {
        const request = await fetch(`${_repositories_Repository__WEBPACK_IMPORTED_MODULE_3__/* .baseUrl */ .FH}customer/documents/${pid}/`, {
            headers
        });
        // Handle specific status codes
        if (request.status === 404) {
            return {
                notFound: true
            };
        }
        if (request.status === 403 || request.status === 401) {
            // Retry without auth token
            const retryHeaders = {
                "X-Device-ID": deviceId
            };
            const retryRequest = await fetch(`${_repositories_Repository__WEBPACK_IMPORTED_MODULE_3__/* .baseUrl */ .FH}customer/documents/${pid}/`, {
                headers: retryHeaders
            });
            if (!retryRequest.ok) {
                return {
                    notFound: true
                };
            }
            defaultProducts = await retryRequest.json();
        } else {
            if (!request.ok) {
                return {
                    notFound: true
                };
            }
            defaultProducts = await request.json();
        }
    } catch (error) {
        // Final fallback - try without auth
        try {
            const fallbackRequest = await fetch(`${_repositories_Repository__WEBPACK_IMPORTED_MODULE_3__/* .baseUrl */ .FH}customer/documents/${pid}/`, {
                headers: {
                    "X-Device-ID": deviceId
                }
            });
            if (!fallbackRequest.ok) {
                return {
                    notFound: true
                };
            }
            defaultProducts = await fallbackRequest.json();
        } catch (fallbackError) {
            console.error("Error fetching product:", fallbackError);
            return {
                notFound: true
            };
        }
    }
    // Validate that we have product data
    if (!defaultProducts) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            defaultProducts
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ProductDefaultPage,
    getServerSideProps: getServerSideProps$1
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */


const userPageModule = serverComponentModule ;

const pageComponent = userPageModule ? userPageModule.default : undefined;

const origGetInitialProps = pageComponent ? pageComponent.getInitialProps : undefined;
const origGetStaticProps = userPageModule ? userPageModule.getStaticProps : undefined;
const origGetServerSideProps = userPageModule ? userPageModule.getServerSideProps : undefined;

// Rollup will aggressively tree-shake what it perceives to be unused properties
// on objects. Because the key that's used to index into this object (/product/[pid])
// is replaced during bundling, Rollup can't see that these properties are in fact
// used. Using `Object.freeze` signals to Rollup that it should not tree-shake
// this object.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = Object.freeze({
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapErrorGetInitialPropsWithSentry,
});

const getInitialPropsWrapper = getInitialPropsWrappers['/product/[pid]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/product/[pid]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/product/[pid]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_8__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1401:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ getOrCreateDeviceId)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6555);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_0__]);
uuid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getOrCreateDeviceId({ req , res  } = {}) {
    try {
        const cookies = cookie__WEBPACK_IMPORTED_MODULE_1__.parse(req.headers.cookie || "");
        let deviceId = cookies.device_id;
        if (!deviceId) {
            deviceId = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
            res.setHeader("Set-Cookie", cookie__WEBPACK_IMPORTED_MODULE_1__.serialize("device_id", deviceId, {
                path: "/",
                maxAge: 365 * 24 * 60 * 60
            }));
        }
        return deviceId;
    } catch (error) {
        console.error("Error getting or creating device ID:", error);
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8454:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PageLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4747);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_PageLayout__WEBPACK_IMPORTED_MODULE_2__]);
_PageLayout__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const PageContainer = ({ children , title , withFooter  } = {})=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_PageLayout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        title: title,
        withFooter: withFooter,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageContainer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7066:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ 6946:
/***/ ((module) => {

module.exports = require("@ant-design/icons/ShareAltOutlined");

/***/ }),

/***/ 6999:
/***/ ((module) => {

module.exports = require("@react-oauth/google");

/***/ }),

/***/ 8097:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 5725:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 1635:
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ 7424:
/***/ ((module) => {

module.exports = require("dayjs/plugin/localizedFormat");

/***/ }),

/***/ 4195:
/***/ ((module) => {

module.exports = require("dayjs/plugin/relativeTime");

/***/ }),

/***/ 6734:
/***/ ((module) => {

module.exports = require("js-cookie");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 8176:
/***/ ((module) => {

module.exports = require("react-spinners");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3258:
/***/ ((module) => {

module.exports = import("@reduxjs/toolkit");;

/***/ }),

/***/ 9943:
/***/ ((module) => {

module.exports = import("@reduxjs/toolkit/query/react");;

/***/ }),

/***/ 9752:
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 2880:
/***/ ((module) => {

module.exports = import("jwt-decode");;

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = import("react-icons/io5");;

/***/ }),

/***/ 2184:
/***/ ((module) => {

module.exports = import("swiper/modules");;

/***/ }),

/***/ 3015:
/***/ ((module) => {

module.exports = import("swiper/react");;

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 5717:
/***/ ((module) => {

module.exports = import("yet-another-react-lightbox");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,6017,8550,4747,1218], () => (__webpack_exec__(3144)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[pid].js.map