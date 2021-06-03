(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{16:function(e,c,t){},21:function(e,c,t){},22:function(e,c,t){},24:function(e,c,t){},25:function(e,c,t){},26:function(e,c,t){"use strict";t.r(c);var n=t(0),r=t.n(n),s=t(4),i=t.n(s),a=(t(16),t(7)),o=t(2),u=t(6),d="PI_XBTUSD",l="PI_XBTUSD",j="PI_ETHUSD",b={PI_XBTUSD:[.5,1,2.5],PI_ETHUSD:[.05,.1,.25]},O=Object(u.b)({name:"app",initialState:{active_currency:d,active_group:b.PI_XBTUSD[0],group_list:b.PI_XBTUSD,asks:{},bids:{}},reducers:{activateCurrency:function(e,c){e.active_currency=c.payload,e.group_list=b[c.payload],e.active_group=b[c.payload][0]},activateGroup:function(e,c){e.active_group=c.payload},resetOrderBook:function(e,c){e.asks={},e.bids={}},updateOrders:function(e,c){var t=function(e,c){for(var t=0;t<c.length;t++){var n=c[t][0],r=c[t][1],s=(100*n).toString();0!==r?e[s]={price:c[t][0],size:r}:delete e[s]}};t(e.bids,c.payload.bids),t(e.asks,c.payload.asks)}}}),p=Object(u.a)({reducer:O.reducer}),h=O.actions,v=(h.activateGroup,h.activateCurrency),f=h.updateOrders,x=h.resetOrderBook,m=(t(21),t(11)),_=(t(22),t(1));var k=function(){var e=Object(o.c)((function(e){return e.bids})),c=Object(o.c)((function(e){return e.asks})),t=function(e,c){var t=[],n=0,r=Object.keys(e);r.sort((function(e,c){return parseInt(c)-parseInt(e)}));var s=parseInt(r.slice(0,20).reduce((function(c,t,n){return"".concat(parseInt(c)+e[t].size)}),"0"));if(r.length<20)return t;for(var i=0;i<20;i++){var a=e[r[i]].size,o=e[r[i]].price,u=n+a;n=u;var d=Math.round(u/s*100);t.push({price:o,size:a,total:u,percentage:d})}return c?Object(m.a)(t.reverse()):t};return Object(_.jsxs)("div",{className:"book_container",children:[Object(_.jsxs)("div",{className:"order_section bids",children:[Object(_.jsxs)("ul",{className:"header",children:[Object(_.jsx)("li",{children:"TOTAL"}),Object(_.jsx)("li",{children:"SIZE"}),Object(_.jsx)("li",{children:"PRICE"})]}),Object(_.jsx)("ul",{className:"order_book",children:t(e,!1).map((function(e,c){return Object(_.jsxs)("li",{className:"bg-green-".concat(e.percentage),children:[Object(_.jsx)("span",{children:e.total}),Object(_.jsx)("span",{children:e.size}),Object(_.jsx)("span",{className:"price",children:e.price})]},c)}))})]}),Object(_.jsxs)("div",{className:"order_section asks",children:[Object(_.jsxs)("ul",{className:"header",children:[Object(_.jsx)("li",{children:"PRICE"}),Object(_.jsx)("li",{children:"SIZE"}),Object(_.jsx)("li",{children:"TOTAL"})]}),Object(_.jsx)("ul",{className:"order_book",children:t(c,!0).map((function(e,c){return Object(_.jsxs)("li",{className:"bg-red-".concat(e.percentage),children:[Object(_.jsx)("span",{className:"price",children:e.price}),Object(_.jsx)("span",{children:e.size}),Object(_.jsx)("span",{children:e.total})]},c)}))})]})]})};t(24);var g=function(){var e=Object(o.c)((function(e){return e.active_currency})),c=Object(o.c)((function(e){return e.active_group}));return Object(_.jsxs)("div",{className:"header",children:[Object(_.jsxs)("h1",{children:["Order Book: Active Currency: ",e]}),Object(_.jsx)("select",{children:Object(_.jsx)("option",{children:c})})]})};t(25);var y=function(){var e=Object(o.b)(),c=Object(o.c)((function(e){return e.active_currency})),t=function(){e(v(c===l?j:l))};return Object(_.jsxs)("div",{className:"bottom",children:[Object(_.jsx)("button",{className:"pink",onClick:function(){t()},children:"Toggle Feed"}),Object(_.jsx)("button",{className:"red",onClick:function(){t()},children:"Kill Feed"})]})};var N=function(){var e=Object(n.useState)(new WebSocket("wss://www.cryptofacilities.com/ws/v1")),c=Object(a.a)(e,1)[0],t=Object(n.useState)(),r=Object(a.a)(t,2),s=r[0],i=r[1],u=Object(n.useState)(!1),d=Object(a.a)(u,2),l=d[0],j=d[1],b=Object(o.c)((function(e){return e.active_currency})),O=Object(o.b)();return Object(n.useEffect)((function(){l||(s&&s!==b&&(j(!0),c.send('{"event":"unsubscribe","feed":"book_ui_1","product_ids":["'.concat(s,'"]}')),setTimeout((function(){O(x(null)),c.send('{"event":"subscribe","feed":"book_ui_1","product_ids":["'.concat(b,'"]}')),i(b),j(!1)}),1e3)),c.onopen=function(e){c.send('{"event":"subscribe","feed":"book_ui_1","product_ids":["'.concat(b,'"]}')),i(b)},c.onmessage=function(e){var c=JSON.parse(e.data);c.bids&&c.asks&&O(f(c))})}),[b,c,s,O,l]),Object(_.jsxs)("div",{className:"application",children:[Object(_.jsx)(g,{}),Object(_.jsx)(k,{}),Object(_.jsx)(y,{})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(_.jsx)(r.a.StrictMode,{children:Object(_.jsx)(o.a,{store:p,children:Object(_.jsx)(N,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,2]]]);
//# sourceMappingURL=main.8bcb3e27.chunk.js.map