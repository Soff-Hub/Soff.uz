"use strict";
(() => {
var exports = {};
exports.id = 1051;
exports.ids = [1051];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 6904:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function handler(req, res) {
    try {
        const fileUrl = req.query.url;
        if (!fileUrl) {
            return res.status(400).json({
                error: "Missing URL"
            });
        }
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(fileUrl, {
            responseType: "arraybuffer"
        });
        const filename = fileUrl.split("/").pop().split("?")[0] || "file";
        // Set headers to FORCE download
        res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Download error:", error.message);
        res.status(500).json({
            error: "Unable to download file"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6904));
module.exports = __webpack_exports__;

})();