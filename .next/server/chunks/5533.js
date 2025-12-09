;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3b1c23b8-bf11-4862-9c13-4986c9651a9a",e._sentryDebugIdIdentifier="sentry-dbid-3b1c23b8-bf11-4862-9c13-4986c9651a9a");})();}catch(e){}};
"use strict";
exports.id = 5533;
exports.ids = [5533];
exports.modules = {

/***/ 4065:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CommentForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5168);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__, _repositories_api__WEBPACK_IMPORTED_MODULE_4__]);
([axios__WEBPACK_IMPORTED_MODULE_3__, _repositories_api__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function CommentForm({ documentId , fComment  }) {
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: rating , 1: setRating  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!text.trim()) return;
        const token = js_cookie__WEBPACK_IMPORTED_MODULE_2___default().get("token");
        if (!token) {
            antd__WEBPACK_IMPORTED_MODULE_5__.message.error("Token topilmadi. Iltimos, tizimga kiring.");
            return;
        }
        try {
            setLoading(true);
            await axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(`${_repositories_api__WEBPACK_IMPORTED_MODULE_4__/* .baseURL */ .v2}seller/document-review/${documentId}`, {
                text,
                rating,
                replied_to: null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setText("");
            setRating(0); // Rate reset
            antd__WEBPACK_IMPORTED_MODULE_5__.message.success("Izoh muvaffaqiyatli yuborildi!");
        } catch (err) {
            antd__WEBPACK_IMPORTED_MODULE_5__.message.error("Izoh yuborilmadi.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
        onSubmit: handleSubmit,
        className: "mb-5",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                background: "#fff"
            },
            className: "mb-4 p-5 rounded-3",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                    style: {
                        borderRadius: "10px",
                        border: "none",
                        background: "#fff"
                    },
                    className: "w-100 fs-4 ",
                    rows: "5",
                    placeholder: "Izohingizni yozing...",
                    value: text,
                    onChange: (e)=>setText(e.target.value)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "d-flex justify-content-between align-items-center mt-3",
                    children: [
                        !fComment ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Rate, {
                            value: rating,
                            onChange: (value)=>setRating(value),
                            style: {
                                fontSize: 25
                            },
                            allowHalf: true
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "submit",
                            className: "btn fs-4 rounded-5 py-2 px-5 btn-success",
                            disabled: loading,
                            children: loading ? "Yuborilmoqda..." : "Jo'natish"
                        })
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1589:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ CommentList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5168);
/* harmony import */ var _shared_utilities_calculateTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5931);
/* harmony import */ var _replysForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3928);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_api__WEBPACK_IMPORTED_MODULE_5__, _replysForm__WEBPACK_IMPORTED_MODULE_7__]);
([_repositories_api__WEBPACK_IMPORTED_MODULE_5__, _replysForm__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function CommentList({ slug  }) {
    const { 0: comments , 1: setComments  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({
        count: 0,
        results: []
    });
    const { 0: nextUrl , 1: setNextUrl  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const { 0: activeReplyId , 1: setActiveReplyId  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const loadMoreRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)();
    const fetchComments = async (url = `${_repositories_api__WEBPACK_IMPORTED_MODULE_5__/* .baseURL */ .v2}seller/document-reviews/${slug}`)=>{
        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setComments((prev)=>({
                    count: data.count,
                    results: url === `${_repositories_api__WEBPACK_IMPORTED_MODULE_5__/* .baseURL */ .v2}seller/document-reviews/${slug}` ? data.results : [
                        ...prev.results,
                        ...data.results
                    ]
                }));
            setNextUrl(data.next);
        } catch (err) {
            console.error("Comment yuklashda xatolik:", err);
        } finally{
            setLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (slug) {
            setComments({
                count: 0,
                results: []
            });
            fetchComments();
        }
    }, [
        slug
    ]);
    // IntersectionObserver yordamida avtomatik yuklash
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (!nextUrl || loading) return;
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0].isIntersecting) {
                fetchComments(nextUrl);
            }
        }, {
            rootMargin: "100px"
        });
        const trigger = loadMoreRef.current;
        if (trigger) observer.observe(trigger);
        return ()=>{
            if (trigger) observer.unobserve(trigger);
        };
    }, [
        nextUrl,
        loading
    ]);
    if (comments.count === 0) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "border rounded-5 p-5 bg-white",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h5", {
                className: "mb-4 fs-1 d-flex align-items-center gap-2",
                children: [
                    "Izohlar",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "rounded-5 fs-4 text-white bg-success px-3 py-1",
                        children: comments.count || 0
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    maxHeight: "500px",
                    overflowY: "auto",
                    paddingRight: "10px",
                    scrollbarGutter: "stable"
                },
                children: [
                    comments.results.map((comment, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-4 pb-4 border-bottom",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex align-items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            src: "/static/img/ozodbek.png",
                                            alt: "avatar",
                                            width: 50,
                                            height: 50,
                                            className: "rounded-circle"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "w-100",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "d-flex justify-content-between",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "d-flex align-items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                    className: "fs-3",
                                                                    children: [
                                                                        comment.user.first_name,
                                                                        " ",
                                                                        comment.user.last_name
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-muted ms-2",
                                                                    children: (0,_shared_utilities_calculateTime__WEBPACK_IMPORTED_MODULE_6__/* .getTimeAgo */ .pi)(comment.created_at)
                                                                })
                                                            ]
                                                        }),
                                                        comment.rating !== 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Rate, {
                                                            disabled: true,
                                                            allowHalf: true,
                                                            value: comment.rating,
                                                            style: {
                                                                fontSize: 18
                                                            }
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "mt-2 mb-2 fs-4",
                                                    children: comment.text
                                                }),
                                                comment.is_document_owner && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "d-flex gap-4 text-muted fs-6",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                                                        title: "Javob yozish",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            role: "button",
                                                            onClick: ()=>setActiveReplyId(comment.id),
                                                            className: "text-success",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.MessageOutlined, {}),
                                                                " Javob berish"
                                                            ]
                                                        })
                                                    })
                                                }),
                                                activeReplyId === comment.id && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_replysForm__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                                    commentId: comment.id,
                                                    documentId: slug,
                                                    onSuccess: ()=>{
                                                        setActiveReplyId(null);
                                                        fetchComments();
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                comment.replys?.map((reply, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "d-flex align-items-start gap-3 mt-4 ms-5 ps-3 border-start border-3 border-success",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                src: "/static/img/ozodbek.png",
                                                alt: "avatar",
                                                width: 40,
                                                height: 40,
                                                className: "rounded-circle"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "d-flex align-items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                className: "fs-6 text-success",
                                                                children: reply.username
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.CheckCircleFilled, {
                                                                className: "text-success"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "text-muted small",
                                                                children: reply.time
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "mt-1 mb-0",
                                                        children: reply.text
                                                    })
                                                ]
                                            })
                                        ]
                                    }, index))
                            ]
                        }, `${comment.id}-${i}`)),
                    nextUrl && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        ref: loadMoreRef,
                        className: "text-center text-muted py-3",
                        children: loading ? "Yuklanmoqda..." : "Ko‘proq yuklanmoqda..."
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7867:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CommentFormWrapper)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commentForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4065);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5168);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_commentForm__WEBPACK_IMPORTED_MODULE_2__, axios__WEBPACK_IMPORTED_MODULE_3__, _repositories_api__WEBPACK_IMPORTED_MODULE_4__]);
([_commentForm__WEBPACK_IMPORTED_MODULE_2__, axios__WEBPACK_IMPORTED_MODULE_3__, _repositories_api__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function CommentFormWrapper({ slug , id  }) {
    const { 0: canReview , 1: setCanReview  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: hasFirstComment , 1: setHasFirstComment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const token = js_cookie__WEBPACK_IMPORTED_MODULE_5___default().get("token");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const checkPermission = async ()=>{
            try {
                if (token) {
                    const res = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get(`${_repositories_api__WEBPACK_IMPORTED_MODULE_4__/* .baseURL */ .v2}customer/can-review/${slug}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCanReview(res.data.can_review);
                    setHasFirstComment(res.data.has_first_comment);
                }
            } catch (err) {
                console.error("Ruxsat tekshirishda xatolik:", err);
            } finally{
                setLoading(false);
            }
        };
        if (slug) checkPermission();
    }, [
        slug
    ]);
    if (loading) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
        children: "Tekshirilmoqda..."
    });
    if (canReview) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_commentForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                documentId: id,
                fComment: hasFirstComment
            })
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3928:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ReplyForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5168);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_api__WEBPACK_IMPORTED_MODULE_4__, axios__WEBPACK_IMPORTED_MODULE_5__]);
([_repositories_api__WEBPACK_IMPORTED_MODULE_4__, axios__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function ReplyForm({ commentId , documentId , onSuccess  }) {
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleReply = async (e)=>{
        e.preventDefault();
        if (!text.trim()) return;
        const token = js_cookie__WEBPACK_IMPORTED_MODULE_2___default().get("token");
        if (!token) {
            antd__WEBPACK_IMPORTED_MODULE_3__.message.error("Token topilmadi");
            return;
        }
        try {
            setLoading(true);
            await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post(`${_repositories_api__WEBPACK_IMPORTED_MODULE_4__/* .baseURL */ .v2}seller/document-review/${documentId}`, {
                text,
                rating: 0,
                replied_to: commentId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            antd__WEBPACK_IMPORTED_MODULE_3__.message.success("Javob yuborildi");
            setText("");
            if (onSuccess) onSuccess();
        } catch (err) {
            antd__WEBPACK_IMPORTED_MODULE_3__.message.error("Javob yuborilmadi");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleReply,
        className: "mt-3 ms-5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                style: {
                    borderRadius: "10px",
                    border: "none",
                    background: "#f0f0f0"
                },
                className: "form-control mb-2",
                rows: "2",
                placeholder: "Javob yozing...",
                value: text,
                onChange: (e)=>setText(e.target.value)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                type: "submit",
                className: "btn btn-success btn fs-3 px-4",
                disabled: loading,
                children: loading ? "Yuborilmoqda..." : "Yuborish"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ tags)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/details-components/details-actions/tagsComponents.jsx



function TagsComponents({ name  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: `/search-page?keyword=${name}`,
        passHref: true,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "tags_components",
            children: name
        })
    });
}
/* harmony default export */ const tagsComponents = (TagsComponents);

;// CONCATENATED MODULE: ./components/details-components/details-actions/tags.jsx



function Tags({ tag  }) {
    const filteredTags = tag?.filter((item)=>item?.name && item.name.trim() !== "");
    if (!filteredTags || filteredTags.length === 0) {
        return null;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "d-flex align-items-center gap-3 mb-3 flex-wrap mt-4",
        children: tag?.filter((item)=>item?.name && item.name.trim() !== "").map((item, i)=>/*#__PURE__*/ jsx_runtime_.jsx(tagsComponents, {
                name: item.name || item
            }, i))
    });
}
/* harmony default export */ const tags = (Tags);


/***/ })

};
;
//# sourceMappingURL=5533.js.map