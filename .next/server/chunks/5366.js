;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2584acd4-ce55-4f4a-951f-44f8a3664df6",e._sentryDebugIdIdentifier="sentry-dbid-2584acd4-ce55-4f4a-951f-44f8a3664df6");})();}catch(e){}};
exports.id = 5366;
exports.ids = [5366];
exports.modules = {

/***/ 9988:
/***/ ((module) => {

// Exports
module.exports = {
	"mainblock": "style_mainblock__qP6rd",
	"footerMainTitle": "style_footerMainTitle__NBL_s",
	"footerLogo": "style_footerLogo__tKTuJ",
	"footerContent": "style_footerContent__F6oPn",
	"socialIcon": "style_socialIcon__ZuYdQ",
	"footerLogoSection": "style_footerLogoSection__oKBdo",
	"footerLinksSection": "style_footerLinksSection___EoWN"
};


/***/ }),

/***/ 5366:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9988);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7623);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_profile_slice__WEBPACK_IMPORTED_MODULE_4__]);
_store_profile_slice__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const footerMenu = {
    soff: {
        logoImg: "/static/img/soff.svg",
        title: "Raqamli xizmatlar bozori!",
        path: "#"
    },
    services: {
        title: "Aloqa",
        links: [
            {
                name: "Sotib olish va moderatsiya bo‘yicha",
                link: ""
            },
            {
                name: "+998 (91) 008 67 89",
                link: "tel:+998910086789"
            },
            {
                name: "@soff_moderator",
                link: "https://t.me/soff_moderator"
            },
            {
                name: "Texnik muammolar uchun",
                link: "tel:+998910086789"
            },
            {
                name: "@hr_soffhub",
                link: "https://t.me/hr_soffhub"
            }, 
        ]
    },
    social: {
        title: "Ijtimoiy tarmoqlarimiz",
        items: [
            {
                name: "Telegram",
                icon: "/static/svg/telegram_.svg",
                url: "https://t.me/+y5GpvEz48_hkMzli"
            },
            {
                name: "YouTube",
                icon: "/static/img/you_tube.png",
                url: "https://www.youtube.com/@soffuz"
            },
            {
                name: "Instagram",
                icon: "/static/img/insta.png",
                url: "https://www.instagram.com/soff.uz.market/"
            }, 
        ]
    }
};
const products = [
    {
        key: "1",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/book-saved.svg",
            alt: "",
            width: 20,
            height: 20
        }),
        link: "/scientific-resources/all?slug=all",
        label: "Ilmiy ishlar"
    },
    {
        key: "2",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/3dcube.svg",
            alt: "",
            width: 20,
            height: 20
        }),
        link: "/3d-models-and-interior-designs/all?slug=all",
        label: "3D Dizayn va Vizualizatsiya"
    },
    {
        key: "3",
        link: "/design-developments/all?slug=all",
        label: "Dizayn shablonlari",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/image.svg",
            alt: "",
            width: 20,
            height: 20
        })
    },
    {
        key: "4",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/chart.svg",
            alt: "",
            width: 20,
            height: 20
        }),
        link: "/templates/all?slug=all",
        label: "Turli sohalar uchun shablonlar"
    },
    {
        key: "5",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/video-square.svg",
            alt: "",
            width: 20,
            height: 20
        }),
        link: "/video-lessons/all?slug=all",
        label: "Video darsliklar"
    },
    {
        key: "6",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/static/svg/monitor.svg",
            alt: "",
            width: 20,
            height: 20
        }),
        link: "/websites/all?slug=all",
        label: "Dasturlash xizmatlari"
    }, 
];
const mainPages = [
    {
        key: "1",
        link: "/",
        label: "Bosh sahifa"
    },
    {
        key: "2",
        link: "/search-page",
        label: "Qidiruv"
    },
    {
        key: "3",
        link: "/orders",
        label: "Barcha xizmatlar"
    },
    {
        key: "4",
        link: "/order/create",
        label: "Yangi buyurtma yaratish"
    },
    {
        key: "5",
        link: "/scientific-resources/all?slug=all",
        label: "Mahsulotlar"
    },
    {
        key: "6",
        link: "https://seller.soff.uz",
        label: "Frilanserlar uchun"
    },
    {
        key: "7",
        link: "/affiliate_program",
        label: "Hamkorlikda ishlash"
    },
    // { key: '4', link: '/freelance', label: 'Frilanserlar' },
    {
        key: "8",
        link: "/soffia",
        label: "Soffia Bot"
    },
    {
        key: "9",
        link: "/page/oferta",
        label: "Foydalanish shartlari"
    },
    {
        key: "10",
        link: "/page/video-list",
        lable: "Video qo'llanmalar"
    }, 
];
const aboutUsPages = [
    {
        key: "1",
        link: "/page/about-us",
        label: "Biz haqimizda"
    },
    {
        key: "3",
        link: "/page/faq",
        label: "Savollar (FAQ)"
    },
    {
        key: "4",
        link: "/page/form",
        label: "Talab va takliflar uchun"
    }, 
];
function Footer() {
    const currentYear = new Date().getFullYear();
    const { data: directions  } = (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_4__/* .useGetDirectionsQuery */ .P5)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().mainblock),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().footerContent),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().footerLogoSection),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: `/static/img/soff_green.png`,
                                    alt: "soff logo",
                                    style: {
                                        width: "200px",
                                        height: "auto"
                                    }
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: footerMenu.soff.path,
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().footerMainTitle),
                                    style: {
                                        fontSize: "20px",
                                        marginTop: "24px",
                                        marginBottom: 0
                                    },
                                    children: "Tayyor mahsulotlar va xizmatlar bir joyda"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        display: "flex",
                                        gap: "16px",
                                        alignItems: "center",
                                        marginTop: "16px"
                                    },
                                    children: footerMenu.social.items.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            style: {
                                                width: index === 1 ? "42px" : "40px"
                                            },
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().socialIcon),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                href: item.url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    src: item.icon,
                                                    alt: item.name
                                                })
                                            })
                                        }, item.url))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "fw-semibold fs-2 text-white",
                                            children: footerMenu.services.title
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: footerMenu.services.links.map((link, i)=>link.link ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                        href: link.link,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            target: "_blank",
                                                            className: "fs-4",
                                                            rel: "noopener noreferrer",
                                                            children: link.name
                                                        })
                                                    })
                                                }, link.link + i) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    className: "fs-4",
                                                    children: link.name
                                                }, i))
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().footerLinksSection),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "fw-semibold fs-2 text-white",
                                            children: "Tayyor mahsulotlar"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: products.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                        href: link.link,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "fs-4",
                                                            rel: "noopener noreferrer",
                                                            children: link.label
                                                        })
                                                    })
                                                }, link.key))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "fw-semibold fs-2 text-white",
                                            children: "Xizmat turlari"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: directions?.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                        href: `/orders?direction=${link.value}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "fs-4",
                                                            rel: "noopener noreferrer",
                                                            children: link.label
                                                        })
                                                    })
                                                }, link.value))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "fw-semibold fs-2 text-white",
                                            children: "Asosiy sahifalar"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: mainPages.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                        href: link.link,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "fs-4",
                                                            rel: "noopener noreferrer",
                                                            children: link.label
                                                        })
                                                    })
                                                }, link.key))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "fw-semibold fs-2 text-white",
                                            children: "Biz haqimizda"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: aboutUsPages.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                        href: `${link.link}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "fs-4",
                                                            rel: "noopener noreferrer",
                                                            children: link.label
                                                        })
                                                    })
                                                }, link.value))
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "d-flex gap-4 justify-content-between mt-5 border-top pt-4 flex-wrap",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            children: [
                                "\xa9 ",
                                currentYear,
                                " Soff.uz — Barcha huquqlar himoyalangan."
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                            href: "/page/oferta",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                children: "\xae Terms | Privacy"
                            })
                        })
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=5366.js.map