!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a),a.register("kMC0W",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return n.default(e)};var r,n=(r=a("8NIkP"))&&r.__esModule?r:{default:r}})),a.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}})),a.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),a.register("8CtQK",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),a.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return n.default(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n.default(e,t)};var r,n=(r=a("8NIkP"))&&r.__esModule?r:{default:r}}));var o=document.querySelector(".switch-checkbox"),c=document.querySelector("body"),l=document.querySelector(".theme__dark"),i=document.querySelector(".theme__light");o.addEventListener("click",(function(){c.classList.toggle("darkMode"),l.classList.toggle("opacityForDark"),i.classList.toggle("opacityForDark"),"dark"!==localStorage.getItem("theme")?localStorage.setItem("theme","dark"):localStorage.removeItem("theme")})),function(){try{"dark"===localStorage.getItem("theme")&&(c.classList.add("darkMode"),o.checked=!0)}catch(e){}}();var s={};Object.defineProperty(s,"__esModule",{value:!0}),s.default=function(e){return d.default(e)||u.default(e)||p.default(e)||f.default()};var d=g(a("kMC0W")),u=g(a("7AJDX")),f=g(a("8CtQK")),p=g(a("auk6i"));function g(e){return e&&e.__esModule?e:{default:e}}var m,v=document.querySelector(".days"),h=document.querySelector(".current-date"),y=document.querySelectorAll(".calendar-icons span"),w=new Date,_=(w.getDate(),w.getMonth()),S=w.getFullYear();(m={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtn:document.querySelector("body"),modal:document.querySelector("[data-modal]"),input:document.querySelector(".calendar-input"),arrow:document.querySelector(".calendar__button-arrow"),calendarBtn:document.querySelector(".calendar__button-calendar")}).openModalBtn.addEventListener("click",(function(){m.modal.classList.toggle("is-hidden-wrapper"),m.input.classList.toggle("isActive"),m.arrow.classList.toggle("switched"),m.calendarBtn.classList.toggle("switchedColor")})),document.addEventListener("click",(function(e){document.getElementById("input-picker").value,e.target.closest(".calendar-form")||m.input.classList.contains("isActive")&&(m.modal.classList.add("is-hidden-wrapper"),m.input.classList.remove("isActive"),m.arrow.classList.remove("switched"),m.calendarBtn.classList.remove("switchedColor"),document.getElementById("input-picker").value="",localStorage.removeItem("VALUE"),localStorage.removeItem("date"))}));var b=["January","February","March","April","May","June","July","August","September","October","November","December"],L=function(t){for(var r=new Date(S,_,1).getDay(),n=new Date(S,_+1,0).getDate(),a=new Date(S,_,n).getDay(),o=new Date(S,_,0).getDate(),c="",l=r;l>0;l--)c+='<li class="inactive">'.concat(o-l+1,"</li>");for(var i=1;i<=n;i++){var d=i===w.getDate()&&_===(new Date).getMonth()&&S===(new Date).getFullYear();c+='<li class="'.concat(d,'">').concat(i,"</li>")}for(var u=a;u<6;u++)c+='<li class="inactive">'.concat(u-a+1,"</li>");h.innerText="".concat(b[_]," ").concat(S),v.innerHTML=c,document.querySelector(".days").addEventListener("click",(function(t){e(s)(t.currentTarget.children).forEach((function(e){e.classList.remove("active")})),t.target.classList.add("active");var r=t.target.textContent;if(!(t.target.textContent.length>10)){var n=(_+1).toString();document.getElementById("input-picker").value=S+"/"+n.padStart(2,"0")+"/"+r.padStart(2,"0"),localStorage.setItem("VALUE",JSON.stringify(r));var a=document.querySelector(".calendar-input").value;localStorage.setItem("date",JSON.stringify(a)),document.querySelector("[data-modal]").classList.add("is-hidden-wrapper"),document.querySelector(".calendar-input").classList.remove("isActive"),document.querySelector(".calendar__button-arrow").classList.remove("switched"),document.querySelector(".calendar__button-calendar").classList.remove("switchedColor")}}))};L();document.querySelector(".days");y.forEach((function(e){e.addEventListener("click",(function(){(_="prev"===e.id?_-1:_+1)<0||_>11?(w=new Date(S,_,(new Date).getDate()),S=w.getFullYear(),_=w.getMonth()):w=new Date,L();var t=JSON.parse(localStorage.getItem("VALUE"));v.childNodes.forEach((function(e){e.textContent===t&&e.classList.add("active")}))}))})),localStorage.removeItem("VALUE"),localStorage.removeItem("date"),document.querySelector(".category__others-container").addEventListener("click",(function(e){e.currentTarget.classList.toggle("is-open")}));var k=document.querySelector(".list-news");function M(e,t){return fetch("https://api.openweathermap.org/data/2.5/weather?appid=".concat("03c5762bdc5b910c3c4c3d1ef326933c","&lat=").concat(e,"&lon=").concat(t)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}function D(e,t){var r=e.weather,n=e.main.temp,a=e.name,o=(n/100).toFixed(1),c=(new Date).toDateString(),l=c.slice(0,4),i=c.slice(4,c.length),s='<li class="weather list-news__item">\n        <div class="weather__info">\n        <span class="weather__temp">'.concat(o,'&#176;</span>\n        <div>\n        <span class="weather__descr">').concat(r[0].main,'</span>\n        <div class="weather__city">\n        <svg viewBox="0 0 37 32">\n        <path\n        d="M12.164 0.881c-6.557 0.008-11.871 5.321-11.88 11.878v0.001c0 0.005 0 0.012 0 0.018 0 2.685 0.9 5.16 2.414 7.14l-0.021-0.028s0.324 0.426 0.376 0.486l9.11 10.747 9.114-10.749c0.047-0.058 0.372-0.483 0.372-0.483l0.001-0.004c1.494-1.951 2.394-4.425 2.394-7.11 0-0.005 0-0.010 0-0.015v0.001c-0.007-6.559-5.322-11.874-11.88-11.881h-0.001zM12.164 17.080c-2.386 0-4.321-1.934-4.321-4.321s1.934-4.321 4.321-4.321v0c2.386 0 4.32 1.934 4.32 4.32s-1.934 4.32-4.32 4.32v0z">\n        </path>\n        </svg>\n        <span>').concat(a,'</span>\n        </div>\n        </div>\n        </div>\n        <img class="weather__img" src="https://openweathermap.org/img/wn/').concat(r[0].icon,'@4x.png" alt="Weather icon">\n        <div class="weather__date">\n        <p>').concat(l,"</p>\n        <p>").concat(i,'</p>\n        </div>\n        <a class="weather__link" href="https://ua.sinoptik.ua/" target="_blank" rel="noreferrer noopener">weather for week</a>\n        </li>');t.insertAdjacentHTML("afterbegin",s)}window.navigator.geolocation.getCurrentPosition((function(e){var t=e.coords.latitude,r=e.coords.longitude;M(t,r).then((function(e){D(e,k)})).catch((function(e){return console.log(e)}))}),(function(e){M(50.4333,30.5167).then((function(e){D(e,k)}))}))}();
//# sourceMappingURL=index.931fd2c8.js.map
