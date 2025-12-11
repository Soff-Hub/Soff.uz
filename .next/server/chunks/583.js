"use strict";
exports.id = 583;
exports.ids = [583];
exports.modules = {

/***/ 583:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7840);
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2184);
/* harmony import */ var _image_lightbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3491);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_form_demoBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2109);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper_react__WEBPACK_IMPORTED_MODULE_2__, swiper_modules__WEBPACK_IMPORTED_MODULE_3__, _image_lightbox__WEBPACK_IMPORTED_MODULE_4__]);
([swiper_react__WEBPACK_IMPORTED_MODULE_2__, swiper_modules__WEBPACK_IMPORTED_MODULE_3__, _image_lightbox__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const getYouTubeEmbed = (url)=>{
    if (!url) return null;
    try {
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    } catch  {
        return null;
    }
};
function getYouTubeThumbnail(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}
const ImageCarousel = ({ images , views , demo_link , isProduct =true , slug ,  })=>{
    const { 0: thumbsSwiper , 1: setThumbsSwiper  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: mainSwiper , 1: setMainSwiper  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: activeIndex , 1: setActiveIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: showLeftGradient , 1: setShowLeftGradient  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showRightGradient , 1: setShowRightGradient  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const prevRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const nextRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Fix navigation initialization and track active slide
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (mainSwiper?.params && prevRef.current && nextRef.current) {
            mainSwiper.params.navigation.prevEl = prevRef.current;
            mainSwiper.params.navigation.nextEl = nextRef.current;
            mainSwiper.navigation.init();
            mainSwiper.navigation.update();
            // Track active slide changes and auto-scroll thumbnails
            mainSwiper.on("slideChange", ()=>{
                const newActiveIndex = mainSwiper.activeIndex;
                setActiveIndex(newActiveIndex);
                // Auto-scroll thumbnail swiper to keep active thumbnail visible
                if (thumbsSwiper) {
                    const slidesPerView = thumbsSwiper.params.slidesPerView || 3;
                    const targetSlide = Math.max(0, newActiveIndex - Math.floor(slidesPerView / 2));
                    thumbsSwiper.slideTo(targetSlide, 300);
                }
            });
            // Also handle manual navigation (arrow clicks)
            mainSwiper.on("slideChangeTransitionEnd", ()=>{
                const newActiveIndex = mainSwiper.activeIndex;
                setActiveIndex(newActiveIndex);
                if (thumbsSwiper) {
                    const slidesPerView = thumbsSwiper.params.slidesPerView || 3;
                    const targetSlide = Math.max(0, newActiveIndex - Math.floor(slidesPerView / 2));
                    thumbsSwiper.slideTo(targetSlide, 300);
                }
            });
        }
    }, [
        mainSwiper,
        thumbsSwiper
    ]);
    // Handle thumbnail swiper progress to show/hide gradients
    const handleThumbProgress = (swiper)=>{
        const progress = swiper.progress;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;
        setShowLeftGradient(!isBeginning);
        setShowRightGradient(!isEnd);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "overflow-hidden w-100",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "slider_swiper_container position-relative product-short-view",
            style: {
                maxWidth: "100%",
                overflow: "hidden"
            },
            children: [
                images?.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "imageLigthbox",
                    style: {
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: "999"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_image_lightbox__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        gallery: images
                    })
                }),
                images?.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                    ref: prevRef,
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Oldingi rasm",
                    className: "fa-solid fa-chevron-left image_prev_left",
                    style: {
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: "10",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        padding: "10px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__.Swiper, {
                    modules: [
                        swiper_modules__WEBPACK_IMPORTED_MODULE_3__.Navigation,
                        swiper_modules__WEBPACK_IMPORTED_MODULE_3__.Thumbs
                    ],
                    onSwiper: setMainSwiper,
                    thumbs: {
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    },
                    navigation: false,
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: false,
                    allowTouchMove: true,
                    watchOverflow: true,
                    resistanceRatio: 0,
                    className: "main-swiper",
                    style: {
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        overflow: "hidden",
                        position: "relative"
                    },
                    wrapperProps: {
                        style: {
                            width: "100%",
                            transform: "none !important"
                        }
                    },
                    children: images?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__.SwiperSlide, {
                            style: {
                                width: "100%",
                                flexShrink: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                flex: "0 0 100%"
                            },
                            children: item?.type === "video" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "video-wrapper",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("iframe", {
                                    src: `${getYouTubeEmbed(item.video_url)}?modestbranding=1&rel=0&controls=1&showinfo=0`,
                                    style: {
                                        height: "450px"
                                    },
                                    title: `video-${index}`,
                                    frameBorder: "0",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true
                                })
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "image-wrapper",
                                style: {
                                    width: "100%",
                                    height: "450px",
                                    position: "relative",
                                    overflow: "hidden",
                                    backgroundColor: "#f5f5f5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        position: "relative"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_8___default()), {
                                        src: item?.image_url || item?.thumbUrl || "/static/img/no-document.png",
                                        alt: "Product",
                                        layout: "fill",
                                        objectFit: "contain",
                                        className: "swiper-image rounded-3",
                                        style: {
                                            userSelect: "none"
                                        },
                                        priority: index === 0,
                                        loading: index === 0 ? "eager" : "lazy"
                                    })
                                })
                            })
                        }, `${item.id}-${index}`))
                }),
                images?.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                    ref: nextRef,
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Keyingi rasm",
                    className: "fa-solid fa-chevron-right image_prev_rigth",
                    style: {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: "10",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        padding: "10px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }),
                images?.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "position-relative",
                    children: [
                        showLeftGradient && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "30px",
                                background: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
                                zIndex: 5,
                                pointerEvents: "none"
                            }
                        }),
                        showRightGradient && images?.length > 7 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "30px",
                                background: "linear-gradient(to left, rgba(255,255,255,0.9), transparent)",
                                zIndex: 5,
                                pointerEvents: "none"
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__.Swiper, {
                            modules: [
                                swiper_modules__WEBPACK_IMPORTED_MODULE_3__.Thumbs
                            ],
                            onSwiper: setThumbsSwiper,
                            spaceBetween: 8,
                            slidesPerView: "auto",
                            freeMode: true,
                            watchSlidesProgress: true,
                            centeredSlides: false,
                            allowTouchMove: true,
                            className: "thumbs-swiper mt-2",
                            style: {
                                width: "100%",
                                height: "60px",
                                overflow: "hidden",
                                paddingLeft: "5px",
                                paddingRight: "5px"
                            },
                            breakpoints: {
                                320: {
                                    slidesPerView: 3,
                                    spaceBetween: 6
                                },
                                480: {
                                    slidesPerView: 4,
                                    spaceBetween: 8
                                },
                                768: {
                                    slidesPerView: 5,
                                    spaceBetween: 8
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 10
                                },
                                1200: {
                                    slidesPerView: 7,
                                    spaceBetween: 12
                                }
                            },
                            onProgress: handleThumbProgress,
                            onSlideChange: handleThumbProgress,
                            onReachBeginning: ()=>setShowLeftGradient(false),
                            onReachEnd: ()=>setShowRightGradient(false),
                            children: images?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__.SwiperSlide, {
                                    style: {
                                        width: "75px",
                                        height: "60px",
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: `thumbnail-wrapper ${activeIndex === index ? "active" : ""}`,
                                        style: {
                                            width: "75px",
                                            height: "50px",
                                            border: activeIndex === index ? "3px solid #28a745" : "2px solid #e9ecef",
                                            borderRadius: "8px",
                                            padding: "2px",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            overflow: "hidden",
                                            boxShadow: activeIndex === index ? "0 0 10px rgba(40, 167, 69, 0.3)" : "none",
                                            position: "relative"
                                        },
                                        onClick: ()=>{
                                            if (mainSwiper) {
                                                mainSwiper.slideTo(index);
                                                setActiveIndex(index);
                                                // Auto-scroll thumbnail swiper to show active thumbnail
                                                if (thumbsSwiper) {
                                                    const slidesPerView = thumbsSwiper.params.slidesPerView;
                                                    const targetSlide = Math.max(0, index - Math.floor(slidesPerView / 2));
                                                    thumbsSwiper.slideTo(targetSlide);
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_8___default()), {
                                            src: item?.image_url || item?.thumbUrl || getYouTubeThumbnail(item?.video_url) || "/static/img/no-document.png",
                                            alt: "Thumbnail",
                                            layout: "fill",
                                            quality: 20,
                                            objectFit: "cover",
                                            className: "rounded",
                                            style: {
                                                cursor: "pointer",
                                                userSelect: "none"
                                            },
                                            loading: "lazy"
                                        })
                                    })
                                }, `thumb-${item.id}-${index}`))
                        })
                    ]
                }),
                isProduct && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "views mt-2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-eye"
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: views || 0
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "d-flex align-items-center gap-5 mt-2 flex-wrap justify-content-center",
                            children: [
                                demo_link && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_form_demoBtn__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    demo_link: demo_link
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex gap-2 align-items-center flex-wrap",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.InfoCircleOutlined, {
                                            className: "fs-2 ",
                                            style: {
                                                cursor: "pointer"
                                            }
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: "Mualliflik huquqi buzilgan holatda"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {
                                            href: `/report/${slug}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                    className: "text-success",
                                                    style: {
                                                        cursor: "pointer"
                                                    },
                                                    children: "shikoyat qiling!"
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageCarousel);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);



const DemoButton = ({ demo_link  })=>{
    const { 0: isHovered , 1: setIsHovered  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleClick = ()=>{
        if (demo_link) {
            window.open(demo_link, "_blank"); // yangi tabda ochadi
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            onClick: handleClick,
            onMouseEnter: ()=>setIsHovered(true),
            onMouseLeave: ()=>setIsHovered(false),
            className: "d-flex align-items-center justify-content-center mx-auto border rounded-pill px-4 py-2",
            style: {
                borderColor: isHovered ? "green" : "#e0e0e0",
                backgroundColor: isHovered ? "#f6fff6" : "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                fontWeight: "500",
                fontSize: "16px",
                color: isHovered ? "green" : "black",
                transition: "all 0.3s ease",
                cursor: "pointer"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.EyeOutlined, {
                    style: {
                        color: "green",
                        fontSize: "20px",
                        marginRight: "8px"
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            style: {
                                color: "green",
                                fontWeight: "600"
                            },
                            children: "DEMO"
                        }),
                        " ",
                        "versiyada ko‘rish"
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DemoButton);


/***/ })

};
;
//# sourceMappingURL=583.js.map