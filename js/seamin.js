function register(a) {
	plugins[a.name] = a
}

function isPlugin(a) {
	return a && plugins.hasOwnProperty(a)
}

function getPluginName(a) {
	var b, c;
	for(b in plugins)
		if(isPlugin(b) && (c = "," + plugins[b].ext.join(",") + ",", c.indexOf("," + a + ",") > -1)) return b
}

function xhr(a, b) {
	var c = global.XMLHttpRequest ? new global.XMLHttpRequest : new global.ActiveXObject("Microsoft.XMLHTTP");
	return c.open("GET", a, !0), c.onreadystatechange = function() {
		if(4 === c.readyState) {
			if(c.status > 399 && c.status < 600) throw new Error("Could not load: " + a + ", status = " + c.status);
			b(c.responseText)
		}
	}, c.send(null)
}

function globalEval(a) {
	a && /\S/.test(a) && (global.execScript || function(a) {
		(global.eval || eval).call(global, a)
	})(a)
}

function jsEscape(a) {
	return a.replace(/(["\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
}

function pure(a) {
	return a.replace(/\?.*$/, "")
}
var global = window,
	plugins = {},
	uriCache = {};
register({
	name: "text",
	ext: [".tpl", ".html"],
	exec: function(a, b) {
		globalEval('define("' + a + '#", [], "' + jsEscape(b) + '")')
	}
}), register({
	name: "json",
	ext: [".json"],
	exec: function(a, b) {
		globalEval('define("' + a + '#", [], ' + b + ")")
	}
}), register({
	name: "handlebars",
	ext: [".handlebars"],
	exec: function(a, b) {
		var c = ['define("' + a + '#", ["handlebars"], function(require, exports, module) {', '  var source = "' + jsEscape(b) + '"', '  var Handlebars = require("handlebars")["default"]', "  module.exports = function(data, options) {", "    options || (options = {})", "    options.helpers || (options.helpers = {})", "    for (var key in Handlebars.helpers) {", "      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]", "    }", "    return Handlebars.compile(source)(data, options)", "  }", "})"].join("\n");
		globalEval(c)
	}
}), seajs.on("resolve", function(a) {
	var c, d, e, b = a.id;
	return b ? ((d = b.match(/^(\w+)!(.+)$/)) && isPlugin(d[1]) ? (c = d[1], b = d[2]) : (d = b.match(/[^?]+(\.\w+)(?:\?|#|$)/)) && (c = getPluginName(d[1])), c && -1 === b.indexOf("#") && (b += "#"), e = seajs.resolve(b, a.refUri), c && (uriCache[e] = c), a.uri = e, void 0) : ""
}), seajs.on("request", function(a) {
	var b = uriCache[a.uri];
	b && (xhr(a.requestUri, function(c) {
		plugins[b].exec(a.uri, c), a.onRequest()
	}), a.requested = !0)
});