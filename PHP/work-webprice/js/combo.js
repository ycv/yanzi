!function (a, b) {
	if (!b.config || !b.config.sysType) {
		var c = a.location.hostname,
		d = /.*?([^.]+)(?:\.x)?\.(taobao|tmall|etao|alibaba|alipay|aliyun)\.(com|net).*/i,
		e = a.location.hostname.match(d),
		f = c.match(/taobao\.net$/i) ? "waptest" : "m";
		!e || "waptest" !== e[1] && "wapa" !== e[1] && "m" !== e[1] || (f = e[1]),
		b.config = {
			hostReg : d,
			sysType : f,
			defaultAppKey : "waptest" === f ? "4272" : "12574478"
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	b.encode || (b.encode = {}),
	b.encode.md5 = function (a) {
		function b(a, b) {
			return a << b | a >>> 32 - b
		}
		function c(a, b) {
			var c,
			d,
			e,
			f,
			g;
			return e = 2147483648 & a,
			f = 2147483648 & b,
			c = 1073741824 & a,
			d = 1073741824 & b,
			g = (1073741823 & a) + (1073741823 & b),
			c & d ? 2147483648^g^e^f : c | d ? 1073741824 & g ? 3221225472^g^e^f : 1073741824^g^e^f : g^e^f
		}
		function d(a, b, c) {
			return a & b | ~a & c
		}
		function e(a, b, c) {
			return a & c | b & ~c
		}
		function f(a, b, c) {
			return a^b^c
		}
		function g(a, b, c) {
			return b^(a | ~c)
		}
		function h(a, e, f, g, h, i, j) {
			return a = c(a, c(c(d(e, f, g), h), j)),
			c(b(a, i), e)
		}
		function i(a, d, f, g, h, i, j) {
			return a = c(a, c(c(e(d, f, g), h), j)),
			c(b(a, i), d)
		}
		function j(a, d, e, g, h, i, j) {
			return a = c(a, c(c(f(d, e, g), h), j)),
			c(b(a, i), d)
		}
		function k(a, d, e, f, h, i, j) {
			return a = c(a, c(c(g(d, e, f), h), j)),
			c(b(a, i), d)
		}
		function l(a) {
			for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i; )
				b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
			return b = (i - i % 4) / 4,
			h = i % 4 * 8,
			g[b] = g[b] | 128 << h,
			g[f - 2] = c << 3,
			g[f - 1] = c >>> 29,
			g
		}
		function m(a) {
			var b,
			c,
			d = "",
			e = "";
			for (c = 0; 3 >= c; c++)
				b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
			return d
		}
		function n(a) {
			a = a.replace(/\r\n/g, "\n");
			for (var b = "", c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
			}
			return b
		}
		var o,
		p,
		q,
		r,
		s,
		t,
		u,
		v,
		w,
		x = [],
		y = 7,
		z = 12,
		A = 17,
		B = 22,
		C = 5,
		D = 9,
		E = 14,
		F = 20,
		G = 4,
		H = 11,
		I = 16,
		J = 23,
		K = 6,
		L = 10,
		M = 15,
		N = 21;
		for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)
			p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
		var O = m(t) + m(u) + m(v) + m(w);
		return O.toLowerCase()
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		var b = document.cookie.indexOf(";", a);
		return -1 === b && (b = document.cookie.length),
		window.unescape(decodeURIComponent(document.cookie.substring(a, b)))
	}
	b.storage || (b.storage = {}),
	b.storage.cookie = {
		isCookieEnable : function () {
			if (!window.navigator.cookieEnabled)
				return !1;
			var a = "_s_cookie_",
			b = this.getCookie(a);
			return this.setCookie(a, "1"),
			"1" === b ? (this.delCookie(a), !0) : !1
		},
		getCookie : function (a) {
			for (var b, d = a + "=", e = d.length, f = document.cookie.length, g = 0; f > g; ) {
				if (b = g + e, document.cookie.substring(g, b) === d)
					return c(b);
				if (g = document.cookie.indexOf(" ", g) + 1, 0 === g)
					break
			}
			return null
		},
		setCookie : function (a, b) {
			var c = window.location.host,
			d = c.indexOf("."),
			e = c.substring(0, d),
			f = arguments.length > 2 ? arguments[2] : null,
			g = new Date;
			"waptest" !== e && "wapa" !== e && "m" !== e && (c.indexOf("taobao") > -1 || c.indexOf("tmall") > -1) && (c = c.substr(d + 1)),
			null == f ? document.cookie = a + "=" + window.escape(b) + ";path=/;domain=" + c : (g.setTime(g.getTime() + 1e3 * f), document.cookie = a + "=" + window.escape(b) + ";path=/;domain=" + c + ";expires=" + g.toGMTString())
		},
		delCookie : function (a) {
			var b = new Date,
			c = this.getCookie(a);
			b.setTime(b.getTime() - 1),
			document.cookie = a + "=" + c + "; expires=" + b.toGMTString()
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {});
	c.EXECUTOR = {
		isRunning : !1,
		executorQue : [],
		resume : function () {
			var a = this.executorQue[0];
			this.executorQue = this.executorQue.slice(1),
			a ? a.run() : this.isRunning = !1
		},
		_executors : [],
		_getExecutor : function (a) {
			for (var b, c = this._executors.length, d = c; d > 0 && (b = this._executors[d - 1], !b.canRun(a)); d--);
			var e = new b(a);
			return e
		},
		register : function (a, b) {
			var d = function (a) {
				this.init(a)
			};
			d.canRun = a,
			b.handleResponse = function (a) {
				c.wrapHandler.call(this, a),
				c.EXECUTOR.resume()
			},
			d.prototype = b,
			this._executors.push(d)
		},
		execute : function (a) {
			var b = this._getExecutor(a);
			this.executorQue.push(b),
			this.isRunning || (this.isRunning = !0, this.resume())
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {});
	c.ajax = function () {
		this.EXECUTOR.execute(arguments)
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = {},
	d = function (a) {
		try {
			return decodeURIComponent(a)
		} catch (b) {
			return a
		}
	},
	e = c.getParam = function (a) {
		var b,
		c = this.queryMap || function (a) {
			if (a.length < 1)
				return "";
			a = a.substr(1);
			var b,
			c,
			e = a.split("&"),
			f = {};
			for (c in e)
				b = e[c].split("="), f[d(b[0])] = d(b[1]);
			return f
		}
		(location.search);
		return this.queryMap = c,
		a ? (b = c[a], b && b.indexOf("#") > -1 && (b = encodeURIComponent(b)), b) : c
	},
	f = function (a) {
		var b,
		c,
		d,
		f = "";
		for (b in a)
			c = a[b], d = e(c), d && "" !== d && (f += "&" + c + "=" + d);
		return f
	}
	(["ttid", "sprefer"]);
	c.getUrl = function (a) {
		function c(a, b) {
			if (!b)
				return a;
			a.indexOf("?") < 0 && (a += "?");
			var c = a.charAt(a.length - 1),
			d = b.charAt(0);
			return "?" === c || "&" === c ? "?" === d || "&" === d ? a + b.substr(1) : a + b : "?" === d || "&" === d ? a + b : a + "&" + b
		}
		var d = a.host || a.subdomain + "." + b.config.sysType + ".taobao.com",
		e = a.url || "http://" + d + "/" + a.path;
		return e.indexOf("?") > 0 || (e += "?"),
		e = c(e, f),
		a.data && (e = c(e, function (a) {
					var b,
					c,
					d = "";
					if (null == a)
						return d;
					for (b in a)
						c = a[b], null != c && "" !== c && (d += b + "=" + encodeURIComponent("object" == typeof c ? JSON.stringify(c) : c) + "&");
					return "" !== d && d.length - 1 === d.lastIndexOf("&") && (d = d.substr(0, d.length - 1)),
					d
				}
					(a.data))),
		e
	},
	b.uri = c
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.storage.cookie,
	d = b.mtop || (b.mtop = {}),
	e = 0,
	f = 5;
	d.wrapHandler = function (a) {
		var d = (a && a.ret ? a.ret : "").toString();
		d.indexOf("SUCCESS::") >= 0 ? (e = 0, this.callback && this.callback(a)) : -1 !== d.indexOf("TOKEN_EMPTY::") || -1 !== d.indexOf("TOKEN_EXOIRED::") ? ++e < f ? (console.log("TODO RETRY"), this.retryed = !0, b.mtop.ajax(this.options, this.callback, this.errorback)) : (c.delCookie(b.mtop.base.tokenKey), console.log("try exceed times")) : this.errorback && this.errorback(a)
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.storage.cookie,
	d = b.encode.md5,
	e = b.uri.getUrl,
	f = "J_app_key",
	g = b.mtop || (b.mtop = {});
	g.base = {
		tokenKey : "_m_h5_tk",
		that : this,
		appKey : function () {
			var a = b.config,
			c = document.getElementById(f);
			return c ? c.value : a.defaultAppKey
		}
		(),
		_getToken : function () {
			return (c.getCookie(this.tokenKey) || "").split("_")[0]
		},
		genApiUrl : function (a, c, d) {
			var f = b.config,
			g = "rest/" + c,
			h = {
				path : g,
				data : a
			};
			if (f.mtopHost)
				h.host = f.mtopHost;
			else if (a.subdomain)
				h.subdomain = a.subdomain, delete a.subdomain;
			else {
				var i = f.hostReg.exec(location.hostname);
				i ? (i[0] = "etao" === i[2] ? "apie" : "api", h.host = i.join(".")) : h.subdomain = "api"
			}
			var j = e(h);
			return j + "&appKey=" + this.appKey + "&t=" + d
		},
		sign : function (a, b) {
			var c = this._getToken() + "&" + b + "&" + this.appKey + "&" + a;
			return d(c)
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {}),
	d = c.base,
	e = "h5ApiUpdate.do";
	c.EXECUTOR.register(function (a) {
		return !a[0].length && a[0].api && !a[0].cros
	}, {
		init : function (a) {
			this.options = a[0],
			this.t = (new Date).getTime(),
			this.callback = a[1],
			this.errorback = a[2]
		},
		run : function () {
			var b = this,
			c = this._genSignUrl(),
			d = {
				type : "GET",
				url : c,
				timeout : 2e4,
				dataType : "jsonp",
				success : function (a) {
					b.handleResponse && b.handleResponse(a)
				},
				error : function (a) {
					b.handleResponse && b.handleResponse(a)
				}
			};
			a.$.ajax(d)
		},
		_genSignUrl : function () {
			var a = d.genApiUrl(this.options, e, this.t);
			return this._addJsonParam(a) + "&sign=" + d.sign(JSON.stringify(this.options.data), this.t)
		},
		_addJsonParam : function (a) {
			if (-1 === a.indexOf("callback=")) {
				var b = a.indexOf("?");
				return a.substr(0, b) + "?callback=?&type=jsonp&" + a.substr(b + 1, a.length)
			}
			return a
		}
	}),
	c.request = function (a, b, c) {
		var d = a.data || {};
		a.v = a.v || "*",
		a.data = "string" == typeof d ? JSON.parse(d) : d,
		this.ajax(a, b, c)
	},
	c.getApi = function (a, b, c, d, e, f) {
		d || (d = {}),
		d.api = a,
		d.v = b,
		d.data = c,
		this.request(d, e, f)
	}
}
(window, window.lib || (window.lib = {}));
!function (a) {
	String.prototype.trim === a && (String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "")
	}),
	Array.prototype.reduce === a && (Array.prototype.reduce = function (b) {
		if (void 0 === this || null === this)
			throw new TypeError;
		var c,
		d = Object(this),
		e = d.length >>> 0,
		f = 0;
		if ("function" != typeof b)
			throw new TypeError;
		if (0 == e && 1 == arguments.length)
			throw new TypeError;
		if (arguments.length >= 2)
			c = arguments[1];
		else
			for (; ; ) {
				if (f in d) {
					c = d[f++];
					break
				}
				if (++f >= e)
					throw new TypeError
			}
		for (; e > f; )
			f in d && (c = b.call(a, c, d[f], f, d)), f++;
		return c
	})
}
();
var Zepto = function () {
	function a(a) {
		return null == a ? String(a) : W[X.call(a)] || "object"
	}
	function b(b) {
		return "function" == a(b)
	}
	function c(a) {
		return null != a && a == a.window
	}
	function d(a) {
		return null != a && a.nodeType == a.DOCUMENT_NODE
	}
	function e(b) {
		return "object" == a(b)
	}
	function f(a) {
		return e(a) && !c(a) && a.__proto__ == Object.prototype
	}
	function g(a) {
		return a instanceof Array
	}
	function h(a) {
		return "number" == typeof a.length
	}
	function i(a) {
		return E.call(a, function (a) {
			return null != a
		})
	}
	function j(a) {
		return a.length > 0 ? y.fn.concat.apply([], a) : a
	}
	function k(a) {
		return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}
	function l(a) {
		return a in H ? H[a] : H[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
	}
	function m(a, b) {
		return "number" != typeof b || J[k(a)] ? b : b + "px"
	}
	function n(a) {
		var b,
		c;
		return G[a] || (b = F.createElement(a), F.body.appendChild(b), c = I(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), G[a] = c),
		G[a]
	}
	function o(a) {
		return "children" in a ? D.call(a.children) : y.map(a.childNodes, function (a) {
			return 1 == a.nodeType ? a : void 0
		})
	}
	function p(a, b, c) {
		for (x in b)
			c && (f(b[x]) || g(b[x])) ? (f(b[x]) && !f(a[x]) && (a[x] = {}), g(b[x]) && !g(a[x]) && (a[x] = []), p(a[x], b[x], c)) : b[x] !== w && (a[x] = b[x])
	}
	function q(a, b) {
		return b === w ? y(a) : y(a).filter(b)
	}
	function r(a, c, d, e) {
		return b(c) ? c.call(a, d, e) : c
	}
	function s(a, b, c) {
		null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
	}
	function t(a, b) {
		var c = a.className,
		d = c && c.baseVal !== w;
		return b === w ? d ? c.baseVal : c : (d ? c.baseVal = b : a.className = b, void 0)
	}
	function u(a) {
		var b;
		try {
			return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? y.parseJSON(a) : a : b) : a
		} catch (c) {
			return a
		}
	}
	function v(a, b) {
		b(a);
		for (var c in a.childNodes)
			v(a.childNodes[c], b)
	}
	var w,
	x,
	y,
	z,
	A,
	B,
	C = [],
	D = C.slice,
	E = C.filter,
	F = window.document,
	G = {},
	H = {},
	I = F.defaultView.getComputedStyle,
	J = {
		"column-count" : 1,
		columns : 1,
		"font-weight" : 1,
		"line-height" : 1,
		opacity : 1,
		"z-index" : 1,
		zoom : 1
	},
	K = /^\s*<(\w+|!)[^>]*>/,
	L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	M = /^(?:body|html)$/i,
	N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
	O = ["after", "prepend", "before", "append"],
	P = F.createElement("table"),
	Q = F.createElement("tr"),
	R = {
		tr : F.createElement("tbody"),
		tbody : P,
		thead : P,
		tfoot : P,
		td : Q,
		th : Q,
		"*" : F.createElement("div")
	},
	S = /complete|loaded|interactive/,
	T = /^\.([\w-]+)$/,
	U = /^#([\w-]*)$/,
	V = /^[\w-]+$/,
	W = {},
	X = W.toString,
	Y = {},
	Z = F.createElement("div");
	return Y.matches = function (a, b) {
		if (!a || 1 !== a.nodeType)
			return !1;
		var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
		if (c)
			return c.call(a, b);
		var d,
		e = a.parentNode,
		f = !e;
		return f && (e = Z).appendChild(a),
		d = ~Y.qsa(e, b).indexOf(a),
		f && Z.removeChild(a),
		d
	},
	A = function (a) {
		return a.replace(/-+(.)?/g, function (a, b) {
			return b ? b.toUpperCase() : ""
		})
	},
	B = function (a) {
		return E.call(a, function (b, c) {
			return a.indexOf(b) == c
		})
	},
	Y.fragment = function (a, b, c) {
		a.replace && (a = a.replace(L, "<$1></$2>")),
		b === w && (b = K.test(a) && RegExp.$1),
		b in R || (b = "*");
		var d,
		e,
		g = R[b];
		return g.innerHTML = "" + a,
		e = y.each(D.call(g.childNodes), function () {
				g.removeChild(this)
			}),
		f(c) && (d = y(e), y.each(c, function (a, b) {
				N.indexOf(a) > -1 ? d[a](b) : d.attr(a, b)
			})),
		e
	},
	Y.Z = function (a, b) {
		return a = a || [],
		a.__proto__ = y.fn,
		a.selector = b || "",
		a
	},
	Y.isZ = function (a) {
		return a instanceof Y.Z
	},
	Y.init = function (a, c) {
		if (a) {
			if (b(a))
				return y(F).ready(a);
			if (Y.isZ(a))
				return a;
			var d;
			if (g(a))
				d = i(a);
			else if (e(a))
				d = [f(a) ? y.extend({}, a) : a], a = null;
			else if (K.test(a))
				d = Y.fragment(a.trim(), RegExp.$1, c), a = null;
			else {
				if (c !== w)
					return y(c).find(a);
				d = Y.qsa(F, a)
			}
			return Y.Z(d, a)
		}
		return Y.Z()
	},
	y = function (a, b) {
		return Y.init(a, b)
	},
	y.extend = function (a) {
		var b,
		c = D.call(arguments, 1);
		return "boolean" == typeof a && (b = a, a = c.shift()),
		c.forEach(function (c) {
			p(a, c, b)
		}),
		a
	},
	Y.qsa = function (a, b) {
		var c;
		return d(a) && U.test(b) ? (c = a.getElementById(RegExp.$1)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : D.call(T.test(b) ? a.getElementsByClassName(RegExp.$1) : V.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b))
	},
	y.contains = function (a, b) {
		return a !== b && a.contains(b)
	},
	y.type = a,
	y.isFunction = b,
	y.isWindow = c,
	y.isArray = g,
	y.isPlainObject = f,
	y.isEmptyObject = function (a) {
		var b;
		for (b in a)
			return !1;
		return !0
	},
	y.inArray = function (a, b, c) {
		return C.indexOf.call(b, a, c)
	},
	y.camelCase = A,
	y.trim = function (a) {
		return a.trim()
	},
	y.uuid = 0,
	y.support = {},
	y.expr = {},
	y.map = function (a, b) {
		var c,
		d,
		e,
		f = [];
		if (h(a))
			for (d = 0; d < a.length; d++)
				c = b(a[d], d), null != c && f.push(c);
		else
			for (e in a)
				c = b(a[e], e), null != c && f.push(c);
		return j(f)
	},
	y.each = function (a, b) {
		var c,
		d;
		if (h(a)) {
			for (c = 0; c < a.length; c++)
				if (b.call(a[c], c, a[c]) === !1)
					return a
		} else
			for (d in a)
				if (b.call(a[d], d, a[d]) === !1)
					return a;
		return a
	},
	y.grep = function (a, b) {
		return E.call(a, b)
	},
	window.JSON && (y.parseJSON = JSON.parse),
	y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
		W["[object " + b + "]"] = b.toLowerCase()
	}),
	y.fn = {
		forEach : C.forEach,
		reduce : C.reduce,
		push : C.push,
		sort : C.sort,
		indexOf : C.indexOf,
		concat : C.concat,
		map : function (a) {
			return y(y.map(this, function (b, c) {
					return a.call(b, c, b)
				}))
		},
		slice : function () {
			return y(D.apply(this, arguments))
		},
		ready : function (a) {
			return S.test(F.readyState) ? a(y) : F.addEventListener("DOMContentLoaded", function () {
				a(y)
			}, !1),
			this
		},
		get : function (a) {
			return a === w ? D.call(this) : this[a >= 0 ? a : a + this.length]
		},
		toArray : function () {
			return this.get()
		},
		size : function () {
			return this.length
		},
		remove : function () {
			return this.each(function () {
				null != this.parentNode && this.parentNode.removeChild(this)
			})
		},
		each : function (a) {
			return C.every.call(this, function (b, c) {
				return a.call(b, c, b) !== !1
			}),
			this
		},
		filter : function (a) {
			return b(a) ? this.not(this.not(a)) : y(E.call(this, function (b) {
					return Y.matches(b, a)
				}))
		},
		add : function (a, b) {
			return y(B(this.concat(y(a, b))))
		},
		is : function (a) {
			return this.length > 0 && Y.matches(this[0], a)
		},
		not : function (a) {
			var c = [];
			if (b(a) && a.call !== w)
				this.each(function (b) {
					a.call(this, b) || c.push(this)
				});
			else {
				var d = "string" == typeof a ? this.filter(a) : h(a) && b(a.item) ? D.call(a) : y(a);
				this.forEach(function (a) {
					d.indexOf(a) < 0 && c.push(a)
				})
			}
			return y(c)
		},
		has : function (a) {
			return this.filter(function () {
				return e(a) ? y.contains(this, a) : y(this).find(a).size()
			})
		},
		eq : function (a) {
			return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
		},
		first : function () {
			var a = this[0];
			return a && !e(a) ? a : y(a)
		},
		last : function () {
			var a = this[this.length - 1];
			return a && !e(a) ? a : y(a)
		},
		find : function (a) {
			var b,
			c = this;
			return b = "object" == typeof a ? y(a).filter(function () {
					var a = this;
					return C.some.call(c, function (b) {
						return y.contains(b, a)
					})
				}) : 1 == this.length ? y(Y.qsa(this[0], a)) : this.map(function () {
					return Y.qsa(this, a)
				})
		},
		closest : function (a, b) {
			var c = this[0],
			e = !1;
			for ("object" == typeof a && (e = y(a)); c && !(e ? e.indexOf(c) >= 0 : Y.matches(c, a)); )
				c = c !== b && !d(c) && c.parentNode;
			return y(c)
		},
		parents : function (a) {
			for (var b = [], c = this; c.length > 0; )
				c = y.map(c, function (a) {
						return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
					});
			return q(b, a)
		},
		parent : function (a) {
			return q(B(this.pluck("parentNode")), a)
		},
		children : function (a) {
			return q(this.map(function () {
					return o(this)
				}), a)
		},
		contents : function () {
			return this.map(function () {
				return D.call(this.childNodes)
			})
		},
		siblings : function (a) {
			return q(this.map(function (a, b) {
					return E.call(o(b.parentNode), function (a) {
						return a !== b
					})
				}), a)
		},
		empty : function () {
			return this.each(function () {
				this.innerHTML = ""
			})
		},
		pluck : function (a) {
			return y.map(this, function (b) {
				return b[a]
			})
		},
		show : function () {
			return this.each(function () {
				"none" == this.style.display && (this.style.display = null),
				"none" == I(this, "").getPropertyValue("display") && (this.style.display = n(this.nodeName))
			})
		},
		replaceWith : function (a) {
			return this.before(a).remove()
		},
		wrap : function (a) {
			var c = b(a);
			if (this[0] && !c)
				var d = y(a).get(0), e = d.parentNode || this.length > 1;
			return this.each(function (b) {
				y(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
			})
		},
		wrapAll : function (a) {
			if (this[0]) {
				y(this[0]).before(a = y(a));
				for (var b; (b = a.children()).length; )
					a = b.first();
				y(a).append(this)
			}
			return this
		},
		wrapInner : function (a) {
			var c = b(a);
			return this.each(function (b) {
				var d = y(this),
				e = d.contents(),
				f = c ? a.call(this, b) : a;
				e.length ? e.wrapAll(f) : d.append(f)
			})
		},
		unwrap : function () {
			return this.parent().each(function () {
				y(this).replaceWith(y(this).children())
			}),
			this
		},
		clone : function () {
			return this.map(function () {
				return this.cloneNode(!0)
			})
		},
		hide : function () {
			return this.css("display", "none")
		},
		toggle : function (a) {
			return this.each(function () {
				var b = y(this);
				(a === w ? "none" == b.css("display") : a) ? b.show() : b.hide()
			})
		},
		prev : function (a) {
			return y(this.pluck("previousElementSibling")).filter(a || "*")
		},
		next : function (a) {
			return y(this.pluck("nextElementSibling")).filter(a || "*")
		},
		html : function (a) {
			return a === w ? this.length > 0 ? this[0].innerHTML : null : this.each(function (b) {
				var c = this.innerHTML;
				y(this).empty().append(r(this, a, b, c))
			})
		},
		text : function (a) {
			return a === w ? this.length > 0 ? this[0].textContent : null : this.each(function () {
				this.textContent = a
			})
		},
		attr : function (a, b) {
			var c;
			return "string" == typeof a && b === w ? 0 == this.length || 1 !== this[0].nodeType ? w : "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : this.each(function (c) {
				if (1 === this.nodeType)
					if (e(a))
						for (x in a)
							s(this, x, a[x]);
					else
						s(this, a, r(this, b, c, this.getAttribute(a)))
			})
		},
		removeAttr : function (a) {
			return this.each(function () {
				1 === this.nodeType && s(this, a)
			})
		},
		prop : function (a, b) {
			return b === w ? this[0] && this[0][a] : this.each(function (c) {
				this[a] = r(this, b, c, this[a])
			})
		},
		data : function (a, b) {
			var c = this.attr("data-" + k(a), b);
			return null !== c ? u(c) : w
		},
		val : function (a) {
			return a === w ? this[0] && (this[0].multiple ? y(this[0]).find("option").filter(function () {
					return this.selected
				}).pluck("value") : this[0].value) : this.each(function (b) {
				this.value = r(this, a, b, this.value)
			})
		},
		offset : function (a) {
			if (a)
				return this.each(function (b) {
					var c = y(this),
					d = r(this, a, b, c.offset()),
					e = c.offsetParent().offset(),
					f = {
						top : d.top - e.top,
						left : d.left - e.left
					};
					"static" == c.css("position") && (f.position = "relative"),
					c.css(f)
				});
			if (0 == this.length)
				return null;
			var b = this[0].getBoundingClientRect();
			return {
				left : b.left + window.pageXOffset,
				top : b.top + window.pageYOffset,
				width : Math.round(b.width),
				height : Math.round(b.height)
			}
		},
		css : function (b, c) {
			if (arguments.length < 2 && "string" == typeof b)
				return this[0] && (this[0].style[A(b)] || I(this[0], "").getPropertyValue(b));
			var d = "";
			if ("string" == a(b))
				c || 0 === c ? d = k(b) + ":" + m(b, c) : this.each(function () {
						this.style.removeProperty(k(b))
					});
			else
				for (x in b)
					b[x] || 0 === b[x] ? d += k(x) + ":" + m(x, b[x]) + ";" : this.each(function () {
						this.style.removeProperty(k(x))
					});
			return this.each(function () {
				this.style.cssText += ";" + d
			})
		},
		index : function (a) {
			return a ? this.indexOf(y(a)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass : function (a) {
			return C.some.call(this, function (a) {
				return this.test(t(a))
			}, l(a))
		},
		addClass : function (a) {
			return this.each(function (b) {
				z = [];
				var c = t(this),
				d = r(this, a, b, c);
				d.split(/\s+/g).forEach(function (a) {
					y(this).hasClass(a) || z.push(a)
				}, this),
				z.length && t(this, c + (c ? " " : "") + z.join(" "))
			})
		},
		removeClass : function (a) {
			return this.each(function (b) {
				return a === w ? t(this, "") : (z = t(this), r(this, a, b, z).split(/\s+/g).forEach(function (a) {
						z = z.replace(l(a), " ")
					}), t(this, z.trim()), void 0)
			})
		},
		toggleClass : function (a, b) {
			return this.each(function (c) {
				var d = y(this),
				e = r(this, a, c, t(this));
				e.split(/\s+/g).forEach(function (a) {
					(b === w ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
				})
			})
		},
		scrollTop : function () {
			return this.length ? "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY : void 0
		},
		position : function () {
			if (this.length) {
				var a = this[0],
				b = this.offsetParent(),
				c = this.offset(),
				d = M.test(b[0].nodeName) ? {
					top : 0,
					left : 0
				}
				 : b.offset();
				return c.top -= parseFloat(y(a).css("margin-top")) || 0,
				c.left -= parseFloat(y(a).css("margin-left")) || 0,
				d.top += parseFloat(y(b[0]).css("border-top-width")) || 0,
				d.left += parseFloat(y(b[0]).css("border-left-width")) || 0, {
					top : c.top - d.top,
					left : c.left - d.left
				}
			}
		},
		offsetParent : function () {
			return this.map(function () {
				for (var a = this.offsetParent || F.body; a && !M.test(a.nodeName) && "static" == y(a).css("position"); )
					a = a.offsetParent;
				return a
			})
		}
	},
	y.fn.detach = y.fn.remove,
	["width", "height"].forEach(function (a) {
		y.fn[a] = function (b) {
			var e,
			f = this[0],
			g = a.replace(/./, function (a) {
					return a[0].toUpperCase()
				});
			return b === w ? c(f) ? f["inner" + g] : d(f) ? f.documentElement["offset" + g] : (e = this.offset()) && e[a] : this.each(function (c) {
				f = y(this),
				f.css(a, r(this, b, c, f[a]()))
			})
		}
	}),
	O.forEach(function (b, c) {
		var d = c % 2;
		y.fn[b] = function () {
			var b,
			e,
			f = y.map(arguments, function (c) {
					return b = a(c),
					"object" == b || "array" == b || null == c ? c : Y.fragment(c)
				}),
			g = this.length > 1;
			return f.length < 1 ? this : this.each(function (a, b) {
				e = d ? b : b.parentNode,
				b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null,
				f.forEach(function (a) {
					if (g)
						a = a.cloneNode(!0);
					else if (!e)
						return y(a).remove();
					v(e.insertBefore(a, b), function (a) {
						null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
					})
				})
			})
		},
		y.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function (a) {
			return y(a)[b](this),
			this
		}
	}),
	Y.Z.prototype = y.fn,
	Y.uniq = B,
	Y.deserializeValue = u,
	y.zepto = Y,
	y
}
();
window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function (a) {
	function b(a) {
		var b = this.os = {},
		c = this.browser = {},
		d = a.match(/WebKit\/([\d.]+)/),
		e = a.match(/(Android)\s+([\d.]+)/),
		f = a.match(/(iPad).*OS\s([\d_]+)/),
		g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/),
		h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
		i = h && a.match(/TouchPad/),
		j = a.match(/Kindle\/([\d.]+)/),
		k = a.match(/Silk\/([\d._]+)/),
		l = a.match(/(BlackBerry).*Version\/([\d.]+)/),
		m = a.match(/(BB10).*Version\/([\d.]+)/),
		n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
		o = a.match(/PlayBook/),
		p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
		q = a.match(/Firefox\/([\d.]+)/);
		(c.webkit = !!d) && (c.version = d[1]),
		e && (b.android = !0, b.version = e[2]),
		g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")),
		f && (b.ios = b.ipad = !0, b.version = f[2].replace(/_/g, ".")),
		h && (b.webos = !0, b.version = h[2]),
		i && (b.touchpad = !0),
		l && (b.blackberry = !0, b.version = l[2]),
		m && (b.bb10 = !0, b.version = m[2]),
		n && (b.rimtabletos = !0, b.version = n[2]),
		o && (c.playbook = !0),
		j && (b.kindle = !0, b.version = j[1]),
		k && (c.silk = !0, c.version = k[1]),
		!k && b.android && a.match(/Kindle Fire/) && (c.silk = !0),
		p && (c.chrome = !0, c.version = p[1]),
		q && (c.firefox = !0, c.version = q[1]),
		b.tablet = !!(f || o || e && !a.match(/Mobile/) || q && a.match(/Tablet/)),
		b.phone = !(b.tablet || !(e || g || h || l || m || p && a.match(/Android/) || p && a.match(/CriOS\/([\d.]+)/) || q && a.match(/Mobile/)))
	}
	b.call(a, navigator.userAgent),
	a.__detect = b
}
(Zepto), function (a) {
	function b(a) {
		return a._zid || (a._zid = n++)
	}
	function c(a, c, f, g) {
		if (c = d(c), c.ns)
			var h = e(c.ns);
		return (m[b(a)] || []).filter(function (a) {
			return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
		})
	}
	function d(a) {
		var b = ("" + a).split(".");
		return {
			e : b[0],
			ns : b.slice(1).sort().join(" ")
		}
	}
	function e(a) {
		return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
	}
	function f(b, c, d) {
		"string" != a.type(b) ? a.each(b, d) : b.split(/\s/).forEach(function (a) {
			d(a, c)
		})
	}
	function g(a, b) {
		return a.del && ("focus" == a.e || "blur" == a.e) || !!b
	}
	function h(a) {
		return p[a] || a
	}
	function i(c, e, i, j, k, l) {
		var n = b(c),
		o = m[n] || (m[n] = []);
		f(e, i, function (b, e) {
			var f = d(b);
			f.fn = e,
			f.sel = j,
			f.e in p && (e = function (b) {
				var c = b.relatedTarget;
				return !c || c !== this && !a.contains(this, c) ? f.fn.apply(this, arguments) : void 0
			}),
			f.del = k && k(e, b);
			var i = f.del || e;
			f.proxy = function (a) {
				var b = i.apply(c, [a].concat(a.data));
				return b === !1 && (a.preventDefault(), a.stopPropagation()),
				b
			},
			f.i = o.length,
			o.push(f),
			c.addEventListener(h(f.e), f.proxy, g(f, l))
		})
	}
	function j(a, d, e, i, j) {
		var k = b(a);
		f(d || "", e, function (b, d) {
			c(a, b, d, i).forEach(function (b) {
				delete m[k][b.i],
				a.removeEventListener(h(b.e), b.proxy, g(b, j))
			})
		})
	}
	function k(b) {
		var c,
		d = {
			originalEvent : b
		};
		for (c in b)
			s.test(c) || void 0 === b[c] || (d[c] = b[c]);
		return a.each(t, function (a, c) {
			d[a] = function () {
				return this[c] = q,
				b[a].apply(b, arguments)
			},
			d[c] = r
		}),
		d
	}
	function l(a) {
		if (!("defaultPrevented" in a)) {
			a.defaultPrevented = !1;
			var b = a.preventDefault;
			a.preventDefault = function () {
				this.defaultPrevented = !0,
				b.call(this)
			}
		}
	}
	var m = (a.zepto.qsa, {}),
	n = 1,
	o = {},
	p = {
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	};
	o.click = o.mousedown = o.mouseup = o.mousemove = "MouseEvents",
	a.event = {
		add : i,
		remove : j
	},
	a.proxy = function (c, d) {
		if (a.isFunction(c)) {
			var e = function () {
				return c.apply(d, arguments)
			};
			return e._zid = b(c),
			e
		}
		if ("string" == typeof d)
			return a.proxy(c[d], c);
		throw new TypeError("expected function")
	},
	a.fn.bind = function (a, b) {
		return this.each(function () {
			i(this, a, b)
		})
	},
	a.fn.unbind = function (a, b) {
		return this.each(function () {
			j(this, a, b)
		})
	},
	a.fn.one = function (a, b) {
		return this.each(function (c, d) {
			i(this, a, b, null, function (a, b) {
				return function () {
					var c = a.apply(d, arguments);
					return j(d, b, a),
					c
				}
			})
		})
	};
	var q = function () {
		return !0
	},
	r = function () {
		return !1
	},
	s = /^([A-Z]|layer[XY]$)/,
	t = {
		preventDefault : "isDefaultPrevented",
		stopImmediatePropagation : "isImmediatePropagationStopped",
		stopPropagation : "isPropagationStopped"
	};
	a.fn.delegate = function (b, c, d) {
		return this.each(function (e, f) {
			i(f, c, d, b, function (c) {
				return function (d) {
					var e,
					g = a(d.target).closest(b, f).get(0);
					return g ? (e = a.extend(k(d), {
								currentTarget : g,
								liveFired : f
							}), c.apply(g, [e].concat([].slice.call(arguments, 1)))) : void 0
				}
			})
		})
	},
	a.fn.undelegate = function (a, b, c) {
		return this.each(function () {
			j(this, b, c, a)
		})
	},
	a.fn.live = function (b, c) {
		return a(document.body).delegate(this.selector, b, c),
		this
	},
	a.fn.die = function (b, c) {
		return a(document.body).undelegate(this.selector, b, c),
		this
	},
	a.fn.on = function (b, c, d) {
		return !c || a.isFunction(c) ? this.bind(b, c || d) : this.delegate(c, b, d)
	},
	a.fn.off = function (b, c, d) {
		return !c || a.isFunction(c) ? this.unbind(b, c || d) : this.undelegate(c, b, d)
	},
	a.fn.trigger = function (b, c) {
		return ("string" == typeof b || a.isPlainObject(b)) && (b = a.Event(b)),
		l(b),
		b.data = c,
		this.each(function () {
			"dispatchEvent" in this && this.dispatchEvent(b)
		})
	},
	a.fn.triggerHandler = function (b, d) {
		var e,
		f;
		return this.each(function (g, h) {
			e = k("string" == typeof b ? a.Event(b) : b),
			e.data = d,
			e.target = h,
			a.each(c(h, b.type || b), function (a, b) {
				return f = b.proxy(e),
				e.isImmediatePropagationStopped() ? !1 : void 0
			})
		}),
		f
	},
	"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (b) {
		a.fn[b] = function (a) {
			return a ? this.bind(b, a) : this.trigger(b)
		}
	}),
	["focus", "blur"].forEach(function (b) {
		a.fn[b] = function (a) {
			return a ? this.bind(b, a) : this.each(function () {
				try {
					this[b]()
				} catch (a) {}

			}),
			this
		}
	}),
	a.Event = function (a, b) {
		"string" != typeof a && (b = a, a = b.type);
		var c = document.createEvent(o[a] || "Events"),
		d = !0;
		if (b)
			for (var e in b)
				"bubbles" == e ? d = !!b[e] : c[e] = b[e];
		return c.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null),
		c.isDefaultPrevented = function () {
			return this.defaultPrevented
		},
		c
	}
}

!function (a, b) {
	function c() {
		var a = {},
		b = location.search;
		if (b) {
			var c = b.slice(1).split("&");
			if (c.length)
				for (var d = 0; d < c.length; d++)
					if (c[d] && -1 != c[d].indexOf("=")) {
						var e = c[d].split("=");
						a[e[0]] = e[1]
					}
		}
		return a
	}
	function d(a) {
		var b = i.createElement("img");
		b.style.cssText = "display:none",
		b.src = a,
		i.body.appendChild(b)
	}
	function e(a) {
		a = a || {};
		var b = a.apuri || a.ap_uri;
		if (b) {
			var c = {};
			c.logtype = 2,
			c.apuri = b,
			c.cache = parseInt((Math.random() + 1) * Date.now());
			var e = [];
			for (var f in c)
				e.push(f + "=" + encodeURIComponent(c[f]));
			d("http://wgo.mmstat.com/sb.1.1?" + e.join("&"))
		}
	}
	function f() {
		var a = c(),
		b = a.ttid,
		d = /[^@]+\@taobao\_(iphone|android|apad|ipad)\_[\d.]+/i;
		return b = b ? decodeURIComponent(b) : "",
		d.test(b)
	}
	function g() {
		return !!a.navigator.userAgent.match(/WindVane/)
	}
	function h() {
		return !!a.navigator.userAgent.match(/AlipayClient/i)
	}
	var i = a.document,
	j = i.cookie.match(/(?:^|\s)cna=([^;]+)(?:;|$)/);
	j && (j = j[1]);
	var k = i.createElement("frame"),
	l = function (a) {
		var b = this,
		c = navigator.standalone,
		d = navigator.userAgent;
		return null != d.match(/iPhone|iPod|iPad/i) ? (this.platform = "ios", this.isIpad = null != d.match(/iPad/i)) : null != d.match(/Android/i) ? null != d.match(/Mobile/i) && (this.platform = "android", this.isChrome = null != d.match(/Chrome/i) && null == d.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i)) : null != d.match(/Linux/i) && (this.platform = "android"),
		!this.platform || c ? (this.invaliable = !0, null) : (this.init(a) && (this.create(), window.onblur = function () {
				clearTimeout(b.timeload),
				b.timeload = null
			}), this)
	};
	l.prototype = {
		constructor : l,
		init : function (a) {
			var b = this.options = a,
			d = b.isInstance || function () {
				return g() || f() || h()
			};
			if (d())
				return this.invaliable = !0, null;
			a.version || (a.version = "v1"),
			this.cover = b.cover || !1,
			this.isDownload = b.download || !1,
			this.timeout = b.timeout || 600;
			var e = b.from || "h5",
			k = b.crossplat || !1;
			if ("ios" != this.platform || k) {
				var l = b.url || "http://m.taobao.com/channel/act/sale/tbdl1.html";
				l += -1 == l.indexOf("?") ? "?" : "&",
				l += location.search.slice(1),
				this.bannerUrl = l
			} else
				this.bannerUrl = b.appstoreUrl || (this.isIpad ? "https://itunes.apple.com/app/id438865278" : "http://itunes.apple.com/cn/app/id387682726?mt=8");
			if (b.href) {
				var m = b.href,
				n = c(),
				o = i.getElementById("buried"),
				p = n.ttid || o && o.value,
				q = n.refid,
				r = n.ali_trackid,
				s = n.pid,
				t = n.actparam,
				u = n.actname,
				v = n.ad_id,
				w = n.source_type,
				x = {
					from : e
				};
				if (p && (x.ttid = p), q && (x.refid = q), r && (x.ali_trackid = r), s && (x.pid = s), t && (x.actparam = t), u && (x.actname = u), v && (x.ad_id = v), w && (x.source_type = w), x.url = encodeURIComponent(location.href.split(/[?#]/)[0]), j && (x.h5_uid = j), x.ap_uri = "", b.point)
					for (var y in b.point)
						x[y] = b.point[y];
				if (x = encodeURIComponent(JSON.stringify(x)), m = m.split("#"), -1 == m[0].indexOf("?") ? m[0] += "?" : m[0].indexOf("?") != m.length - 1 && (m[0] += "&"), m[0] += "point=" + x, m = m.join("#"), m = -1 != m.indexOf("://") ? m : "taobao://" + m, this.isChrome) {
					var z = m.split("://"),
					A = z[0],
					B = z[1],
					C = b.bag || "com.taobao.taobao";
					m = "intent://" + B + "#Intent;scheme=" + A + ";package=" + C + ";end"
				}
				this.paramUrl = m
			}
			return !0
		},
		reset : function (a) {
			this.iClose || (this.init(a), this.resetHtml && this.resetHtml(a))
		},
		create : function () {
			this.iClose || (k.parentNode || (k.setAttribute("id", "J_smartFrame"), k.style.cssText = "display:none", i.body.appendChild(k)), this.frame = k)
		},
		download : function (b) {
			var c = Date.now();
			(!b || c - b < this.timeout + 200) && (this.cover ? a.location.replace(this.bannerUrl) : a.location.href = this.bannerUrl)
		},
		redirect : function (b) {
			var c = this.options && this.options.version,
			d = this.frame,
			f = b ? "click_sb_" + c + "_manual" : "click_sb_" + c + "_auto";
			this.paramUrl && (e({
					ap_uri : f
				}), this.paramUrl = this.paramUrl.replace("%22ap_uri%22%3A%22%22", encodeURIComponent('"ap_uri":"' + f + '"')), this.isChrome ? a.location.href = this.paramUrl : d && d.setAttribute("src", this.paramUrl))
		},
		install : function (a) {
			var b = this,
			c = Date.now();
			b.isDownload || (b.timeload = setTimeout(function () {
						b.download(c)
					}, b.timeout)),
			b.redirect(a)
		}
	},
	b.smartbanner = function (a) {
		var c = a.type,
		d = b.smartbanner.BannerUI,
		e = b.smartbanner.PopUI;
		if ("banner" !== c && c) {
			if ("pop" === c) {
				if (e)
					return new e(a)
			} else if ("func" === c)
				return b.smartbanner.getInstance(a)
		} else if (d)
			return new d(a)
	},
	b.smartbanner.getInstance = function (a, b) {
		b || (b = Object.create({}));
		for (var c in l.prototype)
			b[c] = l.prototype[c];
		return l.call(b, a)
	},
	b.smartbanner.aplus = e,
	b.smartbanner.getParam = c,
	b.smartbanner.ttidInTaobaoApp = f,
	b.smartbanner.uaInTaobaoApp = g
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		var b = document.cookie;
		if (name = a + "=", start = b.indexOf(name), 0 > start)
			return null;
		start += name.length;
		var c = b.indexOf(";", start);
		return c = -1 == c ? b.length : c,
		b.substring(start, c)
	}
	function d() {
		var a = decodeURIComponent(c("imewweoriw"));
		return a && a.length > 32
	}
	function e(a) {
		var b = window.localStorage;
		if (b) {
			var c = b[a],
			d = !1;
			if (c) {
				var c = parseInt(c, 10),
				e = new Date;
				e.setHours(0),
				e.setMinutes(0),
				e.setSeconds(0),
				e.setMilliseconds(0),
				c > e && (d = !0)
			}
			return d
		}
	}
	function f(a, b) {
		a = a || 0;
		var e = navigator.userAgent,
		f = j.ali_trackid,
		g = Boolean(f),
		h = c("tkmb"),
		i = h ? h.split("&") : null,
		k = /400000_.*@\w+_(iphone|android)_.*/i,
		l = /.+@taobao_(iphone|android|apad|ipad)_.+/i,
		m = j.ttid,
		n = m ? decodeURIComponent(m) : "",
		o = "" != n ? !0 : !1,
		p = j.ut_sk,
		q = p ? decodeURIComponent(p) : "",
		r = "" != q ? !0 : !1,
		s = q.match(/.+_(\d+)_.+/),
		t = j.iv,
		u = k.test(n),
		v = t && 1 == t || i && "iv=1" === i[1],
		w = "undefined" != typeof t && 1 == t || i && "iv=0" === i[1],
		x = g && null != f.match(/^1_.+/i) && ("undefined" == typeof b || 1 == b),
		y = g && null != f.match(/^1_.+/i) && "undefined" != typeof b && 0 == b,
		z = !0;
		(o && l.test(n) || null != e.match(/WindVane/)) && (z = !1, !r || null == s || 12278902 != s[1] && 21380790 != s[1] || (z = !0)),
		null != e.match(/AlipayClient/i) && (z = !1);
		var A = "000";
		if (z) {
			var B = "1",
			C = "2",
			D = "1",
			E = "1",
			F = "2";
			u || v || x ? B = "0" : (w || y) && (B = "2"),
			null != e.match(/QQ/i) ? C = "0" : null != e.match(/UCBrowser|UCWeb/i) && (C = "1"),
			d() && (D = "0");
			var G = c("_w_app_lg"),
			H = 1,
			I = 2;
			G && (null != e.match(/iPhone|iPod/i) && G & H ? E = "0" : null != e.match(/Android/i) && G & I && (E = "0"));
			var J = document.referrer;
			u || null != e.match(/MicroMessenger/i) || null != J.match(/(t\.sina)|(weibo\.com)|(weibo\.cn)|(sina\.com)|(t\.cn)|(sinaurl)|(3g\.sina)|(iask\.cn)/i) ? F = "1" : (null != J.match(/(qq|baidu|hao123|google|soso)\.com/i) || null != J.match(/(m|wap)\.taobao\.com/i) || o && null != n.match(/^(12tx0065|b0tx02|eguc01|001001|51uc0003)$/i)) && (F = "0");
			try {
				A = window.strategy[a][B + C + D + E + F]
			} catch (K) {
				A = "000",
				console.log(K)
			}
		}
		var L = {};
		return A && ("1" == A.charAt(0) && (L.isInvoke = !0), "1" == A.charAt(1) && (L.isShow = !0), "1" == A.charAt(2) && (L.isInvokeDay = !0)),
		L
	}
	function g(a, b, c) {
		if (a) {
			var d,
			g = f(b, c);
			if (g.isInvoke && (d = d || i(a), d && d.redirect()), g.isShow && (d = d || i(a)), g.isInvokeDay && (d = d || i(a), !e("cloudDate"))) {
				d && d.redirect();
				try {
					localStorage.cloudDate = Date.now()
				} catch (h) {
					console.log(h)
				}
			}
			return d
		}
	}
	var h = document,
	i = b.smartbanner,
	j = (i.aplus, i.getParam()),
	k = function (a) {
		a.version = "v1",
		i.getInstance(a, this),
		this.calClose() || this.invaliable || (this.setParam(a), this.createHtml())
	};
	k.prototype = {
		constructor : k,
		calClose : function () {
			var a = window.localStorage;
			if (a) {
				var b = a.closeDate;
				if (b) {
					var b = parseInt(b, 10),
					c = new Date;
					c.setHours(0),
					c.setMinutes(0),
					c.setSeconds(0),
					c.setMilliseconds(0),
					b > c && (this.iClose = !0)
				}
				return this.iClose
			}
		},
		setParam : function (a) {
			var b = a.color ? "color:" + a.color + ";" : "",
			c = a.bgcolor ? "background-color:" + a.bgcolor + ";" : "";
			this.styles = b + c,
			this.isHide = a.hide || !1,
			this.text = a.text || "立即打开",
			this.title = a.title || "上手机淘宝客户端，保障交易安全",
			this.isIpad && (this.title = this.title.replace(/(手机)?淘宝/gi, "淘宝HD"))
		},
		template : function () {
			var a = this.isHide,
			b = ['<div id="smartAd" class="smartad" ' + (a ? 'style="display:none"' : "") + ">", '<a id="smartAd-close" class="sd-close" href="#"></a>', '<a id="smartAd-open" class="sd-point" href="#">', '<p class="sd-font">', '<b class="sd-taobao"></b>', "<span>" + this.title + "</span>", '<b class="sd-dl" style="' + this.styles + '">' + this.text + "</b>", "</p>", "</a>", "</div>"];
			return b.join("")
		},
		resetHtml : function (a) {
			this.setParam(a);
			var b = ['<b class="sd-taobao"></b>', "<span>" + this.title + "</span>", '<b class="sd-dl" style="' + this.styles + '">' + this.text + "</b>"].join("");
			this.smartDom && (this.smartDom.querySelector(".sd-font").innerHTML = b)
		},
		createHtml : function () {
			if (!this.iClose) {
				var a = this.template(),
				b = h.createElement("style"),
				c = h.createElement("div"),
				d = this.options.dpr || 1;
				c.innerHTML = a,
				this.smartDom = c.querySelector("#smartAd"),
				this.popDom = i({
						type : "pop",
						title : this.title,
						dpr : d
					}),
				b.innerHTML = ".smartad{background-color:rgba(66,66,74,0.96);position:fixed;bottom:0;left:0;height:" + 68 * d + "px;width:100%;font-size:1rem;z-index:1000;font-size:" + 14 * d + "px}.sd-point{color:#fff;display:block;text-decoration:none;height:100%;}.sd-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NUY0MDYzNjgzODIwNjgxMUIzQzJGMTE5OTQ3OTlEMzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVFNkRGMzUxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVFNkRGMzQxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6QzBFQ0RDNjM1RjEwRTMxMUJBQzZBQjEyRDc5RTUwOEIiIHN0UmVmOmRvY3VtZW50SUQ9InV1aWQ6RDE1N0E1MDlBQTBGRTMxMThCRTc4OEMyQUI0QTU3NzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4dUF9zAAADBklEQVR42syYy28ScRDHeQnySgmRaBoCSA+tGqHh0ISoCWcCiQe5efUARzlgCokV/wQInPkjPBgPNjRgND7qK7xiChYwiKTaUoq2iDPJbrL+sssuj9KdZLLZV/LZmfl9Z34rlUgkfomITA6+LCKeE7EBHYsNqCc2oD2xAbXEBrQ7EshqteojkUjY5XKZ8/n8J67nvF7vSjAYfKBWq5vFYvH7FEAVTqDFxUVNOBx+vLCw4DQajdcdDodqa2trm3zO7/df9fl8j1Qq1cWlpaVbcCwWCoXWJCsM/DMnUCwWi+r1+mv0ucFguOJ0OtUA9Y4JA9HZkMlk5/FcKpXK7Xb7zXq9/rzVavXGBPoB3pBx3e10OmXymsViuQ2g9+g0MWFo6/f738AOJohQe6RS53K5jxgRSNkK8zqcL7vdbvPq6updEubo6Gg3mUxGIUKHY8IMwT/wKjWmhw1Ko9FYIT0KEiadTscqlcrPCaKD6aoK6mUIhQWNNcT1DKSpATDRUqm0N+HqwvLYF9xccXWtra1d0ul0l8l7g8HgANIUngLmN5UuTJtEJuQNLGCTyeRmHRfkcn0gELgzhfZ8we8SPH7QOkMWMFnoUOS6bDb7dgLtQRn5KwiI1BlGmnpw7dwMoMpUQfMPaJgmtshgAUPN3DebzQqEIKFI8RxhWMTbgifGUCj0UKlUXiBhUqnUOhYwRgIjwgK10u1289Vq9RcP0GtUC8FAWq22gW0A2wFDZ/5b2mxQzWbzaSaTecYDswNeG2umxgYJAli22Ww3IDLNRCKxziZ6TChQ6CfxeDwtIFVv6GVOmpRv1wE1YWq324fw5SObpcfjsW5ubtYErKosjqpcD/ACzdBwab8kV9VZbYOGlN7wzknzAKI7eV0MG0VMEwplQww71xPwV+BjzdinBYSi+II6nvnefofSmT9n/bNhn2oHNS7RmxcQil0R/D1bbxrXFFO8iympgH+lCngmNglQB7e82EeZk948gY4piA4F0T9NFVUQRTmk6gCbXxd/j9C7gXnZPwEGAGrNPc1RZ9hjAAAAAElFTkSuQmCC) no-repeat;background-size:" + 18 * d + "px;width:" + 20 * d + "px;height:" + 20 * d + "px;position:absolute;left:0;top:0;z-index:10;}.sd-font{margin:0;padding:" + 20 * d + "px " + 8 * d + "px 0 " + 8 * d + "px;display:-webkit-box;height:" + 32 * d + "px;overflow:hidden;-webkit-box-align:center;}.sd-font > span{-webkit-box-flex:1;display:block;margin:0 " + 12 * d + "px;line-height:120%;}.sd-taobao{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAABy1BMVEX/////aTL/RAD/aTL/RAD/aTL/ZzD/RAD/aTL/RAD/ZzD/RgL/aTL/RAD//////fz/+/n/+ff/+PX/9/X/9/T/9fH/8+//8+3/8ev/8ez/7ef/7OX/6+P/6eH/6N//5t3/5Nr/4tf/4df/4NX/39P/3dH/3M//287/2cz/18n/1sf/1cX/08P/0cD/0L//z73/zbv/zLn/y7j/y7n/ybX/yLP/xrH/xa//w63/wKn/v6j/vab/vaX/vKP/uZ//uqH/t53/t5v/tZn/tZr/s5f/sZX/sJP/r5H/rY//q43/qYv/p4f/pYX/o4P/oX7/n3z/nXr/nHf/nHj/mXT/mXP/l3H/lW//k2z/lG3/k2v/kWb/kWn/jmb/jWT/jGL/i2D/iV7/iF3/hVj/g1b/glT/gVP/gVT/f1H/fU7/fk7/fEz/e0r/eUj/eEf/dkT/c0D/dEL/cj7/cT7/cDz/bjr/bzr/bTj/bDf/ajT/aTL/ZzD/Zi7/ZS7/ZCz/Yyr/ZCr/Yij/YCb/XiP/XiT/XCD/XCL/Wh7/WBz/Vxr/Vhn/VBj/VBb/UhT/URL/UBD/Tg7/Tgz/TAr/TAv/Sgj/Sgn/SAb/RwT/RgL/RACuODADAAAAmXRSTlMAEREiM0SIiJnM3d3u7v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+SMNVfAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAA8VJREFUWIXNl+lf0zAYxyMiiEqGwgABxaOKk9N5IKhjKsqQgSeHikPEewgqiGwcbqN2sG7OW/9ckzxZmo7hsbzx92J98jzP79s2TdrPEEKbtu4I5aUdRZsR0ZY87QyxBaHN2/L3E8ImVKTiD4WKkNIFhELbUFhR6oAFRakDFhWlDlhSlDpgeQMt3p7fqGQTitj0uPNwxyiLxrCj0fc88kfZAX2YqpOGJ1l4/N8AjxzMhYcikdkyFgVIdnm8t8OtHSCjaq35ytPfAS6AH7dFIr0sODIz7D3CqRlpw3ZAVNJ53tMSXahhwS7ZWZ0J3GHJYwM84B3Xon77SXuuPpkh9aB3J1zYsgRYkQX34F6ZdwpzWcvAjNUwAYQLVgbFbLp3SnPfisXOCr/z4kNbQw/Lli+JBHqfQ2NgLi+nv44ZufQKSvdFAumSQuPs8LqK9tT2P2Dz36XbxKB4QIxtgDPYR37n6mhL1Wu9mR7r39kB8Hi6cgIekkpzWJ89QY47n+lwIzWarMt6LcyzBTCEYntpqe6NYUwcdASMhVq8Xu0GZF3CJQHGYMnVEoLx1DBacvgFoN4CxC0FD8JFv6IDtpT8waALzhgEzcbZBOFKYZIBccPP1smepXg8sps8wEGSa2WGVtEDAKcFWLVprpGWfSSad1UEaIYDRAcAysQ4C7Aa7yJlbXVVnwwGJqn4LUyC5jgAW4C1LBn1GO9eW3uZawoxPr3GAXqmHyWy5SWTkEhMbwBIcIBoXw9ox7gpkZg7xAX70slHvvUAM0tR4uiRxm2sv41ExvjZuGkCwCHq6wB0Ep+bsSmqRTI+xgzHTNNDHvFoBuC0AEm76AaoTCSHWFs/SXBAMklfNk3JJADqhCELMFVBqueSyX7WNiQDgvT4lgMOW4CUrHn24nyRSsEHYpSkOCBleOnxUgoALcKCPkhaZvtRI9EIa+sjEQCO9sI7uZKvg9PCIwNWYDMFSDgJ7YHp6aP2hXAHduPFXIDoflbbmyJxqhpny8NeMC74Yl23AOmMuB/fZKPhLPuJqXScvC/afDB8IWwCENkHpWoTxn7pi9Z0JURT7u5wGtZV/QcL8JEr1g7N/kxiye9pbDjn6Rt5lKAjljM90DT4UQh9Fpqg81Ohf86lMK45daOng3+wWtNWBX2yZHZj3P0pp+7K89FkSBVk65vWorkBZyx75UBarqCvf6XQoLezQXM0uLonTHsFfVGUOuCbov4DwHdFqQN+KEodsF3Nvx0VqwGKUUGpir+0AKHC0p95q7SQ/n0vKC7Jz15STM7/C0WkvAQNIbFkAAAAAElFTkSuQmCC) no-repeat;width:" + 30 * d + "px;height:" + 30 * d + "px;display:inline-block;background-size:contain;vertical-align:top;}.sd-dl{display:block;color:#3d4245;background-color:#e5e5e5;border-radius:" + 5 * d + "px;height:" + 30 * d + "px;line-height:" + 30 * d + "px;text-align:center;padding:0 " + 12 * d + "px;font-weight:normal;}",
				h.body.appendChild(b),
				h.body.appendChild(this.smartDom),
				this.listen()
			}
		},
		show : function () {
			this.iClose || this.smartDom && (this.smartDom.style.display = "block")
		},
		hide : function () {
			this.iClose || this.smartDom && (this.smartDom.style.display = "none")
		},
		pop : function () {
			this.iClose || this.popDom && this.popDom.open()
		},
		listen : function () {
			if (!this.iClose) {
				var a = this,
				b = a.smartDom;
				b.querySelector("#smartAd-close").addEventListener("click", function (b) {
					b.preventDefault(),
					a.hide();
					try {
						localStorage.closeDate = Date.now(),
						a.calClose()
					} catch (b) {}

				}, !1),
				b.querySelector("#smartAd-open").addEventListener("click", function (b) {
					b.preventDefault(),
					a.install(!0)
				})
			}
		}
	},
	b.smartbanner.expiresInDay = e,
	b.smartbanner.smtStatus = f,
	b.smartbanner.sbLogic = g,
	b.smartbanner.BannerUI = k
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		return a.preventDefault(),
		!1
	}
	var d,
	e,
	f,
	g,
	h,
	i = a.document,
	j = a.localStorage,
	k = b.smartbanner,
	l = (k.aplus, !1),
	m = ['<div class="c-smartpop">', '<section class="header">', '<a href="javascript:void(0)"></a>', "</section>", '<section class="title">', "<span>淘宝客户端不仅可以更流畅地收藏宝贝，还能分享，立刻下载体验！</span>", "</section>", '<section class="banner">', '<img border="0"></img>', "</section>", '<section class="action">', '<a href="javascript:void(0)">立即打开</a>', "</section>", "</div>"].join(""),
	n = document.createElement("div"),
	o = document.createElement("style");
	try {
		j.setItem("testPrivateModel", "false")
	} catch (p) {
		j = null
	}
	var q = function (a) {
		a.version = "v2",
		k.getInstance(a, this),
		this.title = a.title,
		this.isIpad && this.title && (this.title = this.title.replace(/(手机)?淘宝/gi, "淘宝HD")),
		this.banner = a.banner
	};
	q.prototype = {
		constructor : q,
		_render : function () {
			var a = this,
			b = a.options.dpr || 1,
			c = [".c-smartpop-wrap {", "width: 100%;height: 100%;top: 0;left: 0;position: absolute;z-index: 999;background: rgba(0,0,0,0);display: -webkit-box;-webkit-box-pack: center;-webkit-box-align: center;", "}", ".c-smartpop {", "width: 252px * @dpr;background-color: rgba(255,255,255,0.9);border: 1px solid rgba(51,51,51,0.18);-webkit-box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.27);box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.27);border-radius: 4px * @dpr;", "}", ".c-smartpop .header {", "width: 100%;height: 34px * @dpr;position: relative;", "}", ".c-smartpop .header a {", "display: inline-block;width: 14px * @dpr;height: 14px * @dpr;position: absolute;", "background: url(data:image/gif;base64,R0lGODlhHAAcAJEAAP///8zMzJmZmWZmZiH5BAAHAP8ALAAAAAAcABwAAAJWjICpyyk2TptMRGAlpdnd3XSKCHra+JVklXJt+C6re6L1NmMxuOalLvH9gMKhbmdEWJDGTFH1edJsSSDrNoVhrzim0vvdWn8+qexl5oarpjE7bHjLAgUAOw==) no-repeat 0 0;", "background-size: contain;top: 8px * @dpr;right: 8px * @dpr;opacity: 0.9;-webkit-tap-highlight-color:rgba(0,0,0,0);", "}", ".c-smartpop .title {", "height: 32px * @dpr;line-height: 16px * @dpr;font-size: 12px * @dpr;margin: 0 12px * @dpr 8px * @dpr;padding-left: 36px * @dpr;", "background: url(data:image/gif;base64,R0lGODlhOAA4ALMAAP//////zP/MzP/Mmf/MZv+Zmf+ZZv+ZM/+ZAP9mM/9mAP8zAMxmM8xmAAAAAAAAACH5BAAHAP8ALAAAAAA4ADgAAAT/EEgwjGoqY51v3x4nhuRmDFOakF3rvnAsN0kKsHKu79/E8MBgrjYQGo+dwQHJDC6b0Kh0Sq1ar9isdstFGgoGS6cmMKy6L0GqmDGkBBXXIpM4Uws2gDhPKQ8EAXxldkxqNkVuNoZ8fAVQKDaOgYxvAgQFA5MTAk0HeQqQjJZPLombTScSSgqUAI45phKkUYuMhDCRXpxJbwa1YjmHRzUAASuxAAfIJ1/MYBWOtbtCmnoKB4YrrYwKtQFGyNYKBgjd23zmKUfYuRmh36w2MbU3XjZPkJza8jD0nYtFErAzc4CYioIIV/iDcsrTOXQLUUng5PChvIhMIAW8xKxCHmiXpwYUwThsgoVmFc58GqeGDUkjizLck8lPRboJTRbtmhlPHSiTNyVkTLHHZk+ceNR5QxKqWAcbxo5S8vXmSFNxPy0qqjYNyNV6bSwOSBCKHgEhX4GFpQSng4EA0Wzc0hEORoKOzEgVKEiHXlcgZCe8EmKQ0lwgBwLZYytllhNAUAU4RkO5suXLmDNr3mx5MucOB9h8foHiMGeDo1skqGb68uqPnimHThEBADs=) no-repeat 0 center;", "background-size: 28px * @dpr 28px * @dpr;color: #666;", "}", ".c-smartpop .banner {", "height: 88px * @dpr;margin: 0 12px * @dpr 10px * @dpr;overflow: hidden;", "}", ".c-smartpop .banner img {", "border: 0px;width: 100%;height: 100%;", "}", ".c-smartpop .action {", "height: 28px * @dpr;text-align: center;margin: 0 auto 12px * @dpr;", "}", ".c-smartpop .action a {", "display: inline-block;height: 28px * @dpr;line-height: 28px * @dpr;background-color: rgb(255,102,0);", "border-radius: 3px * @dpr;text-align: center;-webkit-box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.05), inset 0px 1px 3px 0px rgba(169,172,175,0.31);", "box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.05), inset 0px 1px 3px 0px rgba(169,172,175,0.31);font-size: 14px * @dpr;", "color: #FFF;text-decoration: none;-webkit-tap-highlight-color:rgba(0,0,0,0);margin: 0 10px * @dpr;padding: 0 8px * @dpr;", "}", ".c-smartpop .action a:hover, .c-smartpop .action a.hover {", "background-color: #EF5F00;", "}"].join("").replace(/(\d+)px\s+\*\s+\@dpr/gi, function (a, c) {
				return parseFloat(c) * b + "px"
			});
			n.className = "c-smartpop-wrap",
			n.innerHTML = m,
			n.style.cssText = "display:none",
			d = n.querySelector(".c-smartpop"),
			e = n.querySelector(".header a"),
			f = n.querySelector(".title span"),
			g = n.querySelector(".banner"),
			e_bannerImg = n.querySelector(".banner img"),
			h = n.querySelector(".action a"),
			e.addEventListener("click", function (b) {
				b.preventDefault(),
				j && j.setItem("smpopCloseDate", Date.now()),
				a.close()
			}, !1),
			h.addEventListener("touchstart", function () {
				h.className = "hover"
			}, !1),
			h.addEventListener("touchend", function () {
				h.className = ""
			}, !1),
			h.addEventListener("click", function (b) {
				b.preventDefault(),
				a.install(!0)
			}, !1),
			o.innerHTML = c,
			i.body.appendChild(o),
			i.body.appendChild(n)
		},
		_show : function () {
			var b = this,
			d = a.scrollY,
			e = a.innerHeight;
			f.innerHTML = b.title,
			b.banner ? (g.style.display = "", e_bannerImg.setAttribute("src", b.banner)) : g.style.display = "none",
			n.style.top = d + "px",
			n.style.height = e + "px",
			n.style.display = "",
			n.addEventListener("touchmove", c, !1)
		},
		open : function () {
			if (!this.invaliable) {
				if (j) {
					var a = parseInt(localStorage.getItem("smpopCloseDate")),
					b = new Date;
					if (b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), a > b.getTime())
						return
				}
				l || (l = !0, this._render()),
				this._show()
			}
		},
		close : function () {
			this.invaliable || l && (n.style.display = "none", n.removeEventListener("touchmove", c, !1))
		}
	},
	k.PopUI = q
}
(window, window.lib || (window.lib = {}));
!function (a, b, c) {
	function d(a) {
		var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(g.cookie);
		return b ? b[1] : c
	}
	function e() {
		return h.indexOf("WindVane") > 0 || h.indexOf("AliApp") > 0 || h.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/) || j.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/)
	}
	function f(a) {
		var b = "http://" + ["login", k.config.subDomain, k.config.mainDomain].join(".") + "/" + k.config.name + "?tpl_redirect_url=" + (a || location.href),
		c = g.createElement("a"),
		d = g.createEvent("HTMLEvents");
		c.style.display = "none",
		c.href = b,
		g.body.appendChild(c),
		d.initEvent("click", !1, !0),
		c.dispatchEvent(d)
	}
	var g = a.document,
	h = a.navigator.userAgent,
	i = location.hostname,
	j = a.location.search,
	k = b.login = b.login || {},
	l = /.*?([^.]+)(?:\.x)?\.(taobao|tmall|etao|alibaba|alipay|aliyun)\.(com|net).*/i,
	m = function () {
		var a = i.indexOf("x.taobao.net") > 0 ? "waptest" : "m",
		b = i.match(l);
		return !b || "waptest" !== b[1] && "wapa" !== b[1] && "m" !== b[1] || (a = b[1]),
		a
	}
	();
	k.config = {
		name : "login.htm",
		mainDomain : "taobao.com",
		subDomain : m
	},
	k.isLogin = function () {
		var a = d("imewweoriw");
		return a && a.length > 32
	},
	k.getUserNick = function () {
		var a = d("_w_tb_nick");
		return a && a.length > 0 && "null" != a ? a : ""
	},
	k.goLogin = function (a) {
		a = a || {},
		a.targetUrl = a.targetUrl || a.redirectUrl || a.rediUrl,
		e() && a.widget !== !0 || a.widget === !1 || !this.widget ? f(a.targetUrl) : this.widget.showLogin(a)
	},
	k.getNickFromCookie = k.getUserNick
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var c = "stop",
	d = navigator.userAgent,
	e = /iPhone|iPad|iPod|iTouch/i.test(d),
	f = function (a, b, c) {
		var d = document.createElement("script");
		d.src = "http://amos.alicdn.com/getRealCid.aw?toId=cntaobao" + b + "&fromId=" + a + "&charset=utf-8",
		d.onload = c,
		document.body.appendChild(d)
	},
	g = function () {
		return -1 != d.indexOf("UCBrowser") ? "uc" : -1 != d.indexOf("baidubrowser") ? "baidu" : -1 != d.indexOf("MQQBrowser") ? "qq" : -1 != d.indexOf("360browser") ? "360" : -1 != d.indexOf("Opera") ? "opera" : -1 != d.indexOf("Chrome") ? "chrome" : "other"
	},
	h = function (a, b, c) {
		var d,
		f = e ? "ios" : "android",
		h = "taobao",
		i = "http://log.m.taobao.com/js.do",
		j = g() || "other";
		-1 != document.location.href.indexOf("tmall.com") && (h = "tmall");
		var k = document.createElement("script");
		k.src = i + "?ap_ref=&ap_uri=wx_click_waptowx&ap_data=" + b + ":" + a + ":" + f + ":" + h + ":" + j + "&_aplus=1",
		d = setTimeout(function () {
				c()
			}, 500),
		k.onload = function () {
			clearTimeout(d),
			c()
		},
		k.onerror = function () {
			clearTimeout(d),
			c()
		},
		document.body.appendChild(k)
	},
	i = function () {
		if (-1 != d.indexOf("MQQBrowser")) {
			if (parseFloat(d.substring(d.indexOf("MQQBrowser") + 1 + new String("MQQBrowser").length)) < 4.2)
				return !1
		} else if (-1 != d.indexOf("baidubrowser")) {
			var a = parseInt(d.substring(d.indexOf("baidubrowser") + 1 + new String("baidubrowser").length));
			if (4 != a && 3 != a)
				return !1
		}
		return !0
	},
	j = function () {
		var a = {},
		b = window.location.href,
		c = "",
		d = window.navigator.userAgent,
		e = d.match(/\b(?:TBIOS|TBANDROID)\/((?:.*)@taobao_(iphone|android|apad|ipad)_((?:\d+\.){2,3}\d))/i),
		f = b.match(/(?:\?|&)ttid=(?:.*)@taobao_(iphone|android|apad|ipad)_((?:\d+\.){2,3}\d)/i),
		g = d.match(/WindVane/i);
		return c = e || f || g,
		a.inTaobaoAPP = c ? !0 : !1,
		a
	},
	k = function () {
		return -1 != d.indexOf("T-UA=android") ? !0 : !1
	},
	l = function (a, b) { {
			var c = a.itemId || "",
			d = a.toNick || "",
			e = a.orderId || "",
			f = a.wapwwUrl;
			a.fromNick || ""
		}
		"wangtalk" == b ? h(a.pageId || "h5_default", "wx", function () {
			window.location = "" != d ? "" != e ? "wangtalk://wangxin.taobao.com/talkUser?userid=" + d + "&orderid=" + e + "&selfid=" + a.fromNick : "" != c ? "wangtalk://wangxin.taobao.com/talkUser?userid=" + d + "&itemid=" + c + "&selfid=" + a.fromNick : "wangtalk://wangxin.taobao.com/talkUser?userid=" + d + "&selfid=" + a.fromNick : "wangtalk://wangxin.taobao.com/contacts?selfid=" + a.fromNick
		}) : "http" == b && (f = escape(f), h(a.pageId || "h5_default", "wapww", function () {
				window.location = "" != d ? "" != e ? "http://www.taobao.com/go/rgn/wx/talkuser.html?userid=" + d + "&orderid=" + e + "&selfid=" + a.fromNick + "&wapww_url=" + f : "" != c ? "http://www.taobao.com/go/rgn/wx/talkuser.html?userid=" + d + "&itemid=" + c + "&selfid=" + a.fromNick + "&wapww_url=" + f : "http://www.taobao.com/go/rgn/wx/talkuser.html?userid=" + d + "&selfid=" + a.fromNick + "&wapww_url=" + f : "http://www.taobao.com/go/rgn/wx/contacts.html?selfid=" + a.fromNick + "&wapww_url=" + f
			}))
	},
	m = function (a) { {
			var b = (a.itemId || "", a.toNick || ""),
			d = (a.orderId || "", a.wapwwUrl);
			a.fromNick || ""
		}
		if (0 == b.indexOf("cntaobao") && (b = b.substring(8), a.toNick = b), e)
			h(a.pageId || "h5_default", "wapww", function () {
				window.location = d
			});
		else if (i()) {
			var f = !1,
			g = new Image;
			g.onload = function () {
				f = !0
			},
			g.src = "content://com.alibaba.mobileim.h5/wx.png?time=" + (new Date).getTime(),
			setTimeout(function () {
				f ? l(a, "wangtalk") : l(a, "http")
			}, 200)
		} else
			l(a, "http");
		setTimeout(function () {
			c = "stop"
		}, 2e3)
	};
	b.wangxin = {
		waptowx : function (a) {
			"stop" == c && (c = "running", j().inTaobaoAPP || k() ? h(a.pageId || "h5_default", "wapww", function () {
					window.location = a.wapwwUrl
				}) : a.toNick && a.fromNick ? f(a.fromNick, a.toNick, function () {
					a.toNick = realcid || "",
					m(a)
				}) : m(a))
		},
		init : function () {
			for (var a = document.querySelectorAll("a.wangxin-waptowx"), c = 0; c < a.length; c++)
				a[c].onclick = function (a) {
					_this = this,
					a.preventDefault(),
					b.wangxin.waptowx({
						fromNick : _this.getAttribute("data-fromnick"),
						toNick : _this.getAttribute("data-tonick") || "",
						itemId : _this.getAttribute("data-item") || "",
						wapwwUrl : _this.href,
						pageId : "h5_mytaobao_index"
					})
				}
		}
	}
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	if (!b.config || !b.config.sysType) {
		var c = a.location.hostname,
		d = /.*?([^.]+)(?:\.x)?\.(taobao|tmall|etao|alibaba|alipay|aliyun)\.(com|net).*/i,
		e = a.location.hostname.match(d),
		f = c.match(/taobao\.net$/i) ? "waptest" : "m";
		!e || "waptest" !== e[1] && "wapa" !== e[1] && "m" !== e[1] || (f = e[1]),
		b.config = {
			hostReg : d,
			sysType : f,
			defaultAppKey : "waptest" === f ? "4272" : "12574478"
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	b.encode || (b.encode = {}),
	b.encode.md5 = function (a) {
		function b(a, b) {
			return a << b | a >>> 32 - b
		}
		function c(a, b) {
			var c,
			d,
			e,
			f,
			g;
			return e = 2147483648 & a,
			f = 2147483648 & b,
			c = 1073741824 & a,
			d = 1073741824 & b,
			g = (1073741823 & a) + (1073741823 & b),
			c & d ? 2147483648^g^e^f : c | d ? 1073741824 & g ? 3221225472^g^e^f : 1073741824^g^e^f : g^e^f
		}
		function d(a, b, c) {
			return a & b | ~a & c
		}
		function e(a, b, c) {
			return a & c | b & ~c
		}
		function f(a, b, c) {
			return a^b^c
		}
		function g(a, b, c) {
			return b^(a | ~c)
		}
		function h(a, e, f, g, h, i, j) {
			return a = c(a, c(c(d(e, f, g), h), j)),
			c(b(a, i), e)
		}
		function i(a, d, f, g, h, i, j) {
			return a = c(a, c(c(e(d, f, g), h), j)),
			c(b(a, i), d)
		}
		function j(a, d, e, g, h, i, j) {
			return a = c(a, c(c(f(d, e, g), h), j)),
			c(b(a, i), d)
		}
		function k(a, d, e, f, h, i, j) {
			return a = c(a, c(c(g(d, e, f), h), j)),
			c(b(a, i), d)
		}
		function l(a) {
			for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i; )
				b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
			return b = (i - i % 4) / 4,
			h = i % 4 * 8,
			g[b] = g[b] | 128 << h,
			g[f - 2] = c << 3,
			g[f - 1] = c >>> 29,
			g
		}
		function m(a) {
			var b,
			c,
			d = "",
			e = "";
			for (c = 0; 3 >= c; c++)
				b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
			return d
		}
		function n(a) {
			a = a.replace(/\r\n/g, "\n");
			for (var b = "", c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
			}
			return b
		}
		var o,
		p,
		q,
		r,
		s,
		t,
		u,
		v,
		w,
		x = [],
		y = 7,
		z = 12,
		A = 17,
		B = 22,
		C = 5,
		D = 9,
		E = 14,
		F = 20,
		G = 4,
		H = 11,
		I = 16,
		J = 23,
		K = 6,
		L = 10,
		M = 15,
		N = 21;
		for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)
			p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
		var O = m(t) + m(u) + m(v) + m(w);
		return O.toLowerCase()
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		var b = document.cookie.indexOf(";", a);
		return -1 === b && (b = document.cookie.length),
		window.unescape(decodeURIComponent(document.cookie.substring(a, b)))
	}
	b.storage || (b.storage = {}),
	b.storage.cookie = {
		isCookieEnable : function () {
			if (!window.navigator.cookieEnabled)
				return !1;
			var a = "_s_cookie_",
			b = this.getCookie(a);
			return this.setCookie(a, "1"),
			"1" === b ? (this.delCookie(a), !0) : !1
		},
		getCookie : function (a) {
			for (var b, d = a + "=", e = d.length, f = document.cookie.length, g = 0; f > g; ) {
				if (b = g + e, document.cookie.substring(g, b) === d)
					return c(b);
				if (g = document.cookie.indexOf(" ", g) + 1, 0 === g)
					break
			}
			return null
		},
		setCookie : function (a, b) {
			var c = window.location.host,
			d = c.indexOf("."),
			e = c.substring(0, d),
			f = arguments.length > 2 ? arguments[2] : null,
			g = new Date;
			"waptest" !== e && "wapa" !== e && "m" !== e && (c.indexOf("taobao") > -1 || c.indexOf("tmall") > -1) && (c = c.substr(d + 1)),
			null == f ? document.cookie = a + "=" + window.escape(b) + ";path=/;domain=" + c : (g.setTime(g.getTime() + 1e3 * f), document.cookie = a + "=" + window.escape(b) + ";path=/;domain=" + c + ";expires=" + g.toGMTString())
		},
		delCookie : function (a) {
			var b = new Date,
			c = this.getCookie(a);
			b.setTime(b.getTime() - 1),
			document.cookie = a + "=" + c + "; expires=" + b.toGMTString()
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {});
	c.EXECUTOR = {
		isRunning : !1,
		executorQue : [],
		resume : function () {
			var a = this.executorQue[0];
			this.executorQue = this.executorQue.slice(1),
			a ? a.run() : this.isRunning = !1
		},
		_executors : [],
		_getExecutor : function (a) {
			for (var b, c = this._executors.length, d = c; d > 0 && (b = this._executors[d - 1], !b.canRun(a)); d--);
			var e = new b(a);
			return e
		},
		register : function (a, b) {
			var d = function (a) {
				this.init(a)
			};
			d.canRun = a,
			b.handleResponse = function (a) {
				c.wrapHandler.call(this, a),
				c.EXECUTOR.resume()
			},
			d.prototype = b,
			this._executors.push(d)
		},
		execute : function (a) {
			var b = this._getExecutor(a);
			this.executorQue.push(b),
			this.isRunning || (this.isRunning = !0, this.resume())
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {});
	c.ajax = function () {
		this.EXECUTOR.execute(arguments)
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = {},
	d = function (a) {
		try {
			return decodeURIComponent(a)
		} catch (b) {
			return a
		}
	},
	e = c.getParam = function (a) {
		var b,
		c = this.queryMap || function (a) {
			if (a.length < 1)
				return "";
			a = a.substr(1);
			var b,
			c,
			e = a.split("&"),
			f = {};
			for (c in e)
				b = e[c].split("="), f[d(b[0])] = d(b[1]);
			return f
		}
		(location.search);
		return this.queryMap = c,
		a ? (b = c[a], b && b.indexOf("#") > -1 && (b = encodeURIComponent(b)), b) : c
	},
	f = function (a) {
		var b,
		c,
		d,
		f = "";
		for (b in a)
			c = a[b], d = e(c), d && "" !== d && (f += "&" + c + "=" + d);
		return f
	}
	(["ttid", "sprefer"]);
	c.getUrl = function (a) {
		function c(a, b) {
			if (!b)
				return a;
			a.indexOf("?") < 0 && (a += "?");
			var c = a.charAt(a.length - 1),
			d = b.charAt(0);
			return "?" === c || "&" === c ? "?" === d || "&" === d ? a + b.substr(1) : a + b : "?" === d || "&" === d ? a + b : a + "&" + b
		}
		var d = a.host || a.subdomain + "." + b.config.sysType + ".taobao.com",
		e = a.url || "http://" + d + "/" + a.path;
		return e.indexOf("?") > 0 || (e += "?"),
		e = c(e, f),
		a.data && (e = c(e, function (a) {
					var b,
					c,
					d = "";
					if (null == a)
						return d;
					for (b in a)
						c = a[b], null != c && "" !== c && (d += b + "=" + encodeURIComponent("object" == typeof c ? JSON.stringify(c) : c) + "&");
					return "" !== d && d.length - 1 === d.lastIndexOf("&") && (d = d.substr(0, d.length - 1)),
					d
				}
					(a.data))),
		e
	},
	b.uri = c
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.storage.cookie,
	d = b.mtop || (b.mtop = {}),
	e = 0,
	f = 5;
	d.wrapHandler = function (a) {
		var d = (a && a.ret ? a.ret : "").toString();
		d.indexOf("SUCCESS::") >= 0 ? (e = 0, this.callback && this.callback(a)) : -1 !== d.indexOf("TOKEN_EMPTY::") || -1 !== d.indexOf("TOKEN_EXOIRED::") ? ++e < f ? (console.log("TODO RETRY"), this.retryed = !0, b.mtop.ajax(this.options, this.callback, this.errorback)) : (c.delCookie(b.mtop.base.tokenKey), console.log("try exceed times")) : this.errorback && this.errorback(a)
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.storage.cookie,
	d = b.encode.md5,
	e = b.uri.getUrl,
	f = "J_app_key",
	g = b.mtop || (b.mtop = {});
	g.base = {
		tokenKey : "_m_h5_tk",
		that : this,
		appKey : function () {
			var a = b.config,
			c = document.getElementById(f);
			return c ? c.value : a.defaultAppKey
		}
		(),
		_getToken : function () {
			return (c.getCookie(this.tokenKey) || "").split("_")[0]
		},
		genApiUrl : function (a, c, d) {
			var f = b.config,
			g = "rest/" + c,
			h = {
				path : g,
				data : a
			};
			if (f.mtopHost)
				h.host = f.mtopHost;
			else if (a.subdomain)
				h.subdomain = a.subdomain, delete a.subdomain;
			else {
				var i = f.hostReg.exec(location.hostname);
				i ? (i[0] = "etao" === i[2] ? "apie" : "api", h.host = i.join(".")) : h.subdomain = "api"
			}
			var j = e(h);
			return j + "&appKey=" + this.appKey + "&t=" + d
		},
		sign : function (a, b) {
			var c = this._getToken() + "&" + b + "&" + this.appKey + "&" + a;
			return d(c)
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = b.mtop || (b.mtop = {}),
	d = c.base,
	e = "h5ApiUpdate.do";
	c.EXECUTOR.register(function (a) {
		return !a[0].length && a[0].api && !a[0].cros
	}, {
		init : function (a) {
			this.options = a[0],
			this.t = (new Date).getTime(),
			this.callback = a[1],
			this.errorback = a[2]
		},
		run : function () {
			var b = this,
			c = this._genSignUrl(),
			d = {
				type : "GET",
				url : c,
				timeout : 2e4,
				dataType : "jsonp",
				success : function (a) {
					b.handleResponse && b.handleResponse(a)
				},
				error : function (a) {
					b.handleResponse && b.handleResponse(a)
				}
			};
			a.$.ajax(d)
		},
		_genSignUrl : function () {
			var a = d.genApiUrl(this.options, e, this.t);
			return this._addJsonParam(a) + "&sign=" + d.sign(JSON.stringify(this.options.data), this.t)
		},
		_addJsonParam : function (a) {
			if (-1 === a.indexOf("callback=")) {
				var b = a.indexOf("?");
				return a.substr(0, b) + "?callback=?&type=jsonp&" + a.substr(b + 1, a.length)
			}
			return a
		}
	}),
	c.request = function (a, b, c) {
		var d = a.data || {};
		a.v = a.v || "*",
		a.data = "string" == typeof d ? JSON.parse(d) : d,
		this.ajax(a, b, c)
	},
	c.getApi = function (a, b, c, d, e, f) {
		d || (d = {}),
		d.api = a,
		d.v = b,
		d.data = c,
		this.request(d, e, f)
	}
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	function c(a, b) {
		var c = b.right > a.left && b.left < a.right,
		d = b.bottom > a.top && b.top < a.bottom;
		return c && d
	}
	var d = a.Zepto || a.$;
	b.lazyload = {
		init : function (a) {
			this.img.init(a)
		},
		img : {
			init : function (b) {
				var c = this;
				if (c.isload)
					return c.trigger(), void 0;
				var e = {
					lazyHeight : 400,
					lazyWidth : 0,
					definition : !1,
					size : null
				},
				b = b || {};
				d.extend(c, e, b);
				var f = c.definition,
				g = a.devicePixelRatio;
				c.definition = f && g && g > 1 || !1,
				c.DPR = g;
				var h = 5,
				i = 200,
				j = c.isPhone = c.fetchVersion();
				if (j) {
					var k,
					l;
					d(a).on("touchstart", function () {
						k = {
							sy : a.pageYOffset,
							time : Date.now()
						},
						l && clearTimeout(l)
					}).on("touchend", function (b) {
						if (b && b.changedTouches) {
							var d = Math.abs(a.pageYOffset - k.sy);
							if (d > h) {
								var e = Date.now() - k.time;
								l = setTimeout(function () {
										c.changeimg(),
										k = {},
										clearTimeout(l),
										l = null
									}, e > i ? 0 : 200)
							}
						} else
							c.changeimg()
					}).on("touchcancel", function () {
						l && clearTimeout(l),
						k = null
					})
				} else
					d(a).on("scroll", function () {
						c.changeimg()
					});
				c.trigger(),
				c.isload = !0
			},
			trigger : function (a) {
				var b = this,
				c = b.isPhone,
				e = c && "touchend" || "scroll";
				b.imglist && b.imglist.each(function (a, b) {
					b && (b.onerror = b.onload = null)
				}),
				a && (b.size = a),
				b.imglist = d("img.lazy"),
				d(window).trigger(e)
			},
			fetchVersion : function () {
				var a = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
				b = a && !0 || !1,
				c = b && a[2].split("_");
				return c = c && parseFloat(c.length > 1 ? c.splice(0, 2).join(".") : c[0], 10),
				b && 6 > c
			},
			setImgSrc : function (a, b) {
				if (a) {
					b = b || this.size,
					b = b && ("string" == typeof b ? b : b[this.DPR]) || null,
					b && (b = ["_", b, ".jpg"].join(""));
					var c = a.lastIndexOf("_."),
					d = -1 != c ? a.slice(c + 2) : null,
					e = d && "webp" == d.toLowerCase() ? !0 : !1,
					f = e ? a.slice(0, c) : a,
					g = f.replace(/_\d+x\d+\.jpg?/g, "");
					return g += b,
					e && g + "_.webp" || g
				}
			},
			getCoord : function (b, c) {
				if (b) {
					var e,
					f,
					g,
					h,
					i;
					if (b != a)
						i = b.offset ? b : d(b), i = i.offset(), e = i.width, f = i.height, g = i.left, h = i.top;
					else {
						var j = c && c.y || 0,
						k = c && c.x || 0;
						e = b.innerWidth + k,
						f = b.innerHeight + j,
						g = b.pageXOffset,
						h = b.pageYOffset
					}
					return {
						left : g,
						top : h,
						right : g + e,
						bottom : h + f
					}
				}
			},
			changeimg : function () {
				function a(a, c) {
					var e = a.attr("dataimg"),
					f = a.attr("datasize");
					e && ((g || f) && (e = b.setImgSrc(e, f)), a.attr("src", e), a.css("visibility", "visible"), a[0].onload || (a[0].onload = a[0].onerror = function () {
							d(this).removeClass("lazy").removeAttr("dataimg"),
							b.imglist[c] = null,
							this.onerror = this.onload = null
						}))
				}
				var b = this,
				e = window,
				f = {
					x : b.lazyWidth,
					y : b.lazyHeight
				},
				g = b.definition;
				b.imglist.each(function (g, h) {
					if (h) {
						var i = d(h);
						c(b.getCoord(e, f), b.getCoord(i)) && a(i, g)
					}
				})
			}
		}
	}
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var c = a.Zepto || a.$,
	d = function () {
		var a = "WebkitTransform" in document.documentElement.style ? !0 : !1;
		return a
	},
	e = function () {
		var a,
		b = !1,
		c = document.createElement("div"),
		a = ["&#173;", '<style id="smodernizr">', "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", "</style>"].join(""),
		d = document.documentElement.style;
		return c.id = "modernizr",
		c.innerHTML += a,
		document.body.appendChild(c),
		"WebkitPerspective" in d && "webkitPerspective" in d && (b = 9 === c.offsetLeft && 3 === c.offsetHeight),
		c.parentNode.removeChild(c),
		b
	},
	f = e ? "translate3d(" : "translate(",
	g = e ? ",0)" : ")",
	h = function (a, b) {
		return a ? (b ? b.container = a : b = "string" == typeof a ? {
				container : a
			}
			 : a, c.extend(this, {
				container : ".slider",
				wrap : null,
				panel : null,
				trigger : null,
				activeTriggerCls : "sel",
				hasTrigger : !1,
				steps : 0,
				left : 0,
				visible : 1,
				margin : 0,
				curIndex : 0,
				duration : 300,
				loop : !1,
				play : !1,
				interval : 5e3,
				useTransform : e ? !0 : !1,
				lazy : ".lazyimg",
				lazyIndex : 1,
				callback : null,
				prev : null,
				next : null,
				activePnCls : "none"
			}, b), this.findEl() && this.init() && this.increaseEvent(), void 0) : null
	};
	c.extend(h.prototype, {
		reset : function (a) {
			c.extend(this, a || {}),
			this.init()
		},
		findEl : function () {
			var a = this.container = c(this.container);
			return a.length ? (this.wrap = this.wrap && a.find(this.wrap) || a.children().first(), this.wrap.length ? (this.panel = this.panel && a.find(this.panel) || this.wrap.children().first(), this.panel.length ? (this.panels = this.panel.children(), this.panels.length ? (this.trigger = this.trigger && a.find(this.trigger), this.prev = this.prev && a.find(this.prev), this.next = this.next && a.find(this.next), this) : (this.container.hide(), null)) : null) : null) : null
		},
		init : function () {
			var a = this.wrap,
			b = this.panel,
			c = this.panels,
			f = this.trigger,
			g = this.len = c.length,
			h = this.margin,
			i = 0,
			j = this.visible,
			k = this.useTransform = d ? this.useTransform : !1;
			this.steps = this.steps || a.width(),
			c.each(function (a, b) {
				i += b.offsetWidth
			}),
			h && "number" == typeof h && (i += (g - 1) * h, this.steps += h),
			j > 1 && (this.loop = !1);
			var l = this.left;
			l -= this.curIndex * this.steps,
			this.setCoord(b, l),
			k && (e && a.css({
					"-webkit-transform" : "translateZ(0)"
				}), b.css({
					"-webkit-backface-visibility" : "hidden"
				}));
			var m = this._pages = Math.ceil(g / j);
			if (this._minpage = 0, this._maxpage = this._pages - 1, this.loadImg(), this.updateArrow(), 1 >= m)
				return this.getImg(c[0]), f && f.hide(), null;
			if (this.loop) {
				b.append(c[0].cloneNode(!0));
				var n = c[g - 1].cloneNode(!0);
				b.append(n),
				this.getImg(n),
				n.style.cssText += "position:relative;left:" + -this.steps * (g + 2) + "px;",
				i += c[0].offsetWidth,
				i += c[g - 1].offsetWidth
			}
			if (b.css("width", i), f && f.length) {
				var o = "",
				p = f.children();
				if (!p.length) {
					for (var q = 0; m > q; q++)
						o += "<span" + (q == this.curIndex ? " class=" + this.activeTriggerCls : "") + "></span>";
					f.html(o)
				}
				this.triggers = f.children(),
				this.triggerSel = this.triggers[this.curIndex]
			} else
				this.hasTrigger = !1;
			return this
		},
		increaseEvent : function () {
			var a = this,
			b = a.wrap[0],
			d = a.prev,
			e = a.next,
			f = a.triggers;
			b.addEventListener && (b.addEventListener("touchstart", a, !1), b.addEventListener("touchmove", a, !1), b.addEventListener("touchend", a, !1), b.addEventListener("webkitTransitionEnd", a, !1), b.addEventListener("msTransitionEnd", a, !1), b.addEventListener("oTransitionEnd", a, !1), b.addEventListener("transitionend", a, !1)),
			a.play && a.begin(),
			d && d.length && d.on("click", function (b) {
				a.backward.call(a, b)
			}),
			e && e.length && e.on("click", function (b) {
				a.forward.call(a, b)
			}),
			a.hasTrigger && f && f.each(function (b, d) {
				c(d).on("click", function () {
					a.slideTo(b)
				})
			})
		},
		handleEvent : function (a) {
			switch (a.type) {
			case "touchstart":
				this.start(a);
				break;
			case "touchmove":
				this.move(a);
				break;
			case "touchend":
			case "touchcancel":
				this.end(a);
				break;
			case "webkitTransitionEnd":
			case "msTransitionEnd":
			case "oTransitionEnd":
			case "transitionend":
				this.transitionEnd(a)
			}
		},
		loadImg : function (a) {
			a = a || 0,
			a < this._minpage ? a = this._maxpage : a > this._maxpage && (a = this._minpage);
			var b = this.visible,
			c = this.lazyIndex - 1,
			d = c + a;
			if (!(d > this._maxpage)) {
				d += 1;
				var e = (a && c + a || a) * b,
				f = d * b,
				g = this.panels;
				f = Math.min(g.length, f);
				for (var h = e; f > h; h++)
					this.getImg(g[h])
			}
		},
		getImg : function (a) {
			if (a && (a = c(a), !a.attr("l"))) {
				var b = this,
				d = b.lazy,
				e = "img" + d;
				d = d.replace(/^\.|#/g, ""),
				a.find(e).each(function (a, b) {
					var e = c(b);
					src = e.attr("dataimg"),
					src && e.attr("src", src).removeAttr("dataimg").removeClass(d)
				}),
				a.attr("l", "1")
			}
		},
		start : function (a) {
			var b = a.touches[0];
			this._movestart = void 0,
			this._disX = 0,
			this._coord = {
				x : b.pageX,
				y : b.pageY
			}
		},
		move : function (a) {
			if (!(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
				var b,
				c = a.touches[0],
				d = this._disX = c.pageX - this._coord.x,
				e = this.left;
				"undefined" == typeof this._movestart && (this._movestart = !!(this._movestart || Math.abs(d) < Math.abs(c.pageY - this._coord.y))),
				this._movestart || (a.preventDefault(), this.stop(), this.loop || (d /= !this.curIndex && d > 0 || this.curIndex == this._maxpage && 0 > d ? Math.abs(d) / this.steps + 1 : 1), b = e - this.curIndex * this.steps + d, this.setCoord(this.panel, b), this._disX = d)
			}
		},
		end : function (a) {
			if (!this._movestart) {
				var b = this._disX;
				-10 > b ? (a.preventDefault(), this.forward()) : b > 10 && (a.preventDefault(), this.backward()),
				b = null
			}
		},
		backward : function (a) {
			a && a.preventDefault && a.preventDefault();
			var b = this.curIndex,
			c = this._minpage;
			b -= 1,
			c > b && (b = this.loop ? c - 1 : c),
			this.slideTo(b),
			this.callback && this.callback(Math.max(b, c), -1)
		},
		forward : function (a) {
			a && a.preventDefault && a.preventDefault();
			var b = this.curIndex,
			c = this._maxpage;
			b += 1,
			b > c && (b = this.loop ? c + 1 : c),
			this.slideTo(b),
			this.callback && this.callback(Math.min(b, c), 1)
		},
		setCoord : function (a, b) {
			this.useTransform && a.css("-webkit-transform", f + b + "px,0" + g) || a.css("left", b)
		},
		slideTo : function (a, b) {
			a = a || 0,
			this.curIndex = a;
			var c = this.panel,
			d = c[0].style,
			e = this.left - a * this.steps;
			d.webkitTransitionDuration = d.MozTransitionDuration = d.msTransitionDuration = d.OTransitionDuration = d.transitionDuration = (b || this.duration) + "ms",
			this.setCoord(c, e),
			this.loadImg(a)
		},
		transitionEnd : function () {
			var a = this.panel,
			b = a[0].style,
			c = this.loop,
			d = this.curIndex;
			c && (d > this._maxpage ? this.curIndex = 0 : d < this._minpage && (this.curIndex = this._maxpage), this.setCoord(a, this.left - this.curIndex * this.steps)),
			c || d != this._maxpage ? this.begin() : (this.stop(), this.play = !1),
			this.update(),
			this.updateArrow(),
			b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = 0
		},
		update : function () {
			var a = this.triggers,
			b = this.activeTriggerCls,
			c = this.curIndex;
			a && a[c] && (this.triggerSel && (this.triggerSel.className = ""), a[c].className = b, this.triggerSel = a[c])
		},
		updateArrow : function () {
			var a = this.prev,
			b = this.next;
			if (a && a.length && b && b.length && !this.loop) {
				var c = this.curIndex,
				d = this.activePnCls;
				0 >= c && a.addClass(d) || a.removeClass(d),
				c >= this._maxpage && b.addClass(d) || b.removeClass(d)
			}
		},
		begin : function () {
			var a = this;
			a.play && !a._playTimer && (a.stop(), a._playTimer = setInterval(function () {
						a.forward()
					}, a.interval))
		},
		stop : function () {
			var a = this;
			a.play && a._playTimer && (clearInterval(a._playTimer), a._playTimer = null)
		},
		destroy : function () {
			var a = this,
			b = a.wrap[0],
			d = a.prev,
			e = a.next,
			f = a.triggers;
			b.removeEventListener && (b.removeEventListener("touchstart", a, !1), b.removeEventListener("touchmove", a, !1), b.removeEventListener("touchend", a, !1), b.removeEventListener("webkitTransitionEnd", a, !1), b.removeEventListener("msTransitionEnd", a, !1), b.removeEventListener("oTransitionEnd", a, !1), b.removeEventListener("transitionend", a, !1)),
			d && d.length && d.off("click"),
			e && e.length && e.off("click"),
			a.hasTrigger && f && f.each(function (a, b) {
				c(b).off("click")
			})
		},
		attachTo : function (a, b) {
			return a = c(a),
			a.each(function (a, c) {
				c.getAttribute("l") || (c.setAttribute("l", !0), h.cache.push(new h(c, b)))
			})
		}
	}),
	h.cache = [],
	h.destroy = function () {
		var a = h.cache,
		b = a.length;
		if (!(1 > b)) {
			for (var c = 0; b > c; c++)
				a[c].destroy();
			h.cache = []
		}
	},
	b.Slider = h
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var c,
	d,
	e,
	f,
	g,
	h,
	i,
	j,
	k,
	l,
	m,
	n,
	o,
	p = a.Zepto || a.$,
	q = !1,
	r = !1,
	s = {
		initialize : function (a) {
			function b() {
				d.css({
					top : window.innerHeight + window.scrollY - 60 + "px",
					"-webkit-transition" : "none"
				}),
				o.css({
					top : window.scrollY + 50 + "px"
				})
			}
			if (p("body").attr("notshow"))
				return s.taojiaHide = function () {},
			s.taojiaShow = function () {},
			s.circleHide = function () {},
			s.circleShow = function () {},
			!1;
			var m = this;
			m._checkSysType = function () {
				var a = "m",
				b = location.host;
				return b.match("m.(taobao|tmall|etao|alibaba|alipay|aliyun)") || ("localhost" == b || b.match("(?:.*\\.)?waptest\\.(taobao|tmall|etao|alibaba|alipay|aliyun)\\.com.*") ? a = "m" : b.match("(?:.*\\.)?wapa\\.(taobao|tmall|etao|alibaba|alipay|aliyun)\\.com.*") ? a = "wapa" : b.match("(?:.*\\.)?mtest\\.(taobao|tmall|etao|alibaba|alipay|aliyun)\\.com.*") && (a = "mtest")),
				a
			}
			(),
			m._browser = function () {
				for (var a = navigator.userAgent, b = ["iPhone OS ", "Android "], c = {
						iphone : !1,
						adnroid : !1
					}, d = "", e = [], f = 0; f < b.length; f++) {
					var g = a.indexOf(b[f]);
					if (g > -1) {
						switch (f) {
						case 0:
							c.iphone = !0;
							break;
						case 1:
							c.adnroid = !0
						}
						var h = b[f].length;
						d = a.substr(g + h, 6),
						e = d.split(/_|\./)
					}
				}
				return {
					iphone : c.iphone,
					android : c.adnroid,
					version : parseFloat(e.join("."))
				}
			}
			();
			var n = function () {
				var a,
				b = location.search,
				c = "ttid=",
				d = /ttid=(\w*)(?: |&|$)/;
				d.test(b) && (a = RegExp.$1);
				var e = a && "&" + c + a || "";
				return e
			}
			();
			m._opt = a || {},
			c = p("body");
			var q = {
				_generate : function () {
					var a = {};
					a.s = "http://" + m._checkSysType + ".taobao.com/channel/act/sale/searchlist.html?pds=search%23h%23taojia" + n,
					a.cart = "http://h5." + m._checkSysType + ".taobao.com/awp/base/cart.htm?pds=cart%23h%23taojia" + n + "#!/awp/base/cart.htm",
					a.my = "http://h5." + m._checkSysType + ".taobao.com/awp/mtb/mtb.htm?" + n + "#!/awp/mtb/mtb.htm",
					a.im = "http://h5." + m._checkSysType + ".taobao.com/ww/index.htm?" + n + "#!lateConts",
					a.logis = "http://h5." + m._checkSysType + ".taobao.com/awp/mtb/olist.htm?" + n + "#!/awp/mtb/olist.htm?sta=5",
					a.more = "http://" + m._checkSysType + ".taobao.com/channel/chn/mobile/application.html?pds=apply%23h%23taojia" + n,
					d = p(['<div id="J_Shade" class="none"></div>', '<div id="J_Taojia" class="taoplus">', '<div class="circle hide">', '<div class="tpicons">', "<ul>", '<li class="more"><a dataurl="' + a.more + '"></a><span class="bg"></span></li>', '<li class="logis"><a dataurl="' + a.logis + '"></a><span class="bg"></span></li>', '<li class="ww"><a dataurl="' + a.im + '"></a><span class="bg"></span></li>', '<li class="individ"><a dataurl="' + a.my + '"></a><span class="bg"></span></li>', '<li class="car"><a dataurl="' + a.cart + '"></a><span class="bg"></span></li>', '<li class="search"><a dataurl="' + a.s + '"></a><span class="bg"></span></li>', "</ul>", "</div>", '<div class="tplogo">', '<a href="http://m.taobao.com?pds=home%23h%23taojia' + n + '"></a><span class="bg"></span>', "</div>", "</div>", '<div class="tpbtn on">', "<div>", "<ul>", '<li class="icontao p"></li>', "</ul>", "</div>", '<p class="num none">', "</p>", "</div>", "</div>"].join("")),
					c.append(d)
				}
			};
			q._generate(),
			e = p("#J_Taojia"),
			f = d.find(".tpbtn"),
			g = d.find(".tpicons a"),
			h = d.find(".tplogo a"),
			i = d.find(".circle"),
			j = f.find(".icontao"),
			k = f.find("ul"),
			l = f.find(".num"),
			o = p("#J_Shade"),
			m.events(),
			(m._browser.iphone && m._browser.version < 5 || m._browser.android && m._browser.version <= 2.1) && (o.css({
					position : "absolute"
				}), document.addEventListener("touchend", b, !1)),
			m._browser.android && m._browser.version >= 4.1 && e.css({
				"-webkit-transform" : "translate3d(0, 0, 0)"
			})
		},
		events : function () {
			function a() {
				d("click#h#taojia"),
				1 == e.st() ? e.circleShow() : e.circleHide()
			}
			function c() {
				e.circleHide()
			}
			function d(a) {
				var b = a,
				c = (location.host, e._checkSysType);
				p.ajax({
					url : "http://" + c + ".taobao.com/monitor.htm?callback=?",
					type : "get",
					data : {
						type : "jsonp",
						pds : b,
						t : (new Date).getTime()
					}
				})
			}
			var e = this;
			f.on("click", a),
			p(document).on("touchmove", function (a) {
				q && a.preventDefault()
			}),
			o.on("click", c),
			g.click(function () {
				function a() {
					f = setTimeout(function () {
							e.circleHide(),
							setTimeout(function () {
								window.location.href = d
							}, 300),
							clearTimeout(f)
						}, 500)
				}
				var c = p(this),
				d = c.attr("dataurl"),
				f = null;
				c.parent().hasClass("ww") && b.wangxin ? b.wangxin.waptowx({
					fromNick : "",
					toNick : "",
					itemId : "",
					wapwwUrl : d,
					pageId : "h5_taobao_jia"
				}) : a()
			})
		},
		circleShow : function () {
			if (!r) {
				var a = this;
				a._opt.onShow && a._opt.onShow(),
				f.removeClass("on").addClass("off"),
				i.removeClass("hide").addClass("show"),
				o.removeClass("none"),
				(a._browser.iphone && a._browser.version < 5 || a._browser.android && a._browser.version <= 2.1) && o.css({
					top : window.scrollY - 10 + "px"
				}),
				q = !0
			}
		},
		circleHide : function () {
			if (!r && !i.hasClass("hide")) {
				r = !0;
				var a = this;
				a._opt.onHide && a._opt.onHide();
				var a = this;
				f.removeClass("off").addClass("on"),
				i.removeClass("show").addClass("hide"),
				o.animate({
					opacity : "0"
				}, 350, "linear", function () {
					o.addClass("none"),
					o.attr("style", ""),
					r = !1,
					q = !1
				})
			}
		},
		taojiaHide : function () {
			var a = this;
			a.circleHide(),
			e.hide()
		},
		taojiaShow : function () {
			e.show()
		},
		st : function () {
			return f.hasClass("on") ? 1 : f.hasClass("off") ? 2 : void 0
		},
		getmsg : function () {
			var a = null,
			b = 1,
			c = !1;
			fn = function () {
				var e = k.find("li"),
				f = e.length,
				g = k.height(),
				h = (k.find(".iconact"), k.find(".iconact").length),
				i = (d.find(".iconww"), d.find(".iconlogis"), k[0].offsetLeft / g);
				return k.width(f * g),
				1 == f ? !1 : (i >= 0 ? m && (l.html(m), c = !0) || l.html(n) : c && l.html(n), k.animate({
						left :  - (h + 1) * g
					}, 500, "linear", function () {
						b++,
						e.eq(b - 1).addClass("iconact")
					}), h + 2 >= f ? (clearTimeout(a), c = !1) : a = setTimeout(fn, 2e3), void 0)
			},
			fn()
		}
	};
	b.taoplus = s
}
(window, window.lib || (window.lib = {}));
!function (a) {
	function b() {
		return f.href.toString()
	}
	function c() {
		return ""
	}
	function d() {
		return e.cookie.match(i)
	}
	var e = a.document,
	f = a.location,
	g = a.Zepto || a.$,
	h = "http://log.m.taobao.com/js.do",
	i = /(?:^|\s)cna=([^;]+)(?:;|$)/;
	g.orginAjax = g.ajax,
	g.ajax = function (a) {
		function e() {
			p && p.apply(this, arguments),
			(n === !0 || 1 === n) && (f = b(), i = d(), j = c(), k = a.apdata || a.ap_data, l = a.apuri || a.ap_uri, f && (o.ap_ref = f), i && (o.ap_cna = i[1]), k && (o.ap_data = k), l && (o.ap_uri = l), j && (o.ap_ip = j), m = {
					url : h,
					data : o,
					type : "GET",
					dataType : "jsonp"
				}, 2 === n || g.orginAjax(m))
		}
		var f,
		i,
		j,
		k,
		l,
		m,
		n = null != a.aplus ? a.aplus : g.ajaxSettings.aplus || !1,
		o = {
			_aplus : "1"
		},
		p = a.complete;
		a.url ? (a.complete = e, g.orginAjax(a)) : e()
	}
}
(window);
!function (a, b) {
	function c(a) {
		this._options = e.extend({
				mode : "msg",
				text : "网页提示",
				useTap : !1
			}, a || {}),
		this._init()
	}
	var d,
	e = a.Zepto || a.$,
	f = e(a),
	g = ['<div class="c-float-popWrap msgMode hide">', '<div class="c-float-modePop">', '<div class="warnMsg"></div>', '<div class="content"></div>', '<div class="doBtn">', '<button class="ok">确定</button>', '<button class="cancel">取消</button>', "</div>", "</div>", "</div>"].join(""),
	h = e(g),
	i = h.find(".warnMsg"),
	j = h.find(".content"),
	k = h.find(".doBtn .ok"),
	l = h.find(".doBtn .cancel"),
	m = !1,
	n = "body";
	e.extend(c.prototype, {
		_init : function () {
			var a = this,
			b = a._options,
			c = b.mode,
			d = b.text,
			g = b.content,
			o = b.callback,
			p = b.background,
			q = b.useTap ? "tap" : "click",
			r = b.usedInWangWang,
			s = h.attr("class");
			s = s.replace(/(msg|alert|confirm)Mode/i, c + "Mode"),
			h.attr("class", s),
			p && h.css("background", p),
			d && i.html(d),
			g && j.html(g),
			k.off(q).on(q, function (b) {
				o.call(a, b, !0)
			}),
			l.off(q).on(q, function (b) {
				o.call(a, b, !1)
			}),
			m || (m = !0, e(n).append(h), r || f.on("resize", function () {
					setTimeout(function () {
						a._pos()
					}, 500)
				}))
		},
		_pos : function () {
			var a,
			b,
			c,
			d,
			e,
			f,
			g = this,
			i = document,
			j = i.documentElement,
			k = i.body;
			g.isHide() || (a = k.scrollTop, b = k.scrollLeft, c = j.clientWidth, d = j.clientHeight, e = h.width(), f = h.height(), h.css({
					top : a + (d - f) / 2,
					left : b + (c - e) / 2
				}))
		},
		isShow : function () {
			return h.hasClass("show")
		},
		isHide : function () {
			return h.hasClass("hide")
		},
		_cbShow : function () {
			var a = this,
			b = a._options,
			c = b.onShow;
			h.css("opacity", "1").addClass("show"),
			c && c.call(a)
		},
		show : function () {
			var a = this;
			d && (clearTimeout(d), d = void 0),
			a.isShow() ? a._cbShow() : (h.css("opacity", "0").removeClass("hide"), a._pos(), setTimeout(function () {
					a._cbShow()
				}, 300), setTimeout(function () {
					h.animate({
						opacity : "1"
					}, 300, "linear")
				}, 1))
		},
		_cbHide : function () {
			var a = this,
			b = a._options,
			c = b.onHide;
			h.css("opacity", "0").addClass("hide"),
			c && c.call(a)
		},
		hide : function () {
			var a = this;
			a.isHide() ? a._cbHide() : (h.css("opacity", "1").removeClass("show"), setTimeout(function () {
					a._cbHide()
				}, 300), setTimeout(function () {
					h.animate({
						opacity : "0"
					}, 300, "linear")
				}, 1))
		},
		flash : function (a) {
			var b = this;
			opt = b._options,
			opt.onShow = function () {
				d = setTimeout(function () {
						d && b.hide()
					}, a)
			},
			b.show()
		}
	}),
	b.notification = new function () {
		this.simple = function (a, b, d) {
			2 == arguments.length && "number" == typeof arguments[1] && (d = arguments[1], b = void 0);
			var e = new c({
					mode : "msg",
					text : a,
					background : b
				});
			return e.flash(d || 2e3),
			e
		},
		this.msg = function (a, b) {
			return new c(e.extend({
					mode : "msg",
					text : a
				}, b || {}))
		},
		this.alert = function (a, b, d) {
			return new c(e.extend({
					mode : "alert",
					text : a,
					callback : b
				}, d || {}))
		},
		this.confirm = function (a, b, d, f) {
			return new c(e.extend({
					mode : "confirm",
					text : a,
					content : b,
					callback : d
				}, f || {}))
		},
		this.pop = function (a) {
			return new c(a)
		}
	}
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	b.login || (b.login = {}),
	b.login.detect = {
		isClient : function () {
			return location.search && location.search.match(/ttid=[^&]+@[^&]+/)
		},
		isAndroidClient : function () {
			if (!location.search)
				return !1;
			var a = location.search.match(/ttid=[^&]+@[^&]+/);
			if (a && a.length) {
				var b = a[0];
				return b && b.toLowerCase().indexOf("android") > -1
			}
			return !1
		},
		isIos : function () {
			var a = navigator.userAgent;
			return a && a.toLowerCase().indexOf("iphone") > -1
		},
		getBrowserInfo : function (a) {
			var b = {
				os : "iphone",
				version : 6,
				browser : "safari",
				keyboardHeight : 250,
				ios6 : function () {
					return "iphone" === this.os && this.version >= 6
				},
				lowLevel : function () {
					return !1
				}
			},
			c = a.toUpperCase(),
			d = c.indexOf("IPHONE") >= 0 || c.indexOf("IPOD") >= 0 || c.indexOf("IPAD") >= 0;
			c.indexOf("IPAD") >= 0 && (b.keyboardHeight = 450),
			d || (b.os = "android");
			var e = a.match(/UC\sAppleWebKit\/([\d.]+)/),
			f = a.match(/(UCWEB)(\d.+?(?=\/))/);
			if (e || f ? b.browser = "uc" : a.match(/MQQBrowser/) ? b.browser = "qq" : a.match(/(Chrome)|(CriOS)/) && (b.browser = "chrome"), "iphone" === b.os)
				b.version = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || 6;
			else if ("android" === b.os) {
				var g = a.indexOf("Android "),
				h = a.substr(g + 8, 6),
				i = h.split(/_|\./);
				b.version = parseFloat(i.join("."))
			}
			return d || (b.keyboardHeight = .8 * window.innerWidth),
			b
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		var b = document.getElementById("loc-simulate-dom");
		null == b ? (b = document.createElement("a"), b.id = "loc-simulate-dom", b.href = a, b.value = "", document.body.appendChild(b)) : b.href = a,
		d(b, "click"),
		b.click()
	}
	function d(a, b) {
		try {
			var c = document.createEvent("Event");
			c.initEvent(b, !0, !0),
			a.dispatchEvent(c)
		} catch (d) {
			console.log("error")
		}
	}
	function e(a) {
		return a ? ("" + a).indexOf("2.3") > -1 ? !0 : ("" + a).indexOf("2.2") > -1 ? !0 : !1 : !0
	}
	b.login || (b.login = {});
	var f = b.login.detect;
	b.login.h5jump = {
		simulateJump : function (a) {
			c(a)
		},
		setLocationHref : function (a) {
			if (f.isAndroidClient()) {
				var b = f.getBrowserInfo(navigator.userAgent);
				if ("android" === b.os && e(b.version))
					return c(a), void 0
			}
			location.href = a
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	b.login || (b.login = {});
	var c = !1,
	d = !1,
	e = "",
	f = "close",
	g = "",
	h = "#J_M_login{position:fixed;width:100%;height:100%;top:0;z-index:99999;background-color:#eee;display:none}#J_header{z-index:99999;background:-webkit-gradient(linear,0 0,0 100%,from(#f8f8f8),to(#e6e6e6));top:0;height:50px;width:100%;position:absolute;-webkit-box-shadow:0 1px 1px 0 #c4c4c4;display:-webkit-box}#J_header section:nth-child(2){text-align:center;-webkit-box-flex:1}#J_header section:nth-child(2) .title{padding-top:15px;text-overflow:ellipsis;height:32px;font-size:18px;font-weight:bold}#J_header .back{margin-top:10px;width:72px;height:30px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAA8CAYAAACJmDMtAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDkvMjgvMTLDJIlRAAAGXUlEQVR4nO2db0xTZxTGn/u+belaUEwWK8XEjVBm3YwLOgyWLTNuWbbMqczEqcsgIybonERwmxJZNIvAiG7DYJYskT8mtBvihGRLXLJl2acRxQ+CE9QtEmMIhWIyQYTS3ncfbm+tjD9taZXS80tumjTQ9yb3yTnPOffe80pCCESLNWvWSAAkACzgIGIH4Tu8AOT29vb/iUVavXp1NBZWhcMBaAMOje97IjaQAXgAjANw+z5lKKICoFzQSKMKRwcgITc317Rz5873U1JS3tXpdMujsB4RRYaGhn7r6+v7Zfv27Q0ARgCMQRGVACIfgRgUUeq3bt2akpeX95HJZMpnjCVFchHi8eN2u7urqqpyW1pa7gAYhU9E3Gw2R2oNBiXqGCorK7O3bdvWsHDhwrckSUqI1ALEk4Nz/nROTs4HLperqbu7+z4UXyQiFYFU8RgdDseHaWlpnzPGEiPxw8Tcwu12X7fZbK8AuAdgLBJVkV88dru9ID09vYrEM3/R6XTPORyOPCjXnM3WRDMo1ZWhsbGxwGKxfBnNtgAxNzCZTO8BqAMwOpsIJEExzIaTJ0++kZGRQeKJE5KSkjKhVNpSuBFILdX1FRUVa7Oysr6TZTliJ0jEBAyAFG4EYgAStmzZYrbZbNWSJJHniVPCEZDf9xQWFlbo9fqMCJ8TEUOEmsL8qau2tjY3OTl5M6Wu+CbUCMQAJGzcuNG8YsWK42SaiVAE5O/3lJSU1JPvIYDgU5hasj919uzZfXq9/iVKXfGLJD18oCLYCMQB6MvLy9cuXbp0H6UuQiWYCORPXevWrfsGQCIJKL4JvP4zRSAJvpK9paWlNCEhIYPEQwQynYBU36Ovrq5+fcmSJXtJPMREpkthDIBu06ZN5szMzBOyLIMERExkqgjk7zbv2bOnnHOeQuIhJmMyAfm7zadPn85dsGDBZhIPMRWTpTB/t9lqtR6n1EVMZLoqzF+yFxcX1wshqGQnpiUwAvm7zU1NTft0Oh11m4lJmSoCcQD6Y8eOrTWbzdRtJoKCBXxSt5kIGfVVYy0Aw/nz50u1Wm0GpS4iWNSBB7qampoNixcv3kviIUKBwWeeV61a9TWJhwgVtQoTQ0NDg0lJSdRxJmZkYhUmAxg/ePDgp0KIkcCHhQhiJtThCsLpdLoSExOHV65c+ZoQgrrPxJQwxlBbW3sCvjdTBZRRHcM1NTWOy5cv1zJGg8SI4FCVIgCMCyH69+/f/5XL5bpIIiKCIXA+kAAghBDD3d3df69fv/5lrVabTKmMmAjn/JEUFogMYOzKlSuX7HZ7JZlqYiYmCkidyHn/zJkzP7W1tX3HOQeJiJiKyZ4HEgA8QojBQ4cOfdvQ0JC+bNmyt6nJSKgE81aGDMVU38nPzz8yOjraQ6aamIyZhmwKIcS9wcHBOzk5OW8KIbRkqgnOOerq6iY10YGofmj0woULvzY3N3+h0WjIDxGPMFNeEgC8Qoh/T5069X1XV9cPnPPHcV5EjBDMq82qH3Lu3r27orm5+dlFixZleb3eaJ8bMUcJ5dVmFRmAW5blf44ePVrm9XoHyFQTQGjzgdQmY3t9ff0R8kMEENqIO/9N18bGxlar1brcZrN97PF46M59nBFOCvP/L3xNxsOHD9f09fX9TqY6vglnTrS/ybhjx47PWltb6wwGw/NkquOTcJ2waqq7SktLP3G73dSpjlPCver+JmNnZ2fbgQMHihhjIySi+MBXPMmIwH5hAoBnYGDA6fF4+jIzM18FQLc75jGMMQwPD//lcDjqAIzNdrcef2Vmt9t/BICCgoIqAAa6ez8/4Zzj5s2bP0PZQ9UbqR0LBYCxq1ev9vT29l7Pysp6UavVJkfih4m5A+ccbre7Jz8/v0QIcReAJ5ICkgGM3bp163ZHR0dndnZ2utFoTKU3POYHnHNwzkeKi4sLnE5nB5TNd+VI7pkKKEJy9/f39547d+6SxWJ5kJqamqbRaIwASEgxhiRJYIxBo9FgfHy8p6ioqPDatWt/AHgApYiKyr7xEnwzFhljZqvV+sKuXbvesVgsG4xG4zMkothBkiS4XK6LN27c+LOsrKzZ6/V2Qtn6O2rbfgfC4Js5JEmSyXcYoQiMiA1kIcRdIcSgEKIPwDh85bv6B7OtwqZd3LfQfSFEjxDiNsLvOxFPBoGHPb9HhKPyH1fdgjvw0l6mAAAAAElFTkSuQmCC) no-repeat 0 0;background-size:contain;border:0;font-size:12px;overflow:hidden;display:inline-block}.fn_btns{display:inline-block;line-height:28px;padding:0 20px 0 0;vertical-align:top;height:100%}#J_header .rebtn{width:30px;margin-top:10px;min-width:28px;height:30px;font-size:14px;line-height:120%;color:#212121;text-shadow:0 1px 0 white;background-image:-webkit-linear-gradient(-90deg,#fcfcfc 0,#ededed 100%);background-image:linear-gradient(-90deg,#fcfcfc 0,#ededed 100%);background-image:-ms-linear-gradient(-90deg,#fcfcfc 0,#ededed 100%);background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0,#fcfcfc),color-stop(1,#ededed));-webkit-border-radius:4px;border-radius:4px;border:0;-webkit-box-shadow:0 0 1px rgba(0,0,0,0.8),0px 0 0 rgba(255,255,255,0.65),inset 0 0 0 rgba(255,255,255,0.65);box-shadow:0 0 1px rgba(0,0,0,0.8),0px 0 0 rgba(255,255,255,0.65),inset 0 0 0 rgba(255,255,255,0.65)}#J_header .rebtn div{height:30px;background-repeat:no-repeat;background-size:16px 17px;background-position:center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAYAAAA+stv/AAAFRElEQVRYCa1Xu0trTRDfG4KIiHp8IT5Qj08QFM0HKiqIJoUPBMFoo20uVqJN/BNio1gasFKrlGoVsbKxUNBCfCWIj0pJwDci+s1v75lzz8lbrwOT3bM7u/PbmdnZya/Pz0+RClVXVyt5eXm2wsJCl9VqVYjtxnXv7+9bxOGHh4et6+tr3/n5edg4H6//KxmAmpoatb6+3p2Wlua0WCwKsQDHoo+PDzkMIG9vb77j4+O5s7OzYCxZHosLACeurKx05ebmeiDMirnlMbSsGC0zjz8+Ps6dnJzMxbNITABNTU02ArBEymxkagFmxWiZME6n5U/ZMgC0mNPaPQLw++DgYI+FaX+V+uEoAFBeW1vrp83hZ105FuI7FWJQDALfxOHT01MHQHR3d7sonjzkpi0TAFZO/taVRypWFEW0tLSI0tJSQe6ReEKhkKDAE/v7+yIc/ht7DEQDIEE8Pz/7MjMzXWwZHQB8TgD86enputmNJy4rKxMjIyOCAjKhESjwxObmpqDT6nIMAErB7EbsrwPo6+vz5OTkINqlqY3KBwYGxNDQEG+IqPYRo+UIV6iPawmGb8XOzo5YXl4W2A/E1gAAJoxJAHV1dSqZNRBL+cTEhOjs7MQaBNAs8RY+EhBAuIntALGysmIShVIcjq0iQ5qCLu7JNeVQ/B9xMuVQBhkH8ezR0RG+TWS0LFxhhe+bm5uRZEyCJSUlbPbfNOE1TSb50OLJmZWVJf1tVMpLMfb6+ios5eXlTgo8meGMgqOjo5CdI/6ScixCAkMwo5+MLBkZGXZikxyuGkU7+9w0l8qH3+/3Tk5Oip6eHlFQUBB3CYEUVlVVnff393q0QrqhoQEN/P5dciF2tPgRt7e34vLyUgQCAXk9r66uZBBSQhJWJBG+KtCG6MzOzkY3lYCDXCyC63BF4QYnWUGFJWy2KK+EKfbMwYfdOMOh/w+EXAErVmmMoAIw/T2gvjdmcoe5fpg4aQGUiaQFjNGPTLW2tgakP06UUT1jY2OfTqczhMwLBZaqKljITBQTUc4yS3z9y+FwuOkRcsPldGCFcoS7tbXVbqESS8/T2BYCFRUVSKc/SqTQhWBnhtXz8/PtlqKioihFd3d3oqur68dAdHR0INeoUGpkOqxioVfOa3yhgAZWIMtIH0Wh+8YA7eWGYs38EgT66+vrYdzBvfb2dn1bFiTENgSNPvHNDnxP5pfWxN5Mms4gAPiGh4cFlUc8J5ECIQKlt7fXpU98sYO15Oc/0U77MSHZQSeRD6NhylJebUDKsBXQkvmW+MrIyRR/cHKsxR7MvJSA4Y3AI6cXpSqVz4H5+Xlxc3PDctIqXDiQhfao7pvd3d1NmKJxtYqLi9300NhZMSIf++Abz/zMzIygK4n7H9RLMvrwXFxcuBcWFuQ7DRRYhABlEFo/SO+47+npKfjy8iJLMtpMRcyQIihVI4MNikF4/aanp3HNkejkY2cEgLrOTyBsi4uLgqpXrJGE+IByBoNB9COJFXPLiiGHJ39qagrK8RagYpLlsxEA5JABAUJZXV0VeDaZ2BoMhMe5hVIQWgbAZkdFPT4+DuVQCuX6gxQJAHtIEBQTyvb2tiyxMciETROR8dSQQ8D19/fD51HKMR8LAMYBYgktiomNjQ1xeHhocguEQHzKP19/f9va2sTg4CBXRDgxakv95CwZDwDmERPIAfIek0UE/cmUQFDEGP94QJgqa1lHUIkvGhsbcWIMgxBwYOlzDJgIf8+TsErzS8Qh4q8Q1mBtwv0TWcAElD4i//1EPlbID7iWMDMKj9gnpgkj/Q/RNMlKirb91wAAAABJRU5ErkJggg==)}#J_header section:nth-child(1) a{color:#666;display:inline-block;text-align:center;padding-left:10px;width:62px;height:30px;line-height:30px;text-decoration:none}#J_load span{display:inline-block;width:30px;height:12px;line-height:12px;background:url(http://a.tbcdn.cn/mw/base/styles/component/more/images/loading.gif) 0 0 no-repeat;-webkit-background-size:30px 12px}",
	i = '<div id="J_M_login"  ><div id="J_header"><section><a href="javascript:window.lib.login.widget.hideLogin()"><div class="back">            返回</div></a></section><section><div class="title">会员登录</div></section><section><div class="fn_btns"><a href="javascript:window.lib.login.widget.reloadIframe()"><div class="rebtn"><div class=" "></div></div></a></div></section></div><div id="J_load" style="position: absolute; text-align: center; top: 80px; left: 50%; height: 40px; width: 160px; margin-left: -80px; "><span></span></div><div id="J_login_frame" style="height: 400px; display: none"><iframe id="J_M_frame" frameborder="0" scrolling="no" width="100%" height="100%"></iframe></div></div>';
	b.login.widget = {
		init : function (a) {
			if (a = a || {}, f = a.hideType || "close", g = a.targetUrl, !d) {
				d = !0;
				try {
					var b = location.host,
					c = b.split("."),
					j = c.pop(),
					k = c.pop(),
					l = c.pop();
					document.domain = k + "." + j,
					e = "http://login." + l + "." + document.domain + "/login.htm?v=0&ttid=h5@iframe"
				} catch (m) {}

				$("#J_M_login").length < 1 && $("body").append("<style>" + h + "</style>" + i),
				$("#J_M_frame")[0].onload = function () {
					$("#J_M_frame").attr("src") && ($("#J_load").css("display", "none"), $("#J_login_frame").css("display", "block"))
				}
			}
		},
		reloadIframe : function () {
			$("#J_M_frame").attr("src", e),
			$("#J_login_frame").css("display", "none"),
			setTimeout(function () {
				"none" == $("#J_login_frame").css("display") && $("#J_load").css("display", "block")
			}, 300)
		},
		hideLogin : function (a) {
			$("body div").eq(0).css("visibility", "visible"),
			$("#J_M_login").animate({
				translateY : "100%"
			}, 300, "ease-in", function () {
				$("#J_M_login").css("display", "none"),
				$("#J_load").css("display", "none"),
				$("#J_M_login").css("-webkit-transform", ""),
				a ? "reload" === f ? window.location.reload() : "changeHash" === f && g ? window.location.hash = g : "redirect" === f && g ? window.location.href = g : f && f.succ && f.succ.call() : f && f.fail && f.fail.call()
			})
		},
		showLogin : function (a) {
			b.login.widget.init(a),
			$("#J_M_frame").attr("src", e),
			$("#J_M_login").css("-webkit-transform", "translateY(100%)"),
			$("#J_M_login").css("display", "block"),
			setTimeout(function () {
				"none" == $("#J_login_frame").css("display") && $("#J_load").css("display", "block")
			}, 1e3),
			setTimeout(function () {
				$("#J_M_login").animate({
					translateY : "0"
				}, 400, "ease-out", function () {
					"block" == $("#J_M_login").css("display") && $("body div").eq(0).css("visibility", "hidden"),
					c ? $("#J_M_login").css({
						height : "100%"
					}) : $("#J_M_login").css({
						height : "101%"
					}),
					c = !c,
					$("#J_M_login").css("-webkit-transform", "")
				})
			}, 100)
		}
	},
	window.H5_M || (window.H5_M = {}),
	window.H5_M.Login = {
		hideLogin : b.login.widget.hideLogin
	}
}
(window, window.lib || (window.lib = {})), function (a, b) {
	function c(a) {
		g && g && g.showLogin(a)
	}
	function d(a) {
		var b = h({
				subdomain : "login",
				path : "login.htm",
				data : {
					tpl_redirect_url : a || location.href
				}
			});
		f.setLocationHref(b)
	}
	function e() {
		return location.search && location.search.match(/ttid=[^&]+@[^&]+/)
	}
	b.login || (b.login = {});
	var f = b.login.h5jump,
	g = b.login.widget,
	h = b.uri.getUrl,
	i = b.storage.cookie;
	b.login.getNickFromCookie = function () {
		var a = i.getCookie("_w_tb_nick");
		return a && a.length > 0 && "null" != a ? a : ""
	},
	b.login.isLogin = function () {
		var a = i.getCookie("imewweoriw");
		return a && a.length > 32
	},
	b.login.goLogin = function (a) {
		a = a || {},
		!e() && a.hideType ? c(a) : d(a.rediUrl)
	}
}
(window, window.lib, window.$);
!function (a, b) {
	var c = b.login,
	d = b.uri.getUrl,
	e = function (a, b) {alert(1);
		b = b || "http://www.taobao.com/index.php?from=wap";
		var c = "";
		return c += '<footer class="footer c-footer "><section class="footer-t c-footer-t"><p class="user-info c-user-info">',
		c += a.isLogin ? '<span><a class="user-login" href="' + a.myTaobaoUrl + '">' + a.nick + '</a></span><span><a id="J_footer_logout" href="' + a.loginOut + '">退出</a></span>' : '<span><a href="' + a.loginUrl + '">登录</a></span><span><a href="' + a.registerUrl + '">注册</a></span>',
		c += '</p><p class="gotop c-gotop"><a id="J_GoTop" href="javascript:(app&&app.scroll)? app.scroll.scrollTo(0):scroll(0,0)">top<b> </b></a></p></section>',
		c += '<nav class="footer-l c-footer-l">',
		c += '<a href="' + b + '" target="_blank">电脑版</a>',
		c += '<a id="J_imgViewType" href="javascript:void(0)" class="J_dps" data-dps="hdedition%23h%23" style="display:none;"></a></nav>',
		c += '<p class="copyright c-copyright">&#169; 2014 浙B2-20080224<a class="cr-sv c-cr-sv" href="http://service.taobao.com/support/helpWap.htm" id="J_service">服务中心</a></p></footer>'
	},
	f = function () {
		var a = {},
		b = location.href;
		return b = b.replace(/sid=[0-9a-z]+&?/g, ""),
		c.isLogin() ? (a.isLogin = !0, a.nick = c.getNickFromCookie(), a.myTaobaoUrl = d({
					subdomain : "h5",
					path : "awp/mtb/mtb.htm"
				}) + "#!/awp/mtb/mtb.htm", a.loginOut = d({
					subdomain : "login",
					path : "logout.htm",
					data : {
						tpl_redirect_url : b
					}
				})) : (a.isLogin = !1, a.loginUrl = d({
					subdomain : "login",
					path : "login.htm",
					data : {
						tpl_redirect_url : b
					}
				}), a.registerUrl = d({
					subdomain : "u",
					path : "reg/newUser.htm",
					data : {
						tpl_redirect_url : b
					}
				})),
		a
	};
	b.bottom || (b.bottom = {}),
	b.bottom.render = function (a) {
		var b = f();
		return e(b, a)
	},
	b.bottom.footer = {
		getFooterTemplate : function (a) {
			var b = f();
			return e(b, a)
		}
	}
}
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var c = a.localStorage;
	try {
		c && c.setItem("testPrivateModel", !1)
	} catch (d) {
		c = null
	}
	b.localStorage = c
}
(window, window.lib || (window.lib = {})), function (a, b) {
	var c = function () {
		var a = this,
		b = setInterval(function () {
				if (a.Queue.length > 0 && !a.stop) {
					var c = a.Queue.shift();
					c.fn(c.argument),
					c.callBack && c.callBack()
				} else
					clearInterval(b)
			}, this.setTimeout)
	};
	b.queue = {
		Queue : [],
		syncQueue : [],
		setTimeout : 500,
		add : function (a, b, c) {
			return this.Queue.push({
				fn : a,
				argument : b,
				callBack : c
			}),
			this
		},
		addSync : function (a, b, c) {
			return this.syncQueue.push({
				fn : a,
				argument : b,
				callBack : c
			}),
			this
		},
		clear : function () {
			return this.Queue = [],
			this
		},
		stop : !1,
		start : function () {
			return this.stop = !1,
			this.setTimeout > 0 && c.apply(this),
			this
		},
		shift : function () {},
		dequeue : function () {
			var a = this.syncQueue.shift();
			a && (a.fn(a.argument), a.callBack && a.callBack())
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b, c) {
	var d = (b.mtop, a.ratio),
	e = c.index || (c.index = {}),
	f = "http://gtms02.alicdn.com/tps/i2/T1gtStFoVeXXbEBq2D-576-576.png_" + (2 == d ? "580x580" : "290x290") + ".jpg",
	g = {
		layout : function (a, b) {
			var c = "";
			return a.recommend && a.recommend.list && (c = '<h4 class="title"><span>精选</span></h4><div id="recommend" class="recommend">' + this.recommend(a) + "</div>"),
			'<div id="first-view"><div class="sliderwrap"><ul>' + this.firstView(a.section, b) + '</ul></div><div class="indicator"></div></div><div id="apps"><div class="sliderwrap"><ul>' + this.apps(a.apps) + '</ul></div><div class="indicator"></div></div>' + c + '<h4 class="title"><span>导购</span></h4><div id="channel" class="tpl c0">' + this.channel(a.channel) + '</div><div id="category">' + this.category(a.category) + '</div><h4 class="decoration"><span></span></h4>'
		},
		firstView : function (a) {
			var b = "";
			if (a && a.items && a.items.length)
				for (var c = 0; c < a.items.length; c++) {
					var d = a.items[c];
					"zuanzhan" === d.bizType && (b += '<li index="' + c + '" class="slideAD"><a href="' + e.appendttid(d.targetUrl) + '" id="' + d.trackParam.act_id + '"><img class="lazyimg" src="' + f + '" dataimg="' + d.imageUrl[0].imgUrl + '" height="100%"></a></li>'),
					b += '<li index="' + c + '"><a href="' + e.appendttid(d.targetUrl) + '"><img class="lazyimg" src="' + f + '" dataimg="' + d.imageUrl[0].imgUrl + '" height="100%"></a></li>'
				}
			return b
		},
		apps : function (a) {
			if (!a || !a.length)
				return "";
			for (var b = a.length, c = [], d = [], g = [], h = 0; h < a.length; h++)
				if (a[h]) {
					var i = a[h];
					c.push('<a href="'),
					c.push(e.appendttid(i.redirectUrl)),
					c.push('">'),
					c.push('<img class="lazyimg" src="'),
					c.push(f),
					c.push('" dataimg="'),
					c.push(i.picUrl),
					c.push('" />'),
					c.push("<span>"),
					c.push(i.description),
					c.push("</span></a>"),
					(h + 1) % 4 == 0 && (g.push("<div>" + c.join("") + "</div>"), c = []),
					(h + 1) % 8 == 0 && (d.push("<li>" + g.join("") + "</li>"), g = []),
					b - 2 == h && (g.length ? (d.push("<li>"), d.push(g.join("")), c.length && d.push("<div>" + c.join("") + "</div>"), d.push("</li>")) : c.length && d.push("<li><div>" + c.join("") + "</div></li>"))
				}
			return d.join("")
		},
		channel : function (a) {
			function b(b) {
				var c = a[b];
				return '<a index="' + b + '" href="' + e.appendttid(c.redirectUrl) + '"><img class="lazy" src="' + f + '" dataimg="' + c.picUrl + '" height="100%" /></a>'
			}
			if (a && a.length)
				return '<div class="row1col2">' + b(0) + b(1) + '</div><div class="row1col2">' + b(2) + b(3) + "</div>"
		},
		category : function (a) {
			function b(b) {
				var c = a[b];
				return '<a index="' + b + '" href="' + e.appendttid(c.redirectUrl) + '">' + c.description + "</a>"
			}
			return a && a.length ? "" + b(0) + b(1) + b(2) + b(3) : ""
		},
		recommend : function (a) {
			if (!(a && a.recommend && a.recommend.list && a.recommend.list.length))
				return "";
			for (var b = a.recommend.list, c = a.countdown, d = c ? c.location : [0, 0], e = "", f = 0; f < b.length; f++)
				if (b[f]) {
					var g = b[f];
					e += "<ul>";
					for (var h = 0; h < g.length; h++) {
						var i = g[h],
						j = i.redirectUrl,
						k = i.picUrl,
						l = i.picUrl2,
						m = i.description;
						if (e += "<li>", e += '<a href="' + j + '">', e += '<div class="tImg"><img src="' + k + '"></div>', e += '<div class="txt">' + m + "</div>", e += '<div class="bImg"><img src="' + l + '"></div>', d[0] == f && d[1] == h) {
							var n = a.time;
							e += 0 > n ? '<div class="more">进入查看更多</div>' : '<div class="countdown" id="countdown">' + this.countdown(n) + "</div>"
						}
						e += "</a></li>"
					}
					e += "</ul>"
				}
			return e
		},
		countdown : function (a) {
			var b = "",
			a = a.toString(),
			c = [],
			d = a.length;
			return 6 > d && (a = new Array(6 - d + 1).join("0") + a),
			c = a.split(""),
			b += '<div class="hour" data="' + c[0] + c[1] + '"><span>' + c[0] + "</span><span>" + c[1] + "</span></div>",
			b += '<div class="colon">:</div>',
			b += '<div class="minute" data="' + c[2] + c[3] + '"><span>' + c[2] + "</span><span>" + c[3] + "</span></div>",
			b += '<div class="colon">:</div>',
			b += '<div class="sec" data="' + c[4] + c[5] + '"><span>' + c[4] + "</span><span>" + c[5] + "</span></div>"
		}
	};
	e.guide = {
		render : function (a, b) {
			return g.layout(a, b)
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	var d = (a.ratio, c.index || (c.index = {})),
	e = {
		layout : function (a) {
			return '<div class="title"><span>您光顾过的店铺入驻微淘</span></div><div id="weslider"><div class="sliderwrap"><ul>' + this.acounts(a) + '</ul></div><div class="indicator"></div></div>'
		},
		item : function (a) {
			return a && Object.keys(a).length ? '<li><a href="http://h5.m.taobao.com/we/index.htm?ttid=taobao_h5_1.0.0&sprefer=pmm731#account/' + a.account.id + ' "><div class="account"><div class="logo"><img src="' + a.account.logoUrl + '" width="100%" height="100%" /></div><div class="info"><div class="name">' + a.account.nick + '</div><div class="description">' + a.account.description + '</div></div></div><div class="feed"><div class="tips"></div><div class="content">' + a.firstFeed.title + '</div></div></a><div class="follow"><a href="javascript:void(0)" class="not-follow" account-id=' + a.account.id + ">关注</a></div></li>" : ""
		},
		acounts : function (a) {
			for (var b = "", c = 0; c < a.length; c++)
				a[c] && (b += this.item(a[c]));
			return b
		}
	};
	d.we = {
		render : function (a) {
			return e.layout(a)
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	var d = a.ratio,
	e = c.index || (c.index = {}),
	f = "http://gtms02.alicdn.com/tps/i2/T1gtStFoVeXXbEBq2D-576-576.png_" + (2 == d ? "580x580" : "290x290") + ".jpg",
	g = {
		layout : function (a) {
			for (var b = "", c = 0; c < a.length; c++)
				this[a[c].cardType] && (b += this[a[c].cardType](a[c]));
			return b
		},
		item : function (a) {
			return a && Object.keys(a).length ? '<a href="' + e.appendttid(a.redirectUrl) + '"><img class="lazy" src="' + f + '" dataimg="' + a.picUrl + '" height="100%"></a>' : ""
		},
		c1 : function (a) {
			return a && Object.keys(a).length ? '<div class="card tpl c1"><div class="title"><span>' + a.title + '</span></div><div class="row1col1 big">' + this.item(a.contentList[0]) + '</div><div class="row1col1">' + this.item(a.contentList[1]) + '</div><div class="row1col1">' + this.item(a.contentList[2]) + '</div><h4 class="decoration"><span></span></h4></div>' : ""
		},
		c2 : function (a) {
			return a && Object.keys(a).length ? '<div class="card tpl c2"><div class="title"><span>' + a.title + '</span></div><div class="row1col1">' + this.item(a.contentList[0]) + '</div><div class="row2col2"><div class="col1">' + this.item(a.contentList[1]) + '</div><div class="col2"><div class="row1">' + this.item(a.contentList[2]) + '</div><div class="row2">' + this.item(a.contentList[3]) + '</div></div></div><h4 class="decoration"><span></span></h4></div>' : ""
		},
		c3 : function (a) {
			return a && Object.keys(a).length ? '<div class="card tpl c3"><div class="title"><span>' + a.title + '</span></div><div class="row2col2"><div class="col1"><div class="row1">' + this.item(a.contentList[0]) + '</div><div class="row2">' + this.item(a.contentList[3]) + this.item(a.contentList[4]) + '</div></div><div class="col2">' + this.item(a.contentList[1]) + this.item(a.contentList[2]) + this.item(a.contentList[5]) + '</div></div><h4 class="decoration"><span></span></h4></div>' : ""
		}
	};
	e.card = {
		render : function (a) {
			return g.layout(a)
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	var d = c.index || (c.index = {}),
	e = {
		layout : function (a) {
			return '<div class="feedback">' + this.download(a.download) + '</div><div class="hots">' + this.hots(a.hots) + '</div><div class="feedback">' + this.feedback(a.feedback) + "</div>"
		},
		hots : function (a) {
			function b(a) {
				for (var b = "", c = 0; c < Math.max(a.length, 3); c++)
					b += a[c] ? '<a href="' + d.appendttid(a[c].redirectUrl) + '">' + a[c].description + "</a>" : '<a class="placeholder"></a>';
				return b
			}
			function c(a) {
				for (var c = "<ul" + ("true" === a[0].noborder ? ' class="noborder"' : "") + ">", d = 0; d < a.length; d += 3)
					a[d] && (c += "<li>" + b(a.slice(d, d + 3)) + "</li>");
				return c += "</ul>"
			}
			if (!a || !a.length)
				return "";
			for (var e = "", f = 0; f < a.length; f++)
				a[f] && (e += c(a[f]));
			return e
		},
		feedback : function (a) {
			function b(a) {
				for (var b = "", c = 0; c < a.length; c++)
					a[c] && (b += '<li><a href="' + d.appendttid(a[c].redirectUrl) + '">' + a[c].description + "</a></li>");
				return b
			}
			return a && Object.keys(a).length ? "<h3>" + a.title + "</h3><ul>" + b(a.list) + "</ul>" : ""
		},
		download : function (a) {
			function b(a) {
				for (var b = "", c = 0; c < a.length; c++)
					a[c] && (b += '<li><a href="' + d.appendttid(a[c].redirectUrl) + '" style="color:' + a[c].color + '">' + a[c].description + "</a></li>");
				return b
			}
			return a && Object.keys(a).length ? "<ul>" + b(a.list) + "</ul>" : ""
		}
	};
	d.footer = {
		render : function (a) {
			return e.layout(a)
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	function d() {
		$("#first-view").on("click", "li a", function () {
			var a = $(this),
			b = parseInt(a.parents("li").attr("index"));
			$.ajax({
				aplus : !0,
				apuri : h + (b + 1)
			})
		})
	}
	function e() {
		$("#channel").on("touchend", "a", function () {
			var a = $(this),
			b = parseInt(a.attr("index"));
			$.ajax({
				aplus : !0,
				apuri : i[b]
			})
		})
	}
	function f() {
		$("#category").on("touchend", "a", function () {
			var a = $(this),
			b = parseInt(a.attr("index"));
			$.ajax({
				aplus : !0,
				apuri : j + (b + 1)
			})
		})
	}
	var g = c.index || (c.index = {}),
	h = "Page_Home_Button-Banner",
	i = ["Page_Home_Button-sale", "Page_Home_Button-life", "Page_Home_Button-store", "Page_Home_Button-love"],
	j = "Page_Home_Button-category";
	g.stat = {
		init : function () {
			d(),
			e(),
			f()
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	function d(a) {
		k = $("<div></div>"),
		l = $("<div></div>"),
		m = $("<a></a>"),
		n = $("<a></a>"),
		o = $("<a></a>"),
		k.css({
			width : "100%",
			backgroundColor : a.bgcolor
		}),
		k.append(l),
		l.css({
			position : "relative",
			margin : "0 auto",
			width : 320 * p,
			height : 100 * p,
			overflow : "hidden",
			background : "url(" + a.cover + ") no-repeat 0 0",
			backgroundSize : "contain"
		}).append(m).append(n).append(o),
		m.css({
			position : "absolute",
			top : 0,
			right : 0,
			width : 29 * p,
			height : 25 * p
		}),
		n.css({
			position : "absolute",
			top : 34 * p,
			left : 194 * p,
			width : 98 * p,
			height : 25 * p
		}),
		o.css({
			position : "absolute",
			top : 64 * p,
			left : 194 * p,
			width : 98 * p,
			height : 25 * p
		})
	}
	function e() {
		m.on("touchend", function (a) {
			a.preventDefault(),
			g()
		}, !1),
		n.on("touchend", function (a) {
			a.preventDefault(),
			$.ajax({
				aplus : !0,
				apuri : "click_sb_v4_download"
			}),
			r.smartbanner.download()
		}, !1),
		o.on("touchend", function (a) {
			a.preventDefault(),
			r.smartbanner.redirect(!0)
		}, !1)
	}
	function f() {
		k.insertBefore(i),
		j.css({
			top : 100 * p
		})
	}
	function g() {
		if (k.remove(), j.css({
				top : 0
			}), q) {
			var a = new Date;
			a.setDate(a.getDate() + 1),
			a.setHours(0),
			a.setMinutes(0),
			a.setSeconds(0),
			a.setMilliseconds(0),
			q.setItem("sbCloseDate", a.getTime())
		}
	}
	function h(a) {
		var c = b.smartbanner.smtStatus(1),
		g = b.smartbanner.expiresInDay("cloudDate");
		if (c.isInvoke || c.isShow || c.isInvokeDay) {
			if (c.isInvoke)
				r.smartbanner.redirect();
			else if (c.isInvokeDay && !g) {
				r.smartbanner.redirect();
				try {
					q.cloudDate = Date.now()
				} catch (h) {
					console.log(h)
				}
			}
			c.isShow && (i = $("#wrap"), j = $("#J_search"), d(a), f(), e())
		}
	}
	var i,
	j,
	k,
	l,
	m,
	n,
	o,
	p = (a.document, a.ratio),
	q = b.localStorage,
	r = c.index || (c.index = {}),
	s = r.smartbannerUC = {};
	s.render = function (a) {
		var b;
		if (q && (b = q.getItem("sbCloseDate"))) {
			var b = parseInt(b),
			c = Date.now();
			c > b && h(a)
		} else
			h(a)
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b, c) {
	var d = a.document,
	e = b.localStorage,
	f = b.smartbanner,
	g = c.index || (c.index = {}),
	h = g.pop = {},
	i = f && f.smtStatus(0),
	j = f && f.expiresInDay("cloudDate2");
	h.render = function (a) {
		function b() {
			d.getElementById("J_popupwrap").style.display = "block",
			d.getElementById("J_popup").style.cssText = "background-image:url(" + a.cover + ");background-color:" + a.bgcolor,
			d.getElementById("J_popupclose").addEventListener("click", c),
			d.getElementById("J_popupinvoke").addEventListener("click", function () {
				n.install(!0)
			}),
			d.getElementById("J_popupcontinue").addEventListener("click", c),
			$.ajax({
				aplus : !0,
				apuri : "click_sb_v0_show"
			})
		}
		function c() {
			if (d.getElementById("J_popupwrap").style.display = "none", $.ajax({
					aplus : !0,
					apuri : "click_sb_v0_close"
				}), e) {
				var b = new Date;
				b.setDate(b.getDate() + (a.interval || 1)),
				b.setHours(0),
				b.setMinutes(0),
				b.setSeconds(0),
				b.setMilliseconds(0),
				e.setItem("popCloseDate", b.getTime())
			}
		}
		if ((i.isShow || i.isInvoke || i.isInvokeDay) && f) {
			var h = g.ua.isIOS,
			k = g.ua.isAndroid,
			l = g.ua.isChrome,
			m = g.ua.iosVersion,
			n = f({
					version : "v0",
					type : "func",
					subPlace : 0,
					href : a.weburl ? "taobaowebview://m.taobao.com/?weburl=" + encodeURIComponent(a.weburl) : g.schemaUrl
				});
			if (i.isInvoke)
				n.redirect();
			else if (i.isInvokeDay && !j) {
				n.redirect();
				try {
					e.cloudDate2 = Date.now()
				} catch (o) {
					console.log(o)
				}
			}
			if (!(!h && !k || l || h && 5 > m)) {
				var p;
				if (e && (p = e.getItem("popCloseDate"))) {
					var p = parseInt(p || 0),
					q = Date.now();
					q > p && b()
				} else
					b()
			}
		}
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (win, lib) {
	function getParam(a) {
		var b = $("#J_search .cc-search-tab li.cur").html(),
		c = "宝贝" == b ? "hbword" : "店铺" == b ? "hshopword" : "tmallword";
		return c = c + a + "%23h%23search"
	}
	var $ = win.$,
	queue = lib.queue,
	notification = lib.notification,
	localStorage = lib.localStorage;
	queue.setTimeout = 100,
	$.fn.autoComplete = function (options) {
		var self = this,
		setting = {
			ajaxUrl : "http://m.taobao.com",
			operator : ".J_autocomplete",
			cat : ".J_cat",
			wrapEl : ".wrap",
			meatEl : ".meat",
			childEl : "li",
			submit : ".btn",
			close : ".close",
			collapse : "collapse",
			expand : "expand",
			delay : 0,
			anim : !0,
			isUseKey : !0,
			history : !1,
			localStorage : "searchhistory",
			clearHistory : "clear",
			addition : !1,
			additionClass : ".addition",
			max : 7,
			onFocus : function () {},
			afterItemClick : function () {},
			textInput : function () {},
			onHisLoad : function () {}

		};
		$.extend(setting, options || {});
		var autoComplete = {
			ajax : [],
			hisList : [],
			hisIndex : 0,
			onHisLoad : setting.onHisLoad
		};
		return $(this).each(function () {
			function initInput(a) {
				var b,
				a = a || window.event;
				if (b = $(this).val().replace(/(^\s+)|(\s+$)/g, ""), !b.length && setting.history)
					return queue.clear(), queue.add(getHistory), queue.start(), void 0;
				if (13 != a.keyCode && 32 != a.keyCode) {
					setting.textInput.call(this, b.length);
					var c = self.find("#J_ST"),
					d = c.attr("name");
					return c.length > 0 && "event_submit_do_search_shop" == d ? (self.find(setting.wrapEl).hide(), !1) : ("close" !== setting.status && (queue.clear(), queue.add(getList, b), queue.start()), void 0)
				}
			}
			function getList(a) {
				var b = setting.ajaxUrl;
				autoComplete.ajax.push($.ajax({
						url : b,
						type : "GET",
						dataType : "jsonp",
						data : "code=utf-8&extras=1&q=" + a,
						error : function () {
							return !1
						},
						success : function (a) {
							pack(a),
							$close.html("关闭").removeClass("clear")
						}
					}))
			}
			function getHistory() {
				var a = autoComplete.hisList[autoComplete.hisIndex];
				pack(a),
				$close.html("清除历史记录").addClass("clear")
			}
			function clearHistory() {
				if (setting.localStorage && localStorage)
					localStorage.removeItem(setting.localStorage);
				else {
					var a = "string" == typeof setting.clearHistory ? [setting.clearHistory] : setting.clearHistory;
					queue.clear();
					for (var b = 0; b < a.length; b++)
						queue.addSync($.ajax, {
							url : a[b],
							dataType : "jsonp",
							success : function () {
								queue.dequeue()
							}
						});
					queue.dequeue()
				}
				autoComplete.hisList = []
			}
			function pack(a) {
				var b = [],
				c = [],
				d = [],
				e = [],
				f = a && a.minitao,
				g = a && a.cat,
				h = a && a.result,
				i = !1;
				if (setting.isUseKey && self.find("#J_IsUseSearchSuggest").val(""), setting.status || (setting.status = a && a.result && 0 === a.result.length ? "close" : a && a.status), f) {
					for (var j = 0; j < f.length; j++) {
						var k = f[j][0],
						l = Number(f[j][1]),
						m = f[j][2];
						l >= 1e4 && (l /= 1e4, l = l.toFixed(1) + "万"),
						c.push('<li class="we" key="' + m + '">'),
						c.push('<div class="logo we"></div>'),
						c.push('<div class="title"> <span class="grey name">微淘</span> <span>' + k + '</span> <span class="grey type">' + l + "关注者</span></div>"),
						c.push('<div class="arrow"></div>'),
						c.push("</li>")
					}
					i = !0
				}
				if (g) {
					for (var n = 0; n < g.length; n++) {
						var o = g[n][2],
						p = g[n][1],
						q = g[n][0];
						c.push('<li catmap="' + p + '" key="' + o + '">'),
						c.push('<div class="logo cat"></div>'),
						c.push('<div class="title"><span>' + o + '</span> <span class="grey name">分类</span> <span class="grey type">' + q + "</span></div>"),
						c.push('<div class="arrow"></div>'),
						c.push("</li>")
					}
					i = !0
				}
				if (a && 0 != a.result && a.result.length > 0) {
					for (var r = h.length > setting.max ? setting.max : h.length, j = (setting.addition ? "<div class='" + setting.additionClass.slice(1) + "'></div>" : "", 0); r > j; j++)
						e.push('<li key="' + h[j][0] + '"><div class="title">' + h[j][0] + "</div></li>");
					i = !0
				}
				return i ? (b.push(d.join("") + c.join("") + e.join("")), self.find(setting.meatEl).html(b.join("")), effect(), void 0) : (self.find(setting.wrapEl).hide(), void 0)
			}
			function effect() {
				var a = null;
				a = setTimeout(function () {
						setting.anim ? self.find(setting.wrapEl).show() : self.removeClass(setting.collapse).addClass(setting.expand)
					}, setting.delay),
				self.find(setting.close).unbind("click"),
				self.find(setting.childEl).unbind("click"),
				self.find(setting.close).click(function () {
					var a = null;
					a = setTimeout(function () {
							setting.anim ? self.find(setting.wrapEl).hide() : self.removeClass(setting.expand).addClass(setting.collapse)
						}, setting.delay),
					$close.hasClass("clear") && (logAjax("", "clean"), clearHistory())
				}),
				self.find(setting.childEl).click(function () {
					var a = $(this),
					b = a.attr("key"),
					c = a.attr("catmap") || "";
					if (setting.afterItemClick.call(this, Number(a.index()) + 1), a.hasClass("we"))
						location.href = "http://h5.m.taobao.com/we/index.htm#account/" + b;
					else {
						operator.val(b),
						$(setting.cat).val(c);
						var d = self.find(setting.submit)[0];
						d && d.click()
					}
				})
			}
			function toTop() {
				return
			}
			function logAjax(a, b) {
				var c = "http://log.mmstat.com/search",
				d = document.cookie,
				e = d && d.match("_w_tb_nick=.*"),
				f = b || "",
				g = e && e[0].split(";")[0].split("=")[1] || "",
				h = "smtaobao",
				i = a || "",
				j = "sug";
				$.ajax({
					url : c,
					data : {
						op : f,
						nk : g,
						src : h,
						q : i,
						app : j
					},
					error : function () {
						return console.log("网络连接失败，请刷新页面重试"),
						!1
					},
					success : function () {}

				})
			}
			var self = $(this);
			if (setting.history)
				if (setting.localStorage && localStorage)
					autoComplete.hisList = eval(localStorage.getItem(setting.localStorage) || []);
				else {
					for (var hisArray = "string" == typeof setting.history ? [setting.history] : setting.history, i = 0; i < hisArray.length; i++)
						queue.addSync($.ajax, {
							url : hisArray[i],
							type : "GET",
							dataType : "jsonp",
							error : function () {
								return console.log("网络连接失败，请刷新页面重试"),
								!1
							},
							success : function (a) {
								autoComplete.hisList.push(a),
								queue.dequeue()
							}
						});
					queue.addSync(autoComplete.onHisLoad),
					queue.dequeue()
				}
			var operator = $(this).find(setting.operator),
			$close = self.find(setting.close).addClass("c-btn-grey-small s-btn-grey");
			operator.attr("autocomplete", "off"),
			operator.on("input", initInput),
			operator.focus(function (a) {
				var b;
				return "" == $(this).val() && $(this).val(""),
				b = $(this).val().replace(/(^\s+)|(\s+$)/g, ""),
				setting.onFocus && setting.onFocus.call(operator, a, b),
				0 == b.length && setting.history ? (queue.clear(), queue.add(getHistory), queue.start(), void 0) : void 0
			}),
			setting.addition && self.find(setting.meatEl).on("touchstart click", "div" + setting.additionClass, function (a) {
				var b = $(this);
				operator.focus(),
				operator.val(b.parent().attr("key")),
				initInput.call(operator),
				a.preventDefault(),
				a.stopPropagation()
			}),
			autoComplete.getHistory = setting.history ? function () {
				queue.clear(),
				queue.add(getHistory),
				queue.start()
			}
			 : function () {},
			autoComplete.close = function () {
				if (queue.clear(), autoComplete.ajax.length) {
					for (i = 0; i < autoComplete.ajax.length; i++)
						autoComplete.ajax[i] && autoComplete.ajax[i].abort();
					autoComplete.ajax = []
				}
				self.find(setting.wrapEl).hide()
			},
			autoComplete.initInput = initInput
		}),
		autoComplete
	},
	lib.autocomplete = {
		init : function (a) {
			a || (a = {});
			var b = $("#J_dropdown").autoComplete({
					ajaxUrl : "http://s.m.taobao.com/sug.do",
					wrapEl : ".suggest",
					operator : ".inp-search",
					meatEl : ".suggest .meat",
					close : ".suggest .close",
					submit : ".bton-search",
					addition : !0,
					anim : !0,
					history : !0,
					clearHistory : !0,
					onFocus : function () {
						e.val(""),
						d.removeClass("showoff"),
						c.hide()
					},
					textInput : function () {
						e.val().length ? f.css("visibility", "visible") : f.css("visibility", "hidden")
					},
					afterItemClick : function (a) {
						var b = getParam(a);
						g.attr("action", "http://s.m.taobao.com/index.htm?pds=" + b + "&suggest=" + encodeURIComponent($(this).text()) + "_" + a)
					}
				}),
			c = $("#wrap"),
			d = $("#J_search"),
			e = $("#J_searchtext"),
			f = $("#J_cleartext"),
			g = $("#J_indexform"),
			h = $("#J_ST");
			e.attr("placeholder", a.title || ""),
			d.on("click", "#J_cleartext", function () {
				e.val(""),
				f.css("visibility", "hidden"),
				d.find(".suggest").hide()
			}),
			d.on("click", ".cc-back", function () {
				d.addClass("showoff"),
				c.show()
			}),
			d.on("click", ".cc-search-tab li", function () {
				var a = $(this),
				c = a.attr("i");
				if (!a.hasClass("cur"))
					switch (h[0].setAttribute("name", c), a.addClass("cur").siblings(".cur").removeClass("cur"), g.attr("action", "http://s.m.taobao.com/index.htm?pds=" + getParam(0)), a.html()) {
					case "店铺":
						b.hisIndex = 1,
						b.getHistory();
						break;
					case "天猫":
						b.hisIndex = 2,
						b.getHistory();
						break;
					default:
						b.hisIndex = 0,
						b.getHistory()
					}
			}),
			d.on("submit", "#J_indexform", function () {
				var c = e[0];
				a.searchkey || (a.searchkey = "");
				var d = c.value ? c.value : a.searchkey;
				if (c.value = d, "" === d)
					return notification.simple("请输入关键字"), !1;
				if ($("#J_indexform").attr("action", $("#J_indexform").attr("action")), localStorage) {
					var f = "searchhistory";
					ls = localStorage.getItem(f);
					var g = ls && JSON.parse(ls) || [],
					h = b.hisIndex,
					i = g.length > h && g[h] || {
						result : []
					},
					j = $.map(i.result, function (a, b) {
							return a[0] == d || b > 6 ? null : [a]
						});
					j.unshift([d]),
					i.result = j,
					g[h] = i,
					localStorage.setItem(f, JSON.stringify(g))
				}
			})
		}
	}
}
(window, window.lib || (window.lib = {})), function (a, b, c) {
	function d() {
		var a = location.href.match(/ttid=([^&#=]+)/i);
		return a && a[1] || ""
	}
	function e(a, b) {
		var c = {},
		d = Object.keys(b);
		d.forEach(function (a) {
			c[a] = !1
		}),
		d.forEach(function (d) {
			function e(b) {
				c[d] = b || !0;
				for (var e = Object.keys(c), f = 0; f < e.length; f++)
					if (!c[e[f]])
						return;
				a && a(c || {})
			}
			var f = b[d];
			setTimeout(function () {
				f(e)
			}, 1)
		})
	}
	function f(a) {
		a.preventDefault()
	}
	function g() {
		document.addEventListener("touchmove", f, !1),
		l('input[name="ttid"]').attr("value", A);
		var c = {};
		m.geolocation && (c.geolocation = function (a) {
			var b = setTimeout(function () {
					c || (c = !0, a())
				}, 500),
			c = !1;
			m.geolocation.getCurrentPosition(function (d) {
				clearTimeout(b),
				c || (c = !0, a({
						latitude : d.coords.latitude,
						longitude : d.coords.longitude
					}))
			})
		}),
		c.scroll2Top = function (a) {
			setTimeout(scrollTo, 0, 0, 1),
			setTimeout(function () {
				document.body.style.height = "auto",
				document.body.style.minHeight = window.innerHeight + "px",
				a()
			}, 400)
		},
		c.pop = function (b) {
			var c = a.IndexOpJSON;
			z.pop && c && c.popAD && Object.keys(c.popAD).length && !q && !r && !C && z.pop.render(c.popAD),
			b()
		},
		c.smartbanner = function (b) {
			var c = a.SmartbannerJSON,
			d = a.IndexOpJSON;
			if (w)
				if (z.smartbannerUC && d.ucAD && Object.keys(d.ucAD).length && (q || r && "12tx0065" !== A))
					z.smartbanner = w({
							version : "v4",
							type : "func",
							hide : !0,
							href : B
						}), z.smartbannerUC.render(d.ucAD);
				else if (c && c.mainIndex && !q && !r) {
					var e = c.mainIndex;
					e.dpr = ratio,
					e.href = B,
					z.smartbanner = w.sbLogic(e, 1)
				}
			b()
		},
		c.bottom = function (a) {alert(2);
			l("#copyright")[0].innerHTML = b.bottom.footer.getFooterTemplate(),
			a()
		},
		e(h, c)
	}
	function h(a) {
		var b = {};
		b.mtopData = function (b) {
			function c() {
				g || (g = !0, f ? b(f) : (y.simple("获取数据出错，请稍后再试"), b()))
			}
			var d = "mtop.taobao.homepage.loadPageContent",
			e = a.geolocation || {},
			f = {},
			g = !1;
			if (x && (f = JSON.parse(x.getItem(d) || "{}")), f.timestamp && f.timestamp > Date.now())
				b(f);
			else {
				var h = {
					isFirstUse : 0,
					nick : v.getNickFromCookie(),
					platform : "h5",
					ttid : A,
					uv : ""
				};
				e.longitude && e.latitude && (h.longitude = e.longitude, h.latitude = e.latitude),
				u.request({
					api : d,
					v : "1.0",
					ttid : "123@taobao_android_1.0",
					data : h
				}, function (a) {
					if (0 === a.ret[0].indexOf("SUCCESS::")) {
						g = !0;
						var e = a.data;
						e.timestamp = 1e3 * parseInt(e.interval) + Date.now(),
						x && x.setItem(d, JSON.stringify(e)),
						b(e)
					} else
						c()
				}, function () {
					c()
				})
			}
		},
		b.picData = function (b) {
			function c() {
				g || (g = !0, f ? b(f) : (y.simple("获取数据出错，请稍后再试"), b()))
			}
			var d = "mtop.taobao.wireless.homepage.ac.loadPageContent",
			e = a.geolocation || {},
			f = {},
			g = !1;
			if (x && (f = JSON.parse(x.getItem(d) || "{}")), f.timestamp && f.timestamp > Date.now())
				b(f);
			else {
				var h = {
					isFirstUse : 0,
					nick : v.getNickFromCookie(),
					platform : "h5",
					ttid : A,
					uv : ""
				};
				e.longitude && e.latitude && (h.longitude = e.longitude, h.latitude = e.latitude),
				u.request({
					api : d,
					v : "2.0",
					ttid : "123@taobao_android_1.0",
					data : h
				}, function (a) {
					if (0 === a.ret[0].indexOf("SUCCESS::")) {
						g = !0;
						var e = a.data;
						e.timestamp = 1e3 * parseInt(e.interval) + Date.now(),
						x && x.setItem(d, JSON.stringify(e)),
						b(e)
					} else
						c()
				}, function () {
					c()
				})
			}
		},
		e(j, b)
	}
	function i() {
		function a(a, b) {
			return "<span>" + a + "</span><span>" + b + "</span>"
		}
		function b(b, c, d) {
			b--,
			0 > b && (b = 59, d && d(b));
			var e = b.toString();
			e.length < 2 && (e = "0" + e);
			var f = e.split("");
			return c.html(a(f[0], f[1])),
			b
		}
		var c = l("#countdown");
		if (c.length)
			var d = c.find(".hour"), e = c.find(".minute"), f = c.find(".sec"), g = Number(f.attr("data")), h = Number(e.attr("data")), i = Number(d.attr("data")), j = setInterval(function () {
					g = b(g, f, function () {
							h = b(h, e, function () {
									i = b(i, d)
								})
						}),
					i === h === g === 0 && clearInterval(j)
				}, 1e3)
	}
	function j(b) {
		l("#loading")[0].style.display = "none";
		var c = b.mtopData || {},
		d = a.IndexOpJSON || {},
		f = b.picData || {},
		g = {};
		if (z.guide && f.section) {
			c.guide || (c.guide = {});
			for (var h = 0; h < f.section.length; h++) {
				var j = f.section[h];
				if ("tbanner" === j.template) {
					c.guide.section = j;
					break
				}
			}
			g.countdown = function (a) {
				function b() {
					var b = z.guide.render(c.guide, d && d.slideAD);
					l("#guide")[0].innerHTML = b,
					i(),
					a()
				}
				u.request({
					api : "mtop.msp.qianggou.getIndexItem",
					v : "1.0"
				}, function (a) {
					var e = a,
					f = e && e.data,
					g = f && f.future_time,
					h = f && f.sys_time,
					i = Number(g) - Number(h) || 0;
					c.guide.time = i,
					c.guide.apps = d.app || [],
					c.guide.recommend = d.recommend || [],
					b()
				}, function () {})
			}
		}
		z.card && c.marketing && c.marketing.cardList && (g.card = function (a) {
			var b = z.card.render(c.marketing.cardList);
			l("#cards")[0].innerHTML = b,
			a()
		}),
		z.footer && (g.footer = function (a) {
			var b = z.footer.render({
					hots : d.hots || [],
					feedback : d.feedback || {},
					download : d.download || {}

				});
			l("#others")[0].innerHTML = b,
			a()
		}),
		e(k, g)
	}
	function k() {
		var c = a.IndexOpJSON;
		b.lazyload.init(),
		b.taoplus.initialize(),
		b.autocomplete.init(c && c.searchHot),
		new b.Slider(l("#first-view"), {
			trigger : ".indicator",
			activeTriggerCls : "cur",
			play : !0,
			loop : !0
		}),
		new b.Slider(l("#apps"), {
			trigger : ".indicator",
			activeTriggerCls : "cur",
			lazyIndex : 1
		}),
		z.stat && z.stat.init(),
		document.removeEventListener("touchmove", f)
	}
	var l = a.$,
	m = (Array.prototype.slice, a.navigator),
	n = m.userAgent,
	o = /iPad|iPhone|iPod/i.test(n),
	p = /Android/i.test(n),
	q = /UC|UCBrowser/i.test(n),
	r = /QQ|MQQBrowser/i.test(n),
	s = n.indexOf("Chrome") > -1,
	t = n.match(/iPhone\s+OS\s+([\d_]+)/),
	u = b.mtop,
	v = b.login,
	w = b.smartbanner,
	x = b.localStorage,
	y = b.notification,
	z = c.index || (c.index = {});
	t && (t = parseFloat(t[1].split("_").slice(0, 2).join("."), 10));
	var A = z.ttid = d(),
	B = z.schemaUrl = (o ? "taobao://m.taobao.com" : "taobao://m.taobao.com/") + (A ? "?ttid=" + A : ""),
	C = z.inApp = w.ttidInTaobaoApp() || w.uaInTaobaoApp();
	z.ua = {
		isIOS : o,
		isAndroid : p,
		isUC : q,
		isQQ : r,
		isChrome : s,
		iosVersion : t
	},
	z.appendttid = function (a) {
		return A ? a.indexOf("?") > -1 ? a.indexOf("ttid=") > -1 ? a.replace(/ttid=[^&#=]+/, "ttid=" + A) : a.replace("?", "?ttid=" + A + "&") : a.indexOf("#") > -1 ? a.replace("#", "?ttid=" + A + "#") : a += "?ttid=" + A : a
	},
	document.addEventListener("DOMContentLoaded", g)
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {}));