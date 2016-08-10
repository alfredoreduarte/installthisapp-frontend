webpackJsonp([7],{0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(1),i=o(r),u=n(21),a=n(14),s=n(24),c=n(459),l=o(c),f=n(467),d=o(f);n(446);var p=(0,d["default"])(),h=(0,s.syncHistoryWithStore)(a.browserHistory,p);(0,u.render)(i["default"].createElement(l["default"],{store:p,history:h}),document.getElementById("root"))},129:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function i(){return{type:"COUNTDOWN_PROGRESS"}}function u(){return{type:"TOGGLE_ACTIVITY_INDICATOR"}}function a(){return{type:"TOGGLE_COUNTDOWN"}}function s(e){return{type:"ANSWER_QUESTION",id:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.postAnswers=t.saveAnswer=t.fetchEntities=t.setChecksum=t.receiveGameSettings=t.receiveEntities=void 0,t.advanceCountDown=i,t.toggleActivityIndicator=u,t.toggleCountDown=a,t.answerQuestion=s,n(37);var c=n(38),l=n(24),f=n(465),d=r(f),p=n(42),h=(r(p),n(77)),y=o(h),v=t.receiveEntities=function(e){return{type:"RECEIVE_ENTITIES",response:{entities:e}}},m=t.receiveGameSettings=function(e){return{type:"RECEIVE_SETTINGS",settings:e}};t.setChecksum=function(e){return{type:"SET_CHECKSUM",checksum:e}},t.fetchEntities=function(e){var t="https://local.installthisapp.com/"+e+"/canvas_entities.json";return function(e){return fetch(t,{method:"GET",headers:{Authorization:'Token token="'+window.canvasApiKey+'"'}}).then(function(e){return e.json()}).then(function(t){if("ok"==t.status){var n=y["default"].camelizeKeys(t),o=(0,c.normalize)(n,d.entities);e(v(o.entities)),e(m(n.settings)),e(u()),e(a())}else console.log("already answered all questions"),e((0,l.push)("/"+window.canvasId+"/"+window.checksum+"/already-played"))})["catch"](function(e){return console.log("parsing failed",e)})}},t.saveAnswer=function(e,t,n){return{type:"SAVE_ANSWER",payload:{questionId:e,optionId:t,correct:n}}},t.postAnswers=function(){return function(e,t){var n={answers:t().answers},o=t().settings.checksum,r="https://local.installthisapp.com/"+o+"/save.json";return fetch(r,{method:"POST",headers:{Authorization:'Token token="'+window.canvasApiKey+'"',Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(e){return e.json()}).then(function(e){console.log("answers posted and received",e)})["catch"](function(e){return console.log("parsing failed",e)})}}},451:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=function(){return i["default"].createElement("div",{className:"col-sm-12"},i["default"].createElement("h1",{className:"text-center",style:{color:"white",marginTop:"50px"}},"Thanks!"),i["default"].createElement("h4",{className:"text-center",style:{color:"white"}},"You've answered all available questions"))};t["default"]=u},452:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=function(e){var t=e.time;return i["default"].createElement("div",null,i["default"].createElement("h1",{className:"ita-cali-countdown-text"},i["default"].createElement("span",null,t)))};t["default"]=u},453:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(1),c=o(s),l=n(10),f=n(24),d=n(452),p=o(d),h=n(457),y=o(h),v=n(456),m=o(v),w=n(129),g=n(466),b=function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.countDownRunning,n=e.time,o=e.toggleCountDown,r=e.question,i=e.goToAlreadyPlayed,u=e.loading,a=setInterval(function(){return!!t&&void(n>0||(o(),clearInterval(a)))},1e3);null!=r||u||(console.log("ALREADY PLAYED"),i())}},{key:"componentWillReceiveProps",value:function(e){console.log("nextProps"),console.log(e),e.finished?this.props.goToThanks():null!=e.question||e.loading||(console.log("ALREADY PLAYED"),e.goToAlreadyPlayed())}},{key:"render",value:function(){var e=this.props,t=e.time,n=e.question,o=e.loading,r=e.saveAnswer;return c["default"].createElement("div",{className:"col-sm-12"},o||null==n?c["default"].createElement("h1",{className:"text-center",style:{color:"white"}},"Loading"):c["default"].createElement("div",null,c["default"].createElement(p["default"],{time:t}),c["default"].createElement(y["default"],{text:n.text}),c["default"].createElement(m["default"],{options:n.options,handleClick:function(e,t){return r(n.id,e,t)}})))}}]),t}(s.Component),_=function(e,t){return{time:e.settings.timeOut,countDownRunning:e.settings.countDownRunning,finished:Object.keys(e.entities.questions).length==e.answeredQuestions.length,question:(0,g.getQuestionWithOptions)(e),loading:e.settings.isFetching}},E=function(e,t){return{startCounter:function(){return e((0,w.advanceCountDown)())},toggleCountDown:function(){return e((0,w.toggleCountDown)())},saveAnswer:function(t,n,o){e((0,w.saveAnswer)(t,n,o)),e((0,w.answerQuestion)(t))},goToThanks:function(){e((0,w.postAnswers)()),e((0,f.push)("/"+window.canvasId+"/"+window.checksum+"/thanks"))},goToAlreadyPlayed:function(){e((0,f.push)("/"+window.canvasId+"/"+window.checksum+"/already-played"))}}};t["default"]=(0,l.connect)(_,E)(b)},454:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(1),c=o(s),l=n(10),f=n(372),d=o(f),p=n(24),h=n(51),y=(o(h),n(129));n(37);var v=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={logging:!1},n.digestFacebookResponse=n.digestFacebookResponse.bind(n),n}return u(t,e),a(t,[{key:"componentDidMount",value:function(){}},{key:"digestFacebookResponse",value:function(e){this.setState({logging:!0}),this.props.digestFacebookResponse(e)}},{key:"render",value:function(){var e=this,t=this.props,n=(t.digestFacebookResponse,t.title);return c["default"].createElement("div",{className:"text-center"},c["default"].createElement("div",{style:{position:"absolute",top:"20%",left:"50%",transform:"translate(-50%)"}},c["default"].createElement("h1",{className:"text-center",style:{color:"white"}},n),this.state.logging?c["default"].createElement("button",{className:"btn btn-primary btn-lg",disabled:!0},"Please wait..."):c["default"].createElement(d["default"],{appId:window.appId,cssClass:"btn btn-primary btn-lg",autoLoad:!0,textButton:"Sign In",callback:function(t){return e.digestFacebookResponse(t)}})))}}]),t}(s.Component),m=function(e,t){return{title:e.settings.applicationTitle}},w=function(e,t){return{digestFacebookResponse:function(t){t.signedRequest?fetch("https://local.installthisapp.com/users.json",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({signed_request:t.signedRequest,checksum:window.checksum})}).then(function(e){return e.text()}).then(function(t){window.canvasApiKey=t,e((0,p.push)("/"+window.canvasId+"/"+window.checksum)),e((0,y.fetchEntities)(window.checksum))})["catch"](function(e){console.log("Login: parsing failed",e)}):console.log("response",t)}}};t["default"]=(0,l.connect)(m,w)(v)},455:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=function(e){var t=(e.id,e.text),n=e.handleClick,o=e.correct;return i["default"].createElement("a",{className:"list-group-item ita-cali-option-block",onClick:function(){return n()}},i["default"].createElement("i",{className:"h4 ita-checkbox-icon animated zoomIn"}),i["default"].createElement("h4",{className:"list-group-item-heading"},t," ",o?"correcto":"incorrecto"))};t["default"]=u},456:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=n(455),a=o(u),s=function(e){var t=e.options,n=e.handleClick;return i["default"].createElement("div",{className:"list-group"},t.map(function(e){return i["default"].createElement(a["default"],{key:e.id,id:e.id,text:e.text,correct:e.correct,handleClick:function(){return n(e.id,e.correct)}})}))};t["default"]=s},457:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=function(e){var t=e.text;return i["default"].createElement("div",null,i["default"].createElement("h4",{className:"ita-cali-question-text"},i["default"].createElement("span",{className:""},t)))};t["default"]=u},458:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=o(r),u=function(){return i["default"].createElement("div",{className:"col-sm-12"},i["default"].createElement("h1",{className:"text-center",style:{color:"white"}},"Thanks for playing"))};t["default"]=u},459:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(1),c=o(s),l=n(10),f=n(14),d=n(129),p=n(453),h=o(p),y=n(454),v=o(y),m=n(458),w=o(m),g=n(451),b=o(g),_=function(e,t){window.canvasApiKey||t({pathname:"/"+window.canvasId+"/"+window.checksum+"/login"})},E=function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e((0,d.setChecksum)(window.checksum))}},{key:"render",value:function(){var e=this.props,t=e.store,n=e.history;return c["default"].createElement(l.Provider,{store:t},c["default"].createElement(f.Router,{history:n},c["default"].createElement(f.Route,{path:"/"+window.canvasId+"(/:checksum)",onEnter:_,component:h["default"]}),c["default"].createElement(f.Route,{path:"/"+window.canvasId+"/:checksum/thanks",component:w["default"]}),c["default"].createElement(f.Route,{path:"/"+window.canvasId+"/:checksum/already-played",component:b["default"]}),c["default"].createElement(f.Route,{path:"/"+window.canvasId+"/:checksum/login",component:v["default"]})))}}]),t}(s.Component);E.propTypes={store:s.PropTypes.object.isRequired,history:s.PropTypes.object.isRequired},t["default"]=(0,l.connect)()(E)},460:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];switch(t.type){case"ANSWER_QUESTION":var n=e;return n.push(t.id),n;default:return e}};t["default"]=n},461:function(e,t){"use strict";function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e=arguments.length<=0||void 0===arguments[0]?{correct:0,incorrect:0,details:{}}:arguments[0],t=arguments[1];switch(t.type){case"SAVE_ANSWER":var o=t.payload,r=o.questionId,i=o.optionId,u=o.correct,a=u?e.correct+1:e.correct,s=u?e.incorrect:e.incorrect+1,c=u?1:0,l=Object.assign({},e.details,n({},r,[i,c]));return{correct:a,incorrect:s,details:l};default:return e}};t["default"]=o},462:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(17),i=o(r),u=function(){var e=arguments.length<=0||void 0===arguments[0]?{questions:{},options:{}}:arguments[0],t=arguments[1];switch(t.type){case"RECEIVE_ENTITIES":return i["default"].merge({},e,t.response.entities);default:return e}};t["default"]=u},463:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(73),i=n(24),u=n(462),a=o(u),s=n(460),c=o(s),l=n(461),f=o(l),d=n(464),p=o(d),h=function(e){return(0,r.combineReducers)({routing:i.routerReducer,entities:a["default"],answeredQuestions:c["default"],answers:f["default"],settings:p["default"]})};t["default"]=h},464:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(17),i=o(r),u=function(){var e=arguments.length<=0||void 0===arguments[0]?{checksum:null,timeOut:9999,order:"ASC",countDownRunning:!1,isFetching:!0}:arguments[0],t=arguments[1];switch(t.type){case"SET_CHECKSUM":return Object.assign({},e,{checksum:t.checksum});case"RECEIVE_SETTINGS":return i["default"].merge({},e,t.settings);case"COUNTDOWN_PROGRESS":return Object.assign({},e,{timeOut:e.timeOut-1});case"TOGGLE_ACTIVITY_INDICATOR":return Object.assign({},e,{isFetching:!e.isFetching});case"TOGGLE_COUNTDOWN":return Object.assign({},e,{countDownRunning:!e.countDownRunning});default:return e}};t["default"]=u},465:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.entities=t.option=t.question=void 0;var o=n(38),r=t.question=new o.Schema("questions"),i=t.option=new o.Schema("options");r.define({options:(0,o.arrayOf)(i)});t.entities={questions:(0,o.arrayOf)(r),options:(0,o.arrayOf)(i)}},466:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getQuestionWithOptions=void 0;var r=n(17),i=o(r),u=n(48),a=function(e){return i["default"].values(e.entities.questions)},s=function(e){return i["default"].values(e.entities.options)},c=function(e){return e.answeredQuestions},l=(0,u.createSelector)(a,c,function(e,t){return i["default"].find(e,function(e){return t.indexOf(e.id)<0})});t.getQuestionWithOptions=(0,u.createSelector)(l,s,function(e,t){if(e){var n=i["default"].filter(t,function(t){return e.options.indexOf(t.id)>-1});return Object.assign({},e,{options:n})}return null})},467:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=(0,s["default"])(),n=(0,l.createStore)((0,p["default"])(),e,(0,l.compose)((0,l.applyMiddleware)(u["default"],h,t),window.devToolsExtension?window.devToolsExtension():function(e){return e}));return n}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var i=n(442),u=o(i),a=n(441),s=o(a),c=n(24),l=n(73),f=n(14),d=n(463),p=o(d),h=(0,c.routerMiddleware)(f.browserHistory)}});
//# sourceMappingURL=trivia.bundle.js.map