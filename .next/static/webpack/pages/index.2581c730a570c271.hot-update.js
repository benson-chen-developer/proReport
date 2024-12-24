/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/Home/Landing/Landing.tsx":
/*!*************************************************!*\
  !*** ./src/components/Home/Landing/Landing.tsx ***!
  \*************************************************/
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

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _data_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/colors */ \"./src/data/colors.ts\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _fontsource_roboto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fontsource/roboto */ \"./node_modules/@fontsource/roboto/index.css\");\n/* harmony import */ var _fontsource_roboto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _fontsource_comfortaa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fontsource/comfortaa */ \"./node_modules/@fontsource/comfortaa/index.css\");\n/* harmony import */ var _fontsource_comfortaa__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fontsource_comfortaa__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_Home_Landing_Landing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Home/Landing/Landing */ \"./src/components/Home/Landing/Landing.tsx\");\n/* harmony import */ var _components_Home_Landing_Landing__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_Home_Landing_Landing__WEBPACK_IMPORTED_MODULE_6__);\nvar _this = undefined;\n\n\n\n\n // Defaults to weight 400\n\n\nvar Trending = function() {\n    // useEffect(() => {\n    //     const fetchTodayGames = async () => {\n    //         try {\n    //             // const newTrendingGames = await fetchTodayWNBAGames();\n    //             const newTrendingGames: any [] = [];\n    //             setHomePlayersLoad(true);\n    //             setTrendingGames(newTrendingGames);\n    //         }\n    //         catch (error) {\n    //             setHomePlayersLoad(true);\n    //             console.error('Error fetching today\\'s games:', error);\n    //         }\n    //     };\n    //     fetchTodayGames();\n    // }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Trending Players\"\n                    }, void 0, false, {\n                        fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Players playing games today and trending\"\n                    }, void 0, false, {\n                        fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"ahrefs-site-verification\",\n                        content: \"881627b9cdfce1e5ef0a890ec7d5477594ec45471d470d5eeaadea5976b61433\"\n                    }, void 0, false, {\n                        fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 13\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                lineNumber: 29,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    minHeight: \"100vh\",\n                    minWidth: \"100vw\",\n                    background: _data_colors__WEBPACK_IMPORTED_MODULE_2__.black,\n                    display: \"flex\",\n                    flexDirection: \"column\"\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Home_Landing_Landing__WEBPACK_IMPORTED_MODULE_6__.Landing, {}, void 0, false, {\n                    fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                    lineNumber: 36,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/bensonchen/Desktop/Projects/sportsStatsnext/test/prostatsFullstack/src/pages/index.tsx\",\n                lineNumber: 35,\n                columnNumber: 9\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_c = Trending;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Trending);\nvar _c;\n$RefreshReg$(_c, \"Trending\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBa0Q7QUFDWjtBQUNUO0FBQ0QsQ0FBQyx5QkFBeUI7QUFDdkI7QUFDOEI7QUFFN0QsSUFBTUksV0FBVztJQUNiLG9CQUFvQjtJQUNwQiw0Q0FBNEM7SUFDNUMsZ0JBQWdCO0lBQ2hCLHVFQUF1RTtJQUN2RSxtREFBbUQ7SUFDbkQsd0NBQXdDO0lBQ3hDLGtEQUFrRDtJQUNsRCxZQUFZO0lBQ1osMEJBQTBCO0lBQzFCLHdDQUF3QztJQUN4QyxzRUFBc0U7SUFDdEUsWUFBWTtJQUNaLFNBQVM7SUFFVCx5QkFBeUI7SUFDekIsVUFBVTtJQUVWLHFCQUNJOzswQkFFQSw4REFBQ0Ysa0RBQUlBOztrQ0FDRCw4REFBQ0c7a0NBQU87Ozs7OztrQ0FDUiw4REFBQ0M7d0JBQUtDLE1BQUs7d0JBQWNDLFNBQVM7Ozs7OztrQ0FDbEMsOERBQUNGO3dCQUFLQyxNQUFLO3dCQUEyQkMsU0FBUTs7Ozs7Ozs7Ozs7OzBCQUdsRCw4REFBQ0M7Z0JBQUlDLE9BQU87b0JBQUNDLFdBQVU7b0JBQVNDLFVBQVU7b0JBQVNDLFlBQVlaLCtDQUFLQTtvQkFBRWEsU0FBUTtvQkFBUUMsZUFBYztnQkFBUTswQkFDeEcsNEVBQUNaLHFFQUFPQTs7Ozs7Ozs7Ozs7O0FBS3BCO0tBakNNQztBQW1DTiwrREFBZUEsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJsYWNrIH0gZnJvbSAnLi4vZGF0YS9jb2xvcnMnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0ICdAZm9udHNvdXJjZS9yb2JvdG8nOyAvLyBEZWZhdWx0cyB0byB3ZWlnaHQgNDAwXG5pbXBvcnQgJ0Bmb250c291cmNlL2NvbWZvcnRhYSc7XG5pbXBvcnQgeyBMYW5kaW5nIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lL0xhbmRpbmcvTGFuZGluZyc7XG5cbmNvbnN0IFRyZW5kaW5nID0gKCkgPT4ge1xuICAgIC8vIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IGZldGNoVG9kYXlHYW1lcyA9IGFzeW5jICgpID0+IHtcbiAgICAvLyAgICAgICAgIHRyeSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc3QgbmV3VHJlbmRpbmdHYW1lcyA9IGF3YWl0IGZldGNoVG9kYXlXTkJBR2FtZXMoKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBuZXdUcmVuZGluZ0dhbWVzOiBhbnkgW10gPSBbXTtcbiAgICAvLyAgICAgICAgICAgICBzZXRIb21lUGxheWVyc0xvYWQodHJ1ZSk7XG4gICAgLy8gICAgICAgICAgICAgc2V0VHJlbmRpbmdHYW1lcyhuZXdUcmVuZGluZ0dhbWVzKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgICAgICAgICAgIHNldEhvbWVQbGF5ZXJzTG9hZCh0cnVlKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2RheVxcJ3MgZ2FtZXM6JywgZXJyb3IpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9O1xuICAgIFxuICAgIC8vICAgICBmZXRjaFRvZGF5R2FtZXMoKTtcbiAgICAvLyB9LCBbXSk7XG4gICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cblxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgIDx0aXRsZT57J1RyZW5kaW5nIFBsYXllcnMnfTwvdGl0bGU+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PXtcIlBsYXllcnMgcGxheWluZyBnYW1lcyB0b2RheSBhbmQgdHJlbmRpbmdcIn0gLz5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJhaHJlZnMtc2l0ZS12ZXJpZmljYXRpb25cIiBjb250ZW50PVwiODgxNjI3YjljZGZjZTFlNWVmMGE4OTBlYzdkNTQ3NzU5NGVjNDU0NzFkNDcwZDVlZWFhZGVhNTk3NmI2MTQzM1wiIC8+XG4gICAgICAgIDwvSGVhZD5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7bWluSGVpZ2h0OicxMDB2aCcsIG1pbldpZHRoOiAnMTAwdncnLCBiYWNrZ3JvdW5kOiBibGFjaywgZGlzcGxheTonZmxleCcsIGZsZXhEaXJlY3Rpb246J2NvbHVtbid9fT5cbiAgICAgICAgICAgIDxMYW5kaW5nIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlbmRpbmc7Il0sIm5hbWVzIjpbIlJlYWN0IiwiYmxhY2siLCJIZWFkIiwiTGFuZGluZyIsIlRyZW5kaW5nIiwidGl0bGUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJkaXYiLCJzdHlsZSIsIm1pbkhlaWdodCIsIm1pbldpZHRoIiwiYmFja2dyb3VuZCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});