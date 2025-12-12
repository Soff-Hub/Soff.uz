"use strict";
exports.id = 7732;
exports.ids = [7732];
exports.modules = {

/***/ 2187:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGetCustomBalance = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(user?.access);
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)({
        queryKey: [
            "getCustomBalance"
        ],
        queryFn: async ()=>{
            const { data  } = await axios.get(`users/wallet`);
            return data;
        },
        retry: 1,
        enabled: !!user?.access,
        refetchOnWindowFocus: true
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGetCustomBalance);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3914:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useCreateOrder)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9752);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useCreateOrder(balanceMode) {
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(user?.access);
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useMutation)({
        mutationFn: async (orderData)=>{
            const { service_id , payment_type , card_number , expire_date , order_id , order_requirement_description , order_requirement_file ,  } = orderData;
            const formData = new FormData();
            if (service_id) formData.append("service_id", service_id);
            formData.append("payment_type", payment_type);
            formData.append("from_balance", balanceMode);
            if (card_number) {
                formData.append("card_number", card_number);
            }
            if (expire_date) {
                formData.append("expire_date", expire_date);
            }
            if (order_id) {
                formData.append("order_id", order_id);
            }
            if (order_requirement_description) {
                formData.append("order_requirement_description", order_requirement_description);
            }
            if (order_requirement_file) {
                formData.append("order_requirement_file", order_requirement_file);
            }
            const reponse = await axios.post("payment/create-service-order/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return reponse.data;
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1653:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ useVerifyCode)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const verifyCode = async ({ token , transaction_id , code  })=>{
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(token);
    const payload = {
        code,
        transaction_id
    };
    const { data  } = await axios.post("payment/verify-card-order/", payload);
    return data;
};
const useVerifyCode = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    const token = user?.access; // tokenni auth’dan olamiz
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useMutation)({
        mutationFn: ({ transaction_id , code  })=>verifyCode({
                token,
                transaction_id,
                code
            })
    });
};
const cardNumber = "9860 3501 4326 6863";

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4547:
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
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8176);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_createOrder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3914);
/* harmony import */ var _api_verifyCode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1653);
/* harmony import */ var _shared_hooks_useCountDown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8314);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9752);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7333);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3701);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1185);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1301);
/* harmony import */ var _components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3215);
/* harmony import */ var react_icons_tb__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6949);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_createOrder__WEBPACK_IMPORTED_MODULE_5__, _api_verifyCode__WEBPACK_IMPORTED_MODULE_6__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_9__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__, react_icons_io5__WEBPACK_IMPORTED_MODULE_11__, react_icons_fa__WEBPACK_IMPORTED_MODULE_12__, _components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__, react_icons_tb__WEBPACK_IMPORTED_MODULE_14__]);
([_api_createOrder__WEBPACK_IMPORTED_MODULE_5__, _api_verifyCode__WEBPACK_IMPORTED_MODULE_6__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_9__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__, react_icons_io5__WEBPACK_IMPORTED_MODULE_11__, react_icons_fa__WEBPACK_IMPORTED_MODULE_12__, _components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__, react_icons_tb__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const ServiceCheckout = ({ document , order_id , order , balanceMode =false , balance , files , description , onClose , onSuccess ,  })=>{
    const verificationModalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { 0: isVerificationModalOpen , 1: setIsVerificationModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: resData , 1: setResData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: type , 1: setType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("card");
    const { mutateAsync: createOrder , isPending: isOrderCreatePending , isSuccess: isOrderCreateSuccess ,  } = (0,_api_createOrder__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(balanceMode);
    const { 0: formattedCardNumber , 1: setFormattedCardNumber  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: numberDate , 1: setNumberDate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { push: push1  } = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.useQueryClient)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const resetVerificationModal = ()=>{
        if (verificationModalRef.current) {
            verificationModalRef.current.reset();
        }
    };
    async function handleClickPayment(e) {
        e.preventDefault();
        await createOrder({
            service_id: document,
            payment_type: type,
            order_id,
            order_requirement_description: description,
            order_requirement_file: files?.[0]?.originFileObj
        }, {
            onSuccess: (data)=>{
                if (onClose) onClose();
                router.push(data.url);
            },
            onError: (err)=>{
                antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err.response.data.detail);
            }
        });
    }
    async function handlePaymePayment(e) {
        e.preventDefault();
        await createOrder({
            service_id: document,
            payment_type: type,
            order_id,
            order_requirement_description: description,
            order_requirement_file: files?.[0]?.originFileObj
        }, {
            onSuccess: (data)=>{
                if (onClose) onClose();
                router.push(data.url);
            },
            onError: (err)=>{
                antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err.response.data.detail);
            }
        });
    }
    // 📌 Oddiy karta raqami orqali to'lov
    async function handleCardPayment(e) {
        e?.preventDefault();
        const payload = {
            service_id: document,
            payment_type: type,
            card_number: formattedCardNumber.replace(/\s/g, ""),
            expire_date: numberDate.replace("/", ""),
            order_requirement_description: description,
            order_requirement_file: files?.[0]?.originFileObj
        };
        if (order_id) payload.order_id = order_id;
        await createOrder(payload, {
            onSuccess: async (data)=>{
                if (data.msg === "Success" && data.payment_method === "wallet") {
                    await queryClient.invalidateQueries({
                        queryKey: [
                            "orders"
                        ]
                    });
                    await queryClient.invalidateQueries({
                        queryKey: [
                            "getCustomBalance"
                        ]
                    });
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.success("To'lov muvaffaqiyatli amalga oshirildi");
                    if (onSuccess) {
                        onSuccess(data?.order_id);
                        return;
                    }
                    if (!order_id) push1("/order/my-orders?tab=2");
                    if (onClose) onClose();
                }
                setIsVerificationModalOpen(true);
                setResData(data);
                resetVerificationModal();
            },
            onError: (err)=>{
                console.error("❌ Click payment error:", err);
                setResData({
                    detail: err?.response?.data?.detail || "Noma'lum xato"
                });
            }
        });
    }
    function handleCancelVerification() {
        setIsVerificationModalOpen(false);
        setResData(null);
    }
    const handleCardNumberChange = (e)=>{
        const inputValue = e.target.value.replace(/\D/g, "");
        let formattedValue = "";
        if (inputValue.length <= 16) {
            for(let i = 0; i < inputValue.length; i++){
                if (i > 0 && i % 4 === 0) {
                    formattedValue += " ";
                }
                formattedValue += inputValue[i];
            }
        }
        setFormattedCardNumber(formattedValue);
    };
    const handleCardNumberDate = (e)=>{
        const inputValue = e.target.value.replace(/\D/g, "");
        let formattedValue = "";
        if (inputValue.length <= 4) {
            for(let i = 0; i < inputValue.length; i++){
                if (i > 0 && i % 2 === 0) {
                    formattedValue += "/";
                }
                formattedValue += inputValue[i];
            }
        }
        setNumberDate(formattedValue);
    };
    const isBalanceSufficient = balance >= order?.price;
    const isInputsDisabled = balanceMode ? isBalanceSufficient : false;
    const isInputsRequired = balanceMode ? !isBalanceSufficient : true;
    const isBalanceMode = isBalanceSufficient && balanceMode;
    const items = [
        {
            key: "card",
            label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "click",
                height: 80,
                width: "auto",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: "/static/img/uzcard_humo.png",
                    alt: "",
                    height: 80,
                    width: "auto"
                })
            }),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChildrenWithInsufficientBalance, {
                        order: order,
                        balance: balance,
                        isVisible: balanceMode && !isBalanceSufficient
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            marginInline: "10px"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            onSubmit: handleCardPayment,
                            className: "pb-3 d-flex align-items-end justify-content-between row gap-4 bg-white",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-xl-7 p-0 my-2",
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "cardNumber",
                                            children: "Karta raqam"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "ccn",
                                            className: "m-0",
                                            style: {
                                                width: "100%"
                                            },
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                                prefix: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_9__.FaRegCreditCard, {
                                                    style: {
                                                        width: "45px",
                                                        fontSize: "20px"
                                                    }
                                                }),
                                                required: isInputsRequired,
                                                disabled: isInputsDisabled,
                                                type: "tel",
                                                // className="form-control rounded-3 card__number"
                                                style: {
                                                    height: "50px"
                                                },
                                                inputMode: "numeric",
                                                maxLength: "19",
                                                placeholder: "0000 0000 0000 0000",
                                                value: formattedCardNumber,
                                                onChange: handleCardNumberChange
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-xl-4 p-0 click-form-item my-2",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        className: "m-0",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                            prefix: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_9__.FaRegCalendarDays, {
                                                style: {
                                                    width: "45px",
                                                    fontSize: "20px"
                                                }
                                            }),
                                            required: isInputsRequired,
                                            disabled: isInputsDisabled,
                                            // className="form-control rounded-3 card__number"
                                            style: {
                                                height: "50px"
                                            },
                                            inputMode: "numeric",
                                            maxLength: "5",
                                            placeholder: "MM/YY",
                                            value: numberDate,
                                            onChange: handleCardNumberDate
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-12 p-0",
                                    children: [
                                        resData?.detail && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            style: {
                                                color: "red",
                                                marginBottom: "0px"
                                            },
                                            children: resData.detail
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            type: "submit",
                                            className: "w-100 ps-btn",
                                            disabled: isOrderCreatePending,
                                            style: {
                                                color: "#fff",
                                                marginTop: "10px"
                                            },
                                            children: isOrderCreatePending ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                                                color: "#fff"
                                            }) : "Davom etish"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__/* .SecurePaymentAlert */ .c, {
                        bordered: false,
                        style: {
                            width: "100%"
                        }
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(VerificationCodeModal, {
                        ref: verificationModalRef,
                        isVerificationModalOpen: isVerificationModalOpen,
                        order_id: order_id,
                        resData: resData,
                        onSuccess: onSuccess,
                        onClose: onClose,
                        closeVerificationModal: ()=>setIsVerificationModalOpen(false),
                        handleCancelVerification: handleCancelVerification,
                        handleCardPayment: handleCardPayment
                    })
                ]
            })
        },
        {
            key: "click",
            label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "click",
                height: 80,
                width: "auto",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: "/static/img/payment-method/click-logo.png",
                    alt: ""
                })
            }),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChildrenWithInsufficientBalance, {
                        order: order,
                        balance: balance,
                        isVisible: balanceMode && !isBalanceSufficient
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            margin: "0 auto"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-4 rounded",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                    onSubmit: handleClickPayment,
                                    className: "pt-3 pb-3 d-flex",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "w-100 ps-btn",
                                        disabled: isOrderCreatePending,
                                        style: {
                                            color: "#fff",
                                            marginTop: "10px"
                                        },
                                        children: !isOrderCreatePending ? "Davom etish" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                                            color: "#fff"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__/* .SecurePaymentAlert */ .c, {
                                    bordered: false,
                                    style: {
                                        width: "100%"
                                    }
                                })
                            ]
                        })
                    })
                ]
            })
        },
        {
            key: "payme",
            label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "click",
                height: 80,
                style: {
                    width: "100%"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: "/static/img/payment-method/payme-logo.png",
                    alt: ""
                })
            }),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChildrenWithInsufficientBalance, {
                        order: order,
                        balance: balance,
                        isVisible: balanceMode && !isBalanceSufficient
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            margin: "0 auto"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-4 rounded",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                    onSubmit: handlePaymePayment,
                                    className: "pt-3 pb-3 d-flex",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "w-100 ps-btn",
                                        disabled: isOrderCreatePending,
                                        style: {
                                            color: "#fff",
                                            marginTop: "10px"
                                        },
                                        children: !isOrderCreatePending ? "Davom etish" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                                            color: "#fff"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__/* .SecurePaymentAlert */ .c, {
                                    bordered: false,
                                    style: {
                                        width: "100%"
                                    }
                                })
                            ]
                        })
                    })
                ]
            })
        }, 
    ];
    return isBalanceMode ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Alert, {
                message: "Sizning balansingizda yetarli mablag' mavjud. To'lovni balansdan to'lash mumkin - karta kerak emas.",
                type: "success",
                showIcon: true,
                style: {
                    marginBlock: "20px"
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "service-details-box bg-white border rounded p-3 mb-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "d-flex justify-content-between align-items-center",
                    style: {
                        gap: "8px"
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "d-flex align-items-start",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        width: "20px"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_11__.IoCard, {
                                        fontSize: 16,
                                        style: {
                                            marginRight: "8px",
                                            marginBottom: "5px"
                                        }
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                    className: "mb-1",
                                    style: {
                                        overflowWrap: "anywhere",
                                        fontWeight: "normal"
                                    },
                                    children: order?.title
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "text-end",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                className: " mb-0",
                                style: {
                                    whiteSpace: "nowrap",
                                    fontWeight: "normal",
                                    fontSize: "16px"
                                },
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(order?.price),
                                    " so'm"
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                type: "submit",
                className: "w-100 ps-btn",
                disabled: isOrderCreatePending,
                onClick: handleCardPayment,
                style: {
                    color: "#fff",
                    marginTop: "10px"
                },
                children: !isOrderCreatePending ? "To'lov qilish" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                    color: "#fff"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_CreditCard2__WEBPACK_IMPORTED_MODULE_13__/* .SecurePaymentAlert */ .c, {
                bordered: false,
                style: {
                    marginTop: "10px"
                }
            })
        ]
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tabs, {
        centered: true,
        style: {
            marginTop: "20px",
            marginBottom: 0
        },
        items: items,
        onChange: setType
    });
};
const ChildrenWithInsufficientBalance = ({ order , balance , isVisible  })=>{
    const extraPayment = order?.price - balance;
    if (!isVisible) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Alert, {
                message: "Balansingizdagi mablag' to'lvoni bir qismini qoplaydi. Qolgan summani karta yoki Click orqali to'lashingiz mumkin.",
                type: "warning",
                showIcon: true,
                style: {
                    marginBottom: "20px"
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "service-details-box bg-white border rounded p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex justify-content-between align-items-center",
                        style: {
                            gap: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex align-items-center",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            width: "20px"
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_11__.IoCard, {
                                            fontSize: 16,
                                            style: {
                                                marginRight: "8px",
                                                marginBottom: "5px"
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        className: "mb-1",
                                        style: {
                                            overflowWrap: "anywhere",
                                            fontWeight: "normal"
                                        },
                                        children: order?.title
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "text-end",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                    className: "mb-0",
                                    style: {
                                        whiteSpace: "nowrap",
                                        fontWeight: "normal",
                                        fontSize: "16px"
                                    },
                                    children: [
                                        (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(order?.price),
                                        " so'm"
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            marginTop: "8px",
                            borderTop: "1px solid #dee2e6"
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex justify-content-between align-items-center",
                        style: {
                            gap: "8px",
                            marginTop: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex align-items-center",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            width: "20px"
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_12__.FaWallet, {
                                            style: {
                                                marginRight: "8px",
                                                marginBottom: "5px"
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        style: {
                                            overflowWrap: "anywhere",
                                            fontWeight: "normal",
                                            marginBottom: "0px"
                                        },
                                        children: "Balans"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "text-end",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                    className: " mb-0",
                                    style: {
                                        whiteSpace: "nowrap",
                                        fontWeight: "normal",
                                        fontSize: "16px"
                                    },
                                    children: [
                                        (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(balance),
                                        " so'm"
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            marginTop: "8px",
                            borderTop: "1px solid #dee2e6"
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex justify-content-between align-items-center",
                        style: {
                            marginTop: "9px",
                            fontWeight: "normal"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: " mb-0",
                                children: "Qoldiq to'lov"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "text-end",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                    className: "mb-0 text-primary fw-bold",
                                    style: {
                                        fontSize: "20px"
                                    },
                                    children: [
                                        (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(extraPayment),
                                        " so'm"
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
const VerificationCodeModal = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({ isVerificationModalOpen , resData , order_id , onSuccess , onClose , closeVerificationModal , handleCancelVerification , handleCardPayment ,  } = props, ref)=>{
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.useQueryClient)();
    const { display , left , reset  } = (0,_shared_hooks_useCountDown__WEBPACK_IMPORTED_MODULE_7__/* .useCountdown */ .au)(120);
    const { mutate: mutateVerifyCode , reset: resetVerifyCode , isPending: isVerifyCodePending , isSuccess: isVerifyCodeSuccess , isError: isVerifyCodeError ,  } = (0,_api_verifyCode__WEBPACK_IMPORTED_MODULE_6__/* .useVerifyCode */ .$)();
    const { 0: code , 1: setCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: resDataCode , 1: setResDataCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // 📌 SMS kodi tasdiqlash
    function handleVerifyCode() {
        setResDataCode(null);
        mutateVerifyCode({
            transaction_id: resData?.transaction_id,
            code
        }, {
            onSuccess: async (data)=>{
                await queryClient.invalidateQueries({
                    queryKey: [
                        "orders"
                    ]
                });
                await queryClient.invalidateQueries({
                    queryKey: [
                        "getCustomBalance"
                    ]
                });
                setResDataCode(data);
                closeVerificationModal();
                if (onSuccess) {
                    onSuccess(data?.order_id, data?.accepted_by_id);
                    return;
                }
                if (!order_id) push("/order/my-orders?tab=2");
                if (onClose) onClose();
            },
            onError: (error)=>{
                console.log("❌ Verify code error:", error);
                const errorMessage = error?.response?.data || {
                    detail: "Noma'lum xato"
                };
                setResDataCode(errorMessage);
            }
        });
    }
    const handleResendCode = async ()=>{
        await handleCardPayment();
        reset();
        resetVerifyCode();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            reset
        }), [
        reset
    ]);
    const isLoadingOrSuccess = isVerifyCodePending || isVerifyCodeSuccess;
    const errorMessage = isVerifyCodeError && Boolean(left) && (typeof resDataCode?.detail == "string" ? resDataCode?.detail : "Noma'lum xato");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        width: 500,
        title: "Tez orada!",
        centered: true,
        open: isVerificationModalOpen,
        onOk: handleVerifyCode,
        onCancel: handleCancelVerification,
        destroyOnClose: true,
        confirmLoading: isLoadingOrSuccess,
        okButtonProps: {
            style: {
                backgroundColor: "green",
                color: "white"
            },
            disabled: isLoadingOrSuccess || !code?.length
        },
        okText: "To'lov qilish",
        cancelText: "Orqaga",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "Kod quyidagi raqamga yuborildi: ",
                        resData?.phone_number
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    onChange: (e)=>setCode(e.target.value),
                    type: "tel",
                    placeholder: "000000",
                    disabled: isVerifyCodePending || isVerifyCodeSuccess,
                    maxLength: 6,
                    className: "form-control text-center rounded-3 fs-3"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                    className: "text-danger",
                    children: left ? display : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_tb__WEBPACK_IMPORTED_MODULE_14__.TbReload, {}),
                        style: {
                            padding: "0px 2px"
                        },
                        type: "link",
                        onClick: handleResendCode,
                        children: "Kodni qayta yuborish"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-danger",
                    children: errorMessage
                })
            ]
        })
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceCheckout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ addPeriodToThousands)
/* harmony export */ });
function addPeriodToThousands(number) {
    const numStr = String(number);
    const [integerPart, decimalPart] = numStr.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const formattedNumber = decimalPart !== undefined ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
    return formattedNumber;
}


/***/ }),

/***/ 8314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "au": () => (/* binding */ useCountdown)
/* harmony export */ });
/* unused harmony exports useCountOrderTime, useCountTimeBack */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);


function useCountdown(secondsStart = 120) {
    const { 0: left , 1: setLeft  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(secondsStart);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (left <= 0) return;
        const id = setInterval(()=>setLeft((s)=>s - 1), 1000);
        return ()=>clearInterval(id);
    }, [
        left
    ]);
    const reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>setLeft(secondsStart), [
        secondsStart
    ]);
    const fmt = (s)=>{
        const m = Math.floor(s / 60), ss = String(s % 60).padStart(2, "0");
        return `${String(m).padStart(2, "0")}:${ss}`;
    };
    return {
        left,
        display: fmt(left),
        reset
    };
}
// Hook: Buyurtma qabul qilingan vaqtdan topshirish muddatigacha qolgan vaqtni hisoblaydi
const useCountOrderTime = (acceptedDate, deliveryDays)=>{
    const { 0: timeLeft , 1: setTimeLeft  } = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    useEffect(()=>{
        // Agar acceptedDate yoki deliveryDays mavjud bo'lmasa, hisoblashni to'xtatamiz
        if (!acceptedDate || !deliveryDays) {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            return;
        }
        // Topshirish muddatini hisoblash (acceptedDate + deliveryDays)
        const deadline = dayjs(acceptedDate).add(deliveryDays, "day");
        // Har soniya yangilanish uchun interval
        const interval = setInterval(()=>{
            const now = dayjs();
            const diff = deadline.diff(now); // Qolgan vaqt (millisekundlarda)
            if (diff <= 0) {
                // Agar vaqt tugagan bo'lsa, intervalni to'xtatamiz
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                clearInterval(interval);
                return;
            }
            // Millisekundlarni kun, soat, daqiqa va soniyalarga aylantirish
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(diff % (1000 * 60) / 1000);
            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });
        }, 1000); // Har soniya yangilash
        // Komponent o'chirilganda intervalni tozalash
        return ()=>clearInterval(interval);
    }, [
        acceptedDate,
        deliveryDays
    ]);
    return timeLeft;
};
const useCountTimeBack = (deadline_date)=>{
    const { 0: timeLeft , 1: setTimeLeft  } = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    useEffect(()=>{
        if (!deadline_date) {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            return;
        }
        const deadline = dayjs(deadline_date);
        const updateTime = ()=>{
            const now = dayjs();
            const diff = deadline.diff(now);
            if (diff <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(diff % (1000 * 60) / 1000);
            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });
        };
        // Boshlang‘ich chaqirish
        updateTime();
        // Har 1 sekundda yangilash
        const interval = setInterval(updateTime, 1000);
        return ()=>clearInterval(interval);
    }, [
        deadline_date
    ]);
    return timeLeft;
};


/***/ })

};
;
//# sourceMappingURL=7732.js.map