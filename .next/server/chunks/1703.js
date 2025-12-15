"use strict";
exports.id = 1703;
exports.ids = [1703];
exports.modules = {

/***/ 8172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);



const PhoneNumberModal = ({ open , onCancel , onSubmit , loading  })=>{
    const [form] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const handleSubmit = (values)=>{
        const phoneNumber = "+998" + values.phone;
        onSubmit(phoneNumber);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        title: "Telefon raqamni kiriting",
        open: open,
        onCancel: onCancel,
        footer: null,
        centered: true,
        closable: !loading,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Alert, {
                description: "Buyurtma berishda iltimos, telefon raqamingizni kiriting. Savollar yuzaga kelganda siz bilan bog‘lana olishimiz uchun muhim.",
                type: "warning",
                showIcon: true
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
                form: form,
                layout: "vertical",
                onFinish: handleSubmit,
                style: {
                    marginTop: "20px"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "phone",
                        label: "Telefon raqam",
                        rules: [
                            {
                                required: true,
                                message: "Telefon raqam kiritish majburiy"
                            },
                            {
                                pattern: /^\d{9}$/,
                                message: "Iltimos, haqiqiy telefon raqam kiriting"
                            }, 
                        ],
                        normalize: (value)=>value.replace(/\D/g, "").slice(0, 9),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            autoComplete: "off",
                            style: {
                                height: "50px",
                                fontSize: "16px"
                            },
                            type: "text",
                            placeholder: "Telefon raqam",
                            addonBefore: "+998",
                            disabled: loading
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        style: {
                            marginBottom: 0,
                            marginTop: "24px"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            type: "primary",
                            htmlType: "submit",
                            loading: loading,
                            block: true,
                            style: {
                                height: "45px",
                                fontSize: "16px"
                            },
                            children: loading ? "Yuborilmoqda..." : "Tasdiqlash"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhoneNumberModal);


/***/ }),

/***/ 1703:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "k": () => (/* binding */ Info)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6400);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1904);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3701);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7840);
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2184);
/* harmony import */ var _shared_hooks_useTelegram__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5047);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9880);
/* harmony import */ var _components_order_PhoneNumberModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8172);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_9__, swiper_react__WEBPACK_IMPORTED_MODULE_10__, swiper_modules__WEBPACK_IMPORTED_MODULE_11__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_13__]);
([_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_9__, swiper_react__WEBPACK_IMPORTED_MODULE_10__, swiper_modules__WEBPACK_IMPORTED_MODULE_11__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















const { TextArea  } = antd__WEBPACK_IMPORTED_MODULE_1__.Input;
const CreateOrderModal = ({ open , onClose , id , seller , sellerInfo , defaultDirection , onSuccess ,  })=>{
    const [form] = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
    const { tg  } = (0,_shared_hooks_useTelegram__WEBPACK_IMPORTED_MODULE_12__/* .useTelegram */ .f)();
    const budget = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useWatch("budget", form);
    const categoryId = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useWatch("category_id", form);
    const { 0: direction , 1: setDirection  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("scientific_work");
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.auth);
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const { 0: confirmOpen , 1: setConfirmOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: showLeftGradient , 1: setShowLeftGradient  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: showRightGradient , 1: setShowRightGradient  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const { 0: files , 1: setFiles  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: phoneModalOpen , 1: setPhoneModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: pendingOrderData , 1: setPendingOrderData  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        form.setFieldValue("direction", direction);
    }, [
        direction
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (defaultDirection) {
            setDirection(defaultDirection);
            form.setFieldValue("direction", defaultDirection);
        }
    }, [
        defaultDirection
    ]);
    const { data: directions  } = (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_13__/* .useGetDirectionsQuery */ .P5)();
    const { data: categories  } = (0,_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__/* .useFGet */ .oh)([
        "direction-categories",
        direction
    ], `categories/?direction=${direction}`, {
        enabled: !!direction
    });
    const { data: priceData  } = (0,_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__/* .useFGet */ .oh)([
        "price-range",
        direction,
        categoryId
    ], `categories/?direction=${direction}&category_id=${categoryId}`, {
        enabled: !!direction && !!categoryId
    });
    const priceList = priceData?.[0]?.service_delivery_price_options?.[0]?.price?.slice(0, 5);
    const minPrice = priceList ? priceList[0]?.amount : 2000;
    const { mutate: createOrder , isPending  } = (0,_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__/* .useFPost */ .PQ)({
        url: "order/custom-order",
        token: user?.access,
        onSuccess: (data)=>{
            form.resetFields();
            onClose();
            antd__WEBPACK_IMPORTED_MODULE_1__.message.success("Buyurtma muvaffaqiyatli yaratildi!");
            tg?.close();
            push(`/order/my-orders?orderId=${data?.id}`);
            setConfirmOpen(false);
        },
        onError: (err)=>{
            const errorMsg = err?.response?.data?.detail || err?.response?.data?.message || "Noma’lum xato yuz berdi";
            antd__WEBPACK_IMPORTED_MODULE_1__.message.error(errorMsg);
        }
    });
    const { mutate: createDirectOrder , isPending: createPending  } = (0,_hooks_useFApi__WEBPACK_IMPORTED_MODULE_4__/* .useFPost */ .PQ)({
        url: "order/direct-order",
        token: user?.access,
        onSuccess: (data)=>{
            antd__WEBPACK_IMPORTED_MODULE_1__.message.success("Buyurtma muvaffaqiyatli yuborildi!");
            if (onSuccess) {
                onSuccess({
                    id: data?.id,
                    price: form.getFieldValue("budget"),
                    title: form.getFieldValue("title")
                });
            } else {
                push(`/order/${data?.id}`);
            }
            form.resetFields();
            onClose();
            setConfirmOpen(false);
        },
        onError: (err)=>{
            setConfirmOpen(false);
            const errorData = err?.response?.data;
            const errorDetail = errorData?.detail || errorData?.message || err.message;
            if (errorDetail.includes("telefon raqam")) {
                const values = form.getFieldsValue();
                const order = {
                    direction: direction,
                    category_id: values.category_id,
                    title: form.getFieldValue("title"),
                    description: values.description,
                    language: values.language,
                    budget: values.budget,
                    deadline_date: `${dayjs__WEBPACK_IMPORTED_MODULE_5___default()(values.deadline_date).format("YYYY-MM-DD")} ${dayjs__WEBPACK_IMPORTED_MODULE_5___default()(values.deadline_time).format("HH:mm")}`
                };
                setPendingOrderData({
                    order,
                    files
                });
                setPhoneModalOpen(true);
            }
            const errorMsg = errorDetail || "Noma'lum xato yuz berdi";
            antd__WEBPACK_IMPORTED_MODULE_1__.message.error(errorMsg);
        }
    });
    const handleFinish = ()=>{
        setConfirmOpen(true);
    };
    const handleConfirm = ()=>{
        const values = form.getFieldsValue();
        const order = {
            direction: direction,
            category_id: values.category_id,
            title: form.getFieldValue("title"),
            description: values.description,
            language: values.language,
            budget: values.budget,
            deadline_date: `${dayjs__WEBPACK_IMPORTED_MODULE_5___default()(values.deadline_date).format("YYYY-MM-DD")} ${dayjs__WEBPACK_IMPORTED_MODULE_5___default()(values.deadline_time).format("HH:mm")}`
        };
        if (id) order.seller_id = id;
        const fd = new FormData();
        for (const [key, value] of Object.entries(order)){
            fd.append(key, value);
        }
        if (files && files.length > 0) {
            fd.append("file", files[0].originFileObj);
        }
        if (id) {
            createDirectOrder(fd);
        } else {
            createOrder(fd);
        }
    };
    const handlePhoneSubmit = (phoneNumber)=>{
        if (!pendingOrderData) return;
        const fd = new FormData();
        // Use pending order data
        for (const [key, value] of Object.entries(pendingOrderData.order)){
            fd.append(key, value);
        }
        if (id) fd.append("seller_id", id);
        // Add phone number
        fd.append("contact_phonenumber", phoneNumber);
        // Add file if exists
        if (pendingOrderData.files && pendingOrderData.files.length > 0) {
            fd.append("file", pendingOrderData.files[0].originFileObj);
        }
        setPhoneModalOpen(false);
        createDirectOrder(fd);
    };
    const handlePhoneModalCancel = ()=>{
        setPhoneModalOpen(false);
        setPendingOrderData(null);
    };
    const handleThumbProgress = (swiper)=>{
        const progress = swiper.progress;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;
        setShowLeftGradient(!isBeginning);
        setShowRightGradient(!isEnd);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                width: 600,
                title: seller ? `${seller} uchun maxsus buyurtma berish` : "Maxsus buyurtma yaratish",
                open: open,
                onCancel: onClose,
                footer: null,
                style: {
                    zIndex: 11100
                },
                centered: true,
                children: [
                    seller && sellerInfo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "user-card mb-3 p-3 rounded-4",
                        style: {
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "1px solid #e8e8e8"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "d-flex align-items-center gap-1 justify-content-between",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex align-items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "user-avatar d-flex align-items-center justify-content-center rounded-circle",
                                            style: {
                                                width: "50px",
                                                overflow: "hidden",
                                                aspectRatio: "1/1",
                                                background: "#fff",
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color: "#667eea"
                                            },
                                            children: sellerInfo?.image ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                className: "rounded-circle object-fit-cover",
                                                style: {
                                                    width: "50px",
                                                    aspectRatio: "1/1"
                                                },
                                                src: sellerInfo.image,
                                                alt: "No"
                                            }) : seller?.charAt(0)?.toUpperCase()
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "d-flex align-items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                                            className: "m-0 text-white fw-bold",
                                                            children: seller
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "verified-badge",
                                                            style: {
                                                                color: "#4CAF50",
                                                                fontSize: "16px"
                                                            },
                                                            children: "✓"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "d-flex align-items-center gap-1 position-relative text-white-50 small",
                                                    style: {
                                                        bottom: "3px"
                                                    },
                                                    children: sellerInfo?.position || "No profession"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-end"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Form, {
                        form: form,
                        layout: "vertical",
                        onFinish: handleFinish,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                name: "direction",
                                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "m-0 text-dark",
                                        children: "Yo’nalishni tanlang"
                                    })
                                }),
                                rules: [
                                    {
                                        required: true,
                                        message: "Yo'nalish tanlang!"
                                    }, 
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                                    onChange: (val)=>{
                                        setDirection(val);
                                        form.resetFields([
                                            "category_id"
                                        ]);
                                        form.setFieldValue("title", "");
                                    },
                                    placeholder: "",
                                    options: directions
                                })
                            }),
                            direction && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                name: "category_id",
                                label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex align-items-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "m-0 text-dark",
                                            children: "Kategoriya tanlang"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Info, {
                                            title: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.category.info */ .X.category.info
                                        })
                                    ]
                                }),
                                rules: [
                                    {
                                        required: true,
                                        message: "Kategoriya tanlang!"
                                    }, 
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                                    onSelect: (_, option)=>{
                                        form.setFieldValue("title", (0,_shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .titleDescription */ .f)(option?.label));
                                    },
                                    placeholder: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.category.placeholder */ .X.category.placeholder(directions),
                                    options: categories?.map((cat)=>({
                                            label: cat?.title,
                                            value: cat?.id
                                        }))
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    marginBottom: "20px"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                        name: "description",
                                        style: {
                                            marginBottom: "15px"
                                        },
                                        label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "d-flex align-items-center align-items-sm-center",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "m-0 text-dark",
                                                    children: "Buyurtma tavsifini kiriting"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Info, {
                                                    title: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.description.info */ .X.description.info
                                                })
                                            ]
                                        }),
                                        rules: [
                                            {
                                                required: true,
                                                message: "Buyurtma tavsifini yozing!"
                                            }, 
                                        ],
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TextArea, {
                                            style: {
                                                resize: "none"
                                            },
                                            rows: 6,
                                            placeholder: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.description.placeholder */ .X.description.placeholder
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Upload, {
                                        fileList: files,
                                        multiple: false,
                                        listType: "picture",
                                        className: "custom-order-file-upload",
                                        name: "file",
                                        maxCount: 1,
                                        beforeUpload: ()=>{
                                            return false;
                                        },
                                        onChange: (e)=>{
                                            const { file , fileList  } = e;
                                            if (file) {
                                                const maxSize = 50 * 1024 * 1024;
                                                if (file.size > maxSize) {
                                                    antd__WEBPACK_IMPORTED_MODULE_1__.message.error("Fayl 50 MB dan katta bo'lishi mumkin emas");
                                                    return;
                                                }
                                                setFiles(fileList);
                                            }
                                        },
                                        onRemove: ()=>setFiles(null),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-paperclip"
                                            }),
                                            children: "Fayl yuklash (ixtiyoriy)"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                name: "language",
                                label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "d-flex align-items-center text-wrap align-items-sm-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "m-0 text-dark",
                                        children: "Buyurtma tili"
                                    })
                                }),
                                rules: [
                                    {
                                        required: true,
                                        message: "Bajarilish tilini tanlang!"
                                    }, 
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                                    placeholder: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.lang.placeholder */ .X.lang.placeholder,
                                    options: [
                                        {
                                            label: "O'zbekcha",
                                            value: "uzb"
                                        },
                                        {
                                            label: "Ruscha",
                                            value: "rus"
                                        },
                                        {
                                            label: "Ingilizcha",
                                            value: "eng"
                                        }, 
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                name: "budget",
                                label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex align-items-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "m-0 text-dark",
                                            children: "Byudjetingizni kiriting"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Info, {
                                                title: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.price.info */ .X.price.info
                                            })
                                        })
                                    ]
                                }),
                                rules: [
                                    {
                                        required: true,
                                        message: "Narx kiriting!"
                                    }
                                ],
                                style: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.InputNumber, {
                                        min: minPrice,
                                        style: {
                                            width: "100%"
                                        },
                                        placeholder: _shared_constants_createOrder__WEBPACK_IMPORTED_MODULE_8__/* .inputInfoToCreateOrder.price.placeholder */ .X.price.placeholder,
                                        formatter: (value)=>value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "",
                                        parser: (value)=>value.replace(/\s/g, "").replace(/[^\d]/g, ""),
                                        value: budget,
                                        onChange: (val)=>form.setFieldValue("budget", val)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "my-3 position-relative",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                                                showRightGradient && priceList?.length > 7 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
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
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_10__.Swiper, {
                                                    modules: [
                                                        swiper_modules__WEBPACK_IMPORTED_MODULE_11__.Thumbs
                                                    ],
                                                    spaceBetween: 8,
                                                    slidesPerView: "auto",
                                                    freeMode: true,
                                                    watchSlidesProgress: true,
                                                    centeredSlides: false,
                                                    allowTouchMove: true,
                                                    className: "thumbs-swiper mt-2",
                                                    style: {
                                                        width: "100%",
                                                        overflow: "hidden",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px"
                                                    },
                                                    onProgress: handleThumbProgress,
                                                    onSlideChange: handleThumbProgress,
                                                    onReachBeginning: ()=>setShowLeftGradient(false),
                                                    onReachEnd: ()=>setShowRightGradient(false),
                                                    children: priceList?.map((option, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_10__.SwiperSlide, {
                                                            style: {
                                                                width: "fit-content",
                                                                height: "35px",
                                                                flexShrink: 0
                                                            },
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                                variant: "solid",
                                                                className: "option-price-btn",
                                                                type: "default",
                                                                onClick: ()=>{
                                                                    form.setFieldValue("budget", option.amount);
                                                                },
                                                                children: (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_9__/* .formatCurrencyWithSpace */ .O$)(option.amount)
                                                            }, option.amount)
                                                        }, `thumb-${option.amount}-${index}`))
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex align-items-start mb-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        style: {
                                            marginRight: "5px",
                                            width: "5px",
                                            height: "5px"
                                        },
                                        className: "text-danger fs-6",
                                        children: "*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "m-0 text-dark",
                                        children: "Buyurtma tayyor bo‘lish muddatini belgilang"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                        name: "deadline_date",
                                        style: {
                                            flex: 1,
                                            margin: 0,
                                            width: "100%"
                                        },
                                        className: "flex-fill",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Yetkazib berish sanasini va vaqtini tanlang!"
                                            }, 
                                        ],
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
                                            format: "MMM DD, YYYY",
                                            placement: "bottom",
                                            style: {
                                                width: "100%",
                                                height: "32px"
                                            },
                                            placeholder: "Buyurtma tayyor bo‘lish sanasi va soatini tanlang",
                                            size: "small",
                                            disabledDate: (current)=>current && current < dayjs__WEBPACK_IMPORTED_MODULE_5___default()().startOf("day")
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                        name: "deadline_time",
                                        rules: [
                                            {
                                                required: true,
                                                message: ""
                                            }
                                        ],
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.TimePicker, {
                                            format: "HH:mm",
                                            style: {
                                                height: "32px"
                                            },
                                            placeholder: "Soat",
                                            size: "small",
                                            className: "ant-picker-time-panel-column",
                                            disabledDate: (current)=>current && current < dayjs__WEBPACK_IMPORTED_MODULE_5___default()().startOf("day")
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                className: "mb-2",
                                children: id ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    loading: createPending,
                                    type: "primary",
                                    htmlType: "submit",
                                    className: "mt-3 py-4 fs-4",
                                    block: true,
                                    children: createPending ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "d-flex align-items-center gap-3",
                                        children: "Buyurtmani yuborilmoqda..."
                                    }) : "Buyurtmani yuborish"
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    loading: isPending,
                                    type: "primary",
                                    htmlType: "submit",
                                    className: "mt-3 py-4 fs-4",
                                    block: true,
                                    children: isPending ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "d-flex align-items-center gap-3",
                                        children: "Buyurtmani joylashtirilmoqda..."
                                    }) : "Buyurtmani joylashtirish"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                title: "Buyurtmani tasdiqlash",
                open: confirmOpen,
                onCancel: ()=>setConfirmOpen(false),
                footer: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        onClick: ()=>setConfirmOpen(false),
                        children: "Yo‘q"
                    }, "cancel"),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        type: "primary",
                        loading: isPending || createPending,
                        onClick: handleConfirm,
                        children: "Ha, buyurtmani yubor"
                    }, "ok"), 
                ],
                centered: true,
                children: seller ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "Rostdan ham ",
                        seller,
                        " uchun buyurtma berishni xohlaysizmi?"
                    ]
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    children: "Rostdan ham buyurtma berishni xohlaysizmi? Buyurtmangiz 10 000 dan ortiq frilanserlarga yuboriladi, ular siz bilan hamkorlik qilish uchun taklif yuborishadi."
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_order_PhoneNumberModal__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                open: phoneModalOpen,
                onCancel: handlePhoneModalCancel,
                onSubmit: handlePhoneSubmit,
                loading: isPending
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateOrderModal);
const Info = ({ title  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
        title: title,
        className: "d-flex align-items-center",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "d-flex align-items-center justify-content-center ms-2",
            style: {
                width: "15px",
                height: "15px",
                cursor: "pointer"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.QuestionCircleOutlined, {})
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ inputInfoToCreateOrder),
/* harmony export */   "f": () => (/* binding */ titleDescription)
/* harmony export */ });
const titleDescription = (direction)=>{
    return `${direction} bo'yicha xizmat kerak.`;
};
const inputInfoToCreateOrder = {
    category: {
        placeholder: (categories)=>Array.isArray(categories) && categories.length ? categories.map((el)=>el.label).slice(0, 2).join(", ") + " v.k" : "Taqdimot, Kurs ishi, v.k",
        info: `Iltimos, buyurtmangizni to‘g‘ri yo‘naltirish uchun quyidagi kategoriyalardan birini tanlang. Har bir kategoriya ma’lum bir xizmat turiga mos keladi, shuning uchun tanlovingiz siz izlayotgan mutaxassisni topishda muhim rol o‘ynaydi.`
    },
    description: {
        placeholder: `- Buyurtma mavzusi yoki yo‘nalishi
- Kerakli hajmi (bet, so‘z, slayd va h.k.)
- Asosiy talablar yoki reja
- Qaysi formatda kerak (Word, PDF, PPT va b.)
- h.k.     
      `,
        info: `Iltimos, buyurtmangizning mavzusi va talablarini aniq va tushunarli tarzda yozing. Bu ijrochining ishni tez va to‘g‘ri bajarishiga yordam beradi.`
    },
    lang: {
        placeholder: "Qaysi tilda tayyorlanishini xohlaysiz?"
    },
    price: {
        placeholder: "50 000",
        info: `Iltimos, ushbu ish uchun ajratmoqchi bo‘lgan byudjetni so‘mda yozing.`
    }
};


/***/ }),

/***/ 5047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ useTelegram)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTelegram() {
    const { 0: telegramData , 1: setTelegramData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        tg: null,
        queryId: null,
        tgId: null
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Only run on client side
        if (false) {}
    }, []);
    return telegramData;
}


/***/ })

};
;
//# sourceMappingURL=1703.js.map