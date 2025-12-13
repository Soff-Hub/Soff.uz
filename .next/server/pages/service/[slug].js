(() => {
var exports = {};
exports.id = 9309;
exports.ids = [9309];
exports.modules = {

/***/ 8012:
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
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4705);
/* harmony import */ var _components_freeleance_services_service_deatail_ServiceDetail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2170);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__, _components_freeleance_services_service_deatail_ServiceDetail__WEBPACK_IMPORTED_MODULE_5__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_6__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__, _components_freeleance_services_service_deatail_ServiceDetail__WEBPACK_IMPORTED_MODULE_5__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const ServiceDetailPage = ({ data , status  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_freeleance_services_service_deatail_ServiceDetail__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            data: data,
            status: status
        })
    });
};
async function getServerSideProps$1(context) {
    const { slug  } = context.params;
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)();
    try {
        const { data , status  } = await axios.get(`${"https://freelance.soff.uz"}/api/v1/customer/${slug}/`);
        return {
            props: {
                data,
                status
            }
        };
    } catch (error) {
        const errStatus = error.response?.status;
        if ([
            400,
            404,
            500
        ].includes(errStatus)) {
            return {
                notFound: true
            };
        }
        return {
            props: {
                data: null,
                status: errStatus || 500
            }
        };
    }
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getServerSideProps: getServerSideProps$1,
    'default': ServiceDetailPage
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

const getInitialPropsWrapper = getInitialPropsWrappers['/service/[slug]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/service/[slug]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/service/[slug]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1393:
/***/ ((module) => {

// Exports
module.exports = {
	"carouselWrapper": "detail_carouselWrapper__GqOo4",
	"carousel": "detail_carousel__SB16I",
	"slide": "detail_slide__vPNx_",
	"imageItem": "detail_imageItem__XlW8y",
	"avatar": "detail_avatar__ksVlL",
	"username": "detail_username__SeHEG",
	"userMainBox": "detail_userMainBox__wZDBf",
	"title": "detail_title__Pe_0v",
	"priceBox": "detail_priceBox__qr_SM",
	"priceDiv": "detail_priceDiv__fUlHZ",
	"price": "detail_price__BXkMw",
	"priceTitle": "detail_priceTitle__dWRH7",
	"infoBox": "detail_infoBox__voK1z",
	"infoRow": "detail_infoRow__XfIGP",
	"key": "detail_key__g5j0e",
	"value": "detail_value__4NvGi",
	"btn": "detail_btn__LL1r8",
	"shine": "detail_shine__2IoDs",
	"moneyBox": "detail_moneyBox__wDdOy",
	"userBox": "detail_userBox__PH5e_",
	"imgbox": "detail_imgbox__dZp6k",
	"serviceDescription": "detail_serviceDescription__8HSyp",
	"downloadBtn": "detail_downloadBtn__tjycl",
	"serviceBox": "detail_serviceBox__xC_d0",
	"serviceItem": "detail_serviceItem__j5D3x",
	"pricing": "detail_pricing__zN6wm",
	"info": "detail_info__NKP0_",
	"btnWrapper": "detail_btnWrapper__qJbIm",
	"faq": "detail_faq__ukM__",
	"portfolioSection": "detail_portfolioSection__0xOUC"
};


/***/ }),

/***/ 8660:
/***/ ((module) => {

// Exports
module.exports = {
	"serviceOrderModalContainer": "service-checkout_serviceOrderModalContainer__TAHYb",
	"serviceOrderModal": "service-checkout_serviceOrderModal__uL_Rg",
	"servicePreOrder": "service-checkout_servicePreOrder__TgUEE",
	"title": "service-checkout_title__RtlAL",
	"securityMessage": "service-checkout_securityMessage___XS05",
	"orderPayment": "service-checkout_orderPayment__v_Sa7",
	"orderPaymentHeader": "service-checkout_orderPaymentHeader__uJfUj",
	"orderButton": "service-checkout_orderButton__ngL_E",
	"orderButtonWarn": "service-checkout_orderButtonWarn__znGns",
	"orderButtonActive": "service-checkout_orderButtonActive__t_irb",
	"orderButtonInactive": "service-checkout_orderButtonInactive__4oCNp",
	"backButton": "service-checkout_backButton__XwGoJ"
};


/***/ }),

/***/ 2170:
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
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui_ImageCarousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(907);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _ui_PriceBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9138);
/* harmony import */ var _ui_MoneyBack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9117);
/* harmony import */ var _ui_UserBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(739);
/* harmony import */ var _ui_ServiceDescription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8815);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6985);
/* harmony import */ var _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(681);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6603);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _store_fast_dowload_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2393);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ui_ImageCarousel__WEBPACK_IMPORTED_MODULE_3__, _ui_PriceBox__WEBPACK_IMPORTED_MODULE_4__, _ui_UserBox__WEBPACK_IMPORTED_MODULE_6__, _ui_ServiceDescription__WEBPACK_IMPORTED_MODULE_7__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__, _store_fast_dowload_slice__WEBPACK_IMPORTED_MODULE_13__]);
([_ui_ImageCarousel__WEBPACK_IMPORTED_MODULE_3__, _ui_PriceBox__WEBPACK_IMPORTED_MODULE_4__, _ui_UserBox__WEBPACK_IMPORTED_MODULE_6__, _ui_ServiceDescription__WEBPACK_IMPORTED_MODULE_7__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__, _store_fast_dowload_slice__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















// Lazy load below-the-fold components
const FaqSection = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(()=>__webpack_require__.e(/* import() */ 4465).then(__webpack_require__.bind(__webpack_require__, 4465)), {
    loadableGenerated: {
        modules: [
            "../components/freeleance/services/service-deatail/ServiceDetail.jsx -> " + "./ui/FaqSection"
        ]
    },
    ssr: true
});
const PortfolioSection = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(()=>__webpack_require__.e(/* import() */ 1388).then(__webpack_require__.bind(__webpack_require__, 1388)), {
    loadableGenerated: {
        modules: [
            "../components/freeleance/services/service-deatail/ServiceDetail.jsx -> " + "./ui/PortfolioSection"
        ]
    },
    ssr: true
});
const CommentSection = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(()=>__webpack_require__.e(/* import() */ 193).then(__webpack_require__.bind(__webpack_require__, 193)), {
    loadableGenerated: {
        modules: [
            "../components/freeleance/services/service-deatail/ServiceDetail.jsx -> " + "./ui/CommentSection"
        ]
    },
    ssr: true
});
const StickyBox = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(null, {
    loadableGenerated: {
        modules: [
            "../components/freeleance/services/service-deatail/ServiceDetail.jsx -> " + "./ui/sticky-box"
        ]
    },
    ssr: false
});
const ServiceDetail = ({ data  })=>{
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_12__.useDispatch)();
    const { service , seller_portfolio , similar_services , faqs , order_requirements , user , service_items ,  } = data;
    const { isDesktop , isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
    const pushUser = ()=>push(`/seller/${data?.user[0]?.soff_seller_id}`);
    const priceBox = {
        days: service?.delivery_days,
        price: service?.price,
        revisions: service?.right_to_change,
        id: service?.id,
        title: service?.title,
        user: user,
        category: service?.category?.title
    };
    const { full_name , photo_url  } = user[0];
    const description = {
        description: service?.description,
        requirements: order_requirements[0]?.order_requirement_description,
        file: order_requirements[0]?.order_requirement_file,
        serviceItems: service_items
    };
    const slider_images = [
        {
            id: "poster-img",
            image_url: service?.poster
        },
        service?.video?.video_url ? {
            type: "video",
            id: "service-video",
            video_url: service?.video?.video_url
        } : null,
        ...seller_portfolio?.map((portfolio)=>[
                ...portfolio?.portfolio_images?.map((elem, index)=>({
                        id: index,
                        image_url: elem?.image
                    })) || [],
                ...portfolio?.videos?.map((vid, index)=>({
                        type: "video",
                        id: `video-${index}`,
                        video_url: vid?.video_url
                    })) || [], 
            ]).flatMap((i)=>i), 
    ].filter(Boolean);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispatch((0,_store_fast_dowload_slice__WEBPACK_IMPORTED_MODULE_13__/* .setShowSearch */ .xZ)(false));
        return ()=>{
            dispatch((0,_store_fast_dowload_slice__WEBPACK_IMPORTED_MODULE_13__/* .setShowSearch */ .xZ)(true));
        };
    }, [
        dispatch
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "container my-5 navTabsPadding",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                title: service?.title,
                image: service?.poster,
                description: service?.description,
                author: full_name
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-12 col-lg-8",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                background: "white",
                                padding: "20px",
                                borderRadius: "12px"
                            },
                            className: "w-100",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                    className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_14___default().title),
                                    children: service?.title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_ImageCarousel__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    images: slider_images
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_ServiceDescription__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                    priceBox: priceBox,
                                    description: description
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "col-12 col-lg-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_PriceBox__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                priceBox: priceBox,
                                requirements: description.requirements
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_MoneyBack__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_UserBox__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                rating: service?.avg_rating,
                                feedbacks: service?.user?.total_feedbacks_count,
                                priceBox: priceBox,
                                pushUser: pushUser
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "col-12 col-lg-8",
                    children: [
                        faqs?.length !== 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FaqSection, {
                            faqs: faqs
                        }),
                        seller_portfolio?.length !== 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PortfolioSection, {
                            portfolios: seller_portfolio
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CommentSection, {
                type: "service_id",
                id: service?.id
            }),
            similar_services.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: "O'xshash xizmatlar"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-2 row-gap-md-5 row-gap-lg-3",
                        children: similar_services?.slice(0, isMobile ? 10 : 8)?.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col px-2",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_service_service_card__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                    service: item
                                })
                            }, item?.title))
                    })
                ]
            }),
            !isDesktop && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StickyBox, {
                data: priceBox
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceDetail);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 907:
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
/* harmony import */ var _components_details_components_details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(583);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_details_components_details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_2__]);
_components_details_components_details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const ImageCarousel = ({ images  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3___default().carouselWrapper),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_details_components_details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            isProduct: false,
            images: images
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageCarousel);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9117:
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
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__);




const { Panel  } = antd__WEBPACK_IMPORTED_MODULE_2__.Collapse;
const MoneyBack = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "card shadow-sm border-0 my-4",
        style: {
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#fff"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_3___default().moneyBox)} d-flex align-items-center p-3`,
                style: {
                    gap: "16px"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/services_images/garant.png",
                        alt: "money garant img",
                        style: {
                            width: "70px",
                            height: "70px",
                            objectFit: "contain"
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: "mb-1",
                                style: {
                                    fontSize: "18px",
                                    fontWeight: "600"
                                },
                                children: "Pulni qaytarish kafolati"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mb-0 text-muted",
                                style: {
                                    fontSize: "14px"
                                },
                                children: "Agar buyurtmangiz siz kutgandek bo‘lmasa, pulingizni to‘liq qaytaramiz."
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Collapse, {
                ghost: true,
                expandIconPosition: "end",
                className: "border-top",
                style: {
                    padding: "0 16px 12px",
                    backgroundColor: "#fff"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Panel, {
                    header: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-success",
                        style: {
                            fontWeight: 500
                        },
                        children: "Batafsil ma’lumot"
                    }),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            fontSize: "14px",
                            color: "#555",
                            lineHeight: "1.6"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            children: [
                                "Bizning asosiy maqsadimiz – mijozning mamnunligi. Agar buyurtma natijasi siz kutgandek bo‘lmasa yoki umuman bajarilmasa, sizda ",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                    children: "pulni to‘liq qaytarib olish huquqi"
                                }),
                                " ",
                                "mavjud. Mablag‘ balansingizga qaytariladi va uni istalgan vaqtda yechib olishingiz mumkin. Demak,",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                    children: "Soff.uz"
                                }),
                                " da buyurtma berish",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                    children: "100% xavfsiz"
                                }),
                                " — natija bo‘lmasa, pulingiz qaytadi."
                            ]
                        })
                    })
                }, "1")
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoneyBack);


/***/ }),

/***/ 9138:
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
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3701);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7351);
/* harmony import */ var _shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5211);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_6__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const PriceBox = ({ priceBox , requirements  })=>{
    const { price , days , revisions  } = priceBox;
    const { 0: isOpen , 1: setIsOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.auth);
    const { query , pathname , replace  } = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const handleClick = ({ setModalOpen , setAuthOpen  })=>{
        if (isLoggedIn) {
            setModalOpen(true);
        } else {
            localStorage.setItem("openPaymentModal", "true");
            setAuthOpen(true);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (query?.paymodal === "open" && isLoggedIn) {
            setIsOpen(true);
            const newQuery = {
                ...query
            };
            delete newQuery.paymodal;
            replace({
                pathname,
                query: newQuery
            }, undefined, {
                shallow: true
            });
        }
    }, [
        query?.paymodal,
        isLoggedIn,
        pathname,
        replace
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isLoggedIn) {
            const shouldOpenModal = localStorage.getItem("openPaymentModal");
            if (shouldOpenModal === "true") {
                setIsOpen(true);
                localStorage.removeItem("openPaymentModal");
            }
        }
    }, [
        isLoggedIn
    ]);
    const handleAuthSuccess = async ({ setModalOpen  })=>{
        await (0,_shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_7__/* .sleep */ ._)(200);
        setModalOpen(true);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().priceBox),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().infoBox),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().infoRow),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().key),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-money-bill-wave"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Narx"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().value),
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__/* .formatCurrencyWithSpace */ .O$)(price),
                                    " so'm"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().infoRow),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().key),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-clock"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Yetkazish"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().value),
                                children: [
                                    days,
                                    " kunda"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().infoRow),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().key),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-pen-to-square"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Tahrirlash"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().value),
                                children: [
                                    revisions,
                                    " marta"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ServiceOrderModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                requirements: requirements,
                handleAuthSuccess: handleAuthSuccess,
                order: priceBox,
                externalOpenModal: isOpen,
                children: ({ setAuthOpen , setModalOpen  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        onClick: ()=>handleClick({
                                setModalOpen,
                                setAuthOpen
                            }),
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_8___default().btn),
                        children: [
                            "Buyurtma berish (",
                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__/* .formatCurrencyWithSpace */ .O$)(price),
                            " so'm)"
                        ]
                    })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceBox);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8815:
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
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3701);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7333);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7425);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1185);
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5521);
/* harmony import */ var _shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2495);
/* harmony import */ var _shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5211);
/* harmony import */ var _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7351);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_5__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_6__, react_icons_ai__WEBPACK_IMPORTED_MODULE_7__, react_icons_io5__WEBPACK_IMPORTED_MODULE_8__, react_icons_go__WEBPACK_IMPORTED_MODULE_9__, _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_11__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_5__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_6__, react_icons_ai__WEBPACK_IMPORTED_MODULE_7__, react_icons_io5__WEBPACK_IMPORTED_MODULE_8__, react_icons_go__WEBPACK_IMPORTED_MODULE_9__, _ServiceOrderModal__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const ServiceDescription = ({ description ={} , priceBox ={}  })=>{
    const { price , days , revisions , title , category  } = priceBox;
    const { requirements ="" , file ="" , serviceItems =[] , description: descText = "" ,  } = description;
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.auth);
    const hiddenClass = (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__/* .useRcn */ .Q)({
        mobile: "flex",
        tablet: "hidden",
        desktop: "hidden"
    });
    const flexClass = (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__/* .useRcn */ .Q)({
        mobile: "block",
        tablet: "hidden",
        desktop: "hidden"
    });
    const handleOrderClick = ({ setModalOpen , setAuthOpen  })=>{
        if (isLoggedIn) {
            setModalOpen(true);
        } else {
            setAuthOpen(true);
        }
    };
    const handleAuthSuccess = async ({ setModalOpen  })=>{
        await (0,_shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_12__/* .sleep */ ._)(200);
        setModalOpen(true);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().serviceDescription),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)(flexClass),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("text-[20px]", "mb-1"),
                        children: title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("text-secondary", "text-[14px]"),
                        children: category
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("flex", "items-center", "gap-4", "my-4", hiddenClass),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("flex", "items-center", "gap-2"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_7__.AiOutlineDollar, {
                                color: "rgba(0,0,0,0.5)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("text-[14px]"),
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_5__/* .formatCurrencyWithSpace */ .O$)(price),
                                    " so'm"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("flex", "items-center", "gap-2"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_8__.IoTimeOutline, {
                                color: "rgba(0,0,0,0.5)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("text-[14px]"),
                                children: [
                                    days,
                                    " kun"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("flex", "items-center", "gap-2"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_go__WEBPACK_IMPORTED_MODULE_9__.GoPencil, {
                                color: "rgba(0,0,0,0.5)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__.cn)("text-[14px]"),
                                children: [
                                    revisions,
                                    " ta tahrir"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Xizmat tavsifi"
            }),
            descText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    borderBottom: "1px solid rgba(0,0,0,0.04)"
                },
                dangerouslySetInnerHTML: {
                    __html: descText
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                children: "Boshlash uchun kerak"
            }),
            requirements && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    borderBottom: "1px solid rgba(0,0,0,0.04)"
                },
                dangerouslySetInnerHTML: {
                    __html: requirements
                }
            }),
            file && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: "Xizmat talablari uchun shablon fayl"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownloadOutlined, {}),
                        href: file,
                        target: "_blank",
                        download: true,
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().downloadBtn),
                        children: "Fayllarni yuklab olish"
                    })
                ]
            }),
            serviceItems?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().serviceBox),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: "Nimalar kiradi"
                    }),
                    serviceItems.map((item, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().serviceItem),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_6__.FaCheck, {
                                    color: "green"
                                }),
                                " ",
                                item.service_item
                            ]
                        }, idx))
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().pricing),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().infoBox)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ServiceOrderModal__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        requirements: requirements,
                        handleAuthSuccess: handleAuthSuccess,
                        order: priceBox,
                        children: ({ setAuthOpen , setModalOpen  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().btnWrapper),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_13___default().btn),
                                    onClick: ()=>handleOrderClick({
                                            setAuthOpen,
                                            setModalOpen
                                        }),
                                    children: [
                                        "Buyurtma berish (",
                                        (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_5__/* .formatCurrencyWithSpace */ .O$)(price),
                                        "so'm)"
                                    ]
                                })
                            })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceDescription);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7351:
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
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3701);
/* harmony import */ var _auth_serviceCheckout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4547);
/* harmony import */ var _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3944);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8660);
/* harmony import */ var _styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_freeleance_myorders_myorder_api_useGetCustomBalance__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2187);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, _auth_serviceCheckout__WEBPACK_IMPORTED_MODULE_4__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__, _components_freeleance_myorders_myorder_api_useGetCustomBalance__WEBPACK_IMPORTED_MODULE_7__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, _auth_serviceCheckout__WEBPACK_IMPORTED_MODULE_4__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__, _components_freeleance_myorders_myorder_api_useGetCustomBalance__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const { TextArea  } = antd__WEBPACK_IMPORTED_MODULE_2__.Input;
function ServiceOrderModal({ children , handleAuthSuccess , order ={} , requirements ="" , externalOpenModal ,  }) {
    const { 0: openAuth , 1: setOpenAuth  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: isOpen , 1: setIsOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showPayment , 1: setShowPayment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: actionTracker , 1: setActionTracker  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: mode , 1: setMode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: files , 1: setFiles  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: description , 1: setDescription  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { data  } = (0,_components_freeleance_myorders_myorder_api_useGetCustomBalance__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    const switchRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;
    const { price , id , title  } = order;
    const leftBalance = (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__/* .formatCurrencyWithSpace */ .O$)(Number(balance));
    const isSufficientBalance = balance >= order?.price;
    const componentProperties = {
        modalOpen: isOpen,
        setModalOpen: (value)=>setIsOpen(value),
        authOpen: openAuth,
        setAuthOpen: (value)=>setOpenAuth(value),
        actionTracker,
        setActionTracker
    };
    let childrenContent = null;
    if (typeof children === "function") {
        childrenContent = children(componentProperties);
    } else {
        childrenContent = children;
    }
    const handleClose = ()=>{
        setIsOpen(false);
        setShowPayment(false);
        setActionTracker(null);
    };
    const handleToPaymentPart = ()=>{
        setShowPayment(true);
    };
    const onAuthSuccess = async ()=>{
        handleAuthSuccess && handleAuthSuccess(componentProperties);
    };
    const onPaymentSuccess = (id)=>{
        handleClose();
        push(`/order/${id}`);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (externalOpenModal !== undefined) {
            setIsOpen(externalOpenModal);
        }
    }, [
        externalOpenModal
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (switchRef.current) {
            switchRef.addEventListener("click", (e)=>e.stopPropagation());
            return ()=>{
                switchRef.current.removeEventListener("click", (e)=>e.stopPropagation());
            };
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMode(Number(data?.wallet || 0) > 0);
    }, [
        data?.wallet
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            childrenContent,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
                open: isOpen,
                classNames: {
                    content: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().serviceOrderModalContainer)
                },
                onCancel: handleClose,
                footer: null,
                width: 600,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().serviceOrderModal),
                    children: !showPayment ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().servicePreOrder),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().title),
                                children: "Buyurtma uchun to'lovni amalga oshiring"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().securityMessage),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-shield-halved text-success fs-4 mb-2"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-muted mb-0",
                                        children: "Sizning to'lovingiz Soff tizimi tomonidan xavfsiz saqlanadi. Mutaxassisga to'lov faqat siz ishni ko'rib chiqib, tasdiqlaganingizdan so'ng amalga oshiriladi."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "service-details-box bg-white border rounded p-3 mb-4",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex justify-content-between align-items-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "d-flex align-items-center",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "fa-solid fa-file-lines text-primary me-3 fs-4"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                        className: "mb-1 fw-bold",
                                                        children: title
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "text-end",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                                className: "text-primary mb-0 fw-bold",
                                                children: [
                                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__/* .formatCurrencyWithSpace */ .O$)(price),
                                                    " ",
                                                    "so'm"
                                                ]
                                            })
                                        })
                                    ]
                                })
                            }),
                            requirements && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        className: "mb-3",
                                        style: {
                                            fontWeight: "semi-bold"
                                        },
                                        children: "Frilanser ishni boshlashi uchun quyidagilarni yuboring:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            borderBottom: "1px solid rgba(0,0,0,0.04)",
                                            marginBottom: "20px",
                                            paddingBottom: "15px"
                                        },
                                        dangerouslySetInnerHTML: {
                                            __html: requirements
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                className: "mb-3",
                                style: {
                                    fontWeight: "semi-bold"
                                },
                                children: "Buyurtma tafsilotlari"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TextArea, {
                                rows: 4,
                                value: description,
                                onChange: (e)=>{
                                    setDescription(e.target.value);
                                },
                                placeholder: "Buyurtma bo'yicha qo'shimcha ma'lumot (ixtiyoriy)",
                                className: "mb-4"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Upload, {
                                fileList: files,
                                multiple: false,
                                listType: "picture",
                                name: "file",
                                style: {
                                    height: "fit-content !important"
                                },
                                maxCount: 1,
                                beforeUpload: ()=>{
                                    return false;
                                },
                                onChange: (e)=>{
                                    const { file , fileList  } = e;
                                    if (file) {
                                        const maxSize = 50 * 1024 * 1024;
                                        if (file.size > maxSize) {
                                            message.error("Fayl 50 MB dan katta bo'lishi mumkin emas");
                                            return;
                                        }
                                        setFiles(fileList);
                                    }
                                },
                                onRemove: ()=>setFiles(null),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-paperclip"
                                    }),
                                    children: "Fayl yuklash (ixtiyoriy)"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "text-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    type: "primary",
                                    size: "large",
                                    className: "px-5 py-2",
                                    style: {
                                        backgroundColor: "#28a745",
                                        borderColor: "#28a745",
                                        marginTop: files?.[0] ? "40px" : "10px"
                                    },
                                    onClick: ()=>{
                                        handleToPaymentPart();
                                    },
                                    children: [
                                        "Buyurtmani rasmiylashtirish",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-arrow-right ms-2"
                                        })
                                    ]
                                })
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().orderPayment),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().orderPaymentHeader),
                                children: [
                                    balanceDisabled ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                                        title: "To'lov uchun balansingizdan foydalaning",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                            onClick: ()=>setMode((pre)=>!pre),
                                            className: mode && isSufficientBalance ? (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().orderButtonActive) : mode && !isSufficientBalance ? (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().orderButtonWarn) : (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().orderButtonInactive),
                                            disabled: !balanceDisabled,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                                                    value: mode,
                                                    size: "small"
                                                }),
                                                "Balance - ",
                                                leftBalance,
                                                " so'm"
                                            ]
                                        })
                                    }) : null,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        type: "text",
                                        className: (_styles_service_checkout_module_scss__WEBPACK_IMPORTED_MODULE_8___default().backButton),
                                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-arrow-left"
                                        }),
                                        onClick: ()=>setShowPayment(false),
                                        children: "Orqaga"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_auth_serviceCheckout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                document: id,
                                order: order,
                                balanceMode: mode,
                                balance: balance,
                                files: files,
                                description: description,
                                onClose: handleClose,
                                onSuccess: onPaymentSuccess
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthModal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                open: openAuth,
                onClose: ()=>setOpenAuth(false),
                onSuccess: onAuthSuccess
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceOrderModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 739:
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
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1393);
/* harmony import */ var _styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2998);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3944);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3984);
/* harmony import */ var dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_uz_latn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shared_utilities_cn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2495);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_4__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__]);
([_components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_4__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const UserBox = ({ pushUser , priceBox , rating , feedbacks  })=>{
    const { mutate  } = (0,_components_freeleance_chat_api_useCreateChat__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.auth);
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { price , id , days , revisions , title , user: seller  } = priceBox;
    const { full_name , last_active , photo_url , status , soff_seller_id ,  } = seller[0];
    const handleClick = ()=>{
        if (isLoggedIn) {
            mutate(soff_seller_id);
        } else {
            setOpen(true);
        }
    };
    const formattedLastActive = last_active ? dayjs__WEBPACK_IMPORTED_MODULE_7___default()(last_active).locale("uz-latn").format("DD-MMMM YYYY, HH:mm") : "Faol emas";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_11___default().userBox),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_detail_module_scss__WEBPACK_IMPORTED_MODULE_11___default().imgbox),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_9___default()), {
                                onClick: pushUser,
                                width: 50,
                                height: 50,
                                src: photo_url || "/static/img/ozodbek.png",
                                alt: full_name || "User"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                style: {
                                                    cursor: "pointer"
                                                },
                                                onClick: pushUser,
                                                children: full_name || "No Name"
                                            }),
                                            rating >= 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "d-flex gap-2 align-items-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.StarFilled, {
                                                        style: {
                                                            fontSize: "16px",
                                                            color: "#faad14"
                                                        }
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        style: {
                                                            fontSize: "16px",
                                                            color: "#faad14"
                                                        },
                                                        children: Number(rating).toFixed(1)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            "(",
                                                            feedbacks,
                                                            " izoh)"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "m-0",
                                        children: [
                                            "Oxirgi faollik: ",
                                            formattedLastActive
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        onClick: handleClick,
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.MessageOutlined, {}),
                        className: "w-100",
                        children: "Xabar yuborish"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                open: open,
                onClose: ()=>setOpen(false)
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserBox);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var _base_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8749);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const axiosInstance = (token)=>{
    return axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: `${_base_url__WEBPACK_IMPORTED_MODULE_1__/* .f_base_url */ .RI}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axiosInstance);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ sleep)
/* harmony export */ });
async function sleep(ms = 1000) {
    let timing;
    return new Promise((resolve)=>{
        timing = setTimeout(()=>{
            clearTimeout(timing);
            resolve();
        }, ms);
    });
}


/***/ }),

/***/ 2393:
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

/***/ 4705:
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
/* harmony import */ var _PageLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2315);
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

/***/ 1185:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/io5");;

/***/ }),

/***/ 6949:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/tb");;

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

/***/ }),

/***/ 5717:
/***/ ((module) => {

"use strict";
module.exports = import("yet-another-react-lightbox");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,7864,2315,6985,6598,3701,7534,5758,2495,6020,2536,3060,3944,8909,3215,681,2998,7732,5138,583], () => (__webpack_exec__(8012)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[slug].js.map