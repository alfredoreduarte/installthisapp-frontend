webpackJsonp([4],{47:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(10),i=r(14),o=function(e){var t=e.checksum,r=e.type;return u["default"].createElement("ul",{className:"list-unstyled"},u["default"].createElement("li",null,u["default"].createElement(i.Link,{to:"/d/apps/"+r+"/"+t+"/questions",activeClassName:"active"},"Questions")),u["default"].createElement("li",null,u["default"].createElement(i.Link,{to:"/d/apps/"+r+"/"+t+"/answers",activeClassName:"active"},"Answers")))},c=function(e,t){return{checksum:t.params.checksum,type:t.params.type}};t["default"]=(0,l.connect)(c)(o)},56:function(e,t,r){function n(e){return r(a(e))}function a(e){return u[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var u={"./top_fans/sidebar":59,"./trivia/sidebar":47};n.keys=function(){return Object.keys(u)},n.resolve=a,e.exports=n,n.id=56},58:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(167),i=n(l),o=r(92),c=(n(o),r(91)),s=n(c),f=function(e){var t=e.name,r=e.small,n=e.identifier;return u["default"].createElement("div",{className:"media ita-user "+(r?"ita-user-small":"")},u["default"].createElement("div",{className:"media-left media-middle"},u["default"].createElement("a",{href:"javascript:void(0)"},u["default"].createElement(s["default"],{className:"media-object img-circle",identifier:n}))),u["default"].createElement("div",{className:"media-body media-middle"},u["default"].createElement("a",{href:"javascript:void(0)",className:"media-heading text-relevant-title weight-normal "+(r?"h5":"h4")},t),r?null:u["default"].createElement("p",null,u["default"].createElement("a",{href:"mailto:fdsa"},u["default"].createElement("small",null,"email"))),r?null:u["default"].createElement("p",null,u["default"].createElement("a",{href:"https://facebook.com/fdsa",target:"_blank"},u["default"].createElement("small",null,"fb.com/fdsa"))),r?null:u["default"].createElement("p",null,u["default"].createElement("small",null,u["default"].createElement(i["default"],{date:Date.now()})))))};t["default"]=f},59:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(10),i=r(14),o=function(e){var t=e.checksum,r=e.type;return u["default"].createElement("ul",{className:"list-unstyled"},u["default"].createElement("li",null,u["default"].createElement(i.Link,{to:"/apps/"+r+"/"+t+"/scores",activeClassName:"active"},"Scores")))},c=function(e,t){return{checksum:t.params.checksum,type:t.params.type}};t["default"]=(0,l.connect)(c)(o)},74:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getCurrentUsersByKeyword=t.getUsersForCurrentApp=void 0;var a=r(19),u=n(a),l=r(55),i=r(132),o=r(73),c=function(e){return e.entities.users},s=function(e){return e.filterText},f=function(e){return e.usersSorting},d=function(e,t,r){var n=u["default"].filter(e,function(e){return u["default"].includes(t.users,e.id)});return u["default"].sortBy(n,r)},m=function(e,t){return e.filter(function(e){return(0,i.stringContains)(e.name,t)})},p=t.getUsersForCurrentApp=(0,l.createSelector)(c,o.getCurrentApp,f,d);t.getCurrentUsersByKeyword=(0,l.createSelector)(p,s,m)},167:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){var r=[],n=!0,a=!1,u=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(o){a=!0,u=o}finally{try{!n&&i["return"]&&i["return"]()}finally{if(a)throw u}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(1),d=n(f),m=60,p=60*m,v=24*p,h=7*v,y=30*v,b=365*v,E=function(e){function t(){var e,r,n,a;u(this,t);for(var i=arguments.length,o=Array(i),c=0;c<i;c++)o[c]=arguments[c];return r=n=l(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),n.isStillMounted=!1,n.tick=function(e){if(n.isStillMounted&&n.props.live){var t=new Date(n.props.date).valueOf(),r=Date.now(),a=Math.round(Math.abs(r-t)/1e3),u=a<m?1e3:a<p?1e3*m:a<v?1e3*p:0,l=Math.min(Math.max(u,1e3*n.props.minPeriod),1e3*n.props.maxPeriod);l&&(n.timeoutId=setTimeout(n.tick,l)),e||n.forceUpdate()}},a=r,l(n,a)}return i(t,e),s(t,[{key:"componentDidMount",value:function(){this.isStillMounted=!0,this.props.live&&this.tick(!0)}},{key:"componentDidUpdate",value:function(e){this.props.live===e.live&&this.props.date===e.date||(!this.props.live&&this.timeoutId&&clearTimeout(this.timeoutId),this.tick())}},{key:"componentWillUnmount",value:function(){this.isStillMounted=!1,this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}},{key:"render",value:function(){var e=this.props,t=e.date,r=(e.formatter,e.component),n=(e.live,e.minPeriod,e.maxPeriod,e.title),u=a(e,["date","formatter","component","live","minPeriod","maxPeriod","title"]),l=new Date(t).valueOf(),i=Date.now(),s=Math.round(Math.abs(i-l)/1e3),f=l<i?"ago":"from now",E=s<m?[Math.round(s),"second"]:s<p?[Math.round(s/m),"minute"]:s<v?[Math.round(s/p),"hour"]:s<h?[Math.round(s/v),"day"]:s<y?[Math.round(s/h),"week"]:s<b?[Math.round(s/y),"month"]:[Math.round(s/b),"year"],_=c(E,2),M=_[0],w=_[1],O=n||"string"==typeof t?t:new Date(t).toISOString().substr(0,16).replace("T"," ");return"time"===r&&Object.assign(u,{dateTime:new Date(t).toISOString()}),d["default"].createElement(r,o({},u,{title:O}),this.props.formatter(M,w,f,l))}}]),t}(f.Component);E.displayName="TimeAgo",E.defaultProps={live:!0,component:"time",minPeriod:0,maxPeriod:1/0,formatter:function(e,t,r){return 1!==e&&(t+="s"),e+" "+t+" "+r}},t["default"]=E},194:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(92),i=n(l),o=[999,12,234,23],c=function(e){var t=e.value;return u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("h2",{className:"ita-stats-summary-number text-center"},t),u["default"].createElement("p",{className:"text-gray-light text-center"},u["default"].createElement(i["default"],{active:!0}),"Dataset name"))},s=function(){return u["default"].createElement("div",{className:"row"},u["default"].createElement("div",{className:"col-md-12"},u["default"].createElement("div",{className:"row"},o.map(function(e){return u["default"].createElement(c,{key:"sum"+e,value:e})}))),u["default"].createElement("hr",null))};t["default"]=s},476:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(194),i=(n(l),r(58)),o=n(i),c=function(e){var t=e.users;return u["default"].createElement("div",null,u["default"].createElement("h3",{className:"ita-section-title"},"Latest Users"),t.map(function(e){return u["default"].createElement("div",{className:"col-md-2",key:e.id},u["default"].createElement(o["default"],{name:e.firstName,identifier:e.identifier,small:!0}))}))};t["default"]=c},486:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),l=r(19),i=n(l),o=r(10),c=r(74),s=r(194),f=n(s),d=r(476),m=n(d),p=function(e){var t=e.users;return u["default"].createElement("div",{className:""},u["default"].createElement(f["default"],null),u["default"].createElement(m["default"],{users:t}))},v=function(e,t){return{users:i["default"].values((0,c.getUsersForCurrentApp)(e,t))}};t["default"]=(0,o.connect)(v)(p)}});
//# sourceMappingURL=4.chunk.js.map