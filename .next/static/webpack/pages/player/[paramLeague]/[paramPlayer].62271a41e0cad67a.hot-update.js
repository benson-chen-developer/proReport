/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/player/[paramLeague]/[paramPlayer]",{

/***/ "./src/components/Outlier/Matches/components/NoProjection/NoMatchesProjection.tsx":
/*!****************************************************************************************!*\
  !*** ./src/components/Outlier/Matches/components/NoProjection/NoMatchesProjection.tsx ***!
  \****************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./src/components/Player/PPlayerPage.tsx":
/*!***********************************************!*\
  !*** ./src/components/Player/PPlayerPage.tsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PPlayerPage: function() { return /* binding */ PPlayerPage; },\n/* harmony export */   bgColor: function() { return /* binding */ bgColor; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Outlier_Matches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Outlier/Matches */ \"./src/components/Outlier/Matches.tsx\");\n/* harmony import */ var _Outlier_Sidebar_SideBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Outlier/Sidebar/SideBar */ \"./src/components/Outlier/Sidebar/SideBar.tsx\");\n/* harmony import */ var _Context_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Context/store */ \"./src/Context/store.tsx\");\n/* harmony import */ var _Outlier_Matches_components_NoProjection_NoMatchesProjection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Outlier/Matches/components/NoProjection/NoMatchesProjection */ \"./src/components/Outlier/Matches/components/NoProjection/NoMatchesProjection.tsx\");\n/* harmony import */ var _Outlier_Matches_components_NoProjection_NoMatchesProjection__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Outlier_Matches_components_NoProjection_NoMatchesProjection__WEBPACK_IMPORTED_MODULE_5__);\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar bgColor = \"#1E1E1E\"; //tron #0B1C1F\nvar PPlayerPage = function(param) {\n    var league = param.league, playerName = param.playerName;\n    _s();\n    var _useGlobalContext = (0,_Context_store__WEBPACK_IMPORTED_MODULE_4__.useGlobalContext)(), isMobile = _useGlobalContext.isMobile, filter = _useGlobalContext.filter;\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_6__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), 2), loading = _useState[0], setLoading = _useState[1];\n    /* For Mobile Filter */ var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_6__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), filterShow = _useState1[0], setFilterShow = _useState1[1];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            display: \"flex\",\n            width: \"100%\",\n            background: \"#000\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Outlier_Sidebar_SideBar__WEBPACK_IMPORTED_MODULE_3__.SideBar, {}, void 0, false, {\n                fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/components/Player/PPlayerPage.tsx\",\n                lineNumber: 23,\n                columnNumber: 13\n            }, _this),\n            filter.pickedProjection ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Outlier_Matches__WEBPACK_IMPORTED_MODULE_2__.Matches, {\n                loading: loading,\n                setLoading: setLoading\n            }, void 0, false, {\n                fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/components/Player/PPlayerPage.tsx\",\n                lineNumber: 26,\n                columnNumber: 17\n            }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Outlier_Matches_components_NoProjection_NoMatchesProjection__WEBPACK_IMPORTED_MODULE_5__.NoProjectionMatches, {\n                loading: loading,\n                setLoading: setLoading\n            }, void 0, false, {\n                fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/components/Player/PPlayerPage.tsx\",\n                lineNumber: 30,\n                columnNumber: 17\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/components/Player/PPlayerPage.tsx\",\n        lineNumber: 22,\n        columnNumber: 9\n    }, _this);\n};\n_s(PPlayerPage, \"a/+ktIRxgzAjliN9h3hVhFCzjh4=\", false, function() {\n    return [\n        _Context_store__WEBPACK_IMPORTED_MODULE_4__.useGlobalContext\n    ];\n});\n_c = PPlayerPage;\nvar _c;\n$RefreshReg$(_c, \"PPlayerPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9QbGF5ZXIvUFBsYXllclBhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFDTTtBQUNRO0FBQ0U7QUFFOEM7QUFNOUYsSUFBTU0sVUFBVSxVQUFVLENBQUMsY0FBYztBQUV6QyxJQUFNQyxjQUErQjtRQUFFQyxlQUFBQSxRQUFRQyxtQkFBQUE7O0lBQ2xELElBQTJCTCxvQkFBQUEsZ0VBQWdCQSxJQUFwQ00sV0FBb0JOLGtCQUFwQk0sVUFBVUMsU0FBVVAsa0JBQVZPO0lBQ2pCLElBQThCVixZQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQVUsV0FBekNXLFVBQXVCWCxjQUFkWSxhQUFjWjtJQUU5QixxQkFBcUIsR0FDckIsSUFBb0NBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxZQUF0Q2EsYUFBNkJiLGVBQWpCYyxnQkFBaUJkO0lBRXBDLHFCQUNJLDhEQUFDZTtRQUFJQyxPQUFPO1lBQUNDLFNBQVM7WUFBUUMsT0FBTztZQUFRQyxZQUFZO1FBQU87OzBCQUM1RCw4REFBQ2pCLDZEQUFPQTs7Ozs7WUFFUFEsT0FBT1UsZ0JBQWdCLGlCQUNwQiw4REFBQ25CLHFEQUFPQTtnQkFDSlUsU0FBU0E7Z0JBQVNDLFlBQVlBOzs7OztzQ0FHbEMsOERBQUNSLDZHQUFtQkE7Z0JBQ2hCTyxTQUFTQTtnQkFBU0MsWUFBWUE7Ozs7Ozs7Ozs7OztBQWNsRCxFQUFDO0dBL0JZTjs7UUFDa0JILDREQUFnQkE7OztLQURsQ0ciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvUGxheWVyL1BQbGF5ZXJQYWdlLnRzeD80YWJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTWF0Y2hlcyB9IGZyb20gJy4uL091dGxpZXIvTWF0Y2hlcyc7XG5pbXBvcnQgeyBTaWRlQmFyIH0gZnJvbSAnLi4vT3V0bGllci9TaWRlYmFyL1NpZGVCYXInO1xuaW1wb3J0IHsgdXNlR2xvYmFsQ29udGV4dCB9IGZyb20gJy4uLy4uL0NvbnRleHQvc3RvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQnRuIH0gZnJvbSAnLi4vT3ZlcmxheS9GaWx0ZXIvRmlsdGVyQnRuJztcbmltcG9ydCB7IE5vUHJvamVjdGlvbk1hdGNoZXMgfSBmcm9tICcuLi9PdXRsaWVyL01hdGNoZXMvY29tcG9uZW50cy9Ob1Byb2plY3Rpb24vTm9NYXRjaGVzUHJvamVjdGlvbic7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgbGVhZ3VlOiBzdHJpbmcsXG4gICAgcGxheWVyTmFtZTogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IFwiIzFFMUUxRVwiOyAvL3Ryb24gIzBCMUMxRlxuXG5leHBvcnQgY29uc3QgUFBsYXllclBhZ2U6IFJlYWN0LkZDPFByb3BzPiA9ICh7bGVhZ3VlLCBwbGF5ZXJOYW1lfSkgPT4ge1xuICAgIGNvbnN0IHtpc01vYmlsZSwgZmlsdGVyfSA9IHVzZUdsb2JhbENvbnRleHQoKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICAgIC8qIEZvciBNb2JpbGUgRmlsdGVyICovXG4gICAgY29uc3QgW2ZpbHRlclNob3csIHNldEZpbHRlclNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6IFwiZmxleFwiLCB3aWR0aDogXCIxMDAlXCIsIGJhY2tncm91bmQ6IFwiIzAwMFwiIH19PlxuICAgICAgICAgICAgPFNpZGVCYXIgLz5cblxuICAgICAgICAgICAge2ZpbHRlci5waWNrZWRQcm9qZWN0aW9uID9cbiAgICAgICAgICAgICAgICA8TWF0Y2hlcyBcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ30gc2V0TG9hZGluZz17c2V0TG9hZGluZ31cbiAgICAgICAgICAgICAgICAvPiBcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIDxOb1Byb2plY3Rpb25NYXRjaGVzXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9IHNldExvYWRpbmc9e3NldExvYWRpbmd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgey8qIHtpc01vYmlsZSAmJiAhc2lkZWJhclZpc2libGUgJiYgIWxvYWRpbmcgPyBcbiAgICAgICAgICAgICAgICA8RmlsdGVyQnRuIFxuICAgICAgICAgICAgICAgICAgICBpc092ZXJMYXlGaWx0ZXI9e2lzT3ZlckxheUZpbHRlcn0gXG4gICAgICAgICAgICAgICAgICAgIHNldElzT3ZlckxheUZpbHRlcj17c2V0SXNPdmVyTGF5RmlsdGVyfVxuICAgICAgICAgICAgICAgIC8+IFxuICAgICAgICAgICAgICAgICAgICA6IFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgIH0gKi99XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIk1hdGNoZXMiLCJTaWRlQmFyIiwidXNlR2xvYmFsQ29udGV4dCIsIk5vUHJvamVjdGlvbk1hdGNoZXMiLCJiZ0NvbG9yIiwiUFBsYXllclBhZ2UiLCJsZWFndWUiLCJwbGF5ZXJOYW1lIiwiaXNNb2JpbGUiLCJmaWx0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZpbHRlclNob3ciLCJzZXRGaWx0ZXJTaG93IiwiZGl2Iiwic3R5bGUiLCJkaXNwbGF5Iiwid2lkdGgiLCJiYWNrZ3JvdW5kIiwicGlja2VkUHJvamVjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Player/PPlayerPage.tsx\n"));

/***/ })

});