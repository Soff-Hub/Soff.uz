exports.id = 9516;
exports.ids = [9516];
exports.modules = {

/***/ 3687:
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

/***/ 6070:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hX": () => (/* binding */ getTitleFromSlug)
/* harmony export */ });
/* unused harmony export clearEmptyQueries */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3687);
/* harmony import */ var _ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1275);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6603);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1064);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3701);
/* harmony import */ var _shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9187);
/* harmony import */ var react_icons_lu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(577);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9752);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_useApi__WEBPACK_IMPORTED_MODULE_6__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_8__, react_icons_lu__WEBPACK_IMPORTED_MODULE_10__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__]);
([_repositories_useApi__WEBPACK_IMPORTED_MODULE_6__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_8__, react_icons_lu__WEBPACK_IMPORTED_MODULE_10__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const getTitleFromSlug = (array, slug)=>{
    let title = null;
    if (array && slug) {
        title = array.find((item)=>{
            return item.slug == slug;
        })?.name;
    }
    return title;
};
const clearEmptyQueries = (obj)=>{
    const newObj = {
        ...obj
    };
    Object.keys(newObj).forEach((key)=>{
        if (!String(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
};
const ProductFilterSection = ({ child , parent , path , isFile , title  })=>{
    const { 0: showParentArrow , 1: setShowParentArrow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showChildArrow , 1: setShowChildArrow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: search , 1: setSearch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { 0: drawerOpen , 1: setDrawerOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const childRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { query , push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { search: querySearch , parentCategory , childCategory  } = query;
    const debouncedSearch = (0,_shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(search, 500);
    const handleParent = (slug, id)=>{
        const newQuery = clearEmptyQueries(query);
        push({
            pathname: `${path}${slug}`,
            query: {
                ...newQuery,
                parentCategory: slug,
                parentCategoryId: id
            }
        });
    };
    const handleChild = (slug, id)=>{
        const newQuery = clearEmptyQueries(query);
        push({
            pathname: `${path}${slug}`,
            query: {
                ...newQuery,
                childCategory: slug,
                childCategoryId: id
            }
        });
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
            pathname: query.pathname,
            query: {
                ...query,
                search: debouncedSearch
            }
        });
    }, [
        debouncedSearch
    ]);
    (0,_shared_hooks_useDisableWindowScroll__WEBPACK_IMPORTED_MODULE_9__/* .useDisableWindowScroll */ .a)(drawerOpen);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().filter)} container`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().title),
                children: title ? title.split("-").join("&") : "Barcha mahsulotlar"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12
                },
                children: [
                    !isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Button, {
                        size: "large",
                        type: "primary",
                        onClick: ()=>setDrawerOpen(true),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_10__.LuSettings2, {
                            fontSize: 20
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().searchBox)} container`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Input, {
                                defaultValue: querySearch || "",
                                allowClear: true,
                                variant: "borderless",
                                onChange: (e)=>setSearch(e.target.value),
                                placeholder: "Qanday mahsulot izlamoqdasiz?",
                                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().input),
                                type: "text"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().searchIcon),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.SearchOutlined, {})
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().carouselTestWrapper),
                children: [
                    showParentArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.LeftOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().left)}`,
                        onClick: ()=>scrollLeft(parentRef)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().carouselTest),
                        ref: parentRef,
                        style: {
                            justifyContent: showParentArrow ? "start" : "center"
                        },
                        children: parent?.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                onClick: ()=>handleParent(cat.slug, cat.id),
                                className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().parentCat)} ${(parentCategory === cat.slug || query.slug === cat.slug) && (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().active)}`,
                                children: cat.name
                            }, cat.id))
                    }),
                    showParentArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.RightOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().right)}`,
                        onClick: ()=>scrollRight(parentRef)
                    })
                ]
            }),
            parentCategory && child?.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().carouselTestWrapper),
                children: [
                    showChildArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.LeftOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().left)}`,
                        onClick: ()=>scrollLeft(childRef)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().carouselTest),
                        ref: childRef,
                        style: {
                            justifyContent: showChildArrow ? "start" : "center"
                        },
                        children: child.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                onClick: ()=>handleChild(cat?.slug, cat?.id),
                                className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().childCat)} ${(childCategory === cat.slug || query.slug === cat.slug) && (_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().active)}`,
                                children: cat?.name
                            }, cat.slug))
                    }),
                    showChildArrow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.RightOutlined, {
                        className: `${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().arrow)} ${(_ProductFilter_module_scss__WEBPACK_IMPORTED_MODULE_12___default().right)}`,
                        onClick: ()=>scrollRight(childRef)
                    })
                ]
            }) : null,
            isMobile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_7__.Button, {
                type: "primary",
                block: true,
                style: {
                    marginBottom: 30
                },
                onClick: ()=>setDrawerOpen(true),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_10__.LuSettings2, {}),
                    "Filtrlarni ochish"
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProductFilterForm, {
                open: drawerOpen,
                onClose: ()=>setDrawerOpen(false),
                path: path,
                isFile: isFile,
                parent: parent,
                child: child
            })
        ]
    });
};
const ProductFilterForm = ({ open , onClose , path , isFile , parent , child  })=>{
    const { 0: selectedCategory , 1: setSelectedCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        slug: null,
        id: null
    });
    const { 0: selectedSubCategory , 1: setSelectedSubCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        slug: null,
        id: null
    });
    const { 0: fileTypes , 1: setFileTypes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: priceRange , 1: setPriceRange  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        0,
        500000
    ]);
    const { 0: pageRange , 1: setPageRange  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        0,
        100
    ]);
    const isEnableChanged = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { query , push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const isChildOptionsEnabled = open && (Boolean(selectedCategory?.slug) && selectedCategory?.slug !== query.parentCategory || isEnableChanged.current);
    const { data: childData , isFetchingChildData  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__.useQuery)({
        queryKey: [
            "child-categories",
            selectedCategory?.slug
        ],
        queryFn: async ()=>{
            const res = await fetch(`${_repositories_useApi__WEBPACK_IMPORTED_MODULE_6__/* .baseUrlUseApi */ .q}customer/four-child?direction=file&parent__slug=${selectedCategory?.slug}`);
            isEnableChanged.current = true;
            return await res.json();
        },
        enabled: isChildOptionsEnabled
    });
    const parentOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return parent?.map((item)=>({
                label: item.name,
                value: item.slug,
                id: item.id
            }));
    }, [
        parent
    ]);
    const childOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (childData?.results && childData.results.length) {
            return childData.results.map((item)=>({
                    label: item.name,
                    value: item.slug,
                    id: item.id
                }));
        }
        return child?.map((item)=>({
                label: item.name,
                value: item.slug,
                id: item.id
            }));
    }, [
        child,
        childData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open) {
            setSelectedCategory({
                slug: query.parentCategory,
                id: query.parentCategoryId
            });
            setSelectedSubCategory({
                slug: query.childCategory,
                id: query.childCategoryId
            });
            setFileTypes(query.content_extensions ? Array.isArray(query.content_extensions) ? query.content_extensions : [
                query.content_extensions
            ] : []);
            setPriceRange([
                query.price_from ? Number(query.price_from) : 0,
                query.price_to ? Number(query.price_to) : 500000, 
            ]);
            setPageRange([
                query.from_page ? Number(query.from_page) : 0,
                query.to_page ? Number(query.to_page) : 100, 
            ]);
        }
    }, [
        open
    ]);
    const handleSaveOnClose = ()=>{
        const filters = {
            parentCategory: selectedCategory.slug,
            childCategory: selectedSubCategory.slug,
            content_extensions: fileTypes,
            price_from: priceRange[0],
            price_to: priceRange[1],
            from_page: pageRange[0],
            to_page: pageRange[1]
        };
        const newQuery = clearEmptyQueries({
            ...query,
            ...filters
        });
        push({
            pathname: `${path}${selectedSubCategory.slug || selectedCategory.slug || "all"}`,
            query: newQuery
        });
        onClose();
    };
    const handleClear = ()=>{
        push({
            pathname: `${path}all`,
            query: {}
        });
        onClose();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_7__.Drawer, {
        destroyOnClose: true,
        style: {
            borderRadius: isMobile ? "20px 20px 0 0" : "0"
        },
        placement: isMobile ? "bottom" : "left",
        onClose: handleSaveOnClose,
        open: open,
        height: "90%",
        closeIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Button, {
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
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Select, {
                        placeholder: "Kategoriya tanlang",
                        style: {
                            width: "100%"
                        },
                        allowClear: true,
                        defaultValue: query.parentCategory || undefined,
                        onChange: (val, valObj)=>{
                            if (!val) {
                                setSelectedCategory(undefined);
                            } else {
                                setSelectedCategory({
                                    slug: val,
                                    id: valObj.id
                                });
                            }
                        },
                        options: parentOptions,
                        getPopupContainer: (triggerNode)=>triggerNode.parentNode
                    })
                ]
            }),
            selectedCategory?.slug && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        children: "Sub kategoriya"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Select, {
                        loading: isFetchingChildData,
                        placeholder: "Sub kategoriyani tanlang",
                        style: {
                            width: "100%"
                        },
                        allowClear: true,
                        defaultValue: query.childCategory || undefined,
                        onChange: (val, valObj)=>{
                            if (!val) {
                                setSelectedSubCategory(undefined);
                            } else {
                                setSelectedSubCategory({
                                    slug: val,
                                    id: valObj.id
                                });
                            }
                        },
                        options: childOptions,
                        getPopupContainer: (triggerNode)=>triggerNode.parentNode
                    })
                ]
            }),
            isFile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        children: "Fayl turlari"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Checkbox.Group, {
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
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_8__/* .formatCurrencyWithSpace */ .O$)(priceRange[0]),
                                    " so'm"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_8__/* .formatCurrencyWithSpace */ .O$)(priceRange[1]),
                                    " so'm"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Slider, {
                        range: true,
                        min: 0,
                        max: 1000000,
                        value: priceRange,
                        onChange: (value)=>setPriceRange(value)
                    })
                ]
            }),
            isFile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Slider, {
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
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Button, {
                        block: true,
                        onClick: handleClear,
                        children: "Filtrni tozalash"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Button, {
                        type: "primary",
                        block: true,
                        onClick: handleSaveOnClose,
                        children: "Filtrni qo‘llash"
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

/***/ 4345:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ProductsByCategory)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entities_product_product_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1169);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_entities_product_product_card__WEBPACK_IMPORTED_MODULE_4__]);
_entities_product_product_card__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function ProductsByCategory({ data =[] , page , handlePagination ,  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-2 row-gap-md-5 row-gap-lg-3 mb-5",
                children: data?.results?.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col px-1 px-md-3 px-lg-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_product_product_card__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            product: item
                        })
                    }, item.id))
            }),
            (data?.count == 0 || !data) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "ps-page-status",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-section__content",
                        style: {
                            paddingInline: "15px"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: "/static/img/noinfo.svg",
                                alt: "Ma'lumot topilmadi"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                children: "\uD83D\uDE15 Bu yerda hozircha hech narsa yo‘q..."
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Ammo bu siz uchun ajoyib imkoniyat! Birinchilardan bo‘lib ushbu kategoriyaga mahsulot joylashtiring, o‘z auditoriyangizni yarating va daromad olishni boshlang. Imkoniyatni qo‘ldan boy bermang!"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: "https://seller.soff.uz",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        target: "_blank",
                                        children: "Sotuvchi bo'lish"
                                    })
                                })
                            })
                        ]
                    })
                })
            }),
            data?.count >= 50 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-flex justify-content-center my-5",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Pagination, {
                    className: "text-success",
                    total: data?.count,
                    pageSize: 50,
                    responsive: true,
                    showSizeChanger: false,
                    current: page,
                    onChange: (e)=>handlePagination(e)
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=9516.js.map