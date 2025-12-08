exports.id = 2890;
exports.ids = [2890];
exports.modules = {

/***/ 6471:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__eKL8X",
	"completed": "style_completed__hBvG1",
	"cancelled": "style_cancelled__2oxEm",
	"inProgress": "style_inProgress__Z9XBO",
	"pending": "style_pending__Zy3eH",
	"cardCompleted": "style_cardCompleted__TJsaa",
	"cardInProgress": "style_cardInProgress__XVxrj",
	"cardCancelled": "style_cardCancelled__lQ_F3",
	"titleWrapper": "style_titleWrapper__gYlZ8",
	"nameWrapper": "style_nameWrapper___xQH1",
	"id": "style_id__M4cY0",
	"titleRow": "style_titleRow__HxNRw",
	"catWrapper": "style_catWrapper__H_S1p",
	"description": "style_description__9sa7A",
	"moreBtn": "style_moreBtn__ex3Wu",
	"meta": "style_meta__GkQKh",
	"metaTitle": "style_metaTitle__D2wMZ",
	"metaMain": "style_metaMain__gCCvL",
	"wrapper": "style_wrapper__hkSIQ",
	"date": "style_date__fhp6J",
	"budjet": "style_budjet__U98dJ",
	"offers": "style_offers__4xesV",
	"dateTitle": "style_dateTitle__gl7Da",
	"budjetTitle": "style_budjetTitle__TwP_s",
	"offerTitle": "style_offerTitle__o6R9L",
	"dateTime": "style_dateTime__ftZbf",
	"budjetPrice": "style_budjetPrice__OblKj",
	"offerCount": "style_offerCount__Q5ogs",
	"paymentApproved": "style_paymentApproved__O7Sgq",
	"paymentHalfApproved": "style_paymentHalfApproved__wslW1",
	"paymentNotApproved": "style_paymentNotApproved__SOtf7",
	"paymentRejected": "style_paymentRejected__atCLB",
	"rejectedLabel": "style_rejectedLabel__Ew5PI",
	"primary": "style_primary__Cc_Z_",
	"actionButtons": "style_actionButtons__nFFKN",
	"actionButtonReject": "style_actionButtonReject__qm8kK",
	"actionButtonRejectDetail": "style_actionButtonRejectDetail__7pw4V"
};


/***/ }),

/***/ 6364:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6246);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_3__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const useCancelOrder = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(user?.access);
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQueryClient)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useMutation)({
        mutationFn: async (data)=>{
            const formData = new FormData();
            formData.append("cancel_reason_id", data.reason);
            formData.append("status", "cancelled");
            await axios.post(`order/${data.id}/status`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    "orders"
                ]
            });
        },
        onError: (error)=>{
            const errorMessage = typeof error?.response?.data?.detail === "string" ? error.response.data.detail : "Bekor qilishda xatolik yuz berdi";
            antd__WEBPACK_IMPORTED_MODULE_1__.message.error(errorMessage);
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useCancelOrder);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7079:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9752);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6246);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGetReasons = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(user?.access);
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)({
        queryKey: [
            "reasons"
        ],
        queryFn: async ()=>{
            const { data  } = await axios.get(`seller-services/order-cancel-reasons`);
            return data;
        },
        enabled: !!user?.access,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGetReasons);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_api_base_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5956);



const useOffers = (orderId, isOpen)=>{
    const { 0: offers , 1: setOffers  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: isConnected , 1: setIsConnected  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const wsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!orderId || !isOpen) return;
        const wsUrl = `${_shared_api_base_url__WEBPACK_IMPORTED_MODULE_2__/* .f_base_ws_url */ .dC}order-offers/${orderId}?token=${user?.access}`;
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;
        socket.onopen = ()=>{
            setIsConnected(true);
        };
        socket.onmessage = (event)=>{
            try {
                const data = JSON.parse(event.data);
                if (data?.type !== "offers_count") {
                    setOffers((prev)=>{
                        if (prev.some((o)=>o.id === data.id)) return prev;
                        return [
                            data,
                            ...prev
                        ];
                    });
                }
            } catch (err) {
                console.error("❌ WS parse error:", err);
            }
        };
        socket.onclose = ()=>{
            setIsConnected(false);
        };
        socket.onerror = (err)=>{
            console.error("⚠️ WS error:", err);
        };
        return ()=>{
            socket.close();
            setOffers([]);
        };
    }, [
        orderId,
        isOpen
    ]);
    return {
        offers,
        setOffers,
        isConnected
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOffers);


/***/ }),

/***/ 9371:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ CancelOrderModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _myorder_api_useCancelOrder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6364);
/* harmony import */ var _myorder_api_useGetReasons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7079);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_myorder_api_useCancelOrder__WEBPACK_IMPORTED_MODULE_3__, _myorder_api_useGetReasons__WEBPACK_IMPORTED_MODULE_4__]);
([_myorder_api_useCancelOrder__WEBPACK_IMPORTED_MODULE_3__, _myorder_api_useGetReasons__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const CancelOrderModal = ({ isOpen , selectedOrder , onClose  })=>{
    const { 0: reason , 1: setReason  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { data: reasons  } = (0,_myorder_api_useGetReasons__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { mutate: cancelOrder , isPending: isCancelling  } = (0,_myorder_api_useCancelOrder__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const handleOk = ()=>{
        if (!reason) {
            antd__WEBPACK_IMPORTED_MODULE_2__.message.warning("Iltimos, sababni tanlang");
            return;
        }
        if (selectedOrder) {
            cancelOrder({
                id: selectedOrder.id,
                reason
            }, {
                onSuccess: ()=>{
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Buyurtma muvaffaqiyatli bekor qilindi!");
                    setReason("");
                    onClose();
                },
                onError: (error)=>{
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.error("Bekor qilishda xatolik yuz berdi");
                    console.error("Cancel order error:", error);
                }
            });
        }
    };
    const handleCancel = ()=>{
        setReason("");
        onClose();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        title: "Buyurtmani bekor qilish",
        open: isOpen,
        onOk: handleOk,
        onCancel: handleCancel,
        okText: "Bekor qilish",
        cancelText: "Yopish",
        confirmLoading: isCancelling,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                children: [
                    'Haqiqatan ham "',
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                        children: selectedOrder?.title
                    }),
                    '" buyurtmasini bekor qilmoqchimisiz?'
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                style: {
                    marginTop: "20px"
                },
                children: "Sababni tanlang"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Select, {
                className: "w-100",
                placeholder: "Bekor qilish sababini tanlang...",
                value: reason,
                onChange: (val)=>setReason(val),
                options: reasons?.map((reason)=>({
                        value: reason.id,
                        label: reason.reason
                    }))
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const Loader = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
            height: "100vh"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Spin, {
            size: "large"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 2484:
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
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6471);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(740);
/* harmony import */ var _shared_utilities_calculateTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(253);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1185);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6905);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4114);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_utilities_cn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7150);
/* harmony import */ var _components_freeleance_myorders_order_detail_ui_modals_CancelOrderModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9371);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1301);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__, react_icons_io5__WEBPACK_IMPORTED_MODULE_4__, react_icons_md__WEBPACK_IMPORTED_MODULE_5__, react_icons_ri__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_myorders_order_detail_ui_modals_CancelOrderModal__WEBPACK_IMPORTED_MODULE_10__, react_icons_fa__WEBPACK_IMPORTED_MODULE_11__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__, react_icons_io5__WEBPACK_IMPORTED_MODULE_4__, react_icons_md__WEBPACK_IMPORTED_MODULE_5__, react_icons_ri__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_myorders_order_detail_ui_modals_CancelOrderModal__WEBPACK_IMPORTED_MODULE_10__, react_icons_fa__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const CompletedOrderWrapper = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Badge.Ribbon, {
        text: "Buyurtma tugallandi",
        color: "#06aa27",
        children: children
    });
};
const InProgressOrderWrapper = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Badge.Ribbon, {
        text: "Buyurtma jarayonda",
        color: "#ffb400",
        children: children
    });
};
const CancelledOrderWrapper = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Badge.Ribbon, {
        text: "Buyurtma bekor qilindi",
        color: "#f5222d",
        children: children
    });
};
const PendingOrderWrapper = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Badge.Ribbon, {
        text: "Yangi buyurtma",
        color: "blue",
        children: children
    });
};
const orderStatusAssets = (status)=>{
    switch(status){
        case "completed":
            return {
                orderClassName: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().cardCompleted),
                orderIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                    title: "Buyurtma tugallandi",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_4__.IoCheckmarkDone, {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().completed)
                    })
                }),
                orderWrapper: CompletedOrderWrapper,
                status: "completed",
                isRejectable: false,
                isPaymentApproved: true
            };
        case "order_accepted":
        case "order_file_sent":
        case "rejected":
            return {
                orderClassName: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().cardInProgress),
                orderIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                    title: "Buyurtma jarayonda",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_6__.RiProgress5Line, {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().inProgress)
                    })
                }),
                orderWrapper: InProgressOrderWrapper,
                status: status,
                isRejectable: true,
                isPaymentApproved: true
            };
        case "cancelled":
            return {
                orderClassName: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().cardCancelled),
                orderIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                    title: "Buyurtma bekor qilingan",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_5__.MdErrorOutline, {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().cancelled)
                    })
                }),
                orderWrapper: CancelledOrderWrapper,
                status: "cancelled",
                isRejectable: false,
                isPaymentApproved: false
            };
        case "pending":
        default:
            return {
                orderClassName: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().card),
                orderIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                    title: "Yangi yaratilgan buyurtma",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_5__.MdOutlinePendingActions, {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().pending)
                    })
                }),
                orderWrapper: PendingOrderWrapper,
                status: "pending",
                isRejectable: true,
                isPaymentApproved: false
            };
    }
// pending: {
//     orderClassName: styles.cardCompleted,
//     orderIcon: <IoCheckmarkDone className={styles.completed} />,
// },
// approved: "To'lov amalga oshirildi",
// requirement_file: "Buyurtma talablari jo'natildi",
// requirement_file_rejected: "Buyurtma talablari to'liq emas",
// order_accepted: 'Buyurtma qabul qilindi',
// order_file_sent: 'Tasdiqlash uchun topshirildi',
// completed: 'Buyurtma tugallandi',
// rejected: "Fayl to'liq emas",
// cancelled: 'Buyurtma bekor qilindi',
};
const OrderCard = ({ order , onOpenDrawer , onCancel , infoOnly , detail =false , onOrderUpdate ,  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const statusAsset = orderStatusAssets(order?.order_status_doing?.status);
    const hasSeller = Boolean(order.user);
    const price = order.service?.price ?? order.budget ?? 0;
    const { 0: showMore , 1: setShowMore  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showMoreBtn , 1: setShowMoreBtn  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const descRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: isModalOpen , 1: setIsModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const deadlineDisplay = order.deadline_date ? new Date(order.deadline_date).toLocaleString("uz-UZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }) : order.service?.delivery_days ? `${(0,_shared_utilities_calculateTime__WEBPACK_IMPORTED_MODULE_3__/* .getRemainingDays */ .Uz)(order.created_at, order.service.delivery_days)}` : "-";
    const createdAtDisplay = new Date(order.created_at).toLocaleString("uz-UZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid = order?.approved_transaction_amount > 0 && order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (descRef.current) {
            const isOverflowing = descRef.current.scrollHeight > descRef.current.clientHeight + 5;
            setShowMoreBtn(isOverflowing);
        }
    }, [
        order.description
    ]);
    const handlePrimaryClick = ()=>{
        if (!isPartiallyPaid && !isFullyPaid) {
            onOpenDrawer(order);
            return;
        }
        if (hasSeller) {
            router.push(`/order/${order.id}`);
        } else {
            if (statusAsset.status === "cancelled") {
                antd__WEBPACK_IMPORTED_MODULE_8__.message.warning("Siz bu buyurtmani bekor qilgansiz");
            } else if (typeof onOpenDrawer === "function") {
                onOpenDrawer(order);
            } else {
                antd__WEBPACK_IMPORTED_MODULE_8__.message.info("Takliflarni ko‘rish uchun funksiyani o‘tkazmadingiz");
            }
        }
    };
    const handleCancelClick = ()=>{
        setIsModalOpen(true);
    };
    const handleCloseModal = ()=>{
        setIsModalOpen(false);
        if (onOrderUpdate) {
            onOrderUpdate();
        }
    };
    const content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: statusAsset.orderClassName,
        "data-status": statusAsset.status,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().titleWrapper),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().nameWrapper),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().id),
                            children: [
                                "#",
                                order.id
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().titleRow),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().title),
                                onClick: ()=>{
                                    if (hasSeller) {
                                        router.push(`/order/${order.id}`);
                                    } else if (statusAsset.status === "cancelled") {
                                        antd__WEBPACK_IMPORTED_MODULE_8__.message.warning("Siz bu buyurtmani bekor qilgansiz");
                                    } else if (typeof onOpenDrawer === "function") {
                                        onOpenDrawer(order);
                                    }
                                },
                                children: order.service?.title || order.title || "-"
                            })
                        })
                    ]
                })
            }),
            order.order_type == "custom_order" && typeof onOpenDrawer !== "function" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().meta),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaTitle),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "fa-solid fa-file-pen"
                            }),
                            "Buyurtma tavsifi"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        ref: descRef,
                        style: {
                            whiteSpace: "pre-wrap",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: showMore ? "unset" : 3,
                            lineHeight: "1.6",
                            fontSize: "14px",
                            marginBottom: 0
                        },
                        children: order.description
                    }),
                    showMoreBtn && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        onClick: ()=>setShowMore((prev)=>!prev),
                        style: {
                            color: "#1677ff",
                            fontWeight: 500,
                            cursor: "pointer",
                            marginTop: "4px",
                            display: "inline-block"
                        },
                        children: showMore ? "Kamroq" : "Batafsil"
                    })
                ]
            }),
            order.order_type == "ready_service" && typeof onOpenDrawer !== "function" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().meta),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaTitle),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "fa-solid fa-file-pen"
                            }),
                            " Buyurtma tavsifi"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        dangerouslySetInnerHTML: {
                            __html: order.description
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().catWrapper),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().meta),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaTitle),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-language"
                                    }),
                                    " Buyurtma tili"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaMain),
                                children: order.language?.toUpperCase() || "-"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().meta),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaTitle),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-regular fa-clock"
                                    }),
                                    " Yaratilgan vaqti"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().metaMain),
                                children: createdAtDisplay
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: typeof onOpenDrawer === "function" ? (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().wrapper) : (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().catWrapper),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().budjet),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().budjetTitle),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-money-bill-wave mr-1"
                                    }),
                                    " ",
                                    "Budjet"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().budjetPrice),
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrencyWithSpace */ .O$)(price),
                                    " so'm"
                                ]
                            }),
                            statusAsset.status === "cancelled" && isPartiallyPaid ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().paymentRejected),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__.FaRegTimesCircle, {
                                        style: {
                                            marginRight: "2px",
                                            marginBottom: "2px"
                                        }
                                    }),
                                    "To'lov bekor qilindi"
                                ]
                            }) : statusAsset.status == "cancelled" ? null : isFullyPaid ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().paymentApproved),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__.FaRegCheckCircle, {
                                        style: {
                                            marginRight: "2px",
                                            marginBottom: "2px"
                                        }
                                    }),
                                    "To'lov qabul qilindi"
                                ]
                            }) : isPartiallyPaid ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().paymentHalfApproved),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__.FaRegStopCircle, {
                                        style: {
                                            marginRight: "2px",
                                            marginBottom: "2px"
                                        }
                                    }),
                                    "To'lovning ",
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrencyWithSpace */ .O$)(notPaidAmount),
                                    " ",
                                    "so'm qismi amalga oshirilmagan"
                                ]
                            }) : null
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().date),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().dateTitle),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-regular fa-calendar mr-1"
                                    }),
                                    " Topshirish muddati"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().dateTime),
                                children: deadlineDisplay
                            })
                        ]
                    }),
                    !infoOnly && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().actionButtons),
                        children: [
                            typeof onOpenDrawer === "function" && statusAsset.isRejectable ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Button, {
                                variant: "outlined",
                                color: "red",
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().actionButtonReject),
                                onClick: ()=>onCancel(order),
                                children: "Bekor qilish"
                            }) : null,
                            statusAsset.status === "cancelled" ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().primary),
                                onClick: handlePrimaryClick,
                                children: !isPartiallyPaid && !isFullyPaid ? "To'lovni amalga oshirish" : hasSeller ? "Batafsil" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (0,_shared_utilities_cn__WEBPACK_IMPORTED_MODULE_9__.cn)("flex", "justify-center", "items-center", "gap-2"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            style: {
                                                fontSize: "14px"
                                            },
                                            children: "Takliflarni ko'rish"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Avatar.Group, {
                                            max: {
                                                count: 3,
                                                style: {
                                                    color: "white",
                                                    backgroundColor: "#00a44f"
                                                }
                                            },
                                            children: order?.offers?.map((item, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Avatar, {
                                                    size: 25,
                                                    src: item?.photo_url || "/static/img/ozodbek.png"
                                                }, i))
                                        })
                                    ]
                                })
                            }),
                            statusAsset.status === "cancelled" && isPartiallyPaid && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().rejectedLabel),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa fa-exclamation-circle"
                                    }),
                                    "Buyurtma to'lovingiz 24 soat ichida profilingizga qaytariladi."
                                ]
                            })
                        ]
                    }),
                    infoOnly && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().actionButtons),
                        children: statusAsset.status === "order_accepted" && detail === true && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Button, {
                            variant: "outlined",
                            color: "red",
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_12___default().actionButtonReject),
                            onClick: ()=>handleCancelClick(),
                            children: "Bekor qilish"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_freeleance_myorders_order_detail_ui_modals_CancelOrderModal__WEBPACK_IMPORTED_MODULE_10__/* .CancelOrderModal */ .T, {
                isOpen: isModalOpen,
                selectedOrder: order,
                onClose: handleCloseModal
            })
        ]
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(statusAsset.orderWrapper, {
        children: content
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 235:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TelegramNotification)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _repositories_https__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(246);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4903);
/* harmony import */ var _shared_api_end_points__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5834);
/* harmony import */ var _shared_hooks_useTelegram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(674);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_https__WEBPACK_IMPORTED_MODULE_4__]);
_repositories_https__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









function TelegramNotification({ header , hideIfActivated  }) {
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)((state)=>state.auth);
    const { 0: checked , 1: setChecked  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { data: tg_link  } = (0,_repositories_https__WEBPACK_IMPORTED_MODULE_4__/* .useGet */ .XD)("tg_link", `${process.env.NEXT_PUBLIC_BASE_URL}${_shared_api_end_points__WEBPACK_IMPORTED_MODULE_6__/* .TELEGRAM_LINK */ .Ko}`);
    const { data: newProfile  } = (0,_repositories_https__WEBPACK_IMPORTED_MODULE_4__/* .useGet */ .XD)("new-profile", `${process.env.NEXT_PUBLIC_BASE_URL}${_shared_api_end_points__WEBPACK_IMPORTED_MODULE_6__/* .NEW_PROFILE */ .an}`);
    const { mutate , isLoading  } = (0,_repositories_https__WEBPACK_IMPORTED_MODULE_4__/* .usePatch */ .aH)("nimadir");
    const handleOff = ()=>{
        mutate({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}${_shared_api_end_points__WEBPACK_IMPORTED_MODULE_6__/* .AUTH_PROFILE */ .jt}`,
            payload: {
                telegram_chat_id: null
            }
        }, {
            onSuccess: ()=>{
                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Bildirishnomalar o‘chirildi!");
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (newProfile?.telegram_chat_id) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [
        newProfile
    ]);
    const handleSwitchChange = (value)=>{
        if (value) {
            if (tg_link?.link_code) {
                window.open(tg_link.link_code, "_blank");
            }
        } else {
            handleOff();
        }
        setChecked(value);
    };
    if (checked && hideIfActivated) {
        return null;
    }
    if (user?.telegramWebApp) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `alert alert-warning d-flex ${isMobile && ""} align-items-center justify-content-between`,
        style: {
            borderRadius: "8px"
        },
        children: [
            header || /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "d-flex align-items-center gap-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Telegram orqali davom ettirish"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                        title: "Buyurtma holati va yangi takliflar haqida telegram bot orqali bildirishnomalarni qabul qilish",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.InfoCircleOutlined, {
                            style: {
                                color: "#faad14"
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                loading: isLoading,
                checked: checked,
                onChange: handleSwitchChange
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ useSafeBack)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);

function useSafeBack() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    const safeBack = (e, defaultPath = "/")=>{
        if (false) {}
    };
    return safeBack;
}


/***/ })

};
;