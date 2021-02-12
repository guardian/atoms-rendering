import { useContext, createElement, Fragment as Fragment$2, createContext, forwardRef, useRef, useLayoutEffect, useState, useEffect, memo } from 'react';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/extends';
import { Fragment as Fragment$3, jsx as jsx$1, jsxs as jsxs$1 } from 'react/jsx-runtime';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { space, palette, remSpace, neutral as neutral$2, brandAlt } from '@guardian/src-foundations';
import { neutral, text, news, opinion, sport, culture, lifestyle, success, brand } from '@guardian/src-foundations/palette';
import { focusHalo } from '@guardian/src-foundations/accessibility';
import { Pillar, Special } from '@guardian/types';
import { neutral as neutral$1 } from '@guardian/src-foundations/palette/';
import { SvgPlus, SvgMinus, SvgInfo, SvgPlay, SvgCheckmark, SvgCross } from '@guardian/src-icons';
import render from 'preact-render-to-string';
import YouTubePlayer from 'youtube-player';
import { breakpoints } from '@guardian/src-foundations/mq';
import { Button } from '@guardian/src-button';
import { RadioGroup, Radio } from '@guardian/src-radio';

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (process.env.NODE_ENV !== 'production') {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production' && !/:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (process.env.NODE_ENV !== 'production') {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();

var e="-ms-";var r="-moz-";var a="-webkit-";var c="comm";var n="rule";var t="decl";var i="@import";var p="@keyframes";var k=Math.abs;var d=String.fromCharCode;function m(e,r){return (((r<<2^z(e,0))<<2^z(e,1))<<2^z(e,2))<<2^z(e,3)}function g(e){return e.trim()}function x(e,r){return (e=r.exec(e))?e[0]:e}function y(e,r,a){return e.replace(r,a)}function j(e,r){return e.indexOf(r)}function z(e,r){return e.charCodeAt(r)|0}function C(e,r,a){return e.slice(r,a)}function A(e){return e.length}function M(e){return e.length}function O(e,r){return r.push(e),e}function S(e,r){return e.map(r).join("")}var q=1;var B=1;var D=0;var E=0;var F=0;var G="";function H(e,r,a,c,n,t,s){return {value:e,root:r,parent:a,type:c,props:n,children:t,line:q,column:B,length:s,return:""}}function I(e,r,a){return H(e,r.root,r.parent,a,r.props,r.children,0)}function J(){return F}function K(){F=E<D?z(G,E++):0;if(B++,F===10)B=1,q++;return F}function L(){return z(G,E)}function N(){return E}function P(e,r){return C(G,e,r)}function Q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function R(e){return q=B=1,D=A(G=e),E=0,[]}function T(e){return G="",e}function U(e){return g(P(E-1,Y(e===91?e+2:e===40?e+1:e)))}function W(e){while(F=L())if(F<33)K();else break;return Q(e)>2||Q(F)>3?"":" "}function Y(e){while(K())switch(F){case e:return E;case 34:case 39:return Y(e===34||e===39?e:F);case 40:if(e===41)Y(e);break;case 92:K();break}return E}function Z(e,r){while(K())if(e+F===47+10)break;else if(e+F===42+42&&L()===47)break;return "/*"+P(r,E-1)+"*"+d(e===47?e:K())}function _(e){while(!Q(L()))K();return P(e,E)}function ee(e){return T(re("",null,null,null,[""],e=R(e),0,[0],e))}function re(e,r,a,c,n,t,s,u,i){var f=0;var o=0;var l=s;var v=0;var h=0;var p=0;var w=1;var b=1;var $=1;var k=0;var m="";var g=n;var x=t;var j=c;var z=m;while(b)switch(p=k,k=K()){case 34:case 39:case 91:case 40:z+=U(k);break;case 9:case 10:case 13:case 32:z+=W(p);break;case 47:switch(L()){case 42:case 47:O(ce(Z(K(),N()),r,a),i);break;default:z+="/";}break;case 123*w:u[f++]=A(z)*$;case 125*w:case 59:case 0:switch(k){case 0:case 125:b=0;case 59+o:if(h>0&&A(z)-l)O(h>32?ne(z+";",c,a,l-1):ne(y(z," ","")+";",c,a,l-2),i);break;case 59:z+=";";default:O(j=ae(z,r,a,f,o,n,u,m,g=[],x=[],l),t);if(k===123)if(o===0)re(z,r,j,j,g,t,l,u,x);else switch(v){case 100:case 109:case 115:re(e,j,j,c&&O(ae(e,j,j,0,0,n,u,m,n,g=[],l),x),n,x,l,u,c?g:x);break;default:re(z,j,j,j,[""],x,l,u,x);}}f=o=h=0,w=$=1,m=z="",l=s;break;case 58:l=1+A(z),h=p;default:switch(z+=d(k),k*w){case 38:$=o>0?1:(z+="\f",-1);break;case 44:u[f++]=(A(z)-1)*$,$=1;break;case 64:if(L()===45)z+=U(K());v=L(),o=A(m=z+=_(N())),k++;break;case 45:if(p===45&&A(z)==2)w=0;}}return t}function ae(e,r,a,c,t,s,u,i,f,o,l){var v=t-1;var h=t===0?s:[""];var p=M(h);for(var w=0,b=0,$=0;w<c;++w)for(var d=0,m=C(e,v+1,v=k(b=u[w])),x=e;d<p;++d)if(x=g(b>0?h[d]+" "+m:y(m,/&\f/g,h[d])))f[$++]=x;return H(e,r,a,t===0?n:i,f,o,l)}function ce(e,r,a){return H(e,r,a,c,d(J()),C(e,2,-2),0)}function ne(e,r,a,c){return H(e,r,a,t,C(e,0,c),C(e,c+1,-1),c)}function te(c,n){switch(m(c,n)){case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a+c+c;case 5349:case 4246:case 4810:case 6968:case 2756:return a+c+r+c+e+c+c;case 6828:case 4268:return a+c+e+c+c;case 6165:return a+c+e+"flex-"+c+c;case 5187:return a+c+y(c,/(\w+).+(:[^]+)/,a+"box-$1$2"+e+"flex-$1$2")+c;case 5443:return a+c+e+"flex-item-"+y(c,/flex-|-self/,"")+c;case 4675:return a+c+e+"flex-line-pack"+y(c,/align-content|flex-|-self/,"")+c;case 5548:return a+c+e+y(c,"shrink","negative")+c;case 5292:return a+c+e+y(c,"basis","preferred-size")+c;case 6060:return a+"box-"+y(c,"-grow","")+a+c+e+y(c,"grow","positive")+c;case 4554:return a+y(c,/([^-])(transform)/g,"$1"+a+"$2")+c;case 6187:return y(y(y(c,/(zoom-|grab)/,a+"$1"),/(image-set)/,a+"$1"),c,"")+c;case 5495:case 3959:return y(c,/(image-set\([^]*)/,a+"$1"+"$`$1");case 4968:return y(y(c,/(.+:)(flex-)?(.*)/,a+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a+c+c;case 4095:case 3583:case 4068:case 2532:return y(c,/(.+)-inline(.+)/,a+"$1$2")+c;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(A(c)-1-n>6)switch(z(c,n+1)){case 102:n=z(c,n+3);case 109:return y(c,/(.+:)(.+)-([^]+)/,"$1"+a+"$2-$3"+"$1"+r+(n==108?"$3":"$2-$3"))+c;case 115:return ~j(c,"stretch")?te(y(c,"stretch","fill-available"),n)+c:c}break;case 4949:if(z(c,n+1)!==115)break;case 6444:switch(z(c,A(c)-3-(~j(c,"!important")&&10))){case 107:case 111:return y(c,c,a+c)+c;case 101:return y(c,/(.+:)([^;!]+)(;|!.+)?/,"$1"+a+(z(c,14)===45?"inline-":"")+"box$3"+"$1"+a+"$2$3"+"$1"+e+"$2box$3")+c}break;case 5936:switch(z(c,n+11)){case 114:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb")+c;case 108:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb-rl")+c;case 45:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"lr")+c}return a+c+e+c+c}return c}function se(e,r){var a="";var c=M(e);for(var n=0;n<c;n++)a+=r(e[n],n,e,r)||"";return a}function ue(e,r,a,s){switch(e.type){case i:case t:return e.return=e.return||e.value;case c:return "";case n:e.value=e.props.join(",");}return A(a=se(e.children,s))?e.return=e.value+"{"+a+"}":""}function ie(e){var r=M(e);return function(a,c,n,t){var s="";for(var u=0;u<r;u++)s+=e[u](a,c,n,t)||"";return s}}function fe(e){return function(r){if(!r.root)if(r=r.return)e(r);}}function oe(c,s,u,i){if(!c.return)switch(c.type){case t:c.return=te(c.value,c.length);break;case p:return se([I(y(c.value,"@","@"+a),c,"")],i);case n:if(c.length)return S(c.props,(function(n){switch(x(n,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return se([I(y(n,/:(read-\w+)/,":"+r+"$1"),c,"")],i);case"::placeholder":return se([I(y(n,/:(plac\w+)/,":"+a+"input-$1"),c,""),I(y(n,/:(plac\w+)/,":"+r+"$1"),c,""),I(y(n,/:(plac\w+)/,e+"input-$1"),c,"")],i)}return ""}))}}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (Q(character)) {
      case 0:
        // &\f
        if (character === 38 && L() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += _(E - 1);
        break;

      case 2:
        parsed[index] += U(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = L() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += d(character);
    }
  } while (character = K());

  return parsed;
};

var getRules = function getRules(value, points) {
  return T(toRules(R(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var isBrowser = typeof document !== 'undefined';
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  return memoize(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [oe];

var createCache = function createCache(options) {
  var key = options.key;

  if (process.env.NODE_ENV !== 'production' && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (isBrowser && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to

    Array.prototype.forEach.call(ssrStyles, function (node) {
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      if (attrib[0] !== key) {
        return;
      } // $FlowFixMe


      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (process.env.NODE_ENV !== 'production') {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  if (isBrowser) {
    var currentSheet;
    var finalizingPlugins = [ue, process.env.NODE_ENV !== 'production' ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== c) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : fe(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = ie(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return se(ee(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [ue];

    var _serializer = ie(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return se(ee(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c$1=b?Symbol.for("react.element"):60103,d$1=b?Symbol.for("react.portal"):60106,e$1=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g$1=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k$1=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m$1=b?Symbol.for("react.concurrent_mode"):60111,n$1=b?Symbol.for("react.forward_ref"):60112,p$1=b?Symbol.for("react.suspense"):60113,q$1=b?
Symbol.for("react.suspense_list"):60120,r$1=b?Symbol.for("react.memo"):60115,t$1=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x$1=b?Symbol.for("react.responder"):60118,y$1=b?Symbol.for("react.scope"):60119;
function z$1(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c$1:switch(a=a.type,a){case l:case m$1:case e$1:case g$1:case f:case p$1:return a;default:switch(a=a&&a.$$typeof,a){case k$1:case n$1:case t$1:case r$1:case h:return a;default:return u}}case d$1:return u}}}function A$1(a){return z$1(a)===m$1}var AsyncMode=l;var ConcurrentMode=m$1;var ContextConsumer=k$1;var ContextProvider=h;var Element=c$1;var ForwardRef=n$1;var Fragment=e$1;var Lazy=t$1;var Memo=r$1;var Portal=d$1;
var Profiler=g$1;var StrictMode=f;var Suspense=p$1;var isAsyncMode=function(a){return A$1(a)||z$1(a)===l};var isConcurrentMode=A$1;var isContextConsumer=function(a){return z$1(a)===k$1};var isContextProvider=function(a){return z$1(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c$1};var isForwardRef=function(a){return z$1(a)===n$1};var isFragment=function(a){return z$1(a)===e$1};var isLazy=function(a){return z$1(a)===t$1};
var isMemo=function(a){return z$1(a)===r$1};var isPortal=function(a){return z$1(a)===d$1};var isProfiler=function(a){return z$1(a)===g$1};var isStrictMode=function(a){return z$1(a)===f};var isSuspense=function(a){return z$1(a)===p$1};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e$1||a===m$1||a===g$1||a===f||a===p$1||a===q$1||"object"===typeof a&&null!==a&&(a.$$typeof===t$1||a.$$typeof===r$1||a.$$typeof===h||a.$$typeof===k$1||a.$$typeof===n$1||a.$$typeof===w||a.$$typeof===x$1||a.$$typeof===y$1||a.$$typeof===v)};var typeOf=z$1;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});
reactIs_development.AsyncMode;
reactIs_development.ConcurrentMode;
reactIs_development.ContextConsumer;
reactIs_development.ContextProvider;
reactIs_development.Element;
reactIs_development.ForwardRef;
reactIs_development.Fragment;
reactIs_development.Lazy;
reactIs_development.Memo;
reactIs_development.Portal;
reactIs_development.Profiler;
reactIs_development.StrictMode;
reactIs_development.Suspense;
reactIs_development.isAsyncMode;
reactIs_development.isConcurrentMode;
reactIs_development.isContextConsumer;
reactIs_development.isContextProvider;
reactIs_development.isElement;
reactIs_development.isForwardRef;
reactIs_development.isFragment;
reactIs_development.isLazy;
reactIs_development.isMemo;
reactIs_development.isPortal;
reactIs_development.isProfiler;
reactIs_development.isStrictMode;
reactIs_development.isSuspense;
reactIs_development.isValidElementType;
reactIs_development.typeOf;

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$2 = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);
EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser$2) {
  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({
          key: 'css'
        });
        return /*#__PURE__*/createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */createContext({});

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};
var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, typeof cssProp === 'function' || Array.isArray(cssProp) ? useContext(ThemeContext) : undefined);

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/createElement(type, newProps);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/createElement(Fragment$2, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
}

var Fragment$1 = Fragment$3;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsx$1(type, props, key);
  }

  return jsx$1(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsxs$1(type, props, key);
  }

  return jsxs$1(Emotion, createEmotionProps(type, props), key);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var pkg = {
	name: "@emotion/react",
	version: "11.1.5",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"isolated-hoist-non-react-statics-do-not-use-this-in-your-code",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "mitchellhamilton <mitchell@mitchellhamilton.me>",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.7.2",
		"@emotion/cache": "^11.1.3",
		"@emotion/serialize": "^1.0.0",
		"@emotion/sheet": "^1.0.1",
		"@emotion/utils": "^1.0.0",
		"@emotion/weak-memoize": "^0.2.5",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.7.2",
		"@emotion/css": "11.1.3",
		"@emotion/css-prettifier": "1.0.0",
		"@emotion/server": "11.0.0",
		"@emotion/styled": "11.1.5",
		"@types/react": "^16.9.11",
		dtslint: "^0.3.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1"
	},
	repository: "https://github.com/emotion-js/emotion/tree/master/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"
		],
		umdName: "emotionReact"
	}
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {
  if (process.env.NODE_ENV !== 'production' && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, typeof styles === 'function' || Array.isArray(styles) ? useContext(ThemeContext) : undefined);

  if (!isBrowser$2) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = useRef();
  useLayoutEffect(function () {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      sheet.hydrate([node]);
    }

    sheetRef.current = sheet;
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useLayoutEffect(function () {
    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    var sheet = sheetRef.current;

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (process.env.NODE_ENV !== 'production') {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if (process.env.NODE_ENV !== 'production' && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = /* #__PURE__ */withEmotionCache(function (props, cache) {
  var rules = '';
  var serializedHashes = '';
  var hasRendered = false;

  var css = function css() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);

    if (isBrowser$2) {
      insertStyles(cache, serialized, false);
    } else {
      var res = insertStyles(cache, serialized, false);

      if (res !== undefined) {
        rules += res;
      }
    }

    if (!isBrowser$2) {
      serializedHashes += " " + serialized.name;
    }

    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;

  if (!isBrowser$2 && rules.length !== 0) {
    var _ref;

    return /*#__PURE__*/createElement(Fragment$2, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (process.env.NODE_ENV !== 'production') {
  ClassNames.displayName = 'EmotionClassNames';
}

if (process.env.NODE_ENV !== 'production') {
  var isBrowser$3 = typeof document !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser$3 && !isJest) {
    var globalContext = isBrowser$3 ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}

var _templateObject, _templateObject2, _templateObject3;

var Container = (_ref) => {
  var {
    id,
    children
  } = _ref;
  return jsx("div", {
    "data-atom-id": id,
    "data-atom-type": "explainer",
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                padding-bottom: ", "px;\n                padding-left: ", "px;\n                padding-right: ", "px;\n                border-top: 1px solid ", ";\n                color: ", ";\n                background: ", ";\n\n                p {\n                    margin-top: ", "px;\n                    margin-bottom: ", "px;\n                }\n                i {\n                    font-style: italic;\n                }\n            "])), space[1], space[2], space[2], text.primary, text.primary, neutral[97], space[3], space[3]),
    children: children
  });
};

var Title = (_ref2) => {
  var {
    title
  } = _ref2;
  return jsx("h3", {
    css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            ", "\n            margin-top: ", "px;\n        "])), headline.xxsmall({
      fontWeight: 'bold'
    }), space[2]),
    children: title
  });
};

var Body = (_ref3) => {
  var {
    html
  } = _ref3;
  return jsx("div", {
    css: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            ", "\n        "])), textSans.small({
      fontWeight: 'light',
      lineHeight: 'tight'
    })),
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

var ExplainerAtom = (_ref4) => {
  var {
    id,
    title,
    html
  } = _ref4;
  return jsxs(Container, {
    id: id,
    children: [jsx(Title, {
      title: title
    }), jsx(Body, {
      html: html
    })]
  });
};

var pillarPalette = {
  [Pillar.News]: news,
  [Pillar.Opinion]: opinion,
  [Pillar.Sport]: sport,
  [Pillar.Culture]: culture,
  [Pillar.Lifestyle]: lifestyle,
  [Special.Labs]: lifestyle,
  [Special.SpecialReport]: news
};

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16;
var wrapperStyles = css(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n    width: 100%;\n    border-image: repeating-linear-gradient(\n            to bottom,\n            ", ",\n            ", " 1px,\n            transparent 1px,\n            transparent 4px\n        )\n        13;\n    border-top: 13px solid black;\n    background-color: ", ";\n    position: relative;\n    padding-left: 5px;\n    padding-right: 5px;\n    padding-bottom: 1px;\n    margin: 16px 0 36px;\n"])), palette.neutral[86], palette.neutral[86], palette.neutral[97]);

var kickerStyle = pillar => css(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n    color: ", ";\n    ", ";\n"])), pillarPalette[pillar][400], headline.xxxsmall({
  fontWeight: 'bold'
}));

var titleStyle = css(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n    ", ";\n"])), headline.xxxsmall());
var audioBodyStyle = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    overflow: hidden;\n"])));
var audioElementStyle = css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    height: 0;\n    vertical-align: baseline;\n    width: 300px;\n"])));
var audioControlsStyle = css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    box-sizing: content-box;\n    padding: 5px;\n    width: 50px;\n    height: 50px;\n"])));
var buttonStyle = css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    padding: 0;\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n    background-color: transparent;\n    :focus {\n        ", "\n    }\n    height: 50px;\n"])), focusHalo);
var svgPlayStyle = css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    fill: currentColor;\n    overflow: hidden;\n    width: 50px;\n    height: auto;\n"])));
var svgPauseStyle = css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    fill: currentColor;\n    overflow: hidden;\n    width: 50px;\n    height: auto;\n"])));
var timingStyle = css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    align-items: center;\n    display: flex;\n    flex: 1;\n"])));
var timePlayedStyle = css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n    min-width: 75px;\n    padding-top: 6px;\n    display: block;\n"])));
var progressBarStyle = css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n    flex: 1;\n    display: block;\n"])));

var progressBarInputStyle = pillar => css(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n    width: 100%;\n    appearance: none;\n    background-image: linear-gradient(\n        to right,\n        ", " 0%,\n        ", " 0%\n    );\n    height: 6px;\n    outline: 0;\n    cursor: pointer;\n    margin-left: 0;\n    margin-right: 0;\n    :focus {\n        ", "\n    }\n    // Use the pillar to style the colour of the range thumb\n    &::-webkit-slider-thumb {\n        background: ", ";\n        -webkit-appearance: none;\n        width: 14px;\n        height: 14px;\n        border-radius: 50px;\n    }\n    &::-moz-range-thumb {\n        background: ", ";\n        width: 14px;\n        height: 14px;\n        border: none;\n        border-radius: 50px;\n    }\n    &::-ms-thumb {\n        background: ", ";\n        width: 14px;\n        height: 14px;\n        border: none;\n        border-radius: 50px;\n    }\n"])), pillarPalette[pillar][400], palette.neutral[60], focusHalo, pillarPalette[pillar][400], pillarPalette[pillar][400], pillarPalette[pillar][400]);

var timeDurationStyle = css(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n    min-width: 65px;\n    padding-top: 6px;\n    padding-left: 10px;\n    display: block;\n"])));
var timeStyles = css(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n    ", "\n"])), textSans.small());

var format = t => t.toFixed(0).padStart(2, '0');

var formatTime = t => {
  var second = Math.floor(t % 60);
  var minute = Math.floor(t % 3600 / 60);
  var hour = Math.floor(t / 3600);
  return "".concat(format(hour), ":").concat(format(minute), ":").concat(format(second));
};

var PauseSVG = (_ref) => {
  var {
    pillar
  } = _ref;
  return jsx("svg", {
    css: svgPauseStyle,
    width: "30px",
    height: "30px",
    viewBox: "0 0 30 30",
    children: jsxs("g", {
      fill: "none",
      fillRule: "evenodd",
      children: [jsx("circle", {
        fill: pillarPalette[pillar][400],
        cx: "15",
        cy: "15",
        r: "15"
      }), jsx("path", {
        d: "M9.429 7.286h3.429v15.429h-3.43zm7.286 0h3.429v15.429h-3.43z",
        fill: palette.neutral[100]
      })]
    })
  });
};

var PlaySVG = (_ref2) => {
  var {
    pillar
  } = _ref2;
  return jsx("svg", {
    css: svgPlayStyle,
    width: "30px",
    height: "30px",
    viewBox: "0 0 30 30",
    children: jsxs("g", {
      fill: "none",
      fillRule: "evenodd",
      children: [jsx("circle", {
        fill: pillarPalette[pillar][400],
        cx: "15",
        cy: "15",
        r: "15"
      }), jsx("path", {
        fill: palette.neutral[100],
        d: "M10.113 8.571l-.47.366V20.01l.472.347 13.456-5.593v-.598z"
      })]
    })
  });
};

var buildUrl = (basicUrl, shouldUseAcast) => {
  return shouldUseAcast ? basicUrl.replace('https://', 'https://flex.acast.com/') : basicUrl;
};

var AudioAtom = (_ref3) => {
  var {
    id,
    trackUrl,
    kicker,
    title,
    pillar,
    shouldUseAcast
  } = _ref3;
  var audioEl = useRef(null);
  var [isPlaying, setIsPlaying] = useState(false); // update current time and progress bar position

  var [currentTime, setCurrentTime] = useState(0);
  var [percentPlayed, setPercentPlayed] = useState(0); // url

  var [urlToUse, setUrlToUse] = useState(buildUrl(trackUrl, shouldUseAcast));
  useEffect(() => {
    var updateCurrentTimeAndPosition = () => {
      var currentTime = audioEl.current && audioEl.current.currentTime;
      var duration = audioEl.current && audioEl.current.duration;
      setPercentPlayed(currentTime && duration ? currentTime / duration * 100 : 0);
      setCurrentTime(currentTime || 0);
    };

    audioEl.current && audioEl.current.addEventListener('timeupdate', updateCurrentTimeAndPosition);
    return () => audioEl.current ? audioEl.current.removeEventListener('timeupdate', updateCurrentTimeAndPosition) : undefined;
  }, [audioEl, setCurrentTime, shouldUseAcast]); // update duration time

  var [durationTime, setDurationTime] = useState(0);
  useEffect(() => {
    var updateDurationTime = () => setDurationTime(audioEl.current ? audioEl.current.duration : 0);

    audioEl.current && audioEl.current.addEventListener('loadeddata', updateDurationTime);
    return () => audioEl.current ? audioEl.current.removeEventListener('loadeddata', updateDurationTime) : undefined;
  }, [audioEl, setDurationTime]);

  var updateAudioCurrentTime = e => {
    if (audioEl.current) {
      var percentagePositionClick = e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100; // set the currentTime of the audio based on percentagePositionClick

      audioEl.current.currentTime = audioEl.current.duration / 100 * percentagePositionClick;
    }
  }; // ***************************
  // *     Accessibility       *
  // ***************************


  var progressBarEl = useRef(null);
  useEffect(() => {
    var rightArrowKeyCode = 39;
    var leftArrowKeyCode = 37;

    var keyListener = e => {
      if (e.keyCode === rightArrowKeyCode && document.activeElement === progressBarEl.current) {
        if (audioEl.current) audioEl.current.currentTime += 15;
      }

      if (e.keyCode === leftArrowKeyCode && document.activeElement === progressBarEl.current) {
        if (audioEl.current) audioEl.current.currentTime -= 15;
      }
    };

    document.addEventListener('keydown', keyListener);
    return () => document.removeEventListener('keydown', keyListener);
  }, [audioEl, progressBarEl]); // If Acast is enabled, replace the default url with an ad enabled one

  useEffect(() => {
    setUrlToUse(buildUrl(trackUrl, shouldUseAcast));
  }, [shouldUseAcast]);

  var playAudio = () => {
    setIsPlaying(true);
    audioEl.current && audioEl.current.play();
  };

  var pauseAudio = () => {
    setIsPlaying(false);
    audioEl.current && audioEl.current.pause();
  };

  return jsxs("div", {
    css: wrapperStyles,
    "data-atom-id": id,
    "data-atom-type": "audio",
    children: [jsxs("div", {
      css: css(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n                    padding-left: 5px;\n                "]))),
      children: [jsx("span", {
        css: kickerStyle(pillar),
        children: kicker
      }), jsx("h4", {
        css: titleStyle,
        children: title
      })]
    }), jsxs("div", {
      css: audioBodyStyle,
      children: [jsx("audio", {
        css: audioElementStyle,
        src: urlToUse,
        ref: audioEl,
        "data-duration": durationTime,
        "data-media-id": id || '_no_ids',
        "data-title": titleStyle,
        children: jsx("p", {
          children: "Sorry your browser does not support audio - but you can download here and listen https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
        })
      }), jsx("div", {
        css: audioControlsStyle,
        children: jsx("button", {
          "data-testid": isPlaying ? 'pause-button' : 'play-button',
          onClick: () => isPlaying ? pauseAudio() : playAudio(),
          css: buttonStyle,
          children: isPlaying ? jsx(PauseSVG, {
            pillar: pillar
          }) : jsx(PlaySVG, {
            pillar: pillar
          })
        })
      }), jsxs("div", {
        css: timingStyle,
        children: [jsx("div", {
          css: timePlayedStyle,
          children: jsx("span", {
            css: timeStyles,
            children: formatTime(currentTime)
          })
        }), jsx("div", {
          css: progressBarStyle,
          children: jsx("input", {
            css: progressBarInputStyle(pillar),
            ref: progressBarEl,
            type: "range",
            min: "0",
            max: "100",
            step: "1",
            value: percentPlayed,
            onClick: updateAudioCurrentTime,
            readOnly: true
          })
        }), jsx("div", {
          css: timeDurationStyle,
          children: jsx("span", {
            css: timeStyles,
            children: formatTime(durationTime)
          })
        })]
      })]
    })]
  });
};

var _templateObject$2;
var ChartAtom = (_ref) => {
  var {
    id,
    html
  } = _ref;
  return jsx("div", {
    "data-atom-id": id,
    "data-testid": "chart",
    "data-atom-type": "chart",
    "data-snippet-type": "chart",
    css: css(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n                padding-bottom: ", "px;\n            "])), space[1]),
    children: jsx("iframe", {
      className: "atom__iframe",
      name: id,
      srcDoc: html,
      width: "100%",
      frameBorder: "0"
    })
  });
};

var _templateObject$3, _templateObject2$2, _templateObject3$2, _templateObject4$1, _templateObject5$1, _templateObject6$1;

var footerStyling = css(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n    font-size: 13px;\n    line-height: 16px;\n    display: flex;\n    justify-content: flex-end;\n"]))); // Currently no thumb icon in src-icons so a path is needed

var ThumbImage = () => {
  return jsx("svg", {
    css: css(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral(["\n                width: 16px;\n                height: 16px;\n            "]))),
    viewBox: "0 0 40 40",
    children: jsx("path", {
      fill: "#FFF",
      d: "M33.78 22.437l-4.228 13.98L27.93 37.5 5.062 34.14V15.503l7.8-1.517L24.354 2.5h1.624L28.9 5.426l-4.548 8.67h.107l10.477 1.31"
    })
  });
};

var Footer = (_ref) => {
  var {
    pillar,
    likeHandler,
    dislikeHandler
  } = _ref;
  // This is defined here because adding the hover styling using cx breaks the text styling
  var buttonStyling = css(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral(["\n        display: inline-flex;\n        cursor: pointer;\n        align-items: center;\n        justify-content: center;\n        background: black;\n        color: white;\n        border-style: hidden;\n        border-radius: 100%;\n        margin: 0 0 0 5px;\n        padding: 0;\n        width: 28px;\n        height: 28px;\n        :hover {\n            background: ", ";\n        }\n        :focus {\n            border: none;\n        }\n    "])), pillarPalette[pillar][400]);
  var [showThankYou, setShowThankYou] = useState(false);
  return jsxs("footer", {
    css: footerStyling,
    children: [jsx("div", {
      hidden: showThankYou,
      children: jsxs("div", {
        css: css(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n                        display: flex;\n                        align-items: center;\n                        ", ";\n                    "])), textSans.xsmall()),
        children: [jsx("div", {
          children: "Was this helpful?"
        }), jsx("button", {
          "data-testid": "like",
          css: buttonStyling,
          onClick: () => {
            likeHandler();
            setShowThankYou(true);
          },
          children: jsx(ThumbImage, {})
        }), jsx("button", {
          css: [buttonStyling, css(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral(["\n                                transform: rotate(180deg);\n                                -webkit-transform: rotate(180deg);\n                                -moz-transform: rotate(180deg);\n                                -o-transform: rotate(180deg);\n                            "])))],
          "data-testid": "dislike",
          onClick: () => {
            dislikeHandler();
            setShowThankYou(true);
          },
          children: jsx(ThumbImage, {})
        })]
      })
    }), jsx("div", {
      css: css(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral(["\n                    ", ";\n                    height: 28px;\n                "])), textSans.xsmall()),
      "data-testid": "feedback",
      hidden: !showThankYou,
      children: "Thank you for your feedback."
    })]
  });
};

var _templateObject$4, _templateObject2$3, _templateObject3$3, _templateObject4$2, _templateObject5$2, _templateObject6$2;

var titleStyling = css(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n    ", ";\n    margin: 0;\n    line-height: 22px;\n"])), headline.xxxsmall({
  fontWeight: 'medium'
}));
var plusStyling = css(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteral(["\n    margin-right: 12px;\n    margin-bottom: 6px;\n    width: 33px;\n    fill: white;\n    height: 28px;\n"])));
var minusStyling = css(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteral(["\n    margin-right: 14px;\n    margin-bottom: 6px;\n    width: 30px;\n    fill: white;\n    height: 25px;\n    padding-left: 4px;\n"])));
var iconSpacing = css(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral(["\n    display: inline-flex;\n    align-items: center;\n    ", ";\n"])), textSans.small());
var Summary = (_ref) => {
  var {
    sectionTitle,
    title,
    pillar,
    expandCallback
  } = _ref;
  var atomTitleStyling = css(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral(["\n        display: block;\n        ", ";\n        color: ", ";\n    "])), body.medium({
    lineHeight: 'tight',
    fontWeight: 'bold'
  }), pillarPalette[pillar][400]);
  var showHideStyling = css(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteral(["\n        background: ", ";\n        color: ", ";\n        height: 2rem;\n        position: absolute;\n        bottom: 0;\n        transform: translate(0, 50%);\n        padding: 0 15px 0 7px;\n        border-radius: 100em;\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        border: 0;\n        margin: 0;\n        :hover {\n            background: ", ";\n        }\n    "])), neutral$1[7], neutral$1[100], pillarPalette[pillar][400]);
  var [hasBeenExpanded, setHasBeenExpanded] = useState(false);
  var [expandEventSent, setExpandEventFired] = useState(false);
  return jsxs("summary", {
    onClick: () => {
      if (!expandEventSent) {
        expandCallback();
        setExpandEventFired(true);
      }

      setHasBeenExpanded(!hasBeenExpanded);
    },
    children: [jsx("span", {
      css: atomTitleStyling,
      children: sectionTitle
    }), jsx("h4", {
      css: titleStyling,
      children: title
    }), jsx("span", {
      css: showHideStyling,
      children: !hasBeenExpanded ? jsxs("span", {
        css: iconSpacing,
        children: [jsx("span", {
          css: plusStyling,
          children: jsx(SvgPlus, {})
        }), "Show"]
      }) : jsxs("span", {
        css: iconSpacing,
        children: [jsx("span", {
          css: minusStyling,
          children: jsx(SvgMinus, {})
        }), "Hide"]
      })
    })]
  });
};

var _templateObject$5, _templateObject2$4;
var containerStyling = css(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral(["\n    display: block;\n    position: relative;\n"])));
var detailStyling = css(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteral(["\n    margin: 16px 0 36px;\n    background: ", ";\n    color: ", ";\n    padding: 0 5px 6px;\n    border-image: repeating-linear-gradient(\n            to bottom,\n            ", ",\n            ", " 1px,\n            transparent 1px,\n            transparent 4px\n        )\n        13;\n    border-top: 13px solid black;\n    position: relative;\n    summary {\n        list-style: none;\n        margin: 0 0 16px;\n    }\n\n    /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Customizing_the_disclosure_widget */\n    summary::-webkit-details-marker {\n        display: none;\n    }\n\n    summary:focus {\n        outline: none;\n    }\n"])), neutral[93], text.primary, neutral[86], neutral[86]);
var Container$1 = (_ref) => {
  var {
    id,
    title,
    children,
    pillar,
    expandForStorybook,
    atomType,
    atomTypeTitle,
    expandCallback
  } = _ref;
  return jsx("div", {
    css: containerStyling,
    "data-atom-id": id,
    "data-atom-type": atomType,
    children: jsxs("details", {
      css: detailStyling,
      "data-atom-id": id,
      "data-snippet-type": atomType,
      open: expandForStorybook,
      children: [jsx(Summary, {
        sectionTitle: atomTypeTitle,
        pillar: pillar,
        title: title,
        expandCallback: expandCallback
      }), children]
    })
  });
};

var _templateObject$6, _templateObject2$5, _templateObject3$4, _templateObject4$3;
var imageStyling = css(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteral(["\n    float: left;\n    margin-right: 16px;\n    margin-bottom: 6px;\n    object-fit: cover;\n    border-radius: 50%;\n    display: block;\n    border: 0px;\n    width: 100px;\n    height: 100px;\n"])));
var creditStyling = css(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteral(["\n    ", ";\n    margin: 12px 0;\n    display: flex;\n    align-items: center;\n    svg {\n        width: 30px;\n        fill: ", ";\n    }\n"])), textSans.xsmall(), neutral[60]);
var bodyStyling = css(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteral(["\n    ", "\n    p {\n        margin-bottom: 0.5rem;\n    }\n\n    ol {\n        list-style: decimal;\n        list-style-position: inside;\n        margin-bottom: 1rem;\n    }\n\n    ul {\n        list-style: none;\n        margin: 0 0 0.75rem;\n        padding: 0;\n        margin-bottom: 1rem;\n    }\n\n    ul li {\n        margin-bottom: 0.375rem;\n        padding-left: 1.25rem;\n    }\n\n    ul li:before {\n        display: inline-block;\n        content: '';\n        border-radius: 0.375rem;\n        height: 0.75rem;\n        width: 0.75rem;\n        margin-right: 0.5rem;\n        background-color: ", ";\n        margin-left: -1.25rem;\n    }\n\n    /* Without this bold elements are overridden */\n    b {\n        font-weight: 700;\n    }\n\n    i {\n        font-style: italic;\n    }\n"])), body.medium(), neutral[86]);

var linkStyling = pillar => css(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteral(["\n    a {\n        color: ", ";\n        text-decoration: none;\n        border-bottom: 0.0625rem solid ", ";\n        transition: border-color 0.15s ease-out;\n    }\n\n    a:hover {\n        border-bottom: solid 0.0625rem ", ";\n    }\n"])), pillarPalette[pillar][300], neutral[86], pillarPalette[pillar][400]);

var Body$1 = (_ref) => {
  var {
    html,
    image,
    credit,
    pillar
  } = _ref;
  return jsxs("div", {
    children: [image && jsx("img", {
      css: imageStyling,
      src: image,
      alt: ""
    }), jsx("div", {
      css: [bodyStyling, linkStyling(pillar)],
      dangerouslySetInnerHTML: {
        __html: html
      }
    }), credit && jsxs("div", {
      css: creditStyling,
      children: [jsx(SvgInfo, {}), credit]
    })]
  });
};

var GuideAtom = (_ref) => {
  var {
    id,
    title,
    image,
    html,
    credit,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback
  } = _ref;
  return jsxs(Container$1, {
    id: id,
    title: title,
    pillar: pillar,
    atomType: "guide",
    atomTypeTitle: "Quick Guide",
    expandForStorybook: expandForStorybook,
    expandCallback: expandCallback,
    children: [jsx(Body$1, {
      html: html,
      image: image,
      credit: credit,
      pillar: pillar
    }), jsx(Footer, {
      pillar: pillar,
      dislikeHandler: dislikeHandler,
      likeHandler: likeHandler
    })]
  });
};

var unifyPageContent = (_ref) => {
  var {
    elementCss,
    elementJs,
    elementHtml
  } = _ref;
  return render(jsxs("html", {
    children: [jsxs("head", {
      children: [jsx("meta", {
        charSet: "utf-8"
      }), jsx("meta", {
        name: "viewport",
        content: "width=device-width,minimum-scale=1,initial-scale=1"
      }), elementCss && jsx("style", {
        dangerouslySetInnerHTML: {
          __html: elementCss
        }
      })]
    }), jsx("body", {
      children: elementHtml && jsx("div", {
        dangerouslySetInnerHTML: {
          __html: elementHtml
        }
      })
    }), jsx("script", {
      dangerouslySetInnerHTML: {
        __html: elementJs
      }
    }), jsx("script", {
      dangerouslySetInnerHTML: {
        __html: "\n                            function resize() {\n                                window.frameElement.height = document.body.offsetHeight;\n                            }\n                            window.addEventListener('resize', resize);\n                            resize();\n                        "
      }
    }), jsx("script", {
      dangerouslySetInnerHTML: {
        __html: "\n                            var fonts = [].slice.apply(window.parent.document.styleSheets)\n                                .filter(function (sheet) { return sheet.ownerNode.className.indexOf(\"webfont\") > - 1; })\n                                .map(function (sheet) { return sheet.ownerNode.textContent; })\n                                .join(' ');\n                            var css = document.createElement('style');\n                            css.textContent = fonts;\n                            document.head.appendChild(css);\n                        "
      }
    })]
  }));
};

var _templateObject$7, _templateObject2$6;
var containerStyles = css(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteral(["\n    margin: 0;\n"])));
var fullWidthStyles = css(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteral(["\n    width: 100%;\n"])));
var InteractiveAtom = (_ref) => {
  var {
    id,
    elementHtml,
    elementJs,
    elementCss
  } = _ref;
  return jsx("div", {
    css: containerStyles,
    "data-atom-id": id,
    "data-atom-type": "interactive",
    children: jsx("iframe", {
      css: fullWidthStyles,
      srcDoc: unifyPageContent({
        elementJs,
        elementCss,
        elementHtml
      }),
      frameBorder: "0"
    })
  });
};

var _templateObject$8;
var MaintainAspectRatio = (_ref) => {
  var {
    height,
    width,
    children
  } = _ref;
  return (
    /* https://css-tricks.com/aspect-ratio-boxes/ */
    jsx("div", {
      css: css(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteral(["\n            /* position relative to contain the absolutely positioned iframe plus any Overlay image */\n            position: relative;\n            padding-bottom: ", "%;\n\n            iframe {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n        "])), height / width * 100),
      children: children
    })
  );
};

var enforceTwoDigitString = number => number >= 10 ? number : "0".concat(number);

var formatTime$1 = videoDurationInSeconds => {
  var hours = Math.floor(videoDurationInSeconds / 3600);
  var minutes = Math.floor(videoDurationInSeconds % 3600 / 60);
  var seconds = videoDurationInSeconds % 60; // We assume that videos are shorter than 1 hour, but handle incase one does arise

  var hoursString = hours > 0 ? "".concat(enforceTwoDigitString(hours), ":") : '';
  var minutesString = minutes > 0 ? enforceTwoDigitString(minutes) : '00';
  var secondsString = seconds > 0 ? enforceTwoDigitString(seconds) : '00';
  return "".concat(hoursString).concat(minutesString, ":").concat(secondsString);
};

var _templateObject$9;

var getClosestSetForWidth = (desiredWidth, inlineSrcSets) => {
  // For a desired width, find the SrcSetItem which is the closest match
  var sorted = inlineSrcSets.sort((a, b) => b.width - a.width);
  return sorted.reduce((best, current) => {
    if (current.width < best.width && current.width >= desiredWidth) {
      return current;
    }

    return best;
  });
};

var getSourcesForRoleAndResolution = (imageSources, resolution) => {
  return resolution === 'hdpi' ? imageSources[0].srcSet.filter(set => set.src.includes('dpr=2')) : imageSources[0].srcSet.filter(set => !set.src.includes('dpr=2'));
};

var getFallback = (resolution, imageSources) => {
  // Get the sources for this role and resolution
  var sources = getSourcesForRoleAndResolution(imageSources, resolution);
  if (sources.length === 0) return undefined; // The assumption here is readers on devices that do not support srcset are likely to be on poor
  // network connections so we're going to fallback to a small image

  return getClosestSetForWidth(300, sources).src;
};

var getSources = (resolution, imageSources) => {
  // Get the sources for this role and resolution
  var sources = getSourcesForRoleAndResolution(imageSources, resolution);
  return sources.map(srcSet => "".concat(srcSet.src, " ").concat(srcSet.width, "w")).join(',');
};
/**
 *       mobile: 320
 *       mobileMedium: 375
 *       mobileLandscape: 480
 *       phablet: 660
 *       tablet: 740
 *       desktop: 980
 *       leftCol: 1140
 *       wide: 1300
 */


var getSizes = (role, isMainMedia) => {
  switch (role) {
    case 'inline':
      return "(min-width: ".concat(breakpoints.phablet, "px) 620px, 100vw");

    case 'halfWidth':
      return "(min-width: ".concat(breakpoints.phablet, "px) 300px, 50vw");

    case 'thumbnail':
      return '140px';

    case 'immersive':
      // Immersive MainMedia elements fill the height of the viewport, meaning
      // on mobile devices even though the viewport width is small, we'll need
      // a larger image to maintain quality. To solve this problem we're using
      // the viewport height (vh) to calculate width. The value of 167vh
      // relates to an assumed image ratio of 5:3 which is equal to
      // 167 (viewport height)  : 100 (viewport width).
      // Immersive body images stretch the full viewport width below wide,
      // but do not stretch beyond 1300px after that.
      return isMainMedia ? "(orientation: portrait) 167vh, 100vw" : "(min-width: ".concat(breakpoints.wide, "px) 1300px, 100vw");

    case 'supporting':
      return "(min-width: ".concat(breakpoints.wide, "px) 380px, 300px");

    case 'showcase':
      return isMainMedia ? "(min-width: ".concat(breakpoints.wide, "px) 1020px, (min-width: ").concat(breakpoints.leftCol, "px) 940px, (min-width: ").concat(breakpoints.tablet, "px) 700px, (min-width: ").concat(breakpoints.phablet, "px) 660px, 100vw") : "(min-width: ".concat(breakpoints.wide, "px) 860px, (min-width: ").concat(breakpoints.leftCol, "px) 780px, (min-width: ").concat(breakpoints.phablet, "px) 620px, 100vw");
  }
};

var Picture = (_ref) => {
  var {
    imageSources,
    role,
    alt,
    height,
    width,
    isMainMedia = false
  } = _ref;
  var hdpiSources = getSources('hdpi', imageSources);
  var mdpiSources = getSources('mdpi', imageSources);
  var fallbackSrc = getFallback('hdpi', imageSources);
  var sizes = getSizes(role, isMainMedia);
  return jsxs("picture", {
    itemProp: "contentUrl",
    children: [jsx("source", {
      srcSet: hdpiSources,
      sizes: sizes,
      media: "(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)"
    }), jsx("source", {
      srcSet: mdpiSources,
      sizes: sizes
    }), jsx("img", {
      alt: alt,
      src: fallbackSrc,
      height: height,
      width: width // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
      // why did we add the css `vertical-align: middle;` to the img tag
      ,
      css: css(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteral(["\n                    vertical-align: middle;\n                "])))
    })]
  });
};

var _templateObject$a, _templateObject2$7, _templateObject3$5, _templateObject4$4, _templateObject5$3, _templateObject6$3, _templateObject7$1;

var buildEmbedConfig = adTargeting => {
  return {
    adsConfig: {
      adTagParameters: {
        iu: "".concat(adTargeting.adUnit || ''),
        cust_params: encodeURIComponent(constructQuery(adTargeting.customParams))
      }
    }
  };
};

var constructQuery = query => Object.keys(query).map(param => {
  var value = query[param];
  var queryValue = Array.isArray(value) ? value.map(v => encodeURIComponent(v)).join(',') : encodeURIComponent(value);
  return "".concat(param, "=").concat(queryValue);
}).join('&');

// https://developers.google.com/youtube/iframe_api_reference#Events
var youtubePlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
var overlayStyles = css(_templateObject$a || (_templateObject$a = _taggedTemplateLiteral(["\n    background-size: cover;\n    background-position: 49% 49%;\n    background-repeat: no-repeat;\n    text-align: center;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    max-height: 100vh;\n    cursor: pointer;\n\n    /* hard code \"overlay-play-button\" to be able to give play button animation on focus/hover of overlay */\n    :focus {\n        ", "\n        .overlay-play-button {\n            transform: scale(1.15);\n            transition-duration: 300ms;\n        }\n    }\n    :hover {\n        .overlay-play-button {\n            transform: scale(1.15);\n            transition-duration: 300ms;\n        }\n    }\n"])), focusHalo); // Overlay CSS

var hideOverlayStyling = css(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteral(["\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity 1s linear, visibility 1s;\n    transition-delay: 500ms;\n    transition-duration: 500ms;\n"])));

var playButtonStyling = pillar => css(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteral(["\n    background-color: ", ";\n    border-radius: 100%;\n    height: 60px;\n    width: 60px;\n    transform: scale(1);\n    transition-duration: 300ms;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    svg {\n        fill: ", ";\n        width: 45px;\n        height: 40px;\n    }\n"])), pillarPalette[pillar][500], palette['neutral'][100]);

var overlayInfoWrapperStyles = css(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    position: absolute;\n    bottom: ", "px;\n    left: ", "px;\n"])), space[4], space[4]);

var videoDurationStyles = pillar => css(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteral(["\n    ", ";\n    padding-left: ", "px;\n    color: ", ";\n"])), textSans.medium({
  fontWeight: 'bold'
}), space[3], pillarPalette[pillar][500]);

// Note, this is a subset of the CAPI MediaAtom essentially.
var YoutubeAtom = (_ref) => {
  var {
    assetId,
    overrideImage,
    posterImage,
    adTargeting,
    height = 259,
    width = 460,
    alt,
    role,
    title,
    duration,
    origin,
    eventEmitters,
    pillar
  } = _ref;
  var embedConfig = adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
  var originString = origin ? "&origin=".concat(origin) : '';
  var iframeSrc = "https://www.youtube.com/embed/".concat(assetId, "?embed_config=").concat(embedConfig, "&enablejsapi=1").concat(originString, "&widgetid=1&modestbranding=1");
  var [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState(false);
  var player = useRef();
  useEffect(() => {
    if (!player.current) {
      player.current = YouTubePlayer("youtube-video-".concat(assetId));
    }

    var hasSentPlayEvent = false;
    var hasSent25Event = false;
    var hasSent50Event = false;
    var hasSent75Event = false;
    var listener = player.current && player.current.on('stateChange', e => {
      if (e.data === youtubePlayerState.PLAYING) {
        if (!hasSentPlayEvent) {
          eventEmitters.forEach(eventEmitter => eventEmitter('play'));
          hasSentPlayEvent = true;
          setTimeout(() => {
            checkProgress();
          }, 3000);
        }

        var checkProgress = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(function* () {
            if (!player || !player.current) return null;
            var currentTime = player.current && (yield player.current.getCurrentTime());
            var duration = player.current && (yield player.current.getDuration());
            if (!duration || !currentTime) return;
            var percentPlayed = currentTime / duration * 100;

            if (!hasSent25Event && 25 < percentPlayed) {
              eventEmitters.forEach(eventEmitter => eventEmitter('25'));
              hasSent25Event = true;
            }

            if (!hasSent50Event && 50 < percentPlayed) {
              eventEmitters.forEach(eventEmitter => eventEmitter('50'));
              hasSent50Event = true;
            }

            if (!hasSent75Event && 75 < percentPlayed) {
              eventEmitters.forEach(eventEmitter => eventEmitter('75'));
              hasSent75Event = true;
            }

            var currentPlayerState = player.current && (yield player.current.getPlayerState());

            if (currentPlayerState !== youtubePlayerState.ENDED) {
              // Set a timeout to check progress again in the future
              window.setTimeout(() => checkProgress(), 3000);
            }
          });

          return function checkProgress() {
            return _ref2.apply(this, arguments);
          };
        }();
      }

      if (e.data === youtubePlayerState.ENDED) {
        eventEmitters.forEach(eventEmitter => eventEmitter('end'));
      }
    });
    return () => {
      listener && player.current && player.current.off(listener);
    };
  }, [eventEmitters]);
  return jsxs(MaintainAspectRatio, {
    height: height,
    width: width,
    children: [jsx("iframe", {
      title: title,
      width: width,
      height: height,
      id: "youtube-video-".concat(assetId),
      src: iframeSrc // needed in order to allow `player.playVideo();` to be able to run
      // https://stackoverflow.com/a/53298579/7378674
      ,
      allow: "autoplay",
      tabIndex: overrideImage || posterImage ? -1 : 0,
      allowFullScreen: true,
      "data-atom-id": "youtube-video-".concat(assetId),
      "data-atom-type": "youtube"
    }), (overrideImage || posterImage) && jsxs("div", {
      "daya-cy": "youtube-overlay",
      onClick: () => {
        setHasUserLaunchedPlay(true);
        player.current && player.current.playVideo();
      },
      onKeyDown: e => {
        var spaceKey = 32;
        var enterKey = 13;

        if (e.keyCode === spaceKey || e.keyCode === enterKey) {
          setHasUserLaunchedPlay(true);
          player.current && player.current.playVideo();
        }
      },
      css: [overlayStyles, hasUserLaunchedPlay ? hideOverlayStyling : '', css(_templateObject6$3 || (_templateObject6$3 = _taggedTemplateLiteral(["\n                            img {\n                                height: 100%;\n                                width: 100%;\n                            }\n                        "])))],
      tabIndex: 0,
      children: [jsx(Picture, {
        imageSources: overrideImage || posterImage || [],
        role: role,
        alt: alt,
        height: "".concat(height),
        width: "".concat(width)
      }), jsxs("div", {
        css: overlayInfoWrapperStyles,
        children: [jsx("div", {
          className: "overlay-play-button",
          css: css(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral(["\n                                ", "\n                            "])), playButtonStyling(pillar)),
          children: jsx(SvgPlay, {})
        }), duration && jsx("div", {
          css: videoDurationStyles(pillar),
          children: formatTime$1(duration)
        })]
      })]
    })]
  });
};

var ProfileAtom = (_ref) => {
  var {
    id,
    title,
    image,
    html,
    credit,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback
  } = _ref;
  return jsxs(Container$1, {
    id: id,
    title: title,
    pillar: pillar,
    atomType: "profile",
    atomTypeTitle: "Profile",
    expandForStorybook: expandForStorybook,
    expandCallback: expandCallback,
    children: [jsx(Body$1, {
      html: html,
      image: image,
      credit: credit,
      pillar: pillar
    }), jsx(Footer, {
      pillar: pillar,
      dislikeHandler: dislikeHandler,
      likeHandler: likeHandler
    })]
  });
};

var QandaAtom = (_ref) => {
  var {
    id,
    title,
    image,
    html,
    credit,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback
  } = _ref;
  return jsxs(Container$1, {
    id: id,
    title: title,
    atomType: "qanda",
    atomTypeTitle: "Q&A",
    pillar: pillar,
    expandForStorybook: expandForStorybook,
    expandCallback: expandCallback,
    children: [jsx(Body$1, {
      html: html,
      image: image,
      credit: credit,
      pillar: pillar
    }), jsx(Footer, {
      pillar: pillar,
      likeHandler: likeHandler,
      dislikeHandler: dislikeHandler
    })]
  });
};

var _templateObject$b, _templateObject2$8, _templateObject3$6, _templateObject4$5, _templateObject5$4, _templateObject6$4, _templateObject7$2, _templateObject8$1, _templateObject9$1, _templateObject10$1;
// with our custom answers for the quiz

var radioButtonWrapperStyles = css(_templateObject$b || (_templateObject$b = _taggedTemplateLiteral(["\n    label {\n        padding-top: ", "px;\n        padding-bottom: ", "px;\n        padding-left: ", "px;\n        padding-right: ", "px;\n\n        margin-bottom: ", "px;\n\n        background-color: ", ";\n\n        :hover {\n            background-color: ", ";\n        }\n        /* TODO: apply same styles on focus (requires source update) */\n\n        span {\n            ", ";\n        }\n    }\n"])), space[3], space[3], space[2], space[2], space[2], neutral[97], neutral[86], body.medium());

var AnswerWithSVG = (_ref) => {
  var {
    id,
    text,
    supplementText,
    isCorrect,
    answerType
  } = _ref;
  return jsxs("div", {
    css: css(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteral(["\n            display: flex;\n            flex-direction: row;\n\n            margin-bottom: ", "px;\n\n            padding-top: ", "px;\n            padding-bottom: ", "px;\n            padding-right: ", "px;\n            padding-left: ", "px;\n\n            background-color: ", ";\n        "])), space[2], space[3], space[3], space[4], space[3], isCorrect ? success[400] : news[400]),
    children: [jsx("div", {
      css: css(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteral(["\n                margin-right: ", "px;\n\n                height: ", "px;\n                svg {\n                    fill: ", ";\n                    height: ", "px;\n                    width: ", "px;\n                }\n            "])), space[1], space[6], neutral[100], space[6], space[6]),
      children: isCorrect ? jsx(SvgCheckmark, {}) : jsx(SvgCross, {})
    }), jsxs("label", {
      css: css(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteral(["\n                color: ", ";\n                display: flex;\n                flex-direction: column;\n\n                ", ";\n            "])), neutral[100], body.medium()),
      "data-testid": id,
      "data-answer-type": answerType,
      children: [jsx("span", {
        css: css(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteral(["\n                    ", ";\n                "])), body.medium()),
        children: text
      }), supplementText && jsx("span", {
        css: css(_templateObject6$4 || (_templateObject6$4 = _taggedTemplateLiteral(["\n                        ", "\n                    "])), textSans.xsmall()),
        children: supplementText
      })]
    })]
  });
};

var AnswerWithoutSVG = (_ref2) => {
  var {
    id,
    text,
    supplementText,
    isCorrect,
    answerType
  } = _ref2;
  return jsx("div", {
    css: css(_templateObject7$2 || (_templateObject7$2 = _taggedTemplateLiteral(["\n            ", ";\n            background-color: ", ";\n\n            display: flex;\n            flex-direction: row;\n\n            margin-bottom: ", "px;\n\n            padding-top: ", "px;\n            padding-bottom: ", "px;\n            padding-right: ", "px;\n            padding-left: ", "px;\n        "])), body.medium(), isCorrect ? success[500] : neutral[97], space[2], space[3], space[3], space[2], space[9]),
    children: jsxs("label", {
      css: css(_templateObject8$1 || (_templateObject8$1 = _taggedTemplateLiteral(["\n                margin-left: ", "px;\n                display: flex;\n                flex-direction: column;\n            "])), space[1]),
      "data-testid": id,
      "data-answer-type": answerType,
      children: [jsx("span", {
        css: css(_templateObject9$1 || (_templateObject9$1 = _taggedTemplateLiteral(["\n                    ", ";\n                "])), body.medium()),
        children: text
      }), supplementText && jsx("span", {
        css: css(_templateObject10$1 || (_templateObject10$1 = _taggedTemplateLiteral(["\n                        ", "\n                    "])), textSans.xsmall()),
        children: supplementText
      })]
    })
  });
};

var CorrectSelectedAnswer = (_ref3) => {
  var {
    answerText,
    explainerText,
    id
  } = _ref3;
  return jsx(AnswerWithoutSVG, {
    id: id,
    text: answerText,
    supplementText: explainerText,
    isCorrect: true,
    answerType: "correct-selected-answer"
  });
};
var IncorrectAnswer = (_ref4) => {
  var {
    answerText,
    id
  } = _ref4;
  return jsx(AnswerWithSVG, {
    id: id,
    text: answerText,
    isCorrect: false,
    answerType: "incorrect-answer"
  });
};
var NonSelectedCorrectAnswer = (_ref5) => {
  var {
    answerText,
    explainerText,
    id
  } = _ref5;
  return jsx(AnswerWithSVG, {
    id: id,
    text: answerText,
    supplementText: explainerText,
    isCorrect: true,
    answerType: "non-selected-correct-answer"
  });
};
var UnselectedAnswer = (_ref6) => {
  var {
    id,
    answerText
  } = _ref6;
  return jsx(AnswerWithoutSVG, {
    id: id,
    text: answerText,
    answerType: "unselected-disabled-answer"
  });
};

var _templateObject$c, _templateObject2$9, _templateObject3$7, _templateObject4$6, _templateObject5$5, _templateObject6$5, _templateObject7$3, _templateObject8$2, _templateObject9$2, _templateObject10$2;
var answersWrapperStyle = css(_templateObject$c || (_templateObject$c = _taggedTemplateLiteral(["\n    margin-bottom: 12px;\n    border: 0px;\n    padding: 0px;\n    ", ";\n"])), body.medium());
var findMostReferredToBucketId = (_ref) => {
  var {
    selectedGlobalAnswers,
    questions
  } = _ref;
  var bucketCounter = {};
  var answersFromQuestion = Object.keys(selectedGlobalAnswers).map(questionId => {
    var selectedQuestion = questions.find(question => question.id === questionId);
    var answerId = selectedGlobalAnswers[questionId];
    var selectedAnswer = selectedQuestion && selectedQuestion.answers.find(answer => answer.id === answerId);
    return selectedAnswer;
  }).filter(selectedAnswer => selectedAnswer !== undefined);
  answersFromQuestion.forEach(answerFromQuestion => {
    answerFromQuestion.answerBuckets.forEach(answerBucket => {
      if (answerBucket in bucketCounter) {
        bucketCounter[answerBucket] = bucketCounter[answerBucket] + 1;
      } else {
        bucketCounter[answerBucket] = 1;
      }
    });
  });
  var bucketIdWithHighestCount;
  Object.keys(bucketCounter).forEach(bucketId => {
    if (!bucketIdWithHighestCount) {
      bucketIdWithHighestCount = bucketId;
      return;
    }

    bucketIdWithHighestCount = bucketCounter[bucketId] > bucketCounter[bucketIdWithHighestCount] ? bucketId : bucketIdWithHighestCount;
  });
  return bucketIdWithHighestCount;
};
var PersonalityQuizAtom = (_ref2) => {
  var {
    id,
    questions,
    resultBuckets,
    sharingIcons
  } = _ref2;
  var [selectedGlobalAnswers, setSelectedGlobalAnswers] = useState({});
  var [hasSubmittedAnswers, setHasSubmittedAnswers] = useState(false);
  var [hasMissingAnswers, setHasMissingAnswers] = useState(false);
  var [topSelectedResult, setTopSelectedResult] = useState();

  var onSubmit = e => {
    e.preventDefault(); // check all answers have been selected

    var missingAnswers = questions.some(question => question.id in selectedGlobalAnswers ? false : true);

    if (missingAnswers) {
      setHasMissingAnswers(true);
    } else {
      setHasSubmittedAnswers(true);
    }
  };

  useEffect(() => {
    if (hasSubmittedAnswers && Object.keys(selectedGlobalAnswers).length) {
      var bucketIdWithHighestCount = findMostReferredToBucketId({
        selectedGlobalAnswers,
        questions
      });
      setTopSelectedResult(resultBuckets.find(resultBucket => resultBucket.id === bucketIdWithHighestCount));
    } else {
      setTopSelectedResult(null);
    }
  }, [hasSubmittedAnswers, selectedGlobalAnswers, setTopSelectedResult, resultBuckets]);
  return jsxs("form", {
    "data-atom-id": id,
    "data-atom-type": "personalityquiz",
    children: [hasSubmittedAnswers && topSelectedResult && jsx("div", {
      "data-testid": "quiz-results-block-top",
      children: jsx(Result, {
        resultBuckets: topSelectedResult,
        sharingIcons: sharingIcons
      })
    }), questions.map((question, idx) => jsx(PersonalityQuizAnswers, {
      id: question.id,
      questionNumber: idx + 1,
      text: question.text,
      imageUrl: question.imageUrl,
      answers: question.answers,
      updateSelectedAnswer: selectedAnswerId => {
        setHasMissingAnswers(false);
        setSelectedGlobalAnswers(_objectSpread2(_objectSpread2({}, selectedGlobalAnswers), {}, {
          [question.id]: selectedAnswerId
        }));
      },
      globallySelectedAnswer: question.id in selectedGlobalAnswers ? selectedGlobalAnswers[question.id] : undefined,
      hasSubmittedAnswers: hasSubmittedAnswers
    }, question.id)), hasMissingAnswers && jsx(MissingAnswers, {}), hasSubmittedAnswers && topSelectedResult && jsx("div", {
      "data-testid": "quiz-results-block-bottom",
      children: jsx(Result, {
        resultBuckets: topSelectedResult,
        sharingIcons: sharingIcons
      })
    }), jsxs("div", {
      css: css(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteral(["\n                    display: flex;\n                    flex-direction: row;\n                    button {\n                        margin-right: 10px;\n                    }\n                "]))),
      children: [jsx(Button, {
        type: "submit",
        onClick: onSubmit,
        onKeyDown: e => {
          var spaceKey = 32;
          var enterKey = 13;
          if (e.keyCode === spaceKey || e.keyCode === enterKey) onSubmit(e);
        },
        "data-testid": "submit-quiz",
        children: "Submit"
      }), jsx(Button, {
        priority: "secondary",
        onClick: () => {
          setSelectedGlobalAnswers({});
          setHasSubmittedAnswers(false);
          setTopSelectedResult(null);
        },
        onKeyDown: e => {
          var spaceKey = 32;
          var enterKey = 13;

          if (e.keyCode === spaceKey || e.keyCode === enterKey) {
            setSelectedGlobalAnswers({});
            setHasSubmittedAnswers(false);
            setTopSelectedResult(null);
          }
        },
        "data-testid": "reset-quiz",
        children: "Reset"
      })]
    })]
  });
};

var PersonalityQuizAnswers = (_ref3) => {
  var {
    id: questionId,
    questionNumber,
    text,
    imageUrl,
    answers,
    updateSelectedAnswer,
    globallySelectedAnswer,
    hasSubmittedAnswers
  } = _ref3;
  // use local state to avoid re-renders of AnswersGroup from updates due to: updateSelectedAnswer & selectedAnswer
  var [selectedAnswer, setSelectedAnswers] = useState();
  useEffect(() => {
    if (selectedAnswer && selectedAnswer !== globallySelectedAnswer) {
      updateSelectedAnswer(selectedAnswer);
    }
  }, [updateSelectedAnswer, selectedAnswer]); // in order to reset selection

  useEffect(() => {
    if (!globallySelectedAnswer) setSelectedAnswers(undefined);
  }, [globallySelectedAnswer, setSelectedAnswers]);
  return jsxs("fieldset", {
    css: answersWrapperStyle,
    children: [jsx("div", {
      children: jsxs("legend", {
        css: css(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteral(["\n                        margin-bottom: 12px;\n                    "]))),
        children: [jsx("span", {
          css: css(_templateObject4$6 || (_templateObject4$6 = _taggedTemplateLiteral(["\n                            padding-right: 12px;\n                        "]))),
          children: questionNumber + '.'
        }), text]
      })
    }), imageUrl && jsx("img", {
      css: css(_templateObject5$5 || (_templateObject5$5 = _taggedTemplateLiteral(["\n                        width: 100%;\n                    "]))),
      src: imageUrl
    }), jsx(AnswersGroup, {
      hasSubmittedAnswers: hasSubmittedAnswers,
      questionId: questionId,
      answers: answers,
      selectedAnswer: selectedAnswer,
      setSelectedAnswers: setSelectedAnswers
    })]
  });
};

var AnswersGroup = /*#__PURE__*/memo((_ref4) => {
  var {
    hasSubmittedAnswers,
    questionId,
    answers,
    selectedAnswer,
    setSelectedAnswers
  } = _ref4;
  return jsx("div", {
    css: [radioButtonWrapperStyles, css(_templateObject6$5 || (_templateObject6$5 = _taggedTemplateLiteral(["\n                    label {\n                        :hover {\n                            background-color: ", ";\n                        }\n                        /* TODO: apply same styles on focus (requires source update) */\n                    }\n                "])), hasSubmittedAnswers ? neutral[97] : neutral[86])],
    children: jsx(RadioGroup, {
      name: questionId,
      children: answers.map(answer => jsx(Radio, {
        value: answer.text,
        label: answer.text,
        "data-testid": answer.id,
        "data-answer-type": selectedAnswer === answer.id ? 'selected-enabled-answer' : 'unselected-enabled-answer',
        disabled: hasSubmittedAnswers,
        onChange: () => setSelectedAnswers(answer.id),
        checked: selectedAnswer === answer.id
      }, answer.id))
    })
  });
});
AnswersGroup.displayName = 'AnswersGroup';
var missingAnswersStyles = css(_templateObject7$3 || (_templateObject7$3 = _taggedTemplateLiteral(["\n    ", "\n    padding-bottom: ", "px;\n    color: ", ";\n"])), textSans.medium({
  fontWeight: 'bold'
}), space[3], text.error);
var MissingAnswers = () => jsx("div", {
  css: missingAnswersStyles,
  children: "You have not answered all the questions."
});
var resultWrapperStyles = css(_templateObject8$2 || (_templateObject8$2 = _taggedTemplateLiteral(["\n    background-color: ", ";\n    margin-top: ", "px;\n    margin-bottom: ", "px;\n    padding: ", "px;\n"])), neutral[93], space[3], space[3], space[2]);
var resultHeaderStyles = css(_templateObject9$2 || (_templateObject9$2 = _taggedTemplateLiteral(["\n    ", "\n    color: ", ";\n    padding-bottom: ", "px;\n"])), textSans.medium({
  fontWeight: 'bold'
}), neutral[20], space[1]);
var resultDescriptionStyles = css(_templateObject10$2 || (_templateObject10$2 = _taggedTemplateLiteral(["\n    ", "\n    color: ", ";\n"])), textSans.medium(), neutral[46]);
var Result = (_ref5) => {
  var {
    resultBuckets,
    sharingIcons
  } = _ref5;
  return jsxs("div", {
    css: resultWrapperStyles,
    children: [jsx("div", {
      css: resultHeaderStyles,
      children: resultBuckets.title
    }), jsx("div", {
      css: resultDescriptionStyles,
      children: resultBuckets.description
    }), sharingIcons && jsxs(Fragment$2, {
      children: [jsx("hr", {}), jsx("div", {
        css: resultHeaderStyles,
        children: "Challenge your friends"
      }), sharingIcons]
    })]
  });
};

var _templateObject$d, _templateObject2$a, _templateObject3$8, _templateObject4$7, _templateObject5$6, _templateObject6$6, _templateObject7$4, _templateObject8$3, _templateObject9$3;
var fieldsetStyle = css(_templateObject$d || (_templateObject$d = _taggedTemplateLiteral(["\n    margin-bottom: 12px;\n    border: 0px;\n    padding: 0px;\n"])));
var KnowledgeQuizAtom = (_ref) => {
  var {
    id,
    questions,
    resultGroups
  } = _ref;
  var [quizSelection, setQuizSelection] = useState({});
  var haveAllQuestionsBeenAnswered = Object.keys(quizSelection).length === questions.length;
  return jsxs("form", {
    "data-atom-id": id,
    "data-atom-type": "knowledgequiz",
    children: [haveAllQuestionsBeenAnswered && jsx("div", {
      "data-testid": "quiz-results-block-top",
      children: jsx(Result$1, {
        quizSelection: quizSelection,
        resultGroups: resultGroups
      })
    }), questions.map((question, idx) => jsx(Question, {
      id: question.id,
      number: idx + 1,
      text: question.text,
      imageUrl: question.imageUrl,
      answers: question.answers,
      quizSelection: quizSelection,
      setQuizSelection: setQuizSelection
    }, question.id)), haveAllQuestionsBeenAnswered && jsx("div", {
      "data-testid": "quiz-results-block-top",
      children: jsx(Result$1, {
        quizSelection: quizSelection,
        resultGroups: resultGroups
      })
    })]
  });
};
var Question = (_ref2) => {
  var {
    id,
    text,
    imageUrl,
    answers,
    number,
    quizSelection,
    setQuizSelection
  } = _ref2;
  var [selectedAnswerId, setSelectedAnswerId] = useState();
  var [hasSubmitted, setHasSubmitted] = useState(false);
  useEffect(() => {
    if (selectedAnswerId && hasSubmitted) {
      var selectedAnswer = answers.find(answer => answer.id === selectedAnswerId);
      selectedAnswer && setQuizSelection(_objectSpread2(_objectSpread2({}, quizSelection), {}, {
        [id]: selectedAnswer
      }));
    }
  }, [selectedAnswerId, setQuizSelection, hasSubmitted, answers]);
  return jsx("div", {
    css: css(_templateObject2$a || (_templateObject2$a = _taggedTemplateLiteral(["\n                ", ";\n            "])), body.medium()),
    children: jsxs("fieldset", {
      css: fieldsetStyle,
      children: [jsx("div", {
        children: jsxs("legend", {
          css: css(_templateObject3$8 || (_templateObject3$8 = _taggedTemplateLiteral(["\n                            margin-bottom: 12px;\n                        "]))),
          children: [jsx("span", {
            css: css(_templateObject4$7 || (_templateObject4$7 = _taggedTemplateLiteral(["\n                                padding-right: 12px;\n                            "]))),
            children: "".concat(number, ".")
          }), text]
        })
      }), imageUrl && jsx("img", {
        css: css(_templateObject5$6 || (_templateObject5$6 = _taggedTemplateLiteral(["\n                            width: 100%;\n                        "]))),
        src: imageUrl
      }), jsx(Answers, {
        id: id,
        answers: answers,
        hasSubmitted: hasSubmitted,
        selectedAnswerId: selectedAnswerId,
        setSelectedAnswerId: setSelectedAnswerId
      }), jsx("div", {
        css: css(_templateObject6$6 || (_templateObject6$6 = _taggedTemplateLiteral(["\n                        display: flex;\n                        flex-direction: row;\n                        margin-bottom: 8px;\n                        button {\n                            margin-right: 10px;\n                        }\n                    "]))),
        children: jsx(Button, {
          size: "small",
          "data-testid": "submit-question-".concat(id),
          onClick: () => {
            setHasSubmitted(true);
          },
          onKeyDown: e => {
            var spaceKey = 32;
            var enterKey = 13;

            if (e.keyCode === spaceKey || e.keyCode === enterKey) {
              setHasSubmitted(true);
            }
          },
          children: "Reveal"
        })
      })]
    })
  });
};

var Answers = (_ref3) => {
  var {
    answers,
    id: questionId,
    hasSubmitted,
    selectedAnswerId,
    setSelectedAnswerId
  } = _ref3;

  if (hasSubmitted) {
    return jsx(Fragment$1, {
      children: answers.map(answer => {
        var isSelected = selectedAnswerId === answer.id;

        if (isSelected) {
          if (answer.isCorrect) {
            return jsx(CorrectSelectedAnswer, {
              id: answer.id,
              answerText: answer.text,
              explainerText: answer.revealText || ''
            }, answer.id);
          }

          if (!answer.isCorrect) {
            return jsx(IncorrectAnswer, {
              id: answer.id,
              answerText: answer.text
            }, answer.id);
          }
        }

        if (answer.isCorrect) {
          return jsx(NonSelectedCorrectAnswer, {
            id: answer.id,
            answerText: answer.text,
            explainerText: answer.revealText || ''
          }, answer.id);
        }

        return jsx(UnselectedAnswer, {
          id: answer.id,
          answerText: answer.text
        }, answer.id);
      })
    });
  }

  return jsx("div", {
    css: radioButtonWrapperStyles,
    children: jsx(RadioGroup, {
      name: questionId,
      children: answers.map(answer => jsx(Radio, {
        value: answer.text,
        "data-testid": answer.id,
        "data-answer-type": selectedAnswerId === answer.id ? 'selected-enabled-answer' : 'unselected-enabled-answer',
        name: questionId,
        label: answer.text,
        onChange: () => setSelectedAnswerId(answer.id),
        checked: selectedAnswerId === answer.id
      }, answer.id))
    })
  });
};

var resultWrapperStyles$1 = css(_templateObject7$4 || (_templateObject7$4 = _taggedTemplateLiteral(["\n    background-color: ", ";\n    margin-top: ", "px;\n    margin-bottom: ", "px;\n    padding: ", "px;\n"])), neutral[93], space[3], space[3], space[2]);
var resultDescriptionStyles$1 = css(_templateObject8$3 || (_templateObject8$3 = _taggedTemplateLiteral(["\n    ", "\n    color: ", ";\n    display: flex;\n    flex-direction: column;\n"])), textSans.medium(), neutral[46]);
var resultsNumberStyles = css(_templateObject9$3 || (_templateObject9$3 = _taggedTemplateLiteral(["\n    ", "\n    color: ", ";\n"])), textSans.xxxlarge({
  fontWeight: 'bold'
}), brand[400]);
var Result$1 = (_ref4) => {
  var {
    quizSelection,
    resultGroups
  } = _ref4;
  var totalNumberOfQuestions = Object.keys(quizSelection).length;
  var numberOfCorrectAnswers = Object.keys(quizSelection).filter(questionId => quizSelection[questionId].isCorrect).length;
  var bestResultGroup;
  resultGroups.forEach(resultGroup => {
    if (!bestResultGroup) bestResultGroup = resultGroup; // In the case we have the exact numberOfCorrectAnswers

    if (resultGroup.minScore === numberOfCorrectAnswers) bestResultGroup = resultGroup;
    if (bestResultGroup.minScore === numberOfCorrectAnswers) return; // do nothing
    // if `cur` has a closer score than `acc`

    if (bestResultGroup.minScore < resultGroup.minScore && resultGroup.minScore < numberOfCorrectAnswers) return resultGroup;
  });
  return jsx("div", {
    css: resultWrapperStyles$1,
    children: jsxs("p", {
      css: resultDescriptionStyles$1,
      children: [jsx("span", {
        children: "You got..."
      }), jsx("span", {
        css: resultsNumberStyles,
        children: "".concat(numberOfCorrectAnswers, "/").concat(totalNumberOfQuestions)
      }), bestResultGroup && jsx("span", {
        children: bestResultGroup.title
      })]
    })
  });
};

var _templateObject$e, _templateObject2$b, _templateObject3$9, _templateObject4$8, _templateObject5$7;
var Snippet = css(_templateObject$e || (_templateObject$e = _taggedTemplateLiteral(["\n    :not(:last-child) {\n        border-left: 0.0625rem solid ", ";\n        padding-bottom: ", ";\n    }\n    padding-left: ", "px;\n    margin-left: ", "px;\n"])), neutral$2[60], remSpace[4], space[4], space[2]);
var EventTitle = css(_templateObject2$b || (_templateObject2$b = _taggedTemplateLiteral(["\n    ", ";\n"])), body.medium({
  lineHeight: 'tight',
  fontWeight: 'bold'
}));
var EventDateBullet = css(_templateObject3$9 || (_templateObject3$9 = _taggedTemplateLiteral(["\n    content: '';\n    width: ", "px;\n    height: ", "px;\n    border-radius: 100%;\n    float: left;\n    position: relative;\n    left: -24px;\n    background-color: #121212;\n"])), space[4], space[4]);
var EventDate = css(_templateObject4$8 || (_templateObject4$8 = _taggedTemplateLiteral(["\n    ::before {\n        ", "\n    }\n    margin-left: -16px;\n    background: ", ";\n    ", ";\n"])), EventDateBullet, brandAlt[400], body.medium({
  lineHeight: 'tight',
  fontWeight: 'bold'
}));
var EventToDate = css(_templateObject5$7 || (_templateObject5$7 = _taggedTemplateLiteral(["\n    background: ", ";\n    ", ";\n"])), brandAlt[400], body.medium({
  lineHeight: 'tight',
  fontWeight: 'bold'
}));

var TimelineContents = (_ref) => {
  var {
    events,
    pillar
  } = _ref;
  return jsx("div", {
    children: events.map((event, index) => {
      var time = new Date(event.unixDate).toISOString();
      var toTime = event.toUnixDate ? new Date(event.toUnixDate).toISOString() : '';
      return jsxs("div", {
        "data-type": "event-snippet",
        css: Snippet,
        children: [jsxs("div", {
          children: [jsx("time", {
            dateTime: time,
            css: EventDate,
            children: event.date
          }), event.toDate && jsxs("span", {
            children: [' ', "-", ' ', jsx("time", {
              dateTime: toTime,
              css: EventToDate,
              children: event.toDate
            })]
          })]
        }), event.title && jsx("div", {
          css: EventTitle,
          children: event.title
        }), event.body && jsx(Body$1, {
          html: event.body,
          pillar: pillar
        })]
      }, index);
    })
  });
};

var TimelineAtom = (_ref2) => {
  var {
    id,
    events,
    description,
    title,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback
  } = _ref2;
  return jsxs(Container$1, {
    atomType: "timeline",
    atomTypeTitle: "Timeline",
    id: id,
    pillar: pillar,
    expandForStorybook: expandForStorybook,
    title: title,
    expandCallback: expandCallback,
    children: [description && jsx(Body$1, {
      html: description,
      pillar: pillar
    }), events && jsx(TimelineContents, {
      events: events,
      pillar: pillar
    }), jsx(Footer, {
      pillar: pillar,
      dislikeHandler: dislikeHandler,
      likeHandler: likeHandler
    })]
  });
};

var VideoAtom = (_ref) => {
  var {
    assets,
    poster,
    height = 259,
    width = 460
  } = _ref;
  if (assets.length === 0) return null; // Handle empty assets array

  return jsx(MaintainAspectRatio, {
    height: height,
    width: width,
    children: jsxs("video", {
      controls: true,
      preload: "metadata",
      width: width,
      height: height,
      poster: poster,
      children: [assets.map((asset, index) => jsx("source", {
        src: asset.url,
        type: asset.mimeType
      }, index)), jsxs("p", {
        children: ["Your browser doesn't support HTML5 video. Here is a ", jsx("a", {
          href: assets[0].url,
          children: "link to the video"
        }), " instead."]
      })]
    })
  });
};

export { AudioAtom, ChartAtom, ExplainerAtom, GuideAtom, InteractiveAtom, KnowledgeQuizAtom, PersonalityQuizAtom, ProfileAtom, QandaAtom, TimelineAtom, VideoAtom, YoutubeAtom };
