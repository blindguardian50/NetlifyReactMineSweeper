(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){"use strict";t.r(n);var o,l,a=t(0),u=t(1),c=t.n(u),r=t(5),i=t.n(r),s=(t(12),t(6)),v=(t(2),function(e){return Object(a.jsx)("div",{className:"GameBody",children:e.cells})}),b=function(e){return Object(a.jsx)("div",{className:"NumberDisplay",children:e.value.toString().padStart(3,"0")})},d=function(){return Object(a.jsx)("div",{className:"Face",children:Object(a.jsx)("span",{children:"\ud83d\ude4a"})})},j=function(){return Object(a.jsxs)("div",{className:"GameHeader",children:[Object(a.jsx)(b,{value:0}),Object(a.jsx)(d,{}),Object(a.jsx)(b,{value:99})]})},f=t(4);!function(e){e[e.none=0]="none",e[e.one=1]="one",e[e.two=2]="two",e[e.three=3]="three",e[e.four=4]="four",e[e.five=5]="five",e[e.six=6]="six",e[e.seven=7]="seven",e[e.eight=8]="eight",e[e.bomb=9]="bomb"}(o||(o={})),function(e){e[e.closed=0]="closed",e[e.opened=1]="opened",e[e.flagged=2]="flagged"}(l||(l={}));var m=function(){var e=[];return e=function(e){for(var n=0;n<9;n++)for(var t=0;t<9;t++){e[n][t].value!==o.bomb&&(e=h(e,n,t))}return e}(e=function(e){var n=0,t=function(){var t=Math.floor(9*Math.random()),l=Math.floor(9*Math.random());e[t][l].value!==o.bomb&&(e=e.map((function(e,n){return e.map((function(e,a){return n===t&&a===l?Object(f.a)(Object(f.a)({},e),{},{value:o.bomb}):e}))})),n++)};for(;n<10;)t();return e}(e=function(e){for(var n=0;n<9;n++){e.push([]);for(var t=0;t<9;t++)e[n].push({value:o.none,state:l.opened})}return e}(e)))};function h(e,n,t){var l=n>0&&t>0?e[n-1][t-1]:null,a=n>0?e[n-1][t]:null,u=n>0&&t<8?e[n-1][t+1]:null,c=t>0?e[n][t-1]:null,r=t<8?e[n][t+1]:null,i=n<8&&t>0?e[n+1][t+1]:null,s=n<8?e[n+1][t]:null,v=n<8&&t<8?e[n+1][t-1]:null,b=0;return(null===l||void 0===l?void 0:l.value)===o.bomb&&b++,(null===a||void 0===a?void 0:a.value)===o.bomb&&b++,(null===u||void 0===u?void 0:u.value)===o.bomb&&b++,(null===c||void 0===c?void 0:c.value)===o.bomb&&b++,(null===r||void 0===r?void 0:r.value)===o.bomb&&b++,(null===i||void 0===i?void 0:i.value)===o.bomb&&b++,(null===s||void 0===s?void 0:s.value)===o.bomb&&b++,(null===v||void 0===v?void 0:v.value)===o.bomb&&b++,e[n][t].value=b,e}var p=function(e){return Object(a.jsx)("div",{className:"BoardButton \n      ".concat(e.state===l.opened?"visible":""," \n      value-").concat(e.value),children:e.state===l.opened?e.value===o.bomb?Object(a.jsx)("span",{children:"\ud83d\udca3"}):e.value===o.none?null:e.value:e.state===l.flagged?Object(a.jsx)("span",{children:"\ud83d\udea9"}):null})},O=function(){var e=Object(u.useState)(m),n=Object(s.a)(e,2),t=n[0];n[1];return console.log("cells",t),Object(a.jsxs)("div",{className:"Game",children:[Object(a.jsx)(j,{}),Object(a.jsx)(v,{cells:t.map((function(e,n){return e.map((function(e,t){return Object(a.jsx)(p,{row:n,col:t,state:e.state,value:e.value},"".concat(n,"-").concat(t))}))}))})]})};i.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(O,{})}),document.getElementById("root"))},2:function(e,n,t){}},[[13,1,2]]]);
//# sourceMappingURL=main.c1640da6.chunk.js.map