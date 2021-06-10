/*! URI.js v1.11.2 http://medialize.github.com/URI.js/ */
/* build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js, URITemplate.js, jquery.URI.js */
(function(f, h) { "object" === typeof exports ? module.exports = h() : "function" === typeof define && define.amd ? define(h) : f.IPv6 = h(f); })(this, function(f) {
    var h = f && f.IPv6;
    return{
        best: function(g) {
            g = g.toLowerCase().split(":");
            var f = g.length, b = 8;
            "" === g[0] && "" === g[1] && "" === g[2] ? (g.shift(), g.shift()) : "" === g[0] && "" === g[1] ? g.shift() : "" === g[f - 1] && "" === g[f - 2] && g.pop();
            f = g.length;
            -1 !== g[f - 1].indexOf(".") && (b = 7);
            var h;
            for (h = 0; h < f && "" !== g[h]; h++);
            if (h < b)for (g.splice(h, 1, "0000"); g.length < b;)g.splice(h, 0, "0000");
            for (h = 0; h < b; h++) {
                for (var f =
                             g[h].split(""),
                    r = 0; 3 > r; r++)
                    if ("0" === f[0] && 1 < f.length)f.splice(0, 1);
                    else break;
                g[h] = f.join("");
            }
            var f = -1, t = r = 0, s = -1, w = !1;
            for (h = 0; h < b; h++)w ? "0" === g[h] ? t += 1 : (w = !1, t > r && (f = s, r = t)) : "0" == g[h] && (w = !0, s = h, t = 1);
            t > r && (f = s, r = t);
            1 < r && g.splice(f, r, "");
            f = g.length;
            b = "";
            "" === g[0] && (beststr = ":");
            for (h = 0; h < f; h++) {
                b += g[h];
                if (h === f - 1)break;
                b += ":";
            }
            "" === g[f - 1] && (b += ":");
            return b;
        },
        noConflict: function() {
            f.IPv6 === this && (f.IPv6 = h);
            return this;
        }
    };
});
(function(f) {
    function h(a) { throw RangeError(B[a]); }

    function g(a, c) {
        for (var d = a.length; d--;)a[d] = c(a[d]);
        return a;
    }

    function n(a, c) { return g(a.split(m), c).join("."); }

    function b(a) {
        for (var c = [], d = 0, b = a.length, m, e; d < b;)m = a.charCodeAt(d++), 55296 <= m && 56319 >= m && d < b ? (e = a.charCodeAt(d++), 56320 == (e & 64512) ? c.push(((m & 1023) << 10) + (e & 1023) + 65536) : (c.push(m), d--)) : c.push(m);
        return c;
    }

    function u(a) {
        return g(a, function(a) {
            var c = "";
            65535 < a && (a -= 65536, c += C(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023);
            return c += C(a);
        }).join("");
    }

    function r(a,
        c) { return a + 22 + 75 * (26 > a) - ((0 != c) << 5); }

    function t(a, c, d) {
        var b = 0;
        a = d ? A(a / G) : a >> 1;
        for (a += A(a / c); a > x * y >> 1; b += l)a = A(a / x);
        return A(b + (x + 1) * a / (a + H));
    }

    function s(c) {
        var d = [], b = c.length, m, e = 0, B = D, f = E, k, s, g, p, x;
        k = c.lastIndexOf(a);
        0 > k && (k = 0);
        for (s = 0; s < k; ++s)128 <= c.charCodeAt(s) && h("not-basic"), d.push(c.charCodeAt(s));
        for (k = 0 < k ? k + 1 : 0; k < b;) {
            s = e;
            m = 1;
            for (g = l;; g += l) {
                k >= b && h("invalid-input");
                p = c.charCodeAt(k++);
                p = 10 > p - 48 ? p - 22 : 26 > p - 65 ? p - 65 : 26 > p - 97 ? p - 97 : l;
                (p >= l || p > A((q - e) / m)) && h("overflow");
                e += p * m;
                x = g <= f ? v : g >= f + y ? y :
                    g - f;
                if (p < x)break;
                p = l - x;
                m > A(q / p) && h("overflow");
                m *= p;
            }
            m = d.length + 1;
            f = t(e - s, m, 0 == s);
            A(e / m) > q - B && h("overflow");
            B += A(e / m);
            e %= m;
            d.splice(e++, 0, B);
        }
        return u(d);
    }

    function w(c) {
        var d, m, e, B, k, f, s, p, g, x = [], w, z, n;
        c = b(c);
        w = c.length;
        d = D;
        m = 0;
        k = E;
        for (f = 0; f < w; ++f)g = c[f], 128 > g && x.push(C(g));
        for ((e = B = x.length) && x.push(a); e < w;) {
            s = q;
            for (f = 0; f < w; ++f)g = c[f], g >= d && g < s && (s = g);
            z = e + 1;
            s - d > A((q - m) / z) && h("overflow");
            m += (s - d) * z;
            d = s;
            for (f = 0; f < w; ++f)
                if (g = c[f], g < d && ++m > q && h("overflow"), g == d) {
                    p = m;
                    for (s = l;; s += l) {
                        g = s <= k ? v : s >= k + y ? y : s - k;
                        if (p < g)break;
                        n = p - g;
                        p = l - g;
                        x.push(C(r(g + n % p, 0)));
                        p = A(n / p);
                    }
                    x.push(C(r(p, 0)));
                    k = t(m, z, e == B);
                    m = 0;
                    ++e;
                }
            ++m;
            ++d;
        }
        return x.join("");
    }

    var z = "object" == typeof exports && exports, k = "object" == typeof module && module && module.exports == z && module, p = "object" == typeof global && global;
    if (p.global === p || p.window === p)f = p;
    var e,
        q = 2147483647,
        l = 36,
        v = 1,
        y = 26,
        H = 38,
        G = 700,
        E = 72,
        D = 128,
        a = "-",
        c = /^xn--/,
        d = /[^ -~]/,
        m = /\x2E|\u3002|\uFF0E|\uFF61/g,
        B = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        },
        x = l - v,
        A = Math.floor,
        C = String.fromCharCode,
        F;
    e = { version: "1.2.3", ucs2: { decode: b, encode: u }, decode: s, encode: w, toASCII: function(a) { return n(a, function(a) { return d.test(a) ? "xn--" + w(a) : a; }); }, toUnicode: function(a) { return n(a, function(a) { return c.test(a) ? s(a.slice(4).toLowerCase()) : a; }); } };
    if ("function" == typeof define && "object" == typeof define.amd && define.amd)define(function() { return e; });
    else if (z && !z.nodeType)
        if (k)k.exports = e;
        else for (F in e)e.hasOwnProperty(F) && (z[F] = e[F]);
    else
        f.punycode =
            e;
})(this);
(function(f, h) { "object" === typeof exports ? module.exports = h() : "function" === typeof define && define.amd ? define(h) : f.SecondLevelDomains = h(f); })(this, function(f) {
    var h = f && f.SecondLevelDomains,
        g = Object.prototype.hasOwnProperty,
        n = {
            list: {
                ac: "com|gov|mil|net|org",
                ae: "ac|co|gov|mil|name|net|org|pro|sch",
                af: "com|edu|gov|net|org",
                al: "com|edu|gov|mil|net|org",
                ao: "co|ed|gv|it|og|pb",
                ar: "com|edu|gob|gov|int|mil|net|org|tur",
                at: "ac|co|gv|or",
                au: "asn|com|csiro|edu|gov|id|net|org",
                ba: "co|com|edu|gov|mil|net|org|rs|unbi|unmo|unsa|untz|unze",
                bb: "biz|co|com|edu|gov|info|net|org|store|tv",
                bh: "biz|cc|com|edu|gov|info|net|org",
                bn: "com|edu|gov|net|org",
                bo: "com|edu|gob|gov|int|mil|net|org|tv",
                br: "adm|adv|agr|am|arq|art|ato|b|bio|blog|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|flog|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|jus|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|vlog|wiki|zlg",
                bs: "com|edu|gov|net|org",
                bz: "du|et|om|ov|rg",
                ca: "ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk",
                ck: "biz|co|edu|gen|gov|info|net|org",
                cn: "ac|ah|bj|com|cq|edu|fj|gd|gov|gs|gx|gz|ha|hb|he|hi|hl|hn|jl|js|jx|ln|mil|net|nm|nx|org|qh|sc|sd|sh|sn|sx|tj|tw|xj|xz|yn|zj",
                co: "com|edu|gov|mil|net|nom|org",
                cr: "ac|c|co|ed|fi|go|or|sa",
                cy: "ac|biz|com|ekloges|gov|ltd|name|net|org|parliament|press|pro|tm",
                "do": "art|com|edu|gob|gov|mil|net|org|sld|web",
                dz: "art|asso|com|edu|gov|net|org|pol",
                ec: "com|edu|fin|gov|info|med|mil|net|org|pro",
                eg: "com|edu|eun|gov|mil|name|net|org|sci",
                er: "com|edu|gov|ind|mil|net|org|rochest|w",
                es: "com|edu|gob|nom|org",
                et: "biz|com|edu|gov|info|name|net|org",
                fj: "ac|biz|com|info|mil|name|net|org|pro",
                fk: "ac|co|gov|net|nom|org",
                fr: "asso|com|f|gouv|nom|prd|presse|tm",
                gg: "co|net|org",
                gh: "com|edu|gov|mil|org",
                gn: "ac|com|gov|net|org",
                gr: "com|edu|gov|mil|net|org",
                gt: "com|edu|gob|ind|mil|net|org",
                gu: "com|edu|gov|net|org",
                hk: "com|edu|gov|idv|net|org",
                id: "ac|co|go|mil|net|or|sch|web",
                il: "ac|co|gov|idf|k12|muni|net|org",
                "in": "ac|co|edu|ernet|firm|gen|gov|i|ind|mil|net|nic|org|res",
                iq: "com|edu|gov|i|mil|net|org",
                ir: "ac|co|dnssec|gov|i|id|net|org|sch",
                it: "edu|gov",
                je: "co|net|org",
                jo: "com|edu|gov|mil|name|net|org|sch",
                jp: "ac|ad|co|ed|go|gr|lg|ne|or",
                ke: "ac|co|go|info|me|mobi|ne|or|sc",
                kh: "com|edu|gov|mil|net|org|per",
                ki: "biz|com|de|edu|gov|info|mob|net|org|tel",
                km: "asso|com|coop|edu|gouv|k|medecin|mil|nom|notaires|pharmaciens|presse|tm|veterinaire",
                kn: "edu|gov|net|org",
                kr: "ac|busan|chungbuk|chungnam|co|daegu|daejeon|es|gangwon|go|gwangju|gyeongbuk|gyeonggi|gyeongnam|hs|incheon|jeju|jeonbuk|jeonnam|k|kg|mil|ms|ne|or|pe|re|sc|seoul|ulsan",
                kw: "com|edu|gov|net|org",
                ky: "com|edu|gov|net|org",
                kz: "com|edu|gov|mil|net|org",
                lb: "com|edu|gov|net|org",
                lk: "assn|com|edu|gov|grp|hotel|int|ltd|net|ngo|org|sch|soc|web",
                lr: "com|edu|gov|net|org",
                lv: "asn|com|conf|edu|gov|id|mil|net|org",
                ly: "com|edu|gov|id|med|net|org|plc|sch",
                ma: "ac|co|gov|m|net|org|press",
                mc: "asso|tm",
                me: "ac|co|edu|gov|its|net|org|priv",
                mg: "com|edu|gov|mil|nom|org|prd|tm",
                mk: "com|edu|gov|inf|name|net|org|pro",
                ml: "com|edu|gov|net|org|presse",
                mn: "edu|gov|org",
                mo: "com|edu|gov|net|org",
                mt: "com|edu|gov|net|org",
                mv: "aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro",
                mw: "ac|co|com|coop|edu|gov|int|museum|net|org",
                mx: "com|edu|gob|net|org",
                my: "com|edu|gov|mil|name|net|org|sch",
                nf: "arts|com|firm|info|net|other|per|rec|store|web",
                ng: "biz|com|edu|gov|mil|mobi|name|net|org|sch",
                ni: "ac|co|com|edu|gob|mil|net|nom|org",
                np: "com|edu|gov|mil|net|org",
                nr: "biz|com|edu|gov|info|net|org",
                om: "ac|biz|co|com|edu|gov|med|mil|museum|net|org|pro|sch",
                pe: "com|edu|gob|mil|net|nom|org|sld",
                ph: "com|edu|gov|i|mil|net|ngo|org",
                pk: "biz|com|edu|fam|gob|gok|gon|gop|gos|gov|net|org|web",
                pl: "art|bialystok|biz|com|edu|gda|gdansk|gorzow|gov|info|katowice|krakow|lodz|lublin|mil|net|ngo|olsztyn|org|poznan|pwr|radom|slupsk|szczecin|torun|warszawa|waw|wroc|wroclaw|zgora",
                pr: "ac|biz|com|edu|est|gov|info|isla|name|net|org|pro|prof",
                ps: "com|edu|gov|net|org|plo|sec",
                pw: "belau|co|ed|go|ne|or",
                ro: "arts|com|firm|info|nom|nt|org|rec|store|tm|www",
                rs: "ac|co|edu|gov|in|org",
                sb: "com|edu|gov|net|org",
                sc: "com|edu|gov|net|org",
                sh: "co|com|edu|gov|net|nom|org",
                sl: "com|edu|gov|net|org",
                st: "co|com|consulado|edu|embaixada|gov|mil|net|org|principe|saotome|store",
                sv: "com|edu|gob|org|red",
                sz: "ac|co|org",
                tr: "av|bbs|bel|biz|com|dr|edu|gen|gov|info|k12|name|net|org|pol|tel|tsk|tv|web",
                tt: "aero|biz|cat|co|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel",
                tw: "club|com|ebiz|edu|game|gov|idv|mil|net|org",
                mu: "ac|co|com|gov|net|or|org",
                mz: "ac|co|edu|gov|org",
                na: "co|com",
                nz: "ac|co|cri|geek|gen|govt|health|iwi|maori|mil|net|org|parliament|school",
                pa: "abo|ac|com|edu|gob|ing|med|net|nom|org|sld",
                pt: "com|edu|gov|int|net|nome|org|publ",
                py: "com|edu|gov|mil|net|org",
                qa: "com|edu|gov|mil|net|org",
                re: "asso|com|nom",
                ru: "ac|adygeya|altai|amur|arkhangelsk|astrakhan|bashkiria|belgorod|bir|bryansk|buryatia|cbg|chel|chelyabinsk|chita|chukotka|chuvashia|com|dagestan|e-burg|edu|gov|grozny|int|irkutsk|ivanovo|izhevsk|jar|joshkar-ola|kalmykia|kaluga|kamchatka|karelia|kazan|kchr|kemerovo|khabarovsk|khakassia|khv|kirov|koenig|komi|kostroma|kranoyarsk|kuban|kurgan|kursk|lipetsk|magadan|mari|mari-el|marine|mil|mordovia|mosreg|msk|murmansk|nalchik|net|nnov|nov|novosibirsk|nsk|omsk|orenburg|org|oryol|penza|perm|pp|pskov|ptz|rnd|ryazan|sakhalin|samara|saratov|simbirsk|smolensk|spb|stavropol|stv|surgut|tambov|tatarstan|tom|tomsk|tsaritsyn|tsk|tula|tuva|tver|tyumen|udm|udmurtia|ulan-ude|vladikavkaz|vladimir|vladivostok|volgograd|vologda|voronezh|vrn|vyatka|yakutia|yamal|yekaterinburg|yuzhno-sakhalinsk",
                rw: "ac|co|com|edu|gouv|gov|int|mil|net",
                sa: "com|edu|gov|med|net|org|pub|sch",
                sd: "com|edu|gov|info|med|net|org|tv",
                se: "a|ac|b|bd|c|d|e|f|g|h|i|k|l|m|n|o|org|p|parti|pp|press|r|s|t|tm|u|w|x|y|z",
                sg: "com|edu|gov|idn|net|org|per",
                sn: "art|com|edu|gouv|org|perso|univ",
                sy: "com|edu|gov|mil|net|news|org",
                th: "ac|co|go|in|mi|net|or",
                tj: "ac|biz|co|com|edu|go|gov|info|int|mil|name|net|nic|org|test|web",
                tn: "agrinet|com|defense|edunet|ens|fin|gov|ind|info|intl|mincom|nat|net|org|perso|rnrt|rns|rnu|tourism",
                tz: "ac|co|go|ne|or",
                ua: "biz|cherkassy|chernigov|chernovtsy|ck|cn|co|com|crimea|cv|dn|dnepropetrovsk|donetsk|dp|edu|gov|if|in|ivano-frankivsk|kh|kharkov|kherson|khmelnitskiy|kiev|kirovograd|km|kr|ks|kv|lg|lugansk|lutsk|lviv|me|mk|net|nikolaev|od|odessa|org|pl|poltava|pp|rovno|rv|sebastopol|sumy|te|ternopil|uzhgorod|vinnica|vn|zaporizhzhe|zhitomir|zp|zt",
                ug: "ac|co|go|ne|or|org|sc",
                uk: "ac|bl|british-library|co|cym|gov|govt|icnet|jet|lea|ltd|me|mil|mod|national-library-scotland|nel|net|nhs|nic|nls|org|orgn|parliament|plc|police|sch|scot|soc",
                us: "dni|fed|isa|kids|nsn",
                uy: "com|edu|gub|mil|net|org",
                ve: "co|com|edu|gob|info|mil|net|org|web",
                vi: "co|com|k12|net|org",
                vn: "ac|biz|com|edu|gov|health|info|int|name|net|org|pro",
                ye: "co|com|gov|ltd|me|net|org|plc",
                yu: "ac|co|edu|gov|org",
                za: "ac|agric|alt|bourse|city|co|cybernet|db|edu|gov|grondar|iaccess|imt|inca|landesign|law|mil|net|ngo|nis|nom|olivetti|org|pix|school|tm|web",
                zm: "ac|co|com|edu|gov|net|org|sch"
            },
            has_expression: null,
            is_expression: null,
            has: function(b) { return!!b.match(n.has_expression); },
            is: function(b) { return!!b.match(n.is_expression); },
            get: function(b) { return(b = b.match(n.has_expression)) && b[1] || null; },
            noConflict: function() {
                f.SecondLevelDomains === this && (f.SecondLevelDomains = h);
                return this;
            },
            init: function() {
                var b = "", f;
                for (f in n.list)g.call(n.list, f) && (b += "|(" + ("(" + n.list[f] + ")." + f) + ")");
                n.has_expression = RegExp("\\.(" + b.substr(1) + ")$", "i");
                n.is_expression = RegExp("^(" + b.substr(1) + ")$", "i");
            }
        };
    n.init();
    return n;
});
(function(f, h) { "object" === typeof exports ? module.exports = h(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], h) : f.URI = h(f.punycode, f.IPv6, f.SecondLevelDomains, f); })(this, function(f, h, g, n) {
    function b(a, c) {
        if (!(this instanceof b))return new b(a, c);
        void 0 === a && (a = "undefined" !== typeof location ? location.href + "" : "");
        this.href(a);
        return void 0 !== c ? this.absoluteTo(c) : this;
    }

    function u(a) {
        return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
            "\\$1");
    }

    function r(a) { return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1); }

    function t(a) { return"Array" === r(a); }

    function s(a, c) {
        var d, b;
        if (t(c)) {
            d = 0;
            for (b = c.length; d < b; d++)if (!s(a, c[d]))return!1;
            return!0;
        }
        var e = r(c);
        d = 0;
        for (b = a.length; d < b; d++)
            if ("RegExp" === e) {
                if ("string" === typeof a[d] && a[d].match(c))return!0;
            } else if (a[d] === c)return!0;
        return!1;
    }

    function w(a, c) {
        if (!t(a) || !t(c) || a.length !== c.length)return!1;
        a.sort();
        c.sort();
        for (var d = 0, b = a.length; d < b; d++)if (a[d] !== c[d])return!1;
        return!0;
    }

    function z(a) { return escape(a); }

    function k(a) { return encodeURIComponent(a).replace(/[!'()*]/g, z).replace(/\*/g, "%2A"); }

    var p = n && n.URI, e = b.prototype, q = Object.prototype.hasOwnProperty;
    b._parts = function() { return{ protocol: null, username: null, password: null, hostname: null, urn: null, port: null, path: null, query: null, fragment: null, duplicateQueryParameters: b.duplicateQueryParameters, escapeQuerySpace: b.escapeQuerySpace }; };
    b.duplicateQueryParameters = !1;
    b.escapeQuerySpace = !0;
    b.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
    b.idn_expression = /[^a-z0-9\.-]/i;
    b.punycode_expression = /(xn--)/i;
    b.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    b.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    b.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;
    b.defaultPorts = { http: "80", https: "443", ftp: "21", gopher: "70", ws: "80", wss: "443" };
    b.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
    b.domAttributes = {
        a: "href",
        blockquote: "cite",
        link: "href",
        base: "href",
        script: "src",
        form: "action",
        img: "src",
        area: "href",
        iframe: "src",
        embed: "src",
        source: "src",
        track: "src",
        input: "src"
    };
    b.getDomAttribute = function(a) {
        if (a && a.nodeName) {
            var c = a.nodeName.toLowerCase();
            return"input" === c && "image" !== a.type ? void 0 : b.domAttributes[c];
        }
    };
    b.encode = k;
    b.decode = decodeURIComponent;
    b.iso8859 = function() {
        b.encode = escape;
        b.decode = unescape;
    };
    b.unicode = function() {
        b.encode = k;
        b.decode = decodeURIComponent;
    };
    b.characters = {
        pathname: {
            encode: {
                expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                map: {
                    "%24": "$",
                    "%26": "&",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%3A": ":",
                    "%40": "@"
                }
            },
            decode: { expression: /[\/\?#]/g, map: { "/": "%2F", "?": "%3F", "#": "%23" } }
        },
        reserved: { encode: { expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: { "%3A": ":", "%2F": "/", "%3F": "?", "%23": "#", "%5B": "[", "%5D": "]", "%40": "@", "%21": "!", "%24": "$", "%26": "&", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=" } } }
    };
    b.encodeQuery = function(a, c) {
        var d = b.encode(a + "");
        return c ? d.replace(/%20/g, "+") : d;
    };
    b.decodeQuery = function(a, c) {
        a += "";
        try {
            return b.decode(c ?
                a.replace(/\+/g, "%20") : a);
        } catch (d) {
            return a;
        }
    };
    b.recodePath = function(a) {
        a = (a + "").split("/");
        for (var c = 0, d = a.length; c < d; c++)a[c] = b.encodePathSegment(b.decode(a[c]));
        return a.join("/");
    };
    b.decodePath = function(a) {
        a = (a + "").split("/");
        for (var c = 0, d = a.length; c < d; c++)a[c] = b.decodePathSegment(a[c]);
        return a.join("/");
    };
    var l = { encode: "encode", decode: "decode" }, v, y = function(a, c) { return function(d) { return b[c](d + "").replace(b.characters[a][c].expression, function(d) { return b.characters[a][c].map[d]; }); }; };
    for (v in l)
        b[v +
            "PathSegment"] = y("pathname", l[v]);
    b.encodeReserved = y("reserved", "encode");
    b.parse = function(a, c) {
        var d;
        c || (c = {});
        d = a.indexOf("#");
        -1 < d && (c.fragment = a.substring(d + 1) || null, a = a.substring(0, d));
        d = a.indexOf("?");
        -1 < d && (c.query = a.substring(d + 1) || null, a = a.substring(0, d));
        "//" === a.substring(0, 2) ? (c.protocol = null, a = a.substring(2), a = b.parseAuthority(a, c)) : (d = a.indexOf(":"), -1 < d && (c.protocol = a.substring(0, d) || null, c.protocol && !c.protocol.match(b.protocol_expression) ? c.protocol = void 0 : "file" === c.protocol ? a = a.substring(d +
            3) : "//" === a.substring(d + 1, d + 3) ? (a = a.substring(d + 3), a = b.parseAuthority(a, c)) : (a = a.substring(d + 1), c.urn = !0)));
        c.path = a;
        return c;
    };
    b.parseHost = function(a, c) {
        var d = a.indexOf("/"), b;
        -1 === d && (d = a.length);
        "[" === a.charAt(0) ? (b = a.indexOf("]"), c.hostname = a.substring(1, b) || null, c.port = a.substring(b + 2, d) || null) : a.indexOf(":") !== a.lastIndexOf(":") ? (c.hostname = a.substring(0, d) || null, c.port = null) : (b = a.substring(0, d).split(":"), c.hostname = b[0] || null, c.port = b[1] || null);
        c.hostname && "/" !== a.substring(d).charAt(0) && (d++,
            a = "/" + a);
        return a.substring(d) || "/";
    };
    b.parseAuthority = function(a, c) {
        a = b.parseUserinfo(a, c);
        return b.parseHost(a, c);
    };
    b.parseUserinfo = function(a, c) {
        var d = a.indexOf("/"), m = -1 < d ? a.lastIndexOf("@", d) : a.indexOf("@");
        -1 < m && (-1 === d || m < d) ? (d = a.substring(0, m).split(":"), c.username = d[0] ? b.decode(d[0]) : null, d.shift(), c.password = d[0] ? b.decode(d.join(":")) : null, a = a.substring(m + 1)) : (c.username = null, c.password = null);
        return a;
    };
    b.parseQuery = function(a, c) {
        if (!a)return{};
        a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g,
            "");
        if (!a)return{};
        for (var d = {}, m = a.split("&"), e = m.length, f, k, s = 0; s < e; s++)f = m[s].split("="), k = b.decodeQuery(f.shift(), c), f = f.length ? b.decodeQuery(f.join("="), c) : null, d[k] ? ("string" === typeof d[k] && (d[k] = [d[k]]), d[k].push(f)) : d[k] = f;
        return d;
    };
    b.build = function(a) {
        var c = "";
        a.protocol && (c += a.protocol + ":");
        a.urn || !c && !a.hostname || (c += "//");
        c += b.buildAuthority(a) || "";
        "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (c += "/"), c += a.path);
        "string" === typeof a.query && a.query && (c +=
            "?" + a.query);
        "string" === typeof a.fragment && a.fragment && (c += "#" + a.fragment);
        return c;
    };
    b.buildHost = function(a) {
        var c = "";
        if (a.hostname)b.ip6_expression.test(a.hostname) ? c = a.port ? c + ("[" + a.hostname + "]:" + a.port) : c + a.hostname : (c += a.hostname, a.port && (c += ":" + a.port));
        else return"";
        return c;
    };
    b.buildAuthority = function(a) { return b.buildUserinfo(a) + b.buildHost(a); };
    b.buildUserinfo = function(a) {
        var c = "";
        a.username && (c += b.encode(a.username), a.password && (c += ":" + b.encode(a.password)), c += "@");
        return c;
    };
    b.buildQuery =
        function(a, c, d) {
            var m = "", e, f, k, s;
            for (f in a)
                if (q.call(a, f) && f)
                    if (t(a[f]))for (e = {}, k = 0, s = a[f].length; k < s; k++)void 0 !== a[f][k] && void 0 === e[a[f][k] + ""] && (m += "&" + b.buildQueryParameter(f, a[f][k], d), !0 !== c && (e[a[f][k] + ""] = !0));
                    else void 0 !== a[f] && (m += "&" + b.buildQueryParameter(f, a[f], d));
            return m.substring(1);
        };
    b.buildQueryParameter = function(a, c, d) { return b.encodeQuery(a, d) + (null !== c ? "=" + b.encodeQuery(c, d) : ""); };
    b.addQuery = function(a, c, d) {
        if ("object" === typeof c)for (var m in c)q.call(c, m) && b.addQuery(a, m, c[m]);
        else if ("string" === typeof c)void 0 === a[c] ? a[c] = d : ("string" === typeof a[c] && (a[c] = [a[c]]), t(d) || (d = [d]), a[c] = a[c].concat(d));
        else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    };
    b.removeQuery = function(a, c, d) {
        var m;
        if (t(c))for (d = 0, m = c.length; d < m; d++)a[c[d]] = void 0;
        else if ("object" === typeof c)for (m in c)q.call(c, m) && b.removeQuery(a, m, c[m]);
        else if ("string" === typeof c)
            if (void 0 !== d)
                if (a[c] === d)a[c] = void 0;
                else {
                    if (t(a[c])) {
                        m = a[c];
                        var e = {}, f, k;
                        if (t(d))
                            for (f = 0, k = d.length; f <
                                k; f++)e[d[f]] = !0;
                        else e[d] = !0;
                        f = 0;
                        for (k = m.length; f < k; f++)void 0 !== e[m[f]] && (m.splice(f, 1), k--, f--);
                        a[c] = m;
                    }
                }
            else a[c] = void 0;
        else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
    };
    b.hasQuery = function(a, c, d, m) {
        if ("object" === typeof c) {
            for (var e in c)if (q.call(c, e) && !b.hasQuery(a, e, c[e]))return!1;
            return!0;
        }
        if ("string" !== typeof c)throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
        switch (r(d)) {
        case "Undefined":
            return c in a;
        case "Boolean":
            return a =
                Boolean(t(a[c]) ? a[c].length : a[c]), d === a;
        case "Function":
            return!!d(a[c], c, a);
        case "Array":
            return t(a[c]) ? (m ? s : w)(a[c], d) : !1;
        case "RegExp":
            return t(a[c]) ? m ? s(a[c], d) : !1 : Boolean(a[c] && a[c].match(d));
        case "Number":
            d = String(d);
        case "String":
            return t(a[c]) ? m ? s(a[c], d) : !1 : a[c] === d;
        default:
            throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
        }
    };
    b.commonPath = function(a, c) {
        var d = Math.min(a.length, c.length), b;
        for (b = 0; b < d; b++)
            if (a.charAt(b) !==
                c.charAt(b)) {
                b--;
                break;
            }
        if (1 > b)return a.charAt(0) === c.charAt(0) && "/" === a.charAt(0) ? "/" : "";
        if ("/" !== a.charAt(b) || "/" !== c.charAt(b))b = a.substring(0, b).lastIndexOf("/");
        return a.substring(0, b + 1);
    };
    b.withinString = function(a, c) { return a.replace(b.find_uri_expression, c); };
    b.ensureValidHostname = function(a) {
        if (a.match(b.invalid_hostname_characters)) {
            if (!f)throw new TypeError("Hostname '" + a + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
            if (f.toASCII(a).match(b.invalid_hostname_characters))
                throw new TypeError("Hostname '" +
                    a + "' contains characters other than [A-Z0-9.-]");
        }
    };
    b.noConflict = function(a) {
        if (a)return a = { URI: this.noConflict() }, URITemplate && "function" == typeof URITemplate.noConflict && (a.URITemplate = URITemplate.noConflict()), h && "function" == typeof h.noConflict && (a.IPv6 = h.noConflict()), SecondLevelDomains && "function" == typeof SecondLevelDomains.noConflict && (a.SecondLevelDomains = SecondLevelDomains.noConflict()), a;
        n.URI === this && (n.URI = p);
        return this;
    };
    e.build = function(a) {
        if (!0 === a)this._deferred_build = !0;
        else if (void 0 ===
            a || this._deferred_build)this._string = b.build(this._parts), this._deferred_build = !1;
        return this;
    };
    e.clone = function() { return new b(this); };
    e.valueOf = e.toString = function() { return this.build(!1)._string; };
    l = { protocol: "protocol", username: "username", password: "password", hostname: "hostname", port: "port" };
    y = function(a) {
        return function(c, d) {
            if (void 0 === c)return this._parts[a] || "";
            this._parts[a] = c || null;
            this.build(!d);
            return this;
        };
    };
    for (v in l)e[v] = y(l[v]);
    l = { query: "?", fragment: "#" };
    y = function(a, c) {
        return function(d,
            b) {
            if (void 0 === d)return this._parts[a] || "";
            null !== d && (d += "", d.charAt(0) === c && (d = d.substring(1)));
            this._parts[a] = d;
            this.build(!b);
            return this;
        };
    };
    for (v in l)e[v] = y(v, l[v]);
    l = { search: ["?", "query"], hash: ["#", "fragment"] };
    y = function(a, c) {
        return function(d, b) {
            var e = this[a](d, b);
            return"string" === typeof e && e.length ? c + e : e;
        };
    };
    for (v in l)e[v] = y(l[v][1], l[v][0]);
    e.pathname = function(a, c) {
        if (void 0 === a || !0 === a) {
            var d = this._parts.path || (this._parts.hostname ? "/" : "");
            return a ? b.decodePath(d) : d;
        }
        this._parts.path = a ? b.recodePath(a) :
            "/";
        this.build(!c);
        return this;
    };
    e.path = e.pathname;
    e.href = function(a, c) {
        var d;
        if (void 0 === a)return this.toString();
        this._string = "";
        this._parts = b._parts();
        var e = a instanceof b, f = "object" === typeof a && (a.hostname || a.path || a.pathname);
        a.nodeName && (f = b.getDomAttribute(a), a = a[f] || "", f = !1);
        !e && f && void 0 !== a.pathname && (a = a.toString());
        if ("string" === typeof a)this._parts = b.parse(a, this._parts);
        else if (e || f)for (d in e = e ? a._parts : a, e)q.call(this._parts, d) && (this._parts[d] = e[d]);
        else throw new TypeError("invalid input");
        this.build(!c);
        return this;
    };
    e.is = function(a) {
        var c = !1, d = !1, e = !1, f = !1, k = !1, s = !1, p = !1, h = !this._parts.urn;
        this._parts.hostname && (h = !1, d = b.ip4_expression.test(this._parts.hostname), e = b.ip6_expression.test(this._parts.hostname), c = d || e, k = (f = !c) && g && g.has(this._parts.hostname), s = f && b.idn_expression.test(this._parts.hostname), p = f && b.punycode_expression.test(this._parts.hostname));
        switch (a.toLowerCase()) {
        case "relative":
            return h;
        case "absolute":
            return!h;
        case "domain":
        case "name":
            return f;
        case "sld":
            return k;
        case "ip":
            return c;
        case "ip4":
        case "ipv4":
        case "inet4":
            return d;
        case "ip6":
        case "ipv6":
        case "inet6":
            return e;
        case "idn":
            return s;
        case "url":
            return!this._parts.urn;
        case "urn":
            return!!this._parts.urn;
        case "punycode":
            return p;
        }
        return null;
    };
    var H = e.protocol, G = e.port, E = e.hostname;
    e.protocol = function(a, c) {
        if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), a.match(/[^a-zA-z0-9\.+-]/)))throw new TypeError("Protocol '" + a + "' contains characters other than [A-Z0-9.+-]");
        return H.call(this, a, c);
    };
    e.scheme = e.protocol;
    e.port = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/))))throw new TypeError("Port '" + a + "' contains characters other than [0-9]");
        return G.call(this, a, c);
    };
    e.hostname = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 !== a) {
            var d = {};
            b.parseHost(a, d);
            a = d.hostname;
        }
        return E.call(this, a, c);
    };
    e.host = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a)
            return this._parts.hostname ?
                b.buildHost(this._parts) : "";
        b.parseHost(a, this._parts);
        this.build(!c);
        return this;
    };
    e.authority = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a)return this._parts.hostname ? b.buildAuthority(this._parts) : "";
        b.parseAuthority(a, this._parts);
        this.build(!c);
        return this;
    };
    e.userinfo = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.username)return"";
            var d = b.buildUserinfo(this._parts);
            return d.substring(0, d.length - 1);
        }
        "@" !== a[a.length - 1] && (a +=
            "@");
        b.parseUserinfo(a, this._parts);
        this.build(!c);
        return this;
    };
    e.resource = function(a, c) {
        var d;
        if (void 0 === a)return this.path() + this.search() + this.hash();
        d = b.parse(a);
        this._parts.path = d.path;
        this._parts.query = d.query;
        this._parts.fragment = d.fragment;
        this.build(!c);
        return this;
    };
    e.subdomain = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))return"";
            var d = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0,
                d) || "";
        }
        d = this._parts.hostname.length - this.domain().length;
        d = this._parts.hostname.substring(0, d);
        d = RegExp("^" + u(d));
        a && "." !== a.charAt(a.length - 1) && (a += ".");
        a && b.ensureValidHostname(a);
        this._parts.hostname = this._parts.hostname.replace(d, a);
        this.build(!c);
        return this;
    };
    e.domain = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        "boolean" === typeof a && (c = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))return"";
            var d = this._parts.hostname.match(/\./g);
            if (d && 2 > d.length)return this._parts.hostname;
            d = this._parts.hostname.length - this.tld(c).length - 1;
            d = this._parts.hostname.lastIndexOf(".", d - 1) + 1;
            return this._parts.hostname.substring(d) || "";
        }
        if (!a)throw new TypeError("cannot set domain empty");
        b.ensureValidHostname(a);
        !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (d = RegExp(u(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(d, a));
        this.build(!c);
        return this;
    };
    e.tld = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        "boolean" === typeof a && (c = a, a = void 0);
        if (void 0 ===
            a) {
            if (!this._parts.hostname || this.is("IP"))return"";
            var d = this._parts.hostname.lastIndexOf("."), d = this._parts.hostname.substring(d + 1);
            return!0 !== c && g && g.list[d.toLowerCase()] ? g.get(this._parts.hostname) || d : d;
        }
        if (a)
            if (a.match(/[^a-zA-Z0-9-]/))
                if (g && g.is(a))d = RegExp(u(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(d, a);
                else throw new TypeError("TLD '" + a + "' contains characters other than [A-Z0-9]");
            else {
                if (!this._parts.hostname || this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");
                d = RegExp(u(this.tld()) + "$");
                this._parts.hostname = this._parts.hostname.replace(d, a);
            }
        else throw new TypeError("cannot set TLD empty");
        this.build(!c);
        return this;
    };
    e.directory = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path && !this._parts.hostname)return"";
            if ("/" === this._parts.path)return"/";
            var d = this._parts.path.length - this.filename().length - 1, d = this._parts.path.substring(0, d) || (this._parts.hostname ? "/" : "");
            return a ? b.decodePath(d) : d;
        }
        d = this._parts.path.length -
            this.filename().length;
        d = this._parts.path.substring(0, d);
        d = RegExp("^" + u(d));
        this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
        a && "/" !== a.charAt(a.length - 1) && (a += "/");
        a = b.recodePath(a);
        this._parts.path = this._parts.path.replace(d, a);
        this.build(!c);
        return this;
    };
    e.filename = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)return"";
            var d = this._parts.path.lastIndexOf("/"), d = this._parts.path.substring(d + 1);
            return a ?
                b.decodePathSegment(d) : d;
        }
        d = !1;
        "/" === a.charAt(0) && (a = a.substring(1));
        a.match(/\.?\//) && (d = !0);
        var e = RegExp(u(this.filename()) + "$");
        a = b.recodePath(a);
        this._parts.path = this._parts.path.replace(e, a);
        d ? this.normalizePath(c) : this.build(!c);
        return this;
    };
    e.suffix = function(a, c) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)return"";
            var d = this.filename(), e = d.lastIndexOf(".");
            if (-1 === e)return"";
            d = d.substring(e + 1);
            d = /^[a-z0-9%]+$/i.test(d) ? d :
                "";
            return a ? b.decodePathSegment(d) : d;
        }
        "." === a.charAt(0) && (a = a.substring(1));
        if (d = this.suffix())e = a ? RegExp(u(d) + "$") : RegExp(u("." + d) + "$");
        else {
            if (!a)return this;
            this._parts.path += "." + b.recodePath(a);
        }
        e && (a = b.recodePath(a), this._parts.path = this._parts.path.replace(e, a));
        this.build(!c);
        return this;
    };
    e.segment = function(a, c, d) {
        var b = this._parts.urn ? ":" : "/", e = this.path(), f = "/" === e.substring(0, 1), e = e.split(b);
        void 0 !== a && "number" !== typeof a && (d = c, c = a, a = void 0);
        if (void 0 !== a && "number" !== typeof a)
            throw Error("Bad segment '" +
                a + "', must be 0-based integer");
        f && e.shift();
        0 > a && (a = Math.max(e.length + a, 0));
        if (void 0 === c)return void 0 === a ? e : e[a];
        if (null === a || void 0 === e[a])
            if (t(c)) {
                e = [];
                a = 0;
                for (var k = c.length; a < k; a++)if (c[a].length || e.length && e[e.length - 1].length)e.length && !e[e.length - 1].length && e.pop(), e.push(c[a]);
            } else {
                if (c || "string" === typeof c)"" === e[e.length - 1] ? e[e.length - 1] = c : e.push(c);
            }
        else c || "string" === typeof c && c.length ? e[a] = c : e.splice(a, 1);
        f && e.unshift("");
        return this.path(e.join(b), d);
    };
    e.segmentCoded = function(a, c, d) {
        var e,
            f;
        "number" !== typeof a && (d = c, c = a, a = void 0);
        if (void 0 === c) {
            a = this.segment(a, c, d);
            if (t(a))for (e = 0, f = a.length; e < f; e++)a[e] = b.decode(a[e]);
            else a = void 0 !== a ? b.decode(a) : void 0;
            return a;
        }
        if (t(c))for (e = 0, f = c.length; e < f; e++)c[e] = b.decode(c[e]);
        else c = "string" === typeof c ? b.encode(c) : c;
        return this.segment(a, c, d);
    };
    var D = e.query;
    e.query = function(a, c) {
        if (!0 === a)return b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("function" === typeof a) {
            var d = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                e = a.call(this, d);
            this._parts.query = b.buildQuery(e || d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!c);
            return this;
        }
        return void 0 !== a && "string" !== typeof a ? (this._parts.query = b.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!c), this) : D.call(this, a, c);
    };
    e.setQuery = function(a, c, d) {
        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("object" === typeof a)for (var f in a)q.call(a, f) && (e[f] = a[f]);
        else if ("string" ===
            typeof a)e[a] = void 0 !== c ? c : null;
        else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
        this._parts.query = b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (d = c);
        this.build(!d);
        return this;
    };
    e.addQuery = function(a, c, d) {
        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        b.addQuery(e, a, void 0 === c ? null : c);
        this._parts.query = b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (d = c);
        this.build(!d);
        return this;
    };
    e.removeQuery = function(a, c, d) {
        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        b.removeQuery(e, a, c);
        this._parts.query = b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (d = c);
        this.build(!d);
        return this;
    };
    e.hasQuery = function(a, c, d) {
        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        return b.hasQuery(e, a, c, d);
    };
    e.setSearch = e.setQuery;
    e.addSearch = e.addQuery;
    e.removeSearch =
        e.removeQuery;
    e.hasSearch = e.hasQuery;
    e.normalize = function() { return this._parts.urn ? this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build(); };
    e.normalizeProtocol = function(a) {
        "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a));
        return this;
    };
    e.normalizeHostname = function(a) {
        this._parts.hostname &&
        (this.is("IDN") && f ? this._parts.hostname = f.toASCII(this._parts.hostname) : this.is("IPv6") && h && (this._parts.hostname = h.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
        return this;
    };
    e.normalizePort = function(a) {
        "string" === typeof this._parts.protocol && this._parts.port === b.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a));
        return this;
    };
    e.normalizePath = function(a) {
        if (this._parts.urn || !this._parts.path || "/" === this._parts.path)return this;
        var c, d = this._parts.path, e, f;
        "/" !== d.charAt(0) && (c = !0, d = "/" + d);
        for (d = d.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");;) {
            e = d.indexOf("/../");
            if (-1 === e)break;
            else if (0 === e) {
                d = d.substring(3);
                break;
            }
            f = d.substring(0, e).lastIndexOf("/");
            -1 === f && (f = e);
            d = d.substring(0, f) + d.substring(e + 3);
        }
        c && this.is("relative") && (d = d.substring(1));
        d = b.recodePath(d);
        this._parts.path = d;
        this.build(!a);
        return this;
    };
    e.normalizePathname = e.normalizePath;
    e.normalizeQuery = function(a) {
        "string" === typeof this._parts.query &&
        (this._parts.query.length ? this.query(b.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a));
        return this;
    };
    e.normalizeFragment = function(a) {
        this._parts.fragment || (this._parts.fragment = null, this.build(!a));
        return this;
    };
    e.normalizeSearch = e.normalizeQuery;
    e.normalizeHash = e.normalizeFragment;
    e.iso8859 = function() {
        var a = b.encode, c = b.decode;
        b.encode = escape;
        b.decode = decodeURIComponent;
        this.normalize();
        b.encode = a;
        b.decode = c;
        return this;
    };
    e.unicode = function() {
        var a =
                b.encode,
            c = b.decode;
        b.encode = k;
        b.decode = unescape;
        this.normalize();
        b.encode = a;
        b.decode = c;
        return this;
    };
    e.readable = function() {
        var a = this.clone();
        a.username("").password("").normalize();
        var c = "";
        a._parts.protocol && (c += a._parts.protocol + "://");
        a._parts.hostname && (a.is("punycode") && f ? (c += f.toUnicode(a._parts.hostname), a._parts.port && (c += ":" + a._parts.port)) : c += a.host());
        a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (c += "/");
        c += a.path(!0);
        if (a._parts.query) {
            for (var d = "",
                e = 0,
                k = a._parts.query.split("&"),
                s = k.length; e < s; e++) {
                var g = (k[e] || "").split("="), d = d + ("&" + b.decodeQuery(g[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
                void 0 !== g[1] && (d += "=" + b.decodeQuery(g[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
            }
            c += "?" + d.substring(1);
        }
        return c += b.decodeQuery(a.hash(), !0);
    };
    e.absoluteTo = function(a) {
        var c = this.clone(), d = ["protocol", "username", "password", "hostname", "port"], e, f;
        if (this._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");
        a instanceof b || (a = new b(a));
        c._parts.protocol || (c._parts.protocol = a._parts.protocol);
        if (this._parts.hostname)return c;
        for (e = 0; f = d[e]; e++)c._parts[f] = a._parts[f];
        d = ["query", "path"];
        for (e = 0; f = d[e]; e++)!c._parts[f] && a._parts[f] && (c._parts[f] = a._parts[f]);
        "/" !== c.path().charAt(0) && (a = a.directory(), c._parts.path = (a ? a + "/" : "") + c._parts.path, c.normalizePath());
        c.build();
        return c;
    };
    e.relativeTo = function(a) {
        var c = this.clone().normalize(), d, e, f, k;
        if (c._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");
        a = (new b(a)).normalize();
        d = c._parts;
        e = a._parts;
        f = c.path();
        k = a.path();
        if ("/" !== f.charAt(0))throw Error("URI is already relative");
        if ("/" !== k.charAt(0))throw Error("Cannot calculate a URI relative to another relative URI");
        d.protocol === e.protocol && (d.protocol = null);
        if (d.username === e.username && d.password === e.password && null === d.protocol && null === d.username && null === d.password && d.hostname === e.hostname && d.port === e.port)d.hostname = null, d.port = null;
        else return c.build();
        if (f === k)return d.path = "", c.build();
        a = b.commonPath(c.path(), a.path());
        if (!a)return c.build();
        e = e.path.substring(a.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
        d.path = e + d.path.substring(a.length);
        return c.build();
    };
    e.equals = function(a) {
        var c = this.clone();
        a = new b(a);
        var d = {}, e = {}, f = {}, k;
        c.normalize();
        a.normalize();
        if (c.toString() === a.toString())return!0;
        d = c.query();
        e = a.query();
        c.query("");
        a.query("");
        if (c.toString() !== a.toString() || d.length !== e.length)return!1;
        d = b.parseQuery(d, this._parts.escapeQuerySpace);
        e = b.parseQuery(e, this._parts.escapeQuerySpace);
        for (k in d)
            if (q.call(d, k)) {
                if (!t(d[k])) {
                    if (d[k] !== e[k])return!1;
                } else if (!w(d[k], e[k]))return!1;
                f[k] = !0;
            }
        for (k in e)if (q.call(e, k) && !f[k])return!1;
        return!0;
    };
    e.duplicateQueryParameters = function(a) {
        this._parts.duplicateQueryParameters = !!a;
        return this;
    };
    e.escapeQuerySpace = function(a) {
        this._parts.escapeQuerySpace = !!a;
        return this;
    };
    return b;
});
(function(f, h) { "object" === typeof exports ? module.exports = h(require("./URI")) : "function" === typeof define && define.amd ? define(["./URI"], h) : f.URITemplate = h(f.URI, f); })(this, function(f, h) {
    function g(b) {
        if (g._cache[b])return g._cache[b];
        if (!(this instanceof g))return new g(b);
        this.expression = b;
        g._cache[b] = this;
        return this;
    }

    function n(b) {
        this.data = b;
        this.cache = {};
    }

    var b = h && h.URITemplate,
        u = Object.prototype.hasOwnProperty,
        r = g.prototype,
        t = {
            "": { prefix: "", separator: ",", named: !1, empty_name_separator: !1, encode: "encode" },
            "+": { prefix: "", separator: ",", named: !1, empty_name_separator: !1, encode: "encodeReserved" },
            "#": { prefix: "#", separator: ",", named: !1, empty_name_separator: !1, encode: "encodeReserved" },
            ".": { prefix: ".", separator: ".", named: !1, empty_name_separator: !1, encode: "encode" },
            "/": { prefix: "/", separator: "/", named: !1, empty_name_separator: !1, encode: "encode" },
            ";": { prefix: ";", separator: ";", named: !0, empty_name_separator: !1, encode: "encode" },
            "?": { prefix: "?", separator: "&", named: !0, empty_name_separator: !0, encode: "encode" },
            "&": {
                prefix: "&",
                separator: "&",
                named: !0,
                empty_name_separator: !0,
                encode: "encode"
            }
        };
    g._cache = {};
    g.EXPRESSION_PATTERN = /\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;
    g.VARIABLE_PATTERN = /^([^*:]+)((\*)|:(\d+))?$/;
    g.VARIABLE_NAME_PATTERN = /[^a-zA-Z0-9%_]/;
    g.expand = function(b, f) {
        var h = t[b.operator], k = h.named ? "Named" : "Unnamed", p = b.variables, e = [], q, l, v;
        for (v = 0; l = p[v]; v++)q = f.get(l.name), q.val.length ? e.push(g["expand" + k](q, h, l.explode, l.explode && h.separator || ",", l.maxlength, l.name)) : q.type && e.push("");
        return e.length ? h.prefix + e.join(h.separator) :
            "";
    };
    g.expandNamed = function(b, g, h, k, p, e) {
        var q = "", l = g.encode;
        g = g.empty_name_separator;
        var v = !b[l].length, t = 2 === b.type ? "" : f[l](e), n, r, u;
        r = 0;
        for (u = b.val.length; r < u; r++)p ? (n = f[l](b.val[r][1].substring(0, p)), 2 === b.type && (t = f[l](b.val[r][0].substring(0, p)))) : v ? (n = f[l](b.val[r][1]), 2 === b.type ? (t = f[l](b.val[r][0]), b[l].push([t, n])) : b[l].push([void 0, n])) : (n = b[l][r][1], 2 === b.type && (t = b[l][r][0])), q && (q += k), h ? q += t + (g || n ? "=" : "") + n : (r || (q += f[l](e) + (g || n ? "=" : "")), 2 === b.type && (q += t + ","), q += n);
        return q;
    };
    g.expandUnnamed =
        function(b, g, h, k, p, e) {
            e = "";
            var q = g.encode;
            g = g.empty_name_separator;
            var l = !b[q].length, t, n, r, u;
            r = 0;
            for (u = b.val.length; r < u; r++)p ? n = f[q](b.val[r][1].substring(0, p)) : l ? (n = f[q](b.val[r][1]), b[q].push([2 === b.type ? f[q](b.val[r][0]) : void 0, n])) : n = b[q][r][1], e && (e += k), 2 === b.type && (t = p ? f[q](b.val[r][0].substring(0, p)) : b[q][r][0], e += t, e = h ? e + (g || n ? "=" : "") : e + ","), e += n;
            return e;
        };
    g.noConflict = function() {
        h.URITemplate === g && (h.URITemplate = b);
        return g;
    };
    r.expand = function(b) {
        var f = "";
        this.parts && this.parts.length || this.parse();
        b instanceof n || (b = new n(b));
        for (var h = 0, k = this.parts.length; h < k; h++)f += "string" === typeof this.parts[h] ? this.parts[h] : g.expand(this.parts[h], b);
        return f;
    };
    r.parse = function() {
        var b = this.expression, f = g.EXPRESSION_PATTERN, h = g.VARIABLE_PATTERN, k = g.VARIABLE_NAME_PATTERN, p = [], e = 0, q, l, n;
        for (f.lastIndex = 0;;) {
            l = f.exec(b);
            if (null === l) {
                p.push(b.substring(e));
                break;
            } else p.push(b.substring(e, l.index)), e = l.index + l[0].length;
            if (!t[l[1]])throw Error('Unknown Operator "' + l[1] + '" in "' + l[0] + '"');
            if (!l[3])
                throw Error('Unclosed Expression "' +
                    l[0] + '"');
            q = l[2].split(",");
            for (var r = 0, u = q.length; r < u; r++) {
                n = q[r].match(h);
                if (null === n)throw Error('Invalid Variable "' + q[r] + '" in "' + l[0] + '"');
                if (n[1].match(k))throw Error('Invalid Variable Name "' + n[1] + '" in "' + l[0] + '"');
                q[r] = { name: n[1], explode: !!n[3], maxlength: n[4] && parseInt(n[4], 10) };
            }
            if (!q.length)throw Error('Expression Missing Variable(s) "' + l[0] + '"');
            p.push({ expression: l[0], operator: l[1], variables: q });
        }
        p.length || p.push(b);
        this.parts = p;
        return this;
    };
    n.prototype.get = function(b) {
        var f = this.data,
            g = { type: 0, val: [], encode: [], encodeReserved: [] },
            k;
        if (void 0 !== this.cache[b])return this.cache[b];
        this.cache[b] = g;
        f = "[object Function]" === String(Object.prototype.toString.call(f)) ? f(b) : "[object Function]" === String(Object.prototype.toString.call(f[b])) ? f[b](b) : f[b];
        if (void 0 !== f && null !== f)
            if ("[object Array]" === String(Object.prototype.toString.call(f))) {
                k = 0;
                for (b = f.length; k < b; k++)void 0 !== f[k] && null !== f[k] && g.val.push([void 0, String(f[k])]);
                g.val.length && (g.type = 3);
            } else if ("[object Object]" === String(Object.prototype.toString.call(f))) {
                for (k in f)
                    u.call(f,
                        k) && void 0 !== f[k] && null !== f[k] && g.val.push([k, String(f[k])]);
                g.val.length && (g.type = 2);
            } else g.type = 1, g.val.push([void 0, String(f)]);
        return g;
    };
    f.expand = function(b, h) {
        var n = (new g(b)).expand(h);
        return new f(n);
    };
    return g;
});
(function(f, h) { "object" === typeof exports ? module.exports = h(require("jquery", "./URI")) : "function" === typeof define && define.amd ? define(["jquery", "./URI"], h) : h(f.jQuery, f.URI); })(this, function(f, h) {
    function g(b) { return b.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"); }

    function n(b) {
        var f = b.nodeName.toLowerCase();
        return"input" === f && "image" !== b.type ? void 0 : h.domAttributes[f];
    }

    function b(b) {
        return{
            get: function(g) { return f(g).uri()[b](); },
            set: function(g, e) {
                f(g).uri()[b](e);
                return e;
            }
        };
    }

    function u(b, g) {
        var e, h, l;
        if (!n(b) ||
            !g)return!1;
        e = g.match(z);
        if (!e || !e[5] && ":" !== e[2] && !t[e[2]])return!1;
        l = f(b).uri();
        if (e[5])return l.is(e[5]);
        if (":" === e[2])return h = e[1].toLowerCase() + ":", t[h] ? t[h](l, e[4]) : !1;
        h = e[1].toLowerCase();
        return r[h] ? t[e[2]](l[h](), e[4], h) : !1;
    }

    var r = {},
        t = {
            "=": function(b, f) { return b === f; },
            "^=": function(b, f, e) { return!!(b + "").match(RegExp("^" + g(f), "i")); },
            "$=": function(b, f, e) { return!!(b + "").match(RegExp(g(f) + "$", "i")); },
            "*=": function(b, f, e) {
                "directory" == e && (b += "/");
                return!!(b + "").match(RegExp(g(f), "i"));
            },
            "equals:": function(b,
                f) { return b.equals(f); },
            "is:": function(b, f) { return b.is(f); }
        };
    f.each("authority directory domain filename fragment hash host hostname href password path pathname port protocol query resource scheme search subdomain suffix tld username".split(" "), function(g, h) {
        r[h] = !0;
        f.attrHooks["uri:" + h] = b(h);
    });
    var s = function(b, g) { return f(b).uri().href(g).toString(); };
    f.each(["src", "href", "action", "uri", "cite"], function(b, g) { f.attrHooks[g] = { set: s }; });
    f.attrHooks.uri.get = function(b) { return f(b).uri(); };
    f.fn.uri = function(b) {
        var f =
                this.first(),
            e = f.get(0),
            g = n(e);
        if (!g)throw Error('Element "' + e.nodeName + '" does not have either property: href, src, action, cite');
        if (void 0 !== b) {
            var l = f.data("uri");
            if (l)return l.href(b);
            b instanceof h || (b = h(b || ""));
        } else {
            if (b = f.data("uri"))return b;
            b = h(f.attr(g) || "");
        }
        b._dom_element = e;
        b._dom_attribute = g;
        b.normalize();
        f.data("uri", b);
        return b;
    };
    h.prototype.build = function(b) {
        if (this._dom_element)
            this._string = h.build(this._parts), this._deferred_build = !1, this._dom_element.setAttribute(this._dom_attribute,
                this._string), this._dom_element[this._dom_attribute] = this._string;
        else if (!0 === b)this._deferred_build = !0;
        else if (void 0 === b || this._deferred_build)this._string = h.build(this._parts), this._deferred_build = !1;
        return this;
    };
    var w, z = /^([a-zA-Z]+)\s*([\^\$*]?=|:)\s*(['"]?)(.+)\3|^\s*([a-zA-Z0-9]+)\s*$/;
    w = f.expr.createPseudo ? f.expr.createPseudo(function(b) { return function(f) { return u(f, b); }; }) : function(b, f, e) { return u(b, e[3]); };
    f.expr[":"].uri = w;
    return{};
});