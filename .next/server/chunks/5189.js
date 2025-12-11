"use strict";
exports.id = 5189;
exports.ids = [5189];
exports.modules = {

/***/ 1275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useDebounce)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6598);


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

/***/ 1583:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4114);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1301);
/* harmony import */ var react_icons_pi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1154);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6905);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3015);
/* harmony import */ var _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2160);
/* harmony import */ var _shared_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1691);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6603);
/* harmony import */ var _shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1275);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_ri__WEBPACK_IMPORTED_MODULE_4__, react_icons_fa__WEBPACK_IMPORTED_MODULE_5__, react_icons_pi__WEBPACK_IMPORTED_MODULE_6__, react_icons_md__WEBPACK_IMPORTED_MODULE_7__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_10__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_11__, _shared_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__]);
([react_icons_ri__WEBPACK_IMPORTED_MODULE_4__, react_icons_fa__WEBPACK_IMPORTED_MODULE_5__, react_icons_pi__WEBPACK_IMPORTED_MODULE_6__, react_icons_md__WEBPACK_IMPORTED_MODULE_7__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_10__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_11__, _shared_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





















const { Sider  } = antd__WEBPACK_IMPORTED_MODULE_3__.Layout;
const disableLinkStyle = {
    pointerEvents: "none"
};
function Sidebar({ collapsed , onChangeCollapse  }) {
    const { logOutAuth  } = (0,_shared_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z)();
    const { size  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)();
    const isStyleApplicable = (0,_shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(!collapsed, 200);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.profile);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const refresh = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth?.user?.refresh);
    const { 0: lastPathSegment , 1: setLasPathSegment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const profileImg = user?.image;
    const isAuthorized = Boolean(user && Object.keys(user).length);
    const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "Foydalanuvchi";
    const handleLogout = ()=>{
        const data = {
            refresh: refresh
        };
        const res = logOutAuth(data);
        if (res) {
            router.push("/auth/login");
            dispatch((0,_store_auth_slice__WEBPACK_IMPORTED_MODULE_10__/* .logOut */ .ni)());
            dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_11__/* .setSavedPrfileData */ .EE)(null));
        }
    };
    const items = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            {
                key: "sellerproducts",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_4__.RiShoppingBasketFill, {
                    size: 20
                }),
                disabled: !isAuthorized,
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/account/sellerproducts",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        style: !isAuthorized ? disableLinkStyle : {},
                        children: "Sotib olinganlar"
                    })
                })
            },
            {
                key: "my-orders",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaTruck, {
                    size: 20
                }),
                disabled: !isAuthorized,
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/order/my-orders",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        style: !isAuthorized ? disableLinkStyle : {},
                        children: "Buyurtmalarim"
                    })
                })
            },
            {
                key: "divider-1",
                type: "divider"
            },
            {
                key: "wishlist",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaRegHeart, {
                    size: 20
                }),
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/account/wishlist",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        children: "Tanlanganlar"
                    })
                })
            },
            {
                key: "shopping-cart",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_7__.MdOutlineShoppingCart, {
                    size: 20
                }),
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/account/shopping-cart",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        children: "Savatcha"
                    })
                })
            },
            {
                key: "chat",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaRegCommentDots, {
                    size: 20
                }),
                disabled: !isAuthorized,
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/chat",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        style: !isAuthorized ? disableLinkStyle : {},
                        children: "Chat"
                    })
                })
            },
            {
                key: "notification",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaRegBell, {
                    size: 20
                }),
                disabled: !isAuthorized,
                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                    href: "/account/notification",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        style: !isAuthorized ? disableLinkStyle : {},
                        children: "Bildirishnomalar"
                    })
                })
            },
            {
                key: "divider-2",
                type: "divider"
            },
            {
                key: "logout",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_pi__WEBPACK_IMPORTED_MODULE_6__.PiSignOutBold, {
                    size: 20
                }),
                disabled: !isAuthorized,
                label: "Chiqish",
                onClick: handleLogout,
                danger: true
            }, 
        ], [
        isAuthorized
    ]);
    const onClickMenuItem = (menuItem)=>{
        switch(menuItem.key){
            case "sellerproducts":
                router.push("/account/sellerproducts");
                break;
            case "my-orders":
                router.push("/order/my-orders");
                break;
            case "wishlist":
                router.push("/account/wishlist");
                break;
            case "shopping-cart":
                router.push("/account/shopping-cart");
                break;
            case "chat":
                router.push("/chat");
                break;
            case "notification":
                router.push("/account/notification");
                break;
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
    }, []);
    if (size < 650) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Sider, {
        trigger: null,
        width: 300,
        collapsible: true,
        collapsed: collapsed,
        className: "sidebar-layout",
        theme: "light",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    display: "flex",
                    justifyContent: collapsed ? "center" : "end",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingInline: "10px"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: onChangeCollapse,
                    size: collapsed ? "large" : "middle",
                    icon: collapsed ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_7__.MdKeyboardDoubleArrowRight, {
                        size: 20
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_7__.MdKeyboardDoubleArrowLeft, {
                        size: 20
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: "50px",
                            aspectRatio: "1 / 1"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Avatar, {
                            size: 50,
                            src: profileImg,
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaRegUserCircle, {})
                        })
                    }),
                    !collapsed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                style: {
                                    marginBottom: "0px",
                                    overflowWrap: isStyleApplicable && "anywhere"
                                },
                                children: fullName
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                style: {
                                    marginBottom: "0px",
                                    color: "gray",
                                    overflowWrap: isStyleApplicable && "anywhere"
                                },
                                children: user?.phone || user?.email || ""
                            })
                        ]
                    }) : null
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu, {
                mode: "inline",
                selectedKeys: [
                    lastPathSegment
                ],
                onSelect: onClickMenuItem,
                items: items,
                style: {
                    border: "none"
                }
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5189:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1583);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Sidebar__WEBPACK_IMPORTED_MODULE_3__]);
_Sidebar__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function SidebarLayout({ children  }) {
    const { 0: collapsed , 1: setCollapsed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const onChangeCollapse = ()=>{
        setCollapsed((pre)=>!pre);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Layout, {
        style: {
            display: "flex",
            gap: "15px",
            backgroundColor: "transparent"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Sidebar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                collapsed: collapsed,
                onChangeCollapse: onChangeCollapse
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Layout, {
                style: {
                    backgroundColor: "transparent"
                },
                children: children
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarLayout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=5189.js.map