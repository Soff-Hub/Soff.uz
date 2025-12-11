"use strict";
exports.id = 7973;
exports.ids = [7973];
exports.modules = {

/***/ 7973:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ getTitleFromSlug)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);




const Option = antd__WEBPACK_IMPORTED_MODULE_3__.Select.Option;
const getTitleFromSlug = (array, slug)=>{
    let title = null;
    if (array && slug) {
        title = array.find((item)=>{
            return item.slug == slug;
        })?.name;
    }
    return title;
};
const ScientificResourcesFilterSection = ({ breacrumb , count , isLoading , childCategoryData ,  })=>{
    const { 0: expanded , 1: setExpanded  } = useState(false);
    const { 0: dropDownMenu , 1: setDropdownMenu  } = useState(false);
    const { 0: childCategoryOpen , 1: setChildCategoryOpen  } = useState(false);
    const router = useRouter();
    if (!router.isReady) return null;
    const { slug , parentCategory , childCategory  } = router.query;
    const subCategory = expanded ? childCategoryData?.results : childCategoryData?.results || null;
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "d-xl-none d-block my-4 container",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "row mx-auto gap-3",
                    children: [
                        /*#__PURE__*/ _jsxs(Select, {
                            className: " col-md-6 col-12 p-0 m-0 mr-md-2",
                            onChange: (value)=>{
                                {
                                    router.push({
                                        pathname: `/scientific-resources/${value}`,
                                        query: {
                                            parentCategory: value
                                        }
                                    });
                                }
                            },
                            defaultValue: parentCategory || "all",
                            style: {
                                height: "42px",
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ _jsxs(Option, {
                                    value: "all",
                                    className: "w-50",
                                    children: [
                                        /*#__PURE__*/ _jsx("i", {
                                            className: "fa-solid fa-list mr-2"
                                        }),
                                        "Barchasi"
                                    ]
                                }, "all"),
                                breacrumb?.results?.map((item, index)=>{
                                    return /*#__PURE__*/ _jsxs(Option, {
                                        value: item.slug,
                                        children: [
                                            item.image && /*#__PURE__*/ _jsx("img", {
                                                className: "rounded-2 me-2",
                                                src: item.image,
                                                alt: item.name,
                                                width: 25
                                            }),
                                            item.name
                                        ]
                                    }, item.slug);
                                })
                            ]
                        }),
                        subCategory && /*#__PURE__*/ _jsxs(Select, {
                            className: "col-md-6 col-12 p-0 m-0 ml-md-2",
                            onChange: (value)=>{
                                {
                                    router.push({
                                        pathname: "/scientific-resources/[slug]",
                                        query: {
                                            ...router.query,
                                            slug: value,
                                            page: 1,
                                            childCategory: value
                                        }
                                    });
                                }
                            },
                            defaultValue: childCategory ? childCategory : "all",
                            style: {
                                height: "42px",
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ _jsxs(Option, {
                                    value: "all",
                                    children: [
                                        /*#__PURE__*/ _jsx("i", {
                                            className: "fa-solid fa-list mr-2"
                                        }),
                                        " Barcha yo'nalish"
                                    ]
                                }, "all"),
                                subCategory.map((item, index)=>{
                                    return /*#__PURE__*/ _jsx(Option, {
                                        value: item.slug,
                                        children: item.name
                                    }, item.slug);
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "d-none d-lg-block",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "subcategoryMenu d-xl-block d-lg-none p-lg-0",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "mb-3 pointer top_search_category justify-content-between",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    onClick: ()=>setDropdownMenu(!dropDownMenu),
                                    className: "Models_category_menu",
                                    children: [
                                        /*#__PURE__*/ _jsx("img", {
                                            src: "/static/img/list-category.svg",
                                            alt: ""
                                        }),
                                        /*#__PURE__*/ _jsx("h1", {
                                            style: {
                                                whiteSpace: "nowrap"
                                            },
                                            children: parentCategory ? breacrumb?.results.find((item)=>{
                                                return item.slug == parentCategory;
                                            })?.name : "Barcha Katalog"
                                        }),
                                        dropDownMenu ? /*#__PURE__*/ _jsx("img", {
                                            src: "/static/img/up-icon.svg",
                                            alt: ""
                                        }) : /*#__PURE__*/ _jsx("img", {
                                            src: "/static/img/down-icon.svg",
                                            alt: ""
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "d-flex gap-3",
                                    children: breacrumb?.results?.filter((item)=>{
                                        return !"audio video template".includes(item.slug);
                                    }).slice(0, 7).map((item, index)=>{
                                        return /*#__PURE__*/ _jsx("div", {
                                            className: "my-2",
                                            children: /*#__PURE__*/ _jsx("div", {
                                                className: `${parentCategory === item.slug ? "bg-success" : ""} category-btn card p-3 shadow-sm rounded-3`,
                                                onClick: ()=>router.push({
                                                        pathname: `/scientific-resources/${item.slug}`,
                                                        query: {
                                                            parentCategory: item.slug
                                                        }
                                                    }),
                                                style: {
                                                    cursor: "pointer"
                                                },
                                                children: /*#__PURE__*/ _jsxs("div", {
                                                    className: "d-flex justify-content-between",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("p", {
                                                            className: `${parentCategory === item.slug ? "bg-success text-white" : ""} category-btn-title m-0 p-0`,
                                                            children: item.name
                                                        }),
                                                        /*#__PURE__*/ _jsx("img", {
                                                            style: {
                                                                width: "26px",
                                                                height: "21px"
                                                            },
                                                            src: item.image,
                                                            alt: item.name
                                                        })
                                                    ]
                                                })
                                            })
                                        }, index);
                                    })
                                })
                            ]
                        }),
                        dropDownMenu && /*#__PURE__*/ _jsx("div", {
                            className: "card p-3",
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "row",
                                children: breacrumb?.results?.map((item, index)=>{
                                    return /*#__PURE__*/ _jsx("div", {
                                        className: "col-2 my-2",
                                        children: /*#__PURE__*/ _jsx("div", {
                                            className: `${parentCategory === item.slug ? "bg-success" : ""} category-btn card p-3 shadow-sm rounded-3`,
                                            onClick: ()=>router.push({
                                                    pathname: `/scientific-resources/${item.slug}`,
                                                    query: {
                                                        parentCategory: item.slug
                                                    }
                                                }) && setDropdownMenu(!dropDownMenu),
                                            style: {
                                                cursor: "pointer"
                                            },
                                            children: /*#__PURE__*/ _jsxs("div", {
                                                className: "d-flex justify-content-between",
                                                children: [
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: `${parentCategory === item.slug ? "bg-success text-white" : ""} category-btn-title m-0 p-0`,
                                                        children: item.name
                                                    }),
                                                    /*#__PURE__*/ _jsx("img", {
                                                        style: {
                                                            width: "26px",
                                                            height: "21px"
                                                        },
                                                        src: item.image,
                                                        alt: item.name
                                                    })
                                                ]
                                            })
                                        })
                                    }, index);
                                })
                            })
                        }),
                        subCategory?.length > 0 && /*#__PURE__*/ _jsx(_Fragment, {
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "ps-breadcrumb-2 py-3 px-xl-0 px-l-0 ",
                                children: /*#__PURE__*/ _jsxs("div", {
                                    className: "subCategoryContainer",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "pointer top_search_category justify-content-between",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "d-flex align-items-center gap-1 pointer text-success text-capitalize",
                                                    onClick: ()=>setChildCategoryOpen(!childCategoryOpen),
                                                    children: [
                                                        "(",
                                                        /*#__PURE__*/ _jsxs("span", {
                                                            children: [
                                                                subCategory.length,
                                                                "+"
                                                            ]
                                                        }),
                                                        ")",
                                                        " ",
                                                        ` `,
                                                        childCategory ? subCategory.find((item)=>item.slug == childCategory)?.name || "Barchasini korish" : "Barchasini korish",
                                                        childCategoryOpen ? /*#__PURE__*/ _jsx("img", {
                                                            src: "/static/img/up-icon-green.svg",
                                                            alt: ""
                                                        }) : /*#__PURE__*/ _jsx("img", {
                                                            src: "/static/img/down-icon-green.svg",
                                                            alt: ""
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "d-flex gap-3",
                                                    children: subCategory.slice(0, 6).map((item, index)=>{
                                                        return /*#__PURE__*/ _jsx("div", {
                                                            className: "my-2",
                                                            children: /*#__PURE__*/ _jsx("div", {
                                                                className: `sub-category-btn p-3`,
                                                                onClick: ()=>router.push({
                                                                        pathname: "/scientific-resources/[slug]",
                                                                        query: {
                                                                            ...router.query,
                                                                            slug: item.slug,
                                                                            page: 1,
                                                                            childCategory: item.slug
                                                                        }
                                                                    }),
                                                                style: {
                                                                    cursor: "pointer"
                                                                },
                                                                children: /*#__PURE__*/ _jsx("div", {
                                                                    className: "d-flex justify-content-between",
                                                                    children: /*#__PURE__*/ _jsx("p", {
                                                                        className: `${childCategory === item.slug ? "text-success text-white" : ""} text-capitalize sub-category-btn-title m-0 p-0`,
                                                                        children: item.name
                                                                    })
                                                                })
                                                            })
                                                        }, index);
                                                    })
                                                })
                                            ]
                                        }),
                                        childCategoryOpen && /*#__PURE__*/ _jsx("div", {
                                            className: "d-flex flex-wrap bg-white shadow-sm rounded-3 p-4",
                                            children: subCategory.map((item, index)=>{
                                                return /*#__PURE__*/ _jsx("div", {
                                                    onClick: ()=>router.push({
                                                            pathname: "/scientific-resources/[slug]",
                                                            query: {
                                                                ...router.query,
                                                                slug: item.slug,
                                                                page: 1,
                                                                childCategory: item.slug
                                                            }
                                                        }) && setChildCategoryOpen(!childCategoryOpen),
                                                    className: `${slug === item.slug ? "active" : ""} pointer text-capitalize col-2 my-1 border`,
                                                    children: item.name
                                                }, index);
                                            })
                                        })
                                    ]
                                })
                            })
                        }),
                        isLoading && /*#__PURE__*/ _jsx(Skeleton.Node, {
                            active: true,
                            className: `skeletion-card small-full-card mb-3`
                        })
                    ]
                })
            })
        ]
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (ScientificResourcesFilterSection)));


/***/ })

};
;
//# sourceMappingURL=7973.js.map