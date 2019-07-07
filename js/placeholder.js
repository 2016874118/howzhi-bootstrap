define("arale/placeholder/1.1.0/placeholder", ["$"], function(a, b, c) {
    var d, e = a("$"), f = function(a) {
        function b(b) {
            var c = {}
              , d = /^jQuery\d+$/;
            return a.each(b.attributes, function(a, b) {
                b.specified && !d.test(b.name) && (c[b.name] = b.value)
            }),
            c
        }
        function c(b, c) {
            var d = this
              , e = a(d);
            if ((d.value == e.attr("placeholder") || "" == d.value) && e.hasClass("placeholder"))
                if (e.data("placeholder-password")) {
                    if (e = e.hide().next().show().attr("id", e.removeAttr("id").data("placeholder-id")),
                    b === !0)
                        return e[0].value = c;
                    e.focus()
                } else
                    d.value = "",
                    e.removeClass("placeholder"),
                    d == document.activeElement && d.select()
        }
        function d() {
            var d, e = this, f = a(e), g = this.id;
            if ("" == a(e).val()) {
                if ("password" == e.type) {
                    if (!f.data("placeholder-textinput")) {
                        try {
                            d = f.clone().attr({
                                type: "text"
                            })
                        } catch (h) {
                            d = a("<input>").attr(a.extend(b(this), {
                                type: "text"
                            }))
                        }
                        d.removeAttr("name").data({
                            "placeholder-password": !0,
                            "placeholder-id": g
                        }).bind("focus.placeholder", c),
                        f.data({
                            "placeholder-textinput": d,
                            "placeholder-id": g
                        }).before(d)
                    }
                    f = f.removeAttr("id").hide().prev().attr("id", g).show()
                }
                f.addClass("placeholder"),
                f[0].value = f.attr("placeholder")
            } else
                f.removeClass("placeholder")
        }
        var e, f, g = "placeholder"in document.createElement("input"), h = "placeholder"in document.createElement("textarea"), i = {}, j = a.valHooks;
        if (g && h)
            f = i.placeholder = function() {
                return this
            }
            ,
            f.input = f.textarea = !0;
        else {
            if (f = i.placeholder = function() {
                var a = this;
                return a.filter((g ? "textarea" : ":input") + "[placeholder]").unbind({
                    "focus.placeholder": c,
                    "blur.placeholder": d
                }).bind({
                    "focus.placeholder": c,
                    "blur.placeholder": d
                }).data("placeholder-enabled", !0).trigger("blur.placeholder"),
                a
            }
            ,
            f.input = g,
            f.textarea = h,
            e = {
                get: function(b) {
                    var c = a(b);
                    return c.data("placeholder-enabled") && c.hasClass("placeholder") ? "" : b.value
                },
                set: function(b, e) {
                    var f = a(b);
                    return f.data("placeholder-enabled") ? ("" == e ? (b.value = e,
                    b != document.activeElement && d.call(b)) : f.hasClass("placeholder") ? c.call(b, !0, e) || (b.value = e) : b.value = e,
                    f) : b.value = e
                }
            },
            !g) {
                var k = j.input;
                j.input = k ? {
                    get: function() {
                        return k.get && k.get.apply(this, arguments),
                        e.get.apply(this, arguments)
                    },
                    set: function() {
                        return k.set && k.set.apply(this, arguments),
                        e.set.apply(this, arguments)
                    }
                } : e
            }
            if (!h) {
                var k = j.textarea;
                j.textarea = k ? {
                    get: function() {
                        return k.get && k.get.apply(this, arguments),
                        e.get.apply(this, arguments)
                    },
                    set: function() {
                        return k.set && k.set.apply(this, arguments),
                        e.set.apply(this, arguments)
                    }
                } : e
            }
            a(function() {
                a(document).delegate("form", "submit.placeholder", function() {
                    var b = a(".placeholder", this).each(c);
                    setTimeout(function() {
                        b.each(d)
                    }, 10)
                })
            }),
            a(window).bind("beforeunload.placeholder", function() {
                a(".placeholder").each(function() {
                    this.value = ""
                })
            })
        }
        return f
    }(e);
    d = f.input && f.textarea ? function() {}
    : function(a) {
        a || (a = e("input, textarea")),
        a && f.call(e(a))
    }
    ,
    d(),
    d.clear = function(a) {
        function b(a) {
            a.each(function(a, b) {
                b = e(b),
                b[0].value === b.attr("placeholder") && b.hasClass("placeholder") && (b[0].value = "")
            })
        }
        a = e(a),
        "FORM" === a[0].tagName ? b(a.find("input.placeholder, textarea.placeholder")) : b(a)
    }
    ,
    c.exports = d
});
