/*!
 * 
 *   probaclick - Predict a and respond to a user's intention by the amount of time they spend hovering over an element.
 *   Author: Alex MacArthur
 *   Version: v1.0.0
 *   URL: https://github.com/alexmacarthur/probaclick#readme
 *   License: MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ProbaClick"] = factory();
	else
		root["ProbaClick"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementWatcher__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toArrayOfNodes__ = __webpack_require__(2);



console.log('hi');

/* harmony default export */ __webpack_exports__["default"] = (function (elements, { max = null, delay = 1000, callback = () => {} } = {}) {
  elements = Object(__WEBPACK_IMPORTED_MODULE_1__toArrayOfNodes__["a" /* default */])(elements);

  if (!elements.length) return [];

  return elements.map(link => {
    return new __WEBPACK_IMPORTED_MODULE_0__ElementWatcher__["a" /* default */](link, {
      delay,
      callback,
      max
    });
  });
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ElementWatcher {
  constructor(link, { max, delay, callback } = {}) {
    this.max = max;
    this.link = link;
    this.delay = delay;
    this.callback = callback;

    this.fireCount = 0;
    this.hoverStart = 0;
    this.timerStore = 0;
    this.timeout = null;
    this.eventHandlers = {
      mouseover: this.handleMouseOver.bind(this),
      mouseleave: this.handleMouseLeave.bind(this)
    };

    this.attachListeners();

    console.log('hi');

    window.addEventListener('mousemove', e => {
      console.log(e.pageX);
      console.log(e.pageY);
    });
  }

  attachListeners() {
    this.link.addEventListener("mouseover", this.eventHandlers.mouseover);
    this.link.addEventListener("mouseleave", this.eventHandlers.mouseleave);
  }

  handleMouseOver() {
    this.hoverStart = Date.now();

    this.timeout = setTimeout(() => {
      //-- FIRE!
      this.callback(this.link);

      this.fireCount++;

      this.timerStore = 0;

      if (this.max !== null && this.fireCount >= this.max) {
        this.removeListeners();
      }
    }, this.delay - this.timerStore);
  }

  handleMouseLeave() {
    //-- Do not update immediately after firing.
    this.updateTimerStore();
    clearTimeout(this.timeout);
  }

  removeListeners() {
    for (let i in this.eventHandlers) {
      this.link.removeEventListener(i, this.eventHandlers[i]);
    }
  }

  updateTimerStore() {
    this.timerStore = this.timerStore + (Date.now() - this.hoverStart);

    return this.timerStore;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementWatcher;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (thing) {
  if (typeof thing === "string") {
    thing = document.querySelectorAll(thing);
  } else if (!(thing instanceof NodeList)) {
    thing = [thing];
  }

  return [].slice.call(thing);
});

/***/ })
/******/ ])["default"];
});