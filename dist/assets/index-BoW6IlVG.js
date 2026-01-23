(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function dc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ya={exports:{}},ol={},Xa={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er=Symbol.for("react.element"),fc=Symbol.for("react.portal"),pc=Symbol.for("react.fragment"),mc=Symbol.for("react.strict_mode"),gc=Symbol.for("react.profiler"),hc=Symbol.for("react.provider"),vc=Symbol.for("react.context"),yc=Symbol.for("react.forward_ref"),xc=Symbol.for("react.suspense"),wc=Symbol.for("react.memo"),kc=Symbol.for("react.lazy"),Uo=Symbol.iterator;function Sc(e){return e===null||typeof e!="object"?null:(e=Uo&&e[Uo]||e["@@iterator"],typeof e=="function"?e:null)}var Za={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ja=Object.assign,qa={};function fn(e,t,n){this.props=e,this.context=t,this.refs=qa,this.updater=n||Za}fn.prototype.isReactComponent={};fn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};fn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function es(){}es.prototype=fn.prototype;function Hi(e,t,n){this.props=e,this.context=t,this.refs=qa,this.updater=n||Za}var Ki=Hi.prototype=new es;Ki.constructor=Hi;Ja(Ki,fn.prototype);Ki.isPureReactComponent=!0;var $o=Array.isArray,ts=Object.prototype.hasOwnProperty,Qi={current:null},ns={key:!0,ref:!0,__self:!0,__source:!0};function rs(e,t,n){var r,l={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)ts.call(t,r)&&!ns.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var s=Array(a),c=0;c<a;c++)s[c]=arguments[c+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:er,type:e,key:i,ref:o,props:l,_owner:Qi.current}}function Ec(e,t){return{$$typeof:er,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Wi(e){return typeof e=="object"&&e!==null&&e.$$typeof===er}function Nc(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var bo=/\/+/g;function El(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Nc(""+e.key):t.toString(36)}function Nr(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case er:case fc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+El(o,0):r,$o(l)?(n="",e!=null&&(n=e.replace(bo,"$&/")+"/"),Nr(l,t,n,"",function(c){return c})):l!=null&&(Wi(l)&&(l=Ec(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(bo,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",$o(e))for(var a=0;a<e.length;a++){i=e[a];var s=r+El(i,a);o+=Nr(i,t,n,s,l)}else if(s=Sc(e),typeof s=="function")for(e=s.call(e),a=0;!(i=e.next()).done;)i=i.value,s=r+El(i,a++),o+=Nr(i,t,n,s,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ar(e,t,n){if(e==null)return e;var r=[],l=0;return Nr(e,r,"","",function(i){return t.call(n,i,l++)}),r}function Cc(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var de={current:null},Cr={transition:null},jc={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:Cr,ReactCurrentOwner:Qi};function ls(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:ar,forEach:function(e,t,n){ar(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ar(e,function(){t++}),t},toArray:function(e){return ar(e,function(t){return t})||[]},only:function(e){if(!Wi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=fn;R.Fragment=pc;R.Profiler=gc;R.PureComponent=Hi;R.StrictMode=mc;R.Suspense=xc;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jc;R.act=ls;R.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ja({},e.props),l=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Qi.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)ts.call(t,s)&&!ns.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var c=0;c<s;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:er,type:e.type,key:l,ref:i,props:r,_owner:o}};R.createContext=function(e){return e={$$typeof:vc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:hc,_context:e},e.Consumer=e};R.createElement=rs;R.createFactory=function(e){var t=rs.bind(null,e);return t.type=e,t};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:yc,render:e}};R.isValidElement=Wi;R.lazy=function(e){return{$$typeof:kc,_payload:{_status:-1,_result:e},_init:Cc}};R.memo=function(e,t){return{$$typeof:wc,type:e,compare:t===void 0?null:t}};R.startTransition=function(e){var t=Cr.transition;Cr.transition={};try{e()}finally{Cr.transition=t}};R.unstable_act=ls;R.useCallback=function(e,t){return de.current.useCallback(e,t)};R.useContext=function(e){return de.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return de.current.useDeferredValue(e)};R.useEffect=function(e,t){return de.current.useEffect(e,t)};R.useId=function(){return de.current.useId()};R.useImperativeHandle=function(e,t,n){return de.current.useImperativeHandle(e,t,n)};R.useInsertionEffect=function(e,t){return de.current.useInsertionEffect(e,t)};R.useLayoutEffect=function(e,t){return de.current.useLayoutEffect(e,t)};R.useMemo=function(e,t){return de.current.useMemo(e,t)};R.useReducer=function(e,t,n){return de.current.useReducer(e,t,n)};R.useRef=function(e){return de.current.useRef(e)};R.useState=function(e){return de.current.useState(e)};R.useSyncExternalStore=function(e,t,n){return de.current.useSyncExternalStore(e,t,n)};R.useTransition=function(){return de.current.useTransition()};R.version="18.3.1";Xa.exports=R;var k=Xa.exports;const _c=dc(k);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zc=k,Tc=Symbol.for("react.element"),Pc=Symbol.for("react.fragment"),Ic=Object.prototype.hasOwnProperty,Lc=zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Dc={key:!0,ref:!0,__self:!0,__source:!0};function is(e,t,n){var r,l={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Ic.call(t,r)&&!Dc.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Tc,type:e,key:i,ref:o,props:l,_owner:Lc.current}}ol.Fragment=Pc;ol.jsx=is;ol.jsxs=is;Ya.exports=ol;var u=Ya.exports,os={exports:{}},Ne={},as={exports:{}},ss={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(C,P){var I=C.length;C.push(P);e:for(;0<I;){var F=I-1>>>1,X=C[F];if(0<l(X,P))C[F]=P,C[I]=X,I=F;else break e}}function n(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var P=C[0],I=C.pop();if(I!==P){C[0]=I;e:for(var F=0,X=C.length,ir=X>>>1;F<ir;){var St=2*(F+1)-1,Sl=C[St],Et=St+1,or=C[Et];if(0>l(Sl,I))Et<X&&0>l(or,Sl)?(C[F]=or,C[Et]=I,F=Et):(C[F]=Sl,C[St]=I,F=St);else if(Et<X&&0>l(or,I))C[F]=or,C[Et]=I,F=Et;else break e}}return P}function l(C,P){var I=C.sortIndex-P.sortIndex;return I!==0?I:C.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var s=[],c=[],g=1,h=null,m=3,E=!1,S=!1,j=!1,L=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(C){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=C)r(c),P.sortIndex=P.expirationTime,t(s,P);else break;P=n(c)}}function v(C){if(j=!1,f(C),!S)if(n(s)!==null)S=!0,He(w);else{var P=n(c);P!==null&&gn(v,P.startTime-C)}}function w(C,P){S=!1,j&&(j=!1,p(_),_=-1),E=!0;var I=m;try{for(f(P),h=n(s);h!==null&&(!(h.expirationTime>P)||C&&!z());){var F=h.callback;if(typeof F=="function"){h.callback=null,m=h.priorityLevel;var X=F(h.expirationTime<=P);P=e.unstable_now(),typeof X=="function"?h.callback=X:h===n(s)&&r(s),f(P)}else r(s);h=n(s)}if(h!==null)var ir=!0;else{var St=n(c);St!==null&&gn(v,St.startTime-P),ir=!1}return ir}finally{h=null,m=I,E=!1}}var x=!1,y=null,_=-1,M=5,D=-1;function z(){return!(e.unstable_now()-D<M)}function b(){if(y!==null){var C=e.unstable_now();D=C;var P=!0;try{P=y(!0,C)}finally{P?U():(x=!1,y=null)}}else x=!1}var U;if(typeof d=="function")U=function(){d(b)};else if(typeof MessageChannel<"u"){var xe=new MessageChannel,kt=xe.port2;xe.port1.onmessage=b,U=function(){kt.postMessage(null)}}else U=function(){L(b,0)};function He(C){y=C,x||(x=!0,U())}function gn(C,P){_=L(function(){C(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){S||E||(S=!0,He(w))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(C){switch(m){case 1:case 2:case 3:var P=3;break;default:P=m}var I=m;m=P;try{return C()}finally{m=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,P){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var I=m;m=C;try{return P()}finally{m=I}},e.unstable_scheduleCallback=function(C,P,I){var F=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?F+I:F):I=F,C){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=I+X,C={id:g++,callback:P,priorityLevel:C,startTime:I,expirationTime:X,sortIndex:-1},I>F?(C.sortIndex=I,t(c,C),n(s)===null&&C===n(c)&&(j?(p(_),_=-1):j=!0,gn(v,I-F))):(C.sortIndex=X,t(s,C),S||E||(S=!0,He(w))),C},e.unstable_shouldYield=z,e.unstable_wrapCallback=function(C){var P=m;return function(){var I=m;m=P;try{return C.apply(this,arguments)}finally{m=I}}}})(ss);as.exports=ss;var Rc=as.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oc=k,Ee=Rc;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var us=new Set,Fn={};function Mt(e,t){ln(e,t),ln(e+"Capture",t)}function ln(e,t){for(Fn[e]=t,e=0;e<t.length;e++)us.add(t[e])}var Xe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zl=Object.prototype.hasOwnProperty,Mc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vo={},Bo={};function Fc(e){return Zl.call(Bo,e)?!0:Zl.call(Vo,e)?!1:Mc.test(e)?Bo[e]=!0:(Vo[e]=!0,!1)}function Ac(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Uc(e,t,n,r){if(t===null||typeof t>"u"||Ac(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];le[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Gi=/[\-:]([a-z])/g;function Yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Gi,Yi);le[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Gi,Yi);le[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Gi,Yi);le[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Xi(e,t,n,r){var l=le.hasOwnProperty(t)?le[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Uc(t,n,l,r)&&(n=null),r||l===null?Fc(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var et=Oc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sr=Symbol.for("react.element"),$t=Symbol.for("react.portal"),bt=Symbol.for("react.fragment"),Zi=Symbol.for("react.strict_mode"),Jl=Symbol.for("react.profiler"),cs=Symbol.for("react.provider"),ds=Symbol.for("react.context"),Ji=Symbol.for("react.forward_ref"),ql=Symbol.for("react.suspense"),ei=Symbol.for("react.suspense_list"),qi=Symbol.for("react.memo"),nt=Symbol.for("react.lazy"),fs=Symbol.for("react.offscreen"),Ho=Symbol.iterator;function hn(e){return e===null||typeof e!="object"?null:(e=Ho&&e[Ho]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,Nl;function Nn(e){if(Nl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Nl=t&&t[1]||""}return`
`+Nl+e}var Cl=!1;function jl(e,t){if(!e||Cl)return"";Cl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,a=i.length-1;1<=o&&0<=a&&l[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(l[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||l[o]!==i[a]){var s=`
`+l[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=a);break}}}finally{Cl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Nn(e):""}function $c(e){switch(e.tag){case 5:return Nn(e.type);case 16:return Nn("Lazy");case 13:return Nn("Suspense");case 19:return Nn("SuspenseList");case 0:case 2:case 15:return e=jl(e.type,!1),e;case 11:return e=jl(e.type.render,!1),e;case 1:return e=jl(e.type,!0),e;default:return""}}function ti(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bt:return"Fragment";case $t:return"Portal";case Jl:return"Profiler";case Zi:return"StrictMode";case ql:return"Suspense";case ei:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ds:return(e.displayName||"Context")+".Consumer";case cs:return(e._context.displayName||"Context")+".Provider";case Ji:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case qi:return t=e.displayName||null,t!==null?t:ti(e.type)||"Memo";case nt:t=e._payload,e=e._init;try{return ti(e(t))}catch{}}return null}function bc(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ti(t);case 8:return t===Zi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ps(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vc(e){var t=ps(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ur(e){e._valueTracker||(e._valueTracker=Vc(e))}function ms(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ps(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Mr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ni(e,t){var n=t.checked;return W({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ko(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function gs(e,t){t=t.checked,t!=null&&Xi(e,"checked",t,!1)}function ri(e,t){gs(e,t);var n=ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?li(e,t.type,n):t.hasOwnProperty("defaultValue")&&li(e,t.type,ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Qo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function li(e,t,n){(t!=="number"||Mr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Cn=Array.isArray;function Jt(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ht(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function ii(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return W({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wo(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(Cn(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ht(n)}}function hs(e,t){var n=ht(t.value),r=ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Go(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function vs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function oi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?vs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,ys=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function An(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var zn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Bc=["Webkit","ms","Moz","O"];Object.keys(zn).forEach(function(e){Bc.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),zn[t]=zn[e]})});function xs(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||zn.hasOwnProperty(e)&&zn[e]?(""+t).trim():t+"px"}function ws(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=xs(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Hc=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ai(e,t){if(t){if(Hc[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function si(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ui=null;function eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ci=null,qt=null,en=null;function Yo(e){if(e=rr(e)){if(typeof ci!="function")throw Error(N(280));var t=e.stateNode;t&&(t=dl(t),ci(e.stateNode,e.type,t))}}function ks(e){qt?en?en.push(e):en=[e]:qt=e}function Ss(){if(qt){var e=qt,t=en;if(en=qt=null,Yo(e),t)for(e=0;e<t.length;e++)Yo(t[e])}}function Es(e,t){return e(t)}function Ns(){}var _l=!1;function Cs(e,t,n){if(_l)return e(t,n);_l=!0;try{return Es(e,t,n)}finally{_l=!1,(qt!==null||en!==null)&&(Ns(),Ss())}}function Un(e,t){var n=e.stateNode;if(n===null)return null;var r=dl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var di=!1;if(Xe)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){di=!0}}),window.addEventListener("test",vn,vn),window.removeEventListener("test",vn,vn)}catch{di=!1}function Kc(e,t,n,r,l,i,o,a,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(g){this.onError(g)}}var Tn=!1,Fr=null,Ar=!1,fi=null,Qc={onError:function(e){Tn=!0,Fr=e}};function Wc(e,t,n,r,l,i,o,a,s){Tn=!1,Fr=null,Kc.apply(Qc,arguments)}function Gc(e,t,n,r,l,i,o,a,s){if(Wc.apply(this,arguments),Tn){if(Tn){var c=Fr;Tn=!1,Fr=null}else throw Error(N(198));Ar||(Ar=!0,fi=c)}}function Ft(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function js(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xo(e){if(Ft(e)!==e)throw Error(N(188))}function Yc(e){var t=e.alternate;if(!t){if(t=Ft(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Xo(l),e;if(i===r)return Xo(l),t;i=i.sibling}throw Error(N(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,a=l.child;a;){if(a===n){o=!0,n=l,r=i;break}if(a===r){o=!0,r=l,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=l;break}if(a===r){o=!0,r=i,n=l;break}a=a.sibling}if(!o)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function _s(e){return e=Yc(e),e!==null?zs(e):null}function zs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=zs(e);if(t!==null)return t;e=e.sibling}return null}var Ts=Ee.unstable_scheduleCallback,Zo=Ee.unstable_cancelCallback,Xc=Ee.unstable_shouldYield,Zc=Ee.unstable_requestPaint,Y=Ee.unstable_now,Jc=Ee.unstable_getCurrentPriorityLevel,to=Ee.unstable_ImmediatePriority,Ps=Ee.unstable_UserBlockingPriority,Ur=Ee.unstable_NormalPriority,qc=Ee.unstable_LowPriority,Is=Ee.unstable_IdlePriority,al=null,Ve=null;function ed(e){if(Ve&&typeof Ve.onCommitFiberRoot=="function")try{Ve.onCommitFiberRoot(al,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:rd,td=Math.log,nd=Math.LN2;function rd(e){return e>>>=0,e===0?32:31-(td(e)/nd|0)|0}var dr=64,fr=4194304;function jn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function $r(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~l;a!==0?r=jn(a):(i&=o,i!==0&&(r=jn(i)))}else o=n&~l,o!==0?r=jn(o):i!==0&&(r=jn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Me(t),l=1<<n,r|=e[n],t&=~l;return r}function ld(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function id(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Me(i),a=1<<o,s=l[o];s===-1?(!(a&n)||a&r)&&(l[o]=ld(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function pi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ls(){var e=dr;return dr<<=1,!(dr&4194240)&&(dr=64),e}function zl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Me(t),e[t]=n}function od(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Me(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function no(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Me(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var A=0;function Ds(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Rs,ro,Os,Ms,Fs,mi=!1,pr=[],st=null,ut=null,ct=null,$n=new Map,bn=new Map,lt=[],ad="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jo(e,t){switch(e){case"focusin":case"focusout":st=null;break;case"dragenter":case"dragleave":ut=null;break;case"mouseover":case"mouseout":ct=null;break;case"pointerover":case"pointerout":$n.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":bn.delete(t.pointerId)}}function yn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=rr(t),t!==null&&ro(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function sd(e,t,n,r,l){switch(t){case"focusin":return st=yn(st,e,t,n,r,l),!0;case"dragenter":return ut=yn(ut,e,t,n,r,l),!0;case"mouseover":return ct=yn(ct,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return $n.set(i,yn($n.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,bn.set(i,yn(bn.get(i)||null,e,t,n,r,l)),!0}return!1}function As(e){var t=jt(e.target);if(t!==null){var n=Ft(t);if(n!==null){if(t=n.tag,t===13){if(t=js(n),t!==null){e.blockedOn=t,Fs(e.priority,function(){Os(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function jr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=gi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ui=r,n.target.dispatchEvent(r),ui=null}else return t=rr(n),t!==null&&ro(t),e.blockedOn=n,!1;t.shift()}return!0}function qo(e,t,n){jr(e)&&n.delete(t)}function ud(){mi=!1,st!==null&&jr(st)&&(st=null),ut!==null&&jr(ut)&&(ut=null),ct!==null&&jr(ct)&&(ct=null),$n.forEach(qo),bn.forEach(qo)}function xn(e,t){e.blockedOn===t&&(e.blockedOn=null,mi||(mi=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,ud)))}function Vn(e){function t(l){return xn(l,e)}if(0<pr.length){xn(pr[0],e);for(var n=1;n<pr.length;n++){var r=pr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(st!==null&&xn(st,e),ut!==null&&xn(ut,e),ct!==null&&xn(ct,e),$n.forEach(t),bn.forEach(t),n=0;n<lt.length;n++)r=lt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<lt.length&&(n=lt[0],n.blockedOn===null);)As(n),n.blockedOn===null&&lt.shift()}var tn=et.ReactCurrentBatchConfig,br=!0;function cd(e,t,n,r){var l=A,i=tn.transition;tn.transition=null;try{A=1,lo(e,t,n,r)}finally{A=l,tn.transition=i}}function dd(e,t,n,r){var l=A,i=tn.transition;tn.transition=null;try{A=4,lo(e,t,n,r)}finally{A=l,tn.transition=i}}function lo(e,t,n,r){if(br){var l=gi(e,t,n,r);if(l===null)Al(e,t,r,Vr,n),Jo(e,r);else if(sd(l,e,t,n,r))r.stopPropagation();else if(Jo(e,r),t&4&&-1<ad.indexOf(e)){for(;l!==null;){var i=rr(l);if(i!==null&&Rs(i),i=gi(e,t,n,r),i===null&&Al(e,t,r,Vr,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else Al(e,t,r,null,n)}}var Vr=null;function gi(e,t,n,r){if(Vr=null,e=eo(r),e=jt(e),e!==null)if(t=Ft(e),t===null)e=null;else if(n=t.tag,n===13){if(e=js(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Vr=e,null}function Us(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Jc()){case to:return 1;case Ps:return 4;case Ur:case qc:return 16;case Is:return 536870912;default:return 16}default:return 16}}var ot=null,io=null,_r=null;function $s(){if(_r)return _r;var e,t=io,n=t.length,r,l="value"in ot?ot.value:ot.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return _r=l.slice(e,1<r?1-r:void 0)}function zr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function ea(){return!1}function Ce(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?mr:ea,this.isPropagationStopped=ea,this}return W(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),t}var pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},oo=Ce(pn),nr=W({},pn,{view:0,detail:0}),fd=Ce(nr),Tl,Pl,wn,sl=W({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ao,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wn&&(wn&&e.type==="mousemove"?(Tl=e.screenX-wn.screenX,Pl=e.screenY-wn.screenY):Pl=Tl=0,wn=e),Tl)},movementY:function(e){return"movementY"in e?e.movementY:Pl}}),ta=Ce(sl),pd=W({},sl,{dataTransfer:0}),md=Ce(pd),gd=W({},nr,{relatedTarget:0}),Il=Ce(gd),hd=W({},pn,{animationName:0,elapsedTime:0,pseudoElement:0}),vd=Ce(hd),yd=W({},pn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),xd=Ce(yd),wd=W({},pn,{data:0}),na=Ce(wd),kd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ed={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ed[e])?!!t[e]:!1}function ao(){return Nd}var Cd=W({},nr,{key:function(e){if(e.key){var t=kd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=zr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ao,charCode:function(e){return e.type==="keypress"?zr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?zr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jd=Ce(Cd),_d=W({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ra=Ce(_d),zd=W({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ao}),Td=Ce(zd),Pd=W({},pn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Id=Ce(Pd),Ld=W({},sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dd=Ce(Ld),Rd=[9,13,27,32],so=Xe&&"CompositionEvent"in window,Pn=null;Xe&&"documentMode"in document&&(Pn=document.documentMode);var Od=Xe&&"TextEvent"in window&&!Pn,bs=Xe&&(!so||Pn&&8<Pn&&11>=Pn),la=" ",ia=!1;function Vs(e,t){switch(e){case"keyup":return Rd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vt=!1;function Md(e,t){switch(e){case"compositionend":return Bs(t);case"keypress":return t.which!==32?null:(ia=!0,la);case"textInput":return e=t.data,e===la&&ia?null:e;default:return null}}function Fd(e,t){if(Vt)return e==="compositionend"||!so&&Vs(e,t)?(e=$s(),_r=io=ot=null,Vt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return bs&&t.locale!=="ko"?null:t.data;default:return null}}var Ad={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function oa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ad[e.type]:t==="textarea"}function Hs(e,t,n,r){ks(r),t=Br(t,"onChange"),0<t.length&&(n=new oo("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var In=null,Bn=null;function Ud(e){tu(e,0)}function ul(e){var t=Kt(e);if(ms(t))return e}function $d(e,t){if(e==="change")return t}var Ks=!1;if(Xe){var Ll;if(Xe){var Dl="oninput"in document;if(!Dl){var aa=document.createElement("div");aa.setAttribute("oninput","return;"),Dl=typeof aa.oninput=="function"}Ll=Dl}else Ll=!1;Ks=Ll&&(!document.documentMode||9<document.documentMode)}function sa(){In&&(In.detachEvent("onpropertychange",Qs),Bn=In=null)}function Qs(e){if(e.propertyName==="value"&&ul(Bn)){var t=[];Hs(t,Bn,e,eo(e)),Cs(Ud,t)}}function bd(e,t,n){e==="focusin"?(sa(),In=t,Bn=n,In.attachEvent("onpropertychange",Qs)):e==="focusout"&&sa()}function Vd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ul(Bn)}function Bd(e,t){if(e==="click")return ul(t)}function Hd(e,t){if(e==="input"||e==="change")return ul(t)}function Kd(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ae=typeof Object.is=="function"?Object.is:Kd;function Hn(e,t){if(Ae(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Zl.call(t,l)||!Ae(e[l],t[l]))return!1}return!0}function ua(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ca(e,t){var n=ua(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ua(n)}}function Ws(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ws(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gs(){for(var e=window,t=Mr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Mr(e.document)}return t}function uo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qd(e){var t=Gs(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ws(n.ownerDocument.documentElement,n)){if(r!==null&&uo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=ca(n,i);var o=ca(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Wd=Xe&&"documentMode"in document&&11>=document.documentMode,Bt=null,hi=null,Ln=null,vi=!1;function da(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vi||Bt==null||Bt!==Mr(r)||(r=Bt,"selectionStart"in r&&uo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ln&&Hn(Ln,r)||(Ln=r,r=Br(hi,"onSelect"),0<r.length&&(t=new oo("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Bt)))}function gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ht={animationend:gr("Animation","AnimationEnd"),animationiteration:gr("Animation","AnimationIteration"),animationstart:gr("Animation","AnimationStart"),transitionend:gr("Transition","TransitionEnd")},Rl={},Ys={};Xe&&(Ys=document.createElement("div").style,"AnimationEvent"in window||(delete Ht.animationend.animation,delete Ht.animationiteration.animation,delete Ht.animationstart.animation),"TransitionEvent"in window||delete Ht.transitionend.transition);function cl(e){if(Rl[e])return Rl[e];if(!Ht[e])return e;var t=Ht[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ys)return Rl[e]=t[n];return e}var Xs=cl("animationend"),Zs=cl("animationiteration"),Js=cl("animationstart"),qs=cl("transitionend"),eu=new Map,fa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yt(e,t){eu.set(e,t),Mt(t,[e])}for(var Ol=0;Ol<fa.length;Ol++){var Ml=fa[Ol],Gd=Ml.toLowerCase(),Yd=Ml[0].toUpperCase()+Ml.slice(1);yt(Gd,"on"+Yd)}yt(Xs,"onAnimationEnd");yt(Zs,"onAnimationIteration");yt(Js,"onAnimationStart");yt("dblclick","onDoubleClick");yt("focusin","onFocus");yt("focusout","onBlur");yt(qs,"onTransitionEnd");ln("onMouseEnter",["mouseout","mouseover"]);ln("onMouseLeave",["mouseout","mouseover"]);ln("onPointerEnter",["pointerout","pointerover"]);ln("onPointerLeave",["pointerout","pointerover"]);Mt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _n="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xd=new Set("cancel close invalid load scroll toggle".split(" ").concat(_n));function pa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Gc(r,t,void 0,e),e.currentTarget=null}function tu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],s=a.instance,c=a.currentTarget;if(a=a.listener,s!==i&&l.isPropagationStopped())break e;pa(l,a,c),i=s}else for(o=0;o<r.length;o++){if(a=r[o],s=a.instance,c=a.currentTarget,a=a.listener,s!==i&&l.isPropagationStopped())break e;pa(l,a,c),i=s}}}if(Ar)throw e=fi,Ar=!1,fi=null,e}function V(e,t){var n=t[Si];n===void 0&&(n=t[Si]=new Set);var r=e+"__bubble";n.has(r)||(nu(t,e,2,!1),n.add(r))}function Fl(e,t,n){var r=0;t&&(r|=4),nu(n,e,r,t)}var hr="_reactListening"+Math.random().toString(36).slice(2);function Kn(e){if(!e[hr]){e[hr]=!0,us.forEach(function(n){n!=="selectionchange"&&(Xd.has(n)||Fl(n,!1,e),Fl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hr]||(t[hr]=!0,Fl("selectionchange",!1,t))}}function nu(e,t,n,r){switch(Us(t)){case 1:var l=cd;break;case 4:l=dd;break;default:l=lo}n=l.bind(null,t,n,e),l=void 0,!di||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Al(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;o=o.return}for(;a!==null;){if(o=jt(a),o===null)return;if(s=o.tag,s===5||s===6){r=i=o;continue e}a=a.parentNode}}r=r.return}Cs(function(){var c=i,g=eo(n),h=[];e:{var m=eu.get(e);if(m!==void 0){var E=oo,S=e;switch(e){case"keypress":if(zr(n)===0)break e;case"keydown":case"keyup":E=jd;break;case"focusin":S="focus",E=Il;break;case"focusout":S="blur",E=Il;break;case"beforeblur":case"afterblur":E=Il;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=ta;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=md;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=Td;break;case Xs:case Zs:case Js:E=vd;break;case qs:E=Id;break;case"scroll":E=fd;break;case"wheel":E=Dd;break;case"copy":case"cut":case"paste":E=xd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=ra}var j=(t&4)!==0,L=!j&&e==="scroll",p=j?m!==null?m+"Capture":null:m;j=[];for(var d=c,f;d!==null;){f=d;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,p!==null&&(v=Un(d,p),v!=null&&j.push(Qn(d,v,f)))),L)break;d=d.return}0<j.length&&(m=new E(m,S,null,n,g),h.push({event:m,listeners:j}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",m&&n!==ui&&(S=n.relatedTarget||n.fromElement)&&(jt(S)||S[Ze]))break e;if((E||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,E?(S=n.relatedTarget||n.toElement,E=c,S=S?jt(S):null,S!==null&&(L=Ft(S),S!==L||S.tag!==5&&S.tag!==6)&&(S=null)):(E=null,S=c),E!==S)){if(j=ta,v="onMouseLeave",p="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(j=ra,v="onPointerLeave",p="onPointerEnter",d="pointer"),L=E==null?m:Kt(E),f=S==null?m:Kt(S),m=new j(v,d+"leave",E,n,g),m.target=L,m.relatedTarget=f,v=null,jt(g)===c&&(j=new j(p,d+"enter",S,n,g),j.target=f,j.relatedTarget=L,v=j),L=v,E&&S)t:{for(j=E,p=S,d=0,f=j;f;f=Ut(f))d++;for(f=0,v=p;v;v=Ut(v))f++;for(;0<d-f;)j=Ut(j),d--;for(;0<f-d;)p=Ut(p),f--;for(;d--;){if(j===p||p!==null&&j===p.alternate)break t;j=Ut(j),p=Ut(p)}j=null}else j=null;E!==null&&ma(h,m,E,j,!1),S!==null&&L!==null&&ma(h,L,S,j,!0)}}e:{if(m=c?Kt(c):window,E=m.nodeName&&m.nodeName.toLowerCase(),E==="select"||E==="input"&&m.type==="file")var w=$d;else if(oa(m))if(Ks)w=Hd;else{w=Vd;var x=bd}else(E=m.nodeName)&&E.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(w=Bd);if(w&&(w=w(e,c))){Hs(h,w,n,g);break e}x&&x(e,m,c),e==="focusout"&&(x=m._wrapperState)&&x.controlled&&m.type==="number"&&li(m,"number",m.value)}switch(x=c?Kt(c):window,e){case"focusin":(oa(x)||x.contentEditable==="true")&&(Bt=x,hi=c,Ln=null);break;case"focusout":Ln=hi=Bt=null;break;case"mousedown":vi=!0;break;case"contextmenu":case"mouseup":case"dragend":vi=!1,da(h,n,g);break;case"selectionchange":if(Wd)break;case"keydown":case"keyup":da(h,n,g)}var y;if(so)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Vt?Vs(e,n)&&(_="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(bs&&n.locale!=="ko"&&(Vt||_!=="onCompositionStart"?_==="onCompositionEnd"&&Vt&&(y=$s()):(ot=g,io="value"in ot?ot.value:ot.textContent,Vt=!0)),x=Br(c,_),0<x.length&&(_=new na(_,e,null,n,g),h.push({event:_,listeners:x}),y?_.data=y:(y=Bs(n),y!==null&&(_.data=y)))),(y=Od?Md(e,n):Fd(e,n))&&(c=Br(c,"onBeforeInput"),0<c.length&&(g=new na("onBeforeInput","beforeinput",null,n,g),h.push({event:g,listeners:c}),g.data=y))}tu(h,t)})}function Qn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Br(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Un(e,n),i!=null&&r.unshift(Qn(e,i,l)),i=Un(e,t),i!=null&&r.push(Qn(e,i,l))),e=e.return}return r}function Ut(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ma(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var a=n,s=a.alternate,c=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&c!==null&&(a=c,l?(s=Un(n,i),s!=null&&o.unshift(Qn(n,s,a))):l||(s=Un(n,i),s!=null&&o.push(Qn(n,s,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zd=/\r\n?/g,Jd=/\u0000|\uFFFD/g;function ga(e){return(typeof e=="string"?e:""+e).replace(Zd,`
`).replace(Jd,"")}function vr(e,t,n){if(t=ga(t),ga(e)!==t&&n)throw Error(N(425))}function Hr(){}var yi=null,xi=null;function wi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ki=typeof setTimeout=="function"?setTimeout:void 0,qd=typeof clearTimeout=="function"?clearTimeout:void 0,ha=typeof Promise=="function"?Promise:void 0,ef=typeof queueMicrotask=="function"?queueMicrotask:typeof ha<"u"?function(e){return ha.resolve(null).then(e).catch(tf)}:ki;function tf(e){setTimeout(function(){throw e})}function Ul(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Vn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Vn(t)}function dt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function va(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var mn=Math.random().toString(36).slice(2),be="__reactFiber$"+mn,Wn="__reactProps$"+mn,Ze="__reactContainer$"+mn,Si="__reactEvents$"+mn,nf="__reactListeners$"+mn,rf="__reactHandles$"+mn;function jt(e){var t=e[be];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ze]||n[be]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=va(e);e!==null;){if(n=e[be])return n;e=va(e)}return t}e=n,n=e.parentNode}return null}function rr(e){return e=e[be]||e[Ze],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Kt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function dl(e){return e[Wn]||null}var Ei=[],Qt=-1;function xt(e){return{current:e}}function B(e){0>Qt||(e.current=Ei[Qt],Ei[Qt]=null,Qt--)}function $(e,t){Qt++,Ei[Qt]=e.current,e.current=t}var vt={},se=xt(vt),he=xt(!1),It=vt;function on(e,t){var n=e.type.contextTypes;if(!n)return vt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ve(e){return e=e.childContextTypes,e!=null}function Kr(){B(he),B(se)}function ya(e,t,n){if(se.current!==vt)throw Error(N(168));$(se,t),$(he,n)}function ru(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(N(108,bc(e)||"Unknown",l));return W({},n,r)}function Qr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vt,It=se.current,$(se,e),$(he,he.current),!0}function xa(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=ru(e,t,It),r.__reactInternalMemoizedMergedChildContext=e,B(he),B(se),$(se,e)):B(he),$(he,n)}var Qe=null,fl=!1,$l=!1;function lu(e){Qe===null?Qe=[e]:Qe.push(e)}function lf(e){fl=!0,lu(e)}function wt(){if(!$l&&Qe!==null){$l=!0;var e=0,t=A;try{var n=Qe;for(A=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Qe=null,fl=!1}catch(l){throw Qe!==null&&(Qe=Qe.slice(e+1)),Ts(to,wt),l}finally{A=t,$l=!1}}return null}var Wt=[],Gt=0,Wr=null,Gr=0,je=[],_e=0,Lt=null,We=1,Ge="";function Nt(e,t){Wt[Gt++]=Gr,Wt[Gt++]=Wr,Wr=e,Gr=t}function iu(e,t,n){je[_e++]=We,je[_e++]=Ge,je[_e++]=Lt,Lt=e;var r=We;e=Ge;var l=32-Me(r)-1;r&=~(1<<l),n+=1;var i=32-Me(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,We=1<<32-Me(t)+l|n<<l|r,Ge=i+e}else We=1<<i|n<<l|r,Ge=e}function co(e){e.return!==null&&(Nt(e,1),iu(e,1,0))}function fo(e){for(;e===Wr;)Wr=Wt[--Gt],Wt[Gt]=null,Gr=Wt[--Gt],Wt[Gt]=null;for(;e===Lt;)Lt=je[--_e],je[_e]=null,Ge=je[--_e],je[_e]=null,We=je[--_e],je[_e]=null}var Se=null,ke=null,H=!1,Oe=null;function ou(e,t){var n=ze(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function wa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Se=e,ke=dt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Se=e,ke=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Lt!==null?{id:We,overflow:Ge}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ze(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Se=e,ke=null,!0):!1;default:return!1}}function Ni(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ci(e){if(H){var t=ke;if(t){var n=t;if(!wa(e,t)){if(Ni(e))throw Error(N(418));t=dt(n.nextSibling);var r=Se;t&&wa(e,t)?ou(r,n):(e.flags=e.flags&-4097|2,H=!1,Se=e)}}else{if(Ni(e))throw Error(N(418));e.flags=e.flags&-4097|2,H=!1,Se=e}}}function ka(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Se=e}function yr(e){if(e!==Se)return!1;if(!H)return ka(e),H=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wi(e.type,e.memoizedProps)),t&&(t=ke)){if(Ni(e))throw au(),Error(N(418));for(;t;)ou(e,t),t=dt(t.nextSibling)}if(ka(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ke=dt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ke=null}}else ke=Se?dt(e.stateNode.nextSibling):null;return!0}function au(){for(var e=ke;e;)e=dt(e.nextSibling)}function an(){ke=Se=null,H=!1}function po(e){Oe===null?Oe=[e]:Oe.push(e)}var of=et.ReactCurrentBatchConfig;function kn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var a=l.refs;o===null?delete a[i]:a[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function xr(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Sa(e){var t=e._init;return t(e._payload)}function su(e){function t(p,d){if(e){var f=p.deletions;f===null?(p.deletions=[d],p.flags|=16):f.push(d)}}function n(p,d){if(!e)return null;for(;d!==null;)t(p,d),d=d.sibling;return null}function r(p,d){for(p=new Map;d!==null;)d.key!==null?p.set(d.key,d):p.set(d.index,d),d=d.sibling;return p}function l(p,d){return p=gt(p,d),p.index=0,p.sibling=null,p}function i(p,d,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<d?(p.flags|=2,d):f):(p.flags|=2,d)):(p.flags|=1048576,d)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function a(p,d,f,v){return d===null||d.tag!==6?(d=Wl(f,p.mode,v),d.return=p,d):(d=l(d,f),d.return=p,d)}function s(p,d,f,v){var w=f.type;return w===bt?g(p,d,f.props.children,v,f.key):d!==null&&(d.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===nt&&Sa(w)===d.type)?(v=l(d,f.props),v.ref=kn(p,d,f),v.return=p,v):(v=Or(f.type,f.key,f.props,null,p.mode,v),v.ref=kn(p,d,f),v.return=p,v)}function c(p,d,f,v){return d===null||d.tag!==4||d.stateNode.containerInfo!==f.containerInfo||d.stateNode.implementation!==f.implementation?(d=Gl(f,p.mode,v),d.return=p,d):(d=l(d,f.children||[]),d.return=p,d)}function g(p,d,f,v,w){return d===null||d.tag!==7?(d=Pt(f,p.mode,v,w),d.return=p,d):(d=l(d,f),d.return=p,d)}function h(p,d,f){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Wl(""+d,p.mode,f),d.return=p,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case sr:return f=Or(d.type,d.key,d.props,null,p.mode,f),f.ref=kn(p,null,d),f.return=p,f;case $t:return d=Gl(d,p.mode,f),d.return=p,d;case nt:var v=d._init;return h(p,v(d._payload),f)}if(Cn(d)||hn(d))return d=Pt(d,p.mode,f,null),d.return=p,d;xr(p,d)}return null}function m(p,d,f,v){var w=d!==null?d.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return w!==null?null:a(p,d,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case sr:return f.key===w?s(p,d,f,v):null;case $t:return f.key===w?c(p,d,f,v):null;case nt:return w=f._init,m(p,d,w(f._payload),v)}if(Cn(f)||hn(f))return w!==null?null:g(p,d,f,v,null);xr(p,f)}return null}function E(p,d,f,v,w){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(f)||null,a(d,p,""+v,w);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case sr:return p=p.get(v.key===null?f:v.key)||null,s(d,p,v,w);case $t:return p=p.get(v.key===null?f:v.key)||null,c(d,p,v,w);case nt:var x=v._init;return E(p,d,f,x(v._payload),w)}if(Cn(v)||hn(v))return p=p.get(f)||null,g(d,p,v,w,null);xr(d,v)}return null}function S(p,d,f,v){for(var w=null,x=null,y=d,_=d=0,M=null;y!==null&&_<f.length;_++){y.index>_?(M=y,y=null):M=y.sibling;var D=m(p,y,f[_],v);if(D===null){y===null&&(y=M);break}e&&y&&D.alternate===null&&t(p,y),d=i(D,d,_),x===null?w=D:x.sibling=D,x=D,y=M}if(_===f.length)return n(p,y),H&&Nt(p,_),w;if(y===null){for(;_<f.length;_++)y=h(p,f[_],v),y!==null&&(d=i(y,d,_),x===null?w=y:x.sibling=y,x=y);return H&&Nt(p,_),w}for(y=r(p,y);_<f.length;_++)M=E(y,p,_,f[_],v),M!==null&&(e&&M.alternate!==null&&y.delete(M.key===null?_:M.key),d=i(M,d,_),x===null?w=M:x.sibling=M,x=M);return e&&y.forEach(function(z){return t(p,z)}),H&&Nt(p,_),w}function j(p,d,f,v){var w=hn(f);if(typeof w!="function")throw Error(N(150));if(f=w.call(f),f==null)throw Error(N(151));for(var x=w=null,y=d,_=d=0,M=null,D=f.next();y!==null&&!D.done;_++,D=f.next()){y.index>_?(M=y,y=null):M=y.sibling;var z=m(p,y,D.value,v);if(z===null){y===null&&(y=M);break}e&&y&&z.alternate===null&&t(p,y),d=i(z,d,_),x===null?w=z:x.sibling=z,x=z,y=M}if(D.done)return n(p,y),H&&Nt(p,_),w;if(y===null){for(;!D.done;_++,D=f.next())D=h(p,D.value,v),D!==null&&(d=i(D,d,_),x===null?w=D:x.sibling=D,x=D);return H&&Nt(p,_),w}for(y=r(p,y);!D.done;_++,D=f.next())D=E(y,p,_,D.value,v),D!==null&&(e&&D.alternate!==null&&y.delete(D.key===null?_:D.key),d=i(D,d,_),x===null?w=D:x.sibling=D,x=D);return e&&y.forEach(function(b){return t(p,b)}),H&&Nt(p,_),w}function L(p,d,f,v){if(typeof f=="object"&&f!==null&&f.type===bt&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case sr:e:{for(var w=f.key,x=d;x!==null;){if(x.key===w){if(w=f.type,w===bt){if(x.tag===7){n(p,x.sibling),d=l(x,f.props.children),d.return=p,p=d;break e}}else if(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===nt&&Sa(w)===x.type){n(p,x.sibling),d=l(x,f.props),d.ref=kn(p,x,f),d.return=p,p=d;break e}n(p,x);break}else t(p,x);x=x.sibling}f.type===bt?(d=Pt(f.props.children,p.mode,v,f.key),d.return=p,p=d):(v=Or(f.type,f.key,f.props,null,p.mode,v),v.ref=kn(p,d,f),v.return=p,p=v)}return o(p);case $t:e:{for(x=f.key;d!==null;){if(d.key===x)if(d.tag===4&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){n(p,d.sibling),d=l(d,f.children||[]),d.return=p,p=d;break e}else{n(p,d);break}else t(p,d);d=d.sibling}d=Gl(f,p.mode,v),d.return=p,p=d}return o(p);case nt:return x=f._init,L(p,d,x(f._payload),v)}if(Cn(f))return S(p,d,f,v);if(hn(f))return j(p,d,f,v);xr(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,d!==null&&d.tag===6?(n(p,d.sibling),d=l(d,f),d.return=p,p=d):(n(p,d),d=Wl(f,p.mode,v),d.return=p,p=d),o(p)):n(p,d)}return L}var sn=su(!0),uu=su(!1),Yr=xt(null),Xr=null,Yt=null,mo=null;function go(){mo=Yt=Xr=null}function ho(e){var t=Yr.current;B(Yr),e._currentValue=t}function ji(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function nn(e,t){Xr=e,mo=Yt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ge=!0),e.firstContext=null)}function Pe(e){var t=e._currentValue;if(mo!==e)if(e={context:e,memoizedValue:t,next:null},Yt===null){if(Xr===null)throw Error(N(308));Yt=e,Xr.dependencies={lanes:0,firstContext:e}}else Yt=Yt.next=e;return t}var _t=null;function vo(e){_t===null?_t=[e]:_t.push(e)}function cu(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,vo(t)):(n.next=l.next,l.next=n),t.interleaved=n,Je(e,r)}function Je(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var rt=!1;function yo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function du(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ye(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ft(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Je(e,n)}return l=r.interleaved,l===null?(t.next=t,vo(r)):(t.next=l.next,l.next=t),r.interleaved=t,Je(e,n)}function Tr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,no(e,n)}}function Ea(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Zr(e,t,n,r){var l=e.updateQueue;rt=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,c=s.next;s.next=null,o===null?i=c:o.next=c,o=s;var g=e.alternate;g!==null&&(g=g.updateQueue,a=g.lastBaseUpdate,a!==o&&(a===null?g.firstBaseUpdate=c:a.next=c,g.lastBaseUpdate=s))}if(i!==null){var h=l.baseState;o=0,g=c=s=null,a=i;do{var m=a.lane,E=a.eventTime;if((r&m)===m){g!==null&&(g=g.next={eventTime:E,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var S=e,j=a;switch(m=t,E=n,j.tag){case 1:if(S=j.payload,typeof S=="function"){h=S.call(E,h,m);break e}h=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=j.payload,m=typeof S=="function"?S.call(E,h,m):S,m==null)break e;h=W({},h,m);break e;case 2:rt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[a]:m.push(a))}else E={eventTime:E,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},g===null?(c=g=E,s=h):g=g.next=E,o|=m;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;m=a,a=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(g===null&&(s=h),l.baseState=s,l.firstBaseUpdate=c,l.lastBaseUpdate=g,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);Rt|=o,e.lanes=o,e.memoizedState=h}}function Na(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(N(191,l));l.call(r)}}}var lr={},Be=xt(lr),Gn=xt(lr),Yn=xt(lr);function zt(e){if(e===lr)throw Error(N(174));return e}function xo(e,t){switch($(Yn,t),$(Gn,e),$(Be,lr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:oi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=oi(t,e)}B(Be),$(Be,t)}function un(){B(Be),B(Gn),B(Yn)}function fu(e){zt(Yn.current);var t=zt(Be.current),n=oi(t,e.type);t!==n&&($(Gn,e),$(Be,n))}function wo(e){Gn.current===e&&(B(Be),B(Gn))}var K=xt(0);function Jr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var bl=[];function ko(){for(var e=0;e<bl.length;e++)bl[e]._workInProgressVersionPrimary=null;bl.length=0}var Pr=et.ReactCurrentDispatcher,Vl=et.ReactCurrentBatchConfig,Dt=0,Q=null,J=null,ee=null,qr=!1,Dn=!1,Xn=0,af=0;function ie(){throw Error(N(321))}function So(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ae(e[n],t[n]))return!1;return!0}function Eo(e,t,n,r,l,i){if(Dt=i,Q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Pr.current=e===null||e.memoizedState===null?df:ff,e=n(r,l),Dn){i=0;do{if(Dn=!1,Xn=0,25<=i)throw Error(N(301));i+=1,ee=J=null,t.updateQueue=null,Pr.current=pf,e=n(r,l)}while(Dn)}if(Pr.current=el,t=J!==null&&J.next!==null,Dt=0,ee=J=Q=null,qr=!1,t)throw Error(N(300));return e}function No(){var e=Xn!==0;return Xn=0,e}function $e(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?Q.memoizedState=ee=e:ee=ee.next=e,ee}function Ie(){if(J===null){var e=Q.alternate;e=e!==null?e.memoizedState:null}else e=J.next;var t=ee===null?Q.memoizedState:ee.next;if(t!==null)ee=t,J=e;else{if(e===null)throw Error(N(310));J=e,e={memoizedState:J.memoizedState,baseState:J.baseState,baseQueue:J.baseQueue,queue:J.queue,next:null},ee===null?Q.memoizedState=ee=e:ee=ee.next=e}return ee}function Zn(e,t){return typeof t=="function"?t(e):t}function Bl(e){var t=Ie(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=J,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var a=o=null,s=null,c=i;do{var g=c.lane;if((Dt&g)===g)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(a=s=h,o=r):s=s.next=h,Q.lanes|=g,Rt|=g}c=c.next}while(c!==null&&c!==i);s===null?o=r:s.next=a,Ae(r,t.memoizedState)||(ge=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,Q.lanes|=i,Rt|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Hl(e){var t=Ie(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Ae(i,t.memoizedState)||(ge=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function pu(){}function mu(e,t){var n=Q,r=Ie(),l=t(),i=!Ae(r.memoizedState,l);if(i&&(r.memoizedState=l,ge=!0),r=r.queue,Co(vu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,Jn(9,hu.bind(null,n,r,l,t),void 0,null),te===null)throw Error(N(349));Dt&30||gu(n,t,l)}return l}function gu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hu(e,t,n,r){t.value=n,t.getSnapshot=r,yu(t)&&xu(e)}function vu(e,t,n){return n(function(){yu(t)&&xu(e)})}function yu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ae(e,n)}catch{return!0}}function xu(e){var t=Je(e,1);t!==null&&Fe(t,e,1,-1)}function Ca(e){var t=$e();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:e},t.queue=e,e=e.dispatch=cf.bind(null,Q,e),[t.memoizedState,e]}function Jn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wu(){return Ie().memoizedState}function Ir(e,t,n,r){var l=$e();Q.flags|=e,l.memoizedState=Jn(1|t,n,void 0,r===void 0?null:r)}function pl(e,t,n,r){var l=Ie();r=r===void 0?null:r;var i=void 0;if(J!==null){var o=J.memoizedState;if(i=o.destroy,r!==null&&So(r,o.deps)){l.memoizedState=Jn(t,n,i,r);return}}Q.flags|=e,l.memoizedState=Jn(1|t,n,i,r)}function ja(e,t){return Ir(8390656,8,e,t)}function Co(e,t){return pl(2048,8,e,t)}function ku(e,t){return pl(4,2,e,t)}function Su(e,t){return pl(4,4,e,t)}function Eu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Nu(e,t,n){return n=n!=null?n.concat([e]):null,pl(4,4,Eu.bind(null,t,e),n)}function jo(){}function Cu(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&So(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ju(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&So(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function _u(e,t,n){return Dt&21?(Ae(n,t)||(n=Ls(),Q.lanes|=n,Rt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=n)}function sf(e,t){var n=A;A=n!==0&&4>n?n:4,e(!0);var r=Vl.transition;Vl.transition={};try{e(!1),t()}finally{A=n,Vl.transition=r}}function zu(){return Ie().memoizedState}function uf(e,t,n){var r=mt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Tu(e))Pu(t,n);else if(n=cu(e,t,n,r),n!==null){var l=ce();Fe(n,e,r,l),Iu(n,t,r)}}function cf(e,t,n){var r=mt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Tu(e))Pu(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,a=i(o,n);if(l.hasEagerState=!0,l.eagerState=a,Ae(a,o)){var s=t.interleaved;s===null?(l.next=l,vo(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch{}finally{}n=cu(e,t,l,r),n!==null&&(l=ce(),Fe(n,e,r,l),Iu(n,t,r))}}function Tu(e){var t=e.alternate;return e===Q||t!==null&&t===Q}function Pu(e,t){Dn=qr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Iu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,no(e,n)}}var el={readContext:Pe,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},df={readContext:Pe,useCallback:function(e,t){return $e().memoizedState=[e,t===void 0?null:t],e},useContext:Pe,useEffect:ja,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ir(4194308,4,Eu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ir(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ir(4,2,e,t)},useMemo:function(e,t){var n=$e();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=$e();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=uf.bind(null,Q,e),[r.memoizedState,e]},useRef:function(e){var t=$e();return e={current:e},t.memoizedState=e},useState:Ca,useDebugValue:jo,useDeferredValue:function(e){return $e().memoizedState=e},useTransition:function(){var e=Ca(!1),t=e[0];return e=sf.bind(null,e[1]),$e().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Q,l=$e();if(H){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),te===null)throw Error(N(349));Dt&30||gu(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,ja(vu.bind(null,r,i,e),[e]),r.flags|=2048,Jn(9,hu.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=$e(),t=te.identifierPrefix;if(H){var n=Ge,r=We;n=(r&~(1<<32-Me(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=af++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ff={readContext:Pe,useCallback:Cu,useContext:Pe,useEffect:Co,useImperativeHandle:Nu,useInsertionEffect:ku,useLayoutEffect:Su,useMemo:ju,useReducer:Bl,useRef:wu,useState:function(){return Bl(Zn)},useDebugValue:jo,useDeferredValue:function(e){var t=Ie();return _u(t,J.memoizedState,e)},useTransition:function(){var e=Bl(Zn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:pu,useSyncExternalStore:mu,useId:zu,unstable_isNewReconciler:!1},pf={readContext:Pe,useCallback:Cu,useContext:Pe,useEffect:Co,useImperativeHandle:Nu,useInsertionEffect:ku,useLayoutEffect:Su,useMemo:ju,useReducer:Hl,useRef:wu,useState:function(){return Hl(Zn)},useDebugValue:jo,useDeferredValue:function(e){var t=Ie();return J===null?t.memoizedState=e:_u(t,J.memoizedState,e)},useTransition:function(){var e=Hl(Zn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:pu,useSyncExternalStore:mu,useId:zu,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=W({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function _i(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:W({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ml={isMounted:function(e){return(e=e._reactInternals)?Ft(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ce(),l=mt(e),i=Ye(r,l);i.payload=t,n!=null&&(i.callback=n),t=ft(e,i,l),t!==null&&(Fe(t,e,l,r),Tr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ce(),l=mt(e),i=Ye(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ft(e,i,l),t!==null&&(Fe(t,e,l,r),Tr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ce(),r=mt(e),l=Ye(n,r);l.tag=2,t!=null&&(l.callback=t),t=ft(e,l,r),t!==null&&(Fe(t,e,r,n),Tr(t,e,r))}};function _a(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!Hn(n,r)||!Hn(l,i):!0}function Lu(e,t,n){var r=!1,l=vt,i=t.contextType;return typeof i=="object"&&i!==null?i=Pe(i):(l=ve(t)?It:se.current,r=t.contextTypes,i=(r=r!=null)?on(e,l):vt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function za(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ml.enqueueReplaceState(t,t.state,null)}function zi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},yo(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Pe(i):(i=ve(t)?It:se.current,l.context=on(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(_i(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ml.enqueueReplaceState(l,l.state,null),Zr(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function cn(e,t){try{var n="",r=t;do n+=$c(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function Kl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ti(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var mf=typeof WeakMap=="function"?WeakMap:Map;function Du(e,t,n){n=Ye(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){nl||(nl=!0,Ui=r),Ti(e,t)},n}function Ru(e,t,n){n=Ye(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Ti(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ti(e,t),typeof r!="function"&&(pt===null?pt=new Set([this]):pt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Ta(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new mf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=zf.bind(null,e,t,n),t.then(e,e))}function Pa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ia(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ye(-1,1),t.tag=2,ft(n,t,1))),n.lanes|=1),e)}var gf=et.ReactCurrentOwner,ge=!1;function ue(e,t,n,r){t.child=e===null?uu(t,null,n,r):sn(t,e.child,n,r)}function La(e,t,n,r,l){n=n.render;var i=t.ref;return nn(t,l),r=Eo(e,t,n,r,i,l),n=No(),e!==null&&!ge?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,qe(e,t,l)):(H&&n&&co(t),t.flags|=1,ue(e,t,r,l),t.child)}function Da(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!Ro(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Ou(e,t,i,r,l)):(e=Or(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Hn,n(o,r)&&e.ref===t.ref)return qe(e,t,l)}return t.flags|=1,e=gt(i,r),e.ref=t.ref,e.return=t,t.child=e}function Ou(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(Hn(i,r)&&e.ref===t.ref)if(ge=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(ge=!0);else return t.lanes=e.lanes,qe(e,t,l)}return Pi(e,t,n,r,l)}function Mu(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(Zt,we),we|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(Zt,we),we|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,$(Zt,we),we|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,$(Zt,we),we|=r;return ue(e,t,l,n),t.child}function Fu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Pi(e,t,n,r,l){var i=ve(n)?It:se.current;return i=on(t,i),nn(t,l),n=Eo(e,t,n,r,i,l),r=No(),e!==null&&!ge?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,qe(e,t,l)):(H&&r&&co(t),t.flags|=1,ue(e,t,n,l),t.child)}function Ra(e,t,n,r,l){if(ve(n)){var i=!0;Qr(t)}else i=!1;if(nn(t,l),t.stateNode===null)Lr(e,t),Lu(t,n,r),zi(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var s=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Pe(c):(c=ve(n)?It:se.current,c=on(t,c));var g=n.getDerivedStateFromProps,h=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||s!==c)&&za(t,o,r,c),rt=!1;var m=t.memoizedState;o.state=m,Zr(t,r,o,l),s=t.memoizedState,a!==r||m!==s||he.current||rt?(typeof g=="function"&&(_i(t,n,g,r),s=t.memoizedState),(a=rt||_a(t,n,a,r,m,s,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,du(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:De(t.type,a),o.props=c,h=t.pendingProps,m=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=Pe(s):(s=ve(n)?It:se.current,s=on(t,s));var E=n.getDerivedStateFromProps;(g=typeof E=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||m!==s)&&za(t,o,r,s),rt=!1,m=t.memoizedState,o.state=m,Zr(t,r,o,l);var S=t.memoizedState;a!==h||m!==S||he.current||rt?(typeof E=="function"&&(_i(t,n,E,r),S=t.memoizedState),(c=rt||_a(t,n,c,r,m,S,s)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,S,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,S,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=S),o.props=r,o.state=S,o.context=s,r=c):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Ii(e,t,n,r,i,l)}function Ii(e,t,n,r,l,i){Fu(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&xa(t,n,!1),qe(e,t,i);r=t.stateNode,gf.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=sn(t,e.child,null,i),t.child=sn(t,null,a,i)):ue(e,t,a,i),t.memoizedState=r.state,l&&xa(t,n,!0),t.child}function Au(e){var t=e.stateNode;t.pendingContext?ya(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ya(e,t.context,!1),xo(e,t.containerInfo)}function Oa(e,t,n,r,l){return an(),po(l),t.flags|=256,ue(e,t,n,r),t.child}var Li={dehydrated:null,treeContext:null,retryLane:0};function Di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Uu(e,t,n){var r=t.pendingProps,l=K.current,i=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),$(K,l&1),e===null)return Ci(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=vl(o,r,0,null),e=Pt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Di(n),t.memoizedState=Li,e):_o(t,o));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return hf(e,t,o,r,a,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=gt(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?i=gt(a,i):(i=Pt(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Di(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Li,r}return i=e.child,e=i.sibling,r=gt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function _o(e,t){return t=vl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function wr(e,t,n,r){return r!==null&&po(r),sn(t,e.child,null,n),e=_o(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hf(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Kl(Error(N(422))),wr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=vl({mode:"visible",children:r.children},l,0,null),i=Pt(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&sn(t,e.child,null,o),t.child.memoizedState=Di(o),t.memoizedState=Li,i);if(!(t.mode&1))return wr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(N(419)),r=Kl(i,r,void 0),wr(e,t,o,r)}if(a=(o&e.childLanes)!==0,ge||a){if(r=te,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,Je(e,l),Fe(r,e,l,-1))}return Do(),r=Kl(Error(N(421))),wr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Tf.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,ke=dt(l.nextSibling),Se=t,H=!0,Oe=null,e!==null&&(je[_e++]=We,je[_e++]=Ge,je[_e++]=Lt,We=e.id,Ge=e.overflow,Lt=t),t=_o(t,r.children),t.flags|=4096,t)}function Ma(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ji(e.return,t,n)}function Ql(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function $u(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(ue(e,t,r.children,n),r=K.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ma(e,n,t);else if(e.tag===19)Ma(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if($(K,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Jr(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Ql(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Jr(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Ql(t,!0,n,null,i);break;case"together":Ql(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Lr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function qe(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Rt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function vf(e,t,n){switch(t.tag){case 3:Au(t),an();break;case 5:fu(t);break;case 1:ve(t.type)&&Qr(t);break;case 4:xo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;$(Yr,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?($(K,K.current&1),t.flags|=128,null):n&t.child.childLanes?Uu(e,t,n):($(K,K.current&1),e=qe(e,t,n),e!==null?e.sibling:null);$(K,K.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return $u(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),$(K,K.current),r)break;return null;case 22:case 23:return t.lanes=0,Mu(e,t,n)}return qe(e,t,n)}var bu,Ri,Vu,Bu;bu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ri=function(){};Vu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,zt(Be.current);var i=null;switch(n){case"input":l=ni(e,l),r=ni(e,r),i=[];break;case"select":l=W({},l,{value:void 0}),r=W({},r,{value:void 0}),i=[];break;case"textarea":l=ii(e,l),r=ii(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Hr)}ai(n,r);var o;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var a=l[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Fn.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var s=r[c];if(a=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&s!==a&&(s!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&a[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(i||(i=[]),i.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Fn.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&V("scroll",e),i||a===s||(i=[])):(i=i||[]).push(c,s))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};Bu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Sn(e,t){if(!H)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function yf(e,t,n){var r=t.pendingProps;switch(fo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(t),null;case 1:return ve(t.type)&&Kr(),oe(t),null;case 3:return r=t.stateNode,un(),B(he),B(se),ko(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Oe!==null&&(Vi(Oe),Oe=null))),Ri(e,t),oe(t),null;case 5:wo(t);var l=zt(Yn.current);if(n=t.type,e!==null&&t.stateNode!=null)Vu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return oe(t),null}if(e=zt(Be.current),yr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[be]=t,r[Wn]=i,e=(t.mode&1)!==0,n){case"dialog":V("cancel",r),V("close",r);break;case"iframe":case"object":case"embed":V("load",r);break;case"video":case"audio":for(l=0;l<_n.length;l++)V(_n[l],r);break;case"source":V("error",r);break;case"img":case"image":case"link":V("error",r),V("load",r);break;case"details":V("toggle",r);break;case"input":Ko(r,i),V("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},V("invalid",r);break;case"textarea":Wo(r,i),V("invalid",r)}ai(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),l=["children",""+a]):Fn.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&V("scroll",r)}switch(n){case"input":ur(r),Qo(r,i,!0);break;case"textarea":ur(r),Go(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Hr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=vs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[be]=t,e[Wn]=r,bu(e,t,!1,!1),t.stateNode=e;e:{switch(o=si(n,r),n){case"dialog":V("cancel",e),V("close",e),l=r;break;case"iframe":case"object":case"embed":V("load",e),l=r;break;case"video":case"audio":for(l=0;l<_n.length;l++)V(_n[l],e);l=r;break;case"source":V("error",e),l=r;break;case"img":case"image":case"link":V("error",e),V("load",e),l=r;break;case"details":V("toggle",e),l=r;break;case"input":Ko(e,r),l=ni(e,r),V("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=W({},r,{value:void 0}),V("invalid",e);break;case"textarea":Wo(e,r),l=ii(e,r),V("invalid",e);break;default:l=r}ai(n,l),a=l;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?ws(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ys(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&An(e,s):typeof s=="number"&&An(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Fn.hasOwnProperty(i)?s!=null&&i==="onScroll"&&V("scroll",e):s!=null&&Xi(e,i,s,o))}switch(n){case"input":ur(e),Qo(e,r,!1);break;case"textarea":ur(e),Go(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ht(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Jt(e,!!r.multiple,i,!1):r.defaultValue!=null&&Jt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Hr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return oe(t),null;case 6:if(e&&t.stateNode!=null)Bu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=zt(Yn.current),zt(Be.current),yr(t)){if(r=t.stateNode,n=t.memoizedProps,r[be]=t,(i=r.nodeValue!==n)&&(e=Se,e!==null))switch(e.tag){case 3:vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&vr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[be]=t,t.stateNode=r}return oe(t),null;case 13:if(B(K),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(H&&ke!==null&&t.mode&1&&!(t.flags&128))au(),an(),t.flags|=98560,i=!1;else if(i=yr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(N(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(N(317));i[be]=t}else an(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;oe(t),i=!1}else Oe!==null&&(Vi(Oe),Oe=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||K.current&1?q===0&&(q=3):Do())),t.updateQueue!==null&&(t.flags|=4),oe(t),null);case 4:return un(),Ri(e,t),e===null&&Kn(t.stateNode.containerInfo),oe(t),null;case 10:return ho(t.type._context),oe(t),null;case 17:return ve(t.type)&&Kr(),oe(t),null;case 19:if(B(K),i=t.memoizedState,i===null)return oe(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)Sn(i,!1);else{if(q!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Jr(e),o!==null){for(t.flags|=128,Sn(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(K,K.current&1|2),t.child}e=e.sibling}i.tail!==null&&Y()>dn&&(t.flags|=128,r=!0,Sn(i,!1),t.lanes=4194304)}else{if(!r)if(e=Jr(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Sn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!H)return oe(t),null}else 2*Y()-i.renderingStartTime>dn&&n!==1073741824&&(t.flags|=128,r=!0,Sn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Y(),t.sibling=null,n=K.current,$(K,r?n&1|2:n&1),t):(oe(t),null);case 22:case 23:return Lo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?we&1073741824&&(oe(t),t.subtreeFlags&6&&(t.flags|=8192)):oe(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function xf(e,t){switch(fo(t),t.tag){case 1:return ve(t.type)&&Kr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return un(),B(he),B(se),ko(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return wo(t),null;case 13:if(B(K),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));an()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(K),null;case 4:return un(),null;case 10:return ho(t.type._context),null;case 22:case 23:return Lo(),null;case 24:return null;default:return null}}var kr=!1,ae=!1,wf=typeof WeakSet=="function"?WeakSet:Set,T=null;function Xt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){G(e,t,r)}else n.current=null}function Oi(e,t,n){try{n()}catch(r){G(e,t,r)}}var Fa=!1;function kf(e,t){if(yi=br,e=Gs(),uo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,s=-1,c=0,g=0,h=e,m=null;t:for(;;){for(var E;h!==n||l!==0&&h.nodeType!==3||(a=o+l),h!==i||r!==0&&h.nodeType!==3||(s=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(E=h.firstChild)!==null;)m=h,h=E;for(;;){if(h===e)break t;if(m===n&&++c===l&&(a=o),m===i&&++g===r&&(s=o),(E=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=E}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(xi={focusedElem:e,selectionRange:n},br=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var S=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var j=S.memoizedProps,L=S.memoizedState,p=t.stateNode,d=p.getSnapshotBeforeUpdate(t.elementType===t.type?j:De(t.type,j),L);p.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(v){G(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return S=Fa,Fa=!1,S}function Rn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Oi(t,n,i)}l=l.next}while(l!==r)}}function gl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Mi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Hu(e){var t=e.alternate;t!==null&&(e.alternate=null,Hu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[be],delete t[Wn],delete t[Si],delete t[nf],delete t[rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ku(e){return e.tag===5||e.tag===3||e.tag===4}function Aa(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ku(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Hr));else if(r!==4&&(e=e.child,e!==null))for(Fi(e,t,n),e=e.sibling;e!==null;)Fi(e,t,n),e=e.sibling}function Ai(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ai(e,t,n),e=e.sibling;e!==null;)Ai(e,t,n),e=e.sibling}var ne=null,Re=!1;function tt(e,t,n){for(n=n.child;n!==null;)Qu(e,t,n),n=n.sibling}function Qu(e,t,n){if(Ve&&typeof Ve.onCommitFiberUnmount=="function")try{Ve.onCommitFiberUnmount(al,n)}catch{}switch(n.tag){case 5:ae||Xt(n,t);case 6:var r=ne,l=Re;ne=null,tt(e,t,n),ne=r,Re=l,ne!==null&&(Re?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(Re?(e=ne,n=n.stateNode,e.nodeType===8?Ul(e.parentNode,n):e.nodeType===1&&Ul(e,n),Vn(e)):Ul(ne,n.stateNode));break;case 4:r=ne,l=Re,ne=n.stateNode.containerInfo,Re=!0,tt(e,t,n),ne=r,Re=l;break;case 0:case 11:case 14:case 15:if(!ae&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Oi(n,t,o),l=l.next}while(l!==r)}tt(e,t,n);break;case 1:if(!ae&&(Xt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){G(n,t,a)}tt(e,t,n);break;case 21:tt(e,t,n);break;case 22:n.mode&1?(ae=(r=ae)||n.memoizedState!==null,tt(e,t,n),ae=r):tt(e,t,n);break;default:tt(e,t,n)}}function Ua(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new wf),t.forEach(function(r){var l=Pf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Le(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:ne=a.stateNode,Re=!1;break e;case 3:ne=a.stateNode.containerInfo,Re=!0;break e;case 4:ne=a.stateNode.containerInfo,Re=!0;break e}a=a.return}if(ne===null)throw Error(N(160));Qu(i,o,l),ne=null,Re=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(c){G(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Wu(t,e),t=t.sibling}function Wu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(t,e),Ue(e),r&4){try{Rn(3,e,e.return),gl(3,e)}catch(j){G(e,e.return,j)}try{Rn(5,e,e.return)}catch(j){G(e,e.return,j)}}break;case 1:Le(t,e),Ue(e),r&512&&n!==null&&Xt(n,n.return);break;case 5:if(Le(t,e),Ue(e),r&512&&n!==null&&Xt(n,n.return),e.flags&32){var l=e.stateNode;try{An(l,"")}catch(j){G(e,e.return,j)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&gs(l,i),si(a,o);var c=si(a,i);for(o=0;o<s.length;o+=2){var g=s[o],h=s[o+1];g==="style"?ws(l,h):g==="dangerouslySetInnerHTML"?ys(l,h):g==="children"?An(l,h):Xi(l,g,h,c)}switch(a){case"input":ri(l,i);break;case"textarea":hs(l,i);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var E=i.value;E!=null?Jt(l,!!i.multiple,E,!1):m!==!!i.multiple&&(i.defaultValue!=null?Jt(l,!!i.multiple,i.defaultValue,!0):Jt(l,!!i.multiple,i.multiple?[]:"",!1))}l[Wn]=i}catch(j){G(e,e.return,j)}}break;case 6:if(Le(t,e),Ue(e),r&4){if(e.stateNode===null)throw Error(N(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(j){G(e,e.return,j)}}break;case 3:if(Le(t,e),Ue(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vn(t.containerInfo)}catch(j){G(e,e.return,j)}break;case 4:Le(t,e),Ue(e);break;case 13:Le(t,e),Ue(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(Po=Y())),r&4&&Ua(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(ae=(c=ae)||g,Le(t,e),ae=c):Le(t,e),Ue(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(T=e,g=e.child;g!==null;){for(h=T=g;T!==null;){switch(m=T,E=m.child,m.tag){case 0:case 11:case 14:case 15:Rn(4,m,m.return);break;case 1:Xt(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(j){G(r,n,j)}}break;case 5:Xt(m,m.return);break;case 22:if(m.memoizedState!==null){ba(h);continue}}E!==null?(E.return=m,T=E):ba(h)}g=g.sibling}e:for(g=null,h=e;;){if(h.tag===5){if(g===null){g=h;try{l=h.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=h.stateNode,s=h.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=xs("display",o))}catch(j){G(e,e.return,j)}}}else if(h.tag===6){if(g===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(j){G(e,e.return,j)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;g===h&&(g=null),h=h.return}g===h&&(g=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Le(t,e),Ue(e),r&4&&Ua(e);break;case 21:break;default:Le(t,e),Ue(e)}}function Ue(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ku(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(An(l,""),r.flags&=-33);var i=Aa(e);Ai(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Aa(e);Fi(e,a,o);break;default:throw Error(N(161))}}catch(s){G(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sf(e,t,n){T=e,Gu(e)}function Gu(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var l=T,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||kr;if(!o){var a=l.alternate,s=a!==null&&a.memoizedState!==null||ae;a=kr;var c=ae;if(kr=o,(ae=s)&&!c)for(T=l;T!==null;)o=T,s=o.child,o.tag===22&&o.memoizedState!==null?Va(l):s!==null?(s.return=o,T=s):Va(l);for(;i!==null;)T=i,Gu(i),i=i.sibling;T=l,kr=a,ae=c}$a(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,T=i):$a(e)}}function $a(e){for(;T!==null;){var t=T;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ae||gl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ae)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:De(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Na(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Na(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var h=g.dehydrated;h!==null&&Vn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}ae||t.flags&512&&Mi(t)}catch(m){G(t,t.return,m)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function ba(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function Va(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{gl(4,t)}catch(s){G(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){G(t,l,s)}}var i=t.return;try{Mi(t)}catch(s){G(t,i,s)}break;case 5:var o=t.return;try{Mi(t)}catch(s){G(t,o,s)}}}catch(s){G(t,t.return,s)}if(t===e){T=null;break}var a=t.sibling;if(a!==null){a.return=t.return,T=a;break}T=t.return}}var Ef=Math.ceil,tl=et.ReactCurrentDispatcher,zo=et.ReactCurrentOwner,Te=et.ReactCurrentBatchConfig,O=0,te=null,Z=null,re=0,we=0,Zt=xt(0),q=0,qn=null,Rt=0,hl=0,To=0,On=null,pe=null,Po=0,dn=1/0,Ke=null,nl=!1,Ui=null,pt=null,Sr=!1,at=null,rl=0,Mn=0,$i=null,Dr=-1,Rr=0;function ce(){return O&6?Y():Dr!==-1?Dr:Dr=Y()}function mt(e){return e.mode&1?O&2&&re!==0?re&-re:of.transition!==null?(Rr===0&&(Rr=Ls()),Rr):(e=A,e!==0||(e=window.event,e=e===void 0?16:Us(e.type)),e):1}function Fe(e,t,n,r){if(50<Mn)throw Mn=0,$i=null,Error(N(185));tr(e,n,r),(!(O&2)||e!==te)&&(e===te&&(!(O&2)&&(hl|=n),q===4&&it(e,re)),ye(e,r),n===1&&O===0&&!(t.mode&1)&&(dn=Y()+500,fl&&wt()))}function ye(e,t){var n=e.callbackNode;id(e,t);var r=$r(e,e===te?re:0);if(r===0)n!==null&&Zo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Zo(n),t===1)e.tag===0?lf(Ba.bind(null,e)):lu(Ba.bind(null,e)),ef(function(){!(O&6)&&wt()}),n=null;else{switch(Ds(r)){case 1:n=to;break;case 4:n=Ps;break;case 16:n=Ur;break;case 536870912:n=Is;break;default:n=Ur}n=nc(n,Yu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Yu(e,t){if(Dr=-1,Rr=0,O&6)throw Error(N(327));var n=e.callbackNode;if(rn()&&e.callbackNode!==n)return null;var r=$r(e,e===te?re:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ll(e,r);else{t=r;var l=O;O|=2;var i=Zu();(te!==e||re!==t)&&(Ke=null,dn=Y()+500,Tt(e,t));do try{jf();break}catch(a){Xu(e,a)}while(!0);go(),tl.current=i,O=l,Z!==null?t=0:(te=null,re=0,t=q)}if(t!==0){if(t===2&&(l=pi(e),l!==0&&(r=l,t=bi(e,l))),t===1)throw n=qn,Tt(e,0),it(e,r),ye(e,Y()),n;if(t===6)it(e,r);else{if(l=e.current.alternate,!(r&30)&&!Nf(l)&&(t=ll(e,r),t===2&&(i=pi(e),i!==0&&(r=i,t=bi(e,i))),t===1))throw n=qn,Tt(e,0),it(e,r),ye(e,Y()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:Ct(e,pe,Ke);break;case 3:if(it(e,r),(r&130023424)===r&&(t=Po+500-Y(),10<t)){if($r(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ce(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ki(Ct.bind(null,e,pe,Ke),t);break}Ct(e,pe,Ke);break;case 4:if(it(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-Me(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ef(r/1960))-r,10<r){e.timeoutHandle=ki(Ct.bind(null,e,pe,Ke),r);break}Ct(e,pe,Ke);break;case 5:Ct(e,pe,Ke);break;default:throw Error(N(329))}}}return ye(e,Y()),e.callbackNode===n?Yu.bind(null,e):null}function bi(e,t){var n=On;return e.current.memoizedState.isDehydrated&&(Tt(e,t).flags|=256),e=ll(e,t),e!==2&&(t=pe,pe=n,t!==null&&Vi(t)),e}function Vi(e){pe===null?pe=e:pe.push.apply(pe,e)}function Nf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Ae(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function it(e,t){for(t&=~To,t&=~hl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Me(t),r=1<<n;e[n]=-1,t&=~r}}function Ba(e){if(O&6)throw Error(N(327));rn();var t=$r(e,0);if(!(t&1))return ye(e,Y()),null;var n=ll(e,t);if(e.tag!==0&&n===2){var r=pi(e);r!==0&&(t=r,n=bi(e,r))}if(n===1)throw n=qn,Tt(e,0),it(e,t),ye(e,Y()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ct(e,pe,Ke),ye(e,Y()),null}function Io(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(dn=Y()+500,fl&&wt())}}function Ot(e){at!==null&&at.tag===0&&!(O&6)&&rn();var t=O;O|=1;var n=Te.transition,r=A;try{if(Te.transition=null,A=1,e)return e()}finally{A=r,Te.transition=n,O=t,!(O&6)&&wt()}}function Lo(){we=Zt.current,B(Zt)}function Tt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qd(n)),Z!==null)for(n=Z.return;n!==null;){var r=n;switch(fo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Kr();break;case 3:un(),B(he),B(se),ko();break;case 5:wo(r);break;case 4:un();break;case 13:B(K);break;case 19:B(K);break;case 10:ho(r.type._context);break;case 22:case 23:Lo()}n=n.return}if(te=e,Z=e=gt(e.current,null),re=we=t,q=0,qn=null,To=hl=Rt=0,pe=On=null,_t!==null){for(t=0;t<_t.length;t++)if(n=_t[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}_t=null}return e}function Xu(e,t){do{var n=Z;try{if(go(),Pr.current=el,qr){for(var r=Q.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}qr=!1}if(Dt=0,ee=J=Q=null,Dn=!1,Xn=0,zo.current=null,n===null||n.return===null){q=1,qn=t,Z=null;break}e:{var i=e,o=n.return,a=n,s=t;if(t=re,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,g=a,h=g.tag;if(!(g.mode&1)&&(h===0||h===11||h===15)){var m=g.alternate;m?(g.updateQueue=m.updateQueue,g.memoizedState=m.memoizedState,g.lanes=m.lanes):(g.updateQueue=null,g.memoizedState=null)}var E=Pa(o);if(E!==null){E.flags&=-257,Ia(E,o,a,i,t),E.mode&1&&Ta(i,c,t),t=E,s=c;var S=t.updateQueue;if(S===null){var j=new Set;j.add(s),t.updateQueue=j}else S.add(s);break e}else{if(!(t&1)){Ta(i,c,t),Do();break e}s=Error(N(426))}}else if(H&&a.mode&1){var L=Pa(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Ia(L,o,a,i,t),po(cn(s,a));break e}}i=s=cn(s,a),q!==4&&(q=2),On===null?On=[i]:On.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Du(i,s,t);Ea(i,p);break e;case 1:a=s;var d=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(pt===null||!pt.has(f)))){i.flags|=65536,t&=-t,i.lanes|=t;var v=Ru(i,a,t);Ea(i,v);break e}}i=i.return}while(i!==null)}qu(n)}catch(w){t=w,Z===n&&n!==null&&(Z=n=n.return);continue}break}while(!0)}function Zu(){var e=tl.current;return tl.current=el,e===null?el:e}function Do(){(q===0||q===3||q===2)&&(q=4),te===null||!(Rt&268435455)&&!(hl&268435455)||it(te,re)}function ll(e,t){var n=O;O|=2;var r=Zu();(te!==e||re!==t)&&(Ke=null,Tt(e,t));do try{Cf();break}catch(l){Xu(e,l)}while(!0);if(go(),O=n,tl.current=r,Z!==null)throw Error(N(261));return te=null,re=0,q}function Cf(){for(;Z!==null;)Ju(Z)}function jf(){for(;Z!==null&&!Xc();)Ju(Z)}function Ju(e){var t=tc(e.alternate,e,we);e.memoizedProps=e.pendingProps,t===null?qu(e):Z=t,zo.current=null}function qu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=xf(n,t),n!==null){n.flags&=32767,Z=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{q=6,Z=null;return}}else if(n=yf(n,t,we),n!==null){Z=n;return}if(t=t.sibling,t!==null){Z=t;return}Z=t=e}while(t!==null);q===0&&(q=5)}function Ct(e,t,n){var r=A,l=Te.transition;try{Te.transition=null,A=1,_f(e,t,n,r)}finally{Te.transition=l,A=r}return null}function _f(e,t,n,r){do rn();while(at!==null);if(O&6)throw Error(N(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(od(e,i),e===te&&(Z=te=null,re=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Sr||(Sr=!0,nc(Ur,function(){return rn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Te.transition,Te.transition=null;var o=A;A=1;var a=O;O|=4,zo.current=null,kf(e,n),Wu(n,e),Qd(xi),br=!!yi,xi=yi=null,e.current=n,Sf(n),Zc(),O=a,A=o,Te.transition=i}else e.current=n;if(Sr&&(Sr=!1,at=e,rl=l),i=e.pendingLanes,i===0&&(pt=null),ed(n.stateNode),ye(e,Y()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(nl)throw nl=!1,e=Ui,Ui=null,e;return rl&1&&e.tag!==0&&rn(),i=e.pendingLanes,i&1?e===$i?Mn++:(Mn=0,$i=e):Mn=0,wt(),null}function rn(){if(at!==null){var e=Ds(rl),t=Te.transition,n=A;try{if(Te.transition=null,A=16>e?16:e,at===null)var r=!1;else{if(e=at,at=null,rl=0,O&6)throw Error(N(331));var l=O;for(O|=4,T=e.current;T!==null;){var i=T,o=i.child;if(T.flags&16){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var c=a[s];for(T=c;T!==null;){var g=T;switch(g.tag){case 0:case 11:case 15:Rn(8,g,i)}var h=g.child;if(h!==null)h.return=g,T=h;else for(;T!==null;){g=T;var m=g.sibling,E=g.return;if(Hu(g),g===c){T=null;break}if(m!==null){m.return=E,T=m;break}T=E}}}var S=i.alternate;if(S!==null){var j=S.child;if(j!==null){S.child=null;do{var L=j.sibling;j.sibling=null,j=L}while(j!==null)}}T=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,T=o;else e:for(;T!==null;){if(i=T,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Rn(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,T=p;break e}T=i.return}}var d=e.current;for(T=d;T!==null;){o=T;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,T=f;else e:for(o=d;T!==null;){if(a=T,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:gl(9,a)}}catch(w){G(a,a.return,w)}if(a===o){T=null;break e}var v=a.sibling;if(v!==null){v.return=a.return,T=v;break e}T=a.return}}if(O=l,wt(),Ve&&typeof Ve.onPostCommitFiberRoot=="function")try{Ve.onPostCommitFiberRoot(al,e)}catch{}r=!0}return r}finally{A=n,Te.transition=t}}return!1}function Ha(e,t,n){t=cn(n,t),t=Du(e,t,1),e=ft(e,t,1),t=ce(),e!==null&&(tr(e,1,t),ye(e,t))}function G(e,t,n){if(e.tag===3)Ha(e,e,n);else for(;t!==null;){if(t.tag===3){Ha(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pt===null||!pt.has(r))){e=cn(n,e),e=Ru(t,e,1),t=ft(t,e,1),e=ce(),t!==null&&(tr(t,1,e),ye(t,e));break}}t=t.return}}function zf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ce(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(re&n)===n&&(q===4||q===3&&(re&130023424)===re&&500>Y()-Po?Tt(e,0):To|=n),ye(e,t)}function ec(e,t){t===0&&(e.mode&1?(t=fr,fr<<=1,!(fr&130023424)&&(fr=4194304)):t=1);var n=ce();e=Je(e,t),e!==null&&(tr(e,t,n),ye(e,n))}function Tf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ec(e,n)}function Pf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),ec(e,n)}var tc;tc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||he.current)ge=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ge=!1,vf(e,t,n);ge=!!(e.flags&131072)}else ge=!1,H&&t.flags&1048576&&iu(t,Gr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Lr(e,t),e=t.pendingProps;var l=on(t,se.current);nn(t,n),l=Eo(null,t,r,e,l,n);var i=No();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(r)?(i=!0,Qr(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,yo(t),l.updater=ml,t.stateNode=l,l._reactInternals=t,zi(t,r,e,n),t=Ii(null,t,r,!0,i,n)):(t.tag=0,H&&i&&co(t),ue(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Lr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Lf(r),e=De(r,e),l){case 0:t=Pi(null,t,r,e,n);break e;case 1:t=Ra(null,t,r,e,n);break e;case 11:t=La(null,t,r,e,n);break e;case 14:t=Da(null,t,r,De(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),Pi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),Ra(e,t,r,l,n);case 3:e:{if(Au(t),e===null)throw Error(N(387));r=t.pendingProps,i=t.memoizedState,l=i.element,du(e,t),Zr(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=cn(Error(N(423)),t),t=Oa(e,t,r,n,l);break e}else if(r!==l){l=cn(Error(N(424)),t),t=Oa(e,t,r,n,l);break e}else for(ke=dt(t.stateNode.containerInfo.firstChild),Se=t,H=!0,Oe=null,n=uu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(an(),r===l){t=qe(e,t,n);break e}ue(e,t,r,n)}t=t.child}return t;case 5:return fu(t),e===null&&Ci(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,wi(r,l)?o=null:i!==null&&wi(r,i)&&(t.flags|=32),Fu(e,t),ue(e,t,o,n),t.child;case 6:return e===null&&Ci(t),null;case 13:return Uu(e,t,n);case 4:return xo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=sn(t,null,r,n):ue(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),La(e,t,r,l,n);case 7:return ue(e,t,t.pendingProps,n),t.child;case 8:return ue(e,t,t.pendingProps.children,n),t.child;case 12:return ue(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,$(Yr,r._currentValue),r._currentValue=o,i!==null)if(Ae(i.value,o)){if(i.children===l.children&&!he.current){t=qe(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=Ye(-1,n&-n),s.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?s.next=s:(s.next=g.next,g.next=s),c.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),ji(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(N(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ji(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ue(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,nn(t,n),l=Pe(l),r=r(l),t.flags|=1,ue(e,t,r,n),t.child;case 14:return r=t.type,l=De(r,t.pendingProps),l=De(r.type,l),Da(e,t,r,l,n);case 15:return Ou(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),Lr(e,t),t.tag=1,ve(r)?(e=!0,Qr(t)):e=!1,nn(t,n),Lu(t,r,l),zi(t,r,l,n),Ii(null,t,r,!0,e,n);case 19:return $u(e,t,n);case 22:return Mu(e,t,n)}throw Error(N(156,t.tag))};function nc(e,t){return Ts(e,t)}function If(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ze(e,t,n,r){return new If(e,t,n,r)}function Ro(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Lf(e){if(typeof e=="function")return Ro(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ji)return 11;if(e===qi)return 14}return 2}function gt(e,t){var n=e.alternate;return n===null?(n=ze(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Or(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")Ro(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case bt:return Pt(n.children,l,i,t);case Zi:o=8,l|=8;break;case Jl:return e=ze(12,n,t,l|2),e.elementType=Jl,e.lanes=i,e;case ql:return e=ze(13,n,t,l),e.elementType=ql,e.lanes=i,e;case ei:return e=ze(19,n,t,l),e.elementType=ei,e.lanes=i,e;case fs:return vl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cs:o=10;break e;case ds:o=9;break e;case Ji:o=11;break e;case qi:o=14;break e;case nt:o=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=ze(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function Pt(e,t,n,r){return e=ze(7,e,r,t),e.lanes=n,e}function vl(e,t,n,r){return e=ze(22,e,r,t),e.elementType=fs,e.lanes=n,e.stateNode={isHidden:!1},e}function Wl(e,t,n){return e=ze(6,e,null,t),e.lanes=n,e}function Gl(e,t,n){return t=ze(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Df(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zl(0),this.expirationTimes=zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Oo(e,t,n,r,l,i,o,a,s){return e=new Df(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=ze(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},yo(i),e}function Rf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:$t,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rc(e){if(!e)return vt;e=e._reactInternals;e:{if(Ft(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(ve(n))return ru(e,n,t)}return t}function lc(e,t,n,r,l,i,o,a,s){return e=Oo(n,r,!0,e,l,i,o,a,s),e.context=rc(null),n=e.current,r=ce(),l=mt(n),i=Ye(r,l),i.callback=t??null,ft(n,i,l),e.current.lanes=l,tr(e,l,r),ye(e,r),e}function yl(e,t,n,r){var l=t.current,i=ce(),o=mt(l);return n=rc(n),t.context===null?t.context=n:t.pendingContext=n,t=Ye(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ft(l,t,o),e!==null&&(Fe(e,l,o,i),Tr(e,l,o)),o}function il(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ka(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Mo(e,t){Ka(e,t),(e=e.alternate)&&Ka(e,t)}function Of(){return null}var ic=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fo(e){this._internalRoot=e}xl.prototype.render=Fo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));yl(e,t,null,null)};xl.prototype.unmount=Fo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ot(function(){yl(null,e,null,null)}),t[Ze]=null}};function xl(e){this._internalRoot=e}xl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ms();e={blockedOn:null,target:e,priority:t};for(var n=0;n<lt.length&&t!==0&&t<lt[n].priority;n++);lt.splice(n,0,e),n===0&&As(e)}};function Ao(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Qa(){}function Mf(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=il(o);i.call(c)}}var o=lc(t,r,e,0,null,!1,!1,"",Qa);return e._reactRootContainer=o,e[Ze]=o.current,Kn(e.nodeType===8?e.parentNode:e),Ot(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var c=il(s);a.call(c)}}var s=Oo(e,0,!1,null,null,!1,!1,"",Qa);return e._reactRootContainer=s,e[Ze]=s.current,Kn(e.nodeType===8?e.parentNode:e),Ot(function(){yl(t,s,n,r)}),s}function kl(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var a=l;l=function(){var s=il(o);a.call(s)}}yl(t,o,e,l)}else o=Mf(n,t,e,l,r);return il(o)}Rs=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=jn(t.pendingLanes);n!==0&&(no(t,n|1),ye(t,Y()),!(O&6)&&(dn=Y()+500,wt()))}break;case 13:Ot(function(){var r=Je(e,1);if(r!==null){var l=ce();Fe(r,e,1,l)}}),Mo(e,1)}};ro=function(e){if(e.tag===13){var t=Je(e,134217728);if(t!==null){var n=ce();Fe(t,e,134217728,n)}Mo(e,134217728)}};Os=function(e){if(e.tag===13){var t=mt(e),n=Je(e,t);if(n!==null){var r=ce();Fe(n,e,t,r)}Mo(e,t)}};Ms=function(){return A};Fs=function(e,t){var n=A;try{return A=e,t()}finally{A=n}};ci=function(e,t,n){switch(t){case"input":if(ri(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=dl(r);if(!l)throw Error(N(90));ms(r),ri(r,l)}}}break;case"textarea":hs(e,n);break;case"select":t=n.value,t!=null&&Jt(e,!!n.multiple,t,!1)}};Es=Io;Ns=Ot;var Ff={usingClientEntryPoint:!1,Events:[rr,Kt,dl,ks,Ss,Io]},En={findFiberByHostInstance:jt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Af={bundleType:En.bundleType,version:En.version,rendererPackageName:En.rendererPackageName,rendererConfig:En.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:et.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=_s(e),e===null?null:e.stateNode},findFiberByHostInstance:En.findFiberByHostInstance||Of,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Er=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Er.isDisabled&&Er.supportsFiber)try{al=Er.inject(Af),Ve=Er}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ff;Ne.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ao(t))throw Error(N(200));return Rf(e,t,null,n)};Ne.createRoot=function(e,t){if(!Ao(e))throw Error(N(299));var n=!1,r="",l=ic;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Oo(e,1,!1,null,null,n,!1,r,l),e[Ze]=t.current,Kn(e.nodeType===8?e.parentNode:e),new Fo(t)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=_s(t),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return Ot(e)};Ne.hydrate=function(e,t,n){if(!wl(t))throw Error(N(200));return kl(null,e,t,!0,n)};Ne.hydrateRoot=function(e,t,n){if(!Ao(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=ic;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=lc(t,null,e,1,n??null,l,!1,i,o),e[Ze]=t.current,Kn(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new xl(t)};Ne.render=function(e,t,n){if(!wl(t))throw Error(N(200));return kl(null,e,t,!1,n)};Ne.unmountComponentAtNode=function(e){if(!wl(e))throw Error(N(40));return e._reactRootContainer?(Ot(function(){kl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ze]=null})}),!0):!1};Ne.unstable_batchedUpdates=Io;Ne.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!wl(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return kl(e,t,n,!1,r)};Ne.version="18.3.1-next-f1338f8080-20240426";function oc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(oc)}catch(e){console.error(e)}}oc(),os.exports=Ne;var Uf=os.exports,ac,Wa=Uf;ac=Wa.createRoot,Wa.hydrateRoot;const me="/api",Yl={async getAll(){const e=await fetch(`${me}/nodes`);if(!e.ok)throw new Error("Failed to fetch nodes");return e.json()},async get(e){const t=await fetch(`${me}/nodes/${e}`);if(!t.ok)throw new Error("Failed to fetch node");return t.json()},async create(e){const t=await fetch(`${me}/nodes`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create node");return t.json()},async update(e,t){const n=await fetch(`${me}/nodes/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error("Failed to update node");return n.json()},async delete(e){if(!(await fetch(`${me}/nodes/${e}`,{method:"DELETE"})).ok)throw new Error("Failed to delete node")}},Xl={async getTree(e){const t=await fetch(`${me}/hierarchy/tree/${e}`);if(!t.ok)throw new Error(`Failed to fetch ${e} tree`);return t.json()},async getSegments(){const e=await fetch(`${me}/hierarchy/segments`);if(!e.ok)throw new Error("Failed to fetch segments");return e.json()},async getOrganizations(){const e=await fetch(`${me}/hierarchy/organizations`);if(!e.ok)throw new Error("Failed to fetch organizations");return e.json()}},$f={async search(e,t){const n=new URLSearchParams({q:e});t&&n.append("filters",JSON.stringify(t));const r=await fetch(`${me}/search?${n}`);if(!r.ok)throw new Error("Failed to search");return r.json()}},bf={async importUrl(e){const t=await fetch(`${me}/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}),n=await t.json();return t.ok?n:{success:!1,error:n.error||"Import failed"}}},Vf={async merge(e,t,n){const r=await fetch(`${me}/nodes/${e}/merge`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({secondaryId:t,options:n})});if(!r.ok)throw new Error("Failed to merge nodes");return r.json()}},Bf={async moveNode(e,t,n){const r=await fetch(`${me}/nodes/${e}/move`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetParentId:t,targetHierarchy:n})});if(!r.ok)throw new Error("Failed to move node");return r.json()}},Ga={async setApiKey(e){if(!(await fetch(`${me}/settings/api-key`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({apiKey:e})})).ok)throw new Error("Failed to set API key")},async getApiKeyStatus(){const e=await fetch(`${me}/settings/api-key/status`);if(!e.ok)throw new Error("Failed to get API key status");return e.json()}},Hf={currentView:"function",segments:[],organizations:[],tree:[],selectedNodeId:null,selectedNode:null,loading:!0,error:null,searchQuery:"",searchResults:[],importDialogOpen:!1,mergeDialogOpen:!1,mergeSourceNodeId:null,selectedSegmentId:null,selectedOrganizationId:null,expandedNodeIds:new Set,searchResultIds:new Set,treeLoading:!0};function Kf(e,t){switch(t.type){case"SET_VIEW":return{...e,currentView:t.view};case"SET_SEGMENTS":return{...e,segments:t.segments};case"SET_ORGANIZATIONS":return{...e,organizations:t.organizations};case"SET_TREE":return{...e,tree:t.tree};case"SELECT_NODE":return{...e,selectedNodeId:t.id};case"SET_SELECTED_NODE":return{...e,selectedNode:t.node};case"SET_LOADING":return{...e,loading:t.loading};case"SET_ERROR":return{...e,error:t.error};case"SET_SEARCH_QUERY":return{...e,searchQuery:t.query};case"SET_SEARCH_RESULTS":return{...e,searchResults:t.results};case"OPEN_IMPORT_DIALOG":return{...e,importDialogOpen:!0};case"CLOSE_IMPORT_DIALOG":return{...e,importDialogOpen:!1};case"OPEN_MERGE_DIALOG":return{...e,mergeDialogOpen:!0,mergeSourceNodeId:t.nodeId};case"CLOSE_MERGE_DIALOG":return{...e,mergeDialogOpen:!1,mergeSourceNodeId:null};case"SET_SELECTED_SEGMENT":return{...e,selectedSegmentId:t.id};case"SET_SELECTED_ORGANIZATION":return{...e,selectedOrganizationId:t.id};case"TOGGLE_NODE_EXPANDED":{const n=new Set(e.expandedNodeIds);return n.has(t.id)?n.delete(t.id):n.add(t.id),{...e,expandedNodeIds:n}}case"SET_TREE_LOADING":return{...e,treeLoading:t.loading};case"SET_SEARCH_RESULT_IDS":return{...e,searchResultIds:t.ids};default:return e}}const sc=k.createContext(null);function Qf({children:e}){const[t,n]=k.useReducer(Kf,Hf),r=k.useCallback(async()=>{try{const x=await Xl.getSegments();n({type:"SET_SEGMENTS",segments:x})}catch(x){console.error("Failed to load segments:",x),n({type:"SET_ERROR",error:"Failed to load segments"})}},[]),l=k.useCallback(async()=>{try{const x=await Xl.getOrganizations();n({type:"SET_ORGANIZATIONS",organizations:x})}catch(x){console.error("Failed to load organizations:",x),n({type:"SET_ERROR",error:"Failed to load organizations"})}},[]),i=k.useCallback(async()=>{n({type:"SET_LOADING",loading:!0});try{const y=(await Xl.getTree(t.currentView)).root||[];n({type:"SET_TREE",tree:y})}catch(x){console.error("Failed to load tree:",x),n({type:"SET_TREE",tree:[]})}finally{n({type:"SET_LOADING",loading:!1})}},[t.currentView]),o=k.useCallback(async x=>{if(n({type:"SELECT_NODE",id:x}),x)try{const y=await Yl.get(x);n({type:"SET_SELECTED_NODE",node:y})}catch(y){console.error("Failed to load node details:",y),n({type:"SET_SELECTED_NODE",node:null})}else n({type:"SET_SELECTED_NODE",node:null})},[]),a=k.useCallback(async(x,y)=>{try{const _=await Yl.update(x,y);n({type:"SET_SELECTED_NODE",node:_}),await i()}catch(_){console.error("Failed to update node:",_),n({type:"SET_ERROR",error:"Failed to update node"})}},[i]),s=k.useCallback(async x=>{try{await Yl.delete(x),n({type:"SELECT_NODE",id:null}),n({type:"SET_SELECTED_NODE",node:null}),await i()}catch(y){console.error("Failed to delete node:",y),n({type:"SET_ERROR",error:"Failed to delete node"})}},[i]),c=k.useCallback(()=>{const x=t.currentView==="function"?"organization":"function";n({type:"SET_VIEW",view:x})},[t.currentView]),g=k.useCallback(async x=>{if(!x.trim()){n({type:"SET_SEARCH_QUERY",query:""}),n({type:"SET_SEARCH_RESULTS",results:[]});return}try{const y=await $f.search(x);n({type:"SET_SEARCH_QUERY",query:x}),n({type:"SET_SEARCH_RESULTS",results:y})}catch(y){console.error("Search failed:",y),n({type:"SET_ERROR",error:"Search failed"})}},[]),h=k.useCallback(async()=>{await i()},[i]),m=k.useCallback(async x=>{try{const y=await bf.importUrl(x);return y.success&&(await i(),y.nodeId&&await o(y.nodeId)),y}catch(y){return console.error("Import failed:",y),{success:!1,error:y instanceof Error?y.message:"Import failed"}}},[i,o]),E=k.useCallback(async x=>{await Ga.setApiKey(x)},[]),S=k.useCallback(async()=>(await Ga.getApiKeyStatus()).configured,[]),j=k.useCallback(()=>{n({type:"OPEN_IMPORT_DIALOG"})},[]),L=k.useCallback(()=>{n({type:"CLOSE_IMPORT_DIALOG"})},[]),p=k.useCallback(x=>{n({type:"OPEN_MERGE_DIALOG",nodeId:x})},[]),d=k.useCallback(()=>{n({type:"CLOSE_MERGE_DIALOG"})},[]),f=k.useCallback(async(x,y,_)=>{try{await Vf.merge(x,y,_),n({type:"CLOSE_MERGE_DIALOG"}),await i(),await o(x)}catch(M){console.error("Failed to merge nodes:",M),n({type:"SET_ERROR",error:"Failed to merge nodes"})}},[i,o]),v=k.useCallback(async(x,y)=>{try{await Bf.moveNode(x,y,t.currentView),await i()}catch(_){console.error("Failed to move node:",_),n({type:"SET_ERROR",error:"Failed to move node"})}},[i,t.currentView]);k.useEffect(()=>{(async()=>{try{await Promise.all([r(),l()]),await i()}catch(y){console.error("Failed to initialize app:",y),n({type:"SET_ERROR",error:"Failed to initialize app"})}})()},[]);const w={state:t,dispatch:n,actions:{loadSegments:r,loadOrganizations:l,loadTree:i,selectNode:o,updateNode:a,deleteNode:s,toggleView:c,search:g,refreshTree:h,importUrl:m,setApiKey:E,checkApiKeyStatus:S,openImportDialog:j,closeImportDialog:L,openMergeDialog:p,closeMergeDialog:d,mergeNodes:f,moveNode:v}};return u.jsx(sc.Provider,{value:w,children:e})}function At(){const e=k.useContext(sc);if(!e)throw new Error("useApp must be used within AppProvider");return e}function Wf(){const{state:e,dispatch:t,actions:n}=At(),{currentView:r,segments:l,organizations:i,selectedSegmentId:o,selectedOrganizationId:a}=e,s=r==="function";return u.jsxs("aside",{className:"panel spaces-panel",children:[u.jsxs("div",{className:"panel-header",children:[u.jsx("span",{children:"Spaces"}),u.jsx("button",{className:"gum-button gum-button--small gum-button--green",onClick:n.openImportDialog,title:"Import URL (Cmd+N)",children:"+ Import"})]}),u.jsxs("div",{className:"panel-content",children:[u.jsxs("div",{className:"view-toggle-section",children:[u.jsxs("button",{className:`view-toggle-btn ${s?"active":""}`,onClick:()=>t({type:"SET_VIEW",view:"function"}),children:[u.jsx("span",{className:"view-icon",children:"■"}),"Function"]}),u.jsxs("button",{className:`view-toggle-btn ${s?"":"active"}`,onClick:()=>t({type:"SET_VIEW",view:"organization"}),children:[u.jsx("span",{className:"view-icon",children:"▲"}),"Organization"]})]}),u.jsxs("div",{className:"space-list",children:[u.jsx("div",{className:"space-list-header",children:s?"Segments":"Organizations"}),s?u.jsx("div",{className:"segment-items",children:l.map(c=>u.jsxs("button",{className:`space-item ${o===c.id?"active":""}`,onClick:()=>t({type:"SELECT_SEGMENT",id:c.id}),style:{"--space-color":`var(--gum-${c.color})`},children:[u.jsx("span",{className:"space-indicator"}),u.jsx("span",{className:"space-code",children:c.segmentCode}),u.jsx("span",{className:"space-name",children:c.segmentName})]},c.id))}):u.jsx("div",{className:"organization-items",children:i.map(c=>u.jsxs("button",{className:`space-item ${a===c.id?"active":""}`,onClick:()=>t({type:"SELECT_ORGANIZATION",id:c.id}),children:[u.jsx("span",{className:"space-indicator org-indicator"}),u.jsx("span",{className:"space-code",children:c.orgCode}),u.jsx("span",{className:"space-name",children:c.orgName})]},c.id))})]}),u.jsxs("div",{className:"custom-spaces-section",children:[u.jsxs("div",{className:"space-list-header",children:["Custom Spaces",u.jsx("button",{className:"add-space-btn",title:"Create custom space",children:"+"})]}),u.jsx("div",{className:"empty-hint",children:u.jsx("span",{className:"text-muted text-small",children:"No custom spaces yet"})})]})]}),u.jsx("style",{children:`
        .spaces-panel {
          width: var(--panel-spaces-width);
          display: flex;
          flex-direction: column;
        }

        .spaces-panel .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .view-toggle-section {
          display: flex;
          gap: var(--space-xs);
          margin-bottom: var(--space-md);
          padding: var(--space-xs);
          background: var(--gum-gray-100);
          border-radius: var(--border-radius);
        }

        .view-toggle-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs);
          padding: var(--space-sm);
          background: transparent;
          border: none;
          border-radius: var(--border-radius);
          font-family: var(--font-main);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .view-toggle-btn:hover {
          background: var(--gum-white);
        }

        .view-toggle-btn.active {
          background: var(--gum-white);
          border: var(--border-width) solid var(--gum-black);
          box-shadow: 2px 2px 0 var(--gum-black);
          font-weight: var(--font-weight-bold);
        }

        .view-icon {
          font-size: 8px;
        }

        .space-list {
          margin-bottom: var(--space-lg);
        }

        .space-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-xs) 0;
          margin-bottom: var(--space-xs);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
          color: var(--gum-gray-600);
          letter-spacing: 0.5px;
        }

        .add-space-btn {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: transparent;
          border: 1px solid var(--gum-gray-300);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
          cursor: pointer;
          color: var(--gum-gray-500);
        }

        .add-space-btn:hover {
          background: var(--gum-gray-100);
          color: var(--gum-black);
        }

        .space-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          width: 100%;
          padding: var(--space-sm) var(--space-md);
          background: transparent;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          font-family: var(--font-main);
          font-size: var(--font-size-sm);
        }

        .space-item:hover {
          background: var(--gum-gray-100);
        }

        .space-item.active {
          background: var(--space-color, var(--gum-pink));
          font-weight: var(--font-weight-bold);
        }

        .space-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--space-color, var(--gum-pink));
          border: 1px solid var(--gum-black);
          flex-shrink: 0;
        }

        .org-indicator {
          background: var(--gum-blue);
        }

        .space-code {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          color: var(--gum-gray-600);
          min-width: 32px;
        }

        .space-item.active .space-code {
          color: var(--gum-black);
        }

        .space-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .custom-spaces-section {
          border-top: 1px solid var(--gum-gray-200);
          padding-top: var(--space-md);
        }

        .empty-hint {
          padding: var(--space-md);
          text-align: center;
        }
      `})]})}function Gf({isOpen:e,position:t,node:n,options:r,onClose:l}){const i=k.useRef(null);if(k.useEffect(()=>{if(!e)return;const a=c=>{i.current&&!i.current.contains(c.target)&&l()},s=c=>{c.key==="Escape"&&l()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",s),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",s)}},[e,l]),!e||!n)return u.jsx(u.Fragment,{});const o=a=>{"divider"in a||a.disabled||(a.action(),l())};return u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"context-menu-overlay",onClick:l}),u.jsx("div",{ref:i,className:"context-menu",style:{position:"fixed",top:`${t.y}px`,left:`${t.x}px`},children:r.map((a,s)=>u.jsx("div",{children:"divider"in a&&a.divider?u.jsx("div",{className:"context-menu-divider"}):"divider"in a?null:u.jsxs("button",{className:`context-menu-item ${a.disabled?"disabled":""}`,onClick:()=>o(a),disabled:a.disabled,children:[u.jsxs("span",{className:"context-menu-item-label",children:[a.icon&&u.jsx("span",{className:"context-menu-icon",children:a.icon}),a.label]}),a.shortcut&&u.jsx("span",{className:"context-menu-shortcut",children:a.shortcut})]})},s))}),u.jsx("style",{children:`
        .context-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 998;
          cursor: default;
        }

        .context-menu {
          position: fixed;
          background: var(--gum-white);
          border: 2px solid var(--gum-black);
          border-radius: var(--border-radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 999;
          min-width: 180px;
          max-width: 300px;
          overflow: hidden;
          animation: contextMenuAppear 0.1s ease-out;
        }

        @keyframes contextMenuAppear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .context-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: var(--space-xs) var(--space-sm);
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: var(--font-size-sm);
          text-align: left;
          transition: background var(--transition-fast);
          color: var(--gum-black);
        }

        .context-menu-item:hover:not(.disabled) {
          background: var(--gum-gray-100);
        }

        .context-menu-item:active:not(.disabled) {
          background: var(--gum-yellow);
        }

        .context-menu-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .context-menu-item-label {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          flex: 1;
          min-width: 0;
        }

        .context-menu-icon {
          font-size: 14px;
          flex-shrink: 0;
        }

        .context-menu-shortcut {
          font-size: var(--font-size-xs);
          color: var(--gum-gray-500);
          margin-left: var(--space-sm);
          flex-shrink: 0;
        }

        .context-menu-divider {
          height: 1px;
          background: var(--gum-gray-200);
          margin: 2px 0;
        }
      `})]})}const Yf=k.memo(function e({node:t,level:n,onSelect:r,onToggle:l,onDrop:i,onContextMenu:o,selectedId:a,expandedIds:s,draggedId:c,setDraggedId:g,searchHighlightIds:h}){const[m,E]=k.useState(!1),S=s.has(t.id),j=a===t.id,L=t.children&&t.children.length>0,p=c===t.id,d=t.nodeType!=="item",f=z=>z&&{T:"gum-badge--pink",A:"gum-badge--blue",V:"gum-badge--green",G:"gum-badge--yellow",P:"",R:""}[z]||"",v=()=>{switch(t.nodeType){case"category":return"📁";case"content_type":return"📂";case"subcategory":return"📂";case"item":return"";default:return"📁"}},w=k.useCallback(z=>{z.dataTransfer.setData("text/plain",t.id),z.dataTransfer.effectAllowed="move",g(t.id)},[t.id,g]),x=k.useCallback(()=>{g(null)},[g]),y=k.useCallback(z=>{d&&c!==t.id&&(z.preventDefault(),z.dataTransfer.dropEffect="move",E(!0))},[d,c,t.id]),_=k.useCallback(()=>{E(!1)},[]),M=k.useCallback(z=>{z.preventDefault(),E(!1);const b=z.dataTransfer.getData("text/plain");b&&b!==t.id&&d&&i(b,t.id)},[t.id,d,i]),D=k.useCallback(z=>{z.preventDefault(),z.stopPropagation(),r(t.id),o(t.id,z.clientX,z.clientY)},[t.id,r,o]);return u.jsxs("div",{className:"tree-node-wrapper",children:[u.jsxs("div",{className:`tree-node-row ${j?"selected":""} ${t.nodeType} ${p?"dragging":""} ${m?"drag-over":""} ${h.has(t.id)?"search-highlighted":""}`,style:{paddingLeft:n*16+8},draggable:t.nodeType==="item",onDragStart:w,onDragEnd:x,onDragOver:y,onDragLeave:_,onDrop:M,onContextMenu:D,children:[u.jsx("button",{className:`tree-expand-btn ${L?"has-children":""}`,onClick:z=>{z.stopPropagation(),L&&l(t.id)},disabled:!L,children:L?S?"▼":"▶":""}),u.jsxs("div",{className:"tree-node-content",onClick:()=>r(t.id),children:[t.faviconPath?u.jsx("img",{src:`file://${t.faviconPath}`,alt:"",className:"tree-node-favicon",onError:z=>{z.target.style.display="none"}}):u.jsx("span",{className:"tree-node-type-icon",children:v()}),u.jsx("span",{className:"tree-node-title",children:t.title}),t.contentTypeCode&&t.nodeType==="item"&&u.jsx("span",{className:`gum-badge gum-badge--small ${f(t.contentTypeCode)}`,children:t.contentTypeCode})]})]}),S&&L&&u.jsx("div",{className:"tree-node-children",children:t.children.map(z=>u.jsx(e,{node:z,level:n+1,onSelect:r,onToggle:l,onDrop:i,onContextMenu:o,selectedId:a,expandedIds:s,draggedId:c,setDraggedId:g,searchHighlightIds:h},z.id))})]})});function Xf(){const{state:e,dispatch:t,actions:n}=At(),{currentView:r,segments:l,organizations:i,selectedSegmentId:o,selectedOrganizationId:a,tree:s,selectedNodeId:c,expandedNodeIds:g,treeLoading:h,searchQuery:m,searchResultIds:E}=e,[S,j]=k.useState(null),[L,p]=k.useState(null),[d,f]=k.useState(!1),[v,w]=k.useState({x:0,y:0}),[x,y]=k.useState(null),_=k.useMemo(()=>{if(r==="function"){const C=l.find(P=>P.id===o);return(C==null?void 0:C.segmentName)||"Select a space"}else{const C=i.find(P=>P.id===a);return(C==null?void 0:C.orgName)||"Select an organization"}},[r,l,i,o,a]),M=C=>{n.selectNode(C)},D=C=>{t({type:"TOGGLE_NODE_EXPANDED",id:C})},z=(C,P,I)=>{for(const F of I)if(F.id===P&&F.children&&(F.children.some(X=>X.id===C)||z(C,P,F.children))||F.children&&z(C,P,F.children))return!0;return!1},b=(C,P)=>{for(const I of P){if(I.id===C)return I;if(I.children){const F=b(C,I.children);if(F)return F}}return null},U=x?b(x,s):null,xe=U?[{label:"Open Link",icon:"🔗",shortcut:"⌘O",action:()=>{U.sourceUrl&&window.open(U.sourceUrl,"_blank")},disabled:!U.sourceUrl},{label:"Edit",icon:"✏️",shortcut:"⌘E",action:()=>{M(U.id)}},{divider:!0},{label:"Merge with...",icon:"🔀",action:()=>{U.nodeType==="item"&&n.openMergeDialog(U.id)},disabled:U.nodeType!=="item"},{divider:!0},{label:"Copy URL",icon:"📋",action:()=>{U.sourceUrl&&(navigator.clipboard.writeText(U.sourceUrl),p({message:"URL copied to clipboard",type:"success"}),setTimeout(()=>p(null),2e3))},disabled:!U.sourceUrl},{label:"Copy Title",icon:"📄",action:()=>{navigator.clipboard.writeText(U.title),p({message:"Title copied to clipboard",type:"success"}),setTimeout(()=>p(null),2e3)}},{divider:!0},{label:"Delete",icon:"🗑️",shortcut:"⌘⌫",action:()=>{window.confirm(`Delete "${U.title}"?`)&&n.deleteNode(U.id)}}]:[],kt=k.useCallback(async(C,P)=>{try{if(z(C,P,s)){p({message:"Can't move parent into its own child",type:"error"}),setTimeout(()=>p(null),3e3);return}g&&!g.has(P)&&t({type:"TOGGLE_NODE_EXPANDED",id:P}),await n.moveNode(C,P),p({message:"Item moved successfully",type:"success"}),setTimeout(()=>p(null),2e3)}catch(I){console.error("Failed to move node:",I),p({message:I instanceof Error?I.message:"Failed to move item",type:"error"}),setTimeout(()=>p(null),3e3)}},[n,s,g,t]),He=k.useCallback((C,P,I)=>{y(C),w({x:P,y:I}),f(!0)},[]),gn=k.useCallback(()=>{f(!1),y(null)},[]);return u.jsxs("section",{className:"panel tree-panel",children:[u.jsxs("div",{className:"panel-header",children:[u.jsxs("div",{className:"tree-header-content",children:[u.jsx("span",{className:"tree-panel-title",children:_}),u.jsx("span",{className:"tree-item-count",children:s.length>0&&`${uc(s)} items`})]}),u.jsx("button",{className:"tree-refresh-btn",onClick:n.refreshTree,title:"Refresh",children:"↻"})]}),u.jsxs("div",{className:"panel-content",children:[h?u.jsxs("div",{className:"tree-loading",children:[u.jsx("span",{className:"loading-spinner",children:"⏳"}),u.jsx("span",{children:"Loading..."})]}):s.length===0?u.jsxs("div",{className:"tree-empty",children:[u.jsx("div",{className:"empty-icon",children:"📥"}),u.jsx("p",{className:"text-muted",children:"No items yet"}),u.jsx("p",{className:"text-small text-muted",children:"Import a URL to get started"}),u.jsx("button",{className:"gum-button gum-button--pink gum-button--small",onClick:n.openImportDialog,children:"Import URL"})]}):u.jsx("div",{className:"tree-container",children:s.map(C=>u.jsx(Yf,{node:C,level:0,onSelect:M,onToggle:D,onDrop:kt,onContextMenu:He,selectedId:c,expandedIds:g,draggedId:S,setDraggedId:j,searchHighlightIds:E},C.id))}),L&&u.jsxs("div",{className:`tree-toast tree-toast--${L.type}`,children:[L.type==="success"?"✓":"✕"," ",L.message]}),u.jsx(Gf,{isOpen:d,position:v,node:U,options:xe,onClose:gn})]}),u.jsx("style",{children:`
        .tree-panel {
          width: var(--panel-tree-width);
          display: flex;
          flex-direction: column;
        }

        .tree-panel .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tree-header-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tree-panel-title {
          font-weight: var(--font-weight-bold);
        }

        .tree-item-count {
          font-size: var(--font-size-xs);
          color: var(--gum-gray-500);
        }

        .tree-refresh-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-size: var(--font-size-lg);
          transition: transform var(--transition-fast);
        }

        .tree-refresh-btn:hover {
          background: var(--gum-gray-100);
          transform: rotate(90deg);
        }

        .tree-loading,
        .tree-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: var(--space-md);
          text-align: center;
        }

        .loading-spinner {
          font-size: 24px;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .tree-container {
          font-size: var(--font-size-sm);
        }

        .tree-node-wrapper {
          /* wrapper for node + children */
        }

        .tree-node-row {
          display: flex;
          align-items: center;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: background var(--transition-fast), border-color var(--transition-fast);
          border: 2px solid transparent;
        }

        .tree-node-row:hover {
          background: var(--gum-gray-100);
        }

        .tree-node-row.selected {
          background: var(--gum-yellow);
        }

        .tree-node-row.search-highlighted {
          background: rgba(255, 228, 0, 0.3);
        }

        .tree-node-row.search-highlighted.selected {
          background: var(--gum-yellow);
        }

        .tree-node-row.dragging {
          opacity: 0.5;
        }

        .tree-node-row.drag-over {
          background: var(--gum-blue);
          border-color: var(--gum-black);
        }

        .tree-node-row.category,
        .tree-node-row.content_type,
        .tree-node-row.subcategory {
          font-weight: var(--font-weight-medium);
        }

        .tree-node-row[draggable="true"] {
          cursor: grab;
        }

        .tree-node-row[draggable="true"]:active {
          cursor: grabbing;
        }

        .tree-expand-btn {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: default;
          font-size: 8px;
          color: var(--gum-gray-500);
          flex-shrink: 0;
          margin-right: var(--space-xs);
        }

        .tree-expand-btn.has-children {
          cursor: pointer;
        }

        .tree-expand-btn.has-children:hover {
          color: var(--gum-black);
        }

        .tree-node-content {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          flex: 1;
          min-width: 0;
        }

        .tree-node-favicon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border-radius: 2px;
        }

        .tree-node-type-icon {
          font-size: 12px;
          flex-shrink: 0;
        }

        .tree-node-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tree-node-children {
          /* children container */
        }

        .gum-badge--small {
          padding: 2px 6px;
          font-size: 10px;
        }

        .tree-toast {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: var(--space-sm);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
          animation: slideUp 0.3s ease-out;
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          z-index: 1000;
        }

        .tree-toast--success {
          background: var(--gum-green);
          color: var(--gum-black);
          border: 2px solid var(--gum-black);
        }

        .tree-toast--error {
          background: var(--gum-pink);
          color: var(--gum-black);
          border: 2px solid var(--gum-black);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})}function uc(e){let t=0;for(const n of e)t++,n.children&&(t+=uc(n.children));return t}function Zf(){const{state:e,actions:t}=At(),{selectedNode:n,detailLoading:r,currentView:l}=e,[i,o]=k.useState(!1),[a,s]=k.useState({title:"",aiSummary:""}),[c,g]=k.useState(!1),[h,m]=k.useState(!1),[E,S]=k.useState(!1);k.useEffect(()=>{n&&s({title:n.title,aiSummary:n.aiSummary||""}),o(!1),m(!1)},[n==null?void 0:n.id]);const j=y=>{if(!y)return"Unknown";try{return new Date(y).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}catch{return y}},L=y=>y?{T:"Tool / Website",A:"Article",V:"Video",P:"Podcast",R:"Research Paper",G:"Repository",S:"Social Post",C:"Course / Tutorial",I:"Image / Graphic",N:"Newsletter",K:"Book / eBook"}[y]||y:"Unknown",p=y=>y&&{T:"gum-badge--pink",A:"gum-badge--blue",V:"gum-badge--green",G:"gum-badge--yellow"}[y]||"",d=k.useCallback(y=>_=>{s(M=>({...M,[y]:_.target.value}))},[]),f=k.useCallback(()=>{n&&(s({title:n.title,aiSummary:n.aiSummary||""}),o(!0))},[n]),v=k.useCallback(()=>{n&&s({title:n.title,aiSummary:n.aiSummary||""}),o(!1)},[n]),w=k.useCallback(async()=>{if(n){g(!0);try{await t.updateNode(n.id,{title:a.title,aiSummary:a.aiSummary||null}),o(!1)}catch(y){console.error("Failed to save:",y)}finally{g(!1)}}},[n,a,t]),x=k.useCallback(async()=>{if(n){S(!0);try{await t.deleteNode(n.id),m(!1)}catch(y){console.error("Failed to delete:",y)}finally{S(!1)}}},[n,t]);return u.jsxs("section",{className:"panel detail-panel",children:[u.jsxs("div",{className:"panel-header",children:[u.jsx("span",{children:"Details"}),i&&u.jsx("span",{className:"edit-indicator",children:"Editing"})]}),u.jsxs("div",{className:"panel-content",children:[r?u.jsxs("div",{className:"detail-loading",children:[u.jsx("span",{className:"loading-spinner",children:"⏳"}),u.jsx("span",{children:"Loading details..."})]}):n?u.jsxs("div",{className:"detail-content",children:[u.jsxs("div",{className:"detail-header",children:[n.faviconPath&&u.jsx("img",{src:`file://${n.faviconPath}`,alt:"",className:"detail-favicon",onError:y=>{y.target.style.display="none"}}),u.jsxs("div",{className:"detail-header-text",children:[i?u.jsx("input",{type:"text",className:"gum-input detail-title-input",value:a.title,onChange:d("title"),placeholder:"Title",autoFocus:!0}):u.jsx("h2",{className:"detail-title",children:n.title}),n.contentTypeCode&&u.jsx("span",{className:`gum-badge ${p(n.contentTypeCode)}`,children:L(n.contentTypeCode)})]})]}),n.sourceUrl&&u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:"Source"}),u.jsxs("a",{href:n.sourceUrl,className:"detail-url",onClick:y=>{y.preventDefault(),window.open(n.sourceUrl,"_blank")},children:[new URL(n.sourceUrl).hostname,u.jsx("span",{className:"external-link-icon",children:"↗"})]})]}),u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:l==="function"?"Function Code":"Organization Code"}),u.jsx("code",{className:"detail-code",children:l==="function"?n.functionCode:n.organizationCode})]}),u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:"AI Summary"}),i?u.jsx("textarea",{className:"gum-input detail-summary-input",value:a.aiSummary,onChange:d("aiSummary"),placeholder:"Enter a summary...",rows:4}):n.aiSummary?u.jsx("p",{className:"detail-summary",children:n.aiSummary}):u.jsx("p",{className:"detail-summary text-muted",children:"No summary available"})]}),n.aiKeyPoints&&n.aiKeyPoints.length>0&&u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:"Key Points"}),u.jsx("ul",{className:"detail-key-points",children:n.aiKeyPoints.map((y,_)=>u.jsx("li",{children:y},_))})]}),n.aiConfidence!==null&&u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:"AI Confidence"}),u.jsxs("div",{className:"confidence-bar",children:[u.jsx("div",{className:"confidence-fill",style:{width:`${n.aiConfidence*100}%`}}),u.jsxs("span",{className:"confidence-text",children:[Math.round(n.aiConfidence*100),"%"]})]})]}),u.jsxs("div",{className:"detail-section",children:[u.jsx("div",{className:"detail-label",children:"Added"}),u.jsx("span",{className:"detail-date",children:j(n.createdAt)})]}),u.jsx("div",{className:"detail-actions",children:i?u.jsxs(u.Fragment,{children:[u.jsx("button",{className:"gum-button gum-button--small",onClick:v,disabled:c,children:"Cancel"}),u.jsx("button",{className:"gum-button gum-button--small gum-button--green",onClick:w,disabled:c,children:c?"Saving...":"Save"})]}):u.jsxs(u.Fragment,{children:[n.sourceUrl&&u.jsx("button",{className:"gum-button gum-button--small gum-button--blue",onClick:()=>window.open(n.sourceUrl,"_blank"),children:"Open Link"}),u.jsx("button",{className:"gum-button gum-button--small",onClick:f,children:"Edit"}),u.jsx("button",{className:"gum-button gum-button--small delete-btn",onClick:()=>m(!0),children:"Delete"})]})})]}):u.jsxs("div",{className:"detail-empty",children:[u.jsx("div",{className:"empty-icon",children:"👆"}),u.jsx("p",{className:"text-muted",children:"Select an item to view details"})]}),h&&n&&u.jsx("div",{className:"delete-confirm-overlay",onClick:()=>m(!1),children:u.jsxs("div",{className:"delete-confirm-dialog gum-card",onClick:y=>y.stopPropagation(),children:[u.jsx("h3",{children:"Delete Item?"}),u.jsxs("p",{children:["Are you sure you want to delete ",u.jsx("strong",{children:n.title}),"? This action cannot be undone."]}),u.jsxs("div",{className:"delete-confirm-actions",children:[u.jsx("button",{className:"gum-button gum-button--small",onClick:()=>m(!1),disabled:E,children:"Cancel"}),u.jsx("button",{className:"gum-button gum-button--small delete-confirm-btn",onClick:x,disabled:E,children:E?"Deleting...":"Delete"})]})]})})]}),u.jsx("style",{children:`
        .detail-panel {
          flex: 1;
          min-width: var(--panel-detail-min-width);
          display: flex;
          flex-direction: column;
        }

        .edit-indicator {
          font-size: var(--font-size-xs);
          background: var(--gum-yellow);
          padding: 2px 8px;
          border-radius: var(--border-radius);
          font-weight: var(--font-weight-normal);
        }

        .detail-loading,
        .detail-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: var(--space-md);
          text-align: center;
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .detail-header {
          display: flex;
          gap: var(--space-md);
          align-items: flex-start;
        }

        .detail-favicon {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius);
          border: 1px solid var(--gum-gray-200);
          flex-shrink: 0;
        }

        .detail-header-text {
          flex: 1;
          min-width: 0;
        }

        .detail-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-sm);
          word-wrap: break-word;
        }

        .detail-title-input {
          width: 100%;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-sm);
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .detail-label {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
          color: var(--gum-gray-600);
          letter-spacing: 0.5px;
        }

        .detail-url {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--gum-black);
          text-decoration: none;
          font-size: var(--font-size-sm);
        }

        .detail-url:hover {
          text-decoration: underline;
        }

        .external-link-icon {
          font-size: var(--font-size-xs);
          opacity: 0.5;
        }

        .detail-code {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          background: var(--gum-gray-100);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--border-radius);
          display: inline-block;
        }

        .detail-summary {
          font-size: var(--font-size-sm);
          line-height: 1.6;
          color: var(--gum-gray-800);
        }

        .detail-summary-input {
          width: 100%;
          font-size: var(--font-size-sm);
          line-height: 1.6;
          resize: vertical;
        }

        .detail-key-points {
          margin: 0;
          padding-left: var(--space-md);
          font-size: var(--font-size-sm);
        }

        .detail-key-points li {
          margin-bottom: var(--space-xs);
        }

        .confidence-bar {
          position: relative;
          height: 20px;
          background: var(--gum-gray-200);
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .confidence-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--gum-green);
          transition: width 0.3s ease;
        }

        .confidence-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          color: var(--gum-black);
        }

        .detail-date {
          font-size: var(--font-size-sm);
          color: var(--gum-gray-600);
        }

        .detail-actions {
          display: flex;
          gap: var(--space-sm);
          padding-top: var(--space-md);
          border-top: 1px solid var(--gum-gray-200);
        }

        .delete-btn {
          margin-left: auto;
          color: var(--gum-black);
        }

        .delete-btn:hover {
          background: #ff6b6b;
        }

        /* Delete Confirmation Dialog */
        .delete-confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .delete-confirm-dialog {
          width: 100%;
          max-width: 400px;
          padding: var(--space-lg);
          background: var(--gum-white);
        }

        .delete-confirm-dialog h3 {
          margin: 0 0 var(--space-md);
          font-size: var(--font-size-lg);
        }

        .delete-confirm-dialog p {
          margin: 0 0 var(--space-lg);
          font-size: var(--font-size-sm);
          color: var(--gum-gray-600);
        }

        .delete-confirm-actions {
          display: flex;
          gap: var(--space-sm);
          justify-content: flex-end;
        }

        .delete-confirm-btn {
          background: #ff6b6b;
        }

        .delete-confirm-btn:hover {
          background: #ff4444;
        }
      `})]})}function Jf(){const{state:e,actions:t}=At(),{importDialogOpen:n}=e,[r,l]=k.useState({url:"",status:"idle",progress:"",error:null}),i=k.useCallback(g=>{l(h=>({...h,url:g.target.value,error:null}))},[]),o=k.useCallback(async g=>{g.preventDefault();const h=r.url.trim();if(!h){l(m=>({...m,error:"Please enter a URL"}));return}try{new URL(h)}catch{l(m=>({...m,error:"Please enter a valid URL"}));return}l(m=>({...m,status:"importing",progress:"Fetching page...",error:null}));try{await t.importUrl(h),l({url:"",status:"success",progress:"Import complete!",error:null}),setTimeout(()=>{l({url:"",status:"idle",progress:"",error:null})},1500)}catch(m){l(E=>({...E,status:"error",progress:"",error:m instanceof Error?m.message:"Import failed"}))}},[r.url,t]),a=k.useCallback(()=>{r.status!=="importing"&&(l({url:"",status:"idle",progress:"",error:null}),t.closeImportDialog())},[r.status,t]),s=k.useCallback(g=>{g.key==="Escape"&&a()},[a]);if(!n)return null;const c=r.status==="importing";return u.jsxs("div",{className:"import-dialog-overlay",onClick:a,onKeyDown:s,children:[u.jsxs("div",{className:"import-dialog gum-card",onClick:g=>g.stopPropagation(),role:"dialog","aria-modal":"true","aria-labelledby":"import-dialog-title",children:[u.jsxs("div",{className:"import-dialog-header",children:[u.jsx("h2",{id:"import-dialog-title",children:"Import URL"}),u.jsx("button",{className:"import-dialog-close",onClick:a,disabled:c,"aria-label":"Close dialog",children:"×"})]}),u.jsxs("form",{onSubmit:o,className:"import-dialog-form",children:[u.jsxs("div",{className:"import-dialog-field",children:[u.jsx("label",{htmlFor:"import-url",className:"import-dialog-label",children:"Paste a URL to import"}),u.jsx("input",{id:"import-url",type:"url",className:"gum-input import-dialog-input",placeholder:"https://example.com/article",value:r.url,onChange:i,disabled:c,autoFocus:!0})]}),r.error&&u.jsxs("div",{className:"import-dialog-error",children:[u.jsx("span",{className:"error-icon",children:"⚠️"}),u.jsx("span",{children:r.error})]}),r.progress&&u.jsxs("div",{className:`import-dialog-progress ${r.status==="success"?"success":""}`,children:[r.status==="importing"&&u.jsx("span",{className:"progress-spinner",children:"⏳"}),r.status==="success"&&u.jsx("span",{className:"progress-icon",children:"✅"}),u.jsx("span",{children:r.progress})]}),u.jsxs("div",{className:"import-dialog-actions",children:[u.jsx("button",{type:"button",className:"gum-button",onClick:a,disabled:c,children:"Cancel"}),u.jsx("button",{type:"submit",className:"gum-button gum-button--pink",disabled:c||!r.url.trim(),children:c?"Importing...":"Import"})]})]}),u.jsx("div",{className:"import-dialog-hint",children:u.jsx("p",{className:"text-muted text-small",children:"AI will automatically classify and organize the content."})})]}),u.jsx("style",{children:`
        .import-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .import-dialog {
          width: 100%;
          max-width: 500px;
          background: var(--gum-white);
          padding: var(--space-lg);
        }

        .import-dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-lg);
        }

        .import-dialog-header h2 {
          margin: 0;
          font-size: var(--font-size-lg);
        }

        .import-dialog-close {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          border-radius: var(--border-radius);
          transition: background var(--transition-fast);
        }

        .import-dialog-close:hover:not(:disabled) {
          background: var(--gum-gray-100);
        }

        .import-dialog-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .import-dialog-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .import-dialog-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .import-dialog-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .import-dialog-input {
          width: 100%;
          font-size: var(--font-size-base);
        }

        .import-dialog-error {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: #fff0f0;
          border: 1px solid #ffcccc;
          border-radius: var(--border-radius);
          color: #cc0000;
          font-size: var(--font-size-sm);
        }

        .import-dialog-progress {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--gum-gray-100);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
        }

        .import-dialog-progress.success {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .progress-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .import-dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-sm);
          margin-top: var(--space-sm);
        }

        .import-dialog-hint {
          margin-top: var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid var(--gum-gray-200);
        }

        .import-dialog-hint p {
          margin: 0;
          text-align: center;
        }
      `})]})}function qf({onSelectResult:e}){const{actions:t}=At(),[n,r]=k.useState(""),[l,i]=k.useState([]),[o,a]=k.useState(!1),[s,c]=k.useState(!1),[g,h]=k.useState(-1),m=k.useRef(null),E=k.useRef(null),S=k.useRef(null),j=k.useCallback(async f=>{if(!f.trim()){i([]),c(!1),t.clearSearch();return}a(!0);try{const v=await window.decantAPI.search.query(f);i(v),c(!0),h(-1);const w=new Set(v.map(x=>x.node.id));t.setSearchQuery(f,w)}catch(v){console.error("Search failed:",v),i([]),t.clearSearch()}finally{a(!1)}},[t]),L=k.useCallback(f=>{const v=f.target.value;r(v),S.current&&clearTimeout(S.current),S.current=setTimeout(()=>{j(v)},300)},[j]),p=k.useCallback(f=>{var v,w;if(!s||l.length===0){f.key==="Escape"&&(c(!1),(v=m.current)==null||v.blur());return}switch(f.key){case"ArrowDown":f.preventDefault(),h(x=>Math.min(x+1,l.length-1));break;case"ArrowUp":f.preventDefault(),h(x=>Math.max(x-1,-1));break;case"Enter":f.preventDefault(),g>=0&&l[g]&&d(l[g]);break;case"Escape":c(!1),(w=m.current)==null||w.blur();break}},[s,l,g]),d=k.useCallback(f=>{r(""),i([]),c(!1),t.clearSearch(),e==null||e(f)},[e,t]);return k.useEffect(()=>{const f=v=>{m.current&&!m.current.contains(v.target)&&E.current&&!E.current.contains(v.target)&&c(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]),k.useEffect(()=>()=>{S.current&&clearTimeout(S.current)},[]),u.jsxs("div",{className:"search-bar-container",children:[u.jsx("input",{ref:m,type:"text",className:"gum-input search-input",placeholder:"Search...",value:n,onChange:L,onKeyDown:p,onFocus:()=>n&&l.length>0&&c(!0)}),o&&u.jsx("span",{className:"search-spinner",children:"⏳"}),s&&l.length>0&&u.jsx("div",{ref:E,className:"search-results",children:l.map((f,v)=>u.jsxs("button",{className:`search-result-item ${v===g?"selected":""}`,onClick:()=>d(f),onMouseEnter:()=>h(v),children:[f.node.faviconPath&&u.jsx("img",{src:`file://${f.node.faviconPath}`,alt:"",className:"search-result-favicon",onError:w=>{w.target.style.display="none"}}),u.jsxs("div",{className:"search-result-content",children:[u.jsx("span",{className:"search-result-title",children:f.node.title}),f.node.contentTypeCode&&u.jsx("span",{className:"search-result-type gum-badge gum-badge--small",children:f.node.contentTypeCode})]})]},f.node.id))}),s&&n&&l.length===0&&!o&&u.jsx("div",{ref:E,className:"search-results",children:u.jsx("div",{className:"search-no-results",children:"No results found"})}),u.jsx("style",{children:`
        .search-bar-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 250px;
          padding-right: var(--space-xl);
        }

        .search-spinner {
          position: absolute;
          right: var(--space-sm);
          font-size: var(--font-size-sm);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: var(--space-xs);
          background: var(--gum-white);
          border: var(--border-width) solid var(--gum-black);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-default);
          max-height: 400px;
          overflow-y: auto;
          z-index: 1000;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          width: 100%;
          padding: var(--space-sm) var(--space-md);
          background: none;
          border: none;
          border-bottom: 1px solid var(--gum-gray-200);
          text-align: left;
          cursor: pointer;
          font-family: var(--font-main);
          font-size: var(--font-size-sm);
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .search-result-item:hover,
        .search-result-item.selected {
          background: var(--gum-yellow);
        }

        .search-result-favicon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .search-result-content {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .search-result-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .search-result-type {
          flex-shrink: 0;
        }

        .search-no-results {
          padding: var(--space-md);
          text-align: center;
          color: var(--gum-gray-600);
          font-size: var(--font-size-sm);
        }
      `})]})}function ep({isOpen:e,onClose:t}){const[n,r]=k.useState(""),[l,i]=k.useState(!1),[o,a]=k.useState(!1),[s,c]=k.useState(!1),[g,h]=k.useState(null),[m,E]=k.useState("light"),[S,j]=k.useState(!1),[L,p]=k.useState(!1),[d,f]=k.useState(null);k.useEffect(()=>{e&&v()},[e]);const v=async()=>{try{const z=await window.decantAPI.settings.getApiKey();c(!!z),r("");const b=await window.decantAPI.settings.get("theme");(b==="dark"||b==="light")&&E(b)}catch(z){console.error("Failed to load settings:",z)}},w=k.useCallback(async()=>{if(n.trim()){a(!0),h(null);try{await window.decantAPI.settings.setApiKey(n.trim()),c(!0),r(""),h("API key saved successfully"),setTimeout(()=>h(null),3e3)}catch(z){console.error("Failed to save API key:",z),h("Failed to save API key")}finally{a(!1)}}},[n]),x=k.useCallback(async()=>{a(!0),h(null);try{await window.decantAPI.settings.setApiKey(""),c(!1),h("API key cleared"),setTimeout(()=>h(null),3e3)}catch(z){console.error("Failed to clear API key:",z),h("Failed to clear API key")}finally{a(!1)}},[]),y=k.useCallback(async z=>{E(z);try{await window.decantAPI.settings.set("theme",z),document.documentElement.setAttribute("data-theme",z)}catch(b){console.error("Failed to save theme:",b)}},[]),_=k.useCallback(async()=>{j(!0),f(null);try{const z=await window.decantAPI.data.export();if(z.success&&z.data){const b=new Blob([z.data],{type:"application/json"}),U=URL.createObjectURL(b),xe=document.createElement("a");xe.href=U,xe.download=`decant-export-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(xe),xe.click(),document.body.removeChild(xe),URL.revokeObjectURL(U),f("Data exported successfully")}else f(z.error||"Export failed")}catch(z){console.error("Export failed:",z),f("Export failed")}finally{j(!1),setTimeout(()=>f(null),3e3)}},[]),M=k.useCallback(async()=>{const z=document.createElement("input");z.type="file",z.accept=".json",z.onchange=async b=>{var xe;const U=(xe=b.target.files)==null?void 0:xe[0];if(U){p(!0),f(null);try{const kt=await U.text(),He=await window.decantAPI.data.import(kt);He.success?(f(`Imported ${He.nodesImported} nodes successfully`),window.dispatchEvent(new CustomEvent("decant:refresh"))):f(He.error||"Import failed")}catch(kt){console.error("Import failed:",kt),f("Import failed: Invalid file format")}finally{p(!1),setTimeout(()=>f(null),5e3)}}},z.click()},[]),D=k.useCallback(()=>{r(""),i(!1),h(null),t()},[t]);return k.useEffect(()=>{const z=b=>{b.key==="Escape"&&e&&D()};return window.addEventListener("keydown",z),()=>window.removeEventListener("keydown",z)},[e,D]),e?u.jsx("div",{className:"settings-overlay",onClick:D,children:u.jsxs("div",{className:"settings-dialog gum-card",onClick:z=>z.stopPropagation(),children:[u.jsxs("div",{className:"settings-header",children:[u.jsx("h2",{children:"Settings"}),u.jsx("button",{className:"settings-close-btn",onClick:D,children:"×"})]}),u.jsxs("div",{className:"settings-content",children:[u.jsxs("div",{className:"settings-section",children:[u.jsx("h3",{children:"OpenAI API Key"}),u.jsx("p",{className:"settings-description",children:"Required for AI-powered content classification and summarization."}),s?u.jsxs("div",{className:"api-key-status",children:[u.jsx("span",{className:"api-key-indicator api-key-set",children:"API key is configured"}),u.jsx("button",{className:"gum-button gum-button--small",onClick:x,disabled:o,children:"Clear Key"})]}):u.jsx("div",{className:"api-key-status",children:u.jsx("span",{className:"api-key-indicator api-key-missing",children:"No API key configured"})}),u.jsxs("div",{className:"api-key-input-group",children:[u.jsxs("div",{className:"api-key-input-wrapper",children:[u.jsx("input",{type:l?"text":"password",className:"gum-input api-key-input",placeholder:s?"Enter new API key to replace":"sk-...",value:n,onChange:z=>r(z.target.value)}),u.jsx("button",{className:"api-key-toggle",onClick:()=>i(!l),type:"button",title:l?"Hide":"Show",children:l?"👁️":"👁️‍🗨️"})]}),u.jsx("button",{className:"gum-button gum-button--small gum-button--green",onClick:w,disabled:!n.trim()||o,children:o?"Saving...":"Save"})]}),g&&u.jsx("div",{className:`settings-message ${g.includes("success")||g==="API key cleared"?"success":"error"}`,children:g}),u.jsxs("p",{className:"settings-hint",children:["Get your API key from"," ",u.jsx("a",{href:"#",onClick:z=>{z.preventDefault(),window.open("https://platform.openai.com/api-keys","_blank")},children:"OpenAI Dashboard"})]})]}),u.jsxs("div",{className:"settings-section",children:[u.jsx("h3",{children:"Appearance"}),u.jsx("p",{className:"settings-description",children:"Choose your preferred color theme."}),u.jsxs("div",{className:"theme-options",children:[u.jsx("button",{className:`theme-option gum-button ${m==="light"?"gum-button--yellow":""}`,onClick:()=>y("light"),children:"☀️ Light"}),u.jsx("button",{className:`theme-option gum-button ${m==="dark"?"gum-button--blue":""}`,onClick:()=>y("dark"),children:"🌙 Dark"})]})]}),u.jsxs("div",{className:"settings-section",children:[u.jsx("h3",{children:"Data Management"}),u.jsx("p",{className:"settings-description",children:"Export your knowledge base to a JSON file or import from a previous export."}),u.jsxs("div",{className:"data-actions",children:[u.jsx("button",{className:"gum-button gum-button--blue",onClick:_,disabled:S||L,children:S?"Exporting...":"📦 Export Data"}),u.jsx("button",{className:"gum-button gum-button--pink",onClick:M,disabled:S||L,children:L?"Importing...":"📥 Import Data"})]}),d&&u.jsx("div",{className:`settings-message ${d.includes("successfully")?"success":"error"}`,children:d}),u.jsx("p",{className:"settings-hint",children:"Note: Import will add new items without overwriting existing data."})]}),u.jsxs("div",{className:"settings-section",children:[u.jsx("h3",{children:"About"}),u.jsxs("div",{className:"about-info",children:[u.jsxs("p",{children:[u.jsx("strong",{children:"Decant"})," v1.0.0"]}),u.jsx("p",{className:"text-muted",children:"AI-Powered Knowledge Base"})]})]})]}),u.jsx("div",{className:"settings-footer",children:u.jsx("button",{className:"gum-button gum-button--small",onClick:D,children:"Close"})}),u.jsx("style",{children:`
          .settings-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .settings-dialog {
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            background: var(--gum-white);
          }

          .settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-md) var(--space-lg);
            border-bottom: var(--border-width) solid var(--gum-black);
          }

          .settings-header h2 {
            margin: 0;
            font-size: var(--font-size-lg);
          }

          .settings-close-btn {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            border-radius: var(--border-radius);
          }

          .settings-close-btn:hover {
            background: var(--gum-gray-100);
          }

          .settings-content {
            flex: 1;
            overflow-y: auto;
            padding: var(--space-lg);
          }

          .settings-section {
            margin-bottom: var(--space-xl);
          }

          .settings-section:last-child {
            margin-bottom: 0;
          }

          .settings-section h3 {
            margin: 0 0 var(--space-sm);
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-bold);
          }

          .settings-description {
            margin: 0 0 var(--space-md);
            font-size: var(--font-size-sm);
            color: var(--gum-gray-600);
          }

          .api-key-status {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
          }

          .api-key-indicator {
            font-size: var(--font-size-sm);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--border-radius);
            font-weight: var(--font-weight-medium);
          }

          .api-key-set {
            background: var(--gum-green);
            color: var(--gum-black);
          }

          .api-key-missing {
            background: var(--gum-gray-200);
            color: var(--gum-gray-600);
          }

          .api-key-input-group {
            display: flex;
            gap: var(--space-sm);
            margin-bottom: var(--space-sm);
          }

          .api-key-input-wrapper {
            flex: 1;
            position: relative;
          }

          .api-key-input {
            width: 100%;
            padding-right: 40px;
            font-family: var(--font-mono);
          }

          .api-key-toggle {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            font-size: 14px;
          }

          .settings-message {
            padding: var(--space-sm);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
            margin-bottom: var(--space-sm);
          }

          .settings-message.success {
            background: var(--gum-green);
            color: var(--gum-black);
          }

          .settings-message.error {
            background: #ff6b6b;
            color: var(--gum-white);
          }

          .settings-hint {
            margin: 0;
            font-size: var(--font-size-xs);
            color: var(--gum-gray-600);
          }

          .settings-hint a {
            color: var(--gum-black);
            text-decoration: underline;
          }

          .theme-options {
            display: flex;
            gap: var(--space-sm);
          }

          .theme-option {
            flex: 1;
          }

          .data-actions {
            display: flex;
            gap: var(--space-sm);
            margin-bottom: var(--space-md);
          }

          .data-actions button {
            flex: 1;
          }

          .about-info {
            background: var(--gum-gray-100);
            padding: var(--space-md);
            border-radius: var(--border-radius);
          }

          .about-info p {
            margin: 0;
          }

          .about-info p + p {
            margin-top: var(--space-xs);
          }

          .settings-footer {
            display: flex;
            justify-content: flex-end;
            padding: var(--space-md) var(--space-lg);
            border-top: var(--border-width) solid var(--gum-gray-200);
          }
        `})]})}):null}function tp({isOpen:e,primaryNode:t,onClose:n,onMerge:r}){const{state:l,actions:i}=At(),[o,a]=k.useState(""),[s,c]=k.useState(null),[g,h]=k.useState(!1),[m,E]=k.useState(!1),[S,j]=k.useState(!1),[L,p]=k.useState(null),d=k.useMemo(()=>!o.trim()||!t?[]:l.tree.flatMap(Bi).filter(w=>w.id!==t.id&&w.nodeType==="item"&&w.title.toLowerCase().includes(o.toLowerCase())).slice(0,10),[o,t,l.tree]),f=k.useMemo(()=>s?l.tree.flatMap(Bi).find(w=>w.id===s&&w.nodeType==="item"):null,[s,l.tree]),v=k.useCallback(async()=>{if(!(!t||!s)){j(!0),p(null);try{await r(t.id,s,{keepMetadata:g,appendSummary:m}),n()}catch(w){p(w instanceof Error?w.message:"Failed to merge items")}finally{j(!1)}}},[t,s,g,m,r,n]);return!e||!t?u.jsx(u.Fragment,{}):u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"merge-dialog-overlay",onClick:n}),u.jsxs("div",{className:"merge-dialog",children:[u.jsxs("div",{className:"merge-dialog-header",children:[u.jsx("h2",{className:"merge-dialog-title",children:"Merge Items"}),u.jsx("button",{className:"merge-dialog-close",onClick:n,disabled:S,children:"×"})]}),u.jsxs("div",{className:"merge-dialog-content",children:[u.jsxs("div",{className:"merge-section",children:[u.jsx("label",{className:"merge-section-label",children:"Primary Item (keep):"}),u.jsxs("div",{className:"merge-item-preview",children:[t.faviconPath&&u.jsx("img",{src:`file://${t.faviconPath}`,alt:"",className:"merge-item-favicon",onError:w=>{w.target.style.display="none"}}),u.jsxs("div",{className:"merge-item-content",children:[u.jsx("div",{className:"merge-item-title",children:t.title}),u.jsx("div",{className:"merge-item-url",children:t.sourceUrl}),u.jsx("div",{className:"merge-item-summary",children:t.aiSummary})]})]})]}),u.jsxs("div",{className:"merge-section",children:[u.jsx("label",{className:"merge-section-label",children:"Secondary Item (merge into primary):"}),u.jsx("input",{type:"text",className:"merge-search-input",placeholder:"Search for item to merge...",value:o,onChange:w=>{a(w.target.value),c(null)},disabled:S}),o&&d.length>0&&u.jsx("div",{className:"merge-search-results",children:d.map(w=>u.jsxs("button",{className:`merge-search-result ${s===w.id?"selected":""}`,onClick:()=>{c(w.id),a("")},disabled:S,children:[w.faviconPath&&u.jsx("img",{src:`file://${w.faviconPath}`,alt:"",className:"merge-result-favicon",onError:x=>{x.target.style.display="none"}}),u.jsx("span",{className:"merge-result-title",children:w.title})]},w.id))}),f&&u.jsxs("div",{className:"merge-item-preview merge-item-preview--secondary",children:[f.faviconPath&&u.jsx("img",{src:`file://${f.faviconPath}`,alt:"",className:"merge-item-favicon",onError:w=>{w.target.style.display="none"}}),u.jsxs("div",{className:"merge-item-content",children:[u.jsx("div",{className:"merge-item-title",children:f.title}),u.jsx("div",{className:"merge-item-url",children:f.sourceUrl}),u.jsx("div",{className:"merge-item-summary",children:f.aiSummary})]}),u.jsx("button",{className:"merge-remove-secondary",onClick:()=>c(null),disabled:S,children:"✕"})]})]}),u.jsxs("div",{className:"merge-section merge-section--options",children:[u.jsxs("div",{className:"merge-checkbox",children:[u.jsx("input",{type:"checkbox",id:"keep-metadata",checked:g,onChange:w=>h(w.target.checked),disabled:S}),u.jsx("label",{htmlFor:"keep-metadata",children:"Keep metadata from secondary item"})]}),u.jsxs("div",{className:"merge-checkbox",children:[u.jsx("input",{type:"checkbox",id:"append-summary",checked:m,onChange:w=>E(w.target.checked),disabled:S}),u.jsx("label",{htmlFor:"append-summary",children:"Append AI summary from secondary"})]})]}),L&&u.jsx("div",{className:"merge-error",children:L})]}),u.jsxs("div",{className:"merge-dialog-footer",children:[u.jsx("button",{className:"gum-button gum-button--gray",onClick:n,disabled:S,children:"Cancel"}),u.jsx("button",{className:"gum-button gum-button--blue",onClick:v,disabled:!f||S,children:S?"Merging...":"Merge Items"})]}),u.jsx("style",{children:`
          .merge-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 999;
          }

          .merge-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            background: var(--gum-white);
            border: 2px solid var(--gum-black);
            border-radius: var(--border-radius);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .merge-dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-md);
            border-bottom: 2px solid var(--gum-gray-200);
          }

          .merge-dialog-title {
            margin: 0;
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-bold);
          }

          .merge-dialog-close {
            width: 32px;
            height: 32px;
            border: 2px solid var(--gum-black);
            background: transparent;
            border-radius: var(--border-radius);
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .merge-dialog-close:hover:not(:disabled) {
            background: var(--gum-gray-100);
          }

          .merge-dialog-content {
            flex: 1;
            overflow-y: auto;
            padding: var(--space-md);
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }

          .merge-section {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
          }

          .merge-section-label {
            font-weight: var(--font-weight-medium);
            font-size: var(--font-size-sm);
          }

          .merge-item-preview {
            display: flex;
            gap: var(--space-sm);
            padding: var(--space-sm);
            border: 2px solid var(--gum-gray-200);
            border-radius: var(--border-radius);
            background: var(--gum-gray-50);
          }

          .merge-item-preview--secondary {
            position: relative;
          }

          .merge-item-favicon {
            width: 48px;
            height: 48px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .merge-item-content {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .merge-item-title {
            font-weight: var(--font-weight-medium);
            font-size: var(--font-size-sm);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .merge-item-url {
            font-size: var(--font-size-xs);
            color: var(--gum-gray-600);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .merge-item-summary {
            font-size: var(--font-size-xs);
            color: var(--gum-gray-700);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .merge-search-input {
            width: 100%;
            padding: var(--space-sm);
            border: 2px solid var(--gum-gray-300);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
          }

          .merge-search-input:focus {
            outline: none;
            border-color: var(--gum-black);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .merge-search-results {
            max-height: 200px;
            overflow-y: auto;
            border: 2px solid var(--gum-gray-200);
            border-radius: var(--border-radius);
            background: var(--gum-white);
          }

          .merge-search-result {
            width: 100%;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-sm);
            border: none;
            background: transparent;
            cursor: pointer;
            text-align: left;
            transition: background var(--transition-fast);
            border-bottom: 1px solid var(--gum-gray-100);
          }

          .merge-search-result:last-child {
            border-bottom: none;
          }

          .merge-search-result:hover:not(:disabled) {
            background: var(--gum-gray-100);
          }

          .merge-search-result.selected {
            background: var(--gum-yellow);
          }

          .merge-result-favicon {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .merge-result-title {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: var(--font-size-sm);
          }

          .merge-remove-secondary {
            width: 28px;
            height: 28px;
            border: 2px solid var(--gum-black);
            background: transparent;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
            flex-shrink: 0;
          }

          .merge-remove-secondary:hover:not(:disabled) {
            background: var(--gum-pink);
          }

          .merge-section--options {
            gap: var(--space-md);
            padding: var(--space-md);
            background: var(--gum-gray-50);
            border-radius: var(--border-radius);
          }

          .merge-checkbox {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }

          .merge-checkbox input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          .merge-checkbox label {
            cursor: pointer;
            font-size: var(--font-size-sm);
          }

          .merge-error {
            padding: var(--space-sm);
            background: var(--gum-pink);
            border: 2px solid var(--gum-black);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
            color: var(--gum-black);
          }

          .merge-dialog-footer {
            display: flex;
            gap: var(--space-sm);
            padding: var(--space-md);
            border-top: 2px solid var(--gum-gray-200);
            justify-content: flex-end;
          }

          .gum-button {
            padding: var(--space-sm) var(--space-md);
            border: 2px solid var(--gum-black);
            border-radius: var(--border-radius);
            font-weight: var(--font-weight-medium);
            cursor: pointer;
            transition: background var(--transition-fast);
          }

          .gum-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .gum-button--gray {
            background: var(--gum-gray-200);
          }

          .gum-button--gray:hover:not(:disabled) {
            background: var(--gum-gray-300);
          }

          .gum-button--blue {
            background: var(--gum-blue);
          }

          .gum-button--blue:hover:not(:disabled) {
            background: var(--gum-blue);
            transform: scale(1.02);
          }
        `})]})]})}function Bi(e){const t=[e];return e.children&&t.push(...e.children.flatMap(Bi)),t}function np(){const{state:e,actions:t}=At(),{loading:n,error:r,currentView:l,settingsDialogOpen:i,mergeDialogOpen:o,mergeDialogPrimaryNodeId:a,selectedNode:s}=e,c=k.useMemo(()=>!a||!s?null:a===s.id?s:null,[a,s]),g=k.useCallback(h=>{t.selectNode(h.node.id)},[t]);return n?u.jsx("div",{className:"app-loading",children:u.jsxs("div",{className:"loading-content",children:[u.jsx("h1",{children:"Decant"}),u.jsx("p",{className:"text-muted",children:"Initializing..."})]})}):r?u.jsx("div",{className:"app-error",children:u.jsxs("div",{className:"error-content gum-card",children:[u.jsx("h2",{children:"Error"}),u.jsx("p",{children:r}),u.jsx("button",{className:"gum-button gum-button--pink",onClick:()=>window.location.reload(),children:"Retry"})]})}):u.jsxs("div",{className:"app-container",children:[u.jsxs("header",{className:"app-header",children:[u.jsx("div",{className:"header-left",children:u.jsx("h1",{className:"app-title",children:"Decant"})}),u.jsxs("div",{className:"header-center",children:[u.jsx("button",{className:`view-toggle gum-button gum-button--small ${l==="function"?"gum-button--pink":""}`,onClick:()=>l!=="function"&&t.toggleView(),children:"Function"}),u.jsx("button",{className:`view-toggle gum-button gum-button--small ${l==="organization"?"gum-button--blue":""}`,onClick:()=>l!=="organization"&&t.toggleView(),children:"Organization"})]}),u.jsxs("div",{className:"header-right",children:[u.jsx(qf,{onSelectResult:g}),u.jsx("button",{className:"gum-button gum-button--small gum-button--green",onClick:t.openImportDialog,title:"Import URL (Cmd+N)",children:"+ Import"}),u.jsx("button",{className:"gum-button gum-button--small settings-btn",onClick:t.openSettingsDialog,title:"Settings (Cmd+,)",children:"⚙"})]})]}),u.jsxs("main",{className:"app-main",children:[u.jsx(Wf,{}),u.jsx(Xf,{}),u.jsx(Zf,{})]}),u.jsx(Jf,{}),u.jsx(ep,{isOpen:i,onClose:t.closeSettingsDialog}),u.jsx(tp,{isOpen:o,primaryNode:c,onClose:t.closeMergeDialog,onMerge:t.mergeNodes}),u.jsx("style",{children:`
        .app-loading,
        .app-error {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-content,
        .error-content {
          text-align: center;
        }

        .loading-content h1 {
          font-size: var(--font-size-xxl);
          margin-bottom: var(--space-md);
        }

        .error-content {
          padding: var(--space-xl);
        }

        .error-content h2 {
          margin-bottom: var(--space-md);
          color: #cc0000;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--gum-bg);
        }

        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md);
          background: var(--gum-white);
          border-bottom: var(--border-width) solid var(--gum-black);
          flex-shrink: 0;
        }

        .app-title {
          font-size: var(--font-size-xl);
          margin: 0;
          font-weight: var(--font-weight-bold);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .header-center {
          display: flex;
          gap: var(--space-sm);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .search-input {
          width: 250px;
        }

        .app-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Panel base styles */
        .panel {
          display: flex;
          flex-direction: column;
          background: var(--gum-white);
          border-right: var(--border-width) solid var(--gum-black);
          overflow: hidden;
        }

        .panel:last-child {
          border-right: none;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-sm) var(--space-md);
          background: var(--gum-gray-100);
          border-bottom: var(--border-width) solid var(--gum-black);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-sm);
          flex-shrink: 0;
        }

        .panel-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-md);
        }

        /* Scrollbar styling */
        .panel-content::-webkit-scrollbar {
          width: 8px;
        }

        .panel-content::-webkit-scrollbar-track {
          background: var(--gum-gray-100);
        }

        .panel-content::-webkit-scrollbar-thumb {
          background: var(--gum-gray-300);
          border-radius: 4px;
        }

        .panel-content::-webkit-scrollbar-thumb:hover {
          background: var(--gum-gray-600);
        }

        /* Keyboard shortcut hint */
        .keyboard-hint {
          font-size: var(--font-size-xs);
          color: var(--gum-gray-600);
          background: var(--gum-gray-100);
          padding: 2px 6px;
          border-radius: 3px;
          margin-left: var(--space-xs);
        }

        /* Settings button */
        .settings-btn {
          font-size: 16px;
          padding: var(--space-xs) var(--space-sm);
        }
      `})]})}function rp(){return k.useEffect(()=>{(async()=>{try{const t=localStorage.getItem("theme")||"light";(t==="dark"||t==="light")&&document.documentElement.setAttribute("data-theme",t)}catch(t){console.error("Failed to load theme:",t)}})()},[]),k.useEffect(()=>{const e=t=>{if((t.metaKey||t.ctrlKey)&&t.key==="n"&&(t.preventDefault(),window.dispatchEvent(new CustomEvent("decant:open-import"))),(t.metaKey||t.ctrlKey)&&t.key==="f"){t.preventDefault();const n=document.querySelector(".search-input");n&&n.focus()}(t.metaKey||t.ctrlKey)&&t.key==="1"&&(t.preventDefault(),window.dispatchEvent(new CustomEvent("decant:set-view",{detail:"function"}))),(t.metaKey||t.ctrlKey)&&t.key==="2"&&(t.preventDefault(),window.dispatchEvent(new CustomEvent("decant:set-view",{detail:"organization"}))),t.key==="Escape"&&window.dispatchEvent(new CustomEvent("decant:escape")),(t.metaKey||t.ctrlKey)&&t.key==="r"&&(t.preventDefault(),window.dispatchEvent(new CustomEvent("decant:refresh"))),(t.metaKey||t.ctrlKey)&&t.key===","&&(t.preventDefault(),window.dispatchEvent(new CustomEvent("decant:open-settings")))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]),u.jsx(Qf,{children:u.jsx(np,{})})}const cc=document.getElementById("root");if(!cc)throw new Error("Root element not found");const lp=ac(cc);lp.render(u.jsx(_c.StrictMode,{children:u.jsx(rp,{})}));console.log("Decant renderer initialized");
