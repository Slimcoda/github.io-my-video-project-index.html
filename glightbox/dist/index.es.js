const C = (r, ...t) => {
  if (!t.length)
    return r;
  const e = t.shift();
  return e === void 0 ? r : (E(r) && E(e) && Object.keys(e).forEach(function(i) {
    E(e[i]) ? (r[i] || (r[i] = {}), C(r[i], e[i])) : r[i] = e[i];
  }), C(r, ...t));
};
function p(r, t) {
  r.classList.add(...t.split(" "));
}
function v(r, t) {
  r.classList.remove(...t.split(" "));
}
function w(r, t) {
  return r.classList.contains(t);
}
function x(r, {
  element: t,
  callback: e,
  preventDefault: i = !0,
  once: s = !1,
  useCapture: o = !1
}, l) {
  let c = [];
  const n = e.toString().trim().replace(/\s/g, ""), h = typeof t == "string";
  if (!h)
    c = [t];
  else if (h) {
    const d = document.querySelectorAll(t);
    d && (c = [...d]);
  }
  const a = function(d) {
    typeof e == "function" && (i && d.preventDefault(), e.call(l, this, d)), s && a.destroy();
  };
  return a.destroy = function() {
    c.forEach((d) => {
      d == null || d.removeEventListener(r, a, o);
    });
  }, c.forEach((d) => {
    d && d.attachedEvent !== n && (d.addEventListener(r, a, o), d.attachedEvent = n);
  }), a;
}
function N(r, t) {
  return new Promise((e) => {
    r.addEventListener("animationend", () => {
      e(!0);
    }), p(r, t);
  });
}
function $(r) {
  return new Promise((t, e) => {
    r || e("url must be defined");
    let i = "";
    typeof r != "string" ? i = r.src : i = r;
    let s;
    if ((i.includes(".css") ? "css" : "js") == "css") {
      if (s = document.querySelectorAll('link[href="' + i + '"]'), s && s.length > 0) {
        t(!0);
        return;
      }
      const l = document.getElementsByTagName("head")[0], c = l.querySelectorAll('link[rel="stylesheet"]'), n = document.createElement("link");
      n.rel = "stylesheet", n.type = "text/css", n.href = i, n.media = "all", c ? l.insertBefore(n, c[0]) : l.appendChild(n), t(!0);
      return;
    }
    if (s = document.querySelectorAll('script[src="' + i + '"]'), s && s.length > 0) {
      t(!0);
      return;
    }
    const o = document.createElement("script");
    o.type = "text/javascript", o.src = i, typeof r != "string" && r != null && r.module && (o.type = "module"), o.onload = () => {
      t(!0);
    }, document.body.appendChild(o);
  });
}
function H(r) {
  return !!(r && r.nodeType && r.nodeType == 1);
}
const j = (r) => r !== null && typeof r == "object", E = (r) => j(r) && !Array.isArray(r), P = {
  root: null,
  autoGallery: !0,
  setClickEvent: !0,
  dataAttributesPrefix: "",
  items: [],
  plugins: [],
  appearance: {
    slideEffect: "fade",
    openEffect: "zoom",
    moreText: "See more",
    moreLength: 60,
    lightboxHTML: `<div id="gl-body" class="gl-lightbox gl-container" tabindex="0" role="dialog" aria-hidden="false">
            <div id="gl-slider" class="gl-slider"></div>
            <button class="gl-close gl-btn" aria-label="Close" tabindex="3" aria-hidden="false" data-glightbox-close-svg></button>
            <button class="gl-next gl-btn" aria-label="Next" tabindex="1" aria-hidden="false" data-glightbox-next-svg></button>
            <button class="gl-prev gl-btn" aria-label="Previous" tabindex="2" aria-hidden="false" data-glightbox-prev-svg></button>
            <div class="gl-overlay"></div>
        </div>`,
    slideHTML: "",
    svg: {
      close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
      next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
      prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>',
      loader: '<svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>'
    }
  },
  startAt: 0,
  customDataAttributes: [],
  preload: !0,
  loop: !0,
  closeOnOutsideClick: !0
};
class D {
  constructor(t = {}) {
    var i;
    this.apiEvents = /* @__PURE__ */ new Set(), this.events = /* @__PURE__ */ new Map(), this.state = /* @__PURE__ */ new Map(), this.plugins = /* @__PURE__ */ new Map(), this.items = /* @__PURE__ */ new Set(), this.modal = null, this.prevButton = null, this.nextButton = null, this.overlay = null, this.slidesContainer = null, this.options = C(P, t);
    const e = window.matchMedia("(prefers-reduced-motion: reduce)");
    (!e || e.matches) && ((i = this.options.appearance) != null && i.slideEffect) && (this.options.appearance.slideEffect = !1, this.options.appearance.openEffect = !1), this.init();
  }
  init(t = !0) {
    if (t)
      for (const e of this.options.plugins)
        this.registerPlugin(e);
    this.options.setClickEvent && this.events.set("gallery", x("click", {
      element: "*[data-glightbox]",
      callback: (e) => {
        this.open(e);
      }
    }));
  }
  open(t) {
    var i;
    if (this.state.get("open"))
      return;
    if (!this.plugins.has("slide"))
      throw new Error("No slide types registered");
    this.items.size === 0 && H(t) && this.setItemsFromNode(t);
    let e = this.options.startAt;
    this.options.autoGallery ? typeof t == "number" ? e = t : H(t) && (e = this.getElementIndex(t)) : e = 0, this.state.set("focused", document.activeElement), this.build(), this.trigger("before_open"), this.initPlugins(), this.showSlide(e, !0), this.trigger("open"), this.state.set("open", !0), (i = this.modal) == null || i.focus(), p(document.body, "gl-open");
  }
  prevSlide() {
    this.goToSlide(this.getActiveSlideIndex() - 1);
  }
  nextSlide() {
    this.goToSlide(this.getActiveSlideIndex() + 1);
  }
  goToSlide(t = 0) {
    const e = this.getTotalSlides() - 1;
    !this.options.loop && (t < 0 || t > this.getTotalSlides() - 1) || (t < 0 ? t = e : t > e && (t = 0), this.showSlide(t));
  }
  async showSlide(t = 0, e = !1) {
    var h, a, d, f;
    const i = (h = this.slidesContainer) == null ? void 0 : h.querySelector(".current");
    i && v(i, "current");
    const s = (a = this.slidesContainer) == null ? void 0 : a.querySelectorAll(".gl-slide")[t], o = s.querySelector(".gl-media");
    if (!s || !o)
      return;
    e || this.trigger("slide_before_change", { current: this.state.get("prevActiveSlideIndex"), next: t }), await this.preloadSlide(t, !e);
    const l = (d = this.options.appearance) == null ? void 0 : d.slideEffect, c = (f = this.options.appearance) == null ? void 0 : f.openEffect, n = l !== "slide" || e ? "instant" : "smooth";
    s.scrollIntoView({ behavior: n, block: "start", inline: "start" }), v(o, "gl-animation-ended"), e && c ? (p(o, "gl-invisible"), c && await N(o, `gl-${c}-in`), p(o, "gl-animation-ended"), v(o, `gl-invisible gl-${c}-in`)) : v(o, "gl-invisible"), this.setActiveSlideState(s, t), this.trigger("slide_changed", { prev: this.state.get("prevActiveSlideIndex"), current: t }), this.options.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1));
  }
  setActiveSlideState(t, e) {
    this.state.set("prevActiveSlide", this.state.get("activeSlide") ?? !1), this.state.set("prevActiveSlideIndex", this.getActiveSlideIndex()), this.state.set("activeSlide", t), this.state.set("activeSlideIndex", e), this.updateNavigationButtons();
  }
  async preloadSlide(t, e = !0) {
    var n, h;
    if (t < 0 || t > this.items.size - 1)
      return !1;
    const i = (n = this.slidesContainer) == null ? void 0 : n.querySelectorAll(".gl-slide")[t];
    if (i && (w(i, "loaded") || w(i, "preloading")))
      return !0;
    const s = this.getSlideData(t), o = s == null ? void 0 : s.type, l = this.getRegisteredSlideType(o);
    let c = "";
    if ((!o || !l) && (c = `Unable to handle URL: ${s == null ? void 0 : s.url}`), c)
      throw this.setSlideError(i, c), new Error(c);
    if (s != null && s.url && l && i && (l != null && l.build)) {
      p(i, "preloading");
      try {
        if (l != null && l.assets && typeof (l == null ? void 0 : l.assets) == "function") {
          const d = l.assets();
          if (d) {
            const f = (d == null ? void 0 : d.css) || [], b = (d == null ? void 0 : d.js) || [];
            await this.injectAssets([...f, ...b]);
          }
        }
        this.trigger("slide_before_load", s), await l.build({
          index: t,
          slide: i.querySelector(".gl-media"),
          config: { ...s, isPreload: e }
        }), (h = i.querySelector(".gl-slide-loader")) == null || h.remove(), this.afterSlideLoaded(i);
        const a = i.querySelector(".gl-media");
        return a && (p(a, `gl-type-${o}`), e && v(a, "gl-invisible")), i;
      } catch (a) {
        this.afterSlideLoaded(i), this.setSlideError(i, a);
      }
    }
    return !1;
  }
  build() {
    var l, c, n, h, a, d, f, b, S, A, k, I, L, M, q, B;
    if (this.state.get("build"))
      return;
    this.trigger("before_build");
    const t = document.body.querySelectorAll(":scope > *");
    t && [...t].forEach((g) => {
      g.parentNode == document.body && g.nodeName.charAt(0) !== "#" && g.hasAttribute && !g.hasAttribute("aria-hidden") && (g.ariaHidden = "true", g.dataset.glHidden = "true");
    });
    const e = ((l = this.options) == null ? void 0 : l.root) ?? document.body, i = ((n = (c = this.options) == null ? void 0 : c.appearance) == null ? void 0 : n.lightboxHTML) ?? "";
    if (e.insertAdjacentHTML("beforeend", i), this.modal = document.getElementById("gl-body"), !this.modal)
      throw new Error("modal body not found");
    const s = this.modal.querySelector(".gl-close");
    if (this.prevButton = this.modal.querySelector(".gl-prev"), this.nextButton = this.modal.querySelector(".gl-next"), this.overlay = this.modal.querySelector(".gl-overlay"), this.slidesContainer = document.getElementById("gl-slider"), p(this.modal, "gl-theme-" + (((a = (h = this.options) == null ? void 0 : h.appearance) == null ? void 0 : a.theme) ?? "base")), p(this.modal, "gl-slide-effect-" + (((f = (d = this.options) == null ? void 0 : d.appearance) == null ? void 0 : f.slideEffect) || "none")), (S = (b = this.options) == null ? void 0 : b.appearance) != null && S.cssVariables)
      for (const [g, u] of Object.entries(this.options.appearance.cssVariables))
        this.modal.style.setProperty(`--gl-${g}`, u);
    s && this.events.set("close", x("click", {
      element: s,
      callback: () => this.close()
    })), this.nextButton && this.events.set("next", x("click", {
      element: this.nextButton,
      callback: () => this.nextSlide()
    })), this.prevButton && this.events.set("prev", x("click", {
      element: this.prevButton,
      callback: () => this.prevSlide()
    })), this.options.closeOnOutsideClick && this.events.set("outClose", x("click", {
      element: this.modal,
      callback: (g, u) => {
        var m;
        g && (u != null && u.target) && !((m = u == null ? void 0 : u.target) != null && m.closest(".gl-media")) && (u.target.closest(".gl-btn") || this.close());
      }
    })), this.processVariables(this.modal), this.observer = new IntersectionObserver((g) => {
      g.forEach((u) => {
        var m;
        if (v(u.target, "visible"), u.isIntersecting && this.state.get("open")) {
          const y = parseInt(((m = u.target) == null ? void 0 : m.getAttribute("data-index")) ?? "0");
          p(u.target, "visible"), y !== this.state.get("activeSlideIndex") && this.setActiveSlideState(u.target, y), !w(u.target, "loaded") && !w(u.target, "preloading") && (this.preloadSlide(y), this.preloadSlide(y + 1), this.preloadSlide(y - 1));
        }
      });
    }, {
      root: this.modal,
      rootMargin: "0px",
      threshold: 0.2
    });
    let o = 0;
    for (const g of this.items) {
      const u = this.getRegisteredSlideType(g == null ? void 0 : g.type);
      if (g != null && g.url && u) {
        let m = (k = (A = this.options) == null ? void 0 : A.appearance) == null ? void 0 : k.slideHTML;
        const y = (M = (L = (I = this.options) == null ? void 0 : I.appearance) == null ? void 0 : L.svg) == null ? void 0 : M.loader;
        m || (m = `<div class="gl-slide" data-index="${o}" style="--gl-index: ${o}">
                        <div class="gl-slide-loader" role="status">
                            ${y}
                            <span class="gl-sr-only">Loading...</span>
                        </div>
                        <div class="gl-media gl-invisible">
                        </div>
                    </div>`), (q = this.slidesContainer) == null || q.insertAdjacentHTML("beforeend", m);
        const T = (B = this.slidesContainer) == null ? void 0 : B.querySelectorAll(".gl-slide")[o];
        T && this.observer.observe(T), o++;
      }
    }
    this.overlay && p(this.overlay, "gl-overlay-in"), this.state.set("build", !0), this.trigger("build");
  }
  async close() {
    var s, o, l, c;
    if (!this.state.get("open") || !this.modal)
      return;
    this.runPluginsMethod("destroy"), v(document.body, "gl-open gl-crollbar-fixer");
    const t = document.querySelectorAll('*[data-gl-hidden="true"]');
    if (t && t.forEach((n) => {
      n.ariaHidden = "false", delete n.dataset.glHidden;
    }), ((s = this.options.appearance) == null ? void 0 : s.slideEffect) === "none")
      (o = this.modal.parentNode) == null || o.removeChild(this.modal);
    else {
      const h = this.state.get("activeSlide").querySelector(".gl-media"), a = (l = this.options.appearance) == null ? void 0 : l.openEffect;
      h && (p(this.modal, "gl-closing"), a && (v(h, "gl-animation-ended"), await N(h, `gl-${a}-out`))), (c = this.modal.parentNode) == null || c.removeChild(this.modal);
    }
    this.state.clear(), this.modal = null, this.prevButton = null, this.nextButton = null, this.clearAllEvents(), this.setItems([]);
    const e = document.querySelectorAll(".gl-css");
    e && e.forEach((n) => {
      var h;
      return (h = n == null ? void 0 : n.parentNode) == null ? void 0 : h.removeChild(n);
    }), this.trigger("close");
    const i = this.state.get("focused");
    i == null || i.focus();
  }
  destroy() {
    this.close(), this.clearAllEvents(!0), this.observer.disconnect();
  }
  reload() {
    this.init(!1);
  }
  setItems(t) {
    var i, s;
    if (!t || (this.items = /* @__PURE__ */ new Set(), !t.length))
      return;
    const e = this.plugins.get("slide");
    if (!e)
      throw new Error("No slide types registered");
    for (const o of t) {
      if (o != null && o.type) {
        if (!e.has(o.type))
          throw new Error(`Unknown slide type: ${o.type}`);
        continue;
      }
      let l = !1;
      for (const [c, n] of e) {
        if (n.name === "iframe") {
          l = n;
          continue;
        }
        let h = !1;
        if (n != null && n.match && n.match(o.url.toLowerCase()) && (o.type = c, h = !0), n != null && n.options && typeof ((i = n.options) == null ? void 0 : i.matchFn) == "function" && (s = n.options) != null && s.matchFn(h, o.url.toLowerCase()) && (o.type = c, h = !0), h)
          break;
      }
      o != null && o.type || l && (o.type = l.name), this.getItems().add(o);
    }
  }
  setItemsFromNode(t) {
    if (!this.options.autoGallery) {
      this.setItems([this.parseConfigFromNode(t)]);
      return;
    }
    let e = "*[data-glightbox]";
    const i = t.getAttribute("data-glightbox");
    i && (e = `*[data-glightbox="${i}"]`);
    const s = document.querySelectorAll(e);
    if (!s)
      return;
    const o = [];
    [...s].forEach((l) => {
      const c = this.parseConfigFromNode(l);
      o.push(c);
    }), this.setItems(o);
  }
  getSettings() {
    return this.options;
  }
  getElementIndex(t) {
    let e = 0, i = 0;
    for (const s of this.items) {
      if ((s == null ? void 0 : s.node) === t) {
        e = i;
        break;
      }
      i++;
    }
    return e;
  }
  getActiveSlide() {
    if (this.state.has("activeSlide"))
      return this.state.get("activeSlide");
  }
  getActiveSlideIndex() {
    return this.state.has("activeSlideIndex") ? this.state.get("activeSlideIndex") : 0;
  }
  getTotalSlides() {
    return this.items.size;
  }
  getItems() {
    return this.items;
  }
  updateNavigationButtons() {
    if (this.items.size === 1) {
      this.modal && p(this.modal, "gl-single-slide");
      return;
    }
    if (!this.nextButton || !this.prevButton)
      return;
    const t = this.options.loop, e = this.getActiveSlideIndex(), i = this.getTotalSlides() - 1;
    this.prevButton.disabled = !1, this.nextButton.disabled = !1, e === 0 && !t ? this.prevButton.disabled = !0 : e === i && !t && (this.nextButton.disabled = !0);
  }
  setSlideError(t, e) {
    var s;
    (s = t.querySelector(".gl-slide-loader")) == null || s.remove();
    const i = t.querySelector(".gl-media");
    i && (p(i, "gl-load-error"), v(i, "gl-invisible"), i.innerHTML = `<div class="gl-error">${e}</div>`);
  }
  afterSlideLoaded(t) {
    p(t, "loaded"), v(t, "preloading");
  }
  on(t, e, i = !1) {
    if (!t || typeof e != "function")
      throw new TypeError("Event name and callback must be defined");
    this.apiEvents.add({ evt: t, once: i, callback: e });
  }
  once(t, e) {
    this.on(t, e, !0);
  }
  trigger(t, e = null) {
    for (const i of this.apiEvents) {
      const { evt: s, once: o, callback: l } = i;
      s === t && (l(e), o && this.apiEvents.delete(i));
    }
  }
  parseConfigFromNode(t) {
    var l, c, n, h;
    const e = {
      node: null,
      url: "",
      title: "",
      description: "",
      width: "",
      height: "",
      content: "",
      type: ""
    };
    let i = "";
    const s = { url: "", type: "" }, o = t.nodeName.toLowerCase();
    o === "a" && (i = t.getAttribute("href") || ""), o === "img" && (i = t.getAttribute("src") || ""), o === "figure" && (i = ((l = t.querySelector("img")) == null ? void 0 : l.getAttribute("src")) || ""), s.node = t, s.url = i;
    for (const a in e) {
      let d = "data";
      (c = this.options) != null && c.dataAttributesPrefix && (d += `-${(n = this.options) == null ? void 0 : n.dataAttributesPrefix}`);
      let f = t.getAttribute(`${d}-${a}`);
      f && ((f === "true" || f === "false") && (f = f === "true"), s[a] = f);
    }
    if (!s.title) {
      const a = t == null ? void 0 : t.getAttribute("title");
      a && (s.title = a);
    }
    if (s != null && s.description && s.description.startsWith(".")) {
      const a = (h = document.querySelector(s.description)) == null ? void 0 : h.innerHTML;
      a && (s.description = a);
    }
    if (!s.description) {
      const a = t.querySelector(".gl-inline-desc");
      a && (s.description = a.innerHTML);
    }
    return s;
  }
  getRegisteredSlideType(t) {
    if (this.plugins.has("slide")) {
      const e = this.plugins.get("slide");
      if (e && e.has(t))
        return e.get(t);
    }
    return !1;
  }
  getSlideData(t) {
    return [...this.items][t];
  }
  processVariables(t) {
    var i, s, o, l, c, n, h, a, d;
    const e = {
      "current-slide": "",
      "total-slides": "",
      "close-svg": ((o = (s = (i = this.options) == null ? void 0 : i.appearance) == null ? void 0 : s.svg) == null ? void 0 : o.close) ?? "",
      "next-svg": ((n = (c = (l = this.options) == null ? void 0 : l.appearance) == null ? void 0 : c.svg) == null ? void 0 : n.next) ?? "",
      "prev-svg": ((d = (a = (h = this.options) == null ? void 0 : h.appearance) == null ? void 0 : a.svg) == null ? void 0 : d.prev) ?? ""
    };
    for (const [f, b] of Object.entries(e)) {
      const S = t.querySelector(`*[data-glightbox-${f}]`);
      S && (S.innerHTML = b);
    }
  }
  registerPlugin(t) {
    this.plugins.has(t.type) || this.plugins.set(t.type, /* @__PURE__ */ new Map());
    const e = this.plugins.get(t.type);
    t.instance = this, e == null || e.set(t.name, t);
  }
  initPlugins() {
    this.pluginsRunEach((t) => {
      if (typeof t.init == "function" && t.init(), typeof t.cssStyle == "function") {
        const e = t == null ? void 0 : t.cssStyle();
        this.injectCSS(e);
      }
    });
  }
  runPluginsMethod(t) {
    this.pluginsRunEach((e) => {
      if (typeof e[t] == "function") {
        const i = e[t];
        typeof i == "function" && (i == null || i.apply(e));
      }
    });
  }
  pluginsRunEach(t) {
    for (const [e, i] of this.plugins)
      for (const [s, o] of i)
        t(o);
  }
  injectCSS(t) {
    if (!t)
      return;
    const e = document.createElement("style");
    e.type = "text/css", e.className = "gl-css", e.innerText = t, document.head.appendChild(e);
  }
  async injectAssets(t) {
    typeof t == "string" && (t = [t]), t.map(async (e) => {
      let i = e;
      i = e, await $(i);
    });
  }
  clearAllEvents(t = !1) {
    for (const [e, i] of this.events)
      !t && e === "gallery" || (i == null || i.destroy(), this.events.delete(e));
    t && this.events.clear(), this.apiEvents.clear();
  }
}
export {
  D as GLightbox
};
