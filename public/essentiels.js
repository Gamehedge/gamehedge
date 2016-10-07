(function(i) {
    var e = "0.4.2",
        j = "hasOwnProperty",
        b = /[\.\/]/,
        a = "*",
        g = function() {},
        f = function(m, l) {
            return m - l
        },
        d, h, k = {
            n: {}
        },
        c = function(m, C) {
            m = String(m);
            var v = k,
                s = h,
                w = Array.prototype.slice.call(arguments, 2),
                y = c.listeners(m),
                x = 0,
                u = false,
                p, o = [],
                t = {},
                q = [],
                n = d,
                A = [];
            d = m;
            h = 0;
            for (var r = 0, B = y.length; r < B; r++) {
                if ("zIndex" in y[r]) {
                    o.push(y[r].zIndex);
                    if (y[r].zIndex < 0) {
                        t[y[r].zIndex] = y[r]
                    }
                }
            }
            o.sort(f);
            while (o[x] < 0) {
                p = t[o[x++]];
                q.push(p.apply(C, w));
                if (h) {
                    h = s;
                    return q
                }
            }
            for (r = 0; r < B; r++) {
                p = y[r];
                if ("zIndex" in p) {
                    if (p.zIndex == o[x]) {
                        q.push(p.apply(C, w));
                        if (h) {
                            break
                        }
                        do {
                            x++;
                            p = t[o[x]];
                            p && q.push(p.apply(C, w));
                            if (h) {
                                break
                            }
                        } while (p)
                    } else {
                        t[p.zIndex] = p
                    }
                } else {
                    q.push(p.apply(C, w));
                    if (h) {
                        break
                    }
                }
            }
            h = s;
            d = n;
            return q.length ? q : null
        };
    c._events = k;
    c.listeners = function(l) {
        var t = l.split(b),
            r = k,
            x, s, m, p, w, o, q, u, v = [r],
            n = [];
        for (p = 0, w = t.length; p < w; p++) {
            u = [];
            for (o = 0, q = v.length; o < q; o++) {
                r = v[o].n;
                s = [r[t[p]], r[a]];
                m = 2;
                while (m--) {
                    x = s[m];
                    if (x) {
                        u.push(x);
                        n = n.concat(x.f || [])
                    }
                }
            }
            v = u
        }
        return n
    };
    c.on = function(l, o) {
        l = String(l);
        if (typeof o != "function") {
            return function() {}
        }
        var q = l.split(b),
            p = k;
        for (var m = 0, n = q.length; m < n; m++) {
            p = p.n;
            p = p.hasOwnProperty(q[m]) && p[q[m]] || (p[q[m]] = {
                n: {}
            })
        }
        p.f = p.f || [];
        for (m = 0, n = p.f.length; m < n; m++) {
            if (p.f[m] == o) {
                return g
            }
        }
        p.f.push(o);
        return function(r) {
            if (+r == +r) {
                o.zIndex = +r
            }
        }
    };
    c.f = function(m) {
        var l = [].slice.call(arguments, 1);
        return function() {
            c.apply(null, [m, null].concat(l).concat([].slice.call(arguments, 0)))
        }
    };
    c.stop = function() {
        h = 1
    };
    c.nt = function(l) {
        if (l) {
            return new RegExp("(?:\\.|\\/|^)" + l + "(?:\\.|\\/|$)").test(d)
        }
        return d
    };
    c.nts = function() {
        return d.split(b)
    };
    c.off = c.unbind = function(m, r) {
        if (!m) {
            c._events = k = {
                n: {}
            };
            return
        }
        var t = m.split(b),
            s, v, n, p, w, o, q, u = [k];
        for (p = 0, w = t.length; p < w; p++) {
            for (o = 0; o < u.length; o += n.length - 2) {
                n = [o, 1];
                s = u[o].n;
                if (t[p] != a) {
                    if (s[t[p]]) {
                        n.push(s[t[p]])
                    }
                } else {
                    for (v in s) {
                        if (s[j](v)) {
                            n.push(s[v])
                        }
                    }
                }
                u.splice.apply(u, n)
            }
        }
        for (p = 0, w = u.length; p < w; p++) {
            s = u[p];
            while (s.n) {
                if (r) {
                    if (s.f) {
                        for (o = 0, q = s.f.length; o < q; o++) {
                            if (s.f[o] == r) {
                                s.f.splice(o, 1);
                                break
                            }
                        }!s.f.length && delete s.f
                    }
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            var l = s.n[v].f;
                            for (o = 0, q = l.length; o < q; o++) {
                                if (l[o] == r) {
                                    l.splice(o, 1);
                                    break
                                }
                            }!l.length && delete s.n[v].f
                        }
                    }
                } else {
                    delete s.f;
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            delete s.n[v].f
                        }
                    }
                }
                s = s.n
            }
        }
    };
    c.once = function(l, m) {
        var n = function() {
            c.unbind(l, n);
            return m.apply(this, arguments)
        };
        return c.on(l, n)
    };
    c.version = e;
    c.toString = function() {
        return "You are running Eve " + e
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = c) : (typeof define != "undefined" ? (define("eve", [], function() {
        return c
    })) : (i.eve = c))
})(this);
(function(b, a) {
    if (typeof define === "function" && define.amd) {
        define(["eve"], function(c) {
            return a(b, c)
        })
    } else {
        a(b, b.eve)
    }
}(this, function(aT, bc) {
    function bi(g) {
        if (bi.is(g, "function")) {
            return K ? g() : bc.on("raphael.DOMload", g)
        } else {
            if (bi.is(g, u)) {
                return bi._engine.create[bs](bi, g.splice(0, 3 + bi.is(g[0], bj))).add(g)
            } else {
                var b = Array.prototype.slice.call(arguments, 0);
                if (bi.is(b[b.length - 1], "function")) {
                    var d = b.pop();
                    return K ? d.call(bi._engine.create[bs](bi, b)) : bc.on("raphael.DOMload", function() {
                        d.call(bi._engine.create[bs](bi, b))
                    })
                } else {
                    return bi._engine.create[bs](bi, arguments)
                }
            }
        }
    }
    bi.version = "2.1.0";
    bi.eve = bc;
    var K, bv = /[, ]+/,
        au = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        W = /\{(\d+)\}/g,
        bz = "prototype",
        bw = "hasOwnProperty",
        a5 = {
            doc: document,
            win: aT
        },
        aE = {
            was: Object.prototype[bw].call(a5.win, "Raphael"),
            is: a5.win.Raphael
        },
        bJ = function() {
            this.ca = this.customAttributes = {}
        },
        ao, bA = "appendChild",
        bs = "apply",
        av = "concat",
        O = ("ontouchstart" in a5.win) || a5.win.DocumentTouch && a5.doc instanceof DocumentTouch,
        bn = "",
        bh = " ",
        k = String,
        l = "split",
        bB = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [l](bh),
        bp = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        aj = k.prototype.toLowerCase,
        aI = Math,
        bI = aI.max,
        ai = aI.min,
        ak = aI.abs,
        aS = aI.pow,
        ag = aI.PI,
        bj = "number",
        a = "string",
        u = "array",
        s = "toString",
        A = "fill",
        aM = Object.prototype.toString,
        bC = {},
        r = "push",
        aa = bi._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        Z = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        B = {
            "NaN": 1,
            "Infinity": 1,
            "-Infinity": 1
        },
        an = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        C = aI.round,
        P = "setAttribute",
        bM = parseFloat,
        bK = parseInt,
        aU = k.prototype.toUpperCase,
        bq = bi._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        bo = bi._availableAnimAttrs = {
            blur: bj,
            "clip-rect": "csv",
            cx: bj,
            cy: bj,
            fill: "colour",
            "fill-opacity": bj,
            "font-size": bj,
            height: bj,
            opacity: bj,
            path: "path",
            r: bj,
            rx: bj,
            ry: bj,
            stroke: "colour",
            "stroke-opacity": bj,
            "stroke-width": bj,
            transform: "transform",
            width: bj,
            x: bj,
            y: bj
        },
        bt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        bf = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        ax = {
            hs: 1,
            rg: 1
        },
        aN = /,?([achlmqrstvxz]),?/gi,
        bg = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        ac = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        ap = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        a2 = bi._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        M = {},
        x = function(g, d) {
            return g.key - d.key
        },
        bu = function(g, d) {
            return bM(g) - bM(d)
        },
        ad = function() {},
        aw = function(b) {
            return b
        },
        q = bi._rectPath = function(b, E, d, g, i) {
            if (i) {
                return [
                    ["M", b + i, E],
                    ["l", d - i * 2, 0],
                    ["a", i, i, 0, 0, 1, i, i],
                    ["l", 0, g - i * 2],
                    ["a", i, i, 0, 0, 1, -i, i],
                    ["l", i * 2 - d, 0],
                    ["a", i, i, 0, 0, 1, -i, -i],
                    ["l", 0, i * 2 - g],
                    ["a", i, i, 0, 0, 1, i, -i],
                    ["z"]
                ]
            }
            return [
                ["M", b, E],
                ["l", d, 0],
                ["l", 0, g],
                ["l", -d, 0],
                ["z"]
            ]
        },
        U = function(b, i, g, d) {
            if (d == null) {
                d = g
            }
            return [
                ["M", b, i],
                ["m", 0, -d],
                ["a", g, d, 0, 1, 1, 0, 2 * d],
                ["a", g, d, 0, 1, 1, 0, -2 * d],
                ["z"]
            ]
        },
        af = bi._getPath = {
            path: function(b) {
                return b.attr("path")
            },
            circle: function(d) {
                var b = d.attrs;
                return U(b.cx, b.cy, b.r)
            },
            ellipse: function(d) {
                var b = d.attrs;
                return U(b.cx, b.cy, b.rx, b.ry)
            },
            rect: function(d) {
                var b = d.attrs;
                return q(b.x, b.y, b.width, b.height, b.r)
            },
            image: function(d) {
                var b = d.attrs;
                return q(b.x, b.y, b.width, b.height)
            },
            text: function(b) {
                var d = b._getBBox();
                return q(d.x, d.y, d.width, d.height)
            },
            set: function(b) {
                var d = b._getBBox();
                return q(d.x, d.y, d.width, d.height)
            }
        },
        Q = bi.mapPath = function(bQ, S) {
            if (!S) {
                return bQ
            }
            var bO, R, g, b, bP, E, d;
            bQ = bk(bQ);
            for (g = 0, bP = bQ.length; g < bP; g++) {
                d = bQ[g];
                for (b = 1, E = d.length; b < E; b += 2) {
                    bO = S.x(d[b], d[b + 1]);
                    R = S.y(d[b], d[b + 1]);
                    d[b] = bO;
                    d[b + 1] = R
                }
            }
            return bQ
        };
    bi._g = a5;
    bi.type = (a5.win.SVGAngle || a5.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (bi.type == "VML") {
        var a7 = a5.doc.createElement("div"),
            a8;
        a7.innerHTML = '<v:shape adj="1"/>';
        a8 = a7.firstChild;
        a8.style.behavior = "url(#default#VML)";
        if (!(a8 && typeof a8.adj == "object")) {
            return (bi.type = bn)
        }
        a7 = null
    }
    bi.svg = !(bi.vml = bi.type == "VML");
    bi._Paper = bJ;
    bi.fn = ao = bJ.prototype = bi.prototype;
    bi._id = 0;
    bi._oid = 0;
    bi.is = function(d, b) {
        b = aj.call(b);
        if (b == "finite") {
            return !B[bw](+d)
        }
        if (b == "array") {
            return d instanceof Array
        }
        return (b == "null" && d === null) || (b == typeof d && d !== null) || (b == "object" && d === Object(d)) || (b == "array" && Array.isArray && Array.isArray(d)) || aM.call(d).slice(8, -1).toLowerCase() == b
    };

    function bl(g) {
        if (Object(g) !== g) {
            return g
        }
        var d = new g.constructor;
        for (var b in g) {
            if (g[bw](b)) {
                d[b] = bl(g[b])
            }
        }
        return d
    }
    bi.angle = function(E, S, g, R, d, i) {
        if (d == null) {
            var b = E - g,
                bO = S - R;
            if (!b && !bO) {
                return 0
            }
            return (180 + aI.atan2(-bO, -b) * 180 / ag + 360) % 360
        } else {
            return bi.angle(E, S, d, i) - bi.angle(g, R, d, i)
        }
    };
    bi.rad = function(b) {
        return b % 360 * ag / 180
    };
    bi.deg = function(b) {
        return b * 180 / ag % 360
    };
    bi.snapTo = function(d, E, b) {
        b = bi.is(b, "finite") ? b : 10;
        if (bi.is(d, u)) {
            var g = d.length;
            while (g--) {
                if (ak(d[g] - E) <= b) {
                    return d[g]
                }
            }
        } else {
            d = +d;
            var R = E % d;
            if (R < b) {
                return E - R
            }
            if (R > d - b) {
                return E - R + d
            }
        }
        return E
    };
    var aQ = bi.createUUID = (function(b, d) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, d).toUpperCase()
        }
    })(/[xy]/g, function(g) {
        var d = aI.random() * 16 | 0,
            b = g == "x" ? d : (d & 3 | 8);
        return b.toString(16)
    });
    bi.setWindow = function(b) {
        bc("raphael.setWindow", bi, a5.win, b);
        a5.win = b;
        a5.doc = a5.win.document;
        if (bi._engine.initWin) {
            bi._engine.initWin(a5.win)
        }
    };
    var J = function(g) {
            if (bi.vml) {
                var b = /^\s+|\s+$/g;
                var R;
                try {
                    var S = new ActiveXObject("htmlfile");
                    S.write("<body>");
                    S.close();
                    R = S.body
                } catch (bO) {
                    R = createPopup().document.body
                }
                var d = R.createTextRange();
                J = H(function(i) {
                    try {
                        R.style.color = k(i).replace(b, bn);
                        var bP = d.queryCommandValue("ForeColor");
                        bP = ((bP & 255) << 16) | (bP & 65280) | ((bP & 16711680) >>> 16);
                        return "#" + ("000000" + bP.toString(16)).slice(-6)
                    } catch (bQ) {
                        return "none"
                    }
                })
            } else {
                var E = a5.doc.createElement("i");
                E.title = "Rapha\xebl Colour Picker";
                E.style.display = "none";
                a5.doc.body.appendChild(E);
                J = H(function(i) {
                    E.style.color = i;
                    return a5.doc.defaultView.getComputedStyle(E, bn).getPropertyValue("color")
                })
            }
            return J(g)
        },
        az = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        bm = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        w = function() {
            return this.hex
        },
        G = function(R, E, d) {
            if (E == null && bi.is(R, "object") && "r" in R && "g" in R && "b" in R) {
                d = R.b;
                E = R.g;
                R = R.r
            }
            if (E == null && bi.is(R, a)) {
                var i = bi.getRGB(R);
                R = i.r;
                E = i.g;
                d = i.b
            }
            if (R > 1 || E > 1 || d > 1) {
                R /= 255;
                E /= 255;
                d /= 255
            }
            return [R, E, d]
        },
        N = function(R, E, d, S) {
            R *= 255;
            E *= 255;
            d *= 255;
            var i = {
                r: R,
                g: E,
                b: d,
                hex: bi.rgb(R, E, d),
                toString: w
            };
            bi.is(S, "finite") && (i.opacity = S);
            return i
        };
    bi.color = function(b) {
        var d;
        if (bi.is(b, "object") && "h" in b && "s" in b && "b" in b) {
            d = bi.hsb2rgb(b);
            b.r = d.r;
            b.g = d.g;
            b.b = d.b;
            b.hex = d.hex
        } else {
            if (bi.is(b, "object") && "h" in b && "s" in b && "l" in b) {
                d = bi.hsl2rgb(b);
                b.r = d.r;
                b.g = d.g;
                b.b = d.b;
                b.hex = d.hex
            } else {
                if (bi.is(b, "string")) {
                    b = bi.getRGB(b)
                }
                if (bi.is(b, "object") && "r" in b && "g" in b && "b" in b) {
                    d = bi.rgb2hsl(b);
                    b.h = d.h;
                    b.s = d.s;
                    b.l = d.l;
                    d = bi.rgb2hsb(b);
                    b.v = d.b
                } else {
                    b = {
                        hex: "none"
                    };
                    b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1
                }
            }
        }
        b.toString = w;
        return b
    };
    bi.hsb2rgb = function(S, bQ, bO, i) {
        if (this.is(S, "object") && "h" in S && "s" in S && "b" in S) {
            bO = S.b;
            bQ = S.s;
            S = S.h;
            i = S.o
        }
        S *= 360;
        var E, bP, d, g, b;
        S = (S % 360) / 60;
        b = bO * bQ;
        g = b * (1 - ak(S % 2 - 1));
        E = bP = d = bO - b;
        S = ~~S;
        E += [b, g, 0, 0, g, b][S];
        bP += [g, b, b, g, 0, 0][S];
        d += [0, 0, g, b, b, g][S];
        return N(E, bP, d, i)
    };
    bi.hsl2rgb = function(bO, bQ, E, i) {
        if (this.is(bO, "object") && "h" in bO && "s" in bO && "l" in bO) {
            E = bO.l;
            bQ = bO.s;
            bO = bO.h
        }
        if (bO > 1 || bQ > 1 || E > 1) {
            bO /= 360;
            bQ /= 100;
            E /= 100
        }
        bO *= 360;
        var S, bP, d, g, b;
        bO = (bO % 360) / 60;
        b = 2 * bQ * (E < 0.5 ? E : 1 - E);
        g = b * (1 - ak(bO % 2 - 1));
        S = bP = d = E - b / 2;
        bO = ~~bO;
        S += [b, g, 0, 0, g, b][bO];
        bP += [g, b, b, g, 0, 0][bO];
        d += [0, 0, g, b, b, g][bO];
        return N(S, bP, d, i)
    };
    bi.rgb2hsb = function(bP, bO, d) {
        d = G(bP, bO, d);
        bP = d[0];
        bO = d[1];
        d = d[2];
        var R, E, i, bQ;
        i = bI(bP, bO, d);
        bQ = i - ai(bP, bO, d);
        R = (bQ == 0 ? null : i == bP ? (bO - d) / bQ : i == bO ? (d - bP) / bQ + 2 : (bP - bO) / bQ + 4);
        R = ((R + 360) % 6) * 60 / 360;
        E = bQ == 0 ? 0 : bQ / i;
        return {
            h: R,
            s: E,
            b: i,
            toString: az
        }
    };
    bi.rgb2hsl = function(d, bO, bR) {
        bR = G(d, bO, bR);
        d = bR[0];
        bO = bR[1];
        bR = bR[2];
        var bS, R, bQ, bP, E, i;
        bP = bI(d, bO, bR);
        E = ai(d, bO, bR);
        i = bP - E;
        bS = (i == 0 ? null : bP == d ? (bO - bR) / i : bP == bO ? (bR - d) / i + 2 : (d - bO) / i + 4);
        bS = ((bS + 360) % 6) * 60 / 360;
        bQ = (bP + E) / 2;
        R = (i == 0 ? 0 : bQ < 0.5 ? i / (2 * bQ) : i / (2 - 2 * bQ));
        return {
            h: bS,
            s: R,
            l: bQ,
            toString: bm
        }
    };
    bi._path2string = function() {
        return this.join(",").replace(aN, "$1")
    };

    function c(E, g) {
        for (var b = 0, d = E.length; b < d; b++) {
            if (E[b] === g) {
                return E.push(E.splice(b, 1)[0])
            }
        }
    }

    function H(i, d, b) {
        function g() {
            var E = Array.prototype.slice.call(arguments, 0),
                S = E.join("\u2400"),
                R = g.cache = g.cache || {},
                bO = g.count = g.count || [];
            if (R[bw](S)) {
                c(bO, S);
                return b ? b(R[S]) : R[S]
            }
            bO.length >= 1000 && delete R[bO.shift()];
            bO.push(S);
            R[S] = i[bs](d, E);
            return b ? b(R[S]) : R[S]
        }
        return g
    }
    var D = bi._preload = function(g, d) {
        var b = a5.doc.createElement("img");
        b.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        b.onload = function() {
            d.call(this);
            this.onload = null;
            a5.doc.body.removeChild(this)
        };
        b.onerror = function() {
            a5.doc.body.removeChild(this)
        };
        a5.doc.body.appendChild(b);
        b.src = g
    };

    function h() {
        return this.hex
    }
    bi.getRGB = H(function(b) {
        if (!b || !!((b = k(b)).indexOf("-") + 1)) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: h
            }
        }
        if (b == "none") {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: h
            }
        }!(ax[bw](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = J(b));
        var E, d, g, S, i, bP, bO, R = b.match(Z);
        if (R) {
            if (R[2]) {
                S = bK(R[2].substring(5), 16);
                g = bK(R[2].substring(3, 5), 16);
                d = bK(R[2].substring(1, 3), 16)
            }
            if (R[3]) {
                S = bK((bP = R[3].charAt(3)) + bP, 16);
                g = bK((bP = R[3].charAt(2)) + bP, 16);
                d = bK((bP = R[3].charAt(1)) + bP, 16)
            }
            if (R[4]) {
                bO = R[4][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                R[1].toLowerCase().slice(0, 4) == "rgba" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100)
            }
            if (R[5]) {
                bO = R[5][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                (bO[0].slice(-3) == "deg" || bO[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsba" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100);
                return bi.hsb2rgb(d, g, S, i)
            }
            if (R[6]) {
                bO = R[6][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                (bO[0].slice(-3) == "deg" || bO[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsla" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100);
                return bi.hsl2rgb(d, g, S, i)
            }
            R = {
                r: d,
                g: g,
                b: S,
                toString: h
            };
            R.hex = "#" + (16777216 | S | (g << 8) | (d << 16)).toString(16).slice(1);
            bi.is(i, "finite") && (R.opacity = i);
            return R
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: h
        }
    }, bi);
    bi.hsb = H(function(i, g, d) {
        return bi.hsb2rgb(i, g, d).hex
    });
    bi.hsl = H(function(g, d, b) {
        return bi.hsl2rgb(g, d, b).hex
    });
    bi.rgb = H(function(E, i, d) {
        return "#" + (16777216 | d | (i << 8) | (E << 16)).toString(16).slice(1)
    });
    bi.getColor = function(d) {
        var g = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: d || 0.75
            },
            b = this.hsb2rgb(g.h, g.s, g.b);
        g.h += 0.075;
        if (g.h > 1) {
            g.h = 0;
            g.s -= 0.2;
            g.s <= 0 && (this.getColor.start = {
                h: 0,
                s: 1,
                b: g.b
            })
        }
        return b.hex
    };
    bi.getColor.reset = function() {
        delete this.start
    };

    function am(E, bO) {
        var S = [];
        for (var g = 0, b = E.length; b - 2 * !bO > g; g += 2) {
            var R = [{
                x: +E[g - 2],
                y: +E[g - 1]
            }, {
                x: +E[g],
                y: +E[g + 1]
            }, {
                x: +E[g + 2],
                y: +E[g + 3]
            }, {
                x: +E[g + 4],
                y: +E[g + 5]
            }];
            if (bO) {
                if (!g) {
                    R[0] = {
                        x: +E[b - 2],
                        y: +E[b - 1]
                    }
                } else {
                    if (b - 4 == g) {
                        R[3] = {
                            x: +E[0],
                            y: +E[1]
                        }
                    } else {
                        if (b - 2 == g) {
                            R[2] = {
                                x: +E[0],
                                y: +E[1]
                            };
                            R[3] = {
                                x: +E[2],
                                y: +E[3]
                            }
                        }
                    }
                }
            } else {
                if (b - 4 == g) {
                    R[3] = R[2]
                } else {
                    if (!g) {
                        R[0] = {
                            x: +E[g],
                            y: +E[g + 1]
                        }
                    }
                }
            }
            S.push(["C", (-R[0].x + 6 * R[1].x + R[2].x) / 6, (-R[0].y + 6 * R[1].y + R[2].y) / 6, (R[1].x + 6 * R[2].x - R[3].x) / 6, (R[1].y + 6 * R[2].y - R[3].y) / 6, R[2].x, R[2].y])
        }
        return S
    }
    bi.parsePathString = function(b) {
        if (!b) {
            return null
        }
        var g = aR(b);
        if (g.arr) {
            return aY(g.arr)
        }
        var i = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            d = [];
        if (bi.is(b, u) && bi.is(b[0], u)) {
            d = aY(b)
        }
        if (!d.length) {
            k(b).replace(bg, function(R, E, bP) {
                var bO = [],
                    S = E.toLowerCase();
                bP.replace(ap, function(bR, bQ) {
                    bQ && bO.push(+bQ)
                });
                if (S == "m" && bO.length > 2) {
                    d.push([E][av](bO.splice(0, 2)));
                    S = "l";
                    E = E == "m" ? "l" : "L"
                }
                if (S == "r") {
                    d.push([E][av](bO))
                } else {
                    while (bO.length >= i[S]) {
                        d.push([E][av](bO.splice(0, i[S])));
                        if (!i[S]) {
                            break
                        }
                    }
                }
            })
        }
        d.toString = bi._path2string;
        g.arr = aY(d);
        return d
    };
    bi.parseTransformString = H(function(d) {
        if (!d) {
            return null
        }
        var g = {
                r: 3,
                s: 4,
                t: 2,
                m: 6
            },
            b = [];
        if (bi.is(d, u) && bi.is(d[0], u)) {
            b = aY(d)
        }
        if (!b.length) {
            k(d).replace(ac, function(E, i, bO) {
                var S = [],
                    R = aj.call(i);
                bO.replace(ap, function(bQ, bP) {
                    bP && S.push(+bP)
                });
                b.push([i][av](S))
            })
        }
        b.toString = bi._path2string;
        return b
    });
    var aR = function(d) {
        var b = aR.ps = aR.ps || {};
        if (b[d]) {
            b[d].sleep = 100
        } else {
            b[d] = {
                sleep: 100
            }
        }
        setTimeout(function() {
            for (var g in b) {
                if (b[bw](g) && g != d) {
                    b[g].sleep--;
                    !b[g].sleep && delete b[g]
                }
            }
        });
        return b[d]
    };
    bi.findDotsAtSegment = function(d, b, b5, b3, S, E, bQ, bO, bY) {
        var bV = 1 - bY,
            b0 = aS(bV, 3),
            b1 = aS(bV, 2),
            bS = bY * bY,
            bP = bS * bY,
            bU = b0 * d + b1 * 3 * bY * b5 + bV * 3 * bY * bY * S + bP * bQ,
            bR = b0 * b + b1 * 3 * bY * b3 + bV * 3 * bY * bY * E + bP * bO,
            bZ = d + 2 * bY * (b5 - d) + bS * (S - 2 * b5 + d),
            bX = b + 2 * bY * (b3 - b) + bS * (E - 2 * b3 + b),
            b4 = b5 + 2 * bY * (S - b5) + bS * (bQ - 2 * S + b5),
            b2 = b3 + 2 * bY * (E - b3) + bS * (bO - 2 * E + b3),
            bW = bV * d + bY * b5,
            bT = bV * b + bY * b3,
            i = bV * S + bY * bQ,
            g = bV * E + bY * bO,
            R = (90 - aI.atan2(bZ - b4, bX - b2) * 180 / ag);
        (bZ > b4 || bX < b2) && (R += 180);
        return {
            x: bU,
            y: bR,
            m: {
                x: bZ,
                y: bX
            },
            n: {
                x: b4,
                y: b2
            },
            start: {
                x: bW,
                y: bT
            },
            end: {
                x: i,
                y: g
            },
            alpha: R
        }
    };
    bi.bezierBBox = function(d, b, i, g, bP, S, R, E) {
        if (!bi.is(d, "array")) {
            d = [d, b, i, g, bP, S, R, E]
        }
        var bO = aX.apply(null, d);
        return {
            x: bO.min.x,
            y: bO.min.y,
            x2: bO.max.x,
            y2: bO.max.y,
            width: bO.max.x - bO.min.x,
            height: bO.max.y - bO.min.y
        }
    };
    bi.isPointInsideBBox = function(d, b, g) {
        return b >= d.x && b <= d.x2 && g >= d.y && g <= d.y2
    };
    bi.isBBoxIntersect = function(g, d) {
        var b = bi.isPointInsideBBox;
        return b(d, g.x, g.y) || b(d, g.x2, g.y) || b(d, g.x, g.y2) || b(d, g.x2, g.y2) || b(g, d.x, d.y) || b(g, d.x2, d.y) || b(g, d.x, d.y2) || b(g, d.x2, d.y2) || (g.x < d.x2 && g.x > d.x || d.x < g.x2 && d.x > g.x) && (g.y < d.y2 && g.y > d.y || d.y < g.y2 && d.y > g.y)
    };

    function aC(b, S, R, E, i) {
        var g = -3 * S + 9 * R - 9 * E + 3 * i,
            d = b * g + 6 * S - 12 * R + 6 * E;
        return b * d - 3 * S + 3 * R
    }

    function bb(bZ, R, bY, g, bX, d, bU, b, bR) {
        if (bR == null) {
            bR = 1
        }
        bR = bR > 1 ? 1 : bR < 0 ? 0 : bR;
        var bS = bR / 2,
            bT = 12,
            bO = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
            bW = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
            E = 0;
        for (var bV = 0; bV < bT; bV++) {
            var bP = bS * bO[bV] + bS,
                bQ = aC(bP, bZ, bY, bX, bU),
                b0 = aC(bP, R, g, d, b),
                S = bQ * bQ + b0 * b0;
            E += bW[bV] * aI.sqrt(S)
        }
        return bS * E
    }

    function aK(g, bS, d, bR, b, bP, bU, bO, bQ) {
        if (bQ < 0 || bb(g, bS, d, bR, b, bP, bU, bO) < bQ) {
            return
        }
        var bT = 1,
            i = bT / 2,
            R = bT - i,
            E, S = 0.01;
        E = bb(g, bS, d, bR, b, bP, bU, bO, R);
        while (ak(E - bQ) > S) {
            i /= 2;
            R += (E < bQ ? 1 : -1) * i;
            E = bb(g, bS, d, bR, b, bP, bU, bO, R)
        }
        return R
    }

    function a4(i, bT, g, bR, b, bQ, bV, bP) {
        if (bI(i, g) < ai(b, bV) || ai(i, g) > bI(b, bV) || bI(bT, bR) < ai(bQ, bP) || ai(bT, bR) > bI(bQ, bP)) {
            return
        }
        var bO = (i * bR - bT * g) * (b - bV) - (i - g) * (b * bP - bQ * bV),
            S = (i * bR - bT * g) * (bQ - bP) - (bT - bR) * (b * bP - bQ * bV),
            E = (i - g) * (bQ - bP) - (bT - bR) * (b - bV);
        if (!E) {
            return
        }
        var bU = bO / E,
            bS = S / E,
            R = +bU.toFixed(2),
            d = +bS.toFixed(2);
        if (R < +ai(i, g).toFixed(2) || R > +bI(i, g).toFixed(2) || R < +ai(b, bV).toFixed(2) || R > +bI(b, bV).toFixed(2) || d < +ai(bT, bR).toFixed(2) || d > +bI(bT, bR).toFixed(2) || d < +ai(bQ, bP).toFixed(2) || d > +bI(bQ, bP).toFixed(2)) {
            return
        }
        return {
            x: bU,
            y: bS
        }
    }

    function aV(d, b) {
        return aP(d, b)
    }

    function aL(d, b) {
        return aP(d, b, 1)
    }

    function aP(b5, b4, b3) {
        var E = bi.bezierBBox(b5),
            d = bi.bezierBBox(b4);
        if (!bi.isBBoxIntersect(E, d)) {
            return b3 ? 0 : []
        }
        var bY = bb.apply(0, b5),
            bX = bb.apply(0, b4),
            bP = ~~(bY / 5),
            bO = ~~(bX / 5),
            bV = [],
            bU = [],
            g = {},
            b6 = b3 ? 0 : [];
        for (var b0 = 0; b0 < bP + 1; b0++) {
            var bW = bi.findDotsAtSegment.apply(bi, b5.concat(b0 / bP));
            bV.push({
                x: bW.x,
                y: bW.y,
                t: b0 / bP
            })
        }
        for (b0 = 0; b0 < bO + 1; b0++) {
            bW = bi.findDotsAtSegment.apply(bi, b4.concat(b0 / bO));
            bU.push({
                x: bW.x,
                y: bW.y,
                t: b0 / bO
            })
        }
        for (b0 = 0; b0 < bP; b0++) {
            for (var bZ = 0; bZ < bO; bZ++) {
                var b2 = bV[b0],
                    b = bV[b0 + 1],
                    b1 = bU[bZ],
                    S = bU[bZ + 1],
                    bT = ak(b.x - b2.x) < 0.001 ? "y" : "x",
                    bS = ak(S.x - b1.x) < 0.001 ? "y" : "x",
                    R = a4(b2.x, b2.y, b.x, b.y, b1.x, b1.y, S.x, S.y);
                if (R) {
                    if (g[R.x.toFixed(4)] == R.y.toFixed(4)) {
                        continue
                    }
                    g[R.x.toFixed(4)] = R.y.toFixed(4);
                    var bR = b2.t + ak((R[bT] - b2[bT]) / (b[bT] - b2[bT])) * (b.t - b2.t),
                        bQ = b1.t + ak((R[bS] - b1[bS]) / (S[bS] - b1[bS])) * (S.t - b1.t);
                    if (bR >= 0 && bR <= 1 && bQ >= 0 && bQ <= 1) {
                        if (b3) {
                            b6++
                        } else {
                            b6.push({
                                x: R.x,
                                y: R.y,
                                t1: bR,
                                t2: bQ
                            })
                        }
                    }
                }
            }
        }
        return b6
    }
    bi.pathIntersection = function(d, b) {
        return bE(d, b)
    };
    bi.pathIntersectionNumber = function(d, b) {
        return bE(d, b, 1)
    };

    function bE(g, b, bZ) {
        g = bi._path2curve(g);
        b = bi._path2curve(b);
        var bX, S, bW, E, bU, bO, d, bR, b3, b2, b4 = bZ ? 0 : [];
        for (var bV = 0, bP = g.length; bV < bP; bV++) {
            var b1 = g[bV];
            if (b1[0] == "M") {
                bX = bU = b1[1];
                S = bO = b1[2]
            } else {
                if (b1[0] == "C") {
                    b3 = [bX, S].concat(b1.slice(1));
                    bX = b3[6];
                    S = b3[7]
                } else {
                    b3 = [bX, S, bX, S, bU, bO, bU, bO];
                    bX = bU;
                    S = bO
                }
                for (var bT = 0, bY = b.length; bT < bY; bT++) {
                    var b0 = b[bT];
                    if (b0[0] == "M") {
                        bW = d = b0[1];
                        E = bR = b0[2]
                    } else {
                        if (b0[0] == "C") {
                            b2 = [bW, E].concat(b0.slice(1));
                            bW = b2[6];
                            E = b2[7]
                        } else {
                            b2 = [bW, E, bW, E, d, bR, d, bR];
                            bW = d;
                            E = bR
                        }
                        var bQ = aP(b3, b2, bZ);
                        if (bZ) {
                            b4 += bQ
                        } else {
                            for (var bS = 0, R = bQ.length; bS < R; bS++) {
                                bQ[bS].segment1 = bV;
                                bQ[bS].segment2 = bT;
                                bQ[bS].bez1 = b3;
                                bQ[bS].bez2 = b2
                            }
                            b4 = b4.concat(bQ)
                        }
                    }
                }
            }
        }
        return b4
    }
    bi.isPointInsidePath = function(d, b, i) {
        var g = bi.pathBBox(d);
        return bi.isPointInsideBBox(g, b, i) && bE(d, [
            ["M", b, i],
            ["H", g.x2 + 10]
        ], 1) % 2 == 1
    };
    bi._removedFactory = function(b) {
        return function() {
            bc("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + b + "\u201d of removed object", b)
        }
    };
    var I = bi.pathBBox = function(bY) {
            var bR = aR(bY);
            if (bR.bbox) {
                return bl(bR.bbox)
            }
            if (!bY) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    x2: 0,
                    y2: 0
                }
            }
            bY = bk(bY);
            var bU = 0,
                bT = 0,
                S = [],
                g = [],
                E;
            for (var bP = 0, bX = bY.length; bP < bX; bP++) {
                E = bY[bP];
                if (E[0] == "M") {
                    bU = E[1];
                    bT = E[2];
                    S.push(bU);
                    g.push(bT)
                } else {
                    var bQ = aX(bU, bT, E[1], E[2], E[3], E[4], E[5], E[6]);
                    S = S[av](bQ.min.x, bQ.max.x);
                    g = g[av](bQ.min.y, bQ.max.y);
                    bU = E[5];
                    bT = E[6]
                }
            }
            var b = ai[bs](0, S),
                bV = ai[bs](0, g),
                bO = bI[bs](0, S),
                R = bI[bs](0, g),
                d = bO - b,
                bW = R - bV,
                bS = {
                    x: b,
                    y: bV,
                    x2: bO,
                    y2: R,
                    width: d,
                    height: bW,
                    cx: b + d / 2,
                    cy: bV + bW / 2
                };
            bR.bbox = bl(bS);
            return bS
        },
        aY = function(d) {
            var b = bl(d);
            b.toString = bi._path2string;
            return b
        },
        j = bi._pathToRelative = function(E) {
            var bP = aR(E);
            if (bP.rel) {
                return aY(bP.rel)
            }
            if (!bi.is(E, u) || !bi.is(E && E[0], u)) {
                E = bi.parsePathString(E)
            }
            var bS = [],
                bU = 0,
                bT = 0,
                bX = 0,
                bW = 0,
                g = 0;
            if (E[0][0] == "M") {
                bU = E[0][1];
                bT = E[0][2];
                bX = bU;
                bW = bT;
                g++;
                bS.push(["M", bU, bT])
            }
            for (var bO = g, bY = E.length; bO < bY; bO++) {
                var b = bS[bO] = [],
                    bV = E[bO];
                if (bV[0] != aj.call(bV[0])) {
                    b[0] = aj.call(bV[0]);
                    switch (b[0]) {
                        case "a":
                            b[1] = bV[1];
                            b[2] = bV[2];
                            b[3] = bV[3];
                            b[4] = bV[4];
                            b[5] = bV[5];
                            b[6] = +(bV[6] - bU).toFixed(3);
                            b[7] = +(bV[7] - bT).toFixed(3);
                            break;
                        case "v":
                            b[1] = +(bV[1] - bT).toFixed(3);
                            break;
                        case "m":
                            bX = bV[1];
                            bW = bV[2];
                        default:
                            for (var S = 1, bQ = bV.length; S < bQ; S++) {
                                b[S] = +(bV[S] - ((S % 2) ? bU : bT)).toFixed(3)
                            }
                    }
                } else {
                    b = bS[bO] = [];
                    if (bV[0] == "m") {
                        bX = bV[1] + bU;
                        bW = bV[2] + bT
                    }
                    for (var R = 0, d = bV.length; R < d; R++) {
                        bS[bO][R] = bV[R]
                    }
                }
                var bR = bS[bO].length;
                switch (bS[bO][0]) {
                    case "z":
                        bU = bX;
                        bT = bW;
                        break;
                    case "h":
                        bU += +bS[bO][bR - 1];
                        break;
                    case "v":
                        bT += +bS[bO][bR - 1];
                        break;
                    default:
                        bU += +bS[bO][bR - 2];
                        bT += +bS[bO][bR - 1]
                }
            }
            bS.toString = bi._path2string;
            bP.rel = aY(bS);
            return bS
        },
        p = bi._pathToAbsolute = function(bT) {
            var g = aR(bT);
            if (g.abs) {
                return aY(g.abs)
            }
            if (!bi.is(bT, u) || !bi.is(bT && bT[0], u)) {
                bT = bi.parsePathString(bT)
            }
            if (!bT || !bT.length) {
                return [
                    ["M", 0, 0]
                ]
            }
            var bZ = [],
                bO = 0,
                S = 0,
                bR = 0,
                bQ = 0,
                E = 0;
            if (bT[0][0] == "M") {
                bO = +bT[0][1];
                S = +bT[0][2];
                bR = bO;
                bQ = S;
                E++;
                bZ[0] = ["M", bO, S]
            }
            var bY = bT.length == 3 && bT[0][0] == "M" && bT[1][0].toUpperCase() == "R" && bT[2][0].toUpperCase() == "Z";
            for (var bS, b, bW = E, bP = bT.length; bW < bP; bW++) {
                bZ.push(bS = []);
                b = bT[bW];
                if (b[0] != aU.call(b[0])) {
                    bS[0] = aU.call(b[0]);
                    switch (bS[0]) {
                        case "A":
                            bS[1] = b[1];
                            bS[2] = b[2];
                            bS[3] = b[3];
                            bS[4] = b[4];
                            bS[5] = b[5];
                            bS[6] = +(b[6] + bO);
                            bS[7] = +(b[7] + S);
                            break;
                        case "V":
                            bS[1] = +b[1] + S;
                            break;
                        case "H":
                            bS[1] = +b[1] + bO;
                            break;
                        case "R":
                            var R = [bO, S][av](b.slice(1));
                            for (var bV = 2, bX = R.length; bV < bX; bV++) {
                                R[bV] = +R[bV] + bO;
                                R[++bV] = +R[bV] + S
                            }
                            bZ.pop();
                            bZ = bZ[av](am(R, bY));
                            break;
                        case "M":
                            bR = +b[1] + bO;
                            bQ = +b[2] + S;
                        default:
                            for (bV = 1, bX = b.length; bV < bX; bV++) {
                                bS[bV] = +b[bV] + ((bV % 2) ? bO : S)
                            }
                    }
                } else {
                    if (b[0] == "R") {
                        R = [bO, S][av](b.slice(1));
                        bZ.pop();
                        bZ = bZ[av](am(R, bY));
                        bS = ["R"][av](b.slice(-2))
                    } else {
                        for (var bU = 0, d = b.length; bU < d; bU++) {
                            bS[bU] = b[bU]
                        }
                    }
                }
                switch (bS[0]) {
                    case "Z":
                        bO = bR;
                        S = bQ;
                        break;
                    case "H":
                        bO = bS[1];
                        break;
                    case "V":
                        S = bS[1];
                        break;
                    case "M":
                        bR = bS[bS.length - 2];
                        bQ = bS[bS.length - 1];
                    default:
                        bO = bS[bS.length - 2];
                        S = bS[bS.length - 1]
                }
            }
            bZ.toString = bi._path2string;
            g.abs = aY(bZ);
            return bZ
        },
        aW = function(d, i, b, g) {
            return [d, i, b, g, b, g]
        },
        z = function(d, i, S, E, b, g) {
            var R = 1 / 3,
                bO = 2 / 3;
            return [R * d + bO * S, R * i + bO * E, R * b + bO * S, R * g + bO * E, b, g]
        },
        ab = function(bV, cq, b4, b2, bW, bQ, E, bU, cp, bX) {
            var b1 = ag * 120 / 180,
                b = ag / 180 * (+bW || 0),
                b8 = [],
                b5, cm = H(function(cr, cu, i) {
                    var ct = cr * aI.cos(i) - cu * aI.sin(i),
                        cs = cr * aI.sin(i) + cu * aI.cos(i);
                    return {
                        x: ct,
                        y: cs
                    }
                });
            if (!bX) {
                b5 = cm(bV, cq, -b);
                bV = b5.x;
                cq = b5.y;
                b5 = cm(bU, cp, -b);
                bU = b5.x;
                cp = b5.y;
                var d = aI.cos(ag / 180 * bW),
                    bS = aI.sin(ag / 180 * bW),
                    ca = (bV - bU) / 2,
                    b9 = (cq - cp) / 2;
                var ck = (ca * ca) / (b4 * b4) + (b9 * b9) / (b2 * b2);
                if (ck > 1) {
                    ck = aI.sqrt(ck);
                    b4 = ck * b4;
                    b2 = ck * b2
                }
                var g = b4 * b4,
                    cd = b2 * b2,
                    cf = (bQ == E ? -1 : 1) * aI.sqrt(ak((g * cd - g * b9 * b9 - cd * ca * ca) / (g * b9 * b9 + cd * ca * ca))),
                    bZ = cf * b4 * b9 / b2 + (bV + bU) / 2,
                    bY = cf * -b2 * ca / b4 + (cq + cp) / 2,
                    bP = aI.asin(((cq - bY) / b2).toFixed(9)),
                    bO = aI.asin(((cp - bY) / b2).toFixed(9));
                bP = bV < bZ ? ag - bP : bP;
                bO = bU < bZ ? ag - bO : bO;
                bP < 0 && (bP = ag * 2 + bP);
                bO < 0 && (bO = ag * 2 + bO);
                if (E && bP > bO) {
                    bP = bP - ag * 2
                }
                if (!E && bO > bP) {
                    bO = bO - ag * 2
                }
            } else {
                bP = bX[0];
                bO = bX[1];
                bZ = bX[2];
                bY = bX[3]
            }
            var bT = bO - bP;
            if (ak(bT) > b1) {
                var b0 = bO,
                    b3 = bU,
                    bR = cp;
                bO = bP + b1 * (E && bO > bP ? 1 : -1);
                bU = bZ + b4 * aI.cos(bO);
                cp = bY + b2 * aI.sin(bO);
                b8 = ab(bU, cp, b4, b2, bW, 0, E, b3, bR, [bO, b0, bZ, bY])
            }
            bT = bO - bP;
            var S = aI.cos(bP),
                co = aI.sin(bP),
                R = aI.cos(bO),
                cn = aI.sin(bO),
                cb = aI.tan(bT / 4),
                ce = 4 / 3 * b4 * cb,
                cc = 4 / 3 * b2 * cb,
                cl = [bV, cq],
                cj = [bV + ce * co, cq - cc * S],
                ci = [bU + ce * cn, cp - cc * R],
                cg = [bU, cp];
            cj[0] = 2 * cl[0] - cj[0];
            cj[1] = 2 * cl[1] - cj[1];
            if (bX) {
                return [cj, ci, cg][av](b8)
            } else {
                b8 = [cj, ci, cg][av](b8).join()[l](",");
                var b6 = [];
                for (var ch = 0, b7 = b8.length; ch < b7; ch++) {
                    b6[ch] = ch % 2 ? cm(b8[ch - 1], b8[ch], b).y : cm(b8[ch], b8[ch + 1], b).x
                }
                return b6
            }
        },
        bL = function(d, b, i, g, bP, bO, S, R, bQ) {
            var E = 1 - bQ;
            return {
                x: aS(E, 3) * d + aS(E, 2) * 3 * bQ * i + E * 3 * bQ * bQ * bP + aS(bQ, 3) * S,
                y: aS(E, 3) * b + aS(E, 2) * 3 * bQ * g + E * 3 * bQ * bQ * bO + aS(bQ, 3) * R
            }
        },
        aX = H(function(i, d, R, E, bX, bW, bT, bQ) {
            var bV = (bX - 2 * R + i) - (bT - 2 * bX + R),
                bS = 2 * (R - i) - 2 * (bX - R),
                bP = i - R,
                bO = (-bS + aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV,
                S = (-bS - aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV,
                bR = [d, bQ],
                bU = [i, bT],
                g;
            ak(bO) > "1e12" && (bO = 0.5);
            ak(S) > "1e12" && (S = 0.5);
            if (bO > 0 && bO < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, bO);
                bU.push(g.x);
                bR.push(g.y)
            }
            if (S > 0 && S < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, S);
                bU.push(g.x);
                bR.push(g.y)
            }
            bV = (bW - 2 * E + d) - (bQ - 2 * bW + E);
            bS = 2 * (E - d) - 2 * (bW - E);
            bP = d - E;
            bO = (-bS + aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV;
            S = (-bS - aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV;
            ak(bO) > "1e12" && (bO = 0.5);
            ak(S) > "1e12" && (S = 0.5);
            if (bO > 0 && bO < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, bO);
                bU.push(g.x);
                bR.push(g.y)
            }
            if (S > 0 && S < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, S);
                bU.push(g.x);
                bR.push(g.y)
            }
            return {
                min: {
                    x: ai[bs](0, bU),
                    y: ai[bs](0, bR)
                },
                max: {
                    x: bI[bs](0, bU),
                    y: bI[bs](0, bR)
                }
            }
        }),
        bk = bi._path2curve = H(function(bX, bS) {
            var bQ = !bS && aR(bX);
            if (!bS && bQ.curve) {
                return aY(bQ.curve)
            }
            var E = p(bX),
                bT = bS && p(bS),
                bU = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                d = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                S = function(bY, bZ) {
                    var i, b0;
                    if (!bY) {
                        return ["C", bZ.x, bZ.y, bZ.x, bZ.y, bZ.x, bZ.y]
                    }!(bY[0] in {
                        T: 1,
                        Q: 1
                    }) && (bZ.qx = bZ.qy = null);
                    switch (bY[0]) {
                        case "M":
                            bZ.X = bY[1];
                            bZ.Y = bY[2];
                            break;
                        case "A":
                            bY = ["C"][av](ab[bs](0, [bZ.x, bZ.y][av](bY.slice(1))));
                            break;
                        case "S":
                            i = bZ.x + (bZ.x - (bZ.bx || bZ.x));
                            b0 = bZ.y + (bZ.y - (bZ.by || bZ.y));
                            bY = ["C", i, b0][av](bY.slice(1));
                            break;
                        case "T":
                            bZ.qx = bZ.x + (bZ.x - (bZ.qx || bZ.x));
                            bZ.qy = bZ.y + (bZ.y - (bZ.qy || bZ.y));
                            bY = ["C"][av](z(bZ.x, bZ.y, bZ.qx, bZ.qy, bY[1], bY[2]));
                            break;
                        case "Q":
                            bZ.qx = bY[1];
                            bZ.qy = bY[2];
                            bY = ["C"][av](z(bZ.x, bZ.y, bY[1], bY[2], bY[3], bY[4]));
                            break;
                        case "L":
                            bY = ["C"][av](aW(bZ.x, bZ.y, bY[1], bY[2]));
                            break;
                        case "H":
                            bY = ["C"][av](aW(bZ.x, bZ.y, bY[1], bZ.y));
                            break;
                        case "V":
                            bY = ["C"][av](aW(bZ.x, bZ.y, bZ.x, bY[1]));
                            break;
                        case "Z":
                            bY = ["C"][av](aW(bZ.x, bZ.y, bZ.X, bZ.Y));
                            break
                    }
                    return bY
                },
                b = function(bY, bZ) {
                    if (bY[bZ].length > 7) {
                        bY[bZ].shift();
                        var b0 = bY[bZ];
                        while (b0.length) {
                            bY.splice(bZ++, 0, ["C"][av](b0.splice(0, 6)))
                        }
                        bY.splice(bZ, 1);
                        bV = bI(E.length, bT && bT.length || 0)
                    }
                },
                g = function(b2, b1, bZ, bY, b0) {
                    if (b2 && b1 && b2[b0][0] == "M" && b1[b0][0] != "M") {
                        b1.splice(b0, 0, ["M", bY.x, bY.y]);
                        bZ.bx = 0;
                        bZ.by = 0;
                        bZ.x = b2[b0][1];
                        bZ.y = b2[b0][2];
                        bV = bI(E.length, bT && bT.length || 0)
                    }
                };
            for (var bP = 0, bV = bI(E.length, bT && bT.length || 0); bP < bV; bP++) {
                E[bP] = S(E[bP], bU);
                b(E, bP);
                bT && (bT[bP] = S(bT[bP], d));
                bT && b(bT, bP);
                g(E, bT, bU, d, bP);
                g(bT, E, d, bU, bP);
                var bO = E[bP],
                    bW = bT && bT[bP],
                    R = bO.length,
                    bR = bT && bW.length;
                bU.x = bO[R - 2];
                bU.y = bO[R - 1];
                bU.bx = bM(bO[R - 4]) || bU.x;
                bU.by = bM(bO[R - 3]) || bU.y;
                d.bx = bT && (bM(bW[bR - 4]) || d.x);
                d.by = bT && (bM(bW[bR - 3]) || d.y);
                d.x = bT && bW[bR - 2];
                d.y = bT && bW[bR - 1]
            }
            if (!bT) {
                bQ.curve = aY(E)
            }
            return bT ? [E, bT] : E
        }, null, aY),
        ba = bi._parseDots = H(function(bR) {
            var bQ = [];
            for (var S = 0, bS = bR.length; S < bS; S++) {
                var b = {},
                    bP = bR[S].match(/^([^:]*):?([\d\.]*)/);
                b.color = bi.getRGB(bP[1]);
                if (b.color.error) {
                    return null
                }
                b.color = b.color.hex;
                bP[2] && (b.offset = bP[2] + "%");
                bQ.push(b)
            }
            for (S = 1, bS = bQ.length - 1; S < bS; S++) {
                if (!bQ[S].offset) {
                    var g = bM(bQ[S - 1].offset || 0),
                        E = 0;
                    for (var R = S + 1; R < bS; R++) {
                        if (bQ[R].offset) {
                            E = bQ[R].offset;
                            break
                        }
                    }
                    if (!E) {
                        E = 100;
                        R = bS
                    }
                    E = bM(E);
                    var bO = (E - g) / (R - S + 1);
                    for (; S < R; S++) {
                        g += bO;
                        bQ[S].offset = g + "%"
                    }
                }
            }
            return bQ
        }),
        aH = bi._tear = function(b, d) {
            b == d.top && (d.top = b.prev);
            b == d.bottom && (d.bottom = b.next);
            b.next && (b.next.prev = b.prev);
            b.prev && (b.prev.next = b.next)
        },
        L = bi._tofront = function(b, d) {
            if (d.top === b) {
                return
            }
            aH(b, d);
            b.next = null;
            b.prev = d.top;
            d.top.next = b;
            d.top = b
        },
        y = bi._toback = function(b, d) {
            if (d.bottom === b) {
                return
            }
            aH(b, d);
            b.next = d.bottom;
            b.prev = null;
            d.bottom.prev = b;
            d.bottom = b
        },
        ar = bi._insertafter = function(d, b, g) {
            aH(d, g);
            b == g.top && (g.top = d);
            b.next && (b.next.prev = d);
            d.next = b.next;
            d.prev = b;
            b.next = d
        },
        m = bi._insertbefore = function(d, b, g) {
            aH(d, g);
            b == g.bottom && (g.bottom = d);
            b.prev && (b.prev.next = d);
            d.prev = b.prev;
            b.prev = d;
            d.next = b
        },
        t = bi.toMatrix = function(g, b) {
            var i = I(g),
                d = {
                    _: {
                        transform: bn
                    },
                    getBBox: function() {
                        return i
                    }
                };
            Y(d, b);
            return d.matrix
        },
        ay = bi.transformPath = function(d, b) {
            return Q(d, t(d, b))
        },
        Y = bi._extractTransform = function(d, b2) {
            if (b2 == null) {
                return d._.transform
            }
            b2 = k(b2).replace(/\.{3}|\u2026/g, d._.transform || bn);
            var bU = bi.parseTransformString(b2),
                bS = 0,
                bQ = 0,
                bP = 0,
                bW = 1,
                bV = 1,
                b3 = d._,
                bX = new a9;
            b3.transform = bU || [];
            if (bU) {
                for (var bY = 0, bR = bU.length; bY < bR; bY++) {
                    var bT = bU[bY],
                        b = bT.length,
                        R = k(bT[0]).toLowerCase(),
                        b1 = bT[0] != R,
                        bO = b1 ? bX.invert() : 0,
                        b0, E, bZ, g, S;
                    if (R == "t" && b == 3) {
                        if (b1) {
                            b0 = bO.x(0, 0);
                            E = bO.y(0, 0);
                            bZ = bO.x(bT[1], bT[2]);
                            g = bO.y(bT[1], bT[2]);
                            bX.translate(bZ - b0, g - E)
                        } else {
                            bX.translate(bT[1], bT[2])
                        }
                    } else {
                        if (R == "r") {
                            if (b == 2) {
                                S = S || d.getBBox(1);
                                bX.rotate(bT[1], S.x + S.width / 2, S.y + S.height / 2);
                                bS += bT[1]
                            } else {
                                if (b == 4) {
                                    if (b1) {
                                        bZ = bO.x(bT[2], bT[3]);
                                        g = bO.y(bT[2], bT[3]);
                                        bX.rotate(bT[1], bZ, g)
                                    } else {
                                        bX.rotate(bT[1], bT[2], bT[3])
                                    }
                                    bS += bT[1]
                                }
                            }
                        } else {
                            if (R == "s") {
                                if (b == 2 || b == 3) {
                                    S = S || d.getBBox(1);
                                    bX.scale(bT[1], bT[b - 1], S.x + S.width / 2, S.y + S.height / 2);
                                    bW *= bT[1];
                                    bV *= bT[b - 1]
                                } else {
                                    if (b == 5) {
                                        if (b1) {
                                            bZ = bO.x(bT[3], bT[4]);
                                            g = bO.y(bT[3], bT[4]);
                                            bX.scale(bT[1], bT[2], bZ, g)
                                        } else {
                                            bX.scale(bT[1], bT[2], bT[3], bT[4])
                                        }
                                        bW *= bT[1];
                                        bV *= bT[2]
                                    }
                                }
                            } else {
                                if (R == "m" && b == 7) {
                                    bX.add(bT[1], bT[2], bT[3], bT[4], bT[5], bT[6])
                                }
                            }
                        }
                    }
                    b3.dirtyT = 1;
                    d.matrix = bX
                }
            }
            d.matrix = bX;
            b3.sx = bW;
            b3.sy = bV;
            b3.deg = bS;
            b3.dx = bQ = bX.e;
            b3.dy = bP = bX.f;
            if (bW == 1 && bV == 1 && !bS && b3.bbox) {
                b3.bbox.x += +bQ;
                b3.bbox.y += +bP
            } else {
                b3.dirtyT = 1
            }
        },
        o = function(d) {
            var b = d[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    if (d.length == 4) {
                        return [b, 0, d[2], d[3]]
                    } else {
                        return [b, 0]
                    }
                case "s":
                    if (d.length == 5) {
                        return [b, 1, 1, d[3], d[4]]
                    } else {
                        if (d.length == 3) {
                            return [b, 1, 1]
                        } else {
                            return [b, 1]
                        }
                    }
            }
        },
        bd = bi._equaliseTransform = function(R, E) {
            E = k(E).replace(/\.{3}|\u2026/g, R);
            R = bi.parseTransformString(R) || [];
            E = bi.parseTransformString(E) || [];
            var b = bI(R.length, E.length),
                bQ = [],
                bR = [],
                g = 0,
                d, S, bP, bO;
            for (; g < b; g++) {
                bP = R[g] || o(E[g]);
                bO = E[g] || o(bP);
                if ((bP[0] != bO[0]) || (bP[0].toLowerCase() == "r" && (bP[2] != bO[2] || bP[3] != bO[3])) || (bP[0].toLowerCase() == "s" && (bP[3] != bO[3] || bP[4] != bO[4]))) {
                    return
                }
                bQ[g] = [];
                bR[g] = [];
                for (d = 0, S = bI(bP.length, bO.length); d < S; d++) {
                    d in bP && (bQ[g][d] = bP[d]);
                    d in bO && (bR[g][d] = bO[d])
                }
            }
            return {
                from: bQ,
                to: bR
            }
        };
    bi._getContainer = function(b, E, g, i) {
        var d;
        d = i == null && !bi.is(b, "object") ? a5.doc.getElementById(b) : b;
        if (d == null) {
            return
        }
        if (d.tagName) {
            if (E == null) {
                return {
                    container: d,
                    width: d.style.pixelWidth || d.offsetWidth,
                    height: d.style.pixelHeight || d.offsetHeight
                }
            } else {
                return {
                    container: d,
                    width: E,
                    height: g
                }
            }
        }
        return {
            container: 1,
            x: b,
            y: E,
            width: g,
            height: i
        }
    };
    bi.pathToRelative = j;
    bi._engine = {};
    bi.path2curve = bk;
    bi.matrix = function(i, g, bO, S, R, E) {
        return new a9(i, g, bO, S, R, E)
    };

    function a9(i, g, bO, S, R, E) {
        if (i != null) {
            this.a = +i;
            this.b = +g;
            this.c = +bO;
            this.d = +S;
            this.e = +R;
            this.f = +E
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0
        }
    }(function(g) {
        g.add = function(bW, bT, bR, bP, S, R) {
            var E = [
                    [],
                    [],
                    []
                ],
                i = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ],
                bV = [
                    [bW, bR, S],
                    [bT, bP, R],
                    [0, 0, 1]
                ],
                bU, bS, bQ, bO;
            if (bW && bW instanceof a9) {
                bV = [
                    [bW.a, bW.c, bW.e],
                    [bW.b, bW.d, bW.f],
                    [0, 0, 1]
                ]
            }
            for (bU = 0; bU < 3; bU++) {
                for (bS = 0; bS < 3; bS++) {
                    bO = 0;
                    for (bQ = 0; bQ < 3; bQ++) {
                        bO += i[bU][bQ] * bV[bQ][bS]
                    }
                    E[bU][bS] = bO
                }
            }
            this.a = E[0][0];
            this.b = E[1][0];
            this.c = E[0][1];
            this.d = E[1][1];
            this.e = E[0][2];
            this.f = E[1][2]
        };
        g.invert = function() {
            var E = this,
                i = E.a * E.d - E.b * E.c;
            return new a9(E.d / i, -E.b / i, -E.c / i, E.a / i, (E.c * E.f - E.d * E.e) / i, (E.b * E.e - E.a * E.f) / i)
        };
        g.clone = function() {
            return new a9(this.a, this.b, this.c, this.d, this.e, this.f)
        };
        g.translate = function(i, E) {
            this.add(1, 0, 0, 1, i, E)
        };
        g.scale = function(E, S, i, R) {
            S == null && (S = E);
            (i || R) && this.add(1, 0, 0, 1, i, R);
            this.add(E, 0, 0, S, 0, 0);
            (i || R) && this.add(1, 0, 0, 1, -i, -R)
        };
        g.rotate = function(E, i, bO) {
            E = bi.rad(E);
            i = i || 0;
            bO = bO || 0;
            var S = +aI.cos(E).toFixed(9),
                R = +aI.sin(E).toFixed(9);
            this.add(S, R, -R, S, i, bO);
            this.add(1, 0, 0, 1, -i, -bO)
        };
        g.x = function(i, E) {
            return i * this.a + E * this.c + this.e
        };
        g.y = function(i, E) {
            return i * this.b + E * this.d + this.f
        };
        g.get = function(E) {
            return +this[k.fromCharCode(97 + E)].toFixed(4)
        };
        g.toString = function() {
            return bi.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        };
        g.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        };
        g.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        };

        function d(i) {
            return i[0] * i[0] + i[1] * i[1]
        }

        function b(i) {
            var E = aI.sqrt(d(i));
            i[0] && (i[0] /= E);
            i[1] && (i[1] /= E)
        }
        g.split = function() {
            var E = {};
            E.dx = this.e;
            E.dy = this.f;
            var S = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            E.scalex = aI.sqrt(d(S[0]));
            b(S[0]);
            E.shear = S[0][0] * S[1][0] + S[0][1] * S[1][1];
            S[1] = [S[1][0] - S[0][0] * E.shear, S[1][1] - S[0][1] * E.shear];
            E.scaley = aI.sqrt(d(S[1]));
            b(S[1]);
            E.shear /= E.scaley;
            var i = -S[0][1],
                R = S[1][1];
            if (R < 0) {
                E.rotate = bi.deg(aI.acos(R));
                if (i < 0) {
                    E.rotate = 360 - E.rotate
                }
            } else {
                E.rotate = bi.deg(aI.asin(i))
            }
            E.isSimple = !+E.shear.toFixed(9) && (E.scalex.toFixed(9) == E.scaley.toFixed(9) || !E.rotate);
            E.isSuperSimple = !+E.shear.toFixed(9) && E.scalex.toFixed(9) == E.scaley.toFixed(9) && !E.rotate;
            E.noRotation = !+E.shear.toFixed(9) && !E.rotate;
            return E
        };
        g.toTransformString = function(i) {
            var E = i || this[l]();
            if (E.isSimple) {
                E.scalex = +E.scalex.toFixed(4);
                E.scaley = +E.scaley.toFixed(4);
                E.rotate = +E.rotate.toFixed(4);
                return (E.dx || E.dy ? "t" + [E.dx, E.dy] : bn) + (E.scalex != 1 || E.scaley != 1 ? "s" + [E.scalex, E.scaley, 0, 0] : bn) + (E.rotate ? "r" + [E.rotate, 0, 0] : bn)
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }
    })(a9.prototype);
    var al = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (al && al[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && al && al[1] < 8)) {
        ao.safari = function() {
            var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                stroke: "none"
            });
            setTimeout(function() {
                b.remove()
            })
        }
    } else {
        ao.safari = ad
    }
    var bD = function() {
            this.returnValue = false
        },
        n = function() {
            return this.originalEvent.preventDefault()
        },
        aJ = function() {
            this.cancelBubble = true
        },
        V = function() {
            return this.originalEvent.stopPropagation()
        },
        ae = function(d) {
            var b = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                g = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft;
            return {
                x: d.clientX + g,
                y: d.clientY + b
            }
        },
        F = (function() {
            if (a5.doc.addEventListener) {
                return function(E, g, d, b) {
                    var i = function(S) {
                        var bO = ae(S);
                        return d.call(b, S, bO.x, bO.y)
                    };
                    E.addEventListener(g, i, false);
                    if (O && bp[g]) {
                        var R = function(bQ) {
                            var bR = ae(bQ),
                                bO = bQ;
                            for (var S = 0, bP = bQ.targetTouches && bQ.targetTouches.length; S < bP; S++) {
                                if (bQ.targetTouches[S].target == E) {
                                    bQ = bQ.targetTouches[S];
                                    bQ.originalEvent = bO;
                                    bQ.preventDefault = n;
                                    bQ.stopPropagation = V;
                                    break
                                }
                            }
                            return d.call(b, bQ, bR.x, bR.y)
                        };
                        E.addEventListener(bp[g], R, false)
                    }
                    return function() {
                        E.removeEventListener(g, i, false);
                        if (O && bp[g]) {
                            E.removeEventListener(bp[g], i, false)
                        }
                        return true
                    }
                }
            } else {
                if (a5.doc.attachEvent) {
                    return function(R, i, g, d) {
                        var E = function(bP) {
                            bP = bP || a5.win.event;
                            var bO = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                                bQ = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft,
                                S = bP.clientX + bQ,
                                bR = bP.clientY + bO;
                            bP.preventDefault = bP.preventDefault || bD;
                            bP.stopPropagation = bP.stopPropagation || aJ;
                            return g.call(d, bP, S, bR)
                        };
                        R.attachEvent("on" + i, E);
                        var b = function() {
                            R.detachEvent("on" + i, E);
                            return true
                        };
                        return b
                    }
                }
            }
        })(),
        aA = [],
        br = function(bP) {
            var bS = bP.clientX,
                bR = bP.clientY,
                bU = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                bV = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft,
                g, E = aA.length;
            while (E--) {
                g = aA[E];
                if (O && bP.touches) {
                    var S = bP.touches.length,
                        R;
                    while (S--) {
                        R = bP.touches[S];
                        if (R.identifier == g.el._drag.id) {
                            bS = R.clientX;
                            bR = R.clientY;
                            (bP.originalEvent ? bP.originalEvent : bP).preventDefault();
                            break
                        }
                    }
                } else {
                    bP.preventDefault()
                }
                var d = g.el.node,
                    b, bO = d.nextSibling,
                    bT = d.parentNode,
                    bQ = d.style.display;
                a5.win.opera && bT.removeChild(d);
                d.style.display = "none";
                b = g.el.paper.getElementByPoint(bS, bR);
                d.style.display = bQ;
                a5.win.opera && (bO ? bT.insertBefore(d, bO) : bT.appendChild(d));
                b && bc("raphael.drag.over." + g.el.id, g.el, b);
                bS += bV;
                bR += bU;
                bc("raphael.drag.move." + g.el.id, g.move_scope || g.el, bS - g.el._drag.x, bR - g.el._drag.y, bS, bR, bP)
            }
        },
        e = function(g) {
            bi.unmousemove(br).unmouseup(e);
            var d = aA.length,
                b;
            while (d--) {
                b = aA[d];
                b.el._drag = {};
                bc("raphael.drag.end." + b.el.id, b.end_scope || b.start_scope || b.move_scope || b.el, g)
            }
            aA = []
        },
        aq = bi.el = {};
    for (var a3 = bB.length; a3--;) {
        (function(b) {
            bi[b] = aq[b] = function(g, d) {
                if (bi.is(g, "function")) {
                    this.events = this.events || [];
                    this.events.push({
                        name: b,
                        f: g,
                        unbind: F(this.shape || this.node || a5.doc, b, g, d || this)
                    })
                }
                return this
            };
            bi["un" + b] = aq["un" + b] = function(i) {
                var g = this.events || [],
                    d = g.length;
                while (d--) {
                    if (g[d].name == b && (bi.is(i, "undefined") || g[d].f == i)) {
                        g[d].unbind();
                        g.splice(d, 1);
                        !g.length && delete this.events
                    }
                }
                return this
            }
        })(bB[a3])
    }
    aq.data = function(d, E) {
        var g = M[this.id] = M[this.id] || {};
        if (arguments.length == 0) {
            return g
        }
        if (arguments.length == 1) {
            if (bi.is(d, "object")) {
                for (var b in d) {
                    if (d[bw](b)) {
                        this.data(b, d[b])
                    }
                }
                return this
            }
            bc("raphael.data.get." + this.id, this, g[d], d);
            return g[d]
        }
        g[d] = E;
        bc("raphael.data.set." + this.id, this, E, d);
        return this
    };
    aq.removeData = function(b) {
        if (b == null) {
            M[this.id] = {}
        } else {
            M[this.id] && delete M[this.id][b]
        }
        return this
    };
    aq.getData = function() {
        return bl(M[this.id] || {})
    };
    aq.hover = function(i, b, g, d) {
        return this.mouseover(i, g).mouseout(b, d || g)
    };
    aq.unhover = function(d, b) {
        return this.unmouseover(d).unmouseout(b)
    };
    var ah = [];
    aq.drag = function(d, R, E, b, g, i) {
        function S(bP) {
            (bP.originalEvent || bP).preventDefault();
            var bO = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                bQ = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft;
            this._drag.x = bP.clientX + bQ;
            this._drag.y = bP.clientY + bO;
            this._drag.id = bP.identifier;
            !aA.length && bi.mousemove(br).mouseup(e);
            aA.push({
                el: this,
                move_scope: b,
                start_scope: g,
                end_scope: i
            });
            R && bc.on("raphael.drag.start." + this.id, R);
            d && bc.on("raphael.drag.move." + this.id, d);
            E && bc.on("raphael.drag.end." + this.id, E);
            bc("raphael.drag.start." + this.id, g || b || this, bP.clientX + bQ, bP.clientY + bO, bP)
        }
        this._drag = {};
        ah.push({
            el: this,
            start: S
        });
        this.mousedown(S);
        return this
    };
    aq.onDragOver = function(b) {
        b ? bc.on("raphael.drag.over." + this.id, b) : bc.unbind("raphael.drag.over." + this.id)
    };
    aq.undrag = function() {
        var b = ah.length;
        while (b--) {
            if (ah[b].el == this) {
                this.unmousedown(ah[b].start);
                ah.splice(b, 1);
                bc.unbind("raphael.drag.*." + this.id)
            }
        }!ah.length && bi.unmousemove(br).unmouseup(e);
        aA = []
    };
    ao.circle = function(b, i, g) {
        var d = bi._engine.circle(this, b || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.rect = function(b, R, d, i, E) {
        var g = bi._engine.rect(this, b || 0, R || 0, d || 0, i || 0, E || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    ao.ellipse = function(b, E, i, g) {
        var d = bi._engine.ellipse(this, b || 0, E || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.path = function(b) {
        b && !bi.is(b, a) && !bi.is(b[0], u) && (b += bn);
        var d = bi._engine.path(bi.format[bs](bi, arguments), this);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.image = function(E, b, R, d, i) {
        var g = bi._engine.image(this, E || "about:blank", b || 0, R || 0, d || 0, i || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    ao.text = function(b, i, g) {
        var d = bi._engine.text(this, b || 0, i || 0, k(g));
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.set = function(d) {
        !bi.is(d, "array") && (d = Array.prototype.splice.call(arguments, 0, arguments.length));
        var b = new X(d);
        this.__set__ && this.__set__.push(b);
        b.paper = this;
        b.type = "set";
        return b
    };
    ao.setStart = function(b) {
        this.__set__ = b || this.set()
    };
    ao.setFinish = function(d) {
        var b = this.__set__;
        delete this.__set__;
        return b
    };
    ao.setSize = function(d, b) {
        return bi._engine.setSize.call(this, d, b)
    };
    ao.setViewBox = function(b, E, d, i, g) {
        return bi._engine.setViewBox.call(this, b, E, d, i, g)
    };
    ao.top = ao.bottom = null;
    ao.raphael = bi;
    var bN = function(g) {
        var E = g.getBoundingClientRect(),
            bP = g.ownerDocument,
            R = bP.body,
            b = bP.documentElement,
            i = b.clientTop || R.clientTop || 0,
            S = b.clientLeft || R.clientLeft || 0,
            bO = E.top + (a5.win.pageYOffset || b.scrollTop || R.scrollTop) - i,
            d = E.left + (a5.win.pageXOffset || b.scrollLeft || R.scrollLeft) - S;
        return {
            y: bO,
            x: d
        }
    };
    ao.getElementByPoint = function(d, bO) {
        var S = this,
            g = S.canvas,
            R = a5.doc.elementFromPoint(d, bO);
        if (a5.win.opera && R.tagName == "svg") {
            var E = bN(g),
                i = g.createSVGRect();
            i.x = d - E.x;
            i.y = bO - E.y;
            i.width = i.height = 1;
            var b = g.getIntersectionList(i, null);
            if (b.length) {
                R = b[b.length - 1]
            }
        }
        if (!R) {
            return null
        }
        while (R.parentNode && R != g.parentNode && !R.raphael) {
            R = R.parentNode
        }
        R == S.canvas.parentNode && (R = g);
        R = R && R.raphael ? S.getById(R.raphaelid) : null;
        return R
    };
    ao.getElementsByBBox = function(b) {
        var d = this.set();
        this.forEach(function(g) {
            if (bi.isBBoxIntersect(g.getBBox(), b)) {
                d.push(g)
            }
        });
        return d
    };
    ao.getById = function(d) {
        var b = this.bottom;
        while (b) {
            if (b.id == d) {
                return b
            }
            b = b.next
        }
        return null
    };
    ao.forEach = function(g, b) {
        var d = this.bottom;
        while (d) {
            if (g.call(b, d) === false) {
                return this
            }
            d = d.next
        }
        return this
    };
    ao.getElementsByPoint = function(b, g) {
        var d = this.set();
        this.forEach(function(i) {
            if (i.isPointInside(b, g)) {
                d.push(i)
            }
        });
        return d
    };

    function bx() {
        return this.x + bh + this.y
    }

    function a6() {
        return this.x + bh + this.y + bh + this.width + " \xd7 " + this.height
    }
    aq.isPointInside = function(b, g) {
        var d = this.realPath = this.realPath || af[this.type](this);
        return bi.isPointInsidePath(d, b, g)
    };
    aq.getBBox = function(d) {
        if (this.removed) {
            return {}
        }
        var b = this._;
        if (d) {
            if (b.dirty || !b.bboxwt) {
                this.realPath = af[this.type](this);
                b.bboxwt = I(this.realPath);
                b.bboxwt.toString = a6;
                b.dirty = 0
            }
            return b.bboxwt
        }
        if (b.dirty || b.dirtyT || !b.bbox) {
            if (b.dirty || !this.realPath) {
                b.bboxwt = 0;
                this.realPath = af[this.type](this)
            }
            b.bbox = I(Q(this.realPath, this.matrix));
            b.bbox.toString = a6;
            b.dirty = b.dirtyT = 0
        }
        return b.bbox
    };
    aq.clone = function() {
        if (this.removed) {
            return null
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b
    };
    aq.glow = function(bO) {
        if (this.type == "text") {
            return null
        }
        bO = bO || {};
        var g = {
                width: (bO.width || 10) + (+this.attr("stroke-width") || 1),
                fill: bO.fill || false,
                opacity: bO.opacity || 0.5,
                offsetx: bO.offsetx || 0,
                offsety: bO.offsety || 0,
                color: bO.color || "#000"
            },
            S = g.width / 2,
            E = this.paper,
            b = E.set(),
            R = this.realPath || af[this.type](this);
        R = this.matrix ? Q(R, this.matrix) : R;
        for (var d = 1; d < S + 1; d++) {
            b.push(E.path(R).attr({
                stroke: g.color,
                fill: g.fill ? g.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(g.width / S * d).toFixed(3),
                opacity: +(g.opacity / S).toFixed(3)
            }))
        }
        return b.insertBefore(this).translate(g.offsetx, g.offsety)
    };
    var aZ = {},
        aO = function(d, b, E, i, bP, bO, S, R, g) {
            if (g == null) {
                return bb(d, b, E, i, bP, bO, S, R)
            } else {
                return bi.findDotsAtSegment(d, b, E, i, bP, bO, S, R, aK(d, b, E, i, bP, bO, S, R, g))
            }
        },
        aD = function(b, d) {
            return function(bW, R, S) {
                bW = bk(bW);
                var bS, bR, g, bO, E = "",
                    bV = {},
                    bT, bQ = 0;
                for (var bP = 0, bU = bW.length; bP < bU; bP++) {
                    g = bW[bP];
                    if (g[0] == "M") {
                        bS = +g[1];
                        bR = +g[2]
                    } else {
                        bO = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6]);
                        if (bQ + bO > R) {
                            if (d && !bV.start) {
                                bT = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6], R - bQ);
                                E += ["C" + bT.start.x, bT.start.y, bT.m.x, bT.m.y, bT.x, bT.y];
                                if (S) {
                                    return E
                                }
                                bV.start = E;
                                E = ["M" + bT.x, bT.y + "C" + bT.n.x, bT.n.y, bT.end.x, bT.end.y, g[5], g[6]].join();
                                bQ += bO;
                                bS = +g[5];
                                bR = +g[6];
                                continue
                            }
                            if (!b && !d) {
                                bT = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6], R - bQ);
                                return {
                                    x: bT.x,
                                    y: bT.y,
                                    alpha: bT.alpha
                                }
                            }
                        }
                        bQ += bO;
                        bS = +g[5];
                        bR = +g[6]
                    }
                    E += g.shift() + g
                }
                bV.end = E;
                bT = b ? bQ : d ? bV : bi.findDotsAtSegment(bS, bR, g[0], g[1], g[2], g[3], g[4], g[5], 1);
                bT.alpha && (bT = {
                    x: bT.x,
                    y: bT.y,
                    alpha: bT.alpha
                });
                return bT
            }
        };
    var bG = aD(1),
        by = aD(),
        aB = aD(0, 1);
    bi.getTotalLength = bG;
    bi.getPointAtLength = by;
    bi.getSubpath = function(d, i, g) {
        if (this.getTotalLength(d) - g < 0.000001) {
            return aB(d, i).end
        }
        var b = aB(d, g, 1);
        return i ? aB(b, i).end : b
    };
    aq.getTotalLength = function() {
        var b = this.getPath();
        if (!b) {
            return
        }
        if (this.node.getTotalLength) {
            return this.node.getTotalLength()
        }
        return bG(b)
    };
    aq.getPointAtLength = function(b) {
        var d = this.getPath();
        if (!d) {
            return
        }
        return by(d, b)
    };
    aq.getPath = function() {
        var d, b = bi._getPath[this.type];
        if (this.type == "text" || this.type == "set") {
            return
        }
        if (b) {
            d = b(this)
        }
        return d
    };
    aq.getSubpath = function(g, d) {
        var b = this.getPath();
        if (!b) {
            return
        }
        return bi.getSubpath(b, g, d)
    };
    var aG = bi.easing_formulas = {
        linear: function(b) {
            return b
        },
        "<": function(b) {
            return aS(b, 1.7)
        },
        ">": function(b) {
            return aS(b, 0.48)
        },
        "<>": function(bO) {
            var i = 0.48 - bO / 1.04,
                g = aI.sqrt(0.1734 + i * i),
                b = g - i,
                S = aS(ak(b), 1 / 3) * (b < 0 ? -1 : 1),
                R = -g - i,
                E = aS(ak(R), 1 / 3) * (R < 0 ? -1 : 1),
                d = S + E + 0.5;
            return (1 - d) * 3 * d * d + d * d * d
        },
        backIn: function(d) {
            var b = 1.70158;
            return d * d * ((b + 1) * d - b)
        },
        backOut: function(d) {
            d = d - 1;
            var b = 1.70158;
            return d * d * ((b + 1) * d + b) + 1
        },
        elastic: function(b) {
            if (b == !!b) {
                return b
            }
            return aS(2, -10 * b) * aI.sin((b - 0.075) * (2 * ag) / 0.3) + 1
        },
        bounce: function(i) {
            var d = 7.5625,
                g = 2.75,
                b;
            if (i < (1 / g)) {
                b = d * i * i
            } else {
                if (i < (2 / g)) {
                    i -= (1.5 / g);
                    b = d * i * i + 0.75
                } else {
                    if (i < (2.5 / g)) {
                        i -= (2.25 / g);
                        b = d * i * i + 0.9375
                    } else {
                        i -= (2.625 / g);
                        b = d * i * i + 0.984375
                    }
                }
            }
            return b
        }
    };
    aG.easeIn = aG["ease-in"] = aG["<"];
    aG.easeOut = aG["ease-out"] = aG[">"];
    aG.easeInOut = aG["ease-in-out"] = aG["<>"];
    aG["back-in"] = aG.backIn;
    aG["back-out"] = aG.backOut;
    var bF = [],
        bH = aT.requestAnimationFrame || aT.webkitRequestAnimationFrame || aT.mozRequestAnimationFrame || aT.oRequestAnimationFrame || aT.msRequestAnimationFrame || function(b) {
            setTimeout(b, 16)
        },
        at = function() {
            var bO = +new Date,
                bW = 0;
            for (; bW < bF.length; bW++) {
                var b2 = bF[bW];
                if (b2.el.removed || b2.paused) {
                    continue
                }
                var E = bO - b2.start,
                    bU = b2.ms,
                    bT = b2.easing,
                    bX = b2.from,
                    bR = b2.diff,
                    d = b2.to,
                    bQ = b2.t,
                    S = b2.el,
                    bS = {},
                    b, b0 = {},
                    b4;
                if (b2.initstatus) {
                    E = (b2.initstatus * b2.anim.top - b2.prev) / (b2.percent - b2.prev) * bU;
                    b2.status = b2.initstatus;
                    delete b2.initstatus;
                    b2.stop && bF.splice(bW--, 1)
                } else {
                    b2.status = (b2.prev + (b2.percent - b2.prev) * (E / bU)) / b2.anim.top
                }
                if (E < 0) {
                    continue
                }
                if (E < bU) {
                    var g = bT(E / bU);
                    for (var bV in bX) {
                        if (bX[bw](bV)) {
                            switch (bo[bV]) {
                                case bj:
                                    b = +bX[bV] + g * bU * bR[bV];
                                    break;
                                case "colour":
                                    b = "rgb(" + [a1(C(bX[bV].r + g * bU * bR[bV].r)), a1(C(bX[bV].g + g * bU * bR[bV].g)), a1(C(bX[bV].b + g * bU * bR[bV].b))].join(",") + ")";
                                    break;
                                case "path":
                                    b = [];
                                    for (var bZ = 0, bP = bX[bV].length; bZ < bP; bZ++) {
                                        b[bZ] = [bX[bV][bZ][0]];
                                        for (var bY = 1, b1 = bX[bV][bZ].length; bY < b1; bY++) {
                                            b[bZ][bY] = +bX[bV][bZ][bY] + g * bU * bR[bV][bZ][bY]
                                        }
                                        b[bZ] = b[bZ].join(bh)
                                    }
                                    b = b.join(bh);
                                    break;
                                case "transform":
                                    if (bR[bV].real) {
                                        b = [];
                                        for (bZ = 0, bP = bX[bV].length; bZ < bP; bZ++) {
                                            b[bZ] = [bX[bV][bZ][0]];
                                            for (bY = 1, b1 = bX[bV][bZ].length; bY < b1; bY++) {
                                                b[bZ][bY] = bX[bV][bZ][bY] + g * bU * bR[bV][bZ][bY]
                                            }
                                        }
                                    } else {
                                        var b3 = function(b5) {
                                            return +bX[bV][b5] + g * bU * bR[bV][b5]
                                        };
                                        b = [
                                            ["m", b3(0), b3(1), b3(2), b3(3), b3(4), b3(5)]
                                        ]
                                    }
                                    break;
                                case "csv":
                                    if (bV == "clip-rect") {
                                        b = [];
                                        bZ = 4;
                                        while (bZ--) {
                                            b[bZ] = +bX[bV][bZ] + g * bU * bR[bV][bZ]
                                        }
                                    }
                                    break;
                                default:
                                    var R = [][av](bX[bV]);
                                    b = [];
                                    bZ = S.paper.customAttributes[bV].length;
                                    while (bZ--) {
                                        b[bZ] = +R[bZ] + g * bU * bR[bV][bZ]
                                    }
                                    break
                            }
                            bS[bV] = b
                        }
                    }
                    S.attr(bS);
                    (function(b6, i, b5) {
                        setTimeout(function() {
                            bc("raphael.anim.frame." + b6, i, b5)
                        })
                    })(S.id, S, b2.anim)
                } else {
                    (function(b6, b5, i) {
                        setTimeout(function() {
                            bc("raphael.anim.frame." + b5.id, b5, i);
                            bc("raphael.anim.finish." + b5.id, b5, i);
                            bi.is(b6, "function") && b6.call(b5)
                        })
                    })(b2.callback, S, b2.anim);
                    S.attr(d);
                    bF.splice(bW--, 1);
                    if (b2.repeat > 1 && !b2.next) {
                        for (b4 in d) {
                            if (d[bw](b4)) {
                                b0[b4] = b2.totalOrigin[b4]
                            }
                        }
                        b2.el.attr(b0);
                        T(b2.anim, b2.el, b2.anim.percents[0], null, b2.totalOrigin, b2.repeat - 1)
                    }
                    if (b2.next && !b2.stop) {
                        T(b2.anim, b2.el, b2.next, null, b2.totalOrigin, b2.repeat)
                    }
                }
            }
            bi.svg && S && S.paper && S.paper.safari();
            bF.length && bH(at)
        },
        a1 = function(b) {
            return b > 255 ? 255 : b < 0 ? 0 : b
        };
    aq.animateWith = function(d, E, g, b, bO, bT) {
        var S = this;
        if (S.removed) {
            bT && bT.call(S);
            return S
        }
        var bR = g instanceof f ? g : bi.animation(g, b, bO, bT),
            bQ, bP;
        T(bR, S, bR.percents[0], null, S.attr());
        for (var R = 0, bS = bF.length; R < bS; R++) {
            if (bF[R].anim == E && bF[R].el == d) {
                bF[bS - 1].start = bF[R].start;
                break
            }
        }
        return S
    };

    function a0(bU, i, d, bT, bS, bO) {
        var bP = 3 * i,
            bR = 3 * (bT - i) - bP,
            b = 1 - bP - bR,
            S = 3 * d,
            bQ = 3 * (bS - d) - S,
            bV = 1 - S - bQ;

        function R(bW) {
            return ((b * bW + bR) * bW + bP) * bW
        }

        function g(bW, bY) {
            var bX = E(bW, bY);
            return ((bV * bX + bQ) * bX + S) * bX
        }

        function E(bW, b3) {
            var b2, b1, bZ, bX, b0, bY;
            for (bZ = bW, bY = 0; bY < 8; bY++) {
                bX = R(bZ) - bW;
                if (ak(bX) < b3) {
                    return bZ
                }
                b0 = (3 * b * bZ + 2 * bR) * bZ + bP;
                if (ak(b0) < 0.000001) {
                    break
                }
                bZ = bZ - bX / b0
            }
            b2 = 0;
            b1 = 1;
            bZ = bW;
            if (bZ < b2) {
                return b2
            }
            if (bZ > b1) {
                return b1
            }
            while (b2 < b1) {
                bX = R(bZ);
                if (ak(bX - bW) < b3) {
                    return bZ
                }
                if (bW > bX) {
                    b2 = bZ
                } else {
                    b1 = bZ
                }
                bZ = (b1 - b2) / 2 + b2
            }
            return bZ
        }
        return g(bU, 1 / (200 * bO))
    }
    aq.onAnimation = function(b) {
        b ? bc.on("raphael.anim.frame." + this.id, b) : bc.unbind("raphael.anim.frame." + this.id);
        return this
    };

    function f(E, g) {
        var d = [],
            i = {};
        this.ms = g;
        this.times = 1;
        if (E) {
            for (var b in E) {
                if (E[bw](b)) {
                    i[bM(b)] = E[b];
                    d.push(bM(b))
                }
            }
            d.sort(bu)
        }
        this.anim = i;
        this.top = d[d.length - 1];
        this.percents = d
    }
    f.prototype.delay = function(d) {
        var b = new f(this.anim, this.ms);
        b.times = this.times;
        b.del = +d || 0;
        return b
    };
    f.prototype.repeat = function(d) {
        var b = new f(this.anim, this.ms);
        b.del = this.del;
        b.times = aI.floor(bI(d, 0)) || 1;
        return b
    };

    function T(b6, g, b, b4, bO, bS) {
        b = bM(b);
        var cd, S, bR, ce = [],
            bY, bX, R, b0 = b6.ms,
            b5 = {},
            E = {},
            bU = {};
        if (b4) {
            for (b9 = 0, bT = bF.length; b9 < bT; b9++) {
                var cb = bF[b9];
                if (cb.el.id == g.id && cb.anim == b6) {
                    if (cb.percent != b) {
                        bF.splice(b9, 1);
                        bR = 1
                    } else {
                        S = cb
                    }
                    g.attr(cb.totalOrigin);
                    break
                }
            }
        } else {
            b4 = +E
        }
        for (var b9 = 0, bT = b6.percents.length; b9 < bT; b9++) {
            if (b6.percents[b9] == b || b6.percents[b9] > b4 * b6.top) {
                b = b6.percents[b9];
                bX = b6.percents[b9 - 1] || 0;
                b0 = b0 / b6.top * (b - bX);
                bY = b6.percents[b9 + 1];
                cd = b6.anim[b];
                break
            } else {
                if (b4) {
                    g.attr(b6.anim[b6.percents[b9]])
                }
            }
        }
        if (!cd) {
            return
        }
        if (!S) {
            for (var b2 in cd) {
                if (cd[bw](b2)) {
                    if (bo[bw](b2) || g.paper.customAttributes[bw](b2)) {
                        b5[b2] = g.attr(b2);
                        (b5[b2] == null) && (b5[b2] = bq[b2]);
                        E[b2] = cd[b2];
                        switch (bo[b2]) {
                            case bj:
                                bU[b2] = (E[b2] - b5[b2]) / b0;
                                break;
                            case "colour":
                                b5[b2] = bi.getRGB(b5[b2]);
                                var b3 = bi.getRGB(E[b2]);
                                bU[b2] = {
                                    r: (b3.r - b5[b2].r) / b0,
                                    g: (b3.g - b5[b2].g) / b0,
                                    b: (b3.b - b5[b2].b) / b0
                                };
                                break;
                            case "path":
                                var bP = bk(b5[b2], E[b2]),
                                    bW = bP[1];
                                b5[b2] = bP[0];
                                bU[b2] = [];
                                for (b9 = 0, bT = b5[b2].length; b9 < bT; b9++) {
                                    bU[b2][b9] = [0];
                                    for (var b8 = 1, ca = b5[b2][b9].length; b8 < ca; b8++) {
                                        bU[b2][b9][b8] = (bW[b9][b8] - b5[b2][b9][b8]) / b0
                                    }
                                }
                                break;
                            case "transform":
                                var cg = g._,
                                    cf = bd(cg[b2], E[b2]);
                                if (cf) {
                                    b5[b2] = cf.from;
                                    E[b2] = cf.to;
                                    bU[b2] = [];
                                    bU[b2].real = true;
                                    for (b9 = 0, bT = b5[b2].length; b9 < bT; b9++) {
                                        bU[b2][b9] = [b5[b2][b9][0]];
                                        for (b8 = 1, ca = b5[b2][b9].length; b8 < ca; b8++) {
                                            bU[b2][b9][b8] = (E[b2][b9][b8] - b5[b2][b9][b8]) / b0
                                        }
                                    }
                                } else {
                                    var b1 = (g.matrix || new a9),
                                        cc = {
                                            _: {
                                                transform: cg.transform
                                            },
                                            getBBox: function() {
                                                return g.getBBox(1)
                                            }
                                        };
                                    b5[b2] = [b1.a, b1.b, b1.c, b1.d, b1.e, b1.f];
                                    Y(cc, E[b2]);
                                    E[b2] = cc._.transform;
                                    bU[b2] = [(cc.matrix.a - b1.a) / b0, (cc.matrix.b - b1.b) / b0, (cc.matrix.c - b1.c) / b0, (cc.matrix.d - b1.d) / b0, (cc.matrix.e - b1.e) / b0, (cc.matrix.f - b1.f) / b0]
                                }
                                break;
                            case "csv":
                                var d = k(cd[b2])[l](bv),
                                    bQ = k(b5[b2])[l](bv);
                                if (b2 == "clip-rect") {
                                    b5[b2] = bQ;
                                    bU[b2] = [];
                                    b9 = bQ.length;
                                    while (b9--) {
                                        bU[b2][b9] = (d[b9] - b5[b2][b9]) / b0
                                    }
                                }
                                E[b2] = d;
                                break;
                            default:
                                d = [][av](cd[b2]);
                                bQ = [][av](b5[b2]);
                                bU[b2] = [];
                                b9 = g.paper.customAttributes[b2].length;
                                while (b9--) {
                                    bU[b2][b9] = ((d[b9] || 0) - (bQ[b9] || 0)) / b0
                                }
                                break
                        }
                    }
                }
            }
            var bZ = cd.easing,
                b7 = bi.easing_formulas[bZ];
            if (!b7) {
                b7 = k(bZ).match(an);
                if (b7 && b7.length == 5) {
                    var bV = b7;
                    b7 = function(i) {
                        return a0(i, +bV[1], +bV[2], +bV[3], +bV[4], b0)
                    }
                } else {
                    b7 = aw
                }
            }
            R = cd.start || b6.start || +new Date;
            cb = {
                anim: b6,
                percent: b,
                timestamp: R,
                start: R + (b6.del || 0),
                status: 0,
                initstatus: b4 || 0,
                stop: false,
                ms: b0,
                easing: b7,
                from: b5,
                diff: bU,
                to: E,
                el: g,
                callback: cd.callback,
                prev: bX,
                next: bY,
                repeat: bS || b6.times,
                origin: g.attr(),
                totalOrigin: bO
            };
            bF.push(cb);
            if (b4 && !S && !bR) {
                cb.stop = true;
                cb.start = new Date - b0 * b4;
                if (bF.length == 1) {
                    return at()
                }
            }
            if (bR) {
                cb.start = new Date - cb.ms * b4
            }
            bF.length == 1 && bH(at)
        } else {
            S.initstatus = b4;
            S.start = new Date - S.ms * b4
        }
        bc("raphael.anim.start." + g.id, g, b6)
    }
    bi.animation = function(E, d, S, R) {
        if (E instanceof f) {
            return E
        }
        if (bi.is(S, "function") || !S) {
            R = R || S || null;
            S = null
        }
        E = Object(E);
        d = +d || 0;
        var i = {},
            g, b;
        for (b in E) {
            if (E[bw](b) && bM(b) != b && bM(b) + "%" != b) {
                g = true;
                i[b] = E[b]
            }
        }
        if (!g) {
            return new f(E, d)
        } else {
            S && (i.easing = S);
            R && (i.callback = R);
            return new f({
                100: i
            }, d)
        }
    };
    aq.animate = function(i, b, R, E) {
        var d = this;
        if (d.removed) {
            E && E.call(d);
            return d
        }
        var g = i instanceof f ? i : bi.animation(i, b, R, E);
        T(g, d, g.percents[0], null, d.attr());
        return d
    };
    aq.setTime = function(d, b) {
        if (d && b != null) {
            this.status(d, ai(b, d.ms) / d.ms)
        }
        return this
    };
    aq.status = function(R, E) {
        var d = [],
            g = 0,
            b, S;
        if (E != null) {
            T(R, this, -1, ai(E, 1));
            return this
        } else {
            b = bF.length;
            for (; g < b; g++) {
                S = bF[g];
                if (S.el.id == this.id && (!R || S.anim == R)) {
                    if (R) {
                        return S.status
                    }
                    d.push({
                        anim: S.anim,
                        status: S.status
                    })
                }
            }
            if (R) {
                return 0
            }
            return d
        }
    };
    aq.pause = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                if (bc("raphael.anim.pause." + this.id, this, bF[b].anim) !== false) {
                    bF[b].paused = true
                }
            }
        }
        return this
    };
    aq.resume = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                var g = bF[b];
                if (bc("raphael.anim.resume." + this.id, this, g.anim) !== false) {
                    delete g.paused;
                    this.status(g.anim, g.status)
                }
            }
        }
        return this
    };
    aq.stop = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                if (bc("raphael.anim.stop." + this.id, this, bF[b].anim) !== false) {
                    bF.splice(b--, 1)
                }
            }
        }
        return this
    };

    function be(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.paper == d) {
                bF.splice(b--, 1)
            }
        }
    }
    bc.on("raphael.remove", be);
    bc.on("raphael.clear", be);
    aq.toString = function() {
        return "Rapha\xebl\u2019s object"
    };
    var X = function(b) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (b) {
                for (var d = 0, g = b.length; d < g; d++) {
                    if (b[d] && (b[d].constructor == aq.constructor || b[d].constructor == X)) {
                        this[this.items.length] = this.items[this.items.length] = b[d];
                        this.length++
                    }
                }
            }
        },
        v = X.prototype;
    v.push = function() {
        var E, b;
        for (var d = 0, g = arguments.length; d < g; d++) {
            E = arguments[d];
            if (E && (E.constructor == aq.constructor || E.constructor == X)) {
                b = this.items.length;
                this[b] = this.items[b] = E;
                this.length++
            }
        }
        return this
    };
    v.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop()
    };
    v.forEach = function(E, b) {
        for (var d = 0, g = this.items.length; d < g; d++) {
            if (E.call(b, this.items[d], d) === false) {
                return this
            }
        }
        return this
    };
    for (var aF in aq) {
        if (aq[bw](aF)) {
            v[aF] = (function(b) {
                return function() {
                    var d = arguments;
                    return this.forEach(function(g) {
                        g[b][bs](g, d)
                    })
                }
            })(aF)
        }
    }
    v.attr = function(d, S) {
        if (d && bi.is(d, u) && bi.is(d[0], "object")) {
            for (var b = 0, R = d.length; b < R; b++) {
                this.items[b].attr(d[b])
            }
        } else {
            for (var g = 0, E = this.items.length; g < E; g++) {
                this.items[g].attr(d, S)
            }
        }
        return this
    };
    v.clear = function() {
        while (this.length) {
            this.pop()
        }
    };
    v.splice = function(E, bO, bP) {
        E = E < 0 ? bI(this.length + E, 0) : E;
        bO = bI(0, ai(this.length - E, bO));
        var g = [],
            b = [],
            d = [],
            R;
        for (R = 2; R < arguments.length; R++) {
            d.push(arguments[R])
        }
        for (R = 0; R < bO; R++) {
            b.push(this[E + R])
        }
        for (; R < this.length - E; R++) {
            g.push(this[E + R])
        }
        var S = d.length;
        for (R = 0; R < S + g.length; R++) {
            this.items[E + R] = this[E + R] = R < S ? d[R] : g[R - S]
        }
        R = this.items.length = this.length -= bO - S;
        while (this[R]) {
            delete this[R++]
        }
        return new X(b)
    };
    v.exclude = function(g) {
        for (var b = 0, d = this.length; b < d; b++) {
            if (this[b] == g) {
                this.splice(b, 1);
                return true
            }
        }
    };
    v.animate = function(g, b, bO, bQ) {
        (bi.is(bO, "function") || !bO) && (bQ = bO || null);
        var S = this.items.length,
            E = S,
            bR, bP = this,
            R;
        if (!S) {
            return this
        }
        bQ && (R = function() {
            !--S && bQ.call(bP)
        });
        bO = bi.is(bO, a) ? bO : R;
        var d = bi.animation(g, b, bO, R);
        bR = this.items[--E].animate(d);
        while (E--) {
            this.items[E] && !this.items[E].removed && this.items[E].animateWith(bR, d, d);
            (this.items[E] && !this.items[E].removed) || S--
        }
        return this
    };
    v.insertAfter = function(d) {
        var b = this.items.length;
        while (b--) {
            this.items[b].insertAfter(d)
        }
        return this
    };
    v.getBBox = function() {
        var b = [],
            S = [],
            d = [],
            E = [];
        for (var g = this.items.length; g--;) {
            if (!this.items[g].removed) {
                var R = this.items[g].getBBox();
                b.push(R.x);
                S.push(R.y);
                d.push(R.x + R.width);
                E.push(R.y + R.height)
            }
        }
        b = ai[bs](0, b);
        S = ai[bs](0, S);
        d = bI[bs](0, d);
        E = bI[bs](0, E);
        return {
            x: b,
            y: S,
            x2: d,
            y2: E,
            width: d - b,
            height: E - S
        }
    };
    v.clone = function(g) {
        g = this.paper.set();
        for (var b = 0, d = this.items.length; b < d; b++) {
            g.push(this.items[b].clone())
        }
        return g
    };
    v.toString = function() {
        return "Rapha\xebl\u2018s set"
    };
    v.glow = function(d) {
        var b = this.paper.set();
        this.forEach(function(i, E) {
            var R = i.glow(d);
            if (R != null) {
                R.forEach(function(g, S) {
                    b.push(g)
                })
            }
        });
        return b
    };
    v.isPointInside = function(b, g) {
        var d = false;
        this.forEach(function(i) {
            if (i.isPointInside(b, g)) {
                console.log("runned");
                d = true;
                return false
            }
        });
        return d
    };
    bi.registerFont = function(d) {
        if (!d.face) {
            return d
        }
        this.fonts = this.fonts || {};
        var i = {
                w: d.w,
                face: {},
                glyphs: {}
            },
            g = d.face["font-family"];
        for (var S in d.face) {
            if (d.face[bw](S)) {
                i.face[S] = d.face[S]
            }
        }
        if (this.fonts[g]) {
            this.fonts[g].push(i)
        } else {
            this.fonts[g] = [i]
        }
        if (!d.svg) {
            i.face["units-per-em"] = bK(d.face["units-per-em"], 10);
            for (var E in d.glyphs) {
                if (d.glyphs[bw](E)) {
                    var R = d.glyphs[E];
                    i.glyphs[E] = {
                        w: R.w,
                        k: {},
                        d: R.d && "M" + R.d.replace(/[mlcxtrv]/g, function(bO) {
                            return {
                                l: "L",
                                c: "C",
                                x: "z",
                                t: "m",
                                r: "l",
                                v: "c"
                            }[bO] || "M"
                        }) + "z"
                    };
                    if (R.k) {
                        for (var b in R.k) {
                            if (R[bw](b)) {
                                i.glyphs[E].k[b] = R.k[b]
                            }
                        }
                    }
                }
            }
        }
        return d
    };
    ao.getFont = function(bP, bQ, d, E) {
        E = E || "normal";
        d = d || "normal";
        bQ = +bQ || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[bQ] || 400;
        if (!bi.fonts) {
            return
        }
        var R = bi.fonts[bP];
        if (!R) {
            var g = new RegExp("(^|\\s)" + bP.replace(/[^\w\d\s+!~.:_-]/g, bn) + "(\\s|$)", "i");
            for (var b in bi.fonts) {
                if (bi.fonts[bw](b)) {
                    if (g.test(b)) {
                        R = bi.fonts[b];
                        break
                    }
                }
            }
        }
        var S;
        if (R) {
            for (var bO = 0, bR = R.length; bO < bR; bO++) {
                S = R[bO];
                if (S.face["font-weight"] == bQ && (S.face["font-style"] == d || !S.face["font-style"]) && S.face["font-stretch"] == E) {
                    break
                }
            }
        }
        return S
    };
    ao.print = function(bP, bO, b, bS, bU, b2, g, d) {
        b2 = b2 || "middle";
        g = bI(ai(g || 0, 1), -1);
        d = bI(ai(d || 1, 3), 1);
        var b1 = k(b)[l](bn),
            bY = 0,
            b0 = 0,
            bW = bn,
            b3;
        bi.is(bS, "string") && (bS = this.getFont(bS));
        if (bS) {
            b3 = (bU || 16) / bS.face["units-per-em"];
            var R = bS.face.bbox[l](bv),
                bR = +R[0],
                E = R[3] - R[1],
                S = 0,
                bT = +R[1] + (b2 == "baseline" ? E + (+bS.face.descent) : E / 2);
            for (var bX = 0, bQ = b1.length; bX < bQ; bX++) {
                if (b1[bX] == "\n") {
                    bY = 0;
                    bZ = 0;
                    b0 = 0;
                    S += E * d
                } else {
                    var bV = b0 && bS.glyphs[b1[bX - 1]] || {},
                        bZ = bS.glyphs[b1[bX]];
                    bY += b0 ? (bV.w || bS.w) + (bV.k && bV.k[b1[bX]] || 0) + (bS.w * g) : 0;
                    b0 = 1
                }
                if (bZ && bZ.d) {
                    bW += bi.transformPath(bZ.d, ["t", bY * b3, S * b3, "s", b3, b3, bR, bT, "t", (bP - bR) / b3, (bO - bT) / b3])
                }
            }
        }
        return this.path(bW).attr({
            fill: "#000",
            stroke: "none"
        })
    };
    ao.add = function(E) {
        if (bi.is(E, "array")) {
            var g = this.set(),
                d = 0,
                R = E.length,
                b;
            for (; d < R; d++) {
                b = E[d] || {};
                au[bw](b.type) && g.push(this[b.type]().attr(b))
            }
        }
        return g
    };
    bi.format = function(d, g) {
        var b = bi.is(g, u) ? [0][av](g) : arguments;
        d && bi.is(d, a) && b.length - 1 && (d = d.replace(W, function(R, E) {
            return b[++E] == null ? bn : b[E]
        }));
        return d || bn
    };
    bi.fullfill = (function() {
        var g = /\{([^\}]+)\}/g,
            b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            d = function(R, E, S) {
                var i = S;
                E.replace(b, function(bQ, bP, bO, bS, bR) {
                    bP = bP || bS;
                    if (i) {
                        if (bP in i) {
                            i = i[bP]
                        }
                        typeof i == "function" && bR && (i = i())
                    }
                });
                i = (i == null || i == S ? R : i) + "";
                return i
            };
        return function(E, i) {
            return String(E).replace(g, function(S, R) {
                return d(S, R, i)
            })
        }
    })();
    bi.ninja = function() {
        aE.was ? (a5.win.Raphael = aE.is) : delete Raphael;
        return bi
    };
    bi.st = v;
    (function(i, d, g) {
        if (i.readyState == null && i.addEventListener) {
            i.addEventListener(d, g = function() {
                i.removeEventListener(d, g, false);
                i.readyState = "complete"
            }, false);
            i.readyState = "loading"
        }

        function b() {
            (/in/).test(i.readyState) ? setTimeout(b, 9) : bi.eve("raphael.DOMload")
        }
        b()
    })(document, "DOMContentLoaded");
    bc.on("raphael.DOMload", function() {
        K = true
    });
    (function() {
        if (!bi.svg) {
            return
        }
        var i = "hasOwnProperty",
            b9 = String,
            bV = parseFloat,
            bY = parseInt,
            bO = Math,
            ca = bO.max,
            b0 = bO.abs,
            bQ = bO.pow,
            bP = /[, ]+/,
            b7 = bi.eve,
            bZ = "",
            bS = " ";
        var bW = "http://www.w3.org/1999/xlink",
            b6 = {
                block: "M5,0 0,2.5 5,5z",
                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                open: "M6,1 1,3.5 6,6",
                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            },
            b2 = {};
        bi.toString = function() {
            return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version
        };
        var bR = function(cb, E) {
                if (E) {
                    if (typeof cb == "string") {
                        cb = bR(cb)
                    }
                    for (var S in E) {
                        if (E[i](S)) {
                            if (S.substring(0, 6) == "xlink:") {
                                cb.setAttributeNS(bW, S.substring(6), b9(E[S]))
                            } else {
                                cb.setAttribute(S, b9(E[S]))
                            }
                        }
                    }
                } else {
                    cb = bi._g.doc.createElementNS("http://www.w3.org/2000/svg", cb);
                    cb.style && (cb.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
                }
                return cb
            },
            b = function(ci, cm) {
                var ck = "linear",
                    S = ci.id + cm,
                    cg = 0.5,
                    ce = 0.5,
                    cc = ci.node,
                    E = ci.paper,
                    co = cc.style,
                    cb = bi._g.doc.getElementById(S);
                if (!cb) {
                    cm = b9(cm).replace(bi._radial_gradient, function(cr, cp, cs) {
                        ck = "radial";
                        if (cp && cs) {
                            cg = bV(cp);
                            ce = bV(cs);
                            var cq = ((ce > 0.5) * 2 - 1);
                            bQ(cg - 0.5, 2) + bQ(ce - 0.5, 2) > 0.25 && (ce = bO.sqrt(0.25 - bQ(cg - 0.5, 2)) * cq + 0.5) && ce != 0.5 && (ce = ce.toFixed(5) - 0.00001 * cq)
                        }
                        return bZ
                    });
                    cm = cm.split(/\s*\-\s*/);
                    if (ck == "linear") {
                        var cf = cm.shift();
                        cf = -bV(cf);
                        if (isNaN(cf)) {
                            return null
                        }
                        var cd = [0, 0, bO.cos(bi.rad(cf)), bO.sin(bi.rad(cf))],
                            cl = 1 / (ca(b0(cd[2]), b0(cd[3])) || 1);
                        cd[2] *= cl;
                        cd[3] *= cl;
                        if (cd[2] < 0) {
                            cd[0] = -cd[2];
                            cd[2] = 0
                        }
                        if (cd[3] < 0) {
                            cd[1] = -cd[3];
                            cd[3] = 0
                        }
                    }
                    var cj = bi._parseDots(cm);
                    if (!cj) {
                        return null
                    }
                    S = S.replace(/[\(\)\s,\xb0#]/g, "_");
                    if (ci.gradient && S != ci.gradient.id) {
                        E.defs.removeChild(ci.gradient);
                        delete ci.gradient
                    }
                    if (!ci.gradient) {
                        cb = bR(ck + "Gradient", {
                            id: S
                        });
                        ci.gradient = cb;
                        bR(cb, ck == "radial" ? {
                            fx: cg,
                            fy: ce
                        } : {
                            x1: cd[0],
                            y1: cd[1],
                            x2: cd[2],
                            y2: cd[3],
                            gradientTransform: ci.matrix.invert()
                        });
                        E.defs.appendChild(cb);
                        for (var ch = 0, cn = cj.length; ch < cn; ch++) {
                            cb.appendChild(bR("stop", {
                                offset: cj[ch].offset ? cj[ch].offset : ch ? "100%" : "0%",
                                "stop-color": cj[ch].color || "#fff"
                            }))
                        }
                    }
                }
                bR(cc, {
                    fill: "url(#" + S + ")",
                    opacity: 1,
                    "fill-opacity": 1
                });
                co.fill = bZ;
                co.opacity = 1;
                co.fillOpacity = 1;
                return 1
            },
            d = function(S) {
                var E = S.getBBox(1);
                bR(S.pattern, {
                    patternTransform: S.matrix.invert() + " translate(" + E.x + "," + E.y + ")"
                })
            },
            g = function(ck, cm, cf) {
                if (ck.type == "path") {
                    var E = b9(cm).toLowerCase().split("-"),
                        cj = ck.paper,
                        cx = cf ? "end" : "start",
                        co = ck.node,
                        cl = ck.attrs,
                        ce = cl["stroke-width"],
                        cs = E.length,
                        cc = "classic",
                        cr, cb, ch, cp, cn, cg = 3,
                        ct = 3,
                        ci = 5;
                    while (cs--) {
                        switch (E[cs]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                cc = E[cs];
                                break;
                            case "wide":
                                ct = 5;
                                break;
                            case "narrow":
                                ct = 2;
                                break;
                            case "long":
                                cg = 5;
                                break;
                            case "short":
                                cg = 2;
                                break
                        }
                    }
                    if (cc == "open") {
                        cg += 2;
                        ct += 2;
                        ci += 2;
                        ch = 1;
                        cp = cf ? 4 : 1;
                        cn = {
                            fill: "none",
                            stroke: cl.stroke
                        }
                    } else {
                        cp = ch = cg / 2;
                        cn = {
                            fill: cl.stroke,
                            stroke: "none"
                        }
                    }
                    if (ck._.arrows) {
                        if (cf) {
                            ck._.arrows.endPath && b2[ck._.arrows.endPath]--;
                            ck._.arrows.endMarker && b2[ck._.arrows.endMarker]--
                        } else {
                            ck._.arrows.startPath && b2[ck._.arrows.startPath]--;
                            ck._.arrows.startMarker && b2[ck._.arrows.startMarker]--
                        }
                    } else {
                        ck._.arrows = {}
                    }
                    if (cc != "none") {
                        var S = "raphael-marker-" + cc,
                            cw = "raphael-marker-" + cx + cc + cg + ct;
                        if (!bi._g.doc.getElementById(S)) {
                            cj.defs.appendChild(bR(bR("path"), {
                                "stroke-linecap": "round",
                                d: b6[cc],
                                id: S
                            }));
                            b2[S] = 1
                        } else {
                            b2[S]++
                        }
                        var cd = bi._g.doc.getElementById(cw),
                            cq;
                        if (!cd) {
                            cd = bR(bR("marker"), {
                                id: cw,
                                markerHeight: ct,
                                markerWidth: cg,
                                orient: "auto",
                                refX: cp,
                                refY: ct / 2
                            });
                            cq = bR(bR("use"), {
                                "xlink:href": "#" + S,
                                transform: (cf ? "rotate(180 " + cg / 2 + " " + ct / 2 + ") " : bZ) + "scale(" + cg / ci + "," + ct / ci + ")",
                                "stroke-width": (1 / ((cg / ci + ct / ci) / 2)).toFixed(4)
                            });
                            cd.appendChild(cq);
                            cj.defs.appendChild(cd);
                            b2[cw] = 1
                        } else {
                            b2[cw]++;
                            cq = cd.getElementsByTagName("use")[0]
                        }
                        bR(cq, cn);
                        var cv = ch * (cc != "diamond" && cc != "oval");
                        if (cf) {
                            cr = ck._.arrows.startdx * ce || 0;
                            cb = bi.getTotalLength(cl.path) - cv * ce
                        } else {
                            cr = cv * ce;
                            cb = bi.getTotalLength(cl.path) - (ck._.arrows.enddx * ce || 0)
                        }
                        cn = {};
                        cn["marker-" + cx] = "url(#" + cw + ")";
                        if (cb || cr) {
                            cn.d = bi.getSubpath(cl.path, cr, cb)
                        }
                        bR(co, cn);
                        ck._.arrows[cx + "Path"] = S;
                        ck._.arrows[cx + "Marker"] = cw;
                        ck._.arrows[cx + "dx"] = cv;
                        ck._.arrows[cx + "Type"] = cc;
                        ck._.arrows[cx + "String"] = cm
                    } else {
                        if (cf) {
                            cr = ck._.arrows.startdx * ce || 0;
                            cb = bi.getTotalLength(cl.path) - cr
                        } else {
                            cr = 0;
                            cb = bi.getTotalLength(cl.path) - (ck._.arrows.enddx * ce || 0)
                        }
                        ck._.arrows[cx + "Path"] && bR(co, {
                            d: bi.getSubpath(cl.path, cr, cb)
                        });
                        delete ck._.arrows[cx + "Path"];
                        delete ck._.arrows[cx + "Marker"];
                        delete ck._.arrows[cx + "dx"];
                        delete ck._.arrows[cx + "Type"];
                        delete ck._.arrows[cx + "String"]
                    }
                    for (cn in b2) {
                        if (b2[i](cn) && !b2[cn]) {
                            var cu = bi._g.doc.getElementById(cn);
                            cu && cu.parentNode.removeChild(cu)
                        }
                    }
                }
            },
            b3 = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            },
            bT = function(cf, cd, ce) {
                cd = b3[b9(cd).toLowerCase()];
                if (cd) {
                    var cb = cf.attrs["stroke-width"] || "1",
                        E = {
                            round: cb,
                            square: cb,
                            butt: 0
                        }[cf.attrs["stroke-linecap"] || ce["stroke-linecap"]] || 0,
                        cc = [],
                        S = cd.length;
                    while (S--) {
                        cc[S] = cd[S] * cb + ((S % 2) ? 1 : -1) * E
                    }
                    bR(cf.node, {
                        "stroke-dasharray": cc.join(",")
                    })
                }
            },
            b4 = function(ck, cs) {
                var co = ck.node,
                    cl = ck.attrs,
                    ci = co.style.visibility;
                co.style.visibility = "hidden";
                for (var cn in cs) {
                    if (cs[i](cn)) {
                        if (!bi._availableAttrs[i](cn)) {
                            continue
                        }
                        var cm = cs[cn];
                        cl[cn] = cm;
                        switch (cn) {
                            case "blur":
                                ck.blur(cm);
                                break;
                            case "href":
                            case "title":
                            case "target":
                                var cq = co.parentNode;
                                if (cq.tagName.toLowerCase() != "a") {
                                    var cd = bR("a");
                                    cq.insertBefore(cd, co);
                                    cd.appendChild(co);
                                    cq = cd
                                }
                                if (cn == "target") {
                                    cq.setAttributeNS(bW, "show", cm == "blank" ? "new" : cm)
                                } else {
                                    cq.setAttributeNS(bW, cn, cm)
                                }
                                break;
                            case "cursor":
                                co.style.cursor = cm;
                                break;
                            case "transform":
                                ck.transform(cm);
                                break;
                            case "arrow-start":
                                g(ck, cm);
                                break;
                            case "arrow-end":
                                g(ck, cm, 1);
                                break;
                            case "clip-rect":
                                var S = b9(cm).split(bP);
                                if (S.length == 4) {
                                    ck.clip && ck.clip.parentNode.parentNode.removeChild(ck.clip.parentNode);
                                    var cb = bR("clipPath"),
                                        cp = bR("rect");
                                    cb.id = bi.createUUID();
                                    bR(cp, {
                                        x: S[0],
                                        y: S[1],
                                        width: S[2],
                                        height: S[3]
                                    });
                                    cb.appendChild(cp);
                                    ck.paper.defs.appendChild(cb);
                                    bR(co, {
                                        "clip-path": "url(#" + cb.id + ")"
                                    });
                                    ck.clip = cp
                                }
                                if (!cm) {
                                    var cj = co.getAttribute("clip-path");
                                    if (cj) {
                                        var cr = bi._g.doc.getElementById(cj.replace(/(^url\(#|\)$)/g, bZ));
                                        cr && cr.parentNode.removeChild(cr);
                                        bR(co, {
                                            "clip-path": bZ
                                        });
                                        delete ck.clip
                                    }
                                }
                                break;
                            case "path":
                                if (ck.type == "path") {
                                    bR(co, {
                                        d: cm ? cl.path = bi._pathToAbsolute(cm) : "M0,0"
                                    });
                                    ck._.dirty = 1;
                                    if (ck._.arrows) {
                                        "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                        "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                    }
                                }
                                break;
                            case "width":
                                co.setAttribute(cn, cm);
                                ck._.dirty = 1;
                                if (cl.fx) {
                                    cn = "x";
                                    cm = cl.x
                                } else {
                                    break
                                }
                            case "x":
                                if (cl.fx) {
                                    cm = -cl.x - (cl.width || 0)
                                }
                            case "rx":
                                if (cn == "rx" && ck.type == "rect") {
                                    break
                                }
                            case "cx":
                                co.setAttribute(cn, cm);
                                ck.pattern && d(ck);
                                ck._.dirty = 1;
                                break;
                            case "height":
                                co.setAttribute(cn, cm);
                                ck._.dirty = 1;
                                if (cl.fy) {
                                    cn = "y";
                                    cm = cl.y
                                } else {
                                    break
                                }
                            case "y":
                                if (cl.fy) {
                                    cm = -cl.y - (cl.height || 0)
                                }
                            case "ry":
                                if (cn == "ry" && ck.type == "rect") {
                                    break
                                }
                            case "cy":
                                co.setAttribute(cn, cm);
                                ck.pattern && d(ck);
                                ck._.dirty = 1;
                                break;
                            case "r":
                                if (ck.type == "rect") {
                                    bR(co, {
                                        rx: cm,
                                        ry: cm
                                    })
                                } else {
                                    co.setAttribute(cn, cm)
                                }
                                ck._.dirty = 1;
                                break;
                            case "src":
                                if (ck.type == "image") {
                                    co.setAttributeNS(bW, "href", cm)
                                }
                                break;
                            case "stroke-width":
                                if (ck._.sx != 1 || ck._.sy != 1) {
                                    cm /= ca(b0(ck._.sx), b0(ck._.sy)) || 1
                                }
                                if (ck.paper._vbSize) {
                                    cm *= ck.paper._vbSize
                                }
                                co.setAttribute(cn, cm);
                                if (cl["stroke-dasharray"]) {
                                    bT(ck, cl["stroke-dasharray"], cs)
                                }
                                if (ck._.arrows) {
                                    "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                    "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                }
                                break;
                            case "stroke-dasharray":
                                bT(ck, cm, cs);
                                break;
                            case "fill":
                                var ce = b9(cm).match(bi._ISURL);
                                if (ce) {
                                    cb = bR("pattern");
                                    var ch = bR("image");
                                    cb.id = bi.createUUID();
                                    bR(cb, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    bR(ch, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": ce[1]
                                    });
                                    cb.appendChild(ch);
                                    (function(ct) {
                                        bi._preload(ce[1], function() {
                                            var cu = this.offsetWidth,
                                                cv = this.offsetHeight;
                                            bR(ct, {
                                                width: cu,
                                                height: cv
                                            });
                                            bR(ch, {
                                                width: cu,
                                                height: cv
                                            });
                                            ck.paper.safari()
                                        })
                                    })(cb);
                                    ck.paper.defs.appendChild(cb);
                                    bR(co, {
                                        fill: "url(#" + cb.id + ")"
                                    });
                                    ck.pattern = cb;
                                    ck.pattern && d(ck);
                                    break
                                }
                                var cc = bi.getRGB(cm);
                                if (!cc.error) {
                                    delete cs.gradient;
                                    delete cl.gradient;
                                    !bi.is(cl.opacity, "undefined") && bi.is(cs.opacity, "undefined") && bR(co, {
                                        opacity: cl.opacity
                                    });
                                    !bi.is(cl["fill-opacity"], "undefined") && bi.is(cs["fill-opacity"], "undefined") && bR(co, {
                                        "fill-opacity": cl["fill-opacity"]
                                    })
                                } else {
                                    if ((ck.type == "circle" || ck.type == "ellipse" || b9(cm).charAt() != "r") && b(ck, cm)) {
                                        if ("opacity" in cl || "fill-opacity" in cl) {
                                            var E = bi._g.doc.getElementById(co.getAttribute("fill").replace(/^url\(#|\)$/g, bZ));
                                            if (E) {
                                                var cf = E.getElementsByTagName("stop");
                                                bR(cf[cf.length - 1], {
                                                    "stop-opacity": ("opacity" in cl ? cl.opacity : 1) * ("fill-opacity" in cl ? cl["fill-opacity"] : 1)
                                                })
                                            }
                                        }
                                        cl.gradient = cm;
                                        cl.fill = "none";
                                        break
                                    }
                                }
                                cc[i]("opacity") && bR(co, {
                                    "fill-opacity": cc.opacity > 1 ? cc.opacity / 100 : cc.opacity
                                });
                            case "stroke":
                                cc = bi.getRGB(cm);
                                co.setAttribute(cn, cc.hex);
                                cn == "stroke" && cc[i]("opacity") && bR(co, {
                                    "stroke-opacity": cc.opacity > 1 ? cc.opacity / 100 : cc.opacity
                                });
                                if (cn == "stroke" && ck._.arrows) {
                                    "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                    "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                }
                                break;
                            case "gradient":
                                (ck.type == "circle" || ck.type == "ellipse" || b9(cm).charAt() != "r") && b(ck, cm);
                                break;
                            case "opacity":
                                if (cl.gradient && !cl[i]("stroke-opacity")) {
                                    bR(co, {
                                        "stroke-opacity": cm > 1 ? cm / 100 : cm
                                    })
                                }
                            case "fill-opacity":
                                if (cl.gradient) {
                                    E = bi._g.doc.getElementById(co.getAttribute("fill").replace(/^url\(#|\)$/g, bZ));
                                    if (E) {
                                        cf = E.getElementsByTagName("stop");
                                        bR(cf[cf.length - 1], {
                                            "stop-opacity": cm
                                        })
                                    }
                                    break
                                }
                            default:
                                cn == "font-size" && (cm = bY(cm, 10) + "px");
                                var cg = cn.replace(/(\-.)/g, function(ct) {
                                    return ct.substring(1).toUpperCase()
                                });
                                co.style[cg] = cm;
                                ck._.dirty = 1;
                                co.setAttribute(cn, cm);
                                break
                        }
                    }
                }
                bX(ck, cs);
                co.style.visibility = ci
            },
            b8 = 1.2,
            bX = function(E, cd) {
                if (E.type != "text" || !(cd[i]("text") || cd[i]("font") || cd[i]("font-size") || cd[i]("x") || cd[i]("y"))) {
                    return
                }
                var ci = E.attrs,
                    cb = E.node,
                    ck = cb.firstChild ? bY(bi._g.doc.defaultView.getComputedStyle(cb.firstChild, bZ).getPropertyValue("font-size"), 10) : 10;
                if (cd[i]("text")) {
                    ci.text = cd.text;
                    while (cb.firstChild) {
                        cb.removeChild(cb.firstChild)
                    }
                    var cc = b9(cd.text).split("\n"),
                        S = [],
                        cg;
                    for (var ce = 0, cj = cc.length; ce < cj; ce++) {
                        cg = bR("tspan");
                        ce && bR(cg, {
                            dy: ck * b8,
                            x: ci.x
                        });
                        cg.appendChild(bi._g.doc.createTextNode(cc[ce]));
                        cb.appendChild(cg);
                        S[ce] = cg
                    }
                } else {
                    S = cb.getElementsByTagName("tspan");
                    for (ce = 0, cj = S.length; ce < cj; ce++) {
                        if (ce) {
                            bR(S[ce], {
                                dy: ck * b8,
                                x: ci.x
                            })
                        } else {
                            bR(S[0], {
                                dy: 0
                            })
                        }
                    }
                }
                bR(cb, {
                    x: ci.x,
                    y: ci.y
                });
                E._.dirty = 1;
                var cf = E._getBBox(),
                    ch = ci.y - (cf.y + cf.height / 2);
                ch && bi.is(ch, "finite") && bR(S[0], {
                    dy: ch
                })
            },
            b1 = function(S, E) {
                var cc = 0,
                    cb = 0;
                this[0] = this.node = S;
                S.raphael = true;
                this.id = bi._oid++;
                S.raphaelid = this.id;
                this.matrix = bi.matrix();
                this.realPath = null;
                this.paper = E;
                this.attrs = this.attrs || {};
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                };
                !E.bottom && (E.bottom = this);
                this.prev = E.top;
                E.top && (E.top.next = this);
                E.top = this;
                this.next = null
            },
            bU = bi.el;
        b1.prototype = bU;
        bU.constructor = b1;
        bi._engine.path = function(E, cc) {
            var S = bR("path");
            cc.canvas && cc.canvas.appendChild(S);
            var cb = new b1(S, cc);
            cb.type = "path";
            b4(cb, {
                fill: "none",
                stroke: "#000",
                path: E
            });
            return cb
        };
        bU.rotate = function(S, E, cc) {
            if (this.removed) {
                return this
            }
            S = b9(S).split(bP);
            if (S.length - 1) {
                E = bV(S[1]);
                cc = bV(S[2])
            }
            S = bV(S[0]);
            (cc == null) && (E = cc);
            if (E == null || cc == null) {
                var cb = this.getBBox(1);
                E = cb.x + cb.width / 2;
                cc = cb.y + cb.height / 2
            }
            this.transform(this._.transform.concat([
                ["r", S, E, cc]
            ]));
            return this
        };
        bU.scale = function(cd, cb, E, cc) {
            if (this.removed) {
                return this
            }
            cd = b9(cd).split(bP);
            if (cd.length - 1) {
                cb = bV(cd[1]);
                E = bV(cd[2]);
                cc = bV(cd[3])
            }
            cd = bV(cd[0]);
            (cb == null) && (cb = cd);
            (cc == null) && (E = cc);
            if (E == null || cc == null) {
                var S = this.getBBox(1)
            }
            E = E == null ? S.x + S.width / 2 : E;
            cc = cc == null ? S.y + S.height / 2 : cc;
            this.transform(this._.transform.concat([
                ["s", cd, cb, E, cc]
            ]));
            return this
        };
        bU.translate = function(S, E) {
            if (this.removed) {
                return this
            }
            S = b9(S).split(bP);
            if (S.length - 1) {
                E = bV(S[1])
            }
            S = bV(S[0]) || 0;
            E = +E || 0;
            this.transform(this._.transform.concat([
                ["t", S, E]
            ]));
            return this
        };
        bU.transform = function(S) {
            var cb = this._;
            if (S == null) {
                return cb.transform
            }
            bi._extractTransform(this, S);
            this.clip && bR(this.clip, {
                transform: this.matrix.invert()
            });
            this.pattern && d(this);
            this.node && bR(this.node, {
                transform: this.matrix
            });
            if (cb.sx != 1 || cb.sy != 1) {
                var E = this.attrs[i]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({
                    "stroke-width": E
                })
            }
            return this
        };
        bU.hide = function() {
            !this.removed && this.paper.safari(this.node.style.display = "none");
            return this
        };
        bU.show = function() {
            !this.removed && this.paper.safari(this.node.style.display = "");
            return this
        };
        bU.remove = function() {
            if (this.removed || !this.node.parentNode) {
                return
            }
            var S = this.paper;
            S.__set__ && S.__set__.exclude(this);
            b7.unbind("raphael.*.*." + this.id);
            if (this.gradient) {
                S.defs.removeChild(this.gradient)
            }
            bi._tear(this, S);
            if (this.node.parentNode.tagName.toLowerCase() == "a") {
                this.node.parentNode.parentNode.removeChild(this.node.parentNode)
            } else {
                this.node.parentNode.removeChild(this.node)
            }
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            this.removed = true
        };
        bU._getBBox = function() {
            if (this.node.style.display == "none") {
                this.show();
                var E = true
            }
            var cb = {};
            try {
                cb = this.node.getBBox()
            } catch (S) {} finally {
                cb = cb || {}
            }
            E && this.hide();
            return cb
        };
        bU.attr = function(E, ci) {
            if (this.removed) {
                return this
            }
            if (E == null) {
                var cf = {};
                for (var ch in this.attrs) {
                    if (this.attrs[i](ch)) {
                        cf[ch] = this.attrs[ch]
                    }
                }
                cf.gradient && cf.fill == "none" && (cf.fill = cf.gradient) && delete cf.gradient;
                cf.transform = this._.transform;
                return cf
            }
            if (ci == null && bi.is(E, "string")) {
                if (E == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient
                }
                if (E == "transform") {
                    return this._.transform
                }
                var cg = E.split(bP),
                    cc = {};
                for (var cd = 0, ck = cg.length; cd < ck; cd++) {
                    E = cg[cd];
                    if (E in this.attrs) {
                        cc[E] = this.attrs[E]
                    } else {
                        if (bi.is(this.paper.customAttributes[E], "function")) {
                            cc[E] = this.paper.customAttributes[E].def
                        } else {
                            cc[E] = bi._availableAttrs[E]
                        }
                    }
                }
                return ck - 1 ? cc : cc[cg[0]]
            }
            if (ci == null && bi.is(E, "array")) {
                cc = {};
                for (cd = 0, ck = E.length; cd < ck; cd++) {
                    cc[E[cd]] = this.attr(E[cd])
                }
                return cc
            }
            if (ci != null) {
                var S = {};
                S[E] = ci
            } else {
                if (E != null && bi.is(E, "object")) {
                    S = E
                }
            }
            for (var cj in S) {
                b7("raphael.attr." + cj + "." + this.id, this, S[cj])
            }
            for (cj in this.paper.customAttributes) {
                if (this.paper.customAttributes[i](cj) && S[i](cj) && bi.is(this.paper.customAttributes[cj], "function")) {
                    var ce = this.paper.customAttributes[cj].apply(this, [].concat(S[cj]));
                    this.attrs[cj] = S[cj];
                    for (var cb in ce) {
                        if (ce[i](cb)) {
                            S[cb] = ce[cb]
                        }
                    }
                }
            }
            b4(this, S);
            return this
        };
        bU.toFront = function() {
            if (this.removed) {
                return this
            }
            if (this.node.parentNode.tagName.toLowerCase() == "a") {
                this.node.parentNode.parentNode.appendChild(this.node.parentNode)
            } else {
                this.node.parentNode.appendChild(this.node)
            }
            var E = this.paper;
            E.top != this && bi._tofront(this, E);
            return this
        };
        bU.toBack = function() {
            if (this.removed) {
                return this
            }
            var S = this.node.parentNode;
            if (S.tagName.toLowerCase() == "a") {
                S.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
            } else {
                if (S.firstChild != this.node) {
                    S.insertBefore(this.node, this.node.parentNode.firstChild)
                }
            }
            bi._toback(this, this.paper);
            var E = this.paper;
            return this
        };
        bU.insertAfter = function(E) {
            if (this.removed) {
                return this
            }
            var S = E.node || E[E.length - 1].node;
            if (S.nextSibling) {
                S.parentNode.insertBefore(this.node, S.nextSibling)
            } else {
                S.parentNode.appendChild(this.node)
            }
            bi._insertafter(this, E, this.paper);
            return this
        };
        bU.insertBefore = function(E) {
            if (this.removed) {
                return this
            }
            var S = E.node || E[0].node;
            S.parentNode.insertBefore(this.node, S);
            bi._insertbefore(this, E, this.paper);
            return this
        };
        bU.blur = function(S) {
            var E = this;
            if (+S !== 0) {
                var cb = bR("filter"),
                    cc = bR("feGaussianBlur");
                E.attrs.blur = S;
                cb.id = bi.createUUID();
                bR(cc, {
                    stdDeviation: +S || 1.5
                });
                cb.appendChild(cc);
                E.paper.defs.appendChild(cb);
                E._blur = cb;
                bR(E.node, {
                    filter: "url(#" + cb.id + ")"
                })
            } else {
                if (E._blur) {
                    E._blur.parentNode.removeChild(E._blur);
                    delete E._blur;
                    delete E.attrs.blur
                }
                E.node.removeAttribute("filter")
            }
            return E
        };
        bi._engine.circle = function(S, E, ce, cd) {
            var cc = bR("circle");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                cx: E,
                cy: ce,
                r: cd,
                fill: "none",
                stroke: "#000"
            };
            cb.type = "circle";
            bR(cc, cb.attrs);
            return cb
        };
        bi._engine.rect = function(cb, E, cg, S, ce, cf) {
            var cd = bR("rect");
            cb.canvas && cb.canvas.appendChild(cd);
            var cc = new b1(cd, cb);
            cc.attrs = {
                x: E,
                y: cg,
                width: S,
                height: ce,
                r: cf || 0,
                rx: cf || 0,
                ry: cf || 0,
                fill: "none",
                stroke: "#000"
            };
            cc.type = "rect";
            bR(cd, cc.attrs);
            return cc
        };
        bi._engine.ellipse = function(S, E, cf, ce, cd) {
            var cc = bR("ellipse");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                cx: E,
                cy: cf,
                rx: ce,
                ry: cd,
                fill: "none",
                stroke: "#000"
            };
            cb.type = "ellipse";
            bR(cc, cb.attrs);
            return cb
        };
        bi._engine.image = function(cb, cf, E, cg, S, ce) {
            var cd = bR("image");
            bR(cd, {
                x: E,
                y: cg,
                width: S,
                height: ce,
                preserveAspectRatio: "none"
            });
            cd.setAttributeNS(bW, "href", cf);
            cb.canvas && cb.canvas.appendChild(cd);
            var cc = new b1(cd, cb);
            cc.attrs = {
                x: E,
                y: cg,
                width: S,
                height: ce,
                src: cf
            };
            cc.type = "image";
            return cc
        };
        bi._engine.text = function(S, E, ce, cd) {
            var cc = bR("text");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                x: E,
                y: ce,
                "text-anchor": "middle",
                text: cd,
                font: bi._availableAttrs.font,
                stroke: "none",
                fill: "#000"
            };
            cb.type = "text";
            b4(cb, cb.attrs);
            return cb
        };
        bi._engine.setSize = function(S, E) {
            this.width = S || this.width;
            this.height = E || this.height;
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);
            if (this._viewBox) {
                this.setViewBox.apply(this, this._viewBox)
            }
            return this
        };
        bi._engine.create = function() {
            var cc = bi._getContainer.apply(0, arguments),
                S = cc && cc.container,
                cg = cc.x,
                cf = cc.y,
                cb = cc.width,
                ch = cc.height;
            if (!S) {
                throw new Error("SVG container not found.")
            }
            var E = bR("svg"),
                ce = "overflow:hidden;",
                cd;
            cg = cg || 0;
            cf = cf || 0;
            cb = cb || 512;
            ch = ch || 342;
            bR(E, {
                height: ch,
                version: 1.1,
                width: cb,
                xmlns: "http://www.w3.org/2000/svg"
            });
            if (S == 1) {
                E.style.cssText = ce + "position:absolute;left:" + cg + "px;top:" + cf + "px";
                bi._g.doc.body.appendChild(E);
                cd = 1
            } else {
                E.style.cssText = ce + "position:relative";
                if (S.firstChild) {
                    S.insertBefore(E, S.firstChild)
                } else {
                    S.appendChild(E)
                }
            }
            S = new bi._Paper;
            S.width = cb;
            S.height = ch;
            S.canvas = E;
            S.clear();
            S._left = S._top = 0;
            cd && (S.renderfix = function() {});
            S.renderfix();
            return S
        };
        bi._engine.setViewBox = function(ce, cc, cg, E, S) {
            b7("raphael.setViewBox", this, this._viewBox, [ce, cc, cg, E, S]);
            var ci = ca(cg / this.width, E / this.height),
                cd = this.top,
                ch = S ? "meet" : "xMinYMin",
                cb, cf;
            if (ce == null) {
                if (this._vbSize) {
                    ci = 1
                }
                delete this._vbSize;
                cb = "0 0 " + this.width + bS + this.height
            } else {
                this._vbSize = ci;
                cb = ce + bS + cc + bS + cg + bS + E
            }
            bR(this.canvas, {
                viewBox: cb,
                preserveAspectRatio: ch
            });
            while (ci && cd) {
                cf = "stroke-width" in cd.attrs ? cd.attrs["stroke-width"] : 1;
                cd.attr({
                    "stroke-width": cf
                });
                cd._.dirty = 1;
                cd._.dirtyT = 1;
                cd = cd.prev
            }
            this._viewBox = [ce, cc, cg, E, !!S];
            return this
        };
        bi.prototype.renderfix = function() {
            var ce = this.canvas,
                E = ce.style,
                cd;
            try {
                cd = ce.getScreenCTM() || ce.createSVGMatrix()
            } catch (cc) {
                cd = ce.createSVGMatrix()
            }
            var cb = -cd.e % 1,
                S = -cd.f % 1;
            if (cb || S) {
                if (cb) {
                    this._left = (this._left + cb) % 1;
                    E.left = this._left + "px"
                }
                if (S) {
                    this._top = (this._top + S) % 1;
                    E.top = this._top + "px"
                }
            }
        };
        bi.prototype.clear = function() {
            bi.eve("raphael.clear", this);
            var E = this.canvas;
            while (E.firstChild) {
                E.removeChild(E.firstChild)
            }
            this.bottom = this.top = null;
            (this.desc = bR("desc")).appendChild(bi._g.doc.createTextNode("Created with Rapha\xebl " + bi.version));
            E.appendChild(this.desc);
            E.appendChild(this.defs = bR("defs"))
        };
        bi.prototype.remove = function() {
            b7("raphael.remove", this);
            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
        };
        var b5 = bi.st;
        for (var R in bU) {
            if (bU[i](R) && !b5[i](R)) {
                b5[R] = (function(E) {
                    return function() {
                        var S = arguments;
                        return this.forEach(function(cb) {
                            cb[E].apply(cb, S)
                        })
                    }
                })(R)
            }
        }
    })();
    (function() {
        if (!bi.vml) {
            return
        }
        var R = "hasOwnProperty",
            cc = String,
            bV = parseFloat,
            bQ = Math,
            b9 = bQ.round,
            cf = bQ.max,
            ca = bQ.min,
            b0 = bQ.abs,
            b3 = "fill",
            bR = /[, ]+/,
            b8 = bi.eve,
            b4 = " progid:DXImageTransform.Microsoft",
            bT = " ",
            bY = "",
            cb = {
                M: "m",
                L: "l",
                C: "c",
                Z: "x",
                m: "t",
                l: "r",
                c: "v",
                z: "x"
            },
            bS = /([clmz]),?([^clmz]*)/gi,
            b1 = / progid:\S+Blur\([^\)]+\)/g,
            ce = /-?[^,\s-]+/g,
            i = "position:absolute;left:0;top:0;width:1px;height:1px",
            d = 21600,
            b7 = {
                path: 1,
                rect: 1,
                image: 1
            },
            bZ = {
                circle: 1,
                ellipse: 1
            },
            bO = function(co) {
                var cl = /[ahqstv]/ig,
                    cg = bi._pathToAbsolute;
                cc(co).match(cl) && (cg = bi._path2curve);
                cl = /[clmz]/g;
                if (cg == bi._pathToAbsolute && !cc(co).match(cl)) {
                    var ck = cc(co).replace(bS, function(cs, cu, cq) {
                        var ct = [],
                            cp = cu.toLowerCase() == "m",
                            cr = cb[cu];
                        cq.replace(ce, function(cv) {
                            if (cp && ct.length == 2) {
                                cr += ct + cb[cu == "m" ? "l" : "L"];
                                ct = []
                            }
                            ct.push(b9(cv * d))
                        });
                        return cr + ct
                    });
                    return ck
                }
                var cm = cg(co),
                    S, E;
                ck = [];
                for (var ci = 0, cn = cm.length; ci < cn; ci++) {
                    S = cm[ci];
                    E = cm[ci][0].toLowerCase();
                    E == "z" && (E = "x");
                    for (var ch = 1, cj = S.length; ch < cj; ch++) {
                        E += b9(S[ch] * d) + (ch != cj - 1 ? "," : bY)
                    }
                    ck.push(E)
                }
                return ck.join(bT)
            },
            bW = function(ch, cg, S) {
                var E = bi.matrix();
                E.rotate(-ch, 0.5, 0.5);
                return {
                    dx: E.x(cg, S),
                    dy: E.y(cg, S)
                }
            },
            bX = function(cn, cm, cl, ci, ch, cj) {
                var cv = cn._,
                    cp = cn.matrix,
                    E = cv.fillpos,
                    co = cn.node,
                    ck = co.style,
                    cg = 1,
                    S = "",
                    cr, ct = d / cm,
                    cs = d / cl;
                ck.visibility = "hidden";
                if (!cm || !cl) {
                    return
                }
                co.coordsize = b0(ct) + bT + b0(cs);
                ck.rotation = cj * (cm * cl < 0 ? -1 : 1);
                if (cj) {
                    var cu = bW(cj, ci, ch);
                    ci = cu.dx;
                    ch = cu.dy
                }
                cm < 0 && (S += "x");
                cl < 0 && (S += " y") && (cg = -1);
                ck.flip = S;
                co.coordorigin = (ci * -ct) + bT + (ch * -cs);
                if (E || cv.fillsize) {
                    var cq = co.getElementsByTagName(b3);
                    cq = cq && cq[0];
                    co.removeChild(cq);
                    if (E) {
                        cu = bW(cj, cp.x(E[0], E[1]), cp.y(E[0], E[1]));
                        cq.position = cu.dx * cg + bT + cu.dy * cg
                    }
                    if (cv.fillsize) {
                        cq.size = cv.fillsize[0] * b0(cm) + bT + cv.fillsize[1] * b0(cl)
                    }
                    co.appendChild(cq)
                }
                ck.visibility = "visible"
            };
        bi.toString = function() {
            return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version
        };
        var g = function(E, ck, S) {
                var cm = cc(ck).toLowerCase().split("-"),
                    ci = S ? "end" : "start",
                    cg = cm.length,
                    cj = "classic",
                    cl = "medium",
                    ch = "medium";
                while (cg--) {
                    switch (cm[cg]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            cj = cm[cg];
                            break;
                        case "wide":
                        case "narrow":
                            ch = cm[cg];
                            break;
                        case "long":
                        case "short":
                            cl = cm[cg];
                            break
                    }
                }
                var cn = E.node.getElementsByTagName("stroke")[0];
                cn[ci + "arrow"] = cj;
                cn[ci + "arrowlength"] = cl;
                cn[ci + "arrowwidth"] = ch
            },
            b5 = function(cv, cH) {
                cv.attrs = cv.attrs || {};
                var cC = cv.node,
                    cL = cv.attrs,
                    cr = cC.style,
                    cn, cF = b7[cv.type] && (cH.x != cL.x || cH.y != cL.y || cH.width != cL.width || cH.height != cL.height || cH.cx != cL.cx || cH.cy != cL.cy || cH.rx != cL.rx || cH.ry != cL.ry || cH.r != cL.r),
                    cu = bZ[cv.type] && (cL.cx != cH.cx || cL.cy != cH.cy || cL.r != cH.r || cL.rx != cH.rx || cL.ry != cH.ry),
                    cO = cv;
                for (var cs in cH) {
                    if (cH[R](cs)) {
                        cL[cs] = cH[cs]
                    }
                }
                if (cF) {
                    cL.path = bi._getPath[cv.type](cv);
                    cv._.dirty = 1
                }
                cH.href && (cC.href = cH.href);
                cH.title && (cC.title = cH.title);
                cH.target && (cC.target = cH.target);
                cH.cursor && (cr.cursor = cH.cursor);
                "blur" in cH && cv.blur(cH.blur);
                if (cH.path && cv.type == "path" || cF) {
                    cC.path = bO(~cc(cL.path).toLowerCase().indexOf("r") ? bi._pathToAbsolute(cL.path) : cL.path);
                    if (cv.type == "image") {
                        cv._.fillpos = [cL.x, cL.y];
                        cv._.fillsize = [cL.width, cL.height];
                        bX(cv, 1, 1, 0, 0, 0)
                    }
                }
                "transform" in cH && cv.transform(cH.transform);
                if (cu) {
                    var ci = +cL.cx,
                        cg = +cL.cy,
                        cm = +cL.rx || +cL.r || 0,
                        cl = +cL.ry || +cL.r || 0;
                    cC.path = bi.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", b9((ci - cm) * d), b9((cg - cl) * d), b9((ci + cm) * d), b9((cg + cl) * d), b9(ci * d));
                    cv._.dirty = 1
                }
                if ("clip-rect" in cH) {
                    var S = cc(cH["clip-rect"]).split(bR);
                    if (S.length == 4) {
                        S[2] = +S[2] + (+S[0]);
                        S[3] = +S[3] + (+S[1]);
                        var ct = cC.clipRect || bi._g.doc.createElement("div"),
                            cN = ct.style;
                        cN.clip = bi.format("rect({1}px {2}px {3}px {0}px)", S);
                        if (!cC.clipRect) {
                            cN.position = "absolute";
                            cN.top = 0;
                            cN.left = 0;
                            cN.width = cv.paper.width + "px";
                            cN.height = cv.paper.height + "px";
                            cC.parentNode.insertBefore(ct, cC);
                            ct.appendChild(cC);
                            cC.clipRect = ct
                        }
                    }
                    if (!cH["clip-rect"]) {
                        cC.clipRect && (cC.clipRect.style.clip = "auto")
                    }
                }
                if (cv.textpath) {
                    var cJ = cv.textpath.style;
                    cH.font && (cJ.font = cH.font);
                    cH["font-family"] && (cJ.fontFamily = '"' + cH["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, bY) + '"');
                    cH["font-size"] && (cJ.fontSize = cH["font-size"]);
                    cH["font-weight"] && (cJ.fontWeight = cH["font-weight"]);
                    cH["font-style"] && (cJ.fontStyle = cH["font-style"])
                }
                if ("arrow-start" in cH) {
                    g(cO, cH["arrow-start"])
                }
                if ("arrow-end" in cH) {
                    g(cO, cH["arrow-end"], 1)
                }
                if (cH.opacity != null || cH["stroke-width"] != null || cH.fill != null || cH.src != null || cH.stroke != null || cH["stroke-width"] != null || cH["stroke-opacity"] != null || cH["fill-opacity"] != null || cH["stroke-dasharray"] != null || cH["stroke-miterlimit"] != null || cH["stroke-linejoin"] != null || cH["stroke-linecap"] != null) {
                    var cD = cC.getElementsByTagName(b3),
                        cK = false;
                    cD = cD && cD[0];
                    !cD && (cK = cD = cd(b3));
                    if (cv.type == "image" && cH.src) {
                        cD.src = cH.src
                    }
                    cH.fill && (cD.on = true);
                    if (cD.on == null || cH.fill == "none" || cH.fill === null) {
                        cD.on = false
                    }
                    if (cD.on && cH.fill) {
                        var ck = cc(cH.fill).match(bi._ISURL);
                        if (ck) {
                            cD.parentNode == cC && cC.removeChild(cD);
                            cD.rotate = true;
                            cD.src = ck[1];
                            cD.type = "tile";
                            var E = cv.getBBox(1);
                            cD.position = E.x + bT + E.y;
                            cv._.fillpos = [E.x, E.y];
                            bi._preload(ck[1], function() {
                                cv._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else {
                            cD.color = bi.getRGB(cH.fill).hex;
                            cD.src = bY;
                            cD.type = "solid";
                            if (bi.getRGB(cH.fill).error && (cO.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || cc(cH.fill).charAt() != "r") && b(cO, cH.fill, cD)) {
                                cL.fill = "none";
                                cL.gradient = cH.fill;
                                cD.rotate = false
                            }
                        }
                    }
                    if ("fill-opacity" in cH || "opacity" in cH) {
                        var cj = ((+cL["fill-opacity"] + 1 || 2) - 1) * ((+cL.opacity + 1 || 2) - 1) * ((+bi.getRGB(cH.fill).o + 1 || 2) - 1);
                        cj = ca(cf(cj, 0), 1);
                        cD.opacity = cj;
                        if (cD.src) {
                            cD.color = "none"
                        }
                    }
                    cC.appendChild(cD);
                    var co = (cC.getElementsByTagName("stroke") && cC.getElementsByTagName("stroke")[0]),
                        cM = false;
                    !co && (cM = co = cd("stroke"));
                    if ((cH.stroke && cH.stroke != "none") || cH["stroke-width"] || cH["stroke-opacity"] != null || cH["stroke-dasharray"] || cH["stroke-miterlimit"] || cH["stroke-linejoin"] || cH["stroke-linecap"]) {
                        co.on = true
                    }(cH.stroke == "none" || cH.stroke === null || co.on == null || cH.stroke == 0 || cH["stroke-width"] == 0) && (co.on = false);
                    var cB = bi.getRGB(cH.stroke);
                    co.on && cH.stroke && (co.color = cB.hex);
                    cj = ((+cL["stroke-opacity"] + 1 || 2) - 1) * ((+cL.opacity + 1 || 2) - 1) * ((+cB.o + 1 || 2) - 1);
                    var cw = (bV(cH["stroke-width"]) || 1) * 0.75;
                    cj = ca(cf(cj, 0), 1);
                    cH["stroke-width"] == null && (cw = cL["stroke-width"]);
                    cH["stroke-width"] && (co.weight = cw);
                    cw && cw < 1 && (cj *= cw) && (co.weight = 1);
                    co.opacity = cj;
                    cH["stroke-linejoin"] && (co.joinstyle = cH["stroke-linejoin"] || "miter");
                    co.miterlimit = cH["stroke-miterlimit"] || 8;
                    cH["stroke-linecap"] && (co.endcap = cH["stroke-linecap"] == "butt" ? "flat" : cH["stroke-linecap"] == "square" ? "square" : "round");
                    if (cH["stroke-dasharray"]) {
                        var cA = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        co.dashstyle = cA[R](cH["stroke-dasharray"]) ? cA[cH["stroke-dasharray"]] : bY
                    }
                    cM && cC.appendChild(co)
                }
                if (cO.type == "text") {
                    cO.paper.canvas.style.display = bY;
                    var cE = cO.paper.span,
                        cz = 100,
                        ch = cL.font && cL.font.match(/\d+(?:\.\d*)?(?=px)/);
                    cr = cE.style;
                    cL.font && (cr.font = cL.font);
                    cL["font-family"] && (cr.fontFamily = cL["font-family"]);
                    cL["font-weight"] && (cr.fontWeight = cL["font-weight"]);
                    cL["font-style"] && (cr.fontStyle = cL["font-style"]);
                    ch = bV(cL["font-size"] || ch && ch[0]) || 10;
                    cr.fontSize = ch * cz + "px";
                    cO.textpath.string && (cE.innerHTML = cc(cO.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var cq = cE.getBoundingClientRect();
                    cO.W = cL.w = (cq.right - cq.left) / cz;
                    cO.H = cL.h = (cq.bottom - cq.top) / cz;
                    cO.X = cL.x;
                    cO.Y = cL.y + cO.H / 2;
                    ("x" in cH || "y" in cH) && (cO.path.v = bi.format("m{0},{1}l{2},{1}", b9(cL.x * d), b9(cL.y * d), b9(cL.x * d) + 1));
                    var cp = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                    for (var cG = 0, cI = cp.length; cG < cI; cG++) {
                        if (cp[cG] in cH) {
                            cO._.dirty = 1;
                            break
                        }
                    }
                    switch (cL["text-anchor"]) {
                        case "start":
                            cO.textpath.style["v-text-align"] = "left";
                            cO.bbx = cO.W / 2;
                            break;
                        case "end":
                            cO.textpath.style["v-text-align"] = "right";
                            cO.bbx = -cO.W / 2;
                            break;
                        default:
                            cO.textpath.style["v-text-align"] = "center";
                            cO.bbx = 0;
                            break
                    }
                    cO.textpath.style["v-text-kern"] = true
                }
            },
            b = function(E, cn, cq) {
                E.attrs = E.attrs || {};
                var co = E.attrs,
                    ch = Math.pow,
                    ci, cj, cl = "linear",
                    cm = ".5 .5";
                E.attrs.gradient = cn;
                cn = cc(cn).replace(bi._radial_gradient, function(ct, cu, cs) {
                    cl = "radial";
                    if (cu && cs) {
                        cu = bV(cu);
                        cs = bV(cs);
                        ch(cu - 0.5, 2) + ch(cs - 0.5, 2) > 0.25 && (cs = bQ.sqrt(0.25 - ch(cu - 0.5, 2)) * ((cs > 0.5) * 2 - 1) + 0.5);
                        cm = cu + bT + cs
                    }
                    return bY
                });
                cn = cn.split(/\s*\-\s*/);
                if (cl == "linear") {
                    var S = cn.shift();
                    S = -bV(S);
                    if (isNaN(S)) {
                        return null
                    }
                }
                var ck = bi._parseDots(cn);
                if (!ck) {
                    return null
                }
                E = E.shape || E.node;
                if (ck.length) {
                    E.removeChild(cq);
                    cq.on = true;
                    cq.method = "none";
                    cq.color = ck[0].color;
                    cq.color2 = ck[ck.length - 1].color;
                    var cr = [];
                    for (var cg = 0, cp = ck.length; cg < cp; cg++) {
                        ck[cg].offset && cr.push(ck[cg].offset + bT + ck[cg].color)
                    }
                    cq.colors = cr.length ? cr.join() : "0% " + cq.color;
                    if (cl == "radial") {
                        cq.type = "gradientTitle";
                        cq.focus = "100%";
                        cq.focussize = "0 0";
                        cq.focusposition = cm;
                        cq.angle = 0
                    } else {
                        cq.type = "gradient";
                        cq.angle = (270 - S) % 360
                    }
                    E.appendChild(cq)
                }
                return 1
            },
            b2 = function(S, E) {
                this[0] = this.node = S;
                S.raphael = true;
                this.id = bi._oid++;
                S.raphaelid = this.id;
                this.X = 0;
                this.Y = 0;
                this.attrs = {};
                this.paper = E;
                this.matrix = bi.matrix();
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                };
                !E.bottom && (E.bottom = this);
                this.prev = E.top;
                E.top && (E.top.next = this);
                E.top = this;
                this.next = null
            };
        var bU = bi.el;
        b2.prototype = bU;
        bU.constructor = b2;
        bU.transform = function(ci) {
            if (ci == null) {
                return this._.transform
            }
            var ck = this.paper._viewBoxShift,
                cj = ck ? "s" + [ck.scale, ck.scale] + "-1-1t" + [ck.dx, ck.dy] : bY,
                cn;
            if (ck) {
                cn = ci = cc(ci).replace(/\.{3}|\u2026/g, this._.transform || bY)
            }
            bi._extractTransform(this, cj + ci);
            var co = this.matrix.clone(),
                cq = this.skew,
                cg = this.node,
                cm, ch = ~cc(this.attrs.fill).indexOf("-"),
                E = !cc(this.attrs.fill).indexOf("url(");
            co.translate(-0.5, -0.5);
            if (E || ch || this.type == "image") {
                cq.matrix = "1 0 0 1";
                cq.offset = "0 0";
                cm = co.split();
                if ((ch && cm.noRotation) || !cm.isSimple) {
                    cg.style.filter = co.toFilter();
                    var cl = this.getBBox(),
                        S = this.getBBox(1),
                        cr = cl.x - S.x,
                        cp = cl.y - S.y;
                    cg.coordorigin = (cr * -d) + bT + (cp * -d);
                    bX(this, 1, 1, cr, cp, 0)
                } else {
                    cg.style.filter = bY;
                    bX(this, cm.scalex, cm.scaley, cm.dx, cm.dy, cm.rotate)
                }
            } else {
                cg.style.filter = bY;
                cq.matrix = cc(co);
                cq.offset = co.offset()
            }
            cn && (this._.transform = cn);
            return this
        };
        bU.rotate = function(S, E, ch) {
            if (this.removed) {
                return this
            }
            if (S == null) {
                return
            }
            S = cc(S).split(bR);
            if (S.length - 1) {
                E = bV(S[1]);
                ch = bV(S[2])
            }
            S = bV(S[0]);
            (ch == null) && (E = ch);
            if (E == null || ch == null) {
                var cg = this.getBBox(1);
                E = cg.x + cg.width / 2;
                ch = cg.y + cg.height / 2
            }
            this._.dirtyT = 1;
            this.transform(this._.transform.concat([
                ["r", S, E, ch]
            ]));
            return this
        };
        bU.translate = function(S, E) {
            if (this.removed) {
                return this
            }
            S = cc(S).split(bR);
            if (S.length - 1) {
                E = bV(S[1])
            }
            S = bV(S[0]) || 0;
            E = +E || 0;
            if (this._.bbox) {
                this._.bbox.x += S;
                this._.bbox.y += E
            }
            this.transform(this._.transform.concat([
                ["t", S, E]
            ]));
            return this
        };
        bU.scale = function(ci, cg, E, ch) {
            if (this.removed) {
                return this
            }
            ci = cc(ci).split(bR);
            if (ci.length - 1) {
                cg = bV(ci[1]);
                E = bV(ci[2]);
                ch = bV(ci[3]);
                isNaN(E) && (E = null);
                isNaN(ch) && (ch = null)
            }
            ci = bV(ci[0]);
            (cg == null) && (cg = ci);
            (ch == null) && (E = ch);
            if (E == null || ch == null) {
                var S = this.getBBox(1)
            }
            E = E == null ? S.x + S.width / 2 : E;
            ch = ch == null ? S.y + S.height / 2 : ch;
            this.transform(this._.transform.concat([
                ["s", ci, cg, E, ch]
            ]));
            this._.dirtyT = 1;
            return this
        };
        bU.hide = function() {
            !this.removed && (this.node.style.display = "none");
            return this
        };
        bU.show = function() {
            !this.removed && (this.node.style.display = bY);
            return this
        };
        bU._getBBox = function() {
            if (this.removed) {
                return {}
            }
            return {
                x: this.X + (this.bbx || 0) - this.W / 2,
                y: this.Y - this.H,
                width: this.W,
                height: this.H
            }
        };
        bU.remove = function() {
            if (this.removed || !this.node.parentNode) {
                return
            }
            this.paper.__set__ && this.paper.__set__.exclude(this);
            bi.eve.unbind("raphael.*.*." + this.id);
            bi._tear(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            this.removed = true
        };
        bU.attr = function(E, cn) {
            if (this.removed) {
                return this
            }
            if (E == null) {
                var ck = {};
                for (var cm in this.attrs) {
                    if (this.attrs[R](cm)) {
                        ck[cm] = this.attrs[cm]
                    }
                }
                ck.gradient && ck.fill == "none" && (ck.fill = ck.gradient) && delete ck.gradient;
                ck.transform = this._.transform;
                return ck
            }
            if (cn == null && bi.is(E, "string")) {
                if (E == b3 && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient
                }
                var cl = E.split(bR),
                    ch = {};
                for (var ci = 0, cp = cl.length; ci < cp; ci++) {
                    E = cl[ci];
                    if (E in this.attrs) {
                        ch[E] = this.attrs[E]
                    } else {
                        if (bi.is(this.paper.customAttributes[E], "function")) {
                            ch[E] = this.paper.customAttributes[E].def
                        } else {
                            ch[E] = bi._availableAttrs[E]
                        }
                    }
                }
                return cp - 1 ? ch : ch[cl[0]]
            }
            if (this.attrs && cn == null && bi.is(E, "array")) {
                ch = {};
                for (ci = 0, cp = E.length; ci < cp; ci++) {
                    ch[E[ci]] = this.attr(E[ci])
                }
                return ch
            }
            var S;
            if (cn != null) {
                S = {};
                S[E] = cn
            }
            cn == null && bi.is(E, "object") && (S = E);
            for (var co in S) {
                b8("raphael.attr." + co + "." + this.id, this, S[co])
            }
            if (S) {
                for (co in this.paper.customAttributes) {
                    if (this.paper.customAttributes[R](co) && S[R](co) && bi.is(this.paper.customAttributes[co], "function")) {
                        var cj = this.paper.customAttributes[co].apply(this, [].concat(S[co]));
                        this.attrs[co] = S[co];
                        for (var cg in cj) {
                            if (cj[R](cg)) {
                                S[cg] = cj[cg]
                            }
                        }
                    }
                }
                if (S.text && this.type == "text") {
                    this.textpath.string = S.text
                }
                b5(this, S)
            }
            return this
        };
        bU.toFront = function() {
            !this.removed && this.node.parentNode.appendChild(this.node);
            this.paper && this.paper.top != this && bi._tofront(this, this.paper);
            return this
        };
        bU.toBack = function() {
            if (this.removed) {
                return this
            }
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                bi._toback(this, this.paper)
            }
            return this
        };
        bU.insertAfter = function(E) {
            if (this.removed) {
                return this
            }
            if (E.constructor == bi.st.constructor) {
                E = E[E.length - 1]
            }
            if (E.node.nextSibling) {
                E.node.parentNode.insertBefore(this.node, E.node.nextSibling)
            } else {
                E.node.parentNode.appendChild(this.node)
            }
            bi._insertafter(this, E, this.paper);
            return this
        };
        bU.insertBefore = function(E) {
            if (this.removed) {
                return this
            }
            if (E.constructor == bi.st.constructor) {
                E = E[0]
            }
            E.node.parentNode.insertBefore(this.node, E.node);
            bi._insertbefore(this, E, this.paper);
            return this
        };
        bU.blur = function(E) {
            var S = this.node.runtimeStyle,
                cg = S.filter;
            cg = cg.replace(b1, bY);
            if (+E !== 0) {
                this.attrs.blur = E;
                S.filter = cg + bT + b4 + ".Blur(pixelradius=" + (+E || 1.5) + ")";
                S.margin = bi.format("-{0}px 0 0 -{0}px", b9(+E || 1.5))
            } else {
                S.filter = cg;
                S.margin = 0;
                delete this.attrs.blur
            }
            return this
        };
        bi._engine.path = function(ch, S) {
            var ci = cd("shape");
            ci.style.cssText = i;
            ci.coordsize = d + bT + d;
            ci.coordorigin = S.coordorigin;
            var cj = new b2(ci, S),
                E = {
                    fill: "none",
                    stroke: "#000"
                };
            ch && (E.path = ch);
            cj.type = "path";
            cj.path = [];
            cj.Path = bY;
            b5(cj, E);
            S.canvas.appendChild(ci);
            var cg = cd("skew");
            cg.on = true;
            ci.appendChild(cg);
            cj.skew = cg;
            cj.transform(bY);
            return cj
        };
        bi._engine.rect = function(S, ck, ci, cl, cg, E) {
            var cm = bi._rectPath(ck, ci, cl, cg, E),
                ch = S.path(cm),
                cj = ch.attrs;
            ch.X = cj.x = ck;
            ch.Y = cj.y = ci;
            ch.W = cj.width = cl;
            ch.H = cj.height = cg;
            cj.r = E;
            cj.path = cm;
            ch.type = "rect";
            return ch
        };
        bi._engine.ellipse = function(S, E, ck, cj, ci) {
            var ch = S.path(),
                cg = ch.attrs;
            ch.X = E - cj;
            ch.Y = ck - ci;
            ch.W = cj * 2;
            ch.H = ci * 2;
            ch.type = "ellipse";
            b5(ch, {
                cx: E,
                cy: ck,
                rx: cj,
                ry: ci
            });
            return ch
        };
        bi._engine.circle = function(S, E, cj, ci) {
            var ch = S.path(),
                cg = ch.attrs;
            ch.X = E - ci;
            ch.Y = cj - ci;
            ch.W = ch.H = ci * 2;
            ch.type = "circle";
            b5(ch, {
                cx: E,
                cy: cj,
                r: ci
            });
            return ch
        };
        bi._engine.image = function(S, E, cl, cj, cm, ch) {
            var co = bi._rectPath(cl, cj, cm, ch),
                ci = S.path(co).attr({
                    stroke: "none"
                }),
                ck = ci.attrs,
                cg = ci.node,
                cn = cg.getElementsByTagName(b3)[0];
            ck.src = E;
            ci.X = ck.x = cl;
            ci.Y = ck.y = cj;
            ci.W = ck.width = cm;
            ci.H = ck.height = ch;
            ck.path = co;
            ci.type = "image";
            cn.parentNode == cg && cg.removeChild(cn);
            cn.rotate = true;
            cn.src = E;
            cn.type = "tile";
            ci._.fillpos = [cl, cj];
            ci._.fillsize = [cm, ch];
            cg.appendChild(cn);
            bX(ci, 1, 1, 0, 0, 0);
            return ci
        };
        bi._engine.text = function(E, ck, cj, cl) {
            var ch = cd("shape"),
                cn = cd("path"),
                cg = cd("textpath");
            ck = ck || 0;
            cj = cj || 0;
            cl = cl || "";
            cn.v = bi.format("m{0},{1}l{2},{1}", b9(ck * d), b9(cj * d), b9(ck * d) + 1);
            cn.textpathok = true;
            cg.string = cc(cl);
            cg.on = true;
            ch.style.cssText = i;
            ch.coordsize = d + bT + d;
            ch.coordorigin = "0 0";
            var S = new b2(ch, E),
                ci = {
                    fill: "#000",
                    stroke: "none",
                    font: bi._availableAttrs.font,
                    text: cl
                };
            S.shape = ch;
            S.path = cn;
            S.textpath = cg;
            S.type = "text";
            S.attrs.text = cc(cl);
            S.attrs.x = ck;
            S.attrs.y = cj;
            S.attrs.w = 1;
            S.attrs.h = 1;
            b5(S, ci);
            ch.appendChild(cg);
            ch.appendChild(cn);
            E.canvas.appendChild(ch);
            var cm = cd("skew");
            cm.on = true;
            ch.appendChild(cm);
            S.skew = cm;
            S.transform(bY);
            return S
        };
        bi._engine.setSize = function(cg, E) {
            var S = this.canvas.style;
            this.width = cg;
            this.height = E;
            cg == +cg && (cg += "px");
            E == +E && (E += "px");
            S.width = cg;
            S.height = E;
            S.clip = "rect(0 " + cg + " " + E + " 0)";
            if (this._viewBox) {
                bi._engine.setViewBox.apply(this, this._viewBox)
            }
            return this
        };
        bi._engine.setViewBox = function(cj, ci, ck, cg, ch) {
            bi.eve("raphael.setViewBox", this, this._viewBox, [cj, ci, ck, cg, ch]);
            var E = this.width,
                cm = this.height,
                cn = 1 / cf(ck / E, cg / cm),
                cl, S;
            if (ch) {
                cl = cm / cg;
                S = E / ck;
                if (ck * cl < E) {
                    cj -= (E - ck * cl) / 2 / cl
                }
                if (cg * S < cm) {
                    ci -= (cm - cg * S) / 2 / S
                }
            }
            this._viewBox = [cj, ci, ck, cg, !!ch];
            this._viewBoxShift = {
                dx: -cj,
                dy: -ci,
                scale: cn
            };
            this.forEach(function(co) {
                co.transform("...")
            });
            return this
        };
        var cd;
        bi._engine.initWin = function(cg) {
            var S = cg.document;
            S.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !S.namespaces.rvml && S.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                cd = function(ch) {
                    return S.createElement("<rvml:" + ch + ' class="rvml">')
                }
            } catch (E) {
                cd = function(ch) {
                    return S.createElement("<" + ch + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        };
        bi._engine.initWin(bi._g.win);
        bi._engine.create = function() {
            var cg = bi._getContainer.apply(0, arguments),
                E = cg.container,
                cm = cg.height,
                cn, S = cg.width,
                cl = cg.x,
                ck = cg.y;
            if (!E) {
                throw new Error("VML container not found.")
            }
            var ci = new bi._Paper,
                cj = ci.canvas = bi._g.doc.createElement("div"),
                ch = cj.style;
            cl = cl || 0;
            ck = ck || 0;
            S = S || 512;
            cm = cm || 342;
            ci.width = S;
            ci.height = cm;
            S == +S && (S += "px");
            cm == +cm && (cm += "px");
            ci.coordsize = d * 1000 + bT + d * 1000;
            ci.coordorigin = "0 0";
            ci.span = bi._g.doc.createElement("span");
            ci.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
            cj.appendChild(ci.span);
            ch.cssText = bi.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", S, cm);
            if (E == 1) {
                bi._g.doc.body.appendChild(cj);
                ch.left = cl + "px";
                ch.top = ck + "px";
                ch.position = "absolute"
            } else {
                if (E.firstChild) {
                    E.insertBefore(cj, E.firstChild)
                } else {
                    E.appendChild(cj)
                }
            }
            ci.renderfix = function() {};
            return ci
        };
        bi.prototype.clear = function() {
            bi.eve("raphael.clear", this);
            this.canvas.innerHTML = bY;
            this.span = bi._g.doc.createElement("span");
            this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
            this.canvas.appendChild(this.span);
            this.bottom = this.top = null
        };
        bi.prototype.remove = function() {
            bi.eve("raphael.remove", this);
            this.canvas.parentNode.removeChild(this.canvas);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            return true
        };
        var b6 = bi.st;
        for (var bP in bU) {
            if (bU[R](bP) && !b6[R](bP)) {
                b6[bP] = (function(E) {
                    return function() {
                        var S = arguments;
                        return this.forEach(function(cg) {
                            cg[E].apply(cg, S)
                        })
                    }
                })(bP)
            }
        }
    })();
    aE.was ? (a5.win.Raphael = bi) : (Raphael = bi);
    return bi
}));
(function() {
    var d, f;
    Raphael.fn.panzoom = {};
    Raphael.fn.panzoom = function(g) {
        var h = this;
        return new c(h, g)
    };
    var e = {
            enable: function() {
                this.enabled = true
            },
            disable: function() {
                this.enabled = false
            },
            zoomIn: function(g) {
                this.applyZoom(g)
            },
            zoomOut: function(g) {
                this.applyZoom(g > 0 ? g * -1 : g)
            },
            pan: function(h, g) {
                this.applyPan(h * -1, g * -1)
            },
            isDragging: function() {
                return this.dragTime > this.dragThreshold
            },
            getCurrentPosition: function() {
                return this.currPos
            },
            getCurrentZoom: function() {
                return this.currZoom
            }
        },
        c = function(h, v) {
            var j = h,
                g = j.canvas.parentNode,
                s = this,
                m = {},
                k = {
                    x: 0,
                    y: 0
                },
                p = 0,
                o = 0,
                t = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            this.enabled = false;
            this.dragThreshold = 5;
            this.dragTime = 0;
            v = v || {};
            m.maxZoom = v.maxZoom || 9;
            m.minZoom = v.minZoom || 0;
            m.zoomStep = v.zoomStep || 0.1;
            m.initialZoom = v.initialZoom || 0;
            m.initialPosition = v.initialPosition || {
                x: 0,
                y: 0
            };
            m.map_original_width = v.map_original_width;
            m.map_original_height = v.map_original_height;
            m.map_width = v.map_width;
            m.map_height = v.map_height;
            this.currZoom = m.initialZoom;
            this.currPos = m.initialPosition;
            l();
            g.onmousedown = function(w) {
                console.log("DRAGGING");
                var n = window.event || w;
                if (!s.enabled) {
                    return false
                }
                s.dragTime = 0;
                k = a(n, g);
                g.className += " grabbing";
                g.onmousemove = u;
                document.onmousemove = function() {
                    return false
                };
                if (n.preventDefault) {
                    n.preventDefault()
                } else {
                    n.returnValue = false
                }
                return false
            };
            g.onmouseup = function(n) {
                console.log("DRAGGING STOP");
                document.onmousemove = null;
                g.className = g.className.replace(/(?:^|\s)grabbing(?!\S)/g, "");
                g.onmousemove = null
            };
            g.addEventListener('touchstart',function(w) {
                console.log("TOUCHING");
                var n = window.event || w;
                if (!s.enabled) {
                    return false
                }
                s.dragTime = 0;
                k = a(n, g);
                g.className += " grabbing";
                g.addEventListener('touchmove',u);
                document.addEventListener('touchmove',function() {
                    return false
                });
                if (n.preventDefault) {
                    n.preventDefault()
                } else {
                    n.returnValue = false
                }
                return false
            });
            g.addEventListener('touchend',function(n) {
                console.log("TOUCHING STOP");
                document.removeEventListener('touchmove');
                g.className = g.className.replace(/(?:^|\s)grabbing(?!\S)/g, "");
                g.removeEventListener('touchmove');
            });
            if (g.attachEvent) {
                g.attachEvent("on" + t, q)
            } else {
                if (g.addEventListener) {
                    g.addEventListener(t, q, false)
                }
            }

            function i(n, w) {
                p = n;
                o = w;
                l()
            }
            this.applyPan = i;

            function q(x) {
                return false;
                if (!s.enabled) {
                    return false
                }
                var n = window.event || x,
                    y = n.detail ? n.detail : n.wheelDelta * -1,
                    w = a(n, g);
                if (y > 0) {
                    y = -1
                } else {
                    if (y < 0) {
                        y = 1
                    }
                }
                r(y, w);
                if (n.preventDefault) {
                    n.preventDefault()
                } else {
                    n.returnValue = false
                }
                return false
            }

            function r(n, w) {
                if (!s.enabled) {
                    return false
                }
                s.currZoom += n;
                if (s.currZoom < m.minZoom) {
                    s.currZoom = m.minZoom
                } else {
                    if (s.currZoom > m.maxZoom) {
                        s.currZoom = m.maxZoom
                    } else {
                        w = w || {
                            x: j.width / 2,
                            y: j.height / 2
                        };
                        p = ((j.width * m.zoomStep) * (w.x / j.width)) * n;
                        o = (j.height * m.zoomStep) * (w.y / j.height) * n;
                        l()
                    }
                }
            }
            this.applyZoom = r;

            function u(z) {
                if (!s.enabled) {
                    return false
                }
                var x = window.event || z,
                    y = j.width * (1 - (s.currZoom * m.zoomStep)),
                    w = j.height * (1 - (s.currZoom * m.zoomStep)),
                    n = a(x, g);
                p = (y * (n.x - k.x) / j.width) * -1;
                o = (w * (n.y - k.y) / j.height) * -1;
                k = n;
                l();
                s.dragTime += 1;
                if (x.preventDefault) {
                    x.preventDefault()
                } else {
                    x.returnValue = false
                }
                return false
            }

            function l() {
                s.currPos.x = s.currPos.x + p;
                s.currPos.y = s.currPos.y + o;
                var w = j.width * (1 - (s.currZoom * m.zoomStep)),
                    n = j.height * (1 - (s.currZoom * m.zoomStep));
                if (s.currPos.x < 0) {
                    s.currPos.x = 0
                } else {
                    if (s.currPos.x > (j.width * s.currZoom * m.zoomStep)) {
                        s.currPos.x = (j.width * s.currZoom * m.zoomStep)
                    }
                }
                if (s.currPos.y < 0) {
                    s.currPos.y = 0
                } else {
                    d = m.map_width * 100 / m.map_original_width / 100;
                    f = m.map_height * 100 / m.map_original_height / 100;
                    if (s.currPos.y > (j.height * s.currZoom * m.zoomStep)) {
                        s.currPos.y = (j.height * s.currZoom * m.zoomStep)
                    }
                }
                j.setViewBox(s.currPos.x, s.currPos.y, w / d, n / f)
            }
        };
    c.prototype = e;

    function a(i, h) {
        var g, k, j;
        if (i.pageX || i.pageY) {
            g = i.pageX;
            k = i.pageY
        } else {
            g = i.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            k = i.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        j = b(h);
        g -= j[0];
        k -= j[1];
        return {
            x: g,
            y: k
        }
    }

    function b(g) {
        var j = g.offsetLeft,
            h = g.offsetTop,
            i;
        while (g.offsetParent) {
            if (g == document.getElementsByTagName("body")[0]) {
                break
            } else {
                j = j + g.offsetParent.offsetLeft;
                h = h + g.offsetParent.offsetTop;
                g = g.offsetParent
            }
        }
        i = [j, h];
        return i
    }
})();
var map_params = {
    reducedSectionOpacity: 0.4,
    reducedRowOpacity: 0.4,
    priceRangeColors: true,
    dvm_url: "https://dynamicvenuemaps.com/maps/",
    rowPickParams: {
        normal: {
            color: "#F79014",
            opacity: 0.7,
            strokeColor: "#FFF",
            strokeWidth: 1,
            strokeOpacity: 1
        },
        hover: {
            color: "#E5DF00",
            opacity: 0.7,
            strokeColor: "#FFF",
            strokeWidth: 1,
            strokeOpacity: 1
        }
    }
};
var sectionSettings = {
    normal: {
        withTix: {
            color: "#06C5F2",
            opacity: "0.8",
            strokeColor: "#FFF",
            strokeWidth: "2",
            strokeOpacity: "1"
        },
        noTix: {
            color: "#000",
            opacity: "0.4",
            strokeColor: "#FFF",
            strokeWidth: "2",
            strokeOpacity: "1"
        }
    },
    click: {
        withTix: {
            color: "#6eb66c",
            opacity: "0.8",
            strokeColor: "#000",
            strokeWidth: "0",
            strokeOpacity: "0.4"
        },
        noTix: {
            color: "#000",
            opacity: "0.2",
            strokeColor: "#CCC",
            strokeWidth: "2",
            strokeOpacity: "1"
        }
    },
    hover: {
        withTix: {
            color: "#E5DF00",
            opacity: "0.8",
            strokeColor: "#CCC",
            strokeWidth: "2",
            strokeOpacity: "1"
        },
        noTix: {
            color: "#000",
            opacity: "0.4",
            strokeColor: "#CCC",
            strokeWidth: "0",
            strokeOpacity: "1"
        }
    }
};
var rowSettings = {
    normal: {
        withTix: {
            color: "#06C5F2",
            opacity: "0.7",
            strokeColor: "#FFF",
            strokeWidth: "1",
            strokeOpacity: "1"
        },
        noTix: {
            color: "#000",
            opacity: "0.4",
            strokeColor: "#CCC",
            strokeWidth: "0.5",
            strokeOpacity: "0.2"
        }
    },
    click: {
        withTix: {
            color: "#6eb66c",
            opacity: "0.7",
            strokeColor: "#CCC",
            strokeWidth: "1",
            strokeOpacity: "1"
        },
        noTix: {
            color: "#15B5ED",
            opacity: "0.4",
            strokeColor: "#CCC",
            strokeWidth: "2",
            strokeOpacity: "1"
        }
    },
    hover: {
        withTix: {
            color: "#E5DF00",
            opacity: "0.8",
            strokeColor: "#CCC",
            strokeWidth: "2",
            strokeOpacity: "1"
        },
        noTix: {
            color: "#F00",
            opacity: "0.4",
            strokeColor: "#CCC",
            strokeWidth: "2",
            strokeOpacity: "1"
        }
    }
};
var color_price_ranges = {
    0: "#21CCF4",
    1: "#4DA91A",
    2: "#F46C21",
    3: "#E22B2B"
};