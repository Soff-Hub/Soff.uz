(() => {
var exports = {};
exports.id = 2990;
exports.ids = [2990];
exports.modules = {

/***/ 3771:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_server_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5780);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_freelancers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1538);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6985);
/* harmony import */ var _shared_api_fetch_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1969);
/* harmony import */ var _widgets_layouts_PageLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2315);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_freelancers__WEBPACK_IMPORTED_MODULE_4__, _widgets_layouts_PageLayout__WEBPACK_IMPORTED_MODULE_6__]);
([_components_freelancers__WEBPACK_IMPORTED_MODULE_4__, _widgets_layouts_PageLayout__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const baseKeywords = [
    "frilanserslar",
    "frilanser xizmatlari",
    "onlayn ishchilar",
    "mustaqil ishchilar",
    "Soff.uz", 
];
const generateMetaTags = (query)=>{
    const { directionValue ="" , position ="" , keyword =""  } = query;
    const parts = [
        directionValue,
        position,
        keyword
    ].filter(Boolean).flat(Infinity);
    const titlePrefix = parts.length ? parts.join(" - ") : "Eng yaxshi frilanserlar va mutaxassislar";
    const title = `${titlePrefix} | Soff.uz`;
    const description = `Soff.uz platformasidagi eng yaxshi frilanserlar va mutaxassislarni kashf eting, loyihangiz uchun mukammal mutaxassislarni toping. ${directionValue ? `${directionValue} sohasidagi eng tajribali frilanserlarni Soff.uz platformasida toping va ularning xizmatlaridan foydalaning.` : ""} ${position ? `${position} bo'yicha malakali frilanserlarni ishga oling.` : ""} ${keyword ? `Qidiruvingiz: "${keyword}" bo'yicha natijalar.` : ""}`;
    const dynamicKeywords = parts.flatMap((part)=>[
            `${part} frilanserlar`,
            `${part} frilanser`,
            `${part} mutaxassisi`,
            `${part} xizmatlari`,
            `${part} ish`,
            `${part} topish`,
            `frilanser ${part}`, 
        ]);
    const keywords = [
        ...dynamicKeywords,
        ...baseKeywords
    ];
    return {
        title,
        description,
        author: "Soff.uz",
        image: "https://soff.uz/static/img/soff/logo-dark.png",
        type: "website",
        url: "https://soff.uz/freelancers",
        canonicalUrl: `https://soff.uz/freelancers${directionValue ? `/${directionValue}` : ""}${position ? `/${position}` : ""}${keyword ? `?keyword=${keyword}` : ""}`,
        keywords: keywords.map((name)=>({
                name
            }))
    };
};
function FreelancersPage({ data , metaTags  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_widgets_layouts_PageLayout__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                ...metaTags
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_freelancers__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                data: data
            })
        ]
    });
}
async function getServerSideProps$1(context) {
    const { query  } = context;
    const { keyword ="" , position ="" , direction ="" , sort_by ="average_rating" , limit =20 , offset =0 , order ="" ,  } = query;
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    });
    const metaTags = generateMetaTags(query);
    if (keyword) params.append("search", keyword);
    if (Array.isArray(position)) {
        position.forEach((p)=>params.append("position", p));
    } else if (position) {
        params.append("position", position);
    }
    if (Array.isArray(direction)) {
        direction.forEach((d)=>params.append("direction", d));
    } else if (direction) {
        params.append("direction", direction);
    }
    if (sort_by && (sort_by !== "average_rating" || order === "asc")) params.append("sort_by", sort_by);
    if (order) params.append("order", order);
    const url = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/users/freelancers/list/?${params.toString()}`;
    try {
        const data = await (0,_shared_api_fetch_json__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(url);
        return {
            props: {
                data,
                metaTags
            }
        };
    } catch (error) {
        console.error("❌ SSR fetch error:", error);
        return {
            props: {
                data: [],
                metaTags
            }
        };
    }
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getServerSideProps: getServerSideProps$1,
    'default': FreelancersPage
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = {
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapErrorGetInitialPropsWithSentry,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/freelancers'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/freelancers')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/freelancers')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9824:
/***/ ((module) => {

// Exports
module.exports = {
	"horizontalCard": "freelancerHorizontalCard_horizontalCard__43_El",
	"cardHeader": "freelancerHorizontalCard_cardHeader__p0m_J",
	"profileSection": "freelancerHorizontalCard_profileSection__xeXG7",
	"badge": "freelancerHorizontalCard_badge__Tz4pz",
	"avatar": "freelancerHorizontalCard_avatar__8LDiY",
	"profileInfo": "freelancerHorizontalCard_profileInfo__YIKdV",
	"nameRow": "freelancerHorizontalCard_nameRow__M8NwZ",
	"name": "freelancerHorizontalCard_name__IM7cz",
	"verifiedBadge": "freelancerHorizontalCard_verifiedBadge__HVRku",
	"ratingBox": "freelancerHorizontalCard_ratingBox__0UKvL",
	"star": "freelancerHorizontalCard_star__5xQmc",
	"ratingValue": "freelancerHorizontalCard_ratingValue__fuurJ",
	"reviewCount": "freelancerHorizontalCard_reviewCount__XjFoy",
	"position": "freelancerHorizontalCard_position__6bsQe",
	"statsRow": "freelancerHorizontalCard_statsRow__nuvzO",
	"statDivider": "freelancerHorizontalCard_statDivider__Bsd_p",
	"statCard": "freelancerHorizontalCard_statCard__S1HPB",
	"statCardIcon": "freelancerHorizontalCard_statCardIcon__bDpFs",
	"statCardIconSuccess": "freelancerHorizontalCard_statCardIconSuccess__oTcOW",
	"statCardIconSuccessRate": "freelancerHorizontalCard_statCardIconSuccessRate__9vqP4",
	"statCardContent": "freelancerHorizontalCard_statCardContent__EflfT",
	"statIcon": "freelancerHorizontalCard_statIcon__mlsP2",
	"statIconSuccess": "freelancerHorizontalCard_statIconSuccess__TfqU0",
	"statIconSuccessRate": "freelancerHorizontalCard_statIconSuccessRate__cYxVZ",
	"statValue": "freelancerHorizontalCard_statValue__EPWCE",
	"statValueSuccess": "freelancerHorizontalCard_statValueSuccess__FjB6g",
	"statValueSuccessRate": "freelancerHorizontalCard_statValueSuccessRate__GVROP",
	"statLabel": "freelancerHorizontalCard_statLabel__AzfPF",
	"metaRow": "freelancerHorizontalCard_metaRow__wT4zT",
	"metaItem": "freelancerHorizontalCard_metaItem__jXOq1",
	"metaStar": "freelancerHorizontalCard_metaStar__CzKXy",
	"metaIcon": "freelancerHorizontalCard_metaIcon__HoLl4",
	"actions": "freelancerHorizontalCard_actions__Naxp0",
	"messageBtn": "freelancerHorizontalCard_messageBtn__2_7jA",
	"detailsBtn": "freelancerHorizontalCard_detailsBtn__rY_vx",
	"servicesSection": "freelancerHorizontalCard_servicesSection___7_l7",
	"servicesHeader": "freelancerHorizontalCard_servicesHeader__sFugf",
	"servicesTitle": "freelancerHorizontalCard_servicesTitle__w8CK_",
	"servicesNavigation": "freelancerHorizontalCard_servicesNavigation__im7f8",
	"navButton": "freelancerHorizontalCard_navButton__85eTK",
	"navButtonDisabled": "freelancerHorizontalCard_navButtonDisabled__8SbVu",
	"servicesSwiperWrapper": "freelancerHorizontalCard_servicesSwiperWrapper__JNYcR",
	"card": "freelancerHorizontalCard_card__LLZXj",
	"btn": "freelancerHorizontalCard_btn__aDd7j",
	"title": "freelancerHorizontalCard_title__nUETx",
	"servicesSwiper": "freelancerHorizontalCard_servicesSwiper__4rass",
	"categorySwiperBeginning": "freelancerHorizontalCard_categorySwiperBeginning__ODdpH",
	"categorySwiperEnding": "freelancerHorizontalCard_categorySwiperEnding__79cnI",
	"serviceSlide": "freelancerHorizontalCard_serviceSlide__LgMES",
	"serviceCardWrapper": "freelancerHorizontalCard_serviceCardWrapper__gP4P_",
	"servicesLoading": "freelancerHorizontalCard_servicesLoading__rB_HT"
};


/***/ }),

/***/ 5181:
/***/ ((module) => {

// Exports
module.exports = {
	"freelancers": "freelancers_freelancers__68aw1",
	"freelancersWrapper": "freelancers_freelancersWrapper__Ap6JN",
	"headline": "freelancers_headline__gvC_j",
	"heroParagraph": "freelancers_heroParagraph__G_B6R",
	"freelancersFilter": "freelancers_freelancersFilter__vnEV4",
	"freelancersFilterResult": "freelancers_freelancersFilterResult__DzrYw",
	"freelancersFilterResultContent": "freelancers_freelancersFilterResultContent__B9TUY",
	"freelancersFilterResultCollapsedContent": "freelancers_freelancersFilterResultCollapsedContent__GK_nv"
};


/***/ }),

/***/ 4577:
/***/ ((module) => {

// Exports
module.exports = {
	"headerWrapper": "freelancersFilterHeader_headerWrapper__MGzbJ",
	"controls": "freelancersFilterHeader_controls__aNPVw",
	"viewToggle": "freelancersFilterHeader_viewToggle__GmIyz"
};


/***/ }),

/***/ 2945:
/***/ ((module) => {

// Exports
module.exports = {
	"radioMenu": "freelancersFilterMenu_radioMenu__eAIMj",
	"visible": "freelancersFilterMenu_visible__nyK5O",
	"filterGroup": "freelancersFilterMenu_filterGroup__UvktJ"
};


/***/ }),

/***/ 4236:
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
/* harmony import */ var _styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5181);
/* harmony import */ var _styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elements_FreelancersFilterHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5749);
/* harmony import */ var _elements_FreelancersFilterMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7765);
/* harmony import */ var _elements_FreelancersFilterDrawer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6554);
/* harmony import */ var _elements_FreelancersFilterResult__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5916);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6603);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_elements_FreelancersFilterHeader__WEBPACK_IMPORTED_MODULE_3__, _elements_FreelancersFilterMenu__WEBPACK_IMPORTED_MODULE_4__, _elements_FreelancersFilterDrawer__WEBPACK_IMPORTED_MODULE_5__, _elements_FreelancersFilterResult__WEBPACK_IMPORTED_MODULE_6__]);
([_elements_FreelancersFilterHeader__WEBPACK_IMPORTED_MODULE_3__, _elements_FreelancersFilterMenu__WEBPACK_IMPORTED_MODULE_4__, _elements_FreelancersFilterDrawer__WEBPACK_IMPORTED_MODULE_5__, _elements_FreelancersFilterResult__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const FreelancerSearchInput = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(null, {
    loadableGenerated: {
        modules: [
            "../components/freelancers/Freelancers.jsx -> " + "./elements/FreelancerSearchInput"
        ]
    },
    ssr: false
});
function Freelancers({ data  }) {
    const { isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    const { 0: collapsed , 1: setCollapsed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: viewType , 1: setViewType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("horizontal");
    const toggleCollapsed = ()=>{
        setCollapsed(!collapsed);
    };
    const handleViewChange = (value)=>{
        setViewType(value);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        if (isDesktop) {
            setCollapsed(true);
        }
    }, [
        isDesktop
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().freelancers)} container`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().freelancersWrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().headline),
                        children: "Loyihangiz uchun eng yaxshi mutaxassislar"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().heroParagraph),
                        children: "O'z loyihangizni boshlash uchun tajribali va ishonchli frilanserlarni shu yerdan toping."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FreelancerSearchInput, {})
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().freelancersFilter),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_FreelancersFilterHeader__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        toggleCollapsed: toggleCollapsed,
                        collapsed: collapsed,
                        viewType: viewType,
                        onViewChange: handleViewChange
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_8___default().freelancersFilterResult),
                        children: [
                            isDesktop ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_FreelancersFilterMenu__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                collapsed: collapsed
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_FreelancersFilterDrawer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                collapsed: collapsed,
                                toggleCollapsed: toggleCollapsed
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_FreelancersFilterResult__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                collapsed: collapsed,
                                data: data,
                                viewType: viewType
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Freelancers);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2335:
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1301);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1185);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7840);
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2184);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6840);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(681);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7425);
/* harmony import */ var _styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9824);
/* harmony import */ var _styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6603);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7333);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6598);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_fa__WEBPACK_IMPORTED_MODULE_3__, react_icons_io5__WEBPACK_IMPORTED_MODULE_4__, swiper_react__WEBPACK_IMPORTED_MODULE_5__, swiper_modules__WEBPACK_IMPORTED_MODULE_6__, react_icons_io__WEBPACK_IMPORTED_MODULE_7__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__, react_icons_ai__WEBPACK_IMPORTED_MODULE_11__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_13__]);
([react_icons_fa__WEBPACK_IMPORTED_MODULE_3__, react_icons_io5__WEBPACK_IMPORTED_MODULE_4__, swiper_react__WEBPACK_IMPORTED_MODULE_5__, swiper_modules__WEBPACK_IMPORTED_MODULE_6__, react_icons_io__WEBPACK_IMPORTED_MODULE_7__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__, react_icons_ai__WEBPACK_IMPORTED_MODULE_11__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



















const formatLastActive = (lastActive)=>{
    if (!lastActive) return "Noma'lum";
    const last = new Date(lastActive);
    if (isNaN(last.getTime())) return lastActive;
    const now = new Date();
    const diffMinutes = Math.floor((now - last) / 1000 / 60);
    if (diffMinutes < 1) return "Hozir faol";
    if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} soat oldin`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} kun oldin`;
};
const FreelancerHorizontalCard = ({ seller , onCreateChat  })=>{
    const { isMobile , isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z)();
    const { startTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_14__/* .useTimeManager */ .h)();
    const { 0: isCustomServicesLoading , 1: setIsCustomServicesLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: swiperInstance , 1: setSwiperInstance  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: isBeginning , 1: setIsBeginning  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: isEnd , 1: setIsEnd  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const prevRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const nextRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isOnline = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>{
        if (!seller?.last_active) return false;
        const lastActiveTime = new Date(seller.last_active);
        const now = new Date();
        const diffMinutes = (now - lastActiveTime) / 1000 / 60;
        return diffMinutes <= 5;
    }, [
        seller?.last_active
    ]);
    const services = seller?.services || [];
    const statsList = [
        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCard),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardIcon),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statIcon),
                        children: "↻"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardContent),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statLabel),
                            children: "Jarayondagi ishlar"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statValue),
                            children: seller?.progress_jobs_count || 0
                        })
                    ]
                })
            ]
        }),
        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCard),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardIconSuccess),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statIconSuccess),
                        children: "✓"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardContent),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statLabel),
                            children: "Muvaffaqiyatli ishlar"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statValueSuccess),
                            children: seller?.completed_orders_count || 0
                        })
                    ]
                })
            ]
        }),
        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCard),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardIconSuccessRate),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_11__.AiOutlineRise, {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statIconSuccessRate)
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statCardContent),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statLabel),
                            children: "Muvaffaqiyat darajasi"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statValueSuccessRate),
                            children: [
                                seller?.success_rate || 0,
                                " %"
                            ]
                        })
                    ]
                })
            ]
        }), 
    ];
    const cardActions = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().actions),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                type: "default",
                onClick: ()=>onCreateChat(seller?.seller_id),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaRegCommentDots, {
                            style: {
                                marginRight: "6px"
                            }
                        }),
                        "Xabar"
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_9___default()), {
                href: `/seller/${seller?.seller_id}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            children: [
                                "Batafsil",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_13__.FaArrowRightLong, {
                                    style: {
                                        marginLeft: "6px"
                                    }
                                })
                            ]
                        })
                    })
                })
            })
        ]
    });
    const cardInfo = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().nameRow),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_9___default()), {
                    href: `/seller/${seller?.seller_id}`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().name),
                        children: seller?.full_name
                    })
                })
            }),
            seller?.position?.title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().position),
                children: seller?.position?.title
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaRow),
                children: [
                    seller?.average_rating > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaItem),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaStar, {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaStar)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    seller?.average_rating,
                                    " (",
                                    seller?.feedbacks_count || 0,
                                    " ta izoh)"
                                ]
                            })
                        ]
                    }),
                    seller?.last_active && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaItem),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_4__.IoTimeOutline, {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaIcon)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: formatLastActive(seller?.last_active)
                            })
                        ]
                    }),
                    seller?.location && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaItem),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_4__.IoLocationOutline, {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().metaIcon)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: seller?.location
                            })
                        ]
                    })
                ]
            })
        ]
    });
    const handleSwiperInit = (swiper)=>{
        setSwiperInstance(swiper);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };
    const handleSlideChange = (swiper)=>{
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };
    const displayServices = Array.isArray(services) && services.length > 0 ? services.slice(0, 10) : [];
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (swiperInstance?.params && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [
        swiperInstance,
        displayServices
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isCustomServicesLoading) {
            startTimeout(()=>{
                setIsCustomServicesLoading(false);
            }, 800);
        }
    }, [
        isCustomServicesLoading
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().horizontalCard),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().cardHeader),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().profileSection),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                                dot: true,
                                color: isOnline ? "green" : "gray",
                                offset: [
                                    -20,
                                    90
                                ],
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().badge),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_8___default()), {
                                    src: seller?.photo_url || "/static/img/ozodbek.png",
                                    alt: seller?.full_name || "Seller",
                                    width: 100,
                                    height: 100,
                                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().avatar)
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().profileInfo),
                                children: [
                                    isDesktop ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: cardInfo
                                            }),
                                            isDesktop && cardActions
                                        ]
                                    }) : cardInfo,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statsRow),
                                        children: statsList.map((stat, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
                                                children: [
                                                    stat,
                                                    index < statsList.length - 1 && !isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                                                        type: "vertical",
                                                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().statDivider)
                                                    })
                                                ]
                                            }, index))
                                    })
                                ]
                            })
                        ]
                    }),
                    !isDesktop && cardActions
                ]
            }),
            displayServices.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesSection),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesHeader),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesTitle),
                                children: "Xizmatlar"
                            }),
                            displayServices.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesNavigation),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        ref: prevRef,
                                        className: `${(_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().navButton)} ${isBeginning ? (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().navButtonDisabled) : ""}`,
                                        disabled: isBeginning,
                                        "aria-label": "Previous",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_7__.IoIosArrowBack, {
                                            fontSize: 18
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        ref: nextRef,
                                        className: `${(_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().navButton)} ${isEnd ? (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().navButtonDisabled) : ""}`,
                                        disabled: isEnd,
                                        "aria-label": "Next",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_7__.IoIosArrowForward, {
                                            fontSize: 18
                                        })
                                    })
                                ]
                            }) : null
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesSwiperWrapper),
                        children: isCustomServicesLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                display: "flex",
                                gap: "16px",
                                overflow: "hidden",
                                paddingBottom: "10px"
                            },
                            children: Array(4).fill(undefined).map((_, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton.Button, {
                                    active: true,
                                    style: {
                                        width: "280px",
                                        height: "130px"
                                    }
                                }, index))
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(swiper_react__WEBPACK_IMPORTED_MODULE_5__.Swiper, {
                            modules: [
                                swiper_modules__WEBPACK_IMPORTED_MODULE_6__.Navigation
                            ],
                            spaceBetween: 16,
                            slidesPerView: "auto",
                            navigation: {
                                prevEl: prevRef.current,
                                nextEl: nextRef.current
                            },
                            onSwiper: handleSwiperInit,
                            onSlideChange: handleSlideChange,
                            className: `${(_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().servicesSwiper)} ${!isEnd && !isMobile && (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().categorySwiperEnding)} ${!isBeginning && !isMobile && (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().categorySwiperBeginning)}`,
                            children: [
                                displayServices.map((service)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_5__.SwiperSlide, {
                                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().serviceSlide),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().serviceCardWrapper),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                                service: service,
                                                hasFooter: false
                                            })
                                        })
                                    }, service.id)),
                                seller.services_length > 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_5__.SwiperSlide, {
                                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().serviceSlide),
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().card),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                                className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().title),
                                                children: [
                                                    seller.services_length,
                                                    " ta xizmatlar topildi"
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                href: `/seller/${seller?.seller_id}/?tab=service`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().viewAllButton),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        className: (_styles_freelancerHorizontalCard_module_scss__WEBPACK_IMPORTED_MODULE_15___default().btn),
                                                        children: "Barchasini ko'rish"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                }, "see_more")
                            ]
                        })
                    })
                ]
            }) : null
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreelancerHorizontalCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6554:
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7425);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6157);
/* harmony import */ var _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6215);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6603);
/* harmony import */ var _shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9187);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_ai__WEBPACK_IMPORTED_MODULE_4__, react_icons_bi__WEBPACK_IMPORTED_MODULE_5__, _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__]);
([react_icons_ai__WEBPACK_IMPORTED_MODULE_4__, react_icons_bi__WEBPACK_IMPORTED_MODULE_5__, _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function FreelancerFilterCollide({ collapsed , toggleCollapsed  }) {
    const { 0: formVal , 1: setFormVal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        direction: null,
        positions: []
    });
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    const { directions , positions , handleClear , updateQuery , selectedPositions , selectedDirection ,  } = (0,_hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(collapsed);
    // Prevent body scroll when drawer is open
    (0,_shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_8__/* .useDisableWindowScroll */ .a)(collapsed);
    const positionOptions = formVal.direction ? positions.filter((pos)=>formVal.direction.includes(pos.direction))?.map((el)=>({
            label: el.title,
            value: el.title
        })) || [] : [];
    const inputSizes = isMobile ? "middle" : "large";
    const handleSave = ()=>{
        updateQuery({
            direction: formVal.direction,
            position: formVal.positions
        });
        toggleCollapsed();
    };
    const handleClearAll = ()=>{
        handleClear();
        toggleCollapsed();
        setFormVal({
            direction: null,
            positions: []
        });
    };
    const onChangeDirection = (value)=>{
        setFormVal((prev)=>({
                ...prev,
                direction: value
            }));
    };
    const onChangePositions = (value)=>{
        setFormVal((prev)=>({
                ...prev,
                positions: value
            }));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (collapsed) {
            setFormVal({
                direction: selectedDirection,
                positions: selectedPositions
            });
        }
    }, [
        collapsed
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
        style: {
            borderRadius: "20px 20px 0 0"
        },
        placement: "bottom",
        onClose: toggleCollapsed,
        open: collapsed,
        height: "75%",
        closeIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
            type: "text",
            shape: "circle",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.CloseOutlined, {
                style: {
                    fontSize: 20,
                    color: "#00a44f"
                }
            })
        }),
        headerStyle: {
            flexDirection: "column-reverse",
            alignItems: "flex-end"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: "directions",
                        style: {
                            fontSize: isMobile ? "16px" : "18px",
                            marginBottom: "8px"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_4__.AiOutlineApartment, {}),
                            " Yo‘nalish"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Select, {
                        id: "directions",
                        mode: "multiple",
                        size: inputSizes,
                        placeholder: "Yo'nalishni tanlang",
                        value: formVal.direction,
                        onChange: onChangeDirection,
                        style: {
                            width: "100%"
                        },
                        options: directions
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    marginTop: "20px"
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: "positions",
                        style: {
                            fontSize: isMobile ? "16px" : "18px",
                            marginBottom: "8px"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__.BiCategory, {}),
                            " Kasb"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Select, {
                        id: "positions",
                        mode: "multiple",
                        size: inputSizes,
                        placeholder: "Kasblarni tanlang",
                        value: formVal.positions,
                        onChange: onChangePositions,
                        style: {
                            width: "100%"
                        },
                        options: positionOptions
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    gap: 12,
                    marginTop: 24
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        block: true,
                        onClick: handleClearAll,
                        size: inputSizes,
                        children: "Filtrni tozalash"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        block: true,
                        onClick: handleSave,
                        size: inputSizes,
                        children: "Filtrni qo‘llash"
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreelancerFilterCollide);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5749:
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
/* harmony import */ var react_icons_lu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(577);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4577);
/* harmony import */ var _styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5521);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_lu__WEBPACK_IMPORTED_MODULE_2__, react_icons_go__WEBPACK_IMPORTED_MODULE_6__]);
([react_icons_lu__WEBPACK_IMPORTED_MODULE_2__, react_icons_go__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const options = [
    {
        value: "average_rating",
        label: "Reyting bo'yicha"
    },
    {
        value: "last_active",
        label: "Faollik bo'yicha"
    }, 
];
function FreelancersFilterHeader({ toggleCollapsed , collapsed , viewType , onViewChange ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const sortOrder = router.query.order || "desc";
    const handleSortChange = (value)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort_by: value,
                order: "desc"
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7___default().headerWrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_2__.LuSettings2, {}),
                onClick: toggleCollapsed,
                type: collapsed ? "primary" : "default",
                children: "Filterlar"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7___default().controls),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Select, {
                                value: router.query.sort_by || "average_rating",
                                onChange: handleSortChange,
                                options: options,
                                style: {
                                    width: 150
                                },
                                placeholder: "Saralash"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                                type: "dashed",
                                icon: sortOrder === "asc" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_go__WEBPACK_IMPORTED_MODULE_6__.GoSortAsc, {
                                    fontSize: 20
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_go__WEBPACK_IMPORTED_MODULE_6__.GoSortDesc, {
                                    fontSize: 20
                                }),
                                onClick: ()=>{
                                    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
                                    router.push({
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            order: newSortOrder
                                        }
                                    });
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Segmented, {
                        value: viewType,
                        onChange: onViewChange,
                        rootClassName: "ant-filter-segmented",
                        options: [
                            {
                                value: "horizontal",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.UnorderedListOutlined, {})
                            },
                            {
                                value: "grid",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.AppstoreOutlined, {})
                            }, 
                        ],
                        className: (_styles_freelancersFilterHeader_module_scss__WEBPACK_IMPORTED_MODULE_7___default().viewToggle)
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreelancersFilterHeader);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7765:
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7425);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6905);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6157);
/* harmony import */ var _styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2945);
/* harmony import */ var _styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6215);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_ai__WEBPACK_IMPORTED_MODULE_3__, react_icons_md__WEBPACK_IMPORTED_MODULE_4__, react_icons_bi__WEBPACK_IMPORTED_MODULE_5__, _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__]);
([react_icons_ai__WEBPACK_IMPORTED_MODULE_3__, react_icons_md__WEBPACK_IMPORTED_MODULE_4__, react_icons_bi__WEBPACK_IMPORTED_MODULE_5__, _hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function FreelancersFilterMenu({ collapsed  }) {
    const { directionsGroup , positionsGroup , handleClear , handlePositionsChange , handleDirectionChange , selectedPositions , selectedDirection ,  } = (0,_hooks_useFreelancers__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default().radioMenu)} ${collapsed ? (_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default().visible) : ""}`,
        children: [
            selectedPositions?.length || selectedDirection?.length ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default().clearButton),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    style: {
                        marginRight: "auto",
                        marginBottom: "15px",
                        width: "100%",
                        border: "1px solid red"
                    },
                    type: "text",
                    danger: true,
                    onClick: handleClear,
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_4__.MdOutlineClear, {}),
                    children: "Filtrlarni tozalash"
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default().filterGroup),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_3__.AiOutlineApartment, {}),
                            " Yo‘nalish"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Checkbox.Group, {
                        value: selectedDirection,
                        onChange: handleDirectionChange,
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        },
                        children: directionsGroup
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_freelancersFilterMenu_module_scss__WEBPACK_IMPORTED_MODULE_7___default().filterGroup),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__.BiCategory, {}),
                            " Kasb"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Checkbox.Group, {
                        value: selectedPositions,
                        onChange: handlePositionsChange,
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        },
                        children: positionsGroup
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreelancersFilterMenu);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5916:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2414);
/* harmony import */ var _FreelancerHorizontalCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2335);
/* harmony import */ var _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3944);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2998);
/* harmony import */ var _styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5181);
/* harmony import */ var _styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6598);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6603);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_4__, _FreelancerHorizontalCard__WEBPACK_IMPORTED_MODULE_5__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_8__]);
([_entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_4__, _FreelancerHorizontalCard__WEBPACK_IMPORTED_MODULE_5__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












function FreelancersFilterResult({ data , collapsed , viewType  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)();
    const { startTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_9__/* .useTimeManager */ .h)();
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useSelector)((state)=>state?.auth);
    const { 0: selectedSellerId , 1: setSelectedSellerId  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const { mutate: createChat  } = (0,_components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)();
    const { 0: authModal , 1: setAuthModal  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const limit = collapsed ? 21 : 20;
    const offset = Number(router.query.offset) || 0;
    const currentPage = offset / limit + 1;
    const handlePageChange = (page)=>{
        const newOffset = (page - 1) * limit;
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: newOffset || undefined,
                limit
            }
        });
    };
    const handleSuccessAuth = ()=>{
        if (selectedSellerId) {
            startTimeout(()=>{
                createChat(selectedSellerId);
            }, 1000);
        }
    };
    const handleCreateChat = (id)=>{
        if (isLoggedIn) {
            createChat(id);
        } else {
            setAuthModal(true);
            setSelectedSellerId(id);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: undefined,
                limit
            }
        }, undefined, {
            shallow: viewType === "horizontal"
        });
    }, [
        collapsed,
        viewType
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: collapsed && isDesktop ? (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_11___default().freelancersFilterResultContent) : (_styles_freelancers_module_scss__WEBPACK_IMPORTED_MODULE_11___default().freelancersFilterResultCollapsedContent),
        children: [
            data?.count > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: viewType === "grid" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `row row-gap-4 row-cols-2 row-cols-sm-2 row-cols-md-3 ${collapsed ? "row-cols-lg-3" : "row-cols-lg-4"} `,
                    children: data?.results?.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                seller: {
                                    ...item,
                                    total_feedbacks_count: item?.feedbacks_count,
                                    soff_seller_id: item.seller_id
                                }
                            })
                        }, item.id))
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: data?.results?.map((s)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FreelancerHorizontalCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            seller: s,
                            onCreateChat: handleCreateChat
                        }, s.id))
                })
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "Search_Results_not_found",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/searchNotFound.png",
                        alt: "",
                        className: "Search_Results_not_found_img"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "Search_Results_not_found_title",
                        style: {
                            marginTop: 20,
                            marginBottom: 0
                        },
                        children: "Afsuski, bu yo'nalishda frilanserlar topilmadi."
                    })
                ]
            }),
            data?.count > limit && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0px"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Pagination, {
                    pageSize: limit,
                    current: currentPage,
                    total: data?.count,
                    size: "medium",
                    showSizeChanger: false,
                    onChange: handlePageChange
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                open: authModal,
                onClose: ()=>setAuthModal(false),
                onSuccess: handleSuccessAuth
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreelancersFilterResult);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6215:
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
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9880);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6400);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_profile_slice__WEBPACK_IMPORTED_MODULE_2__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__]);
([_store_profile_slice__WEBPACK_IMPORTED_MODULE_2__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function useFreelancers(collapsed) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const limit = collapsed ? 21 : 20;
    const { data: directions , isFetching: isDirectionsFetching  } = (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_2__/* .useGetDirectionsQuery */ .P5)();
    const directionsMap = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!directions) return {};
        const map = {};
        directions.forEach((dir)=>{
            map[dir.value] = dir;
        });
        return map;
    }, [
        directions
    ]);
    const selectedDirection = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Array.isArray(router.query.direction) ? router.query.direction.map((v)=>v) : router.query.direction ? [
            router.query.direction
        ] : [], [
        router.query.direction
    ]);
    const { data: dataPositions , isFetching: isPositionsFetching  } = (0,_shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__/* .useFGet */ .oh)([
        "positions"
    ], `users/positions`);
    const positions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (dataPositions) {
            return dataPositions.filter((pos)=>{
                if (router.query.direction) {
                    return router.query.direction.includes(pos.direction);
                }
                return true;
            });
        }
        return [];
    }, [
        dataPositions,
        router.query.direction
    ]);
    const positionsGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isPositionsFetching) return Array(10).fill(0).map((_, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
                disabled: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Skeleton.Input, {
                    style: {
                        width: 100,
                        height: "20px",
                        marginTop: "2px"
                    },
                    active: true
                })
            }, idx));
        if (!positions || !positions.length) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "Hech qanday kasblar topilmadi"
        });
        return positions.map((pos)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
                value: pos.title,
                children: pos.title
            }, pos.title));
    }, [
        positions,
        isPositionsFetching
    ]);
    const directionsGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isDirectionsFetching) return Array(10).fill(0).map((_, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
                disabled: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Skeleton.Input, {
                    style: {
                        width: 100,
                        height: "20px",
                        marginTop: "2px"
                    },
                    active: true
                })
            }, idx));
        if (!directions || !directions.length) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "Hech qanday yo'nalishlar topilmadi"
        });
        return directions.map((dir)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
                value: dir.value,
                children: dir.label
            }, dir.value));
    }, [
        directions,
        isDirectionsFetching
    ]);
    const selectedPositions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Array.isArray(router.query.position) ? router.query.position.map((v)=>v) : router.query.position ? [
            router.query.position
        ] : [], [
        router.query.position
    ]);
    // query yangilovchi funksiya
    const updateQuery = (updates)=>{
        const newQuery = {
            ...router.query,
            limit,
            offset: 0
        };
        Object.entries(updates).forEach(([key, value])=>{
            if (value === undefined || value === null || value.length === 0) {
                delete newQuery[key];
            } else {
                newQuery[key] = value;
            }
        });
        router.push({
            pathname: router.pathname,
            query: newQuery
        }, undefined, {
            scroll: false
        });
    };
    // Tozalash
    const handleClear = ()=>{
        router.push({
            pathname: router.pathname,
            query: {}
        });
    };
    // Position (checkbox)
    const handlePositionsChange = (vals)=>{
        updateQuery({
            position: vals
        });
    };
    // Direction (radio)
    const handleDirectionChange = (vals)=>{
        updateQuery({
            direction: vals,
            directionValue: Array.isArray(vals) ? vals.map((val)=>directionsMap[val].label) : directionsMap[vals] ? directionsMap[vals].label : undefined,
            position: undefined
        });
    };
    return {
        directions,
        directionsGroup,
        positions,
        positionsGroup,
        handleClear,
        updateQuery,
        handlePositionsChange,
        handleDirectionChange,
        selectedPositions,
        selectedDirection,
        isPositionsFetching,
        isDirectionsFetching
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFreelancers);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1538:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport safe */ _Freelancers__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _Freelancers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4236);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Freelancers__WEBPACK_IMPORTED_MODULE_0__]);
_Freelancers__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ fetchJson)
/* harmony export */ });
async function fetchJson(url) {
    try {
        const res = await fetch(url);
        // if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
        return await res.json();
    } catch (e) {
        return {
            error: e.message
        };
    }
}


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

/***/ 6734:
/***/ ((module) => {

"use strict";
module.exports = require("js-cookie");

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

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/loadable.js");

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

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 8176:
/***/ ((module) => {

"use strict";
module.exports = require("react-spinners");

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

/***/ 7425:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/ai");;

/***/ }),

/***/ 6157:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/bi");;

/***/ }),

/***/ 1301:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/fa");;

/***/ }),

/***/ 7333:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/fa6");;

/***/ }),

/***/ 5521:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/go");;

/***/ }),

/***/ 6840:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/io");;

/***/ }),

/***/ 1185:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/io5");;

/***/ }),

/***/ 577:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/lu");;

/***/ }),

/***/ 6905:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/md");;

/***/ }),

/***/ 2184:
/***/ ((module) => {

"use strict";
module.exports = import("swiper/modules");;

/***/ }),

/***/ 7840:
/***/ ((module) => {

"use strict";
module.exports = import("swiper/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,7864,2315,6985,6598,3701,6020,2536,3060,3944,6400,9187,681,2998,2414], () => (__webpack_exec__(3771)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=freelancers.js.map