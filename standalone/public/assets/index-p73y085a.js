var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _j;
var __v_e, __v_t, __v_a, _k, _Lv_e, _Lv_t, _q, _jv_e, _jv_t, _jv_a, _z, _Ql_e, _2, _im_instances, _im_e, _im_t, _im_a, _im_n, _im_o, _im_i, _im_l, _im_r, _im_c, _im_s, _3, __u_instances, __u_e, __u_t, __u_a, __u_n, __u_o, __u_i, __u_l, __u_r, __u_c, __u_s, __u_f, __u_d, __u_p, __u_u, __u_h, __u_m, __u_g, __u_b, __u_v, __u_y, __u_x, __u_w, __u_S, __u_k, _4, _lm_instances, _lm_e, _lm_t, _lm_a, _lm_n, _lm_o, _5, _sm_e, _sm_t, _sm_a, _6, _Ku_instances, _Ku_e, _Ku_t, _Ku_a, _Ku_n, _Ku_o, _Ku_i, _7, _um_e, _8, _Fu_e, _Fu_t, _Fu_a, _Fu_n, _Fu_o, _Fu_i, _Fu_l, _Fu_r, _9;
var $v = Object.defineProperty;
var Gv = (e, t, a) => { for (var n in t)
    $v(e, n, { get: t[n], set: a[n], enumerable: !0, configurable: !0 }); };
var Dt = class {
    constructor() { this.listeners = new Set, this.subscribe = this.subscribe.bind(this); }
    subscribe(e) { return this.listeners.add(e), this.onSubscribe(), () => { this.listeners.delete(e), this.onUnsubscribe(); }; }
    hasListeners() { return this.listeners.size > 0; }
    onSubscribe() { }
    onUnsubscribe() { }
};
var _v = (_k = class extends Dt {
        constructor() {
            super();
            __v_e.set(this, void 0);
            __v_t.set(this, void 0);
            __v_a.set(this, void 0);
            __classPrivateFieldSet(this, __v_a, (e) => { if (typeof window < "u" && window.addEventListener) {
                let t = () => e();
                return window.addEventListener("visibilitychange", t, !1), () => { window.removeEventListener("visibilitychange", t); };
            } return; }, "f");
        }
        onSubscribe() { if (!__classPrivateFieldGet(this, __v_t, "f"))
            this.setEventListener(__classPrivateFieldGet(this, __v_a, "f")); }
        onUnsubscribe() { var _j; if (!this.hasListeners())
            (_j = __classPrivateFieldGet(this, __v_t, "f")) === null || _j === void 0 ? void 0 : _j.call(this), __classPrivateFieldSet(this, __v_t, void 0, "f"); }
        setEventListener(e) { var _j; __classPrivateFieldSet(this, __v_a, e, "f"), (_j = __classPrivateFieldGet(this, __v_t, "f")) === null || _j === void 0 ? void 0 : _j.call(this), __classPrivateFieldSet(this, __v_t, e((t) => { if (typeof t === "boolean")
            this.setFocused(t);
        else
            this.onFocus(); }), "f"); }
        setFocused(e) { if (__classPrivateFieldGet(this, __v_e, "f") !== e)
            __classPrivateFieldSet(this, __v_e, e, "f"), this.onFocus(); }
        onFocus() { let e = this.isFocused(); this.listeners.forEach((t) => { t(e); }); }
        isFocused() { var _j; if (typeof __classPrivateFieldGet(this, __v_e, "f") === "boolean")
            return __classPrivateFieldGet(this, __v_e, "f"); return ((_j = globalThis.document) === null || _j === void 0 ? void 0 : _j.visibilityState) !== "hidden"; }
    },
    __v_e = new WeakMap(),
    __v_t = new WeakMap(),
    __v_a = new WeakMap(),
    _k), Wi = new _v;
var Bv = { setTimeout: (e, t) => setTimeout(e, t), clearTimeout: (e) => clearTimeout(e), setInterval: (e, t) => setInterval(e, t), clearInterval: (e) => clearInterval(e) }, Lv = (_q = class {
        constructor() {
            _Lv_e.set(this, Bv);
            _Lv_t.set(this, !1);
        }
        setTimeoutProvider(e) { __classPrivateFieldSet(this, _Lv_e, e, "f"); }
        setTimeout(e, t) { return __classPrivateFieldGet(this, _Lv_e, "f").setTimeout(e, t); }
        clearTimeout(e) { __classPrivateFieldGet(this, _Lv_e, "f").clearTimeout(e); }
        setInterval(e, t) { return __classPrivateFieldGet(this, _Lv_e, "f").setInterval(e, t); }
        clearInterval(e) { __classPrivateFieldGet(this, _Lv_e, "f").clearInterval(e); }
    },
    _Lv_e = new WeakMap(),
    _Lv_t = new WeakMap(),
    _q), ga = new Lv;
function jp(e) { setTimeout(e, 0); }
var Hu = typeof window > "u" || "Deno" in globalThis;
function Te() { }
function Xp(e, t) { return typeof e === "function" ? e(t) : e; }
function mr(e) { return typeof e === "number" && e >= 0 && e !== 1 / 0; }
function Rl(e, t) { return Math.max(e + (t || 0) - Date.now(), 0); }
function la(e, t) { return typeof e === "function" ? e(t) : e; }
function rt(e, t) { return typeof e === "function" ? e(t) : e; }
function Al(e, t) { let { type: a = "all", exact: n, fetchStatus: i, predicate: r, queryKey: o, stale: s } = e; if (o) {
    if (n) {
        if (t.queryHash !== fr(o, t.options))
            return !1;
    }
    else if (!pi(t.queryKey, o))
        return !1;
} if (a !== "all") {
    let p = t.isActive();
    if (a === "active" && !p)
        return !1;
    if (a === "inactive" && p)
        return !1;
} if (typeof s === "boolean" && t.isStale() !== s)
    return !1; if (i && i !== t.state.fetchStatus)
    return !1; if (r && !r(t))
    return !1; return !0; }
function zl(e, t) { let { exact: a, status: n, predicate: i, mutationKey: r } = e; if (r) {
    if (!t.options.mutationKey)
        return !1;
    if (a) {
        if (ba(t.options.mutationKey) !== ba(r))
            return !1;
    }
    else if (!pi(t.options.mutationKey, r))
        return !1;
} if (n && t.state.status !== n)
    return !1; if (i && !i(t))
    return !1; return !0; }
function fr(e, t) { return ((t === null || t === void 0 ? void 0 : t.queryKeyHashFn) || ba)(e); }
function ba(e) { return JSON.stringify(e, (t, a) => Uu(a) ? Object.keys(a).sort().reduce((n, i) => (n[i] = a[i], n), {}) : a); }
function pi(e, t) { if (e === t)
    return !0; if (typeof e !== typeof t)
    return !1; if (e && t && typeof e === "object" && typeof t === "object")
    return Object.keys(t).every((a) => pi(e[a], t[a])); return !1; }
var Kv = Object.prototype.hasOwnProperty;
function Qu(e, t, a = 0) { if (e === t)
    return e; if (a > 500)
    return t; let n = Vp(e) && Vp(t); if (!n && !(Uu(e) && Uu(t)))
    return t; let r = (n ? e : Object.keys(e)).length, o = n ? t : Object.keys(t), s = o.length, p = n ? Array(s) : {}, f = 0; for (let b = 0; b < s; b++) {
    let x = n ? b : o[b], h = e[x], v = t[x];
    if (h === v) {
        if (p[x] = h, n ? b < r : Kv.call(e, x))
            f++;
        continue;
    }
    if (h === null || v === null || typeof h !== "object" || typeof v !== "object") {
        p[x] = v;
        continue;
    }
    let T = Qu(h, v, a + 1);
    if (p[x] = T, T === h)
        f++;
} return r === s && f === r ? e : p; }
function eo(e, t) { if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1; for (let a in e)
    if (e[a] !== t[a])
        return !1; return !0; }
function Vp(e) { return Array.isArray(e) && e.length === Object.keys(e).length; }
function Uu(e) { if (!Yp(e))
    return !1; let t = e.constructor; if (t === void 0)
    return !0; let a = t.prototype; if (!Yp(a))
    return !1; if (!a.hasOwnProperty("isPrototypeOf"))
    return !1; if (Object.getPrototypeOf(e) !== Object.prototype)
    return !1; return !0; }
function Yp(e) { return Object.prototype.toString.call(e) === "[object Object]"; }
function Zp(e) { return new Promise((t) => { ga.setTimeout(t, e); }); }
function hr(e, t, a) { if (typeof a.structuralSharing === "function")
    return a.structuralSharing(e, t);
else if (a.structuralSharing !== !1)
    return Qu(e, t); return t; }
function Pp(e, t, a = 0) { let n = [...e, t]; return a && n.length > a ? n.slice(1) : n; }
function Ip(e, t, a = 0) { let n = [t, ...e]; return a && n.length > a ? n.slice(0, -1) : n; }
var to = Symbol();
function Ol(e, t) { if (!e.queryFn && (t === null || t === void 0 ? void 0 : t.initialPromise))
    return () => t.initialPromise; if (!e.queryFn || e.queryFn === to)
    return () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`)); return e.queryFn; }
function ao(e, t) { if (typeof e === "function")
    return e(...t); return !!e; }
function Jp(e, t, a) { let n = !1, i; return Object.defineProperty(e, "signal", { enumerable: !0, get: () => { if (i !== null && i !== void 0 ? i : (i = t()), n)
        return i; if (n = !0, i.aborted)
        a();
    else
        i.addEventListener("abort", a, { once: !0 }); return i; } }), e; }
var va = (() => { let e = () => Hu; return { isServer() { return e(); }, setIsServer(t) { e = t; } }; })();
function gr() { let e, t, a = new Promise((i, r) => { e = i, t = r; }); a.status = "pending", a.catch(() => { }); function n(i) { Object.assign(a, i), delete a.resolve, delete a.reject; } return a.resolve = (i) => { n({ status: "fulfilled", value: i }), e(i); }, a.reject = (i) => { n({ status: "rejected", reason: i }), t(i); }, a; }
var Wp = jp;
function Fv() { let e = [], t = 0, a = (s) => { s(); }, n = (s) => { s(); }, i = Wp, r = (s) => { if (t)
    e.push(s);
else
    i(() => { a(s); }); }, o = () => { let s = e; if (e = [], s.length)
    i(() => { n(() => { s.forEach((p) => { a(p); }); }); }); }; return { batch: (s) => { let p; t++; try {
        p = s();
    }
    finally {
        if (t--, !t)
            o();
    } return p; }, batchCalls: (s) => (...p) => { r(() => { s(...p); }); }, schedule: r, setNotifyFunction: (s) => { a = s; }, setBatchNotifyFunction: (s) => { n = s; }, setScheduler: (s) => { i = s; } }; }
var oe = Fv();
var jv = (_z = class extends Dt {
        constructor() {
            super();
            _jv_e.set(this, !0);
            _jv_t.set(this, void 0);
            _jv_a.set(this, void 0);
            __classPrivateFieldSet(this, _jv_a, (e) => { if (typeof window < "u" && window.addEventListener) {
                let t = () => e(!0), a = () => e(!1);
                return window.addEventListener("online", t, !1), window.addEventListener("offline", a, !1), () => { window.removeEventListener("online", t), window.removeEventListener("offline", a); };
            } return; }, "f");
        }
        onSubscribe() { if (!__classPrivateFieldGet(this, _jv_t, "f"))
            this.setEventListener(__classPrivateFieldGet(this, _jv_a, "f")); }
        onUnsubscribe() { var _j; if (!this.hasListeners())
            (_j = __classPrivateFieldGet(this, _jv_t, "f")) === null || _j === void 0 ? void 0 : _j.call(this), __classPrivateFieldSet(this, _jv_t, void 0, "f"); }
        setEventListener(e) { var _j; __classPrivateFieldSet(this, _jv_a, e, "f"), (_j = __classPrivateFieldGet(this, _jv_t, "f")) === null || _j === void 0 ? void 0 : _j.call(this), __classPrivateFieldSet(this, _jv_t, e(this.setOnline.bind(this)), "f"); }
        setOnline(e) { if (__classPrivateFieldGet(this, _jv_e, "f") !== e)
            __classPrivateFieldSet(this, _jv_e, e, "f"), this.listeners.forEach((a) => { a(e); }); }
        isOnline() { return __classPrivateFieldGet(this, _jv_e, "f"); }
    },
    _jv_e = new WeakMap(),
    _jv_t = new WeakMap(),
    _jv_a = new WeakMap(),
    _z), no = new jv;
function Vv(e) { return Math.min(1000 * Math.pow(2, e), 30000); }
function Du(e) { return (e !== null && e !== void 0 ? e : "online") === "online" ? no.isOnline() : !0; }
var Ul = class extends Error {
    constructor(e) { super("CancelledError"); this.revert = e === null || e === void 0 ? void 0 : e.revert, this.silent = e === null || e === void 0 ? void 0 : e.silent; }
};
function Hl(e) { let t = !1, a = 0, n, i = gr(), r = () => i.status !== "pending", o = (k) => { var _j; if (!r()) {
    let M = new Ul(k);
    h(M), (_j = e.onCancel) === null || _j === void 0 ? void 0 : _j.call(e, M);
} }, s = () => { t = !0; }, p = () => { t = !1; }, f = () => Wi.isFocused() && (e.networkMode === "always" || no.isOnline()) && e.canRun(), b = () => Du(e.networkMode) && e.canRun(), x = (k) => { if (!r())
    n === null || n === void 0 ? void 0 : n(), i.resolve(k); }, h = (k) => { if (!r())
    n === null || n === void 0 ? void 0 : n(), i.reject(k); }, v = () => new Promise((k) => { var _j; n = (M) => { if (r() || f())
    k(M); }, (_j = e.onPause) === null || _j === void 0 ? void 0 : _j.call(e); }).then(() => { var _j; if (n = void 0, !r())
    (_j = e.onContinue) === null || _j === void 0 ? void 0 : _j.call(e); }), T = () => { if (r())
    return; let k, M = a === 0 ? e.initialPromise : void 0; try {
    k = M !== null && M !== void 0 ? M : e.fn();
}
catch (g) {
    k = Promise.reject(g);
} Promise.resolve(k).then(x).catch((g) => { var _j, _10, _11; if (r())
    return; let m = (_j = e.retry) !== null && _j !== void 0 ? _j : (va.isServer() ? 0 : 3), y = (_10 = e.retryDelay) !== null && _10 !== void 0 ? _10 : Vv, w = typeof y === "function" ? y(a, g) : y, R = m === !0 || typeof m === "number" && a < m || typeof m === "function" && m(a, g); if (t || !R) {
    h(g);
    return;
} a++, (_11 = e.onFail) === null || _11 === void 0 ? void 0 : _11.call(e, a, g), Zp(w).then(() => f() ? void 0 : v()).then(() => { if (t)
    h(g);
else
    T(); }); }); }; return { promise: i, status: () => i.status, cancel: o, continue: () => (n === null || n === void 0 ? void 0 : n(), i), cancelRetry: s, continueRetry: p, canStart: b, start: () => { if (b())
        T();
    else
        v().then(T); return i; } }; }
var Ql = (_2 = class {
        constructor() {
            _Ql_e.set(this, void 0);
        }
        destroy() { this.clearGcTimeout(); }
        scheduleGc() { if (this.clearGcTimeout(), mr(this.gcTime))
            __classPrivateFieldSet(this, _Ql_e, ga.setTimeout(() => { this.optionalRemove(); }, this.gcTime), "f"); }
        updateGcTime(e) { this.gcTime = Math.max(this.gcTime || 0, e !== null && e !== void 0 ? e : (va.isServer() ? 1 / 0 : 300000)); }
        clearGcTimeout() { if (__classPrivateFieldGet(this, _Ql_e, "f") !== void 0)
            ga.clearTimeout(__classPrivateFieldGet(this, _Ql_e, "f")), __classPrivateFieldSet(this, _Ql_e, void 0, "f"); }
    },
    _Ql_e = new WeakMap(),
    _2);
function tm(e) { return { onFetch: (t, a) => { var _j, _10, _11, _12, _13; let n = t.options, i = (_11 = (_10 = (_j = t.fetchOptions) === null || _j === void 0 ? void 0 : _j.meta) === null || _10 === void 0 ? void 0 : _10.fetchMore) === null || _11 === void 0 ? void 0 : _11.direction, r = ((_12 = t.state.data) === null || _12 === void 0 ? void 0 : _12.pages) || [], o = ((_13 = t.state.data) === null || _13 === void 0 ? void 0 : _13.pageParams) || [], s = { pages: [], pageParams: [] }, p = 0, f = () => __awaiter(this, void 0, void 0, function* () { var _j; let b = !1, x = (T) => { Jp(T, () => t.signal, () => b = !0); }, h = Ol(t.options, t.fetchOptions), v = (T, k, M) => __awaiter(this, void 0, void 0, function* () { if (b)
        return Promise.reject(t.signal.reason); if (k == null && T.pages.length)
        return Promise.resolve(T); let m = (() => { let D = { client: t.client, queryKey: t.queryKey, pageParam: k, direction: M ? "backward" : "forward", meta: t.options.meta }; return x(D), D; })(), y = yield h(m), { maxPages: w } = t.options, R = M ? Ip : Pp; return { pages: R(T.pages, y, w), pageParams: R(T.pageParams, k, w) }; }); if (i && r.length) {
        let T = i === "backward", k = T ? Yv : em, M = { pages: r, pageParams: o }, g = k(n, M);
        s = yield v(M, g, T);
    }
    else {
        let T = e !== null && e !== void 0 ? e : r.length;
        do {
            let k = p === 0 ? (_j = o[0]) !== null && _j !== void 0 ? _j : n.initialPageParam : em(n, s);
            if (p > 0 && k == null)
                break;
            s = yield v(s, k), p++;
        } while (p < T);
    } return s; }); if (t.options.persister)
        t.fetchFn = () => { var _j, _10; return (_10 = (_j = t.options).persister) === null || _10 === void 0 ? void 0 : _10.call(_j, f, { client: t.client, queryKey: t.queryKey, meta: t.options.meta, signal: t.signal }, a); };
    else
        t.fetchFn = f; } }; }
function em(e, { pages: t, pageParams: a }) { let n = t.length - 1; return t.length > 0 ? e.getNextPageParam(t[n], t, a[n], a) : void 0; }
function Yv(e, { pages: t, pageParams: a }) { var _j; return t.length > 0 ? (_j = e.getPreviousPageParam) === null || _j === void 0 ? void 0 : _j.call(e, t[0], t, a[0], a) : void 0; }
var im = (_3 = class extends Ql {
        constructor(e) {
            var _j;
            super();
            _im_instances.add(this);
            _im_e.set(this, void 0);
            _im_t.set(this, void 0);
            _im_a.set(this, void 0);
            _im_n.set(this, void 0);
            _im_o.set(this, void 0);
            _im_i.set(this, void 0);
            _im_l.set(this, void 0);
            _im_r.set(this, void 0);
            __classPrivateFieldSet(this, _im_r, !1, "f"), __classPrivateFieldSet(this, _im_l, e.defaultOptions, "f"), this.setOptions(e.options), this.observers = [], __classPrivateFieldSet(this, _im_o, e.client, "f"), __classPrivateFieldSet(this, _im_n, __classPrivateFieldGet(this, _im_o, "f").getQueryCache(), "f"), this.queryKey = e.queryKey, this.queryHash = e.queryHash, __classPrivateFieldSet(this, _im_t, nm(this.options), "f"), this.state = (_j = e.state) !== null && _j !== void 0 ? _j : __classPrivateFieldGet(this, _im_t, "f"), this.scheduleGc();
        }
        get meta() { return this.options.meta; }
        get queryType() { return __classPrivateFieldGet(this, _im_e, "f"); }
        get promise() { var _j; return (_j = __classPrivateFieldGet(this, _im_i, "f")) === null || _j === void 0 ? void 0 : _j.promise; }
        setOptions(e) { if (this.options = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _im_l, "f")), e), e === null || e === void 0 ? void 0 : e._type)
            __classPrivateFieldSet(this, _im_e, e._type, "f"); if (this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
            let t = nm(this.options);
            if (t.data !== void 0)
                this.setState(am(t.data, t.dataUpdatedAt)), __classPrivateFieldSet(this, _im_t, t, "f");
        } }
        optionalRemove() { if (!this.observers.length && this.state.fetchStatus === "idle")
            __classPrivateFieldGet(this, _im_n, "f").remove(this); }
        setData(e, t) { let a = hr(this.state.data, e, this.options); return __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { data: a, type: "success", dataUpdatedAt: t === null || t === void 0 ? void 0 : t.updatedAt, manual: t === null || t === void 0 ? void 0 : t.manual }), a; }
        setState(e) { __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "setState", state: e }); }
        cancel(e) { var _j, _10; let t = (_j = __classPrivateFieldGet(this, _im_i, "f")) === null || _j === void 0 ? void 0 : _j.promise; return (_10 = __classPrivateFieldGet(this, _im_i, "f")) === null || _10 === void 0 ? void 0 : _10.cancel(e), t ? t.then(Te).catch(Te) : Promise.resolve(); }
        destroy() { super.destroy(), this.cancel({ silent: !0 }); }
        get resetState() { return __classPrivateFieldGet(this, _im_t, "f"); }
        reset() { this.destroy(), this.setState(this.resetState); }
        isActive() { return this.observers.some((e) => rt(e.options.enabled, this) !== !1); }
        isDisabled() { if (this.getObserversCount() > 0)
            return !this.isActive(); return this.options.queryFn === to || !this.isFetched(); }
        isFetched() { return this.state.dataUpdateCount + this.state.errorUpdateCount > 0; }
        isStatic() { if (this.getObserversCount() > 0)
            return this.observers.some((e) => la(e.options.staleTime, this) === "static"); return !1; }
        isStale() { if (this.getObserversCount() > 0)
            return this.observers.some((e) => e.getCurrentResult().isStale); return this.state.data === void 0 || this.state.isInvalidated; }
        isStaleByTime(e = 0) { if (this.state.data === void 0)
            return !0; if (e === "static")
            return !1; if (this.state.isInvalidated)
            return !0; return !Rl(this.state.dataUpdatedAt, e); }
        onFocus() { var _j, _10; (_j = this.observers.find((t) => t.shouldFetchOnWindowFocus())) === null || _j === void 0 ? void 0 : _j.refetch({ cancelRefetch: !1 }), (_10 = __classPrivateFieldGet(this, _im_i, "f")) === null || _10 === void 0 ? void 0 : _10.continue(); }
        onOnline() { var _j, _10; (_j = this.observers.find((t) => t.shouldFetchOnReconnect())) === null || _j === void 0 ? void 0 : _j.refetch({ cancelRefetch: !1 }), (_10 = __classPrivateFieldGet(this, _im_i, "f")) === null || _10 === void 0 ? void 0 : _10.continue(); }
        addObserver(e) { if (!this.observers.includes(e))
            this.observers.push(e), this.clearGcTimeout(), __classPrivateFieldGet(this, _im_n, "f").notify({ type: "observerAdded", query: this, observer: e }); }
        removeObserver(e) { if (this.observers.includes(e)) {
            if (this.observers = this.observers.filter((t) => t !== e), !this.observers.length) {
                if (__classPrivateFieldGet(this, _im_i, "f"))
                    if (__classPrivateFieldGet(this, _im_r, "f") || __classPrivateFieldGet(this, _im_instances, "m", _im_c).call(this))
                        __classPrivateFieldGet(this, _im_i, "f").cancel({ revert: !0 });
                    else
                        __classPrivateFieldGet(this, _im_i, "f").cancelRetry();
                this.scheduleGc();
            }
            __classPrivateFieldGet(this, _im_n, "f").notify({ type: "observerRemoved", query: this, observer: e });
        } }
        getObserversCount() { return this.observers.length; }
        invalidate() { if (!this.state.isInvalidated)
            __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "invalidate" }); }
        fetch(e, t) {
            return __awaiter(this, void 0, void 0, function* () { var _j, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20; if (this.state.fetchStatus !== "idle" && ((_j = __classPrivateFieldGet(this, _im_i, "f")) === null || _j === void 0 ? void 0 : _j.status()) !== "rejected") {
                if (this.state.data !== void 0 && (t === null || t === void 0 ? void 0 : t.cancelRefetch))
                    this.cancel({ silent: !0 });
                else if (__classPrivateFieldGet(this, _im_i, "f"))
                    return __classPrivateFieldGet(this, _im_i, "f").continueRetry(), __classPrivateFieldGet(this, _im_i, "f").promise;
            } if (e)
                this.setOptions(e); if (!this.options.queryFn) {
                let p = this.observers.find((f) => f.options.queryFn);
                if (p)
                    this.setOptions(p.options);
            } let a = new AbortController, n = (p) => { Object.defineProperty(p, "signal", { enumerable: !0, get: () => (__classPrivateFieldSet(this, _im_r, !0, "f"), a.signal) }); }, i = () => { let p = Ol(this.options, t), b = (() => { let x = { client: __classPrivateFieldGet(this, _im_o, "f"), queryKey: this.queryKey, meta: this.meta }; return n(x), x; })(); if (__classPrivateFieldSet(this, _im_r, !1, "f"), this.options.persister)
                return this.options.persister(p, b, this); return p(b); }, o = (() => { let p = { fetchOptions: t, options: this.options, queryKey: this.queryKey, client: __classPrivateFieldGet(this, _im_o, "f"), state: this.state, fetchFn: i }; return n(p), p; })(); if ((_10 = (__classPrivateFieldGet(this, _im_e, "f") === "infinite" ? tm(this.options.pages) : this.options.behavior)) === null || _10 === void 0 ? void 0 : _10.onFetch(o, this), __classPrivateFieldSet(this, _im_a, this.state, "f"), this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_11 = o.fetchOptions) === null || _11 === void 0 ? void 0 : _11.meta))
                __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "fetch", meta: (_12 = o.fetchOptions) === null || _12 === void 0 ? void 0 : _12.meta }); __classPrivateFieldSet(this, _im_i, Hl({ initialPromise: t === null || t === void 0 ? void 0 : t.initialPromise, fn: o.fetchFn, onCancel: (p) => { if (p instanceof Ul && p.revert)
                    this.setState(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _im_a, "f")), { fetchStatus: "idle" })); a.abort(); }, onFail: (p, f) => { __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "failed", failureCount: p, error: f }); }, onPause: () => { __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "pause" }); }, onContinue: () => { __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "continue" }); }, retry: o.options.retry, retryDelay: o.options.retryDelay, networkMode: o.options.networkMode, canRun: () => !0 }), "f"); try {
                let p = yield __classPrivateFieldGet(this, _im_i, "f").start();
                if (p === void 0)
                    throw Error(`${this.queryHash} data is undefined`);
                return this.setData(p), (_14 = (_13 = __classPrivateFieldGet(this, _im_n, "f").config).onSuccess) === null || _14 === void 0 ? void 0 : _14.call(_13, p, this), (_16 = (_15 = __classPrivateFieldGet(this, _im_n, "f").config).onSettled) === null || _16 === void 0 ? void 0 : _16.call(_15, p, this.state.error, this), p;
            }
            catch (p) {
                if (p instanceof Ul) {
                    if (p.silent)
                        return __classPrivateFieldGet(this, _im_i, "f").promise;
                    else if (p.revert) {
                        if (this.state.data === void 0)
                            throw p;
                        return this.state.data;
                    }
                }
                throw __classPrivateFieldGet(this, _im_instances, "m", _im_s).call(this, { type: "error", error: p }), (_18 = (_17 = __classPrivateFieldGet(this, _im_n, "f").config).onError) === null || _18 === void 0 ? void 0 : _18.call(_17, p, this), (_20 = (_19 = __classPrivateFieldGet(this, _im_n, "f").config).onSettled) === null || _20 === void 0 ? void 0 : _20.call(_19, this.state.data, p, this), p;
            }
            finally {
                this.scheduleGc();
            } });
        }
    },
    _im_e = new WeakMap(),
    _im_t = new WeakMap(),
    _im_a = new WeakMap(),
    _im_n = new WeakMap(),
    _im_o = new WeakMap(),
    _im_i = new WeakMap(),
    _im_l = new WeakMap(),
    _im_r = new WeakMap(),
    _im_instances = new WeakSet(),
    _im_c = function _im_c() { return this.state.fetchStatus === "paused" && this.state.status === "pending"; },
    _im_s = function _im_s(e) { let t = (a) => { var _j; switch (e.type) {
        case "failed": return Object.assign(Object.assign({}, a), { fetchFailureCount: e.failureCount, fetchFailureReason: e.error });
        case "pause": return Object.assign(Object.assign({}, a), { fetchStatus: "paused" });
        case "continue": return Object.assign(Object.assign({}, a), { fetchStatus: "fetching" });
        case "fetch": return Object.assign(Object.assign(Object.assign({}, a), $u(a.data, this.options)), { fetchMeta: (_j = e.meta) !== null && _j !== void 0 ? _j : null });
        case "success":
            let n = Object.assign(Object.assign(Object.assign(Object.assign({}, a), am(e.data, e.dataUpdatedAt)), { dataUpdateCount: a.dataUpdateCount + 1 }), !e.manual && { fetchStatus: "idle", fetchFailureCount: 0, fetchFailureReason: null });
            return __classPrivateFieldSet(this, _im_a, e.manual ? n : void 0, "f"), n;
        case "error":
            let i = e.error;
            return Object.assign(Object.assign({}, a), { error: i, errorUpdateCount: a.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: a.fetchFailureCount + 1, fetchFailureReason: i, fetchStatus: "idle", status: "error", isInvalidated: !0 });
        case "invalidate": return Object.assign(Object.assign({}, a), { isInvalidated: !0 });
        case "setState": return Object.assign(Object.assign({}, a), e.state);
    } }; this.state = t(this.state), oe.batch(() => { this.observers.forEach((a) => { a.onQueryUpdate(); }), __classPrivateFieldGet(this, _im_n, "f").notify({ query: this, type: "updated", action: e }); }); },
    _3);
function $u(e, t) { return Object.assign({ fetchFailureCount: 0, fetchFailureReason: null, fetchStatus: Du(t.networkMode) ? "fetching" : "paused" }, e === void 0 && { error: null, status: "pending" }); }
function am(e, t) { return { data: e, dataUpdatedAt: t !== null && t !== void 0 ? t : Date.now(), error: null, isInvalidated: !1, status: "success" }; }
function nm(e) { let t = typeof e.initialData === "function" ? e.initialData() : e.initialData, a = t !== void 0, n = a ? typeof e.initialDataUpdatedAt === "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0; return { data: t, dataUpdateCount: 0, dataUpdatedAt: a ? n !== null && n !== void 0 ? n : Date.now() : 0, error: null, errorUpdateCount: 0, errorUpdatedAt: 0, fetchFailureCount: 0, fetchFailureReason: null, fetchMeta: null, isInvalidated: !1, status: a ? "success" : "pending", fetchStatus: "idle" }; }
var _u = (_4 = class extends Dt {
        constructor(e, t) {
            super();
            __u_instances.add(this);
            __u_e.set(this, void 0);
            __u_t.set(this, void 0);
            __u_a.set(this, void 0);
            __u_n.set(this, void 0);
            __u_o.set(this, void 0);
            __u_i.set(this, void 0);
            __u_l.set(this, void 0);
            __u_r.set(this, void 0);
            __u_c.set(this, void 0);
            __u_s.set(this, void 0);
            __u_f.set(this, void 0);
            __u_d.set(this, void 0);
            __u_p.set(this, void 0);
            __u_u.set(this, void 0);
            __u_h.set(this, new Set);
            this.options = t, __classPrivateFieldSet(this, __u_e, e, "f"), __classPrivateFieldSet(this, __u_r, null, "f"), __classPrivateFieldSet(this, __u_l, gr(), "f"), this.bindMethods(), this.setOptions(t);
        }
        bindMethods() { this.refetch = this.refetch.bind(this); }
        onSubscribe() { if (this.listeners.size === 1) {
            if (__classPrivateFieldGet(this, __u_t, "f").addObserver(this), om(__classPrivateFieldGet(this, __u_t, "f"), this.options))
                __classPrivateFieldGet(this, __u_instances, "m", __u_m).call(this);
            else
                this.updateResult();
            __classPrivateFieldGet(this, __u_instances, "m", __u_y).call(this);
        } }
        onUnsubscribe() { if (!this.hasListeners())
            this.destroy(); }
        shouldFetchOnReconnect() { return Gu(__classPrivateFieldGet(this, __u_t, "f"), this.options, this.options.refetchOnReconnect); }
        shouldFetchOnWindowFocus() { return Gu(__classPrivateFieldGet(this, __u_t, "f"), this.options, this.options.refetchOnWindowFocus); }
        destroy() { this.listeners = new Set, __classPrivateFieldGet(this, __u_instances, "m", __u_x).call(this), __classPrivateFieldGet(this, __u_instances, "m", __u_w).call(this), __classPrivateFieldGet(this, __u_t, "f").removeObserver(this); }
        setOptions(e) { let t = this.options, a = __classPrivateFieldGet(this, __u_t, "f"); if (this.options = __classPrivateFieldGet(this, __u_e, "f").defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof rt(this.options.enabled, __classPrivateFieldGet(this, __u_t, "f")) !== "boolean")
            throw Error("Expected enabled to be a boolean or a callback that returns a boolean"); if (__classPrivateFieldGet(this, __u_instances, "m", __u_S).call(this), __classPrivateFieldGet(this, __u_t, "f").setOptions(this.options), t._defaulted && !eo(this.options, t))
            __classPrivateFieldGet(this, __u_e, "f").getQueryCache().notify({ type: "observerOptionsUpdated", query: __classPrivateFieldGet(this, __u_t, "f"), observer: this }); let n = this.hasListeners(); if (n && rm(__classPrivateFieldGet(this, __u_t, "f"), a, this.options, t))
            __classPrivateFieldGet(this, __u_instances, "m", __u_m).call(this); if (this.updateResult(), n && (__classPrivateFieldGet(this, __u_t, "f") !== a || rt(this.options.enabled, __classPrivateFieldGet(this, __u_t, "f")) !== rt(t.enabled, __classPrivateFieldGet(this, __u_t, "f")) || la(this.options.staleTime, __classPrivateFieldGet(this, __u_t, "f")) !== la(t.staleTime, __classPrivateFieldGet(this, __u_t, "f"))))
            __classPrivateFieldGet(this, __u_instances, "m", __u_g).call(this); let i = __classPrivateFieldGet(this, __u_instances, "m", __u_b).call(this); if (n && (__classPrivateFieldGet(this, __u_t, "f") !== a || rt(this.options.enabled, __classPrivateFieldGet(this, __u_t, "f")) !== rt(t.enabled, __classPrivateFieldGet(this, __u_t, "f")) || i !== __classPrivateFieldGet(this, __u_u, "f")))
            __classPrivateFieldGet(this, __u_instances, "m", __u_v).call(this, i); }
        getOptimisticResult(e) { let t = __classPrivateFieldGet(this, __u_e, "f").getQueryCache().build(__classPrivateFieldGet(this, __u_e, "f"), e), a = this.createResult(t, e); if (Zv(this, a))
            __classPrivateFieldSet(this, __u_n, a, "f"), __classPrivateFieldSet(this, __u_i, this.options, "f"), __classPrivateFieldSet(this, __u_o, __classPrivateFieldGet(this, __u_t, "f").state, "f"); return a; }
        getCurrentResult() { return __classPrivateFieldGet(this, __u_n, "f"); }
        trackResult(e, t) { return new Proxy(e, { get: (a, n) => { if (this.trackProp(n), t === null || t === void 0 ? void 0 : t(n), n === "promise") {
                if (this.trackProp("data"), !this.options.experimental_prefetchInRender && __classPrivateFieldGet(this, __u_l, "f").status === "pending")
                    __classPrivateFieldGet(this, __u_l, "f").reject(Error("experimental_prefetchInRender feature flag is not enabled"));
            } return Reflect.get(a, n); } }); }
        trackProp(e) { __classPrivateFieldGet(this, __u_h, "f").add(e); }
        getCurrentQuery() { return __classPrivateFieldGet(this, __u_t, "f"); }
        refetch(_j = {}) { var e = __rest(_j, []); return this.fetch(Object.assign({}, e)); }
        fetchOptimistic(e) { let t = __classPrivateFieldGet(this, __u_e, "f").defaultQueryOptions(e), a = __classPrivateFieldGet(this, __u_e, "f").getQueryCache().build(__classPrivateFieldGet(this, __u_e, "f"), t); return a.fetch().then(() => this.createResult(a, t)); }
        fetch(e) { var _j; return __classPrivateFieldGet(this, __u_instances, "m", __u_m).call(this, Object.assign(Object.assign({}, e), { cancelRefetch: (_j = e.cancelRefetch) !== null && _j !== void 0 ? _j : !0 })).then(() => (this.updateResult(), __classPrivateFieldGet(this, __u_n, "f"))); }
        createResult(e, t) { var _j; let a = __classPrivateFieldGet(this, __u_t, "f"), n = this.options, i = __classPrivateFieldGet(this, __u_n, "f"), r = __classPrivateFieldGet(this, __u_o, "f"), o = __classPrivateFieldGet(this, __u_i, "f"), p = e !== a ? e.state : __classPrivateFieldGet(this, __u_a, "f"), { state: f } = e, b = Object.assign({}, f), x = !1, h; if (t._optimisticResults) {
            let H = this.hasListeners(), B = !H && om(e, t), F = H && rm(e, a, t, n);
            if (B || F)
                b = Object.assign(Object.assign({}, b), $u(f.data, e.options));
            if (t._optimisticResults === "isRestoring")
                b.fetchStatus = "idle";
        } let { error: v, errorUpdatedAt: T, status: k } = b; h = b.data; let M = !1; if (t.placeholderData !== void 0 && h === void 0 && k === "pending") {
            let H;
            if ((i === null || i === void 0 ? void 0 : i.isPlaceholderData) && t.placeholderData === (o === null || o === void 0 ? void 0 : o.placeholderData))
                H = i.data, M = !0;
            else
                H = typeof t.placeholderData === "function" ? t.placeholderData((_j = __classPrivateFieldGet(this, __u_f, "f")) === null || _j === void 0 ? void 0 : _j.state.data, __classPrivateFieldGet(this, __u_f, "f")) : t.placeholderData;
            if (H !== void 0)
                k = "success", h = hr(i === null || i === void 0 ? void 0 : i.data, H, t), x = !0;
        } if (t.select && h !== void 0 && !M)
            if (i && h === (r === null || r === void 0 ? void 0 : r.data) && t.select === __classPrivateFieldGet(this, __u_c, "f"))
                h = __classPrivateFieldGet(this, __u_s, "f");
            else
                try {
                    __classPrivateFieldSet(this, __u_c, t.select, "f"), h = t.select(h), h = hr(i === null || i === void 0 ? void 0 : i.data, h, t), __classPrivateFieldSet(this, __u_s, h, "f"), __classPrivateFieldSet(this, __u_r, null, "f");
                }
                catch (H) {
                    __classPrivateFieldSet(this, __u_r, H, "f");
                } if (__classPrivateFieldGet(this, __u_r, "f"))
            v = __classPrivateFieldGet(this, __u_r, "f"), h = __classPrivateFieldGet(this, __u_s, "f"), T = Date.now(), k = "error"; let g = b.fetchStatus === "fetching", m = k === "pending", y = k === "error", w = m && g, R = h !== void 0, q = { status: k, fetchStatus: b.fetchStatus, isPending: m, isSuccess: k === "success", isError: y, isInitialLoading: w, isLoading: w, data: h, dataUpdatedAt: b.dataUpdatedAt, error: v, errorUpdatedAt: T, failureCount: b.fetchFailureCount, failureReason: b.fetchFailureReason, errorUpdateCount: b.errorUpdateCount, isFetched: e.isFetched(), isFetchedAfterMount: b.dataUpdateCount > p.dataUpdateCount || b.errorUpdateCount > p.errorUpdateCount, isFetching: g, isRefetching: g && !m, isLoadingError: y && !R, isPaused: b.fetchStatus === "paused", isPlaceholderData: x, isRefetchError: y && R, isStale: Bu(e, t), refetch: this.refetch, promise: __classPrivateFieldGet(this, __u_l, "f"), isEnabled: rt(t.enabled, e) !== !1 }; if (this.options.experimental_prefetchInRender) {
            let H = q.data !== void 0, B = q.status === "error" && !H, F = (st) => { if (B)
                st.reject(q.error);
            else if (H)
                st.resolve(q.data); }, ae = () => { let st = __classPrivateFieldSet(this, __u_l, q.promise = gr(), "f"); F(st); }, De = __classPrivateFieldGet(this, __u_l, "f");
            switch (De.status) {
                case "pending":
                    if (e.queryHash === a.queryHash)
                        F(De);
                    break;
                case "fulfilled":
                    if (B || q.data !== De.value)
                        ae();
                    break;
                case "rejected":
                    if (!B || q.error !== De.reason)
                        ae();
                    break;
            }
        } return q; }
        updateResult() { let e = __classPrivateFieldGet(this, __u_n, "f"), t = this.createResult(__classPrivateFieldGet(this, __u_t, "f"), this.options); if (__classPrivateFieldSet(this, __u_o, __classPrivateFieldGet(this, __u_t, "f").state, "f"), __classPrivateFieldSet(this, __u_i, this.options, "f"), __classPrivateFieldGet(this, __u_o, "f").data !== void 0)
            __classPrivateFieldSet(this, __u_f, __classPrivateFieldGet(this, __u_t, "f"), "f"); if (eo(t, e))
            return; __classPrivateFieldSet(this, __u_n, t, "f"); let a = () => { if (!e)
            return !0; let { notifyOnChangeProps: n } = this.options, i = typeof n === "function" ? n() : n; if (i === "all" || !i && !__classPrivateFieldGet(this, __u_h, "f").size)
            return !0; let r = new Set(i !== null && i !== void 0 ? i : __classPrivateFieldGet(this, __u_h, "f")); if (this.options.throwOnError)
            r.add("error"); return Object.keys(__classPrivateFieldGet(this, __u_n, "f")).some((o) => { let s = o; return __classPrivateFieldGet(this, __u_n, "f")[s] !== e[s] && r.has(s); }); }; __classPrivateFieldGet(this, __u_instances, "m", __u_k).call(this, { listeners: a() }); }
        onQueryUpdate() { if (this.updateResult(), this.hasListeners())
            __classPrivateFieldGet(this, __u_instances, "m", __u_y).call(this); }
    },
    __u_e = new WeakMap(),
    __u_t = new WeakMap(),
    __u_a = new WeakMap(),
    __u_n = new WeakMap(),
    __u_o = new WeakMap(),
    __u_i = new WeakMap(),
    __u_l = new WeakMap(),
    __u_r = new WeakMap(),
    __u_c = new WeakMap(),
    __u_s = new WeakMap(),
    __u_f = new WeakMap(),
    __u_d = new WeakMap(),
    __u_p = new WeakMap(),
    __u_u = new WeakMap(),
    __u_h = new WeakMap(),
    __u_instances = new WeakSet(),
    __u_m = function __u_m(e) { __classPrivateFieldGet(this, __u_instances, "m", __u_S).call(this); let t = __classPrivateFieldGet(this, __u_t, "f").fetch(this.options, e); if (!(e === null || e === void 0 ? void 0 : e.throwOnError))
        t = t.catch(Te); return t; },
    __u_g = function __u_g() { __classPrivateFieldGet(this, __u_instances, "m", __u_x).call(this); let e = la(this.options.staleTime, __classPrivateFieldGet(this, __u_t, "f")); if (va.isServer() || __classPrivateFieldGet(this, __u_n, "f").isStale || !mr(e))
        return; let a = Rl(__classPrivateFieldGet(this, __u_n, "f").dataUpdatedAt, e) + 1; __classPrivateFieldSet(this, __u_d, ga.setTimeout(() => { if (!__classPrivateFieldGet(this, __u_n, "f").isStale)
        this.updateResult(); }, a), "f"); },
    __u_b = function __u_b() { var _j; return (_j = (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__classPrivateFieldGet(this, __u_t, "f")) : this.options.refetchInterval)) !== null && _j !== void 0 ? _j : !1; },
    __u_v = function __u_v(e) { if (__classPrivateFieldGet(this, __u_instances, "m", __u_w).call(this), __classPrivateFieldSet(this, __u_u, e, "f"), va.isServer() || rt(this.options.enabled, __classPrivateFieldGet(this, __u_t, "f")) === !1 || !mr(__classPrivateFieldGet(this, __u_u, "f")) || __classPrivateFieldGet(this, __u_u, "f") === 0)
        return; __classPrivateFieldSet(this, __u_p, ga.setInterval(() => { if (this.options.refetchIntervalInBackground || Wi.isFocused())
        __classPrivateFieldGet(this, __u_instances, "m", __u_m).call(this); }, __classPrivateFieldGet(this, __u_u, "f")), "f"); },
    __u_y = function __u_y() { __classPrivateFieldGet(this, __u_instances, "m", __u_g).call(this), __classPrivateFieldGet(this, __u_instances, "m", __u_v).call(this, __classPrivateFieldGet(this, __u_instances, "m", __u_b).call(this)); },
    __u_x = function __u_x() { if (__classPrivateFieldGet(this, __u_d, "f") !== void 0)
        ga.clearTimeout(__classPrivateFieldGet(this, __u_d, "f")), __classPrivateFieldSet(this, __u_d, void 0, "f"); },
    __u_w = function __u_w() { if (__classPrivateFieldGet(this, __u_p, "f") !== void 0)
        ga.clearInterval(__classPrivateFieldGet(this, __u_p, "f")), __classPrivateFieldSet(this, __u_p, void 0, "f"); },
    __u_S = function __u_S() { let e = __classPrivateFieldGet(this, __u_e, "f").getQueryCache().build(__classPrivateFieldGet(this, __u_e, "f"), this.options); if (e === __classPrivateFieldGet(this, __u_t, "f"))
        return; let t = __classPrivateFieldGet(this, __u_t, "f"); if (__classPrivateFieldSet(this, __u_t, e, "f"), __classPrivateFieldSet(this, __u_a, e.state, "f"), this.hasListeners())
        t === null || t === void 0 ? void 0 : t.removeObserver(this), e.addObserver(this); },
    __u_k = function __u_k(e) { oe.batch(() => { if (e.listeners)
        this.listeners.forEach((t) => { t(__classPrivateFieldGet(this, __u_n, "f")); }); __classPrivateFieldGet(this, __u_e, "f").getQueryCache().notify({ query: __classPrivateFieldGet(this, __u_t, "f"), type: "observerResultsUpdated" }); }); },
    _4);
function Xv(e, t) { return rt(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && rt(t.retryOnMount, e) === !1); }
function om(e, t) { return Xv(e, t) || e.state.data !== void 0 && Gu(e, t, t.refetchOnMount); }
function Gu(e, t, a) { if (rt(t.enabled, e) !== !1 && la(t.staleTime, e) !== "static") {
    let n = typeof a === "function" ? a(e) : a;
    return n === "always" || n !== !1 && Bu(e, t);
} return !1; }
function rm(e, t, a, n) { return (e !== t || rt(n.enabled, e) === !1) && (!a.suspense || e.state.status !== "error") && Bu(e, a); }
function Bu(e, t) { return rt(t.enabled, e) !== !1 && e.isStaleByTime(la(t.staleTime, e)); }
function Zv(e, t) { if (!eo(e.getCurrentResult(), t))
    return !0; return !1; }
var lm = (_5 = class extends Ql {
        constructor(e) {
            super();
            _lm_instances.add(this);
            _lm_e.set(this, void 0);
            _lm_t.set(this, void 0);
            _lm_a.set(this, void 0);
            _lm_n.set(this, void 0);
            __classPrivateFieldSet(this, _lm_e, e.client, "f"), this.mutationId = e.mutationId, __classPrivateFieldSet(this, _lm_a, e.mutationCache, "f"), __classPrivateFieldSet(this, _lm_t, [], "f"), this.state = e.state || Lu(), this.setOptions(e.options), this.scheduleGc();
        }
        setOptions(e) { this.options = e, this.updateGcTime(this.options.gcTime); }
        get meta() { return this.options.meta; }
        addObserver(e) { if (!__classPrivateFieldGet(this, _lm_t, "f").includes(e))
            __classPrivateFieldGet(this, _lm_t, "f").push(e), this.clearGcTimeout(), __classPrivateFieldGet(this, _lm_a, "f").notify({ type: "observerAdded", mutation: this, observer: e }); }
        removeObserver(e) { __classPrivateFieldSet(this, _lm_t, __classPrivateFieldGet(this, _lm_t, "f").filter((t) => t !== e), "f"), this.scheduleGc(), __classPrivateFieldGet(this, _lm_a, "f").notify({ type: "observerRemoved", mutation: this, observer: e }); }
        optionalRemove() { if (!__classPrivateFieldGet(this, _lm_t, "f").length)
            if (this.state.status === "pending")
                this.scheduleGc();
            else
                __classPrivateFieldGet(this, _lm_a, "f").remove(this); }
        continue() { var _j, _10; return (_10 = (_j = __classPrivateFieldGet(this, _lm_n, "f")) === null || _j === void 0 ? void 0 : _j.continue()) !== null && _10 !== void 0 ? _10 : this.execute(this.state.variables); }
        execute(e) {
            return __awaiter(this, void 0, void 0, function* () { var _j, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27; let t = () => { __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "continue" }); }, a = { client: __classPrivateFieldGet(this, _lm_e, "f"), meta: this.options.meta, mutationKey: this.options.mutationKey }; __classPrivateFieldSet(this, _lm_n, Hl({ fn: () => { if (!this.options.mutationFn)
                    return Promise.reject(Error("No mutationFn found")); return this.options.mutationFn(e, a); }, onFail: (r, o) => { __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "failed", failureCount: r, error: o }); }, onPause: () => { __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "pause" }); }, onContinue: t, retry: (_j = this.options.retry) !== null && _j !== void 0 ? _j : 0, retryDelay: this.options.retryDelay, networkMode: this.options.networkMode, canRun: () => __classPrivateFieldGet(this, _lm_a, "f").canRun(this) }), "f"); let n = this.state.status === "pending", i = !__classPrivateFieldGet(this, _lm_n, "f").canStart(); try {
                if (n)
                    t();
                else {
                    if (__classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "pending", variables: e, isPaused: i }), __classPrivateFieldGet(this, _lm_a, "f").config.onMutate)
                        yield __classPrivateFieldGet(this, _lm_a, "f").config.onMutate(e, this, a);
                    let o = yield ((_11 = (_10 = this.options).onMutate) === null || _11 === void 0 ? void 0 : _11.call(_10, e, a));
                    if (o !== this.state.context)
                        __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "pending", context: o, variables: e, isPaused: i });
                }
                let r = yield __classPrivateFieldGet(this, _lm_n, "f").start();
                return yield ((_13 = (_12 = __classPrivateFieldGet(this, _lm_a, "f").config).onSuccess) === null || _13 === void 0 ? void 0 : _13.call(_12, r, e, this.state.context, this, a)), yield ((_15 = (_14 = this.options).onSuccess) === null || _15 === void 0 ? void 0 : _15.call(_14, r, e, this.state.context, a)), yield ((_17 = (_16 = __classPrivateFieldGet(this, _lm_a, "f").config).onSettled) === null || _17 === void 0 ? void 0 : _17.call(_16, r, null, this.state.variables, this.state.context, this, a)), yield ((_19 = (_18 = this.options).onSettled) === null || _19 === void 0 ? void 0 : _19.call(_18, r, null, e, this.state.context, a)), __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "success", data: r }), r;
            }
            catch (r) {
                try {
                    yield ((_21 = (_20 = __classPrivateFieldGet(this, _lm_a, "f").config).onError) === null || _21 === void 0 ? void 0 : _21.call(_20, r, e, this.state.context, this, a));
                }
                catch (o) {
                    Promise.reject(o);
                }
                try {
                    yield ((_23 = (_22 = this.options).onError) === null || _23 === void 0 ? void 0 : _23.call(_22, r, e, this.state.context, a));
                }
                catch (o) {
                    Promise.reject(o);
                }
                try {
                    yield ((_25 = (_24 = __classPrivateFieldGet(this, _lm_a, "f").config).onSettled) === null || _25 === void 0 ? void 0 : _25.call(_24, void 0, r, this.state.variables, this.state.context, this, a));
                }
                catch (o) {
                    Promise.reject(o);
                }
                try {
                    yield ((_27 = (_26 = this.options).onSettled) === null || _27 === void 0 ? void 0 : _27.call(_26, void 0, r, e, this.state.context, a));
                }
                catch (o) {
                    Promise.reject(o);
                }
                throw __classPrivateFieldGet(this, _lm_instances, "m", _lm_o).call(this, { type: "error", error: r }), r;
            }
            finally {
                __classPrivateFieldGet(this, _lm_a, "f").runNext(this);
            } });
        }
    },
    _lm_e = new WeakMap(),
    _lm_t = new WeakMap(),
    _lm_a = new WeakMap(),
    _lm_n = new WeakMap(),
    _lm_instances = new WeakSet(),
    _lm_o = function _lm_o(e) { let t = (a) => { switch (e.type) {
        case "failed": return Object.assign(Object.assign({}, a), { failureCount: e.failureCount, failureReason: e.error });
        case "pause": return Object.assign(Object.assign({}, a), { isPaused: !0 });
        case "continue": return Object.assign(Object.assign({}, a), { isPaused: !1 });
        case "pending": return Object.assign(Object.assign({}, a), { context: e.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: e.isPaused, status: "pending", variables: e.variables, submittedAt: Date.now() });
        case "success": return Object.assign(Object.assign({}, a), { data: e.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1 });
        case "error": return Object.assign(Object.assign({}, a), { data: void 0, error: e.error, failureCount: a.failureCount + 1, failureReason: e.error, isPaused: !1, status: "error" });
    } }; this.state = t(this.state), oe.batch(() => { __classPrivateFieldGet(this, _lm_t, "f").forEach((a) => { a.onMutationUpdate(e); }), __classPrivateFieldGet(this, _lm_a, "f").notify({ mutation: this, type: "updated", action: e }); }); },
    _5);
function Lu() { return { context: void 0, data: void 0, error: null, failureCount: 0, failureReason: null, isPaused: !1, status: "idle", variables: void 0, submittedAt: 0 }; }
var sm = (_6 = class extends Dt {
        constructor(e = {}) {
            super();
            _sm_e.set(this, void 0);
            _sm_t.set(this, void 0);
            _sm_a.set(this, void 0);
            this.config = e, __classPrivateFieldSet(this, _sm_e, new Set, "f"), __classPrivateFieldSet(this, _sm_t, new Map, "f"), __classPrivateFieldSet(this, _sm_a, 0, "f");
        }
        build(e, t, a) { var _j; let n = new lm({ client: e, mutationCache: this, mutationId: __classPrivateFieldSet(this, _sm_a, (_j = __classPrivateFieldGet(this, _sm_a, "f"), ++_j), "f"), options: e.defaultMutationOptions(t), state: a }); return this.add(n), n; }
        add(e) { __classPrivateFieldGet(this, _sm_e, "f").add(e); let t = Dl(e); if (typeof t === "string") {
            let a = __classPrivateFieldGet(this, _sm_t, "f").get(t);
            if (a)
                a.push(e);
            else
                __classPrivateFieldGet(this, _sm_t, "f").set(t, [e]);
        } this.notify({ type: "added", mutation: e }); }
        remove(e) { if (__classPrivateFieldGet(this, _sm_e, "f").delete(e)) {
            let t = Dl(e);
            if (typeof t === "string") {
                let a = __classPrivateFieldGet(this, _sm_t, "f").get(t);
                if (a) {
                    if (a.length > 1) {
                        let n = a.indexOf(e);
                        if (n !== -1)
                            a.splice(n, 1);
                    }
                    else if (a[0] === e)
                        __classPrivateFieldGet(this, _sm_t, "f").delete(t);
                }
            }
        } this.notify({ type: "removed", mutation: e }); }
        canRun(e) { var _j; let t = Dl(e); if (typeof t === "string") {
            let n = (_j = __classPrivateFieldGet(this, _sm_t, "f").get(t)) === null || _j === void 0 ? void 0 : _j.find((i) => i.state.status === "pending");
            return !n || n === e;
        }
        else
            return !0; }
        runNext(e) { var _j, _10, _11; let t = Dl(e); if (typeof t === "string")
            return (_11 = (_10 = (_j = __classPrivateFieldGet(this, _sm_t, "f").get(t)) === null || _j === void 0 ? void 0 : _j.find((n) => n !== e && n.state.isPaused)) === null || _10 === void 0 ? void 0 : _10.continue()) !== null && _11 !== void 0 ? _11 : Promise.resolve();
        else
            return Promise.resolve(); }
        clear() { oe.batch(() => { __classPrivateFieldGet(this, _sm_e, "f").forEach((e) => { this.notify({ type: "removed", mutation: e }); }), __classPrivateFieldGet(this, _sm_e, "f").clear(), __classPrivateFieldGet(this, _sm_t, "f").clear(); }); }
        getAll() { return Array.from(__classPrivateFieldGet(this, _sm_e, "f")); }
        find(e) { let t = Object.assign({ exact: !0 }, e); return this.getAll().find((a) => zl(t, a)); }
        findAll(e = {}) { return this.getAll().filter((t) => zl(e, t)); }
        notify(e) { oe.batch(() => { this.listeners.forEach((t) => { t(e); }); }); }
        resumePausedMutations() { let e = this.getAll().filter((t) => t.state.isPaused); return oe.batch(() => Promise.all(e.map((t) => t.continue().catch(Te)))); }
    },
    _sm_e = new WeakMap(),
    _sm_t = new WeakMap(),
    _sm_a = new WeakMap(),
    _6);
function Dl(e) { var _j; return (_j = e.options.scope) === null || _j === void 0 ? void 0 : _j.id; }
var Ku = (_7 = class extends Dt {
        constructor(e, t) {
            super();
            _Ku_instances.add(this);
            _Ku_e.set(this, void 0);
            _Ku_t.set(this, void 0);
            _Ku_a.set(this, void 0);
            _Ku_n.set(this, void 0);
            __classPrivateFieldSet(this, _Ku_e, e, "f"), this.setOptions(t), this.bindMethods(), __classPrivateFieldGet(this, _Ku_instances, "m", _Ku_o).call(this);
        }
        bindMethods() { this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this); }
        setOptions(e) { var _j; let t = this.options; if (this.options = __classPrivateFieldGet(this, _Ku_e, "f").defaultMutationOptions(e), !eo(this.options, t))
            __classPrivateFieldGet(this, _Ku_e, "f").getMutationCache().notify({ type: "observerOptionsUpdated", mutation: __classPrivateFieldGet(this, _Ku_a, "f"), observer: this }); if ((t === null || t === void 0 ? void 0 : t.mutationKey) && this.options.mutationKey && ba(t.mutationKey) !== ba(this.options.mutationKey))
            this.reset();
        else if (((_j = __classPrivateFieldGet(this, _Ku_a, "f")) === null || _j === void 0 ? void 0 : _j.state.status) === "pending")
            __classPrivateFieldGet(this, _Ku_a, "f").setOptions(this.options); }
        onUnsubscribe() { var _j; if (!this.hasListeners())
            (_j = __classPrivateFieldGet(this, _Ku_a, "f")) === null || _j === void 0 ? void 0 : _j.removeObserver(this); }
        onMutationUpdate(e) { __classPrivateFieldGet(this, _Ku_instances, "m", _Ku_o).call(this), __classPrivateFieldGet(this, _Ku_instances, "m", _Ku_i).call(this, e); }
        getCurrentResult() { return __classPrivateFieldGet(this, _Ku_t, "f"); }
        reset() { var _j; (_j = __classPrivateFieldGet(this, _Ku_a, "f")) === null || _j === void 0 ? void 0 : _j.removeObserver(this), __classPrivateFieldSet(this, _Ku_a, void 0, "f"), __classPrivateFieldGet(this, _Ku_instances, "m", _Ku_o).call(this), __classPrivateFieldGet(this, _Ku_instances, "m", _Ku_i).call(this); }
        mutate(e, t) { var _j; return __classPrivateFieldSet(this, _Ku_n, t, "f"), (_j = __classPrivateFieldGet(this, _Ku_a, "f")) === null || _j === void 0 ? void 0 : _j.removeObserver(this), __classPrivateFieldSet(this, _Ku_a, __classPrivateFieldGet(this, _Ku_e, "f").getMutationCache().build(__classPrivateFieldGet(this, _Ku_e, "f"), this.options), "f"), __classPrivateFieldGet(this, _Ku_a, "f").addObserver(this), __classPrivateFieldGet(this, _Ku_a, "f").execute(e); }
    },
    _Ku_e = new WeakMap(),
    _Ku_t = new WeakMap(),
    _Ku_a = new WeakMap(),
    _Ku_n = new WeakMap(),
    _Ku_instances = new WeakSet(),
    _Ku_o = function _Ku_o() { var _j, _10; let e = (_10 = (_j = __classPrivateFieldGet(this, _Ku_a, "f")) === null || _j === void 0 ? void 0 : _j.state) !== null && _10 !== void 0 ? _10 : Lu(); __classPrivateFieldSet(this, _Ku_t, Object.assign(Object.assign({}, e), { isPending: e.status === "pending", isSuccess: e.status === "success", isError: e.status === "error", isIdle: e.status === "idle", mutate: this.mutate, reset: this.reset }), "f"); },
    _Ku_i = function _Ku_i(e) { oe.batch(() => { var _j, _10, _11, _12, _13, _14, _15, _16; if (__classPrivateFieldGet(this, _Ku_n, "f") && this.hasListeners()) {
        let t = __classPrivateFieldGet(this, _Ku_t, "f").variables, a = __classPrivateFieldGet(this, _Ku_t, "f").context, n = { client: __classPrivateFieldGet(this, _Ku_e, "f"), meta: this.options.meta, mutationKey: this.options.mutationKey };
        if ((e === null || e === void 0 ? void 0 : e.type) === "success") {
            try {
                (_10 = (_j = __classPrivateFieldGet(this, _Ku_n, "f")).onSuccess) === null || _10 === void 0 ? void 0 : _10.call(_j, e.data, t, a, n);
            }
            catch (i) {
                Promise.reject(i);
            }
            try {
                (_12 = (_11 = __classPrivateFieldGet(this, _Ku_n, "f")).onSettled) === null || _12 === void 0 ? void 0 : _12.call(_11, e.data, null, t, a, n);
            }
            catch (i) {
                Promise.reject(i);
            }
        }
        else if ((e === null || e === void 0 ? void 0 : e.type) === "error") {
            try {
                (_14 = (_13 = __classPrivateFieldGet(this, _Ku_n, "f")).onError) === null || _14 === void 0 ? void 0 : _14.call(_13, e.error, t, a, n);
            }
            catch (i) {
                Promise.reject(i);
            }
            try {
                (_16 = (_15 = __classPrivateFieldGet(this, _Ku_n, "f")).onSettled) === null || _16 === void 0 ? void 0 : _16.call(_15, void 0, e.error, t, a, n);
            }
            catch (i) {
                Promise.reject(i);
            }
        }
    } this.listeners.forEach((t) => { t(__classPrivateFieldGet(this, _Ku_t, "f")); }); }); },
    _7);
var um = (_8 = class extends Dt {
        constructor(e = {}) {
            super();
            _um_e.set(this, void 0);
            this.config = e, __classPrivateFieldSet(this, _um_e, new Map, "f");
        }
        build(e, t, a) { var _j; let n = t.queryKey, i = (_j = t.queryHash) !== null && _j !== void 0 ? _j : fr(n, t), r = this.get(i); if (!r)
            r = new im({ client: e, queryKey: n, queryHash: i, options: e.defaultQueryOptions(t), state: a, defaultOptions: e.getQueryDefaults(n) }), this.add(r); return r; }
        add(e) { if (!__classPrivateFieldGet(this, _um_e, "f").has(e.queryHash))
            __classPrivateFieldGet(this, _um_e, "f").set(e.queryHash, e), this.notify({ type: "added", query: e }); }
        remove(e) { let t = __classPrivateFieldGet(this, _um_e, "f").get(e.queryHash); if (t) {
            if (e.destroy(), t === e)
                __classPrivateFieldGet(this, _um_e, "f").delete(e.queryHash);
            this.notify({ type: "removed", query: e });
        } }
        clear() { oe.batch(() => { this.getAll().forEach((e) => { this.remove(e); }); }); }
        get(e) { return __classPrivateFieldGet(this, _um_e, "f").get(e); }
        getAll() { return [...__classPrivateFieldGet(this, _um_e, "f").values()]; }
        find(e) { let t = Object.assign({ exact: !0 }, e); return this.getAll().find((a) => Al(t, a)); }
        findAll(e = {}) { let t = this.getAll(); return Object.keys(e).length > 0 ? t.filter((a) => Al(e, a)) : t; }
        notify(e) { oe.batch(() => { this.listeners.forEach((t) => { t(e); }); }); }
        onFocus() { oe.batch(() => { this.getAll().forEach((e) => { e.onFocus(); }); }); }
        onOnline() { oe.batch(() => { this.getAll().forEach((e) => { e.onOnline(); }); }); }
    },
    _um_e = new WeakMap(),
    _8);
var Fu = (_9 = class {
        constructor(e = {}) {
            _Fu_e.set(this, void 0);
            _Fu_t.set(this, void 0);
            _Fu_a.set(this, void 0);
            _Fu_n.set(this, void 0);
            _Fu_o.set(this, void 0);
            _Fu_i.set(this, void 0);
            _Fu_l.set(this, void 0);
            _Fu_r.set(this, void 0);
            __classPrivateFieldSet(this, _Fu_e, e.queryCache || new um, "f"), __classPrivateFieldSet(this, _Fu_t, e.mutationCache || new sm, "f"), __classPrivateFieldSet(this, _Fu_a, e.defaultOptions || {}, "f"), __classPrivateFieldSet(this, _Fu_n, new Map, "f"), __classPrivateFieldSet(this, _Fu_o, new Map, "f"), __classPrivateFieldSet(this, _Fu_i, 0, "f");
        }
        mount() { var _j, _10; if (__classPrivateFieldSet(this, _Fu_i, (_10 = __classPrivateFieldGet(this, _Fu_i, "f"), _j = _10++, _10), "f"), _j, __classPrivateFieldGet(this, _Fu_i, "f") !== 1)
            return; __classPrivateFieldSet(this, _Fu_l, Wi.subscribe((e) => __awaiter(this, void 0, void 0, function* () { if (e)
            yield this.resumePausedMutations(), __classPrivateFieldGet(this, _Fu_e, "f").onFocus(); })), "f"), __classPrivateFieldSet(this, _Fu_r, no.subscribe((e) => __awaiter(this, void 0, void 0, function* () { if (e)
            yield this.resumePausedMutations(), __classPrivateFieldGet(this, _Fu_e, "f").onOnline(); })), "f"); }
        unmount() { var _j, _10; var _11, _12; if (__classPrivateFieldSet(this, _Fu_i, (_12 = __classPrivateFieldGet(this, _Fu_i, "f"), _11 = _12--, _12), "f"), _11, __classPrivateFieldGet(this, _Fu_i, "f") !== 0)
            return; (_j = __classPrivateFieldGet(this, _Fu_l, "f")) === null || _j === void 0 ? void 0 : _j.call(this), __classPrivateFieldSet(this, _Fu_l, void 0, "f"), (_10 = __classPrivateFieldGet(this, _Fu_r, "f")) === null || _10 === void 0 ? void 0 : _10.call(this), __classPrivateFieldSet(this, _Fu_r, void 0, "f"); }
        isFetching(e) { return __classPrivateFieldGet(this, _Fu_e, "f").findAll(Object.assign(Object.assign({}, e), { fetchStatus: "fetching" })).length; }
        isMutating(e) { return __classPrivateFieldGet(this, _Fu_t, "f").findAll(Object.assign(Object.assign({}, e), { status: "pending" })).length; }
        getQueryData(e) { var _j; let t = this.defaultQueryOptions({ queryKey: e }); return (_j = __classPrivateFieldGet(this, _Fu_e, "f").get(t.queryHash)) === null || _j === void 0 ? void 0 : _j.state.data; }
        ensureQueryData(e) { let t = this.defaultQueryOptions(e), a = __classPrivateFieldGet(this, _Fu_e, "f").build(this, t), n = a.state.data; if (n === void 0)
            return this.fetchQuery(e); if (e.revalidateIfStale && a.isStaleByTime(la(t.staleTime, a)))
            this.prefetchQuery(t); return Promise.resolve(n); }
        getQueriesData(e) { return __classPrivateFieldGet(this, _Fu_e, "f").findAll(e).map(({ queryKey: t, state: a }) => { let n = a.data; return [t, n]; }); }
        setQueryData(e, t, a) { var _j; let n = this.defaultQueryOptions({ queryKey: e }), r = (_j = __classPrivateFieldGet(this, _Fu_e, "f").get(n.queryHash)) === null || _j === void 0 ? void 0 : _j.state.data, o = Xp(t, r); if (o === void 0)
            return; return __classPrivateFieldGet(this, _Fu_e, "f").build(this, n).setData(o, Object.assign(Object.assign({}, a), { manual: !0 })); }
        setQueriesData(e, t, a) { return oe.batch(() => __classPrivateFieldGet(this, _Fu_e, "f").findAll(e).map(({ queryKey: n }) => [n, this.setQueryData(n, t, a)])); }
        getQueryState(e) { var _j; let t = this.defaultQueryOptions({ queryKey: e }); return (_j = __classPrivateFieldGet(this, _Fu_e, "f").get(t.queryHash)) === null || _j === void 0 ? void 0 : _j.state; }
        removeQueries(e) { let t = __classPrivateFieldGet(this, _Fu_e, "f"); oe.batch(() => { t.findAll(e).forEach((a) => { t.remove(a); }); }); }
        resetQueries(e, t) { let a = __classPrivateFieldGet(this, _Fu_e, "f"); return oe.batch(() => (a.findAll(e).forEach((n) => { n.reset(); }), this.refetchQueries(Object.assign({ type: "active" }, e), t))); }
        cancelQueries(e, t = {}) { let a = Object.assign({ revert: !0 }, t), n = oe.batch(() => __classPrivateFieldGet(this, _Fu_e, "f").findAll(e).map((i) => i.cancel(a))); return Promise.all(n).then(Te).catch(Te); }
        invalidateQueries(e, t = {}) { return oe.batch(() => { var _j, _10; if (__classPrivateFieldGet(this, _Fu_e, "f").findAll(e).forEach((a) => { a.invalidate(); }), (e === null || e === void 0 ? void 0 : e.refetchType) === "none")
            return Promise.resolve(); return this.refetchQueries(Object.assign(Object.assign({}, e), { type: (_10 = (_j = e === null || e === void 0 ? void 0 : e.refetchType) !== null && _j !== void 0 ? _j : e === null || e === void 0 ? void 0 : e.type) !== null && _10 !== void 0 ? _10 : "active" }), t); }); }
        refetchQueries(e, t = {}) { var _j; let a = Object.assign(Object.assign({}, t), { cancelRefetch: (_j = t.cancelRefetch) !== null && _j !== void 0 ? _j : !0 }), n = oe.batch(() => __classPrivateFieldGet(this, _Fu_e, "f").findAll(e).filter((i) => !i.isDisabled() && !i.isStatic()).map((i) => { let r = i.fetch(void 0, a); if (!a.throwOnError)
            r = r.catch(Te); return i.state.fetchStatus === "paused" ? Promise.resolve() : r; })); return Promise.all(n).then(Te); }
        fetchQuery(e) { let t = this.defaultQueryOptions(e); if (t.retry === void 0)
            t.retry = !1; let a = __classPrivateFieldGet(this, _Fu_e, "f").build(this, t); return a.isStaleByTime(la(t.staleTime, a)) ? a.fetch(t) : Promise.resolve(a.state.data); }
        prefetchQuery(e) { return this.fetchQuery(e).then(Te).catch(Te); }
        fetchInfiniteQuery(e) { return e._type = "infinite", this.fetchQuery(e); }
        prefetchInfiniteQuery(e) { return this.fetchInfiniteQuery(e).then(Te).catch(Te); }
        ensureInfiniteQueryData(e) { return e._type = "infinite", this.ensureQueryData(e); }
        resumePausedMutations() { if (no.isOnline())
            return __classPrivateFieldGet(this, _Fu_t, "f").resumePausedMutations(); return Promise.resolve(); }
        getQueryCache() { return __classPrivateFieldGet(this, _Fu_e, "f"); }
        getMutationCache() { return __classPrivateFieldGet(this, _Fu_t, "f"); }
        getDefaultOptions() { return __classPrivateFieldGet(this, _Fu_a, "f"); }
        setDefaultOptions(e) { __classPrivateFieldSet(this, _Fu_a, e, "f"); }
        setQueryDefaults(e, t) { __classPrivateFieldGet(this, _Fu_n, "f").set(ba(e), { queryKey: e, defaultOptions: t }); }
        getQueryDefaults(e) { let t = [...__classPrivateFieldGet(this, _Fu_n, "f").values()], a = {}; return t.forEach((n) => { if (pi(e, n.queryKey))
            Object.assign(a, n.defaultOptions); }), a; }
        setMutationDefaults(e, t) { __classPrivateFieldGet(this, _Fu_o, "f").set(ba(e), { mutationKey: e, defaultOptions: t }); }
        getMutationDefaults(e) { let t = [...__classPrivateFieldGet(this, _Fu_o, "f").values()], a = {}; return t.forEach((n) => { if (pi(e, n.mutationKey))
            Object.assign(a, n.defaultOptions); }), a; }
        defaultQueryOptions(e) { if (e._defaulted)
            return e; let t = Object.assign(Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Fu_a, "f").queries), this.getQueryDefaults(e.queryKey)), e), { _defaulted: !0 }); if (!t.queryHash)
            t.queryHash = fr(t.queryKey, t); if (t.refetchOnReconnect === void 0)
            t.refetchOnReconnect = t.networkMode !== "always"; if (t.throwOnError === void 0)
            t.throwOnError = !!t.suspense; if (!t.networkMode && t.persister)
            t.networkMode = "offlineFirst"; if (t.queryFn === to)
            t.enabled = !1; return t; }
        defaultMutationOptions(e) { if (e === null || e === void 0 ? void 0 : e._defaulted)
            return e; return Object.assign(Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Fu_a, "f").mutations), (e === null || e === void 0 ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey)), e), { _defaulted: !0 }); }
        clear() { __classPrivateFieldGet(this, _Fu_e, "f").clear(), __classPrivateFieldGet(this, _Fu_t, "f").clear(); }
    },
    _Fu_e = new WeakMap(),
    _Fu_t = new WeakMap(),
    _Fu_a = new WeakMap(),
    _Fu_n = new WeakMap(),
    _Fu_o = new WeakMap(),
    _Fu_i = new WeakMap(),
    _Fu_l = new WeakMap(),
    _Fu_r = new WeakMap(),
    _9);
var Pv = Symbol.for("react.transitional.element");
var Iv = Symbol.for("react.strict_mode");
var Jv = Symbol.for("react.consumer"), Wv = Symbol.for("react.context");
var cm = { isMounted: function () { return !1; }, enqueueForceUpdate: function () { }, enqueueReplaceState: function () { }, enqueueSetState: function () { } }, ey = Object.assign, dm = {};
function io(e, t, a) { this.props = e, this.context = t, this.refs = dm, this.updater = a || cm; }
io.prototype.isReactComponent = {};
io.prototype.setState = function (e, t) { if (typeof e !== "object" && typeof e !== "function" && e != null)
    throw Error("takes an object of state variables to update or a function which returns an object of state variables."); this.updater.enqueueSetState(this, e, t, "setState"); };
io.prototype.forceUpdate = function (e) { this.updater.enqueueForceUpdate(this, e, "forceUpdate"); };
function pm() { }
pm.prototype = io.prototype;
function mm(e, t, a) { this.props = e, this.context = t, this.refs = dm, this.updater = a || cm; }
var ju = mm.prototype = new pm;
ju.constructor = mm;
ey(ju, io.prototype);
ju.isPureReactComponent = !0;
var mi = { H: null, A: null, T: null, S: null }, ty = Object.prototype.hasOwnProperty;
function ay(e, t, a) { var n = a.ref; return { $$typeof: Pv, type: e, key: t, ref: n !== void 0 ? n : null, props: a }; }
var $l = io;
var Vu = Iv;
var Gl = mi;
var La = function (e) { return e = { $$typeof: Wv, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null }, e.Provider = e, e.Consumer = { $$typeof: Jv, _context: e }, e; }, Yu = function (e, t, a) { var n, i = {}, r = null; if (t != null)
    for (n in t.key !== void 0 && (r = "" + t.key), t)
        ty.call(t, n) && n !== "key" && n !== "__self" && n !== "__source" && (i[n] = t[n]); var o = arguments.length - 2; if (o === 1)
    i.children = a;
else if (1 < o) {
    for (var s = Array(o), p = 0; p < o; p++)
        s[p] = arguments[p + 2];
    i.children = s;
} if (e && e.defaultProps)
    for (n in o = e.defaultProps, o)
        i[n] === void 0 && (i[n] = o[n]); return ay(e, r, i); };
var Ka = function (e, t) { return mi.H.useCallback(e, t); }, Fa = function (e) { return mi.H.useContext(e); };
var he = function (e, t) { return mi.H.useEffect(e, t); };
var _e = function (e) { return mi.H.useRef(e); }, E = function (e) { return mi.H.useState(e); }, br = function (e, t, a) { return mi.H.useSyncExternalStore(e, t, a); };
var Xu = "19.2.5";
var ny = Symbol.for("react.transitional.element"), iy = Symbol.for("react.fragment");
function fm(e, t, a) { var n = null; if (a !== void 0 && (n = "" + a), t.key !== void 0 && (n = "" + t.key), "key" in t) {
    a = {};
    for (var i in t)
        i !== "key" && (a[i] = t[i]);
}
else
    a = t; return t = a.ref, { $$typeof: ny, type: e, key: n, ref: t !== void 0 ? t : null, props: a }; }
var V = iy, l = fm, d = fm;
var Zu = La(void 0), ja = (e) => { let t = Fa(Zu); if (e)
    return e; if (!t)
    throw Error("No QueryClient set, use QueryClientProvider to set one"); return t; }, Pu = ({ client: e, children: t }) => (he(() => (e.mount(), () => { e.unmount(); }), [e]), l(Zu.Provider, { value: e, children: t }));
function oy() { let e = !1; return { clearReset: () => { e = !1; }, reset: () => { e = !0; }, isReset: () => e }; }
var ry = La(oy()), hm = () => Fa(ry);
var gm = (e, t, a) => { let n = (a === null || a === void 0 ? void 0 : a.state.error) && typeof e.throwOnError === "function" ? ao(e.throwOnError, [a.state.error, a]) : e.throwOnError; if (e.suspense || e.experimental_prefetchInRender || n) {
    if (!t.isReset())
        e.retryOnMount = !1;
} }, bm = (e) => { he(() => { e.clearReset(); }, [e]); }, vm = ({ result: e, errorResetBoundary: t, throwOnError: a, query: n, suspense: i }) => e.isError && !t.isReset() && !e.isFetching && n && (i && e.data === void 0 || ao(a, [e.error, n]));
var ym = La(!1), xm = () => Fa(ym), _w = ym.Provider;
var wm = (e) => { if (e.suspense) {
    let a = (i) => i === "static" ? i : Math.max(i !== null && i !== void 0 ? i : 1000, 1000), n = e.staleTime;
    if (e.staleTime = typeof n === "function" ? (...i) => a(n(...i)) : a(n), typeof e.gcTime === "number")
        e.gcTime = Math.max(e.gcTime, 1000);
} }, Sm = (e, t) => e.isLoading && e.isFetching && !t, km = (e, t) => (e === null || e === void 0 ? void 0 : e.suspense) && t.isPending, Iu = (e, t, a) => t.fetchOptimistic(e).catch(() => { a.clearReset(); });
function Nm(e, t, a) { var _j, _10, _11, _12, _13; let n = xm(), i = hm(), r = ja(a), o = r.defaultQueryOptions(e); (_10 = (_j = r.getDefaultOptions().queries) === null || _j === void 0 ? void 0 : _j._experimental_beforeQuery) === null || _10 === void 0 ? void 0 : _10.call(_j, o); let s = r.getQueryCache().get(o.queryHash); o._optimisticResults = n ? "isRestoring" : "optimistic", wm(o), gm(o, i, s), bm(i); let p = !r.getQueryCache().get(o.queryHash), [f] = E(() => new t(r, o)), b = f.getOptimisticResult(o), x = !n && e.subscribed !== !1; if (br(Ka((h) => { let v = x ? f.subscribe(oe.batchCalls(h)) : Te; return f.updateResult(), v; }, [f, x]), () => f.getCurrentResult(), () => f.getCurrentResult()), he(() => { f.setOptions(o); }, [o, f]), km(o, b))
    throw Iu(o, f, i); if (vm({ result: b, errorResetBoundary: i, throwOnError: o.throwOnError, query: s, suspense: o.suspense }))
    throw b.error; if ((_12 = (_11 = r.getDefaultOptions().queries) === null || _11 === void 0 ? void 0 : _11._experimental_afterQuery) === null || _12 === void 0 ? void 0 : _12.call(_11, o, b), o.experimental_prefetchInRender && !va.isServer() && Sm(b, n))
    (_13 = (p ? Iu(o, f, i) : s === null || s === void 0 ? void 0 : s.promise)) === null || _13 === void 0 ? void 0 : _13.catch(Te).finally(() => { f.updateResult(); }); return !o.notifyOnChangeProps ? f.trackResult(b) : b; }
function $t(e, t) { return Nm(e, _u, t); }
function G(e, t) { let a = ja(t), [n] = E(() => new Ku(a, e)); he(() => { n.setOptions(e); }, [n, e]); let i = br(Ka((o) => n.subscribe(oe.batchCalls(o)), [n]), () => n.getCurrentResult(), () => n.getCurrentResult()), r = Ka((o, s) => { n.mutate(o, s).catch(Te); }, [n]); if (i.error && ao(n.options.throwOnError, [i.error]))
    throw i.error; return Object.assign(Object.assign({}, i), { mutate: r, mutateAsync: i.mutate }); }
var ly = "calc(var(--twsa-safe-area-inset-top) + min(2rem, var(--twsa-safe-area-inset-top)))", sy = "var(--twsa-safe-area-inset-top)", Tm = "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.99) 10%, rgba(0, 0, 0, 0.96) 20%, rgba(0, 0, 0, 0.90) 30%, rgba(0, 0, 0, 0.80) 40%, rgba(0, 0, 0, 0.67) 50%, rgba(0, 0, 0, 0.52) 60%, rgba(0, 0, 0, 0.36) 70%, rgba(0, 0, 0, 0.20) 80%, rgba(0, 0, 0, 0.08) 90%, rgba(0, 0, 0, 0) 100%)";
function Ju(_j) { var _10, _11, _12, _13; var { variant: e = "gradient", backgroundColor: t, zIndex: a = 40, className: n, style: i } = _j, r = __rest(_j, ["variant", "backgroundColor", "zIndex", "className", "style"]); let o = (_10 = t !== null && t !== void 0 ? t : i === null || i === void 0 ? void 0 : i.backgroundColor) !== null && _10 !== void 0 ? _10 : "var(--bg)", s = Object.assign(Object.assign({}, i), { position: "fixed", top: 0, left: 0, right: 0, zIndex: a, pointerEvents: "none", height: e === "gradient" ? ly : sy, backgroundColor: o }); if (e === "gradient")
    s.maskImage = Tm, s.WebkitMaskImage = Tm;
else if (e === "blur")
    s.backdropFilter = (_11 = i === null || i === void 0 ? void 0 : i.backdropFilter) !== null && _11 !== void 0 ? _11 : "blur(12px)", s.WebkitBackdropFilter = (_12 = i === null || i === void 0 ? void 0 : i.WebkitBackdropFilter) !== null && _12 !== void 0 ? _12 : "blur(12px)"; return Yu("div", Object.assign(Object.assign({}, r), { "aria-hidden": (_13 = r["aria-hidden"]) !== null && _13 !== void 0 ? _13 : !0, className: n, style: s })); }
function Em(e) { let t = e; if (typeof t.toBase64 === "function")
    return t.toBase64(); let a = 32768, n = ""; for (let i = 0; i < e.length; i += a) {
    let r = e.subarray(i, i + a);
    n += String.fromCharCode.apply(null, r);
} return btoa(n); }
function fi(e) {
    return __awaiter(this, void 0, void 0, function* () { let t = new Uint8Array(yield e.arrayBuffer()); return { dataBase64: Em(t), mimeType: e.type || "application/octet-stream" }; });
}
class Rn extends Error {
    constructor(e, t, a, n = !1) { super(e); this.status = t, this.retryAfterMs = a, this.retrySafe = n, this.name = "SpaceActionError"; }
}
var uy = new Set([400, 401, 403, 404, 409, 413, 415, 422]), cy = 3, dy = 1000, Cm = 30000;
function py(e, t) { if (t instanceof Rn && uy.has(t.status))
    return !1; return t instanceof Rn && t.retrySafe && e < cy; }
function my(e, t) { let a = Math.min(Cm, dy * Math.pow(2, e)); return (t instanceof Rn && t.retryAfterMs != null ? Math.min(Cm, Math.max(0, t.retryAfterMs)) : 0) + Math.random() * a; }
var ya = new Fu({ defaultOptions: { queries: { retry: py, retryDelay: my, staleTime: 30000, refetchOnWindowFocus: !1 } } }), Mm = "__hatchAuditSettle";
function fy(e = ya) { if (typeof window > "u")
    return; let t = window; if (typeof t[Mm] === "function")
    return; t[Mm] = () => e.isFetching() + e.isMutating(); }
fy();
var hy = "hatch:space:query-invalidated", gy = "hatch:space-action-auth-refresh-required", by = "hatch:space-action-auth-refresh-result", vy = "hatch:space-unavailable", Bm = "space_unavailable", yy = ["notary_missing", "notary_expired", "notary_invalid", "credential_stale"], xy = 1e4, Lm = 1000, wy = 30000, Sy = 30000;
function ky(e) { return typeof e === "object" && e != null && e.type === hy; }
function Ny(e) { return yy.includes(e); }
function Ty(e) { if (typeof e !== "object" || e == null)
    return !1; let t = e.error; if (typeof t !== "object" || t == null)
    return !1; return Ny(t.code); }
function qm(e) { if (typeof e !== "object" || e == null)
    return !1; let t = e.error; if (typeof t !== "object" || t == null)
    return !1; return t.code === Bm; }
function Rm(e, t) { if (typeof window > "u" || window.parent === window)
    return !1; return window.parent.postMessage({ type: gy, reason: e, requestId: t }, "*"), !0; }
function Ey(e) { if (typeof window > "u" || window.parent === window)
    return !1; return window.parent.postMessage({ type: vy, reason: Bm, actionCallId: e }, "*"), !0; }
function Cy(e, t) { return typeof e === "object" && e != null && e.type === by && e.requestId === t; }
function My() { return `refresh-${Fm()}`; }
function qy(e) { let t = My(), a = typeof window > "u" ? null : window; if (a == null || a.parent === a || typeof a.addEventListener !== "function" || typeof a.removeEventListener !== "function")
    return Rm(e, t), Promise.reject(Error("space action auth refresh is unavailable")); return new Promise((n, i) => { let r = a.setTimeout(() => { o(), i(Error("space action auth refresh timed out")); }, xy), o = () => { a.clearTimeout(r), a.removeEventListener("message", s); }, s = (p) => { if (p.source !== a.parent)
    return; if (!Cy(p.data, t))
    return; if (o(), p.data.ok === !0) {
    n(p.data);
    return;
} let f = typeof p.data.error === "string" && p.data.error.length > 0 ? p.data.error : "space action auth refresh failed"; i(Error(f)); }; if (a.addEventListener("message", s), !Rm(e, t))
    o(), i(Error("space action auth refresh is unavailable")); }); }
function Ry(e, t) { var _j, _10; if (typeof t !== "string" || t.length === 0)
    return null; let a = (_10 = (_j = globalThis.location) === null || _j === void 0 ? void 0 : _j.href) !== null && _10 !== void 0 ? _10 : "https://hatch.invalid/", n = null; try {
    n = new URL(t, a).searchParams.get("viewer_assertion");
}
catch (_11) {
    return null;
} if (n == null || n.length === 0)
    return null; try {
    let i = new URL(e, a);
    return i.searchParams.set("viewer_assertion", n), i.toString();
}
catch (_12) {
    return null;
} }
function Ay(e) { var _j; let t = (_j = e.payload) === null || _j === void 0 ? void 0 : _j.queryKeys; if (!Array.isArray(t))
    return null; return t.filter((a) => Array.isArray(a)); }
var vr = new Map, Wu = !1, yr = [];
function Bl() { return Date.now(); }
function ec(e) { let t = e - Sy; while (!0) {
    let a = yr[0];
    if (a == null || a.tsMs >= t)
        break;
    yr.shift();
} }
function zy(e, t) { if (Object.is(e, t))
    return !0; try {
    return JSON.stringify(e) === JSON.stringify(t);
}
catch (_j) {
    return !1;
} }
function Am(e, t) { if (t.length > e.length)
    return !1; return t.every((a, n) => zy(a, e[n])); }
function Oy(e, t) { return Am(e, t) || Am(t, e); }
function Uy(e) { let [t] = e; if (t == null)
    return "all"; if (Array.isArray(t))
    return t; if (typeof t === "object" && t != null && "queryKey" in t && Array.isArray(t.queryKey))
    return t.queryKey; return "all"; }
function Hy(e) { let t = Bl(); ec(t), yr.push({ target: e, tsMs: t }); }
function zm(e, t) { let a = Bl(); return ec(a), yr.some((n) => n.tsMs >= t && (n.target === "all" || Oy(e, n.target))); }
function Om(e) { let t = Bl(); return ec(t), yr.some((a) => a.tsMs >= e); }
function Qy(e) { let t = Bl(); if (vr.set(e, t), typeof window > "u")
    return; window.setTimeout(() => { if (vr.get(e) === t)
    vr.delete(e); }, wy); }
function Um(e) { if (Wu)
    return; Wu = !0, ya.cancelQueries(), Ey(e); }
function _l() { if (!Wu)
    return; throw new Rn("Space is no longer available", 404); }
function Dy(e) { var _j; let t = (_j = e.payload) === null || _j === void 0 ? void 0 : _j.originActionCallId; return typeof t === "string" && t.length > 0 ? t : null; }
function $y(e, t, a) { let n = a == null ? void 0 : vr.get(a); if (n == null) {
    Hm(e, t);
    return;
} if (zm(t, n))
    return; window.setTimeout(() => { if (zm(t, n))
    return; Hm(e, t); }, Lm); }
function Gy(e, t) { let a = t == null ? void 0 : vr.get(t); if (a == null) {
    Qm(e);
    return;
} if (Om(a))
    return; window.setTimeout(() => { if (Om(a))
    return; Qm(e); }, Lm); }
var tc = ya.invalidateQueries.bind(ya);
ya.invalidateQueries = (...e) => { let t = Uy(e); if (t != null)
    Hy(t); return tc(...e); };
function Hm(e, t) { if (e === ya)
    return tc({ queryKey: t }); return e.invalidateQueries({ queryKey: t }); }
function Qm(e) { if (e === ya)
    return tc(); return e.invalidateQueries(); }
var Dm = !1;
function _y(e = ya) { if (Dm || typeof window > "u")
    return; Dm = !0, window.addEventListener("message", (t) => { if (window.parent !== window) {
    if (t.source !== window.parent)
        return;
}
else if (t.origin !== window.location.origin)
    return; if (!ky(t.data))
    return; let a = Dy(t.data), n = Ay(t.data); if (n == null)
    return; if (n.length === 0) {
    Gy(e, a);
    return;
} for (let i of n)
    $y(e, i, a); }); }
_y();
var By = "./actions";
function Ly(e) { var _j; let t = (_j = globalThis.location) === null || _j === void 0 ? void 0 : _j.href; if (typeof t !== "string" || t.length === 0)
    return e; let a = new URL(t); return a.hash = "", a.search = "", new URL(e, a).toString(); }
function Km(e = {}) { var _j, _10; let t = (_j = e.endpoint) !== null && _j !== void 0 ? _j : Ly(By), a = (_10 = e.fetch) !== null && _10 !== void 0 ? _10 : globalThis.fetch, n = (r, o, s, p) => a(s, { method: "POST", headers: { "content-type": "application/json", "x-request-id": p }, body: JSON.stringify({ action: r, args: o !== null && o !== void 0 ? o : {}, actionCallId: p }) }), i = (r, o) => __awaiter(this, void 0, void 0, function* () { let s = yield r.json(); if (s && typeof s === "object" && "error" in s && s.error)
    throw Error(`action ${o} error: ${String(s.error)}`); return s.data; }); return new Proxy({}, { get(r, o) { if (typeof o !== "string")
        return; if (o === "then" || o === "catch" || o === "finally")
        return; return (s) => __awaiter(this, void 0, void 0, function* () { _l(); let p = Fm(); Qy(p); let f = yield n(o, s, t, p); if (!f.ok) {
        let b = yield _m(f);
        if (f.status === 404 && qm(b))
            Um(p), _l();
        if (Ty(b)) {
            let h = yield qy(b.error.code);
            if (!("retrySafe" in b) || b.retrySafe !== !0)
                throw new Rn("Your session has been refreshed. Reload the app to check whether your changes were saved before trying again.", 409);
            let v = Ry(t, h.iframeSrc);
            if (v == null)
                throw Error(`action ${o} auth refresh did not return a fresh viewer_assertion`);
            _l();
            let T = yield n(o, s, v, p);
            if (!T.ok) {
                let k = yield _m(T);
                if (T.status === 404 && qm(k))
                    Um(p), _l();
                let M = typeof k === "string" ? k : JSON.stringify(k !== null && k !== void 0 ? k : null);
                throw new Rn(`action ${o} failed after auth refresh: ${T.status} ${M}`, T.status, Gm(T), $m(k));
            }
            return i(T, o);
        }
        let x = typeof b === "string" ? b : JSON.stringify(b !== null && b !== void 0 ? b : null);
        throw new Rn(`action ${o} failed: ${f.status} ${x}`, f.status, Gm(f), $m(b));
    } return i(f, o); }); } }); }
function $m(e) { return e !== null && typeof e === "object" && "retrySafe" in e && e.retrySafe === !0; }
function Gm(e) { let t = e.headers.get("retry-after"); if (t == null)
    return; let a = Number(t); if (Number.isFinite(a))
    return Math.max(0, a * 1000); let n = Date.parse(t); if (Number.isFinite(n))
    return Math.max(0, n - Date.now()); return; }
function _m(e) {
    return __awaiter(this, void 0, void 0, function* () { let t = yield e.text(); if (t.length === 0)
        return ""; try {
        return JSON.parse(t);
    }
    catch (_j) {
        return t;
    } });
}
function Fm() { var _j; if (typeof ((_j = globalThis.crypto) === null || _j === void 0 ? void 0 : _j.randomUUID) === "function")
    return globalThis.crypto.randomUUID(); return `space-action-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; }
function lv() { if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function")
    return; try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lv);
}
catch (e) {
    console.error(e);
} }
var hi = {};
Gv(hi, { unstable_now: () => sa, unstable_IdlePriority: () => Yl, unstable_ImmediatePriority: () => Xl, unstable_LowPriority: () => Zl, unstable_NormalPriority: () => gi, unstable_Profiling: () => Im, unstable_UserBlockingPriority: () => Pl, unstable_cancelCallback: () => Il, unstable_forceFrameRate: () => Jm, unstable_getCurrentPriorityLevel: () => Jl, unstable_next: () => Wm, unstable_requestPaint: () => Wl, unstable_runWithPriority: () => ef, unstable_scheduleCallback: () => bi, unstable_shouldYield: () => es, unstable_wrapCallback: () => tf }, { unstable_now: (ZS) => sa = ZS, unstable_IdlePriority: (ZS) => Yl = ZS, unstable_ImmediatePriority: (ZS) => Xl = ZS, unstable_LowPriority: (ZS) => Zl = ZS, unstable_NormalPriority: (ZS) => gi = ZS, unstable_Profiling: (ZS) => Im = ZS, unstable_UserBlockingPriority: (ZS) => Pl = ZS, unstable_cancelCallback: (ZS) => Il = ZS, unstable_forceFrameRate: (ZS) => Jm = ZS, unstable_getCurrentPriorityLevel: (ZS) => Jl = ZS, unstable_next: (ZS) => Wm = ZS, unstable_requestPaint: (ZS) => Wl = ZS, unstable_runWithPriority: (ZS) => ef = ZS, unstable_scheduleCallback: (ZS) => bi = ZS, unstable_shouldYield: (ZS) => es = ZS, unstable_wrapCallback: (ZS) => tf = ZS });
function nc(e, t) { var a = e.length; e.push(t); e: for (; 0 < a;) {
    var n = a - 1 >>> 1, i = e[n];
    if (0 < Ll(i, t))
        e[n] = t, e[a] = i, a = n;
    else
        break e;
} }
function xa(e) { return e.length === 0 ? null : e[0]; }
function Vl(e) { if (e.length === 0)
    return null; var t = e[0], a = e.pop(); if (a !== t) {
    e[0] = a;
    e: for (var n = 0, i = e.length, r = i >>> 1; n < r;) {
        var o = 2 * (n + 1) - 1, s = e[o], p = o + 1, f = e[p];
        if (0 > Ll(s, a))
            p < i && 0 > Ll(f, s) ? (e[n] = f, e[p] = a, n = p) : (e[n] = s, e[o] = a, n = o);
        else if (p < i && 0 > Ll(f, a))
            e[n] = f, e[p] = a, n = p;
        else
            break e;
    }
} return t; }
function Ll(e, t) { var a = e.sortIndex - t.sortIndex; return a !== 0 ? a : e.id - t.id; }
var sa = void 0;
if (typeof performance === "object" && typeof performance.now === "function")
    ic = performance, sa = function () { return ic.now(); };
else
    Kl = Date, oc = Kl.now(), sa = function () { return Kl.now() - oc; };
var ic, Kl, oc, Va = [], An = [], Ky = 1, Gt = null, nt = 3, rc = !1, xr = !1, wr = !1, sc = !1, Vm = typeof setTimeout === "function" ? setTimeout : null, Ym = typeof clearTimeout === "function" ? clearTimeout : null, jm = typeof setImmediate < "u" ? setImmediate : null;
function Fl(e) { for (var t = xa(An); t !== null;) {
    if (t.callback === null)
        Vl(An);
    else if (t.startTime <= e)
        Vl(An), t.sortIndex = t.expirationTime, nc(Va, t);
    else
        break;
    t = xa(An);
} }
function uc(e) { if (wr = !1, Fl(e), !xr)
    if (xa(Va) !== null)
        xr = !0, ro || (ro = !0, oo());
    else {
        var t = xa(An);
        t !== null && cc(uc, t.startTime - e);
    } }
var ro = !1, Sr = -1, Xm = 5, Zm = -1;
function Pm() { return sc ? !0 : hi.unstable_now() - Zm < Xm ? !1 : !0; }
function ac() { if (sc = !1, ro) {
    var e = hi.unstable_now();
    Zm = e;
    var t = !0;
    try {
        e: {
            xr = !1, wr && (wr = !1, Ym(Sr), Sr = -1), rc = !0;
            var a = nt;
            try {
                t: {
                    Fl(e);
                    for (Gt = xa(Va); Gt !== null && !(Gt.expirationTime > e && Pm());) {
                        var n = Gt.callback;
                        if (typeof n === "function") {
                            Gt.callback = null, nt = Gt.priorityLevel;
                            var i = n(Gt.expirationTime <= e);
                            if (e = hi.unstable_now(), typeof i === "function") {
                                Gt.callback = i, Fl(e), t = !0;
                                break t;
                            }
                            Gt === xa(Va) && Vl(Va), Fl(e);
                        }
                        else
                            Vl(Va);
                        Gt = xa(Va);
                    }
                    if (Gt !== null)
                        t = !0;
                    else {
                        var r = xa(An);
                        r !== null && cc(uc, r.startTime - e), t = !1;
                    }
                }
                break e;
            }
            finally {
                Gt = null, nt = a, rc = !1;
            }
            t = void 0;
        }
    }
    finally {
        t ? oo() : ro = !1;
    }
} }
var oo;
if (typeof jm === "function")
    oo = function () { jm(ac); };
else if (typeof MessageChannel < "u")
    jl = new MessageChannel, lc = jl.port2, jl.port1.onmessage = ac, oo = function () { lc.postMessage(null); };
else
    oo = function () { Vm(ac, 0); };
var jl, lc;
function cc(e, t) { Sr = Vm(function () { e(hi.unstable_now()); }, t); }
var Yl = 5, Xl = 1, Zl = 4, gi = 3, Im = null, Pl = 2, Il = function (e) { e.callback = null; }, Jm = function (e) { 0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Xm = 0 < e ? Math.floor(1000 / e) : 5; }, Jl = function () { return nt; }, Wm = function (e) { switch (nt) {
    case 1:
    case 2:
    case 3:
        var t = 3;
        break;
    default: t = nt;
} var a = nt; nt = t; try {
    return e();
}
finally {
    nt = a;
} }, Wl = function () { sc = !0; }, ef = function (e, t) { switch (e) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: break;
    default: e = 3;
} var a = nt; nt = e; try {
    return t();
}
finally {
    nt = a;
} }, bi = function (e, t, a) { var n = hi.unstable_now(); switch (typeof a === "object" && a !== null ? (a = a.delay, a = typeof a === "number" && 0 < a ? n + a : n) : a = n, e) {
    case 1:
        var i = -1;
        break;
    case 2:
        i = 250;
        break;
    case 5:
        i = 1073741823;
        break;
    case 4:
        i = 1e4;
        break;
    default: i = 5000;
} return i = a + i, e = { id: Ky++, callback: t, priorityLevel: e, startTime: a, expirationTime: i, sortIndex: -1 }, a > n ? (e.sortIndex = a, nc(An, e), xa(Va) === null && e === xa(An) && (wr ? (Ym(Sr), Sr = -1) : wr = !0, cc(uc, a - n))) : (e.sortIndex = i, nc(Va, e), xr || rc || (xr = !0, ro || (ro = !0, oo()))), e; }, es = Pm, tf = function (e) { var t = nt; return function () { var a = nt; nt = t; try {
    return e.apply(this, arguments);
}
finally {
    nt = a;
} }; };
function af() { if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function")
    return; try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(af);
}
catch (e) {
    console.error(e);
} }
function Fy(e) { var t = "https://react.dev/errors/" + e; if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
} return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."; }
function zn() { }
var jy = { d: { f: zn, r: function () { throw Error(Fy(522)); }, D: zn, C: zn, L: zn, m: zn, X: zn, S: zn, M: zn }, p: 0, findDOMNode: null };
var dc = jy;
af();
function N(e) { var t = "https://react.dev/errors/" + e; if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
} return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."; }
function Yy(e) { return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11); }
function dl(e) { var t = e, a = e; if (e.alternate)
    for (; t.return;)
        t = t.return;
else {
    e = t;
    do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
    while (e);
} return t.tag === 3 ? a : null; }
function Ch(e) { if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
} return null; }
function Mh(e) { if (e.tag === 31) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
} return null; }
function nf(e) { if (dl(e) !== e)
    throw Error(N(188)); }
function Xy(e) { var t = e.alternate; if (!t) {
    if (t = dl(e), t === null)
        throw Error(N(188));
    return t !== e ? null : e;
} for (var a = e, n = t;;) {
    var i = a.return;
    if (i === null)
        break;
    var r = i.alternate;
    if (r === null) {
        if (n = i.return, n !== null) {
            a = n;
            continue;
        }
        break;
    }
    if (i.child === r.child) {
        for (r = i.child; r;) {
            if (r === a)
                return nf(i), e;
            if (r === n)
                return nf(i), t;
            r = r.sibling;
        }
        throw Error(N(188));
    }
    if (a.return !== n.return)
        a = i, n = r;
    else {
        for (var o = !1, s = i.child; s;) {
            if (s === a) {
                o = !0, a = i, n = r;
                break;
            }
            if (s === n) {
                o = !0, n = i, a = r;
                break;
            }
            s = s.sibling;
        }
        if (!o) {
            for (s = r.child; s;) {
                if (s === a) {
                    o = !0, a = r, n = i;
                    break;
                }
                if (s === n) {
                    o = !0, n = r, a = i;
                    break;
                }
                s = s.sibling;
            }
            if (!o)
                throw Error(N(189));
        }
    }
    if (a.alternate !== n)
        throw Error(N(190));
} if (a.tag !== 3)
    throw Error(N(188)); return a.stateNode.current === a ? e : t; }
function qh(e) { var t = e.tag; if (t === 5 || t === 26 || t === 27 || t === 6)
    return e; for (e = e.child; e !== null;) {
    if (t = qh(e), t !== null)
        return t;
    e = e.sibling;
} return null; }
var we = Object.assign, Zy = Symbol.for("react.element"), ts = Symbol.for("react.transitional.element"), qr = Symbol.for("react.portal"), mo = Symbol.for("react.fragment"), Rh = Symbol.for("react.strict_mode"), Fc = Symbol.for("react.profiler"), Ah = Symbol.for("react.consumer"), en = Symbol.for("react.context"), Bd = Symbol.for("react.forward_ref"), jc = Symbol.for("react.suspense"), Vc = Symbol.for("react.suspense_list"), Ld = Symbol.for("react.memo"), On = Symbol.for("react.lazy"), Yc = Symbol.for("react.activity"), Py = Symbol.for("react.memo_cache_sentinel"), of = Symbol.iterator;
function kr(e) { if (e === null || typeof e !== "object")
    return null; return e = of && e[of] || e["@@iterator"], typeof e === "function" ? e : null; }
var Iy = Symbol.for("react.client.reference");
function Xc(e) { if (e == null)
    return null; if (typeof e === "function")
    return e.$$typeof === Iy ? null : e.displayName || e.name || null; if (typeof e === "string")
    return e; switch (e) {
    case mo: return "Fragment";
    case Fc: return "Profiler";
    case Rh: return "StrictMode";
    case jc: return "Suspense";
    case Vc: return "SuspenseList";
    case Yc: return "Activity";
} if (typeof e === "object")
    switch (e.$$typeof) {
        case qr: return "Portal";
        case en: return e.displayName || "Context";
        case Ah: return (e._context.displayName || "Context") + ".Consumer";
        case Bd:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Ld: return t = e.displayName || null, t !== null ? t : Xc(e.type) || "Memo";
        case On:
            t = e._payload, e = e._init;
            try {
                return Xc(e(t));
            }
            catch (a) { }
    } return null; }
var Rr = Array.isArray, K = Gl, ie = dc, Ni = { pending: !1, data: null, method: null, action: null }, Zc = [], fo = -1;
function Ta(e) { return { current: e }; }
function Ve(e) { 0 > fo || (e.current = Zc[fo], Zc[fo] = null, fo--); }
function ge(e, t) { fo++, Zc[fo] = e.current, e.current = t; }
var Na = Ta(null), Ir = Ta(null), Fn = Ta(null), As = Ta(null);
function zs(e, t) { switch (ge(Fn, t), ge(Ir, e), ge(Na, null), t.nodeType) {
    case 9:
    case 11:
        e = (e = t.documentElement) ? (e = e.namespaceURI) ? ch(e) : 0 : 0;
        break;
    default: if (e = t.tagName, t = t.namespaceURI)
        t = ch(t), e = Pb(t, e);
    else
        switch (e) {
            case "svg":
                e = 1;
                break;
            case "math":
                e = 2;
                break;
            default: e = 0;
        }
} Ve(Na), ge(Na, e); }
function zo() { Ve(Na), Ve(Ir), Ve(Fn); }
function Pc(e) { e.memoizedState !== null && ge(As, e); var t = Na.current, a = Pb(t, e.type); t !== a && (ge(Ir, e), ge(Na, a)); }
function Os(e) { Ir.current === e && (Ve(Na), Ve(Ir)), As.current === e && (Ve(As), sl._currentValue = Ni); }
var pc, rf;
function yi(e) {
    if (pc === void 0)
        try {
            throw Error();
        }
        catch (a) {
            var t = a.stack.trim().match(/\n( *(at )?)/);
            pc = t && t[1] || "", rf = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
    return `
` + pc + e + rf;
}
var mc = !1;
function fc(e, t) {
    if (!e || mc)
        return "";
    mc = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        var n = { DetermineComponentFrameRoot: function () { try {
                if (t) {
                    var x = function () { throw Error(); };
                    if (Object.defineProperty(x.prototype, "props", { set: function () { throw Error(); } }), typeof Reflect === "object" && Reflect.construct) {
                        try {
                            Reflect.construct(x, []);
                        }
                        catch (v) {
                            var h = v;
                        }
                        Reflect.construct(e, [], x);
                    }
                    else {
                        try {
                            x.call();
                        }
                        catch (v) {
                            h = v;
                        }
                        e.call(x.prototype);
                    }
                }
                else {
                    try {
                        throw Error();
                    }
                    catch (v) {
                        h = v;
                    }
                    (x = e()) && typeof x.catch === "function" && x.catch(function () { });
                }
            }
            catch (v) {
                if (v && h && typeof v.stack === "string")
                    return [v.stack, h.stack];
            } return [null, null]; } };
        n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var i = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
        i && i.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
        var r = n.DetermineComponentFrameRoot(), o = r[0], s = r[1];
        if (o && s) {
            var p = o.split(`
`), f = s.split(`
`);
            for (i = n = 0; n < p.length && !p[n].includes("DetermineComponentFrameRoot");)
                n++;
            for (; i < f.length && !f[i].includes("DetermineComponentFrameRoot");)
                i++;
            if (n === p.length || i === f.length)
                for (n = p.length - 1, i = f.length - 1; 1 <= n && 0 <= i && p[n] !== f[i];)
                    i--;
            for (; 1 <= n && 0 <= i; n--, i--)
                if (p[n] !== f[i]) {
                    if (n !== 1 || i !== 1)
                        do
                            if (n--, i--, 0 > i || p[n] !== f[i]) {
                                var b = `
` + p[n].replace(" at new ", " at ");
                                return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), b;
                            }
                        while (1 <= n && 0 <= i);
                    break;
                }
        }
    }
    finally {
        mc = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? yi(a) : "";
}
function Jy(e, t) { switch (e.tag) {
    case 26:
    case 27:
    case 5: return yi(e.type);
    case 16: return yi("Lazy");
    case 13: return e.child !== t && t !== null ? yi("Suspense Fallback") : yi("Suspense");
    case 19: return yi("SuspenseList");
    case 0:
    case 15: return fc(e.type, !1);
    case 11: return fc(e.type.render, !1);
    case 1: return fc(e.type, !0);
    case 31: return yi("Activity");
    default: return "";
} }
function lf(e) {
    try {
        var t = "", a = null;
        do
            t += Jy(e, a), a = e, e = e.return;
        while (e);
        return t;
    }
    catch (n) {
        return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
}
var Ic = Object.prototype.hasOwnProperty, Kd = bi, hc = Il, Wy = es, e0 = Wl, kt = sa, t0 = Jl, zh = Xl, Oh = Pl, Us = gi, a0 = Zl, Uh = Yl, n0 = void 0, i0 = void 0, pl = null, Nt = null;
function Gn(e) { if (typeof n0 === "function" && i0(e), Nt && typeof Nt.setStrictMode === "function")
    try {
        Nt.setStrictMode(pl, e);
    }
    catch (t) { } }
var Tt = Math.clz32 ? Math.clz32 : l0, { log: o0, LN2: r0 } = Math;
function l0(e) { return e >>>= 0, e === 0 ? 32 : 31 - (o0(e) / r0 | 0) | 0; }
var as = 256, ns = 262144, is = 4194304;
function xi(e) { var t = e & 42; if (t !== 0)
    return t; switch (e & -e) {
    case 1: return 1;
    case 2: return 2;
    case 4: return 4;
    case 8: return 8;
    case 16: return 16;
    case 32: return 32;
    case 64: return 64;
    case 128: return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072: return e & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152: return e & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432: return e & 62914560;
    case 67108864: return 67108864;
    case 134217728: return 134217728;
    case 268435456: return 268435456;
    case 536870912: return 536870912;
    case 1073741824: return 0;
    default: return e;
} }
function ru(e, t, a) { var n = e.pendingLanes; if (n === 0)
    return 0; var i = 0, r = e.suspendedLanes, o = e.pingedLanes; e = e.warmLanes; var s = n & 134217727; return s !== 0 ? (n = s & ~r, n !== 0 ? i = xi(n) : (o &= s, o !== 0 ? i = xi(o) : a || (a = s & ~e, a !== 0 && (i = xi(a))))) : (s = n & ~r, s !== 0 ? i = xi(s) : o !== 0 ? i = xi(o) : a || (a = n & ~e, a !== 0 && (i = xi(a)))), i === 0 ? 0 : t !== 0 && t !== i && (t & r) === 0 && (r = i & -i, a = t & -t, r >= a || r === 32 && (a & 4194048) !== 0) ? t : i; }
function ml(e, t) { return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0; }
function s0(e, t) { switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64: return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152: return t + 5000;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432: return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824: return -1;
    default: return -1;
} }
function Hh() { var e = is; return is <<= 1, (is & 62914560) === 0 && (is = 4194304), e; }
function gc(e) { for (var t = [], a = 0; 31 > a; a++)
    t.push(e); return t; }
function lu(e, t) { e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0); }
function u0(e, t, a, n, i, r) { var o = e.pendingLanes; e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0; var { entanglements: s, expirationTimes: p, hiddenUpdates: f } = e; for (a = o & ~a; 0 < a;) {
    var b = 31 - Tt(a), x = 1 << b;
    s[b] = 0, p[b] = -1;
    var h = f[b];
    if (h !== null)
        for (f[b] = null, b = 0; b < h.length; b++) {
            var v = h[b];
            v !== null && (v.lane &= -536870913);
        }
    a &= ~x;
} n !== 0 && Qh(e, n, 0), r !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(o & ~t)); }
function Qh(e, t, a) { e.pendingLanes |= t, e.suspendedLanes &= ~t; var n = 31 - Tt(t); e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930; }
function Dh(e, t) { var a = e.entangledLanes |= t; for (e = e.entanglements; a;) {
    var n = 31 - Tt(a), i = 1 << n;
    i & t | e[n] & t && (e[n] |= t), a &= ~i;
} }
function $h(e, t) { var a = t & -t; return a = (a & 42) !== 0 ? 1 : Gh(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a; }
function Gh(e) { switch (e) {
    case 2:
        e = 1;
        break;
    case 8:
        e = 4;
        break;
    case 32:
        e = 16;
        break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
        e = 128;
        break;
    case 268435456:
        e = 134217728;
        break;
    default: e = 0;
} return e; }
function Fd(e) { return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2; }
function _h() { var e = ie.p; if (e !== 0)
    return e; return e = window.event, e === void 0 ? 32 : ov(e.type); }
function sf(e, t) { var a = ie.p; try {
    return ie.p = e, t();
}
finally {
    ie.p = a;
} }
var ti = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + ti, ht = "__reactProps$" + ti, fl = "__reactContainer$" + ti, Jc = "__reactEvents$" + ti, c0 = "__reactListeners$" + ti, d0 = "__reactHandles$" + ti, uf = "__reactResources$" + ti, hl = "__reactMarker$" + ti;
function jd(e) { delete e[Ze], delete e[ht], delete e[Jc], delete e[c0], delete e[d0]; }
function ho(e) { var t = e[Ze]; if (t)
    return t; for (var a = e.parentNode; a;) {
    if (t = a[fl] || a[Ze]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = hh(e); e !== null;) {
                if (a = e[Ze])
                    return a;
                e = hh(e);
            }
        return t;
    }
    e = a, a = e.parentNode;
} return null; }
function Ko(e) { if (e = e[Ze] || e[fl]) {
    var t = e.tag;
    if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
} return null; }
function Ar(e) { var t = e.tag; if (t === 5 || t === 26 || t === 27 || t === 6)
    return e.stateNode; throw Error(N(33)); }
function To(e) { var t = e[uf]; return t || (t = e[uf] = { hoistableStyles: new Map, hoistableScripts: new Map }), t; }
function je(e) { e[hl] = !0; }
var Bh = new Set, Lh = {};
function Qi(e, t) { Oo(e, t), Oo(e + "Capture", t); }
function Oo(e, t) { Lh[e] = t; for (e = 0; e < t.length; e++)
    Bh.add(t[e]); }
var p0 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), cf = {}, df = {};
function m0(e) { if (Ic.call(df, e))
    return !0; if (Ic.call(cf, e))
    return !1; if (p0.test(e))
    return df[e] = !0; return cf[e] = !0, !1; }
function hs(e, t, a) { if (m0(t))
    if (a === null)
        e.removeAttribute(t);
    else {
        switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
                e.removeAttribute(t);
                return;
            case "boolean":
                var n = t.toLowerCase().slice(0, 5);
                if (n !== "data-" && n !== "aria-") {
                    e.removeAttribute(t);
                    return;
                }
        }
        e.setAttribute(t, "" + a);
    } }
function os(e, t, a) { if (a === null)
    e.removeAttribute(t);
else {
    switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
            e.removeAttribute(t);
            return;
    }
    e.setAttribute(t, "" + a);
} }
function Ya(e, t, a, n) { if (n === null)
    e.removeAttribute(a);
else {
    switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
            e.removeAttribute(a);
            return;
    }
    e.setAttributeNS(t, a, "" + n);
} }
function Bt(e) { switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined": return e;
    case "object": return e;
    default: return "";
} }
function Kh(e) { var t = e.type; return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio"); }
function f0(e, t, a) { var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t); if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get === "function" && typeof n.set === "function") {
    var { get: i, set: r } = n;
    return Object.defineProperty(e, t, { configurable: !0, get: function () { return i.call(this); }, set: function (o) { a = "" + o, r.call(this, o); } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function () { return a; }, setValue: function (o) { a = "" + o; }, stopTracking: function () { e._valueTracker = null, delete e[t]; } };
} }
function Wc(e) { if (!e._valueTracker) {
    var t = Kh(e) ? "checked" : "value";
    e._valueTracker = f0(e, t, "" + e[t]);
} }
function Fh(e) { if (!e)
    return !1; var t = e._valueTracker; if (!t)
    return !0; var a = t.getValue(), n = ""; return e && (n = Kh(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), !0) : !1; }
function Hs(e) { if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null; try {
    return e.activeElement || e.body;
}
catch (t) {
    return e.body;
} }
var h0 = /[\n"\\]/g;
function Ft(e) { return e.replace(h0, function (t) { return "\\" + t.charCodeAt(0).toString(16) + " "; }); }
function ed(e, t, a, n, i, r, o, s) { if (e.name = "", o != null && typeof o !== "function" && typeof o !== "symbol" && typeof o !== "boolean" ? e.type = o : e.removeAttribute("type"), t != null)
    if (o === "number") {
        if (t === 0 && e.value === "" || e.value != t)
            e.value = "" + Bt(t);
    }
    else
        e.value !== "" + Bt(t) && (e.value = "" + Bt(t));
else
    o !== "submit" && o !== "reset" || e.removeAttribute("value"); t != null ? td(e, o, Bt(t)) : a != null ? td(e, o, Bt(a)) : n != null && e.removeAttribute("value"), i == null && r != null && (e.defaultChecked = !!r), i != null && (e.checked = i && typeof i !== "function" && typeof i !== "symbol"), s != null && typeof s !== "function" && typeof s !== "symbol" && typeof s !== "boolean" ? e.name = "" + Bt(s) : e.removeAttribute("name"); }
function jh(e, t, a, n, i, r, o, s) { if (r != null && typeof r !== "function" && typeof r !== "symbol" && typeof r !== "boolean" && (e.type = r), t != null || a != null) {
    if (!(r !== "submit" && r !== "reset" || t !== void 0 && t !== null)) {
        Wc(e);
        return;
    }
    a = a != null ? "" + Bt(a) : "", t = t != null ? "" + Bt(t) : a, s || t === e.value || (e.value = t), e.defaultValue = t;
} n = n != null ? n : i, n = typeof n !== "function" && typeof n !== "symbol" && !!n, e.checked = s ? e.checked : !!n, e.defaultChecked = !!n, o != null && typeof o !== "function" && typeof o !== "symbol" && typeof o !== "boolean" && (e.name = o), Wc(e); }
function td(e, t, a) { t === "number" && Hs(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a); }
function Eo(e, t, a, n) { if (e = e.options, t) {
    t = {};
    for (var i = 0; i < a.length; i++)
        t["$" + a[i]] = !0;
    for (a = 0; a < e.length; a++)
        i = t.hasOwnProperty("$" + e[a].value), e[a].selected !== i && (e[a].selected = i), i && n && (e[a].defaultSelected = !0);
}
else {
    a = "" + Bt(a), t = null;
    for (i = 0; i < e.length; i++) {
        if (e[i].value === a) {
            e[i].selected = !0, n && (e[i].defaultSelected = !0);
            return;
        }
        t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
} }
function Vh(e, t, a) { if (t != null && (t = "" + Bt(t), t !== e.value && (e.value = t), a == null)) {
    e.defaultValue !== t && (e.defaultValue = t);
    return;
} e.defaultValue = a != null ? "" + Bt(a) : ""; }
function Yh(e, t, a, n) { if (t == null) {
    if (n != null) {
        if (a != null)
            throw Error(N(92));
        if (Rr(n)) {
            if (1 < n.length)
                throw Error(N(93));
            n = n[0];
        }
        a = n;
    }
    a == null && (a = ""), t = a;
} a = Bt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Wc(e); }
function Uo(e, t) { if (t) {
    var a = e.firstChild;
    if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
    }
} e.textContent = t; }
var g0 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
function pf(e, t, a) { var n = t.indexOf("--") === 0; a == null || typeof a === "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a !== "number" || a === 0 || g0.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px"; }
function Xh(e, t, a) { if (t != null && typeof t !== "object")
    throw Error(N(62)); if (e = e.style, a != null) {
    for (var n in a)
        !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
    for (var i in t)
        n = t[i], t.hasOwnProperty(i) && a[i] !== n && pf(e, i, n);
}
else
    for (var r in t)
        t.hasOwnProperty(r) && pf(e, r, t[r]); }
function Vd(e) { if (e.indexOf("-") === -1)
    return !1; switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph": return !1;
    default: return !0;
} }
var b0 = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), v0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function gs(e) { return v0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e; }
function tn() { }
var ad = null;
function Yd(e) { return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e; }
var go = null, Co = null;
function mf(e) { var t = Ko(e); if (t && (e = t.stateNode)) {
    var a = e[ht] || null;
    e: switch (e = t.stateNode, t.type) {
        case "input":
            if (ed(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
                for (a = e; a.parentNode;)
                    a = a.parentNode;
                a = a.querySelectorAll('input[name="' + Ft("" + t) + '"][type="radio"]');
                for (t = 0; t < a.length; t++) {
                    var n = a[t];
                    if (n !== e && n.form === e.form) {
                        var i = n[ht] || null;
                        if (!i)
                            throw Error(N(90));
                        ed(n, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
                    }
                }
                for (t = 0; t < a.length; t++)
                    n = a[t], n.form === e.form && Fh(n);
            }
            break e;
        case "textarea":
            Vh(e, a.value, a.defaultValue);
            break e;
        case "select": t = a.value, t != null && Eo(e, !!a.multiple, t, !1);
    }
} }
var bc = !1;
function Zh(e, t, a) { if (bc)
    return e(t, a); bc = !0; try {
    var n = e(t);
    return n;
}
finally {
    if (bc = !1, go !== null || Co !== null) {
        if (yu(), go && (t = go, e = Co, Co = go = null, mf(t), e))
            for (t = 0; t < e.length; t++)
                mf(e[t]);
    }
} }
function Jr(e, t) { var a = e.stateNode; if (a === null)
    return null; var n = a[ht] || null; if (n === null)
    return null; a = n[t]; e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
        break e;
    default: e = !1;
} if (e)
    return null; if (a && typeof a !== "function")
    throw Error(N(231, t, typeof a)); return a; }
var ln = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nd = !1;
if (ln)
    try {
        wi = {}, Object.defineProperty(wi, "passive", { get: function () { nd = !0; } }), window.addEventListener("test", wi, wi), window.removeEventListener("test", wi, wi);
    }
    catch (e) {
        nd = !1;
    }
var wi, _n = null, Xd = null, bs = null;
function Ph() { if (bs)
    return bs; var e, t = Xd, a = t.length, n, i = "value" in _n ? _n.value : _n.textContent, r = i.length; for (e = 0; e < a && t[e] === i[e]; e++)
    ; var o = a - e; for (n = 1; n <= o && t[a - n] === i[r - n]; n++)
    ; return bs = i.slice(e, 1 < n ? 1 - n : void 0); }
function vs(e) { var t = e.keyCode; return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0; }
function rs() { return !0; }
function ff() { return !1; }
function gt(e) { function t(a, n, i, r, o) { this._reactName = a, this._targetInst = i, this.type = n, this.nativeEvent = r, this.target = o, this.currentTarget = null; for (var s in e)
    e.hasOwnProperty(s) && (a = e[s], this[s] = a ? a(r) : r[s]); return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? rs : ff, this.isPropagationStopped = ff, this; } return we(t.prototype, { preventDefault: function () { this.defaultPrevented = !0; var a = this.nativeEvent; a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue !== "unknown" && (a.returnValue = !1), this.isDefaultPrevented = rs); }, stopPropagation: function () { var a = this.nativeEvent; a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble !== "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = rs); }, persist: function () { }, isPersistent: rs }), t; }
var Di = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function (e) { return e.timeStamp || Date.now(); }, defaultPrevented: 0, isTrusted: 0 }, su = gt(Di), gl = we({}, Di, { view: 0, detail: 0 }), y0 = gt(gl), vc, yc, Nr, uu = we({}, gl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Zd, button: 0, buttons: 0, relatedTarget: function (e) { return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget; }, movementX: function (e) { if ("movementX" in e)
        return e.movementX; return e !== Nr && (Nr && e.type === "mousemove" ? (vc = e.screenX - Nr.screenX, yc = e.screenY - Nr.screenY) : yc = vc = 0, Nr = e), vc; }, movementY: function (e) { return "movementY" in e ? e.movementY : yc; } }), hf = gt(uu), x0 = we({}, uu, { dataTransfer: 0 }), w0 = gt(x0), S0 = we({}, gl, { relatedTarget: 0 }), xc = gt(S0), k0 = we({}, Di, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), N0 = gt(k0), T0 = we({}, Di, { clipboardData: function (e) { return "clipboardData" in e ? e.clipboardData : window.clipboardData; } }), E0 = gt(T0), C0 = we({}, Di, { data: 0 }), gf = gt(C0), M0 = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, q0 = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, R0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function A0(e) { var t = this.nativeEvent; return t.getModifierState ? t.getModifierState(e) : (e = R0[e]) ? !!t[e] : !1; }
function Zd() { return A0; }
var z0 = we({}, gl, { key: function (e) { if (e.key) {
        var t = M0[e.key] || e.key;
        if (t !== "Unidentified")
            return t;
    } return e.type === "keypress" ? (e = vs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? q0[e.keyCode] || "Unidentified" : ""; }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Zd, charCode: function (e) { return e.type === "keypress" ? vs(e) : 0; }, keyCode: function (e) { return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0; }, which: function (e) { return e.type === "keypress" ? vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0; } }), O0 = gt(z0), U0 = we({}, uu, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), bf = gt(U0), H0 = we({}, gl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Zd }), Q0 = gt(H0), D0 = we({}, Di, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $0 = gt(D0), G0 = we({}, uu, { deltaX: function (e) { return "deltaX" in e ? e.deltaX : ("wheelDeltaX" in e) ? -e.wheelDeltaX : 0; }, deltaY: function (e) { return "deltaY" in e ? e.deltaY : ("wheelDeltaY" in e) ? -e.wheelDeltaY : ("wheelDelta" in e) ? -e.wheelDelta : 0; }, deltaZ: 0, deltaMode: 0 }), _0 = gt(G0), B0 = we({}, Di, { newState: 0, oldState: 0 }), L0 = gt(B0), K0 = [9, 13, 27, 32], Pd = ln && "CompositionEvent" in window, $r = null;
ln && "documentMode" in document && ($r = document.documentMode);
var F0 = ln && "TextEvent" in window && !$r, Ih = ln && (!Pd || $r && 8 < $r && 11 >= $r), vf = String.fromCharCode(32), yf = !1;
function Jh(e, t) { switch (e) {
    case "keyup": return K0.indexOf(t.keyCode) !== -1;
    case "keydown": return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout": return !0;
    default: return !1;
} }
function Wh(e) { return e = e.detail, typeof e === "object" && "data" in e ? e.data : null; }
var bo = !1;
function j0(e, t) { switch (e) {
    case "compositionend": return Wh(t);
    case "keypress":
        if (t.which !== 32)
            return null;
        return yf = !0, vf;
    case "textInput": return e = t.data, e === vf && yf ? null : e;
    default: return null;
} }
function V0(e, t) { if (bo)
    return e === "compositionend" || !Pd && Jh(e, t) ? (e = Ph(), bs = Xd = _n = null, bo = !1, e) : null; switch (e) {
    case "paste": return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which);
        }
        return null;
    case "compositionend": return Ih && t.locale !== "ko" ? null : t.data;
    default: return null;
} }
var Y0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function xf(e) { var t = e && e.nodeName && e.nodeName.toLowerCase(); return t === "input" ? !!Y0[e.type] : t === "textarea" ? !0 : !1; }
function eg(e, t, a, n) { go ? Co ? Co.push(n) : Co = [n] : go = n, t = Ws(t, "onChange"), 0 < t.length && (a = new su("onChange", "change", null, a, n), e.push({ event: a, listeners: t })); }
var Gr = null, Wr = null;
function X0(e) { Vb(e, 0); }
function cu(e) { var t = Ar(e); if (Fh(t))
    return e; }
function wf(e, t) { if (e === "change")
    return t; }
var tg = !1;
if (ln) {
    if (ln) {
        if (Or = "oninput" in document, !Or)
            ys = document.createElement("div"), ys.setAttribute("oninput", "return;"), Or = typeof ys.oninput === "function";
        zr = Or;
    }
    else
        zr = !1;
    tg = zr && (!document.documentMode || 9 < document.documentMode);
}
var zr, Or, ys;
function Sf() { Gr && (Gr.detachEvent("onpropertychange", ag), Wr = Gr = null); }
function ag(e) { if (e.propertyName === "value" && cu(Wr)) {
    var t = [];
    eg(t, Wr, e, Yd(e)), Zh(X0, t);
} }
function Z0(e, t, a) { e === "focusin" ? (Sf(), Gr = t, Wr = a, Gr.attachEvent("onpropertychange", ag)) : e === "focusout" && Sf(); }
function P0(e) { if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return cu(Wr); }
function I0(e, t) { if (e === "click")
    return cu(t); }
function J0(e, t) { if (e === "input" || e === "change")
    return cu(t); }
function W0(e, t) { return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t; }
var Et = typeof Object.is === "function" ? Object.is : W0;
function el(e, t) { if (Et(e, t))
    return !0; if (typeof e !== "object" || e === null || typeof t !== "object" || t === null)
    return !1; var a = Object.keys(e), n = Object.keys(t); if (a.length !== n.length)
    return !1; for (n = 0; n < a.length; n++) {
    var i = a[n];
    if (!Ic.call(t, i) || !Et(e[i], t[i]))
        return !1;
} return !0; }
function kf(e) { for (; e && e.firstChild;)
    e = e.firstChild; return e; }
function Nf(e, t) { var a = kf(e); e = 0; for (var n; a;) {
    if (a.nodeType === 3) {
        if (n = e + a.textContent.length, e <= t && n >= t)
            return { node: a, offset: t - e };
        e = n;
    }
    e: {
        for (; a;) {
            if (a.nextSibling) {
                a = a.nextSibling;
                break e;
            }
            a = a.parentNode;
        }
        a = void 0;
    }
    a = kf(a);
} }
function ng(e, t) { return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ng(e, t.parentNode) : ("contains" in e) ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1; }
function ig(e) { e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window; for (var t = Hs(e.document); t instanceof e.HTMLIFrameElement;) {
    try {
        var a = typeof t.contentWindow.location.href === "string";
    }
    catch (n) {
        a = !1;
    }
    if (a)
        e = t.contentWindow;
    else
        break;
    t = Hs(e.document);
} return t; }
function Id(e) { var t = e && e.nodeName && e.nodeName.toLowerCase(); return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true"); }
var e1 = ln && "documentMode" in document && 11 >= document.documentMode, vo = null, id = null, _r = null, od = !1;
function Tf(e, t, a) { var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument; od || vo == null || vo !== Hs(n) || (n = vo, ("selectionStart" in n) && Id(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = { anchorNode: n.anchorNode, anchorOffset: n.anchorOffset, focusNode: n.focusNode, focusOffset: n.focusOffset }), _r && el(_r, n) || (_r = n, n = Ws(id, "onSelect"), 0 < n.length && (t = new su("onSelect", "select", null, t, a), e.push({ event: t, listeners: n }), t.target = vo))); }
function vi(e, t) { var a = {}; return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a; }
var yo = { animationend: vi("Animation", "AnimationEnd"), animationiteration: vi("Animation", "AnimationIteration"), animationstart: vi("Animation", "AnimationStart"), transitionrun: vi("Transition", "TransitionRun"), transitionstart: vi("Transition", "TransitionStart"), transitioncancel: vi("Transition", "TransitionCancel"), transitionend: vi("Transition", "TransitionEnd") }, wc = {}, og = {};
ln && (og = document.createElement("div").style, ("AnimationEvent" in window) || (delete yo.animationend.animation, delete yo.animationiteration.animation, delete yo.animationstart.animation), ("TransitionEvent" in window) || delete yo.transitionend.transition);
function $i(e) { if (wc[e])
    return wc[e]; if (!yo[e])
    return e; var t = yo[e], a; for (a in t)
    if (t.hasOwnProperty(a) && a in og)
        return wc[e] = t[a]; return e; }
var rg = $i("animationend"), lg = $i("animationiteration"), sg = $i("animationstart"), t1 = $i("transitionrun"), a1 = $i("transitionstart"), n1 = $i("transitioncancel"), ug = $i("transitionend"), cg = new Map, rd = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
rd.push("scrollEnd");
function da(e, t) { cg.set(e, t), Qi(t, [e]); }
var Qs = typeof reportError === "function" ? reportError : function (e) { if (typeof window === "object" && typeof window.ErrorEvent === "function") {
    var t = new window.ErrorEvent("error", { bubbles: !0, cancelable: !0, message: typeof e === "object" && e !== null && typeof e.message === "string" ? String(e.message) : String(e), error: e });
    if (!window.dispatchEvent(t))
        return;
}
else if (typeof process === "object" && typeof process.emit === "function") {
    process.emit("uncaughtException", e);
    return;
} console.error(e); }, _t = [], xo = 0, Jd = 0;
function du() { for (var e = xo, t = Jd = xo = 0; t < e;) {
    var a = _t[t];
    _t[t++] = null;
    var n = _t[t];
    _t[t++] = null;
    var i = _t[t];
    _t[t++] = null;
    var r = _t[t];
    if (_t[t++] = null, n !== null && i !== null) {
        var o = n.pending;
        o === null ? i.next = i : (i.next = o.next, o.next = i), n.pending = i;
    }
    r !== 0 && dg(a, i, r);
} }
function pu(e, t, a, n) { _t[xo++] = e, _t[xo++] = t, _t[xo++] = a, _t[xo++] = n, Jd |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n); }
function Wd(e, t, a, n) { return pu(e, t, a, n), Ds(e); }
function Gi(e, t) { return pu(e, null, null, t), Ds(e); }
function dg(e, t, a) { e.lanes |= a; var n = e.alternate; n !== null && (n.lanes |= a); for (var i = !1, r = e.return; r !== null;)
    r.childLanes |= a, n = r.alternate, n !== null && (n.childLanes |= a), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (i = !0)), e = r, r = r.return; return e.tag === 3 ? (r = e.stateNode, i && t !== null && (i = 31 - Tt(a), e = r.hiddenUpdates, n = e[i], n === null ? e[i] = [t] : n.push(t), t.lane = a | 536870912), r) : null; }
function Ds(e) { if (50 < Zr)
    throw Zr = 0, Cd = null, Error(N(185)); for (var t = e.return; t !== null;)
    e = t, t = e.return; return e.tag === 3 ? e.stateNode : null; }
var wo = {};
function i1(e, t, a, n) { this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null; }
function wt(e, t, a, n) { return new i1(e, t, a, n); }
function ep(e) { return e = e.prototype, !(!e || !e.isReactComponent); }
function nn(e, t) { var a = e.alternate; return a === null ? (a = wt(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a; }
function pg(e, t) { e.flags &= 65011714; var a = e.alternate; return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), e; }
function xs(e, t, a, n, i, r) { var o = 0; if (n = e, typeof e === "function")
    ep(e) && (o = 1);
else if (typeof e === "string")
    o = cx(e, a, Na.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
else
    e: switch (e) {
        case Yc: return e = wt(31, a, t, i), e.elementType = Yc, e.lanes = r, e;
        case mo: return Ti(a.children, i, r, t);
        case Rh:
            o = 8, i |= 24;
            break;
        case Fc: return e = wt(12, a, t, i | 2), e.elementType = Fc, e.lanes = r, e;
        case jc: return e = wt(13, a, t, i), e.elementType = jc, e.lanes = r, e;
        case Vc: return e = wt(19, a, t, i), e.elementType = Vc, e.lanes = r, e;
        default:
            if (typeof e === "object" && e !== null)
                switch (e.$$typeof) {
                    case en:
                        o = 10;
                        break e;
                    case Ah:
                        o = 9;
                        break e;
                    case Bd:
                        o = 11;
                        break e;
                    case Ld:
                        o = 14;
                        break e;
                    case On:
                        o = 16, n = null;
                        break e;
                }
            o = 29, a = Error(N(130, e === null ? "null" : typeof e, "")), n = null;
    } return t = wt(o, a, t, i), t.elementType = e, t.type = n, t.lanes = r, t; }
function Ti(e, t, a, n) { return e = wt(7, e, n, t), e.lanes = a, e; }
function Sc(e, t, a) { return e = wt(6, e, null, t), e.lanes = a, e; }
function mg(e) { var t = wt(18, null, null, 0); return t.stateNode = e, t; }
function kc(e, t, a) { return t = wt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t; }
var Ef = new WeakMap;
function jt(e, t) { if (typeof e === "object" && e !== null) {
    var a = Ef.get(e);
    if (a !== void 0)
        return a;
    return t = { value: e, source: t, stack: lf(t) }, Ef.set(e, t), t;
} return { value: e, source: t, stack: lf(t) }; }
var So = [], ko = 0, $s = null, tl = 0, Lt = [], Kt = 0, In = null, wa = 1, Sa = "";
function Ja(e, t) { So[ko++] = tl, So[ko++] = $s, $s = e, tl = t; }
function fg(e, t, a) { Lt[Kt++] = wa, Lt[Kt++] = Sa, Lt[Kt++] = In, In = e; var n = wa; e = Sa; var i = 32 - Tt(n) - 1; n &= ~(1 << i), a += 1; var r = 32 - Tt(t) + i; if (30 < r) {
    var o = i - i % 5;
    r = (n & (1 << o) - 1).toString(32), n >>= o, i -= o, wa = 1 << 32 - Tt(t) + i | a << i | n, Sa = r + e;
}
else
    wa = 1 << r | a << i | n, Sa = e; }
function tp(e) { e.return !== null && (Ja(e, 1), fg(e, 1, 0)); }
function ap(e) { for (; e === $s;)
    $s = So[--ko], So[ko] = null, tl = So[--ko], So[ko] = null; for (; e === In;)
    In = Lt[--Kt], Lt[Kt] = null, Sa = Lt[--Kt], Lt[Kt] = null, wa = Lt[--Kt], Lt[Kt] = null; }
function hg(e, t) { Lt[Kt++] = wa, Lt[Kt++] = Sa, Lt[Kt++] = In, wa = t.id, Sa = t.overflow, In = e; }
var Pe = null, xe = null, ee = !1, jn = null, Vt = !1, ld = Error(N(519));
function Jn(e) { var t = Error(N(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")); throw al(jt(t, e)), ld; }
function Cf(e) { var { stateNode: t, type: a, memoizedProps: n } = e; switch (t[Ze] = e, t[ht] = n, a) {
    case "dialog":
        I("cancel", t), I("close", t);
        break;
    case "iframe":
    case "object":
    case "embed":
        I("load", t);
        break;
    case "video":
    case "audio":
        for (a = 0; a < rl.length; a++)
            I(rl[a], t);
        break;
    case "source":
        I("error", t);
        break;
    case "img":
    case "image":
    case "link":
        I("error", t), I("load", t);
        break;
    case "details":
        I("toggle", t);
        break;
    case "input":
        I("invalid", t), jh(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0);
        break;
    case "select":
        I("invalid", t);
        break;
    case "textarea": I("invalid", t), Yh(t, n.value, n.defaultValue, n.children);
} a = n.children, typeof a !== "string" && typeof a !== "number" && typeof a !== "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === !0 || Zb(t.textContent, a) ? (n.popover != null && (I("beforetoggle", t), I("toggle", t)), n.onScroll != null && I("scroll", t), n.onScrollEnd != null && I("scrollend", t), n.onClick != null && (t.onclick = tn), t = !0) : t = !1, t || Jn(e, !0); }
function Mf(e) { for (Pe = e.return; Pe;)
    switch (Pe.tag) {
        case 5:
        case 31:
        case 13:
            Vt = !1;
            return;
        case 27:
        case 3:
            Vt = !0;
            return;
        default: Pe = Pe.return;
    } }
function lo(e) { if (e !== Pe)
    return !1; if (!ee)
    return Mf(e), ee = !0, !1; var t = e.tag, a; if (a = t !== 3 && t !== 27) {
    if (a = t === 5)
        a = e.type, a = !(a !== "form" && a !== "button") || Ud(e.type, e.memoizedProps);
    a = !a;
} if (a && xe && Jn(e), Mf(e), t === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(N(317));
    xe = fh(e);
}
else if (t === 31) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(N(317));
    xe = fh(e);
}
else
    t === 27 ? (t = xe, ai(e.type) ? (e = $d, $d = null, xe = e) : xe = t) : xe = Pe ? Zt(e.stateNode.nextSibling) : null; return !0; }
function Ai() { xe = Pe = null, ee = !1; }
function Nc() { var e = jn; return e !== null && (mt === null ? mt = e : mt.push.apply(mt, e), jn = null), e; }
function al(e) { jn === null ? jn = [e] : jn.push(e); }
var sd = Ta(null), _i = null, an = null;
function Hn(e, t, a) { ge(sd, t._currentValue), t._currentValue = a; }
function on(e) { e._currentValue = sd.current, Ve(sd); }
function ud(e, t, a) { for (; e !== null;) {
    var n = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a)
        break;
    e = e.return;
} }
function cd(e, t, a, n) { var i = e.child; i !== null && (i.return = e); for (; i !== null;) {
    var r = i.dependencies;
    if (r !== null) {
        var o = i.child;
        r = r.firstContext;
        e: for (; r !== null;) {
            var s = r;
            r = i;
            for (var p = 0; p < t.length; p++)
                if (s.context === t[p]) {
                    r.lanes |= a, s = r.alternate, s !== null && (s.lanes |= a), ud(r.return, a, e), n || (o = null);
                    break e;
                }
            r = s.next;
        }
    }
    else if (i.tag === 18) {
        if (o = i.return, o === null)
            throw Error(N(341));
        o.lanes |= a, r = o.alternate, r !== null && (r.lanes |= a), ud(o, a, e), o = null;
    }
    else
        o = i.child;
    if (o !== null)
        o.return = i;
    else
        for (o = i; o !== null;) {
            if (o === e) {
                o = null;
                break;
            }
            if (i = o.sibling, i !== null) {
                i.return = o.return, o = i;
                break;
            }
            o = o.return;
        }
    i = o;
} }
function Fo(e, t, a, n) { e = null; for (var i = t, r = !1; i !== null;) {
    if (!r) {
        if ((i.flags & 524288) !== 0)
            r = !0;
        else if ((i.flags & 262144) !== 0)
            break;
    }
    if (i.tag === 10) {
        var o = i.alternate;
        if (o === null)
            throw Error(N(387));
        if (o = o.memoizedProps, o !== null) {
            var s = i.type;
            Et(i.pendingProps.value, o.value) || (e !== null ? e.push(s) : e = [s]);
        }
    }
    else if (i === As.current) {
        if (o = i.alternate, o === null)
            throw Error(N(387));
        o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(sl) : e = [sl]);
    }
    i = i.return;
} e !== null && cd(t, e, a, n), t.flags |= 262144; }
function Gs(e) { for (e = e.firstContext; e !== null;) {
    if (!Et(e.context._currentValue, e.memoizedValue))
        return !0;
    e = e.next;
} return !1; }
function zi(e) { _i = e, an = null, e = e.dependencies, e !== null && (e.firstContext = null); }
function Ie(e) { return gg(_i, e); }
function ls(e, t) { return _i === null && zi(e), gg(e, t); }
function gg(e, t) { var a = t._currentValue; if (t = { context: t, memoizedValue: a, next: null }, an === null) {
    if (e === null)
        throw Error(N(308));
    an = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
}
else
    an = an.next = t; return a; }
var o1 = typeof AbortController < "u" ? AbortController : function () { var e = [], t = this.signal = { aborted: !1, addEventListener: function (a, n) { e.push(n); } }; this.abort = function () { t.aborted = !0, e.forEach(function (a) { return a(); }); }; }, r1 = bi, l1 = gi, He = { $$typeof: en, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
function np() { return { controller: new o1, data: new Map, refCount: 0 }; }
function bl(e) { e.refCount--, e.refCount === 0 && r1(l1, function () { e.controller.abort(); }); }
var Br = null, dd = 0, Ho = 0, Mo = null;
function s1(e, t) { if (Br === null) {
    var a = Br = [];
    dd = 0, Ho = Mp(), Mo = { status: "pending", value: void 0, then: function (n) { a.push(n); } };
} return dd++, t.then(qf, qf), t; }
function qf() { if (--dd === 0 && Br !== null) {
    Mo !== null && (Mo.status = "fulfilled");
    var e = Br;
    Br = null, Ho = 0, Mo = null;
    for (var t = 0; t < e.length; t++)
        (0, e[t])();
} }
function u1(e, t) { var a = [], n = { status: "pending", value: null, reason: null, then: function (i) { a.push(i); } }; return e.then(function () { n.status = "fulfilled", n.value = t; for (var i = 0; i < a.length; i++)
    (0, a[i])(t); }, function (i) { n.status = "rejected", n.reason = i; for (i = 0; i < a.length; i++)
    (0, a[i])(void 0); }), n; }
var Rf = K.S;
K.S = function (e, t) { Cb = kt(), typeof t === "object" && t !== null && typeof t.then === "function" && s1(e, t), Rf !== null && Rf(e, t); };
var Ei = Ta(null);
function ip() { var e = Ei.current; return e !== null ? e : me.pooledCache; }
function ws(e, t) { t === null ? ge(Ei, Ei.current) : ge(Ei, t.pool); }
function bg() { var e = ip(); return e === null ? null : { parent: He._currentValue, pool: e }; }
var jo = Error(N(460)), op = Error(N(474)), mu = Error(N(542)), _s = { then: function () { } };
function Af(e) { return e = e.status, e === "fulfilled" || e === "rejected"; }
function vg(e, t, a) { switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(tn, tn), t = a), t.status) {
    case "fulfilled": return t.value;
    case "rejected": throw e = t.reason, Of(e), e;
    default:
        if (typeof t.status === "string")
            t.then(tn, tn);
        else {
            if (e = me, e !== null && 100 < e.shellSuspendCounter)
                throw Error(N(482));
            e = t, e.status = "pending", e.then(function (n) { if (t.status === "pending") {
                var i = t;
                i.status = "fulfilled", i.value = n;
            } }, function (n) { if (t.status === "pending") {
                var i = t;
                i.status = "rejected", i.reason = n;
            } });
        }
        switch (t.status) {
            case "fulfilled": return t.value;
            case "rejected": throw e = t.reason, Of(e), e;
        }
        throw Ci = t, jo;
} }
function Si(e) { try {
    var t = e._init;
    return t(e._payload);
}
catch (a) {
    if (a !== null && typeof a === "object" && typeof a.then === "function")
        throw Ci = a, jo;
    throw a;
} }
var Ci = null;
function zf() { if (Ci === null)
    throw Error(N(459)); var e = Ci; return Ci = null, e; }
function Of(e) { if (e === jo || e === mu)
    throw Error(N(483)); }
var qo = null, nl = 0;
function ss(e) { var t = nl; return nl += 1, qo === null && (qo = []), vg(qo, e, t); }
function Tr(e, t) { t = t.props.ref, e.ref = t !== void 0 ? t : null; }
function us(e, t) { if (t.$$typeof === Zy)
    throw Error(N(525)); throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)); }
function yg(e) { function t(g, m) { if (e) {
    var y = g.deletions;
    y === null ? (g.deletions = [m], g.flags |= 16) : y.push(m);
} } function a(g, m) { if (!e)
    return null; for (; m !== null;)
    t(g, m), m = m.sibling; return null; } function n(g) { for (var m = new Map; g !== null;)
    g.key !== null ? m.set(g.key, g) : m.set(g.index, g), g = g.sibling; return m; } function i(g, m) { return g = nn(g, m), g.index = 0, g.sibling = null, g; } function r(g, m, y) { if (g.index = y, !e)
    return g.flags |= 1048576, m; if (y = g.alternate, y !== null)
    return y = y.index, y < m ? (g.flags |= 67108866, m) : y; return g.flags |= 67108866, m; } function o(g) { return e && g.alternate === null && (g.flags |= 67108866), g; } function s(g, m, y, w) { if (m === null || m.tag !== 6)
    return m = Sc(y, g.mode, w), m.return = g, m; return m = i(m, y), m.return = g, m; } function p(g, m, y, w) { var R = y.type; if (R === mo)
    return b(g, m, y.props.children, w, y.key); if (m !== null && (m.elementType === R || typeof R === "object" && R !== null && R.$$typeof === On && Si(R) === m.type))
    return m = i(m, y.props), Tr(m, y), m.return = g, m; return m = xs(y.type, y.key, y.props, null, g.mode, w), Tr(m, y), m.return = g, m; } function f(g, m, y, w) { if (m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation)
    return m = kc(y, g.mode, w), m.return = g, m; return m = i(m, y.children || []), m.return = g, m; } function b(g, m, y, w, R) { if (m === null || m.tag !== 7)
    return m = Ti(y, g.mode, w, R), m.return = g, m; return m = i(m, y), m.return = g, m; } function x(g, m, y) { if (typeof m === "string" && m !== "" || typeof m === "number" || typeof m === "bigint")
    return m = Sc("" + m, g.mode, y), m.return = g, m; if (typeof m === "object" && m !== null) {
    switch (m.$$typeof) {
        case ts: return y = xs(m.type, m.key, m.props, null, g.mode, y), Tr(y, m), y.return = g, y;
        case qr: return m = kc(m, g.mode, y), m.return = g, m;
        case On: return m = Si(m), x(g, m, y);
    }
    if (Rr(m) || kr(m))
        return m = Ti(m, g.mode, y, null), m.return = g, m;
    if (typeof m.then === "function")
        return x(g, ss(m), y);
    if (m.$$typeof === en)
        return x(g, ls(g, m), y);
    us(g, m);
} return null; } function h(g, m, y, w) { var R = m !== null ? m.key : null; if (typeof y === "string" && y !== "" || typeof y === "number" || typeof y === "bigint")
    return R !== null ? null : s(g, m, "" + y, w); if (typeof y === "object" && y !== null) {
    switch (y.$$typeof) {
        case ts: return y.key === R ? p(g, m, y, w) : null;
        case qr: return y.key === R ? f(g, m, y, w) : null;
        case On: return y = Si(y), h(g, m, y, w);
    }
    if (Rr(y) || kr(y))
        return R !== null ? null : b(g, m, y, w, null);
    if (typeof y.then === "function")
        return h(g, m, ss(y), w);
    if (y.$$typeof === en)
        return h(g, m, ls(g, y), w);
    us(g, y);
} return null; } function v(g, m, y, w, R) { if (typeof w === "string" && w !== "" || typeof w === "number" || typeof w === "bigint")
    return g = g.get(y) || null, s(m, g, "" + w, R); if (typeof w === "object" && w !== null) {
    switch (w.$$typeof) {
        case ts: return g = g.get(w.key === null ? y : w.key) || null, p(m, g, w, R);
        case qr: return g = g.get(w.key === null ? y : w.key) || null, f(m, g, w, R);
        case On: return w = Si(w), v(g, m, y, w, R);
    }
    if (Rr(w) || kr(w))
        return g = g.get(y) || null, b(m, g, w, R, null);
    if (typeof w.then === "function")
        return v(g, m, y, ss(w), R);
    if (w.$$typeof === en)
        return v(g, m, y, ls(m, w), R);
    us(m, w);
} return null; } function T(g, m, y, w) { for (var R = null, D = null, q = m, H = m = 0, B = null; q !== null && H < y.length; H++) {
    q.index > H ? (B = q, q = null) : B = q.sibling;
    var F = h(g, q, y[H], w);
    if (F === null) {
        q === null && (q = B);
        break;
    }
    e && q && F.alternate === null && t(g, q), m = r(F, m, H), D === null ? R = F : D.sibling = F, D = F, q = B;
} if (H === y.length)
    return a(g, q), ee && Ja(g, H), R; if (q === null) {
    for (; H < y.length; H++)
        q = x(g, y[H], w), q !== null && (m = r(q, m, H), D === null ? R = q : D.sibling = q, D = q);
    return ee && Ja(g, H), R;
} for (q = n(q); H < y.length; H++)
    B = v(q, g, H, y[H], w), B !== null && (e && B.alternate !== null && q.delete(B.key === null ? H : B.key), m = r(B, m, H), D === null ? R = B : D.sibling = B, D = B); return e && q.forEach(function (ae) { return t(g, ae); }), ee && Ja(g, H), R; } function k(g, m, y, w) { if (y == null)
    throw Error(N(151)); for (var R = null, D = null, q = m, H = m = 0, B = null, F = y.next(); q !== null && !F.done; H++, F = y.next()) {
    q.index > H ? (B = q, q = null) : B = q.sibling;
    var ae = h(g, q, F.value, w);
    if (ae === null) {
        q === null && (q = B);
        break;
    }
    e && q && ae.alternate === null && t(g, q), m = r(ae, m, H), D === null ? R = ae : D.sibling = ae, D = ae, q = B;
} if (F.done)
    return a(g, q), ee && Ja(g, H), R; if (q === null) {
    for (; !F.done; H++, F = y.next())
        F = x(g, F.value, w), F !== null && (m = r(F, m, H), D === null ? R = F : D.sibling = F, D = F);
    return ee && Ja(g, H), R;
} for (q = n(q); !F.done; H++, F = y.next())
    F = v(q, g, H, F.value, w), F !== null && (e && F.alternate !== null && q.delete(F.key === null ? H : F.key), m = r(F, m, H), D === null ? R = F : D.sibling = F, D = F); return e && q.forEach(function (De) { return t(g, De); }), ee && Ja(g, H), R; } function M(g, m, y, w) { if (typeof y === "object" && y !== null && y.type === mo && y.key === null && (y = y.props.children), typeof y === "object" && y !== null) {
    switch (y.$$typeof) {
        case ts:
            e: {
                for (var R = y.key; m !== null;) {
                    if (m.key === R) {
                        if (R = y.type, R === mo) {
                            if (m.tag === 7) {
                                a(g, m.sibling), w = i(m, y.props.children), w.return = g, g = w;
                                break e;
                            }
                        }
                        else if (m.elementType === R || typeof R === "object" && R !== null && R.$$typeof === On && Si(R) === m.type) {
                            a(g, m.sibling), w = i(m, y.props), Tr(w, y), w.return = g, g = w;
                            break e;
                        }
                        a(g, m);
                        break;
                    }
                    else
                        t(g, m);
                    m = m.sibling;
                }
                y.type === mo ? (w = Ti(y.props.children, g.mode, w, y.key), w.return = g, g = w) : (w = xs(y.type, y.key, y.props, null, g.mode, w), Tr(w, y), w.return = g, g = w);
            }
            return o(g);
        case qr:
            e: {
                for (R = y.key; m !== null;) {
                    if (m.key === R)
                        if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                            a(g, m.sibling), w = i(m, y.children || []), w.return = g, g = w;
                            break e;
                        }
                        else {
                            a(g, m);
                            break;
                        }
                    else
                        t(g, m);
                    m = m.sibling;
                }
                w = kc(y, g.mode, w), w.return = g, g = w;
            }
            return o(g);
        case On: return y = Si(y), M(g, m, y, w);
    }
    if (Rr(y))
        return T(g, m, y, w);
    if (kr(y)) {
        if (R = kr(y), typeof R !== "function")
            throw Error(N(150));
        return y = R.call(y), k(g, m, y, w);
    }
    if (typeof y.then === "function")
        return M(g, m, ss(y), w);
    if (y.$$typeof === en)
        return M(g, m, ls(g, y), w);
    us(g, y);
} return typeof y === "string" && y !== "" || typeof y === "number" || typeof y === "bigint" ? (y = "" + y, m !== null && m.tag === 6 ? (a(g, m.sibling), w = i(m, y), w.return = g, g = w) : (a(g, m), w = Sc(y, g.mode, w), w.return = g, g = w), o(g)) : a(g, m); } return function (g, m, y, w) { try {
    nl = 0;
    var R = M(g, m, y, w);
    return qo = null, R;
}
catch (q) {
    if (q === jo || q === mu)
        throw q;
    var D = wt(29, q, null, g.mode);
    return D.lanes = w, D.return = g, D;
}
finally { } }; }
var Oi = yg(!0), xg = yg(!1), Un = !1;
function rp(e) { e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null }; }
function pd(e, t) { e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, callbacks: null }); }
function Mi(e) { return { lane: e, tag: 0, payload: null, callback: null, next: null }; }
function qi(e, t, a) { var n = e.updateQueue; if (n === null)
    return null; if (n = n.shared, (ne & 2) !== 0) {
    var i = n.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), n.pending = t, t = Ds(e), dg(e, null, a), t;
} return pu(e, n, t, a), Ds(e); }
function Lr(e, t, a) { if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
    var n = t.lanes;
    n &= e.pendingLanes, a |= n, t.lanes = a, Dh(e, a);
} }
function Tc(e, t) { var a = e.updateQueue, n = e.alternate; if (n !== null && (n = n.updateQueue, a === n)) {
    var i = null, r = null;
    if (a = a.firstBaseUpdate, a !== null) {
        do {
            var o = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
            r === null ? i = r = o : r = r.next = o, a = a.next;
        } while (a !== null);
        r === null ? i = r = t : r = r.next = t;
    }
    else
        i = r = t;
    a = { baseState: n.baseState, firstBaseUpdate: i, lastBaseUpdate: r, shared: n.shared, callbacks: n.callbacks }, e.updateQueue = a;
    return;
} e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t; }
var md = !1;
function Kr() { if (md) {
    var e = Mo;
    if (e !== null)
        throw e;
} }
function Fr(e, t, a, n) { md = !1; var i = e.updateQueue; Un = !1; var { firstBaseUpdate: r, lastBaseUpdate: o } = i, s = i.shared.pending; if (s !== null) {
    i.shared.pending = null;
    var p = s, f = p.next;
    p.next = null, o === null ? r = f : o.next = f, o = p;
    var b = e.alternate;
    b !== null && (b = b.updateQueue, s = b.lastBaseUpdate, s !== o && (s === null ? b.firstBaseUpdate = f : s.next = f, b.lastBaseUpdate = p));
} if (r !== null) {
    var x = i.baseState;
    o = 0, b = f = p = null, s = r;
    do {
        var h = s.lane & -536870913, v = h !== s.lane;
        if (v ? (W & h) === h : (n & h) === h) {
            h !== 0 && h === Ho && (md = !0), b !== null && (b = b.next = { lane: 0, tag: s.tag, payload: s.payload, callback: null, next: null });
            e: {
                var T = e, k = s;
                h = t;
                var M = a;
                switch (k.tag) {
                    case 1:
                        if (T = k.payload, typeof T === "function") {
                            x = T.call(M, x, h);
                            break e;
                        }
                        x = T;
                        break e;
                    case 3: T.flags = T.flags & -65537 | 128;
                    case 0:
                        if (T = k.payload, h = typeof T === "function" ? T.call(M, x, h) : T, h === null || h === void 0)
                            break e;
                        x = we({}, x, h);
                        break e;
                    case 2: Un = !0;
                }
            }
            h = s.callback, h !== null && (e.flags |= 64, v && (e.flags |= 8192), v = i.callbacks, v === null ? i.callbacks = [h] : v.push(h));
        }
        else
            v = { lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, b === null ? (f = b = v, p = x) : b = b.next = v, o |= h;
        if (s = s.next, s === null)
            if (s = i.shared.pending, s === null)
                break;
            else
                v = s, s = v.next, v.next = null, i.lastBaseUpdate = v, i.shared.pending = null;
    } while (1);
    b === null && (p = x), i.baseState = p, i.firstBaseUpdate = f, i.lastBaseUpdate = b, r === null && (i.shared.lanes = 0), ei |= o, e.lanes = o, e.memoizedState = x;
} }
function wg(e, t) { if (typeof e !== "function")
    throw Error(N(191, e)); e.call(t); }
function Sg(e, t) { var a = e.callbacks; if (a !== null)
    for (e.callbacks = null, e = 0; e < a.length; e++)
        wg(a[e], t); }
var Qo = Ta(null), Bs = Ta(0);
function Uf(e, t) { e = dn, ge(Bs, e), ge(Qo, t), dn = e | t.baseLanes; }
function fd() { ge(Bs, dn), ge(Qo, Qo.current); }
function lp() { dn = Bs.current, Ve(Qo), Ve(Bs); }
var Ct = Ta(null), Yt = null;
function Qn(e) { var t = e.alternate; ge(Re, Re.current & 1), ge(Ct, e), Yt === null && (t === null || Qo.current !== null ? Yt = e : t.memoizedState !== null && (Yt = e)); }
function hd(e) { ge(Re, Re.current), ge(Ct, e), Yt === null && (Yt = e); }
function kg(e) { e.tag === 22 ? (ge(Re, Re.current), ge(Ct, e), Yt === null && (Yt = e)) : Dn(e); }
function Dn() { ge(Re, Re.current), ge(Ct, Ct.current); }
function xt(e) { Ve(Ct), Yt === e && (Yt = null), Ve(Re); }
var Re = Ta(0);
function Ls(e) { for (var t = e; t !== null;) {
    if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Qd(a) || Dd(a)))
            return t;
    }
    else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0)
            return t;
    }
    else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
    }
    if (t === e)
        break;
    for (; t.sibling === null;) {
        if (t.return === null || t.return === e)
            return null;
        t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
} return null; }
var sn = 0, Y = null, de = null, Oe = null, Ks = !1, Ro = !1, Ui = !1, Fs = 0, il = 0, Ao = null, c1 = 0;
function Ee() { throw Error(N(321)); }
function sp(e, t) { if (t === null)
    return !1; for (var a = 0; a < t.length && a < e.length; a++)
    if (!Et(e[a], t[a]))
        return !1; return !0; }
function up(e, t, a, n, i, r) { return sn = r, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, K.H = e === null || e.memoizedState === null ? eb : xp, Ui = !1, r = a(n, i), Ui = !1, Ro && (r = Tg(t, a, n, i)), Ng(e), r; }
function Ng(e) { K.H = ol; var t = de !== null && de.next !== null; if (sn = 0, Oe = de = Y = null, Ks = !1, il = 0, Ao = null, t)
    throw Error(N(300)); e === null || Qe || (e = e.dependencies, e !== null && Gs(e) && (Qe = !0)); }
function Tg(e, t, a, n) { Y = e; var i = 0; do {
    if (Ro && (Ao = null), il = 0, Ro = !1, 25 <= i)
        throw Error(N(301));
    if (i += 1, Oe = de = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
    }
    K.H = tb, r = t(a, n);
} while (Ro); return r; }
function d1() { var e = K.H, t = e.useState()[0]; return t = typeof t.then === "function" ? vl(t) : t, e = e.useState()[0], (de !== null ? de.memoizedState : null) !== e && (Y.flags |= 1024), t; }
function cp() { var e = Fs !== 0; return Fs = 0, e; }
function dp(e, t, a) { t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a; }
function pp(e) { if (Ks) {
    for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
    }
    Ks = !1;
} sn = 0, Oe = de = Y = null, Ro = !1, il = Fs = 0, Ao = null; }
function lt() { var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }; return Oe === null ? Y.memoizedState = Oe = e : Oe = Oe.next = e, Oe; }
function Ae() { if (de === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
}
else
    e = de.next; var t = Oe === null ? Y.memoizedState : Oe.next; if (t !== null)
    Oe = t, de = e;
else {
    if (e === null) {
        if (Y.alternate === null)
            throw Error(N(467));
        throw Error(N(310));
    }
    de = e, e = { memoizedState: de.memoizedState, baseState: de.baseState, baseQueue: de.baseQueue, queue: de.queue, next: null }, Oe === null ? Y.memoizedState = Oe = e : Oe = Oe.next = e;
} return Oe; }
function fu() { return { lastEffect: null, events: null, stores: null, memoCache: null }; }
function vl(e) { var t = il; return il += 1, Ao === null && (Ao = []), e = vg(Ao, e, t), t = Y, (Oe === null ? t.memoizedState : Oe.next) === null && (t = t.alternate, K.H = t === null || t.memoizedState === null ? eb : xp), e; }
function hu(e) { if (e !== null && typeof e === "object") {
    if (typeof e.then === "function")
        return vl(e);
    if (e.$$typeof === en)
        return Ie(e);
} throw Error(N(438, String(e))); }
function mp(e) { var t = null, a = Y.updateQueue; if (a !== null && (t = a.memoCache), t == null) {
    var n = Y.alternate;
    n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = { data: n.data.map(function (i) { return i.slice(); }), index: 0 })));
} if (t == null && (t = { data: [], index: 0 }), a === null && (a = fu(), Y.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
    for (a = t.data[t.index] = Array(e), n = 0; n < e; n++)
        a[n] = Py; return t.index++, a; }
function un(e, t) { return typeof t === "function" ? t(e) : t; }
function Ss(e) { var t = Ae(); return fp(t, de, e); }
function fp(e, t, a) { var n = e.queue; if (n === null)
    throw Error(N(311)); n.lastRenderedReducer = a; var i = e.baseQueue, r = n.pending; if (r !== null) {
    if (i !== null) {
        var o = i.next;
        i.next = r.next, r.next = o;
    }
    t.baseQueue = i = r, n.pending = null;
} if (r = e.baseState, i === null)
    e.memoizedState = r;
else {
    t = i.next;
    var s = o = null, p = null, f = t, b = !1;
    do {
        var x = f.lane & -536870913;
        if (x !== f.lane ? (W & x) === x : (sn & x) === x) {
            var h = f.revertLane;
            if (h === 0)
                p !== null && (p = p.next = { lane: 0, revertLane: 0, gesture: null, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }), x === Ho && (b = !0);
            else if ((sn & h) === h) {
                f = f.next, h === Ho && (b = !0);
                continue;
            }
            else
                x = { lane: 0, revertLane: f.revertLane, gesture: null, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }, p === null ? (s = p = x, o = r) : p = p.next = x, Y.lanes |= h, ei |= h;
            x = f.action, Ui && a(r, x), r = f.hasEagerState ? f.eagerState : a(r, x);
        }
        else
            h = { lane: x, revertLane: f.revertLane, gesture: f.gesture, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }, p === null ? (s = p = h, o = r) : p = p.next = h, Y.lanes |= x, ei |= x;
        f = f.next;
    } while (f !== null && f !== t);
    if (p === null ? o = r : p.next = s, !Et(r, e.memoizedState) && (Qe = !0, b && (a = Mo, a !== null)))
        throw a;
    e.memoizedState = r, e.baseState = o, e.baseQueue = p, n.lastRenderedState = r;
} return i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]; }
function Ec(e) { var t = Ae(), a = t.queue; if (a === null)
    throw Error(N(311)); a.lastRenderedReducer = e; var { dispatch: n, pending: i } = a, r = t.memoizedState; if (i !== null) {
    a.pending = null;
    var o = i = i.next;
    do
        r = e(r, o.action), o = o.next;
    while (o !== i);
    Et(r, t.memoizedState) || (Qe = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), a.lastRenderedState = r;
} return [r, n]; }
function Eg(e, t, a) { var n = Y, i = Ae(), r = ee; if (r) {
    if (a === void 0)
        throw Error(N(407));
    a = a();
}
else
    a = t(); var o = !Et((de || i).memoizedState, a); if (o && (i.memoizedState = a, Qe = !0), i = i.queue, hp(qg.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || Oe !== null && Oe.memoizedState.tag & 1) {
    if (n.flags |= 2048, Do(9, { destroy: void 0 }, Mg.bind(null, n, i, a, t), null), me === null)
        throw Error(N(349));
    r || (sn & 127) !== 0 || Cg(n, t, a);
} return a; }
function Cg(e, t, a) { e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Y.updateQueue, t === null ? (t = fu(), Y.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e)); }
function Mg(e, t, a, n) { t.value = a, t.getSnapshot = n, Rg(t) && Ag(e); }
function qg(e, t, a) { return a(function () { Rg(t) && Ag(e); }); }
function Rg(e) { var t = e.getSnapshot; e = e.value; try {
    var a = t();
    return !Et(e, a);
}
catch (n) {
    return !0;
} }
function Ag(e) { var t = Gi(e, 2); t !== null && ft(t, e, 2); }
function gd(e) { var t = lt(); if (typeof e === "function") {
    var a = e;
    if (e = a(), Ui) {
        Gn(!0);
        try {
            a();
        }
        finally {
            Gn(!1);
        }
    }
} return t.memoizedState = t.baseState = e, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: un, lastRenderedState: e }, t; }
function zg(e, t, a, n) { return e.baseState = a, fp(e, de, typeof n === "function" ? n : un); }
function p1(e, t, a, n, i) { if (bu(e))
    throw Error(N(485)); if (e = t.action, e !== null) {
    var r = { payload: i, action: e, next: null, isTransition: !0, status: "pending", value: null, reason: null, listeners: [], then: function (o) { r.listeners.push(o); } };
    K.T !== null ? a(!0) : r.isTransition = !1, n(r), a = t.pending, a === null ? (r.next = t.pending = r, Og(t, r)) : (r.next = a.next, t.pending = a.next = r);
} }
function Og(e, t) { var { action: a, payload: n } = t, i = e.state; if (t.isTransition) {
    var r = K.T, o = {};
    K.T = o;
    try {
        var s = a(i, n), p = K.S;
        p !== null && p(o, s), Hf(e, t, s);
    }
    catch (f) {
        bd(e, t, f);
    }
    finally {
        r !== null && o.types !== null && (r.types = o.types), K.T = r;
    }
}
else
    try {
        r = a(i, n), Hf(e, t, r);
    }
    catch (f) {
        bd(e, t, f);
    } }
function Hf(e, t, a) { a !== null && typeof a === "object" && typeof a.then === "function" ? a.then(function (n) { Qf(e, t, n); }, function (n) { return bd(e, t, n); }) : Qf(e, t, a); }
function Qf(e, t, a) { t.status = "fulfilled", t.value = a, Ug(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Og(e, a))); }
function bd(e, t, a) { var n = e.pending; if (e.pending = null, n !== null) {
    n = n.next;
    do
        t.status = "rejected", t.reason = a, Ug(t), t = t.next;
    while (t !== n);
} e.action = null; }
function Ug(e) { e = e.listeners; for (var t = 0; t < e.length; t++)
    (0, e[t])(); }
function Hg(e, t) { return t; }
function Df(e, t) { if (ee) {
    var a = me.formState;
    if (a !== null) {
        e: {
            var n = Y;
            if (ee) {
                if (xe) {
                    t: {
                        var i = xe;
                        for (var r = Vt; i.nodeType !== 8;) {
                            if (!r) {
                                i = null;
                                break t;
                            }
                            if (i = Zt(i.nextSibling), i === null) {
                                i = null;
                                break t;
                            }
                        }
                        r = i.data, i = r === "F!" || r === "F" ? i : null;
                    }
                    if (i) {
                        xe = Zt(i.nextSibling), n = i.data === "F!";
                        break e;
                    }
                }
                Jn(n);
            }
            n = !1;
        }
        n && (t = a[0]);
    }
} return a = lt(), a.memoizedState = a.baseState = t, n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Hg, lastRenderedState: t }, a.queue = n, a = Ig.bind(null, Y, n), n.dispatch = a, n = gd(!1), r = yp.bind(null, Y, !1, n.queue), n = lt(), i = { state: t, dispatch: null, action: e, pending: null }, n.queue = i, a = p1.bind(null, Y, i, r, a), i.dispatch = a, n.memoizedState = e, [t, a, !1]; }
function $f(e) { var t = Ae(); return Qg(t, de, e); }
function Qg(e, t, a) { if (t = fp(e, t, Hg)[0], e = Ss(un)[0], typeof t === "object" && t !== null && typeof t.then === "function")
    try {
        var n = vl(t);
    }
    catch (o) {
        if (o === jo)
            throw mu;
        throw o;
    }
else
    n = t; t = Ae(); var i = t.queue, r = i.dispatch; return a !== t.memoizedState && (Y.flags |= 2048, Do(9, { destroy: void 0 }, m1.bind(null, i, a), null)), [n, r, e]; }
function m1(e, t) { e.action = t; }
function Gf(e) { var t = Ae(), a = de; if (a !== null)
    return Qg(t, a, e); Ae(), t = t.memoizedState, a = Ae(); var n = a.queue.dispatch; return a.memoizedState = e, [t, n, !1]; }
function Do(e, t, a, n) { return e = { tag: e, create: a, deps: n, inst: t, next: null }, t = Y.updateQueue, t === null && (t = fu(), Y.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e; }
function Dg() { return Ae().memoizedState; }
function ks(e, t, a, n) { var i = lt(); Y.flags |= e, i.memoizedState = Do(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n); }
function gu(e, t, a, n) { var i = Ae(); n = n === void 0 ? null : n; var r = i.memoizedState.inst; de !== null && n !== null && sp(n, de.memoizedState.deps) ? i.memoizedState = Do(t, r, a, n) : (Y.flags |= e, i.memoizedState = Do(1 | t, r, a, n)); }
function _f(e, t) { ks(8390656, 8, e, t); }
function hp(e, t) { gu(2048, 8, e, t); }
function f1(e) { Y.flags |= 4; var t = Y.updateQueue; if (t === null)
    t = fu(), Y.updateQueue = t, t.events = [e];
else {
    var a = t.events;
    a === null ? t.events = [e] : a.push(e);
} }
function $g(e) { var t = Ae().memoizedState; return f1({ ref: t, nextImpl: e }), function () { if ((ne & 2) !== 0)
    throw Error(N(440)); return t.impl.apply(void 0, arguments); }; }
function Gg(e, t) { return gu(4, 2, e, t); }
function _g(e, t) { return gu(4, 4, e, t); }
function Bg(e, t) { if (typeof t === "function") {
    e = e();
    var a = t(e);
    return function () { typeof a === "function" ? a() : t(null); };
} if (t !== null && t !== void 0)
    return e = e(), t.current = e, function () { t.current = null; }; }
function Lg(e, t, a) { a = a !== null && a !== void 0 ? a.concat([e]) : null, gu(4, 4, Bg.bind(null, t, e), a); }
function gp() { }
function Kg(e, t) { var a = Ae(); t = t === void 0 ? null : t; var n = a.memoizedState; if (t !== null && sp(t, n[1]))
    return n[0]; return a.memoizedState = [e, t], e; }
function Fg(e, t) { var a = Ae(); t = t === void 0 ? null : t; var n = a.memoizedState; if (t !== null && sp(t, n[1]))
    return n[0]; if (n = e(), Ui) {
    Gn(!0);
    try {
        e();
    }
    finally {
        Gn(!1);
    }
} return a.memoizedState = [n, t], n; }
function bp(e, t, a) { if (a === void 0 || (sn & 1073741824) !== 0 && (W & 261930) === 0)
    return e.memoizedState = t; return e.memoizedState = a, e = qb(), Y.lanes |= e, ei |= e, a; }
function jg(e, t, a, n) { if (Et(a, t))
    return a; if (Qo.current !== null)
    return e = bp(e, a, n), Et(e, t) || (Qe = !0), e; if ((sn & 42) === 0 || (sn & 1073741824) !== 0 && (W & 261930) === 0)
    return Qe = !0, e.memoizedState = a; return e = qb(), Y.lanes |= e, ei |= e, t; }
function Vg(e, t, a, n, i) { var r = ie.p; ie.p = r !== 0 && 8 > r ? r : 8; var o = K.T, s = {}; K.T = s, yp(e, !1, t, a); try {
    var p = i(), f = K.S;
    if (f !== null && f(s, p), p !== null && typeof p === "object" && typeof p.then === "function") {
        var b = u1(p, n);
        jr(e, t, b, Xt(e));
    }
    else
        jr(e, t, n, Xt(e));
}
catch (x) {
    jr(e, t, { then: function () { }, status: "rejected", reason: x }, Xt());
}
finally {
    ie.p = r, o !== null && s.types !== null && (o.types = s.types), K.T = o;
} }
function h1() { }
function vd(e, t, a, n) { if (e.tag !== 5)
    throw Error(N(476)); var i = Yg(e).queue; Vg(e, i, t, Ni, a === null ? h1 : function () { return Xg(e), a(n); }); }
function Yg(e) { var t = e.memoizedState; if (t !== null)
    return t; t = { memoizedState: Ni, baseState: Ni, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: un, lastRenderedState: Ni }, next: null }; var a = {}; return t.next = { memoizedState: a, baseState: a, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: un, lastRenderedState: a }, next: null }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t; }
function Xg(e) { var t = Yg(e); t.next === null && (t = e.alternate.memoizedState), jr(e, t.next.queue, {}, Xt()); }
function vp() { return Ie(sl); }
function Zg() { return Ae().memoizedState; }
function Pg() { return Ae().memoizedState; }
function g1(e) { for (var t = e.return; t !== null;) {
    switch (t.tag) {
        case 24:
        case 3:
            var a = Xt();
            e = Mi(a);
            var n = qi(t, e, a);
            n !== null && (ft(n, t, a), Lr(n, t, a)), t = { cache: np() }, e.payload = t;
            return;
    }
    t = t.return;
} }
function b1(e, t, a) { var n = Xt(); a = { lane: n, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }, bu(e) ? Jg(t, a) : (a = Wd(e, t, a, n), a !== null && (ft(a, e, n), Wg(a, t, n))); }
function Ig(e, t, a) { var n = Xt(); jr(e, t, a, n); }
function jr(e, t, a, n) { var i = { lane: n, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }; if (bu(e))
    Jg(t, i);
else {
    var r = e.alternate;
    if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
            var o = t.lastRenderedState, s = r(o, a);
            if (i.hasEagerState = !0, i.eagerState = s, Et(s, o))
                return pu(e, t, i, 0), me === null && du(), !1;
        }
        catch (p) { }
        finally { }
    if (a = Wd(e, t, i, n), a !== null)
        return ft(a, e, n), Wg(a, t, n), !0;
} return !1; }
function yp(e, t, a, n) { if (n = { lane: 2, revertLane: Mp(), gesture: null, action: n, hasEagerState: !1, eagerState: null, next: null }, bu(e)) {
    if (t)
        throw Error(N(479));
}
else
    t = Wd(e, a, n, 2), t !== null && ft(t, e, 2); }
function bu(e) { var t = e.alternate; return e === Y || t !== null && t === Y; }
function Jg(e, t) { Ro = Ks = !0; var a = e.pending; a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t; }
function Wg(e, t, a) { if ((a & 4194048) !== 0) {
    var n = t.lanes;
    n &= e.pendingLanes, a |= n, t.lanes = a, Dh(e, a);
} }
var ol = { readContext: Ie, use: hu, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useLayoutEffect: Ee, useInsertionEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useSyncExternalStore: Ee, useId: Ee, useHostTransitionStatus: Ee, useFormState: Ee, useActionState: Ee, useOptimistic: Ee, useMemoCache: Ee, useCacheRefresh: Ee };
ol.useEffectEvent = Ee;
var eb = { readContext: Ie, use: hu, useCallback: function (e, t) { return lt().memoizedState = [e, t === void 0 ? null : t], e; }, useContext: Ie, useEffect: _f, useImperativeHandle: function (e, t, a) { a = a !== null && a !== void 0 ? a.concat([e]) : null, ks(4194308, 4, Bg.bind(null, t, e), a); }, useLayoutEffect: function (e, t) { return ks(4194308, 4, e, t); }, useInsertionEffect: function (e, t) { ks(4, 2, e, t); }, useMemo: function (e, t) { var a = lt(); t = t === void 0 ? null : t; var n = e(); if (Ui) {
        Gn(!0);
        try {
            e();
        }
        finally {
            Gn(!1);
        }
    } return a.memoizedState = [n, t], n; }, useReducer: function (e, t, a) { var n = lt(); if (a !== void 0) {
        var i = a(t);
        if (Ui) {
            Gn(!0);
            try {
                a(t);
            }
            finally {
                Gn(!1);
            }
        }
    }
    else
        i = t; return n.memoizedState = n.baseState = i, e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: i }, n.queue = e, e = e.dispatch = b1.bind(null, Y, e), [n.memoizedState, e]; }, useRef: function (e) { var t = lt(); return e = { current: e }, t.memoizedState = e; }, useState: function (e) { e = gd(e); var t = e.queue, a = Ig.bind(null, Y, t); return t.dispatch = a, [e.memoizedState, a]; }, useDebugValue: gp, useDeferredValue: function (e, t) { var a = lt(); return bp(a, e, t); }, useTransition: function () { var e = gd(!1); return e = Vg.bind(null, Y, e.queue, !0, !1), lt().memoizedState = e, [!1, e]; }, useSyncExternalStore: function (e, t, a) { var n = Y, i = lt(); if (ee) {
        if (a === void 0)
            throw Error(N(407));
        a = a();
    }
    else {
        if (a = t(), me === null)
            throw Error(N(349));
        (W & 127) !== 0 || Cg(n, t, a);
    } i.memoizedState = a; var r = { value: a, getSnapshot: t }; return i.queue = r, _f(qg.bind(null, n, r, e), [e]), n.flags |= 2048, Do(9, { destroy: void 0 }, Mg.bind(null, n, r, a, t), null), a; }, useId: function () { var e = lt(), t = me.identifierPrefix; if (ee) {
        var a = Sa, n = wa;
        a = (n & ~(1 << 32 - Tt(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Fs++, 0 < a && (t += "H" + a.toString(32)), t += "_";
    }
    else
        a = c1++, t = "_" + t + "r_" + a.toString(32) + "_"; return e.memoizedState = t; }, useHostTransitionStatus: vp, useFormState: Df, useActionState: Df, useOptimistic: function (e) { var t = lt(); t.memoizedState = t.baseState = e; var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null }; return t.queue = a, t = yp.bind(null, Y, !0, a), a.dispatch = t, [e, t]; }, useMemoCache: mp, useCacheRefresh: function () { return lt().memoizedState = g1.bind(null, Y); }, useEffectEvent: function (e) { var t = lt(), a = { impl: e }; return t.memoizedState = a, function () { if ((ne & 2) !== 0)
        throw Error(N(440)); return a.impl.apply(void 0, arguments); }; } }, xp = { readContext: Ie, use: hu, useCallback: Kg, useContext: Ie, useEffect: hp, useImperativeHandle: Lg, useInsertionEffect: Gg, useLayoutEffect: _g, useMemo: Fg, useReducer: Ss, useRef: Dg, useState: function () { return Ss(un); }, useDebugValue: gp, useDeferredValue: function (e, t) { var a = Ae(); return jg(a, de.memoizedState, e, t); }, useTransition: function () { var e = Ss(un)[0], t = Ae().memoizedState; return [typeof e === "boolean" ? e : vl(e), t]; }, useSyncExternalStore: Eg, useId: Zg, useHostTransitionStatus: vp, useFormState: $f, useActionState: $f, useOptimistic: function (e, t) { var a = Ae(); return zg(a, de, e, t); }, useMemoCache: mp, useCacheRefresh: Pg };
xp.useEffectEvent = $g;
var tb = { readContext: Ie, use: hu, useCallback: Kg, useContext: Ie, useEffect: hp, useImperativeHandle: Lg, useInsertionEffect: Gg, useLayoutEffect: _g, useMemo: Fg, useReducer: Ec, useRef: Dg, useState: function () { return Ec(un); }, useDebugValue: gp, useDeferredValue: function (e, t) { var a = Ae(); return de === null ? bp(a, e, t) : jg(a, de.memoizedState, e, t); }, useTransition: function () { var e = Ec(un)[0], t = Ae().memoizedState; return [typeof e === "boolean" ? e : vl(e), t]; }, useSyncExternalStore: Eg, useId: Zg, useHostTransitionStatus: vp, useFormState: Gf, useActionState: Gf, useOptimistic: function (e, t) { var a = Ae(); if (de !== null)
        return zg(a, de, e, t); return a.baseState = e, [e, a.queue.dispatch]; }, useMemoCache: mp, useCacheRefresh: Pg };
tb.useEffectEvent = $g;
function Cc(e, t, a, n) { t = e.memoizedState, a = a(n, t), a = a === null || a === void 0 ? t : we({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a); }
var yd = { enqueueSetState: function (e, t, a) { e = e._reactInternals; var n = Xt(), i = Mi(n); i.payload = t, a !== void 0 && a !== null && (i.callback = a), t = qi(e, i, n), t !== null && (ft(t, e, n), Lr(t, e, n)); }, enqueueReplaceState: function (e, t, a) { e = e._reactInternals; var n = Xt(), i = Mi(n); i.tag = 1, i.payload = t, a !== void 0 && a !== null && (i.callback = a), t = qi(e, i, n), t !== null && (ft(t, e, n), Lr(t, e, n)); }, enqueueForceUpdate: function (e, t) { e = e._reactInternals; var a = Xt(), n = Mi(a); n.tag = 2, t !== void 0 && t !== null && (n.callback = t), t = qi(e, n, a), t !== null && (ft(t, e, a), Lr(t, e, a)); } };
function Bf(e, t, a, n, i, r, o) { return e = e.stateNode, typeof e.shouldComponentUpdate === "function" ? e.shouldComponentUpdate(n, r, o) : t.prototype && t.prototype.isPureReactComponent ? !el(a, n) || !el(i, r) : !0; }
function Lf(e, t, a, n) { e = t.state, typeof t.componentWillReceiveProps === "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps === "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && yd.enqueueReplaceState(t, t.state, null); }
function Hi(e, t) { var a = t; if ("ref" in t) {
    a = {};
    for (var n in t)
        n !== "ref" && (a[n] = t[n]);
} if (e = e.defaultProps) {
    a === t && (a = we({}, a));
    for (var i in e)
        a[i] === void 0 && (a[i] = e[i]);
} return a; }
function v1(e) { Qs(e); }
function y1(e) { console.error(e); }
function x1(e) { Qs(e); }
function js(e, t) { try {
    var a = e.onUncaughtError;
    a(t.value, { componentStack: t.stack });
}
catch (n) {
    setTimeout(function () { throw n; });
} }
function Kf(e, t, a) { try {
    var n = e.onCaughtError;
    n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
}
catch (i) {
    setTimeout(function () { throw i; });
} }
function xd(e, t, a) { return a = Mi(a), a.tag = 3, a.payload = { element: null }, a.callback = function () { js(e, t); }, a; }
function ab(e) { return e = Mi(e), e.tag = 3, e; }
function nb(e, t, a, n) { var i = a.type.getDerivedStateFromError; if (typeof i === "function") {
    var r = n.value;
    e.payload = function () { return i(r); }, e.callback = function () { Kf(t, a, n); };
} var o = a.stateNode; o !== null && typeof o.componentDidCatch === "function" && (e.callback = function () { Kf(t, a, n), typeof i !== "function" && (Vn === null ? Vn = new Set([this]) : Vn.add(this)); var s = n.stack; this.componentDidCatch(n.value, { componentStack: s !== null ? s : "" }); }); }
function w1(e, t, a, n, i) { if (a.flags |= 32768, n !== null && typeof n === "object" && typeof n.then === "function") {
    if (t = a.alternate, t !== null && Fo(t, a, i, !0), a = Ct.current, a !== null) {
        switch (a.tag) {
            case 31:
            case 13: return Yt === null ? Ps() : a.alternate === null && Ce === 0 && (Ce = 3), a.flags &= -257, a.flags |= 65536, a.lanes = i, n === _s ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = new Set([n]) : t.add(n), $c(e, n, i)), !1;
            case 22: return a.flags |= 65536, n === _s ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = new Set([n]) : a.add(n)), $c(e, n, i)), !1;
        }
        throw Error(N(435, a.tag));
    }
    return $c(e, n, i), Ps(), !1;
} if (ee)
    return t = Ct.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, n !== ld && (e = Error(N(422), { cause: n }), al(jt(e, a)))) : (n !== ld && (t = Error(N(423), { cause: n }), al(jt(t, a))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, n = jt(n, a), i = xd(e.stateNode, n, i), Tc(e, i), Ce !== 4 && (Ce = 2)), !1; var r = Error(N(520), { cause: n }); if (r = jt(r, a), Xr === null ? Xr = [r] : Xr.push(r), Ce !== 4 && (Ce = 2), t === null)
    return !0; n = jt(n, a), a = t; do {
    switch (a.tag) {
        case 3: return a.flags |= 65536, e = i & -i, a.lanes |= e, e = xd(a.stateNode, n, e), Tc(a, e), !1;
        case 1: if (t = a.type, r = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError === "function" || r !== null && typeof r.componentDidCatch === "function" && (Vn === null || !Vn.has(r))))
            return a.flags |= 65536, i &= -i, a.lanes |= i, i = ab(i), nb(i, e, a, n), Tc(a, i), !1;
    }
    a = a.return;
} while (a !== null); return !1; }
var wp = Error(N(461)), Qe = !1;
function Xe(e, t, a, n) { t.child = e === null ? xg(t, null, a, n) : Oi(t, e.child, a, n); }
function Ff(e, t, a, n, i) { a = a.render; var r = t.ref; if ("ref" in n) {
    var o = {};
    for (var s in n)
        s !== "ref" && (o[s] = n[s]);
}
else
    o = n; if (zi(t), n = up(e, t, a, o, r, i), s = cp(), e !== null && !Qe)
    return dp(e, t, i), cn(e, t, i); return ee && s && tp(t), t.flags |= 1, Xe(e, t, n, i), t.child; }
function jf(e, t, a, n, i) { if (e === null) {
    var r = a.type;
    if (typeof r === "function" && !ep(r) && r.defaultProps === void 0 && a.compare === null)
        return t.tag = 15, t.type = r, ib(e, t, r, n, i);
    return e = xs(a.type, null, n, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e;
} if (r = e.child, !Sp(e, i)) {
    var o = r.memoizedProps;
    if (a = a.compare, a = a !== null ? a : el, a(o, n) && e.ref === t.ref)
        return cn(e, t, i);
} return t.flags |= 1, e = nn(r, n), e.ref = t.ref, e.return = t, t.child = e; }
function ib(e, t, a, n, i) { if (e !== null) {
    var r = e.memoizedProps;
    if (el(r, n) && e.ref === t.ref)
        if (Qe = !1, t.pendingProps = n = r, Sp(e, i))
            (e.flags & 131072) !== 0 && (Qe = !0);
        else
            return t.lanes = e.lanes, cn(e, t, i);
} return wd(e, t, a, n, i); }
function ob(e, t, a, n) { var i = n.children, r = e !== null ? e.memoizedState : null; if (e === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), n.mode === "hidden") {
    if ((t.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | a : a, e !== null) {
            n = t.child = e.child;
            for (i = 0; n !== null;)
                i = i | n.lanes | n.childLanes, n = n.sibling;
            n = i & ~r;
        }
        else
            n = 0, t.child = null;
        return Vf(e, t, r, a, n);
    }
    if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && ws(t, r !== null ? r.cachePool : null), r !== null ? Uf(t, r) : fd(), kg(t);
    else
        return n = t.lanes = 536870912, Vf(e, t, r !== null ? r.baseLanes | a : a, a, n);
}
else
    r !== null ? (ws(t, r.cachePool), Uf(t, r), Dn(t), t.memoizedState = null) : (e !== null && ws(t, null), fd(), Dn(t)); return Xe(e, t, i, a), t.child; }
function Ur(e, t) { return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling; }
function Vf(e, t, a, n, i) { var r = ip(); return r = r === null ? null : { parent: He._currentValue, pool: r }, t.memoizedState = { baseLanes: a, cachePool: r }, e !== null && ws(t, null), fd(), kg(t), e !== null && Fo(e, t, n, !0), t.childLanes = i, null; }
function Ns(e, t) { return t = Vs({ mode: t.mode, children: t.children }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t; }
function Yf(e, t, a) { return Oi(t, e.child, null, a), e = Ns(t, t.pendingProps), e.flags |= 2, xt(t), t.memoizedState = null, e; }
function S1(e, t, a) { var n = t.pendingProps, i = (t.flags & 128) !== 0; if (t.flags &= -129, e === null) {
    if (ee) {
        if (n.mode === "hidden")
            return e = Ns(t, n), t.lanes = 536870912, Ur(null, e);
        if (hd(t), (e = xe) ? (e = Jb(e, Vt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: In !== null ? { id: wa, overflow: Sa } : null, retryLane: 536870912, hydrationErrors: null }, a = mg(e), a.return = t, t.child = a, Pe = t, xe = null)) : e = null, e === null)
            throw Jn(t);
        return t.lanes = 536870912, null;
    }
    return Ns(t, n);
} var r = e.memoizedState; if (r !== null) {
    var o = r.dehydrated;
    if (hd(t), i)
        if (t.flags & 256)
            t.flags &= -257, t = Yf(e, t, a);
        else if (t.memoizedState !== null)
            t.child = e.child, t.flags |= 128, t = null;
        else
            throw Error(N(558));
    else if (Qe || Fo(e, t, a, !1), i = (a & e.childLanes) !== 0, Qe || i) {
        if (n = me, n !== null && (o = $h(n, a), o !== 0 && o !== r.retryLane))
            throw r.retryLane = o, Gi(e, o), ft(n, e, o), wp;
        Ps(), t = Yf(e, t, a);
    }
    else
        e = r.treeContext, xe = Zt(o.nextSibling), Pe = t, ee = !0, jn = null, Vt = !1, e !== null && hg(t, e), t = Ns(t, n), t.flags |= 4096;
    return t;
} return e = nn(e.child, { mode: n.mode, children: n.children }), e.ref = t.ref, t.child = e, e.return = t, e; }
function Ts(e, t) { var a = t.ref; if (a === null)
    e !== null && e.ref !== null && (t.flags |= 4194816);
else {
    if (typeof a !== "function" && typeof a !== "object")
        throw Error(N(284));
    if (e === null || e.ref !== a)
        t.flags |= 4194816;
} }
function wd(e, t, a, n, i) { if (zi(t), a = up(e, t, a, n, void 0, i), n = cp(), e !== null && !Qe)
    return dp(e, t, i), cn(e, t, i); return ee && n && tp(t), t.flags |= 1, Xe(e, t, a, i), t.child; }
function Xf(e, t, a, n, i, r) { if (zi(t), t.updateQueue = null, a = Tg(t, n, a, i), Ng(e), n = cp(), e !== null && !Qe)
    return dp(e, t, r), cn(e, t, r); return ee && n && tp(t), t.flags |= 1, Xe(e, t, a, r), t.child; }
function Zf(e, t, a, n, i) { if (zi(t), t.stateNode === null) {
    var r = wo, o = a.contextType;
    typeof o === "object" && o !== null && (r = Ie(o)), r = new a(n, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = yd, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = n, r.state = t.memoizedState, r.refs = {}, rp(t), o = a.contextType, r.context = typeof o === "object" && o !== null ? Ie(o) : wo, r.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o === "function" && (Cc(t, a, o, n), r.state = t.memoizedState), typeof a.getDerivedStateFromProps === "function" || typeof r.getSnapshotBeforeUpdate === "function" || typeof r.UNSAFE_componentWillMount !== "function" && typeof r.componentWillMount !== "function" || (o = r.state, typeof r.componentWillMount === "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount === "function" && r.UNSAFE_componentWillMount(), o !== r.state && yd.enqueueReplaceState(r, r.state, null), Fr(t, n, r, i), Kr(), r.state = t.memoizedState), typeof r.componentDidMount === "function" && (t.flags |= 4194308), n = !0;
}
else if (e === null) {
    r = t.stateNode;
    var s = t.memoizedProps, p = Hi(a, s);
    r.props = p;
    var f = r.context, b = a.contextType;
    o = wo, typeof b === "object" && b !== null && (o = Ie(b));
    var x = a.getDerivedStateFromProps;
    b = typeof x === "function" || typeof r.getSnapshotBeforeUpdate === "function", s = t.pendingProps !== s, b || typeof r.UNSAFE_componentWillReceiveProps !== "function" && typeof r.componentWillReceiveProps !== "function" || (s || f !== o) && Lf(t, r, n, o), Un = !1;
    var h = t.memoizedState;
    r.state = h, Fr(t, n, r, i), Kr(), f = t.memoizedState, s || h !== f || Un ? (typeof x === "function" && (Cc(t, a, x, n), f = t.memoizedState), (p = Un || Bf(t, a, p, n, h, f, o)) ? (b || typeof r.UNSAFE_componentWillMount !== "function" && typeof r.componentWillMount !== "function" || (typeof r.componentWillMount === "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount === "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount === "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount === "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = f), r.props = n, r.state = f, r.context = o, n = p) : (typeof r.componentDidMount === "function" && (t.flags |= 4194308), n = !1);
}
else {
    r = t.stateNode, pd(e, t), o = t.memoizedProps, b = Hi(a, o), r.props = b, x = t.pendingProps, h = r.context, f = a.contextType, p = wo, typeof f === "object" && f !== null && (p = Ie(f)), s = a.getDerivedStateFromProps, (f = typeof s === "function" || typeof r.getSnapshotBeforeUpdate === "function") || typeof r.UNSAFE_componentWillReceiveProps !== "function" && typeof r.componentWillReceiveProps !== "function" || (o !== x || h !== p) && Lf(t, r, n, p), Un = !1, h = t.memoizedState, r.state = h, Fr(t, n, r, i), Kr();
    var v = t.memoizedState;
    o !== x || h !== v || Un || e !== null && e.dependencies !== null && Gs(e.dependencies) ? (typeof s === "function" && (Cc(t, a, s, n), v = t.memoizedState), (b = Un || Bf(t, a, b, n, h, v, p) || e !== null && e.dependencies !== null && Gs(e.dependencies)) ? (f || typeof r.UNSAFE_componentWillUpdate !== "function" && typeof r.componentWillUpdate !== "function" || (typeof r.componentWillUpdate === "function" && r.componentWillUpdate(n, v, p), typeof r.UNSAFE_componentWillUpdate === "function" && r.UNSAFE_componentWillUpdate(n, v, p)), typeof r.componentDidUpdate === "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate === "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate !== "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate !== "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = v), r.props = n, r.state = v, r.context = p, n = b) : (typeof r.componentDidUpdate !== "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate !== "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), n = !1);
} return r = n, Ts(e, t), n = (t.flags & 128) !== 0, r || n ? (r = t.stateNode, a = n && typeof a.getDerivedStateFromError !== "function" ? null : r.render(), t.flags |= 1, e !== null && n ? (t.child = Oi(t, e.child, null, i), t.child = Oi(t, null, a, i)) : Xe(e, t, a, i), t.memoizedState = r.state, e = t.child) : e = cn(e, t, i), e; }
function Pf(e, t, a, n) { return Ai(), t.flags |= 256, Xe(e, t, a, n), t.child; }
var Mc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
function qc(e) { return { baseLanes: e, cachePool: bg() }; }
function Rc(e, t, a) { return e = e !== null ? e.childLanes & ~a : 0, t && (e |= St), e; }
function rb(e, t, a) { var n = t.pendingProps, i = !1, r = (t.flags & 128) !== 0, o; if ((o = r) || (o = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), o && (i = !0, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
    if (ee) {
        if (i ? Qn(t) : Dn(t), (e = xe) ? (e = Jb(e, Vt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: In !== null ? { id: wa, overflow: Sa } : null, retryLane: 536870912, hydrationErrors: null }, a = mg(e), a.return = t, t.child = a, Pe = t, xe = null)) : e = null, e === null)
            throw Jn(t);
        return Dd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
    }
    var s = n.children;
    if (n = n.fallback, i)
        return Dn(t), i = t.mode, s = Vs({ mode: "hidden", children: s }, i), n = Ti(n, i, a, null), s.return = t, n.return = t, s.sibling = n, t.child = s, n = t.child, n.memoizedState = qc(a), n.childLanes = Rc(e, o, a), t.memoizedState = Mc, Ur(null, n);
    return Qn(t), Sd(t, s);
} var p = e.memoizedState; if (p !== null && (s = p.dehydrated, s !== null)) {
    if (r)
        t.flags & 256 ? (Qn(t), t.flags &= -257, t = Ac(e, t, a)) : t.memoizedState !== null ? (Dn(t), t.child = e.child, t.flags |= 128, t = null) : (Dn(t), s = n.fallback, i = t.mode, n = Vs({ mode: "visible", children: n.children }, i), s = Ti(s, i, a, null), s.flags |= 2, n.return = t, s.return = t, n.sibling = s, t.child = n, Oi(t, e.child, null, a), n = t.child, n.memoizedState = qc(a), n.childLanes = Rc(e, o, a), t.memoizedState = Mc, t = Ur(null, n));
    else if (Qn(t), Dd(s)) {
        if (o = s.nextSibling && s.nextSibling.dataset, o)
            var f = o.dgst;
        o = f, n = Error(N(419)), n.stack = "", n.digest = o, al({ value: n, source: null, stack: null }), t = Ac(e, t, a);
    }
    else if (Qe || Fo(e, t, a, !1), o = (a & e.childLanes) !== 0, Qe || o) {
        if (o = me, o !== null && (n = $h(o, a), n !== 0 && n !== p.retryLane))
            throw p.retryLane = n, Gi(e, n), ft(o, e, n), wp;
        Qd(s) || Ps(), t = Ac(e, t, a);
    }
    else
        Qd(s) ? (t.flags |= 192, t.child = e.child, t = null) : (e = p.treeContext, xe = Zt(s.nextSibling), Pe = t, ee = !0, jn = null, Vt = !1, e !== null && hg(t, e), t = Sd(t, n.children), t.flags |= 4096);
    return t;
} if (i)
    return Dn(t), s = n.fallback, i = t.mode, p = e.child, f = p.sibling, n = nn(p, { mode: "hidden", children: n.children }), n.subtreeFlags = p.subtreeFlags & 65011712, f !== null ? s = nn(f, s) : (s = Ti(s, i, a, null), s.flags |= 2), s.return = t, n.return = t, n.sibling = s, t.child = n, Ur(null, n), n = t.child, s = e.child.memoizedState, s === null ? s = qc(a) : (i = s.cachePool, i !== null ? (p = He._currentValue, i = i.parent !== p ? { parent: p, pool: p } : i) : i = bg(), s = { baseLanes: s.baseLanes | a, cachePool: i }), n.memoizedState = s, n.childLanes = Rc(e, o, a), t.memoizedState = Mc, Ur(e.child, n); return Qn(t), a = e.child, e = a.sibling, a = nn(a, { mode: "visible", children: n.children }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a; }
function Sd(e, t) { return t = Vs({ mode: "visible", children: t }, e.mode), t.return = e, e.child = t; }
function Vs(e, t) { return e = wt(22, e, null, t), e.lanes = 0, e; }
function Ac(e, t, a) { return Oi(t, e.child, null, a), e = Sd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e; }
function If(e, t, a) { e.lanes |= t; var n = e.alternate; n !== null && (n.lanes |= t), ud(e.return, t, a); }
function zc(e, t, a, n, i, r) { var o = e.memoizedState; o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: n, tail: a, tailMode: i, treeForkCount: r } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = a, o.tailMode = i, o.treeForkCount = r); }
function lb(e, t, a) { var n = t.pendingProps, i = n.revealOrder, r = n.tail; n = n.children; var o = Re.current, s = (o & 2) !== 0; if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ge(Re, o), Xe(e, t, n, a), n = ee ? tl : 0, !s && e !== null && (e.flags & 128) !== 0)
    e: for (e = t.child; e !== null;) {
        if (e.tag === 13)
            e.memoizedState !== null && If(e, a, t);
        else if (e.tag === 19)
            If(e, a, t);
        else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
        }
        if (e === t)
            break e;
        for (; e.sibling === null;) {
            if (e.return === null || e.return === t)
                break e;
            e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
    } switch (i) {
    case "forwards":
        a = t.child;
        for (i = null; a !== null;)
            e = a.alternate, e !== null && Ls(e) === null && (i = a), a = a.sibling;
        a = i, a === null ? (i = t.child, t.child = null) : (i = a.sibling, a.sibling = null), zc(t, !1, i, a, r, n);
        break;
    case "backwards":
    case "unstable_legacy-backwards":
        a = null, i = t.child;
        for (t.child = null; i !== null;) {
            if (e = i.alternate, e !== null && Ls(e) === null) {
                t.child = i;
                break;
            }
            e = i.sibling, i.sibling = a, a = i, i = e;
        }
        zc(t, !0, a, null, r, n);
        break;
    case "together":
        zc(t, !1, null, null, void 0, n);
        break;
    default: t.memoizedState = null;
} return t.child; }
function cn(e, t, a) { if (e !== null && (t.dependencies = e.dependencies), ei |= t.lanes, (a & t.childLanes) === 0)
    if (e !== null) {
        if (Fo(e, t, a, !1), (a & t.childLanes) === 0)
            return null;
    }
    else
        return null; if (e !== null && t.child !== e.child)
    throw Error(N(153)); if (t.child !== null) {
    e = t.child, a = nn(e, e.pendingProps), t.child = a;
    for (a.return = t; e.sibling !== null;)
        e = e.sibling, a = a.sibling = nn(e, e.pendingProps), a.return = t;
    a.sibling = null;
} return t.child; }
function Sp(e, t) { if ((e.lanes & t) !== 0)
    return !0; return e = e.dependencies, e !== null && Gs(e) ? !0 : !1; }
function k1(e, t, a) { switch (t.tag) {
    case 3:
        zs(t, t.stateNode.containerInfo), Hn(t, He, e.memoizedState.cache), Ai();
        break;
    case 27:
    case 5:
        Pc(t);
        break;
    case 4:
        zs(t, t.stateNode.containerInfo);
        break;
    case 10:
        Hn(t, t.type, t.memoizedProps.value);
        break;
    case 31:
        if (t.memoizedState !== null)
            return t.flags |= 128, hd(t), null;
        break;
    case 13:
        var n = t.memoizedState;
        if (n !== null) {
            if (n.dehydrated !== null)
                return Qn(t), t.flags |= 128, null;
            if ((a & t.child.childLanes) !== 0)
                return rb(e, t, a);
            return Qn(t), e = cn(e, t, a), e !== null ? e.sibling : null;
        }
        Qn(t);
        break;
    case 19:
        var i = (e.flags & 128) !== 0;
        if (n = (a & t.childLanes) !== 0, n || (Fo(e, t, a, !1), n = (a & t.childLanes) !== 0), i) {
            if (n)
                return lb(e, t, a);
            t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ge(Re, Re.current), n)
            break;
        else
            return null;
    case 22: return t.lanes = 0, ob(e, t, a, t.pendingProps);
    case 24: Hn(t, He, e.memoizedState.cache);
} return cn(e, t, a); }
function sb(e, t, a) { if (e !== null)
    if (e.memoizedProps !== t.pendingProps)
        Qe = !0;
    else {
        if (!Sp(e, a) && (t.flags & 128) === 0)
            return Qe = !1, k1(e, t, a);
        Qe = (e.flags & 131072) !== 0 ? !0 : !1;
    }
else
    Qe = !1, ee && (t.flags & 1048576) !== 0 && fg(t, tl, t.index); switch (t.lanes = 0, t.tag) {
    case 16:
        e: {
            var n = t.pendingProps;
            if (e = Si(t.elementType), t.type = e, typeof e === "function")
                ep(e) ? (n = Hi(e, n), t.tag = 1, t = Zf(null, t, e, n, a)) : (t.tag = 0, t = wd(null, t, e, n, a));
            else {
                if (e !== void 0 && e !== null) {
                    var i = e.$$typeof;
                    if (i === Bd) {
                        t.tag = 11, t = Ff(null, t, e, n, a);
                        break e;
                    }
                    else if (i === Ld) {
                        t.tag = 14, t = jf(null, t, e, n, a);
                        break e;
                    }
                }
                throw t = Xc(e) || e, Error(N(306, t, ""));
            }
        }
        return t;
    case 0: return wd(e, t, t.type, t.pendingProps, a);
    case 1: return n = t.type, i = Hi(n, t.pendingProps), Zf(e, t, n, i, a);
    case 3:
        e: {
            if (zs(t, t.stateNode.containerInfo), e === null)
                throw Error(N(387));
            n = t.pendingProps;
            var r = t.memoizedState;
            i = r.element, pd(e, t), Fr(t, n, null, a);
            var o = t.memoizedState;
            if (n = o.cache, Hn(t, He, n), n !== r.cache && cd(t, [He], a, !0), Kr(), n = o.element, r.isDehydrated)
                if (r = { element: n, isDehydrated: !1, cache: o.cache }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
                    t = Pf(e, t, n, a);
                    break e;
                }
                else if (n !== i) {
                    i = jt(Error(N(424)), t), al(i), t = Pf(e, t, n, a);
                    break e;
                }
                else {
                    switch (e = t.stateNode.containerInfo, e.nodeType) {
                        case 9:
                            e = e.body;
                            break;
                        default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                    }
                    xe = Zt(e.firstChild), Pe = t, ee = !0, jn = null, Vt = !0, a = xg(t, null, n, a);
                    for (t.child = a; a;)
                        a.flags = a.flags & -3 | 4096, a = a.sibling;
                }
            else {
                if (Ai(), n === i) {
                    t = cn(e, t, a);
                    break e;
                }
                Xe(e, t, n, a);
            }
            t = t.child;
        }
        return t;
    case 26: return Ts(e, t), e === null ? (a = bh(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : ee || (a = t.type, e = t.pendingProps, n = eu(Fn.current).createElement(a), n[Ze] = t, n[ht] = e, Je(n, a, e), je(n), t.stateNode = n) : t.memoizedState = bh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
    case 27: return Pc(t), e === null && ee && (n = t.stateNode = Wb(t.type, t.pendingProps, Fn.current), Pe = t, Vt = !0, i = xe, ai(t.type) ? ($d = i, xe = Zt(n.firstChild)) : xe = i), Xe(e, t, t.pendingProps.children, a), Ts(e, t), e === null && (t.flags |= 4194304), t.child;
    case 5:
        if (e === null && ee) {
            if (i = n = xe)
                n = I1(n, t.type, t.pendingProps, Vt), n !== null ? (t.stateNode = n, Pe = t, xe = Zt(n.firstChild), Vt = !1, i = !0) : i = !1;
            i || Jn(t);
        }
        return Pc(t), i = t.type, r = t.pendingProps, o = e !== null ? e.memoizedProps : null, n = r.children, Ud(i, r) ? n = null : o !== null && Ud(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = up(e, t, d1, null, null, a), sl._currentValue = i), Ts(e, t), Xe(e, t, n, a), t.child;
    case 6:
        if (e === null && ee) {
            if (e = a = xe)
                a = J1(a, t.pendingProps, Vt), a !== null ? (t.stateNode = a, Pe = t, xe = null, e = !0) : e = !1;
            e || Jn(t);
        }
        return null;
    case 13: return rb(e, t, a);
    case 4: return zs(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Oi(t, null, n, a) : Xe(e, t, n, a), t.child;
    case 11: return Ff(e, t, t.type, t.pendingProps, a);
    case 7: return Xe(e, t, t.pendingProps, a), t.child;
    case 8: return Xe(e, t, t.pendingProps.children, a), t.child;
    case 12: return Xe(e, t, t.pendingProps.children, a), t.child;
    case 10: return n = t.pendingProps, Hn(t, t.type, n.value), Xe(e, t, n.children, a), t.child;
    case 9: return i = t.type._context, n = t.pendingProps.children, zi(t), i = Ie(i), n = n(i), t.flags |= 1, Xe(e, t, n, a), t.child;
    case 14: return jf(e, t, t.type, t.pendingProps, a);
    case 15: return ib(e, t, t.type, t.pendingProps, a);
    case 19: return lb(e, t, a);
    case 31: return S1(e, t, a);
    case 22: return ob(e, t, a, t.pendingProps);
    case 24: return zi(t), n = Ie(He), e === null ? (i = ip(), i === null && (i = me, r = np(), i.pooledCache = r, r.refCount++, r !== null && (i.pooledCacheLanes |= a), i = r), t.memoizedState = { parent: n, cache: i }, rp(t), Hn(t, He, i)) : ((e.lanes & a) !== 0 && (pd(e, t), Fr(t, null, null, a), Kr()), i = e.memoizedState, r = t.memoizedState, i.parent !== n ? (i = { parent: n, cache: n }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Hn(t, He, n)) : (n = r.cache, Hn(t, He, n), n !== i.cache && cd(t, [He], a, !0))), Xe(e, t, t.pendingProps.children, a), t.child;
    case 29: throw t.pendingProps;
} throw Error(N(156, t.tag)); }
function Xa(e) { e.flags |= 4; }
function Oc(e, t, a, n, i) { if (t = (e.mode & 32) !== 0)
    t = !1; if (t) {
    if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete)
            e.flags |= 8192;
        else if (zb())
            e.flags |= 8192;
        else
            throw Ci = _s, op;
}
else
    e.flags &= -16777217; }
function Jf(e, t) { if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
    e.flags &= -16777217;
else if (e.flags |= 16777216, !av(t))
    if (zb())
        e.flags |= 8192;
    else
        throw Ci = _s, op; }
function cs(e, t) { t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Hh() : 536870912, e.lanes |= t, $o |= t); }
function Er(e, t) { if (!ee)
    switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var a = null; t !== null;)
                t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
        case "collapsed":
            a = e.tail;
            for (var n = null; a !== null;)
                a.alternate !== null && (n = a), a = a.sibling;
            n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
    } }
function ye(e) { var t = e.alternate !== null && e.alternate.child === e.child, a = 0, n = 0; if (t)
    for (var i = e.child; i !== null;)
        a |= i.lanes | i.childLanes, n |= i.subtreeFlags & 65011712, n |= i.flags & 65011712, i.return = e, i = i.sibling;
else
    for (i = e.child; i !== null;)
        a |= i.lanes | i.childLanes, n |= i.subtreeFlags, n |= i.flags, i.return = e, i = i.sibling; return e.subtreeFlags |= n, e.childLanes = a, t; }
function N1(e, t, a) { var n = t.pendingProps; switch (ap(t), t.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14: return ye(t), null;
    case 1: return ye(t), null;
    case 3:
        if (a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), on(He), zo(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), e === null || e.child === null)
            lo(t) ? Xa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Nc());
        return ye(t), null;
    case 26:
        var { type: i, memoizedState: r } = t;
        return e === null ? (Xa(t), r !== null ? (ye(t), Jf(t, r)) : (ye(t), Oc(t, i, null, n, a))) : r ? r !== e.memoizedState ? (Xa(t), ye(t), Jf(t, r)) : (ye(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Xa(t), ye(t), Oc(t, i, e, n, a)), null;
    case 27:
        if (Os(t), a = Fn.current, i = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== n && Xa(t);
        else {
            if (!n) {
                if (t.stateNode === null)
                    throw Error(N(166));
                return ye(t), null;
            }
            e = Na.current, lo(t) ? Cf(t, e) : (e = Wb(i, n, a), t.stateNode = e, Xa(t));
        }
        return ye(t), null;
    case 5:
        if (Os(t), i = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== n && Xa(t);
        else {
            if (!n) {
                if (t.stateNode === null)
                    throw Error(N(166));
                return ye(t), null;
            }
            if (r = Na.current, lo(t))
                Cf(t, r);
            else {
                var o = eu(Fn.current);
                switch (r) {
                    case 1:
                        r = o.createElementNS("http://www.w3.org/2000/svg", i);
                        break;
                    case 2:
                        r = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                        break;
                    default: switch (i) {
                        case "svg":
                            r = o.createElementNS("http://www.w3.org/2000/svg", i);
                            break;
                        case "math":
                            r = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                            break;
                        case "script":
                            r = o.createElement("div"), r.innerHTML = "<script></script>", r = r.removeChild(r.firstChild);
                            break;
                        case "select":
                            r = typeof n.is === "string" ? o.createElement("select", { is: n.is }) : o.createElement("select"), n.multiple ? r.multiple = !0 : n.size && (r.size = n.size);
                            break;
                        default: r = typeof n.is === "string" ? o.createElement(i, { is: n.is }) : o.createElement(i);
                    }
                }
                r[Ze] = t, r[ht] = n;
                e: for (o = t.child; o !== null;) {
                    if (o.tag === 5 || o.tag === 6)
                        r.appendChild(o.stateNode);
                    else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                        o.child.return = o, o = o.child;
                        continue;
                    }
                    if (o === t)
                        break e;
                    for (; o.sibling === null;) {
                        if (o.return === null || o.return === t)
                            break e;
                        o = o.return;
                    }
                    o.sibling.return = o.return, o = o.sibling;
                }
                t.stateNode = r;
                e: switch (Je(r, i, n), i) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        n = !!n.autoFocus;
                        break e;
                    case "img":
                        n = !0;
                        break e;
                    default: n = !1;
                }
                n && Xa(t);
            }
        }
        return ye(t), Oc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
    case 6:
        if (e && t.stateNode != null)
            e.memoizedProps !== n && Xa(t);
        else {
            if (typeof n !== "string" && t.stateNode === null)
                throw Error(N(166));
            if (e = Fn.current, lo(t)) {
                if (e = t.stateNode, a = t.memoizedProps, n = null, i = Pe, i !== null)
                    switch (i.tag) {
                        case 27:
                        case 5: n = i.memoizedProps;
                    }
                e[Ze] = t, e = e.nodeValue === a || n !== null && n.suppressHydrationWarning === !0 || Zb(e.nodeValue, a) ? !0 : !1, e || Jn(t, !0);
            }
            else
                e = eu(e).createTextNode(n), e[Ze] = t, t.stateNode = e;
        }
        return ye(t), null;
    case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = lo(t), a !== null) {
                if (e === null) {
                    if (!n)
                        throw Error(N(318));
                    if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e)
                        throw Error(N(557));
                    e[Ze] = t;
                }
                else
                    Ai(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                ye(t), e = !1;
            }
            else
                a = Nc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
            if (!e) {
                if (t.flags & 256)
                    return xt(t), t;
                return xt(t), null;
            }
            if ((t.flags & 128) !== 0)
                throw Error(N(558));
        }
        return ye(t), null;
    case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (i = lo(t), n !== null && n.dehydrated !== null) {
                if (e === null) {
                    if (!i)
                        throw Error(N(318));
                    if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
                        throw Error(N(317));
                    i[Ze] = t;
                }
                else
                    Ai(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                ye(t), i = !1;
            }
            else
                i = Nc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
            if (!i) {
                if (t.flags & 256)
                    return xt(t), t;
                return xt(t), null;
            }
        }
        if (xt(t), (t.flags & 128) !== 0)
            return t.lanes = a, t;
        return a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, i = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (i = n.alternate.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== i && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), cs(t, t.updateQueue), ye(t), null;
    case 4: return zo(), e === null && Yb(t.stateNode.containerInfo), ye(t), null;
    case 10: return on(t.type), ye(t), null;
    case 19:
        if (Ve(Re), n = t.memoizedState, n === null)
            return ye(t), null;
        if (i = (t.flags & 128) !== 0, r = n.rendering, r === null)
            if (i)
                Er(n, !1);
            else {
                if (Ce !== 0 || e !== null && (e.flags & 128) !== 0)
                    for (e = t.child; e !== null;) {
                        if (r = Ls(e), r !== null) {
                            t.flags |= 128, Er(n, !1), e = r.updateQueue, t.updateQueue = e, cs(t, e), t.subtreeFlags = 0, e = a;
                            for (a = t.child; a !== null;)
                                pg(a, e), a = a.sibling;
                            return ge(Re, Re.current & 1 | 2), ee && Ja(t, n.treeForkCount), t.child;
                        }
                        e = e.sibling;
                    }
                n.tail !== null && kt() > Xs && (t.flags |= 128, i = !0, Er(n, !1), t.lanes = 4194304);
            }
        else {
            if (!i)
                if (e = Ls(r), e !== null) {
                    if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, cs(t, e), Er(n, !0), n.tail === null && n.tailMode === "hidden" && !r.alternate && !ee)
                        return ye(t), null;
                }
                else
                    2 * kt() - n.renderingStartTime > Xs && a !== 536870912 && (t.flags |= 128, i = !0, Er(n, !1), t.lanes = 4194304);
            n.isBackwards ? (r.sibling = t.child, t.child = r) : (e = n.last, e !== null ? e.sibling = r : t.child = r, n.last = r);
        }
        if (n.tail !== null)
            return e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = kt(), e.sibling = null, a = Re.current, ge(Re, i ? a & 1 | 2 : a & 1), ee && Ja(t, n.treeForkCount), e;
        return ye(t), null;
    case 22:
    case 23: return xt(t), lp(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ye(t), a = t.updateQueue, a !== null && cs(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && Ve(Ei), null;
    case 24: return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), on(He), ye(t), null;
    case 25: return null;
    case 30: return null;
} throw Error(N(156, t.tag)); }
function T1(e, t) { switch (ap(t), t.tag) {
    case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3: return on(He), zo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5: return Os(t), null;
    case 31:
        if (t.memoizedState !== null) {
            if (xt(t), t.alternate === null)
                throw Error(N(340));
            Ai();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 13:
        if (xt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(N(340));
            Ai();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19: return Ve(Re), null;
    case 4: return zo(), null;
    case 10: return on(t.type), null;
    case 22:
    case 23: return xt(t), lp(), e !== null && Ve(Ei), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 24: return on(He), null;
    case 25: return null;
    default: return null;
} }
function ub(e, t) { switch (ap(t), t.tag) {
    case 3:
        on(He), zo();
        break;
    case 26:
    case 27:
    case 5:
        Os(t);
        break;
    case 4:
        zo();
        break;
    case 31:
        t.memoizedState !== null && xt(t);
        break;
    case 13:
        xt(t);
        break;
    case 19:
        Ve(Re);
        break;
    case 10:
        on(t.type);
        break;
    case 22:
    case 23:
        xt(t), lp(), e !== null && Ve(Ei);
        break;
    case 24: on(He);
} }
function yl(e, t) { try {
    var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
    if (n !== null) {
        var i = n.next;
        a = i;
        do {
            if ((a.tag & e) === e) {
                n = void 0;
                var r = a.create, o = a.inst;
                n = r(), o.destroy = n;
            }
            a = a.next;
        } while (a !== i);
    }
}
catch (s) {
    le(t, t.return, s);
} }
function Wn(e, t, a) { try {
    var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
    if (i !== null) {
        var r = i.next;
        n = r;
        do {
            if ((n.tag & e) === e) {
                var o = n.inst, s = o.destroy;
                if (s !== void 0) {
                    o.destroy = void 0, i = t;
                    var p = a, f = s;
                    try {
                        f();
                    }
                    catch (b) {
                        le(i, p, b);
                    }
                }
            }
            n = n.next;
        } while (n !== r);
    }
}
catch (b) {
    le(t, t.return, b);
} }
function cb(e) { var t = e.updateQueue; if (t !== null) {
    var a = e.stateNode;
    try {
        Sg(t, a);
    }
    catch (n) {
        le(e, e.return, n);
    }
} }
function db(e, t, a) { a.props = Hi(e.type, e.memoizedProps), a.state = e.memoizedState; try {
    a.componentWillUnmount();
}
catch (n) {
    le(e, t, n);
} }
function Vr(e, t) { try {
    var a = e.ref;
    if (a !== null) {
        switch (e.tag) {
            case 26:
            case 27:
            case 5:
                var n = e.stateNode;
                break;
            case 30:
                n = e.stateNode;
                break;
            default: n = e.stateNode;
        }
        typeof a === "function" ? e.refCleanup = a(n) : a.current = n;
    }
}
catch (i) {
    le(e, t, i);
} }
function ka(e, t) { var a = e.ref, n = e.refCleanup; if (a !== null)
    if (typeof n === "function")
        try {
            n();
        }
        catch (i) {
            le(e, t, i);
        }
        finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
    else if (typeof a === "function")
        try {
            a(null);
        }
        catch (i) {
            le(e, t, i);
        }
    else
        a.current = null; }
function pb(e) { var { type: t, memoizedProps: a, stateNode: n } = e; try {
    e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
            a.autoFocus && n.focus();
            break e;
        case "img": a.src ? n.src = a.src : a.srcSet && (n.srcset = a.srcSet);
    }
}
catch (i) {
    le(e, e.return, i);
} }
function Uc(e, t, a) { try {
    var n = e.stateNode;
    j1(n, e.type, a, t), n[ht] = t;
}
catch (i) {
    le(e, e.return, i);
} }
function mb(e) { return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ai(e.type) || e.tag === 4; }
function Hc(e) { e: for (;;) {
    for (; e.sibling === null;) {
        if (e.return === null || mb(e.return))
            return null;
        e = e.return;
    }
    e.sibling.return = e.return;
    for (e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
        if (e.tag === 27 && ai(e.type))
            continue e;
        if (e.flags & 2)
            continue e;
        if (e.child === null || e.tag === 4)
            continue e;
        else
            e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2))
        return e.stateNode;
} }
function kd(e, t, a) { var n = e.tag; if (n === 5 || n === 6)
    e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a !== null && a !== void 0 || t.onclick !== null || (t.onclick = tn));
else if (n !== 4 && (n === 27 && ai(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
    for (kd(e, t, a), e = e.sibling; e !== null;)
        kd(e, t, a), e = e.sibling; }
function Ys(e, t, a) { var n = e.tag; if (n === 5 || n === 6)
    e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
else if (n !== 4 && (n === 27 && ai(e.type) && (a = e.stateNode), e = e.child, e !== null))
    for (Ys(e, t, a), e = e.sibling; e !== null;)
        Ys(e, t, a), e = e.sibling; }
function fb(e) { var { stateNode: t, memoizedProps: a } = e; try {
    for (var n = e.type, i = t.attributes; i.length;)
        t.removeAttributeNode(i[0]);
    Je(t, n, a), t[Ze] = e, t[ht] = a;
}
catch (r) {
    le(e, e.return, r);
} }
var Wa = !1, Ue = !1, Qc = !1, Wf = typeof WeakSet === "function" ? WeakSet : Set, Fe = null;
function E1(e, t) { if (e = e.containerInfo, zd = iu, e = ig(e), Id(e)) {
    if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
    else
        e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var n = a.getSelection && a.getSelection();
            if (n && n.rangeCount !== 0) {
                a = n.anchorNode;
                var i = n.anchorOffset, r = n.focusNode;
                n = n.focusOffset;
                try {
                    a.nodeType, r.nodeType;
                }
                catch (k) {
                    a = null;
                    break e;
                }
                var o = 0, s = -1, p = -1, f = 0, b = 0, x = e, h = null;
                t: for (;;) {
                    for (var v;;) {
                        if (x !== a || i !== 0 && x.nodeType !== 3 || (s = o + i), x !== r || n !== 0 && x.nodeType !== 3 || (p = o + n), x.nodeType === 3 && (o += x.nodeValue.length), (v = x.firstChild) === null)
                            break;
                        h = x, x = v;
                    }
                    for (;;) {
                        if (x === e)
                            break t;
                        if (h === a && ++f === i && (s = o), h === r && ++b === n && (p = o), (v = x.nextSibling) !== null)
                            break;
                        x = h, h = x.parentNode;
                    }
                    x = v;
                }
                a = s === -1 || p === -1 ? null : { start: s, end: p };
            }
            else
                a = null;
        }
    a = a || { start: 0, end: 0 };
}
else
    a = null; Od = { focusedElem: e, selectionRange: a }, iu = !1; for (Fe = t; Fe !== null;)
    if (t = Fe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Fe = e;
    else
        for (; Fe !== null;) {
            switch (t = Fe, r = t.alternate, e = t.flags, t.tag) {
                case 0:
                    if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                        for (a = 0; a < e.length; a++)
                            i = e[a], i.ref.impl = i.nextImpl;
                    break;
                case 11:
                case 15: break;
                case 1:
                    if ((e & 1024) !== 0 && r !== null) {
                        e = void 0, a = t, i = r.memoizedProps, r = r.memoizedState, n = a.stateNode;
                        try {
                            var T = Hi(a.type, i);
                            e = n.getSnapshotBeforeUpdate(T, r), n.__reactInternalSnapshotBeforeUpdate = e;
                        }
                        catch (k) {
                            le(a, a.return, k);
                        }
                    }
                    break;
                case 3:
                    if ((e & 1024) !== 0) {
                        if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                            Hd(e);
                        else if (a === 1)
                            switch (e.nodeName) {
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    Hd(e);
                                    break;
                                default: e.textContent = "";
                            }
                    }
                    break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17: break;
                default: if ((e & 1024) !== 0)
                    throw Error(N(163));
            }
            if (e = t.sibling, e !== null) {
                e.return = t.return, Fe = e;
                break;
            }
            Fe = t.return;
        } }
function hb(e, t, a) { var n = a.flags; switch (a.tag) {
    case 0:
    case 11:
    case 15:
        Pa(e, a), n & 4 && yl(5, a);
        break;
    case 1:
        if (Pa(e, a), n & 4)
            if (e = a.stateNode, t === null)
                try {
                    e.componentDidMount();
                }
                catch (o) {
                    le(a, a.return, o);
                }
            else {
                var i = Hi(a.type, t.memoizedProps);
                t = t.memoizedState;
                try {
                    e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
                }
                catch (o) {
                    le(a, a.return, o);
                }
            }
        n & 64 && cb(a), n & 512 && Vr(a, a.return);
        break;
    case 3:
        if (Pa(e, a), n & 64 && (e = a.updateQueue, e !== null)) {
            if (t = null, a.child !== null)
                switch (a.child.tag) {
                    case 27:
                    case 5:
                        t = a.child.stateNode;
                        break;
                    case 1: t = a.child.stateNode;
                }
            try {
                Sg(e, t);
            }
            catch (o) {
                le(a, a.return, o);
            }
        }
        break;
    case 27: t === null && n & 4 && fb(a);
    case 26:
    case 5:
        Pa(e, a), t === null && n & 4 && pb(a), n & 512 && Vr(a, a.return);
        break;
    case 12:
        Pa(e, a);
        break;
    case 31:
        Pa(e, a), n & 4 && vb(e, a);
        break;
    case 13:
        Pa(e, a), n & 4 && yb(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = H1.bind(null, a), W1(e, a))));
        break;
    case 22:
        if (n = a.memoizedState !== null || Wa, !n) {
            t = t !== null && t.memoizedState !== null || Ue, i = Wa;
            var r = Ue;
            Wa = n, (Ue = t) && !r ? Ia(e, a, (a.subtreeFlags & 8772) !== 0) : Pa(e, a), Wa = i, Ue = r;
        }
        break;
    case 30: break;
    default: Pa(e, a);
} }
function gb(e) { var t = e.alternate; t !== null && (e.alternate = null, gb(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && jd(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null; }
var Se = null, pt = !1;
function Za(e, t, a) { for (a = a.child; a !== null;)
    bb(e, t, a), a = a.sibling; }
function bb(e, t, a) { if (Nt && typeof Nt.onCommitFiberUnmount === "function")
    try {
        Nt.onCommitFiberUnmount(pl, a);
    }
    catch (r) { } switch (a.tag) {
    case 26:
        Ue || ka(a, t), Za(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
    case 27:
        Ue || ka(a, t);
        var n = Se, i = pt;
        ai(a.type) && (Se = a.stateNode, pt = !1), Za(e, t, a), Pr(a.stateNode), Se = n, pt = i;
        break;
    case 5: Ue || ka(a, t);
    case 6:
        if (n = Se, i = pt, Se = null, Za(e, t, a), Se = n, pt = i, Se !== null)
            if (pt)
                try {
                    (Se.nodeType === 9 ? Se.body : Se.nodeName === "HTML" ? Se.ownerDocument.body : Se).removeChild(a.stateNode);
                }
                catch (r) {
                    le(a, t, r);
                }
            else
                try {
                    Se.removeChild(a.stateNode);
                }
                catch (r) {
                    le(a, t, r);
                }
        break;
    case 18:
        Se !== null && (pt ? (e = Se, ph(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), Lo(e)) : ph(Se, a.stateNode));
        break;
    case 4:
        n = Se, i = pt, Se = a.stateNode.containerInfo, pt = !0, Za(e, t, a), Se = n, pt = i;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        Wn(2, a, t), Ue || Wn(4, a, t), Za(e, t, a);
        break;
    case 1:
        Ue || (ka(a, t), n = a.stateNode, typeof n.componentWillUnmount === "function" && db(a, t, n)), Za(e, t, a);
        break;
    case 21:
        Za(e, t, a);
        break;
    case 22:
        Ue = (n = Ue) || a.memoizedState !== null, Za(e, t, a), Ue = n;
        break;
    default: Za(e, t, a);
} }
function vb(e, t) { if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
    e = e.dehydrated;
    try {
        Lo(e);
    }
    catch (a) {
        le(t, t.return, a);
    }
} }
function yb(e, t) { if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
    try {
        Lo(e);
    }
    catch (a) {
        le(t, t.return, a);
    } }
function C1(e) { switch (e.tag) {
    case 31:
    case 13:
    case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Wf), t;
    case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Wf), t;
    default: throw Error(N(435, e.tag));
} }
function ds(e, t) { var a = C1(e); t.forEach(function (n) { if (!a.has(n)) {
    a.add(n);
    var i = Q1.bind(null, e, n);
    n.then(i, i);
} }); }
function ct(e, t) { var a = t.deletions; if (a !== null)
    for (var n = 0; n < a.length; n++) {
        var i = a[n], r = e, o = t, s = o;
        e: for (; s !== null;) {
            switch (s.tag) {
                case 27:
                    if (ai(s.type)) {
                        Se = s.stateNode, pt = !1;
                        break e;
                    }
                    break;
                case 5:
                    Se = s.stateNode, pt = !1;
                    break e;
                case 3:
                case 4:
                    Se = s.stateNode.containerInfo, pt = !0;
                    break e;
            }
            s = s.return;
        }
        if (Se === null)
            throw Error(N(160));
        bb(r, o, i), Se = null, pt = !1, r = i.alternate, r !== null && (r.return = null), i.return = null;
    } if (t.subtreeFlags & 13886)
    for (t = t.child; t !== null;)
        xb(t, e), t = t.sibling; }
var ca = null;
function xb(e, t) { var a = e.alternate, n = e.flags; switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        ct(t, e), dt(e), n & 4 && (Wn(3, e, e.return), yl(3, e), Wn(5, e, e.return));
        break;
    case 1:
        ct(t, e), dt(e), n & 512 && (Ue || a === null || ka(a, a.return)), n & 64 && Wa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
        break;
    case 26:
        var i = ca;
        if (ct(t, e), dt(e), n & 512 && (Ue || a === null || ka(a, a.return)), n & 4) {
            var r = a !== null ? a.memoizedState : null;
            if (n = e.memoizedState, a === null)
                if (n === null)
                    if (e.stateNode === null) {
                        e: {
                            n = e.type, a = e.memoizedProps, i = i.ownerDocument || i;
                            t: switch (n) {
                                case "title":
                                    if (r = i.getElementsByTagName("title")[0], !r || r[hl] || r[Ze] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop"))
                                        r = i.createElement(n), i.head.insertBefore(r, i.querySelector("head > title"));
                                    Je(r, n, a), r[Ze] = e, je(r), n = r;
                                    break e;
                                case "link":
                                    var o = yh("link", "href", i).get(n + (a.href || ""));
                                    if (o) {
                                        for (var s = 0; s < o.length; s++)
                                            if (r = o[s], r.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && r.getAttribute("rel") === (a.rel == null ? null : a.rel) && r.getAttribute("title") === (a.title == null ? null : a.title) && r.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                                                o.splice(s, 1);
                                                break t;
                                            }
                                    }
                                    r = i.createElement(n), Je(r, n, a), i.head.appendChild(r);
                                    break;
                                case "meta":
                                    if (o = yh("meta", "content", i).get(n + (a.content || ""))) {
                                        for (s = 0; s < o.length; s++)
                                            if (r = o[s], r.getAttribute("content") === (a.content == null ? null : "" + a.content) && r.getAttribute("name") === (a.name == null ? null : a.name) && r.getAttribute("property") === (a.property == null ? null : a.property) && r.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && r.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                                                o.splice(s, 1);
                                                break t;
                                            }
                                    }
                                    r = i.createElement(n), Je(r, n, a), i.head.appendChild(r);
                                    break;
                                default: throw Error(N(468, n));
                            }
                            r[Ze] = e, je(r), n = r;
                        }
                        e.stateNode = n;
                    }
                    else
                        xh(i, e.type, e.stateNode);
                else
                    e.stateNode = vh(i, n, e.memoizedProps);
            else
                r !== n ? (r === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : r.count--, n === null ? xh(i, e.type, e.stateNode) : vh(i, n, e.memoizedProps)) : n === null && e.stateNode !== null && Uc(e, e.memoizedProps, a.memoizedProps);
        }
        break;
    case 27:
        ct(t, e), dt(e), n & 512 && (Ue || a === null || ka(a, a.return)), a !== null && n & 4 && Uc(e, e.memoizedProps, a.memoizedProps);
        break;
    case 5:
        if (ct(t, e), dt(e), n & 512 && (Ue || a === null || ka(a, a.return)), e.flags & 32) {
            i = e.stateNode;
            try {
                Uo(i, "");
            }
            catch (T) {
                le(e, e.return, T);
            }
        }
        n & 4 && e.stateNode != null && (i = e.memoizedProps, Uc(e, i, a !== null ? a.memoizedProps : i)), n & 1024 && (Qc = !0);
        break;
    case 6:
        if (ct(t, e), dt(e), n & 4) {
            if (e.stateNode === null)
                throw Error(N(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
                a.nodeValue = n;
            }
            catch (T) {
                le(e, e.return, T);
            }
        }
        break;
    case 3:
        if (Ms = null, i = ca, ca = tu(t.containerInfo), ct(t, e), ca = i, dt(e), n & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
                Lo(t.containerInfo);
            }
            catch (T) {
                le(e, e.return, T);
            }
        Qc && (Qc = !1, wb(e));
        break;
    case 4:
        n = ca, ca = tu(e.stateNode.containerInfo), ct(t, e), dt(e), ca = n;
        break;
    case 12:
        ct(t, e), dt(e);
        break;
    case 31:
        ct(t, e), dt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ds(e, n)));
        break;
    case 13:
        ct(t, e), dt(e), e.child.flags & 8192 && e.memoizedState !== null !== (a !== null && a.memoizedState !== null) && (vu = kt()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ds(e, n)));
        break;
    case 22:
        i = e.memoizedState !== null;
        var p = a !== null && a.memoizedState !== null, f = Wa, b = Ue;
        if (Wa = f || i, Ue = b || p, ct(t, e), Ue = b, Wa = f, dt(e), n & 8192)
            e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (a === null || p || Wa || Ue || ki(e)), a = null, t = e;;) {
                if (t.tag === 5 || t.tag === 26) {
                    if (a === null) {
                        p = a = t;
                        try {
                            if (r = p.stateNode, i)
                                o = r.style, typeof o.setProperty === "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                            else {
                                s = p.stateNode;
                                var x = p.memoizedProps.style, h = x !== void 0 && x !== null && x.hasOwnProperty("display") ? x.display : null;
                                s.style.display = h == null || typeof h === "boolean" ? "" : ("" + h).trim();
                            }
                        }
                        catch (T) {
                            le(p, p.return, T);
                        }
                    }
                }
                else if (t.tag === 6) {
                    if (a === null) {
                        p = t;
                        try {
                            p.stateNode.nodeValue = i ? "" : p.memoizedProps;
                        }
                        catch (T) {
                            le(p, p.return, T);
                        }
                    }
                }
                else if (t.tag === 18) {
                    if (a === null) {
                        p = t;
                        try {
                            var v = p.stateNode;
                            i ? mh(v, !0) : mh(p.stateNode, !1);
                        }
                        catch (T) {
                            le(p, p.return, T);
                        }
                    }
                }
                else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                    t.child.return = t, t = t.child;
                    continue;
                }
                if (t === e)
                    break e;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e)
                        break e;
                    a === t && (a = null), t = t.return;
                }
                a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
        n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, ds(e, a))));
        break;
    case 19:
        ct(t, e), dt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ds(e, n)));
        break;
    case 30: break;
    case 21: break;
    default: ct(t, e), dt(e);
} }
function dt(e) { var t = e.flags; if (t & 2) {
    try {
        for (var a, n = e.return; n !== null;) {
            if (mb(n)) {
                a = n;
                break;
            }
            n = n.return;
        }
        if (a == null)
            throw Error(N(160));
        switch (a.tag) {
            case 27:
                var i = a.stateNode, r = Hc(e);
                Ys(e, r, i);
                break;
            case 5:
                var o = a.stateNode;
                a.flags & 32 && (Uo(o, ""), a.flags &= -33);
                var s = Hc(e);
                Ys(e, s, o);
                break;
            case 3:
            case 4:
                var p = a.stateNode.containerInfo, f = Hc(e);
                kd(e, f, p);
                break;
            default: throw Error(N(161));
        }
    }
    catch (b) {
        le(e, e.return, b);
    }
    e.flags &= -3;
} t & 4096 && (e.flags &= -4097); }
function wb(e) { if (e.subtreeFlags & 1024)
    for (e = e.child; e !== null;) {
        var t = e;
        wb(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
    } }
function Pa(e, t) { if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null;)
        hb(e, t.alternate, t), t = t.sibling; }
function ki(e) { for (e = e.child; e !== null;) {
    var t = e;
    switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            Wn(4, t, t.return), ki(t);
            break;
        case 1:
            ka(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount === "function" && db(t, t.return, a), ki(t);
            break;
        case 27: Pr(t.stateNode);
        case 26:
        case 5:
            ka(t, t.return), ki(t);
            break;
        case 22:
            t.memoizedState === null && ki(t);
            break;
        case 30:
            ki(t);
            break;
        default: ki(t);
    }
    e = e.sibling;
} }
function Ia(e, t, a) { a = a && (t.subtreeFlags & 8772) !== 0; for (t = t.child; t !== null;) {
    var n = t.alternate, i = e, r = t, o = r.flags;
    switch (r.tag) {
        case 0:
        case 11:
        case 15:
            Ia(i, r, a), yl(4, r);
            break;
        case 1:
            if (Ia(i, r, a), n = r, i = n.stateNode, typeof i.componentDidMount === "function")
                try {
                    i.componentDidMount();
                }
                catch (f) {
                    le(n, n.return, f);
                }
            if (n = r, i = n.updateQueue, i !== null) {
                var s = n.stateNode;
                try {
                    var p = i.shared.hiddenCallbacks;
                    if (p !== null)
                        for (i.shared.hiddenCallbacks = null, i = 0; i < p.length; i++)
                            wg(p[i], s);
                }
                catch (f) {
                    le(n, n.return, f);
                }
            }
            a && o & 64 && cb(r), Vr(r, r.return);
            break;
        case 27: fb(r);
        case 26:
        case 5:
            Ia(i, r, a), a && n === null && o & 4 && pb(r), Vr(r, r.return);
            break;
        case 12:
            Ia(i, r, a);
            break;
        case 31:
            Ia(i, r, a), a && o & 4 && vb(i, r);
            break;
        case 13:
            Ia(i, r, a), a && o & 4 && yb(i, r);
            break;
        case 22:
            r.memoizedState === null && Ia(i, r, a), Vr(r, r.return);
            break;
        case 30: break;
        default: Ia(i, r, a);
    }
    t = t.sibling;
} }
function kp(e, t) { var a = null; e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && bl(a)); }
function Np(e, t) { e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && bl(e)); }
function ua(e, t, a, n) { if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null;)
        Sb(e, t, a, n), t = t.sibling; }
function Sb(e, t, a, n) { var i = t.flags; switch (t.tag) {
    case 0:
    case 11:
    case 15:
        ua(e, t, a, n), i & 2048 && yl(9, t);
        break;
    case 1:
        ua(e, t, a, n);
        break;
    case 3:
        ua(e, t, a, n), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && bl(e)));
        break;
    case 12:
        if (i & 2048) {
            ua(e, t, a, n), e = t.stateNode;
            try {
                var r = t.memoizedProps, o = r.id, s = r.onPostCommit;
                typeof s === "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            }
            catch (p) {
                le(t, t.return, p);
            }
        }
        else
            ua(e, t, a, n);
        break;
    case 31:
        ua(e, t, a, n);
        break;
    case 13:
        ua(e, t, a, n);
        break;
    case 23: break;
    case 22:
        r = t.stateNode, o = t.alternate, t.memoizedState !== null ? r._visibility & 2 ? ua(e, t, a, n) : Yr(e, t) : r._visibility & 2 ? ua(e, t, a, n) : (r._visibility |= 2, uo(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)), i & 2048 && kp(o, t);
        break;
    case 24:
        ua(e, t, a, n), i & 2048 && Np(t.alternate, t);
        break;
    default: ua(e, t, a, n);
} }
function uo(e, t, a, n, i) { i = i && ((t.subtreeFlags & 10256) !== 0 || !1); for (t = t.child; t !== null;) {
    var r = e, o = t, s = a, p = n, f = o.flags;
    switch (o.tag) {
        case 0:
        case 11:
        case 15:
            uo(r, o, s, p, i), yl(8, o);
            break;
        case 23: break;
        case 22:
            var b = o.stateNode;
            o.memoizedState !== null ? b._visibility & 2 ? uo(r, o, s, p, i) : Yr(r, o) : (b._visibility |= 2, uo(r, o, s, p, i)), i && f & 2048 && kp(o.alternate, o);
            break;
        case 24:
            uo(r, o, s, p, i), i && f & 2048 && Np(o.alternate, o);
            break;
        default: uo(r, o, s, p, i);
    }
    t = t.sibling;
} }
function Yr(e, t) { if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null;) {
        var a = e, n = t, i = n.flags;
        switch (n.tag) {
            case 22:
                Yr(a, n), i & 2048 && kp(n.alternate, n);
                break;
            case 24:
                Yr(a, n), i & 2048 && Np(n.alternate, n);
                break;
            default: Yr(a, n);
        }
        t = t.sibling;
    } }
var Hr = 8192;
function so(e, t, a) { if (e.subtreeFlags & Hr)
    for (e = e.child; e !== null;)
        kb(e, t, a), e = e.sibling; }
function kb(e, t, a) { switch (e.tag) {
    case 26:
        so(e, t, a), e.flags & Hr && e.memoizedState !== null && dx(a, ca, e.memoizedState, e.memoizedProps);
        break;
    case 5:
        so(e, t, a);
        break;
    case 3:
    case 4:
        var n = ca;
        ca = tu(e.stateNode.containerInfo), so(e, t, a), ca = n;
        break;
    case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Hr, Hr = 16777216, so(e, t, a), Hr = n) : so(e, t, a));
        break;
    default: so(e, t, a);
} }
function Nb(e) { var t = e.alternate; if (t !== null && (e = t.child, e !== null)) {
    t.child = null;
    do
        t = e.sibling, e.sibling = null, e = t;
    while (e !== null);
} }
function Cr(e) { var t = e.deletions; if ((e.flags & 16) !== 0) {
    if (t !== null)
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            Fe = n, Eb(n, e);
        }
    Nb(e);
} if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null;)
        Tb(e), e = e.sibling; }
function Tb(e) { switch (e.tag) {
    case 0:
    case 11:
    case 15:
        Cr(e), e.flags & 2048 && Wn(9, e, e.return);
        break;
    case 3:
        Cr(e);
        break;
    case 12:
        Cr(e);
        break;
    case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Es(e)) : Cr(e);
        break;
    default: Cr(e);
} }
function Es(e) { var t = e.deletions; if ((e.flags & 16) !== 0) {
    if (t !== null)
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            Fe = n, Eb(n, e);
        }
    Nb(e);
} for (e = e.child; e !== null;) {
    switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
            Wn(8, t, t.return), Es(t);
            break;
        case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Es(t));
            break;
        default: Es(t);
    }
    e = e.sibling;
} }
function Eb(e, t) { for (; Fe !== null;) {
    var a = Fe;
    switch (a.tag) {
        case 0:
        case 11:
        case 15:
            Wn(8, a, t);
            break;
        case 23:
        case 22:
            if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
                var n = a.memoizedState.cachePool.pool;
                n != null && n.refCount++;
            }
            break;
        case 24: bl(a.memoizedState.cache);
    }
    if (n = a.child, n !== null)
        n.return = a, Fe = n;
    else
        e: for (a = e; Fe !== null;) {
            n = Fe;
            var i = n.sibling, r = n.return;
            if (gb(n), n === a) {
                Fe = null;
                break e;
            }
            if (i !== null) {
                i.return = r, Fe = i;
                break e;
            }
            Fe = r;
        }
} }
var M1 = { getCacheForType: function (e) { var t = Ie(He), a = t.data.get(e); return a === void 0 && (a = e(), t.data.set(e, a)), a; }, cacheSignal: function () { return Ie(He).controller.signal; } }, q1 = typeof WeakMap === "function" ? WeakMap : Map, ne = 0, me = null, J = null, W = 0, re = 0, yt = null, Bn = !1, Vo = !1, Tp = !1, dn = 0, Ce = 0, ei = 0, Ri = 0, Ep = 0, St = 0, $o = 0, Xr = null, mt = null, Nd = !1, vu = 0, Cb = 0, Xs = 1 / 0, Zs = null, Vn = null, Be = 0, Yn = null, Go = null, rn = 0, Td = 0, Ed = null, Mb = null, Zr = 0, Cd = null;
function Xt() { return (ne & 2) !== 0 && W !== 0 ? W & -W : K.T !== null ? Mp() : _h(); }
function qb() { if (St === 0)
    if ((W & 536870912) === 0 || ee) {
        var e = ns;
        ns <<= 1, (ns & 3932160) === 0 && (ns = 262144), St = e;
    }
    else
        St = 536870912; return e = Ct.current, e !== null && (e.flags |= 32), St; }
function ft(e, t, a) { if (e === me && (re === 2 || re === 9) || e.cancelPendingCommit !== null)
    _o(e, 0), Ln(e, W, St, !1); if (lu(e, a), (ne & 2) === 0 || e !== me)
    e === me && ((ne & 2) === 0 && (Ri |= a), Ce === 4 && Ln(e, W, St, !1)), pn(e); }
function Rb(e, t, a) { if ((ne & 6) !== 0)
    throw Error(N(327)); var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ml(e, t), i = n ? z1(e, t) : Dc(e, t, !0), r = n; do {
    if (i === 0) {
        Vo && !n && Ln(e, t, 0, !1);
        break;
    }
    else {
        if (a = e.current.alternate, r && !R1(a)) {
            i = Dc(e, t, !1), r = !1;
            continue;
        }
        if (i === 2) {
            if (r = t, e.errorRecoveryDisabledLanes & r)
                var o = 0;
            else
                o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
            if (o !== 0) {
                t = o;
                e: {
                    var s = e;
                    i = Xr;
                    var p = s.current.memoizedState.isDehydrated;
                    if (p && (_o(s, o).flags |= 256), o = Dc(s, o, !1), o !== 2) {
                        if (Tp && !p) {
                            s.errorRecoveryDisabledLanes |= r, Ri |= r, i = 4;
                            break e;
                        }
                        r = mt, mt = i, r !== null && (mt === null ? mt = r : mt.push.apply(mt, r));
                    }
                    i = o;
                }
                if (r = !1, i !== 2)
                    continue;
            }
        }
        if (i === 1) {
            _o(e, 0), Ln(e, t, 0, !0);
            break;
        }
        e: {
            switch (n = e, r = i, r) {
                case 0:
                case 1: throw Error(N(345));
                case 4: if ((t & 4194048) !== t)
                    break;
                case 6:
                    Ln(n, t, St, !Bn);
                    break e;
                case 2:
                    mt = null;
                    break;
                case 3:
                case 5: break;
                default: throw Error(N(329));
            }
            if ((t & 62914560) === t && (i = vu + 300 - kt(), 10 < i)) {
                if (Ln(n, t, St, !Bn), ru(n, 0, !0) !== 0)
                    break e;
                rn = t, n.timeoutHandle = Ib(eh.bind(null, n, a, mt, Zs, Nd, t, St, Ri, $o, Bn, r, "Throttled", -0, 0), i);
                break e;
            }
            eh(n, a, mt, Zs, Nd, t, St, Ri, $o, Bn, r, null, -0, 0);
        }
    }
    break;
} while (1); pn(e); }
function eh(e, t, a, n, i, r, o, s, p, f, b, x, h, v) { if (e.timeoutHandle = -1, x = t.subtreeFlags, x & 8192 || (x & 16785408) === 16785408) {
    x = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: !0, waitingForViewTransition: !1, unsuspend: tn }, kb(t, r, x);
    var T = (r & 62914560) === r ? vu - kt() : (r & 4194048) === r ? Cb - kt() : 0;
    if (T = px(x, T), T !== null) {
        rn = r, e.cancelPendingCommit = T(ah.bind(null, e, t, r, a, n, i, o, s, p, b, x, null, h, v)), Ln(e, r, o, !f);
        return;
    }
} ah(e, t, r, a, n, i, o, s, p); }
function R1(e) { for (var t = e;;) {
    var a = t.tag;
    if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var n = 0; n < a.length; n++) {
            var i = a[n], r = i.getSnapshot;
            i = i.value;
            try {
                if (!Et(r(), i))
                    return !1;
            }
            catch (o) {
                return !1;
            }
        }
    if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
    else {
        if (t === e)
            break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e)
                return !0;
            t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
    }
} return !0; }
function Ln(e, t, a, n) { t &= ~Ep, t &= ~Ri, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes; for (var i = t; 0 < i;) {
    var r = 31 - Tt(i), o = 1 << r;
    n[r] = -1, i &= ~o;
} a !== 0 && Qh(e, a, t); }
function yu() { return (ne & 6) === 0 ? (xl(0, !1), !1) : !0; }
function Cp() { if (J !== null) {
    if (re === 0)
        var e = J.return;
    else
        e = J, an = _i = null, pp(e), qo = null, nl = 0, e = J;
    for (; e !== null;)
        ub(e.alternate, e), e = e.return;
    J = null;
} }
function _o(e, t) { var a = e.timeoutHandle; a !== -1 && (e.timeoutHandle = -1, X1(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), rn = 0, Cp(), me = e, J = a = nn(e.current, null), W = t, re = 0, yt = null, Bn = !1, Vo = ml(e, t), Tp = !1, $o = St = Ep = Ri = ei = Ce = 0, mt = Xr = null, Nd = !1, (t & 8) !== 0 && (t |= t & 32); var n = e.entangledLanes; if (n !== 0)
    for (e = e.entanglements, n &= t; 0 < n;) {
        var i = 31 - Tt(n), r = 1 << i;
        t |= e[i], n &= ~r;
    } return dn = t, du(), a; }
function Ab(e, t) { Y = null, K.H = ol, t === jo || t === mu ? (t = zf(), re = 3) : t === op ? (t = zf(), re = 4) : re = t === wp ? 8 : t !== null && typeof t === "object" && typeof t.then === "function" ? 6 : 1, yt = t, J === null && (Ce = 1, js(e, jt(t, e.current))); }
function zb() { var e = Ct.current; return e === null ? !0 : (W & 4194048) === W ? Yt === null ? !0 : !1 : (W & 62914560) === W || (W & 536870912) !== 0 ? e === Yt : !1; }
function Ob() { var e = K.H; return K.H = ol, e === null ? ol : e; }
function Ub() { var e = K.A; return K.A = M1, e; }
function Ps() { Ce = 4, Bn || (W & 4194048) !== W && Ct.current !== null || (Vo = !0), (ei & 134217727) === 0 && (Ri & 134217727) === 0 || me === null || Ln(me, W, St, !1); }
function Dc(e, t, a) { var n = ne; ne |= 2; var i = Ob(), r = Ub(); if (me !== e || W !== t)
    Zs = null, _o(e, t); t = !1; var o = Ce; e: do
    try {
        if (re !== 0 && J !== null) {
            var s = J, p = yt;
            switch (re) {
                case 8:
                    Cp(), o = 6;
                    break e;
                case 3:
                case 2:
                case 9:
                case 6:
                    Ct.current === null && (t = !0);
                    var f = re;
                    if (re = 0, yt = null, No(e, s, p, f), a && Vo) {
                        o = 0;
                        break e;
                    }
                    break;
                default: f = re, re = 0, yt = null, No(e, s, p, f);
            }
        }
        A1(), o = Ce;
        break;
    }
    catch (b) {
        Ab(e, b);
    }
while (1); return t && e.shellSuspendCounter++, an = _i = null, ne = n, K.H = i, K.A = r, J === null && (me = null, W = 0, du()), o; }
function A1() { for (; J !== null;)
    Hb(J); }
function z1(e, t) { var a = ne; ne |= 2; var n = Ob(), i = Ub(); me !== e || W !== t ? (Zs = null, Xs = kt() + 500, _o(e, t)) : Vo = ml(e, t); e: do
    try {
        if (re !== 0 && J !== null) {
            t = J;
            var r = yt;
            t: switch (re) {
                case 1:
                    re = 0, yt = null, No(e, t, r, 1);
                    break;
                case 2:
                case 9:
                    if (Af(r)) {
                        re = 0, yt = null, th(t);
                        break;
                    }
                    t = function () { re !== 2 && re !== 9 || me !== e || (re = 7), pn(e); }, r.then(t, t);
                    break e;
                case 3:
                    re = 7;
                    break e;
                case 4:
                    re = 5;
                    break e;
                case 7:
                    Af(r) ? (re = 0, yt = null, th(t)) : (re = 0, yt = null, No(e, t, r, 7));
                    break;
                case 5:
                    var o = null;
                    switch (J.tag) {
                        case 26: o = J.memoizedState;
                        case 5:
                        case 27:
                            var s = J;
                            if (o ? av(o) : s.stateNode.complete) {
                                re = 0, yt = null;
                                var p = s.sibling;
                                if (p !== null)
                                    J = p;
                                else {
                                    var f = s.return;
                                    f !== null ? (J = f, xu(f)) : J = null;
                                }
                                break t;
                            }
                    }
                    re = 0, yt = null, No(e, t, r, 5);
                    break;
                case 6:
                    re = 0, yt = null, No(e, t, r, 6);
                    break;
                case 8:
                    Cp(), Ce = 6;
                    break e;
                default: throw Error(N(462));
            }
        }
        O1();
        break;
    }
    catch (b) {
        Ab(e, b);
    }
while (1); if (an = _i = null, K.H = n, K.A = i, ne = a, J !== null)
    return 0; return me = null, W = 0, du(), Ce; }
function O1() { for (; J !== null && !Wy();)
    Hb(J); }
function Hb(e) { var t = sb(e.alternate, e, dn); e.memoizedProps = e.pendingProps, t === null ? xu(e) : J = t; }
function th(e) { var t = e, a = t.alternate; switch (t.tag) {
    case 15:
    case 0:
        t = Xf(a, t, t.pendingProps, t.type, void 0, W);
        break;
    case 11:
        t = Xf(a, t, t.pendingProps, t.type.render, t.ref, W);
        break;
    case 5: pp(t);
    default: ub(a, t), t = J = pg(t, dn), t = sb(a, t, dn);
} e.memoizedProps = e.pendingProps, t === null ? xu(e) : J = t; }
function No(e, t, a, n) { an = _i = null, pp(t), qo = null, nl = 0; var i = t.return; try {
    if (w1(e, i, t, a, W)) {
        Ce = 1, js(e, jt(a, e.current)), J = null;
        return;
    }
}
catch (r) {
    if (i !== null)
        throw J = i, r;
    Ce = 1, js(e, jt(a, e.current)), J = null;
    return;
} if (t.flags & 32768) {
    if (ee || n === 1)
        e = !0;
    else if (Vo || (W & 536870912) !== 0)
        e = !1;
    else if (Bn = e = !0, n === 2 || n === 9 || n === 3 || n === 6)
        n = Ct.current, n !== null && n.tag === 13 && (n.flags |= 16384);
    Qb(t, e);
}
else
    xu(t); }
function xu(e) { var t = e; do {
    if ((t.flags & 32768) !== 0) {
        Qb(t, Bn);
        return;
    }
    e = t.return;
    var a = N1(t.alternate, t, dn);
    if (a !== null) {
        J = a;
        return;
    }
    if (t = t.sibling, t !== null) {
        J = t;
        return;
    }
    J = t = e;
} while (t !== null); Ce === 0 && (Ce = 5); }
function Qb(e, t) { do {
    var a = T1(e.alternate, e);
    if (a !== null) {
        a.flags &= 32767, J = a;
        return;
    }
    if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        J = e;
        return;
    }
    J = e = a;
} while (e !== null); Ce = 6, J = null; }
function ah(e, t, a, n, i, r, o, s, p) { e.cancelPendingCommit = null; do
    wu();
while (Be !== 0); if ((ne & 6) !== 0)
    throw Error(N(327)); if (t !== null) {
    if (t === e.current)
        throw Error(N(177));
    if (r = t.lanes | t.childLanes, r |= Jd, u0(e, a, r, o, s, p), e === me && (J = me = null, W = 0), Go = t, Yn = e, rn = a, Td = r, Ed = i, Mb = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, D1(Us, function () { return Bb(), null; })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
        n = K.T, K.T = null, i = ie.p, ie.p = 2, o = ne, ne |= 4;
        try {
            E1(e, t, a);
        }
        finally {
            ne = o, ie.p = i, K.T = n;
        }
    }
    Be = 1, Db(), $b(), Gb();
} }
function Db() { if (Be === 1) {
    Be = 0;
    var e = Yn, t = Go, a = (t.flags & 13878) !== 0;
    if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = K.T, K.T = null;
        var n = ie.p;
        ie.p = 2;
        var i = ne;
        ne |= 4;
        try {
            xb(t, e);
            var r = Od, o = ig(e.containerInfo), { focusedElem: s, selectionRange: p } = r;
            if (o !== s && s && s.ownerDocument && ng(s.ownerDocument.documentElement, s)) {
                if (p !== null && Id(s)) {
                    var { start: f, end: b } = p;
                    if (b === void 0 && (b = f), "selectionStart" in s)
                        s.selectionStart = f, s.selectionEnd = Math.min(b, s.value.length);
                    else {
                        var x = s.ownerDocument || document, h = x && x.defaultView || window;
                        if (h.getSelection) {
                            var v = h.getSelection(), T = s.textContent.length, k = Math.min(p.start, T), M = p.end === void 0 ? k : Math.min(p.end, T);
                            !v.extend && k > M && (o = M, M = k, k = o);
                            var g = Nf(s, k), m = Nf(s, M);
                            if (g && m && (v.rangeCount !== 1 || v.anchorNode !== g.node || v.anchorOffset !== g.offset || v.focusNode !== m.node || v.focusOffset !== m.offset)) {
                                var y = x.createRange();
                                y.setStart(g.node, g.offset), v.removeAllRanges(), k > M ? (v.addRange(y), v.extend(m.node, m.offset)) : (y.setEnd(m.node, m.offset), v.addRange(y));
                            }
                        }
                    }
                }
                x = [];
                for (v = s; v = v.parentNode;)
                    v.nodeType === 1 && x.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
                typeof s.focus === "function" && s.focus();
                for (s = 0; s < x.length; s++) {
                    var w = x[s];
                    w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
                }
            }
            iu = !!zd, Od = zd = null;
        }
        finally {
            ne = i, ie.p = n, K.T = a;
        }
    }
    e.current = t, Be = 2;
} }
function $b() { if (Be === 2) {
    Be = 0;
    var e = Yn, t = Go, a = (t.flags & 8772) !== 0;
    if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = K.T, K.T = null;
        var n = ie.p;
        ie.p = 2;
        var i = ne;
        ne |= 4;
        try {
            hb(e, t.alternate, t);
        }
        finally {
            ne = i, ie.p = n, K.T = a;
        }
    }
    Be = 3;
} }
function Gb() { if (Be === 4 || Be === 3) {
    Be = 0, e0();
    var e = Yn, t = Go, a = rn, n = Mb;
    (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Be = 5 : (Be = 0, Go = Yn = null, _b(e, e.pendingLanes));
    var i = e.pendingLanes;
    if (i === 0 && (Vn = null), Fd(a), t = t.stateNode, Nt && typeof Nt.onCommitFiberRoot === "function")
        try {
            Nt.onCommitFiberRoot(pl, t, void 0, (t.current.flags & 128) === 128);
        }
        catch (p) { }
    if (n !== null) {
        t = K.T, i = ie.p, ie.p = 2, K.T = null;
        try {
            for (var r = e.onRecoverableError, o = 0; o < n.length; o++) {
                var s = n[o];
                r(s.value, { componentStack: s.stack });
            }
        }
        finally {
            K.T = t, ie.p = i;
        }
    }
    (rn & 3) !== 0 && wu(), pn(e), i = e.pendingLanes, (a & 261930) !== 0 && (i & 42) !== 0 ? e === Cd ? Zr++ : (Zr = 0, Cd = e) : Zr = 0, xl(0, !1);
} }
function _b(e, t) { (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, bl(t))); }
function wu() { return Db(), $b(), Gb(), Bb(); }
function Bb() { if (Be !== 5)
    return !1; var e = Yn, t = Td; Td = 0; var a = Fd(rn), n = K.T, i = ie.p; try {
    ie.p = 32 > a ? 32 : a, K.T = null, a = Ed, Ed = null;
    var r = Yn, o = rn;
    if (Be = 0, Go = Yn = null, rn = 0, (ne & 6) !== 0)
        throw Error(N(331));
    var s = ne;
    if (ne |= 4, Tb(r.current), Sb(r, r.current, o, a), ne = s, xl(0, !1), Nt && typeof Nt.onPostCommitFiberRoot === "function")
        try {
            Nt.onPostCommitFiberRoot(pl, r);
        }
        catch (p) { }
    return !0;
}
finally {
    ie.p = i, K.T = n, _b(e, t);
} }
function nh(e, t, a) { t = jt(a, t), t = xd(e.stateNode, t, 2), e = qi(e, t, 2), e !== null && (lu(e, 2), pn(e)); }
function le(e, t, a) { if (e.tag === 3)
    nh(e, e, a);
else
    for (; t !== null;) {
        if (t.tag === 3) {
            nh(t, e, a);
            break;
        }
        else if (t.tag === 1) {
            var n = t.stateNode;
            if (typeof t.type.getDerivedStateFromError === "function" || typeof n.componentDidCatch === "function" && (Vn === null || !Vn.has(n))) {
                e = jt(a, e), a = ab(2), n = qi(t, a, 2), n !== null && (nb(a, n, t, e), lu(n, 2), pn(n));
                break;
            }
        }
        t = t.return;
    } }
function $c(e, t, a) { var n = e.pingCache; if (n === null) {
    n = e.pingCache = new q1;
    var i = new Set;
    n.set(t, i);
}
else
    i = n.get(t), i === void 0 && (i = new Set, n.set(t, i)); i.has(a) || (Tp = !0, i.add(a), e = U1.bind(null, e, t, a), t.then(e, e)); }
function U1(e, t, a) { var n = e.pingCache; n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, me === e && (W & a) === a && (Ce === 4 || Ce === 3 && (W & 62914560) === W && 300 > kt() - vu ? (ne & 2) === 0 && _o(e, 0) : Ep |= a, $o === W && ($o = 0)), pn(e); }
function Lb(e, t) { t === 0 && (t = Hh()), e = Gi(e, t), e !== null && (lu(e, t), pn(e)); }
function H1(e) { var t = e.memoizedState, a = 0; t !== null && (a = t.retryLane), Lb(e, a); }
function Q1(e, t) { var a = 0; switch (e.tag) {
    case 31:
    case 13:
        var { stateNode: n, memoizedState: i } = e;
        i !== null && (a = i.retryLane);
        break;
    case 19:
        n = e.stateNode;
        break;
    case 22:
        n = e.stateNode._retryCache;
        break;
    default: throw Error(N(314));
} n !== null && n.delete(t), Lb(e, a); }
function D1(e, t) { return Kd(e, t); }
var Is = null, co = null, Md = !1, Js = !1, Gc = !1, Kn = 0;
function pn(e) { e !== co && e.next === null && (co === null ? Is = co = e : co = co.next = e), Js = !0, Md || (Md = !0, G1()); }
function xl(e, t) { if (!Gc && Js) {
    Gc = !0;
    do {
        var a = !1;
        for (var n = Is; n !== null;) {
            if (!t)
                if (e !== 0) {
                    var i = n.pendingLanes;
                    if (i === 0)
                        var r = 0;
                    else {
                        var o = n.suspendedLanes, s = n.pingedLanes;
                        r = (1 << 31 - Tt(42 | e) + 1) - 1, r &= i & ~(o & ~s), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
                    }
                    r !== 0 && (a = !0, ih(n, r));
                }
                else
                    r = W, r = ru(n, n === me ? r : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (r & 3) === 0 || ml(n, r) || (a = !0, ih(n, r));
            n = n.next;
        }
    } while (a);
    Gc = !1;
} }
function $1() { Kb(); }
function Kb() { Js = Md = !1; var e = 0; Kn !== 0 && Y1() && (e = Kn); for (var t = kt(), a = null, n = Is; n !== null;) {
    var i = n.next, r = Fb(n, t);
    if (r === 0)
        n.next = null, a === null ? Is = i : a.next = i, i === null && (co = a);
    else if (a = n, e !== 0 || (r & 3) !== 0)
        Js = !0;
    n = i;
} Be !== 0 && Be !== 5 || xl(e, !1), Kn !== 0 && (Kn = 0); }
function Fb(e, t) { for (var { suspendedLanes: a, pingedLanes: n, expirationTimes: i } = e, r = e.pendingLanes & -62914561; 0 < r;) {
    var o = 31 - Tt(r), s = 1 << o, p = i[o];
    if (p === -1) {
        if ((s & a) === 0 || (s & n) !== 0)
            i[o] = s0(s, t);
    }
    else
        p <= t && (e.expiredLanes |= s);
    r &= ~s;
} if (t = me, a = W, a = ru(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (re === 2 || re === 9) || e.cancelPendingCommit !== null)
    return n !== null && n !== null && hc(n), e.callbackNode = null, e.callbackPriority = 0; if ((a & 3) === 0 || ml(e, a)) {
    if (t = a & -a, t === e.callbackPriority)
        return t;
    switch (n !== null && hc(n), Fd(a)) {
        case 2:
        case 8:
            a = Oh;
            break;
        case 32:
            a = Us;
            break;
        case 268435456:
            a = Uh;
            break;
        default: a = Us;
    }
    return n = jb.bind(null, e), a = Kd(a, n), e.callbackPriority = t, e.callbackNode = a, t;
} return n !== null && n !== null && hc(n), e.callbackPriority = 2, e.callbackNode = null, 2; }
function jb(e, t) { if (Be !== 0 && Be !== 5)
    return e.callbackNode = null, e.callbackPriority = 0, null; var a = e.callbackNode; if (wu() && e.callbackNode !== a)
    return null; var n = W; if (n = ru(e, e === me ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0)
    return null; return Rb(e, n, t), Fb(e, kt()), e.callbackNode != null && e.callbackNode === a ? jb.bind(null, e) : null; }
function ih(e, t) { if (wu())
    return null; Rb(e, t, !0); }
function G1() { Z1(function () { (ne & 6) !== 0 ? Kd(zh, $1) : Kb(); }); }
function Mp() { if (Kn === 0) {
    var e = Ho;
    e === 0 && (e = as, as <<= 1, (as & 261888) === 0 && (as = 256)), Kn = e;
} return Kn; }
function oh(e) { return e == null || typeof e === "symbol" || typeof e === "boolean" ? null : typeof e === "function" ? e : gs("" + e); }
function rh(e, t) { var a = t.ownerDocument.createElement("input"); return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e; }
function _1(e, t, a, n, i) { if (t === "submit" && a && a.stateNode === i) {
    var r = oh((i[ht] || null).action), o = n.submitter;
    o && (t = (t = o[ht] || null) ? oh(t.formAction) : o.getAttribute("formAction"), t !== null && (r = t, o = null));
    var s = new su("action", "action", null, n, i);
    e.push({ event: s, listeners: [{ instance: null, listener: function () { if (n.defaultPrevented) {
                    if (Kn !== 0) {
                        var p = o ? rh(i, o) : new FormData(i);
                        vd(a, { pending: !0, data: p, method: i.method, action: r }, null, p);
                    }
                }
                else
                    typeof r === "function" && (s.preventDefault(), p = o ? rh(i, o) : new FormData(i), vd(a, { pending: !0, data: p, method: i.method, action: r }, r, p)); }, currentTarget: i }] });
} }
for (Qr = 0; Qr < rd.length; Qr++)
    Dr = rd[Qr], qd = Dr.toLowerCase(), Rd = Dr[0].toUpperCase() + Dr.slice(1), da(qd, "on" + Rd);
var Dr, qd, Rd, Qr;
da(rg, "onAnimationEnd");
da(lg, "onAnimationIteration");
da(sg, "onAnimationStart");
da("dblclick", "onDoubleClick");
da("focusin", "onFocus");
da("focusout", "onBlur");
da(t1, "onTransitionRun");
da(a1, "onTransitionStart");
da(n1, "onTransitionCancel");
da(ug, "onTransitionEnd");
Oo("onMouseEnter", ["mouseout", "mouseover"]);
Oo("onMouseLeave", ["mouseout", "mouseover"]);
Oo("onPointerEnter", ["pointerout", "pointerover"]);
Oo("onPointerLeave", ["pointerout", "pointerover"]);
Qi("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Qi("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Qi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Qi("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Qi("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Qi("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var rl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), B1 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(rl));
function Vb(e, t) { t = (t & 4) !== 0; for (var a = 0; a < e.length; a++) {
    var n = e[a], i = n.event;
    n = n.listeners;
    e: {
        var r = void 0;
        if (t)
            for (var o = n.length - 1; 0 <= o; o--) {
                var s = n[o], p = s.instance, f = s.currentTarget;
                if (s = s.listener, p !== r && i.isPropagationStopped())
                    break e;
                r = s, i.currentTarget = f;
                try {
                    r(i);
                }
                catch (b) {
                    Qs(b);
                }
                i.currentTarget = null, r = p;
            }
        else
            for (o = 0; o < n.length; o++) {
                if (s = n[o], p = s.instance, f = s.currentTarget, s = s.listener, p !== r && i.isPropagationStopped())
                    break e;
                r = s, i.currentTarget = f;
                try {
                    r(i);
                }
                catch (b) {
                    Qs(b);
                }
                i.currentTarget = null, r = p;
            }
    }
} }
function I(e, t) { var a = t[Jc]; a === void 0 && (a = t[Jc] = new Set); var n = e + "__bubble"; a.has(n) || (Xb(t, e, 2, !1), a.add(n)); }
function _c(e, t, a) { var n = 0; t && (n |= 4), Xb(a, e, n, t); }
var ps = "_reactListening" + Math.random().toString(36).slice(2);
function Yb(e) { if (!e[ps]) {
    e[ps] = !0, Bh.forEach(function (a) { a !== "selectionchange" && (B1.has(a) || _c(a, !1, e), _c(a, !0, e)); });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ps] || (t[ps] = !0, _c("selectionchange", !1, t));
} }
function Xb(e, t, a, n) { switch (ov(t)) {
    case 2:
        var i = bx;
        break;
    case 8:
        i = vx;
        break;
    default: i = zp;
} a = i.bind(null, t, a, e), i = void 0, !nd || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), n ? i !== void 0 ? e.addEventListener(t, a, { capture: !0, passive: i }) : e.addEventListener(t, a, !0) : i !== void 0 ? e.addEventListener(t, a, { passive: i }) : e.addEventListener(t, a, !1); }
function Bc(e, t, a, n, i) { var r = n; if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
    e: for (;;) {
        if (n === null)
            return;
        var o = n.tag;
        if (o === 3 || o === 4) {
            var s = n.stateNode.containerInfo;
            if (s === i)
                break;
            if (o === 4)
                for (o = n.return; o !== null;) {
                    var p = o.tag;
                    if ((p === 3 || p === 4) && o.stateNode.containerInfo === i)
                        return;
                    o = o.return;
                }
            for (; s !== null;) {
                if (o = ho(s), o === null)
                    return;
                if (p = o.tag, p === 5 || p === 6 || p === 26 || p === 27) {
                    n = r = o;
                    continue e;
                }
                s = s.parentNode;
            }
        }
        n = n.return;
    } Zh(function () { var f = r, b = Yd(a), x = []; e: {
    var h = cg.get(e);
    if (h !== void 0) {
        var v = su, T = e;
        switch (e) {
            case "keypress": if (vs(a) === 0)
                break e;
            case "keydown":
            case "keyup":
                v = O0;
                break;
            case "focusin":
                T = "focus", v = xc;
                break;
            case "focusout":
                T = "blur", v = xc;
                break;
            case "beforeblur":
            case "afterblur":
                v = xc;
                break;
            case "click": if (a.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
                v = hf;
                break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
                v = w0;
                break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
                v = Q0;
                break;
            case rg:
            case lg:
            case sg:
                v = N0;
                break;
            case ug:
                v = $0;
                break;
            case "scroll":
            case "scrollend":
                v = y0;
                break;
            case "wheel":
                v = _0;
                break;
            case "copy":
            case "cut":
            case "paste":
                v = E0;
                break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
                v = bf;
                break;
            case "toggle":
            case "beforetoggle": v = L0;
        }
        var k = (t & 4) !== 0, M = !k && (e === "scroll" || e === "scrollend"), g = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var m = f, y; m !== null;) {
            var w = m;
            if (y = w.stateNode, w = w.tag, w !== 5 && w !== 26 && w !== 27 || y === null || g === null || (w = Jr(m, g), w != null && k.push(ll(m, w, y))), M)
                break;
            m = m.return;
        }
        0 < k.length && (h = new v(h, T, null, a, b), x.push({ event: h, listeners: k }));
    }
} if ((t & 7) === 0) {
    e: {
        if (h = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", h && a !== ad && (T = a.relatedTarget || a.fromElement) && (ho(T) || T[fl]))
            break e;
        if (v || h) {
            if (h = b.window === b ? b : (h = b.ownerDocument) ? h.defaultView || h.parentWindow : window, v) {
                if (T = a.relatedTarget || a.toElement, v = f, T = T ? ho(T) : null, T !== null && (M = dl(T), k = T.tag, T !== M || k !== 5 && k !== 27 && k !== 6))
                    T = null;
            }
            else
                v = null, T = f;
            if (v !== T) {
                if (k = hf, w = "onMouseLeave", g = "onMouseEnter", m = "mouse", e === "pointerout" || e === "pointerover")
                    k = bf, w = "onPointerLeave", g = "onPointerEnter", m = "pointer";
                if (M = v == null ? h : Ar(v), y = T == null ? h : Ar(T), h = new k(w, m + "leave", v, a, b), h.target = M, h.relatedTarget = y, w = null, ho(b) === f && (k = new k(g, m + "enter", T, a, b), k.target = y, k.relatedTarget = M, w = k), M = w, v && T)
                    t: {
                        k = L1, g = v, m = T, y = 0;
                        for (w = g; w; w = k(w))
                            y++;
                        w = 0;
                        for (var R = m; R; R = k(R))
                            w++;
                        for (; 0 < y - w;)
                            g = k(g), y--;
                        for (; 0 < w - y;)
                            m = k(m), w--;
                        for (; y--;) {
                            if (g === m || m !== null && g === m.alternate) {
                                k = g;
                                break t;
                            }
                            g = k(g), m = k(m);
                        }
                        k = null;
                    }
                else
                    k = null;
                v !== null && lh(x, h, v, k, !1), T !== null && M !== null && lh(x, M, T, k, !0);
            }
        }
    }
    e: {
        if (h = f ? Ar(f) : window, v = h.nodeName && h.nodeName.toLowerCase(), v === "select" || v === "input" && h.type === "file")
            var D = wf;
        else if (xf(h))
            if (tg)
                D = J0;
            else {
                D = P0;
                var q = Z0;
            }
        else
            v = h.nodeName, !v || v.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? f && Vd(f.elementType) && (D = wf) : D = I0;
        if (D && (D = D(e, f))) {
            eg(x, D, a, b);
            break e;
        }
        q && q(e, h, f), e === "focusout" && f && h.type === "number" && f.memoizedProps.value != null && td(h, "number", h.value);
    }
    switch (q = f ? Ar(f) : window, e) {
        case "focusin":
            if (xf(q) || q.contentEditable === "true")
                vo = q, id = f, _r = null;
            break;
        case "focusout":
            _r = id = vo = null;
            break;
        case "mousedown":
            od = !0;
            break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
            od = !1, Tf(x, a, b);
            break;
        case "selectionchange": if (e1)
            break;
        case "keydown":
        case "keyup": Tf(x, a, b);
    }
    var H;
    if (Pd)
        e: {
            switch (e) {
                case "compositionstart":
                    var B = "onCompositionStart";
                    break e;
                case "compositionend":
                    B = "onCompositionEnd";
                    break e;
                case "compositionupdate":
                    B = "onCompositionUpdate";
                    break e;
            }
            B = void 0;
        }
    else
        bo ? Jh(e, a) && (B = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (B = "onCompositionStart");
    if (B && (Ih && a.locale !== "ko" && (bo || B !== "onCompositionStart" ? B === "onCompositionEnd" && bo && (H = Ph()) : (_n = b, Xd = ("value" in _n) ? _n.value : _n.textContent, bo = !0)), q = Ws(f, B), 0 < q.length && (B = new gf(B, e, null, a, b), x.push({ event: B, listeners: q }), H ? B.data = H : (H = Wh(a), H !== null && (B.data = H)))), H = F0 ? j0(e, a) : V0(e, a))
        B = Ws(f, "onBeforeInput"), 0 < B.length && (q = new gf("onBeforeInput", "beforeinput", null, a, b), x.push({ event: q, listeners: B }), q.data = H);
    _1(x, e, f, a, b);
} Vb(x, t); }); }
function ll(e, t, a) { return { instance: e, listener: t, currentTarget: a }; }
function Ws(e, t) { for (var a = t + "Capture", n = []; e !== null;) {
    var i = e, r = i.stateNode;
    if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || r === null || (i = Jr(e, a), i != null && n.unshift(ll(e, i, r)), i = Jr(e, t), i != null && n.push(ll(e, i, r))), e.tag === 3)
        return n;
    e = e.return;
} return []; }
function L1(e) { if (e === null)
    return null; do
    e = e.return;
while (e && e.tag !== 5 && e.tag !== 27); return e ? e : null; }
function lh(e, t, a, n, i) { for (var r = t._reactName, o = []; a !== null && a !== n;) {
    var s = a, p = s.alternate, f = s.stateNode;
    if (s = s.tag, p !== null && p === n)
        break;
    s !== 5 && s !== 26 && s !== 27 || f === null || (p = f, i ? (f = Jr(a, r), f != null && o.unshift(ll(a, f, p))) : i || (f = Jr(a, r), f != null && o.push(ll(a, f, p)))), a = a.return;
} o.length !== 0 && e.push({ event: t, listeners: o }); }
var K1 = /\r\n?/g, F1 = /\u0000|\uFFFD/g;
function sh(e) {
    return (typeof e === "string" ? e : "" + e).replace(K1, `
`).replace(F1, "");
}
function Zb(e, t) { return t = sh(t), sh(e) === t ? !0 : !1; }
function ce(e, t, a, n, i, r) { switch (a) {
    case "children":
        typeof n === "string" ? t === "body" || t === "textarea" && n === "" || Uo(e, n) : (typeof n === "number" || typeof n === "bigint") && t !== "body" && Uo(e, "" + n);
        break;
    case "className":
        os(e, "class", n);
        break;
    case "tabIndex":
        os(e, "tabindex", n);
        break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
        os(e, a, n);
        break;
    case "style":
        Xh(e, n, r);
        break;
    case "data": if (t !== "object") {
        os(e, "data", n);
        break;
    }
    case "src":
    case "href":
        if (n === "" && (t !== "a" || a !== "href")) {
            e.removeAttribute(a);
            break;
        }
        if (n == null || typeof n === "function" || typeof n === "symbol" || typeof n === "boolean") {
            e.removeAttribute(a);
            break;
        }
        n = gs("" + n), e.setAttribute(a, n);
        break;
    case "action":
    case "formAction":
        if (typeof n === "function") {
            e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
        }
        else
            typeof r === "function" && (a === "formAction" ? (t !== "input" && ce(e, t, "name", i.name, i, null), ce(e, t, "formEncType", i.formEncType, i, null), ce(e, t, "formMethod", i.formMethod, i, null), ce(e, t, "formTarget", i.formTarget, i, null)) : (ce(e, t, "encType", i.encType, i, null), ce(e, t, "method", i.method, i, null), ce(e, t, "target", i.target, i, null)));
        if (n == null || typeof n === "symbol" || typeof n === "boolean") {
            e.removeAttribute(a);
            break;
        }
        n = gs("" + n), e.setAttribute(a, n);
        break;
    case "onClick":
        n != null && (e.onclick = tn);
        break;
    case "onScroll":
        n != null && I("scroll", e);
        break;
    case "onScrollEnd":
        n != null && I("scrollend", e);
        break;
    case "dangerouslySetInnerHTML":
        if (n != null) {
            if (typeof n !== "object" || !("__html" in n))
                throw Error(N(61));
            if (a = n.__html, a != null) {
                if (i.children != null)
                    throw Error(N(60));
                e.innerHTML = a;
            }
        }
        break;
    case "multiple":
        e.multiple = n && typeof n !== "function" && typeof n !== "symbol";
        break;
    case "muted":
        e.muted = n && typeof n !== "function" && typeof n !== "symbol";
        break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref": break;
    case "autoFocus": break;
    case "xlinkHref":
        if (n == null || typeof n === "function" || typeof n === "boolean" || typeof n === "symbol") {
            e.removeAttribute("xlink:href");
            break;
        }
        a = gs("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
        n != null && typeof n !== "function" && typeof n !== "symbol" ? e.setAttribute(a, "" + n) : e.removeAttribute(a);
        break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
        n && typeof n !== "function" && typeof n !== "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
    case "capture":
    case "download":
        n === !0 ? e.setAttribute(a, "") : n !== !1 && n != null && typeof n !== "function" && typeof n !== "symbol" ? e.setAttribute(a, n) : e.removeAttribute(a);
        break;
    case "cols":
    case "rows":
    case "size":
    case "span":
        n != null && typeof n !== "function" && typeof n !== "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(a, n) : e.removeAttribute(a);
        break;
    case "rowSpan":
    case "start":
        n == null || typeof n === "function" || typeof n === "symbol" || isNaN(n) ? e.removeAttribute(a) : e.setAttribute(a, n);
        break;
    case "popover":
        I("beforetoggle", e), I("toggle", e), hs(e, "popover", n);
        break;
    case "xlinkActuate":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
        break;
    case "xlinkArcrole":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
        break;
    case "xlinkRole":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
        break;
    case "xlinkShow":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
        break;
    case "xlinkTitle":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
        break;
    case "xlinkType":
        Ya(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
        break;
    case "xmlBase":
        Ya(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
        break;
    case "xmlLang":
        Ya(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
        break;
    case "xmlSpace":
        Ya(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
        break;
    case "is":
        hs(e, "is", n);
        break;
    case "innerText":
    case "textContent": break;
    default: if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
        a = b0.get(a) || a, hs(e, a, n);
} }
function Ad(e, t, a, n, i, r) { switch (a) {
    case "style":
        Xh(e, n, r);
        break;
    case "dangerouslySetInnerHTML":
        if (n != null) {
            if (typeof n !== "object" || !("__html" in n))
                throw Error(N(61));
            if (a = n.__html, a != null) {
                if (i.children != null)
                    throw Error(N(60));
                e.innerHTML = a;
            }
        }
        break;
    case "children":
        typeof n === "string" ? Uo(e, n) : (typeof n === "number" || typeof n === "bigint") && Uo(e, "" + n);
        break;
    case "onScroll":
        n != null && I("scroll", e);
        break;
    case "onScrollEnd":
        n != null && I("scrollend", e);
        break;
    case "onClick":
        n != null && (e.onclick = tn);
        break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref": break;
    case "innerText":
    case "textContent": break;
    default: if (!Lh.hasOwnProperty(a))
        e: {
            if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), t = a.slice(2, i ? a.length - 7 : void 0), r = e[ht] || null, r = r != null ? r[a] : null, typeof r === "function" && e.removeEventListener(t, r, i), typeof n === "function")) {
                typeof r !== "function" && r !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, i);
                break e;
            }
            a in e ? e[a] = n : n === !0 ? e.setAttribute(a, "") : hs(e, a, n);
        }
} }
function Je(e, t, a) { switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li": break;
    case "img":
        I("error", e), I("load", e);
        var n = !1, i = !1, r;
        for (r in a)
            if (a.hasOwnProperty(r)) {
                var o = a[r];
                if (o != null)
                    switch (r) {
                        case "src":
                            n = !0;
                            break;
                        case "srcSet":
                            i = !0;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML": throw Error(N(137, t));
                        default: ce(e, t, r, o, a, null);
                    }
            }
        i && ce(e, t, "srcSet", a.srcSet, a, null), n && ce(e, t, "src", a.src, a, null);
        return;
    case "input":
        I("invalid", e);
        var s = r = o = i = null, p = null, f = null;
        for (n in a)
            if (a.hasOwnProperty(n)) {
                var b = a[n];
                if (b != null)
                    switch (n) {
                        case "name":
                            i = b;
                            break;
                        case "type":
                            o = b;
                            break;
                        case "checked":
                            p = b;
                            break;
                        case "defaultChecked":
                            f = b;
                            break;
                        case "value":
                            r = b;
                            break;
                        case "defaultValue":
                            s = b;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (b != null)
                                throw Error(N(137, t));
                            break;
                        default: ce(e, t, n, b, a, null);
                    }
            }
        jh(e, r, s, p, f, o, i, !1);
        return;
    case "select":
        I("invalid", e), n = o = r = null;
        for (i in a)
            if (a.hasOwnProperty(i) && (s = a[i], s != null))
                switch (i) {
                    case "value":
                        r = s;
                        break;
                    case "defaultValue":
                        o = s;
                        break;
                    case "multiple": n = s;
                    default: ce(e, t, i, s, a, null);
                }
        t = r, a = o, e.multiple = !!n, t != null ? Eo(e, !!n, t, !1) : a != null && Eo(e, !!n, a, !0);
        return;
    case "textarea":
        I("invalid", e), r = i = n = null;
        for (o in a)
            if (a.hasOwnProperty(o) && (s = a[o], s != null))
                switch (o) {
                    case "value":
                        n = s;
                        break;
                    case "defaultValue":
                        i = s;
                        break;
                    case "children":
                        r = s;
                        break;
                    case "dangerouslySetInnerHTML":
                        if (s != null)
                            throw Error(N(91));
                        break;
                    default: ce(e, t, o, s, a, null);
                }
        Yh(e, n, i, r);
        return;
    case "option":
        for (p in a)
            if (a.hasOwnProperty(p) && (n = a[p], n != null))
                switch (p) {
                    case "selected":
                        e.selected = n && typeof n !== "function" && typeof n !== "symbol";
                        break;
                    default: ce(e, t, p, n, a, null);
                }
        return;
    case "dialog":
        I("beforetoggle", e), I("toggle", e), I("cancel", e), I("close", e);
        break;
    case "iframe":
    case "object":
        I("load", e);
        break;
    case "video":
    case "audio":
        for (n = 0; n < rl.length; n++)
            I(rl[n], e);
        break;
    case "image":
        I("error", e), I("load", e);
        break;
    case "details":
        I("toggle", e);
        break;
    case "embed":
    case "source":
    case "link": I("error", e), I("load", e);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
        for (f in a)
            if (a.hasOwnProperty(f) && (n = a[f], n != null))
                switch (f) {
                    case "children":
                    case "dangerouslySetInnerHTML": throw Error(N(137, t));
                    default: ce(e, t, f, n, a, null);
                }
        return;
    default: if (Vd(t)) {
        for (b in a)
            a.hasOwnProperty(b) && (n = a[b], n !== void 0 && Ad(e, t, b, n, a, void 0));
        return;
    }
} for (s in a)
    a.hasOwnProperty(s) && (n = a[s], n != null && ce(e, t, s, n, a, null)); }
function j1(e, t, a, n) { switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li": break;
    case "input":
        var i = null, r = null, o = null, s = null, p = null, f = null, b = null;
        for (v in a) {
            var x = a[v];
            if (a.hasOwnProperty(v) && x != null)
                switch (v) {
                    case "checked": break;
                    case "value": break;
                    case "defaultValue": p = x;
                    default: n.hasOwnProperty(v) || ce(e, t, v, null, n, x);
                }
        }
        for (var h in n) {
            var v = n[h];
            if (x = a[h], n.hasOwnProperty(h) && (v != null || x != null))
                switch (h) {
                    case "type":
                        r = v;
                        break;
                    case "name":
                        i = v;
                        break;
                    case "checked":
                        f = v;
                        break;
                    case "defaultChecked":
                        b = v;
                        break;
                    case "value":
                        o = v;
                        break;
                    case "defaultValue":
                        s = v;
                        break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (v != null)
                            throw Error(N(137, t));
                        break;
                    default: v !== x && ce(e, t, h, v, n, x);
                }
        }
        ed(e, o, s, p, f, b, r, i);
        return;
    case "select":
        v = o = s = h = null;
        for (r in a)
            if (p = a[r], a.hasOwnProperty(r) && p != null)
                switch (r) {
                    case "value": break;
                    case "multiple": v = p;
                    default: n.hasOwnProperty(r) || ce(e, t, r, null, n, p);
                }
        for (i in n)
            if (r = n[i], p = a[i], n.hasOwnProperty(i) && (r != null || p != null))
                switch (i) {
                    case "value":
                        h = r;
                        break;
                    case "defaultValue":
                        s = r;
                        break;
                    case "multiple": o = r;
                    default: r !== p && ce(e, t, i, r, n, p);
                }
        t = s, a = o, n = v, h != null ? Eo(e, !!a, h, !1) : !!n !== !!a && (t != null ? Eo(e, !!a, t, !0) : Eo(e, !!a, a ? [] : "", !1));
        return;
    case "textarea":
        v = h = null;
        for (s in a)
            if (i = a[s], a.hasOwnProperty(s) && i != null && !n.hasOwnProperty(s))
                switch (s) {
                    case "value": break;
                    case "children": break;
                    default: ce(e, t, s, null, n, i);
                }
        for (o in n)
            if (i = n[o], r = a[o], n.hasOwnProperty(o) && (i != null || r != null))
                switch (o) {
                    case "value":
                        h = i;
                        break;
                    case "defaultValue":
                        v = i;
                        break;
                    case "children": break;
                    case "dangerouslySetInnerHTML":
                        if (i != null)
                            throw Error(N(91));
                        break;
                    default: i !== r && ce(e, t, o, i, n, r);
                }
        Vh(e, h, v);
        return;
    case "option":
        for (var T in a)
            if (h = a[T], a.hasOwnProperty(T) && h != null && !n.hasOwnProperty(T))
                switch (T) {
                    case "selected":
                        e.selected = !1;
                        break;
                    default: ce(e, t, T, null, n, h);
                }
        for (p in n)
            if (h = n[p], v = a[p], n.hasOwnProperty(p) && h !== v && (h != null || v != null))
                switch (p) {
                    case "selected":
                        e.selected = h && typeof h !== "function" && typeof h !== "symbol";
                        break;
                    default: ce(e, t, p, h, n, v);
                }
        return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
        for (var k in a)
            h = a[k], a.hasOwnProperty(k) && h != null && !n.hasOwnProperty(k) && ce(e, t, k, null, n, h);
        for (f in n)
            if (h = n[f], v = a[f], n.hasOwnProperty(f) && h !== v && (h != null || v != null))
                switch (f) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (h != null)
                            throw Error(N(137, t));
                        break;
                    default: ce(e, t, f, h, n, v);
                }
        return;
    default: if (Vd(t)) {
        for (var M in a)
            h = a[M], a.hasOwnProperty(M) && h !== void 0 && !n.hasOwnProperty(M) && Ad(e, t, M, void 0, n, h);
        for (b in n)
            h = n[b], v = a[b], !n.hasOwnProperty(b) || h === v || h === void 0 && v === void 0 || Ad(e, t, b, h, n, v);
        return;
    }
} for (var g in a)
    h = a[g], a.hasOwnProperty(g) && h != null && !n.hasOwnProperty(g) && ce(e, t, g, null, n, h); for (x in n)
    h = n[x], v = a[x], !n.hasOwnProperty(x) || h === v || h == null && v == null || ce(e, t, x, h, n, v); }
function uh(e) { switch (e) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link": return !0;
    default: return !1;
} }
function V1() { if (typeof performance.getEntriesByType === "function") {
    for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), n = 0; n < a.length; n++) {
        var i = a[n], { transferSize: r, initiatorType: o, duration: s } = i;
        if (r && s && uh(o)) {
            o = 0, s = i.responseEnd;
            for (n += 1; n < a.length; n++) {
                var p = a[n], f = p.startTime;
                if (f > s)
                    break;
                var b = p.transferSize, x = p.initiatorType;
                b && uh(x) && (p = p.responseEnd, o += b * (p < s ? 1 : (s - f) / (p - f)));
            }
            if (--n, t += 8 * (r + o) / (i.duration / 1000), e++, 10 < e)
                break;
        }
    }
    if (0 < e)
        return t / e / 1e6;
} return navigator.connection && (e = navigator.connection.downlink, typeof e === "number") ? e : 5; }
var zd = null, Od = null;
function eu(e) { return e.nodeType === 9 ? e : e.ownerDocument; }
function ch(e) { switch (e) {
    case "http://www.w3.org/2000/svg": return 1;
    case "http://www.w3.org/1998/Math/MathML": return 2;
    default: return 0;
} }
function Pb(e, t) { if (e === 0)
    switch (t) {
        case "svg": return 1;
        case "math": return 2;
        default: return 0;
    } return e === 1 && t === "foreignObject" ? 0 : e; }
function Ud(e, t) { return e === "textarea" || e === "noscript" || typeof t.children === "string" || typeof t.children === "number" || typeof t.children === "bigint" || typeof t.dangerouslySetInnerHTML === "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null; }
var Lc = null;
function Y1() { var e = window.event; if (e && e.type === "popstate") {
    if (e === Lc)
        return !1;
    return Lc = e, !0;
} return Lc = null, !1; }
var Ib = typeof setTimeout === "function" ? setTimeout : void 0, X1 = typeof clearTimeout === "function" ? clearTimeout : void 0, dh = typeof Promise === "function" ? Promise : void 0, Z1 = typeof queueMicrotask === "function" ? queueMicrotask : typeof dh < "u" ? function (e) { return dh.resolve(null).then(e).catch(P1); } : Ib;
function P1(e) { setTimeout(function () { throw e; }); }
function ai(e) { return e === "head"; }
function ph(e, t) { var a = t, n = 0; do {
    var i = a.nextSibling;
    if (e.removeChild(a), i && i.nodeType === 8)
        if (a = i.data, a === "/$" || a === "/&") {
            if (n === 0) {
                e.removeChild(i), Lo(t);
                return;
            }
            n--;
        }
        else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
            n++;
        else if (a === "html")
            Pr(e.ownerDocument.documentElement);
        else if (a === "head") {
            a = e.ownerDocument.head, Pr(a);
            for (var r = a.firstChild; r;) {
                var o = r.nextSibling, s = r.nodeName;
                r[hl] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && r.rel.toLowerCase() === "stylesheet" || a.removeChild(r), r = o;
            }
        }
        else
            a === "body" && Pr(e.ownerDocument.body);
    a = i;
} while (a); Lo(t); }
function mh(e, t) { var a = e; e = 0; do {
    var n = a.nextSibling;
    if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), n && n.nodeType === 8)
        if (a = n.data, a === "/$")
            if (e === 0)
                break;
            else
                e--;
        else
            a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
    a = n;
} while (a); }
function Hd(e) { var t = e.firstChild; t && t.nodeType === 10 && (t = t.nextSibling); for (; t;) {
    var a = t;
    switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
            Hd(a), jd(a);
            continue;
        case "SCRIPT":
        case "STYLE": continue;
        case "LINK": if (a.rel.toLowerCase() === "stylesheet")
            continue;
    }
    e.removeChild(a);
} }
function I1(e, t, a, n) { for (; e.nodeType === 1;) {
    var i = a;
    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
    }
    else if (!n)
        if (t === "input" && e.type === "hidden") {
            var r = i.name == null ? null : "" + i.name;
            if (i.type === "hidden" && e.getAttribute("name") === r)
                return e;
        }
        else
            return e;
    else if (!e[hl])
        switch (t) {
            case "meta":
                if (!e.hasAttribute("itemprop"))
                    break;
                return e;
            case "link":
                if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence"))
                    break;
                else if (r !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                    break;
                return e;
            case "style":
                if (e.hasAttribute("data-precedence"))
                    break;
                return e;
            case "script":
                if (r = e.getAttribute("src"), (r !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                    break;
                return e;
            default: return e;
        }
    if (e = Zt(e.nextSibling), e === null)
        break;
} return null; }
function J1(e, t, a) { if (t === "")
    return null; for (; e.nodeType !== 3;) {
    if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a)
        return null;
    if (e = Zt(e.nextSibling), e === null)
        return null;
} return e; }
function Jb(e, t) { for (; e.nodeType !== 8;) {
    if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t)
        return null;
    if (e = Zt(e.nextSibling), e === null)
        return null;
} return e; }
function Qd(e) { return e.data === "$?" || e.data === "$~"; }
function Dd(e) { return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"; }
function W1(e, t) { var a = e.ownerDocument; if (e.data === "$~")
    e._reactRetry = t;
else if (e.data !== "$?" || a.readyState !== "loading")
    t();
else {
    var n = function () { t(), a.removeEventListener("DOMContentLoaded", n); };
    a.addEventListener("DOMContentLoaded", n), e._reactRetry = n;
} }
function Zt(e) { for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3)
        break;
    if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
            break;
        if (t === "/$" || t === "/&")
            return null;
    }
} return e; }
var $d = null;
function fh(e) { e = e.nextSibling; for (var t = 0; e;) {
    if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
            if (t === 0)
                return Zt(e.nextSibling);
            t--;
        }
        else
            a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
    }
    e = e.nextSibling;
} return null; }
function hh(e) { e = e.previousSibling; for (var t = 0; e;) {
    if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
            if (t === 0)
                return e;
            t--;
        }
        else
            a !== "/$" && a !== "/&" || t++;
    }
    e = e.previousSibling;
} return null; }
function Wb(e, t, a) { switch (t = eu(a), e) {
    case "html":
        if (e = t.documentElement, !e)
            throw Error(N(452));
        return e;
    case "head":
        if (e = t.head, !e)
            throw Error(N(453));
        return e;
    case "body":
        if (e = t.body, !e)
            throw Error(N(454));
        return e;
    default: throw Error(N(451));
} }
function Pr(e) { for (var t = e.attributes; t.length;)
    e.removeAttributeNode(t[0]); jd(e); }
var Pt = new Map, gh = new Set;
function tu(e) { return typeof e.getRootNode === "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument; }
var mn = ie.d;
ie.d = { f: ex, r: tx, D: ax, C: nx, L: ix, m: ox, X: lx, S: rx, M: sx };
function ex() { var e = mn.f(), t = yu(); return e || t; }
function tx(e) { var t = Ko(e); t !== null && t.tag === 5 && t.type === "form" ? Xg(t) : mn.r(e); }
var Yo = typeof document > "u" ? null : document;
function ev(e, t, a) { var n = Yo; if (n && typeof t === "string" && t) {
    var i = Ft(t);
    i = 'link[rel="' + e + '"][href="' + i + '"]', typeof a === "string" && (i += '[crossorigin="' + a + '"]'), gh.has(i) || (gh.add(i), e = { rel: e, crossOrigin: a, href: t }, n.querySelector(i) === null && (t = n.createElement("link"), Je(t, "link", e), je(t), n.head.appendChild(t)));
} }
function ax(e) { mn.D(e), ev("dns-prefetch", e, null); }
function nx(e, t) { mn.C(e, t), ev("preconnect", e, t); }
function ix(e, t, a) { mn.L(e, t, a); var n = Yo; if (n && e && t) {
    var i = 'link[rel="preload"][as="' + Ft(t) + '"]';
    t === "image" ? a && a.imageSrcSet ? (i += '[imagesrcset="' + Ft(a.imageSrcSet) + '"]', typeof a.imageSizes === "string" && (i += '[imagesizes="' + Ft(a.imageSizes) + '"]')) : i += '[href="' + Ft(e) + '"]' : i += '[href="' + Ft(e) + '"]';
    var r = i;
    switch (t) {
        case "style":
            r = Bo(e);
            break;
        case "script": r = Xo(e);
    }
    Pt.has(r) || (e = we({ rel: "preload", href: t === "image" && a && a.imageSrcSet ? void 0 : e, as: t }, a), Pt.set(r, e), n.querySelector(i) !== null || t === "style" && n.querySelector(wl(r)) || t === "script" && n.querySelector(Sl(r)) || (t = n.createElement("link"), Je(t, "link", e), je(t), n.head.appendChild(t)));
} }
function ox(e, t) { mn.m(e, t); var a = Yo; if (a && e) {
    var n = t && typeof t.as === "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + Ft(n) + '"][href="' + Ft(e) + '"]', r = i;
    switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script": r = Xo(e);
    }
    if (!Pt.has(r) && (e = we({ rel: "modulepreload", href: e }, t), Pt.set(r, e), a.querySelector(i) === null)) {
        switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script": if (a.querySelector(Sl(r)))
                return;
        }
        n = a.createElement("link"), Je(n, "link", e), je(n), a.head.appendChild(n);
    }
} }
function rx(e, t, a) { mn.S(e, t, a); var n = Yo; if (n && e) {
    var i = To(n).hoistableStyles, r = Bo(e);
    t = t || "default";
    var o = i.get(r);
    if (!o) {
        var s = { loading: 0, preload: null };
        if (o = n.querySelector(wl(r)))
            s.loading = 5;
        else {
            e = we({ rel: "stylesheet", href: e, "data-precedence": t }, a), (a = Pt.get(r)) && qp(e, a);
            var p = o = n.createElement("link");
            je(p), Je(p, "link", e), p._p = new Promise(function (f, b) { p.onload = f, p.onerror = b; }), p.addEventListener("load", function () { s.loading |= 1; }), p.addEventListener("error", function () { s.loading |= 2; }), s.loading |= 4, Cs(o, t, n);
        }
        o = { type: "stylesheet", instance: o, count: 1, state: s }, i.set(r, o);
    }
} }
function lx(e, t) { mn.X(e, t); var a = Yo; if (a && e) {
    var n = To(a).hoistableScripts, i = Xo(e), r = n.get(i);
    r || (r = a.querySelector(Sl(i)), r || (e = we({ src: e, async: !0 }, t), (t = Pt.get(i)) && Rp(e, t), r = a.createElement("script"), je(r), Je(r, "link", e), a.head.appendChild(r)), r = { type: "script", instance: r, count: 1, state: null }, n.set(i, r));
} }
function sx(e, t) { mn.M(e, t); var a = Yo; if (a && e) {
    var n = To(a).hoistableScripts, i = Xo(e), r = n.get(i);
    r || (r = a.querySelector(Sl(i)), r || (e = we({ src: e, async: !0, type: "module" }, t), (t = Pt.get(i)) && Rp(e, t), r = a.createElement("script"), je(r), Je(r, "link", e), a.head.appendChild(r)), r = { type: "script", instance: r, count: 1, state: null }, n.set(i, r));
} }
function bh(e, t, a, n) { var i = (i = Fn.current) ? tu(i) : null; if (!i)
    throw Error(N(446)); switch (e) {
    case "meta":
    case "title": return null;
    case "style": return typeof a.precedence === "string" && typeof a.href === "string" ? (t = Bo(a.href), a = To(i).hoistableStyles, n = a.get(t), n || (n = { type: "style", instance: null, count: 0, state: null }, a.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
    case "link":
        if (a.rel === "stylesheet" && typeof a.href === "string" && typeof a.precedence === "string") {
            e = Bo(a.href);
            var r = To(i).hoistableStyles, o = r.get(e);
            if (o || (i = i.ownerDocument || i, o = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, r.set(e, o), (r = i.querySelector(wl(e))) && !r._p && (o.instance = r, o.state.loading = 5), Pt.has(e) || (a = { rel: "preload", as: "style", href: a.href, crossOrigin: a.crossOrigin, integrity: a.integrity, media: a.media, hrefLang: a.hrefLang, referrerPolicy: a.referrerPolicy }, Pt.set(e, a), r || ux(i, e, a, o.state))), t && n === null)
                throw Error(N(528, ""));
            return o;
        }
        if (t && n !== null)
            throw Error(N(529, ""));
        return null;
    case "script": return t = a.async, a = a.src, typeof a === "string" && t && typeof t !== "function" && typeof t !== "symbol" ? (t = Xo(a), a = To(i).hoistableScripts, n = a.get(t), n || (n = { type: "script", instance: null, count: 0, state: null }, a.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
    default: throw Error(N(444, e));
} }
function Bo(e) { return 'href="' + Ft(e) + '"'; }
function wl(e) { return 'link[rel="stylesheet"][' + e + "]"; }
function tv(e) { return we({}, e, { "data-precedence": e.precedence, precedence: null }); }
function ux(e, t, a, n) { e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function () { return n.loading |= 1; }), t.addEventListener("error", function () { return n.loading |= 2; }), Je(t, "link", a), je(t), e.head.appendChild(t)); }
function Xo(e) { return '[src="' + Ft(e) + '"]'; }
function Sl(e) { return "script[async]" + e; }
function vh(e, t, a) { if (t.count++, t.instance === null)
    switch (t.type) {
        case "style":
            var n = e.querySelector('style[data-href~="' + Ft(a.href) + '"]');
            if (n)
                return t.instance = n, je(n), n;
            var i = we({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
            return n = (e.ownerDocument || e).createElement("style"), je(n), Je(n, "style", i), Cs(n, a.precedence, e), t.instance = n;
        case "stylesheet":
            i = Bo(a.href);
            var r = e.querySelector(wl(i));
            if (r)
                return t.state.loading |= 4, t.instance = r, je(r), r;
            n = tv(a), (i = Pt.get(i)) && qp(n, i), r = (e.ownerDocument || e).createElement("link"), je(r);
            var o = r;
            return o._p = new Promise(function (s, p) { o.onload = s, o.onerror = p; }), Je(r, "link", n), t.state.loading |= 4, Cs(r, a.precedence, e), t.instance = r;
        case "script":
            if (r = Xo(a.src), i = e.querySelector(Sl(r)))
                return t.instance = i, je(i), i;
            if (n = a, i = Pt.get(r))
                n = we({}, a), Rp(n, i);
            return e = e.ownerDocument || e, i = e.createElement("script"), je(i), Je(i, "link", n), e.head.appendChild(i), t.instance = i;
        case "void": return null;
        default: throw Error(N(443, t.type));
    }
else
    t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Cs(n, a.precedence, e)); return t.instance; }
function Cs(e, t, a) { for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = n.length ? n[n.length - 1] : null, r = i, o = 0; o < n.length; o++) {
    var s = n[o];
    if (s.dataset.precedence === t)
        r = s;
    else if (r !== i)
        break;
} r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild)); }
function qp(e, t) { e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title); }
function Rp(e, t) { e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity); }
var Ms = null;
function yh(e, t, a) { if (Ms === null) {
    var n = new Map, i = Ms = new Map;
    i.set(a, n);
}
else
    i = Ms, n = i.get(a), n || (n = new Map, i.set(a, n)); if (n.has(e))
    return n; n.set(e, null), a = a.getElementsByTagName(e); for (i = 0; i < a.length; i++) {
    var r = a[i];
    if (!(r[hl] || r[Ze] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = r.getAttribute(t) || "";
        o = e + o;
        var s = n.get(o);
        s ? s.push(r) : n.set(o, [r]);
    }
} return n; }
function xh(e, t, a) { e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null); }
function cx(e, t, a) { if (a === 1 || t.itemProp != null)
    return !1; switch (e) {
    case "meta":
    case "title": return !0;
    case "style":
        if (typeof t.precedence !== "string" || typeof t.href !== "string" || t.href === "")
            break;
        return !0;
    case "link":
        if (typeof t.rel !== "string" || typeof t.href !== "string" || t.href === "" || t.onLoad || t.onError)
            break;
        switch (t.rel) {
            case "stylesheet": return e = t.disabled, typeof t.precedence === "string" && e == null;
            default: return !0;
        }
    case "script": if (t.async && typeof t.async !== "function" && typeof t.async !== "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src === "string")
        return !0;
} return !1; }
function av(e) { return e.type === "stylesheet" && (e.state.loading & 3) === 0 ? !1 : !0; }
function dx(e, t, a, n) { if (a.type === "stylesheet" && (typeof n.media !== "string" || matchMedia(n.media).matches !== !1) && (a.state.loading & 4) === 0) {
    if (a.instance === null) {
        var i = Bo(n.href), r = t.querySelector(wl(i));
        if (r) {
            t = r._p, t !== null && typeof t === "object" && typeof t.then === "function" && (e.count++, e = au.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = r, je(r);
            return;
        }
        r = t.ownerDocument || t, n = tv(n), (i = Pt.get(i)) && qp(n, i), r = r.createElement("link"), je(r);
        var o = r;
        o._p = new Promise(function (s, p) { o.onload = s, o.onerror = p; }), Je(r, "link", n), a.instance = r;
    }
    e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = au.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
} }
var Kc = 0;
function px(e, t) { return e.stylesheets && e.count === 0 && qs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function (a) { var n = setTimeout(function () { if (e.stylesheets && qs(e, e.stylesheets), e.unsuspend) {
    var r = e.unsuspend;
    e.unsuspend = null, r();
} }, 60000 + t); 0 < e.imgBytes && Kc === 0 && (Kc = 62500 * V1()); var i = setTimeout(function () { if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && qs(e, e.stylesheets), e.unsuspend)) {
    var r = e.unsuspend;
    e.unsuspend = null, r();
} }, (e.imgBytes > Kc ? 50 : 800) + t); return e.unsuspend = a, function () { e.unsuspend = null, clearTimeout(n), clearTimeout(i); }; } : null; }
function au() { if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
    if (this.stylesheets)
        qs(this, this.stylesheets);
    else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
    }
} }
var nu = null;
function qs(e, t) { e.stylesheets = null, e.unsuspend !== null && (e.count++, nu = new Map, t.forEach(mx, e), nu = null, au.call(e)); }
function mx(e, t) { if (!(t.state.loading & 4)) {
    var a = nu.get(e);
    if (a)
        var n = a.get(null);
    else {
        a = new Map, nu.set(e, a);
        for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), r = 0; r < i.length; r++) {
            var o = i[r];
            if (o.nodeName === "LINK" || o.getAttribute("media") !== "not all")
                a.set(o.dataset.precedence, o), n = o;
        }
        n && a.set(null, n);
    }
    i = t.instance, o = i.getAttribute("data-precedence"), r = a.get(o) || n, r === n && a.set(null, i), a.set(o, i), this.count++, n = au.bind(this), i.addEventListener("load", n), i.addEventListener("error", n), r ? r.parentNode.insertBefore(i, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
} }
var sl = { $$typeof: en, Provider: null, Consumer: null, _currentValue: Ni, _currentValue2: Ni, _threadCount: 0 };
function fx(e, t, a, n, i, r, o, s, p) { this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gc(0), this.hiddenUpdates = gc(null), this.identifierPrefix = n, this.onUncaughtError = i, this.onCaughtError = r, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = p, this.incompleteTransitions = new Map; }
function hx(e, t, a, n, i, r, o, s, p, f, b, x) { return e = new fx(e, t, a, o, p, f, b, x, s), t = 1, r === !0 && (t |= 24), r = wt(3, null, null, t), e.current = r, r.stateNode = e, t = np(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = { element: n, isDehydrated: a, cache: t }, rp(r), e; }
function gx(e) { if (!e)
    return wo; return e = wo, e; }
function nv(e, t, a, n, i, r) { i = gx(i), n.context === null ? n.context = i : n.pendingContext = i, n = Mi(t), n.payload = { element: a }, r = r === void 0 ? null : r, r !== null && (n.callback = r), a = qi(e, n, t), a !== null && (ft(a, e, t), Lr(a, e, t)); }
function wh(e, t) { if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var a = e.retryLane;
    e.retryLane = a !== 0 && a < t ? a : t;
} }
function Ap(e, t) { wh(e, t), (e = e.alternate) && wh(e, t); }
function iv(e) { if (e.tag === 13 || e.tag === 31) {
    var t = Gi(e, 67108864);
    t !== null && ft(t, e, 67108864), Ap(e, 67108864);
} }
function Sh(e) { if (e.tag === 13 || e.tag === 31) {
    var t = Xt();
    t = Gh(t);
    var a = Gi(e, t);
    a !== null && ft(a, e, t), Ap(e, t);
} }
var iu = !0;
function bx(e, t, a, n) { var i = K.T; K.T = null; var r = ie.p; try {
    ie.p = 2, zp(e, t, a, n);
}
finally {
    ie.p = r, K.T = i;
} }
function vx(e, t, a, n) { var i = K.T; K.T = null; var r = ie.p; try {
    ie.p = 8, zp(e, t, a, n);
}
finally {
    ie.p = r, K.T = i;
} }
function zp(e, t, a, n) { if (iu) {
    var i = Gd(n);
    if (i === null)
        Bc(e, t, n, ou, a), kh(e, n);
    else if (xx(i, e, t, a, n))
        n.stopPropagation();
    else if (kh(e, n), t & 4 && -1 < yx.indexOf(e)) {
        for (; i !== null;) {
            var r = Ko(i);
            if (r !== null)
                switch (r.tag) {
                    case 3:
                        if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                            var o = xi(r.pendingLanes);
                            if (o !== 0) {
                                var s = r;
                                s.pendingLanes |= 2;
                                for (s.entangledLanes |= 2; o;) {
                                    var p = 1 << 31 - Tt(o);
                                    s.entanglements[1] |= p, o &= ~p;
                                }
                                pn(r), (ne & 6) === 0 && (Xs = kt() + 500, xl(0, !1));
                            }
                        }
                        break;
                    case 31:
                    case 13: s = Gi(r, 2), s !== null && ft(s, r, 2), yu(), Ap(r, 2);
                }
            if (r = Gd(n), r === null && Bc(e, t, n, ou, a), r === i)
                break;
            i = r;
        }
        i !== null && n.stopPropagation();
    }
    else
        Bc(e, t, n, null, a);
} }
function Gd(e) { return e = Yd(e), Op(e); }
var ou = null;
function Op(e) { if (ou = null, e = ho(e), e !== null) {
    var t = dl(e);
    if (t === null)
        e = null;
    else {
        var a = t.tag;
        if (a === 13) {
            if (e = Ch(t), e !== null)
                return e;
            e = null;
        }
        else if (a === 31) {
            if (e = Mh(t), e !== null)
                return e;
            e = null;
        }
        else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        }
        else
            t !== e && (e = null);
    }
} return ou = e, null; }
function ov(e) { switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart": return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave": return 8;
    case "message": switch (t0()) {
        case zh: return 2;
        case Oh: return 8;
        case Us:
        case a0: return 32;
        case Uh: return 268435456;
        default: return 32;
    }
    default: return 32;
} }
var _d = !1, Xn = null, Zn = null, Pn = null, ul = new Map, cl = new Map, $n = [], yx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
function kh(e, t) { switch (e) {
    case "focusin":
    case "focusout":
        Xn = null;
        break;
    case "dragenter":
    case "dragleave":
        Zn = null;
        break;
    case "mouseover":
    case "mouseout":
        Pn = null;
        break;
    case "pointerover":
    case "pointerout":
        ul.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture": cl.delete(t.pointerId);
} }
function Mr(e, t, a, n, i, r) { if (e === null || e.nativeEvent !== r)
    return e = { blockedOn: t, domEventName: a, eventSystemFlags: n, nativeEvent: r, targetContainers: [i] }, t !== null && (t = Ko(t), t !== null && iv(t)), e; return e.eventSystemFlags |= n, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e; }
function xx(e, t, a, n, i) { switch (t) {
    case "focusin": return Xn = Mr(Xn, e, t, a, n, i), !0;
    case "dragenter": return Zn = Mr(Zn, e, t, a, n, i), !0;
    case "mouseover": return Pn = Mr(Pn, e, t, a, n, i), !0;
    case "pointerover":
        var r = i.pointerId;
        return ul.set(r, Mr(ul.get(r) || null, e, t, a, n, i)), !0;
    case "gotpointercapture": return r = i.pointerId, cl.set(r, Mr(cl.get(r) || null, e, t, a, n, i)), !0;
} return !1; }
function rv(e) { var t = ho(e.target); if (t !== null) {
    var a = dl(t);
    if (a !== null) {
        if (t = a.tag, t === 13) {
            if (t = Ch(a), t !== null) {
                e.blockedOn = t, sf(e.priority, function () { Sh(a); });
                return;
            }
        }
        else if (t === 31) {
            if (t = Mh(a), t !== null) {
                e.blockedOn = t, sf(e.priority, function () { Sh(a); });
                return;
            }
        }
        else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
        }
    }
} e.blockedOn = null; }
function Rs(e) { if (e.blockedOn !== null)
    return !1; for (var t = e.targetContainers; 0 < t.length;) {
    var a = Gd(e.nativeEvent);
    if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ad = n, a.target.dispatchEvent(n), ad = null;
    }
    else
        return t = Ko(a), t !== null && iv(t), e.blockedOn = a, !1;
    t.shift();
} return !0; }
function Nh(e, t, a) { Rs(e) && a.delete(t); }
function wx() { _d = !1, Xn !== null && Rs(Xn) && (Xn = null), Zn !== null && Rs(Zn) && (Zn = null), Pn !== null && Rs(Pn) && (Pn = null), ul.forEach(Nh), cl.forEach(Nh); }
function ms(e, t) { e.blockedOn === t && (e.blockedOn = null, _d || (_d = !0, bi(gi, wx))); }
var fs = null;
function Th(e) { fs !== e && (fs = e, bi(gi, function () { fs === e && (fs = null); for (var t = 0; t < e.length; t += 3) {
    var a = e[t], n = e[t + 1], i = e[t + 2];
    if (typeof n !== "function")
        if (Op(n || a) === null)
            continue;
        else
            break;
    var r = Ko(a);
    r !== null && (e.splice(t, 3), t -= 3, vd(r, { pending: !0, data: i, method: a.method, action: n }, n, i));
} })); }
function Lo(e) { function t(p) { return ms(p, e); } Xn !== null && ms(Xn, e), Zn !== null && ms(Zn, e), Pn !== null && ms(Pn, e), ul.forEach(t), cl.forEach(t); for (var a = 0; a < $n.length; a++) {
    var n = $n[a];
    n.blockedOn === e && (n.blockedOn = null);
} for (; 0 < $n.length && (a = $n[0], a.blockedOn === null);)
    rv(a), a.blockedOn === null && $n.shift(); if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
    for (n = 0; n < a.length; n += 3) {
        var i = a[n], r = a[n + 1], o = i[ht] || null;
        if (typeof r === "function")
            o || Th(a);
        else if (o) {
            var s = null;
            if (r && r.hasAttribute("formAction")) {
                if (i = r, o = r[ht] || null)
                    s = o.formAction;
                else if (Op(i) !== null)
                    continue;
            }
            else
                s = o.action;
            typeof s === "function" ? a[n + 1] = s : (a.splice(n, 3), n -= 3), Th(a);
        }
    } }
function Sx() { function e(r) { r.canIntercept && r.info === "react-transition" && r.intercept({ handler: function () { return new Promise(function (o) { return i = o; }); }, focusReset: "manual", scroll: "manual" }); } function t() { i !== null && (i(), i = null), n || setTimeout(a, 20); } function a() { if (!n && !navigation.transition) {
    var r = navigation.currentEntry;
    r && r.url != null && navigation.navigate(r.url, { state: r.getState(), info: "react-transition", history: "replace" });
} } if (typeof navigation === "object") {
    var n = !1, i = null;
    return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function () { n = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null); };
} }
function Up(e) { this._internalRoot = e; }
Hp.prototype.render = Up.prototype.render = function (e) { var t = this._internalRoot; if (t === null)
    throw Error(N(409)); var a = t.current, n = Xt(); nv(a, n, e, t, null, null); };
Hp.prototype.unmount = Up.prototype.unmount = function () { var e = this._internalRoot; if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    nv(e.current, 2, null, e, null, null), yu(), t[fl] = null;
} };
function Hp(e) { this._internalRoot = e; }
Hp.prototype.unstable_scheduleHydration = function (e) { if (e) {
    var t = _h();
    e = { blockedOn: null, target: e, priority: t };
    for (var a = 0; a < $n.length && t !== 0 && t < $n[a].priority; a++)
        ;
    $n.splice(a, 0, e), a === 0 && rv(e);
} };
var Eh = Xu;
if (Eh !== "19.2.5")
    throw Error(N(527, Eh, "19.2.5"));
ie.findDOMNode = function (e) { var t = e._reactInternals; if (t === void 0) {
    if (typeof e.render === "function")
        throw Error(N(188));
    throw e = Object.keys(e).join(","), Error(N(268, e));
} return e = Xy(t), e = e !== null ? qh(e) : null, e = e === null ? null : e.stateNode, e; };
var kx = { bundleType: 0, version: "19.2.5", rendererPackageName: "react-dom", currentDispatcherRef: K, reconcilerVersion: "19.2.5" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    if (po = __REACT_DEVTOOLS_GLOBAL_HOOK__, !po.isDisabled && po.supportsFiber)
        try {
            pl = po.inject(kx), Nt = po;
        }
        catch (e) { }
}
var po;
var Qp = function (e, t) { if (!Yy(e))
    throw Error(N(299)); var a = !1, n = "", i = v1, r = y1, o = x1; return t !== null && t !== void 0 && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = hx(e, 1, !1, null, null, a, n, null, i, r, o, Sx), e[fl] = t.current, Yb(e), new Up(t); };
lv();
var Ex = Km(), Cx = { "Session expired.": "Phiên đăng nhập đã hết hạn.", "This session is no longer valid.": "Phiên đăng nhập không còn hợp lệ.", "Name or password is incorrect.": "Tên đăng nhập hoặc mật khẩu không đúng.", "That username is reserved.": "Tên đăng nhập này được dành riêng.", "That username is already in use. Sign in instead.": "Tên đăng nhập này đã được sử dụng. Hãy đăng nhập.", "That email is already attached to an account.": "Email này đã được liên kết với một tài khoản.", "Could not create your account.": "Không thể tạo tài khoản.", "This account has been deleted. An administrator can restore it.": "Tài khoản này đã bị xóa. Quản trị viên hệ thống có thể khôi phục.", "This account is locked by an administrator.": "Tài khoản này đã bị quản trị viên hệ thống khóa.", "That reset code is invalid or expired.": "Mã đặt lại không hợp lệ hoặc đã hết hạn.", "That confirmation code is invalid or expired.": "Mã xác nhận không hợp lệ hoặc đã hết hạn.", "Enter your current password.": "Hãy nhập mật khẩu hiện tại.", "Current password is incorrect.": "Mật khẩu hiện tại không đúng.", "Administrator access required.": "Cần quyền quản trị viên hệ thống.", "Super Admin access required.": "Cần quyền Siêu quản trị viên.", "Room not found.": "Không tìm thấy phòng.", "User not found.": "Không tìm thấy người dùng.", "That person is no longer in the room.": "Người này không còn trong phòng.", "You are not in this room.": "Bạn không ở trong phòng này.", "Join the room first.": "Hãy vào phòng trước.", "Join the room before managing its mic queue.": "Hãy vào phòng trước khi quản lý hàng chờ mic.", "Join the room before changing its chat background.": "Hãy vào phòng trước khi đổi nền trò chuyện.", "Join the room before managing its ban list.": "Hãy vào phòng trước khi quản lý danh sách cấm.", "Join the room before giving a heart.": "Hãy vào phòng trước khi tặng tim.", "Collaborator, room administrator, or owner access required.": "Cần quyền Cộng tác viên, Quản trị viên hoặc Chủ phòng.", "Collaborator, room administrator, owner, or system administrator access required.": "Cần quyền Cộng tác viên, Quản trị viên, Chủ phòng hoặc quản trị viên hệ thống.", "Collaborator or higher access required.": "Cần quyền Cộng tác viên trở lên.", "Room administrator or higher access required.": "Cần quyền Quản trị viên trở lên.", "Room administrator, owner, or system administrator access required.": "Cần quyền Quản trị viên, Chủ phòng hoặc quản trị viên hệ thống.", "Only room administrators and above can send photos.": "Chỉ Quản trị viên trở lên mới có thể gửi ảnh.", "A moderator has muted you in this room.": "Bạn đã bị quản trị viên tắt tiếng trong phòng này.", "A moderator has muted your microphone.": "Mic của bạn đã bị quản trị viên tắt.", "Visitors cannot send emoji or icons in chat.": "Khách vãng lai không thể gửi biểu tượng trong trò chuyện.", "This room is in Free Mode. Turn on your microphone directly.": "Phòng đang ở Chế Độ Tự Do. Hãy bật mic trực tiếp.", "Choose a person first.": "Hãy chọn một người trước.", "Unmute this person before adding them to the mic queue.": "Hãy bật tiếng cho người này trước khi thêm vào hàng chờ mic.", "Could not add that person to the queue.": "Không thể thêm người này vào hàng chờ.", "That person is not in the mic queue.": "Người này không ở trong hàng chờ mic.", "No one is currently up on mic.": "Hiện không có ai đang cầm mic.", "Join the queue and wait for your turn before starting the microphone.": "Hãy vào hàng chờ và đợi đến lượt trước khi bật mic.", "You cannot send a friend request to yourself.": "Bạn không thể gửi lời mời kết bạn cho chính mình.", "This friend request is no longer pending.": "Lời mời kết bạn này không còn chờ xử lý.", "You cannot ban yourself.": "Bạn không thể tự cấm mình.", "You cannot change your own room tier.": "Bạn không thể tự đổi cấp trong phòng.", "There is no singer to receive this gift.": "Hiện không có người hát để nhận quà.", "You cannot gift credits to yourself.": "Bạn không thể tự tặng tín dụng cho mình.", "You do not have enough credits.": "Bạn không có đủ tín dụng.", "There is no singer on mic right now.": "Hiện không có người hát đang cầm mic.", "You cannot give a heart to yourself.": "Bạn không thể tự tặng tim cho mình.", "You can own up to 10 rooms. Delete one of your rooms before creating another.": "Bạn chỉ có thể sở hữu tối đa 10 phòng. Hãy xóa một phòng trước khi tạo phòng mới.", "Could not create the room.": "Không thể tạo phòng.", "Only the room owner can change the room password.": "Chỉ Chủ phòng mới có thể đổi mật khẩu phòng.", "Enter the room password.": "Hãy nhập mật khẩu phòng.", "That room password is incorrect.": "Mật khẩu phòng không đúng.", "That room no longer exists.": "Phòng này không còn tồn tại.", "You are banned from this room.": "Bạn đã bị cấm khỏi phòng này.", "Choose a valid JPEG, PNG, or WebP image under 7.5 MB.": "Hãy chọn ảnh JPEG, PNG hoặc WebP hợp lệ dưới 7,5 MB.", "Choose a valid JPG, PNG, or WebP image under 7.5 MB.": "Hãy chọn ảnh JPG, PNG hoặc WebP hợp lệ dưới 7,5 MB." };
function Mx(e) { var _j; return (_j = Cx[e]) !== null && _j !== void 0 ? _j : "Không thể hoàn tất thao tác. Vui lòng thử lại."; }
var A = new Proxy(Ex, { get(e, t, a) { let n = Reflect.get(e, t, a); if (typeof n !== "function")
        return n; return (...i) => __awaiter(this, void 0, void 0, function* () { let r = yield n.apply(e, i); if (r && typeof r === "object" && "error" in r && typeof r.error === "string")
        return Object.assign(Object.assign({}, r), { error: Mx(r.error) }); return r; }); } });
var sv = "./assets/kawaii-cats-h9ky150p.jpg";
var uv = "./assets/dreamy-kitten-6cpyvya8.jpg";
var cv = "./assets/pastel-clouds-fq42d3wv.jpg";
var dv = "./assets/pastel-daisies-3s0t5kcw.jpg";
var Dp = "radio-room-session";
function fn(e) { return e === "image/jpeg" || e === "image/png" || e === "image/webp"; }
function Ox(e) { return fn(e) || e === "image/gif" || e === "application/pdf" || e === "text/plain" || e === "application/msword" || e === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; }
function pv(e) { if (Ox(e.type))
    return e.type; let t = e.name.toLowerCase().split(".").pop(); if (t === "jpg" || t === "jpeg")
    return "image/jpeg"; if (t === "png")
    return "image/png"; if (t === "webp")
    return "image/webp"; if (t === "gif")
    return "image/gif"; if (t === "pdf")
    return "application/pdf"; if (t === "txt")
    return "text/plain"; if (t === "doc")
    return "application/msword"; if (t === "docx")
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; return null; }
function bv(e) { return e >= 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1000))} KB`; }
function vv(e) { return e < 10 ? `0${e}` : String(e); }
function Bi(e, t) { let a = new Date(e); if (Number.isNaN(a.getTime()))
    return e; try {
    return new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(a);
}
catch (_j) {
    return a.toLocaleString("vi-VN");
} }
function Ux(e) { var _j, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21; let t = { mod1: "Mod 1 - Cộng tác viên", "Mod 1": "Mod 1 - Cộng tác viên", "Mod 1 - Collaborator": "Mod 1 - Cộng tác viên", "Mod 1 - Cộng tác viên": "Mod 1 - Cộng tác viên", mod2: "VIP", "Mod 2": "VIP", mod3: "Mod 3 - Quản trị viên", "Mod 3": "Mod 3 - Quản trị viên", "Mod 3 - Room administrator": "Mod 3 - Quản trị viên", "Mod 3 - Quản trị viên": "Mod 3 - Quản trị viên", blackshirt: "Áo đen", "Black shirt": "Áo đen", member: "Thành viên", visitor: "Khách vãng lai" }, a = (i) => { var _j; return (_j = t[i]) !== null && _j !== void 0 ? _j : i; }, n = e.match(/^(.+) joined\.$/); if (n)
    return `${(_j = n[1]) !== null && _j !== void 0 ? _j : ""} đã vào phòng.`; if (n = e.match(/^(.+) promoted (.+) to (.+)\.$/), n)
    return `${(_10 = n[1]) !== null && _10 !== void 0 ? _10 : ""} đã thăng ${(_11 = n[2]) !== null && _11 !== void 0 ? _11 : ""} lên ${a((_12 = n[3]) !== null && _12 !== void 0 ? _12 : "")}.`; if (n = e.match(/^(.+) demoted (.+) to (.+)\.$/), n)
    return `${(_13 = n[1]) !== null && _13 !== void 0 ? _13 : ""} đã hạ ${(_14 = n[2]) !== null && _14 !== void 0 ? _14 : ""} xuống ${a((_15 = n[3]) !== null && _15 !== void 0 ? _15 : "")}.`; if (n = e.match(/^(.+) muted (.+)\.$/), n)
    return `${(_16 = n[1]) !== null && _16 !== void 0 ? _16 : ""} đã tắt tiếng ${(_17 = n[2]) !== null && _17 !== void 0 ? _17 : ""}.`; if (n = e.match(/^(.+) unmuted (.+)\.$/), n)
    return `${(_18 = n[1]) !== null && _18 !== void 0 ? _18 : ""} đã bật tiếng ${(_19 = n[2]) !== null && _19 !== void 0 ? _19 : ""}.`; if (n = e.match(/^(.+) removed (.+)\.$/), n)
    return `${(_20 = n[1]) !== null && _20 !== void 0 ? _20 : ""} đã mời ${(_21 = n[2]) !== null && _21 !== void 0 ? _21 : ""} ra khỏi phòng.`; return e; }
function mv() { try {
    if (typeof window.matchMedia === "function")
        return window.matchMedia("(min-width: 780px)").matches;
}
catch (_j) { } return typeof window.innerWidth === "number" && window.innerWidth >= 780; }
function Hx(e, t, a, n) { var _j, _10; if (t) {
    let b = Math.max(0, Math.min(100, n)) / 100;
    return { "--chat-bg": "#173235", "--chat-ink": "#ffffff", "--chat-muted": "#d7e5e2", backgroundImage: `linear-gradient(rgba(23, 50, 53, ${b}), rgba(23, 50, 53, ${b})), url(${JSON.stringify(t)})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: a };
} if (e === "transparent")
    return { "--chat-bg": "transparent", "--chat-ink": "var(--text)", "--chat-muted": "var(--dim)" }; let r = (_10 = (_j = /^#([0-9a-f]{6})$/i.exec(e)) === null || _j === void 0 ? void 0 : _j[1]) !== null && _10 !== void 0 ? _10 : "ffffff", o = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), p = Number.parseInt(r.slice(4, 6), 16), f = (o * 299 + s * 587 + p * 114) / 1000 < 142; return { "--chat-bg": `#${r}`, "--chat-ink": f ? "#ffffff" : "#092427", "--chat-muted": f ? "#d7e5e2" : "#536d6c" }; }
var fv = { en: { language: "Language", english: "English", vietnamese: "Vietnamese", openMic: "Open mic, open conversation", heroLineOne: "Find your room.", heroLineTwo: "Join the chorus.", intro: "Chat in real time, take the mic, or simply listen. Sign in to keep your identity and role protected.", accountAccess: "Account access", accountOptions: "Account options", signIn: "Sign in", createAccount: "Create account", displayName: "Username", yourName: "Your username", email: "Email", yourEmail: "you@example.com", password: "Password", atLeastSix: "At least 6 characters", yourPassword: "Your password", confirmPassword: "Confirm password", repeatPassword: "Repeat your password", pleaseWait: "Please wait…", passwordsMismatch: "Passwords do not match.", forgotPassword: "Forgot password?", resetPassword: "Reset password", resetInstructions: "Enter your account email. If it matches an account and email delivery is connected, a 6-digit reset code will arrive.", sendResetCode: "Send reset code", resetCode: "6-digit reset code", enterResetCode: "Enter code", backToSignIn: "Back to sign in", resetRequestReady: "If that email matches an account, check it for a reset code. Email delivery must be connected first.", passwordReset: "Password updated. Sign in with your new password.", tuningRooms: "Tuning the rooms…", couldNotLoadRooms: "Could not load the rooms.", startAgain: "Start again", onTheAir: "On the air", goodToSee: "Good to see you", personalStatus: "Change personal status", signOut: "Sign out", youAre: "You’re a", credits: "Credits", creditBalance: "Credit balance", earnCredits: "Earn 1 credit for every hour online", buyCredits: "Buy credits", buyCreditsAvailable: "Buy credits available", buyCreditsControlHint: "Let members see credit packages and start checkout.", buyCreditsOn: "On", buyCreditsOff: "Off", buyCreditsUnavailable: "Credit purchases are currently unavailable.", buyWithPayPal: "Buy with PayPal", paypalSetupNeeded: "PayPal checkout needs a secure merchant connection before purchases can open.", purchaseHistory: "Purchase history", creditHistory: "Credit history", noCreditActivity: "No credit activity yet", onlineEarned: "Earned online", creditPurchase: "Credits bought", giftSent: "Gift sent", giftReceived: "Gift received", adminGrant: "Granted by Super Admin", giveCredits: "Give credits", creditPackages: "Credit packages", addPackage: "Add package", packageCredits: "Credits in package", packagePrice: "Price (USD)", purchaseLog: "Purchase log", noPurchases: "No purchases yet", searchUsers: "Search users", searchRooms: "Search rooms", previous: "Previous", next: "Next", page: "Page", privateRoom: "Private room", roomPassword: "Room password", enterRoomPassword: "Enter room password", setRoomPassword: "Set room password", removeRoomPassword: "Remove password", roomPasswordHint: "Guests must enter this password before joining.", giftCredits: "Gift credits", giftSinger: "Gift the singer", creditAmount: "Credit amount", gift: "Gift", gifted: "Credits sent", defaultDisplayName: "Display name", editDisplayName: "Change display name", yourRoomName: "Your name in this room", editRoomName: "Change my room name", renameRoom: "Rename room", newRoomName: "New room name", passwordSecurity: "Profile & security", secureAccount: "Secure this account", changeSignInPassword: "Manage your email and sign-in password", setPasswordAnotherDevice: "Add recovery details for this account", currentPassword: "Current password", newPassword: "New password", confirmNewPassword: "Confirm new password", saving: "Saving…", changePassword: "Change password", setPassword: "Set password", cancel: "Cancel", areYouSure: "Are you sure?", confirm: "Confirm", newPasswordsMismatch: "New passwords do not match.", emailStatus: "Email", verified: "Verified", notVerified: "Not verified", noEmail: "No email added", addOrChangeEmail: "Add or change email", sendConfirmation: "Send confirmation code", confirmationCode: "Confirmation code", verifyEmail: "Verify email", emailServiceNeeded: "Email delivery is ready to connect, but no provider is connected yet.", confirmationSent: "Confirmation code sent. Check your email.", emailVerified: "Email confirmed.", openRoom: "Open a new room", openRoomHint: "Everyone can create rooms · up to 10 per person", roomName: "Room name", roomPlaceholder: "Late-night songs", open: "Open", roomPicture: "Room picture", roomPictureOptions: "Room picture options", changeRoomPicture: "Change room picture", removeRoomPicture: "Remove room picture", chatBackground: "Chat background", chooseChatBackground: "Choose chat background", backgroundFade: "Background fade", standardWallpapers: "Cute wallpapers", wallpaperCats: "Kawaii cats", wallpaperKitten: "Dreamy kitten", wallpaperClouds: "Pastel clouds", wallpaperDaisies: "Pastel daisies", applyingWallpaper: "Applying wallpaper…", whiteBackground: "White", transparentBackground: "Transparent", photoBackground: "Photo", chooseBackgroundPhoto: "Choose background photo", changeBackgroundPhoto: "Change background photo", removeBackgroundPhoto: "Remove background photo", invalidBackgroundPhoto: "Choose a JPG, PNG, or WebP image under 7.5 MB.", singerCoverPhoto: "Singer cover photo", singerCoverHint: "Shown on the stage when you’re singing without your camera.", changePhoto: "Change photo", removePhoto: "Remove photo", userId: "User ID", rooms: "Rooms", quiet: "The air is quiet", quietCreator: "Open the first room and invite the conversation in.", quietMember: "Open the first room and invite the conversation in.", owner: "Owner", ownedBy: "Owned by", deleteRoom: "Delete room", deleteRoomConfirm: "Delete {name}? This permanently removes its messages, queue, and room history.", hereNow: "here now", joined: "joined", waitingVoices: "Waiting for voices", activeNow: "Active now", inactive: "Inactive", enteringRoom: "Entering the room…", couldNotOpenRoom: "Could not open this room.", backToRooms: "Back to rooms", liveRoom: "Live room", leaveRoom: "Leave room", isOnMic: "is on mic", areOnMic: "are on mic", turn: "turn", singerTurn: "Singer turn", isUpNext: "is up next", joinQueueTakeMic: "Join the queue to take the mic", giveHeart: "Give heart", yourHeartCount: "Hearts from this room", hearts: "hearts", heart: "heart", heartReady: "Ready", heartAgain: "Again in", muted: "Muted", starting: "Starting…", startCamera: "Turn on camera", stopCamera: "Turn off camera", cameraUnavailable: "Camera access is not available in this browser.", cameraBlocked: "Camera access was blocked. Allow camera access, then try again.", singerCamera: "Singer camera", leaveMic: "Leave mic", joinMic: "Join mic", queueFirst: "Queue first", leaveLiveAudio: "Leave live audio", startingMicrophone: "Starting microphone", joinLiveAudio: "Join live audio", waitMicTurn: "Wait for your mic turn", unmuteMyMic: "Unmute my mic", muteMyMic: "Mute my mic", shareBackgroundSound: "Share background sound", stopBackgroundSound: "Stop sharing background sound", backgroundSoundStarting: "Adjusting sound…", backgroundSoundHint: "Start background sound directly—your microphone does not need to be on first.", backgroundSoundError: "Could not change the microphone sound mode.", hotMic: "Hot mic", leaveHotMic: "End hot mic", startHearing: "Start hearing live audio", tapHear: "Tap to hear audio", micQueue: "Mic queue", minuteTurns: "minute turns", setTime: "Set time", defaultTurnLength: "Default turn length", minutes: "minutes", save: "Save", micMode: "Microphone mode", freeMode: "Free Mode", queueMode: "Queue Mode", freeModeHint: "Everyone can turn on their microphone at the same time. There is no queue.", queueModeHint: "One person takes the microphone at a time through the FIFO queue.", changeMicMode: "Change microphone mode", displayOptions: "Display options", freeMicPrompt: "Free Mode is on — join the live conversation whenever you’re ready.", queueManagement: "Queue management", selectPerson: "Select a person", addToQueue: "Add to queue", makeSinger: "Make singer", moveUp: "Move up", removeFromQueue: "Remove from queue", clearQueue: "Clear queue", clearQueueConfirm: "Clear everyone from the mic queue? The current singer’s music will also stop.", removeQueueConfirm: "Remove {name} from the mic queue?", noPeopleToAdd: "Everyone available is already in the queue.", nowOnMic: "Now on mic", upNext: "Up next", startYourMic: "Start your mic", noWaiting: "No one is waiting. Be the first to take a turn.", addTime: "Add time", min: "min", you: "you", waiting: "Waiting", joining: "Joining…", joinMicQueue: "Join mic queue", endMyTurn: "End my turn", leaveQueue: "Leave queue", inLine: "in line", yourTurnTap: "It’s your turn — tap Join mic beside your name", peopleRoles: "People & roles", peopleRoom: "People in the room", onMic: "On mic", mutedByModerator: "Muted by moderator", roomTier: "Room tier", visitorRole: "Visitor", memberRole: "Member", modOne: "Mod 1 - Cộng tác viên", modTwo: "VIP", modThree: "Mod 3 - Quản trị viên", blackShirt: "Black shirt", demote: "Demote", promote: "Promote", promoteTo: "Promote to", demoteTo: "Demote to", unmute: "Unmute", mute: "Mute", removeFromRoom: "Remove from room", personSettings: "Person settings", roomSettings: "Room settings", changeRoomPersonName: "Change room name", addFriend: "Add friend", requestSent: "Request sent", friends: "Friends", friendRequests: "Friend requests", accept: "Accept", decline: "Decline", noFriends: "No friends yet.", noFriendRequests: "No pending friend requests.", banFromRoom: "Ban from room", banConfirm: "Ban {name}? They will not be able to re-enter this room.", roomBanList: "Room ban list", bannedBy: "Banned by", unban: "Unban", noBannedUsers: "No one is banned from this room.", conversation: "Room conversation", noMessages: "No messages yet.", firstHello: "Say the first hello.", formerMember: "Former member", message: "Message", youMuted: "You are muted", addConversation: "Add to the conversation…", sendMessage: "Send message", sendPhoto: "Send photo", photoSending: "Sending photo…", photoUploadHint: "JPG, PNG, or WebP · up to 7.5 MB", invalidChatPhoto: "Choose a JPG, PNG, or WebP image under 7.5 MB.", chatPhoto: "Photo shared by", openChatPhoto: "View full photo", closeChatPhoto: "Close full photo", openEmojiPicker: "Add emoji", closeEmojiPicker: "Close emoji picker", emojiPicker: "Emoji picker", adminDashboard: "Admin dashboard", adminUsers: "Users", adminRooms: "Rooms", masterLogs: "Master logs", activity: "Activity", timestamp: "Timestamp", logsRetained: "Activity is kept for 30 days.", superAdmin: "Super Admin", promoteAdmin: "Promote to admin", demoteAdmin: "Demote admin", ipAddress: "Last IP address", ipUnknown: "Not recorded", lastSeen: "Last seen", accountLocked: "Account locked", networkBlocked: "IP blocked", lockAccount: "Lock account", unlockAccount: "Unlock account", blockIp: "Block IP", unblockIp: "Unblock IP", roomOwner: "Room owner", transferOwnership: "Change owner", chooseNewOwner: "Choose a new owner", newRoomOwner: "New room owner", roomLevel: "Level", upgradeLevelTwo: "Upgrade to level 2", downgradeLevelOne: "Downgrade to level 1", levelTwoCamera: "Camera unlocks at level 2", lockRoom: "Lock room", unlockRoom: "Unlock room", lockReason: "Reason for locking", communityReview: "Community standards review", adminConfirmAction: "Apply this admin action?", lockedRoom: "Locked", deleted: "Deleted", deleteUser: "Delete user", restoreUser: "Restore user", restoreRoom: "Restore room", noAdminData: "No admin data available.", report: "Report", reportUser: "Report user", reportRoom: "Report room", reportReason: "Reason", reportDetails: "What happened?", reportDetailsHint: "Share enough detail for the admin team to review.", reportEvidence: "Evidence files", addEvidence: "Add images or files", evidenceHint: "Up to 3 JPG, PNG, WebP, GIF, PDF, TXT, DOC, or DOCX files · 7.5 MB each · 15 MB total", unsupportedEvidence: "Choose a supported file under 7.5 MB.", tooManyEvidence: "You can attach up to 3 files.", removeEvidence: "Remove file", attachments: "Attachments", openAttachment: "Open attachment", submitReport: "Send report", reportSent: "Report sent to the admin team.", harassment: "Harassment", hate: "Hateful conduct", spam: "Spam or scam", sexual: "Sexual content", violence: "Violence or threats", impersonation: "Impersonation", other: "Other", support: "Support", contactSupport: "Contact the admin team", supportHint: "Ask for help with your account, a room, or using the site.", supportSubject: "Subject", supportDetails: "How can we help?", sendSupport: "Send to support", supportSent: "Your support ticket was created.", waitingAdmin: "Waiting for an available admin", acceptedByAdmin: "Accepted by", startSupportChat: "Start support chat", messageAdmin: "Message the admin team", adminInbox: "Reports & support", reports: "Reports", supportRequests: "Support requests", activeSupportQueue: "Active queue", supportHistory: "History", ticketNumber: "Ticket", openCases: "Open", reviewing: "Reviewing", accepted: "Accepted", resolved: "Resolved", dismissed: "Dismissed", markReviewing: "Review", resolve: "Resolve", dismiss: "Dismiss", reviewNote: "Admin note", noReports: "No reports yet.", noSupport: "No support requests yet.", noActiveSupport: "No active support requests.", micUnavailable: "Microphone access is not available in this browser.", couldNotJoinMic: "Could not join the microphone.", turnEnded: "Your mic turn has ended. Join the queue again for another turn.", moderatorMuted: "A moderator muted you in this room.", participant: "participant" }, vi: { language: "Ngôn ngữ", english: "Tiếng Anh", vietnamese: "Tiếng Việt", openMic: "Mở mic, mở lời", heroLineOne: "Tìm phòng của bạn.", heroLineTwo: "Cùng hòa giọng.", intro: "Trò chuyện tức thì, cầm mic hoặc chỉ lắng nghe. Đăng nhập để bảo vệ danh tính và vai trò của bạn.", accountAccess: "Truy cập tài khoản", accountOptions: "Tùy chọn tài khoản", signIn: "Đăng nhập", createAccount: "Tạo tài khoản", displayName: "Tên đăng nhập", yourName: "Tên đăng nhập của bạn", email: "Email", yourEmail: "ban@example.com", password: "Mật khẩu", atLeastSix: "Ít nhất 6 ký tự", yourPassword: "Mật khẩu của bạn", confirmPassword: "Xác nhận mật khẩu", repeatPassword: "Nhập lại mật khẩu", pleaseWait: "Vui lòng chờ…", passwordsMismatch: "Mật khẩu không khớp.", forgotPassword: "Quên mật khẩu?", resetPassword: "Đặt lại mật khẩu", resetInstructions: "Nhập email của tài khoản. Nếu khớp và dịch vụ email đã được kết nối, mã đặt lại gồm 6 chữ số sẽ được gửi đến.", sendResetCode: "Gửi mã đặt lại", resetCode: "Mã đặt lại 6 chữ số", enterResetCode: "Nhập mã", backToSignIn: "Quay lại đăng nhập", resetRequestReady: "Nếu email khớp với tài khoản, hãy kiểm tra mã đặt lại. Dịch vụ email phải được kết nối trước.", passwordReset: "Mật khẩu đã được cập nhật. Hãy đăng nhập bằng mật khẩu mới.", tuningRooms: "Đang kết nối các phòng…", couldNotLoadRooms: "Không thể tải danh sách phòng.", startAgain: "Bắt đầu lại", onTheAir: "Đang phát sóng", goodToSee: "Rất vui gặp lại", personalStatus: "thay đổi trạng thái cá nhân", signOut: "Đăng xuất", youAre: "Vai trò của bạn:", credits: "Tín dụng", creditBalance: "Số dư tín dụng", earnCredits: "Nhận 1 tín dụng cho mỗi giờ trực tuyến", buyCredits: "Mua tín dụng", buyCreditsAvailable: "Cho phép mua tín dụng", buyCreditsControlHint: "Cho phép thành viên xem gói tín dụng và bắt đầu thanh toán.", buyCreditsOn: "Bật", buyCreditsOff: "Tắt", buyCreditsUnavailable: "Hiện không thể mua tín dụng.", buyWithPayPal: "Mua bằng PayPal", paypalSetupNeeded: "Thanh toán PayPal cần kết nối tài khoản người bán an toàn trước khi có thể mua.", purchaseHistory: "Lịch sử mua", creditHistory: "Lịch sử tín dụng", noCreditActivity: "Chưa có hoạt động tín dụng", onlineEarned: "Nhận khi trực tuyến", creditPurchase: "Đã mua tín dụng", giftSent: "Quà đã gửi", giftReceived: "Quà đã nhận", adminGrant: "Được Siêu quản trị viên tặng", giveCredits: "Tặng tín dụng", creditPackages: "Gói tín dụng", addPackage: "Thêm gói", packageCredits: "Tín dụng trong gói", packagePrice: "Giá (USD)", purchaseLog: "Nhật ký mua", noPurchases: "Chưa có giao dịch mua", searchUsers: "Tìm người dùng", searchRooms: "Tìm phòng", previous: "Trước", next: "Tiếp", page: "Trang", privateRoom: "Phòng riêng tư", roomPassword: "Mật khẩu phòng", enterRoomPassword: "Nhập mật khẩu phòng", setRoomPassword: "Đặt mật khẩu phòng", removeRoomPassword: "Xóa mật khẩu", roomPasswordHint: "Khách phải nhập mật khẩu này trước khi vào.", giftCredits: "Tặng tín dụng", giftSinger: "Tặng người hát", creditAmount: "Số tín dụng", gift: "Tặng", gifted: "Đã gửi tín dụng", defaultDisplayName: "Tên hiển thị", editDisplayName: "Đổi tên hiển thị", yourRoomName: "Tên của bạn trong phòng này", editRoomName: "Đổi tên của tôi trong phòng", renameRoom: "Đổi tên phòng", newRoomName: "Tên phòng mới", passwordSecurity: "Hồ sơ & bảo mật", secureAccount: "Bảo vệ tài khoản", changeSignInPassword: "Quản lý email và mật khẩu đăng nhập", setPasswordAnotherDevice: "Thêm thông tin khôi phục cho tài khoản này", currentPassword: "Mật khẩu hiện tại", newPassword: "Mật khẩu mới", confirmNewPassword: "Xác nhận mật khẩu mới", saving: "Đang lưu…", changePassword: "Đổi mật khẩu", setPassword: "Đặt mật khẩu", cancel: "Hủy", areYouSure: "Bạn có chắc không?", confirm: "Xác nhận", newPasswordsMismatch: "Mật khẩu mới không khớp.", emailStatus: "Email", verified: "Đã xác minh", notVerified: "Chưa xác minh", noEmail: "Chưa thêm email", addOrChangeEmail: "Thêm hoặc đổi email", sendConfirmation: "Gửi mã xác nhận", confirmationCode: "Mã xác nhận", verifyEmail: "Xác minh email", emailServiceNeeded: "Luồng gửi email đã sẵn sàng, nhưng chưa kết nối nhà cung cấp.", confirmationSent: "Đã gửi mã xác nhận. Hãy kiểm tra email.", emailVerified: "Đã xác nhận email.", openRoom: "Mở phòng mới", openRoomHint: "Mọi người đều có thể tạo · tối đa 10 phòng mỗi người", roomName: "Tên phòng", roomPlaceholder: "Những bài hát đêm khuya", open: "Mở", roomPicture: "Ảnh phòng", roomPictureOptions: "Tùy chọn ảnh phòng", changeRoomPicture: "Đổi ảnh phòng", removeRoomPicture: "Xóa ảnh phòng", chatBackground: "Nền trò chuyện", chooseChatBackground: "Chọn nền trò chuyện", backgroundFade: "Độ mờ nền", standardWallpapers: "Hình nền dễ thương", wallpaperCats: "Mèo kawaii", wallpaperKitten: "Mèo con mơ mộng", wallpaperClouds: "Mây pastel", wallpaperDaisies: "Cúc pastel", applyingWallpaper: "Đang áp dụng hình nền…", whiteBackground: "Trắng", transparentBackground: "Trong suốt", photoBackground: "Ảnh", chooseBackgroundPhoto: "Chọn ảnh nền", changeBackgroundPhoto: "Đổi ảnh nền", removeBackgroundPhoto: "Xóa ảnh nền", invalidBackgroundPhoto: "Chọn ảnh JPG, PNG hoặc WebP dưới 7,5 MB.", singerCoverPhoto: "Ảnh bìa người hát", singerCoverHint: "Hiển thị trên sân khấu khi bạn hát mà không bật camera.", changePhoto: "Đổi ảnh", removePhoto: "Xóa ảnh", userId: "ID người dùng", rooms: "Phòng", quiet: "Không gian đang yên ắng", quietCreator: "Mở phòng đầu tiên và bắt đầu cuộc trò chuyện.", quietMember: "Mở phòng đầu tiên và bắt đầu cuộc trò chuyện.", owner: "Chủ phòng", ownedBy: "Chủ phòng", deleteRoom: "Xóa phòng", deleteRoomConfirm: "Xóa {name}? Tin nhắn, hàng chờ và lịch sử của phòng sẽ bị xóa vĩnh viễn.", hereNow: "đang ở đây", joined: "đã tham gia", waitingVoices: "Đang chờ tiếng nói", activeNow: "Đang hoạt động", inactive: "Không hoạt động", enteringRoom: "Đang vào phòng…", couldNotOpenRoom: "Không thể mở phòng này.", backToRooms: "Quay lại danh sách phòng", liveRoom: "Phòng trực tiếp", leaveRoom: "Rời phòng", isOnMic: "đang cầm mic", areOnMic: "đang cầm mic", turn: "lượt", singerTurn: "Lượt người hát", isUpNext: "sắp đến lượt", joinQueueTakeMic: "Vào hàng chờ để cầm mic", giveHeart: "Tặng tim", yourHeartCount: "Tim từ phòng này", hearts: "tim", heart: "tim", heartReady: "Sẵn sàng", heartAgain: "Tặng lại sau", muted: "Đã tắt tiếng", starting: "Đang bật…", startCamera: "Bật camera", stopCamera: "Tắt camera", cameraUnavailable: "Trình duyệt này không hỗ trợ truy cập camera.", cameraBlocked: "Quyền truy cập camera đã bị chặn. Hãy cho phép camera rồi thử lại.", singerCamera: "Camera người hát", leaveMic: "Rời mic", joinMic: "Bật mic", queueFirst: "Vào hàng chờ", leaveLiveAudio: "Rời âm thanh trực tiếp", startingMicrophone: "Đang bật mic", joinLiveAudio: "Tham gia âm thanh trực tiếp", waitMicTurn: "Chờ đến lượt cầm mic", unmuteMyMic: "Bật tiếng mic", muteMyMic: "Tắt tiếng mic", shareBackgroundSound: "Chia sẻ âm thanh nền", stopBackgroundSound: "Dừng chia sẻ âm thanh nền", backgroundSoundStarting: "Đang điều chỉnh âm thanh…", backgroundSoundHint: "Bật âm thanh nền trực tiếp—không cần bật mic trước.", backgroundSoundError: "Không thể đổi chế độ âm thanh của mic.", hotMic: "Mic thông báo", leaveHotMic: "Tắt mic thông báo", startHearing: "Bắt đầu nghe âm thanh trực tiếp", tapHear: "Chạm để nghe", micQueue: "Hàng chờ mic", minuteTurns: "phút mỗi lượt", setTime: "Đặt thời gian", defaultTurnLength: "Thời lượng mặc định", minutes: "phút", save: "Lưu", micMode: "Chế độ mic", freeMode: "Chế Độ Tự Do", queueMode: "Chế Độ Xếp Hàng", freeModeHint: "Mọi người có thể bật mic cùng lúc. Không có hàng chờ.", queueModeHint: "Mỗi lượt chỉ một người cầm mic theo thứ tự hàng chờ.", changeMicMode: "Đổi chế độ mic", displayOptions: "Tùy chọn hiển thị", freeMicPrompt: "Chế Độ Tự Do đang bật — hãy tham gia trò chuyện trực tiếp khi bạn sẵn sàng.", queueManagement: "Quản lý hàng chờ", selectPerson: "Chọn một người", addToQueue: "Thêm vào hàng", makeSinger: "Cho hát ngay", moveUp: "Đẩy lên", removeFromQueue: "Xóa khỏi hàng", clearQueue: "Xóa toàn bộ hàng", clearQueueConfirm: "Xóa mọi người khỏi hàng chờ mic? Nhạc của người đang hát cũng sẽ dừng.", removeQueueConfirm: "Xóa {name} khỏi hàng chờ mic?", noPeopleToAdd: "Mọi người có thể tham gia đều đã ở trong hàng.", nowOnMic: "Đang cầm mic", upNext: "Tiếp theo", startYourMic: "Bật mic của bạn", noWaiting: "Chưa có ai chờ. Hãy nhận lượt đầu tiên.", addTime: "Thêm thời gian", min: "phút", you: "bạn", waiting: "Đang chờ", joining: "Đang tham gia…", joinMicQueue: "Vào hàng chờ mic", endMyTurn: "Kết thúc lượt", leaveQueue: "Rời hàng chờ", inLine: "trong hàng", yourTurnTap: "Đến lượt bạn — chạm Bật mic bên cạnh tên", peopleRoles: "Mọi người & vai trò", peopleRoom: "Người trong phòng", onMic: "Đang cầm mic", mutedByModerator: "Bị điều hành viên tắt tiếng", roomTier: "Cấp trong phòng", visitorRole: "Khách vãng lai", memberRole: "Thành viên", modOne: "Mod 1 - Cộng tác viên", modTwo: "VIP", modThree: "Mod 3 - Quản trị viên", blackShirt: "Áo đen", demote: "Hạ cấp", promote: "Thăng cấp", promoteTo: "Thăng lên", demoteTo: "Hạ xuống", unmute: "Bật tiếng", mute: "Tắt tiếng", removeFromRoom: "Mời ra khỏi phòng", personSettings: "Cài đặt người dùng", roomSettings: "Cài đặt phòng", changeRoomPersonName: "Đổi tên trong phòng", addFriend: "Kết bạn", requestSent: "Đã gửi lời mời", friends: "Bạn bè", friendRequests: "Lời mời kết bạn", accept: "Chấp nhận", decline: "Từ chối", noFriends: "Chưa có bạn bè.", noFriendRequests: "Không có lời mời đang chờ.", banFromRoom: "Cấm khỏi phòng", banConfirm: "Cấm {name}? Người này sẽ không thể vào lại phòng.", roomBanList: "Danh sách cấm của phòng", bannedBy: "Bị cấm bởi", unban: "Bỏ cấm", noBannedUsers: "Không có ai bị cấm khỏi phòng.", conversation: "Cuộc trò chuyện trong phòng", noMessages: "Chưa có tin nhắn.", firstHello: "Hãy gửi lời chào đầu tiên.", formerMember: "Thành viên cũ", message: "Tin nhắn", youMuted: "Bạn đã bị tắt tiếng", addConversation: "Tham gia trò chuyện…", sendMessage: "Gửi tin nhắn", sendPhoto: "Gửi ảnh", photoSending: "Đang gửi ảnh…", photoUploadHint: "JPG, PNG hoặc WebP · tối đa 7,5 MB", invalidChatPhoto: "Chọn ảnh JPG, PNG hoặc WebP dưới 7,5 MB.", chatPhoto: "Ảnh do", openChatPhoto: "Xem ảnh đầy đủ", closeChatPhoto: "Đóng ảnh đầy đủ", openEmojiPicker: "Thêm biểu tượng cảm xúc", closeEmojiPicker: "Đóng bảng biểu tượng cảm xúc", emojiPicker: "Bảng biểu tượng cảm xúc", adminDashboard: "Bảng quản trị", adminUsers: "Người dùng", adminRooms: "Phòng", masterLogs: "Nhật ký tổng", activity: "Hoạt động", timestamp: "Thời gian", logsRetained: "Hoạt động được lưu trong 30 ngày.", superAdmin: "Siêu quản trị viên", promoteAdmin: "Thăng lên quản trị viên", demoteAdmin: "Hạ cấp quản trị viên", ipAddress: "Địa chỉ IP gần nhất", ipUnknown: "Chưa ghi nhận", lastSeen: "Ghi nhận lúc", accountLocked: "Tài khoản đã khóa", networkBlocked: "IP đã chặn", lockAccount: "Khóa tài khoản", unlockAccount: "Mở khóa tài khoản", blockIp: "Chặn IP", unblockIp: "Bỏ chặn IP", roomOwner: "Chủ phòng", transferOwnership: "Đổi chủ phòng", chooseNewOwner: "Chọn chủ phòng mới", newRoomOwner: "Chủ phòng mới", roomLevel: "Cấp", upgradeLevelTwo: "Nâng lên cấp 2", downgradeLevelOne: "Hạ xuống cấp 1", levelTwoCamera: "Camera mở khóa ở cấp 2", lockRoom: "Khóa phòng", unlockRoom: "Mở khóa phòng", lockReason: "Lý do khóa", communityReview: "Xem xét tiêu chuẩn cộng đồng", adminConfirmAction: "Áp dụng thao tác quản trị này?", lockedRoom: "Đã khóa", deleted: "Đã xóa", deleteUser: "Xóa người dùng", restoreUser: "Khôi phục người dùng", restoreRoom: "Khôi phục phòng", noAdminData: "Không có dữ liệu quản trị.", report: "Báo cáo", reportUser: "Báo cáo người dùng", reportRoom: "Báo cáo phòng", reportReason: "Lý do", reportDetails: "Điều gì đã xảy ra?", reportDetailsHint: "Cung cấp đủ chi tiết để đội ngũ quản trị xem xét.", reportEvidence: "Tệp bằng chứng", addEvidence: "Thêm hình ảnh hoặc tệp", evidenceHint: "Tối đa 3 tệp JPG, PNG, WebP, GIF, PDF, TXT, DOC hoặc DOCX · 7,5 MB mỗi tệp · tổng cộng 15 MB", unsupportedEvidence: "Chọn tệp được hỗ trợ có dung lượng dưới 7,5 MB.", tooManyEvidence: "Bạn có thể đính kèm tối đa 3 tệp.", removeEvidence: "Xóa tệp", attachments: "Tệp đính kèm", openAttachment: "Mở tệp đính kèm", submitReport: "Gửi báo cáo", reportSent: "Báo cáo đã được gửi đến đội ngũ quản trị.", harassment: "Quấy rối", hate: "Hành vi thù ghét", spam: "Spam hoặc lừa đảo", sexual: "Nội dung tình dục", violence: "Bạo lực hoặc đe dọa", impersonation: "Mạo danh", other: "Khác", support: "Hỗ trợ", contactSupport: "Liên hệ đội ngũ quản trị", supportHint: "Yêu cầu trợ giúp về tài khoản, phòng hoặc cách sử dụng trang.", supportSubject: "Chủ đề", supportDetails: "Chúng tôi có thể giúp gì?", sendSupport: "Gửi đến hỗ trợ", supportSent: "Phiếu hỗ trợ của bạn đã được tạo.", waitingAdmin: "Đang chờ quản trị viên rảnh", acceptedByAdmin: "Được tiếp nhận bởi", startSupportChat: "Bắt đầu trò chuyện hỗ trợ", messageAdmin: "Nhắn cho đội ngũ quản trị", adminInbox: "Báo cáo & hỗ trợ", reports: "Báo cáo", supportRequests: "Yêu cầu hỗ trợ", activeSupportQueue: "Hàng chờ đang hoạt động", supportHistory: "Lịch sử", ticketNumber: "Phiếu", openCases: "Mở", reviewing: "Đang xem xét", accepted: "Đã tiếp nhận", resolved: "Đã giải quyết", dismissed: "Đã bỏ qua", markReviewing: "Xem xét", resolve: "Giải quyết", dismiss: "Bỏ qua", reviewNote: "Ghi chú quản trị", noReports: "Chưa có báo cáo.", noSupport: "Chưa có yêu cầu hỗ trợ.", noActiveSupport: "Không có yêu cầu hỗ trợ đang hoạt động.", micUnavailable: "Trình duyệt này không hỗ trợ truy cập mic.", couldNotJoinMic: "Không thể tham gia mic.", turnEnded: "Lượt mic của bạn đã kết thúc. Hãy vào hàng chờ để nhận lượt khác.", moderatorMuted: "Điều hành viên đã tắt tiếng của bạn trong phòng này.", participant: "người tham gia" } }, Qx = ["\uD83D\uDE00", "\uD83D\uDE02", "\uD83E\uDD70", "\uD83D\uDE0D", "\uD83D\uDE0A", "\uD83D\uDE0E", "\uD83E\uDD29", "\uD83E\uDD73", "\uD83E\uDD17", "\uD83D\uDE09", "\uD83D\uDE22", "\uD83D\uDE2D", "\uD83D\uDE2E", "\uD83D\uDE05", "\uD83D\uDE4F", "\uD83D\uDC4F", "\uD83D\uDC4D", "❤️", "\uD83D\uDD25", "\uD83C\uDF89", "\uD83C\uDFA4", "\uD83C\uDFB5", "\uD83D\uDC83", "\uD83D\uDD7A"], hv = [{ id: "kawaii-cats", nameKey: "wallpaperCats", src: sv }, { id: "dreamy-kitten", nameKey: "wallpaperKitten", src: uv }, { id: "pastel-clouds", nameKey: "wallpaperClouds", src: cv }, { id: "pastel-daisies", nameKey: "wallpaperDaisies", src: dv }], yv = La(null);
function Dx() { return "vi"; }
function hn() { let e = Fa(yv); if (!e)
    throw Error("Locale provider is missing"); return e; }
function $x() { var _j; try {
    return (_j = window.localStorage.getItem(Dp)) !== null && _j !== void 0 ? _j : "";
}
catch (_10) {
    return "";
} }
function Gx(e) { try {
    window.localStorage.setItem(Dp, e);
}
catch (_j) { } }
function _x() { try {
    window.localStorage.removeItem(Dp);
}
catch (_j) { } }
var Su = ["visitor", "member", "mod2", "mod1", "mod3", "blackshirt", "owner"], Li = ["superadmin", "admin", "owner", "blackshirt", "mod3", "mod1", "mod2", "member", "visitor"];
function Q({ name: e, size: t = 20 }) { return l("svg", { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: { mic: d(V, { children: [l("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }), l("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7" })] }), send: d(V, { children: [l("path", { d: "m3 11 17-8-7.5 18-2.1-7.4L3 11Z" }), l("path", { d: "m10.4 13.6 4.2-4.2" })] }), plus: l(V, { children: l("path", { d: "M12 5v14M5 12h14" }) }), users: d(V, { children: [l("circle", { cx: "9", cy: "8", r: "3" }), l("path", { d: "M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M16 5.4a3 3 0 0 1 0 5.2M17 14a5 5 0 0 1 3.5 4.8V20" })] }), door: d(V, { children: [l("path", { d: "M4 21V3h11v18M15 12h6M18 9l3 3-3 3" }), l("circle", { cx: "11", cy: "12", r: ".5" })] }), shield: l("path", { d: "M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z" }), mute: l(V, { children: l("path", { d: "m4 9 4-4 8 14M9 9v3a3 3 0 0 0 4.2 2.7M15 11V6a3 3 0 0 0-5.5-1.6M5 11a7 7 0 0 0 11.5 5.4M19 11a7 7 0 0 1-.8 3.2M12 18v3M8.5 21h7" }) }), back: l(V, { children: l("path", { d: "m15 18-6-6 6-6" }) }), music: d(V, { children: [l("path", { d: "M9 18V5l10-2v13" }), l("circle", { cx: "6", cy: "18", r: "3" }), l("circle", { cx: "16", cy: "16", r: "3" })] }), clock: d(V, { children: [l("circle", { cx: "12", cy: "12", r: "9" }), l("path", { d: "M12 7v5l3 2" })] }), queue: d(V, { children: [l("path", { d: "M9 6h11M9 12h11M9 18h11" }), l("circle", { cx: "4.5", cy: "6", r: "1" }), l("circle", { cx: "4.5", cy: "12", r: "1" }), l("circle", { cx: "4.5", cy: "18", r: "1" })] }), heart: l("path", { d: "M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.8Z" }), smile: d(V, { children: [l("circle", { cx: "12", cy: "12", r: "9" }), l("path", { d: "M8 14s1.4 2 4 2 4-2 4-2" }), l("circle", { cx: "9", cy: "9", r: ".7", fill: "currentColor", stroke: "none" }), l("circle", { cx: "15", cy: "9", r: ".7", fill: "currentColor", stroke: "none" })] }), camera: d(V, { children: [l("rect", { x: "3", y: "6", width: "13", height: "12", rx: "2" }), l("path", { d: "m16 10 5-3v10l-5-3z" })] }), image: d(V, { children: [l("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), l("circle", { cx: "8.5", cy: "9", r: "1.5" }), l("path", { d: "m4 17 4.5-4.5 3.5 3 2.5-2.5 5.5 5" })] }), edit: d(V, { children: [l("path", { d: "M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z" }), l("path", { d: "m13.5 6.5 4 4" })] }), shirt: d(V, { children: [l("path", { d: "M8 4 3 7l2 5 3-1v9h8v-9l3 1 2-5-5-3c-.6 1.5-1.9 2.4-4 2.4S8.6 5.5 8 4Z", fill: "currentColor" }), l("path", { d: "m9 4 3 2.4L15 4" })] }), trash: l(V, { children: l("path", { d: "M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" }) }), menu: l(V, { children: l("path", { d: "M4 6h16M4 12h16M4 18h16" }) }), grid: d(V, { children: [l("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1" }), l("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1" }), l("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1" }), l("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1" })] }), star: l("path", { d: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" }), wifi: d(V, { children: [l("path", { d: "M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a4 4 0 0 1 4 0" }), l("circle", { cx: "12", cy: "19", r: "1", fill: "currentColor", stroke: "none" })] }), record: d(V, { children: [l("circle", { cx: "12", cy: "12", r: "8" }), l("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor" })] }), collapse: d(V, { children: [l("path", { d: "M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" }), l("path", { d: "m4 4 5 5M20 4l-5 5M4 20l5-5M20 20l-5-5" })] }), gear: d(V, { children: [l("circle", { cx: "12", cy: "12", r: "3" }), l("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" })] }) }[e] }); }
function gv({ role: e }) { let { locale: t, t: a } = hn(); if (e === "user")
    return null; let n = e === "owner" ? a("owner") : e === "superadmin" ? a("superAdmin") : t === "vi" ? e === "admin" ? "quản trị viên" : "điều hành viên" : e; return d("span", { className: `role-badge ${e}`, children: [l(Q, { name: "shield", size: 13 }), n] }); }
function P({ children: e, tone: t = "plain" }) { return l("p", { className: `notice ${t}`, children: e }); }
function ku({ message: e, confirmLabel: t, onConfirm: a, onCancel: n }) { let { t: i } = hn(); return he(() => { let r = (o) => { if (o.key === "Escape")
    n(); }; return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r); }, [n]), l("div", { className: "dialog-backdrop", role: "presentation", children: d("section", { className: "confirmation-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "confirmation-title", "aria-describedby": "confirmation-message", children: [l("h2", { id: "confirmation-title", children: i("areYouSure") }), l("p", { id: "confirmation-message", children: e }), d("div", { className: "confirmation-actions", children: [l("button", { type: "button", className: "cancel-button", onClick: n, autoFocus: !0, children: i("cancel") }), l("button", { type: "button", className: "confirm-button", onClick: a, children: t })] })] }) }); }
function Bx({ src: e, alt: t, onClose: a }) { let { t: n } = hn(); return he(() => { let i = (r) => { if (r.key === "Escape")
    a(); }; return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i); }, [a]), l("div", { className: "photo-lightbox", role: "presentation", onClick: a, children: d("section", { className: "photo-lightbox-dialog", role: "dialog", "aria-modal": "true", "aria-label": n("openChatPhoto"), onClick: (i) => i.stopPropagation(), children: [l("button", { type: "button", className: "photo-lightbox-close", onClick: a, "aria-label": n("closeChatPhoto"), autoFocus: !0, children: "×" }), l("img", { src: e, alt: t })] }) }); }
function xv({ token: e, target: t, onClose: a }) { var _j, _10, _11; let { t: n } = hn(), [i, r] = E("harassment"), [o, s] = E(""), [p, f] = E([]), [b, x] = E(""), h = G({ mutationFn: () => __awaiter(this, void 0, void 0, function* () { let k = yield Promise.all(p.map((M) => __awaiter(this, void 0, void 0, function* () { let g = pv(M); if (!g)
        throw Error(n("unsupportedEvidence")); return { dataBase64: (yield fi(M)).dataBase64, mimeType: g, fileName: M.name }; }))); return A.submitReport({ token: e, targetType: t.type, targetId: t.id, category: i, details: o, attachments: k }); }) }), v = ((_j = h.data) === null || _j === void 0 ? void 0 : _j.ok) === !0, T = p.reduce((k, M) => k + M.size, 0); return l("div", { className: "dialog-backdrop", role: "presentation", children: d("section", { className: "confirmation-dialog report-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "report-dialog-title", children: [l("h2", { id: "report-dialog-title", children: t.type === "user" ? n("reportUser") : n("reportRoom") }), l("p", { children: l("strong", { children: t.name }) }), v ? d(V, { children: [l(P, { children: n("reportSent") }), l("div", { className: "confirmation-actions", children: l("button", { type: "button", className: "confirm-button", onClick: a, children: n("confirm") }) })] }) : d("form", { onSubmit: (k) => { k.preventDefault(), x(""), h.mutate(); }, children: [l("label", { htmlFor: "report-category", children: n("reportReason") }), d("select", { id: "report-category", value: i, onChange: (k) => r(k.target.value), children: [l("option", { value: "harassment", children: n("harassment") }), l("option", { value: "hate", children: n("hate") }), l("option", { value: "spam", children: n("spam") }), l("option", { value: "sexual", children: n("sexual") }), l("option", { value: "violence", children: n("violence") }), l("option", { value: "impersonation", children: n("impersonation") }), l("option", { value: "other", children: n("other") })] }), l("label", { htmlFor: "report-details", children: n("reportDetails") }), l("textarea", { id: "report-details", value: o, onChange: (k) => s(k.target.value), placeholder: n("reportDetailsHint"), minLength: 10, maxLength: 1500, rows: 5, required: !0 }), d("div", { className: "report-evidence-field", children: [l("span", { children: n("reportEvidence") }), d("label", { className: "report-file-picker", children: [n("addEvidence"), l("input", { id: "report-evidence", type: "file", multiple: !0, accept: "image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,.doc,.docx", disabled: h.isPending || p.length >= 3, onChange: (k) => { var _j; let M = Array.from((_j = k.currentTarget.files) !== null && _j !== void 0 ? _j : []); if (k.currentTarget.value = "", p.length + M.length > 3) {
                                            x(n("tooManyEvidence"));
                                            return;
                                        } if (M.some((y) => !pv(y) || y.size === 0 || y.size > 7500000)) {
                                            x(n("unsupportedEvidence"));
                                            return;
                                        } let m = [...p, ...M]; if (m.reduce((y, w) => y + w.size, 0) > 15000000) {
                                            x(n("evidenceHint"));
                                            return;
                                        } x(""), f(m); } })] }), l("small", { children: n("evidenceHint") })] }), p.length > 0 && l("div", { className: "report-file-list", children: p.map((k, M) => d("div", { children: [d("span", { children: [l("strong", { children: k.name }), l("small", { children: bv(k.size) })] }), l("button", { type: "button", "aria-label": `${n("removeEvidence")}: ${k.name}`, onClick: () => f((g) => g.filter((m, y) => y !== M)), children: "×" })] }, `${k.name}-${k.lastModified}-${M}`)) }), (b || ((_10 = h.data) === null || _10 === void 0 ? void 0 : _10.error) || h.error) && l(P, { tone: "error", children: b || ((_11 = h.data) === null || _11 === void 0 ? void 0 : _11.error) || (h.error instanceof Error ? h.error.message : n("unsupportedEvidence")) }), d("div", { className: "confirmation-actions", children: [l("button", { type: "button", className: "cancel-button", onClick: a, children: n("cancel") }), l("button", { className: "confirm-button", disabled: h.isPending || o.trim().length < 10 || T > 15000000, children: h.isPending ? n("pleaseWait") : n("submitReport") })] })] })] }) }); }
function wv({ token: e, onClose: t, embedded: a = !1 }) { var _j, _10, _11, _12, _13, _14, _15; let { locale: n, t: i } = hn(), r = ja(), [o, s] = E(""), p = $t({ queryKey: ["support-chat", e], queryFn: () => A.getMySupportChat({ token: e }), refetchInterval: 2000 }), f = G({ mutationFn: () => A.submitSupportRequest({ token: e, details: o }), onSuccess: (v) => { if (v.ok)
        s(""), r.invalidateQueries({ queryKey: ["support-chat", e] }); } }), b = G({ mutationFn: (v) => A.sendSupportMessage({ token: e, ticketId: v, body: o }), onSuccess: (v) => { if (v.ok)
        s(""), r.invalidateQueries({ queryKey: ["support-chat", e] }); } }), x = (_j = p.data) === null || _j === void 0 ? void 0 : _j.ticket, h = f.isPending || b.isPending; return d("section", { className: `support-chat-panel ${a ? "embedded" : ""}`, role: a ? "region" : "dialog", "aria-modal": a ? void 0 : "false", "aria-labelledby": "support-chat-title", children: [d("header", { children: [d("div", { children: [l("strong", { id: "support-chat-title", children: i("contactSupport") }), x && d("small", { children: [i("ticketNumber"), " #", x.id, " · ", x.status === "open" ? i("waitingAdmin") : x.adminName ? `${i("acceptedByAdmin")} ${x.adminName}` : i("support")] })] }), !a && t && l("button", { type: "button", onClick: t, "aria-label": i("cancel"), children: "×" })] }), !x ? l("div", { className: "support-chat-empty", children: l("p", { children: i("supportHint") }) }) : l("div", { className: "support-chat-messages", children: x.messages.map((v) => d("article", { className: v.fromAdmin ? "from-admin" : "from-user", children: [l("strong", { children: v.fromAdmin ? i("support") : v.senderName }), l("p", { children: v.body }), l("time", { children: new Intl.DateTimeFormat(n, { hour: "numeric", minute: "2-digit" }).format(new Date(v.createdAt)) })] }, v.id)) }), d("form", { onSubmit: (v) => { if (v.preventDefault(), !o.trim())
                return; if (x)
                b.mutate(x.id);
            else
                f.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "support-chat-message", children: x ? i("messageAdmin") : i("startSupportChat") }), l("textarea", { id: "support-chat-message", value: o, onChange: (v) => s(v.target.value), placeholder: x ? i("messageAdmin") : i("supportDetails"), minLength: x ? 1 : 2, maxLength: 1500, rows: 3, required: !0 }), l("button", { className: "confirm-button", disabled: h || o.trim().length < (x ? 1 : 2), children: h ? i("pleaseWait") : x ? i("sendMessage") : i("startSupportChat") })] }), (((_10 = p.data) === null || _10 === void 0 ? void 0 : _10.error) || ((_11 = f.data) === null || _11 === void 0 ? void 0 : _11.error) || ((_12 = b.data) === null || _12 === void 0 ? void 0 : _12.error)) && l(P, { tone: "error", children: ((_13 = p.data) === null || _13 === void 0 ? void 0 : _13.error) || ((_14 = f.data) === null || _14 === void 0 ? void 0 : _14.error) || ((_15 = b.data) === null || _15 === void 0 ? void 0 : _15.error) })] }); }
function Lx({ onReady: e }) { var _j, _10, _11; let { t } = hn(), [a, n] = E("signin"), [i, r] = E(""), [o, s] = E(""), [p, f] = E(""), [b, x] = E(""), [h, v] = E(""), [T, k] = E(""), [M, g] = E(""), m = G({ mutationFn: () => A.loginUser({ name: i, password: p }) }), y = G({ mutationFn: () => A.registerUser({ name: i, email: o, password: p }) }), w = G({ mutationFn: () => A.requestPasswordReset({ email: o }) }), R = G({ mutationFn: () => A.resetPassword({ email: o, code: h, newPassword: p }) }), D = m.isPending || y.isPending || w.isPending || R.isPending; function q(ae) {
    return __awaiter(this, void 0, void 0, function* () { if (ae.preventDefault(), k(""), g(""), (a === "create" || a === "reset") && p !== b) {
        k(t("passwordsMismatch"));
        return;
    } if (a === "forgot") {
        if ((yield w.mutateAsync()).ok)
            n("reset"), g(t("resetRequestReady"));
        return;
    } if (a === "reset") {
        if ((yield R.mutateAsync()).ok)
            n("signin"), f(""), x(""), v(""), g(t("passwordReset"));
        return;
    } let De = a === "signin" ? yield m.mutateAsync() : yield y.mutateAsync(); if (De.ok && De.token)
        Gx(De.token), e(De.token); });
} function H(ae) { n(ae), f(""), x(""), v(""), k(""), g(""), m.reset(), y.reset(), w.reset(), R.reset(); } let B = a === "signin" ? (_j = m.data) === null || _j === void 0 ? void 0 : _j.error : a === "create" ? (_10 = y.data) === null || _10 === void 0 ? void 0 : _10.error : a === "reset" ? (_11 = R.data) === null || _11 === void 0 ? void 0 : _11.error : void 0, F = a === "signin" || a === "create"; return d("main", { className: "welcome-shell", children: [d("section", { className: "welcome-copy", children: [d("div", { className: "signal-mark", "aria-hidden": "true", children: [l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {})] }), l("p", { className: "eyebrow", children: t("openMic") }), d("h1", { children: [t("heroLineOne"), l("br", {}), l("em", { children: t("heroLineTwo") })] }), l("p", { className: "intro", children: t("intro") })] }), d("section", { className: "auth-panel", "aria-label": t("accountAccess"), children: [F ? d("div", { className: "auth-tabs", role: "tablist", "aria-label": t("accountOptions"), children: [l("button", { type: "button", role: "tab", "aria-selected": a === "signin", className: a === "signin" ? "active" : "", onClick: () => H("signin"), children: t("signIn") }), l("button", { type: "button", role: "tab", "aria-selected": a === "create", className: a === "create" ? "active" : "", onClick: () => H("create"), children: t("createAccount") })] }) : d("div", { className: "auth-recovery-heading", children: [d("button", { type: "button", className: "text-button", onClick: () => H("signin"), children: ["← ", t("backToSignIn")] }), l("h2", { children: t("resetPassword") })] }), d("form", { className: "welcome-form", onSubmit: q, children: [(a === "signin" || a === "create") && d(V, { children: [l("label", { htmlFor: "display-name", children: t("displayName") }), l("input", { id: "display-name", value: i, onChange: (ae) => r(ae.target.value), minLength: 2, maxLength: 24, autoComplete: "username", placeholder: t("yourName"), required: !0 })] }), (a === "create" || a === "forgot" || a === "reset") && d(V, { children: [l("label", { htmlFor: "account-email", children: t("email") }), l("input", { id: "account-email", type: "email", value: o, onChange: (ae) => s(ae.target.value), maxLength: 254, autoComplete: "email", placeholder: t("yourEmail"), required: !0 })] }), a === "reset" && d(V, { children: [l("label", { htmlFor: "reset-code", children: t("resetCode") }), l("input", { id: "reset-code", value: h, onChange: (ae) => v(ae.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", autoComplete: "one-time-code", pattern: "[0-9]{6}", placeholder: t("enterResetCode"), required: !0 })] }), a !== "forgot" && d(V, { children: [l("label", { htmlFor: "password", children: a === "reset" ? t("newPassword") : t("password") }), l("input", { id: "password", type: "password", value: p, onChange: (ae) => f(ae.target.value), minLength: a === "signin" ? 1 : 6, maxLength: 72, autoComplete: a === "signin" ? "current-password" : "new-password", placeholder: a === "signin" ? t("yourPassword") : t("atLeastSix"), required: !0 })] }), (a === "create" || a === "reset") && d(V, { children: [l("label", { htmlFor: "confirm-password", children: a === "reset" ? t("confirmNewPassword") : t("confirmPassword") }), l("input", { id: "confirm-password", type: "password", value: b, onChange: (ae) => x(ae.target.value), minLength: 6, maxLength: 72, autoComplete: "new-password", placeholder: t("repeatPassword"), required: !0 })] }), a === "forgot" && l("p", { className: "form-note recovery-note", children: t("resetInstructions") }), l("button", { className: "primary-button auth-submit", disabled: D, children: D ? t("pleaseWait") : a === "signin" ? t("signIn") : a === "create" ? t("createAccount") : a === "forgot" ? t("sendResetCode") : t("resetPassword") }), a === "signin" && l("button", { type: "button", className: "text-button forgot-link", onClick: () => H("forgot"), children: t("forgotPassword") }), (T || B) && l(P, { tone: "error", children: T || B }), M && l(P, { children: M })] })] })] }); }
function Kx({ token: e, onOpenRoom: t, onSignOut: a, supportOpen: n, onSetSupportOpen: i }) { var _j, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133; let { locale: r, t: o } = hn(), s = ja(), [p, f] = E(!1), [b, x] = E(""), [h, v] = E(!1), [T, k] = E(!1), [M, g] = E(null), [m, y] = E(""), [w, R] = E(!1), [D, q] = E(""), [H, B] = E(!1), [F, ae] = E(""), [De, st] = E(""), [gn, Nl] = E(""), [Zo, Tl] = E(""), [El, ni] = E(""), [Ki, pa] = E(""), [Ea, bn] = E(""), [Fi, vn] = E(""), [Cl, yn] = E(!1), [ji, Po] = E(null), [fe, It] = E(!1), [Mt, We] = E(!1), [se, ma] = E("users"), [ii, Io] = E(null), [oi, Vi] = E({}), [Yi, Jo] = E({}), [xn, ri] = E(""), [Wo, er] = E(""), [ue, it] = E({}), [li, tr] = E(""), [ar, nr] = E(""), [Xi, Nu] = E(""), [Tu, wn] = E(1), Ca = _e(null), Zi = _e(!1), [Pi, ir] = E(mv), [Sn, or] = E(1), [qt, si] = E(1), [rr, Eu] = E({}), [Ii, lr] = E({}), [ke, Me] = E(null), qe = $t({ queryKey: ["home", e], queryFn: () => A.getHome({ token: e }), refetchInterval: 5000 }), ze = $t({ queryKey: ["friends", e], queryFn: () => A.getFriends({ token: e }), refetchInterval: 5000 }), Jt = G({ mutationFn: (u) => A.respondFriendRequest(Object.assign({ token: e }, u)), onSuccess: () => { s.invalidateQueries({ queryKey: ["friends", e] }), s.invalidateQueries({ queryKey: ["room"] }); } }); he(() => { let u = () => { ir(mv()), wn(1); }, z = null; try {
    if (typeof window.matchMedia === "function")
        z = window.matchMedia("(min-width: 780px)");
}
catch (_j) {
    z = null;
} if (u(), z && typeof z.addEventListener === "function")
    return z.addEventListener("change", u), () => z === null || z === void 0 ? void 0 : z.removeEventListener("change", u); if (z && typeof z.addListener === "function")
    return z.addListener(u), () => z === null || z === void 0 ? void 0 : z.removeListener(u); return window.addEventListener("resize", u), () => window.removeEventListener("resize", u); }, []), he(() => { var _j, _10, _11; if (!H && ((_10 = (_j = qe.data) === null || _j === void 0 ? void 0 : _j.user) === null || _10 === void 0 ? void 0 : _10.personalStatus) !== void 0)
    ae((_11 = qe.data.user.personalStatus) !== null && _11 !== void 0 ? _11 : ""); }, [H, (_10 = (_j = qe.data) === null || _j === void 0 ? void 0 : _j.user) === null || _10 === void 0 ? void 0 : _10.personalStatus]); let te = $t({ queryKey: ["credit-store", e], queryFn: () => A.getCreditStore({ token: e }), enabled: T }), et = $t({ queryKey: ["admin-dashboard", e], queryFn: () => A.getAdminDashboard({ token: e }), enabled: fe && (((_12 = (_11 = qe.data) === null || _11 === void 0 ? void 0 : _11.user) === null || _12 === void 0 ? void 0 : _12.role) === "admin" || ((_14 = (_13 = qe.data) === null || _13 === void 0 ? void 0 : _13.user) === null || _14 === void 0 ? void 0 : _14.role) === "superadmin"), refetchInterval: fe ? 5000 : !1 }), be = $t({ queryKey: ["admin-credits", e], queryFn: () => A.getAdminCreditDashboard({ token: e }), enabled: fe && se === "credits" && (((_16 = (_15 = qe.data) === null || _15 === void 0 ? void 0 : _15.user) === null || _16 === void 0 ? void 0 : _16.role) === "admin" || ((_18 = (_17 = qe.data) === null || _17 === void 0 ? void 0 : _17.user) === null || _18 === void 0 ? void 0 : _18.role) === "superadmin") }), Ye = $t({ queryKey: ["admin-inbox", e], queryFn: () => A.getAdminInbox({ token: e }), enabled: fe && (se === "reports" || se === "support") && (((_20 = (_19 = qe.data) === null || _19 === void 0 ? void 0 : _19.user) === null || _20 === void 0 ? void 0 : _20.role) === "admin" || ((_22 = (_21 = qe.data) === null || _21 === void 0 ? void 0 : _21.user) === null || _22 === void 0 ? void 0 : _22.role) === "superadmin"), refetchInterval: fe && (se === "reports" || se === "support") ? 5000 : !1 }), kn = $t({ queryKey: ["admin-master-logs", e], queryFn: () => A.getAdminMasterLogs({ token: e }), enabled: fe && se === "logs" && (((_24 = (_23 = qe.data) === null || _23 === void 0 ? void 0 : _23.user) === null || _24 === void 0 ? void 0 : _24.role) === "admin" || ((_26 = (_25 = qe.data) === null || _25 === void 0 ? void 0 : _25.user) === null || _26 === void 0 ? void 0 : _26.role) === "superadmin"), refetchInterval: fe && se === "logs" ? 5000 : !1 }), ui = G({ mutationFn: () => A.createRoom({ token: e, name: b }), onSuccess: (u) => { if (u.ok && u.roomId)
        x(""), f(!1), t(u.roomId); s.invalidateQueries({ queryKey: ["home"] }); } }), Rt = G({ mutationFn: (u) => A.joinRoom(Object.assign({ token: e }, u)), onSuccess: (u, z) => { if (u.ok)
        g(null), y(""), t(z.roomId); } }), Ma = G({ mutationFn: (u) => A.deleteRoom({ token: e, roomId: u }), onSuccess: (u) => { if (u.ok)
        Po(null), Me(null); s.invalidateQueries({ queryKey: ["home", e] }), s.invalidateQueries({ queryKey: ["admin-dashboard", e] }); } }), L = G({ mutationFn: (u) => A.manageUserAccess(Object.assign({ token: e }, u)), onSuccess: (u) => { if (u.ok)
        Me(null); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), Nn = G({ mutationFn: (u) => A.manageRoomLock(Object.assign({ token: e }, u)), onSuccess: (u) => { if (u.ok)
        Me(null); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), fa = G({ mutationFn: (u) => A.setRoomLevel(Object.assign({ token: e }, u)), onSuccess: (u) => { if (u.ok)
        Me(null); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), qa = G({ mutationFn: (u) => A.restoreRoom({ token: e, roomId: u }), onSuccess: (u) => { if (u.ok)
        Me(null); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), ut = G({ mutationFn: (u) => A.createPayPalCreditCheckout({ token: e, packageId: u }), onSuccess: (u) => { if (u.ok && u.checkoutUrl)
        window.open(u.checkoutUrl, "_blank", "noopener,noreferrer"); } }), Wt = G({ mutationFn: (u) => A.grantCredits(Object.assign({ token: e }, u)), onSuccess: (u, z) => { if (u.ok)
        it((_) => (Object.assign(Object.assign({}, _), { [z.targetUserId]: "" }))); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["credit-store"] }), s.invalidateQueries({ queryKey: ["home"] }); } }), Ra = G({ mutationFn: () => A.addCreditPackage({ token: e, credits: Number(xn), priceCents: Math.round(Number(Wo) * 100) }), onSuccess: (u) => { if (u.ok)
        ri(""), er(""); s.invalidateQueries({ queryKey: ["admin-credits", e] }), s.invalidateQueries({ queryKey: ["credit-store", e] }); } }), Aa = G({ mutationFn: (u) => A.setBuyCreditsEnabled({ token: e, enabled: u }), onSuccess: () => { s.invalidateQueries({ queryKey: ["admin-credits", e] }), s.invalidateQueries({ queryKey: ["credit-store", e] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), Le = G({ mutationFn: (u) => A.transferRoomOwnership(Object.assign({ token: e }, u)), onSuccess: (u, z) => { if (u.ok)
        Me(null), lr((_) => (Object.assign(Object.assign({}, _), { [z.roomId]: "" }))); s.invalidateQueries({ queryKey: ["admin-dashboard", e] }), s.invalidateQueries({ queryKey: ["home", e] }), s.invalidateQueries({ queryKey: ["room"] }); } }), za = G({ mutationFn: (u) => A.acceptSupportTicket({ token: e, ticketId: u }), onSuccess: () => s.invalidateQueries({ queryKey: ["admin-inbox", e] }) }), ea = G({ mutationFn: (u) => A.sendSupportMessage(Object.assign({ token: e }, u)), onSuccess: (u, z) => { if (u.ok)
        Jo((_) => (Object.assign(Object.assign({}, _), { [z.ticketId]: "" }))); s.invalidateQueries({ queryKey: ["admin-inbox", e] }); } }), $e = G({ mutationFn: (u) => A.reviewAdminInboxItem(Object.assign(Object.assign({ token: e }, u), { reviewNote: oi[`${u.itemType}-${u.itemId}`] })), onSuccess: () => { s.invalidateQueries({ queryKey: ["admin-inbox", e] }), s.invalidateQueries({ queryKey: ["admin-master-logs", e] }); } }), ta = G({ mutationFn: () => A.updateDisplayName({ token: e, displayName: D }), onSuccess: (u) => { if (u.ok)
        R(!1); s.invalidateQueries({ queryKey: ["home", e] }); } }), bt = G({ mutationFn: () => A.updatePersonalStatus({ token: e, personalStatus: F }), onSuccess: (u) => { if (u.ok)
        B(!1); s.invalidateQueries({ queryKey: ["home", e] }); } }), At = G({ mutationFn: (u) => __awaiter(this, void 0, void 0, function* () { if (!u)
        return A.updateSingerCoverPhoto({ token: e, image: null }); if (!fn(u.type) || u.size > 7500000)
        return { ok: !1, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP dưới 7,5 MB." }; let z = yield fi(u); if (!fn(z.mimeType))
        return { ok: !1, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP." }; return A.updateSingerCoverPhoto({ token: e, image: { dataBase64: z.dataBase64, mimeType: z.mimeType } }); }), onSuccess: () => s.invalidateQueries({ queryKey: ["home", e] }) }), vt = G({ mutationFn: () => A.setPassword({ token: e, currentPassword: De, newPassword: gn }), onSuccess: (u) => { if (!u.ok)
        return; st(""), Nl(""), Tl(""), bn(""), s.invalidateQueries({ queryKey: ["home", e] }); } }), zt = G({ mutationFn: () => A.setAccountEmail({ token: e, currentPassword: De, email: El }), onSuccess: (u) => { if (!u.ok)
        return; vn(u.emailDelivery === "sent" ? o("confirmationSent") : o("emailServiceNeeded")), s.invalidateQueries({ queryKey: ["home", e] }); } }), ot = G({ mutationFn: () => A.resendVerificationEmail({ token: e }), onSuccess: (u) => { if (!u.ok)
        return; vn(u.emailDelivery === "sent" ? o("confirmationSent") : u.emailDelivery === "not_configured" ? o("emailServiceNeeded") : o("emailVerified")); } }), tt = G({ mutationFn: () => A.verifyEmail({ token: e, code: Ki }), onSuccess: (u) => { if (!u.ok)
        return; pa(""), vn(o("emailVerified")), s.invalidateQueries({ queryKey: ["home", e] }); } }); if (qe.isPending)
    return d("main", { className: "center-state", children: [l("div", { className: "pulse-dot" }), l("p", { children: o("tuningRooms") })] }); if (qe.error || !((_27 = qe.data) === null || _27 === void 0 ? void 0 : _27.ok) || !qe.data.user)
    return d("main", { className: "center-state", children: [l(P, { tone: "error", children: (_29 = (_28 = qe.data) === null || _28 === void 0 ? void 0 : _28.error) !== null && _29 !== void 0 ? _29 : o("couldNotLoadRooms") }), l("button", { className: "primary-button", onClick: a, children: o("startAgain") })] }); let { user: U, rooms: Ot } = qe.data, aa = qe.data.buyCreditsEnabled !== !1, Oa = !0, Tn = U.role === "superadmin" ? o("superAdmin") : r === "vi" ? U.role === "admin" ? "quản trị viên" : U.role === "moderator" ? "điều hành viên" : "thành viên" : U.role, Ua = Pi ? 12 : 10, Ji = Xi.trim().toLowerCase().replace(/^#/, ""), En = Ji ? Ot.filter((u) => u.name.toLowerCase().includes(Ji) || String(u.id) === Ji) : Ot, na = Math.max(1, Math.ceil(En.length / Ua)), Ut = Math.min(Tu, na), ci = En.slice((Ut - 1) * Ua, Ut * Ua), ia = (u) => wn(Math.max(1, Math.min(na, Ut + u))), sr = (u) => { if (Pi || na <= 1)
    return; let z = u.touches[0]; if (z)
    Ca.current = { x: z.clientX, y: z.clientY }; }, Cu = (u) => { let z = Ca.current; if (Ca.current = null, Pi || na <= 1 || !z)
    return; let _ = u.changedTouches[0]; if (!_)
    return; let ve = _.clientX - z.x, Ke = _.clientY - z.y; if (Math.abs(ve) < 48 || Math.abs(ve) <= Math.abs(Ke) * 1.2)
    return; Zi.current = !0, ia(ve < 0 ? 1 : -1), window.setTimeout(() => { Zi.current = !1; }, 350); }, Ha = (u) => { if (u.locked && U.role !== "admin" && U.role !== "superadmin")
    return; if (u.joined)
    t(u.id);
else if (u.isPrivate)
    g({ id: u.id, name: u.name });
else
    Rt.mutate({ roomId: u.id }); }, Mu = () => { var _j; let u = Xi.trim(); if (!u || Rt.isPending)
    return; let z = u.replace(/^#/, ""), _ = (_j = Ot.find((ve) => String(ve.id) === z)) !== null && _j !== void 0 ? _j : Ot.find((ve) => ve.name.trim().toLowerCase() === u.toLowerCase()); if (_)
    Ha(_); }, Qa = 10, ur = ((_31 = (_30 = et.data) === null || _30 === void 0 ? void 0 : _30.users) !== null && _31 !== void 0 ? _31 : []).filter((u) => `${u.displayName} ${u.name}`.toLowerCase().includes(li.trim().toLowerCase())), cr = ((_33 = (_32 = et.data) === null || _32 === void 0 ? void 0 : _32.rooms) !== null && _33 !== void 0 ? _33 : []).filter((u) => u.name.toLowerCase().includes(ar.trim().toLowerCase())), Da = Math.max(1, Math.ceil(ur.length / Qa)), $a = Math.max(1, Math.ceil(cr.length / Qa)), j = ur.slice((Math.min(Sn, Da) - 1) * Qa, Math.min(Sn, Da) * Qa), O = cr.slice((Math.min(qt, $a) - 1) * Qa, Math.min(qt, $a) * Qa), Ht = (_35 = (_34 = Ye.data) === null || _34 === void 0 ? void 0 : _34.supportRequests) !== null && _35 !== void 0 ? _35 : [], dr = (u) => u.status === "resolved" || u.status === "dismissed" || typeof u.assignedTo === "number" && u.assignedTo !== U.id, Cn = Ht.filter((u) => !dr(u)), Ml = Ht.filter(dr), oa = (u, z) => { var _j, _10, _11, _12; let _ = `support-${u.id}`, ve = z && u.status === "accepted" && u.assignedTo === U.id; return d(V, { children: [l("div", { className: "admin-support-messages", children: u.messages.map((Ke) => d("article", { className: Ke.fromAdmin ? "from-admin" : "from-user", children: [l("strong", { children: Ke.fromAdmin ? Ke.senderName : u.userName }), l("p", { children: Ke.body }), l("time", { children: new Intl.DateTimeFormat(r, { hour: "numeric", minute: "2-digit" }).format(new Date(Ke.createdAt)) })] }, Ke.id)) }), z && u.status === "open" && l("button", { type: "button", className: "small-button", disabled: za.isPending, onClick: () => za.mutate(u.id), children: o("accepted") }), ve && d("form", { className: "admin-support-reply", onSubmit: (Ke) => { var _j; Ke.preventDefault(); let ra = (_j = Yi[u.id]) === null || _j === void 0 ? void 0 : _j.trim(); if (ra)
                ea.mutate({ ticketId: u.id, body: ra }); }, children: [l("label", { className: "sr-only", htmlFor: `support-reply-${u.id}`, children: o("messageAdmin") }), l("textarea", { id: `support-reply-${u.id}`, value: (_j = Yi[u.id]) !== null && _j !== void 0 ? _j : "", onChange: (Ke) => Jo((ra) => (Object.assign(Object.assign({}, ra), { [u.id]: Ke.target.value }))), maxLength: 1500, rows: 2 }), l("button", { className: "small-button", disabled: ea.isPending || !((_10 = Yi[u.id]) === null || _10 === void 0 ? void 0 : _10.trim()), children: o("sendMessage") })] }), z ? d(V, { children: [d("label", { children: [l("span", { children: o("reviewNote") }), l("textarea", { value: (_12 = (_11 = oi[_]) !== null && _11 !== void 0 ? _11 : u.reviewNote) !== null && _12 !== void 0 ? _12 : "", onChange: (Ke) => Vi((ra) => (Object.assign(Object.assign({}, ra), { [_]: Ke.target.value }))), maxLength: 1000, rows: 2 })] }), d("div", { className: "inbox-actions", children: [l("button", { type: "button", disabled: $e.isPending, onClick: () => $e.mutate({ itemType: "support", itemId: u.id, status: "resolved" }), children: o("resolve") }), l("button", { type: "button", disabled: $e.isPending, onClick: () => $e.mutate({ itemType: "support", itemId: u.id, status: "dismissed" }), children: o("dismiss") })] })] }) : u.reviewNote ? d("div", { className: "archived-review-note", children: [l("strong", { children: o("reviewNote") }), l("p", { children: u.reviewNote })] }) : null] }); }, qu = U.role === "admin" || U.role === "superadmin"; return d("main", { className: `home-shell ${fe ? "admin-view" : n ? "support-view" : Mt ? "friends-view" : "hot-view"} ${!fe && !n && !Mt && !h && !T && !p ? "fit-lobby" : ""}`, children: [d("section", { className: "desktop-lobby-hero", "aria-label": o("goodToSee"), children: [d("div", { className: "desktop-lobby-identity", children: [U.singerCoverPhotoUrl ? l("img", { src: U.singerCoverPhotoUrl, alt: "" }) : l("span", { "aria-hidden": "true", children: U.displayName.slice(0, 1).toUpperCase() }), d("div", { className: "desktop-lobby-profile-copy", children: [w ? d("form", { className: "desktop-display-name-editor", onSubmit: (u) => { if (u.preventDefault(), !D.trim()) {
                                        q(U.displayName), R(!1);
                                        return;
                                    } ta.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "desktop-display-name", children: o("defaultDisplayName") }), l("input", { id: "desktop-display-name", value: D, onChange: (u) => q(u.target.value), onKeyDown: (u) => { if (u.key === "Escape")
                                                q(U.displayName), R(!1); }, minLength: 2, maxLength: 32, autoFocus: !0, disabled: ta.isPending })] }) : d("button", { type: "button", className: "desktop-display-name", title: `${o("userId")} #${U.id}`, onClick: () => { q(U.displayName), R(!0); }, children: [l("strong", { children: U.displayName }), l(Q, { name: "edit", size: 14 })] }), d("p", { children: [l("i", { "aria-hidden": "true" }), " ", o("onTheAir"), " · ", Tn] }), H ? d("form", { className: "personal-status-form", onSubmit: (u) => { u.preventDefault(), bt.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "personal-status", children: o("personalStatus") }), l("input", { id: "personal-status", value: F, onChange: (u) => ae(u.target.value), onKeyDown: (u) => { var _j; if (u.key === "Escape")
                                                ae((_j = U.personalStatus) !== null && _j !== void 0 ? _j : ""), B(!1); }, maxLength: 80, placeholder: o("personalStatus"), autoFocus: !0, disabled: bt.isPending })] }) : l("button", { type: "button", className: U.personalStatus ? "personal-status-display" : "personal-status-display empty", onClick: () => { var _j; ae((_j = U.personalStatus) !== null && _j !== void 0 ? _j : ""), B(!0); }, "aria-label": o("personalStatus"), children: U.personalStatus || o("personalStatus") }), ((_36 = bt.data) === null || _36 === void 0 ? void 0 : _36.error) && l("small", { className: "personal-status-error", children: bt.data.error })] })] }), d("div", { className: "desktop-lobby-tools", children: [d("div", { className: "desktop-lobby-actions", children: [d("button", { type: "button", className: "desktop-create-room", onClick: () => f((u) => !u), children: [l(Q, { name: "plus" }), o("openRoom")] }), l("button", { type: "button", className: h ? "desktop-round-action active" : "desktop-round-action", onClick: () => { var _j; let u = !h; if (v(u), u)
                                        ni((_j = U.email) !== null && _j !== void 0 ? _j : ""); }, "aria-label": o("passwordSecurity"), "aria-pressed": h, children: l(Q, { name: "shield" }) }), l("button", { type: "button", className: T ? "desktop-round-action active" : "desktop-round-action", onClick: () => k((u) => !u), "aria-label": o("credits"), "aria-pressed": T, children: l(Q, { name: "users" }) }), l("button", { type: "button", className: "desktop-round-action", onClick: () => yn(!0), "aria-label": o("signOut"), children: l(Q, { name: "door" }) })] }), d("label", { className: "desktop-room-search", children: [l("span", { className: "sr-only", children: o("searchRooms") }), l("input", { type: "search", inputMode: "search", value: Xi, onChange: (u) => { Nu(u.target.value), wn(1); }, onKeyDown: (u) => { if (u.key === "Enter")
                                        u.preventDefault(), Mu(); }, placeholder: r === "vi" ? "Nhập tên hoặc mã số phòng" : "Enter a room name or ID" }), l(Q, { name: "back" })] })] })] }), d("nav", { className: "desktop-lobby-tabs", "aria-label": o("rooms"), children: [l("button", { type: "button", className: !n && !fe && !Mt ? "active" : "", "aria-pressed": !n && !fe && !Mt, onClick: () => { i(!1), It(!1), We(!1); }, children: "NỔI BẬT" }), d("button", { type: "button", className: Mt && !n && !fe ? "active" : "", "aria-pressed": Mt && !n && !fe, onClick: () => { i(!1), It(!1), We(!0); }, children: [o("friends"), ((_38 = (_37 = ze.data) === null || _37 === void 0 ? void 0 : _37.incoming.length) !== null && _38 !== void 0 ? _38 : 0) > 0 && l("span", { className: "tab-count", children: (_39 = ze.data) === null || _39 === void 0 ? void 0 : _39.incoming.length })] }), l("button", { type: "button", className: n && !fe ? "active" : "", "aria-pressed": n && !fe, onClick: () => { We(!1), It(!1), i(!0); }, children: o("support") }), qu && l("button", { type: "button", className: fe ? "active" : "", "aria-pressed": fe, onClick: () => { We(!1), i(!1), It(!0); }, children: o("adminDashboard") })] }), d("header", { className: "home-top mobile-lobby-only", children: [d("div", { children: [l("p", { className: "eyebrow", children: o("onTheAir") }), d("h1", { children: [o("goodToSee"), ", ", w ? d("form", { className: "mobile-display-name-editor", onSubmit: (u) => { if (u.preventDefault(), !D.trim()) {
                                        q(U.displayName), R(!1);
                                        return;
                                    } ta.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "mobile-display-name", children: o("defaultDisplayName") }), l("input", { id: "mobile-display-name", value: D, onChange: (u) => q(u.target.value), onKeyDown: (u) => { if (u.key === "Escape")
                                                q(U.displayName), R(!1); }, minLength: 2, maxLength: 32, autoFocus: !0, disabled: ta.isPending })] }) : d("button", { type: "button", className: "mobile-display-name", title: `${o("userId")} #${U.id}`, onClick: () => { q(U.displayName), R(!0); }, children: [l("em", { children: U.displayName }), l(Q, { name: "edit", size: 12 })] })] })] }), l("div", { className: "header-actions", children: l("button", { className: "icon-button", onClick: () => yn(!0), "aria-label": o("signOut"), children: l(Q, { name: "door" }) }) })] }), d("div", { className: "role-line mobile-lobby-only", children: [d("span", { children: [o("youAre"), " ", Tn] }), l(gv, { role: U.role }), d("span", { className: "user-id", children: [o("userId"), " #", U.id] }), d("button", { type: "button", className: `mobile-friends-button ${Mt ? "active" : ""}`, onClick: () => { We((u) => !u), It(!1), i(!1); }, children: [l(Q, { name: "users", size: 15 }), o("friends"), ((_41 = (_40 = ze.data) === null || _40 === void 0 ? void 0 : _40.incoming.length) !== null && _41 !== void 0 ? _41 : 0) > 0 && l("b", { children: (_42 = ze.data) === null || _42 === void 0 ? void 0 : _42.incoming.length })] })] }), d("section", { className: `credit-strip ${T ? "is-open" : ""}`, children: [d("button", { type: "button", className: "credit-toggle", onClick: () => k((u) => !u), "aria-expanded": T, children: [d("span", { className: "credit-balance", children: [l("strong", { children: (_44 = (_43 = qe.data.credit) === null || _43 === void 0 ? void 0 : _43.balance) !== null && _44 !== void 0 ? _44 : 0 }), " ", o("credits")] }), l("small", { children: o("earnCredits") }), aa && l("b", { children: o("buyCredits") })] }), T && d("div", { className: "credit-store", "aria-label": o("credits"), children: [aa ? l("div", { className: "credit-packages", children: (_45 = te.data) === null || _45 === void 0 ? void 0 : _45.packages.map((u) => d("button", { type: "button", onClick: () => ut.mutate(u.id), disabled: ut.isPending, children: [d("strong", { children: [u.credits, " ", o("credits")] }), d("span", { children: ["$", (u.priceCents / 100).toFixed(2)] }), l("small", { children: o("buyWithPayPal") })] }, u.id)) }) : l("p", { className: "credit-unavailable", children: o("buyCreditsUnavailable") }), ((_46 = ut.data) === null || _46 === void 0 ? void 0 : _46.error) && l(P, { tone: "error", children: ut.data.error }), d("section", { className: "credit-ledger", "aria-label": o("creditHistory"), children: [l("h3", { children: o("creditHistory") }), !te.isPending && ((_48 = (_47 = te.data) === null || _47 === void 0 ? void 0 : _47.transactions.length) !== null && _48 !== void 0 ? _48 : 0) === 0 ? l("p", { children: o("noCreditActivity") }) : l("div", { children: (_49 = te.data) === null || _49 === void 0 ? void 0 : _49.transactions.map((u) => { let z = u.kind === "online_earned" ? o("onlineEarned") : u.kind === "purchase" ? o("creditPurchase") : u.kind === "gift_sent" ? o("giftSent") : u.kind === "gift_received" ? o("giftReceived") : o("adminGrant"); return d("article", { children: [d("div", { children: [l("strong", { children: z }), d("small", { children: [u.relatedName ? ` · ${u.relatedName}` : "", u.roomName ? ` · ${u.roomName}` : ""] })] }), d("div", { className: u.amount >= 0 ? "positive" : "negative", children: [d("b", { children: [u.amount > 0 ? "+" : "", u.amount] }), l("small", { children: Bi(u.createdAt, r) })] })] }, u.id); }) })] })] })] }), d("section", { className: `security-strip ${h ? "is-open" : ""}`, children: [d("button", { type: "button", className: "security-toggle", onClick: () => { var _j; let u = !h; if (v(u), u)
                        ni((_j = U.email) !== null && _j !== void 0 ? _j : ""); bn(""), vn(""), vt.reset(), zt.reset(), ot.reset(), tt.reset(); }, "aria-expanded": h, children: [l("span", { children: l(Q, { name: "shield" }) }), d("div", { children: [l("strong", { children: o("passwordSecurity") }), l("small", { children: U.hasPassword ? o("changeSignInPassword") : o("setPasswordAnotherDevice") })] })] }), h && d("div", { className: "security-form", children: [d("section", { className: "singer-cover-setting", "aria-label": o("singerCoverPhoto"), children: [U.singerCoverPhotoUrl ? l("img", { src: U.singerCoverPhotoUrl, alt: "" }) : l("div", { className: "photo-placeholder", "aria-hidden": "true", children: U.displayName.slice(0, 1).toUpperCase() }), d("div", { children: [l("strong", { children: o("singerCoverPhoto") }), l("small", { children: o("singerCoverHint") }), d("div", { className: "photo-actions", children: [d("label", { className: "small-button", children: [At.isPending ? o("saving") : o("changePhoto"), l("input", { type: "file", accept: "image/jpeg,image/png,image/webp", disabled: At.isPending, onChange: (u) => { var _j; let z = u.currentTarget, _ = (_j = z.files) === null || _j === void 0 ? void 0 : _j[0]; if (_)
                                                                At.mutate(_); z.value = ""; } })] }), U.singerCoverPhotoUrl && l("button", { type: "button", className: "cancel-button", disabled: At.isPending, onClick: () => At.mutate(null), children: o("removePhoto") })] }), ((_50 = At.data) === null || _50 === void 0 ? void 0 : _50.error) && l(P, { tone: "error", children: At.data.error })] })] }), d("section", { className: "email-security", "aria-label": o("emailStatus"), children: [d("div", { className: "email-status", children: [l("strong", { children: o("emailStatus") }), l("span", { children: (_51 = U.email) !== null && _51 !== void 0 ? _51 : o("noEmail") }), U.email && l("small", { className: U.emailVerified ? "verified" : "pending", children: U.emailVerified ? o("verified") : o("notVerified") })] }), d("form", { onSubmit: (u) => { u.preventDefault(), vn(""), zt.mutate(); }, children: [l("label", { htmlFor: "security-email", children: o("addOrChangeEmail") }), l("input", { id: "security-email", type: "email", value: El, onChange: (u) => ni(u.target.value), maxLength: 254, autoComplete: "email", placeholder: o("yourEmail"), required: !0 }), U.hasPassword && d(V, { children: [l("label", { htmlFor: "email-current-password", children: o("currentPassword") }), l("input", { id: "email-current-password", type: "password", value: De, onChange: (u) => st(u.target.value), maxLength: 72, autoComplete: "current-password", required: !0 })] }), l("button", { className: "small-button security-inline-button", disabled: zt.isPending, children: zt.isPending ? o("saving") : o("save") })] }), U.email && !U.emailVerified && d("div", { className: "verification-tools", children: [l("button", { type: "button", className: "text-button", onClick: () => ot.mutate(), disabled: ot.isPending, children: o("sendConfirmation") }), d("form", { onSubmit: (u) => { u.preventDefault(), tt.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "confirmation-code", children: o("confirmationCode") }), l("input", { id: "confirmation-code", value: Ki, onChange: (u) => pa(u.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", autoComplete: "one-time-code", pattern: "[0-9]{6}", placeholder: o("confirmationCode"), required: !0 }), l("button", { className: "small-button", disabled: tt.isPending || Ki.length !== 6, children: o("verifyEmail") })] })] }), (((_52 = zt.data) === null || _52 === void 0 ? void 0 : _52.error) || ((_53 = ot.data) === null || _53 === void 0 ? void 0 : _53.error) || ((_54 = tt.data) === null || _54 === void 0 ? void 0 : _54.error)) && l(P, { tone: "error", children: ((_55 = zt.data) === null || _55 === void 0 ? void 0 : _55.error) || ((_56 = ot.data) === null || _56 === void 0 ? void 0 : _56.error) || ((_57 = tt.data) === null || _57 === void 0 ? void 0 : _57.error) }), Fi && l(P, { children: Fi })] }), d("form", { className: "password-form", onSubmit: (u) => { if (u.preventDefault(), bn(""), gn !== Zo) {
                                bn(o("newPasswordsMismatch"));
                                return;
                            } vt.mutate(); }, children: [U.hasPassword && d(V, { children: [l("label", { htmlFor: "current-password", children: o("currentPassword") }), l("input", { id: "current-password", type: "password", value: De, onChange: (u) => st(u.target.value), maxLength: 72, autoComplete: "current-password", required: !0 })] }), l("label", { htmlFor: "new-password", children: o("newPassword") }), l("input", { id: "new-password", type: "password", value: gn, onChange: (u) => Nl(u.target.value), minLength: 6, maxLength: 72, autoComplete: "new-password", placeholder: o("atLeastSix"), required: !0 }), l("label", { htmlFor: "confirm-new-password", children: o("confirmNewPassword") }), l("input", { id: "confirm-new-password", type: "password", value: Zo, onChange: (u) => Tl(u.target.value), minLength: 6, maxLength: 72, autoComplete: "new-password", required: !0 }), d("div", { className: "security-actions", children: [l("button", { className: "primary-button", disabled: vt.isPending || gn.length < 6, children: vt.isPending ? o("saving") : U.hasPassword ? o("changePassword") : o("setPassword") }), l("button", { type: "button", className: "cancel-button", onClick: () => v(!1), children: o("cancel") })] }), (Ea || ((_58 = vt.data) === null || _58 === void 0 ? void 0 : _58.error)) && l(P, { tone: "error", children: Ea || ((_59 = vt.data) === null || _59 === void 0 ? void 0 : _59.error) })] })] })] }), Oa && l("section", { className: "create-strip", children: !p ? d("button", { className: "create-room-button", onClick: () => f(!0), children: [l("span", { children: l(Q, { name: "plus" }) }), d("div", { children: [l("strong", { children: o("openRoom") }), l("small", { children: o("openRoomHint") })] })] }) : d("form", { onSubmit: (u) => { u.preventDefault(), ui.mutate(); }, className: "create-form", children: [l("label", { htmlFor: "room-name", children: o("roomName") }), d("div", { className: "name-row", children: [l("input", { id: "room-name", value: b, onChange: (u) => x(u.target.value), placeholder: o("roomPlaceholder"), minLength: 2, maxLength: 42, autoFocus: !0, required: !0 }), l("button", { className: "primary-button", disabled: ui.isPending, children: o("open") })] }), l("button", { type: "button", className: "cancel-button", onClick: () => f(!1), children: o("cancel") }), ((_60 = ui.data) === null || _60 === void 0 ? void 0 : _60.error) && l(P, { tone: "error", children: ui.data.error })] }) }), !fe && !n && !Mt && d("section", { className: "rooms-section", children: [d("div", { className: "section-heading", children: [l("h2", { children: o("rooms") }), l("span", { children: En.length })] }), En.length === 0 ? d("div", { className: "empty-room", children: [d("div", { className: "empty-wave", "aria-hidden": "true", children: [l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {})] }), l("h3", { children: Ot.length === 0 ? o("quiet") : o("noAdminData") }), l("p", { children: Ot.length === 0 ? Oa ? o("quietCreator") : o("quietMember") : o("searchRooms") })] }) : d(V, { children: [l("div", { className: "room-list", onTouchStart: sr, onTouchEnd: Cu, onTouchCancel: () => { Ca.current = null; }, children: ci.map((u, z) => d("article", { className: "room-row", children: [l("div", { className: "desktop-room-cover", "aria-hidden": "true", children: u.profileImageUrl ? l("img", { src: u.profileImageUrl, alt: "" }) : l("span", { children: u.name.slice(0, 1).toUpperCase() }) }), u.profileImageUrl && l("img", { className: "room-profile-image", src: u.profileImageUrl, alt: "" }), l("div", { className: "room-number", children: vv((Ut - 1) * Ua + z + 1) }), d("button", { className: "room-main", disabled: u.locked && U.role !== "admin" && U.role !== "superadmin", onClick: () => { if (Zi.current)
                                            return; Ha(u); }, children: [d("span", { className: "room-name-line", children: [l("strong", { children: u.name }), u.isOwner && l(gv, { role: "owner" }), u.isPrivate && l("span", { className: "private-room-badge", children: o("privateRoom") }), u.locked && l("span", { className: "locked-room-badge", children: o("lockedRoom") })] }), d("span", { className: "mobile-room-summary", children: [o("roomLevel"), " ", u.level, " · ", u.activeCount > 0 ? `${u.activeCount} ${o("hereNow")}` : u.participantCount > 0 ? `${u.participantCount} ${o("joined")}` : o("waitingVoices")] }), d("span", { className: "desktop-room-meta", children: [l("strong", { children: u.name }), d("small", { children: ["ID: ", u.id] }), d("small", { children: ["Online: ", u.activeCount] })] })] }), U.role !== "admin" && U.role !== "superadmin" && l("button", { type: "button", className: "room-report", "aria-label": `${o("reportRoom")}: ${u.name}`, onClick: () => Io({ type: "room", id: u.id, name: u.name }), children: o("report") }), u.canDelete ? l("button", { type: "button", className: "room-delete", "aria-label": `${o("deleteRoom")} ${u.name}`, onClick: () => Po({ id: u.id, name: u.name }), children: l(Q, { name: "trash", size: 19 }) }) : l("span", { className: `live-pin ${u.activeCount > 0 ? "active" : ""}`, "aria-label": u.activeCount > 0 ? o("activeNow") : o("inactive") })] }, u.id)) }), na > 1 && d("nav", { className: "lobby-pagination", "aria-label": `${o("page")} ${Ut} / ${na}`, children: [l("button", { type: "button", className: "lobby-page-arrow previous", "aria-label": o("previous"), disabled: Ut <= 1, onClick: () => ia(-1), children: l(Q, { name: "back", size: 21 }) }), l("div", { className: "lobby-pagination-dots", children: Array.from({ length: na }, (u, z) => { let _ = z + 1; return l("button", { type: "button", className: _ === Ut ? "active" : "", "aria-label": `${o("page")} ${_}`, "aria-current": _ === Ut ? "page" : void 0, onClick: () => wn(_), children: d("span", { className: "sr-only", children: [o("page"), " ", _] }) }, _); }) }), l("button", { type: "button", className: "lobby-page-arrow next", "aria-label": o("next"), disabled: Ut >= na, onClick: () => ia(1), children: l(Q, { name: "back", size: 21 }) })] })] }), (((_61 = Rt.data) === null || _61 === void 0 ? void 0 : _61.error) || ((_62 = Ma.data) === null || _62 === void 0 ? void 0 : _62.error)) && l(P, { tone: "error", children: ((_63 = Rt.data) === null || _63 === void 0 ? void 0 : _63.error) || ((_64 = Ma.data) === null || _64 === void 0 ? void 0 : _64.error) })] }), Mt && !n && !fe && d("section", { className: "friends-panel", "aria-label": o("friends"), children: [d("div", { className: "section-heading", children: [l("h2", { children: o("friends") }), l("span", { children: (_66 = (_65 = ze.data) === null || _65 === void 0 ? void 0 : _65.friends.length) !== null && _66 !== void 0 ? _66 : 0 })] }), ze.isPending ? d("div", { className: "admin-loading", children: [l("div", { className: "pulse-dot" }), l("span", { children: o("pleaseWait") })] }) : d(V, { children: [d("div", { className: "friend-request-section", children: [l("h3", { children: o("friendRequests") }), ((_68 = (_67 = ze.data) === null || _67 === void 0 ? void 0 : _67.incoming.length) !== null && _68 !== void 0 ? _68 : 0) === 0 ? l("p", { children: o("noFriendRequests") }) : (_69 = ze.data) === null || _69 === void 0 ? void 0 : _69.incoming.map((u) => d("article", { className: "friend-row", children: [l("div", { className: "avatar", children: u.name.slice(0, 1).toUpperCase() }), l("strong", { children: u.name }), d("div", { children: [l("button", { type: "button", className: "small-button", disabled: Jt.isPending, onClick: () => Jt.mutate({ requestId: u.requestId, response: "accept" }), children: o("accept") }), l("button", { type: "button", className: "cancel-button", disabled: Jt.isPending, onClick: () => Jt.mutate({ requestId: u.requestId, response: "decline" }), children: o("decline") })] })] }, u.requestId))] }), d("div", { className: "friend-list-section", children: [l("h3", { children: o("friends") }), ((_71 = (_70 = ze.data) === null || _70 === void 0 ? void 0 : _70.friends.length) !== null && _71 !== void 0 ? _71 : 0) === 0 ? l("p", { children: o("noFriends") }) : (_72 = ze.data) === null || _72 === void 0 ? void 0 : _72.friends.map((u) => d("article", { className: "friend-row", children: [l("div", { className: "avatar", children: u.name.slice(0, 1).toUpperCase() }), l("strong", { children: u.name })] }, u.userId)), ((_74 = (_73 = ze.data) === null || _73 === void 0 ? void 0 : _73.outgoing.length) !== null && _74 !== void 0 ? _74 : 0) > 0 && d("div", { className: "outgoing-friends", children: [l("h3", { children: o("requestSent") }), (_75 = ze.data) === null || _75 === void 0 ? void 0 : _75.outgoing.map((u) => l("p", { children: u.name }, u.requestId))] })] })] }), (((_76 = ze.data) === null || _76 === void 0 ? void 0 : _76.error) || ((_77 = Jt.data) === null || _77 === void 0 ? void 0 : _77.error)) && l(P, { tone: "error", children: ((_78 = ze.data) === null || _78 === void 0 ? void 0 : _78.error) || ((_79 = Jt.data) === null || _79 === void 0 ? void 0 : _79.error) })] }), n && !fe && l("section", { className: "support-tab-content", "aria-label": o("support"), children: l(wv, { token: e, embedded: !0 }) }), qu && d("section", { className: `admin-dashboard ${fe ? "is-open" : ""}`, children: [d("button", { type: "button", className: "admin-dashboard-toggle mobile-lobby-only", onClick: () => It((u) => !u), "aria-expanded": fe, children: [l("span", { children: l(Q, { name: "shield" }) }), d("div", { children: [l("strong", { children: o("adminDashboard") }), d("small", { children: [o("adminUsers"), " · ", o("adminRooms"), " · ", o("masterLogs")] })] })] }), fe && d("div", { className: "admin-dashboard-body", children: [d("div", { className: "admin-tabs", role: "tablist", "aria-label": o("adminDashboard"), children: [d("button", { type: "button", role: "tab", "aria-selected": se === "users", className: se === "users" ? "active" : "", onClick: () => ma("users"), children: [o("adminUsers"), " ", l("span", { children: (_81 = (_80 = et.data) === null || _80 === void 0 ? void 0 : _80.users.length) !== null && _81 !== void 0 ? _81 : 0 })] }), d("button", { type: "button", role: "tab", "aria-selected": se === "rooms", className: se === "rooms" ? "active" : "", onClick: () => ma("rooms"), children: [o("adminRooms"), " ", l("span", { children: (_83 = (_82 = et.data) === null || _82 === void 0 ? void 0 : _82.rooms.length) !== null && _83 !== void 0 ? _83 : 0 })] }), d("button", { type: "button", role: "tab", "aria-selected": se === "reports", className: se === "reports" ? "active" : "", onClick: () => ma("reports"), children: [o("reports"), " ", l("span", { children: (_85 = (_84 = Ye.data) === null || _84 === void 0 ? void 0 : _84.reports.filter((u) => u.status === "open").length) !== null && _85 !== void 0 ? _85 : 0 })] }), d("button", { type: "button", role: "tab", "aria-selected": se === "support", className: se === "support" ? "active" : "", onClick: () => ma("support"), children: [o("support"), " ", l("span", { children: (_87 = (_86 = Ye.data) === null || _86 === void 0 ? void 0 : _86.supportRequests.filter((u) => u.status === "open").length) !== null && _87 !== void 0 ? _87 : 0 })] }), l("button", { type: "button", role: "tab", "aria-selected": se === "credits", className: se === "credits" ? "active" : "", onClick: () => ma("credits"), children: o("credits") }), l("button", { type: "button", role: "tab", "aria-selected": se === "logs", className: se === "logs" ? "active" : "", onClick: () => ma("logs"), children: o("masterLogs") })] }), et.isPending && d("div", { className: "admin-loading", children: [l("div", { className: "pulse-dot" }), l("span", { children: o("pleaseWait") })] }), (((_88 = et.data) === null || _88 === void 0 ? void 0 : _88.error) || ((_89 = Ye.data) === null || _89 === void 0 ? void 0 : _89.error) || ((_90 = kn.data) === null || _90 === void 0 ? void 0 : _90.error) || ((_91 = $e.data) === null || _91 === void 0 ? void 0 : _91.error) || ((_92 = za.data) === null || _92 === void 0 ? void 0 : _92.error) || ((_93 = ea.data) === null || _93 === void 0 ? void 0 : _93.error) || ((_94 = L.data) === null || _94 === void 0 ? void 0 : _94.error) || ((_95 = Wt.data) === null || _95 === void 0 ? void 0 : _95.error) || ((_96 = Nn.data) === null || _96 === void 0 ? void 0 : _96.error) || ((_97 = qa.data) === null || _97 === void 0 ? void 0 : _97.error) || ((_98 = Le.data) === null || _98 === void 0 ? void 0 : _98.error) || ((_99 = Aa.data) === null || _99 === void 0 ? void 0 : _99.error)) && l(P, { tone: "error", children: ((_100 = et.data) === null || _100 === void 0 ? void 0 : _100.error) || ((_101 = Ye.data) === null || _101 === void 0 ? void 0 : _101.error) || ((_102 = kn.data) === null || _102 === void 0 ? void 0 : _102.error) || ((_103 = $e.data) === null || _103 === void 0 ? void 0 : _103.error) || ((_104 = za.data) === null || _104 === void 0 ? void 0 : _104.error) || ((_105 = ea.data) === null || _105 === void 0 ? void 0 : _105.error) || ((_106 = L.data) === null || _106 === void 0 ? void 0 : _106.error) || ((_107 = Wt.data) === null || _107 === void 0 ? void 0 : _107.error) || ((_108 = Nn.data) === null || _108 === void 0 ? void 0 : _108.error) || ((_109 = qa.data) === null || _109 === void 0 ? void 0 : _109.error) || ((_110 = Le.data) === null || _110 === void 0 ? void 0 : _110.error) || ((_111 = Aa.data) === null || _111 === void 0 ? void 0 : _111.error) }), ((_112 = et.data) === null || _112 === void 0 ? void 0 : _112.ok) && se === "users" && d("div", { className: "admin-records", children: [d("label", { className: "admin-search", children: [l("span", { className: "sr-only", children: o("searchUsers") }), l("input", { type: "search", value: li, onChange: (u) => { tr(u.target.value), or(1); }, placeholder: o("searchUsers") })] }), ur.length === 0 ? l("p", { className: "admin-empty", children: o("noAdminData") }) : j.map((u) => { var _j, _10, _11; return d("article", { className: `admin-record ${u.deletedAt ? "deleted" : ""}`, title: `${o("userId")} #${u.id}`, children: [d("div", { className: "admin-record-heading", children: [l("div", { className: "avatar", children: u.displayName.slice(0, 1).toUpperCase() }), d("div", { children: [l("strong", { children: u.displayName }), d("small", { children: ["@", u.name, " · ", o("userId"), " #", u.id, " · ", u.role] })] }), d("div", { className: "admin-statuses", children: [u.deletedAt && l("span", { className: "danger-status", children: o("deleted") }), u.accountLocked && l("span", { children: o("accountLocked") }), u.ipBlocked && l("span", { className: "danger-status", children: o("networkBlocked") })] })] }), d("dl", { className: "admin-details", children: [d("div", { children: [l("dt", { children: o("email") }), l("dd", { children: (_j = u.email) !== null && _j !== void 0 ? _j : "—" })] }), d("div", { children: [l("dt", { children: o("ipAddress") }), l("dd", { className: "ip-value", children: (_10 = u.lastIpAddress) !== null && _10 !== void 0 ? _10 : o("ipUnknown") })] }), d("div", { children: [l("dt", { children: o("lastSeen") }), l("dd", { children: u.ipLastSeenAt ? Bi(u.ipLastSeenAt, r) : "—" })] })] }), U.role === "superadmin" && u.id !== U.id && !u.deletedAt && d("form", { className: "admin-credit-grant", onSubmit: (z) => { var _j; z.preventDefault(); let _ = Number((_j = ue[u.id]) !== null && _j !== void 0 ? _j : ""); if (Number.isInteger(_) && _ > 0)
                                                Wt.mutate({ targetUserId: u.id, amount: _ }); }, children: [l("label", { htmlFor: `credit-grant-${u.id}`, children: o("giveCredits") }), l("input", { id: `credit-grant-${u.id}`, type: "number", min: "1", max: "1000000", inputMode: "numeric", value: (_11 = ue[u.id]) !== null && _11 !== void 0 ? _11 : "", onChange: (z) => it((_) => (Object.assign(Object.assign({}, _), { [u.id]: z.target.value }))), placeholder: o("creditAmount"), required: !0 }), l("button", { type: "submit", className: "small-button", disabled: Wt.isPending, children: o("giveCredits") })] }), u.role !== "superadmin" && (u.role !== "admin" || U.role === "superadmin") && l("div", { className: "admin-actions", children: u.deletedAt ? l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "user", userId: u.id, action: "restore", label: `${o("restoreUser")}: ${u.displayName}` }), children: o("restoreUser") }) : u.role === "admin" ? d(V, { children: [l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "user", userId: u.id, action: "demote_admin", label: `${o("demoteAdmin")}: ${u.displayName}` }), children: o("demoteAdmin") }), l("button", { type: "button", className: "small-button danger", onClick: () => Me({ kind: "user", userId: u.id, action: "delete", label: `${o("deleteUser")}: ${u.displayName}` }), children: o("deleteUser") })] }) : d(V, { children: [l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "user", userId: u.id, action: u.accountLocked ? "unlock" : "lock", label: `${u.accountLocked ? o("unlockAccount") : o("lockAccount")}: ${u.displayName}` }), children: u.accountLocked ? o("unlockAccount") : o("lockAccount") }), l("button", { type: "button", className: "small-button", disabled: !u.lastIpAddress, onClick: () => { var _j; return Me({ kind: "user", userId: u.id, action: u.ipBlocked ? "unblock_ip" : "block_ip", label: `${u.ipBlocked ? o("unblockIp") : o("blockIp")}: ${(_j = u.lastIpAddress) !== null && _j !== void 0 ? _j : u.displayName}` }); }, children: u.ipBlocked ? o("unblockIp") : o("blockIp") }), U.role === "superadmin" && l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "user", userId: u.id, action: "promote_admin", label: `${o("promoteAdmin")}: ${u.displayName}` }), children: o("promoteAdmin") }), l("button", { type: "button", className: "small-button danger", onClick: () => Me({ kind: "user", userId: u.id, action: "delete", label: `${o("deleteUser")}: ${u.displayName}` }), children: o("deleteUser") })] }) })] }, u.id); }), Da > 1 && d("div", { className: "admin-pagination", children: [l("button", { type: "button", disabled: Sn <= 1, onClick: () => or((u) => Math.max(1, u - 1)), children: o("previous") }), d("span", { children: [o("page"), " ", Math.min(Sn, Da), " / ", Da] }), l("button", { type: "button", disabled: Sn >= Da, onClick: () => or((u) => Math.min(Da, u + 1)), children: o("next") })] })] }), ((_113 = et.data) === null || _113 === void 0 ? void 0 : _113.ok) && se === "rooms" && d("div", { className: "admin-records", children: [d("label", { className: "admin-search", children: [l("span", { className: "sr-only", children: o("searchRooms") }), l("input", { type: "search", value: ar, onChange: (u) => { nr(u.target.value), si(1); }, placeholder: o("searchRooms") })] }), cr.length === 0 ? l("p", { className: "admin-empty", children: o("noAdminData") }) : O.map((u) => { var _j, _10; return d("article", { className: `admin-record ${u.deletedAt ? "deleted" : ""}`, children: [d("div", { className: "admin-record-heading", children: [d("div", { className: "room-admin-number", children: ["#", u.id] }), d("div", { children: [l("strong", { children: u.name }), d("small", { children: [o("roomOwner"), ": ", u.ownerName, " · ", o("roomLevel"), " ", u.level, " · ", u.participantCount, " ", o("joined")] })] }), d("div", { className: "admin-statuses", children: [u.deletedAt && l("span", { className: "danger-status", children: o("deleted") }), u.locked && l("span", { className: "danger-status", children: o("lockedRoom") })] })] }), u.locked && u.lockReason && l("p", { className: "room-lock-note", children: u.lockReason }), u.deletedAt ? l("div", { className: "admin-actions", children: l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "room", roomId: u.id, action: "restore", label: `${o("restoreRoom")}: ${u.name}` }), children: o("restoreRoom") }) }) : d(V, { children: [!u.locked && d("label", { className: "admin-reason", children: [l("span", { children: o("lockReason") }), l("input", { value: (_j = rr[u.id]) !== null && _j !== void 0 ? _j : "", onChange: (z) => Eu((_) => (Object.assign(Object.assign({}, _), { [u.id]: z.target.value }))), maxLength: 240, placeholder: o("communityReview") })] }), d("div", { className: "admin-actions", children: [l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "room", roomId: u.id, action: u.level < 2 ? "upgrade" : "downgrade", label: `${u.level < 2 ? o("upgradeLevelTwo") : o("downgradeLevelOne")}: ${u.name}` }), children: u.level < 2 ? o("upgradeLevelTwo") : o("downgradeLevelOne") }), l("button", { type: "button", className: "small-button", onClick: () => Me({ kind: "room", roomId: u.id, action: u.locked ? "unlock" : "lock", reason: rr[u.id], label: `${u.locked ? o("unlockRoom") : o("lockRoom")}: ${u.name}` }), children: u.locked ? o("unlockRoom") : o("lockRoom") }), l("button", { type: "button", className: "small-button danger", onClick: () => Me({ kind: "room", roomId: u.id, action: "delete", label: `${o("deleteRoom")}: ${u.name}` }), children: o("deleteRoom") })] }), d("form", { className: "owner-transfer-form", onSubmit: (z) => { var _j, _10; z.preventDefault(); let _ = Number((_j = Ii[u.id]) !== null && _j !== void 0 ? _j : ""), ve = (_10 = et.data) === null || _10 === void 0 ? void 0 : _10.users.find((Ke) => Ke.id === _); if (ve)
                                                        Me({ kind: "owner", roomId: u.id, targetUserId: _, label: `${o("transferOwnership")}: ${u.name} → ${ve.displayName}` }); }, children: [l("label", { htmlFor: `room-owner-${u.id}`, children: o("newRoomOwner") }), d("select", { id: `room-owner-${u.id}`, value: (_10 = Ii[u.id]) !== null && _10 !== void 0 ? _10 : "", onChange: (z) => lr((_) => (Object.assign(Object.assign({}, _), { [u.id]: z.target.value }))), required: !0, children: [l("option", { value: "", children: o("chooseNewOwner") }), et.data.users.filter((z) => !z.deletedAt && z.id !== u.ownerId).map((z) => d("option", { value: z.id, children: [z.displayName, " (@", z.name, ")"] }, z.id))] }), l("button", { className: "small-button", disabled: Le.isPending, children: o("transferOwnership") })] })] })] }, u.id); }), $a > 1 && d("div", { className: "admin-pagination", children: [l("button", { type: "button", disabled: qt <= 1, onClick: () => si((u) => Math.max(1, u - 1)), children: o("previous") }), d("span", { children: [o("page"), " ", Math.min(qt, $a), " / ", $a] }), l("button", { type: "button", disabled: qt >= $a, onClick: () => si((u) => Math.min($a, u + 1)), children: o("next") })] })] }), se === "reports" && l("section", { className: "admin-inbox-panel", children: d("div", { className: "inbox-column", children: [d("div", { className: "master-log-heading", children: [l("h3", { children: o("reports") }), l("p", { children: (_115 = (_114 = Ye.data) === null || _114 === void 0 ? void 0 : _114.reports.length) !== null && _115 !== void 0 ? _115 : 0 })] }), Ye.isPending ? d("div", { className: "admin-loading", children: [l("div", { className: "pulse-dot" }), l("span", { children: o("pleaseWait") })] }) : ((_117 = (_116 = Ye.data) === null || _116 === void 0 ? void 0 : _116.reports.length) !== null && _117 !== void 0 ? _117 : 0) === 0 ? l("p", { className: "admin-empty", children: o("noReports") }) : l("div", { className: "inbox-list", children: (_118 = Ye.data) === null || _118 === void 0 ? void 0 : _118.reports.map((u) => { var _j, _10; let z = `report-${u.id}`; return d("article", { className: "inbox-item", children: [d("div", { className: "inbox-heading", children: [d("strong", { children: [u.targetType === "user" ? o("reportUser") : o("reportRoom"), ": ", u.targetName] }), l("span", { className: `case-status ${u.status}`, children: u.status === "open" ? o("openCases") : o(u.status) })] }), d("small", { children: [u.reporterName, " · ", o("userId"), " #", u.reporterId, " · ", Bi(u.createdAt, r)] }), l("b", { children: o(u.category) }), l("p", { children: u.details }), u.attachments.length > 0 && d("div", { className: "report-attachments", children: [l("strong", { children: o("attachments") }), u.attachments.map((_) => d("a", { href: _.url, target: "_blank", rel: "noreferrer", download: _.fileName, "aria-label": `${o("openAttachment")}: ${_.fileName}`, children: [l("span", { children: _.fileName }), l("small", { children: bv(_.sizeBytes) })] }, _.id))] }), d("label", { children: [l("span", { children: o("reviewNote") }), l("textarea", { value: (_10 = (_j = oi[z]) !== null && _j !== void 0 ? _j : u.reviewNote) !== null && _10 !== void 0 ? _10 : "", onChange: (_) => Vi((ve) => (Object.assign(Object.assign({}, ve), { [z]: _.target.value }))), maxLength: 1000, rows: 2 })] }), d("div", { className: "inbox-actions", children: [l("button", { type: "button", disabled: $e.isPending, onClick: () => $e.mutate({ itemType: "report", itemId: u.id, status: "reviewing" }), children: o("markReviewing") }), l("button", { type: "button", disabled: $e.isPending, onClick: () => $e.mutate({ itemType: "report", itemId: u.id, status: "resolved" }), children: o("resolve") }), l("button", { type: "button", disabled: $e.isPending, onClick: () => $e.mutate({ itemType: "report", itemId: u.id, status: "dismissed" }), children: o("dismiss") })] })] }, z); }) })] }) }), se === "support" && l("section", { className: "admin-inbox-panel", children: d("div", { className: "inbox-column", children: [d("div", { className: "master-log-heading", children: [l("h3", { children: o("supportRequests") }), l("p", { children: Ht.length })] }), Ye.isPending ? d("div", { className: "admin-loading", children: [l("div", { className: "pulse-dot" }), l("span", { children: o("pleaseWait") })] }) : Ht.length === 0 ? l("p", { className: "admin-empty", children: o("noSupport") }) : d(V, { children: [d("section", { className: "support-queue-section", "aria-labelledby": "active-support-heading", children: [d("div", { className: "support-subheading", children: [l("h4", { id: "active-support-heading", children: o("activeSupportQueue") }), l("span", { children: Cn.length })] }), Cn.length === 0 ? l("p", { className: "admin-empty", children: o("noActiveSupport") }) : l("div", { className: "inbox-list", children: Cn.map((u) => d("article", { className: "inbox-item support-ticket", children: [d("div", { className: "inbox-heading", children: [d("strong", { children: [o("ticketNumber"), " #", u.id, " · ", u.userName] }), l("span", { className: `case-status ${u.status}`, children: u.status === "open" ? o("openCases") : o(u.status) })] }), d("small", { children: [o("userId"), " #", u.userId, " · ", Bi(u.createdAt, r), u.adminName ? ` · ${o("acceptedByAdmin")} ${u.adminName}` : ""] }), oa(u, !0)] }, `support-${u.id}`)) })] }), d("details", { className: "support-history", children: [d("summary", { children: [l("strong", { children: o("supportHistory") }), l("span", { children: Ml.length })] }), Ml.length === 0 ? l("p", { className: "admin-empty", children: o("noSupport") }) : l("div", { className: "inbox-list history-list", children: Ml.map((u) => d("details", { className: "inbox-item support-ticket archived-support-ticket", children: [d("summary", { children: [d("div", { className: "inbox-heading", children: [d("strong", { children: [o("ticketNumber"), " #", u.id, " · ", u.userName] }), l("span", { className: `case-status ${u.status}`, children: u.status === "open" ? o("openCases") : o(u.status) })] }), d("small", { className: "ticket-summary-meta", children: [o("userId"), " #", u.userId, " · ", Bi(u.createdAt, r), u.adminName ? ` · ${o("acceptedByAdmin")} ${u.adminName}` : ""] })] }), l("div", { className: "support-ticket-body", children: oa(u, !1) })] }, `support-history-${u.id}`)) })] })] })] }) }), se === "logs" && d("section", { className: "master-log-panel", children: [d("div", { className: "master-log-heading", children: [l("h3", { children: o("masterLogs") }), l("p", { children: o("logsRetained") })] }), kn.isPending ? d("div", { className: "admin-loading", children: [l("div", { className: "pulse-dot" }), l("span", { children: o("pleaseWait") })] }) : ((_120 = (_119 = kn.data) === null || _119 === void 0 ? void 0 : _119.logs.length) !== null && _120 !== void 0 ? _120 : 0) === 0 ? l("p", { className: "admin-empty", children: o("noAdminData") }) : l("div", { className: "master-log-list", children: (_121 = kn.data) === null || _121 === void 0 ? void 0 : _121.logs.map((u) => d("article", { className: "master-log-entry", children: [d("div", { className: "master-log-meta", children: [l("strong", { children: u.actorName }), l("span", { children: u.userId ? `${o("userId")} #${u.userId}` : "—" }), l("time", { dateTime: u.createdAt, children: Bi(u.createdAt, r) })] }), l("p", { children: u.details }), d("small", { children: [u.roomName ? `${u.roomName} · ` : "", u.action] })] }, u.id)) })] }), se === "credits" && d("div", { className: "admin-credit-panel", children: [d("section", { className: "buy-credit-setting", "aria-label": o("buyCreditsAvailable"), children: [d("div", { children: [l("strong", { children: o("buyCreditsAvailable") }), l("small", { children: o("buyCreditsControlHint") })] }), d("button", { type: "button", role: "switch", "aria-checked": (_123 = (_122 = be.data) === null || _122 === void 0 ? void 0 : _122.buyCreditsEnabled) !== null && _123 !== void 0 ? _123 : !1, className: ((_124 = be.data) === null || _124 === void 0 ? void 0 : _124.buyCreditsEnabled) ? "on" : "", disabled: !((_125 = be.data) === null || _125 === void 0 ? void 0 : _125.ok) || Aa.isPending, onClick: () => { var _j, _10; return Aa.mutate(!((_10 = (_j = be.data) === null || _j === void 0 ? void 0 : _j.buyCreditsEnabled) !== null && _10 !== void 0 ? _10 : !1)); }, children: [l("span", { "aria-hidden": "true" }), l("b", { children: ((_126 = be.data) === null || _126 === void 0 ? void 0 : _126.buyCreditsEnabled) ? o("buyCreditsOn") : o("buyCreditsOff") })] })] }), d("form", { className: "package-form", onSubmit: (u) => { u.preventDefault(), Ra.mutate(); }, children: [l("h3", { children: o("addPackage") }), l("label", { htmlFor: "package-credits", children: o("packageCredits") }), l("input", { id: "package-credits", type: "number", min: "1", max: "1000000", inputMode: "numeric", value: xn, onChange: (u) => ri(u.target.value), required: !0 }), l("label", { htmlFor: "package-price", children: o("packagePrice") }), l("input", { id: "package-price", type: "number", min: "0.01", max: "1000000", step: "0.01", inputMode: "decimal", value: Wo, onChange: (u) => er(u.target.value), required: !0 }), l("button", { className: "small-button", disabled: Ra.isPending, children: o("addPackage") }), ((_127 = Ra.data) === null || _127 === void 0 ? void 0 : _127.error) && l(P, { tone: "error", children: Ra.data.error })] }), d("section", { children: [l("h3", { children: o("creditPackages") }), l("div", { className: "admin-package-list", children: (_128 = be.data) === null || _128 === void 0 ? void 0 : _128.packages.map((u) => d("article", { children: [d("strong", { children: [u.credits, " ", o("credits")] }), d("span", { children: ["$", (u.priceCents / 100).toFixed(2)] })] }, u.id)) })] }), d("section", { children: [l("h3", { children: o("purchaseLog") }), !be.isPending && ((_130 = (_129 = be.data) === null || _129 === void 0 ? void 0 : _129.purchases.length) !== null && _130 !== void 0 ? _130 : 0) === 0 ? l("p", { className: "admin-empty", children: o("noPurchases") }) : l("div", { className: "purchase-log", children: (_131 = be.data) === null || _131 === void 0 ? void 0 : _131.purchases.map((u) => d("article", { children: [d("div", { children: [l("strong", { children: u.userName }), d("small", { children: [u.credits, " ", o("credits"), " · $", (u.priceCents / 100).toFixed(2)] })] }), d("div", { children: [l("span", { children: u.status }), l("small", { children: Bi(u.createdAt, r) })] })] }, u.id)) })] }), ((_132 = be.data) === null || _132 === void 0 ? void 0 : _132.error) && l(P, { tone: "error", children: be.data.error })] })] })] }), ii && l(xv, { token: e, target: ii, onClose: () => Io(null) }, `${ii.type}-${ii.id}`), M && l("div", { className: "dialog-backdrop", role: "presentation", children: d("form", { className: "confirmation-dialog private-room-dialog", role: "dialog", "aria-modal": "true", onSubmit: (u) => { u.preventDefault(), Rt.mutate({ roomId: M.id, password: m }); }, children: [l("h2", { children: M.name }), l("p", { children: o("enterRoomPassword") }), l("label", { htmlFor: "private-room-password", children: o("roomPassword") }), l("input", { id: "private-room-password", type: "password", minLength: 4, maxLength: 72, value: m, onChange: (u) => y(u.target.value), autoFocus: !0, required: !0 }), ((_133 = Rt.data) === null || _133 === void 0 ? void 0 : _133.error) && l(P, { tone: "error", children: Rt.data.error }), d("div", { className: "confirmation-actions", children: [l("button", { type: "button", className: "cancel-button", onClick: () => { g(null), y(""), Rt.reset(); }, children: o("cancel") }), l("button", { className: "confirm-button", disabled: Rt.isPending, children: o("open") })] })] }) }), ke && l(ku, { message: `${ke.label}. ${o("adminConfirmAction")}`, confirmLabel: o("confirm"), onCancel: () => Me(null), onConfirm: () => { if (ke.kind === "user")
                L.mutate({ targetUserId: ke.userId, action: ke.action });
            else if (ke.kind === "owner")
                Le.mutate({ roomId: ke.roomId, targetUserId: ke.targetUserId });
            else if (ke.action === "restore")
                qa.mutate(ke.roomId);
            else if (ke.action === "delete")
                Ma.mutate(ke.roomId);
            else if (ke.action === "upgrade" || ke.action === "downgrade")
                fa.mutate({ roomId: ke.roomId, level: ke.action === "upgrade" ? 2 : 1 });
            else
                Nn.mutate({ roomId: ke.roomId, locked: ke.action === "lock", reason: ke.reason }); } }), Cl && l(ku, { message: r === "vi" ? "Bạn có chắc muốn đăng xuất không? Bạn sẽ mất vị trí trong mọi hàng chờ mic." : "Are you sure you want to sign out? You’ll lose your position in any mic queue.", confirmLabel: o("signOut"), onCancel: () => yn(!1), onConfirm: a }), ji && l(ku, { message: o("deleteRoomConfirm").replace("{name}", ji.name), confirmLabel: o("deleteRoom"), onCancel: () => Po(null), onConfirm: () => Ma.mutate(ji.id) })] }); }
function Fx({ stream: e, label: t, mirrored: a = !1, onOrientationChange: n }) { let i = _e(null); return he(() => { let r = i.current; if (!r)
    return; return r.srcObject = e, r.play().catch(() => { return; }), () => { r.srcObject = null; }; }, [e]), l("video", { ref: i, className: a ? "mirrored" : "", autoPlay: !0, playsInline: !0, muted: !0, "aria-label": t, onLoadedMetadata: (r) => n === null || n === void 0 ? void 0 : n(r.currentTarget.videoHeight > r.currentTarget.videoWidth) }); }
function jx({ stream: e, name: t, onPlaybackBlocked: a, onPlaybackStarted: n }) { let { locale: i } = hn(), r = _e(null); return he(() => { let o = r.current; if (!o)
    return; return o.srcObject = e, o.play().then(n).catch(a), () => { o.srcObject = null; }; }, [e, a, n]), l("audio", { ref: r, autoPlay: !0, playsInline: !0, "aria-label": i === "vi" ? `Âm thanh từ ${t}` : `Audio from ${t}` }); }
function Vx(e, t) { if (t === "vi") {
    if (!(e instanceof DOMException))
        return "Không thể bật mic. Vui lòng thử lại.";
    if (e.name === "NotAllowedError" || e.name === "SecurityError")
        return "Quyền truy cập mic đã bị chặn. Hãy cho phép ứng dụng dùng mic rồi thử lại.";
    if (e.name === "NotFoundError" || e.name === "DevicesNotFoundError")
        return "Không tìm thấy mic trên thiết bị này.";
    if (e.name === "NotReadableError" || e.name === "TrackStartError" || e.name === "AbortError")
        return "Mic đang được ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi thử lại.";
    if (e.name === "OverconstrainedError" || e.name === "ConstraintNotSatisfiedError")
        return "Mic này không hỗ trợ các cài đặt âm thanh cần thiết.";
    return "Không thể bật mic. Hãy kiểm tra quyền truy cập trên thiết bị rồi thử lại.";
} if (!(e instanceof DOMException))
    return "Could not start the microphone. Please try again."; if (e.name === "NotAllowedError" || e.name === "SecurityError")
    return "Microphone access was blocked. Allow microphone access for this app, then try again."; if (e.name === "NotFoundError" || e.name === "DevicesNotFoundError")
    return "No microphone was found on this device."; if (e.name === "NotReadableError" || e.name === "TrackStartError" || e.name === "AbortError")
    return "Your microphone is busy in another app. Close it there, then try again."; if (e.name === "OverconstrainedError" || e.name === "ConstraintNotSatisfiedError")
    return "This microphone does not support the requested audio settings."; return "Could not start the microphone. Check the device permission and try again."; }
function Yx({ token: e, roomId: t, onBack: a, supportOpen: n, onToggleSupport: i }) { var _j, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68; let { locale: r, t: o } = hn(), s = ja(), [p, f] = E(""), [b, x] = E(""), [h, v] = E(null), [T, k] = E(!1), [M, g] = E(!1), [m, y] = E(!1), [w, R] = E(!1), [D, q] = E(!1), [H, B] = E(!1), [F, ae] = E(!1), [De, st] = E(""), [gn, Nl] = E("1"), [Zo, Tl] = E(""), [El, ni] = E(null), [Ki, pa] = E(""), [Ea, bn] = E(!1), [Fi, vn] = E(!1), [Cl, yn] = E(""), [ji, Po] = E(!1), [fe, It] = E(null), [Mt, We] = E(null), [se, ma] = E(""), [ii, Io] = E(!1), [oi, Vi] = E(""), [Yi, Jo] = E(!1), [xn, ri] = E(!1), [Wo, er] = E(""), [ue, it] = E(null), [li, tr] = E(null), [ar, nr] = E("5"), [Xi, Nu] = E(Date.now()), [Tu, wn] = E(!1), [Ca, Zi] = E(75), [Pi, ir] = E(new Map), [Sn, or] = E(""), [qt, si] = E(!1), [rr, Eu] = E(!1), [Ii, lr] = E(!1), ke = _e(null), Me = _e(null), qe = _e(null), ze = _e(null), Jt = _e([]), te = _e(null), et = _e(!1), be = _e(new Map), Ye = _e(new Map), kn = _e(null), ui = _e(null), Rt = _e(0), Ma = _e(null), L = $t({ queryKey: ["room", t, e], queryFn: () => A.roomSnapshot({ token: e, roomId: t }), refetchInterval: 2000 }), Nn = G({ mutationFn: (c) => A.sendMessage({ token: e, roomId: t, body: c }), onSuccess: (c) => { if (c.ok)
        f(""), k(!1), s.invalidateQueries({ queryKey: ["room", t] }); } }), fa = G({ mutationFn: (c) => __awaiter(this, void 0, void 0, function* () { if (x(""), !fn(c.type) || c.size > 7500000)
        return { ok: !1, error: o("invalidChatPhoto") }; let S = yield fi(c); if (!fn(S.mimeType))
        return { ok: !1, error: o("invalidChatPhoto") }; return A.sendChatPhoto({ token: e, roomId: t, image: { dataBase64: S.dataBase64, mimeType: S.mimeType } }); }), onSuccess: (c) => { var _j; if (c.ok)
        s.invalidateQueries({ queryKey: ["room", t] });
    else
        x((_j = c.error) !== null && _j !== void 0 ? _j : o("invalidChatPhoto")); }, onError: () => x(o("invalidChatPhoto")) }), qa = G({ mutationFn: (c) => A.setVoicePresence({ token: e, roomId: t, active: c }) }), ut = G({ mutationFn: () => A.joinMicQueue({ token: e, roomId: t }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), Wt = G({ mutationFn: () => A.leaveMicQueue({ token: e, roomId: t }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), Ra = G({ mutationFn: () => A.giveSingerHeart({ token: e, roomId: t }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), Aa = G({ mutationFn: (c) => A.giftSingerCredits({ token: e, roomId: t, amount: c }), onSuccess: (c) => { Tl(c.ok ? o("gifted") : ""), s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), Le = G({ mutationFn: (c) => A.manageMicQueue(Object.assign({ token: e, roomId: t }, c)), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), za = G({ mutationFn: (c) => A.setRoomMicMode({ token: e, roomId: t, mode: c }), onSuccess: () => { s.invalidateQueries({ queryKey: ["room", t] }); } }), ea = G({ mutationFn: (c) => A.setDefaultMicTime({ token: e, roomId: t, durationMinutes: c }), onSuccess: (c) => { if (c.ok)
        Po(!1); s.invalidateQueries({ queryKey: ["room", t] }); } }), $e = G({ mutationFn: (c) => A.addMicTime({ token: e, roomId: t, minutes: c }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), ta = G({ mutationFn: (c) => A.moderateUser(Object.assign({ token: e, roomId: t }, c)), onSuccess: () => { We(null), s.invalidateQueries({ queryKey: ["room", t] }); } }), bt = G({ mutationFn: (c) => A.manageRoomBan(Object.assign({ token: e, roomId: t }, c)), onSuccess: () => { We(null), s.invalidateQueries({ queryKey: ["room", t] }); } }), At = G({ mutationFn: (c) => A.sendFriendRequest({ token: e, targetUserId: c }), onSuccess: () => { We(null), s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["friends", e] }); } }), vt = G({ mutationFn: (c) => A.respondFriendRequest(Object.assign({ token: e }, c)), onSuccess: () => { We(null), s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["friends", e] }); } }), zt = G({ mutationFn: (c) => A.changeRole(Object.assign({ token: e, roomId: t }, c)), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), ot = G({ mutationFn: () => A.updateRoomName({ token: e, roomId: t, name: oi }), onSuccess: (c) => { if (c.ok)
        Io(!1); s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), tt = G({ mutationFn: (c) => A.updateRoomChatBackground({ token: e, roomId: t, background: c }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), U = G({ mutationFn: (c) => __awaiter(this, void 0, void 0, function* () { if (c && !(c instanceof File))
        return A.updateRoomChatBackgroundPreset({ token: e, roomId: t, preset: c.id }); let S = c; if (!S)
        return A.updateRoomChatBackgroundImage({ token: e, roomId: t, image: null }); if (!fn(S.type) || S.size > 7500000)
        return { ok: !1, error: o("invalidBackgroundPhoto") }; let C = yield fi(S); if (!fn(C.mimeType))
        return { ok: !1, error: o("invalidBackgroundPhoto") }; return A.updateRoomChatBackgroundImage({ token: e, roomId: t, image: { dataBase64: C.dataBase64, mimeType: C.mimeType }, fit: "contain" }); }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }), Ot = G({ mutationFn: (c) => A.updateRoomChatBackgroundFade({ token: e, roomId: t, fade: c }), onSuccess: () => s.invalidateQueries({ queryKey: ["room", t] }) }); he(() => { var _j, _10; let c = (_10 = (_j = L.data) === null || _j === void 0 ? void 0 : _j.room) === null || _10 === void 0 ? void 0 : _10.chatBackgroundFade; if (c !== void 0)
    Zi(c); }, [(_10 = (_j = L.data) === null || _j === void 0 ? void 0 : _j.room) === null || _10 === void 0 ? void 0 : _10.chatBackgroundFade]); let aa = G({ mutationFn: (c) => __awaiter(this, void 0, void 0, function* () { if (!c)
        return A.updateRoomProfileImage({ token: e, roomId: t, image: null }); if (!fn(c.type) || c.size > 7500000)
        return { ok: !1, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP dưới 7,5 MB." }; let S = yield fi(c); if (!fn(S.mimeType))
        return { ok: !1, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP." }; return A.updateRoomProfileImage({ token: e, roomId: t, image: { dataBase64: S.dataBase64, mimeType: S.mimeType } }); }), onSuccess: () => { s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), Oa = G({ mutationFn: (c) => A.setRoomPassword({ token: e, roomId: t, password: c }), onSuccess: (c) => { if (c.ok)
        Jo(!1), er(""); s.invalidateQueries({ queryKey: ["room", t] }), s.invalidateQueries({ queryKey: ["home", e] }); } }), Tn = G({ mutationFn: () => A.updateRoomDisplayName({ token: e, roomId: t, targetUserId: fe !== null && fe !== void 0 ? fe : void 0, displayName: se }), onSuccess: (c) => { if (c.ok)
        It(null), We(null); s.invalidateQueries({ queryKey: ["room", t] }); } }), Ua = G({ mutationFn: () => A.leaveRoom({ token: e, roomId: t }), onSuccess: (c) => { if (c.ok)
        a(); } }), Ji = (c) => { var _j; (_j = be.current.get(c)) === null || _j === void 0 ? void 0 : _j.close(), be.current.delete(c), Ye.current.delete(c), ir((S) => { let C = new Map(S); return C.delete(c), C; }); }, En = (c, S, C) => __awaiter(this, void 0, void 0, function* () { yield A.sendSignal({ token: e, roomId: t, toUserId: c, kind: S, payload: JSON.stringify(C) }); }), na = (c, S) => __awaiter(this, void 0, void 0, function* () { var _j; let C = (_j = Ye.current.get(c)) !== null && _j !== void 0 ? _j : []; Ye.current.delete(c); for (let Z of C)
    yield S.addIceCandidate(Z); }), Ut = (c) => { var _j; let S = be.current.get(c); if (S)
    return S; let C = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }] }); return (_j = te.current) === null || _j === void 0 ? void 0 : _j.getTracks().forEach((Z) => { let pe = te.current; if (pe)
    C.addTrack(Z, pe); }), C.onicecandidate = (Z) => { if (Z.candidate)
    En(c, "ice", Z.candidate.toJSON()); }, C.ontrack = (Z) => { var _j; let pe = (_j = Z.streams[0]) !== null && _j !== void 0 ? _j : new MediaStream([Z.track]); ir((Ge) => new Map(Ge).set(c, pe)); }, C.onconnectionstatechange = () => { if (C.connectionState === "failed" || C.connectionState === "closed")
    Ji(c); }, be.current.set(c, C), C; }, ci = (c) => __awaiter(this, void 0, void 0, function* () { var _j; let S = Ut(c); if (S.signalingState !== "stable")
    return; let C = yield S.createOffer(); yield S.setLocalDescription(C), yield En(c, "offer", (_j = S.localDescription) !== null && _j !== void 0 ? _j : C); }), ia = () => __awaiter(this, void 0, void 0, function* () { var _j, _10; if (((_j = ze.current) === null || _j === void 0 ? void 0 : _j.state) === "recording")
    ze.current.stop(); if ((_10 = te.current) === null || _10 === void 0 ? void 0 : _10.getAudioTracks().forEach((c) => { var _j; c.stop(), (_j = te.current) === null || _j === void 0 ? void 0 : _j.removeTrack(c); }), te.current && te.current.getTracks().length === 0)
    te.current = null; g(!1), R(!1), bn(!1), yn(""), et.current = !1, yield A.setVoicePresence({ token: e, roomId: t, active: !1 }); for (let [c, S] of be.current)
    if (S.getSenders().forEach((C) => { var _j; if (((_j = C.track) === null || _j === void 0 ? void 0 : _j.kind) === "audio")
        S.removeTrack(C); }), S.signalingState === "stable")
        ci(c); }), sr = () => { var _j; if ((_j = te.current) === null || _j === void 0 ? void 0 : _j.getVideoTracks().forEach((c) => { var _j; c.stop(), (_j = te.current) === null || _j === void 0 ? void 0 : _j.removeTrack(c); }), te.current && te.current.getTracks().length === 0)
    te.current = null; ni(null), q(!1); for (let [c, S] of be.current)
    if (S.getSenders().forEach((C) => { var _j; if (((_j = C.track) === null || _j === void 0 ? void 0 : _j.kind) === "video")
        S.removeTrack(C); }), S.signalingState === "stable")
        ci(c); }, Cu = () => __awaiter(this, void 0, void 0, function* () { var _j, _10, _11, _12, _13; if (st(""), F || D || ((_11 = (_10 = (_j = L.data) === null || _j === void 0 ? void 0 : _j.room) === null || _10 === void 0 ? void 0 : _10.level) !== null && _11 !== void 0 ? _11 : 1) < 2)
    return; if (!window.isSecureContext || !((_12 = navigator.mediaDevices) === null || _12 === void 0 ? void 0 : _12.getUserMedia)) {
    st(o("cameraUnavailable"));
    return;
} ae(!0); let c = null; try {
    c = yield navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: !1 });
    let S = c.getVideoTracks()[0];
    if (!S)
        throw new DOMException("No video track", "NotFoundError");
    let C = (_13 = te.current) !== null && _13 !== void 0 ? _13 : new MediaStream;
    C.addTrack(S), te.current = C, ni(new MediaStream([S]));
    for (let [Z, pe] of be.current)
        if (pe.addTrack(S, C), pe.signalingState === "stable")
            ci(Z);
    q(!0);
}
catch (S) {
    c === null || c === void 0 ? void 0 : c.getTracks().forEach((C) => C.stop()), st(S instanceof DOMException && (S.name === "NotAllowedError" || S.name === "SecurityError") ? o("cameraBlocked") : o("cameraUnavailable"));
}
finally {
    ae(!1);
} }), Ha = (...args_1) => __awaiter(this, [...args_1], void 0, function* (c = !1) { var _j, _10, _11, _12; if (pa(""), m || Boolean((_j = te.current) === null || _j === void 0 ? void 0 : _j.getAudioTracks().length))
    return; if (!window.isSecureContext || !((_10 = navigator.mediaDevices) === null || _10 === void 0 ? void 0 : _10.getUserMedia)) {
    pa(o("micUnavailable"));
    return;
} y(!0); let S = null; try {
    S = yield navigator.mediaDevices.getUserMedia({ audio: c ? { echoCancellation: !1, noiseSuppression: !1, autoGainControl: !1 } : { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 }, video: !1 });
    let C = S.getAudioTracks()[0];
    if (!C)
        throw new DOMException("No audio track", "NotFoundError");
    let Z = S;
    C.enabled = !0;
    let pe = (_11 = te.current) !== null && _11 !== void 0 ? _11 : new MediaStream;
    pe.addTrack(C), te.current = pe;
    let Ge = yield qa.mutateAsync(!0);
    if (!Ge.ok) {
        if (Z.getTracks().forEach((at) => { at.stop(), pe.removeTrack(at); }), pe.getTracks().length === 0)
            te.current = null;
        pa((_12 = Ge.error) !== null && _12 !== void 0 ? _12 : o("couldNotJoinMic"));
        return;
    }
    for (let [at, ha] of be.current)
        if (Z.getAudioTracks().forEach((Ba) => ha.addTrack(Ba, pe)), ha.signalingState === "stable")
            ci(at);
    g(!0), bn(c), et.current = c;
}
catch (C) {
    if (S === null || S === void 0 ? void 0 : S.getTracks().forEach((Z) => { var _j; Z.stop(), (_j = te.current) === null || _j === void 0 ? void 0 : _j.removeTrack(Z); }), te.current && te.current.getTracks().length === 0)
        te.current = null;
    et.current = !1, pa(Vx(C, r)), yield A.setVoicePresence({ token: e, roomId: t, active: !1 });
}
finally {
    y(!1);
} }), Mu = () => __awaiter(this, void 0, void 0, function* () { var _j, _10, _11; if (((_j = ze.current) === null || _j === void 0 ? void 0 : _j.state) === "recording") {
    ze.current.stop();
    return;
} if (typeof MediaRecorder > "u") {
    pa(r === "vi" ? "Trình duyệt này không hỗ trợ ghi âm." : "This browser does not support recording.");
    return;
} if (!((_10 = te.current) === null || _10 === void 0 ? void 0 : _10.getAudioTracks().length))
    yield Ha(); let c = (_11 = te.current) === null || _11 === void 0 ? void 0 : _11.getAudioTracks()[0]; if (!c)
    return; let S = new MediaRecorder(new MediaStream([c])); Jt.current = [], S.ondataavailable = (C) => { if (C.data.size > 0)
    Jt.current.push(C.data); }, S.onstop = () => { let C = new Blob(Jt.current, { type: S.mimeType || "audio/webm" }); Jt.current = [], lr(!1); let Z = URL.createObjectURL(C), pe = document.createElement("a"); pe.href = Z, pe.download = `room-${t}-recording.webm`, pe.click(), window.setTimeout(() => URL.revokeObjectURL(Z), 1000); }, ze.current = S, S.start(), lr(!0); }), Qa = () => __awaiter(this, void 0, void 0, function* () { var _j; let c = !Ea; if (yn(""), !M) {
    yield Ha(!0);
    return;
} if (!c && et.current) {
    yield ia();
    return;
} let S = (_j = te.current) === null || _j === void 0 ? void 0 : _j.getAudioTracks()[0]; if (!S) {
    yn(o("backgroundSoundError"));
    return;
} vn(!0); try {
    yield S.applyConstraints(c ? { echoCancellation: !1, noiseSuppression: !1, autoGainControl: !1 } : { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 }), bn(c);
}
catch (_10) {
    yn(o("backgroundSoundError"));
}
finally {
    vn(!1);
} }); he(() => { var _j, _10; let c = ui.current, S = (_10 = (_j = L.data) === null || _j === void 0 ? void 0 : _j.messages.length) !== null && _10 !== void 0 ? _10 : 0; if (!c)
    return; let C = Rt.current === 0, Z = c.scrollHeight - c.scrollTop - c.clientHeight < 72; if (C || Z)
    c.scrollTop = c.scrollHeight; Rt.current = S; }, [(_11 = L.data) === null || _11 === void 0 ? void 0 : _11.messages.length]), he(() => { let c = window.setInterval(() => Nu(Date.now()), 1000); return () => window.clearInterval(c); }, []), he(() => { if (!xn)
    return; let c = (C) => { var _j; if (!((_j = ke.current) === null || _j === void 0 ? void 0 : _j.contains(C.target)))
    ri(!1); }, S = (C) => { if (C.key === "Escape")
    ri(!1); }; return document.addEventListener("pointerdown", c), document.addEventListener("keydown", S), () => { document.removeEventListener("pointerdown", c), document.removeEventListener("keydown", S); }; }, [xn]), he(() => { var _j; if (!ji && ((_j = L.data) === null || _j === void 0 ? void 0 : _j.room))
    nr(String(Math.round(L.data.room.defaultMicSeconds / 60))); }, [ji, (_12 = L.data) === null || _12 === void 0 ? void 0 : _12.room]), he(() => { var _j, _10, _11; if (!((_j = L.data) === null || _j === void 0 ? void 0 : _j.ok) || !L.data.me)
    return; let c = (_10 = L.data.queue) === null || _10 === void 0 ? void 0 : _10.find((Z) => Z.isCurrent), S = L.data.me, C = S.role === "admin" || S.role === "superadmin" || S.isOwner || S.roomTier === "blackshirt" || S.moderatorLevel >= 1; if (((_11 = L.data.room) === null || _11 === void 0 ? void 0 : _11.micMode) === "free") {
    if (D)
        sr();
}
else if ((c === null || c === void 0 ? void 0 : c.userId) !== S.id) {
    if (M && !C)
        pa(o("turnEnded")), ia();
    if (D)
        sr();
} }, [M, D, (_13 = L.data) === null || _13 === void 0 ? void 0 : _13.queue, (_14 = L.data) === null || _14 === void 0 ? void 0 : _14.me, (_16 = (_15 = L.data) === null || _15 === void 0 ? void 0 : _15.room) === null || _16 === void 0 ? void 0 : _16.micMode]), he(() => () => { var _j; (_j = te.current) === null || _j === void 0 ? void 0 : _j.getTracks().forEach((c) => c.stop()), be.current.forEach((c) => c.close()), A.setVoicePresence({ token: e, roomId: t, active: !1 }); }, [t, e]), he(() => { var _j, _10; if (L.data && (!L.data.ok || !L.data.me)) {
    (_j = te.current) === null || _j === void 0 ? void 0 : _j.getTracks().forEach((S) => S.stop()), te.current = null, be.current.forEach((S) => S.close()), be.current.clear(), Ye.current.clear(), ir(new Map), g(!1), q(!1), ni(null);
    return;
} if (!((_10 = L.data) === null || _10 === void 0 ? void 0 : _10.ok) || !L.data.me)
    return; if (L.data.me.muted && M) {
    pa(o("moderatorMuted")), ia();
    return;
} let c = new Set(L.data.participants.filter((S) => { var _j, _10, _11, _12; return S.id !== ((_10 = (_j = L.data) === null || _j === void 0 ? void 0 : _j.me) === null || _10 === void 0 ? void 0 : _10.id) && S.online && (M || D || S.voiceActive || ((_12 = (_11 = L.data) === null || _11 === void 0 ? void 0 : _11.queue) === null || _12 === void 0 ? void 0 : _12.some((C) => C.isCurrent && C.userId === S.id))); }).map((S) => S.id)); if (be.current.forEach((S, C) => { if (!c.has(C))
    Ji(C); }), M || D)
    L.data.participants.forEach((S) => { var _j, _10, _11; let C = !S.voiceActive || (((_j = L.data) === null || _j === void 0 ? void 0 : _j.me) ? L.data.me.id < S.id : !1); if (S.id !== ((_11 = (_10 = L.data) === null || _10 === void 0 ? void 0 : _10.me) === null || _11 === void 0 ? void 0 : _11.id) && S.online && C && !be.current.has(S.id))
        ci(S.id); }); }, [M, D, (_17 = L.data) === null || _17 === void 0 ? void 0 : _17.participants, (_18 = L.data) === null || _18 === void 0 ? void 0 : _18.me, (_19 = L.data) === null || _19 === void 0 ? void 0 : _19.queue]), he(() => { let c = !1, S = !1, C = () => __awaiter(this, void 0, void 0, function* () { var _j, _10; if (S)
    return; S = !0; try {
    let pe = yield A.pollSignals({ token: e, roomId: t });
    if (!pe.ok || c)
        return;
    for (let Ge of pe.signals)
        try {
            let at = Ut(Ge.fromUserId), ha = JSON.parse(Ge.payload);
            if (Ge.kind === "offer") {
                yield at.setRemoteDescription(ha), yield na(Ge.fromUserId, at);
                let Ba = yield at.createAnswer();
                yield at.setLocalDescription(Ba), yield En(Ge.fromUserId, "answer", (_j = at.localDescription) !== null && _j !== void 0 ? _j : Ba);
            }
            else if (Ge.kind === "answer")
                yield at.setRemoteDescription(ha), yield na(Ge.fromUserId, at);
            else if (at.remoteDescription)
                yield at.addIceCandidate(ha);
            else {
                let Ba = (_10 = Ye.current.get(Ge.fromUserId)) !== null && _10 !== void 0 ? _10 : [];
                Ba.push(ha), Ye.current.set(Ge.fromUserId, Ba);
            }
        }
        catch (_11) { }
}
finally {
    S = !1;
} }); C(); let Z = window.setInterval(() => void C(), 900); return () => { c = !0, window.clearInterval(Z); }; }, [M, t, e]); let ur = Ka(() => wn(!0), []), cr = Ka(() => wn(!1), []), Da = () => __awaiter(this, void 0, void 0, function* () { var _j, _10; let c = Array.from((_10 = (_j = kn.current) === null || _j === void 0 ? void 0 : _j.querySelectorAll("audio")) !== null && _10 !== void 0 ? _10 : []), S = yield Promise.all(c.map((C) => __awaiter(this, void 0, void 0, function* () { try {
    return yield C.play(), !0;
}
catch (_j) {
    return !1;
} }))); wn(S.some((C) => !C)); }), $a = (c) => { var _j, _10; let S = Ma.current, C = (_j = S === null || S === void 0 ? void 0 : S.selectionStart) !== null && _j !== void 0 ? _j : p.length, Z = (_10 = S === null || S === void 0 ? void 0 : S.selectionEnd) !== null && _10 !== void 0 ? _10 : C, pe = `${p.slice(0, C)}${c}${p.slice(Z)}`; if (pe.length > 1200)
    return; f(pe), window.requestAnimationFrame(() => { var _j, _10; let Ge = C + c.length; (_j = Ma.current) === null || _j === void 0 ? void 0 : _j.focus(), (_10 = Ma.current) === null || _10 === void 0 ? void 0 : _10.setSelectionRange(Ge, Ge); }); }; if (L.isPending)
    return d("main", { className: "center-state", children: [l("div", { className: "pulse-dot" }), l("p", { children: o("enteringRoom") })] }); if (L.error || !((_20 = L.data) === null || _20 === void 0 ? void 0 : _20.ok) || !L.data.room || !L.data.me)
    return d("main", { className: "center-state", children: [l(P, { tone: "error", children: (_22 = (_21 = L.data) === null || _21 === void 0 ? void 0 : _21.error) !== null && _22 !== void 0 ? _22 : o("couldNotOpenRoom") }), l("button", { className: "primary-button", onClick: a, children: o("backToRooms") })] }); let { room: j, me: O, participants: Ht, messages: dr, heart: Cn } = L.data, oa = (_24 = (_23 = (j.chatBackgroundPreset ? hv.find((c) => c.id === j.chatBackgroundPreset) : void 0)) === null || _23 === void 0 ? void 0 : _23.src) !== null && _24 !== void 0 ? _24 : j.chatBackgroundImageUrl, $p = [...Ht].sort((c, S) => Li.indexOf(c.roomTier) - Li.indexOf(S.roomTier)).filter((c) => c.name.toLocaleLowerCase().includes(Sn.trim().toLocaleLowerCase())), u = (_25 = L.data.queue) !== null && _25 !== void 0 ? _25 : [], z = O.role === "admin" || O.role === "superadmin" || O.isOwner || O.roomTier === "blackshirt", _ = z ? 3 : O.moderatorLevel, ve = _ >= 1, Ke = _ >= 1, ra = _ >= 2, pr = _ >= 3, Gp = _ >= 3, _p = z || O.roomTier === "mod3", Tv = (c) => c.id !== O.id && !c.isOwner && c.role !== "admin" && c.role !== "superadmin" && (z || c.moderatorLevel === 0), Ev = (c) => { let S = Li.indexOf(O.roomTier), C = Li.indexOf(c.roomTier); return c.id !== O.id && S >= 0 && C > S && S <= Li.indexOf("mod1"); }, Cv = (c) => c.id !== O.id && ((O.role === "admin" || O.role === "superadmin") && Li.indexOf(c.roomTier) > Li.indexOf(O.roomTier) || Tv(c)), Ga = (c) => Su.indexOf(c), Mv = (c) => { if (!_p || c.id === O.id || c.roomTier === "superadmin" || c.roomTier === "owner" || c.roomTier === "blackshirt")
    return []; let S = Ga(c.roomTier); if (O.role === "superadmin")
    return [...S >= 0 ? Su.slice(S + 1, Ga("mod3") + 1) : [], "blackshirt"]; if (c.roomTier === "admin")
    return []; let C = O.roomTier === "mod3" && !z ? Ga("mod1") : Ga("mod3"); return Su.slice(S + 1, C + 1).filter((Z) => Z === "member" || Z === "mod1" || Z === "mod2" || Z === "mod3"); }, qv = (c) => { if (!_p || c.id === O.id || c.roomTier === "admin" || c.roomTier === "superadmin" || c.roomTier === "owner" || c.roomTier === "visitor")
    return !1; if (c.roomTier === "blackshirt")
    return O.role === "superadmin"; if (z)
    return !0; return Ga(c.roomTier) > Ga("visitor") && Ga(c.roomTier) < Ga("mod3"); }, Rv = (c, S) => Su[Ga(c) + (S === "promote" ? 1 : -1)], di = (c) => c === "visitor" ? o("visitorRole") : c === "member" ? o("memberRole") : c === "mod1" ? o("modOne") : c === "mod2" ? o("modTwo") : c === "mod3" ? o("modThree") : c === "blackshirt" ? o("blackShirt") : c === "owner" ? o("owner") : c === "superadmin" ? o("superAdmin") : r === "vi" ? "Quản trị viên" : "Admin", Bp = (c) => c.roomTier === "mod1" ? "moderator-1" : c.roomTier === "mod2" ? "moderator-2" : c.roomTier === "mod3" ? "moderator-3" : c.roomTier, Ru = Ht.filter((c) => c.voiceActive).map((c) => c.name), X = u.find((c) => c.isCurrent), Au = (_27 = (_26 = (X ? Ht.find((c) => c.id === X.userId) : void 0)) === null || _26 === void 0 ? void 0 : _26.singerCoverPhotoUrl) !== null && _27 !== void 0 ? _27 : null, _a = u.find((c) => c.userId === O.id), Av = new Set(u.map((c) => c.userId)), Ne = (X === null || X === void 0 ? void 0 : X.userId) === O.id, zu = Ne ? El : X ? (_28 = Pi.get(X.userId)) !== null && _28 !== void 0 ? _28 : null : null, Ou = Boolean(zu === null || zu === void 0 ? void 0 : zu.getVideoTracks().some((c) => c.readyState === "live")), ql = Ou || Boolean(Au), zv = Math.max(0, Math.floor((Xi - L.dataUpdatedAt) / 1000)), Lp = (X === null || X === void 0 ? void 0 : X.remainingSeconds) ? Math.max(0, X.remainingSeconds - zv) : 0, Mn = `${Math.floor(Lp / 60)}:${vv(Lp % 60)}`, Ov = (Cn === null || Cn === void 0 ? void 0 : Cn.availableAt) ? Math.max(0, Math.ceil((Date.parse(Cn.availableAt) - Xi) / 1000)) : 0, Uv = ue ? (() => { if (ue.kind === "leave")
    return r === "vi" ? "Bạn có chắc muốn rời phòng này không? Bạn sẽ mất vị trí trong hàng chờ mic." : "Are you sure you want to exit this room? You’ll lose your mic queue position."; if (ue.kind === "kick")
    return r === "vi" ? `Bạn có chắc muốn mời ${ue.person.name} ra khỏi phòng không?` : `Are you sure you want to remove ${ue.person.name} from the room?`; if (ue.kind === "ban")
    return o("banConfirm").replace("{name}", ue.person.name); if (ue.kind === "role")
    return r === "vi" ? `${ue.direction === "promote" ? o("promoteTo") : o("demoteTo")} ${di(ue.nextTier)} cho ${ue.person.name}?` : `${ue.direction === "promote" ? o("promoteTo") : o("demoteTo")} ${di(ue.nextTier)}: ${ue.person.name}?`; if (ue.kind === "queue-remove")
    return o("removeQueueConfirm").replace("{name}", ue.name); return o("clearQueueConfirm"); })() : "", Hv = ue ? ue.kind === "leave" ? o("leaveRoom") : ue.kind === "kick" ? o("removeFromRoom") : ue.kind === "ban" ? o("banFromRoom") : ue.kind === "role" ? ue.direction === "promote" ? o("promote") : o("demote") : ue.kind === "queue-remove" ? o("removeFromQueue") : o("clearQueue") : "", Kp = X && Cn ? d("div", { className: "stage-heart", children: [d("button", { type: "button", onClick: () => Ra.mutate(), disabled: Ra.isPending || Ov > 0 || Ne, "aria-label": Ne ? o("yourHeartCount") : r === "vi" ? `${o("giveHeart")} cho ${X.name}` : `${o("giveHeart")} to ${X.name}`, children: [l(Q, { name: "heart", size: 20 }), l("strong", { children: Cn.count })] }), l("span", { children: Ne ? o("yourHeartCount") : o("giveHeart") })] }) : null; return d("main", { className: `room-shell ${j.level === 1 ? "level-one-room" : ""} ${qt ? "desktop-sidebar-collapsed" : ""}`, children: [d("header", { className: "room-header", children: [l("button", { className: "icon-button room-back-button", onClick: () => it({ kind: "leave" }), disabled: Ua.isPending, "aria-label": o("backToRooms"), children: l(Q, { name: "back" }) }), l("div", { className: `room-picture ${j.profileImageUrl ? "has-image" : "empty"}`, children: j.profileImageUrl ? l("img", { className: "room-header-image", src: j.profileImageUrl, alt: o("roomPicture") }) : l("span", { className: "room-picture-placeholder", "aria-hidden": "true", children: l(Q, { name: "image", size: 20 }) }) }), d("div", { ref: ke, className: `room-heading ${ii ? "editing" : ""} ${xn ? "settings-open" : ""}`, children: [d("p", { className: "eyebrow", children: [o("liveRoom"), " · ", o("roomLevel"), " ", j.level] }), !ii ? d("div", { className: "room-title-line", children: [l("h1", { children: j.name }), pr && l("button", { type: "button", className: "room-title-edit", onClick: () => { Vi(j.name), nr(String(Math.round(j.defaultMicSeconds / 60))), ri((c) => !c); }, "aria-label": o("roomSettings"), "aria-expanded": xn, "aria-haspopup": "dialog", children: l(Q, { name: "gear", size: 16 }) })] }) : d("form", { className: "room-title-editor", onSubmit: (c) => { c.preventDefault(), ot.mutate(); }, children: [l("label", { className: "sr-only", htmlFor: "room-title", children: o("newRoomName") }), l("input", { id: "room-title", value: oi, onChange: (c) => Vi(c.target.value), minLength: 2, maxLength: 42, required: !0, autoFocus: !0 }), l("button", { className: "small-button", disabled: ot.isPending, children: ot.isPending ? o("saving") : o("save") }), l("button", { type: "button", className: "cancel-button", onClick: () => Io(!1), children: o("cancel") })] }), d("p", { className: "room-desktop-meta", children: ["ID:", j.id, "   Online:", Ht.length] }), ((_29 = ot.data) === null || _29 === void 0 ? void 0 : _29.error) && l(P, { tone: "error", children: ot.data.error }), ((_30 = aa.data) === null || _30 === void 0 ? void 0 : _30.error) && l(P, { tone: "error", children: aa.data.error }), O.role !== "admin" && O.role !== "superadmin" && l("button", { type: "button", className: "room-report-header", onClick: () => tr({ type: "room", id: j.id, name: j.name }), children: o("reportRoom") }), O.isOwner && d("button", { type: "button", className: "room-password-toggle", onClick: () => Jo((c) => !c), "aria-expanded": Yi, children: [l(Q, { name: "shield", size: 13 }), j.isPrivate ? o("privateRoom") : o("setRoomPassword")] }), O.isOwner && Yi && d("form", { className: "room-password-form", onSubmit: (c) => { c.preventDefault(), Oa.mutate(Wo); }, children: [l("label", { htmlFor: "room-password-setting", children: o("roomPassword") }), l("small", { children: o("roomPasswordHint") }), l("input", { id: "room-password-setting", type: "password", minLength: 4, maxLength: 72, value: Wo, onChange: (c) => er(c.target.value), required: !0 }), d("div", { children: [l("button", { className: "small-button", disabled: Oa.isPending, children: o("setRoomPassword") }), j.isPrivate && l("button", { type: "button", className: "cancel-button", onClick: () => Oa.mutate(""), disabled: Oa.isPending, children: o("removeRoomPassword") })] }), ((_31 = Oa.data) === null || _31 === void 0 ? void 0 : _31.error) && l(P, { tone: "error", children: Oa.data.error })] }), pr && xn && d("section", { className: "room-settings-panel", role: "dialog", "aria-label": o("roomSettings"), children: [d("header", { children: [l("strong", { children: o("roomSettings") }), l("button", { type: "button", "aria-label": o("cancel"), onClick: () => ri(!1), children: "×" })] }), d("form", { onSubmit: (c) => { c.preventDefault(), ot.mutate(); }, children: [l("label", { htmlFor: "settings-room-title", children: o("renameRoom") }), d("div", { className: "room-settings-row", children: [l("input", { id: "settings-room-title", value: oi, onChange: (c) => Vi(c.target.value), minLength: 2, maxLength: 42, required: !0 }), l("button", { className: "small-button", disabled: ot.isPending, children: o("save") })] })] }), d("form", { onSubmit: (c) => { c.preventDefault(); let S = Number(ar); if (Number.isInteger(S) && S >= 1 && S <= 60)
                                        ea.mutate(S); }, children: [l("label", { htmlFor: "settings-default-mic-minutes", children: o("defaultTurnLength") }), d("div", { className: "room-settings-row", children: [l("input", { id: "settings-default-mic-minutes", type: "number", min: "1", max: "60", inputMode: "numeric", value: ar, onChange: (c) => nr(c.target.value) }), l("span", { children: o("minutes") }), l("button", { className: "small-button", disabled: ea.isPending, children: o("save") })] })] }), d("div", { className: "room-settings-photo", children: [l("span", { children: o("roomPicture") }), d("label", { className: "small-button", children: [l(Q, { name: "image", size: 15 }), o("changeRoomPicture"), l("input", { type: "file", accept: "image/jpeg,image/png,image/webp", disabled: aa.isPending, onChange: (c) => { var _j; let S = c.currentTarget, C = (_j = S.files) === null || _j === void 0 ? void 0 : _j[0]; if (C)
                                                        aa.mutate(C); S.value = ""; } })] }), j.profileImageUrl && l("button", { type: "button", className: "cancel-button", onClick: () => aa.mutate(null), disabled: aa.isPending, children: o("removeRoomPicture") })] }), L.data.bans && d("details", { className: "room-settings-bans", children: [d("summary", { children: [d("span", { children: [l(Q, { name: "shield", size: 15 }), o("roomBanList")] }), l("strong", { children: L.data.bans.length })] }), l("div", { children: L.data.bans.length === 0 ? l("p", { children: o("noBannedUsers") }) : L.data.bans.map((c) => d("article", { children: [d("div", { children: [l("strong", { children: c.name }), c.bannedByName && d("small", { children: [o("bannedBy"), " ", c.bannedByName] })] }), l("button", { type: "button", disabled: bt.isPending, onClick: () => bt.mutate({ targetUserId: c.userId, action: "unban" }), children: o("unban") })] }, c.userId)) })] }), (((_32 = ot.data) === null || _32 === void 0 ? void 0 : _32.error) || ((_33 = ea.data) === null || _33 === void 0 ? void 0 : _33.error) || ((_34 = aa.data) === null || _34 === void 0 ? void 0 : _34.error) || ((_35 = bt.data) === null || _35 === void 0 ? void 0 : _35.error)) && l(P, { tone: "error", children: ((_36 = ot.data) === null || _36 === void 0 ? void 0 : _36.error) || ((_37 = ea.data) === null || _37 === void 0 ? void 0 : _37.error) || ((_38 = aa.data) === null || _38 === void 0 ? void 0 : _38.error) || ((_39 = bt.data) === null || _39 === void 0 ? void 0 : _39.error) })] })] }), d("div", { className: "header-actions", children: [l("button", { type: "button", className: `icon-button room-header-support ${n ? "active" : ""}`, "aria-label": o("contactSupport"), "aria-pressed": n, onClick: i, children: "?" }), d("div", { className: "desktop-room-actions", "aria-label": r === "vi" ? "Điều khiển phòng" : "Room controls", children: [l("button", { type: "button", onClick: () => si((c) => !c), "aria-label": r === "vi" ? "Hiện hoặc ẩn danh sách người" : "Show or hide people list", "aria-pressed": qt, children: l(Q, { name: "menu" }) }), l("button", { type: "button", className: rr ? "active" : "", onClick: () => Eu((c) => !c), "aria-label": r === "vi" ? "Đánh dấu phòng yêu thích" : "Favorite room", "aria-pressed": rr, children: l(Q, { name: "star" }) }), l("button", { type: "button", onClick: () => it({ kind: "leave" }), disabled: Ua.isPending, "aria-label": o("leaveRoom"), children: l(Q, { name: "door" }) })] }), l("button", { className: "icon-button standard-room-exit", onClick: () => it({ kind: "leave" }), disabled: Ua.isPending, "aria-label": o("leaveRoom"), children: l(Q, { name: "door" }) })] })] }), d("div", { className: `queue-stage-layout ${j.micMode === "queue" ? "queue-layout-active" : "free-layout-active"}`, children: [(ql || j.level === 1 && j.micMode === "queue") && d("section", { className: `voice-stage ${M ? "on" : ""} ${ql ? "camera-active" : "queue-singer-stage"} ${H ? "portrait-visual" : ""}`, children: [j.level === 1 && j.micMode === "queue" && !ql && d("div", { className: "desktop-queue-singer", "aria-label": X ? `${o("singerTurn")}: ${X.name}` : o("noWaiting"), children: [d("div", { className: "desktop-singer-heading", children: [l("strong", { children: (_40 = X === null || X === void 0 ? void 0 : X.name) !== null && _40 !== void 0 ? _40 : o("noWaiting") }), l("small", { children: X ? `${o("userId")} #${X.userId}` : o("joinQueueTakeMic") })] }), d("span", { className: "desktop-singer-silhouette", "aria-hidden": "true", children: [l("i", {}), l("b", {})] })] }), zu && Ou && l("div", { className: "singer-video", children: l(Fx, { stream: zu, label: `${o("singerCamera")}: ${(_41 = X === null || X === void 0 ? void 0 : X.name) !== null && _41 !== void 0 ? _41 : O.name}`, mirrored: Ne, onOrientationChange: B }) }), !Ou && Au && X && l("div", { className: "singer-cover-photo", children: l("img", { src: Au, alt: `${o("singerCoverPhoto")}: ${X.name}`, onLoad: (c) => B(c.currentTarget.naturalHeight > c.currentTarget.naturalWidth) }) }), ql && X ? d("div", { className: "camera-stage-overlay", "aria-label": `${o("singerTurn")}: ${X.name}`, children: [d("p", { className: "camera-turn-label", children: [l("strong", { children: o("singerTurn") }), l("span", { children: X.name })] }), X.endsAt && d("time", { className: "stage-countdown", "aria-label": r === "vi" ? `Còn ${Mn}` : `${Mn} remaining`, children: [l(Q, { name: "clock", size: 16 }), Mn] }), d("div", { className: "stage-wave", "aria-hidden": "true", children: [l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {})] }), Kp] }) : d(V, { children: [d("div", { className: "voice-status", children: [d("div", { className: "stage-wave", "aria-hidden": "true", children: [l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {}), l("i", {})] }), l("p", { children: Ru.length ? `${Ru.join(", ")} ${Ru.length === 1 ? o("isOnMic") : o("areOnMic")}` : X ? X.endsAt ? r === "vi" ? `Lượt của ${X.name} · ${Mn}` : `${X.name}'s ${o("turn")} · ${Mn}` : `${X.name} ${o("isUpNext")}` : j.micMode === "free" ? o("freeMicPrompt") : o("joinQueueTakeMic") })] }), Kp] }), X && !Ne && d("form", { className: "credit-gift", onSubmit: (c) => { c.preventDefault(); let S = Number(gn); if (Number.isInteger(S) && S > 0)
                                Aa.mutate(S); }, children: [d("label", { htmlFor: "gift-credit-amount", children: [o("giftSinger"), " · ", O.creditBalance, " ", o("credits")] }), d("div", { children: [l("input", { id: "gift-credit-amount", type: "number", min: "1", max: "1000", inputMode: "numeric", value: gn, onChange: (c) => Nl(c.target.value) }), l("button", { type: "submit", disabled: Aa.isPending || O.creditBalance < Number(gn), children: o("gift") })] }), (((_42 = Aa.data) === null || _42 === void 0 ? void 0 : _42.error) || Zo) && l("small", { children: ((_43 = Aa.data) === null || _43 === void 0 ? void 0 : _43.error) || Zo })] }), (Ne || j.micMode === "free") && d("div", { className: "singer-stage-controls", children: [Ne && (j.level >= 2 ? d("button", { type: "button", className: `camera-toggle ${D ? "active" : ""}`, onClick: () => D ? sr() : void Cu(), disabled: F, children: [l(Q, { name: "camera", size: 17 }), F ? o("starting") : D ? o("stopCamera") : o("startCamera")] }) : l("p", { className: "camera-level-note", children: o("levelTwoCamera") })), d("button", { type: "button", className: `camera-toggle background-sound-toggle ${Ea ? "active" : ""}`, onClick: () => void Qa(), disabled: Fi || m || O.muted, "aria-pressed": Ea, title: o("backgroundSoundHint"), children: [l(Q, { name: "music", size: 17 }), Fi ? o("backgroundSoundStarting") : Ea ? o("stopBackgroundSound") : o("shareBackgroundSound")] })] }), j.micMode === "queue" && ve && !Ne && d("button", { type: "button", className: `turn-mic-button hot-mic-button ${M ? "active" : ""}`, onClick: () => M ? void ia() : void Ha(), disabled: m || qa.isPending || O.muted, "aria-label": M ? o("leaveHotMic") : o("hotMic"), "aria-busy": m, children: [l(Q, { name: O.muted ? "mute" : "mic", size: 18 }), l("span", { children: O.muted ? o("muted") : m ? o("starting") : M ? o("leaveHotMic") : o("hotMic") })] }), M && d("button", { className: `self-mute ${w ? "active" : ""}`, onClick: () => { var _j; let c = !w; R(c), (_j = te.current) === null || _j === void 0 ? void 0 : _j.getAudioTracks().forEach((S) => { S.enabled = !c; }); }, children: [l(Q, { name: w ? "mute" : "mic", size: 16 }), w ? o("unmuteMyMic") : o("muteMyMic")] }), Tu && d("button", { className: "self-mute active", onClick: () => void Da(), "aria-label": o("startHearing"), children: [l(Q, { name: "mic", size: 16 }), o("tapHear")] }), Ki && l(P, { tone: "error", children: Ki }), De && l(P, { tone: "error", children: De }), Cl && l(P, { tone: "error", children: Cl }), ((_44 = Ra.data) === null || _44 === void 0 ? void 0 : _44.error) && l(P, { tone: "error", children: Ra.data.error })] }), l("div", { className: "remote-audio", ref: kn, children: Array.from(Pi.entries()).map(([c, S]) => { var _j, _10; return l(jx, { stream: S, name: (_10 = (_j = Ht.find((C) => C.id === c)) === null || _j === void 0 ? void 0 : _j.name) !== null && _10 !== void 0 ? _10 : o("participant"), onPlaybackBlocked: ur, onPlaybackStarted: cr }, c); }) }), d("section", { ref: qe, className: "mic-queue-panel", "aria-labelledby": "mic-queue-heading", children: [d("div", { className: "queue-heading", children: [d("div", { className: "queue-title", children: [l("span", { children: l(Q, { name: "queue", size: 18 }) }), d("div", { children: [l("h2", { id: "mic-queue-heading", children: o("micMode") }), Ke ? d("label", { className: "mic-mode-select", children: [l("span", { className: "sr-only", children: o("changeMicMode") }), d("select", { value: j.micMode, onChange: (c) => za.mutate(c.target.value === "free" ? "free" : "queue"), disabled: za.isPending, "aria-label": o("changeMicMode"), children: [l("option", { value: "free", children: o("freeMode") }), l("option", { value: "queue", children: o("queueMode") })] })] }) : l("p", { children: j.micMode === "free" ? o("freeMode") : o("queueMode") })] })] }), j.micMode === "queue" && d("div", { className: "level-one-queue-controls", "aria-label": r === "vi" ? "Điều khiển xếp hàng" : "Queue controls", children: [d("button", { type: "button", onClick: () => { if (!_a)
                                                ut.mutate(); }, disabled: Boolean(_a) || ut.isPending || O.muted, children: [l(Q, { name: "queue", size: 15 }), l("span", { children: _a ? o("waiting") : r === "vi" ? "Xếp hàng" : "Join queue" })] }), ve && d("button", { type: "button", className: "danger", disabled: Le.isPending || u.length === 0, onClick: () => it({ kind: "queue-clear" }), children: [l(Q, { name: "mute", size: 15 }), l("span", { children: r === "vi" ? "Cấm xếp hàng" : "Clear queue" })] }), ve && d("button", { type: "button", className: M && !Ne ? "active" : "", onClick: () => M ? void ia() : void Ha(), disabled: m || qa.isPending || O.muted || Ne, "aria-pressed": M && !Ne, children: [l(Q, { name: "mic", size: 15 }), l("span", { children: r === "vi" ? "Giữ micro" : "Hold mic" })] }), d("button", { type: "button", onClick: () => si((c) => !c), "aria-pressed": qt, children: [l(Q, { name: "collapse", size: 15 }), l("span", { children: qt ? r === "vi" ? "Mở rộng" : "Expand" : r === "vi" ? "Thu lại" : "Collapse" })] })] })] }), d("div", { className: "queue-roster", children: [j.micMode === "queue" && d(V, { children: [X ? d("div", { className: "current-turn", children: [l("div", { className: "turn-avatar", children: X.name.slice(0, 1).toUpperCase() }), d("div", { className: "turn-copy", children: [l("span", { children: X.endsAt ? o("nowOnMic") : o("upNext") }), d("div", { className: "queue-person-line", children: [d("strong", { title: `${o("userId")} #${X.userId}`, children: [X.name, Ne ? ` (${o("you")})` : ""] }), d("div", { className: "queue-entry-actions", children: [ve && X.endsAt && d(V, { children: [d("button", { type: "button", onClick: () => $e.mutate(1), disabled: $e.isPending, "aria-label": `${o("addTime")} 1 ${o("min")} ${X.name}`, children: ["+1 ", o("min")] }), d("button", { type: "button", onClick: () => $e.mutate(5), disabled: $e.isPending, "aria-label": `${o("addTime")} 5 ${o("min")} ${X.name}`, children: ["+5 ", o("min")] })] }), Ne ? l("button", { type: "button", className: "danger", onClick: () => Wt.mutate(), disabled: Wt.isPending, children: o("endMyTurn") }) : ra && l("button", { type: "button", className: "danger", disabled: Le.isPending, onClick: () => it({ kind: "queue-remove", userId: X.userId, name: X.name }), "aria-label": `${o("removeFromQueue")} ${X.name}`, children: o("removeFromQueue") })] })] })] }), d("div", { className: "turn-side", children: [X.endsAt && d("time", { "aria-label": r === "vi" ? `Còn ${Mn}` : `${Mn} remaining`, children: [l(Q, { name: "clock", size: 15 }), Mn] }), !X.endsAt && !Ne && l("span", { className: "start-cue", children: o("startYourMic") }), Ne && d("button", { className: `turn-mic-button ${M ? "active" : ""}`, onClick: () => M ? void ia() : void Ha(), disabled: m || qa.isPending || O.muted, "aria-label": M ? o("leaveLiveAudio") : m ? o("startingMicrophone") : o("joinLiveAudio"), "aria-busy": m, children: [l(Q, { name: O.muted ? "mute" : "mic", size: 18 }), l("span", { children: O.muted ? o("muted") : m ? o("starting") : M ? o("leaveMic") : o("joinMic") })] })] })] }) : l("p", { className: "queue-empty", children: o("noWaiting") }), u.length > 1 && l("ol", { className: "queue-list", children: u.filter((c) => !c.isCurrent).map((c, S) => d("li", { children: [l("span", { children: c.position - 1 }), d("div", { className: "queue-person-line", children: [d("strong", { title: `${o("userId")} #${c.userId}`, children: [c.name, c.userId === O.id ? ` (${o("you")})` : ""] }), l("small", { children: o("waiting") }), (ve || c.userId === O.id) && d("div", { className: "queue-entry-actions", children: [ve && S > 0 && l("button", { type: "button", disabled: Le.isPending, onClick: () => Le.mutate({ action: "moveUp", targetUserId: c.userId }), "aria-label": `${o("moveUp")} ${c.name}`, children: o("moveUp") }), ra && l("button", { type: "button", disabled: Le.isPending, onClick: () => Le.mutate({ action: "singNow", targetUserId: c.userId }), "aria-label": `${o("makeSinger")} ${c.name}`, children: o("makeSinger") }), c.userId === O.id ? l("button", { type: "button", className: "danger", onClick: () => Wt.mutate(), disabled: Wt.isPending, children: o("leaveQueue") }) : ra && l("button", { type: "button", className: "danger", disabled: Le.isPending, onClick: () => it({ kind: "queue-remove", userId: c.userId, name: c.name }), "aria-label": `${o("removeFromQueue")} ${c.name}`, children: o("removeFromQueue") })] })] })] }, c.id)) }), !_a && d("div", { className: "queue-self-row", children: [d("strong", { children: [O.name, " (", o("you"), ")"] }), d("button", { className: "queue-join", onClick: () => ut.mutate(), disabled: ut.isPending || O.muted, children: [l(Q, { name: "mic", size: 17 }), ut.isPending ? o("joining") : o("joinMicQueue")] })] }), _a && !Ne && l("p", { className: "queue-position-note", children: r === "vi" ? `Bạn đang ở vị trí #${_a.position - 1} ${o("inLine")}` : `You’re #${_a.position - 1} ${o("inLine")}` }), Ne && !M && l("p", { className: "queue-position-note", children: o("yourTurnTap") })] }), ((_45 = za.data) === null || _45 === void 0 ? void 0 : _45.error) && l(P, { tone: "error", children: za.data.error }), ((_46 = ut.data) === null || _46 === void 0 ? void 0 : _46.error) && l(P, { tone: "error", children: ut.data.error }), ((_47 = Wt.data) === null || _47 === void 0 ? void 0 : _47.error) && l(P, { tone: "error", children: Wt.data.error }), ((_48 = ea.data) === null || _48 === void 0 ? void 0 : _48.error) && l(P, { tone: "error", children: ea.data.error }), ((_49 = $e.data) === null || _49 === void 0 ? void 0 : _49.error) && l(P, { tone: "error", children: $e.data.error }), ((_50 = Le.data) === null || _50 === void 0 ? void 0 : _50.error) && l(P, { tone: "error", children: Le.data.error })] })] })] }), d("details", { ref: Me, className: "participants-panel", open: !0, children: [d("summary", { children: [d("span", { children: [l(Q, { name: "users", size: 18 }), o("peopleRoles")] }), l("strong", { children: Ht.length })] }), d("label", { className: "participant-search", children: [l("span", { className: "sr-only", children: r === "vi" ? "Tìm người trong phòng" : "Search people in room" }), l("input", { type: "search", value: Sn, onChange: (c) => or(c.currentTarget.value), placeholder: r === "vi" ? "Nhập tên người cần tìm…" : "Search people…" })] }), l("div", { className: "participants-list", children: $p.map((c) => { var _j; let S = Mv(c), C = Rv(c.roomTier, "demote"), Z = S.length > 0, pe = qv(c) && Boolean(C), Ge = Ev(c), at = Cv(c), ha = c.id !== O.id && O.role !== "admin" && O.role !== "superadmin", Ba = j.micMode === "queue" && ra && !c.muted && !Av.has(c.id), Qv = c.id === O.id || pr, Dv = c.id !== O.id && pr; return d("div", { className: `participant ${Bp(c)}`, title: `${o("userId")} #${c.id}`, children: [l("span", { className: `role-shirt ${Bp(c)}`, "aria-label": di(c.roomTier), children: l(Q, { name: "shirt", size: 22 }) }), d("div", { className: "person-info", children: [d("strong", { children: [c.name, c.id === O.id ? ` (${o("you")})` : "", c.id === O.id && l("button", { type: "button", className: "person-name-edit", onClick: () => { ma(O.name), It(O.id); }, "aria-label": o("editRoomName"), children: l(Q, { name: "edit", size: 13 }) })] }), (c.voiceActive || c.muted) && l("span", { children: c.voiceActive ? o("onMic") : o("mutedByModerator") })] }), d("div", { className: "participant-menu-wrap", children: [l("button", { type: "button", className: "participant-menu-toggle", "aria-label": `${o("personSettings")}: ${c.name}`, "aria-expanded": Mt === c.id, "aria-haspopup": "menu", onClick: () => We((Qt) => Qt === c.id ? null : c.id), children: l(Q, { name: "gear", size: 17 }) }), Mt === c.id && d("div", { className: "participant-menu", role: "menu", children: [Qv && d("button", { type: "button", role: "menuitem", onClick: () => { ma(c.name), It(c.id), We(null); }, children: [l(Q, { name: "edit", size: 15 }), o("changeRoomPersonName")] }), c.id !== O.id && c.friendshipStatus === "none" && d("button", { type: "button", role: "menuitem", disabled: At.isPending, onClick: () => At.mutate(c.id), children: [l(Q, { name: "users", size: 15 }), o("addFriend")] }), c.id !== O.id && c.friendshipStatus === "outgoing" && d("button", { type: "button", role: "menuitem", disabled: !0, children: [l(Q, { name: "users", size: 15 }), o("requestSent")] }), c.id !== O.id && c.friendshipStatus === "friends" && d("button", { type: "button", role: "menuitem", disabled: !0, children: [l(Q, { name: "users", size: 15 }), o("friends")] }), c.id !== O.id && c.friendshipStatus === "incoming" && c.friendRequestId && d("div", { className: "participant-friend-request", children: [l("span", { children: o("friendRequests") }), d("div", { children: [l("button", { type: "button", disabled: vt.isPending, onClick: () => { var _j; return vt.mutate({ requestId: (_j = c.friendRequestId) !== null && _j !== void 0 ? _j : 0, response: "accept" }); }, children: o("accept") }), l("button", { type: "button", disabled: vt.isPending, onClick: () => { var _j; return vt.mutate({ requestId: (_j = c.friendRequestId) !== null && _j !== void 0 ? _j : 0, response: "decline" }); }, children: o("decline") })] })] }), Ba && d("button", { type: "button", role: "menuitem", disabled: Le.isPending, onClick: () => { We(null), Le.mutate({ action: "add", targetUserId: c.id }); }, children: [l(Q, { name: "queue", size: 15 }), o("addToQueue")] }), Ge && d("button", { type: "button", role: "menuitem", disabled: ta.isPending, onClick: () => ta.mutate({ targetUserId: c.id, action: c.muted ? "unmute" : "mute" }), children: [l(Q, { name: "mute", size: 15 }), c.muted ? o("unmute") : o("mute")] }), at && d("button", { type: "button", role: "menuitem", disabled: ta.isPending, onClick: () => { We(null), it({ kind: "kick", person: c }); }, children: [l(Q, { name: "door", size: 15 }), o("removeFromRoom")] }), Dv && d("button", { type: "button", role: "menuitem", className: "danger", disabled: bt.isPending, onClick: () => { We(null), it({ kind: "ban", person: c }); }, children: [l(Q, { name: "shield", size: 15 }), o("banFromRoom")] })] })] }), c.id === fe && d("form", { className: "participant-name-editor", onSubmit: (Qt) => { Qt.preventDefault(), Tn.mutate(); }, children: [l("label", { htmlFor: `room-display-name-${c.id}`, children: o("changeRoomPersonName") }), d("div", { className: "name-row", children: [l("input", { id: `room-display-name-${c.id}`, value: se, onChange: (Qt) => ma(Qt.target.value), minLength: 2, maxLength: 32, autoFocus: !0, required: !0 }), l("button", { className: "small-button", disabled: Tn.isPending, children: Tn.isPending ? o("saving") : o("save") })] }), l("button", { type: "button", className: "cancel-button", onClick: () => It(null), children: o("cancel") }), ((_j = Tn.data) === null || _j === void 0 ? void 0 : _j.error) && l(P, { tone: "error", children: Tn.data.error })] }), (Z || pe || ha) && d("div", { className: "participant-controls", children: [ha && l("button", { type: "button", className: "participant-report", onClick: () => tr({ type: "user", id: c.id, name: c.name }), children: o("report") }), (pe || Z) && d("div", { className: "tier-stepper", "aria-label": `${o("roomTier")}: ${di(c.roomTier)}`, children: [pe && C && l("button", { type: "button", disabled: zt.isPending, onClick: () => it({ kind: "role", person: c, direction: "demote", nextTier: C }), "aria-label": `${o("demoteTo")} ${di(C)}: ${c.name}`, children: o("demote") }), l("span", { children: di(c.roomTier) }), Z && d("label", { className: "tier-promote-select", children: [d("span", { className: "sr-only", children: [o("promoteTo"), " — ", c.name] }), d("select", { value: "", disabled: zt.isPending, "aria-label": `${o("promoteTo")}: ${c.name}`, onChange: (Qt) => { let Fp = Qt.target.value; if (S.includes(Fp))
                                                            it({ kind: "role", person: c, direction: "promote", nextTier: Fp }); Qt.target.value = ""; }, children: [d("option", { value: "", children: [o("promoteTo"), "…"] }), S.map((Qt) => l("option", { value: Qt, children: di(Qt) }, Qt))] })] })] })] })] }, c.id); }) }), (((_51 = zt.data) === null || _51 === void 0 ? void 0 : _51.error) || ((_52 = bt.data) === null || _52 === void 0 ? void 0 : _52.error) || ((_53 = At.data) === null || _53 === void 0 ? void 0 : _53.error) || ((_54 = vt.data) === null || _54 === void 0 ? void 0 : _54.error)) && l(P, { tone: "error", children: ((_55 = zt.data) === null || _55 === void 0 ? void 0 : _55.error) || ((_56 = bt.data) === null || _56 === void 0 ? void 0 : _56.error) || ((_57 = At.data) === null || _57 === void 0 ? void 0 : _57.error) || ((_58 = vt.data) === null || _58 === void 0 ? void 0 : _58.error) })] }), d("section", { className: "conversation", "aria-label": o("conversation"), children: [d("div", { className: "conversation-heading", children: [l("h2", { children: o("conversation") }), pr && d("details", { className: "chat-background-settings", children: [d("summary", { children: [l(Q, { name: "edit", size: 14 }), o("chatBackground")] }), d("div", { className: "chat-background-controls", children: [d("label", { children: [l("span", { children: o("chooseChatBackground") }), l("input", { type: "color", value: j.chatBackground === "transparent" ? "#ffffff" : j.chatBackground, onChange: (c) => tt.mutate(c.currentTarget.value), disabled: tt.isPending || U.isPending, "aria-label": o("chooseChatBackground") })] }), l("button", { type: "button", "aria-pressed": !oa && j.chatBackground === "#ffffff", onClick: () => tt.mutate("#ffffff"), disabled: tt.isPending || U.isPending, children: o("whiteBackground") }), l("button", { type: "button", "aria-pressed": !oa && j.chatBackground === "transparent", onClick: () => tt.mutate("transparent"), disabled: tt.isPending || U.isPending, children: o("transparentBackground") }), d("fieldset", { className: "wallpaper-presets", disabled: tt.isPending || U.isPending, children: [l("legend", { children: U.isPending ? o("applyingWallpaper") : o("standardWallpapers") }), l("div", { children: hv.map((c) => d("button", { type: "button", onClick: () => U.mutate(c), "aria-pressed": j.chatBackgroundPreset === c.id, "aria-label": o(c.nameKey), title: o(c.nameKey), children: [l("img", { src: c.src, alt: "" }), l("span", { children: o(c.nameKey) })] }, c.id)) })] }), d("label", { className: `background-photo-upload ${U.isPending ? "pending" : ""}`, "aria-label": oa ? o("changeBackgroundPhoto") : o("chooseBackgroundPhoto"), children: [l(Q, { name: "image", size: 16 }), l("span", { children: oa ? o("changeBackgroundPhoto") : o("chooseBackgroundPhoto") }), l("input", { type: "file", accept: "image/jpeg,image/png,image/webp", disabled: U.isPending || tt.isPending, onChange: (c) => { var _j; let S = c.currentTarget, C = (_j = S.files) === null || _j === void 0 ? void 0 : _j[0]; if (C)
                                                        U.mutate(C); S.value = ""; } })] }), oa && d("label", { className: "background-fade-control", children: [d("span", { children: [o("backgroundFade"), " ", d("output", { htmlFor: "background-fade-slider", "aria-live": "polite", children: [Ca, "%"] })] }), l("input", { id: "background-fade-slider", type: "range", min: "0", max: "100", step: "5", value: Ca, "aria-label": o("backgroundFade"), "aria-valuetext": `${Ca}%`, disabled: Ot.isPending, onChange: (c) => Zi(Number(c.currentTarget.value)), onPointerUp: (c) => Ot.mutate(Number(c.currentTarget.value)), onKeyUp: (c) => Ot.mutate(Number(c.currentTarget.value)) })] }), oa && l("button", { type: "button", onClick: () => U.mutate(null), disabled: U.isPending, children: o("removeBackgroundPhoto") })] })] })] }), (((_59 = tt.data) === null || _59 === void 0 ? void 0 : _59.error) || ((_60 = U.data) === null || _60 === void 0 ? void 0 : _60.error) || ((_61 = Ot.data) === null || _61 === void 0 ? void 0 : _61.error)) && l(P, { tone: "error", children: ((_62 = tt.data) === null || _62 === void 0 ? void 0 : _62.error) || ((_63 = U.data) === null || _63 === void 0 ? void 0 : _63.error) || ((_64 = Ot.data) === null || _64 === void 0 ? void 0 : _64.error) }), d("div", { className: `messages ${oa ? "photo-background" : ""}`, ref: ui, style: Hx(j.chatBackground, oa, j.chatBackgroundImageFit, Ca), children: [dr.length === 0 && d("div", { className: "first-message", children: [l("p", { children: o("noMessages") }), l("strong", { children: o("firstHello") })] }), dr.map((c) => { var _j, _10; return c.kind === "event" ? l("div", { className: "event-message", children: Ux(c.body) }, c.id) : d("article", { className: `message ${c.userId === O.id ? "mine" : ""}`, children: [d("div", { className: "message-meta", children: [l("strong", { children: (_j = c.name) !== null && _j !== void 0 ? _j : o("formerMember") }), l("time", { children: new Date(c.createdAt).toLocaleTimeString(r === "vi" ? "vi-VN" : "en-US", { hour: "numeric", minute: "2-digit" }) })] }), c.imageUrl && l("button", { type: "button", className: "chat-photo-thumbnail", "aria-label": o("openChatPhoto"), onClick: () => { var _j, _10; return v({ src: (_j = c.imageUrl) !== null && _j !== void 0 ? _j : "", alt: `${o("chatPhoto")} ${(_10 = c.name) !== null && _10 !== void 0 ? _10 : o("formerMember")}` }); }, children: l("img", { className: "chat-photo", src: c.imageUrl, alt: `${o("chatPhoto")} ${(_10 = c.name) !== null && _10 !== void 0 ? _10 : o("formerMember")}`, loading: "lazy", decoding: "async" }) }), " ", c.body && l("p", { children: c.body })] }, c.id); })] }), d("div", { className: "room-announcement", role: "status", children: [l(Q, { name: "mic", size: 15 }), d("span", { children: [j.micMode === "free" ? o("freeMode") : `${o("queueMode")} · ${Math.round(j.defaultMicSeconds / 60)} ${o("minuteTurns")}`, "  ·  ", Ht.length, " ", r === "vi" ? "người đang trực tuyến" : "online"] })] }), T && !O.muted && O.roomTier !== "visitor" && l("div", { className: "emoji-picker", role: "group", "aria-label": o("emojiPicker"), children: Qx.map((c) => l("button", { type: "button", onClick: () => $a(c), "aria-label": `${o("emojiPicker")}: ${c}`, children: c }, c)) }), d("form", { className: "composer", onSubmit: (c) => { if (c.preventDefault(), p.trim())
                        Nn.mutate(p.trim()); }, children: [Gp && d("label", { className: `photo-upload ${fa.isPending ? "pending" : ""}`, title: o("photoUploadHint"), "aria-label": fa.isPending ? o("photoSending") : o("sendPhoto"), children: [l(Q, { name: "image" }), l("input", { type: "file", accept: "image/jpeg,image/png,image/webp", disabled: O.muted || fa.isPending, onChange: (c) => { var _j; let S = c.currentTarget, C = (_j = S.files) === null || _j === void 0 ? void 0 : _j[0]; if (C)
                                        fa.mutate(C); S.value = ""; } })] }), O.roomTier !== "visitor" && l("button", { type: "button", className: "emoji-toggle", "aria-label": T ? o("closeEmojiPicker") : o("openEmojiPicker"), "aria-expanded": T, onClick: () => k((c) => !c), disabled: O.muted, children: l(Q, { name: "smile" }) }), l("label", { className: "sr-only", htmlFor: "message", children: o("message") }), l("textarea", { ref: Ma, id: "message", value: p, onChange: (c) => f(c.target.value), onPaste: (c) => { var _j; if (!Gp || O.muted || fa.isPending)
                                return; let C = (_j = Array.from(c.clipboardData.items).find((Z) => Z.kind === "file" && Z.type.startsWith("image/"))) === null || _j === void 0 ? void 0 : _j.getAsFile(); if (C)
                                c.preventDefault(), fa.mutate(C); }, placeholder: O.muted ? o("youMuted") : o("addConversation"), maxLength: 1200, disabled: O.muted, rows: 1 }), l("button", { "aria-label": o("sendMessage"), disabled: !p.trim() || Nn.isPending || O.muted, children: l(Q, { name: "send" }) })] }), (b || ((_65 = fa.data) === null || _65 === void 0 ? void 0 : _65.error)) && l(P, { tone: "error", children: b || ((_66 = fa.data) === null || _66 === void 0 ? void 0 : _66.error) }), ((_67 = Nn.data) === null || _67 === void 0 ? void 0 : _67.error) && l(P, { tone: "error", children: Nn.data.error }), ((_68 = ta.data) === null || _68 === void 0 ? void 0 : _68.error) && l(P, { tone: "error", children: ta.data.error })] }), d("nav", { className: "room-status-bar", "aria-label": r === "vi" ? "Điều khiển âm thanh phòng" : "Room audio controls", children: [d("div", { className: "connection-status", title: r === "vi" ? "Đã kết nối" : "Connected", children: [l(Q, { name: "wifi", size: 20 }), l("span", { children: r === "vi" ? "Đã kết nối" : "Connected" })] }), d("button", { type: "button", className: `desktop-talk-button ${M ? "active" : ""}`, onClick: () => { if (j.micMode === "free" || Ne || ve)
                        M ? ia() : Ha();
                    else if (!_a)
                        ut.mutate(); }, disabled: m || qa.isPending || O.muted || ut.isPending, "aria-pressed": M, children: [l(Q, { name: O.muted ? "mute" : "mic", size: 18 }), l("span", { children: O.muted ? o("muted") : M ? o("leaveMic") : j.micMode === "queue" && !Ne && !ve ? _a ? o("waiting") : o("joinMicQueue") : r === "vi" ? "Bấm để nói" : "Tap to talk" })] }), d("div", { className: "room-status-actions", children: [d("button", { type: "button", className: Ea ? "active" : "", onClick: () => void Qa(), disabled: Fi || m || O.muted || j.micMode === "queue" && !Ne && !ve, "aria-pressed": Ea, children: [l(Q, { name: "music", size: 17 }), l("span", { children: r === "vi" ? "Nhạc nền" : "Background music" })] }), d("button", { type: "button", className: Ii ? "active recording" : "", onClick: () => void Mu(), disabled: O.muted || j.micMode === "queue" && !Ne && !ve, "aria-pressed": Ii, children: [l(Q, { name: "record", size: 17 }), l("span", { children: Ii ? r === "vi" ? "Dừng ghi" : "Stop" : r === "vi" ? "Ghi âm" : "Record" })] }), d("button", { type: "button", onClick: () => si((c) => !c), "aria-pressed": qt, children: [l(Q, { name: "collapse", size: 17 }), l("span", { children: qt ? r === "vi" ? "Mở rộng" : "Expand" : r === "vi" ? "Rút gọn" : "Collapse" })] })] })] }), h && l(Bx, { src: h.src, alt: h.alt, onClose: () => v(null) }), li && l(xv, { token: e, target: li, onClose: () => tr(null) }, `${li.type}-${li.id}`), ue && l(ku, { message: Uv, confirmLabel: Hv, onCancel: () => it(null), onConfirm: () => { let c = ue; if (it(null), c.kind === "leave")
                Ua.mutate();
            else if (c.kind === "kick")
                ta.mutate({ targetUserId: c.person.id, action: "kick" });
            else if (c.kind === "ban")
                bt.mutate({ targetUserId: c.person.id, action: "ban" });
            else if (c.kind === "role")
                zt.mutate({ targetUserId: c.person.id, direction: c.direction, targetTier: c.direction === "promote" && c.nextTier !== "owner" && c.nextTier !== "admin" && c.nextTier !== "superadmin" ? c.nextTier : void 0 });
            else if (c.kind === "queue-remove")
                Le.mutate({ action: "remove", targetUserId: c.userId });
            else
                Le.mutate({ action: "clear" }); } })] }); }
function Sv() { var _j; let [e, t] = E($x), [a, n] = E(null), i = Dx(), [r, o] = E(!1), s = $t({ queryKey: ["support-chat", e], queryFn: () => A.getMySupportChat({ token: e }), enabled: Boolean(e), refetchInterval: e ? 5000 : !1 }); he(() => { document.documentElement.lang = "vi"; }, []); let p = () => { _x(), t(""), n(null), o(!1); }, f = { locale: i, t: (h) => fv.vi[h] }, b = Boolean((_j = s.data) === null || _j === void 0 ? void 0 : _j.ticket), x = Boolean(e) && a === null && !r; return l(yv.Provider, { value: f, children: d("div", { className: `app ${a ? "room-open" : ""}`, children: [l(Ju, { backgroundColor: "var(--bg)" }), !e ? l(Lx, { onReady: t }) : a ? l(Yx, { token: e, roomId: a, onBack: () => n(null), supportOpen: r, onToggleSupport: () => o((h) => !h) }) : l(Kx, { token: e, onOpenRoom: n, onSignOut: p, supportOpen: r, onSetSupportOpen: o }), " ", x && l("button", { type: "button", className: `support-fab ${b ? "active-conversation" : ""}`, "aria-label": fv[i].contactSupport, onClick: () => o(!0), children: "?" }), " ", e && a && r && l(wv, { token: e, onClose: () => o(!1) })] }) }); }
function Xx(e) { if (e instanceof Error && e.message)
    return e.message; if (typeof e === "string" && e)
    return e; return "An unknown rendering error occurred."; }
class kv extends $l {
    constructor() {
        super(...arguments);
        this.state = { failed: !1, message: "" };
    }
    static getDerivedStateFromError(e) { return { failed: !0, message: Xx(e) }; }
    componentDidCatch(e, t) { console.error("Chat interface could not render", e, t.componentStack); }
    render() { if (this.state.failed)
        return d("main", { className: "center-state startup-error", role: "alert", children: [l("h1", { children: "Let’s get you back on air" }), l("p", { children: "The chat interface hit a problem. Reload the page, then share the detail below if it happens again." }), l("code", { children: this.state.message }), l("button", { className: "primary-button", onClick: () => window.location.reload(), children: "Try again" })] }); return this.props.children; }
}
class Nv extends $l {
    componentDidMount() { var _j; (_j = window.__chatStartupReady) === null || _j === void 0 ? void 0 : _j.call(window); }
    render() { return null; }
}
var kl = document.querySelector("[data-generated-space-root]");
if (!kl)
    kl = document.createElement("div"), kl.dataset.generatedSpaceRoot = "", document.body.appendChild(kl);
try {
    Qp(kl).render(l(Vu, { children: l(Pu, { client: ya, children: l("div", { className: "hatch-space-root", "data-hatch-space-root": !0, children: d(kv, { children: [l(Nv, {}), l(Sv, {})] }) }) }) }));
}
catch (e) {
    console.error("Chat interface could not start", e), (_j = window.__chatStartupFail) === null || _j === void 0 ? void 0 : _j.call(window, e);
}
