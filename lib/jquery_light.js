/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function (selector, callback) {
  const queue = [];
  if (document.readyState !== "complete" && typeof(callback) === "function") {
    queue.push(callback);
  }
  if (document.readyState === "complete" && typeof(callback) === "function") {
    queue.push(callback);
    queue.forEach ((func) => {
      func();
    });
  }

  if (selector instanceof(HTMLElement)) {
    return new DOMNodeCollection(Array.from(selector));
  }
  const nodeList = document.querySelectorAll(selector);
  return new DOMNodeCollection(Array.from(nodeList));
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string === undefined) {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach ( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(content) {
    this.array.forEach( (el) => {
      el.insertAdjacentHTML("beforeend", content);
    });
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.array.forEach( node => node.setAttribute(key, val) );
    } else {
      return this.array[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.array.forEach( (el) => {
      el.classList.add(className);
    });
    return this.array;
  }

  removeClass(className) {
    this.array.forEach( (el) => {
      el.classList.remove(className);
    });
    return this.array;
  }

  children() {
    let answer = [];
    this.array.forEach( (el) => {
      answer = answer.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(answer);
  }

  parent() {
    let answer = [];
    this.array.forEach( (el) => {
      if (!answer.includes(el.parentElement)) {
        answer = answer.concat(el.parentElement);
      }
    });
    return new DOMNodeCollection(answer);
  }

  find(selector) {
    let answer = [];
    this.array.forEach( (el) => {
      answer = answer.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(answer);
  }

  css(style, value) {
    if (this.attr('style') === null) {
      return this.attr(`style`, `${style}: ${value};`)
    } else {
      this.attr('style', this.attr('style').concat(`${style}: ${value};`))
    }
  }

  remove() {
    this.array.forEach( (el) => {
      el.remove();
    });
  }

  on(eve, func) {
    this.array.forEach( (el) => {
      el.addEventListener(eve, func);
      el[eve] = func;
    });
  }

  off(eve) {
    let func = this.func;
    this.array.forEach( (el) => {
      el.removeEventListener(eve, el.func[eve]);
    });
  }

  extend(...args) {
    let result = {};
    args.forEach( (el) => {
      for(var key in el) {
        if (el.hasOwnProperty(key)) {
          result[key] = el[key];
        }
      }
    });
    return result;
  }

  ajax(options) {
    let normal = {
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      type: "GET",
      data: "data",
      success(data) {
        console.log('default success');
      },
      error() {
        console.error("default error");
      }
    };
    let request = this.extend(normal, options);

    const xhr = new XMLHttpRequest();
    xhr.open(request.type, request.url);
    xhr.onload = function() {
      console.log(xhr.status);
      console.log(xhr.responseType);
      console.log(xhr.response);
    };

    const optionalData = request.data;
    xhr.send(optionalData);
  }


}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);