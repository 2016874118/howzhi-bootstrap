define("arale/cookie/1.0.2/cookie", [], function(e, n) {
	function t(e, n) {
		var t = {};
		if(r(e) && e.length > 0)
			for(var o, i, a, f = n ? u : c, s = e.split(/;\s/g), p = 0, m = s.length; m > p; p++) {
				if(a = s[p].match(/([^=]+)=/i), a instanceof Array) try {
					o = u(a[1]), i = f(s[p].substring(a[1].length + 1))
				} catch(g) {} else o = u(s[p]), i = "";
				o && (t[o] = i)
			}
		return t
	}

	function r(e) {
		return "string" == typeof e
	}

	function o(e) {
		return r(e) && "" !== e
	}

	function i(e) {
		if(!o(e)) throw new TypeError("Cookie name must be a non-empty string")
	}

	function c(e) {
		return e
	}
	var a = n,
		u = decodeURIComponent,
		f = encodeURIComponent;
	a.get = function(e, n) {
		i(e), n = "function" == typeof n ? {
			converter: n
		} : n || {};
		var r = t(document.cookie, !n.raw);
		return(n.converter || c)(r[e])
	}, a.set = function(e, n, t) {
		i(e), t = t || {};
		var r = t.expires,
			c = t.domain,
			a = t.path;
		t.raw || (n = f(n + ""));
		var u = e + "=" + n,
			s= r;
		return "number" == typeof s && (s = new Date, s.setDate(s.getDate() + r)), s instanceof Date && (u += "; expires=" + s.toUTCString()), o(c) && (u += "; domain=" + c), o(a) && (u += "; path=" + a), t.secure && (u += "; secure"), document.cookie = u, u
	}, a.remove = function(e, n) {
		return n = n || {}, n.expires = new Date(0), this.set(e, "", n)
	}
});