;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="51ae7af6-f29e-4f20-a41f-174097585bd1",e._sentryDebugIdIdentifier="sentry-dbid-51ae7af6-f29e-4f20-a41f-174097585bd1");})();}catch(e){}};
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 3420:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3797);
/* harmony import */ var next_progress__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_progress__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_providers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4811);
/* harmony import */ var _entities_affiliate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7392);
/* harmony import */ var _shared_hooks_useTelegram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4830);
/* harmony import */ var _shared_components_telegram_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7434);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7567);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(756);
/* harmony import */ var dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3984);
/* harmony import */ var dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_app_providers__WEBPACK_IMPORTED_MODULE_4__, _entities_affiliate__WEBPACK_IMPORTED_MODULE_5__, _shared_components_telegram_link__WEBPACK_IMPORTED_MODULE_7__]);
([_app_providers__WEBPACK_IMPORTED_MODULE_4__, _entities_affiliate__WEBPACK_IMPORTED_MODULE_5__, _shared_components_telegram_link__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















dayjs__WEBPACK_IMPORTED_MODULE_9___default().locale("uz-latn");
dayjs__WEBPACK_IMPORTED_MODULE_9___default().extend((dayjs_plugin_duration__WEBPACK_IMPORTED_MODULE_10___default()));
function App({ Component , pageProps  }) {
    const { tg  } = (0,_shared_hooks_useTelegram__WEBPACK_IMPORTED_MODULE_6__/* .useTelegram */ .f)();
    const { startTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_8__/* .useTimeManager */ .h)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        tg?.ready();
    }, [
        tg
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source");
        const utmMedium = params.get("utm_medium");
        const utmCampaign = params.get("utm_campaign");
        if (utmSource) localStorage.setItem("utm_source", utmSource);
        if (utmMedium) localStorage.setItem("utm_medium", utmMedium);
        if (utmCampaign) localStorage.setItem("utm_campaign", utmCampaign);
        startTimeout(()=>{
            document?.getElementById("__next")?.classList?.add("loaded");
        }, 10);
        const handleKeyDown = (e)=>{
            if (e.ctrlKey && e.shiftKey && e.key === "I" || // Prevent Ctrl+Shift+I (Windows)
            e.metaKey && e.altKey && e.key === "I" || // Prevent Command+Option+I (macOS)
            e.ctrlKey && e.shiftKey && e.key === "J" || // Prevent Ctrl+Shift+J (Windows)
            e.metaKey && e.altKey && e.key === "J" || // Prevent Command+Option+J (macOS)
            e.ctrlKey && e.key === "U" || // Prevent Ctrl+U (Windows)
            e.metaKey && e.key === "U" || // Prevent Command+U (macOS)
            e.ctrlKey && e.key === "S" || // Prevent Ctrl+S (Windows)
            e.metaKey && e.key === "S" || // Prevent Command+S (macOS)
            e.key === "F12") {
                e.preventDefault();
            }
        };
        console.log(`
        ███████╗ ██████╗ ███████╗███████╗
        ██╔════╝██╔═══██╗██╔════╝██╔════╝
        ███████╗██║   ██║█████╗  █████╗  
        ╚════██║██║   ██║██╔══╝  ██╔══╝  
        ███████║╚██████╔╝██║     ██║     
        ╚══════╝ ╚═════╝ ╚═╝     ╚═╝     
        `);
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", (e)=>e.preventDefault());
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", (e)=>e.preventDefault());
            localStorage.removeItem("utm_source");
            localStorage.removeItem("utm_medium");
            localStorage.removeItem("utm_campaign");
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        charSet: "UTF-8"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("title", {
                        children: "Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        httpEquiv: "X-UA-Compatible",
                        content: "IE=edge"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "format-detection",
                        content: "telephone=no"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "google-adsense-account",
                        content: "ca-pub-2651864926558603"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "alternate",
                        href: "https://soff.uz/",
                        hrefLang: "uz"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
                        defer: true,
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                name: "Soff.uz",
                                url: "https://soff.uz",
                                logo: "https://soff.uz/static/img/soff/logo-dark.png",
                                sameAs: [
                                    "https://t.me/soff_uz",
                                    "https://www.youtube.com/@soffuz",
                                    "https://www.facebook.com/people/Soffuz/61579052952962/", 
                                ],
                                potentialAction: {
                                    "@type": "SearchAction",
                                    target: "https://soff.uz/search-page?keyword={search_term_string}",
                                    "query-input": "required name=search_term_string"
                                }
                            })
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_progress__WEBPACK_IMPORTED_MODULE_3___default()), {
                height: "4px",
                delay: 300,
                options: {
                    showSpinner: false
                },
                color: "#00A44F"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_app_providers__WEBPACK_IMPORTED_MODULE_4__/* .Providers */ .C, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_entities_affiliate__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {
                        ...pageProps
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared_components_telegram_link__WEBPACK_IMPORTED_MODULE_7__/* .TelegramLink */ .$, {})
                ]
            })
        ]
    });
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: App
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
// on objects. Because the key that's used to index into this object (/_app)
// is replaced during bundling, Rollup can't see that these properties are in fact
// used. Using `Object.freeze` signals to Rollup that it should not tree-shake
// this object.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = Object.freeze({
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapErrorGetInitialPropsWithSentry,
});

const getInitialPropsWrapper = getInitialPropsWrappers['/_app'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/_app')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/_app')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_12__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3793:
/***/ ((module) => {

// Exports
module.exports = {
	"telegramWrapper": "style_telegramWrapper__0rS0y",
	"pulse": "style_pulse__pRARW",
	"telegramBtn": "style_telegramBtn__fYlvY",
	"customFloatButton": "style_customFloatButton___lK_y",
	"iconCircle": "style_iconCircle__niI7_",
	"buttonText": "style_buttonText__bSUGo",
	"floatButtonGroup": "style_floatButtonGroup__pQWKM",
	"customButtonsContainer": "style_customButtonsContainer__eQnzy",
	"closing": "style_closing__6M0Px"
};


/***/ }),

/***/ 2101:
/***/ ((module) => {

// Exports
module.exports = {
	"overlay": "VideoModal_overlay__6fKRw",
	"fadeIn": "VideoModal_fadeIn__86ehH",
	"modalContent": "VideoModal_modalContent__Eq2Uv",
	"zoomIn": "VideoModal_zoomIn__cO4gh",
	"closeButton": "VideoModal_closeButton__K72xL",
	"closeIcon": "VideoModal_closeIcon__nQuQe",
	"videoWrapper": "VideoModal_videoWrapper__VTMUx",
	"iframe": "VideoModal_iframe__l5fgV"
};


/***/ }),

/***/ 8841:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);



const AntdProvider = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, {
        theme: {
            token: {
                colorPrimary: "#00a44f",
                borderRadius: 8
            }
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AntdProvider);


/***/ }),

/***/ 4811:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ Providers)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7506);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9752);
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6999);
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_react_oauth_google__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AntdProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8841);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__]);
([_store__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const retryFunc = (failureCount, error)=>{
    if (error?.status && error?.status < 499) {
        return false;
    }
    if (failureCount > 1) return false;
    return true;
};
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retryDelay: 1000,
            retry: retryFunc,
            refetchOnWindowFocus: false,
            refetchOnMount: true
        }
    }
});
const Providers = ({ children  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_1__.Provider, {
        store: _store__WEBPACK_IMPORTED_MODULE_2__/* .store */ .h,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClientProvider, {
            client: queryClient,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_react_oauth_google__WEBPACK_IMPORTED_MODULE_4__.GoogleOAuthProvider, {
                clientId: "203103939049-2ste634q2uc1io9oaup8gt35tsmucru0.apps.googleusercontent.com",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_AntdProvider__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    children: children
                })
            })
        })
    });

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7392:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_affiliate_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6818);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_affiliate_slice__WEBPACK_IMPORTED_MODULE_3__]);
_store_affiliate_slice__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const AffiliateListener = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (router.isReady) {
            const affiliateId = router.query.affiliate;
            if (affiliateId) {
                dispatch((0,_store_affiliate_slice__WEBPACK_IMPORTED_MODULE_3__/* .setAffiliateId */ .G)(affiliateId));
            }
        }
    }, [
        router.isReady,
        router.query.affiliate,
        dispatch
    ]);
    return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AffiliateListener);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7434:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ TelegramLink)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3793);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1834);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _widgets_home_youtube_vid_VideoModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1172);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6905);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_home_youtube_vid_VideoModal__WEBPACK_IMPORTED_MODULE_7__, react_icons_md__WEBPACK_IMPORTED_MODULE_8__]);
([_widgets_home_youtube_vid_VideoModal__WEBPACK_IMPORTED_MODULE_7__, react_icons_md__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const disabledLocations = [
    "/chat",
    "/order/",
    "/auth",
    "shopping-cart",
    "search-page", 
];
// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (urlOrId)=>{
    if (!urlOrId) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/.*[?&]v=([^&\n?#]+)/, 
    ];
    for (const pattern of patterns){
        const match = urlOrId.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};
const VIDEO_URL = "https://www.youtube.com/watch?v=oJre9mbRE2U";
function TelegramLink({ videoUrl  }) {
    const { isMobile , isTablet  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const location = router.pathname;
    const asPath = router.asPath;
    const { 0: isVideoModalOpen , 1: setIsVideoModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const { 0: isGroupOpen , 1: setIsGroupOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    // Check both pathname (for route pattern) and asPath (for actual URL)
    const isProductPage = location.includes("/product/") || asPath.includes("/product/");
    // Use provided videoUrl or default constant
    const finalVideoUrl = videoUrl || VIDEO_URL;
    // Extract video ID from URL
    const extractedVideoId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(()=>getYouTubeVideoId(finalVideoUrl), [
        finalVideoUrl
    ]);
    const handleVideoClick = ()=>{
        if (extractedVideoId) {
            setIsVideoModalOpen(true);
        }
    };
    const handleCloseVideoModal = ()=>{
        setIsVideoModalOpen(false);
    };
    // Click outside handler for closing the group
    const groupRef = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (isGroupOpen && groupRef.current && !groupRef.current.contains(event.target)) {
                setIsGroupOpen(false);
            }
        };
        if (isGroupOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [
        isGroupOpen
    ]);
    if (disabledLocations.some((path)=>location === path || location.includes(path))) {
        return null;
    }
    // Use FloatButton.Group for product pages with speed dial
    if (isProductPage && isMobile) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    ref: groupRef,
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().floatButtonGroup),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.FloatButton, {
                            type: "primary",
                            icon: isGroupOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.CloseOutlined, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.QuestionCircleOutlined, {}),
                            onClick: ()=>setIsGroupOpen(!isGroupOpen),
                            style: {
                                right: 16,
                                bottom: 90
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().customButtonsContainer)} ${!isGroupOpen ? (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().closing) : ""}`,
                            style: {
                                pointerEvents: isGroupOpen ? "auto" : "none"
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().customFloatButton),
                                    onClick: ()=>{
                                        handleVideoClick();
                                        setIsGroupOpen(false);
                                    },
                                    role: "button",
                                    tabIndex: 0,
                                    onKeyPress: (e)=>{
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleVideoClick();
                                            setIsGroupOpen(false);
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().iconCircle),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_8__.MdOndemandVideo, {})
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().buttonText),
                                            children: "Qanday xarid qilaman?"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                    href: "https://t.me/+y5GpvEz48_hkMzli",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().customFloatButton),
                                    onClick: ()=>setIsGroupOpen(false),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().iconCircle),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-regular fa-paper-plane",
                                                style: {
                                                    fontSize: "16px"
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().buttonText),
                                            children: "Telegram"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_widgets_home_youtube_vid_VideoModal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    isOpen: isVideoModalOpen,
                    onClose: handleCloseVideoModal,
                    videoId: extractedVideoId || undefined
                })
            ]
        });
    }
    // Default single button for non-product pages or desktop
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().telegramWrapper),
        style: {
            bottom: isTablet ? "60px" : isMobile ? "70px" : "20px"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
            href: "https://t.me/+y5GpvEz48_hkMzli",
            passHref: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Telegram kanalimizga qo'shilish",
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_9___default().telegramBtn),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                    className: "fa-regular fa-paper-plane",
                    "aria-hidden": "true"
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ useTelegram)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTelegram() {
    const { 0: telegramData , 1: setTelegramData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        tg: null,
        queryId: null,
        tgId: null
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Only run on client side
        if (false) {}
    }, []);
    return telegramData;
}


/***/ }),

/***/ 6818:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ setAffiliateId),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__]);
_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const initialState = {
    affiliateId: null
};
const affiliateSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "affiliate",
    initialState,
    reducers: {
        setAffiliateId: (state, action)=>{
            state.affiliateId = action.payload;
        }
    }
});
const { setAffiliateId  } = affiliateSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (affiliateSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3006:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "xZ": () => (/* binding */ setShowSearch)
/* harmony export */ });
/* unused harmony export setShowFastDownload */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__]);
_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const uiSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "ui",
    initialState: {
        showFastDownload: true,
        showSearch: true
    },
    reducers: {
        setShowFastDownload (state, action) {
            state.showFastDownload = action.payload;
        },
        setShowSearch (state, action) {
            state.showSearch = action.payload;
        }
    }
});
const { setShowFastDownload , setShowSearch  } = uiSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7506:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
/* harmony import */ var _auth_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6017);
/* harmony import */ var _ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6146);
/* harmony import */ var _affiliate_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6818);
/* harmony import */ var _seller_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8417);
/* harmony import */ var _profile_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7623);
/* harmony import */ var _search_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1554);
/* harmony import */ var _fast_dowload_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3006);
/* harmony import */ var _api_apiSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5297);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _auth_slice__WEBPACK_IMPORTED_MODULE_1__, _ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__, _affiliate_slice__WEBPACK_IMPORTED_MODULE_3__, _seller_slice__WEBPACK_IMPORTED_MODULE_4__, _profile_slice__WEBPACK_IMPORTED_MODULE_5__, _search_slice__WEBPACK_IMPORTED_MODULE_6__, _fast_dowload_slice__WEBPACK_IMPORTED_MODULE_7__, _api_apiSlice__WEBPACK_IMPORTED_MODULE_8__]);
([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__, _auth_slice__WEBPACK_IMPORTED_MODULE_1__, _ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__, _affiliate_slice__WEBPACK_IMPORTED_MODULE_3__, _seller_slice__WEBPACK_IMPORTED_MODULE_4__, _profile_slice__WEBPACK_IMPORTED_MODULE_5__, _search_slice__WEBPACK_IMPORTED_MODULE_6__, _fast_dowload_slice__WEBPACK_IMPORTED_MODULE_7__, _api_apiSlice__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({
    reducer: {
        auth: _auth_slice__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP,
        ecomerce: _ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP,
        affiliate: _affiliate_slice__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
        user: _seller_slice__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP,
        search: _search_slice__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .ZP,
        profile: _profile_slice__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP,
        ui: _fast_dowload_slice__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .ZP,
        [_api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiSoffSlice.reducerPath */ .b.reducerPath]: _api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiSoffSlice.reducer */ .b.reducer,
        [_api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiFreelanceSlice.reducerPath */ .L.reducerPath]: _api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiFreelanceSlice.reducer */ .L.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(_api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiSoffSlice.middleware */ .b.middleware).concat(_api_apiSlice__WEBPACK_IMPORTED_MODULE_8__/* .apiFreelanceSlice.middleware */ .L.middleware)
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1554:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports initSearchHistory, setSearchHistory, setSearchHistoryItem, deleteSearchHistoryItem, clearSearchHistory */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__]);
_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const initialState = {
    searchHistory: [],
    status: "loading"
};
const initSearchHistory = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("search/initSearchHistory", async ()=>{
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    return searchHistory;
});
const searchSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "search",
    initialState,
    reducers: {
        setSearchHistory (state, action) {
            state.searchHistory = action.payload;
            localStorage.setItem("searchHistory", JSON.stringify(action.payload));
        },
        setSearchHistoryItem (state, action) {
            const existingIndex = state.searchHistory.findIndex((item)=>item.value === action.payload.value);
            if (existingIndex === -1) {
                state.searchHistory.unshift(action.payload);
                localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
            }
        },
        deleteSearchHistoryItem (state, action) {
            state.searchHistory = state.searchHistory.filter((item)=>item.value !== action.payload.value);
            localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
        },
        clearSearchHistory (state) {
            state.searchHistory = [];
            localStorage.removeItem("searchHistory");
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(initSearchHistory.pending, (state)=>{
            state.status = "loading";
        }).addCase(initSearchHistory.fulfilled, (state, action)=>{
            state.status = "idle";
            state.searchHistory = action.payload;
        }).addCase(initSearchHistory.rejected, (state)=>{
            state.status = "failed";
        });
    }
});
const { setSearchHistory , setSearchHistoryItem , deleteSearchHistoryItem , clearSearchHistory ,  } = searchSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (searchSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "de": () => (/* binding */ setActiveIndex)
/* harmony export */ });
/* unused harmony export setUnreadMessages */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__]);
_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const initialState = {
    activeIndex: "about_author",
    unreadMessages: 0
};
const sellerDetailsSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "userDetails",
    initialState,
    reducers: {
        setActiveIndex (state, action) {
            state.activeIndex = action.payload;
        },
        setUnreadMessages (state, action) {
            state.unreadMessages = action.payload;
        }
    }
});
const { setActiveIndex , setUnreadMessages  } = sellerDetailsSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sellerDetailsSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1172:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
/* harmony import */ var _VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2101);
/* harmony import */ var _VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_io5__WEBPACK_IMPORTED_MODULE_3__]);
react_icons_io5__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function VideoModal({ isOpen , onClose , videoId  }) {
    const modalRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        //close modal on escape key press
        const handleKeyDown = (e)=>{
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [
        isOpen,
        videoId
    ]);
    if (!isOpen) return null;
    const modalContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().overlay),
        onClick: onClose,
        ref: modalRef,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().modalContent),
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: onClose,
                    className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().closeButton),
                    "aria-label": "Close video",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_3__.IoClose, {
                        className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().closeIcon)
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().videoWrapper),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("iframe", {
                        width: "100%",
                        height: "100%",
                        src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
                        title: "YouTube video player",
                        frameBorder: "0",
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        className: (_VideoModal_module_scss__WEBPACK_IMPORTED_MODULE_4___default().iframe)
                    })
                })
            ]
        })
    });
    // Use portal to render modal at document root level
    return typeof document !== "undefined" ? /*#__PURE__*/ (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(modalContent, document.body) : null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7066:
/***/ ((module) => {

"use strict";
module.exports = require("@ant-design/icons");

/***/ }),

/***/ 6999:
/***/ ((module) => {

"use strict";
module.exports = require("@react-oauth/google");

/***/ }),

/***/ 8097:
/***/ ((module) => {

"use strict";
module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 5725:
/***/ ((module) => {

"use strict";
module.exports = require("antd");

/***/ }),

/***/ 1635:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs");

/***/ }),

/***/ 3984:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/locale/uz-latn");

/***/ }),

/***/ 756:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/plugin/duration");

/***/ }),

/***/ 6734:
/***/ ((module) => {

"use strict";
module.exports = require("js-cookie");

/***/ }),

/***/ 3797:
/***/ ((module) => {

"use strict";
module.exports = require("next-progress");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3258:
/***/ ((module) => {

"use strict";
module.exports = import("@reduxjs/toolkit");;

/***/ }),

/***/ 9943:
/***/ ((module) => {

"use strict";
module.exports = import("@reduxjs/toolkit/query/react");;

/***/ }),

/***/ 9752:
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 2880:
/***/ ((module) => {

"use strict";
module.exports = import("jwt-decode");;

/***/ }),

/***/ 1185:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/io5");;

/***/ }),

/***/ 6905:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/md");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,6017,8550,7567], () => (__webpack_exec__(3420)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=_app.js.map