/*!
 * William DURAND <william.durand1@gmail.com>
 * MIT Licensed
 */
;
var Translator = (function(i, d) {
	var e = {},
		l = [],
		h = new RegExp(/^\w+\: +(.+)$/),
		f = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
		o = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/);

	function j(s, r) {
		var t, p = Translator.placeHolderPrefix,
			q = Translator.placeHolderSuffix;
		for(t in r) {
			var u = new RegExp(p + t + q, "g");
			if(u.test(s)) {
				s = s.replace(u, r[t])
			}
		}
		return s
	}

	function g(r, t, z, p, v) {
		var s = z || p || v,
			A = t;
		if(d == e[s]) {
			if(d == e[v]) {
				return r
			}
			s = v
		}
		if(d === A || null === A) {
			for(var u = 0; u < l.length; u++) {
				if(c(s, l[u], r) || c(v, l[u], r)) {
					A = l[u];
					break
				}
			}
		}
		if(c(s, A, r)) {
			return e[s][A][r]
		}
		var y, w, x, q;
		while(s.length > 2) {
			y = s.length;
			w = s.split(/[\s_]+/);
			x = w[w.length - 1];
			q = x.length;
			if(1 === w.length) {
				break
			}
			s = s.substring(0, y - (q + 1));
			if(c(s, A, r)) {
				return e[s][A][r]
			}
		}
		if(c(v, A, r)) {
			return e[v][A][r]
		}
		return r
	}

	function c(p, q, r) {
		if(d == e[p]) {
			return false
		}
		if(d == e[p][q]) {
			return false
		}
		if(d == e[p][q][r]) {
			return false
		}
		return true
	}

	function m(C, s, z) {
		var p, x, v = [],
			B = [],
			w = C.split(Translator.pluralSeparator),
			u = [];
		for(p = 0; p < w.length; p++) {
			var A = w[p];
			if(f.test(A)) {
				u = A.match(f);
				v[u[0]] = u[u.length - 1]
			} else {
				if(h.test(A)) {
					u = A.match(h);
					B.push(u[1])
				} else {
					B.push(A)
				}
			}
		}
		for(x in v) {
			if(o.test(x)) {
				u = x.match(o);
				if(u[1]) {
					var t = u[2].split(","),
						q;
					for(q in t) {
						if(s == t[q]) {
							return v[x]
						}
					}
				} else {
					var r = n(u[4]);
					var y = n(u[5]);
					if(("[" === u[3] ? s >= r : s > r) && ("]" === u[6] ? s <= y : s < y)) {
						return v[x]
					}
				}
			}
		}
		return B[b(s, z)] || B[0] || d
	}

	function n(p) {
		if("-Inf" === p) {
			return Number.NEGATIVE_INFINITY
		} else {
			if("+Inf" === p || "Inf" === p) {
				return Number.POSITIVE_INFINITY
			}
		}
		return parseInt(p, 10)
	}

	function b(r, p) {
		var q = p;
		if("pt_BR" === q) {
			q = "xbr"
		}
		if(q.length > 3) {
			q = q.split("_")[0]
		}
		switch(q) {
			case "bo":
			case "dz":
			case "id":
			case "ja":
			case "jv":
			case "ka":
			case "km":
			case "kn":
			case "ko":
			case "ms":
			case "th":
			case "tr":
			case "vi":
			case "zh":
				return 0;
			case "af":
			case "az":
			case "bn":
			case "bg":
			case "ca":
			case "da":
			case "de":
			case "el":
			case "en":
			case "eo":
			case "es":
			case "et":
			case "eu":
			case "fa":
			case "fi":
			case "fo":
			case "fur":
			case "fy":
			case "gl":
			case "gu":
			case "ha":
			case "he":
			case "hu":
			case "is":
			case "it":
			case "ku":
			case "lb":
			case "ml":
			case "mn":
			case "mr":
			case "nah":
			case "nb":
			case "ne":
			case "nl":
			case "nn":
			case "no":
			case "om":
			case "or":
			case "pa":
			case "pap":
			case "ps":
			case "pt":
			case "so":
			case "sq":
			case "sv":
			case "sw":
			case "ta":
			case "te":
			case "tk":
			case "ur":
			case "zu":
				return(r == 1) ? 0 : 1;
			case "am":
			case "bh":
			case "fil":
			case "fr":
			case "gun":
			case "hi":
			case "ln":
			case "mg":
			case "nso":
			case "xbr":
			case "ti":
			case "wa":
				return((r === 0) || (r == 1)) ? 0 : 1;
			case "be":
			case "bs":
			case "hr":
			case "ru":
			case "sr":
			case "uk":
				return((r % 10 == 1) && (r % 100 != 11)) ? 0 : (((r % 10 >= 2) && (r % 10 <= 4) && ((r % 100 < 10) || (r % 100 >= 20))) ? 1 : 2);
			case "cs":
			case "sk":
				return(r == 1) ? 0 : (((r >= 2) && (r <= 4)) ? 1 : 2);
			case "ga":
				return(r == 1) ? 0 : ((r == 2) ? 1 : 2);
			case "lt":
				return((r % 10 == 1) && (r % 100 != 11)) ? 0 : (((r % 10 >= 2) && ((r % 100 < 10) || (r % 100 >= 20))) ? 1 : 2);
			case "sl":
				return(r % 100 == 1) ? 0 : ((r % 100 == 2) ? 1 : (((r % 100 == 3) || (r % 100 == 4)) ? 2 : 3));
			case "mk":
				return(r % 10 == 1) ? 0 : 1;
			case "mt":
				return(r == 1) ? 0 : (((r === 0) || ((r % 100 > 1) && (r % 100 < 11))) ? 1 : (((r % 100 > 10) && (r % 100 < 20)) ? 2 : 3));
			case "lv":
				return(r === 0) ? 0 : (((r % 10 == 1) && (r % 100 != 11)) ? 1 : 2);
			case "pl":
				return(r == 1) ? 0 : (((r % 10 >= 2) && (r % 10 <= 4) && ((r % 100 < 12) || (r % 100 > 14))) ? 1 : 2);
			case "cy":
				return(r == 1) ? 0 : ((r == 2) ? 1 : (((r == 8) || (r == 11)) ? 2 : 3));
			case "ro":
				return(r == 1) ? 0 : (((r === 0) || ((r % 100 > 0) && (r % 100 < 20))) ? 1 : 2);
			case "ar":
				return(r === 0) ? 0 : ((r == 1) ? 1 : ((r == 2) ? 2 : (((r >= 3) && (r <= 10)) ? 3 : (((r >= 11) && (r <= 99)) ? 4 : 5))));
			default:
				return 0
		}
	}

	function k(r, q) {
		for(var p = 0; p < r.length; p++) {
			if(q === r[p]) {
				return true
			}
		}
		return false
	}

	function a() {
		return i.documentElement.lang.replace("-", "_")
	}
	return {
		locale: a(),
		fallback: "en",
		placeHolderPrefix: "%",
		placeHolderSuffix: "%",
		defaultDomain: "messages",
		pluralSeparator: "|",
		add: function(u, s, t, q) {
			var r = q || this.locale || this.fallback,
				p = t || this.defaultDomain;
			if(!e[r]) {
				e[r] = {}
			}
			if(!e[r][p]) {
				e[r][p] = {}
			}
			e[r][p][u] = s;
			if(false === k(l, p)) {
				l.push(p)
			}
			return this
		},
		trans: function(t, r, s, p) {
			var q = g(t, s, p, this.locale, this.fallback);
			return j(q, r || {})
		},
		transChoice: function(v, s, r, t, p) {
			var q = g(v, t, p, this.locale, this.fallback);
			var u = parseInt(s, 10);
			if(d != q && !isNaN(u)) {
				q = m(q, u, p || this.locale || this.fallback)
			}
			return j(q, r || {})
		},
		fromJSON: function(r) {
			if(typeof r === "string") {
				r = JSON.parse(r)
			}
			if(r.locale) {
				this.locale = r.locale
			}
			if(r.fallback) {
				this.fallback = r.fallback
			}
			if(r.defaultDomain) {
				this.defaultDomain = r.defaultDomain
			}
			if(r.translations) {
				for(var p in r.translations) {
					for(var q in r.translations[p]) {
						for(var s in r.translations[p][q]) {
							this.add(s, r.translations[p][q][s], q, p)
						}
					}
				}
			}
			return this
		},
		reset: function() {
			e = {};
			l = [];
			this.locale = a()
		}
	}
})(document, undefined);
if(typeof window.define === "function" && window.define.amd) {
	window.define("Translator", [], function() {
		return Translator
	})
}
if(typeof exports !== "undefined") {
	if(typeof module !== "undefined" && module.exports) {
		module.exports = Translator
	}
};