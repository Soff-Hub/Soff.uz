"use strict";
exports.id = 253;
exports.ids = [253];
exports.modules = {

/***/ 253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uz": () => (/* binding */ getRemainingDays),
/* harmony export */   "pi": () => (/* binding */ getTimeAgo)
/* harmony export */ });
/* unused harmony exports getDate, getDateTime, getStatus */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4195);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_localizedFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7424);
/* harmony import */ var dayjs_plugin_localizedFormat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localizedFormat__WEBPACK_IMPORTED_MODULE_3__);




dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2___default()));
dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_localizedFormat__WEBPACK_IMPORTED_MODULE_3___default()));
// O'zbekcha tarjima
const uzLocale = {
    name: "uz",
    relativeTime: {
        future: "%s ichida",
        past: "%s oldin",
        s: "bir necha soniya",
        m: "1 daqiqa",
        mm: "%d daqiqa",
        h: "1 soat",
        hh: "%d soat",
        d: "1 kun",
        dd: "%d kun",
        M: "1 oy",
        MM: "%d oy",
        y: "1 yil",
        yy: "%d yil"
    }
};
// 1. Ro'yxatdan o'tkazamiz
dayjs__WEBPACK_IMPORTED_MODULE_1___default().locale(uzLocale, null, true);
// 2. Faollashtiramiz
dayjs__WEBPACK_IMPORTED_MODULE_1___default().locale("uz");
function getTimeAgo(dateString) {
    return dayjs__WEBPACK_IMPORTED_MODULE_1___default()(dateString, "YYYY-MM-DD HH:mm").fromNow();
}
const getDate = (date)=>{
    return dayjs(date).format("DD/MM/YYYY");
};
const getDateTime = (date)=>{
    return dayjs(date).format("YYYY-MM-DD HH:mm");
};
const getStatus = (timestamp)=>{
    if (!timestamp || !dayjs(timestamp).isValid()) {
        return "Noma’lum vaqt";
    }
    const now = dayjs();
    const diffMinutes = now.diff(dayjs(timestamp), "minute");
    const diffHours = now.diff(dayjs(timestamp), "hour");
    const diffDays = now.diff(dayjs(timestamp), "day");
    // 5 minut ichida
    if (diffMinutes < 5) {
        return /*#__PURE__*/ _jsx("span", {
            style: {
                color: "#02a214"
            },
            children: "Online"
        });
    }
    // 1 soatdan kam
    if (diffMinutes < 60) {
        return `${diffMinutes} daqiqa oldin `;
    }
    // 24 soatdan kam
    if (diffHours < 24) {
        const minutes = diffMinutes % 60;
        return `${diffHours} soat ${minutes} daqiqa oldin `;
    }
    // 1 kundan katta
    return dayjs(timestamp).format("DD.MM.YYYY HH:mm [da online edi]");
};
function getRemainingDays(createdAt, deliveryDay) {
    const endDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(createdAt).add(Number(deliveryDay), "day"); // tugash sanasi
    const today = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(); // bugungi sana
    const diff = endDate.diff(today, "day"); // qolgan kunlar
    if (diff < 0) {
        return "Muddat tugagan"; // muddat o‘tgan
    }
    return `${diff} kun`; // qolgan kun
}


/***/ })

};
;