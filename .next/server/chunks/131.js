;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f584f383-e4be-445b-b151-32be77bfe408",e._sentryDebugIdIdentifier="sentry-dbid-f584f383-e4be-445b-b151-32be77bfe408");})();}catch(e){}};
exports.id = 131;
exports.ids = [131];
exports.modules = {

/***/ 3052:
/***/ ((module) => {

// Exports
module.exports = {
	"searchBox": "ProductFilter_searchBox__4RaoR",
	"input": "ProductFilter_input__Rlvl2",
	"searchIcon": "ProductFilter_searchIcon__p0f_f",
	"parent": "ProductFilter_parent__xqK6K",
	"child": "ProductFilter_child__ET_8J",
	"childCat": "ProductFilter_childCat__m8omQ",
	"title": "ProductFilter_title__tDunO",
	"filter": "ProductFilter_filter__SQIWC",
	"carousel": "ProductFilter_carousel__DtfxF",
	"carouselTestWrapper": "ProductFilter_carouselTestWrapper__enkff",
	"carouselTest": "ProductFilter_carouselTest__jJTjn",
	"parentCat": "ProductFilter_parentCat__BND_x",
	"active": "ProductFilter_active__TCPxp",
	"arrow": "ProductFilter_arrow__Le83Z",
	"left": "ProductFilter_left__UhIwG",
	"right": "ProductFilter_right__2ulTh",
	"wrapperBlock": "ProductFilter_wrapperBlock__PRGcQ",
	"block": "ProductFilter_block__ZY7Nb",
	"detail": "ProductFilter_detail__I_lkx"
};


/***/ }),

/***/ 131:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "h": () => (/* binding */ getTitleFromSlug)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3052);
/* harmony import */ var _ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6138);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1834);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9075);
/* harmony import */ var _shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(910);
/* harmony import */ var react_icons_lu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(577);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_7__, react_icons_lu__WEBPACK_IMPORTED_MODULE_9__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_7__, react_icons_lu__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const getTitleFromSlug = (array, slug)=>{
    let title = null;
    if (array && slug) {
        title = array.find((item)=>{
            return item.slug == slug;
        })?.name;
    }
    return title;
};
const ProductFilterSection = ({ child , parent , path , isFile  })=>{
    const { query , pathname , push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const childRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: showParentArrow , 1: setShowParentArrow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showChildArrow , 1: setShowChildArrow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: title , 1: setTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Barchasi");
    const { 0: sybTitle , 1: setSybTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: search , 1: setSearch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { 0: drawerOpen , 1: setDrawerOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { 0: selectedCategory , 1: setSelectedCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: selectedSubCategory , 1: setSelectedSubCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: fileTypes , 1: setFileTypes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: priceRange , 1: setPriceRange  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        0,
        500000
    ]);
    const { 0: pageRange , 1: setPageRange  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        0,
        100
    ]);
    const { search: querySearch  } = query;
    const debouncedSearch = (0,_shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(search, 500);
    // Prevent body scroll when drawer is open
    (0,_shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_8__/* .useDisableWindowScroll */ .a)(drawerOpen);
    const handleParent = (slug, name)=>{
        push({
            pathname: `${path}${slug}`,
            query: {
                ...query,
                parentCategory: slug,
                childCategory: "",
                title: name
            }
        });
        setTitle(name);
        setSybTitle("");
    };
    const handleChild = (slug, name)=>{
        push({
            pathname: `${path}${slug}`,
            query: {
                ...query,
                childCategory: slug,
                title: title
            }
        });
        setSybTitle(name);
    };
    const scrollLeft = (ref)=>{
        ref.current.scrollBy({
            left: -200,
            behavior: "smooth"
        });
    };
    const scrollRight = (ref)=>{
        ref.current.scrollBy({
            left: 200,
            behavior: "smooth"
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const childCont = childRef.current;
        if (!childCont) return;
        setShowChildArrow(childCont.scrollWidth > childCont.clientWidth);
    }, [
        child
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const parentCont = parentRef.current;
        if (!parentCont) return;
        setShowParentArrow(parentCont.scrollWidth > parentCont.clientWidth);
    }, [
        parent
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (debouncedSearch === undefined) return;
        delete query.similar_documents;
        push({
            pathname: `${path}all`,
            query: {
                ...query,
                search: debouncedSearch
            }
        });
    }, [
        debouncedSearch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (query.title) {
            setTitle(query.title);
        }
    }, [
        query.title
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().filter)} container`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().title),
                children: [
                    (title || "Barchasi").replace("-", " "),
                    sybTitle && ` & ${sybTitle.replace(`${title}-`, " ")}`
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12
                },
                children: [
                    !isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                            size: "large",
                            type: "primary",
                            onClick: ()=>setDrawerOpen(true),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_9__.LuSettings2, {
                                fontSize: 20
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().searchBox)} container`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Input, {
                                defaultValue: querySearch || "",
                                allowClear: true,
                                variant: "borderless",
                                onChange: (e)=>setSearch(e.target.value),
                                placeholder: "Qanday mahsulot izlamoqdasiz?",
                                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().input),
                                type: "text"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().searchIcon),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.SearchOutlined, {})
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().carouselTestWrapper),
                children: [
                    showParentArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.LeftOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().left)}`,
                        onClick: ()=>scrollLeft(parentRef)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().carouselTest),
                        ref: parentRef,
                        style: {
                            justifyContent: showParentArrow ? "start" : "center"
                        },
                        children: parent?.map((cat, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                onClick: ()=>handleParent(cat?.slug, cat?.name),
                                className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().parentCat)} ${(query.parentCategory === cat.slug || query.slug === cat.slug) && (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().active)}`,
                                children: cat?.name
                            }, cat.slug))
                    }),
                    showParentArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.RightOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().right)}`,
                        onClick: ()=>scrollRight(parentRef)
                    })
                ]
            }),
            query?.parentCategory && child?.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().carouselTestWrapper),
                children: [
                    showChildArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.LeftOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().left)}`,
                        onClick: ()=>scrollLeft(childRef)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().carouselTest),
                        ref: childRef,
                        style: {
                            justifyContent: showChildArrow ? "start" : "center"
                        },
                        children: child.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                onClick: ()=>handleChild(cat?.slug, cat?.name),
                                className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().childCat)} ${(query.childCategory === cat.slug || query.slug === cat.slug) && (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().active)}`,
                                children: cat?.name
                            }, cat.slug))
                    }),
                    showChildArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.RightOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_10___default().right)}`,
                        onClick: ()=>scrollRight(childRef)
                    })
                ]
            }) : null,
            isMobile && isFile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                    type: "primary",
                    block: true,
                    style: {
                        marginBottom: 30
                    },
                    onClick: ()=>setDrawerOpen(true),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_9__.LuSettings2, {}),
                        "Filtrlarni ochish"
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_6__.Drawer, {
                style: {
                    borderRadius: isMobile ? "20px 20px 0 0" : "0"
                },
                placement: isMobile ? "bottom" : "left",
                onClose: ()=>setDrawerOpen(false),
                open: drawerOpen,
                height: "90%",
                closeIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                    type: "text",
                    shape: "circle",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.CloseOutlined, {
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
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                children: "Kategoriya"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                placeholder: "Kategoriya tanlang",
                                style: {
                                    width: "100%"
                                },
                                allowClear: true,
                                value: query.parentCategory || undefined,
                                onChange: (val)=>{
                                    if (!val) {
                                        setSelectedCategory(undefined);
                                        setSybTitle("");
                                        push({
                                            pathname: `${path}all`,
                                            query: {
                                                ...query,
                                                parentCategory: "",
                                                childCategory: "",
                                                title: "Barchasi"
                                            }
                                        });
                                        setTitle("Barchasi");
                                    } else {
                                        setSelectedCategory(val);
                                        // shu yerda handleParent ishlatyapmiz
                                        const category = parent.find((item)=>item.slug === val);
                                        if (category) handleParent(category.slug, category.name);
                                    }
                                },
                                options: parent.map((item)=>({
                                        label: item.name,
                                        value: item.slug
                                    })),
                                getPopupContainer: (triggerNode)=>triggerNode.parentNode
                            })
                        ]
                    }),
                    query?.parentCategory && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                children: "Sub kategoriya"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                placeholder: "Sub kategoriyani tanlang",
                                style: {
                                    width: "100%"
                                },
                                allowClear: true,
                                value: query.childCategory || undefined,
                                onChange: (val)=>{
                                    if (!val) {
                                        setSelectedSubCategory(undefined);
                                        push({
                                            pathname,
                                            query: {
                                                ...query,
                                                childCategory: "",
                                                title
                                            }
                                        });
                                        setSybTitle("");
                                    } else {
                                        setSelectedSubCategory(val);
                                        const subCategory = child.find((item)=>item.slug === val);
                                        if (subCategory) handleChild(subCategory.slug, subCategory.name);
                                    }
                                },
                                options: child.map((item)=>({
                                        label: item.name,
                                        value: item.slug
                                    })),
                                getPopupContainer: (triggerNode)=>triggerNode.parentNode
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                children: "Fayl turlari"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Checkbox.Group, {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8
                                },
                                value: fileTypes,
                                onChange: (vals)=>setFileTypes(vals),
                                options: [
                                    {
                                        label: "DOCX",
                                        value: ".docx"
                                    },
                                    {
                                        label: "DOC",
                                        value: ".doc"
                                    },
                                    {
                                        label: "PPTX",
                                        value: ".pptx"
                                    },
                                    {
                                        label: "PPT",
                                        value: ".ppt"
                                    },
                                    {
                                        label: "PDF",
                                        value: ".pdf"
                                    }, 
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                children: "Narx oralig‘i"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between"
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_7__/* .formatCurrencyWithSpace */ .O$)(priceRange[0]),
                                            " so'm"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_7__/* .formatCurrencyWithSpace */ .O$)(priceRange[1]),
                                            " so'm"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Slider, {
                                range: true,
                                min: 0,
                                max: 1000000,
                                value: priceRange,
                                onChange: (value)=>setPriceRange(value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                children: "Varoqlar oralig‘i"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between"
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            pageRange[0],
                                            " bet"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            pageRange[1],
                                            " bet"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Slider, {
                                range: true,
                                min: 0,
                                max: 100,
                                value: pageRange,
                                onChange: (value)=>setPageRange(value)
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
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                                block: true,
                                onClick: ()=>{
                                    setSelectedCategory(undefined);
                                    setSelectedSubCategory(undefined);
                                    setFileTypes([]);
                                    setPriceRange([
                                        0,
                                        500000
                                    ]);
                                    setPageRange([
                                        0,
                                        100
                                    ]);
                                    setTitle("Barchasi");
                                    setSybTitle("");
                                    push({
                                        pathname: `${path}all`,
                                        query: {
                                            ...query,
                                            parentCategory: "",
                                            childCategory: "",
                                            title: "Barchasi"
                                        }
                                    });
                                    setDrawerOpen(false);
                                },
                                children: "Filtrni tozalash"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                                type: "primary",
                                block: true,
                                onClick: ()=>{
                                    const filters = {
                                        category: selectedSubCategory || selectedCategory || "",
                                        content_extensions: fileTypes,
                                        price_from: priceRange[0],
                                        price_to: priceRange[1],
                                        from_page: pageRange[0],
                                        to_page: pageRange[1]
                                    };
                                    push({
                                        pathname,
                                        query: {
                                            ...query,
                                            ...filters
                                        }
                                    });
                                    setDrawerOpen(false);
                                },
                                children: "Filtrni qo‘llash"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductFilterSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useDebounce)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7567);


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


/***/ })

};
;
//# sourceMappingURL=131.js.map