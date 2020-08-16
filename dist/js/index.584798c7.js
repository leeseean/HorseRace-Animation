!function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
            return e[t]
        }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 28)
}([function (e, t, r) {
    "use strict";
    var n = r(2), o = Object.prototype.toString;

    function i(e) {
        return "[object Array]" === o.call(e)
    }

    function s(e) {
        return void 0 === e
    }

    function a(e) {
        return null !== e && "object" == typeof e
    }

    function u(e) {
        return "[object Function]" === o.call(e)
    }

    function c(e, t) {
        if (null != e) if ("object" != typeof e && (e = [e]), i(e)) for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
    }

    e.exports = {
        isArray: i, isArrayBuffer: function (e) {
            return "[object ArrayBuffer]" === o.call(e)
        }, isBuffer: function (e) {
            return null !== e && !s(e) && null !== e.constructor && !s(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        }, isFormData: function (e) {
            return "undefined" != typeof FormData && e instanceof FormData
        }, isArrayBufferView: function (e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
        }, isString: function (e) {
            return "string" == typeof e
        }, isNumber: function (e) {
            return "number" == typeof e
        }, isObject: a, isUndefined: s, isDate: function (e) {
            return "[object Date]" === o.call(e)
        }, isFile: function (e) {
            return "[object File]" === o.call(e)
        }, isBlob: function (e) {
            return "[object Blob]" === o.call(e)
        }, isFunction: u, isStream: function (e) {
            return a(e) && u(e.pipe)
        }, isURLSearchParams: function (e) {
            return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        }, isStandardBrowserEnv: function () {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
        }, forEach: c, merge: function e() {
            var t = {};

            function r(r, n) {
                "object" == typeof t[n] && "object" == typeof r ? t[n] = e(t[n], r) : t[n] = r
            }

            for (var n = 0, o = arguments.length; n < o; n++) c(arguments[n], r);
            return t
        }, deepMerge: function e() {
            var t = {};

            function r(r, n) {
                "object" == typeof t[n] && "object" == typeof r ? t[n] = e(t[n], r) : t[n] = "object" == typeof r ? e({}, r) : r
            }

            for (var n = 0, o = arguments.length; n < o; n++) c(arguments[n], r);
            return t
        }, extend: function (e, t, r) {
            return c(t, (function (t, o) {
                e[o] = r && "function" == typeof t ? n(t, r) : t
            })), e
        }, trim: function (e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        }
    }
}, function (e, t, r) {
    e.exports = r(10)
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
        return function () {
            for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
            return e.apply(t, r)
        }
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);

    function o(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }

    e.exports = function (e, t, r) {
        if (!t) return e;
        var i;
        if (r) i = r(t); else if (n.isURLSearchParams(t)) i = t.toString(); else {
            var s = [];
            n.forEach(t, (function (e, t) {
                null != e && (n.isArray(e) ? t += "[]" : e = [e], n.forEach(e, (function (e) {
                    n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)), s.push(o(t) + "=" + o(e))
                })))
            })), i = s.join("&")
        }
        if (i) {
            var a = e.indexOf("#");
            -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + i
        }
        return e
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return !(!e || !e.__CANCEL__)
    }
}, function (e, t, r) {
    "use strict";
    (function (t) {
        var n = r(0), o = r(16), i = {"Content-Type": "application/x-www-form-urlencoded"};

        function s(e, t) {
            !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
        }

        var a, u = {
            adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== t && "[object process]" === Object.prototype.toString.call(t)) && (a = r(6)), a),
            transformRequest: [function (e, t) {
                return o(t, "Accept"), o(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e) ? e : n.isArrayBufferView(e) ? e.buffer : n.isURLSearchParams(e) ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : n.isObject(e) ? (s(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
            }],
            transformResponse: [function (e) {
                if ("string" == typeof e) try {
                    e = JSON.parse(e)
                } catch (e) {
                }
                return e
            }],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function (e) {
                return e >= 200 && e < 300
            }
        };
        u.headers = {common: {Accept: "application/json, text/plain, */*"}}, n.forEach(["delete", "get", "head"], (function (e) {
            u.headers[e] = {}
        })), n.forEach(["post", "put", "patch"], (function (e) {
            u.headers[e] = n.merge(i)
        })), e.exports = u
    }).call(this, r(15))
}, function (e, t, r) {
    "use strict";
    var n = r(0), o = r(17), i = r(3), s = r(19), a = r(22), u = r(23), c = r(7);
    e.exports = function (e) {
        return new Promise((function (t, f) {
            var l = e.data, p = e.headers;
            n.isFormData(l) && delete p["Content-Type"];
            var h = new XMLHttpRequest;
            if (e.auth) {
                var d = e.auth.username || "", m = e.auth.password || "";
                p.Authorization = "Basic " + btoa(d + ":" + m)
            }
            var y = s(e.baseURL, e.url);
            if (h.open(e.method.toUpperCase(), i(y, e.params, e.paramsSerializer), !0), h.timeout = e.timeout, h.onreadystatechange = function () {
                if (h && 4 === h.readyState && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                    var r = "getAllResponseHeaders" in h ? a(h.getAllResponseHeaders()) : null, n = {
                        data: e.responseType && "text" !== e.responseType ? h.response : h.responseText,
                        status: h.status,
                        statusText: h.statusText,
                        headers: r,
                        config: e,
                        request: h
                    };
                    o(t, f, n), h = null
                }
            }, h.onabort = function () {
                h && (f(c("Request aborted", e, "ECONNABORTED", h)), h = null)
            }, h.onerror = function () {
                f(c("Network Error", e, null, h)), h = null
            }, h.ontimeout = function () {
                var t = "timeout of " + e.timeout + "ms exceeded";
                e.timeoutErrorMessage && (t = e.timeoutErrorMessage), f(c(t, e, "ECONNABORTED", h)), h = null
            }, n.isStandardBrowserEnv()) {
                var g = r(24), v = (e.withCredentials || u(y)) && e.xsrfCookieName ? g.read(e.xsrfCookieName) : void 0;
                v && (p[e.xsrfHeaderName] = v)
            }
            if ("setRequestHeader" in h && n.forEach(p, (function (e, t) {
                void 0 === l && "content-type" === t.toLowerCase() ? delete p[t] : h.setRequestHeader(t, e)
            })), n.isUndefined(e.withCredentials) || (h.withCredentials = !!e.withCredentials), e.responseType) try {
                h.responseType = e.responseType
            } catch (t) {
                if ("json" !== e.responseType) throw t
            }
            "function" == typeof e.onDownloadProgress && h.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && h.upload && h.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function (e) {
                h && (h.abort(), f(e), h = null)
            })), void 0 === l && (l = null), h.send(l)
        }))
    }
}, function (e, t, r) {
    "use strict";
    var n = r(18);
    e.exports = function (e, t, r, o, i) {
        var s = new Error(e);
        return n(s, t, r, o, i)
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function (e, t) {
        t = t || {};
        var r = {}, o = ["url", "method", "params", "data"], i = ["headers", "auth", "proxy"],
            s = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];
        n.forEach(o, (function (e) {
            void 0 !== t[e] && (r[e] = t[e])
        })), n.forEach(i, (function (o) {
            n.isObject(t[o]) ? r[o] = n.deepMerge(e[o], t[o]) : void 0 !== t[o] ? r[o] = t[o] : n.isObject(e[o]) ? r[o] = n.deepMerge(e[o]) : void 0 !== e[o] && (r[o] = e[o])
        })), n.forEach(s, (function (n) {
            void 0 !== t[n] ? r[n] = t[n] : void 0 !== e[n] && (r[n] = e[n])
        }));
        var a = o.concat(i).concat(s), u = Object.keys(t).filter((function (e) {
            return -1 === a.indexOf(e)
        }));
        return n.forEach(u, (function (n) {
            void 0 !== t[n] ? r[n] = t[n] : void 0 !== e[n] && (r[n] = e[n])
        })), r
    }
}, function (e, t, r) {
    "use strict";

    function n(e) {
        this.message = e
    }

    n.prototype.toString = function () {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }, n.prototype.__CANCEL__ = !0, e.exports = n
}, function (e, t, r) {
    "use strict";
    var n = r(0), o = r(2), i = r(11), s = r(8);

    function a(e) {
        var t = new i(e), r = o(i.prototype.request, t);
        return n.extend(r, i.prototype, t), n.extend(r, t), r
    }

    var u = a(r(5));
    u.Axios = i, u.create = function (e) {
        return a(s(u.defaults, e))
    }, u.Cancel = r(9), u.CancelToken = r(25), u.isCancel = r(4), u.all = function (e) {
        return Promise.all(e)
    }, u.spread = r(26), e.exports = u, e.exports.default = u
}, function (e, t, r) {
    "use strict";
    var n = r(0), o = r(3), i = r(12), s = r(13), a = r(8);

    function u(e) {
        this.defaults = e, this.interceptors = {request: new i, response: new i}
    }

    u.prototype.request = function (e) {
        "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = a(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
        var t = [s, void 0], r = Promise.resolve(e);
        for (this.interceptors.request.forEach((function (e) {
            t.unshift(e.fulfilled, e.rejected)
        })), this.interceptors.response.forEach((function (e) {
            t.push(e.fulfilled, e.rejected)
        })); t.length;) r = r.then(t.shift(), t.shift());
        return r
    }, u.prototype.getUri = function (e) {
        return e = a(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
    }, n.forEach(["delete", "get", "head", "options"], (function (e) {
        u.prototype[e] = function (t, r) {
            return this.request(n.merge(r || {}, {method: e, url: t}))
        }
    })), n.forEach(["post", "put", "patch"], (function (e) {
        u.prototype[e] = function (t, r, o) {
            return this.request(n.merge(o || {}, {method: e, url: t, data: r}))
        }
    })), e.exports = u
}, function (e, t, r) {
    "use strict";
    var n = r(0);

    function o() {
        this.handlers = []
    }

    o.prototype.use = function (e, t) {
        return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
    }, o.prototype.eject = function (e) {
        this.handlers[e] && (this.handlers[e] = null)
    }, o.prototype.forEach = function (e) {
        n.forEach(this.handlers, (function (t) {
            null !== t && e(t)
        }))
    }, e.exports = o
}, function (e, t, r) {
    "use strict";
    var n = r(0), o = r(14), i = r(4), s = r(5);

    function a(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }

    e.exports = function (e) {
        return a(e), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) {
            delete e.headers[t]
        })), (e.adapter || s.adapter)(e).then((function (t) {
            return a(e), t.data = o(t.data, t.headers, e.transformResponse), t
        }), (function (t) {
            return i(t) || (a(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
        }))
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function (e, t, r) {
        return n.forEach(r, (function (r) {
            e = r(e, t)
        })), e
    }
}, function (e, t) {
    var r, n, o = e.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function s() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
            return r(e, 0)
        } catch (t) {
            try {
                return r.call(null, e, 0)
            } catch (t) {
                return r.call(this, e, 0)
            }
        }
    }

    !function () {
        try {
            r = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            r = i
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (e) {
            n = s
        }
    }();
    var u, c = [], f = !1, l = -1;

    function p() {
        f && u && (f = !1, u.length ? c = u.concat(c) : l = -1, c.length && h())
    }

    function h() {
        if (!f) {
            var e = a(p);
            f = !0;
            for (var t = c.length; t;) {
                for (u = c, c = []; ++l < t;) u && u[l].run();
                l = -1, t = c.length
            }
            u = null, f = !1, function (e) {
                if (n === clearTimeout) return clearTimeout(e);
                if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                try {
                    n(e)
                } catch (t) {
                    try {
                        return n.call(null, e)
                    } catch (t) {
                        return n.call(this, e)
                    }
                }
            }(e)
        }
    }

    function d(e, t) {
        this.fun = e, this.array = t
    }

    function m() {
    }

    o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        c.push(new d(e, t)), 1 !== c.length || f || a(h)
    }, d.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, o.listeners = function (e) {
        return []
    }, o.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function () {
        return "/"
    }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function () {
        return 0
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function (e, t) {
        n.forEach(e, (function (r, n) {
            n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n])
        }))
    }
}, function (e, t, r) {
    "use strict";
    var n = r(7);
    e.exports = function (e, t, r) {
        var o = r.config.validateStatus;
        !o || o(r.status) ? e(r) : t(n("Request failed with status code " + r.status, r.config, null, r.request, r))
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t, r, n, o) {
        return e.config = t, r && (e.code = r), e.request = n, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code
            }
        }, e
    }
}, function (e, t, r) {
    "use strict";
    var n = r(20), o = r(21);
    e.exports = function (e, t) {
        return e && !n(t) ? o(e, t) : t
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0),
        o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function (e) {
        var t, r, i, s = {};
        return e ? (n.forEach(e.split("\n"), (function (e) {
            if (i = e.indexOf(":"), t = n.trim(e.substr(0, i)).toLowerCase(), r = n.trim(e.substr(i + 1)), t) {
                if (s[t] && o.indexOf(t) >= 0) return;
                s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([r]) : s[t] ? s[t] + ", " + r : r
            }
        })), s) : s
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = n.isStandardBrowserEnv() ? function () {
        var e, t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");

        function o(e) {
            var n = e;
            return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
                href: r.href,
                protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                host: r.host,
                search: r.search ? r.search.replace(/^\?/, "") : "",
                hash: r.hash ? r.hash.replace(/^#/, "") : "",
                hostname: r.hostname,
                port: r.port,
                pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
            }
        }

        return e = o(window.location.href), function (t) {
            var r = n.isString(t) ? o(t) : t;
            return r.protocol === e.protocol && r.host === e.host
        }
    }() : function () {
        return !0
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = n.isStandardBrowserEnv() ? {
        write: function (e, t, r, o, i, s) {
            var a = [];
            a.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), n.isString(o) && a.push("path=" + o), n.isString(i) && a.push("domain=" + i), !0 === s && a.push("secure"), document.cookie = a.join("; ")
        }, read: function (e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        }, remove: function (e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write: function () {
        }, read: function () {
            return null
        }, remove: function () {
        }
    }
}, function (e, t, r) {
    "use strict";
    var n = r(9);

    function o(e) {
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise((function (e) {
            t = e
        }));
        var r = this;
        e((function (e) {
            r.reason || (r.reason = new n(e), t(r.reason))
        }))
    }

    o.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason
    }, o.source = function () {
        var e;
        return {
            token: new o((function (t) {
                e = t
            })), cancel: e
        }
    }, e.exports = o
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return function (t) {
            return e.apply(null, t)
        }
    }
}, function (e, t, r) {
}, function (e, t, r) {
    "use strict";

    function n(e) {
        return e.map((function (t, r) {
            return e[e.length - 1 - r]
        }))
    }

    function o() {
        return !(!window.ActiveXObject && !("ActiveXObject" in window))
    }

    function i(e, t) {
        return Math.random() * (t - e) + e
    }

    function s(e) {
        return document.querySelector(e)
    }

    function a(e) {
        return document.querySelectorAll(e)
    }

    function u(e, t) {
        return Object.keys(e).map((function (t, r) {
            return {_key: t, _value: e[t]}
        })).find((function (e, r) {
            return e._value == t
        }))._key
    }

    r.r(t);
    var c = r(1), f = r.n(c);

    function l(e) {
        return f()({url: "/api/", params: e})
    }

    f.a.defaults.timeout = 15e3, f.a.defaults.retry = 3, f.a.defaults.retryDelay = 200, f.a.interceptors.response.use((function (e) {
        return e
    }), (function (e) {
        var t = e.config;
        return t && t.retry ? (t.__retryCount = t.__retryCount || 0, t.__retryCount >= t.retry ? Promise.reject(e) : (t.__retryCount += 1, new Promise((function (e) {
            setTimeout((function () {
                e()
            }), t.retryDelay || 1)
        })).then((function () {
            return f()(t)
        })))) : Promise.reject(e)
    }));
    f.a, r(27);

    function p(e) {
        return function (e) {
            if (Array.isArray(e)) return h(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }(e) || function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return h(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === r && e.constructor && (r = e.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(e);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return h(e, t)
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function h(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }

    function d(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    (new (function () {
        function e() {
            var t = this;
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.horses = p(a(".horse")), this.innerHorseWrap = s(".innerHorseWrap"), this.issueAnd = s(".issueAnd"), this.horseIssueDetail = s(".horseIssueDetail"), this.viewWidth = parseInt(window.getComputedStyle(this.innerHorseWrap).width), this.horseWrap = s(".horseWrap"), this.horseSky = s(".horseSky"), this.horseOrders = s(".horseOrders"), this.horseOrderArr = p(a(".horseOrders .horseOrder")), this.horseLineLeft = s(".horseLineLeft"), this.horseLineRight = s(".horseLineRight"), this.horseQuan = s(".horseQuan"), this.bottomSpace = s(".bottomSpace"), this.resultDialog = s(".resultDialog"), this.closeResultDialog = s(".resultDialog .closeResultDialog"), this.horseNumElems = p(a(".rangeNums>div.horseNum")), this.totalDistance = 15e3, this.duration = [37, 38, 39].concat(p(Array(7).fill(1).map((function () {
                return 39 * i(1.01, 1.05)
            })).sort())), this.rangeNumImg = Array(10).fill(1).map((function (e, t) {
                return "".concat(-6 - 62.35 * t, "px -9px")
            })), this.timeMaps = function (e, t) {
                if (!(t > e.length)) {
                    var r = [];
                    return function e(t, n, o) {
                        if (o.length == n) r.push(o); else for (var i = 0, s = t.length; i < s; i++) {
                            var a = [].concat(t), u = a.splice(i, 1);
                            e(a, n, [].concat(o, u))
                        }
                    }(e, t, []), r
                }
            }([.19, .215, .2, .225, .17], 5), this.closeResultDialog.onclick = function () {
                t.startGame()
            }, this.lastOpenTime = null
        }

        var t, r, c;
        return t = e, (r = [{
            key: "horseInit", value: function () {
                var e = this;
                this.resultDialog.style.display = "none", this.innerHorseWrap.scrollLeft = 0, o() ? (bottomSpace.style.position = "fixed", window.addEventListener("scroll", (function () {
                    bottomSpace.style.left = "".concat(e.innerHorseWrap.getBoundingClientRect().left, "px"), bottomSpace.style.top = "".concat(e.horseWrap.getBoundingClientRect().bottom, "px")
                })), bottomSpace.style.left = "".concat(this.innerHorseWrap.getBoundingClientRect().left, "px"), bottomSpace.style.top = "".concat(this.horseWrap.getBoundingClientRect().bottom, "px")) : this.bottomSpace.style.left = 0, this.horsesLeftsValues = Array(10).fill(0), this.horses.forEach((function (e, t) {
                    e.style.backgroundImage = "url(./images/horse_".concat(t + 1, ".png)"), e.style.backgroundSize = "512px", e.style.backgroundPosition = "25px 0", e.style.top = "".concat(38 + 29 * t, "px"), e.style.left = "-95px", e.style.animation = ""
                })), this.horseOrders.style.left = "65px", this.horseOrderArr.forEach((function (e, t) {
                    e.style.top = "".concat(15 + 29.15 * t, "px")
                })), this.horseLineLeftValue = 40, this.horseLineRightValue = -85, this.horseOrdersLeftValue = 65, this.horseQuanRightValue = -160, this.horseWrapLeftValue = 0, this.horseSkyLeftValue = 0
            }
        }, {
            key: "horseRun", value: function (e) {
                e.forEach((function (e, t) {
                    e.style.animation = "horse_run infinite 450ms forwards step-start"
                }))
            }
        }, {
            key: "createTimeMap", value: function (e, t) {
                var r = new Object;
                return e.forEach((function (e, n) {
                    r[e.id] = t[Math.floor(i(0, t.length))]
                })), r
            }
        }, {
            key: "horseMove", value: function (e) {
                var t = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.totalDistance,
                    i = arguments.length > 2 ? arguments[2] : void 0, c = arguments.length > 3 ? arguments[3] : void 0,
                    f = arguments.length > 4 ? arguments[4] : void 0, l = new Object;
                c.forEach((function (e, r) {
                    l["horse_".concat(e)] = t.duration[r]
                })), this.horseRun(e);
                var h = {}, d = {}, m = this.createTimeMap(e, i), y = r / 5, g = function i() {
                    var g = t.getHorsesLeft(e);
                    e.forEach((function (e, t) {
                        parseInt(g[e.id]) < y ? h[e.id] = y / (l[e.id] * m[e.id][0] * 60) : parseInt(g[e.id]) >= y && parseInt(g[e.id]) < 2 * y ? h[e.id] = y / (l[e.id] * m[e.id][1] * 60) : parseInt(g[e.id]) >= 2 * y && parseInt(g[e.id]) < 3 * y ? h[e.id] = y / (l[e.id] * m[e.id][2] * 60) : parseInt(g[e.id]) >= 3 * y && parseInt(g[e.id]) < 4 * y ? h[e.id] = y / (l[e.id] * m[e.id][3] * 60) : parseInt(g[e.id]) >= 4 * y && parseInt(g[e.id]) < 5 * y && (h[e.id] = y / (l[e.id] * m[e.id][4] * 60)), d[e.id] = d[e.id] || 0, d[e.id] += h[e.id], e.style.left = "".concat(d[e.id], "px")
                    })), Math.min.apply(Math, p(Object.values(h))), Math.max.apply(Math, p(Object.values(h)));
                    var v = Math.max.apply(Math, p(Object.values(g).map((function (e) {
                        return parseInt(e)
                    })))), b = Math.min.apply(Math, p(Object.values(g).map((function (e) {
                        return parseInt(e)
                    })))), w = (Object.keys(g), Object.values(g).sort((function (e, t) {
                        return parseInt(e) - parseInt(t)
                    }))), x = w.map((function (e) {
                        return u(g, e)
                    }));
                    if (store.get("sort_horsesLeftKeys") && store.get("sort_horsesLeftKeys").toString() == x.toString() || t.sortHorseRange(t.horseNumElems, g, w, r, n(c), f), store.set("sort_horsesLeftKeys", x), t.innerHorseWrap.scrollLeft < r - t.viewWidth ? t.innerHorseWrap.scrollLeft = v - (t.viewWidth - 200) : t.innerHorseWrap.scrollLeft += 0, o() || (t.bottomSpace.style.left = "".concat(t.innerHorseWrap.scrollLeft, "px")), t.resultDialog.style.left = "".concat(t.innerHorseWrap.scrollLeft + t.viewWidth / 2, "px"), b > r) {
                        var j = s(".yajunHorse .horse2"), S = s(".guanjunHorse .horse1"), O = s(".jijunHorse .horse3"),
                            E = s(".yajunHorse .yajunNum"), T = s(".guanjunHorse .guanjunNum"),
                            A = s(".jijunHorse .jijunNum"), L = p(a(".resultOrders .resultOrder"));
                        return j.style.backgroundImage = "url(./images/horse_".concat(c[1], ".png)"), S.style.backgroundImage = "url(./images/horse_".concat(c[0], ".png)"), O.style.backgroundImage = "url(./images/horse_".concat(c[2], ".png)"), E.style.backgroundPosition = f[c[1] - 1], T.style.backgroundPosition = f[c[0] - 1], A.style.backgroundPosition = f[c[2] - 1], L.forEach((function (e, t) {
                            e.style.backgroundPosition = f[c[t + 3] - 1]
                        })), t.resultDialog.style.display = "block", void setTimeout((function () {
                            t.startGame()
                        }), 5e3)
                    }
                    setTimeout(i, 1e3 / 60)
                };
                g()
            }
        }, {
            key: "getHorsesLeft", value: function (e) {
                var t = new Object;
                return e.forEach((function (e) {
                    return t[e.id] = window.getComputedStyle(e).left
                })), t
            }
        }, {
            key: "sortHorseRange", value: function (e, t, r, o, i, s) {
                var a = Object.values(t).map((function (e) {
                    return parseInt(e)
                })).filter((function (e) {
                    return e >= o
                })).length, c = e.slice(0, e.length - a);
                10 !== a ? c.forEach((function (e, n) {
                    r.length === p(new Set(r)).length && (e.style.backgroundPosition = s[u(t, r[n]).split("_")[1] - 1])
                })) : this.sortHorseRangeLast(e, n(i), s)
            }
        }, {
            key: "sortHorseRangeLast", value: function (e, t, r) {
                e.forEach((function (e, o) {
                    e.style.backgroundPosition = r[n(t)[o] - 1]
                }))
            }
        }, {
            key: "startGame", value: function () {
                var e = this;
                l({t: "vrsm", p: "json", limit: 3, token: "9261FABA1C0B092F"}).then((function (t) {
                    console.log(t.data);
                    var r = t.data.data[0].opencode.split(",").map((function (e) {
                        return Number(e)
                    }));
                    e.sortHorseRangeLast(e.horseNumElems, r, e.rangeNumImg);
                    var n = t.data.data[0].opentime.split(",");
                    e.horseIssueDetail.innerText = t.data.data[0].expect, e.horseInit();
                    var o = Date.now() - new Date(n);
                    setTimeout((function () {
                        l({t: "vrsm", p: "json", limit: 3, token: "9261FABA1C0B092F"}).then((function (t) {
                            console.log(t.data);
                            var r = t.data.data[0].opencode.split(",").map((function (e) {
                                return Number(e)
                            }));
                            e.issueAnd.innerText = t.data.data[0].expect, e.horseMove(e.horses, e.totalDistance, e.timeMaps, r, e.rangeNumImg)
                        })).catch((function (e) {
                            console.log("catch", e)
                        }))
                    }), 9e4 - o)
                })).catch((function (e) {
                    console.log(e)
                }))
            }
        }]) && d(t.prototype, r), c && d(t, c), e
    }())).startGame()
}]);