(function(S,y){typeof exports=="object"&&typeof module<"u"?y(exports):typeof define=="function"&&define.amd?define(["exports"],y):(S=typeof globalThis<"u"?globalThis:S||self,y(S.GLightBox={}))})(this,function(S){"use strict";const y=(r,...e)=>{if(!e.length)return r;const t=e.shift();return t===void 0?r:(A(r)&&A(t)&&Object.keys(t).forEach(function(i){A(t[i])?(r[i]||(r[i]={}),y(r[i],t[i])):r[i]=t[i]}),y(r,...e))};function p(r,e){r.classList.add(...e.split(" "))}function v(r,e){r.classList.remove(...e.split(" "))}function C(r,e){return r.classList.contains(e)}function w(r,{element:e,callback:t,preventDefault:i=!0,once:s=!1,useCapture:o=!1},l){let c=[];const n=t.toString().trim().replace(/\s/g,""),h=typeof e=="string";if(!h)c=[e];else if(h){const d=document.querySelectorAll(e);d&&(c=[...d])}const a=function(d){typeof t=="function"&&(i&&d.preventDefault(),t.call(l,this,d)),s&&a.destroy()};return a.destroy=function(){c.forEach(d=>{d==null||d.removeEventListener(r,a,o)})},c.forEach(d=>{d&&d.attachedEvent!==n&&(d.addEventListener(r,a,o),d.attachedEvent=n)}),a}function k(r,e){return new Promise(t=>{r.addEventListener("animationend",()=>{t(!0)}),p(r,e)})}function $(r){return new Promise((e,t)=>{r||t("url must be defined");let i="";typeof r!="string"?i=r.src:i=r;let s;if((i.includes(".css")?"css":"js")=="css"){if(s=document.querySelectorAll('link[href="'+i+'"]'),s&&s.length>0){e(!0);return}const l=document.getElementsByTagName("head")[0],c=l.querySelectorAll('link[rel="stylesheet"]'),n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=i,n.media="all",c?l.insertBefore(n,c[0]):l.appendChild(n),e(!0);return}if(s=document.querySelectorAll('script[src="'+i+'"]'),s&&s.length>0){e(!0);return}const o=document.createElement("script");o.type="text/javascript",o.src=i,typeof r!="string"&&r!=null&&r.module&&(o.type="module"),o.onload=()=>{e(!0)},document.body.appendChild(o)})}function L(r){return!!(r&&r.nodeType&&r.nodeType==1)}const P=r=>r!==null&&typeof r=="object",A=r=>P(r)&&!Array.isArray(r),D={root:null,autoGallery:!0,setClickEvent:!0,dataAttributesPrefix:"",items:[],plugins:[],appearance:{slideEffect:"fade",openEffect:"zoom",moreText:"See more",moreLength:60,lightboxHTML:`<div id="gl-body" class="gl-lightbox gl-container" tabindex="0" role="dialog" aria-hidden="false">
            <div id="gl-slider" class="gl-slider"></div>
            <button class="gl-close gl-btn" aria-label="Close" tabindex="3" aria-hidden="false" data-glightbox-close-svg></button>
            <button class="gl-next gl-btn" aria-label="Next" tabindex="1" aria-hidden="false" data-glightbox-next-svg></button>
            <button class="gl-prev gl-btn" aria-label="Previous" tabindex="2" aria-hidden="false" data-glightbox-prev-svg></button>
            <div class="gl-overlay"></div>
        </div>`,slideHTML:"",svg:{close:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',next:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',prev:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>',loader:'<svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>'}},startAt:0,customDataAttributes:[],preload:!0,loop:!0,closeOnOutsideClick:!0};class z{constructor(e={}){var i;this.apiEvents=new Set,this.events=new Map,this.state=new Map,this.plugins=new Map,this.items=new Set,this.modal=null,this.prevButton=null,this.nextButton=null,this.overlay=null,this.slidesContainer=null,this.options=y(D,e);const t=window.matchMedia("(prefers-reduced-motion: reduce)");(!t||t.matches)&&((i=this.options.appearance)!=null&&i.slideEffect)&&(this.options.appearance.slideEffect=!1,this.options.appearance.openEffect=!1),this.init()}init(e=!0){if(e)for(const t of this.options.plugins)this.registerPlugin(t);this.options.setClickEvent&&this.events.set("gallery",w("click",{element:"*[data-glightbox]",callback:t=>{this.open(t)}}))}open(e){var i;if(this.state.get("open"))return;if(!this.plugins.has("slide"))throw new Error("No slide types registered");this.items.size===0&&L(e)&&this.setItemsFromNode(e);let t=this.options.startAt;this.options.autoGallery?typeof e=="number"?t=e:L(e)&&(t=this.getElementIndex(e)):t=0,this.state.set("focused",document.activeElement),this.build(),this.trigger("before_open"),this.initPlugins(),this.showSlide(t,!0),this.trigger("open"),this.state.set("open",!0),(i=this.modal)==null||i.focus(),p(document.body,"gl-open")}prevSlide(){this.goToSlide(this.getActiveSlideIndex()-1)}nextSlide(){this.goToSlide(this.getActiveSlideIndex()+1)}goToSlide(e=0){const t=this.getTotalSlides()-1;!this.options.loop&&(e<0||e>this.getTotalSlides()-1)||(e<0?e=t:e>t&&(e=0),this.showSlide(e))}async showSlide(e=0,t=!1){var h,a,d,u;const i=(h=this.slidesContainer)==null?void 0:h.querySelector(".current");i&&v(i,"current");const s=(a=this.slidesContainer)==null?void 0:a.querySelectorAll(".gl-slide")[e],o=s.querySelector(".gl-media");if(!s||!o)return;t||this.trigger("slide_before_change",{current:this.state.get("prevActiveSlideIndex"),next:e}),await this.preloadSlide(e,!t);const l=(d=this.options.appearance)==null?void 0:d.slideEffect,c=(u=this.options.appearance)==null?void 0:u.openEffect,n=l!=="slide"||t?"instant":"smooth";s.scrollIntoView({behavior:n,block:"start",inline:"start"}),v(o,"gl-animation-ended"),t&&c?(p(o,"gl-invisible"),c&&await k(o,`gl-${c}-in`),p(o,"gl-animation-ended"),v(o,`gl-invisible gl-${c}-in`)):v(o,"gl-invisible"),this.setActiveSlideState(s,e),this.trigger("slide_changed",{prev:this.state.get("prevActiveSlideIndex"),current:e}),this.options.preload&&(this.preloadSlide(e+1),this.preloadSlide(e-1))}setActiveSlideState(e,t){this.state.set("prevActiveSlide",this.state.get("activeSlide")??!1),this.state.set("prevActiveSlideIndex",this.getActiveSlideIndex()),this.state.set("activeSlide",e),this.state.set("activeSlideIndex",t),this.updateNavigationButtons()}async preloadSlide(e,t=!0){var n,h;if(e<0||e>this.items.size-1)return!1;const i=(n=this.slidesContainer)==null?void 0:n.querySelectorAll(".gl-slide")[e];if(i&&(C(i,"loaded")||C(i,"preloading")))return!0;const s=this.getSlideData(e),o=s==null?void 0:s.type,l=this.getRegisteredSlideType(o);let c="";if((!o||!l)&&(c=`Unable to handle URL: ${s==null?void 0:s.url}`),c)throw this.setSlideError(i,c),new Error(c);if(s!=null&&s.url&&l&&i&&(l!=null&&l.build)){p(i,"preloading");try{if(l!=null&&l.assets&&typeof(l==null?void 0:l.assets)=="function"){const d=l.assets();if(d){const u=(d==null?void 0:d.css)||[],x=(d==null?void 0:d.js)||[];await this.injectAssets([...u,...x])}}this.trigger("slide_before_load",s),await l.build({index:e,slide:i.querySelector(".gl-media"),config:{...s,isPreload:t}}),(h=i.querySelector(".gl-slide-loader"))==null||h.remove(),this.afterSlideLoaded(i);const a=i.querySelector(".gl-media");return a&&(p(a,`gl-type-${o}`),t&&v(a,"gl-invisible")),i}catch(a){this.afterSlideLoaded(i),this.setSlideError(i,a)}}return!1}build(){var l,c,n,h,a,d,u,x,E,I,M,B,q,T,N,j;if(this.state.get("build"))return;this.trigger("before_build");const e=document.body.querySelectorAll(":scope > *");e&&[...e].forEach(f=>{f.parentNode==document.body&&f.nodeName.charAt(0)!=="#"&&f.hasAttribute&&!f.hasAttribute("aria-hidden")&&(f.ariaHidden="true",f.dataset.glHidden="true")});const t=((l=this.options)==null?void 0:l.root)??document.body,i=((n=(c=this.options)==null?void 0:c.appearance)==null?void 0:n.lightboxHTML)??"";if(t.insertAdjacentHTML("beforeend",i),this.modal=document.getElementById("gl-body"),!this.modal)throw new Error("modal body not found");const s=this.modal.querySelector(".gl-close");if(this.prevButton=this.modal.querySelector(".gl-prev"),this.nextButton=this.modal.querySelector(".gl-next"),this.overlay=this.modal.querySelector(".gl-overlay"),this.slidesContainer=document.getElementById("gl-slider"),p(this.modal,"gl-theme-"+(((a=(h=this.options)==null?void 0:h.appearance)==null?void 0:a.theme)??"base")),p(this.modal,"gl-slide-effect-"+(((u=(d=this.options)==null?void 0:d.appearance)==null?void 0:u.slideEffect)||"none")),(E=(x=this.options)==null?void 0:x.appearance)!=null&&E.cssVariables)for(const[f,g]of Object.entries(this.options.appearance.cssVariables))this.modal.style.setProperty(`--gl-${f}`,g);s&&this.events.set("close",w("click",{element:s,callback:()=>this.close()})),this.nextButton&&this.events.set("next",w("click",{element:this.nextButton,callback:()=>this.nextSlide()})),this.prevButton&&this.events.set("prev",w("click",{element:this.prevButton,callback:()=>this.prevSlide()})),this.options.closeOnOutsideClick&&this.events.set("outClose",w("click",{element:this.modal,callback:(f,g)=>{var m;f&&(g!=null&&g.target)&&!((m=g==null?void 0:g.target)!=null&&m.closest(".gl-media"))&&(g.target.closest(".gl-btn")||this.close())}})),this.processVariables(this.modal),this.observer=new IntersectionObserver(f=>{f.forEach(g=>{var m;if(v(g.target,"visible"),g.isIntersecting&&this.state.get("open")){const b=parseInt(((m=g.target)==null?void 0:m.getAttribute("data-index"))??"0");p(g.target,"visible"),b!==this.state.get("activeSlideIndex")&&this.setActiveSlideState(g.target,b),!C(g.target,"loaded")&&!C(g.target,"preloading")&&(this.preloadSlide(b),this.preloadSlide(b+1),this.preloadSlide(b-1))}})},{root:this.modal,rootMargin:"0px",threshold:.2});let o=0;for(const f of this.items){const g=this.getRegisteredSlideType(f==null?void 0:f.type);if(f!=null&&f.url&&g){let m=(M=(I=this.options)==null?void 0:I.appearance)==null?void 0:M.slideHTML;const b=(T=(q=(B=this.options)==null?void 0:B.appearance)==null?void 0:q.svg)==null?void 0:T.loader;m||(m=`<div class="gl-slide" data-index="${o}" style="--gl-index: ${o}">
                        <div class="gl-slide-loader" role="status">
                            ${b}
                            <span class="gl-sr-only">Loading...</span>
                        </div>
                        <div class="gl-media gl-invisible">
                        </div>
                    </div>`),(N=this.slidesContainer)==null||N.insertAdjacentHTML("beforeend",m);const H=(j=this.slidesContainer)==null?void 0:j.querySelectorAll(".gl-slide")[o];H&&this.observer.observe(H),o++}}this.overlay&&p(this.overlay,"gl-overlay-in"),this.state.set("build",!0),this.trigger("build")}async close(){var s,o,l,c;if(!this.state.get("open")||!this.modal)return;this.runPluginsMethod("destroy"),v(document.body,"gl-open gl-crollbar-fixer");const e=document.querySelectorAll('*[data-gl-hidden="true"]');if(e&&e.forEach(n=>{n.ariaHidden="false",delete n.dataset.glHidden}),((s=this.options.appearance)==null?void 0:s.slideEffect)==="none")(o=this.modal.parentNode)==null||o.removeChild(this.modal);else{const h=this.state.get("activeSlide").querySelector(".gl-media"),a=(l=this.options.appearance)==null?void 0:l.openEffect;h&&(p(this.modal,"gl-closing"),a&&(v(h,"gl-animation-ended"),await k(h,`gl-${a}-out`))),(c=this.modal.parentNode)==null||c.removeChild(this.modal)}this.state.clear(),this.modal=null,this.prevButton=null,this.nextButton=null,this.clearAllEvents(),this.setItems([]);const t=document.querySelectorAll(".gl-css");t&&t.forEach(n=>{var h;return(h=n==null?void 0:n.parentNode)==null?void 0:h.removeChild(n)}),this.trigger("close");const i=this.state.get("focused");i==null||i.focus()}destroy(){this.close(),this.clearAllEvents(!0),this.observer.disconnect()}reload(){this.init(!1)}setItems(e){var i,s;if(!e||(this.items=new Set,!e.length))return;const t=this.plugins.get("slide");if(!t)throw new Error("No slide types registered");for(const o of e){if(o!=null&&o.type){if(!t.has(o.type))throw new Error(`Unknown slide type: ${o.type}`);continue}let l=!1;for(const[c,n]of t){if(n.name==="iframe"){l=n;continue}let h=!1;if(n!=null&&n.match&&n.match(o.url.toLowerCase())&&(o.type=c,h=!0),n!=null&&n.options&&typeof((i=n.options)==null?void 0:i.matchFn)=="function"&&(s=n.options)!=null&&s.matchFn(h,o.url.toLowerCase())&&(o.type=c,h=!0),h)break}o!=null&&o.type||l&&(o.type=l.name),this.getItems().add(o)}}setItemsFromNode(e){if(!this.options.autoGallery){this.setItems([this.parseConfigFromNode(e)]);return}let t="*[data-glightbox]";const i=e.getAttribute("data-glightbox");i&&(t=`*[data-glightbox="${i}"]`);const s=document.querySelectorAll(t);if(!s)return;const o=[];[...s].forEach(l=>{const c=this.parseConfigFromNode(l);o.push(c)}),this.setItems(o)}getSettings(){return this.options}getElementIndex(e){let t=0,i=0;for(const s of this.items){if((s==null?void 0:s.node)===e){t=i;break}i++}return t}getActiveSlide(){if(this.state.has("activeSlide"))return this.state.get("activeSlide")}getActiveSlideIndex(){return this.state.has("activeSlideIndex")?this.state.get("activeSlideIndex"):0}getTotalSlides(){return this.items.size}getItems(){return this.items}updateNavigationButtons(){if(this.items.size===1){this.modal&&p(this.modal,"gl-single-slide");return}if(!this.nextButton||!this.prevButton)return;const e=this.options.loop,t=this.getActiveSlideIndex(),i=this.getTotalSlides()-1;this.prevButton.disabled=!1,this.nextButton.disabled=!1,t===0&&!e?this.prevButton.disabled=!0:t===i&&!e&&(this.nextButton.disabled=!0)}setSlideError(e,t){var s;(s=e.querySelector(".gl-slide-loader"))==null||s.remove();const i=e.querySelector(".gl-media");i&&(p(i,"gl-load-error"),v(i,"gl-invisible"),i.innerHTML=`<div class="gl-error">${t}</div>`)}afterSlideLoaded(e){p(e,"loaded"),v(e,"preloading")}on(e,t,i=!1){if(!e||typeof t!="function")throw new TypeError("Event name and callback must be defined");this.apiEvents.add({evt:e,once:i,callback:t})}once(e,t){this.on(e,t,!0)}trigger(e,t=null){for(const i of this.apiEvents){const{evt:s,once:o,callback:l}=i;s===e&&(l(t),o&&this.apiEvents.delete(i))}}parseConfigFromNode(e){var l,c,n,h;const t={node:null,url:"",title:"",description:"",width:"",height:"",content:"",type:""};let i="";const s={url:"",type:""},o=e.nodeName.toLowerCase();o==="a"&&(i=e.getAttribute("href")||""),o==="img"&&(i=e.getAttribute("src")||""),o==="figure"&&(i=((l=e.querySelector("img"))==null?void 0:l.getAttribute("src"))||""),s.node=e,s.url=i;for(const a in t){let d="data";(c=this.options)!=null&&c.dataAttributesPrefix&&(d+=`-${(n=this.options)==null?void 0:n.dataAttributesPrefix}`);let u=e.getAttribute(`${d}-${a}`);u&&((u==="true"||u==="false")&&(u=u==="true"),s[a]=u)}if(!s.title){const a=e==null?void 0:e.getAttribute("title");a&&(s.title=a)}if(s!=null&&s.description&&s.description.startsWith(".")){const a=(h=document.querySelector(s.description))==null?void 0:h.innerHTML;a&&(s.description=a)}if(!s.description){const a=e.querySelector(".gl-inline-desc");a&&(s.description=a.innerHTML)}return s}getRegisteredSlideType(e){if(this.plugins.has("slide")){const t=this.plugins.get("slide");if(t&&t.has(e))return t.get(e)}return!1}getSlideData(e){return[...this.items][e]}processVariables(e){var i,s,o,l,c,n,h,a,d;const t={"current-slide":"","total-slides":"","close-svg":((o=(s=(i=this.options)==null?void 0:i.appearance)==null?void 0:s.svg)==null?void 0:o.close)??"","next-svg":((n=(c=(l=this.options)==null?void 0:l.appearance)==null?void 0:c.svg)==null?void 0:n.next)??"","prev-svg":((d=(a=(h=this.options)==null?void 0:h.appearance)==null?void 0:a.svg)==null?void 0:d.prev)??""};for(const[u,x]of Object.entries(t)){const E=e.querySelector(`*[data-glightbox-${u}]`);E&&(E.innerHTML=x)}}registerPlugin(e){this.plugins.has(e.type)||this.plugins.set(e.type,new Map);const t=this.plugins.get(e.type);e.instance=this,t==null||t.set(e.name,e)}initPlugins(){this.pluginsRunEach(e=>{if(typeof e.init=="function"&&e.init(),typeof e.cssStyle=="function"){const t=e==null?void 0:e.cssStyle();this.injectCSS(t)}})}runPluginsMethod(e){this.pluginsRunEach(t=>{if(typeof t[e]=="function"){const i=t[e];typeof i=="function"&&(i==null||i.apply(t))}})}pluginsRunEach(e){for(const[t,i]of this.plugins)for(const[s,o]of i)e(o)}injectCSS(e){if(!e)return;const t=document.createElement("style");t.type="text/css",t.className="gl-css",t.innerText=e,document.head.appendChild(t)}async injectAssets(e){typeof e=="string"&&(e=[e]),e.map(async t=>{let i=t;i=t,await $(i)})}clearAllEvents(e=!1){for(const[t,i]of this.events)!e&&t==="gallery"||(i==null||i.destroy(),this.events.delete(t));e&&this.events.clear(),this.apiEvents.clear()}}S.GLightbox=z,Object.defineProperty(S,Symbol.toStringTag,{value:"Module"})});