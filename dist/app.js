/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var ts_promise_1 = __webpack_require__(5);
	var location_service_1 = __webpack_require__(15);
	var dto_converter_1 = __webpack_require__(16);
	window['initMap'] = initMap;
	function initMap() {
	    var app = new WheatherApp();
	    var locationService = new location_service_1.default();
	    var positionPromise = locationService.findLocation();
	    positionPromise.then(function (position) {
	        app.loadWheather(position);
	    });
	}
	var WheatherApp = (function () {
	    function WheatherApp() {
	    }
	    WheatherApp.prototype.loadWheather = function (position) {
	        var API_ID = '78306410734c69f481aa7b6cc4cd884c';
	        var lat = position.lat();
	        var lon = position.lng();
	        var api = "http://api.openweathermap.org/data/2.5/find/?lat=" + lat + "&lon=" + lon + "&APPID=" + API_ID + "&cnt=5&units=metric";
	        this.getApi(api).then(function (data) {
	            var converter = new dto_converter_1.default(data);
	            var cities = converter.parse();
	            var myCity = cities[0];
	            document.getElementById('my-location').innerHTML = "\n        <div>\n          <span><b>" + myCity.name + ": </b></span>\n          <img src=\"http://openweathermap.org/img/w/" + myCity.icon + ".png\">\n          <span>" + myCity.temperature + " \u00B0C</span>\n        </div>\n        <div>\n          <span><b>" + myCity.main + ": </b></span>\n          <span>" + myCity.description + "</span>\n        </div>\n      ";
	            var iDiv = document.getElementById('city-list');
	            var otherCities = cities.slice(1);
	            otherCities.forEach(function (city) {
	                var innerDiv = document.createElement('div');
	                innerDiv.className = 'city-wheather';
	                innerDiv.innerHTML = "\n          <div class=\"city-name\">" + city.name + "</div>\n          <div class=\"city-weather\">\n            <div class=\"temperature\">\n              <div>\n                <img src=\"http://openweathermap.org/img/w/" + city.icon + ".png\">\n              </div>\n              <div>\n                <span>" + city.temperature + " \u00B0C</span>\n              </div>\n            </div>\n            <div class=\"desc\">\n                <div>" + city.main + ":</div>\n                <div>" + city.description + "</div>\n            </div>\n          </div>\n        ";
	                iDiv.appendChild(innerDiv);
	            });
	        });
	    };
	    WheatherApp.prototype.getApi = function (url) {
	        return new ts_promise_1.default(function (resolve, reject) {
	            var request = new XMLHttpRequest();
	            request.open('GET', url);
	            request.onload = function () {
	                if (request.status == 200) {
	                    resolve(request.response);
	                }
	                else {
	                    reject(Error(request.statusText));
	                }
	            };
	            request.onerror = function () {
	                reject(Error("Network Error"));
	            };
	            request.send();
	        });
	    };
	    return WheatherApp;
	}());


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TS-Promise - fast, robust, type-safe promises
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	var Promise_1 = __webpack_require__(6);
	exports.default = Promise_1.default;
	exports.Promise = Promise_1.Promise;
	exports.UnhandledRejectionError = Promise_1.UnhandledRejectionError;
	var polyfill_1 = __webpack_require__(14);
	exports.polyfill = polyfill_1.default;
	// Temporary, should be moved to its own package some day
	var BaseError_1 = __webpack_require__(13);
	exports.BaseError = BaseError_1.default;
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promise implementation in TypeScript.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/* tslint:disable:no-unused-expression */ // prevent errors on `trace && trace(....)`
	// TODO:
	// - remove all "called = true"-type code in resolvers, replace by single check in _resolve()/_reject()
	// - add possibility for an unhandled-rejections-handler
	// - try to remove mangling of Error's .stack property on rejections with longTraces enabled
	var async_1 = __webpack_require__(7);
	var util_1 = __webpack_require__(10);
	var Trace_1 = __webpack_require__(11);
	var BaseError_1 = __webpack_require__(13);
	/**
	 * Thrown when a rejected promise is explicitly terminated with `.done()`.
	 */
	var UnhandledRejectionError = (function (_super) {
	    __extends(UnhandledRejectionError, _super);
	    function UnhandledRejectionError(reason, trace) {
	        _super.call(this, "UnhandledRejectionError", "unhandled rejection: " + reason);
	        this.reason = reason;
	        // TODO: Find a better way to merge the location of `.done()` in the
	        // trace, because nobody will look for this property...
	        this.trace = trace;
	        // In case we have a reason, and it has a stack: use it instead of our
	        // own stack, as it's more helpful to see where the original error was
	        // thrown, than where it was thrown inside the promise lib.
	        // In case we don't have a stack, explicitly state so, to not let people
	        // chase a problem in the promise lib that isn't there...
	        var stack = this.reason && typeof this.reason === "object" && this.reason.stack;
	        if (typeof stack !== "string") {
	            stack = String(reason);
	        }
	        this.stack = "UnhandledRejectionError: " + stack;
	    }
	    return UnhandledRejectionError;
	}(BaseError_1.default));
	exports.UnhandledRejectionError = UnhandledRejectionError;
	var trace = undefined;
	var longTraces = false;
	var State;
	(function (State) {
	    State[State["Pending"] = 0] = "Pending";
	    State[State["Fulfilled"] = 1] = "Fulfilled";
	    State[State["Rejected"] = 2] = "Rejected";
	})(State || (State = {}));
	function internalResolver(fulfill, reject) {
	    /* no-op, sentinel value */
	}
	internalResolver(undefined, undefined); // just for code coverage...
	function noop() {
	    /* no-op */
	}
	var getThenError = {
	    error: undefined,
	};
	function wrapNonError(a) {
	    // This is basically a marker for the places where we need to check
	    // handling of errors for .error() support.
	    // A no-op for now.
	    return a;
	}
	var dummyDoneTrace = new Trace_1.default();
	/**
	 * Currently unwrapping promise, while running one of its then-callbacks.
	 * Used to set the source of newly created promises.
	 * We guarantee that at most one callback of a then() is running at any time.
	 */
	var unwrappingPromise = undefined;
	var promiseIdCounter = 0;
	/**
	 * Fast, robust, type-safe promise implementation.
	 */
	var Promise = (function () {
	    /**
	     * Create new Promise.
	     *
	     * Pass a callback that will receive a `resolve()` and `reject()` function
	     * to seal the promise's fate.
	     *
	     * @param  resolver Called with resolve and reject functions
	     */
	    function Promise(resolver) {
	        var _this = this;
	        this._id = promiseIdCounter++;
	        this._state = 0 /* Pending */;
	        this._result = undefined; // Can be fulfillment value or rejection reason
	        this._handlers = undefined;
	        this._trace = undefined;
	        trace && trace(this, "construct");
	        if (longTraces) {
	            this._trace = new Trace_1.default(Promise);
	            if (unwrappingPromise) {
	                this._setSource(unwrappingPromise);
	            }
	        }
	        if (resolver === internalResolver) {
	            // Internally created promises pass 'internalResolver', signalling
	            // that resolving will be done by calling private methods on the
	            // Promise. This saves having to create 2 closures.
	            return;
	        }
	        if (typeof resolver !== "function") {
	            throw new TypeError("Promise resolver is not a function");
	        }
	        var called = false;
	        try {
	            resolver(function (y) {
	                if (called) {
	                    // 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called,
	                    // or multiple calls to the same argument are made, the first call
	                    // takes precedence, and any further calls are ignored.
	                    return;
	                }
	                // 2.3.3.3.1: If/when `resolvePromise` is called with value `y`,
	                // run `[[Resolve]](promise, y)`
	                called = true;
	                _this._resolve(y);
	            }, function (r) {
	                if (called) {
	                    // 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called,
	                    // or multiple calls to the same argument are made, the first call
	                    // takes precedence, and any further calls are ignored.
	                    return;
	                }
	                // 2.3.3.3.2: If/when `rejectPromise` is called with reason `r`,
	                // reject `promise` with `r`
	                called = true;
	                _this._reject(wrapNonError(r));
	            });
	        }
	        catch (e) {
	            // 2.3.3.3.4: If calling `then` throws an exception `e`,
	            // 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.
	            if (!called) {
	                // 2.3.3.3.4.2: Otherwise, reject `promise` with `e` as the reason.
	                called = true;
	                this._reject(wrapNonError(e));
	            }
	        }
	    }
	    /**
	     * Run either `onFulfilled` or `onRejected` callbacks when the promise is
	     * resolved. Returns another promise for the return value of such a
	     * callback.
	     *
	     * The callback will always be called at most once, and always
	     * asynchronously (i.e. some time after e.g. the `resolver` passed to the
	     * constructor has resolved the promise).
	     *
	     * Any error thrown or rejected promise returned from a callback will cause
	     * the returned promise to be rejected with that error.
	     *
	     * If either or both callbacks are missing, the fulfillment or rejection is
	     * passed on unmodified.
	     *
	     * Use `.catch(onRejected)` instead of `.then(undefined, onRejected)` for
	     * stronger typing, better readability, and more functionality (predicates).
	     *
	     * @param onFulfilled Callback called with promise's fulfillment
	     *                    value iff promise is fulfilled. Callback can return
	     *                    another value or promise for a value.
	     * @param onRejected  Optional callback called with promise's rejection
	     *                    reason iff promise is rejected. Callback can return
	     *                    another value or promise for a value.
	     * @return Promise for value returned by either of the callbacks
	     */
	    Promise.prototype.then = function (onFulfilled, onRejected) {
	        trace && trace(this, "then(" + typeof onFulfilled + ", " + typeof onRejected + ")");
	        if (this._state === 1 /* Fulfilled */ && typeof onFulfilled !== "function" ||
	            this._state === 2 /* Rejected */ && typeof onRejected !== "function") {
	            // Optimization: handler is short-circuited, so pass the result (value/rejection)
	            // through unmodified.
	            // The typecast is safe, because we either have a fulfillment value
	            // but no handler that could change the type, or a rejection without a
	            // handler that could change it, so R === T in this case.
	            // TODO: verify whether longTraces etc still work as expected
	            return this;
	        }
	        // Construct new Promise, but use subclassed constructor, if any
	        var slave = new (Object.getPrototypeOf(this).constructor)(internalResolver);
	        slave._setSource(this);
	        this._enqueue(onFulfilled, onRejected, slave, undefined);
	        return slave;
	    };
	    /**
	     * Run either `onFulfilled` or `onRejected` callbacks when the promise is
	     * resolved. If the callback throws an error or the returned value resolves
	     * to a rejection, the library will (asynchronously) throw an
	     * `UnhandledRejectionError` with that error.
	     *
	     * The callback will always be called at most once, and always
	     * asynchronously (i.e. some time after e.g. the `resolver` passed to the
	     * constructor has resolved the promise).
	     *
	     * @param onFulfilled Optional callback called with promise's fulfillment
	     *                    value iff promise is fulfilled. Any error thrown or
	     *                    rejection returned will cause an UnhandledRejectionError
	     *                    to be thrown.
	     * @param onRejected  Optional callback called with promise's rejection
	     *                    reason iff promise is rejected. Any error thrown or
	     *                    rejection returned will cause an UnhandledRejectionError
	     *                    to be thrown.
	     */
	    Promise.prototype.done = function (onFulfilled, onRejected) {
	        trace && trace(this, "done(" + typeof onFulfilled + ", " + typeof onRejected + ")");
	        if (this._state === 1 /* Fulfilled */ && typeof onFulfilled !== "function") {
	            return;
	        }
	        var doneTrace = dummyDoneTrace;
	        if (longTraces) {
	            doneTrace = new Trace_1.default();
	            if (this._trace) {
	                doneTrace.setSource(this._trace);
	            }
	        }
	        this._enqueue(onFulfilled, onRejected, undefined, doneTrace);
	    };
	    /**
	     * Catch only errors that match predicate in case promise is rejected.
	     * Predicate can be an Error (sub-)class, array of Error classes, or a
	     * function that can return true to indicate a match.
	     *
	     * The returned promise is resolved with the output of the callback, so it
	     * is possible to re-throw the error, but also to return a 'replacement'
	     * value that should be used instead.
	     *
	     * @param predicate   Optional Error class, array of Error classes or match
	     *                    function
	     * @param onRejected  Callback called with promise's rejection reason iff
	     *                    promise is rejected. Callback can return another value
	     *                    or promise for a value.
	     * @return Promise for original value, or 'replaced' value in case of error
	     */
	    Promise.prototype.catch = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            var onRejected = arguments[0];
	            return this.then(undefined, onRejected);
	        }
	        else {
	            var predicate_1 = arguments[0];
	            var onRejected_1 = arguments[1];
	            return this.then(undefined, function (reason) {
	                var match = false;
	                if (typeof predicate_1 === "function") {
	                    if (predicate_1.prototype instanceof Error || predicate_1 === Error) {
	                        match = reason instanceof predicate_1;
	                    }
	                    else {
	                        match = predicate_1(reason);
	                    }
	                }
	                else if (Array.isArray(predicate_1)) {
	                    for (var i = 0; i < predicate_1.length; i++) {
	                        if (reason instanceof predicate_1[i]) {
	                            match = true;
	                            break;
	                        }
	                    }
	                }
	                else {
	                    throw new TypeError("invalid predicate to .catch(), got " + typeof predicate_1);
	                }
	                if (match) {
	                    return onRejected_1(reason);
	                }
	                return Promise.reject(reason);
	            });
	        }
	    };
	    /**
	     * Asynchronous equivalent of try { } finally { }.
	     *
	     * Runs `handler` when promise resolves (fulfilled or rejected).
	     * Handler is passed the current promise (which is guaranteed to be
	     * resolved), and can be interrogated with e.g. `isFulfilled()`, `.value()`,
	     * etc.
	     *
	     * When `handler` returns `undefined` or its promise is fulfilled, the
	     * promise from `finally()` is resolved to the original promise's resolved
	     * value or rejection reason.
	     * If `handler` throws an error or returns a rejection, the result of
	     * `finally()` will be rejected with that error.
	     *
	     * Example:
	     * someLenghtyOperation().finally((result) => {
	     *   if (result.isFulfilled()) {
	     *     console.log("succeeded");
	     *   } else {
	     *     console.log("failed", result.reason());
	     *   }
	     * });
	     *
	     * @param  handler [description]
	     * @return promise with same value/reason as this one, after `handler`'s
	     *         result (if any) has been fulfilled, or a promise rejected with
	     *         `handler`'s error if it threw one or returned a rejection.
	     */
	    Promise.prototype.finally = function (handler) {
	        var _this = this;
	        var runner = function () { return handler(_this); };
	        return this.then(runner, runner).return(this);
	    };
	    /**
	     * @return `true` when promise is fulfilled, `false` otherwise.
	     */
	    Promise.prototype.isFulfilled = function () {
	        return this._state === 1 /* Fulfilled */;
	    };
	    /**
	     * @return `true` when promise is rejected, `false` otherwise.
	     */
	    Promise.prototype.isRejected = function () {
	        return this._state === 2 /* Rejected */;
	    };
	    /**
	     * @return `true` when promise is pending (may be resolved to another pending
	     *         promise), `false` otherwise.
	     */
	    Promise.prototype.isPending = function () {
	        return this._state === 0 /* Pending */;
	    };
	    /**
	     * @return Fulfillment value if fulfilled, otherwise throws an error.
	     */
	    Promise.prototype.value = function () {
	        if (!this.isFulfilled()) {
	            throw new Error("Promise is not fulfilled");
	        }
	        return this._result;
	    };
	    /**
	     * @return Rejection reason if rejected, otherwise throws an error.
	     */
	    Promise.prototype.reason = function () {
	        if (!this.isRejected()) {
	            throw new Error("Promise is not rejected");
	        }
	        return this._result;
	    };
	    /**
	     * @return A human-readable representation of the promise and its status.
	     */
	    Promise.prototype.inspect = function () {
	        return this.toString();
	    };
	    /**
	     * @return A human-readable representation of the promise and its status.
	     */
	    Promise.prototype.toString = function () {
	        var state;
	        switch (this._state) {
	            case 0 /* Pending */:
	                state = "pending";
	                break;
	            case 1 /* Fulfilled */:
	                state = "fulfilled";
	                break;
	            case 2 /* Rejected */:
	                state = "rejected";
	                break;
	            /* istanbul ignore next */
	            default: state = "unknown";
	        }
	        return "[Promise " + this._id + ": " + state + "]";
	    };
	    /**
	     * Create a promise that resolves with the same value of this promise, after
	     * `ms` milliseconds. The timer will start when the current promise is
	     * resolved.
	     * If the current promise is rejected, the resulting promise is also
	     * rejected, without waiting for the timer.
	     *
	     * @param ms Number of milliseconds to wait before resolving
	     * @return Promise that fulfills `ms` milliseconds after this promise fulfills
	     */
	    Promise.prototype.delay = function (ms) {
	        return this.then(function (value) {
	            return new Promise(function (resolve) {
	                setTimeout(function () { return resolve(value); }, ms);
	            });
	        });
	    };
	    /**
	     * Return a promise that resolves to `value` after this promise is
	     * fulfilled.
	     * Returned promise is rejected if this promise is rejected.
	     *
	     * Equivalent to `.then(() => value)`.
	     *
	     * @param value Value or promise for value of returned promise
	     * @return Promise resolved to value after this promise fulfills
	     */
	    Promise.prototype.return = function (value) {
	        if (value === undefined) {
	            // In TypeScript, we often need to 'force' a promise to become a
	            // void promise, so this is a common case. Prevents the closure.
	            // (Note: the any cast is just because TS assumes were going to
	            // return an R, but we're in fact going to return a void.)
	            return this.then(noop);
	        }
	        return this.then(function () { return value; });
	    };
	    /**
	     * Return a promise that is rejected with `reason` after this promise is
	     * fulfilled.
	     * If this promise is rejected, returned promise will rejected with that
	     * error instead.
	     *
	     * Equivalent to `.then(() => { throw value; })`.
	     *
	     * @param reason Error reason to reject returned promise with
	     * @return Promise rejected with `reason` after this promise fulfills
	     */
	    Promise.prototype.throw = function (reason) {
	        return this.then(function () { return Promise.reject(reason); });
	    };
	    /**
	     * Create an immediately resolved promise (in case of a 'normal' value), or
	     * a promise that 'follows' another `Thenable` (e.g. a Promise from another
	     * library).
	     *
	     * @param value Value (or Thenable for value) for returned promise
	     * @return Promise resolved to `value`
	     */
	    Promise.resolve = function (value) {
	        var p = new Promise(internalResolver);
	        p._resolve(value);
	        return p;
	    };
	    /**
	     * Create an immediately rejected promise.
	     *
	     * Note: to create a rejected promise of a certain type, use e.g.
	     * `Promise.reject<number>(myError)`
	     *
	     * @param reason Error object to set rejection reason
	     * @return Promise resolved to rejection `reason`
	     */
	    Promise.reject = function (reason) {
	        var p = new Promise(internalResolver);
	        p._reject(reason);
	        return p;
	    };
	    /**
	     * Return a promise for an array of all resolved input promises (or values).
	     * If any of the input promises is rejected, the returned promise is
	     * rejected with that reason.
	     * When passing an empty array, the promises is immediately resolved to an
	     * empty array.
	     *
	     * @param thenables Array of values or promises for them
	     * @return promise that resolves with array of all resolved values
	     */
	    Promise.all = function (thenables) {
	        return new Promise(function (resolve, reject) {
	            util_1.assert(Array.isArray(thenables), "thenables must be an Array");
	            if (thenables.length === 0) {
	                resolve([]);
	                return;
	            }
	            var result = new Array(thenables.length);
	            var remaining = thenables.length;
	            for (var i = 0; i < thenables.length; i++) {
	                follow(thenables[i], i);
	            }
	            function follow(t, index) {
	                var slave = t instanceof Promise ? t : Promise.resolve(t);
	                slave.done(function (v) {
	                    result[index] = v;
	                    remaining--;
	                    if (remaining === 0) {
	                        resolve(result);
	                    }
	                }, function (reason) { return reject(reason); });
	            }
	        });
	    };
	    /**
	     * Return a promise that resolves to the fulfillment or rejection of the
	     * first input promise that resolves.
	     * When passing an empty array, the promise will never resolve.
	     *
	     * @param thenables Array of values or promises for them
	     * @return promise that resolves to first resolved input promise
	     */
	    Promise.race = function (thenables) {
	        return new Promise(function (resolve, reject) {
	            util_1.assert(Array.isArray(thenables), "thenables must be an Array");
	            for (var i = 0; i < thenables.length; i++) {
	                var t = thenables[i];
	                var slave = t instanceof Promise ? t : Promise.resolve(t);
	                Promise.resolve(slave).done(resolve, reject);
	            }
	        });
	    };
	    /**
	     * Create tuple of a promise and its resolve and reject functions.
	     *
	     * It is generally better (and slightly faster) to use the Promise
	     * constructor to create a promise, as that will also catch any exception
	     * thrown while running the resolver.
	     *
	     * A Deferred can be useful in some scenarios though, e.g. when working with
	     * timers, protocol request/response pairs, etc.
	     *
	     * @return Deferred object, containing unresolved promise and its
	     *         resolve/reject functions
	     */
	    Promise.defer = function () {
	        var resolve;
	        var reject;
	        var p = new Promise(function (res, rej) {
	            resolve = res;
	            reject = rej;
	        });
	        return {
	            promise: p,
	            reject: reject,
	            resolve: resolve,
	        };
	    };
	    /**
	     * Create a promise that resolves to the given value (or promise for a
	     * value) after `ms` milliseconds. The timer will start when the given value
	     * is resolved.
	     * If the input value is a rejected promise, the resulting promise is also
	     * rejected, without waiting for the timer.
	     *
	     * @param value Value or promise for value to be delayed
	     * @param ms Number of milliseconds to wait before resolving
	     * @return Promise that fulfills `ms` milliseconds after given (promise for)
	     *         value is fulfilled
	     */
	    Promise.delay = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (arguments[1] === undefined) {
	            // delay(ms)
	            var ms_1 = arguments[0];
	            return new Promise(function (resolve) {
	                setTimeout(resolve, ms_1);
	            });
	        }
	        // delay(value, ms)
	        return Promise.resolve(arguments[0]).delay(arguments[1]);
	    };
	    /**
	     * Enable or disable long stack trace tracking on promises.
	     *
	     * This allows tracing a promise chain through the various asynchronous
	     * actions in a program. For example, when a promise is rejected, the last
	     * few locations of any preceding promises are included in the error's stack
	     * trace.
	     *
	     * Note: it is possible to enable/disable long tracing at runtime.
	     *
	     * When chaining off of a promise that was created while tracing was enabled
	     * (e.g. through `.then()`), all children will also have long traces, even
	     * when tracing is turned off. This allows to trace just some promise paths.
	     *
	     * Tracing is disabled by default as it incurs a memory and performance
	     * overhead, although it's still faster with tracing than some major
	     * promise libraries without tracing, so don't worry too much about it.
	     *
	     * @param enable Set to true to enable long traces, false to disable
	     */
	    Promise.setLongTraces = function (enable) {
	        longTraces = enable;
	    };
	    /**
	     * Set trace function that is called for internal state changes of a
	     * promise.
	     * Call with `undefined` or `null` to disable such tracing (this is the
	     * default).
	     *
	     * @param tracer Callback called for various stages during lifetime of a promise
	     */
	    Promise.setTracer = function (tracer) {
	        if (typeof tracer === "function") {
	            trace = tracer;
	        }
	        else {
	            trace = undefined;
	        }
	    };
	    /**
	     * Recursively flush the async callback queue until all `.then()` and
	     * `.done()` callbacks for fulfilled and rejected Promises have been called.
	     * Useful in e.g. unit tests to advance program state to the next 'tick'.
	     *
	     * Note that if e.g. `.done()` encounters a rejected promise, `flush()` will
	     * immediately throw an error (e.g. `UnhandledRejectionError`).
	     * It is safe to call `flush()` again afterwards, but it will also be called
	     * automatically by the async queue on the next 'real' tick.
	     *
	     * It is an error to call `flush()` while it is already running (e.g. from
	     * a `.then()` callback).
	     */
	    Promise.flush = function () {
	        async_1.default.flush();
	    };
	    Promise.prototype._setSource = function (source) {
	        if (!this._trace || !source._trace) {
	            return;
	        }
	        this._trace.setSource(source._trace);
	    };
	    Promise.prototype._resolve = function (x) {
	        // 2.1.2.1 When fulfilled, a promise must not transition to any other state.
	        // 2.1.3.1 When rejected, a promise must not transition to any other state.
	        util_1.assert(this._state === 0 /* Pending */);
	        if (!x) {
	            // Shortcut for falsy values, most notably void-Promises
	            // 2.3.4: If `x` is not an object or function, fulfill `promise` with `x`
	            this._fulfill(x);
	            return;
	        }
	        // 2.3.1: If promise and x refer to the same object, reject promise with a TypeError as the reason.
	        if (this === x) {
	            this._reject(new TypeError("cannot resolve Promise to self"));
	            return;
	        }
	        // 2.3.2: If `x` is a promise, adopt its state
	        if (x instanceof Promise) {
	            x._setSource(this);
	            if (x._state === 0 /* Pending */) {
	                // 2.3.2.1: If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.
	                this._followPromise(x);
	            }
	            else if (x._state === 1 /* Fulfilled */) {
	                // 2.3.2.2: If/when `x` is fulfilled, fulfill `promise` with the same value.
	                this._fulfill(x._result);
	            }
	            else {
	                // 2.3.2.3: If/when `x` is rejected, reject `promise` with the same reason.
	                this._reject(x._result);
	            }
	            return;
	        }
	        // 2.3.3: Otherwise, if `x` is an object or function,
	        if (typeof x === "object" || typeof x === "function") {
	            // 2.3.3.1: Let `then` be `x.then`
	            var then = this._tryGetThen(x);
	            // 2.3.3.2: If retrieving the property `x.then` results in a thrown
	            // exception `e`, reject `promise` with `e` as the reason.
	            if (then === getThenError) {
	                this._reject(wrapNonError(getThenError.error));
	                return;
	            }
	            // 2.3.3.3: If `then` is a function, call it with `x` as `this`,
	            //          first argument `resolvePromise`, and second argument `rejectPromise`
	            if (typeof then === "function") {
	                this._followThenable(x, then);
	                return;
	            }
	        }
	        // 2.3.4: If `x` is not an object or function, fulfill `promise` with `x`
	        this._fulfill(x);
	    };
	    Promise.prototype._tryGetThen = function (x) {
	        try {
	            // 2.3.3.1: Let `then` be `x.then`
	            var then = x.then;
	            return then;
	        }
	        catch (e) {
	            // 2.3.3.2: If retrieving the property `x.then` results in a thrown
	            // exception `e`, reject `promise` with `e` as the reason.
	            getThenError.error = e;
	            return getThenError;
	        }
	    };
	    Promise.prototype._fulfill = function (value) {
	        // 2.1.2.1 When fulfilled, a promise must not transition to any other state.
	        // 2.1.3.1 When rejected, a promise must not transition to any other state.
	        util_1.assert(this._state === 0 /* Pending */);
	        trace && trace(this, "_fulfill(" + typeof value + ")");
	        // 2.1.2.2 When fulfilled, a promise must have a value, which must not change.
	        this._state = 1 /* Fulfilled */;
	        this._result = value;
	        this._flush();
	    };
	    Promise.prototype._reject = function (reason) {
	        var _this = this;
	        // 2.1.2.1 When fulfilled, a promise must not transition to any other state.
	        // 2.1.3.1 When rejected, a promise must not transition to any other state.
	        util_1.assert(this._state === 0 /* Pending */);
	        trace && trace(this, "_reject(" + reason + ")");
	        // 2.1.3.2 When rejected, a promise must have a reason, which must not change.
	        this._state = 2 /* Rejected */;
	        this._result = reason;
	        if (this._trace && this._result instanceof Error && !this._result.trace) {
	            this._result.trace = this._trace;
	            // TODO: Meh, this always accesses '.stack', which is supposed to be expensive
	            var originalStack = this._result.stack;
	            // Stack may be undefined if e.g. a Stack Overflow occurred
	            if (originalStack) {
	                Object.defineProperty(this._result, "stack", {
	                    enumerable: false,
	                    get: function () { return originalStack + "\n  from Promise at:\n" + _this._trace.inspect(); },
	                });
	            }
	        }
	        this._flush();
	    };
	    Promise.prototype._followPromise = function (slave) {
	        // 2.1.2.1 When fulfilled, a promise must not transition to any other state.
	        // 2.1.3.1 When rejected, a promise must not transition to any other state.
	        util_1.assert(this._state === 0 /* Pending */);
	        trace && trace(this, "_follow([Promise " + slave._id + "])");
	        slave._enqueue(undefined, undefined, this, undefined);
	    };
	    Promise.prototype._followThenable = function (slave, then) {
	        var _this = this;
	        // 2.1.2.1 When fulfilled, a promise must not transition to any other state.
	        // 2.1.3.1 When rejected, a promise must not transition to any other state.
	        util_1.assert(this._state === 0 /* Pending */);
	        trace && trace(this, "_follow([Thenable])");
	        var called = false;
	        try {
	            // 2.3.3.3: If `then` is a function, call it with `x` as `this`,
	            //          first argument `resolvePromise`, and second argument `rejectPromise`
	            then.call(slave, function (y) {
	                if (called) {
	                    // 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called,
	                    // or multiple calls to the same argument are made, the first call
	                    // takes precedence, and any further calls are ignored.
	                    return;
	                }
	                // 2.3.3.3.1: If/when `resolvePromise` is called with value `y`,
	                // run `[[Resolve]](promise, y)`
	                called = true;
	                _this._resolve(y);
	            }, function (r) {
	                if (called) {
	                    // 2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called,
	                    // or multiple calls to the same argument are made, the first call
	                    // takes precedence, and any further calls are ignored.
	                    return;
	                }
	                // 2.3.3.3.2: If/when `rejectPromise` is called with reason `r`,
	                // reject `promise` with `r`
	                called = true;
	                _this._reject(wrapNonError(r));
	            });
	        }
	        catch (e) {
	            // 2.3.3.3.4: If calling `then` throws an exception `e`,
	            // 2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.
	            if (!called) {
	                // 2.3.3.3.4.2: Otherwise, reject `promise` with `e` as the reason.
	                called = true;
	                this._reject(wrapNonError(e));
	            }
	        }
	    };
	    Promise.prototype._enqueue = function (onFulfilled, onRejected, slave, done) {
	        var h = {
	            promise: this,
	            onFulfilled: onFulfilled,
	            onRejected: onRejected,
	            slave: slave,
	            done: done,
	        };
	        if (this._state !== 0 /* Pending */) {
	            async_1.default.enqueue(Promise._unwrapper, h);
	        }
	        else {
	            if (!this._handlers) {
	                this._handlers = [h];
	            }
	            else {
	                var i = this._handlers.length;
	                this._handlers[i] = h;
	            }
	        }
	    };
	    /**
	     * Schedule any pending .then()/.done() callbacks and follower-promises to
	     * be called/resolved.
	     * Clears our queue, any callbacks/followers attached after this will be
	     * scheduled without going through our handlers queue.
	     */
	    Promise.prototype._flush = function () {
	        if (!this._handlers) {
	            return;
	        }
	        var i = 0;
	        var h = this._handlers;
	        var l = h.length;
	        this._handlers = undefined;
	        while (i < l) {
	            // Note: we enqueue every single callback/follower separately,
	            // because e.g. .done() might throw and we need to ensure we can
	            // continue after that. async handles that for us.
	            // And because the queue needs to be processed in-order, we can't
	            // 'filter' the non-callback operations out either.
	            async_1.default.enqueue(Promise._unwrapper, h[i++]);
	        }
	    };
	    /**
	     * 'Unwrap' a promise handler, i.e. call a .then()/.done() callback, or
	     * resolve a promise that's following us.
	     * @param handler The handler being processed
	     */
	    Promise.prototype._unwrap = function (handler) {
	        var callback = this._state === 1 /* Fulfilled */ ? handler.onFulfilled : handler.onRejected;
	        if (handler.done) {
	            // Unwrap .done() callbacks
	            trace && trace(this, "_unwrap()");
	            if (typeof callback !== "function") {
	                // No callback: if we ended in a rejection, throw it, otherwise
	                // all was good.
	                if (this._state === 2 /* Rejected */) {
	                    var unhandled = new UnhandledRejectionError(this._result, handler.done);
	                    // TODO Allow intercepting these
	                    // Leave the comment after the throw: may show up in source line in node
	                    throw unhandled; // Unhandled exception caught by .done()
	                }
	                return;
	            }
	            util_1.assert(!unwrappingPromise);
	            unwrappingPromise = this;
	            try {
	                var result = callback(this._result);
	                if (result) {
	                    // May be a thenable, need to start following it...
	                    var p = (result instanceof Promise) ? result : Promise.resolve(result);
	                    p.done(); // Ensure it throws as soon as it's rejected
	                }
	                unwrappingPromise = undefined;
	            }
	            catch (e) {
	                unwrappingPromise = undefined;
	                // Wrap in UnhandledRejectionError
	                var unhandled = new UnhandledRejectionError(e, handler.done);
	                // TODO Allow intercepting these
	                // Leave the comment after the throw: may show up in source line in node
	                throw unhandled; // Unhandled exception caught by .done()
	            }
	            return;
	        }
	        // Unwrap .then() callbacks, or resolve 'parent' promise
	        //
	        // Three scenarios are handled here:
	        // 1. An onFulfilled callback was registered and promise is fulfilled,
	        //    or onRejected callback was registered and promise is rejected
	        //    -> callback is a function, slave is the promise that was returned
	        //       from the .then() call, so resolve slave with outcome of callback
	        // 2. An onFulfilled callback was registered but promise is rejected,
	        //    or onRejected callback was registered but promise is fulfilled
	        //    -> callback is not a function (typically `undefined`), slave is
	        //       promise that was returned from the .then() call, so resolve it
	        //       with our own result (thereby 'skipping' the .then())
	        // 3. Another promise attached itself on our 'callback queue' to be
	        //    resolved when we do (i.e. its fate is determined by us)
	        //    -> callbacks will both be undefined, slave is that other promise
	        //       that wants to be resolved with our result
	        var slave = handler.slave;
	        trace && trace(this, "_unwrap(" + slave._id + ")");
	        if (typeof callback === "function") {
	            // Case 1
	            util_1.assert(!unwrappingPromise);
	            unwrappingPromise = slave;
	            try {
	                // 2.2.5 handlers must be called as functions
	                slave._resolve(callback(this._result));
	            }
	            catch (e) {
	                slave._reject(wrapNonError(e));
	            }
	            unwrappingPromise = undefined;
	        }
	        else {
	            // Case 2 and 3
	            if (this._state === 1 /* Fulfilled */) {
	                slave._fulfill(this._result);
	            }
	            else {
	                slave._reject(this._result);
	            }
	        }
	    };
	    /**
	     * Helper for unwrapping promise handler.
	     * It's not a closure so it's cheap to schedule, and because it directly
	     * calls the _unwrap() method on a promise, it's (way) faster than having to
	     * use e.g. .call().
	     * @param handler The handler being processed
	     */
	    Promise._unwrapper = function (handler) {
	        handler.promise._unwrap(handler);
	    };
	    return Promise;
	}());
	exports.Promise = Promise;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Promise;
	//# sourceMappingURL=Promise.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/**
	 * Call queue for executing callbacks asynchronously.
	 *
	 * Prevents releasing Zalgo.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	// TODO:
	// - simpler code
	var util_1 = __webpack_require__(10);
	var CallQueue = (function () {
	    function CallQueue() {
	        this.length = 0;
	        // Basically twice the number of simultaneously resolving promises
	        this._max = 1000;
	        this._first = 0;
	    }
	    /**
	     * Push a new callback to the queue.
	     * @return true when the queue still has space, false if it's now 'full'
	     */
	    CallQueue.prototype.push = function (callback, arg) {
	        this[this.length++] = callback;
	        this[this.length++] = arg;
	        return this.length < this._max;
	    };
	    /**
	     * Flush all callbacks in this queue.
	     * Note that it is 'ok' for callbacks to throw an error;
	     * the next call to flush() will flush the remainder of the queue.
	     * When this function returns, the queue will be 'reset' to its beginning.
	     */
	    CallQueue.prototype.flush = function () {
	        while (this._first < this.length) {
	            var callback = this[this._first];
	            var arg = this[this._first + 1];
	            this[this._first] = this[this._first + 1] = undefined;
	            this._first += 2;
	            callback(arg);
	        }
	        this.length = 0;
	        this._first = 0;
	    };
	    return CallQueue;
	}());
	var Async = (function () {
	    function Async() {
	        var _this = this;
	        /* tslint:disable:member-ordering */ // trips on the arrow-function, thinks it's something public
	        this._pool = [];
	        this._ring = [new CallQueue()];
	        this._current = this._ring[0];
	        this._flusher = function () { return _this._scheduledFlush(); };
	        this._flushing = false;
	        this._scheduled = false;
	        this._scheduler = undefined;
	    }
	    /* tslint:enable:member-ordering */
	    /**
	     * Configure alternative scheduler to use.
	     * The scheduler function will be called with a flusher, which needs to be
	     * executed to flush the queue. Note: the flusher may throw an
	     * exception, if any of the callbacks on the queue throws one.
	     * This will result in another flush to be scheduled before returning.
	     *
	     * Call with `undefined` to reset the scheduler to the default (setImmediate).
	     *
	     * Example usage (this is basically the default):
	     *   setScheduler((flusher) => setImmediate(flusher));
	     */
	    Async.prototype.setScheduler = function (scheduler) {
	        /* tslint:disable:no-null-keyword */ // 'old' API told you to use `null` instead of `undefined`
	        util_1.assert(scheduler === undefined || scheduler === null || typeof scheduler === "function");
	        /* tslint:enable:no-null-keyword */
	        this._scheduler = scheduler;
	    };
	    Async.prototype.enqueue = function (callback, arg) {
	        if (!this._flushing && !this._scheduled) {
	            this._schedule();
	        }
	        if (!this._current) {
	            this._current = this._pool.pop();
	            if (!this._current) {
	                this._current = new CallQueue();
	            }
	            this._ring.push(this._current);
	        }
	        if (!this._current.push(callback, arg)) {
	            this._current = undefined;
	        }
	    };
	    Async.prototype.flush = function () {
	        util_1.assert(!this._flushing, "cannot recursively flush");
	        this._flushing = true;
	        try {
	            while (true) {
	                // Note: ring is guaranteed to have at least one queue (even though
	                // queue might be empty when flush() is e.g. called manually).
	                this._ring[0].flush();
	                // ring[0] is now guaranteed to be empty, so we could move it to
	                // the pool.
	                // However, if it's the last item remaining, better to simply
	                // leave it in the ring, saves unnecessary re-move on next
	                // enqueue.
	                if (this._ring.length === 1) {
	                    // First queue is now empty, so we can re-use it again (if
	                    // it was full last time)
	                    this._current = this._ring[0];
	                    break;
	                }
	                util_1.assert(this._current !== this._ring[0]);
	                this._pool.push(this._ring.shift());
	            }
	        }
	        finally {
	            this._flushing = false;
	            // If one of the callbacks in the queue throws an exception,
	            // (e.g. when Promise#done() detects a rejection) make sure to
	            // reschedule the remainder of the queue(s) for another iteration.
	            // This approach has the advantage of immediately allowing to stop
	            // the program in e.g. NodeJS, but also allows to continue running
	            // correctly in a browser.
	            if (this._ring[0].length > 0 && !this._scheduled) {
	                this._schedule();
	            }
	        }
	    };
	    Async.prototype._schedule = function () {
	        util_1.assert(!this._scheduled);
	        // Note: we 'fall back' to setImmediate here (instead of e.g.
	        // assigning it to the _scheduler property once), to allow
	        // setImmediate to be e.g. replaced by a mocked one (e.g. Sinon's
	        // useFakeTimers())
	        var scheduler = this._scheduler;
	        if (!scheduler) {
	            scheduler = typeof setImmediate === "function" ? setImmediate : setTimeout;
	        }
	        scheduler(this._flusher);
	        this._scheduled = true;
	    };
	    Async.prototype._scheduledFlush = function () {
	        // Indicate that this 'iteration' of the flush is complete.
	        this._scheduled = false;
	        this.flush();
	    };
	    return Async;
	}());
	exports.Async = Async;
	exports.async = new Async();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.async;
	//# sourceMappingURL=async.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(9).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(8).clearImmediate))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Helper utilities.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	/**
	 * Throw an Error when given condition is false.
	 *
	 * @param {any}    condition Condition, no-op when truthy, error thrown when falsy
	 * @param {string} msg       Optional text to include in error message
	 */
	function assert(condition, msg) {
	    if (!condition) {
	        throw new Error(msg ? "assertion failed: " + msg : "assertion failed");
	    }
	}
	exports.assert = assert;
	/**
	 * Return reference to the global object (if possible).
	 *
	 * @return {any} Reference to the global object (e.g. `window`, `global`, etc.),
	 *               or `undefined` if it could not be determined.
	 */
	function getGlobal() {
	    if (typeof self !== "undefined") {
	        return self;
	    }
	    if (typeof window !== "undefined") {
	        return window;
	    }
	    if (typeof global !== "undefined") {
	        return global;
	    }
	    // Otherwise, try to use `this`.
	    // We use eval-like behavior, because it will not inherit our "use strict",
	    // see http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
	    var g;
	    try {
	        g = new Function("return this")();
	    }
	    catch (e) {
	    }
	    return g;
	}
	exports.getGlobal = getGlobal;
	//# sourceMappingURL=util.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Helper class for capturing stack traces.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	// TODO:
	// - test/make it work in non-V8
	var Stack_1 = __webpack_require__(12);
	/**
	 * Stack trace container with optional source traces.
	 *
	 * Typically used for capturing traces across asynchronous calls (e.g.
	 * with Promises or Events).
	 */
	var Trace = (function () {
	    function Trace(ignoreUntil) {
	        if (ignoreUntil === void 0) { ignoreUntil = Trace; }
	        this.stack = new Stack_1.default(ignoreUntil);
	    }
	    /**
	     * Assign another Trace as the source of this Trace.
	     *
	     * Note: the stack of `source` is copied to this Trace, in order to allow
	     * truncating the trace length to `Trace.traceLimit` to prevent memory
	     * exhaustion on e.g. recursive traces.
	     *
	     * @param source Trace to use as source.
	     */
	    Trace.prototype.setSource = function (source) {
	        if (!source.sources) {
	            this.sources = [source.stack];
	        }
	        else {
	            this.sources = source.sources.concat(source.stack);
	            if (this.sources.length > Trace.traceLimit) {
	                this.sources = this.sources.slice(0, Trace.traceLimit);
	            }
	        }
	    };
	    Trace.prototype.inspect = function () {
	        var result = this.stack.inspect();
	        if (this.sources) {
	            for (var i = this.sources.length - 1; i >= 0; i--) {
	                result += "\n  from previous:\n" + this.sources[i].inspect();
	            }
	        }
	        return result;
	    };
	    Trace.traceLimit = 10;
	    return Trace;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Trace;
	//# sourceMappingURL=Trace.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Helper class for capturing stack traces.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	// TODO:
	// - test/make it work in non-V8
	// - parse stacks into platform-independent object-arrays
	var hasStacks = (typeof Error.captureStackTrace === "function");
	var Stack = (function () {
	    function Stack(ignoreUntil) {
	        if (ignoreUntil === void 0) { ignoreUntil = Stack; }
	        /* istanbul ignore else */ // TODO: remove when testing for non-V8
	        if (hasStacks) {
	            Error.captureStackTrace(this, ignoreUntil);
	        }
	        else {
	            this.stack = "dummy\n<no trace>";
	        }
	    }
	    Stack.prototype.inspect = function () {
	        var lines = this.stack.split("\n");
	        lines.shift(); // Strip the "[object Object]" line
	        return lines.join("\n");
	    };
	    return Stack;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Stack;
	//# sourceMappingURL=Stack.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Base class for custom errors.
	 *
	 * Copyright (C) 2015 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hasStacks = (typeof Error.captureStackTrace === "function");
	var BaseError = (function (_super) {
	    __extends(BaseError, _super);
	    function BaseError(name, message) {
	        _super.call(this, message);
	        this.name = name;
	        // Note: still need to 'manually' assign .message,
	        // because engines apparently don't allow subclassing properly.
	        // https://github.com/Microsoft/TypeScript/issues/1168#issuecomment-107729088
	        this.message = message;
	        /* istanbul ignore else */ // TODO: remove when testing for non-V8
	        if (hasStacks) {
	            Error.captureStackTrace(this, this.constructor);
	        }
	        else {
	            this.stack = "dummy\n<no trace>";
	        }
	    }
	    return BaseError;
	}(Error));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BaseError;
	//# sourceMappingURL=BaseError.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Polyfill implementation.
	 *
	 * Copyright (C) 2016 Martin Poelstra
	 * License: MIT
	 */
	"use strict";
	var Promise_1 = __webpack_require__(6);
	var util_1 = __webpack_require__(10);
	/**
	 * Polyfill global `Promise` instance with ts-promise version.
	 * By default, it will only install a ts-promise version if no other
	 * implementation is present. Use `force = true` to unconditionally replace the
	 * promise implementation.
	 *
	 * Warning: in general, it's not really recommended to use polyfills, because
	 * other libraries may e.g. use the fact that certain platform features are
	 * absent to create a 'fingerprint' of a platform, and it may conflict with
	 * other libraries that are trying to do the same thing.
	 * If you're writing your own library, it's much better to simply directly
	 * require/import ts-promise, and use its class directly.
	 * However, if you're the 'end-user' (i.e. application, not a library), it may
	 * be a viable solution to make Promises available on platforms that otherwise
	 * don't have them.
	 *
	 * @param  {boolean}  force (Optional, default false) Forcibly overwrite existing Promise implementation with ts-promise version.
	 * @return {boolean}        Returns true when global Promise is (now) a ts-promise (or derived class), false otherwise.
	 */
	function polyfill(force) {
	    if (force === void 0) { force = false; }
	    // Get reference to globals (`global`, `window`, etc.)
	    var global = util_1.getGlobal();
	    if (!global) {
	        return false;
	    }
	    if (force || typeof global.Promise !== "function") {
	        global.Promise = Promise_1.Promise;
	        return true;
	    }
	    return global.Promise instanceof Promise_1.Promise;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = polyfill;
	//# sourceMappingURL=polyfill.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ts_promise_1 = __webpack_require__(5);
	var LocationService = (function () {
	    function LocationService() {
	    }
	    LocationService.prototype.findLocation = function () {
	        var current = new google.maps.LatLng(-34.397, 150.644);
	        var map = new google.maps.Map(document.getElementById('map'), {
	            center: current,
	            zoom: 10
	        });
	        var infoWindow = new google.maps.InfoWindow(map);
	        return new ts_promise_1.default(function (resolve, reject) {
	            // Try HTML5 geolocation.
	            if (navigator.geolocation) {
	                navigator.geolocation.getCurrentPosition(function (position) {
	                    var coords = position.coords;
	                    current = new google.maps.LatLng(coords.latitude, coords.longitude);
	                    infoWindow.setPosition(current);
	                    infoWindow.setContent('Location found.');
	                    map.setCenter(current);
	                    resolve(current);
	                }, function () {
	                    this.handleLocationError(true, infoWindow, map.getCenter());
	                    reject(null);
	                });
	            }
	            else {
	                // Browser doesn't support Geolocation
	                this.handleLocationError(false, infoWindow, map.getCenter());
	                reject(null);
	            }
	        });
	    };
	    LocationService.prototype.handleLocationError = function (browserSupport, infoWindow, pos) {
	        infoWindow.setPosition(pos);
	        infoWindow.setContent(browserSupport ?
	            'Error: The Geolocation service failed.' :
	            'Error: Your browser doesn\'t support geolocation.');
	    };
	    return LocationService;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LocationService;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var weather_dto_1 = __webpack_require__(17);
	var DtoConverter = (function () {
	    function DtoConverter(_data) {
	        this._data = _data;
	    }
	    DtoConverter.prototype.parse = function () {
	        var _this = this;
	        var jsonData = JSON.parse(this._data);
	        var cities = jsonData['list'];
	        var wheather = cities.map(function (city) { return _this.parseCity(city); });
	        return wheather;
	    };
	    DtoConverter.prototype.parseCity = function (dto) {
	        var city = new weather_dto_1.default();
	        city.name = dto.name;
	        city.temperature = dto.main.temp;
	        city.main = dto.weather[0].main;
	        city.description = dto.weather[0].description;
	        city.icon = dto.weather[0].icon;
	        return city;
	    };
	    return DtoConverter;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DtoConverter;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var CityWheather = (function () {
	    function CityWheather() {
	    }
	    Object.defineProperty(CityWheather.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        set: function (value) {
	            this._name = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CityWheather.prototype, "temperature", {
	        get: function () {
	            return this._temperature;
	        },
	        set: function (value) {
	            this._temperature = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CityWheather.prototype, "main", {
	        get: function () {
	            return this._main;
	        },
	        set: function (value) {
	            this._main = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CityWheather.prototype, "description", {
	        get: function () {
	            return this._description;
	        },
	        set: function (value) {
	            this._description = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CityWheather.prototype, "icon", {
	        get: function () {
	            return this._icon;
	        },
	        set: function (value) {
	            this._icon = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CityWheather;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CityWheather;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map