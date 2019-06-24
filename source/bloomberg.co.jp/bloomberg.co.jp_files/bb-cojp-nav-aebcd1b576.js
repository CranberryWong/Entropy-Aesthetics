(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.core.js","../../modules/es6.object.assign":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/es6.object.assign.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.a-function.js":[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.core.js":[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.a-function.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.export.js":[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.core.js","./$.ctx":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.ctx.js","./$.global":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.global.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.fails.js":[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.cof.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.js":[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.object-assign.js":[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.js","./$.fails":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.fails.js","./$.iobject":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.iobject.js","./$.to-object":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.to-object.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.defined.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.export.js","./$.object-assign":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/modules/$.object-assign.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/lodash.assign/index.js":[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/RegUIClient.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash.assign");

var _lodash2 = _interopRequireDefault(_lodash);

var _dispatchEvent = require("./utils/dispatchEvent");

var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

var _UrlBuilder = require("./utils/UrlBuilder");

var _UrlBuilder2 = _interopRequireDefault(_UrlBuilder);

var _UserInfo = require("./UserInfo");

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SIGNED_IN_ATTR_NAME = "data-signed-in";
var POPUP_STATUS_ATTR_NAME = "data-status";
var BODY_POPUP_STATUS_ATTR_NAME = "data-reg-ui-client-status";
var POPUP_CONTAINER_ID = "reg-ui-client";
var POPUP_CONTAINER_CLASS = POPUP_CONTAINER_ID;
var POPUP_IFRAME_CONTAINER_CLASS = "reg-ui-client__iframe-container";
var POPUP_IFRAME_ID = "reg-ui-client__iframe";
var POPUP_IFRAME_CLASS = POPUP_IFRAME_ID;
var CLOSE_BUTTON_ID = "reg-ui-client__close";
var CLOSE_BUTTON_CLASS = CLOSE_BUTTON_ID;
var ESC_KEY_CODE = 27;
var REGEXP_IOS = /iPad|iPhone|iPod/;
var HIDE_CLOSE_BUTTON_CLASS = "hide-close-button";

/**
 * @param [textElement]
 * @param options
 * @constructor
 */

var RegUIClient = function () {

    /**
     * @constructor
     * @param {NodeList|Element|Array} textElements
     * @param options
     */
    function RegUIClient(textElements) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, RegUIClient);

        this._textElements = [];

        var dismissible = options.dismissible,
            displayWhenUnauthenticated = options.displayWhenUnauthenticated,
            _options$environment = options.environment,
            environment = _options$environment === undefined ? "development" : _options$environment,
            queryParams = options.queryParams;

        var urls = _constants.URLS_MAP[environment] || _constants.URLS_MAP.production;

        this._dismissible = !(dismissible === false || dismissible === "false");
        this._displayWhenUnauthenticated = Boolean(displayWhenUnauthenticated);
        this._queryParams = queryParams;

        this._urls = new _UrlBuilder2.default(urls);
        this._userInfo = new _UserInfo2.default(this._urls.getUserInfoUrl());
        this._openedWindowReference = null;

        this._userClickEventHandler = this._userClickEventHandler.bind(this);
        this._windowMessageListener = this._windowMessageListener.bind(this);
        this._closeOnEscEventHandler = this._closeOnEscEventHandler.bind(this);

        this.addTextElements(textElements);
    }

    _createClass(RegUIClient, [{
        key: "initialize",
        value: function initialize() {
            var _this = this;

            if (!this._textElements.length) {
                return;
            }

            this._bindCloseEventHandler();
            this._setupMessageListener();
            this.verifySignInStatus(function () {
                _this._updateLinks();
            }, function () {
                if (_this._displayWhenUnauthenticated) {
                    _this.linkToSignIn();
                }
            });

            return this;
        }

        /**
         * Initiates user verification process which emits registration status events
         * @param {Function} [signedInCb]
         * @param {Function} [notSignedInCb]
         */

    }, {
        key: "verifySignInStatus",
        value: function verifySignInStatus(signedInCb, notSignedInCb) {
            var _this2 = this;

            this._userInfo.fetchUserInfo(function (error, sessionDetails) {
                setRegUserInfo(sessionDetails);
                (0, _dispatchEvent2.default)(window, "reg-user-info-ready", sessionDetails);

                if (sessionDetails.userId) {
                    dispatchSignedInEvent(sessionDetails.userId);

                    if (typeof signedInCb === "function") {
                        signedInCb.call(_this2, sessionDetails.userId);
                    }
                    return;
                }

                (0, _dispatchEvent2.default)(window, "reg-user-not-signed-in");

                if (typeof notSignedInCb === "function") {
                    notSignedInCb.call(_this2);
                }
            });

            return this;
        }
    }, {
        key: "cleanup",
        value: function cleanup() {
            var _this3 = this;

            if (this._windowMessageListener) {
                window.removeEventListener("message", this._windowMessageListener);
                this._windowMessageListener = null;
            }

            if (this._userClickEventHandler) {
                this._textElements.forEach(function (textElement) {
                    textElement.removeEventListener("click", _this3._userClickEventHandler);
                });
                this._textElements.length = 0;
                this._userClickEventHandler = null;
            }

            var closeEl = document.getElementById(CLOSE_BUTTON_ID);
            if (closeEl) {
                closeEl.removeEventListener("click", this._hidePopup);
            }

            var popupEl = document.getElementById(POPUP_CONTAINER_ID);
            if (popupEl) {
                popupEl.removeEventListener("click", this._hidePopup);
                document.body.removeChild(popupEl);
            }

            if (this._closeOnEscEventHandler) {
                document.removeEventListener("keyup", this._closeOnEscEventHandler);
                this._closeOnEscEventHandler = null;
            }

            if (this._userInfoEventHandler) {
                window.removeEventListener("reg-user-info-ready", this._userInfoEventHandler);
                this._userInfoEventHandler = null;
            }

            if (this._openedWindowReference) {
                this._openedWindowReference = null;
            }

            closeEl = popupEl = null;
        }

        /**
         * Opens Bloomberg sign-in page
         * @param {Object} queryParams
         * @param {Object} [opt]
         */

    }, {
        key: "linkToSignIn",
        value: function linkToSignIn() {
            var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._queryParams;
            var opt = arguments[1];

            this._createPopup(this._urls.getLoginUrl(queryParams, RegUIClient.isIOS()), (0, _lodash2.default)({ hideCloseButton: true }, opt));
        }

        /**
         * Opens Bloomberg registration page
         * @param {Object} queryParams
         * @param {Object} [opt]
         */

    }, {
        key: "linkToRegister",
        value: function linkToRegister() {
            var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._queryParams;
            var opt = arguments[1];

            this._createPopup(this._urls.getRegisterUrl(queryParams, RegUIClient.isIOS()), (0, _lodash2.default)({ hideCloseButton: true }, opt));
        }

        /**
         * Opens Terminal registration page
         * @param {Object} queryParams
         * @param {Object} [opt]
         */

    }, {
        key: "linkToTerminalRegister",
        value: function linkToTerminalRegister() {
            var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._queryParams;
            var opt = arguments[1];

            this._createPopup(this._urls.getTerminalRegisterUrl(queryParams, RegUIClient.isIOS()), (0, _lodash2.default)({ hideCloseButton: true }, opt));
        }

        /**
         * Opens Businessweek registration page
         * @param {Object} queryParams
         * @param {Object} [opt]
         */

    }, {
        key: "linkToBwRegister",
        value: function linkToBwRegister() {
            var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._queryParams;
            var opt = arguments[1];

            this._createPopup(this._urls.getBwRegisterUrl(queryParams, RegUIClient.isIOS()), (0, _lodash2.default)({ hideCloseButton: true }, opt));
        }

        /**
         * Opens BSSO Login page
         * @param {Object} queryParams
         * @param {Object} [opt]
         */

    }, {
        key: "linkToBSSO",
        value: function linkToBSSO() {
            var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._queryParams;
            var opt = arguments[1];

            var options = (0, _lodash2.default)({
                newWindow: true,
                width: 400,
                height: 525,
                location: "no",
                windowName: "terminal"
            }, opt);

            this._createPopup(this._urls.getBssoUrl(queryParams, RegUIClient.isIOS()), options);
        }

        /**
         * Calls a callback whenever user info becomes available
         * @param {Function} callback
         */

    }, {
        key: "onUserInfoReady",
        value: function onUserInfoReady(callback) {
            if (window._regUserInfo) {
                callback(window._regUserInfo);
                return;
            }

            this._userInfoEventHandler = this._userInfoEventHandler || this._bindUserInfoEvent(callback);
            window.addEventListener("reg-user-info-ready", this._userInfoEventHandler);
        }

        /**
         * @param {NodeList|Element|Array} textElements
         * @returns {RegUIClient}
         */

    }, {
        key: "addTextElements",
        value: function addTextElements(textElements) {
            var _this4 = this;

            var textElementsArray = elementIsAnArrayOrNodeList(textElements) ? Array.prototype.slice.call(textElements) : [];

            if (textElements instanceof window.Element) {
                textElementsArray = [textElements];
            }

            this._textElements = this._textElements.concat(textElementsArray);

            this._textElements.forEach(function (textElement) {
                textElement.removeEventListener("click", _this4._userClickEventHandler);
                textElement.addEventListener("click", _this4._userClickEventHandler);
            });

            if (window._regUserId) {
                this._updateLinks();
            }

            return this;
        }
    }, {
        key: "_bindCloseEventHandler",
        value: function _bindCloseEventHandler() {
            if (!this._dismissible) {
                return;
            }

            document.addEventListener("keyup", this._closeOnEscEventHandler);
        }
    }, {
        key: "_bindUserInfoEvent",
        value: function _bindUserInfoEvent(callback) {
            return function (event) {
                callback(event.detail);
            };
        }
    }, {
        key: "_setupMessageListener",
        value: function _setupMessageListener() {
            window.addEventListener("message", this._windowMessageListener);
        }

        /**
         * @param {String} url
         * @param {Object} opt
         * @private
         */

    }, {
        key: "_createPopup",
        value: function _createPopup(url) {
            var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (RegUIClient.isIOS()) {
                window.open(url, "_self");
                return;
            }

            if (opt.newWindow) {
                if (this._openedWindowReference == null || this._openedWindowReference.closed) {
                    var newWindowSettings = "width=" + opt.width + ",height=" + opt.height + ",location=" + opt.location;
                    this._openedWindowReference = window.open(url, opt.windowName || "sign_in", newWindowSettings);
                    return;
                }

                this._openedWindowReference.focus();
                return;
            }

            var _opt$hideCloseButton = opt.hideCloseButton,
                hideCloseButton = _opt$hideCloseButton === undefined ? false : _opt$hideCloseButton;


            var existingPopupEl = document.getElementById(POPUP_CONTAINER_ID);
            var existingIframeEl = document.getElementById(POPUP_IFRAME_ID);

            document.body.setAttribute(BODY_POPUP_STATUS_ATTR_NAME, "show");

            (0, _dispatchEvent2.default)(window, "reg-ui-show-pop-up");

            if (existingPopupEl) {
                toggleClass(existingPopupEl, HIDE_CLOSE_BUTTON_CLASS, hideCloseButton);
                this._showPopupAfterIframeHeightRefresh();
                existingIframeEl.setAttribute("src", url);
                return;
            }

            var popupEl = this._generatePopupContent(url);
            document.body.appendChild(popupEl);
            toggleClass(popupEl, HIDE_CLOSE_BUTTON_CLASS, hideCloseButton);

            this._showPopupAfterIframeHeightRefresh();

            if (this._dismissible) {
                var closeButtonEl = document.getElementById(CLOSE_BUTTON_ID);

                popupEl.addEventListener("click", this._hidePopup);
                closeButtonEl.addEventListener("click", this._hidePopup);
            }
        }

        /**
         * @param {String} url
         * @returns {HTMLDivElement}
         * @private
         */

    }, {
        key: "_generatePopupContent",
        value: function _generatePopupContent(url) {
            var closeButton = "<div class=\"" + CLOSE_BUTTON_CLASS + "\" id=\"" + CLOSE_BUTTON_ID + "\">Close</div>";

            var htmlContent = "<div class=\"" + POPUP_IFRAME_CONTAINER_CLASS + "\">" + (this._dismissible ? closeButton : "") + "\n            <iframe id=\"" + POPUP_IFRAME_ID + "\" class=\"" + POPUP_IFRAME_CLASS + "\" src=\"" + url + "\" frameborder=\"0\"></iframe></div>";

            var popupEl = document.createElement("div");
            popupEl.setAttribute("class", POPUP_CONTAINER_CLASS);
            popupEl.setAttribute("id", POPUP_CONTAINER_ID);
            popupEl.innerHTML = htmlContent;

            return popupEl;
        }

        /**
         * Hides a pop-up
         * @param {Event} [event]
         * @private
         */

    }, {
        key: "_hidePopup",
        value: function _hidePopup(event) {
            if (event) {
                event.stopPropagation();
            }

            document.body.removeAttribute(BODY_POPUP_STATUS_ATTR_NAME);
            var existingPopupEl = document.getElementById(POPUP_CONTAINER_ID);

            (0, _dispatchEvent2.default)(window, "reg-ui-close-pop-up");

            if (existingPopupEl) {
                existingPopupEl.removeAttribute(POPUP_STATUS_ATTR_NAME);
            }
        }
    }, {
        key: "_updateLinks",
        value: function _updateLinks() {
            this._textElements.forEach(function (textElement) {
                textElement.setAttribute(SIGNED_IN_ATTR_NAME, "true");
                textElement.textContent = "Settings";
            });
        }
    }, {
        key: "_userClickEventHandler",
        value: function _userClickEventHandler(event) {
            event.preventDefault();
            var signedInAlready = event.target.getAttribute(SIGNED_IN_ATTR_NAME) === "true";

            if (!signedInAlready) {
                return this.linkToSignIn();
            }

            RegUIClient.goToUrl(this._urls.getSettingsUrl());
        }
    }, {
        key: "_showPopupAfterIframeHeightRefresh",
        value: function _showPopupAfterIframeHeightRefresh() {
            var popupEl = document.getElementById(POPUP_CONTAINER_ID);
            var iframeEl = document.getElementById(POPUP_IFRAME_ID);

            if (!popupEl || !iframeEl) {
                return;
            }

            iframeEl.addEventListener("load", function () {
                iframeEl.style.height = iframeEl.scrollHeight;

                popupEl.setAttribute(POPUP_STATUS_ATTR_NAME, "show");
            });
        }
    }, {
        key: "_windowMessageListener",
        value: function _windowMessageListener(event) {
            var origin = event.origin || event.originalEvent.origin;
            if (!RegUIClient.isWhiteListedDomain(origin)) {
                return;
            }

            var message = event.data;
            switch (message.type) {
                case "REG-HIDE-POPUP":
                    this._hidePopup();
                    break;
                case "REG-USER-SIGNED-IN":
                    this._updateLinks();
                    setRegUserInfo({ userId: message.userId });
                    dispatchSignedInEvent(message.userId);
                    break;
                case "REG-USER-HIDE-POPUP":
                    if (this._dismissible) {
                        this._hidePopup();
                    }
                    break;
            }
        }
    }, {
        key: "_closeOnEscEventHandler",
        value: function _closeOnEscEventHandler(event) {
            var isEscapeKey = event.key === "Escape" || (event.keyCode || event.which) === ESC_KEY_CODE;
            if (isEscapeKey) {
                this._hidePopup();
            }
        }

        /**
         * @static
         * @param {String} domain
         * @returns {boolean}
         */

    }], [{
        key: "isWhiteListedDomain",
        value: function isWhiteListedDomain(domain) {
            return domain.indexOf(".bloomberg.com") >= 0;
        }

        /**
         * IOS device detection
         * @static
         * @returns {boolean}
         */

    }, {
        key: "isIOS",
        value: function isIOS() {
            return !!navigator.platform && REGEXP_IOS.test(navigator.platform);
        }

        /**
         * @static
         * @param {String} url
         */

    }, {
        key: "goToUrl",
        value: function goToUrl(url) {
            window.location.href = url;
        }
    }]);

    return RegUIClient;
}();

/**
 * @param {Element} el
 * @param {String} className
 * @param {Boolean} force
 */


function toggleClass(el, className, force) {
    if (el.classList.toggle.length !== 0) {
        el.classList.toggle(className, force);
        return;
    }

    var method = force ? "add" : "remove";
    el.classList[method](className);
}

/**
 * @param {String} userId
 */
function dispatchSignedInEvent(userId) {
    if (!userId || window._regUserId === userId) {
        return;
    }

    (0, _dispatchEvent2.default)(window, "reg-user-signed-in", {
        userId: userId
    });

    window._regUserId = userId;
}

function elementIsAnArrayOrNodeList(elements) {
    return elements && elements.length && elements.length >= 0;
}

function setRegUserInfo() {
    var sessionDetails = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var existingDetails = window._regUserInfo || {};

    window._regUserInfo = {
        agentId: existingDetails.agentId || sessionDetails.agentId,
        sessionId: existingDetails.sessionId || sessionDetails.sessionId,
        sessionKey: existingDetails.sessionKey || sessionDetails.sessionKey,
        userId: existingDetails.userId || sessionDetails.userId
    };
}

exports.default = RegUIClient;
module.exports = exports["default"];
},{"./UserInfo":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/UserInfo.js","./constants":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/constants.js","./utils/UrlBuilder":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/UrlBuilder.js","./utils/dispatchEvent":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/dispatchEvent.js","lodash.assign":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/lodash.assign/index.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/UserInfo.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonp2 = require("../vendor/jsonp");

var _jsonp3 = _interopRequireDefault(_jsonp2);

var _getCookieValue = require("./utils/getCookieValue");

var _getCookieValue2 = _interopRequireDefault(_getCookieValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TIMEOUT = 5000;
var BBGCOM_SITE_REGEX = /bloomberg\.com$/i;
var BREG_USER_ID_COOKIE_NAME = "_breg-uid";
var SUBSCRIPTION_REFRESH_COOKIE_NAME = "_last-refresh";
var SESSION_ID = "session_id";
var SESSION_KEY = "session_key";
var AGENT_ID = "agent_id";

/**
 * @class UserInfo
 */

var UserInfo = function () {

    /**
     * @constructor
     * @param {String} userInfoUrl
     */
    function UserInfo(userInfoUrl) {
        _classCallCheck(this, UserInfo);

        this._userInfoUrl = userInfoUrl;
    }

    /**
     * @param {Function} callback
     * @returns {*}
     */


    _createClass(UserInfo, [{
        key: "fetchUserInfo",
        value: function fetchUserInfo(callback) {
            if (UserInfo.isOnBbgComSite()) {
                return this._fetchUserInfoForSameSite(callback);
            }

            return this._fetchUserInfoForDifferentSite(callback);
        }

        /**
         * @param {Function} callback
         * @private
         */

    }, {
        key: "_fetchUserInfoForSameSite",
        value: function _fetchUserInfoForSameSite(callback) {
            var userId = (0, _getCookieValue2.default)(BREG_USER_ID_COOKIE_NAME);
            var agentId = (0, _getCookieValue2.default)(AGENT_ID);
            var isRecentlyRefreshed = !!(0, _getCookieValue2.default)(SUBSCRIPTION_REFRESH_COOKIE_NAME);
            var isUserInfoSet = !!agentId;

            if (!isRecentlyRefreshed || !isUserInfoSet) {
                UserInfo.jsonp(this._userInfoUrl, { timeout: TIMEOUT }, function (error, data) {
                    if (error) {
                        return callback(error, false);
                    }

                    callback(error, data);
                });

                return;
            }

            var eventDetails = {
                agentId: agentId,
                sessionId: (0, _getCookieValue2.default)(SESSION_ID),
                sessionKey: (0, _getCookieValue2.default)(SESSION_KEY),
                userId: userId
            };

            callback(null, eventDetails);
        }

        /**
         * @param {Function} callback
         * @private
         */

    }, {
        key: "_fetchUserInfoForDifferentSite",
        value: function _fetchUserInfoForDifferentSite(callback) {
            UserInfo.jsonp(this._userInfoUrl, { timeout: TIMEOUT }, function (error, data) {
                if (error) {
                    return callback(error, false);
                }

                callback(error, data || {});
            });
        }

        /**
         * @static
         * @returns {boolean}
         */

    }], [{
        key: "isOnBbgComSite",
        value: function isOnBbgComSite() {
            return BBGCOM_SITE_REGEX.test(window.location.hostname);
        }

        /**
         * @static
         * @param {String} url
         * @param {Object} options
         * @param {Function} callback
         * @returns {*}
         */

    }, {
        key: "jsonp",
        value: function jsonp(url, options, callback) {
            return (0, _jsonp3.default)(url, options, callback);
        }
    }]);

    return UserInfo;
}();

exports.default = UserInfo;
module.exports = exports["default"];
},{"../vendor/jsonp":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/vendor/jsonp.js","./utils/getCookieValue":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/getCookieValue.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/constants.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var URLS_MAP = {
    development: {
        baseUrl: "http://local.bloomberg.com:4004/",
        loginUrl: "iframe/login",
        registerUrl: "iframe/register",
        terminalRegisterUrl: "iframe/terminal-register",
        bwRegisterUrl: "iframe/magazine",
        settingsUrl: "account",
        userInfoUrl: "user-info",
        bssoUrl: "api/login/bloomberg-auth-redirect"
    },
    staging: {
        baseUrl: "https://staging-login.bloomberg.com/",
        loginUrl: "iframe/login",
        registerUrl: "iframe/register",
        terminalRegisterUrl: "iframe/terminal-register",
        bwRegisterUrl: "iframe/magazine",
        settingsUrl: "account",
        userInfoUrl: "user-info",
        bssoUrl: "api/login/bloomberg-auth-redirect"
    },
    sandcastle: {
        baseUrl: "https://sandcastle.bloomberg.com/reg2/",
        loginUrl: "iframe/login",
        registerUrl: "iframe/register",
        terminalRegisterUrl: "iframe/terminal-register",
        bwRegisterUrl: "iframe/magazine",
        settingsUrl: "account",
        userInfoUrl: "user-info",
        bssoUrl: "api/login/bloomberg-auth-redirect"
    },
    production: {
        baseUrl: "https://login.bloomberg.com/",
        loginUrl: "iframe/login",
        registerUrl: "iframe/register",
        terminalRegisterUrl: "iframe/terminal-register",
        bwRegisterUrl: "iframe/magazine",
        settingsUrl: "account",
        userInfoUrl: "user-info",
        bssoUrl: "api/login/bloomberg-auth-redirect"
    }
};

exports.default = {
    URLS_MAP: URLS_MAP
};
module.exports = exports["default"];
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/UrlBuilder.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REGEXP_STRIP_SLASHES = /([^:]\/)\/+/g;

var UrlBuilder = function () {
    /**
     * @constructor
     * @param {Object} config Map of urls
     */
    function UrlBuilder(config) {
        _classCallCheck(this, UrlBuilder);

        var baseUrl = config.baseUrl;

        this._baseUrl = baseUrl;
        this._config = config;
    }

    /**
     * @param {String} path
     * @param {Object} queryParams
     * @param {Boolean} isIOS
     */


    _createClass(UrlBuilder, [{
        key: "_constructPath",
        value: function _constructPath(path, queryParams) {
            var isIOS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var normalizedPath = isIOS ? path.replace("iframe", "") : path;
            var url = ("" + this._baseUrl + normalizedPath).replace(REGEXP_STRIP_SLASHES, "$1");
            return UrlBuilder.appendQueryParams(url, queryParams);
        }
    }, {
        key: "getLoginUrl",
        value: function getLoginUrl(queryParams, isIOS) {
            var loginUrl = this._config.loginUrl;

            return this._constructPath(loginUrl, queryParams, isIOS);
        }
    }, {
        key: "getRegisterUrl",
        value: function getRegisterUrl(queryParams, isIOS) {
            var registerUrl = this._config.registerUrl;

            return this._constructPath(registerUrl, queryParams, isIOS);
        }
    }, {
        key: "getTerminalRegisterUrl",
        value: function getTerminalRegisterUrl(queryParams, isIOS) {
            var terminalRegisterUrl = this._config.terminalRegisterUrl;

            return this._constructPath(terminalRegisterUrl, queryParams, isIOS);
        }
    }, {
        key: "getBwRegisterUrl",
        value: function getBwRegisterUrl(queryParams, isIOS) {
            var bwRegisterUrl = this._config.bwRegisterUrl;

            return this._constructPath(bwRegisterUrl, queryParams, isIOS);
        }
    }, {
        key: "getSettingsUrl",
        value: function getSettingsUrl(queryParams) {
            var settingsUrl = this._config.settingsUrl;

            return this._constructPath(settingsUrl, queryParams);
        }
    }, {
        key: "getUserInfoUrl",
        value: function getUserInfoUrl(queryParams) {
            var userInfoUrl = this._config.userInfoUrl;

            return this._constructPath(userInfoUrl, queryParams);
        }
    }, {
        key: "getBssoUrl",
        value: function getBssoUrl(queryParams) {
            var bssoUrl = this._config.bssoUrl;

            return this._constructPath(bssoUrl, queryParams);
        }

        /**
         * @param {String} url
         * @param {Object} queryParams
         * @returns {String}
         */

    }], [{
        key: "appendQueryParams",
        value: function appendQueryParams(url, queryParams) {
            if (!queryParams || (typeof queryParams === "undefined" ? "undefined" : _typeof(queryParams)) !== "object") {
                return url;
            }

            var params = Object.keys(queryParams);

            if (params.length === 0) {
                return url;
            }

            var constructedUrl = url + "?" + UrlBuilder.constructKeyValuePair(params[0], queryParams[params[0]]);

            for (var i = 1; i < params.length; ++i) {
                constructedUrl += "&" + UrlBuilder.constructKeyValuePair(params[i], queryParams[params[i]]);
            }
            return constructedUrl;
        }

        /**
         * @param {String} key
         * @param {String} value
         * @returns {String}
         */

    }, {
        key: "constructKeyValuePair",
        value: function constructKeyValuePair(key, value) {
            return key + "=" + encodeURIComponent(value);
        }
    }]);

    return UrlBuilder;
}();

exports.default = UrlBuilder;
module.exports = exports["default"];
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/dispatchEvent.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
(function polyfillCustomEvent(w, d) {
    var testEvent = void 0; //eslint-disable-line no-unused-vars

    try {
        testEvent = new w.CustomEvent("test"); //eslint-disable-line no-unused-vars
    } catch (e) {
        var CustomEvent = function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = d.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        CustomEvent.prototype = w.Event.prototype;
        w.CustomEvent = CustomEvent;
    }
})(window, document);

function dispatchEvent() {
    var sourceElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var eventType = arguments[1];
    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var event = new window.CustomEvent(eventType, {
        detail: detail
    });

    sourceElement.dispatchEvent(event);
}

exports.default = dispatchEvent;
module.exports = exports["default"];
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/utils/getCookieValue.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getCookieValue;
function getCookieValue(cookieName) {
    var matches = document.cookie.match("(^|;) ?" + cookieName + "=([^;$]*)");
    return matches ? matches[2] : null;
}
module.exports = exports["default"];
},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/index.js":[function(require,module,exports){
"use strict";

module.exports = require("./dist/RegUIClient");

},{"./dist/RegUIClient":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/dist/RegUIClient.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/vendor/jsonp.js":[function(require,module,exports){
/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
    if ('function' == typeof opts) {
        fn = opts;
        opts = {};
    }
    if (!opts) opts = {};

    var prefix = opts.prefix || '__jp';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = opts.name || (prefix + (count++));

    var param = opts.param || 'callback';
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;


    if (timeout) {
        timer = setTimeout(function(){
            cleanup();
            if (fn) fn(new Error('Timeout'));
        }, timeout);
    }

    function cleanup(){
        if (script.parentNode) script.parentNode.removeChild(script);
        window[id] = noop;
        if (timer) clearTimeout(timer);
    }

    function cancel(){
        if (window[id]) {
            cleanup();
        }
    }

    window[id] = function(data){
        cleanup();
        if (fn) fn(null, data);
    };

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
}

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/events/Events.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fire = require("../util/fire");

var _fire2 = _interopRequireDefault(_fire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var READY_EVENT_NAME = "bbnav:ready";

/**
 * Dispatches the "bbnav:ready" event on the window
 * so that consumers can listen for when the navigation's
 * API is available
 */
/*! Events.js */

function emitReadyEvent() {
  window[READY_EVENT_NAME] = true;
  (0, _fire2.default)(document, READY_EVENT_NAME);
}

exports.default = { emitReadyEvent: emitReadyEvent };

},{"../util/fire":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/fire.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/logo/BBContentLogo.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! BBContentLogo.js */

var THEME_TO_URL = {
    markets: "http://www.bloomberg.com/markets",
    technology: "http://www.bloomberg.com/technology",
    politics: "http://www.bloomberg.com/politics",
    pursuits: "http://www.bloomberg.com/pursuits",
    view: "https://www.bloomberg.com/view",
    gadfly: "https://www.bloomberg.com/gadfly",
    businessweek: "http://www.bloomberg.com/businessweek"
};

var contentLogoEl = void 0;
var defaultTheme = void 0;

/** @class BBContentLogo */
var BBContentLogo = {

    /**
     * @method
     * @param {HTMLElement} el - Root element for BBContentLogo
     */
    initialize: function initialize(el) {
        contentLogoEl = el;
        defaultTheme = contentLogoEl.getAttribute("href");
    },


    /**
     * @method
     * @param {string} theme - New theme for the content logo
     */
    setTheme: function setTheme(theme) {
        contentLogoEl.setAttribute("href", THEME_TO_URL[theme] || defaultTheme);
    }
};

exports.default = BBContentLogo;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/navigation/Nav.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("../../polyfills/object/assign");

require("../../polyfills/CustomEvent");

var _locale = require("../../util/locale");

var _locale2 = _interopRequireDefault(_locale);

var _onClick = require("../../util/onClick");

var _onClick2 = _interopRequireDefault(_onClick);

var _matches = require("../../util/matches");

var _matches2 = _interopRequireDefault(_matches);

var _noop = require("../../util/noop");

var _noop2 = _interopRequireDefault(_noop);

var _Css = require("../../util/Css");

var _Css2 = _interopRequireDefault(_Css);

var _NavState = require("../../state/NavState");

var _NavState2 = _interopRequireDefault(_NavState);

var _BBContentLogo = require("../../modules/logo/BBContentLogo");

var _BBContentLogo2 = _interopRequireDefault(_BBContentLogo);

var _Submenu = require("../../modules/navigation/Submenu");

var _Submenu2 = _interopRequireDefault(_Submenu);

var _Social = require("../../modules/social/Social");

var _Social2 = _interopRequireDefault(_Social);

var _Persist = require("../../persist/Persist");

var _Persist2 = _interopRequireDefault(_Persist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! Nav.js */

var DROPDOWN_ATTR = "data-dropdown";

// TODO: [JP] remove this once business app is able to pass theme to bb.nav
var SUBSCRIPTION_URLS_FOR_THEME = {
    "businessweek": "http://businessweekmag.com/navbartextlink",
    "markets": "http://businessweekmag.com/navbarmarketstextlink",
    "technology": "http://businessweekmag.com/navbartechtextlink",
    "pursuits": "http://businessweekmag.com/navbarpursuitstextlink",
    "politics": "http://businessweekmag.com/navbarpoliticstextlink",
    "view": "http://businessweekmag.com/navbaropiniontextlink",
    "gadfly": "http://businessweekmag.com/navbaropiniontextlink"
};

var social = void 0;

/** @class Nav */
var Nav = {

    /**
     * Attach default functionality to nav element
     * @method
     * @param {HTMLElement} bbNavEl - Root node for bbNav
     */
    defaultFunctionality: function defaultFunctionality(bbNavEl) {
        var contentHeadlineEl = bbNavEl.getElementsByClassName("bb-nav-headline")[0];
        var contentLogoEl = bbNavEl.getElementsByClassName("bb-nav-content-logo__site")[0];
        var contentSocialEl = bbNavEl.getElementsByClassName("bb-nav-social")[0];
        var categoriesEl = bbNavEl.getElementsByClassName("bb-nav-categories")[0];
        var progressBarEl = bbNavEl.getElementsByClassName("bb-progress__status")[0];
        var categoryEls = bbNavEl.querySelectorAll(".bb-nav-categories__category.has-submenu");

        bbNavEl.setAttribute("data-user-country", _locale2.default.getCountry());
        bbNavEl.setAttribute("data-user-region", _locale2.default.getRegion());

        window.addEventListener("reg-user-signed-in", function () {
            var isSignInVisibleInDropdown = document.getElementById("bb-nav-dropdown-sign-in").offsetHeight > 0;
            if (isSignInVisibleInDropdown) {
                _NavState2.default.setFocus("sign in");
            }
        });

        _BBContentLogo2.default.initialize(contentLogoEl);

        _NavState2.default.initialize(bbNavEl, {
            headline: function headline(value) {
                if (value) {
                    contentHeadlineEl.innerHTML = value;
                }
            },
            progress: function progress(value) {
                var progress = Math.min(100, Math.max(0, value));

                progressBarEl.setAttribute("style", _Css2.default.transform("translateX(" + progress + "%)"));
            },
            theme: function theme(vertical) {
                var theme = vertical;

                _BBContentLogo2.default.setTheme(theme);

                // TODO: [JP] 09/05/16 remove this tweak once business app is able to pass theme to bb.nav
                //       [SC] 09/19/16 If making a change here, also update /src/server/fixture/global.json
                if (SUBSCRIPTION_URLS_FOR_THEME[theme]) {
                    var subscribeLink = bbNavEl.getElementsByClassName("bb-nav-touts__subscribe-link")[0];

                    // [SC] 11/09/16 COJP does not have the subscribeLink, and failing the setAttribute method
                    // breaks the third-level nav loading.
                    if (subscribeLink) {
                        subscribeLink.setAttribute("href", SUBSCRIPTION_URLS_FOR_THEME[theme]);
                        subscribeLink.innerHTML = theme === "businessweek" ? "Subscribe" : "Subscribe to Businessweek";
                    }
                }
            }
        });

        _NavState2.default.runHandlers(bbNavEl);

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var name = mutation.attributeName;
                var value = bbNavEl.getAttribute(name);

                _NavState2.default.set(name.replace("data-", ""), value);
            });
        });

        observer.observe(bbNavEl, { attributes: true });

        (0, _Persist2.default)();

        // [WW][7/25/2016] noop by default so that API doesn't throw error
        bbNavEl.configureExperienceSelect = _noop2.default;

        bbNavEl.displaySocialButtons = function (config) {
            if (!social) {
                social = _Social2.default.from(contentSocialEl);
            }

            social.activate(config);
        };

        bbNavEl.hideSocialButtons = function () {
            if (!social) {
                return;
            }

            social.deactivate();
        };

        (0, _onClick2.default)(bbNavEl, function (event) {
            var target = event.target;


            if ((0, _matches2.default)(target, ".bb-nav-content-logo__down-arrow, .bb-nav-logo__arrow")) {
                handleClickLogoArrow();
                return;
            }
        });

        for (var i = 0, len = categoryEls.length; i < len; i++) {
            var categoryEl = categoryEls[i];
            var buildSubmenu = makeBuildSubmenu(categoryEl);

            categoryEl.addEventListener("mouseenter", buildSubmenu);
        }

        function makeBuildSubmenu(categoryEl) {
            function buildSubmenu() {
                var submenuEl = categoryEl.getElementsByClassName("bb-nav-submenu")[0];
                var submenu = _Submenu2.default.from(submenuEl);

                submenu.fetchFirstCategory();

                categoryEl.removeEventListener("mouseenter", buildSubmenu);
            }

            return buildSubmenu;
        }

        function handleClickLogoArrow() {
            var dropdownIsOpen = _NavState2.default.focusIs("dropdown");

            if (dropdownIsOpen) {
                closeDropdown();
                _NavState2.default.unfocus();
                return;
            }

            _NavState2.default.setFocus("dropdown", function () {
                closeDropdown();
            });

            openDropdown();
        }

        function openDropdown() {
            setPositionOfUsing(categoriesEl, bbNavEl);

            bbNavEl.setAttribute(DROPDOWN_ATTR, true);
        }

        function closeDropdown() {
            bbNavEl.setAttribute(DROPDOWN_ATTR, false);

            removeTopFrom(categoriesEl);
        }

        function setPositionOfUsing(element1, element2) {
            if (!(element1 && element2)) {
                return;
            }

            var offset = _NavState2.default.get("mode") === "content" ? 2 // allow for progress reading bar on content pages.
            : 0;

            var rectHeight = element2.offsetHeight;
            var rectBottom = rectHeight + offset + "px";

            element1.style.top = rectBottom;
        }

        function removeTopFrom(element) {
            if (element) {
                element.style.removeProperty("top");
            }
        }
    }
};

exports.default = Nav;

},{"../../modules/logo/BBContentLogo":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/logo/BBContentLogo.js","../../modules/navigation/Submenu":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/navigation/Submenu.js","../../modules/social/Social":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/Social.js","../../persist/Persist":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/persist/Persist.js","../../polyfills/CustomEvent":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/polyfills/CustomEvent.js","../../polyfills/object/assign":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/polyfills/object/assign.js","../../state/NavState":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/state/NavState.js","../../util/Css":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/Css.js","../../util/locale":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/locale.js","../../util/matches":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/matches.js","../../util/noop":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/noop.js","../../util/onClick":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/onClick.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/navigation/Submenu.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require("../../util/request");

var _request2 = _interopRequireDefault(_request);

var _NavState = require("../../state/NavState");

var _NavState2 = _interopRequireDefault(_NavState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! Submenu.js */

var HIDDEN = "hidden";
var ACTIVE_CLASS = "active";

/** @class Submenu */
var Submenu = {

    /**
     * @memberof Submenu
     * @param {HTMLElement} submenuEl - Root node of the submenu
     * @returns {Submenu} instance of Submenu
     */
    from: function from(submenuEl) {
        var data = {};

        var categoryLinkEls = getCategoryLinks(submenuEl);
        var firstCategoryLinkEl = categoryLinkEls[0];
        var cardsContainer = getCardsContainer(submenuEl);
        var hoverCategoryHandler = makeHoverCategoryHandler({
            data: data,
            submenuEl: submenuEl,
            categoryLinkEls: categoryLinkEls,
            cardsContainer: cardsContainer
        });

        for (var i = 0, length = categoryLinkEls.length; i < length; ++i) {
            categoryLinkEls[i].addEventListener("mouseenter", hoverCategoryHandler);
        }

        /** @lends Submenu */
        return {

            /**
             * fetch first category in submenu so that when user hovers,
             * they will see content immediately
             *
             * @method
             */
            fetchFirstCategory: function fetchFirstCategory() {
                if (!firstCategoryLinkEl) {
                    return;
                }

                hoverCategoryHandler({ target: firstCategoryLinkEl });
            }
        };
    }
};

function isHoveringOnMobileBreakpoint() {
    return _NavState2.default.focusIs("dropdown");
}

function getCategoryLinks(submenuEl) {
    return submenuEl.getElementsByClassName("bb-nav-submenu__category-link");
}

function getCardsContainer(submenuEl) {
    return submenuEl.getElementsByClassName("bb-nav-submenu__cards")[0];
}

function getSubroute(element) {
    return element.dataset.subroute;
}

function getTrackerLabel(element) {
    return element.dataset.trackerLabel;
}

function markAsActive(categoryLinkEl, categoryLinkEls) {
    for (var i = 0, len = categoryLinkEls.length; i < len; ++i) {
        var currentCategoryLinkEl = categoryLinkEls[i];

        if (currentCategoryLinkEl.classList.contains(ACTIVE_CLASS)) {
            currentCategoryLinkEl.classList.remove(ACTIVE_CLASS);
        }
    }

    categoryLinkEl.classList.add(ACTIVE_CLASS);
}

function setCardData(cardsContainer) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var trackerLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    if (!cardsContainer) {
        return;
    }

    cardsContainer.innerHTML = data;
    setTrackerLabel(cardsContainer, trackerLabel);
}

function setTrackerLabel(cardsContainer, trackerLabel) {
    if (trackerLabel) {
        cardsContainer.dataset.trackerLabel = trackerLabel;
    } else {
        cardsContainer.dataset.trackerLabel = null;
    }
}

function makeHoverCategoryHandler(_ref) {
    var data = _ref.data,
        categoryLinkEls = _ref.categoryLinkEls,
        cardsContainer = _ref.cardsContainer;

    return function (_ref2) {
        var target = _ref2.target;

        if (isHoveringOnMobileBreakpoint()) {
            return;
        }

        markAsActive(target, categoryLinkEls);

        var subroute = getSubroute(target);
        var trackingLabel = getTrackerLabel(target);

        if (!subroute) {
            cardsContainer.setAttribute(HIDDEN, HIDDEN);
            return;
        }

        var dataForSubroute = data[subroute];

        if (dataForSubroute) {
            setCardData(cardsContainer, dataForSubroute, trackingLabel);
            cardsContainer.removeAttribute(HIDDEN);

            return;
        }

        (0, _request2.default)(subroute).then(function (response) {
            // Cache data for next time
            data[subroute] = response.data;
            setCardData(cardsContainer, response.data, trackingLabel);
            cardsContainer.removeAttribute(HIDDEN);
        }).catch(function () {
            return setCardData(cardsContainer);
        });
    };
}

exports.default = Submenu;

},{"../../state/NavState":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/state/NavState.js","../../util/request":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/request.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/search/GoogleSearch.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loadScript = require("../../util/loadScript");

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleCustomSearch = "https://cse.google.com/cse.js?cx=016329305653130604988:cmmtykqczbe"; /*! GoogleSearch.js */

var loaded = false;

/** @class GoogleSearch */
var GoogleSearch = {

    /**
     * Loads google search into the page.
     * @method
     */
    load: function load() {
        if (loaded) {
            return;
        }

        (0, _loadScript2.default)(googleCustomSearch);
        loaded = true;
    }
};

exports.default = GoogleSearch;

},{"../../util/loadScript":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/loadScript.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/Social.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _onClick = require("../../util/onClick");

var _onClick2 = _interopRequireDefault(_onClick);

var _matches = require("../../util/matches");

var _matches2 = _interopRequireDefault(_matches);

var _Facebook = require("./networks/Facebook.js");

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Twitter = require("./networks/Twitter.js");

var _Twitter2 = _interopRequireDefault(_Twitter);

var _Email = require("./networks/Email.js");

var _Email2 = _interopRequireDefault(_Email);

var _Google = require("./networks/Google.js");

var _Google2 = _interopRequireDefault(_Google);

var _Linkedin = require("./networks/Linkedin.js");

var _Linkedin2 = _interopRequireDefault(_Linkedin);

var _Reddit = require("./networks/Reddit.js");

var _Reddit2 = _interopRequireDefault(_Reddit);

var _Whatsapp = require("./networks/Whatsapp.js");

var _Whatsapp2 = _interopRequireDefault(_Whatsapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socialNetworks = {
    facebook: _Facebook2.default,
    twitter: _Twitter2.default,
    email: _Email2.default,
    google: _Google2.default,
    linkedin: _Linkedin2.default,
    reddit: _Reddit2.default,
    whatsapp: _Whatsapp2.default
}; /*! Social.js */

var MINIMUM_BUTTONS = 2;
var IS_OPENED_ATTR = "data-opened";

/** @class Social */
var Social = {

    /**
     * @memberof Social
     * @param {HTMLElement} el - Root node of the social buttons
     * @returns {Social} instance of Social
     */
    from: function from(el) {
        el.innerHTML = socialTemplateHTML();

        var state = {
            isOpened: false,
            socialEl: el.getElementsByClassName("bb-nav-social")[0]
        };

        (0, _onClick2.default)(el, function (event) {

            if ((0, _matches2.default)(event.target, ".bb-nav-social__more-icon")) {
                event.preventDefault();
                toggleShowMore(state);
                return;
            }
        });

        /** @lends Social */
        return {

            /**
             * activate/update social buttons
             *
             * @method
             * @param {string} config.title - Title to share
             * @param {string} config.url - Url to share
             * @param {object[]} config.networks - Networks you want to display
             */
            activate: function activate(config) {
                var _config$networks = config.networks,
                    networks = _config$networks === undefined ? [] : _config$networks;


                if (networks.length < MINIMUM_BUTTONS) {
                    throw new Error("There must be at least two social buttons");
                }

                state.buttons = configToButtons(config);

                updateButtons(state);
            },


            /**
             * deactivate social buttons
             *
             * @method
             */
            deactivate: function deactivate() {
                state.buttons = [];
                state.isOpened = false;

                updateButtons(state);
            }
        };
    }
};

function toggleShowMore(state) {
    state.isOpened = !state.isOpened;

    updateShowMore(state);
}

function updateShowMore(_ref) {
    var isOpened = _ref.isOpened,
        socialEl = _ref.socialEl;

    if (isOpened) {
        socialEl.setAttribute(IS_OPENED_ATTR, "true");
        return;
    }

    socialEl.removeAttribute(IS_OPENED_ATTR);
}

function updateButtons(_ref2) {
    var socialEl = _ref2.socialEl,
        buttons = _ref2.buttons;

    socialEl.innerHTML = "\n        <div class=\"bb-nav-social__buttons\">\n            " + buttons.map(buttonHTML).join("") + "\n        </div>\n\n        " + moreButtonHTML(buttons) + "\n        " + separatorHTML(buttons) + "\n    ";
}

function buttonHTML(button) {
    var _button$popup = button.popup,
        target = _button$popup.target,
        onclick = _button$popup.onclick;


    var targetAttribute = target ? "target=\"" + target + "\"" : "";
    var onclickAttribute = onclick ? "onclick=\"" + onclick + "\"" : "";
    var actionAttribute = button.action ? "action=\"" + button.action + "\"" : "";

    return "\n        <a class=\"bb-nav-social__link bb-nav-social__link--" + button.name + "\"\n            href=\"" + button.link + "\"\n            " + targetAttribute + "\n            " + onclickAttribute + "\n            " + actionAttribute + "\n            rel=\"nofollow\"\n            data-tracker-label=\"" + button.name + "\"\n            data-tracker-action=\"click\"\n        >\n            " + button.display + "\n        </a>\n    ";
}

function moreButtonHTML(buttons) {
    if (buttons.length <= MINIMUM_BUTTONS) {
        return "";
    }

    return "\n        <div class=\"bb-nav-social__more\">\n            <div\n                class=\"bb-nav-social__more-icon\"\n                data-tracker-label=\"more\"\n                data-tracker-action=\"click\"\n            >\n            </div>\n        </div>\n    ";
}

function separatorHTML(buttons) {
    if (!buttons.length) {
        return "";
    }

    return "<div class=\"bb-nav-social__content-separator\"></div>";
}

function socialTemplateHTML() {
    return "\n        <div class=\"bb-nav-social\" data-tracker-label=\"social\">\n            <div class=\"bb-nav-social__buttons\">\n            </div>\n        </div>\n    ";
}

function popupFactory(name, popup) {
    if (!popup) {
        return {};
    }

    var width = popup.width,
        height = popup.height;


    return {
        target: "bb-social-popup--" + name,
        onclick: "window.open(this.href, 'bb-social-popup--" + name + "', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + "'); return false;"
    };
}

function configToButtons(_ref3) {
    var title = _ref3.title,
        url = _ref3.url,
        networks = _ref3.networks;

    return networks.map(function (network) {
        var networkConfig = Object.assign({ title: title, url: url }, network);
        var _socialNetworks$netwo = socialNetworks[network.name],
            name = _socialNetworks$netwo.name,
            getSocialLink = _socialNetworks$netwo.getSocialLink,
            popup = _socialNetworks$netwo.popup,
            action = _socialNetworks$netwo.action,
            display = _socialNetworks$netwo.display;


        return {
            name: name,
            link: getSocialLink(networkConfig),
            popup: popupFactory(name, popup),
            action: action,
            display: display
        };
    });
}

exports.default = Social;

},{"../../util/matches":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/matches.js","../../util/onClick":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/onClick.js","./networks/Email.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Email.js","./networks/Facebook.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Facebook.js","./networks/Google.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Google.js","./networks/Linkedin.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Linkedin.js","./networks/Reddit.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Reddit.js","./networks/Twitter.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Twitter.js","./networks/Whatsapp.js":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Whatsapp.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Email.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "email",
    display: "E-mail",
    getSocialLink: function getSocialLink(_ref) {
        var body = _ref.body,
            title = _ref.title;

        var bodyEncoded = encodeURIComponent(body);
        var titleEncoded = encodeURIComponent(title);

        return "mailto:?body=" + bodyEncoded + "&subject=" + titleEncoded;
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Facebook.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "facebook",
    display: "Share on Facebook",
    getSocialLink: function getSocialLink(_ref) {
        var url = _ref.url;

        var urlEncoded = encodeURIComponent(url);

        return "http://www.facebook.com/sharer/sharer.php?u=" + urlEncoded;
    },

    popup: {
        width: 600,
        height: 600
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Google.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "google",
    display: "Share on Google+",
    getSocialLink: function getSocialLink(_ref) {
        var url = _ref.url;

        var urlEncoded = encodeURIComponent(url);

        return "https://plus.google.com/share?url=" + urlEncoded;
    },

    popup: {
        width: 520,
        height: 600
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Linkedin.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "linkedin",
    display: "Share on Linkedin",
    getSocialLink: function getSocialLink(_ref) {
        var title = _ref.title,
            url = _ref.url;

        var titleEncoded = encodeURIComponent(title);
        var urlEncoded = encodeURIComponent(url);

        return "http://www.linkedin.com/shareArticle?title=" + titleEncoded + "&url=" + urlEncoded;
    },

    popup: {
        width: 600,
        height: 528
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Reddit.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "reddit",
    display: "Share on Reddit",
    getSocialLink: function getSocialLink(_ref) {
        var title = _ref.title,
            url = _ref.url;

        var titleEncoded = encodeURIComponent(title);
        var urlEncoded = encodeURIComponent(url);

        return "http://reddit.com/submit?title=" + titleEncoded + "&url=" + urlEncoded;
    },

    popup: {
        width: 520,
        height: 600
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Twitter.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "twitter",
    display: "Share on Twitter",
    getSocialLink: function getSocialLink(_ref) {
        var url = _ref.url,
            text = _ref.text,
            handle = _ref.handle;

        function truncatedText() {
            var TWEET_LENGTH = 140;
            var SHORTENED_URL_LENGTH = 23;
            var ELLIPSIS = "...";
            var REASONABLE_TEXT_PADDING = 6;
            var TOO_BIG_TO_FIT_USEFUL_TEXT = TWEET_LENGTH - SHORTENED_URL_LENGTH - ELLIPSIS.length - REASONABLE_TEXT_PADDING;

            var brandingContent = "";
            if (!text) {
                return "";
            }

            if (handle) {
                brandingContent += " via @" + handle;
            }

            if (brandingContent.length >= TOO_BIG_TO_FIT_USEFUL_TEXT) {
                return "";
            }

            var maxTextLength = TWEET_LENGTH - SHORTENED_URL_LENGTH - ELLIPSIS.length - brandingContent.length;

            if (text.length > maxTextLength) {
                return text.substr(0, maxTextLength) + ELLIPSIS;
            }

            return text;
        }

        var urlEncoded = encodeURIComponent(url);
        var textEncoded = encodeURIComponent(truncatedText());
        var viaEncoded = encodeURIComponent(handle);

        return "https://twitter.com/intent/tweet?url=" + urlEncoded + "&text=" + textEncoded + "&via=" + viaEncoded;
    },

    popup: {
        width: 626,
        height: 438
    }
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/social/networks/Whatsapp.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "whatsapp",
    display: "Share on WhatsApp",
    getSocialLink: function getSocialLink(_ref) {
        var title = _ref.title,
            url = _ref.url;

        var textEncoded = encodeURIComponent(title + " " + url);

        return "whatsapp://send?text=" + textEncoded;
    },

    popup: {
        width: 600,
        height: 600
    },
    action: "share/whatsapp/share"
};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/AttendanceChecker.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookies = require("../../util/cookies");

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALREADY_WATCHED_COOKIE = "bb-mini-player-viewed";

/**
 * @type {object} AttendanceChecker
 */
/*! AttendanceChecker.js */

var AttendanceChecker = {

  /**
   * @method
   * @returns {boolean}
   */
  alreadyWatched: function alreadyWatched() {
    return _cookies2.default.get(ALREADY_WATCHED_COOKIE) === "true";
  },


  /**
   * Sets cookie that expires at EOD and marks miniplayer content as "watched"
   * @method
   */
  markAsWatched: function markAsWatched() {
    var now = Date.now();
    var endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    var maxAgeSeconds = Math.abs(endOfDay - now) / 1000;
    _cookies2.default.set(ALREADY_WATCHED_COOKIE, "true", { maxAge: maxAgeSeconds });
  }
};

exports.default = AttendanceChecker;

},{"../../util/cookies":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/cookies.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/BBCojpMiniPlayer.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Html = require("../../util/Html");

var _Html2 = _interopRequireDefault(_Html);

var _AttendanceChecker = require("./AttendanceChecker");

var _AttendanceChecker2 = _interopRequireDefault(_AttendanceChecker);

var _onClick = require("../../util/onClick");

var _onClick2 = _interopRequireDefault(_onClick);

var _containedIn = require("../../util/containedIn");

var _containedIn2 = _interopRequireDefault(_containedIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! BBCojpMiniPLayer.js */

var PLAYER_CONFIG = {
    "id": "ASIA_MINI",
    "live": true,
    "autoplay": false,
    "htmlChildId": "bb-mini-player__embed",
    "width": 100,
    "height": 57,
    "comscore_ns_site": "bloomberg-jp",
    "comscore_page_level_tags": {
        "bb_brand": "bbiz-jp",
        "bss_cont_play": 0,
        "bb_region": "APAC"
    },
    "use_google_tag_manager": true,
    "log_debug": false,
    "controls": false,
    "ui_controls_popout": false,
    "ui_controls_fullscreen": false
};

var ASIA_EXPERIENCE_KEY = "ASIAMINI";
var PLAYBACK_LIMIT = 5 * 60000;
var IPAD_LANDSCAPE_MEDIA = "screen and (max-device-width: 1020px) and (orientation: landscape)";
var SMALL_DESKTOP_MEDIA = "screen and (max-width: 1020px)";

var BBCojpMiniPLayer = {
    activate: function activate() {
        var _this = this;

        if (!this.shouldBeVisible()) {
            return {
                show: function show() {},
                hide: function hide() {},
                pause: function pause() {}
            };
        }

        var bbMiniPlayerEl = document.getElementsByTagName("bb-mini-player")[0];

        if (!bbMiniPlayerEl) {
            bbMiniPlayerEl = document.createElement("bb-mini-player");
            document.body.appendChild(bbMiniPlayerEl);
        }

        bbMiniPlayerEl.innerHTML = miniPlayerHTML();

        (0, _onClick2.default)(bbMiniPlayerEl, function (event) {
            var target = event.target;


            if ((0, _containedIn2.default)(target, ".bb-miniplayer__video")) {
                _this.resumePlay(event);
                return;
            }
        });

        document.addEventListener("miniplayerReady", function (event) {
            _this.onMiniPlayerReady(event);
        });

        this.bbMiniPlayerEl = bbMiniPlayerEl;

        this.ready();

        return {
            show: this.show.bind(this),
            hide: this.hide.bind(this),
            pause: this.pause.bind(this)
        };
    },
    ready: function ready() {
        this.miniPlayerEl = this.bbMiniPlayerEl.getElementsByClassName("bb-miniplayer")[0];
        this.initializePlayer(PLAYER_CONFIG);

        setTimeout(this.pause.bind(this), PLAYBACK_LIMIT);
    },
    updatePausedInMarkup: function updatePausedInMarkup() {
        _Html2.default.toggleAttribute(this.miniPlayerEl, "paused", this.paused);
    },
    resumePlay: function resumePlay(event) {
        event.preventDefault();

        if (!this.paused) {
            return;
        }

        this.paused = false;
        this.updatePausedInMarkup();

        if (this.player) {
            this.player.play();
        }
    },
    show: function show() {
        this.bbMiniPlayerEl.style.display = "";
    },
    hide: function hide() {
        this.pause();
        this.bbMiniPlayerEl.style.display = "none";
    },
    initializePlayer: function initializePlayer(config) {
        var _this2 = this;

        var createPlayer = function createPlayer(event) {
            var bplayer = event ? event.detail.bplayer : null;
            var BPlayer = bplayer || window.BPlayer;
            var videoEl = _this2.bbMiniPlayerEl.getElementsByClassName("bb-miniplayer__video")[0];

            _this2.player = BPlayer.create(videoEl, config, {
                onReady: function onReady() {
                    _this2.onMiniPlayerReady();
                }
            });

            window.removeEventListener("BPlayerLoaded", createPlayer);
        };

        if (window.BPlayer) {
            createPlayer();
            return;
        }

        var bplayerScript = document.createElement("script");
        bplayerScript.setAttribute("src", "//cdn.gotraffic.net/projector/latest" + "/bplayer.js");
        bplayerScript.setAttribute("type", "text/javascript");
        bplayerScript.setAttribute("async", true);
        bplayerScript.setAttribute("data-exclude", true);

        window.addEventListener("BPlayerLoaded", createPlayer);

        document.head.appendChild(bplayerScript);
        bplayerScript = null;
    },
    pause: function pause() {
        if (this.paused) {
            return;
        }

        this.paused = true;
        this.updatePausedInMarkup();

        if (this.player) {
            this.player.pause();
        }
    },
    dispose: function dispose() {
        if (this.player) {
            this.player.dispose();
        }
    },
    shouldBeVisible: function shouldBeVisible() {
        var isIPad = window.matchMedia(IPAD_LANDSCAPE_MEDIA).matches;
        var isLessThanSmallDesktop = window.matchMedia(SMALL_DESKTOP_MEDIA).matches;

        return !(isIPad || isLessThanSmallDesktop);
    },
    getVideoPlayerInstance: function getVideoPlayerInstance() {
        return window.videojs.getPlayers()[ASIA_EXPERIENCE_KEY];
    },
    onMiniPlayerReady: function onMiniPlayerReady() {
        if (_AttendanceChecker2.default.alreadyWatched()) {
            this.pause();
        } else {
            this.player.play();
            _AttendanceChecker2.default.markAsWatched();
        }
    }
};

function miniPlayerHTML() {
    // [WW][7/21/2016] see comment in BBGlobalMiniPlayer about bb-mini-player class
    return "\n        <div\n            class=\"bb-miniplayer bb-mini-player\"\n            data-tracker-category=\"recirc\"\n            data-tracker-events=\"click\"\n            data-tracker-label=\"mini_player\"\n        >\n            <div class=\"bb-miniplayer__video\"></div>\n            <div class=\"bb-miniplayer__content\">\n                <a href=\"https://www.bloomberg.co.jp/live/asia\" data-tracker-label=\"live_tv\" \n                    data-tracker-action=\"click\" class=\"bb-miniplayer__live-tv\">\n                    <span class=\"bb-miniplayer__link\">\u30E9\u30A4\u30D6</span>\n                </a>\n            </div>\n        </aside>\n    ";
}

exports.default = BBCojpMiniPLayer;

},{"../../util/Html":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/Html.js","../../util/containedIn":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/containedIn.js","../../util/onClick":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/onClick.js","./AttendanceChecker":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/AttendanceChecker.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/LoadMiniPlayer.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require("../../util/request");

var _request2 = _interopRequireDefault(_request);

var _Html = require("../../util/Html");

var _Html2 = _interopRequireDefault(_Html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! LoadMiniPlayer.js */

/*
 * [WW] [7/18/2016] TODO: html importing the miniplayer is deprecated.
 *  Delete this file in the next major version
 */

var LoadMiniPlayer = {
    htmlImport: function htmlImport() {
        if (supportsImports()) {
            return;
        }

        // [WW][7/21/2016] setTimeout to guarantee async
        setTimeout(loadBundle);
    }
};

function loadBundle() {
    var miniplayerLinkEl = document.querySelector("link[rel='import'][href$='/video/miniplayer/bundle']");

    if (!miniplayerLinkEl) {
        return;
    }

    (0, _request2.default)(miniplayerLinkEl.href).then(function (html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;

        copyNodesInOrderFrom(tmp);
    });
}

function supportsImports() {
    return "import" in document.createElement("link");
}

/* [WW][7/20/2016] Recursively copy nodes from one node to document. We have to do this
 * way because the script tags have to be loaded in order. There should only be 3-6 nodes
 * in miniplayer bundle so the performance cost should be relatively low. We want to stop
 * html importing the mini player bundle as soon as possible and delete this code.
 */
function copyNodesInOrderFrom(node) {
    if (!node.firstChild) {
        return;
    }

    var firstChild = node.removeChild(node.firstChild);

    if (firstChild.tagName !== "SCRIPT") {
        document.body.appendChild(firstChild.cloneNode());
        copyNodesInOrderFrom(node);
        return;
    }

    var hasDataExclude = firstChild.getAttribute("data-exclude");
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.src = firstChild.src;

    if (hasDataExclude) {
        script.setAttribute("data-exclude", true);
    }

    _Html2.default.toggleAttribute(script, "async", firstChild.hasAttribute("async"));

    /* [WW][7/20/2016] block adding more nodes until script comes back successfully.
     * This is safe to do without a backup for failure because if bplayer script fails
     * before miniplayer script, miniplayer script would fail anyway
     */
    script.onload = function () {
        copyNodesInOrderFrom(node);
    };

    document.body.appendChild(script);

    script = null;
}

exports.default = LoadMiniPlayer;

},{"../../util/Html":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/Html.js","../../util/request":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/request.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/persist/Persist.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = persistForCurrentState;
var PERSISTENCE_MODE_MAP = {
    "index": forIndexPage,
    "content": forContentPage,
    "business-home": forBusinessHomepage
};

var PERSIST_MODE = "data-persist-for";
var PERSIST_CLASS = "persist-nav";
var HIDE_CLASS = "hide-nav";
var MODE = "data-mode";

var lastKnownScrollPosition = void 0;
var previouslyUsedScrollPosition = void 0;
var processing = void 0;

/**
 * Add the correct scroll handler for the current state of the nav
 */
function persistForCurrentState() {
    var currentPersistenceMode = bbNavEl().getAttribute(PERSIST_MODE);

    var persistenceMethod = PERSISTENCE_MODE_MAP[currentPersistenceMode];
    var newScrollHandler = generateNewScrollHandler(persistenceMethod, currentPersistenceMode);

    window.addEventListener("scroll", newScrollHandler);
}

/**
 * nav element
 * @return {DOM Element}
 */
function bbNavEl() {
    return document.getElementById("bb-nav");
}

/**
 * Container parent for bb.nav
 * @return {DOM Element}
 */
function navParentEl() {
    var navRoot = navRootEl();
    return navRoot.parentNode.children.length === 1 ? navRoot.parentNode : navRoot;
}

/**
 * bb-nav-root dom element
 * @return {DOM Element}
 */
function navRootEl() {
    return bbNavEl().parentNode;
}

/**
 * Generate the new scroll handler to be added to the window
 * @param  {function} newScrollHandler
 * @param  {String} currentPersistenceMode
 * @return {function}
 */
function generateNewScrollHandler(newScrollHandler, currentPersistenceMode) {
    function navScrollListener() {
        lastKnownScrollPosition = window.scrollY || document.documentElement.scrollTop;

        var latestPersistenceMode = bbNavEl().getAttribute(PERSIST_MODE);

        if (latestPersistenceMode !== currentPersistenceMode) {
            window.removeEventListener("scroll", navScrollListener);
            return persistForCurrentState(bbNavEl());
        }

        if (!processing && newScrollHandler) {
            window.requestAnimationFrame(function () {
                newScrollHandler(lastKnownScrollPosition);
                processing = false;
            });
        }

        processing = true;
    }

    if (newScrollHandler) {
        newScrollHandler(lastKnownScrollPosition);
    }

    return navScrollListener;
}

/**
 * Sticky nav behavior for bbiz homepage
 * @param  {Number} scrollPosition
 */
function forBusinessHomepage(scrollPosition) {
    var _calculateScrollPoint = calculateScrollPoints(scrollPosition),
        scrollChange = _calculateScrollPoint.scrollChange,
        bottomOfNav = _calculateScrollPoint.bottomOfNav;

    var whenToStopSticking = bottomOfNav - navRootEl().offsetHeight;

    var didNotMove = scrollChange === 0;
    var isScrollingUp = scrollChange < 0;
    var belowStickingPoint = scrollPosition > whenToStopSticking;
    var aboveStickingPoint = scrollPosition <= whenToStopSticking;

    if (didNotMove) {
        return;
    }

    if (isScrollingUp && belowStickingPoint) {
        stickHeader(bbNavEl());
        bbNavEl().setAttribute(MODE, "index");
        return;
    }

    if (isScrollingUp && aboveStickingPoint) {
        bbNavEl().setAttribute(MODE, "business-home");
    }

    unstickHeader();
}

/**
 * Sticky nav behavior for index page
 * @param  {Number} scrollPosition
 */
function forIndexPage(scrollPosition) {
    var _calculateScrollPoint2 = calculateScrollPoints(scrollPosition),
        scrollChange = _calculateScrollPoint2.scrollChange,
        bottomOfNav = _calculateScrollPoint2.bottomOfNav;

    var whenToStopSticking = bottomOfNav - navRootEl().offsetHeight;

    var didNotMove = scrollChange === 0;
    var isScrollingUp = scrollChange < 0;
    var belowStickingPoint = scrollPosition > whenToStopSticking;
    var aboveStickingPoint = scrollPosition <= whenToStopSticking;

    if (didNotMove) {
        return;
    }

    if (isScrollingUp && belowStickingPoint) {
        return stickHeader();
    }

    if (aboveStickingPoint) {
        return unstickHeader();
    }

    return hideHeader();
}

/**
 * Sticky nav behavior for content pages
 * @param  {Number} scrollPosition
 */
function forContentPage(scrollPosition) {
    var _calculateScrollPoint3 = calculateScrollPoints(scrollPosition),
        scrollChange = _calculateScrollPoint3.scrollChange,
        bottomOfNav = _calculateScrollPoint3.bottomOfNav;

    var whenToStick = bottomOfNav;

    var didNotMove = scrollChange === 0;
    var belowWhenToStick = scrollPosition > whenToStick;
    var aboveWhenToStick = scrollPosition <= whenToStick;

    if (didNotMove) {
        return;
    }

    if (belowWhenToStick) {
        stickHeader();
        bbNavEl().setAttribute(MODE, "content");
        return;
    }

    if (aboveWhenToStick) {
        unstickHeader();
        bbNavEl().setAttribute(MODE, "index");
        return;
    }
}

/**
 * calculate scroll change and bottom of nav for given scrollPosition
 * @param  {Number} scrollPosition
 * @return {Object}                 tuple of scrollChange, bottomOfNav
 */
function calculateScrollPoints(scrollPosition) {
    var scrollChange = scrollPosition - previouslyUsedScrollPosition;
    var bottomOfNav = navParentEl().getBoundingClientRect().bottom + scrollPosition;
    previouslyUsedScrollPosition = scrollPosition;

    return {
        scrollChange: scrollChange,
        bottomOfNav: bottomOfNav
    };
}

function alreadyPersisting() {
    return navRootEl().classList.contains(PERSIST_CLASS);
}

/**
 * Add persisting class to navRoot
 */
function stickHeader() {
    if (alreadyPersisting()) {
        return;
    }

    var navRoot = navRootEl();

    navRoot.classList.add(PERSIST_CLASS);
    navRoot.classList.remove(HIDE_CLASS);
}

/**
 * Remove persiting class from navRoot
 */
function unstickHeader() {
    if (!alreadyPersisting()) {
        return;
    }

    var navRoot = navRootEl();

    navRoot.classList.remove(PERSIST_CLASS);
}

/**
 * Remove persisting class and add hide class to navRoot
 */
function hideHeader() {

    if (!alreadyPersisting()) {
        return;
    }

    var navRoot = navRootEl();

    navRoot.classList.add(HIDE_CLASS);
    navRoot.classList.remove(PERSIST_CLASS);
}

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/polyfills/CustomEvent.js":[function(require,module,exports){
"use strict";

// [WW][7/21/2016] from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

    if (typeof window.CustomEvent === "function") {
        return false;
    }

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/polyfills/object/assign.js":[function(require,module,exports){
"use strict";

var _assign2 = require("core-js/library/fn/object/assign");

var _assign3 = _interopRequireDefault(_assign2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign = Object.assign ? Object.assign : _assign3.default; /*! polyfills/object/assign.js */

},{"core-js/library/fn/object/assign":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/core-js/library/fn/object/assign.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/sites/cojp/bb-cojp-nav.js":[function(require,module,exports){
"use strict";

var _onClick = require("../../util/onClick");

var _onClick2 = _interopRequireDefault(_onClick);

var _matches = require("../../util/matches");

var _matches2 = _interopRequireDefault(_matches);

var _documentReady = require("../../util/documentReady");

var _documentReady2 = _interopRequireDefault(_documentReady);

var _NavState = require("../../state/NavState");

var _NavState2 = _interopRequireDefault(_NavState);

var _Nav = require("../../modules/navigation/Nav");

var _Nav2 = _interopRequireDefault(_Nav);

var _GoogleSearch = require("../../modules/search/GoogleSearch");

var _GoogleSearch2 = _interopRequireDefault(_GoogleSearch);

var _Events = require("../../events/Events");

var _Events2 = _interopRequireDefault(_Events);

var _LoadMiniPlayer = require("../../modules/video/LoadMiniPlayer");

var _LoadMiniPlayer2 = _interopRequireDefault(_LoadMiniPlayer);

var _BBCojpMiniPlayer = require("../../modules/video/BBCojpMiniPlayer");

var _BBCojpMiniPlayer2 = _interopRequireDefault(_BBCojpMiniPlayer);

var _regUiClient = require("reg-ui-client");

var _regUiClient2 = _interopRequireDefault(_regUiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! bb-cojp-nav.js */

var SEARCH_ICON_SELECTOR = ".bb-nav-search__icon";

(0, _documentReady2.default)(function () {
    var bbNavEl = document.getElementById("bb-nav");
    var cojpMiniPlayer = void 0;

    if (!bbNavEl) {
        return;
    }

    verifyUserInfo(bbNavEl);

    _Nav2.default.defaultFunctionality(bbNavEl);

    bbNavEl.showMiniPlayer = function () {
        if (!cojpMiniPlayer) {
            cojpMiniPlayer = _BBCojpMiniPlayer2.default.activate();
            return;
        }

        cojpMiniPlayer.show();
    };

    bbNavEl.hideMiniPlayer = function () {
        if (!cojpMiniPlayer) {
            return;
        }

        cojpMiniPlayer.hide();
    };

    bbNavEl.pauseMiniPlayer = function () {
        if (!cojpMiniPlayer) {
            return;
        }

        cojpMiniPlayer.pause();
    };

    (0, _onClick2.default)(bbNavEl, function (event) {
        var target = event.target;


        if ((0, _matches2.default)(target, SEARCH_ICON_SELECTOR)) {
            handleClickSearchIcon();
            return;
        }
    });

    bbNavEl.addEventListener("mouseover", loadGoogleSearch);

    function loadGoogleSearch(_ref) {
        var target = _ref.target;


        if ((0, _matches2.default)(target, SEARCH_ICON_SELECTOR)) {
            _GoogleSearch2.default.load();
            bbNavEl.removeEventListener("mouseover", loadGoogleSearch);
            return;
        }
    }

    function handleClickSearchIcon() {
        var currentSearchMode = bbNavEl.getAttribute("data-search-mode") === "true";
        var newSearchMode = !currentSearchMode;

        bbNavEl.setAttribute("data-search-mode", newSearchMode);

        if (newSearchMode) {
            _NavState2.default.setFocus("search", function () {
                bbNavEl.setAttribute("data-search-mode", false);
            });

            return;
        }

        _NavState2.default.unfocus();
    }

    function verifyUserInfo(bbNavEl) {
        var environment = bbNavEl.getAttribute("data-reg-env");
        if (!environment) {
            return;
        }

        new _regUiClient2.default(null, { environment: environment }).verifySignInStatus();
    }

    _Events2.default.emitReadyEvent();

    _LoadMiniPlayer2.default.htmlImport();
});

},{"../../events/Events":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/events/Events.js","../../modules/navigation/Nav":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/navigation/Nav.js","../../modules/search/GoogleSearch":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/search/GoogleSearch.js","../../modules/video/BBCojpMiniPlayer":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/BBCojpMiniPlayer.js","../../modules/video/LoadMiniPlayer":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/modules/video/LoadMiniPlayer.js","../../state/NavState":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/state/NavState.js","../../util/documentReady":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/documentReady.js","../../util/matches":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/matches.js","../../util/onClick":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/onClick.js","reg-ui-client":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/node_modules/reg-ui-client/index.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/state/NavState.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! NavState.js */

var KEYS_WE_CARE_ABOUT = ["base", "progress", "site", "headline", "mode", "theme", "user-country", "user-region"];

var focus = null;
var focusCloser = null;
var state = null;
var changeHandlers = null;

var NavState = {
    initialize: function initialize(bbNavEl, handlers) {
        state = initialStateFromDOM(bbNavEl);
        changeHandlers = handlers;
    },
    set: function set(key, value) {
        if (state[key] !== value) {
            state[key] = value;
        }

        if (thereIsChangeHandlerFor(key)) {
            changeHandlers[key](value);
        }
    },
    runHandlers: function runHandlers(bbNavEl) {
        KEYS_WE_CARE_ABOUT.forEach(function (key) {
            if (thereIsChangeHandlerFor(key)) {
                var value = bbNavEl.getAttribute("data-" + key);
                changeHandlers[key](value);
            }
        });
    },
    get: function get(key) {
        return state[key];
    },
    getFocus: function getFocus() {
        return focus;
    },
    setFocus: function setFocus(what, closer) {
        if (focusCloser) {
            focusCloser();
        }

        focus = what;
        focusCloser = closer;
    },
    unfocus: function unfocus() {
        focus = null;
        focusCloser = null;
    },
    focusIs: function focusIs(what) {
        return what === focus;
    }
};

function thereIsChangeHandlerFor(key) {
    return changeHandlers && typeof changeHandlers[key] === "function";
}

function initialStateFromDOM(bbNavEl) {
    var initialState = {};

    KEYS_WE_CARE_ABOUT.forEach(function (key) {
        initialState[key] = bbNavEl.getAttribute("data-" + key);
    });

    return initialState;
}

exports.default = NavState;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/Css.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! Css.js */

var PREFIXES = ["", "-webkit-", "-ms-"];

var Css = {
    transform: function transform(value) {
        return PREFIXES.map(function (prefix) {
            return prefix + "transform: " + value;
        }).join(";");
    }
};

exports.default = Css;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/Html.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! Html.js */

var Html = {
    toggleAttribute: function toggleAttribute(el, attribute, isOn) {
        if (isOn) {
            var attributeNode = document.createAttribute(attribute);
            el.setAttributeNode(attributeNode);
            return;
        }

        el.removeAttribute(attribute);
    }
};

exports.default = Html;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/containedIn.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _matches = require("./matches");

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function containedIn(el, selector) {
    var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

    if ((0, _matches2.default)(el, selector)) {
        return true;
    }

    var currentEl = el;

    while (currentEl !== scope) {
        currentEl = currentEl.parentNode;

        if ((0, _matches2.default)(currentEl, selector)) {
            return true;
        }
    }

    return false;
} /*! containedIn.js */

exports.default = containedIn;

},{"./matches":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/matches.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/cookies.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! cookies.js */

/**
 * @typedef {object} CookieDefinition
 * @param {string} path
 * @param {string} domain
 * @param {string | number} maxAge
 * @param {string | Date} expires
 * @param {string | boolean} secure
 */

exports.default = {
    /**
     * Returns a cookie value
     *
     * @method
     * @param {string} cookieName
     * @returns {?string}
     */
    get: function get(cookieName) {
        var regExp = new RegExp("(?:^|[; ])" + cookieName + "=([^\\s;]*)");
        var sMatch = document.cookie.match(regExp);

        return cookieName && sMatch ? decodeURI(sMatch[1]) : undefined;
    },


    /**
     * Set a new cookies
     *
     * @method
     * @param {string} cookieName
     * @param {string} value
     * @param {CookieDefinition} [options]
     */
    set: function set(cookieName, value) {
        var _cookieObject;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        var cookieObject = (_cookieObject = {}, _defineProperty(_cookieObject, encodeURIComponent(cookieName), encodeURIComponent(value)), _defineProperty(_cookieObject, "path", options.path), _defineProperty(_cookieObject, "domain", options.domain), _defineProperty(_cookieObject, "maxAge", options.maxAge), _defineProperty(_cookieObject, "expires", options.expires), _defineProperty(_cookieObject, "secure", options.secure), _cookieObject);

        document.cookie = serializeCookieObject(cookieObject);
    },


    __private__: {
        serializeCookieObject: serializeCookieObject
    }
};


function serializeCookieObject(cookieObject) {
    return Object.keys(cookieObject).reduce(function (result, property) {
        var propertyValue = cookieObject[property];

        if (propertyValue === undefined) {
            return result;
        }

        if ("expires" === property) {
            var sExpires = void 0;

            switch (propertyValue.constructor) {
                case String:
                    sExpires = propertyValue;
                    break;
                case Date:
                    sExpires = propertyValue.toUTCString();
                    break;
            }

            propertyValue = sExpires;
        }

        var normalizedPropertyName = "maxAge" === property ? "max-age" : property;

        return "" + result + normalizedPropertyName + "=" + propertyValue + "; ";
    }, "").trim();
}

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/documentReady.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! documentReady.js */

function documentReady(callback) {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        callback();
        return;
    }

    document.addEventListener("DOMContentLoaded", callback);
}

exports.default = documentReady;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/fire.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! fire.js */

function fire(el, eventName, data) {
    var event = new CustomEvent(eventName, {
        detail: data,
        bubbles: true,
        cancelable: false
    });

    el.dispatchEvent(event);
}

exports.default = fire;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/loadScript.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadScript;

var _noop = require("./noop");

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(url, callback) {
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = url;
    script.onload = callback;

    document.body.appendChild(script);
    script = null;
} /*! loadScript.js */

function loadScript() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noop2.default;

    document.readyState !== "loading" ? load(url, callback) : document.addEventListener("DOMContentLoaded", function () {
        return load(url, callback);
    });
}

},{"./noop":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/noop.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/locale.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cookies = require("./cookies");

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_REGION_COUNTRY = "US"; /*! locale.js */

var DEFAULT_EXPERIENCE = "AMER";

var REGION_COOKIE = "ak_rg";
var COUNTRY_COOKIE = "ak_co";
var EXPERIENCE_COOKE = "exp_perf";

var REGION = _cookies2.default.get(REGION_COOKIE);
var COUNTRY = _cookies2.default.get(COUNTRY_COOKIE);
var EXPERIENCE = _cookies2.default.get(EXPERIENCE_COOKE);

var EXPERIENCE_BY_REGION = {
    "US": "AMER",
    "Asia": "APAC",
    "Europe": "EUR",
    "MidEast": "EUR",
    "Africa": "EUR",
    "Canada": "AMER"
};

var EXPERIENCE_BY_COUNTRY = {
    "AU": "AUSTRALIA"
};

exports.default = {
    /**
     * Returns region code set by Akamai server
     * @returns {string}
     */
    getRegion: function getRegion() {
        return REGION || DEFAULT_REGION_COUNTRY;
    },


    /**
     * Returns a user experience code
     * @returns {string}
     */
    getExperience: function getExperience() {
        return EXPERIENCE || EXPERIENCE_BY_COUNTRY[this.getCountry()] || EXPERIENCE_BY_REGION[this.getRegion()] || DEFAULT_EXPERIENCE;
    },


    /**
     * Returns a country code set by the Akamai server
     * @returns {string}
     */
    getCountry: function getCountry() {
        return COUNTRY || DEFAULT_REGION_COUNTRY;
    }
};

},{"./cookies":"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/cookies.js"}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/matches.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! matches.js */

function matches(el, selector) {
    var elProto = Element.prototype;
    var matches = elProto.matches || elProto.matchesSelector || elProto.webkitMatchesSelector || elProto.mozMatchesSelector || elProto.msMatchesSelector;

    return matches.call(el, selector);
}

exports.default = matches;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/noop.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {};

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/onClick.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*! onClick.js */

function onClick(el, handler) {
    var onclickHandler = function onclickHandler(event) {
        if (event.defaultPrevented || isUsabilityClick(event)) {
            return;
        }

        handler.call(this, event);
    };

    el.addEventListener("click", onclickHandler);

    return onclickHandler;
}

function isUsabilityClick(event) {
    /* [WW] [7/26/2016]
     * Ignore ctrl+click, alt+click, shift+click, meta+click
     * Ignore Firefox bubbles non-left button clicks (i.e. e.button > 0)
     */
    return event.button || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}
exports.default = onClick;

},{}],"/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/util/request.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = request;
/*! request.js */

function callAll(callbacks, data) {
    callbacks.forEach(function (callback) {
        return callback(data);
    });
}

function parse(data) {
    try {
        return Object.freeze(JSON.parse(data));
    } catch (error) {
        return data;
    }
}

/**
 * @returns {Thenable}
 */
function request(url) {
    var ajaxRequest = new XMLHttpRequest();
    var onSuccessCallbacks = [];
    var onErrorCallbacks = [];

    var data = void 0;

    function errorHandler() {
        callAll(onErrorCallbacks);
    }

    function responseHandler() {
        if (ajaxRequest.status !== 200) {
            callAll(onErrorCallbacks);
            return;
        }

        var responseText = ajaxRequest.responseText;

        data = parse(responseText);

        callAll(onSuccessCallbacks, data);
    }

    ajaxRequest.addEventListener("load", responseHandler);
    ajaxRequest.addEventListener("error", errorHandler);
    ajaxRequest.addEventListener("abort", errorHandler);

    ajaxRequest.open("GET", url, true);
    ajaxRequest.send();

    return {
        then: function then(callback) {
            if (typeof callback !== "function") {
                return this;
            }

            if (data) {
                callback(data);
            } else {
                onSuccessCallbacks.push(callback);
            }

            return this;
        },
        catch: function _catch(callback) {
            if (typeof callback === "function") {
                onErrorCallbacks.push(callback);
            }

            return this;
        }
    };
}

},{}]},{},["/bb/web/jenkins/workspace/sumer-Web_bb.nav_production-I5HLI6OEKXY74CFF245V5ADUCTACIDMCWLRGCDXRPJSSZBRYLG6Q/src/client/sites/cojp/bb-cojp-nav.js"])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvcmUuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZXhwb3J0LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQub2JqZWN0LWFzc2lnbi5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL25vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL2luZGV4LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvcmVnLXVpLWNsaWVudC9kaXN0L1JlZ1VJQ2xpZW50LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvcmVnLXVpLWNsaWVudC9kaXN0L1VzZXJJbmZvLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvcmVnLXVpLWNsaWVudC9kaXN0L2NvbnN0YW50cy5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvbm9kZV9tb2R1bGVzL3JlZy11aS1jbGllbnQvZGlzdC91dGlscy9VcmxCdWlsZGVyLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvcmVnLXVpLWNsaWVudC9kaXN0L3V0aWxzL2Rpc3BhdGNoRXZlbnQuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL25vZGVfbW9kdWxlcy9yZWctdWktY2xpZW50L2Rpc3QvdXRpbHMvZ2V0Q29va2llVmFsdWUuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL25vZGVfbW9kdWxlcy9yZWctdWktY2xpZW50L2luZGV4LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9ub2RlX21vZHVsZXMvcmVnLXVpLWNsaWVudC92ZW5kb3IvanNvbnAuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvZXZlbnRzL0V2ZW50cy5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9tb2R1bGVzL2xvZ28vQkJDb250ZW50TG9nby5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9tb2R1bGVzL25hdmlnYXRpb24vTmF2LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvbmF2aWdhdGlvbi9TdWJtZW51LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvc2VhcmNoL0dvb2dsZVNlYXJjaC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9tb2R1bGVzL3NvY2lhbC9Tb2NpYWwuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvbW9kdWxlcy9zb2NpYWwvbmV0d29ya3MvRW1haWwuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvbW9kdWxlcy9zb2NpYWwvbmV0d29ya3MvRmFjZWJvb2suanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvbW9kdWxlcy9zb2NpYWwvbmV0d29ya3MvR29vZ2xlLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvc29jaWFsL25ldHdvcmtzL0xpbmtlZGluLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvc29jaWFsL25ldHdvcmtzL1JlZGRpdC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9tb2R1bGVzL3NvY2lhbC9uZXR3b3Jrcy9Ud2l0dGVyLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvc29jaWFsL25ldHdvcmtzL1doYXRzYXBwLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvdmlkZW8vQXR0ZW5kYW5jZUNoZWNrZXIuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvbW9kdWxlcy92aWRlby9CQkNvanBNaW5pUGxheWVyLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L21vZHVsZXMvdmlkZW8vTG9hZE1pbmlQbGF5ZXIuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvcGVyc2lzdC9QZXJzaXN0LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3BvbHlmaWxscy9DdXN0b21FdmVudC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9wb2x5ZmlsbHMvb2JqZWN0L2Fzc2lnbi5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC9zaXRlcy9jb2pwL2JiLWNvanAtbmF2LmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3N0YXRlL05hdlN0YXRlLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3V0aWwvQ3NzLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3V0aWwvSHRtbC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC91dGlsL2NvbnRhaW5lZEluLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3V0aWwvY29va2llcy5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC91dGlsL2RvY3VtZW50UmVhZHkuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvdXRpbC9maXJlLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3V0aWwvbG9hZFNjcmlwdC5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC91dGlsL2xvY2FsZS5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC91dGlsL21hdGNoZXMuanMiLCJidWlsZC9qYXZhc2NyaXB0cy9jb2pwL3NyYy9jbGllbnQvdXRpbC9ub29wLmpzIiwiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9zcmMvY2xpZW50L3V0aWwvb25DbGljay5qcyIsImJ1aWxkL2phdmFzY3JpcHRzL2NvanAvc3JjL2NsaWVudC91dGlsL3JlcXVlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzduQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeGxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LG1DQUFtQixJQUFuQixDQUF3QixRQUF4QjtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSCxTQWJFO0FBZUgsYUFmRyxrQkFlRyxRQWZILEVBZWE7QUFDWixnQkFBSSxPQUFPLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDaEMsaUNBQWlCLElBQWpCLENBQXNCLFFBQXRCO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIO0FBckJFLEtBQVA7QUF1QkgiLCJmaWxlIjoiYnVpbGQvamF2YXNjcmlwdHMvY29qcC9iYi1jb2pwLW5hdi5qcyIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmFzc2lnbjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgaWYoSVNfUFJPVE8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7IC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTsiLCIvLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIGEgPSBPYmplY3QuYXNzaWduXG4gICAgLCBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuIGEoe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoYSh7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgJCQgICAgPSBhcmd1bWVudHNcbiAgICAsICQkbGVuID0gJCQubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldEtleXMgICAgPSAkLmdldEtleXNcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHNcbiAgICAsIGlzRW51bSAgICAgPSAkLmlzRW51bTtcbiAgd2hpbGUoJCRsZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoJCRbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn0gOiBPYmplY3QuYXNzaWduOyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5vYmplY3QtYXNzaWduJyl9KTsiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqIERldGVjdCBpZiBwcm9wZXJ0aWVzIHNoYWRvd2luZyB0aG9zZSBvbiBgT2JqZWN0LnByb3RvdHlwZWAgYXJlIG5vbi1lbnVtZXJhYmxlLiAqL1xudmFyIG5vbkVudW1TaGFkb3dzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAndmFsdWVPZic6IDEgfSwgJ3ZhbHVlT2YnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gKiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAgYW5kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHBzOi8vbWRuLmlvL09iamVjdC9hc3NpZ24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduSW5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIEJhcigpIHtcbiAqICAgdGhpcy5jID0gMztcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmIgPSAyO1xuICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMCB9LCBuZXcgRm9vLCBuZXcgQmFyKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgaWYgKG5vbkVudW1TaGFkb3dzIHx8IGlzUHJvdG90eXBlKHNvdXJjZSkgfHwgaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9sb2Rhc2ggPSByZXF1aXJlKFwibG9kYXNoLmFzc2lnblwiKTtcblxudmFyIF9sb2Rhc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9kYXNoKTtcblxudmFyIF9kaXNwYXRjaEV2ZW50ID0gcmVxdWlyZShcIi4vdXRpbHMvZGlzcGF0Y2hFdmVudFwiKTtcblxudmFyIF9kaXNwYXRjaEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rpc3BhdGNoRXZlbnQpO1xuXG52YXIgX1VybEJ1aWxkZXIgPSByZXF1aXJlKFwiLi91dGlscy9VcmxCdWlsZGVyXCIpO1xuXG52YXIgX1VybEJ1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXJsQnVpbGRlcik7XG5cbnZhciBfVXNlckluZm8gPSByZXF1aXJlKFwiLi9Vc2VySW5mb1wiKTtcblxudmFyIF9Vc2VySW5mbzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2VySW5mbyk7XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU0lHTkVEX0lOX0FUVFJfTkFNRSA9IFwiZGF0YS1zaWduZWQtaW5cIjtcbnZhciBQT1BVUF9TVEFUVVNfQVRUUl9OQU1FID0gXCJkYXRhLXN0YXR1c1wiO1xudmFyIEJPRFlfUE9QVVBfU1RBVFVTX0FUVFJfTkFNRSA9IFwiZGF0YS1yZWctdWktY2xpZW50LXN0YXR1c1wiO1xudmFyIFBPUFVQX0NPTlRBSU5FUl9JRCA9IFwicmVnLXVpLWNsaWVudFwiO1xudmFyIFBPUFVQX0NPTlRBSU5FUl9DTEFTUyA9IFBPUFVQX0NPTlRBSU5FUl9JRDtcbnZhciBQT1BVUF9JRlJBTUVfQ09OVEFJTkVSX0NMQVNTID0gXCJyZWctdWktY2xpZW50X19pZnJhbWUtY29udGFpbmVyXCI7XG52YXIgUE9QVVBfSUZSQU1FX0lEID0gXCJyZWctdWktY2xpZW50X19pZnJhbWVcIjtcbnZhciBQT1BVUF9JRlJBTUVfQ0xBU1MgPSBQT1BVUF9JRlJBTUVfSUQ7XG52YXIgQ0xPU0VfQlVUVE9OX0lEID0gXCJyZWctdWktY2xpZW50X19jbG9zZVwiO1xudmFyIENMT1NFX0JVVFRPTl9DTEFTUyA9IENMT1NFX0JVVFRPTl9JRDtcbnZhciBFU0NfS0VZX0NPREUgPSAyNztcbnZhciBSRUdFWFBfSU9TID0gL2lQYWR8aVBob25lfGlQb2QvO1xudmFyIEhJREVfQ0xPU0VfQlVUVE9OX0NMQVNTID0gXCJoaWRlLWNsb3NlLWJ1dHRvblwiO1xuXG4vKipcbiAqIEBwYXJhbSBbdGV4dEVsZW1lbnRdXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cblxudmFyIFJlZ1VJQ2xpZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtOb2RlTGlzdHxFbGVtZW50fEFycmF5fSB0ZXh0RWxlbWVudHNcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZ1VJQ2xpZW50KHRleHRFbGVtZW50cykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlZ1VJQ2xpZW50KTtcblxuICAgICAgICB0aGlzLl90ZXh0RWxlbWVudHMgPSBbXTtcblxuICAgICAgICB2YXIgZGlzbWlzc2libGUgPSBvcHRpb25zLmRpc21pc3NpYmxlLFxuICAgICAgICAgICAgZGlzcGxheVdoZW5VbmF1dGhlbnRpY2F0ZWQgPSBvcHRpb25zLmRpc3BsYXlXaGVuVW5hdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgX29wdGlvbnMkZW52aXJvbm1lbnQgPSBvcHRpb25zLmVudmlyb25tZW50LFxuICAgICAgICAgICAgZW52aXJvbm1lbnQgPSBfb3B0aW9ucyRlbnZpcm9ubWVudCA9PT0gdW5kZWZpbmVkID8gXCJkZXZlbG9wbWVudFwiIDogX29wdGlvbnMkZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBxdWVyeVBhcmFtcyA9IG9wdGlvbnMucXVlcnlQYXJhbXM7XG5cbiAgICAgICAgdmFyIHVybHMgPSBfY29uc3RhbnRzLlVSTFNfTUFQW2Vudmlyb25tZW50XSB8fCBfY29uc3RhbnRzLlVSTFNfTUFQLnByb2R1Y3Rpb247XG5cbiAgICAgICAgdGhpcy5fZGlzbWlzc2libGUgPSAhKGRpc21pc3NpYmxlID09PSBmYWxzZSB8fCBkaXNtaXNzaWJsZSA9PT0gXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5fZGlzcGxheVdoZW5VbmF1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGRpc3BsYXlXaGVuVW5hdXRoZW50aWNhdGVkKTtcbiAgICAgICAgdGhpcy5fcXVlcnlQYXJhbXMgPSBxdWVyeVBhcmFtcztcblxuICAgICAgICB0aGlzLl91cmxzID0gbmV3IF9VcmxCdWlsZGVyMi5kZWZhdWx0KHVybHMpO1xuICAgICAgICB0aGlzLl91c2VySW5mbyA9IG5ldyBfVXNlckluZm8yLmRlZmF1bHQodGhpcy5fdXJscy5nZXRVc2VySW5mb1VybCgpKTtcbiAgICAgICAgdGhpcy5fb3BlbmVkV2luZG93UmVmZXJlbmNlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl91c2VyQ2xpY2tFdmVudEhhbmRsZXIgPSB0aGlzLl91c2VyQ2xpY2tFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fd2luZG93TWVzc2FnZUxpc3RlbmVyID0gdGhpcy5fd2luZG93TWVzc2FnZUxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2Nsb3NlT25Fc2NFdmVudEhhbmRsZXIgPSB0aGlzLl9jbG9zZU9uRXNjRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5hZGRUZXh0RWxlbWVudHModGV4dEVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUmVnVUlDbGllbnQsIFt7XG4gICAgICAgIGtleTogXCJpbml0aWFsaXplXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl90ZXh0RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9iaW5kQ2xvc2VFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwTWVzc2FnZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnZlcmlmeVNpZ25JblN0YXR1cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZUxpbmtzKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLl9kaXNwbGF5V2hlblVuYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5saW5rVG9TaWduSW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhdGVzIHVzZXIgdmVyaWZpY2F0aW9uIHByb2Nlc3Mgd2hpY2ggZW1pdHMgcmVnaXN0cmF0aW9uIHN0YXR1cyBldmVudHNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3NpZ25lZEluQ2JdXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtub3RTaWduZWRJbkNiXVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInZlcmlmeVNpZ25JblN0YXR1c1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmVyaWZ5U2lnbkluU3RhdHVzKHNpZ25lZEluQ2IsIG5vdFNpZ25lZEluQ2IpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLl91c2VySW5mby5mZXRjaFVzZXJJbmZvKGZ1bmN0aW9uIChlcnJvciwgc2Vzc2lvbkRldGFpbHMpIHtcbiAgICAgICAgICAgICAgICBzZXRSZWdVc2VySW5mbyhzZXNzaW9uRGV0YWlscyk7XG4gICAgICAgICAgICAgICAgKDAsIF9kaXNwYXRjaEV2ZW50Mi5kZWZhdWx0KSh3aW5kb3csIFwicmVnLXVzZXItaW5mby1yZWFkeVwiLCBzZXNzaW9uRGV0YWlscyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkRldGFpbHMudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoU2lnbmVkSW5FdmVudChzZXNzaW9uRGV0YWlscy51c2VySWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2lnbmVkSW5DYiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduZWRJbkNiLmNhbGwoX3RoaXMyLCBzZXNzaW9uRGV0YWlscy51c2VySWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAoMCwgX2Rpc3BhdGNoRXZlbnQyLmRlZmF1bHQpKHdpbmRvdywgXCJyZWctdXNlci1ub3Qtc2lnbmVkLWluXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub3RTaWduZWRJbkNiID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90U2lnbmVkSW5DYi5jYWxsKF90aGlzMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiY2xlYW51cFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fd2luZG93TWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX3dpbmRvd01lc3NhZ2VMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93TWVzc2FnZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJDbGlja0V2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX3RoaXMzLl91c2VyQ2xpY2tFdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJDbGlja0V2ZW50SGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjbG9zZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQ0xPU0VfQlVUVE9OX0lEKTtcbiAgICAgICAgICAgIGlmIChjbG9zZUVsKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGlkZVBvcHVwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBvcHVwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChQT1BVUF9DT05UQUlORVJfSUQpO1xuICAgICAgICAgICAgaWYgKHBvcHVwRWwpIHtcbiAgICAgICAgICAgICAgICBwb3B1cEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oaWRlUG9wdXApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9wdXBFbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jbG9zZU9uRXNjRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2Nsb3NlT25Fc2NFdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlT25Fc2NFdmVudEhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fdXNlckluZm9FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlZy11c2VyLWluZm8tcmVhZHlcIiwgdGhpcy5fdXNlckluZm9FdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJJbmZvRXZlbnRIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wZW5lZFdpbmRvd1JlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZFdpbmRvd1JlZmVyZW5jZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsb3NlRWwgPSBwb3B1cEVsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVucyBCbG9vbWJlcmcgc2lnbi1pbiBwYWdlXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyeVBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdF1cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJsaW5rVG9TaWduSW5cIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpbmtUb1NpZ25JbigpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fcXVlcnlQYXJhbXM7XG4gICAgICAgICAgICB2YXIgb3B0ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVQb3B1cCh0aGlzLl91cmxzLmdldExvZ2luVXJsKHF1ZXJ5UGFyYW1zLCBSZWdVSUNsaWVudC5pc0lPUygpKSwgKDAsIF9sb2Rhc2gyLmRlZmF1bHQpKHsgaGlkZUNsb3NlQnV0dG9uOiB0cnVlIH0sIG9wdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wZW5zIEJsb29tYmVyZyByZWdpc3RyYXRpb24gcGFnZVxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcXVlcnlQYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRdXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6IFwibGlua1RvUmVnaXN0ZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpbmtUb1JlZ2lzdGVyKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9xdWVyeVBhcmFtcztcbiAgICAgICAgICAgIHZhciBvcHQgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVBvcHVwKHRoaXMuX3VybHMuZ2V0UmVnaXN0ZXJVcmwocXVlcnlQYXJhbXMsIFJlZ1VJQ2xpZW50LmlzSU9TKCkpLCAoMCwgX2xvZGFzaDIuZGVmYXVsdCkoeyBoaWRlQ2xvc2VCdXR0b246IHRydWUgfSwgb3B0KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbnMgVGVybWluYWwgcmVnaXN0cmF0aW9uIHBhZ2VcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5UGFyYW1zXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0XVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImxpbmtUb1Rlcm1pbmFsUmVnaXN0ZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpbmtUb1Rlcm1pbmFsUmVnaXN0ZXIoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlQYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX3F1ZXJ5UGFyYW1zO1xuICAgICAgICAgICAgdmFyIG9wdCA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlUG9wdXAodGhpcy5fdXJscy5nZXRUZXJtaW5hbFJlZ2lzdGVyVXJsKHF1ZXJ5UGFyYW1zLCBSZWdVSUNsaWVudC5pc0lPUygpKSwgKDAsIF9sb2Rhc2gyLmRlZmF1bHQpKHsgaGlkZUNsb3NlQnV0dG9uOiB0cnVlIH0sIG9wdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wZW5zIEJ1c2luZXNzd2VlayByZWdpc3RyYXRpb24gcGFnZVxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcXVlcnlQYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRdXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6IFwibGlua1RvQndSZWdpc3RlclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGlua1RvQndSZWdpc3RlcigpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fcXVlcnlQYXJhbXM7XG4gICAgICAgICAgICB2YXIgb3B0ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVQb3B1cCh0aGlzLl91cmxzLmdldEJ3UmVnaXN0ZXJVcmwocXVlcnlQYXJhbXMsIFJlZ1VJQ2xpZW50LmlzSU9TKCkpLCAoMCwgX2xvZGFzaDIuZGVmYXVsdCkoeyBoaWRlQ2xvc2VCdXR0b246IHRydWUgfSwgb3B0KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbnMgQlNTTyBMb2dpbiBwYWdlXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyeVBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdF1cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJsaW5rVG9CU1NPXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsaW5rVG9CU1NPKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9xdWVyeVBhcmFtcztcbiAgICAgICAgICAgIHZhciBvcHQgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gKDAsIF9sb2Rhc2gyLmRlZmF1bHQpKHtcbiAgICAgICAgICAgICAgICBuZXdXaW5kb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUyNSxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJub1wiLFxuICAgICAgICAgICAgICAgIHdpbmRvd05hbWU6IFwidGVybWluYWxcIlxuICAgICAgICAgICAgfSwgb3B0KTtcblxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlUG9wdXAodGhpcy5fdXJscy5nZXRCc3NvVXJsKHF1ZXJ5UGFyYW1zLCBSZWdVSUNsaWVudC5pc0lPUygpKSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsbHMgYSBjYWxsYmFjayB3aGVuZXZlciB1c2VyIGluZm8gYmVjb21lcyBhdmFpbGFibGVcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJvblVzZXJJbmZvUmVhZHlcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uVXNlckluZm9SZWFkeShjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5fcmVnVXNlckluZm8pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh3aW5kb3cuX3JlZ1VzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3VzZXJJbmZvRXZlbnRIYW5kbGVyID0gdGhpcy5fdXNlckluZm9FdmVudEhhbmRsZXIgfHwgdGhpcy5fYmluZFVzZXJJbmZvRXZlbnQoY2FsbGJhY2spO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWctdXNlci1pbmZvLXJlYWR5XCIsIHRoaXMuX3VzZXJJbmZvRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge05vZGVMaXN0fEVsZW1lbnR8QXJyYXl9IHRleHRFbGVtZW50c1xuICAgICAgICAgKiBAcmV0dXJucyB7UmVnVUlDbGllbnR9XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiYWRkVGV4dEVsZW1lbnRzXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRUZXh0RWxlbWVudHModGV4dEVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHRleHRFbGVtZW50c0FycmF5ID0gZWxlbWVudElzQW5BcnJheU9yTm9kZUxpc3QodGV4dEVsZW1lbnRzKSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRleHRFbGVtZW50cykgOiBbXTtcblxuICAgICAgICAgICAgaWYgKHRleHRFbGVtZW50cyBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnRzQXJyYXkgPSBbdGV4dEVsZW1lbnRzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdGV4dEVsZW1lbnRzID0gdGhpcy5fdGV4dEVsZW1lbnRzLmNvbmNhdCh0ZXh0RWxlbWVudHNBcnJheSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3RleHRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBfdGhpczQuX3VzZXJDbGlja0V2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF90aGlzNC5fdXNlckNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93Ll9yZWdVc2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5rcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl9iaW5kQ2xvc2VFdmVudEhhbmRsZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9iaW5kQ2xvc2VFdmVudEhhbmRsZXIoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc21pc3NpYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5fY2xvc2VPbkVzY0V2ZW50SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJfYmluZFVzZXJJbmZvRXZlbnRcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9iaW5kVXNlckluZm9FdmVudChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LmRldGFpbCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiX3NldHVwTWVzc2FnZUxpc3RlbmVyXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0dXBNZXNzYWdlTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fd2luZG93TWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJfY3JlYXRlUG9wdXBcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVQb3B1cCh1cmwpIHtcbiAgICAgICAgICAgIHZhciBvcHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgICAgICAgICBpZiAoUmVnVUlDbGllbnQuaXNJT1MoKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfc2VsZlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHQubmV3V2luZG93KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wZW5lZFdpbmRvd1JlZmVyZW5jZSA9PSBudWxsIHx8IHRoaXMuX29wZW5lZFdpbmRvd1JlZmVyZW5jZS5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1dpbmRvd1NldHRpbmdzID0gXCJ3aWR0aD1cIiArIG9wdC53aWR0aCArIFwiLGhlaWdodD1cIiArIG9wdC5oZWlnaHQgKyBcIixsb2NhdGlvbj1cIiArIG9wdC5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkV2luZG93UmVmZXJlbmNlID0gd2luZG93Lm9wZW4odXJsLCBvcHQud2luZG93TmFtZSB8fCBcInNpZ25faW5cIiwgbmV3V2luZG93U2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkV2luZG93UmVmZXJlbmNlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX29wdCRoaWRlQ2xvc2VCdXR0b24gPSBvcHQuaGlkZUNsb3NlQnV0dG9uLFxuICAgICAgICAgICAgICAgIGhpZGVDbG9zZUJ1dHRvbiA9IF9vcHQkaGlkZUNsb3NlQnV0dG9uID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9vcHQkaGlkZUNsb3NlQnV0dG9uO1xuXG5cbiAgICAgICAgICAgIHZhciBleGlzdGluZ1BvcHVwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChQT1BVUF9DT05UQUlORVJfSUQpO1xuICAgICAgICAgICAgdmFyIGV4aXN0aW5nSWZyYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChQT1BVUF9JRlJBTUVfSUQpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShCT0RZX1BPUFVQX1NUQVRVU19BVFRSX05BTUUsIFwic2hvd1wiKTtcblxuICAgICAgICAgICAgKDAsIF9kaXNwYXRjaEV2ZW50Mi5kZWZhdWx0KSh3aW5kb3csIFwicmVnLXVpLXNob3ctcG9wLXVwXCIpO1xuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQb3B1cEVsKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZXhpc3RpbmdQb3B1cEVsLCBISURFX0NMT1NFX0JVVFRPTl9DTEFTUywgaGlkZUNsb3NlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93UG9wdXBBZnRlcklmcmFtZUhlaWdodFJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0lmcmFtZUVsLnNldEF0dHJpYnV0ZShcInNyY1wiLCB1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBvcHVwRWwgPSB0aGlzLl9nZW5lcmF0ZVBvcHVwQ29udGVudCh1cmwpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cEVsKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHBvcHVwRWwsIEhJREVfQ0xPU0VfQlVUVE9OX0NMQVNTLCBoaWRlQ2xvc2VCdXR0b24pO1xuXG4gICAgICAgICAgICB0aGlzLl9zaG93UG9wdXBBZnRlcklmcmFtZUhlaWdodFJlZnJlc2goKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc21pc3NpYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChDTE9TRV9CVVRUT05fSUQpO1xuXG4gICAgICAgICAgICAgICAgcG9wdXBFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGlkZVBvcHVwKTtcbiAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oaWRlUG9wdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl9nZW5lcmF0ZVBvcHVwQ29udGVudFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dlbmVyYXRlUG9wdXBDb250ZW50KHVybCkge1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uID0gXCI8ZGl2IGNsYXNzPVxcXCJcIiArIENMT1NFX0JVVFRPTl9DTEFTUyArIFwiXFxcIiBpZD1cXFwiXCIgKyBDTE9TRV9CVVRUT05fSUQgKyBcIlxcXCI+Q2xvc2U8L2Rpdj5cIjtcblxuICAgICAgICAgICAgdmFyIGh0bWxDb250ZW50ID0gXCI8ZGl2IGNsYXNzPVxcXCJcIiArIFBPUFVQX0lGUkFNRV9DT05UQUlORVJfQ0xBU1MgKyBcIlxcXCI+XCIgKyAodGhpcy5fZGlzbWlzc2libGUgPyBjbG9zZUJ1dHRvbiA6IFwiXCIpICsgXCJcXG4gICAgICAgICAgICA8aWZyYW1lIGlkPVxcXCJcIiArIFBPUFVQX0lGUkFNRV9JRCArIFwiXFxcIiBjbGFzcz1cXFwiXCIgKyBQT1BVUF9JRlJBTUVfQ0xBU1MgKyBcIlxcXCIgc3JjPVxcXCJcIiArIHVybCArIFwiXFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCI+PC9pZnJhbWU+PC9kaXY+XCI7XG5cbiAgICAgICAgICAgIHZhciBwb3B1cEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHBvcHVwRWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgUE9QVVBfQ09OVEFJTkVSX0NMQVNTKTtcbiAgICAgICAgICAgIHBvcHVwRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgUE9QVVBfQ09OVEFJTkVSX0lEKTtcbiAgICAgICAgICAgIHBvcHVwRWwuaW5uZXJIVE1MID0gaHRtbENvbnRlbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiBwb3B1cEVsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGVzIGEgcG9wLXVwXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IFtldmVudF1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJfaGlkZVBvcHVwXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaGlkZVBvcHVwKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoQk9EWV9QT1BVUF9TVEFUVVNfQVRUUl9OQU1FKTtcbiAgICAgICAgICAgIHZhciBleGlzdGluZ1BvcHVwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChQT1BVUF9DT05UQUlORVJfSUQpO1xuXG4gICAgICAgICAgICAoMCwgX2Rpc3BhdGNoRXZlbnQyLmRlZmF1bHQpKHdpbmRvdywgXCJyZWctdWktY2xvc2UtcG9wLXVwXCIpO1xuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQb3B1cEVsKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQb3B1cEVsLnJlbW92ZUF0dHJpYnV0ZShQT1BVUF9TVEFUVVNfQVRUUl9OQU1FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl91cGRhdGVMaW5rc1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZUxpbmtzKCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKHRleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuc2V0QXR0cmlidXRlKFNJR05FRF9JTl9BVFRSX05BTUUsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCA9IFwiU2V0dGluZ3NcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiX3VzZXJDbGlja0V2ZW50SGFuZGxlclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3VzZXJDbGlja0V2ZW50SGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBzaWduZWRJbkFscmVhZHkgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFNJR05FRF9JTl9BVFRSX05BTUUpID09PSBcInRydWVcIjtcblxuICAgICAgICAgICAgaWYgKCFzaWduZWRJbkFscmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5saW5rVG9TaWduSW4oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUmVnVUlDbGllbnQuZ29Ub1VybCh0aGlzLl91cmxzLmdldFNldHRpbmdzVXJsKCkpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiX3Nob3dQb3B1cEFmdGVySWZyYW1lSGVpZ2h0UmVmcmVzaFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3dQb3B1cEFmdGVySWZyYW1lSGVpZ2h0UmVmcmVzaCgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoUE9QVVBfQ09OVEFJTkVSX0lEKTtcbiAgICAgICAgICAgIHZhciBpZnJhbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFBPUFVQX0lGUkFNRV9JRCk7XG5cbiAgICAgICAgICAgIGlmICghcG9wdXBFbCB8fCAhaWZyYW1lRWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmcmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZnJhbWVFbC5zdHlsZS5oZWlnaHQgPSBpZnJhbWVFbC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBwb3B1cEVsLnNldEF0dHJpYnV0ZShQT1BVUF9TVEFUVVNfQVRUUl9OQU1FLCBcInNob3dcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl93aW5kb3dNZXNzYWdlTGlzdGVuZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF93aW5kb3dNZXNzYWdlTGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW4gPSBldmVudC5vcmlnaW4gfHwgZXZlbnQub3JpZ2luYWxFdmVudC5vcmlnaW47XG4gICAgICAgICAgICBpZiAoIVJlZ1VJQ2xpZW50LmlzV2hpdGVMaXN0ZWREb21haW4ob3JpZ2luKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUkVHLUhJREUtUE9QVVBcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVBvcHVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJSRUctVVNFUi1TSUdORUQtSU5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGlua3MoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVnVXNlckluZm8oeyB1c2VySWQ6IG1lc3NhZ2UudXNlcklkIH0pO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaFNpZ25lZEluRXZlbnQobWVzc2FnZS51c2VySWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiUkVHLVVTRVItSElERS1QT1BVUFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGlzbWlzc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVQb3B1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiX2Nsb3NlT25Fc2NFdmVudEhhbmRsZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9jbG9zZU9uRXNjRXZlbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaXNFc2NhcGVLZXkgPSBldmVudC5rZXkgPT09IFwiRXNjYXBlXCIgfHwgKGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2gpID09PSBFU0NfS0VZX0NPREU7XG4gICAgICAgICAgICBpZiAoaXNFc2NhcGVLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuXG4gICAgfV0sIFt7XG4gICAgICAgIGtleTogXCJpc1doaXRlTGlzdGVkRG9tYWluXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpc1doaXRlTGlzdGVkRG9tYWluKGRvbWFpbikge1xuICAgICAgICAgICAgcmV0dXJuIGRvbWFpbi5pbmRleE9mKFwiLmJsb29tYmVyZy5jb21cIikgPj0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJT1MgZGV2aWNlIGRldGVjdGlvblxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImlzSU9TXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpc0lPUygpIHtcbiAgICAgICAgICAgIHJldHVybiAhIW5hdmlnYXRvci5wbGF0Zm9ybSAmJiBSRUdFWFBfSU9TLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJnb1RvVXJsXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnb1RvVXJsKHVybCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUmVnVUlDbGllbnQ7XG59KCk7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZVxuICovXG5cblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWwsIGNsYXNzTmFtZSwgZm9yY2UpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0LnRvZ2dsZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUsIGZvcmNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBtZXRob2QgPSBmb3JjZSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuICAgIGVsLmNsYXNzTGlzdFttZXRob2RdKGNsYXNzTmFtZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJJZFxuICovXG5mdW5jdGlvbiBkaXNwYXRjaFNpZ25lZEluRXZlbnQodXNlcklkKSB7XG4gICAgaWYgKCF1c2VySWQgfHwgd2luZG93Ll9yZWdVc2VySWQgPT09IHVzZXJJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgKDAsIF9kaXNwYXRjaEV2ZW50Mi5kZWZhdWx0KSh3aW5kb3csIFwicmVnLXVzZXItc2lnbmVkLWluXCIsIHtcbiAgICAgICAgdXNlcklkOiB1c2VySWRcbiAgICB9KTtcblxuICAgIHdpbmRvdy5fcmVnVXNlcklkID0gdXNlcklkO1xufVxuXG5mdW5jdGlvbiBlbGVtZW50SXNBbkFycmF5T3JOb2RlTGlzdChlbGVtZW50cykge1xuICAgIHJldHVybiBlbGVtZW50cyAmJiBlbGVtZW50cy5sZW5ndGggJiYgZWxlbWVudHMubGVuZ3RoID49IDA7XG59XG5cbmZ1bmN0aW9uIHNldFJlZ1VzZXJJbmZvKCkge1xuICAgIHZhciBzZXNzaW9uRGV0YWlscyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICB2YXIgZXhpc3RpbmdEZXRhaWxzID0gd2luZG93Ll9yZWdVc2VySW5mbyB8fCB7fTtcblxuICAgIHdpbmRvdy5fcmVnVXNlckluZm8gPSB7XG4gICAgICAgIGFnZW50SWQ6IGV4aXN0aW5nRGV0YWlscy5hZ2VudElkIHx8IHNlc3Npb25EZXRhaWxzLmFnZW50SWQsXG4gICAgICAgIHNlc3Npb25JZDogZXhpc3RpbmdEZXRhaWxzLnNlc3Npb25JZCB8fCBzZXNzaW9uRGV0YWlscy5zZXNzaW9uSWQsXG4gICAgICAgIHNlc3Npb25LZXk6IGV4aXN0aW5nRGV0YWlscy5zZXNzaW9uS2V5IHx8IHNlc3Npb25EZXRhaWxzLnNlc3Npb25LZXksXG4gICAgICAgIHVzZXJJZDogZXhpc3RpbmdEZXRhaWxzLnVzZXJJZCB8fCBzZXNzaW9uRGV0YWlscy51c2VySWRcbiAgICB9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWdVSUNsaWVudDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qc29ucDIgPSByZXF1aXJlKFwiLi4vdmVuZG9yL2pzb25wXCIpO1xuXG52YXIgX2pzb25wMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pzb25wMik7XG5cbnZhciBfZ2V0Q29va2llVmFsdWUgPSByZXF1aXJlKFwiLi91dGlscy9nZXRDb29raWVWYWx1ZVwiKTtcblxudmFyIF9nZXRDb29raWVWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRDb29raWVWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBUSU1FT1VUID0gNTAwMDtcbnZhciBCQkdDT01fU0lURV9SRUdFWCA9IC9ibG9vbWJlcmdcXC5jb20kL2k7XG52YXIgQlJFR19VU0VSX0lEX0NPT0tJRV9OQU1FID0gXCJfYnJlZy11aWRcIjtcbnZhciBTVUJTQ1JJUFRJT05fUkVGUkVTSF9DT09LSUVfTkFNRSA9IFwiX2xhc3QtcmVmcmVzaFwiO1xudmFyIFNFU1NJT05fSUQgPSBcInNlc3Npb25faWRcIjtcbnZhciBTRVNTSU9OX0tFWSA9IFwic2Vzc2lvbl9rZXlcIjtcbnZhciBBR0VOVF9JRCA9IFwiYWdlbnRfaWRcIjtcblxuLyoqXG4gKiBAY2xhc3MgVXNlckluZm9cbiAqL1xuXG52YXIgVXNlckluZm8gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckluZm9VcmxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVc2VySW5mbyh1c2VySW5mb1VybCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlckluZm8pO1xuXG4gICAgICAgIHRoaXMuX3VzZXJJbmZvVXJsID0gdXNlckluZm9Vcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKFVzZXJJbmZvLCBbe1xuICAgICAgICBrZXk6IFwiZmV0Y2hVc2VySW5mb1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZmV0Y2hVc2VySW5mbyhjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKFVzZXJJbmZvLmlzT25CYmdDb21TaXRlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmV0Y2hVc2VySW5mb0ZvclNhbWVTaXRlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZldGNoVXNlckluZm9Gb3JEaWZmZXJlbnRTaXRlKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl9mZXRjaFVzZXJJbmZvRm9yU2FtZVNpdGVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9mZXRjaFVzZXJJbmZvRm9yU2FtZVNpdGUoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciB1c2VySWQgPSAoMCwgX2dldENvb2tpZVZhbHVlMi5kZWZhdWx0KShCUkVHX1VTRVJfSURfQ09PS0lFX05BTUUpO1xuICAgICAgICAgICAgdmFyIGFnZW50SWQgPSAoMCwgX2dldENvb2tpZVZhbHVlMi5kZWZhdWx0KShBR0VOVF9JRCk7XG4gICAgICAgICAgICB2YXIgaXNSZWNlbnRseVJlZnJlc2hlZCA9ICEhKDAsIF9nZXRDb29raWVWYWx1ZTIuZGVmYXVsdCkoU1VCU0NSSVBUSU9OX1JFRlJFU0hfQ09PS0lFX05BTUUpO1xuICAgICAgICAgICAgdmFyIGlzVXNlckluZm9TZXQgPSAhIWFnZW50SWQ7XG5cbiAgICAgICAgICAgIGlmICghaXNSZWNlbnRseVJlZnJlc2hlZCB8fCAhaXNVc2VySW5mb1NldCkge1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLmpzb25wKHRoaXMuX3VzZXJJbmZvVXJsLCB7IHRpbWVvdXQ6IFRJTUVPVVQgfSwgZnVuY3Rpb24gKGVycm9yLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBldmVudERldGFpbHMgPSB7XG4gICAgICAgICAgICAgICAgYWdlbnRJZDogYWdlbnRJZCxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6ICgwLCBfZ2V0Q29va2llVmFsdWUyLmRlZmF1bHQpKFNFU1NJT05fSUQpLFxuICAgICAgICAgICAgICAgIHNlc3Npb25LZXk6ICgwLCBfZ2V0Q29va2llVmFsdWUyLmRlZmF1bHQpKFNFU1NJT05fS0VZKSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXZlbnREZXRhaWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIl9mZXRjaFVzZXJJbmZvRm9yRGlmZmVyZW50U2l0ZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2ZldGNoVXNlckluZm9Gb3JEaWZmZXJlbnRTaXRlKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBVc2VySW5mby5qc29ucCh0aGlzLl91c2VySW5mb1VybCwgeyB0aW1lb3V0OiBUSU1FT1VUIH0sIGZ1bmN0aW9uIChlcnJvciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgZGF0YSB8fCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cblxuICAgIH1dLCBbe1xuICAgICAgICBrZXk6IFwiaXNPbkJiZ0NvbVNpdGVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzT25CYmdDb21TaXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIEJCR0NPTV9TSVRFX1JFR0VYLnRlc3Qod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6IFwianNvbnBcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGpzb25wKHVybCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2pzb25wMy5kZWZhdWx0KSh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBVc2VySW5mbztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXNlckluZm87XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgVVJMU19NQVAgPSB7XG4gICAgZGV2ZWxvcG1lbnQ6IHtcbiAgICAgICAgYmFzZVVybDogXCJodHRwOi8vbG9jYWwuYmxvb21iZXJnLmNvbTo0MDA0L1wiLFxuICAgICAgICBsb2dpblVybDogXCJpZnJhbWUvbG9naW5cIixcbiAgICAgICAgcmVnaXN0ZXJVcmw6IFwiaWZyYW1lL3JlZ2lzdGVyXCIsXG4gICAgICAgIHRlcm1pbmFsUmVnaXN0ZXJVcmw6IFwiaWZyYW1lL3Rlcm1pbmFsLXJlZ2lzdGVyXCIsXG4gICAgICAgIGJ3UmVnaXN0ZXJVcmw6IFwiaWZyYW1lL21hZ2F6aW5lXCIsXG4gICAgICAgIHNldHRpbmdzVXJsOiBcImFjY291bnRcIixcbiAgICAgICAgdXNlckluZm9Vcmw6IFwidXNlci1pbmZvXCIsXG4gICAgICAgIGJzc29Vcmw6IFwiYXBpL2xvZ2luL2Jsb29tYmVyZy1hdXRoLXJlZGlyZWN0XCJcbiAgICB9LFxuICAgIHN0YWdpbmc6IHtcbiAgICAgICAgYmFzZVVybDogXCJodHRwczovL3N0YWdpbmctbG9naW4uYmxvb21iZXJnLmNvbS9cIixcbiAgICAgICAgbG9naW5Vcmw6IFwiaWZyYW1lL2xvZ2luXCIsXG4gICAgICAgIHJlZ2lzdGVyVXJsOiBcImlmcmFtZS9yZWdpc3RlclwiLFxuICAgICAgICB0ZXJtaW5hbFJlZ2lzdGVyVXJsOiBcImlmcmFtZS90ZXJtaW5hbC1yZWdpc3RlclwiLFxuICAgICAgICBid1JlZ2lzdGVyVXJsOiBcImlmcmFtZS9tYWdhemluZVwiLFxuICAgICAgICBzZXR0aW5nc1VybDogXCJhY2NvdW50XCIsXG4gICAgICAgIHVzZXJJbmZvVXJsOiBcInVzZXItaW5mb1wiLFxuICAgICAgICBic3NvVXJsOiBcImFwaS9sb2dpbi9ibG9vbWJlcmctYXV0aC1yZWRpcmVjdFwiXG4gICAgfSxcbiAgICBzYW5kY2FzdGxlOiB7XG4gICAgICAgIGJhc2VVcmw6IFwiaHR0cHM6Ly9zYW5kY2FzdGxlLmJsb29tYmVyZy5jb20vcmVnMi9cIixcbiAgICAgICAgbG9naW5Vcmw6IFwiaWZyYW1lL2xvZ2luXCIsXG4gICAgICAgIHJlZ2lzdGVyVXJsOiBcImlmcmFtZS9yZWdpc3RlclwiLFxuICAgICAgICB0ZXJtaW5hbFJlZ2lzdGVyVXJsOiBcImlmcmFtZS90ZXJtaW5hbC1yZWdpc3RlclwiLFxuICAgICAgICBid1JlZ2lzdGVyVXJsOiBcImlmcmFtZS9tYWdhemluZVwiLFxuICAgICAgICBzZXR0aW5nc1VybDogXCJhY2NvdW50XCIsXG4gICAgICAgIHVzZXJJbmZvVXJsOiBcInVzZXItaW5mb1wiLFxuICAgICAgICBic3NvVXJsOiBcImFwaS9sb2dpbi9ibG9vbWJlcmctYXV0aC1yZWRpcmVjdFwiXG4gICAgfSxcbiAgICBwcm9kdWN0aW9uOiB7XG4gICAgICAgIGJhc2VVcmw6IFwiaHR0cHM6Ly9sb2dpbi5ibG9vbWJlcmcuY29tL1wiLFxuICAgICAgICBsb2dpblVybDogXCJpZnJhbWUvbG9naW5cIixcbiAgICAgICAgcmVnaXN0ZXJVcmw6IFwiaWZyYW1lL3JlZ2lzdGVyXCIsXG4gICAgICAgIHRlcm1pbmFsUmVnaXN0ZXJVcmw6IFwiaWZyYW1lL3Rlcm1pbmFsLXJlZ2lzdGVyXCIsXG4gICAgICAgIGJ3UmVnaXN0ZXJVcmw6IFwiaWZyYW1lL21hZ2F6aW5lXCIsXG4gICAgICAgIHNldHRpbmdzVXJsOiBcImFjY291bnRcIixcbiAgICAgICAgdXNlckluZm9Vcmw6IFwidXNlci1pbmZvXCIsXG4gICAgICAgIGJzc29Vcmw6IFwiYXBpL2xvZ2luL2Jsb29tYmVyZy1hdXRoLXJlZGlyZWN0XCJcbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgVVJMU19NQVA6IFVSTFNfTUFQXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBSRUdFWFBfU1RSSVBfU0xBU0hFUyA9IC8oW146XVxcLylcXC8rL2c7XG5cbnZhciBVcmxCdWlsZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTWFwIG9mIHVybHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVcmxCdWlsZGVyKGNvbmZpZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXJsQnVpbGRlcik7XG5cbiAgICAgICAgdmFyIGJhc2VVcmwgPSBjb25maWcuYmFzZVVybDtcblxuICAgICAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5UGFyYW1zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpc0lPU1xuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoVXJsQnVpbGRlciwgW3tcbiAgICAgICAga2V5OiBcIl9jb25zdHJ1Y3RQYXRoXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfY29uc3RydWN0UGF0aChwYXRoLCBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGlzSU9TID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRQYXRoID0gaXNJT1MgPyBwYXRoLnJlcGxhY2UoXCJpZnJhbWVcIiwgXCJcIikgOiBwYXRoO1xuICAgICAgICAgICAgdmFyIHVybCA9IChcIlwiICsgdGhpcy5fYmFzZVVybCArIG5vcm1hbGl6ZWRQYXRoKS5yZXBsYWNlKFJFR0VYUF9TVFJJUF9TTEFTSEVTLCBcIiQxXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFVybEJ1aWxkZXIuYXBwZW5kUXVlcnlQYXJhbXModXJsLCBxdWVyeVBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJnZXRMb2dpblVybFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TG9naW5VcmwocXVlcnlQYXJhbXMsIGlzSU9TKSB7XG4gICAgICAgICAgICB2YXIgbG9naW5VcmwgPSB0aGlzLl9jb25maWcubG9naW5Vcmw7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25zdHJ1Y3RQYXRoKGxvZ2luVXJsLCBxdWVyeVBhcmFtcywgaXNJT1MpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZ2V0UmVnaXN0ZXJVcmxcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJlZ2lzdGVyVXJsKHF1ZXJ5UGFyYW1zLCBpc0lPUykge1xuICAgICAgICAgICAgdmFyIHJlZ2lzdGVyVXJsID0gdGhpcy5fY29uZmlnLnJlZ2lzdGVyVXJsO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0UGF0aChyZWdpc3RlclVybCwgcXVlcnlQYXJhbXMsIGlzSU9TKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImdldFRlcm1pbmFsUmVnaXN0ZXJVcmxcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRlcm1pbmFsUmVnaXN0ZXJVcmwocXVlcnlQYXJhbXMsIGlzSU9TKSB7XG4gICAgICAgICAgICB2YXIgdGVybWluYWxSZWdpc3RlclVybCA9IHRoaXMuX2NvbmZpZy50ZXJtaW5hbFJlZ2lzdGVyVXJsO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0UGF0aCh0ZXJtaW5hbFJlZ2lzdGVyVXJsLCBxdWVyeVBhcmFtcywgaXNJT1MpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZ2V0QndSZWdpc3RlclVybFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QndSZWdpc3RlclVybChxdWVyeVBhcmFtcywgaXNJT1MpIHtcbiAgICAgICAgICAgIHZhciBid1JlZ2lzdGVyVXJsID0gdGhpcy5fY29uZmlnLmJ3UmVnaXN0ZXJVcmw7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25zdHJ1Y3RQYXRoKGJ3UmVnaXN0ZXJVcmwsIHF1ZXJ5UGFyYW1zLCBpc0lPUyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJnZXRTZXR0aW5nc1VybFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2V0dGluZ3NVcmwocXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5nc1VybCA9IHRoaXMuX2NvbmZpZy5zZXR0aW5nc1VybDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN0cnVjdFBhdGgoc2V0dGluZ3NVcmwsIHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImdldFVzZXJJbmZvVXJsXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRVc2VySW5mb1VybChxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgdmFyIHVzZXJJbmZvVXJsID0gdGhpcy5fY29uZmlnLnVzZXJJbmZvVXJsO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0UGF0aCh1c2VySW5mb1VybCwgcXVlcnlQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZ2V0QnNzb1VybFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QnNzb1VybChxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGJzc29VcmwgPSB0aGlzLl9jb25maWcuYnNzb1VybDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN0cnVjdFBhdGgoYnNzb1VybCwgcXVlcnlQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5UGFyYW1zXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICAgICAqL1xuXG4gICAgfV0sIFt7XG4gICAgICAgIGtleTogXCJhcHBlbmRRdWVyeVBhcmFtc1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kUXVlcnlQYXJhbXModXJsLCBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKCFxdWVyeVBhcmFtcyB8fCAodHlwZW9mIHF1ZXJ5UGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocXVlcnlQYXJhbXMpKSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdGVkVXJsID0gdXJsICsgXCI/XCIgKyBVcmxCdWlsZGVyLmNvbnN0cnVjdEtleVZhbHVlUGFpcihwYXJhbXNbMF0sIHF1ZXJ5UGFyYW1zW3BhcmFtc1swXV0pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHBhcmFtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdGVkVXJsICs9IFwiJlwiICsgVXJsQnVpbGRlci5jb25zdHJ1Y3RLZXlWYWx1ZVBhaXIocGFyYW1zW2ldLCBxdWVyeVBhcmFtc1twYXJhbXNbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RlZFVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImNvbnN0cnVjdEtleVZhbHVlUGFpclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29uc3RydWN0S2V5VmFsdWVQYWlyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVXJsQnVpbGRlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXJsQnVpbGRlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbihmdW5jdGlvbiBwb2x5ZmlsbEN1c3RvbUV2ZW50KHcsIGQpIHtcbiAgICB2YXIgdGVzdEV2ZW50ID0gdm9pZCAwOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIHRyeSB7XG4gICAgICAgIHRlc3RFdmVudCA9IG5ldyB3LkN1c3RvbUV2ZW50KFwidGVzdFwiKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGV2dCA9IGQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9O1xuICAgICAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3LkV2ZW50LnByb3RvdHlwZTtcbiAgICAgICAgdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuICAgIH1cbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KCkge1xuICAgIHZhciBzb3VyY2VFbGVtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG4gICAgdmFyIGV2ZW50VHlwZSA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgZGV0YWlsID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcblxuICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZGV0YWlsXG4gICAgfSk7XG5cbiAgICBzb3VyY2VFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBkaXNwYXRjaEV2ZW50O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Q29va2llVmFsdWU7XG5mdW5jdGlvbiBnZXRDb29raWVWYWx1ZShjb29raWVOYW1lKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5jb29raWUubWF0Y2goXCIoXnw7KSA/XCIgKyBjb29raWVOYW1lICsgXCI9KFteOyRdKilcIik7XG4gICAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzJdIDogbnVsbDtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vZGlzdC9SZWdVSUNsaWVudFwiKTtcbiIsIi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBqc29ucDtcblxuLyoqXG4gKiBDYWxsYmFjayBpbmRleC5cbiAqL1xuXG52YXIgY291bnQgPSAwO1xuXG4vKipcbiAqIE5vb3AgZnVuY3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe31cblxuLyoqXG4gKiBKU09OUCBoYW5kbGVyXG4gKlxuICogT3B0aW9uczpcbiAqICAtIHBhcmFtIHtTdHJpbmd9IHFzIHBhcmFtZXRlciAoYGNhbGxiYWNrYClcbiAqICAtIHByZWZpeCB7U3RyaW5nfSBxcyBwYXJhbWV0ZXIgKGBfX2pwYClcbiAqICAtIG5hbWUge1N0cmluZ30gcXMgcGFyYW1ldGVyIChgcHJlZml4YCArIGluY3IpXG4gKiAgLSB0aW1lb3V0IHtOdW1iZXJ9IGhvdyBsb25nIGFmdGVyIGEgdGltZW91dCBlcnJvciBpcyBlbWl0dGVkIChgNjAwMDBgKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBvcHRpb25hbCBvcHRpb25zIC8gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsIGNhbGxiYWNrXG4gKi9cblxuZnVuY3Rpb24ganNvbnAodXJsLCBvcHRzLCBmbil7XG4gICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIG9wdHMpIHtcbiAgICAgICAgZm4gPSBvcHRzO1xuICAgICAgICBvcHRzID0ge307XG4gICAgfVxuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuXG4gICAgdmFyIHByZWZpeCA9IG9wdHMucHJlZml4IHx8ICdfX2pwJztcblxuICAgIC8vIHVzZSB0aGUgY2FsbGJhY2sgbmFtZSB0aGF0IHdhcyBwYXNzZWQgaWYgb25lIHdhcyBwcm92aWRlZC5cbiAgICAvLyBvdGhlcndpc2UgZ2VuZXJhdGUgYSB1bmlxdWUgbmFtZSBieSBpbmNyZW1lbnRpbmcgb3VyIGNvdW50ZXIuXG4gICAgdmFyIGlkID0gb3B0cy5uYW1lIHx8IChwcmVmaXggKyAoY291bnQrKykpO1xuXG4gICAgdmFyIHBhcmFtID0gb3B0cy5wYXJhbSB8fCAnY2FsbGJhY2snO1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbCAhPSBvcHRzLnRpbWVvdXQgPyBvcHRzLnRpbWVvdXQgOiA2MDAwMDtcbiAgICB2YXIgZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0gfHwgZG9jdW1lbnQuaGVhZDtcbiAgICB2YXIgc2NyaXB0O1xuICAgIHZhciB0aW1lcjtcblxuXG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBpZiAoZm4pIGZuKG5ldyBFcnJvcignVGltZW91dCcpKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCgpe1xuICAgICAgICBpZiAoc2NyaXB0LnBhcmVudE5vZGUpIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIHdpbmRvd1tpZF0gPSBub29wO1xuICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsKCl7XG4gICAgICAgIGlmICh3aW5kb3dbaWRdKSB7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3dbaWRdID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgaWYgKGZuKSBmbihudWxsLCBkYXRhKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHFzIGNvbXBvbmVudFxuICAgIHVybCArPSAofnVybC5pbmRleE9mKCc/JykgPyAnJicgOiAnPycpICsgcGFyYW0gKyAnPScgKyBlbmMoaWQpO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKCc/JicsICc/Jyk7XG5cbiAgICAvLyBjcmVhdGUgc2NyaXB0XG4gICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IHVybDtcbiAgICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCB0YXJnZXQpO1xuXG4gICAgcmV0dXJuIGNhbmNlbDtcbn1cbiIsIi8qISBFdmVudHMuanMgKi9cblxuaW1wb3J0IGZpcmUgZnJvbSBcIi4uL3V0aWwvZmlyZVwiO1xuXG5jb25zdCBSRUFEWV9FVkVOVF9OQU1FID0gXCJiYm5hdjpyZWFkeVwiO1xuXG4vKipcbiAqIERpc3BhdGNoZXMgdGhlIFwiYmJuYXY6cmVhZHlcIiBldmVudCBvbiB0aGUgd2luZG93XG4gKiBzbyB0aGF0IGNvbnN1bWVycyBjYW4gbGlzdGVuIGZvciB3aGVuIHRoZSBuYXZpZ2F0aW9uJ3NcbiAqIEFQSSBpcyBhdmFpbGFibGVcbiAqL1xuZnVuY3Rpb24gZW1pdFJlYWR5RXZlbnQoKSB7XG4gICAgd2luZG93W1JFQURZX0VWRU5UX05BTUVdID0gdHJ1ZTtcbiAgICBmaXJlKGRvY3VtZW50LCBSRUFEWV9FVkVOVF9OQU1FKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBlbWl0UmVhZHlFdmVudCB9O1xuIiwiLyohIEJCQ29udGVudExvZ28uanMgKi9cblxuY29uc3QgVEhFTUVfVE9fVVJMID0ge1xuICAgIG1hcmtldHM6IFwiaHR0cDovL3d3dy5ibG9vbWJlcmcuY29tL21hcmtldHNcIixcbiAgICB0ZWNobm9sb2d5OiBcImh0dHA6Ly93d3cuYmxvb21iZXJnLmNvbS90ZWNobm9sb2d5XCIsXG4gICAgcG9saXRpY3M6IFwiaHR0cDovL3d3dy5ibG9vbWJlcmcuY29tL3BvbGl0aWNzXCIsXG4gICAgcHVyc3VpdHM6IFwiaHR0cDovL3d3dy5ibG9vbWJlcmcuY29tL3B1cnN1aXRzXCIsXG4gICAgdmlldzogXCJodHRwczovL3d3dy5ibG9vbWJlcmcuY29tL3ZpZXdcIixcbiAgICBnYWRmbHk6IFwiaHR0cHM6Ly93d3cuYmxvb21iZXJnLmNvbS9nYWRmbHlcIixcbiAgICBidXNpbmVzc3dlZWs6IFwiaHR0cDovL3d3dy5ibG9vbWJlcmcuY29tL2J1c2luZXNzd2Vla1wiXG59O1xuXG5sZXQgY29udGVudExvZ29FbDtcbmxldCBkZWZhdWx0VGhlbWU7XG5cbi8qKiBAY2xhc3MgQkJDb250ZW50TG9nbyAqL1xuY29uc3QgQkJDb250ZW50TG9nbyA9IHtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFJvb3QgZWxlbWVudCBmb3IgQkJDb250ZW50TG9nb1xuICAgICAqL1xuICAgIGluaXRpYWxpemUoZWwpIHtcbiAgICAgICAgY29udGVudExvZ29FbCA9IGVsO1xuICAgICAgICBkZWZhdWx0VGhlbWUgPSBjb250ZW50TG9nb0VsLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGhlbWUgLSBOZXcgdGhlbWUgZm9yIHRoZSBjb250ZW50IGxvZ29cbiAgICAgKi9cbiAgICBzZXRUaGVtZSh0aGVtZSkge1xuICAgICAgICBjb250ZW50TG9nb0VsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgVEhFTUVfVE9fVVJMW3RoZW1lXSB8fCBkZWZhdWx0VGhlbWUpO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQkJDb250ZW50TG9nbztcbiIsIi8qISBOYXYuanMgKi9cblxuaW1wb3J0IFwiLi4vLi4vcG9seWZpbGxzL29iamVjdC9hc3NpZ25cIjtcbmltcG9ydCBcIi4uLy4uL3BvbHlmaWxscy9DdXN0b21FdmVudFwiO1xuXG5pbXBvcnQgbG9jYWxlIGZyb20gXCIuLi8uLi91dGlsL2xvY2FsZVwiO1xuaW1wb3J0IG9uQ2xpY2sgZnJvbSBcIi4uLy4uL3V0aWwvb25DbGlja1wiO1xuaW1wb3J0IG1hdGNoZXMgZnJvbSBcIi4uLy4uL3V0aWwvbWF0Y2hlc1wiO1xuaW1wb3J0IG5vb3AgZnJvbSBcIi4uLy4uL3V0aWwvbm9vcFwiO1xuaW1wb3J0IENzcyBmcm9tIFwiLi4vLi4vdXRpbC9Dc3NcIjtcblxuaW1wb3J0IE5hdlN0YXRlIGZyb20gXCIuLi8uLi9zdGF0ZS9OYXZTdGF0ZVwiO1xuaW1wb3J0IEJCQ29udGVudExvZ28gZnJvbSBcIi4uLy4uL21vZHVsZXMvbG9nby9CQkNvbnRlbnRMb2dvXCI7XG5pbXBvcnQgU3VibWVudSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9uYXZpZ2F0aW9uL1N1Ym1lbnVcIjtcbmltcG9ydCBTb2NpYWwgZnJvbSBcIi4uLy4uL21vZHVsZXMvc29jaWFsL1NvY2lhbFwiO1xuaW1wb3J0IHBlcnNpc3RGb3JDdXJyZW50U3RhdGUgZnJvbSBcIi4uLy4uL3BlcnNpc3QvUGVyc2lzdFwiO1xuXG5jb25zdCBEUk9QRE9XTl9BVFRSID0gXCJkYXRhLWRyb3Bkb3duXCI7XG5cbi8vIFRPRE86IFtKUF0gcmVtb3ZlIHRoaXMgb25jZSBidXNpbmVzcyBhcHAgaXMgYWJsZSB0byBwYXNzIHRoZW1lIHRvIGJiLm5hdlxuY29uc3QgU1VCU0NSSVBUSU9OX1VSTFNfRk9SX1RIRU1FID0ge1xuICAgIFwiYnVzaW5lc3N3ZWVrXCI6IFwiaHR0cDovL2J1c2luZXNzd2Vla21hZy5jb20vbmF2YmFydGV4dGxpbmtcIixcbiAgICBcIm1hcmtldHNcIjogXCJodHRwOi8vYnVzaW5lc3N3ZWVrbWFnLmNvbS9uYXZiYXJtYXJrZXRzdGV4dGxpbmtcIixcbiAgICBcInRlY2hub2xvZ3lcIjogXCJodHRwOi8vYnVzaW5lc3N3ZWVrbWFnLmNvbS9uYXZiYXJ0ZWNodGV4dGxpbmtcIixcbiAgICBcInB1cnN1aXRzXCI6IFwiaHR0cDovL2J1c2luZXNzd2Vla21hZy5jb20vbmF2YmFycHVyc3VpdHN0ZXh0bGlua1wiLFxuICAgIFwicG9saXRpY3NcIjogXCJodHRwOi8vYnVzaW5lc3N3ZWVrbWFnLmNvbS9uYXZiYXJwb2xpdGljc3RleHRsaW5rXCIsXG4gICAgXCJ2aWV3XCI6IFwiaHR0cDovL2J1c2luZXNzd2Vla21hZy5jb20vbmF2YmFyb3BpbmlvbnRleHRsaW5rXCIsXG4gICAgXCJnYWRmbHlcIjogXCJodHRwOi8vYnVzaW5lc3N3ZWVrbWFnLmNvbS9uYXZiYXJvcGluaW9udGV4dGxpbmtcIlxufTtcblxubGV0IHNvY2lhbDtcblxuLyoqIEBjbGFzcyBOYXYgKi9cbmNvbnN0IE5hdiA9IHtcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBkZWZhdWx0IGZ1bmN0aW9uYWxpdHkgdG8gbmF2IGVsZW1lbnRcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYmJOYXZFbCAtIFJvb3Qgbm9kZSBmb3IgYmJOYXZcbiAgICAgKi9cbiAgICBkZWZhdWx0RnVuY3Rpb25hbGl0eShiYk5hdkVsKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWFkbGluZUVsID0gYmJOYXZFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LWhlYWRsaW5lXCIpWzBdO1xuICAgICAgICBjb25zdCBjb250ZW50TG9nb0VsID0gYmJOYXZFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LWNvbnRlbnQtbG9nb19fc2l0ZVwiKVswXTtcbiAgICAgICAgY29uc3QgY29udGVudFNvY2lhbEVsID0gYmJOYXZFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LXNvY2lhbFwiKVswXTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcmllc0VsID0gYmJOYXZFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LWNhdGVnb3JpZXNcIilbMF07XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyRWwgPSBiYk5hdkVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiYi1wcm9ncmVzc19fc3RhdHVzXCIpWzBdO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUVscyA9IGJiTmF2RWwucXVlcnlTZWxlY3RvckFsbChcIi5iYi1uYXYtY2F0ZWdvcmllc19fY2F0ZWdvcnkuaGFzLXN1Ym1lbnVcIik7XG5cbiAgICAgICAgYmJOYXZFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXVzZXItY291bnRyeVwiLCBsb2NhbGUuZ2V0Q291bnRyeSgpKTtcbiAgICAgICAgYmJOYXZFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXVzZXItcmVnaW9uXCIsIGxvY2FsZS5nZXRSZWdpb24oKSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWctdXNlci1zaWduZWQtaW5cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NpZ25JblZpc2libGVJbkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYi1uYXYtZHJvcGRvd24tc2lnbi1pblwiKS5vZmZzZXRIZWlnaHQgPiAwO1xuICAgICAgICAgICAgaWYgKGlzU2lnbkluVmlzaWJsZUluRHJvcGRvd24pIHtcbiAgICAgICAgICAgICAgICBOYXZTdGF0ZS5zZXRGb2N1cyhcInNpZ24gaW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEJCQ29udGVudExvZ28uaW5pdGlhbGl6ZShjb250ZW50TG9nb0VsKTtcblxuICAgICAgICBOYXZTdGF0ZS5pbml0aWFsaXplKGJiTmF2RWwsIHtcblxuICAgICAgICAgICAgaGVhZGxpbmUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEhlYWRsaW5lRWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcblxuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyRWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgQ3NzLnRyYW5zZm9ybShgdHJhbnNsYXRlWCgkeyBwcm9ncmVzcyB9JSlgKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0aGVtZSh2ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gdmVydGljYWw7XG5cbiAgICAgICAgICAgICAgICBCQkNvbnRlbnRMb2dvLnNldFRoZW1lKHRoZW1lKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFtKUF0gMDkvMDUvMTYgcmVtb3ZlIHRoaXMgdHdlYWsgb25jZSBidXNpbmVzcyBhcHAgaXMgYWJsZSB0byBwYXNzIHRoZW1lIHRvIGJiLm5hdlxuICAgICAgICAgICAgICAgIC8vICAgICAgIFtTQ10gMDkvMTkvMTYgSWYgbWFraW5nIGEgY2hhbmdlIGhlcmUsIGFsc28gdXBkYXRlIC9zcmMvc2VydmVyL2ZpeHR1cmUvZ2xvYmFsLmpzb25cbiAgICAgICAgICAgICAgICBpZiAoU1VCU0NSSVBUSU9OX1VSTFNfRk9SX1RIRU1FW3RoZW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJzY3JpYmVMaW5rID0gYmJOYXZFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LXRvdXRzX19zdWJzY3JpYmUtbGlua1wiKVswXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBbU0NdIDExLzA5LzE2IENPSlAgZG9lcyBub3QgaGF2ZSB0aGUgc3Vic2NyaWJlTGluaywgYW5kIGZhaWxpbmcgdGhlIHNldEF0dHJpYnV0ZSBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgLy8gYnJlYWtzIHRoZSB0aGlyZC1sZXZlbCBuYXYgbG9hZGluZy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZUxpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZUxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBTVUJTQ1JJUFRJT05fVVJMU19GT1JfVEhFTUVbdGhlbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZUxpbmsuaW5uZXJIVE1MID0gdGhlbWUgPT09IFwiYnVzaW5lc3N3ZWVrXCIgPyBcIlN1YnNjcmliZVwiIDogXCJTdWJzY3JpYmUgdG8gQnVzaW5lc3N3ZWVrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgTmF2U3RhdGUucnVuSGFuZGxlcnMoYmJOYXZFbCk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBiYk5hdkVsLmdldEF0dHJpYnV0ZShuYW1lKTtcblxuICAgICAgICAgICAgICAgIE5hdlN0YXRlLnNldChuYW1lLnJlcGxhY2UoXCJkYXRhLVwiLCBcIlwiKSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoYmJOYXZFbCwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuXG4gICAgICAgIHBlcnNpc3RGb3JDdXJyZW50U3RhdGUoKTtcblxuICAgICAgICAvLyBbV1ddWzcvMjUvMjAxNl0gbm9vcCBieSBkZWZhdWx0IHNvIHRoYXQgQVBJIGRvZXNuJ3QgdGhyb3cgZXJyb3JcbiAgICAgICAgYmJOYXZFbC5jb25maWd1cmVFeHBlcmllbmNlU2VsZWN0ID0gbm9vcDtcblxuICAgICAgICBiYk5hdkVsLmRpc3BsYXlTb2NpYWxCdXR0b25zID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoIXNvY2lhbCkge1xuICAgICAgICAgICAgICAgIHNvY2lhbCA9IFNvY2lhbC5mcm9tKGNvbnRlbnRTb2NpYWxFbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNvY2lhbC5hY3RpdmF0ZShjb25maWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJiTmF2RWwuaGlkZVNvY2lhbEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc29jaWFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzb2NpYWwuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9uQ2xpY2soYmJOYXZFbCwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoZXModGFyZ2V0LCBcIi5iYi1uYXYtY29udGVudC1sb2dvX19kb3duLWFycm93LCAuYmItbmF2LWxvZ29fX2Fycm93XCIpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlQ2xpY2tMb2dvQXJyb3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhdGVnb3J5RWxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeUVsID0gY2F0ZWdvcnlFbHNbaV07XG4gICAgICAgICAgICBjb25zdCBidWlsZFN1Ym1lbnUgPSBtYWtlQnVpbGRTdWJtZW51KGNhdGVnb3J5RWwpO1xuXG4gICAgICAgICAgICBjYXRlZ29yeUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGJ1aWxkU3VibWVudSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtYWtlQnVpbGRTdWJtZW51KGNhdGVnb3J5RWwpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkU3VibWVudSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtZW51RWwgPSBjYXRlZ29yeUVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiYi1uYXYtc3VibWVudVwiKVswXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtZW51ID0gU3VibWVudS5mcm9tKHN1Ym1lbnVFbCk7XG5cbiAgICAgICAgICAgICAgICBzdWJtZW51LmZldGNoRmlyc3RDYXRlZ29yeSgpO1xuXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBidWlsZFN1Ym1lbnUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYnVpbGRTdWJtZW51O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2tMb2dvQXJyb3coKSB7XG4gICAgICAgICAgICBjb25zdCBkcm9wZG93bklzT3BlbiA9IE5hdlN0YXRlLmZvY3VzSXMoXCJkcm9wZG93blwiKTtcblxuICAgICAgICAgICAgaWYgKGRyb3Bkb3duSXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgICAgIE5hdlN0YXRlLnVuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE5hdlN0YXRlLnNldEZvY3VzKFwiZHJvcGRvd25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKCkge1xuICAgICAgICAgICAgc2V0UG9zaXRpb25PZlVzaW5nKGNhdGVnb3JpZXNFbCwgYmJOYXZFbCk7XG5cbiAgICAgICAgICAgIGJiTmF2RWwuc2V0QXR0cmlidXRlKERST1BET1dOX0FUVFIsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgICAgIGJiTmF2RWwuc2V0QXR0cmlidXRlKERST1BET1dOX0FUVFIsIGZhbHNlKTtcblxuICAgICAgICAgICAgcmVtb3ZlVG9wRnJvbShjYXRlZ29yaWVzRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0UG9zaXRpb25PZlVzaW5nKGVsZW1lbnQxLCBlbGVtZW50Mikge1xuICAgICAgICAgICAgaWYgKCEoZWxlbWVudDEgJiYgZWxlbWVudDIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBOYXZTdGF0ZS5nZXQoXCJtb2RlXCIpID09PSBcImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgID8gMiAvLyBhbGxvdyBmb3IgcHJvZ3Jlc3MgcmVhZGluZyBiYXIgb24gY29udGVudCBwYWdlcy5cbiAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlY3RIZWlnaHQgPSBlbGVtZW50Mi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCByZWN0Qm90dG9tID0gcmVjdEhlaWdodCArIG9mZnNldCArIFwicHhcIjtcblxuICAgICAgICAgICAgZWxlbWVudDEuc3R5bGUudG9wID0gcmVjdEJvdHRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRvcEZyb20oZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidG9wXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjtcbiIsIi8qISBTdWJtZW51LmpzICovXG5cbmltcG9ydCByZXF1ZXN0IGZyb20gXCIuLi8uLi91dGlsL3JlcXVlc3RcIjtcbmltcG9ydCBOYXZTdGF0ZSBmcm9tIFwiLi4vLi4vc3RhdGUvTmF2U3RhdGVcIjtcblxuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcbmNvbnN0IEFDVElWRV9DTEFTUyA9IFwiYWN0aXZlXCI7XG5cbi8qKiBAY2xhc3MgU3VibWVudSAqL1xuY29uc3QgU3VibWVudSA9IHtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBTdWJtZW51XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3VibWVudUVsIC0gUm9vdCBub2RlIG9mIHRoZSBzdWJtZW51XG4gICAgICogQHJldHVybnMge1N1Ym1lbnV9IGluc3RhbmNlIG9mIFN1Ym1lbnVcbiAgICAgKi9cbiAgICBmcm9tKHN1Ym1lbnVFbCkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG5cbiAgICAgICAgY29uc3QgY2F0ZWdvcnlMaW5rRWxzID0gZ2V0Q2F0ZWdvcnlMaW5rcyhzdWJtZW51RWwpO1xuICAgICAgICBjb25zdCBmaXJzdENhdGVnb3J5TGlua0VsID0gY2F0ZWdvcnlMaW5rRWxzWzBdO1xuICAgICAgICBjb25zdCBjYXJkc0NvbnRhaW5lciA9IGdldENhcmRzQ29udGFpbmVyKHN1Ym1lbnVFbCk7XG4gICAgICAgIGNvbnN0IGhvdmVyQ2F0ZWdvcnlIYW5kbGVyID0gbWFrZUhvdmVyQ2F0ZWdvcnlIYW5kbGVyKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBzdWJtZW51RWwsXG4gICAgICAgICAgICBjYXRlZ29yeUxpbmtFbHMsXG4gICAgICAgICAgICBjYXJkc0NvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gY2F0ZWdvcnlMaW5rRWxzLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmtFbHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaG92ZXJDYXRlZ29yeUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIEBsZW5kcyBTdWJtZW51ICovXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogZmV0Y2ggZmlyc3QgY2F0ZWdvcnkgaW4gc3VibWVudSBzbyB0aGF0IHdoZW4gdXNlciBob3ZlcnMsXG4gICAgICAgICAgICAgKiB0aGV5IHdpbGwgc2VlIGNvbnRlbnQgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAbWV0aG9kXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZldGNoRmlyc3RDYXRlZ29yeSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0Q2F0ZWdvcnlMaW5rRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhvdmVyQ2F0ZWdvcnlIYW5kbGVyKHsgdGFyZ2V0OiBmaXJzdENhdGVnb3J5TGlua0VsIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gaXNIb3ZlcmluZ09uTW9iaWxlQnJlYWtwb2ludCgpIHtcbiAgICByZXR1cm4gTmF2U3RhdGUuZm9jdXNJcyhcImRyb3Bkb3duXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRDYXRlZ29yeUxpbmtzKHN1Ym1lbnVFbCkge1xuICAgIHJldHVybiBzdWJtZW51RWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJiLW5hdi1zdWJtZW51X19jYXRlZ29yeS1saW5rXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRDYXJkc0NvbnRhaW5lcihzdWJtZW51RWwpIHtcbiAgICByZXR1cm4gc3VibWVudUVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiYi1uYXYtc3VibWVudV9fY2FyZHNcIilbMF07XG59XG5cbmZ1bmN0aW9uIGdldFN1YnJvdXRlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0LnN1YnJvdXRlO1xufVxuXG5mdW5jdGlvbiBnZXRUcmFja2VyTGFiZWwoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXQudHJhY2tlckxhYmVsO1xufVxuXG5mdW5jdGlvbiBtYXJrQXNBY3RpdmUoY2F0ZWdvcnlMaW5rRWwsIGNhdGVnb3J5TGlua0Vscykge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjYXRlZ29yeUxpbmtFbHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENhdGVnb3J5TGlua0VsID0gY2F0ZWdvcnlMaW5rRWxzW2ldO1xuXG4gICAgICAgIGlmIChjdXJyZW50Q2F0ZWdvcnlMaW5rRWwuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDYXRlZ29yeUxpbmtFbC5jbGFzc0xpc3QucmVtb3ZlKEFDVElWRV9DTEFTUyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNhdGVnb3J5TGlua0VsLmNsYXNzTGlzdC5hZGQoQUNUSVZFX0NMQVNTKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2FyZERhdGEoY2FyZHNDb250YWluZXIsIGRhdGEgPSBcIlwiLCB0cmFja2VyTGFiZWwgPSBcIlwiKSB7XG4gICAgaWYgKCFjYXJkc0NvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICBzZXRUcmFja2VyTGFiZWwoY2FyZHNDb250YWluZXIsIHRyYWNrZXJMYWJlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFRyYWNrZXJMYWJlbChjYXJkc0NvbnRhaW5lciwgdHJhY2tlckxhYmVsKSB7XG4gICAgaWYgKHRyYWNrZXJMYWJlbCkge1xuICAgICAgICBjYXJkc0NvbnRhaW5lci5kYXRhc2V0LnRyYWNrZXJMYWJlbCA9IHRyYWNrZXJMYWJlbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNhcmRzQ29udGFpbmVyLmRhdGFzZXQudHJhY2tlckxhYmVsID0gbnVsbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VIb3ZlckNhdGVnb3J5SGFuZGxlcih7IGRhdGEsIGNhdGVnb3J5TGlua0VscywgY2FyZHNDb250YWluZXIgfSkge1xuICAgIHJldHVybiBmdW5jdGlvbih7IHRhcmdldCB9KSB7XG4gICAgICAgIGlmIChpc0hvdmVyaW5nT25Nb2JpbGVCcmVha3BvaW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtBc0FjdGl2ZSh0YXJnZXQsIGNhdGVnb3J5TGlua0Vscyk7XG5cbiAgICAgICAgY29uc3Qgc3Vicm91dGUgPSBnZXRTdWJyb3V0ZSh0YXJnZXQpO1xuICAgICAgICBjb25zdCB0cmFja2luZ0xhYmVsID0gZ2V0VHJhY2tlckxhYmVsKHRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFzdWJyb3V0ZSkge1xuICAgICAgICAgICAgY2FyZHNDb250YWluZXIuc2V0QXR0cmlidXRlKEhJRERFTiwgSElEREVOKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGFGb3JTdWJyb3V0ZSA9IGRhdGFbc3Vicm91dGVdO1xuXG4gICAgICAgIGlmIChkYXRhRm9yU3Vicm91dGUpIHtcbiAgICAgICAgICAgIHNldENhcmREYXRhKGNhcmRzQ29udGFpbmVyLCBkYXRhRm9yU3Vicm91dGUsIHRyYWNraW5nTGFiZWwpO1xuICAgICAgICAgICAgY2FyZHNDb250YWluZXIucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3Qoc3Vicm91dGUpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDYWNoZSBkYXRhIGZvciBuZXh0IHRpbWVcbiAgICAgICAgICAgICAgICBkYXRhW3N1YnJvdXRlXSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgc2V0Q2FyZERhdGEoY2FyZHNDb250YWluZXIsIHJlc3BvbnNlLmRhdGEsIHRyYWNraW5nTGFiZWwpO1xuICAgICAgICAgICAgICAgIGNhcmRzQ29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBzZXRDYXJkRGF0YShjYXJkc0NvbnRhaW5lcikpO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1lbnU7XG4iLCIvKiEgR29vZ2xlU2VhcmNoLmpzICovXG5cbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gXCIuLi8uLi91dGlsL2xvYWRTY3JpcHRcIjtcblxuY29uc3QgZ29vZ2xlQ3VzdG9tU2VhcmNoID0gXCJodHRwczovL2NzZS5nb29nbGUuY29tL2NzZS5qcz9jeD0wMTYzMjkzMDU2NTMxMzA2MDQ5ODg6Y21tdHlrcWN6YmVcIjtcblxubGV0IGxvYWRlZCA9IGZhbHNlO1xuXG4vKiogQGNsYXNzIEdvb2dsZVNlYXJjaCAqL1xuY29uc3QgR29vZ2xlU2VhcmNoID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgZ29vZ2xlIHNlYXJjaCBpbnRvIHRoZSBwYWdlLlxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBsb2FkKCkge1xuICAgICAgICBpZiAobG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkU2NyaXB0KGdvb2dsZUN1c3RvbVNlYXJjaCk7XG4gICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHb29nbGVTZWFyY2g7XG4iLCIvKiEgU29jaWFsLmpzICovXG5cbmltcG9ydCBvbkNsaWNrIGZyb20gXCIuLi8uLi91dGlsL29uQ2xpY2tcIjtcbmltcG9ydCBtYXRjaGVzIGZyb20gXCIuLi8uLi91dGlsL21hdGNoZXNcIjtcblxuaW1wb3J0IGZhY2Vib29rIGZyb20gXCIuL25ldHdvcmtzL0ZhY2Vib29rLmpzXCI7XG5pbXBvcnQgdHdpdHRlciBmcm9tIFwiLi9uZXR3b3Jrcy9Ud2l0dGVyLmpzXCI7XG5pbXBvcnQgZW1haWwgZnJvbSBcIi4vbmV0d29ya3MvRW1haWwuanNcIjtcbmltcG9ydCBnb29nbGUgZnJvbSBcIi4vbmV0d29ya3MvR29vZ2xlLmpzXCI7XG5pbXBvcnQgbGlua2VkaW4gZnJvbSBcIi4vbmV0d29ya3MvTGlua2VkaW4uanNcIjtcbmltcG9ydCByZWRkaXQgZnJvbSBcIi4vbmV0d29ya3MvUmVkZGl0LmpzXCI7XG5pbXBvcnQgd2hhdHNhcHAgZnJvbSBcIi4vbmV0d29ya3MvV2hhdHNhcHAuanNcIjtcblxuY29uc3Qgc29jaWFsTmV0d29ya3MgPSB7XG4gICAgZmFjZWJvb2ssXG4gICAgdHdpdHRlcixcbiAgICBlbWFpbCxcbiAgICBnb29nbGUsXG4gICAgbGlua2VkaW4sXG4gICAgcmVkZGl0LFxuICAgIHdoYXRzYXBwXG59O1xuXG5jb25zdCBNSU5JTVVNX0JVVFRPTlMgPSAyO1xuY29uc3QgSVNfT1BFTkVEX0FUVFIgPSBcImRhdGEtb3BlbmVkXCI7XG5cbi8qKiBAY2xhc3MgU29jaWFsICovXG5jb25zdCBTb2NpYWwgPSB7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgU29jaWFsXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBSb290IG5vZGUgb2YgdGhlIHNvY2lhbCBidXR0b25zXG4gICAgICogQHJldHVybnMge1NvY2lhbH0gaW5zdGFuY2Ugb2YgU29jaWFsXG4gICAgICovXG4gICAgZnJvbShlbCkge1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBzb2NpYWxUZW1wbGF0ZUhUTUwoKTtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzT3BlbmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNvY2lhbEVsOiBlbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbmF2LXNvY2lhbFwiKVswXVxuICAgICAgICB9O1xuXG4gICAgICAgIG9uQ2xpY2soZWwsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVzKGV2ZW50LnRhcmdldCwgXCIuYmItbmF2LXNvY2lhbF9fbW9yZS1pY29uXCIpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0b2dnbGVTaG93TW9yZShzdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKiBAbGVuZHMgU29jaWFsICovXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWN0aXZhdGUvdXBkYXRlIHNvY2lhbCBidXR0b25zXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQG1ldGhvZFxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZy50aXRsZSAtIFRpdGxlIHRvIHNoYXJlXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnLnVybCAtIFVybCB0byBzaGFyZVxuICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3RbXX0gY29uZmlnLm5ldHdvcmtzIC0gTmV0d29ya3MgeW91IHdhbnQgdG8gZGlzcGxheVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhY3RpdmF0ZShjb25maWcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5ldHdvcmtzID0gW10gfSA9IGNvbmZpZztcblxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3Jrcy5sZW5ndGggPCBNSU5JTVVNX0JVVFRPTlMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgbXVzdCBiZSBhdCBsZWFzdCB0d28gc29jaWFsIGJ1dHRvbnNcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhdGUuYnV0dG9ucyA9IGNvbmZpZ1RvQnV0dG9ucyhjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlQnV0dG9ucyhzdGF0ZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGRlYWN0aXZhdGUgc29jaWFsIGJ1dHRvbnNcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAbWV0aG9kXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuYnV0dG9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIHN0YXRlLmlzT3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b25zKHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHRvZ2dsZVNob3dNb3JlKHN0YXRlKSB7XG4gICAgc3RhdGUuaXNPcGVuZWQgPSAhc3RhdGUuaXNPcGVuZWQ7XG5cbiAgICB1cGRhdGVTaG93TW9yZShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNob3dNb3JlKHsgaXNPcGVuZWQsIHNvY2lhbEVsIH0pIHtcbiAgICBpZiAoaXNPcGVuZWQpIHtcbiAgICAgICAgc29jaWFsRWwuc2V0QXR0cmlidXRlKElTX09QRU5FRF9BVFRSLCBcInRydWVcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzb2NpYWxFbC5yZW1vdmVBdHRyaWJ1dGUoSVNfT1BFTkVEX0FUVFIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVCdXR0b25zKHsgc29jaWFsRWwsIGJ1dHRvbnMgfSkge1xuICAgIHNvY2lhbEVsLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJiLW5hdi1zb2NpYWxfX2J1dHRvbnNcIj5cbiAgICAgICAgICAgICR7IGJ1dHRvbnMubWFwKGJ1dHRvbkhUTUwpLmpvaW4oXCJcIikgfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICAkeyBtb3JlQnV0dG9uSFRNTChidXR0b25zKSB9XG4gICAgICAgICR7IHNlcGFyYXRvckhUTUwoYnV0dG9ucykgfVxuICAgIGA7XG59XG5cbmZ1bmN0aW9uIGJ1dHRvbkhUTUwoYnV0dG9uKSB7XG4gICAgY29uc3QgeyB0YXJnZXQsIG9uY2xpY2sgfSA9IGJ1dHRvbi5wb3B1cDtcblxuICAgIGNvbnN0IHRhcmdldEF0dHJpYnV0ZSA9IHRhcmdldCA/IGB0YXJnZXQ9XCIkeyB0YXJnZXQgfVwiYCA6IFwiXCI7XG4gICAgY29uc3Qgb25jbGlja0F0dHJpYnV0ZSA9IG9uY2xpY2sgPyBgb25jbGljaz1cIiR7IG9uY2xpY2sgfVwiYCA6IFwiXCI7XG4gICAgY29uc3QgYWN0aW9uQXR0cmlidXRlID0gYnV0dG9uLmFjdGlvbiA/IGBhY3Rpb249XCIkeyBidXR0b24uYWN0aW9uIH1cImAgOiBcIlwiO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGEgY2xhc3M9XCJiYi1uYXYtc29jaWFsX19saW5rIGJiLW5hdi1zb2NpYWxfX2xpbmstLSR7IGJ1dHRvbi5uYW1lIH1cIlxuICAgICAgICAgICAgaHJlZj1cIiR7IGJ1dHRvbi5saW5rIH1cIlxuICAgICAgICAgICAgJHsgdGFyZ2V0QXR0cmlidXRlIH1cbiAgICAgICAgICAgICR7IG9uY2xpY2tBdHRyaWJ1dGUgfVxuICAgICAgICAgICAgJHsgYWN0aW9uQXR0cmlidXRlIH1cbiAgICAgICAgICAgIHJlbD1cIm5vZm9sbG93XCJcbiAgICAgICAgICAgIGRhdGEtdHJhY2tlci1sYWJlbD1cIiR7IGJ1dHRvbi5uYW1lIH1cIlxuICAgICAgICAgICAgZGF0YS10cmFja2VyLWFjdGlvbj1cImNsaWNrXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgJHsgYnV0dG9uLmRpc3BsYXkgfVxuICAgICAgICA8L2E+XG4gICAgYDtcbn1cblxuZnVuY3Rpb24gbW9yZUJ1dHRvbkhUTUwoYnV0dG9ucykge1xuICAgIGlmIChidXR0b25zLmxlbmd0aCA8PSBNSU5JTVVNX0JVVFRPTlMpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJiLW5hdi1zb2NpYWxfX21vcmVcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJiLW5hdi1zb2NpYWxfX21vcmUtaWNvblwiXG4gICAgICAgICAgICAgICAgZGF0YS10cmFja2VyLWxhYmVsPVwibW9yZVwiXG4gICAgICAgICAgICAgICAgZGF0YS10cmFja2VyLWFjdGlvbj1cImNsaWNrXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5mdW5jdGlvbiBzZXBhcmF0b3JIVE1MKGJ1dHRvbnMpIHtcbiAgICBpZiAoIWJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImJiLW5hdi1zb2NpYWxfX2NvbnRlbnQtc2VwYXJhdG9yXFxcIj48L2Rpdj5cIjtcbn1cblxuZnVuY3Rpb24gc29jaWFsVGVtcGxhdGVIVE1MKCkge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYi1uYXYtc29jaWFsXCIgZGF0YS10cmFja2VyLWxhYmVsPVwic29jaWFsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmItbmF2LXNvY2lhbF9fYnV0dG9uc1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmZ1bmN0aW9uIHBvcHVwRmFjdG9yeShuYW1lLCBwb3B1cCkge1xuICAgIGlmICghcG9wdXApIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gcG9wdXA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IGBiYi1zb2NpYWwtcG9wdXAtLSR7IG5hbWUgfWAsXG4gICAgICAgIG9uY2xpY2s6IGB3aW5kb3cub3Blbih0aGlzLmhyZWYsICdiYi1zb2NpYWwtcG9wdXAtLSR7IG5hbWUgfScsICdtZW51YmFyPW5vLHRvb2xiYXI9bm8scmVzaXphYmxlPXllcyxzY3JvbGxiYXJzPXllcyx3aWR0aD0keyB3aWR0aCB9LGhlaWdodD0keyBoZWlnaHQgfScpOyByZXR1cm4gZmFsc2U7YFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ1RvQnV0dG9ucyh7IHRpdGxlLCB1cmwsIG5ldHdvcmtzIH0pIHtcbiAgICByZXR1cm4gbmV0d29ya3MubWFwKG5ldHdvcmsgPT4ge1xuICAgICAgICBjb25zdCBuZXR3b3JrQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7IHRpdGxlLCB1cmwgfSwgbmV0d29yayk7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZ2V0U29jaWFsTGluaywgcG9wdXAsIGFjdGlvbiwgZGlzcGxheSB9ID0gc29jaWFsTmV0d29ya3NbbmV0d29yay5uYW1lXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGxpbms6IGdldFNvY2lhbExpbmsobmV0d29ya0NvbmZpZyksXG4gICAgICAgICAgICBwb3B1cDogcG9wdXBGYWN0b3J5KG5hbWUsIHBvcHVwKSxcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIGRpc3BsYXlcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU29jaWFsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBuYW1lOiBcImVtYWlsXCIsXG4gICAgZGlzcGxheTogXCJFLW1haWxcIixcbiAgICBnZXRTb2NpYWxMaW5rKHsgYm9keSwgdGl0bGUgfSkge1xuICAgICAgICBjb25zdCBib2R5RW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudChib2R5KTtcbiAgICAgICAgY29uc3QgdGl0bGVFbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcblxuICAgICAgICByZXR1cm4gYG1haWx0bzo/Ym9keT0keyBib2R5RW5jb2RlZCB9JnN1YmplY3Q9JHsgdGl0bGVFbmNvZGVkIH1gO1xuICAgIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZTogXCJmYWNlYm9va1wiLFxuICAgIGRpc3BsYXk6IFwiU2hhcmUgb24gRmFjZWJvb2tcIixcbiAgICBnZXRTb2NpYWxMaW5rKHsgdXJsIH0pIHtcbiAgICAgICAgY29uc3QgdXJsRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgICAgIHJldHVybiBgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0keyB1cmxFbmNvZGVkIH1gO1xuICAgIH0sXG4gICAgcG9wdXA6IHtcbiAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBuYW1lOiBcImdvb2dsZVwiLFxuICAgIGRpc3BsYXk6IFwiU2hhcmUgb24gR29vZ2xlK1wiLFxuICAgIGdldFNvY2lhbExpbmsoeyB1cmwgfSkge1xuICAgICAgICBjb25zdCB1cmxFbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICAgICAgcmV0dXJuIGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHsgdXJsRW5jb2RlZCB9YDtcbiAgICB9LFxuICAgIHBvcHVwOiB7XG4gICAgICAgIHdpZHRoOiA1MjAsXG4gICAgICAgIGhlaWdodDogNjAwXG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZTogXCJsaW5rZWRpblwiLFxuICAgIGRpc3BsYXk6IFwiU2hhcmUgb24gTGlua2VkaW5cIixcbiAgICBnZXRTb2NpYWxMaW5rKHsgdGl0bGUsIHVybCB9KSB7XG4gICAgICAgIGNvbnN0IHRpdGxlRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgICAgIGNvbnN0IHVybEVuY29kZWQgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcblxuICAgICAgICByZXR1cm4gYGh0dHA6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT90aXRsZT0keyB0aXRsZUVuY29kZWQgfSZ1cmw9JHsgdXJsRW5jb2RlZCB9YDtcbiAgICB9LFxuICAgIHBvcHVwOiB7XG4gICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgIGhlaWdodDogNTI4XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZTogXCJyZWRkaXRcIixcbiAgICBkaXNwbGF5OiBcIlNoYXJlIG9uIFJlZGRpdFwiLFxuICAgIGdldFNvY2lhbExpbmsoeyB0aXRsZSwgdXJsIH0pIHtcbiAgICAgICAgY29uc3QgdGl0bGVFbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICAgICAgY29uc3QgdXJsRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgICAgIHJldHVybiBgaHR0cDovL3JlZGRpdC5jb20vc3VibWl0P3RpdGxlPSR7IHRpdGxlRW5jb2RlZCB9JnVybD0keyB1cmxFbmNvZGVkIH1gO1xuICAgIH0sXG4gICAgcG9wdXA6IHtcbiAgICAgICAgd2lkdGg6IDUyMCxcbiAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBuYW1lOiBcInR3aXR0ZXJcIixcbiAgICBkaXNwbGF5OiBcIlNoYXJlIG9uIFR3aXR0ZXJcIixcbiAgICBnZXRTb2NpYWxMaW5rKHsgdXJsLCB0ZXh0LCBoYW5kbGUgfSkge1xuICAgICAgICBmdW5jdGlvbiB0cnVuY2F0ZWRUZXh0KCkge1xuICAgICAgICAgICAgY29uc3QgVFdFRVRfTEVOR1RIID0gMTQwO1xuICAgICAgICAgICAgY29uc3QgU0hPUlRFTkVEX1VSTF9MRU5HVEggPSAyMztcbiAgICAgICAgICAgIGNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcbiAgICAgICAgICAgIGNvbnN0IFJFQVNPTkFCTEVfVEVYVF9QQURESU5HID0gNjtcbiAgICAgICAgICAgIGNvbnN0IFRPT19CSUdfVE9fRklUX1VTRUZVTF9URVhUID0gVFdFRVRfTEVOR1RIIC0gU0hPUlRFTkVEX1VSTF9MRU5HVEggLSBFTExJUFNJUy5sZW5ndGggLSBSRUFTT05BQkxFX1RFWFRfUEFERElORztcblxuICAgICAgICAgICAgbGV0IGJyYW5kaW5nQ29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAgICAgICAgIGJyYW5kaW5nQ29udGVudCArPSBgIHZpYSBAJHsgaGFuZGxlIH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYnJhbmRpbmdDb250ZW50Lmxlbmd0aCA+PSBUT09fQklHX1RPX0ZJVF9VU0VGVUxfVEVYVCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXhUZXh0TGVuZ3RoID0gVFdFRVRfTEVOR1RIIC0gU0hPUlRFTkVEX1VSTF9MRU5HVEggLSBFTExJUFNJUy5sZW5ndGggLSBicmFuZGluZ0NvbnRlbnQubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiBtYXhUZXh0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyKDAsIG1heFRleHRMZW5ndGgpICsgRUxMSVBTSVM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXJsRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgICAgICBjb25zdCB0ZXh0RW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCh0cnVuY2F0ZWRUZXh0KCkpO1xuICAgICAgICBjb25zdCB2aWFFbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KGhhbmRsZSk7XG5cbiAgICAgICAgcmV0dXJuIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHsgdXJsRW5jb2RlZCB9JnRleHQ9JHsgdGV4dEVuY29kZWQgfSZ2aWE9JHsgdmlhRW5jb2RlZCB9YDtcbiAgICB9LFxuICAgIHBvcHVwOiB7XG4gICAgICAgIHdpZHRoOiA2MjYsXG4gICAgICAgIGhlaWdodDogNDM4XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZTogXCJ3aGF0c2FwcFwiLFxuICAgIGRpc3BsYXk6IFwiU2hhcmUgb24gV2hhdHNBcHBcIixcbiAgICBnZXRTb2NpYWxMaW5rKHsgdGl0bGUsIHVybCB9KSB7XG4gICAgICAgIGNvbnN0IHRleHRFbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KGAkeyB0aXRsZSB9ICR7IHVybCB9YCk7XG5cbiAgICAgICAgcmV0dXJuIGB3aGF0c2FwcDovL3NlbmQ/dGV4dD0keyB0ZXh0RW5jb2RlZCB9YDtcbiAgICB9LFxuICAgIHBvcHVwOiB7XG4gICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgIGhlaWdodDogNjAwXG4gICAgfSxcbiAgICBhY3Rpb246IFwic2hhcmUvd2hhdHNhcHAvc2hhcmVcIlxufTtcbiIsIi8qISBBdHRlbmRhbmNlQ2hlY2tlci5qcyAqL1xuXG5pbXBvcnQgQ29va2llcyBmcm9tIFwiLi4vLi4vdXRpbC9jb29raWVzXCI7XG5cbmNvbnN0IEFMUkVBRFlfV0FUQ0hFRF9DT09LSUUgPSBcImJiLW1pbmktcGxheWVyLXZpZXdlZFwiO1xuXG4vKipcbiAqIEB0eXBlIHtvYmplY3R9IEF0dGVuZGFuY2VDaGVja2VyXG4gKi9cbmNvbnN0IEF0dGVuZGFuY2VDaGVja2VyID0ge1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGFscmVhZHlXYXRjaGVkKCkge1xuICAgICAgICByZXR1cm4gQ29va2llcy5nZXQoQUxSRUFEWV9XQVRDSEVEX0NPT0tJRSkgPT09IFwidHJ1ZVwiO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGNvb2tpZSB0aGF0IGV4cGlyZXMgYXQgRU9EIGFuZCBtYXJrcyBtaW5pcGxheWVyIGNvbnRlbnQgYXMgXCJ3YXRjaGVkXCJcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgbWFya0FzV2F0Y2hlZCgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZW5kT2ZEYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBlbmRPZkRheS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuXG4gICAgICAgIGNvbnN0IG1heEFnZVNlY29uZHMgPSBNYXRoLmFicyhlbmRPZkRheSAtIG5vdykgLyAxMDAwO1xuICAgICAgICBDb29raWVzLnNldChBTFJFQURZX1dBVENIRURfQ09PS0lFLCBcInRydWVcIiwgeyBtYXhBZ2U6IG1heEFnZVNlY29uZHMgfSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kYW5jZUNoZWNrZXI7XG4iLCIvKiEgQkJDb2pwTWluaVBMYXllci5qcyAqL1xuXG5pbXBvcnQgSHRtbCBmcm9tIFwiLi4vLi4vdXRpbC9IdG1sXCI7XG5pbXBvcnQgQXR0ZW5kYW5jZUNoZWNrZXIgZnJvbSBcIi4vQXR0ZW5kYW5jZUNoZWNrZXJcIjtcbmltcG9ydCBvbkNsaWNrIGZyb20gXCIuLi8uLi91dGlsL29uQ2xpY2tcIjtcbmltcG9ydCBjb250YWluZWRJbiBmcm9tIFwiLi4vLi4vdXRpbC9jb250YWluZWRJblwiO1xuXG5jb25zdCBQTEFZRVJfQ09ORklHID0ge1xuICAgIFwiaWRcIjogXCJBU0lBX01JTklcIixcbiAgICBcImxpdmVcIjogdHJ1ZSxcbiAgICBcImF1dG9wbGF5XCI6IGZhbHNlLFxuICAgIFwiaHRtbENoaWxkSWRcIjogXCJiYi1taW5pLXBsYXllcl9fZW1iZWRcIixcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiA1NyxcbiAgICBcImNvbXNjb3JlX25zX3NpdGVcIjogXCJibG9vbWJlcmctanBcIixcbiAgICBcImNvbXNjb3JlX3BhZ2VfbGV2ZWxfdGFnc1wiOiB7XG4gICAgICAgIFwiYmJfYnJhbmRcIjogXCJiYml6LWpwXCIsXG4gICAgICAgIFwiYnNzX2NvbnRfcGxheVwiOiAwLFxuICAgICAgICBcImJiX3JlZ2lvblwiOiBcIkFQQUNcIlxuICAgIH0sXG4gICAgXCJ1c2VfZ29vZ2xlX3RhZ19tYW5hZ2VyXCI6IHRydWUsXG4gICAgXCJsb2dfZGVidWdcIjogZmFsc2UsXG4gICAgXCJjb250cm9sc1wiOiBmYWxzZSxcbiAgICBcInVpX2NvbnRyb2xzX3BvcG91dFwiOiBmYWxzZSxcbiAgICBcInVpX2NvbnRyb2xzX2Z1bGxzY3JlZW5cIjogZmFsc2Vcbn07XG5cbmNvbnN0IEFTSUFfRVhQRVJJRU5DRV9LRVkgPSBcIkFTSUFNSU5JXCI7XG5jb25zdCBQTEFZQkFDS19MSU1JVCA9IDUgKiA2MDAwMDtcbmNvbnN0IElQQURfTEFORFNDQVBFX01FRElBID0gXCJzY3JlZW4gYW5kIChtYXgtZGV2aWNlLXdpZHRoOiAxMDIwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIjtcbmNvbnN0IFNNQUxMX0RFU0tUT1BfTUVESUEgPSBcInNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyMHB4KVwiO1xuXG5jb25zdCBCQkNvanBNaW5pUExheWVyID0ge1xuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRCZVZpc2libGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzaG93KCkge30sXG4gICAgICAgICAgICAgICAgaGlkZSgpIHt9LFxuICAgICAgICAgICAgICAgIHBhdXNlKCkge31cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmJNaW5pUGxheWVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJiLW1pbmktcGxheWVyXCIpWzBdO1xuXG4gICAgICAgIGlmICghYmJNaW5pUGxheWVyRWwpIHtcbiAgICAgICAgICAgIGJiTWluaVBsYXllckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJiLW1pbmktcGxheWVyXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiYk1pbmlQbGF5ZXJFbCk7XG4gICAgICAgIH1cblxuICAgICAgICBiYk1pbmlQbGF5ZXJFbC5pbm5lckhUTUwgPSBtaW5pUGxheWVySFRNTCgpO1xuXG4gICAgICAgIG9uQ2xpY2soYmJNaW5pUGxheWVyRWwsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVkSW4odGFyZ2V0LCBcIi5iYi1taW5pcGxheWVyX192aWRlb1wiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lUGxheShldmVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtaW5pcGxheWVyUmVhZHlcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTWluaVBsYXllclJlYWR5KGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iYk1pbmlQbGF5ZXJFbCA9IGJiTWluaVBsYXllckVsO1xuXG4gICAgICAgIHRoaXMucmVhZHkoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2hvdzogdGhpcy5zaG93LmJpbmQodGhpcyksXG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHBhdXNlOiB0aGlzLnBhdXNlLmJpbmQodGhpcylcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHRoaXMubWluaVBsYXllckVsID0gdGhpcy5iYk1pbmlQbGF5ZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbWluaXBsYXllclwiKVswXTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUGxheWVyKFBMQVlFUl9DT05GSUcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wYXVzZS5iaW5kKHRoaXMpLCBQTEFZQkFDS19MSU1JVCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVBhdXNlZEluTWFya3VwKCkge1xuICAgICAgICBIdG1sLnRvZ2dsZUF0dHJpYnV0ZSh0aGlzLm1pbmlQbGF5ZXJFbCwgXCJwYXVzZWRcIiwgdGhpcy5wYXVzZWQpO1xuICAgIH0sXG5cbiAgICByZXN1bWVQbGF5KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVQYXVzZWRJbk1hcmt1cCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuYmJNaW5pUGxheWVyRWwuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgfSxcblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5iYk1pbmlQbGF5ZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSxcblxuICAgIGluaXRpYWxpemVQbGF5ZXIoY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBsYXllciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnBsYXllciA9IGV2ZW50ID8gZXZlbnQuZGV0YWlsLmJwbGF5ZXIgOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgQlBsYXllciA9IGJwbGF5ZXIgfHwgd2luZG93LkJQbGF5ZXI7XG4gICAgICAgICAgICBjb25zdCB2aWRlb0VsID0gdGhpcy5iYk1pbmlQbGF5ZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYmItbWluaXBsYXllcl9fdmlkZW9cIilbMF07XG5cbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gQlBsYXllci5jcmVhdGUoXG4gICAgICAgICAgICAgICAgdmlkZW9FbCxcbiAgICAgICAgICAgICAgICBjb25maWcsIHtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1pbmlQbGF5ZXJSZWFkeSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJCUGxheWVyTG9hZGVkXCIsIGNyZWF0ZVBsYXllcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHdpbmRvdy5CUGxheWVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBicGxheWVyU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgYnBsYXllclNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYCR7IHByb2Nlc3MuZW52LlZJREVPX1BMQVlFUl9TUkMgfS9icGxheWVyLmpzYCk7XG4gICAgICAgIGJwbGF5ZXJTY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKTtcbiAgICAgICAgYnBsYXllclNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJhc3luY1wiLCB0cnVlKTtcbiAgICAgICAgYnBsYXllclNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIiwgdHJ1ZSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJCUGxheWVyTG9hZGVkXCIsIGNyZWF0ZVBsYXllcik7XG5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChicGxheWVyU2NyaXB0KTtcbiAgICAgICAgYnBsYXllclNjcmlwdCA9IG51bGw7XG4gICAgfSxcblxuICAgIHBhdXNlKCkge1xuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVQYXVzZWRJbk1hcmt1cCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG91bGRCZVZpc2libGUoKSB7XG4gICAgICAgIGNvbnN0IGlzSVBhZCA9IHdpbmRvdy5tYXRjaE1lZGlhKElQQURfTEFORFNDQVBFX01FRElBKS5tYXRjaGVzO1xuICAgICAgICBjb25zdCBpc0xlc3NUaGFuU21hbGxEZXNrdG9wID0gd2luZG93Lm1hdGNoTWVkaWEoU01BTExfREVTS1RPUF9NRURJQSkubWF0Y2hlcztcblxuICAgICAgICByZXR1cm4gIShpc0lQYWQgfHwgaXNMZXNzVGhhblNtYWxsRGVza3RvcCk7XG4gICAgfSxcblxuICAgIGdldFZpZGVvUGxheWVySW5zdGFuY2UoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cudmlkZW9qcy5nZXRQbGF5ZXJzKClbQVNJQV9FWFBFUklFTkNFX0tFWV07XG4gICAgfSxcblxuICAgIG9uTWluaVBsYXllclJlYWR5KCkge1xuICAgICAgICBpZiAoQXR0ZW5kYW5jZUNoZWNrZXIuYWxyZWFkeVdhdGNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgQXR0ZW5kYW5jZUNoZWNrZXIubWFya0FzV2F0Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gbWluaVBsYXllckhUTUwoKSB7XG4gICAgLy8gW1dXXVs3LzIxLzIwMTZdIHNlZSBjb21tZW50IGluIEJCR2xvYmFsTWluaVBsYXllciBhYm91dCBiYi1taW5pLXBsYXllciBjbGFzc1xuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYmItbWluaXBsYXllciBiYi1taW5pLXBsYXllclwiXG4gICAgICAgICAgICBkYXRhLXRyYWNrZXItY2F0ZWdvcnk9XCJyZWNpcmNcIlxuICAgICAgICAgICAgZGF0YS10cmFja2VyLWV2ZW50cz1cImNsaWNrXCJcbiAgICAgICAgICAgIGRhdGEtdHJhY2tlci1sYWJlbD1cIm1pbmlfcGxheWVyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiLW1pbmlwbGF5ZXJfX3ZpZGVvXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmItbWluaXBsYXllcl9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5ibG9vbWJlcmcuY28uanAvbGl2ZS9hc2lhXCIgZGF0YS10cmFja2VyLWxhYmVsPVwibGl2ZV90dlwiIFxuICAgICAgICAgICAgICAgICAgICBkYXRhLXRyYWNrZXItYWN0aW9uPVwiY2xpY2tcIiBjbGFzcz1cImJiLW1pbmlwbGF5ZXJfX2xpdmUtdHZcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYi1taW5pcGxheWVyX19saW5rXCI+44Op44Kk44OWPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuICAgIGA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJCQ29qcE1pbmlQTGF5ZXI7XG4iLCIvKiEgTG9hZE1pbmlQbGF5ZXIuanMgKi9cblxuLypcbiAqIFtXV10gWzcvMTgvMjAxNl0gVE9ETzogaHRtbCBpbXBvcnRpbmcgdGhlIG1pbmlwbGF5ZXIgaXMgZGVwcmVjYXRlZC5cbiAqICBEZWxldGUgdGhpcyBmaWxlIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cbiAqL1xuXG5pbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi4vLi4vdXRpbC9yZXF1ZXN0XCI7XG5pbXBvcnQgSHRtbCBmcm9tIFwiLi4vLi4vdXRpbC9IdG1sXCI7XG5cbmNvbnN0IExvYWRNaW5pUGxheWVyID0ge1xuXG4gICAgaHRtbEltcG9ydCgpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzSW1wb3J0cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBbV1ddWzcvMjEvMjAxNl0gc2V0VGltZW91dCB0byBndWFyYW50ZWUgYXN5bmNcbiAgICAgICAgc2V0VGltZW91dChsb2FkQnVuZGxlKTtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIGxvYWRCdW5kbGUoKSB7XG4gICAgY29uc3QgbWluaXBsYXllckxpbmtFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naW1wb3J0J11baHJlZiQ9Jy92aWRlby9taW5pcGxheWVyL2J1bmRsZSddXCIpO1xuXG4gICAgaWYgKCFtaW5pcGxheWVyTGlua0VsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXF1ZXN0KG1pbmlwbGF5ZXJMaW5rRWwuaHJlZilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgICBjb3B5Tm9kZXNJbk9yZGVyRnJvbSh0bXApO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNJbXBvcnRzKCkge1xuICAgIHJldHVybiBcImltcG9ydFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xufVxuXG4vKiBbV1ddWzcvMjAvMjAxNl0gUmVjdXJzaXZlbHkgY29weSBub2RlcyBmcm9tIG9uZSBub2RlIHRvIGRvY3VtZW50LiBXZSBoYXZlIHRvIGRvIHRoaXNcbiAqIHdheSBiZWNhdXNlIHRoZSBzY3JpcHQgdGFncyBoYXZlIHRvIGJlIGxvYWRlZCBpbiBvcmRlci4gVGhlcmUgc2hvdWxkIG9ubHkgYmUgMy02IG5vZGVzXG4gKiBpbiBtaW5pcGxheWVyIGJ1bmRsZSBzbyB0aGUgcGVyZm9ybWFuY2UgY29zdCBzaG91bGQgYmUgcmVsYXRpdmVseSBsb3cuIFdlIHdhbnQgdG8gc3RvcFxuICogaHRtbCBpbXBvcnRpbmcgdGhlIG1pbmkgcGxheWVyIGJ1bmRsZSBhcyBzb29uIGFzIHBvc3NpYmxlIGFuZCBkZWxldGUgdGhpcyBjb2RlLlxuICovXG5mdW5jdGlvbiBjb3B5Tm9kZXNJbk9yZGVyRnJvbShub2RlKSB7XG4gICAgaWYgKCFub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG5cbiAgICBpZiAoZmlyc3RDaGlsZC50YWdOYW1lICE9PSBcIlNDUklQVFwiKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmlyc3RDaGlsZC5jbG9uZU5vZGUoKSk7XG4gICAgICAgIGNvcHlOb2Rlc0luT3JkZXJGcm9tKG5vZGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzRGF0YUV4Y2x1ZGUgPSBmaXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImRhdGEtZXhjbHVkZVwiKTtcbiAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBzY3JpcHQuc3JjID0gZmlyc3RDaGlsZC5zcmM7XG5cbiAgICBpZiAoaGFzRGF0YUV4Y2x1ZGUpIHtcbiAgICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtZXhjbHVkZVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBIdG1sLnRvZ2dsZUF0dHJpYnV0ZShzY3JpcHQsIFwiYXN5bmNcIiwgZmlyc3RDaGlsZC5oYXNBdHRyaWJ1dGUoXCJhc3luY1wiKSk7XG5cbiAgICAvKiBbV1ddWzcvMjAvMjAxNl0gYmxvY2sgYWRkaW5nIG1vcmUgbm9kZXMgdW50aWwgc2NyaXB0IGNvbWVzIGJhY2sgc3VjY2Vzc2Z1bGx5LlxuICAgICAqIFRoaXMgaXMgc2FmZSB0byBkbyB3aXRob3V0IGEgYmFja3VwIGZvciBmYWlsdXJlIGJlY2F1c2UgaWYgYnBsYXllciBzY3JpcHQgZmFpbHNcbiAgICAgKiBiZWZvcmUgbWluaXBsYXllciBzY3JpcHQsIG1pbmlwbGF5ZXIgc2NyaXB0IHdvdWxkIGZhaWwgYW55d2F5XG4gICAgICovXG4gICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb3B5Tm9kZXNJbk9yZGVyRnJvbShub2RlKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgc2NyaXB0ID0gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZE1pbmlQbGF5ZXI7XG4iLCJjb25zdCBQRVJTSVNURU5DRV9NT0RFX01BUCA9IHtcbiAgICBcImluZGV4XCI6IGZvckluZGV4UGFnZSxcbiAgICBcImNvbnRlbnRcIjogZm9yQ29udGVudFBhZ2UsXG4gICAgXCJidXNpbmVzcy1ob21lXCI6IGZvckJ1c2luZXNzSG9tZXBhZ2Vcbn07XG5cbmNvbnN0IFBFUlNJU1RfTU9ERSA9IFwiZGF0YS1wZXJzaXN0LWZvclwiO1xuY29uc3QgUEVSU0lTVF9DTEFTUyA9IFwicGVyc2lzdC1uYXZcIjtcbmNvbnN0IEhJREVfQ0xBU1MgPSBcImhpZGUtbmF2XCI7XG5jb25zdCBNT0RFID0gXCJkYXRhLW1vZGVcIjtcblxubGV0IGxhc3RLbm93blNjcm9sbFBvc2l0aW9uO1xubGV0IHByZXZpb3VzbHlVc2VkU2Nyb2xsUG9zaXRpb247XG5sZXQgcHJvY2Vzc2luZztcblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3Qgc2Nyb2xsIGhhbmRsZXIgZm9yIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBuYXZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc2lzdEZvckN1cnJlbnRTdGF0ZSgpIHtcbiAgICBjb25zdCBjdXJyZW50UGVyc2lzdGVuY2VNb2RlID0gYmJOYXZFbCgpLmdldEF0dHJpYnV0ZShQRVJTSVNUX01PREUpO1xuXG4gICAgY29uc3QgcGVyc2lzdGVuY2VNZXRob2QgPSBQRVJTSVNURU5DRV9NT0RFX01BUFtjdXJyZW50UGVyc2lzdGVuY2VNb2RlXTtcbiAgICBjb25zdCBuZXdTY3JvbGxIYW5kbGVyID0gZ2VuZXJhdGVOZXdTY3JvbGxIYW5kbGVyKHBlcnNpc3RlbmNlTWV0aG9kLCBjdXJyZW50UGVyc2lzdGVuY2VNb2RlKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG5ld1Njcm9sbEhhbmRsZXIpO1xufVxuXG4vKipcbiAqIG5hdiBlbGVtZW50XG4gKiBAcmV0dXJuIHtET00gRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gYmJOYXZFbCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYi1uYXZcIik7XG59XG5cbi8qKlxuICogQ29udGFpbmVyIHBhcmVudCBmb3IgYmIubmF2XG4gKiBAcmV0dXJuIHtET00gRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gbmF2UGFyZW50RWwoKSB7XG4gICAgY29uc3QgbmF2Um9vdCA9IG5hdlJvb3RFbCgpO1xuICAgIHJldHVybiBuYXZSb290LnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxID8gbmF2Um9vdC5wYXJlbnROb2RlIDogbmF2Um9vdDtcbn1cblxuLyoqXG4gKiBiYi1uYXYtcm9vdCBkb20gZWxlbWVudFxuICogQHJldHVybiB7RE9NIEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG5hdlJvb3RFbCgpIHtcbiAgICByZXR1cm4gYmJOYXZFbCgpLnBhcmVudE5vZGU7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIG5ldyBzY3JvbGwgaGFuZGxlciB0byBiZSBhZGRlZCB0byB0aGUgd2luZG93XG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gbmV3U2Nyb2xsSGFuZGxlclxuICogQHBhcmFtICB7U3RyaW5nfSBjdXJyZW50UGVyc2lzdGVuY2VNb2RlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVOZXdTY3JvbGxIYW5kbGVyKG5ld1Njcm9sbEhhbmRsZXIsIGN1cnJlbnRQZXJzaXN0ZW5jZU1vZGUpIHtcbiAgICBmdW5jdGlvbiBuYXZTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgbGFzdEtub3duU2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGNvbnN0IGxhdGVzdFBlcnNpc3RlbmNlTW9kZSA9IGJiTmF2RWwoKS5nZXRBdHRyaWJ1dGUoUEVSU0lTVF9NT0RFKTtcblxuICAgICAgICBpZiAobGF0ZXN0UGVyc2lzdGVuY2VNb2RlICE9PSBjdXJyZW50UGVyc2lzdGVuY2VNb2RlKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBuYXZTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgICAgICByZXR1cm4gcGVyc2lzdEZvckN1cnJlbnRTdGF0ZShiYk5hdkVsKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwcm9jZXNzaW5nICYmIG5ld1Njcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld1Njcm9sbEhhbmRsZXIobGFzdEtub3duU2Nyb2xsUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzc2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG5ld1Njcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgbmV3U2Nyb2xsSGFuZGxlcihsYXN0S25vd25TY3JvbGxQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hdlNjcm9sbExpc3RlbmVyO1xufVxuXG4vKipcbiAqIFN0aWNreSBuYXYgYmVoYXZpb3IgZm9yIGJiaXogaG9tZXBhZ2VcbiAqIEBwYXJhbSAge051bWJlcn0gc2Nyb2xsUG9zaXRpb25cbiAqL1xuZnVuY3Rpb24gZm9yQnVzaW5lc3NIb21lcGFnZShzY3JvbGxQb3NpdGlvbikge1xuICAgIGNvbnN0IHsgc2Nyb2xsQ2hhbmdlLCBib3R0b21PZk5hdiB9ID0gY2FsY3VsYXRlU2Nyb2xsUG9pbnRzKHNjcm9sbFBvc2l0aW9uKTtcbiAgICBjb25zdCB3aGVuVG9TdG9wU3RpY2tpbmcgPSBib3R0b21PZk5hdiAtIG5hdlJvb3RFbCgpLm9mZnNldEhlaWdodDtcblxuICAgIGNvbnN0IGRpZE5vdE1vdmUgPSBzY3JvbGxDaGFuZ2UgPT09IDA7XG4gICAgY29uc3QgaXNTY3JvbGxpbmdVcCA9IHNjcm9sbENoYW5nZSA8IDA7XG4gICAgY29uc3QgYmVsb3dTdGlja2luZ1BvaW50ID0gc2Nyb2xsUG9zaXRpb24gPiB3aGVuVG9TdG9wU3RpY2tpbmc7XG4gICAgY29uc3QgYWJvdmVTdGlja2luZ1BvaW50ID0gc2Nyb2xsUG9zaXRpb24gPD0gd2hlblRvU3RvcFN0aWNraW5nO1xuXG4gICAgaWYgKGRpZE5vdE1vdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1Njcm9sbGluZ1VwICYmIGJlbG93U3RpY2tpbmdQb2ludCkge1xuICAgICAgICBzdGlja0hlYWRlcihiYk5hdkVsKCkpO1xuICAgICAgICBiYk5hdkVsKCkuc2V0QXR0cmlidXRlKE1PREUsIFwiaW5kZXhcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNTY3JvbGxpbmdVcCAmJiBhYm92ZVN0aWNraW5nUG9pbnQpIHtcbiAgICAgICAgYmJOYXZFbCgpLnNldEF0dHJpYnV0ZShNT0RFLCBcImJ1c2luZXNzLWhvbWVcIik7XG4gICAgfVxuXG4gICAgdW5zdGlja0hlYWRlcigpO1xufVxuXG4vKipcbiAqIFN0aWNreSBuYXYgYmVoYXZpb3IgZm9yIGluZGV4IHBhZ2VcbiAqIEBwYXJhbSAge051bWJlcn0gc2Nyb2xsUG9zaXRpb25cbiAqL1xuZnVuY3Rpb24gZm9ySW5kZXhQYWdlKHNjcm9sbFBvc2l0aW9uKSB7XG4gICAgY29uc3QgeyBzY3JvbGxDaGFuZ2UsIGJvdHRvbU9mTmF2IH0gPSBjYWxjdWxhdGVTY3JvbGxQb2ludHMoc2Nyb2xsUG9zaXRpb24pO1xuICAgIGNvbnN0IHdoZW5Ub1N0b3BTdGlja2luZyA9IGJvdHRvbU9mTmF2IC0gbmF2Um9vdEVsKCkub2Zmc2V0SGVpZ2h0O1xuXG4gICAgY29uc3QgZGlkTm90TW92ZSA9IHNjcm9sbENoYW5nZSA9PT0gMDtcbiAgICBjb25zdCBpc1Njcm9sbGluZ1VwID0gc2Nyb2xsQ2hhbmdlIDwgMDtcbiAgICBjb25zdCBiZWxvd1N0aWNraW5nUG9pbnQgPSBzY3JvbGxQb3NpdGlvbiA+IHdoZW5Ub1N0b3BTdGlja2luZztcbiAgICBjb25zdCBhYm92ZVN0aWNraW5nUG9pbnQgPSBzY3JvbGxQb3NpdGlvbiA8PSB3aGVuVG9TdG9wU3RpY2tpbmc7XG5cbiAgICBpZiAoZGlkTm90TW92ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzU2Nyb2xsaW5nVXAgJiYgYmVsb3dTdGlja2luZ1BvaW50KSB7XG4gICAgICAgIHJldHVybiBzdGlja0hlYWRlcigpO1xuICAgIH1cblxuICAgIGlmIChhYm92ZVN0aWNraW5nUG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHVuc3RpY2tIZWFkZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlkZUhlYWRlcigpO1xufVxuXG4vKipcbiAqIFN0aWNreSBuYXYgYmVoYXZpb3IgZm9yIGNvbnRlbnQgcGFnZXNcbiAqIEBwYXJhbSAge051bWJlcn0gc2Nyb2xsUG9zaXRpb25cbiAqL1xuZnVuY3Rpb24gZm9yQ29udGVudFBhZ2Uoc2Nyb2xsUG9zaXRpb24pIHtcbiAgICBjb25zdCB7IHNjcm9sbENoYW5nZSwgYm90dG9tT2ZOYXYgfSA9IGNhbGN1bGF0ZVNjcm9sbFBvaW50cyhzY3JvbGxQb3NpdGlvbik7XG4gICAgY29uc3Qgd2hlblRvU3RpY2sgPSBib3R0b21PZk5hdjtcblxuICAgIGNvbnN0IGRpZE5vdE1vdmUgPSBzY3JvbGxDaGFuZ2UgPT09IDA7XG4gICAgY29uc3QgYmVsb3dXaGVuVG9TdGljayA9IHNjcm9sbFBvc2l0aW9uID4gd2hlblRvU3RpY2s7XG4gICAgY29uc3QgYWJvdmVXaGVuVG9TdGljayA9IHNjcm9sbFBvc2l0aW9uIDw9IHdoZW5Ub1N0aWNrO1xuXG4gICAgaWYgKGRpZE5vdE1vdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChiZWxvd1doZW5Ub1N0aWNrKSB7XG4gICAgICAgIHN0aWNrSGVhZGVyKCk7XG4gICAgICAgIGJiTmF2RWwoKS5zZXRBdHRyaWJ1dGUoTU9ERSwgXCJjb250ZW50XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGFib3ZlV2hlblRvU3RpY2spIHtcbiAgICAgICAgdW5zdGlja0hlYWRlcigpO1xuICAgICAgICBiYk5hdkVsKCkuc2V0QXR0cmlidXRlKE1PREUsIFwiaW5kZXhcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHNjcm9sbCBjaGFuZ2UgYW5kIGJvdHRvbSBvZiBuYXYgZm9yIGdpdmVuIHNjcm9sbFBvc2l0aW9uXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHNjcm9sbFBvc2l0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICB0dXBsZSBvZiBzY3JvbGxDaGFuZ2UsIGJvdHRvbU9mTmF2XG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjcm9sbFBvaW50cyhzY3JvbGxQb3NpdGlvbikge1xuICAgIGNvbnN0IHNjcm9sbENoYW5nZSA9IHNjcm9sbFBvc2l0aW9uIC0gcHJldmlvdXNseVVzZWRTY3JvbGxQb3NpdGlvbjtcbiAgICBjb25zdCBib3R0b21PZk5hdiA9IG5hdlBhcmVudEVsKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tICsgc2Nyb2xsUG9zaXRpb247XG4gICAgcHJldmlvdXNseVVzZWRTY3JvbGxQb3NpdGlvbiA9IHNjcm9sbFBvc2l0aW9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2Nyb2xsQ2hhbmdlLFxuICAgICAgICBib3R0b21PZk5hdlxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFscmVhZHlQZXJzaXN0aW5nKCkge1xuICAgIHJldHVybiBuYXZSb290RWwoKS5jbGFzc0xpc3QuY29udGFpbnMoUEVSU0lTVF9DTEFTUyk7XG59XG5cbi8qKlxuICogQWRkIHBlcnNpc3RpbmcgY2xhc3MgdG8gbmF2Um9vdFxuICovXG5mdW5jdGlvbiBzdGlja0hlYWRlcigpIHtcbiAgICBpZiAoYWxyZWFkeVBlcnNpc3RpbmcoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmF2Um9vdCA9IG5hdlJvb3RFbCgpO1xuXG4gICAgbmF2Um9vdC5jbGFzc0xpc3QuYWRkKFBFUlNJU1RfQ0xBU1MpO1xuICAgIG5hdlJvb3QuY2xhc3NMaXN0LnJlbW92ZShISURFX0NMQVNTKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgcGVyc2l0aW5nIGNsYXNzIGZyb20gbmF2Um9vdFxuICovXG5mdW5jdGlvbiB1bnN0aWNrSGVhZGVyKCkge1xuICAgIGlmICghYWxyZWFkeVBlcnNpc3RpbmcoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmF2Um9vdCA9IG5hdlJvb3RFbCgpO1xuXG4gICAgbmF2Um9vdC5jbGFzc0xpc3QucmVtb3ZlKFBFUlNJU1RfQ0xBU1MpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBwZXJzaXN0aW5nIGNsYXNzIGFuZCBhZGQgaGlkZSBjbGFzcyB0byBuYXZSb290XG4gKi9cbmZ1bmN0aW9uIGhpZGVIZWFkZXIoKSB7XG5cbiAgICBpZiAoIWFscmVhZHlQZXJzaXN0aW5nKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdlJvb3QgPSBuYXZSb290RWwoKTtcblxuICAgIG5hdlJvb3QuY2xhc3NMaXN0LmFkZChISURFX0NMQVNTKTtcbiAgICBuYXZSb290LmNsYXNzTGlzdC5yZW1vdmUoUEVSU0lTVF9DTEFTUyk7XG59XG4iLCIvLyBbV1ddWzcvMjEvMjAxNl0gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcbihmdW5jdGlvbigpIHtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICByZXR1cm4gZXZ0O1xuICAgIH1cblxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG5cbiAgICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG4iLCIvKiEgcG9seWZpbGxzL29iamVjdC9hc3NpZ24uanMgKi9cblxuaW1wb3J0IF9hc3NpZ24gZnJvbSBcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCI7XG5cbk9iamVjdC5hc3NpZ24gPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbiA6IF9hc3NpZ247XG4iLCIvKiEgYmItY29qcC1uYXYuanMgKi9cblxuaW1wb3J0IG9uQ2xpY2sgZnJvbSBcIi4uLy4uL3V0aWwvb25DbGlja1wiO1xuaW1wb3J0IG1hdGNoZXMgZnJvbSBcIi4uLy4uL3V0aWwvbWF0Y2hlc1wiO1xuaW1wb3J0IGRvY3VtZW50UmVhZHkgZnJvbSBcIi4uLy4uL3V0aWwvZG9jdW1lbnRSZWFkeVwiO1xuXG5pbXBvcnQgTmF2U3RhdGUgZnJvbSBcIi4uLy4uL3N0YXRlL05hdlN0YXRlXCI7XG5pbXBvcnQgTmF2IGZyb20gXCIuLi8uLi9tb2R1bGVzL25hdmlnYXRpb24vTmF2XCI7XG5pbXBvcnQgR29vZ2xlU2VhcmNoIGZyb20gXCIuLi8uLi9tb2R1bGVzL3NlYXJjaC9Hb29nbGVTZWFyY2hcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4uLy4uL2V2ZW50cy9FdmVudHNcIjtcbmltcG9ydCBMb2FkTWluaVBsYXllciBmcm9tIFwiLi4vLi4vbW9kdWxlcy92aWRlby9Mb2FkTWluaVBsYXllclwiO1xuaW1wb3J0IEJCQ29qcE1pbmlQbGF5ZXIgZnJvbSBcIi4uLy4uL21vZHVsZXMvdmlkZW8vQkJDb2pwTWluaVBsYXllclwiO1xuaW1wb3J0IFJlZ1VJQ2xpZW50IGZyb20gXCJyZWctdWktY2xpZW50XCI7XG5cbmNvbnN0IFNFQVJDSF9JQ09OX1NFTEVDVE9SID0gXCIuYmItbmF2LXNlYXJjaF9faWNvblwiO1xuXG5kb2N1bWVudFJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJiTmF2RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJiLW5hdlwiKTtcbiAgICBsZXQgY29qcE1pbmlQbGF5ZXI7XG5cbiAgICBpZiAoIWJiTmF2RWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZlcmlmeVVzZXJJbmZvKGJiTmF2RWwpO1xuXG4gICAgTmF2LmRlZmF1bHRGdW5jdGlvbmFsaXR5KGJiTmF2RWwpO1xuXG4gICAgYmJOYXZFbC5zaG93TWluaVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWNvanBNaW5pUGxheWVyKSB7XG4gICAgICAgICAgICBjb2pwTWluaVBsYXllciA9IEJCQ29qcE1pbmlQbGF5ZXIuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvanBNaW5pUGxheWVyLnNob3coKTtcbiAgICB9O1xuXG4gICAgYmJOYXZFbC5oaWRlTWluaVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWNvanBNaW5pUGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb2pwTWluaVBsYXllci5oaWRlKCk7XG4gICAgfTtcblxuICAgIGJiTmF2RWwucGF1c2VNaW5pUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghY29qcE1pbmlQbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvanBNaW5pUGxheWVyLnBhdXNlKCk7XG4gICAgfTtcblxuICAgIG9uQ2xpY2soYmJOYXZFbCwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAgIGlmIChtYXRjaGVzKHRhcmdldCwgU0VBUkNIX0lDT05fU0VMRUNUT1IpKSB7XG4gICAgICAgICAgICBoYW5kbGVDbGlja1NlYXJjaEljb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBiYk5hdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbG9hZEdvb2dsZVNlYXJjaCk7XG5cbiAgICBmdW5jdGlvbiBsb2FkR29vZ2xlU2VhcmNoKHsgdGFyZ2V0IH0pIHtcblxuICAgICAgICBpZiAobWF0Y2hlcyh0YXJnZXQsIFNFQVJDSF9JQ09OX1NFTEVDVE9SKSkge1xuICAgICAgICAgICAgR29vZ2xlU2VhcmNoLmxvYWQoKTtcbiAgICAgICAgICAgIGJiTmF2RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBsb2FkR29vZ2xlU2VhcmNoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTZWFyY2hJY29uKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U2VhcmNoTW9kZSA9IGJiTmF2RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWFyY2gtbW9kZVwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IG5ld1NlYXJjaE1vZGUgPSAhY3VycmVudFNlYXJjaE1vZGU7XG5cbiAgICAgICAgYmJOYXZFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlYXJjaC1tb2RlXCIsIG5ld1NlYXJjaE1vZGUpO1xuXG4gICAgICAgIGlmIChuZXdTZWFyY2hNb2RlKSB7XG4gICAgICAgICAgICBOYXZTdGF0ZS5zZXRGb2N1cyhcInNlYXJjaFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBiYk5hdkVsLnNldEF0dHJpYnV0ZShcImRhdGEtc2VhcmNoLW1vZGVcIiwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE5hdlN0YXRlLnVuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlVc2VySW5mbyhiYk5hdkVsKSB7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gYmJOYXZFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJlZy1lbnZcIik7XG4gICAgICAgIGlmICghZW52aXJvbm1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBSZWdVSUNsaWVudChudWxsLCB7IGVudmlyb25tZW50IH0pLnZlcmlmeVNpZ25JblN0YXR1cygpO1xuICAgIH1cblxuICAgIEV2ZW50cy5lbWl0UmVhZHlFdmVudCgpO1xuXG4gICAgTG9hZE1pbmlQbGF5ZXIuaHRtbEltcG9ydCgpO1xufSk7XG4iLCIvKiEgTmF2U3RhdGUuanMgKi9cblxuY29uc3QgS0VZU19XRV9DQVJFX0FCT1VUID0gW1xuICAgIFwiYmFzZVwiLFxuICAgIFwicHJvZ3Jlc3NcIixcbiAgICBcInNpdGVcIixcbiAgICBcImhlYWRsaW5lXCIsXG4gICAgXCJtb2RlXCIsXG4gICAgXCJ0aGVtZVwiLFxuICAgIFwidXNlci1jb3VudHJ5XCIsXG4gICAgXCJ1c2VyLXJlZ2lvblwiXG5dO1xuXG5sZXQgZm9jdXMgPSBudWxsO1xubGV0IGZvY3VzQ2xvc2VyID0gbnVsbDtcbmxldCBzdGF0ZSA9IG51bGw7XG5sZXQgY2hhbmdlSGFuZGxlcnMgPSBudWxsO1xuXG5jb25zdCBOYXZTdGF0ZSA9IHtcblxuICAgIGluaXRpYWxpemUoYmJOYXZFbCwgaGFuZGxlcnMpIHtcbiAgICAgICAgc3RhdGUgPSBpbml0aWFsU3RhdGVGcm9tRE9NKGJiTmF2RWwpO1xuICAgICAgICBjaGFuZ2VIYW5kbGVycyA9IGhhbmRsZXJzO1xuICAgIH0sXG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoc3RhdGVba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHN0YXRlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGVyZUlzQ2hhbmdlSGFuZGxlckZvcihrZXkpKSB7XG4gICAgICAgICAgICBjaGFuZ2VIYW5kbGVyc1trZXldKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBydW5IYW5kbGVycyhiYk5hdkVsKSB7XG4gICAgICAgIEtFWVNfV0VfQ0FSRV9BQk9VVC5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgaWYgKHRoZXJlSXNDaGFuZ2VIYW5kbGVyRm9yKGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGJiTmF2RWwuZ2V0QXR0cmlidXRlKGBkYXRhLSR7IGtleSB9YCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlcnNba2V5XSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVtrZXldO1xuICAgIH0sXG5cbiAgICBnZXRGb2N1cygpIHtcbiAgICAgICAgcmV0dXJuIGZvY3VzO1xuICAgIH0sXG5cbiAgICBzZXRGb2N1cyh3aGF0LCBjbG9zZXIpIHtcbiAgICAgICAgaWYgKGZvY3VzQ2xvc2VyKSB7XG4gICAgICAgICAgICBmb2N1c0Nsb3NlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9jdXMgPSB3aGF0O1xuICAgICAgICBmb2N1c0Nsb3NlciA9IGNsb3NlcjtcbiAgICB9LFxuXG4gICAgdW5mb2N1cygpIHtcbiAgICAgICAgZm9jdXMgPSBudWxsO1xuICAgICAgICBmb2N1c0Nsb3NlciA9IG51bGw7XG4gICAgfSxcblxuICAgIGZvY3VzSXMod2hhdCkge1xuICAgICAgICByZXR1cm4gd2hhdCA9PT0gZm9jdXM7XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiB0aGVyZUlzQ2hhbmdlSGFuZGxlckZvcihrZXkpIHtcbiAgICByZXR1cm4gY2hhbmdlSGFuZGxlcnMgJiYgdHlwZW9mIGNoYW5nZUhhbmRsZXJzW2tleV0gPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbFN0YXRlRnJvbURPTShiYk5hdkVsKSB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge307XG5cbiAgICBLRVlTX1dFX0NBUkVfQUJPVVQuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaW5pdGlhbFN0YXRlW2tleV0gPSBiYk5hdkVsLmdldEF0dHJpYnV0ZShgZGF0YS0keyBrZXkgfWApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2U3RhdGU7XG4iLCIvKiEgQ3NzLmpzICovXG5cbmNvbnN0IFBSRUZJWEVTID0gW1xuICAgIFwiXCIsXG4gICAgXCItd2Via2l0LVwiLFxuICAgIFwiLW1zLVwiXG5dO1xuXG5jb25zdCBDc3MgPSB7XG5cbiAgICB0cmFuc2Zvcm0odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFBSRUZJWEVTLm1hcChwcmVmaXggPT4gYCR7IHByZWZpeCB9dHJhbnNmb3JtOiAkeyB2YWx1ZSB9YCkuam9pbihcIjtcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDc3M7XG4iLCIvKiEgSHRtbC5qcyAqL1xuXG5jb25zdCBIdG1sID0ge1xuXG4gICAgdG9nZ2xlQXR0cmlidXRlKGVsLCBhdHRyaWJ1dGUsIGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5vZGUoYXR0cmlidXRlTm9kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWw7XG4iLCIvKiEgY29udGFpbmVkSW4uanMgKi9cblxuaW1wb3J0IG1hdGNoZXMgZnJvbSBcIi4vbWF0Y2hlc1wiO1xuXG5mdW5jdGlvbiBjb250YWluZWRJbihlbCwgc2VsZWN0b3IsIHNjb3BlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgaWYgKG1hdGNoZXMoZWwsIHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgY3VycmVudEVsID0gZWw7XG5cbiAgICB3aGlsZSAoY3VycmVudEVsICE9PSBzY29wZSkge1xuICAgICAgICBjdXJyZW50RWwgPSBjdXJyZW50RWwucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAobWF0Y2hlcyhjdXJyZW50RWwsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lZEluO1xuIiwiLyohIGNvb2tpZXMuanMgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb29raWVEZWZpbml0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpblxuICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXJ9IG1heEFnZVxuICogQHBhcmFtIHtzdHJpbmcgfCBEYXRlfSBleHBpcmVzXG4gKiBAcGFyYW0ge3N0cmluZyB8IGJvb2xlYW59IHNlY3VyZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29va2llIHZhbHVlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZU5hbWVcbiAgICAgKiBAcmV0dXJucyB7P3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQoY29va2llTmFtZSkge1xuICAgICAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKFwiKD86XnxbOyBdKVwiICsgY29va2llTmFtZSArIFwiPShbXlxcXFxzO10qKVwiKTtcbiAgICAgICAgY29uc3Qgc01hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlZ0V4cCk7XG5cbiAgICAgICAgcmV0dXJuIChjb29raWVOYW1lICYmIHNNYXRjaCkgPyBkZWNvZGVVUkkoc01hdGNoWzFdKSA6IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgbmV3IGNvb2tpZXNcbiAgICAgKlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29va2llTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Q29va2llRGVmaW5pdGlvbn0gW29wdGlvbnNdXG4gICAgICovXG4gICAgc2V0KGNvb2tpZU5hbWUsIHZhbHVlLCBvcHRpb25zID0ge30pIHtcblxuICAgICAgICBjb25zdCBjb29raWVPYmplY3QgPSB7XG4gICAgICAgICAgICBbZW5jb2RlVVJJQ29tcG9uZW50KGNvb2tpZU5hbWUpXTogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcbiAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgICAgIGRvbWFpbjogb3B0aW9ucy5kb21haW4sXG4gICAgICAgICAgICBtYXhBZ2U6IG9wdGlvbnMubWF4QWdlLFxuICAgICAgICAgICAgZXhwaXJlczogb3B0aW9ucy5leHBpcmVzLFxuICAgICAgICAgICAgc2VjdXJlOiBvcHRpb25zLnNlY3VyZVxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHNlcmlhbGl6ZUNvb2tpZU9iamVjdChjb29raWVPYmplY3QpO1xuICAgIH0sXG5cbiAgICBfX3ByaXZhdGVfXzoge1xuICAgICAgICBzZXJpYWxpemVDb29raWVPYmplY3RcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBzZXJpYWxpemVDb29raWVPYmplY3QoY29va2llT2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvb2tpZU9iamVjdCkucmVkdWNlKChyZXN1bHQsIHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlID0gY29va2llT2JqZWN0W3Byb3BlcnR5XTtcblxuICAgICAgICBpZiAocHJvcGVydHlWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFwiZXhwaXJlc1wiID09PSBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgbGV0IHNFeHBpcmVzO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5VmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIERhdGU6XG4gICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gcHJvcGVydHlWYWx1ZS50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IHNFeHBpcmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFByb3BlcnR5TmFtZSA9IChcIm1heEFnZVwiID09PSBwcm9wZXJ0eSkgPyBcIm1heC1hZ2VcIiA6IHByb3BlcnR5O1xuXG4gICAgICAgIHJldHVybiBgJHsgcmVzdWx0IH0keyBub3JtYWxpemVkUHJvcGVydHlOYW1lIH09JHsgcHJvcGVydHlWYWx1ZSB9OyBgO1xuICAgIH0sIFwiXCIpLnRyaW0oKTtcbn1cbiIsIi8qISBkb2N1bWVudFJlYWR5LmpzICovXG5cbmZ1bmN0aW9uIGRvY3VtZW50UmVhZHkoY2FsbGJhY2spIHtcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkb2N1bWVudFJlYWR5O1xuIiwiLyohIGZpcmUuanMgKi9cblxuZnVuY3Rpb24gZmlyZShlbCwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XG4gICAgICAgIGRldGFpbDogZGF0YSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogZmFsc2VcbiAgICB9KTtcblxuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaXJlO1xuIiwiLyohIGxvYWRTY3JpcHQuanMgKi9cblxuaW1wb3J0IG5vb3AgZnJvbSBcIi4vbm9vcFwiO1xuXG5mdW5jdGlvbiBsb2FkKHVybCwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgc2NyaXB0Lm9ubG9hZCA9IGNhbGxiYWNrO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIHNjcmlwdCA9IG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRTY3JpcHQodXJsID0gXCJcIiwgY2FsbGJhY2sgPSBub29wKSB7XG4gICAgZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCJcbiAgICAgICAgPyBsb2FkKHVybCwgY2FsbGJhY2spXG4gICAgICAgIDogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gbG9hZCh1cmwsIGNhbGxiYWNrKSk7XG59XG4iLCIvKiEgbG9jYWxlLmpzICovXG5cbmltcG9ydCBjb29raWVzIGZyb20gXCIuL2Nvb2tpZXNcIjtcblxuY29uc3QgREVGQVVMVF9SRUdJT05fQ09VTlRSWSA9IFwiVVNcIjtcbmNvbnN0IERFRkFVTFRfRVhQRVJJRU5DRSA9IFwiQU1FUlwiO1xuXG5jb25zdCBSRUdJT05fQ09PS0lFID0gXCJha19yZ1wiO1xuY29uc3QgQ09VTlRSWV9DT09LSUUgPSBcImFrX2NvXCI7XG5jb25zdCBFWFBFUklFTkNFX0NPT0tFID0gXCJleHBfcGVyZlwiO1xuXG5jb25zdCBSRUdJT04gPSBjb29raWVzLmdldChSRUdJT05fQ09PS0lFKTtcbmNvbnN0IENPVU5UUlkgPSBjb29raWVzLmdldChDT1VOVFJZX0NPT0tJRSk7XG5jb25zdCBFWFBFUklFTkNFID0gY29va2llcy5nZXQoRVhQRVJJRU5DRV9DT09LRSk7XG5cbmNvbnN0IEVYUEVSSUVOQ0VfQllfUkVHSU9OID0ge1xuICAgIFwiVVNcIjogXCJBTUVSXCIsXG4gICAgXCJBc2lhXCI6IFwiQVBBQ1wiLFxuICAgIFwiRXVyb3BlXCI6IFwiRVVSXCIsXG4gICAgXCJNaWRFYXN0XCI6IFwiRVVSXCIsXG4gICAgXCJBZnJpY2FcIjogXCJFVVJcIixcbiAgICBcIkNhbmFkYVwiOiBcIkFNRVJcIlxufTtcblxuY29uc3QgRVhQRVJJRU5DRV9CWV9DT1VOVFJZID0ge1xuICAgIFwiQVVcIjogXCJBVVNUUkFMSUFcIlxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVnaW9uIGNvZGUgc2V0IGJ5IEFrYW1haSBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFJlZ2lvbigpIHtcbiAgICAgICAgcmV0dXJuIFJFR0lPTiB8fCBERUZBVUxUX1JFR0lPTl9DT1VOVFJZO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdXNlciBleHBlcmllbmNlIGNvZGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEV4cGVyaWVuY2UoKSB7XG4gICAgICAgIHJldHVybiBFWFBFUklFTkNFXG4gICAgICAgICAgICB8fCBFWFBFUklFTkNFX0JZX0NPVU5UUllbdGhpcy5nZXRDb3VudHJ5KCldXG4gICAgICAgICAgICB8fCBFWFBFUklFTkNFX0JZX1JFR0lPTlt0aGlzLmdldFJlZ2lvbigpXVxuICAgICAgICAgICAgfHwgREVGQVVMVF9FWFBFUklFTkNFO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY291bnRyeSBjb2RlIHNldCBieSB0aGUgQWthbWFpIHNlcnZlclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q291bnRyeSgpIHtcbiAgICAgICAgcmV0dXJuIENPVU5UUlkgfHwgREVGQVVMVF9SRUdJT05fQ09VTlRSWTtcbiAgICB9XG59O1xuIiwiLyohIG1hdGNoZXMuanMgKi9cblxuZnVuY3Rpb24gbWF0Y2hlcyhlbCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBlbFByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGVsUHJvdG8ubWF0Y2hlcyB8fFxuICAgICAgICBlbFByb3RvLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICBlbFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICBlbFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICBlbFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG4gICAgcmV0dXJuIG1hdGNoZXMuY2FsbChlbCwgc2VsZWN0b3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXRjaGVzO1xuIiwiLyohIG5vb3AuanMgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG59XG4iLCIvKiEgb25DbGljay5qcyAqL1xuXG5mdW5jdGlvbiBvbkNsaWNrKGVsLCBoYW5kbGVyKSB7XG4gICAgY29uc3Qgb25jbGlja0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCBpc1VzYWJpbGl0eUNsaWNrKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uY2xpY2tIYW5kbGVyKTtcblxuICAgIHJldHVybiBvbmNsaWNrSGFuZGxlcjtcbn1cblxuZnVuY3Rpb24gaXNVc2FiaWxpdHlDbGljayhldmVudCkge1xuICAgIC8qIFtXV10gWzcvMjYvMjAxNl1cbiAgICAgKiBJZ25vcmUgY3RybCtjbGljaywgYWx0K2NsaWNrLCBzaGlmdCtjbGljaywgbWV0YStjbGlja1xuICAgICAqIElnbm9yZSBGaXJlZm94IGJ1YmJsZXMgbm9uLWxlZnQgYnV0dG9uIGNsaWNrcyAoaS5lLiBlLmJ1dHRvbiA+IDApXG4gICAgICovXG4gICAgcmV0dXJuIGV2ZW50LmJ1dHRvbiB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5O1xufVxuZXhwb3J0IGRlZmF1bHQgb25DbGljaztcbiIsIi8qISByZXF1ZXN0LmpzICovXG5cbmZ1bmN0aW9uIGNhbGxBbGwoY2FsbGJhY2tzLCBkYXRhKSB7XG4gICAgY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soZGF0YSkpO1xufVxuXG5mdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUoSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHtUaGVuYWJsZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCh1cmwpIHtcbiAgICBjb25zdCBhamF4UmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IG9uU3VjY2Vzc0NhbGxiYWNrcyA9IFtdO1xuICAgIGNvbnN0IG9uRXJyb3JDYWxsYmFja3MgPSBbXTtcblxuICAgIGxldCBkYXRhO1xuXG4gICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCkge1xuICAgICAgICBjYWxsQWxsKG9uRXJyb3JDYWxsYmFja3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3BvbnNlSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKGFqYXhSZXF1ZXN0LnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjYWxsQWxsKG9uRXJyb3JDYWxsYmFja3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyByZXNwb25zZVRleHQgfSA9IGFqYXhSZXF1ZXN0O1xuICAgICAgICBkYXRhID0gcGFyc2UocmVzcG9uc2VUZXh0KTtcblxuICAgICAgICBjYWxsQWxsKG9uU3VjY2Vzc0NhbGxiYWNrcywgZGF0YSk7XG4gICAgfVxuXG4gICAgYWpheFJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVzcG9uc2VIYW5kbGVyKTtcbiAgICBhamF4UmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JIYW5kbGVyKTtcbiAgICBhamF4UmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZXJyb3JIYW5kbGVyKTtcblxuICAgIGFqYXhSZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgICBhamF4UmVxdWVzdC5zZW5kKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBjYXRjaChjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgb25FcnJvckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyOWlhbVZqZEM5aGMzTnBaMjR1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZKQzVoTFdaMWJtTjBhVzl1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMeVF1WTI5bUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6THlRdVkyOXlaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OGtMbU4wZUM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeThrTG1SbFptbHVaV1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZKQzVsZUhCdmNuUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdkpDNW1ZV2xzY3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeThrTG1kc2IySmhiQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OGtMbWx2WW1wbFkzUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdkpDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k4a0xtOWlhbVZqZEMxaGMzTnBaMjR1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZKQzUwYnkxdlltcGxZM1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZaWE0yTG05aWFtVmpkQzVoYzNOcFoyNHVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZiRzlrWVhOb0xtRnpjMmxuYmk5cGJtUmxlQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTl5WldjdGRXa3RZMnhwWlc1MEwyUnBjM1F2VW1WblZVbERiR2xsYm5RdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdmNtVm5MWFZwTFdOc2FXVnVkQzlrYVhOMEwxVnpaWEpKYm1adkxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwzSmxaeTExYVMxamJHbGxiblF2WkdsemRDOWpiMjV6ZEdGdWRITXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZjbVZuTFhWcExXTnNhV1Z1ZEM5a2FYTjBMM1YwYVd4ekwxVnliRUoxYVd4a1pYSXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZjbVZuTFhWcExXTnNhV1Z1ZEM5a2FYTjBMM1YwYVd4ekwyUnBjM0JoZEdOb1JYWmxiblF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12Y21WbkxYVnBMV05zYVdWdWRDOWthWE4wTDNWMGFXeHpMMmRsZEVOdmIydHBaVlpoYkhWbExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwzSmxaeTExYVMxamJHbGxiblF2YVc1a1pYZ3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZjbVZuTFhWcExXTnNhV1Z1ZEM5MlpXNWtiM0l2YW5OdmJuQXVhbk1pTENKemNtTXZZMnhwWlc1MEwyVjJaVzUwY3k5RmRtVnVkSE11YW5NaUxDSnpjbU12WTJ4cFpXNTBMMjF2WkhWc1pYTXZiRzluYnk5Q1FrTnZiblJsYm5STWIyZHZMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXRiMlIxYkdWekwyNWhkbWxuWVhScGIyNHZUbUYyTG1weklpd2ljM0pqTDJOc2FXVnVkQzl0YjJSMWJHVnpMMjVoZG1sbllYUnBiMjR2VTNWaWJXVnVkUzVxY3lJc0luTnlZeTlqYkdsbGJuUXZiVzlrZFd4bGN5OXpaV0Z5WTJndlIyOXZaMnhsVTJWaGNtTm9MbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXRiMlIxYkdWekwzTnZZMmxoYkM5VGIyTnBZV3d1YW5NaUxDSnpjbU12WTJ4cFpXNTBMMjF2WkhWc1pYTXZjMjlqYVdGc0wyNWxkSGR2Y210ekwwVnRZV2xzTG1weklpd2ljM0pqTDJOc2FXVnVkQzl0YjJSMWJHVnpMM052WTJsaGJDOXVaWFIzYjNKcmN5OUdZV05sWW05dmF5NXFjeUlzSW5OeVl5OWpiR2xsYm5RdmJXOWtkV3hsY3k5emIyTnBZV3d2Ym1WMGQyOXlhM012UjI5dloyeGxMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXRiMlIxYkdWekwzTnZZMmxoYkM5dVpYUjNiM0pyY3k5TWFXNXJaV1JwYmk1cWN5SXNJbk55WXk5amJHbGxiblF2Ylc5a2RXeGxjeTl6YjJOcFlXd3ZibVYwZDI5eWEzTXZVbVZrWkdsMExtcHpJaXdpYzNKakwyTnNhV1Z1ZEM5dGIyUjFiR1Z6TDNOdlkybGhiQzl1WlhSM2IzSnJjeTlVZDJsMGRHVnlMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXRiMlIxYkdWekwzTnZZMmxoYkM5dVpYUjNiM0pyY3k5WGFHRjBjMkZ3Y0M1cWN5SXNJbk55WXk5amJHbGxiblF2Ylc5a2RXeGxjeTkyYVdSbGJ5OUJkSFJsYm1SaGJtTmxRMmhsWTJ0bGNpNXFjeUlzSW5OeVl5OWpiR2xsYm5RdmJXOWtkV3hsY3k5MmFXUmxieTlDUWtOdmFuQk5hVzVwVUd4aGVXVnlMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXRiMlIxYkdWekwzWnBaR1Z2TDB4dllXUk5hVzVwVUd4aGVXVnlMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOXdaWEp6YVhOMEwxQmxjbk5wYzNRdWFuTWlMQ0p6Y21NdlkyeHBaVzUwTDNCdmJIbG1hV3hzY3k5RGRYTjBiMjFGZG1WdWRDNXFjeUlzSW5OeVl5OWpiR2xsYm5RdmNHOXNlV1pwYkd4ekwyOWlhbVZqZEM5aGMzTnBaMjR1YW5NaUxDSnpjbU12WTJ4cFpXNTBMM05wZEdWekwyTnZhbkF2WW1JdFkyOXFjQzF1WVhZdWFuTWlMQ0p6Y21NdlkyeHBaVzUwTDNOMFlYUmxMMDVoZGxOMFlYUmxMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOTFkR2xzTDBOemN5NXFjeUlzSW5OeVl5OWpiR2xsYm5RdmRYUnBiQzlJZEcxc0xtcHpJaXdpYzNKakwyTnNhV1Z1ZEM5MWRHbHNMMk52Ym5SaGFXNWxaRWx1TG1weklpd2ljM0pqTDJOc2FXVnVkQzkxZEdsc0wyTnZiMnRwWlhNdWFuTWlMQ0p6Y21NdlkyeHBaVzUwTDNWMGFXd3ZaRzlqZFcxbGJuUlNaV0ZrZVM1cWN5SXNJbk55WXk5amJHbGxiblF2ZFhScGJDOW1hWEpsTG1weklpd2ljM0pqTDJOc2FXVnVkQzkxZEdsc0wyeHZZV1JUWTNKcGNIUXVhbk1pTENKemNtTXZZMnhwWlc1MEwzVjBhV3d2Ykc5allXeGxMbXB6SWl3aWMzSmpMMk5zYVdWdWRDOTFkR2xzTDIxaGRHTm9aWE11YW5NaUxDSnpjbU12WTJ4cFpXNTBMM1YwYVd3dmJtOXZjQzVxY3lJc0luTnlZeTlqYkdsbGJuUXZkWFJwYkM5dmJrTnNhV05yTG1weklpd2ljM0pqTDJOc2FXVnVkQzkxZEdsc0wzSmxjWFZsYzNRdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3UVVOQlFUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMGhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTa0U3UVVGRFFUczdRVU5FUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTI1Q1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRemREUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOSVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5vUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5LUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOSVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRemR1UWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEZUd4Q1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRemxKUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU51UkVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRE1VbEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRM1pEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFaQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEwaEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenM3T3pzN08wRkRkRVpCT3pzN096czdRVUZGUVN4SlFVRk5MRzFDUVVGdFFpeGhRVUY2UWpzN1FVRkZRVHM3T3pzN1FVRk9RVHM3UVVGWFFTeFRRVUZUTEdOQlFWUXNSMEZCTUVJN1FVRkRkRUlzVTBGQlR5eG5Ra0ZCVUN4SlFVRXlRaXhKUVVFelFqdEJRVU5CTEhOQ1FVRkxMRkZCUVV3c1JVRkJaU3huUWtGQlpqdEJRVU5JT3p0clFrRkZZeXhGUVVGRkxEaENRVUZHTEVVN096czdPenM3TzBGRGFFSm1PenRCUVVWQkxFbEJRVTBzWlVGQlpUdEJRVU5xUWl4aFFVRlRMR3REUVVSUk8wRkJSV3BDTEdkQ1FVRlpMSEZEUVVaTE8wRkJSMnBDTEdOQlFWVXNiVU5CU0U4N1FVRkpha0lzWTBGQlZTeHRRMEZLVHp0QlFVdHFRaXhWUVVGTkxHZERRVXhYTzBGQlRXcENMRmxCUVZFc2EwTkJUbE03UVVGUGFrSXNhMEpCUVdNN1FVRlFSeXhEUVVGeVFqczdRVUZWUVN4SlFVRkpMSE5DUVVGS08wRkJRMEVzU1VGQlNTeHhRa0ZCU2pzN1FVRkZRVHRCUVVOQkxFbEJRVTBzWjBKQlFXZENPenRCUVVWc1FqczdPenRCUVVsQkxHTkJUbXRDTEhOQ1FVMVFMRVZCVGs4c1JVRk5TRHRCUVVOWUxIZENRVUZuUWl4RlFVRm9RanRCUVVOQkxIVkNRVUZsTEdOQlFXTXNXVUZCWkN4RFFVRXlRaXhOUVVFelFpeERRVUZtTzBGQlEwZ3NTMEZVYVVJN096dEJRVmRzUWpzN096dEJRVWxCTEZsQlptdENMRzlDUVdWVUxFdEJabE1zUlVGbFJqdEJRVU5hTEhOQ1FVRmpMRmxCUVdRc1EwRkJNa0lzVFVGQk0wSXNSVUZCYlVNc1lVRkJZU3hMUVVGaUxFdEJRWFZDTEZsQlFURkVPMEZCUTBnN1FVRnFRbWxDTEVOQlFYUkNPenRyUWtGeFFtVXNZVHM3T3pzN096czdPMEZEYmtObU96dEJRVU5CT3p0QlFVVkJPenM3TzBGQlEwRTdPenM3UVVGRFFUczdPenRCUVVOQk96czdPMEZCUTBFN096czdRVUZGUVRzN096dEJRVU5CT3pzN08wRkJRMEU3T3pzN1FVRkRRVHM3T3p0QlFVTkJPenM3T3pzN1FVRm1RVHM3UVVGcFFrRXNTVUZCVFN4blFrRkJaMElzWlVGQmRFSTdPMEZCUlVFN1FVRkRRU3hKUVVGTkxEaENRVUU0UWp0QlFVTm9ReXh2UWtGQlowSXNNa05CUkdkQ08wRkJSV2hETEdWQlFWY3NhMFJCUm5GQ08wRkJSMmhETEd0Q1FVRmpMQ3REUVVoclFqdEJRVWxvUXl4blFrRkJXU3h0UkVGS2IwSTdRVUZMYUVNc1owSkJRVmtzYlVSQlRHOUNPMEZCVFdoRExGbEJRVkVzYTBSQlRuZENPMEZCVDJoRExHTkJRVlU3UVVGUWMwSXNRMEZCY0VNN08wRkJWVUVzU1VGQlNTeGxRVUZLT3p0QlFVVkJPMEZCUTBFc1NVRkJUU3hOUVVGTk96dEJRVVZTT3pzN096dEJRVXRCTEhkQ1FWQlJMR2REUVU5aExFOUJVR0lzUlVGUGMwSTdRVUZETVVJc1dVRkJUU3h2UWtGQmIwSXNVVUZCVVN4elFrRkJVaXhEUVVFclFpeHBRa0ZCTDBJc1JVRkJhMFFzUTBGQmJFUXNRMEZCTVVJN1FVRkRRU3haUVVGTkxHZENRVUZuUWl4UlFVRlJMSE5DUVVGU0xFTkJRU3RDTERKQ1FVRXZRaXhGUVVFMFJDeERRVUUxUkN4RFFVRjBRanRCUVVOQkxGbEJRVTBzYTBKQlFXdENMRkZCUVZFc2MwSkJRVklzUTBGQkswSXNaVUZCTDBJc1JVRkJaMFFzUTBGQmFFUXNRMEZCZUVJN1FVRkRRU3haUVVGTkxHVkJRV1VzVVVGQlVTeHpRa0ZCVWl4RFFVRXJRaXh0UWtGQkwwSXNSVUZCYjBRc1EwRkJjRVFzUTBGQmNrSTdRVUZEUVN4WlFVRk5MR2RDUVVGblFpeFJRVUZSTEhOQ1FVRlNMRU5CUVN0Q0xIRkNRVUV2UWl4RlFVRnpSQ3hEUVVGMFJDeERRVUYwUWp0QlFVTkJMRmxCUVUwc1kwRkJZeXhSUVVGUkxHZENRVUZTTEVOQlFYbENMREJEUVVGNlFpeERRVUZ3UWpzN1FVRkZRU3huUWtGQlVTeFpRVUZTTEVOQlFYRkNMRzFDUVVGeVFpeEZRVUV3UXl4cFFrRkJUeXhWUVVGUUxFVkJRVEZETzBGQlEwRXNaMEpCUVZFc1dVRkJVaXhEUVVGeFFpeHJRa0ZCY2tJc1JVRkJlVU1zYVVKQlFVOHNVMEZCVUN4RlFVRjZRenM3UVVGRlFTeGxRVUZQTEdkQ1FVRlFMRU5CUVhkQ0xHOUNRVUY0UWl4RlFVRTRReXhaUVVGWE8wRkJRM0pFTEdkQ1FVRk5MRFJDUVVFMFFpeFRRVUZUTEdOQlFWUXNRMEZCZDBJc2VVSkJRWGhDTEVWQlFXMUVMRmxCUVc1RUxFZEJRV3RGTEVOQlFYQkhPMEZCUTBFc1owSkJRVWtzZVVKQlFVb3NSVUZCSzBJN1FVRkRNMElzYlVOQlFWTXNVVUZCVkN4RFFVRnJRaXhUUVVGc1FqdEJRVU5JTzBGQlEwb3NVMEZNUkRzN1FVRlBRU3huUTBGQll5eFZRVUZrTEVOQlFYbENMR0ZCUVhwQ096dEJRVVZCTERKQ1FVRlRMRlZCUVZRc1EwRkJiMElzVDBGQmNFSXNSVUZCTmtJN1FVRkZla0lzYjBKQlJubENMRzlDUVVWb1FpeExRVVpuUWl4RlFVVlVPMEZCUTFvc2IwSkJRVWtzUzBGQlNpeEZRVUZYTzBGQlExQXNjME5CUVd0Q0xGTkJRV3hDTEVkQlFUaENMRXRCUVRsQ08wRkJRMGc3UVVGRFNpeGhRVTUzUWp0QlFWRjZRaXh2UWtGU2VVSXNiMEpCVVdoQ0xFdEJVbWRDTEVWQlVWUTdRVUZEV2l4dlFrRkJUU3hYUVVGWExFdEJRVXNzUjBGQlRDeERRVUZUTEVkQlFWUXNSVUZCWXl4TFFVRkxMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzUzBGQldpeERRVUZrTEVOQlFXcENPenRCUVVWQkxEaENRVUZqTEZsQlFXUXNRMEZCTWtJc1QwRkJNMElzUlVGQmIwTXNZMEZCU1N4VFFVRktMR2xDUVVFMlFpeFJRVUUzUWl4UlFVRndRenRCUVVOSUxHRkJXbmRDTzBGQlkzcENMR2xDUVdSNVFpeHBRa0ZqYmtJc1VVRmtiVUlzUlVGalZEdEJRVU5hTEc5Q1FVRk5MRkZCUVZFc1VVRkJaRHM3UVVGRlFTeDNRMEZCWXl4UlFVRmtMRU5CUVhWQ0xFdEJRWFpDT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3h2UWtGQlNTdzBRa0ZCTkVJc1MwRkJOVUlzUTBGQlNpeEZRVUYzUXp0QlFVTndReXgzUWtGQlRTeG5Ra0ZCWjBJc1VVRkJVU3h6UWtGQlVpeERRVUVyUWl3NFFrRkJMMElzUlVGQkswUXNRMEZCTDBRc1EwRkJkRUk3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSGRDUVVGSkxHRkJRVW9zUlVGQmJVSTdRVUZEWml4elEwRkJZeXhaUVVGa0xFTkJRVEpDTEUxQlFUTkNMRVZCUVcxRExEUkNRVUUwUWl4TFFVRTFRaXhEUVVGdVF6dEJRVU5CTEhORFFVRmpMRk5CUVdRc1IwRkJNRUlzVlVGQlZTeGpRVUZXTEVkQlFUSkNMRmRCUVROQ0xFZEJRWGxETERKQ1FVRnVSVHRCUVVOSU8wRkJRMG83UVVGRFNqdEJRUzlDZDBJc1UwRkJOMEk3TzBGQmJVTkJMREpDUVVGVExGZEJRVlFzUTBGQmNVSXNUMEZCY2tJN08wRkJSVUVzV1VGQlRTeFhRVUZYTEVsQlFVa3NaMEpCUVVvc1EwRkJjVUlzVlVGQlV5eFRRVUZVTEVWQlFXOUNPMEZCUTNSRUxITkNRVUZWTEU5QlFWWXNRMEZCYTBJc1ZVRkJVeXhSUVVGVUxFVkJRVzFDTzBGQlEycERMRzlDUVVGTkxFOUJRVThzVTBGQlV5eGhRVUYwUWp0QlFVTkJMRzlDUVVGTkxGRkJRVkVzVVVGQlVTeFpRVUZTTEVOQlFYRkNMRWxCUVhKQ0xFTkJRV1E3TzBGQlJVRXNiVU5CUVZNc1IwRkJWQ3hEUVVGaExFdEJRVXNzVDBGQlRDeERRVUZoTEU5QlFXSXNSVUZCYzBJc1JVRkJkRUlzUTBGQllpeEZRVUYzUXl4TFFVRjRRenRCUVVOSUxHRkJURVE3UVVGTlNDeFRRVkJuUWl4RFFVRnFRanM3UVVGVFFTeHBRa0ZCVXl4UFFVRlVMRU5CUVdsQ0xFOUJRV3BDTEVWQlFUQkNMRVZCUVVVc1dVRkJXU3hKUVVGa0xFVkJRVEZDT3p0QlFVVkJPenRCUVVWQk8wRkJRMEVzWjBKQlFWRXNlVUpCUVZJN08wRkJSVUVzWjBKQlFWRXNiMEpCUVZJc1IwRkJLMElzVlVGQlV5eE5RVUZVTEVWQlFXbENPMEZCUXpWRExHZENRVUZKTEVOQlFVTXNUVUZCVEN4RlFVRmhPMEZCUTFRc2VVSkJRVk1zYVVKQlFVOHNTVUZCVUN4RFFVRlpMR1ZCUVZvc1EwRkJWRHRCUVVOSU96dEJRVVZFTEcxQ1FVRlBMRkZCUVZBc1EwRkJaMElzVFVGQmFFSTdRVUZEU0N4VFFVNUVPenRCUVZGQkxHZENRVUZSTEdsQ1FVRlNMRWRCUVRSQ0xGbEJRVmM3UVVGRGJrTXNaMEpCUVVrc1EwRkJReXhOUVVGTUxFVkJRV0U3UVVGRFZEdEJRVU5JT3p0QlFVVkVMRzFDUVVGUExGVkJRVkE3UVVGRFNDeFRRVTVFT3p0QlFWRkJMQ3RDUVVGUkxFOUJRVklzUlVGQmFVSXNWVUZCVXl4TFFVRlVMRVZCUVdkQ08wRkJRVUVzWjBKQlEzSkNMRTFCUkhGQ0xFZEJRMVlzUzBGRVZTeERRVU55UWl4TlFVUnhRanM3TzBGQlJ6ZENMR2RDUVVGSkxIVkNRVUZSTEUxQlFWSXNSVUZCWjBJc2RVUkJRV2hDTEVOQlFVb3NSVUZCT0VVN1FVRkRNVVU3UVVGRFFUdEJRVU5JTzBGQlJVb3NVMEZTUkRzN1FVRlZRU3hoUVVGTExFbEJRVWtzU1VGQlNTeERRVUZTTEVWQlFWY3NUVUZCVFN4WlFVRlpMRTFCUVd4RExFVkJRVEJETEVsQlFVa3NSMEZCT1VNc1JVRkJiVVFzUjBGQmJrUXNSVUZCZDBRN1FVRkRjRVFzWjBKQlFVMHNZVUZCWVN4WlFVRlpMRU5CUVZvc1EwRkJia0k3UVVGRFFTeG5Ra0ZCVFN4bFFVRmxMR2xDUVVGcFFpeFZRVUZxUWl4RFFVRnlRanM3UVVGRlFTeDFRa0ZCVnl4blFrRkJXQ3hEUVVFMFFpeFpRVUUxUWl4RlFVRXdReXhaUVVFeFF6dEJRVU5JT3p0QlFVVkVMR2xDUVVGVExHZENRVUZVTEVOQlFUQkNMRlZCUVRGQ0xFVkJRWE5ETzBGQlEyeERMSEZDUVVGVExGbEJRVlFzUjBGQmQwSTdRVUZEY0VJc2IwSkJRVTBzV1VGQldTeFhRVUZYTEhOQ1FVRllMRU5CUVd0RExHZENRVUZzUXl4RlFVRnZSQ3hEUVVGd1JDeERRVUZzUWp0QlFVTkJMRzlDUVVGTkxGVkJRVlVzYTBKQlFWRXNTVUZCVWl4RFFVRmhMRk5CUVdJc1EwRkJhRUk3TzBGQlJVRXNkMEpCUVZFc2EwSkJRVkk3TzBGQlJVRXNNa0pCUVZjc2JVSkJRVmdzUTBGQkswSXNXVUZCTDBJc1JVRkJOa01zV1VGQk4wTTdRVUZEU0RzN1FVRkZSQ3h0UWtGQlR5eFpRVUZRTzBGQlEwZzdPMEZCUlVRc2FVSkJRVk1zYjBKQlFWUXNSMEZCWjBNN1FVRkROVUlzWjBKQlFVMHNhVUpCUVdsQ0xHMUNRVUZUTEU5QlFWUXNRMEZCYVVJc1ZVRkJha0lzUTBGQmRrSTdPMEZCUlVFc1owSkJRVWtzWTBGQlNpeEZRVUZ2UWp0QlFVTm9RanRCUVVOQkxHMURRVUZUTEU5QlFWUTdRVUZEUVR0QlFVTklPenRCUVVWRUxDdENRVUZUTEZGQlFWUXNRMEZCYTBJc1ZVRkJiRUlzUlVGQk9FSXNXVUZCVnp0QlFVTnlRenRCUVVOSUxHRkJSa1E3TzBGQlNVRTdRVUZEU0RzN1FVRkZSQ3hwUWtGQlV5eFpRVUZVTEVkQlFYZENPMEZCUTNCQ0xDdENRVUZ0UWl4WlFVRnVRaXhGUVVGcFF5eFBRVUZxUXpzN1FVRkZRU3h2UWtGQlVTeFpRVUZTTEVOQlFYRkNMR0ZCUVhKQ0xFVkJRVzlETEVsQlFYQkRPMEZCUTBnN08wRkJSVVFzYVVKQlFWTXNZVUZCVkN4SFFVRjVRanRCUVVOeVFpeHZRa0ZCVVN4WlFVRlNMRU5CUVhGQ0xHRkJRWEpDTEVWQlFXOURMRXRCUVhCRE96dEJRVVZCTERCQ1FVRmpMRmxCUVdRN1FVRkRTRHM3UVVGRlJDeHBRa0ZCVXl4clFrRkJWQ3hEUVVFMFFpeFJRVUUxUWl4RlFVRnpReXhSUVVGMFF5eEZRVUZuUkR0QlFVTTFReXhuUWtGQlNTeEZRVUZGTEZsQlFWa3NVVUZCWkN4RFFVRktMRVZCUVRaQ08wRkJRM3BDTzBGQlEwZzdPMEZCUlVRc1owSkJRVTBzVTBGQlV5eHRRa0ZCVXl4SFFVRlVMRU5CUVdFc1RVRkJZaXhOUVVGNVFpeFRRVUY2UWl4SFFVTlVMRU5CUkZNc1EwRkRVRHRCUVVSUExHTkJSVlFzUTBGR1RqczdRVUZKUVN4blFrRkJUU3hoUVVGaExGTkJRVk1zV1VGQk5VSTdRVUZEUVN4blFrRkJUU3hoUVVGaExHRkJRV0VzVFVGQllpeEhRVUZ6UWl4SlFVRjZRenM3UVVGRlFTeHhRa0ZCVXl4TFFVRlVMRU5CUVdVc1IwRkJaaXhIUVVGeFFpeFZRVUZ5UWp0QlFVTklPenRCUVVWRUxHbENRVUZUTEdGQlFWUXNRMEZCZFVJc1QwRkJka0lzUlVGQlowTTdRVUZETlVJc1owSkJRVWtzVDBGQlNpeEZRVUZoTzBGQlExUXNkMEpCUVZFc1MwRkJVaXhEUVVGakxHTkJRV1FzUTBGQk5rSXNTMEZCTjBJN1FVRkRTRHRCUVVOS08wRkJSVW83UVVFdlMwOHNRMEZCV2pzN2EwSkJiVXhsTEVjN096czdPenM3T3p0QlEyeE9aanM3T3p0QlFVTkJPenM3T3pzN1FVRklRVHM3UVVGTFFTeEpRVUZOTEZOQlFWTXNVVUZCWmp0QlFVTkJMRWxCUVUwc1pVRkJaU3hSUVVGeVFqczdRVUZGUVR0QlFVTkJMRWxCUVUwc1ZVRkJWVHM3UVVGRldqczdPenM3UVVGTFFTeFJRVkJaTEdkQ1FVOVFMRk5CVUU4c1JVRlBTVHRCUVVOYUxGbEJRVTBzVDBGQlR5eEZRVUZpT3p0QlFVVkJMRmxCUVUwc2EwSkJRV3RDTEdsQ1FVRnBRaXhUUVVGcVFpeERRVUY0UWp0QlFVTkJMRmxCUVUwc2MwSkJRWE5DTEdkQ1FVRm5RaXhEUVVGb1FpeERRVUUxUWp0QlFVTkJMRmxCUVUwc2FVSkJRV2xDTEd0Q1FVRnJRaXhUUVVGc1FpeERRVUYyUWp0QlFVTkJMRmxCUVUwc2RVSkJRWFZDTEhsQ1FVRjVRanRCUVVOc1JDeHpRa0ZFYTBRN1FVRkZiRVFzWjBOQlJtdEVPMEZCUjJ4RUxEUkRRVWhyUkR0QlFVbHNSRHRCUVVwclJDeFRRVUY2UWl4RFFVRTNRanM3UVVGUFFTeGhRVUZMTEVsQlFVa3NTVUZCU1N4RFFVRlNMRVZCUVZjc1UwRkJVeXhuUWtGQlowSXNUVUZCZWtNc1JVRkJhVVFzU1VGQlNTeE5RVUZ5UkN4RlFVRTJSQ3hGUVVGRkxFTkJRUzlFTEVWQlFXdEZPMEZCUXpsRUxEUkNRVUZuUWl4RFFVRm9RaXhGUVVGdFFpeG5Ra0ZCYmtJc1EwRkJiME1zV1VGQmNFTXNSVUZCYTBRc2IwSkJRV3hFTzBGQlEwZzdPMEZCUlVRN1FVRkRRU3hsUVVGUE96dEJRVVZJT3pzN096czdRVUZOUVN3NFFrRlNSeXhuUTBGUmEwSTdRVUZEYWtJc2IwSkJRVWtzUTBGQlF5eHRRa0ZCVEN4RlFVRXdRanRCUVVOMFFqdEJRVU5JT3p0QlFVVkVMSEZEUVVGeFFpeEZRVUZGTEZGQlFWRXNiVUpCUVZZc1JVRkJja0k3UVVGRFNEdEJRV1JGTEZOQlFWQTdRVUZuUWtnN1FVRjZRMWNzUTBGQmFFSTdPMEZCTmtOQkxGTkJRVk1zTkVKQlFWUXNSMEZCZDBNN1FVRkRjRU1zVjBGQlR5eHRRa0ZCVXl4UFFVRlVMRU5CUVdsQ0xGVkJRV3BDTEVOQlFWQTdRVUZEU0RzN1FVRkZSQ3hUUVVGVExHZENRVUZVTEVOQlFUQkNMRk5CUVRGQ0xFVkJRWEZETzBGQlEycERMRmRCUVU4c1ZVRkJWU3h6UWtGQlZpeERRVUZwUXl3clFrRkJha01zUTBGQlVEdEJRVU5JT3p0QlFVVkVMRk5CUVZNc2FVSkJRVlFzUTBGQk1rSXNVMEZCTTBJc1JVRkJjME03UVVGRGJFTXNWMEZCVHl4VlFVRlZMSE5DUVVGV0xFTkJRV2xETEhWQ1FVRnFReXhGUVVFd1JDeERRVUV4UkN4RFFVRlFPMEZCUTBnN08wRkJSVVFzVTBGQlV5eFhRVUZVTEVOQlFYRkNMRTlCUVhKQ0xFVkJRVGhDTzBGQlF6RkNMRmRCUVU4c1VVRkJVU3hQUVVGU0xFTkJRV2RDTEZGQlFYWkNPMEZCUTBnN08wRkJSVVFzVTBGQlV5eGxRVUZVTEVOQlFYbENMRTlCUVhwQ0xFVkJRV3RETzBGQlF6bENMRmRCUVU4c1VVRkJVU3hQUVVGU0xFTkJRV2RDTEZsQlFYWkNPMEZCUTBnN08wRkJSVVFzVTBGQlV5eFpRVUZVTEVOQlFYTkNMR05CUVhSQ0xFVkJRWE5ETEdWQlFYUkRMRVZCUVhWRU8wRkJRMjVFTEZOQlFVc3NTVUZCU1N4SlFVRkpMRU5CUVZJc1JVRkJWeXhOUVVGTkxHZENRVUZuUWl4TlFVRjBReXhGUVVFNFF5eEpRVUZKTEVkQlFXeEVMRVZCUVhWRUxFVkJRVVVzUTBGQmVrUXNSVUZCTkVRN1FVRkRlRVFzV1VGQlRTeDNRa0ZCZDBJc1owSkJRV2RDTEVOQlFXaENMRU5CUVRsQ096dEJRVVZCTEZsQlFVa3NjMEpCUVhOQ0xGTkJRWFJDTEVOQlFXZERMRkZCUVdoRExFTkJRWGxETEZsQlFYcERMRU5CUVVvc1JVRkJORVE3UVVGRGVFUXNhME5CUVhOQ0xGTkJRWFJDTEVOQlFXZERMRTFCUVdoRExFTkJRWFZETEZsQlFYWkRPMEZCUTBnN1FVRkZTanM3UVVGRlJDeHRRa0ZCWlN4VFFVRm1MRU5CUVhsQ0xFZEJRWHBDTEVOQlFUWkNMRmxCUVRkQ08wRkJRMGc3TzBGQlJVUXNVMEZCVXl4WFFVRlVMRU5CUVhGQ0xHTkJRWEpDTEVWQlFXMUZPMEZCUVVFc1VVRkJPVUlzU1VGQk9FSXNkVVZCUVhaQ0xFVkJRWFZDTzBGQlFVRXNVVUZCYmtJc1dVRkJiVUlzZFVWQlFVb3NSVUZCU1RzN1FVRkRMMFFzVVVGQlNTeERRVUZETEdOQlFVd3NSVUZCY1VJN1FVRkRha0k3UVVGRFNEczdRVUZGUkN4dFFrRkJaU3hUUVVGbUxFZEJRVEpDTEVsQlFUTkNPMEZCUTBFc2IwSkJRV2RDTEdOQlFXaENMRVZCUVdkRExGbEJRV2hETzBGQlEwZzdPMEZCUlVRc1UwRkJVeXhsUVVGVUxFTkJRWGxDTEdOQlFYcENMRVZCUVhsRExGbEJRWHBETEVWQlFYVkVPMEZCUTI1RUxGRkJRVWtzV1VGQlNpeEZRVUZyUWp0QlFVTmtMSFZDUVVGbExFOUJRV1lzUTBGQmRVSXNXVUZCZGtJc1IwRkJjME1zV1VGQmRFTTdRVUZEU0N4TFFVWkVMRTFCUjBzN1FVRkRSQ3gxUWtGQlpTeFBRVUZtTEVOQlFYVkNMRmxCUVhaQ0xFZEJRWE5ETEVsQlFYUkRPMEZCUTBnN1FVRkRTanM3UVVGRlJDeFRRVUZUTEhkQ1FVRlVMRTlCUVRaRk8wRkJRVUVzVVVGQmVrTXNTVUZCZVVNc1VVRkJla01zU1VGQmVVTTdRVUZCUVN4UlFVRnVReXhsUVVGdFF5eFJRVUZ1UXl4bFFVRnRRenRCUVVGQkxGRkJRV3hDTEdOQlFXdENMRkZCUVd4Q0xHTkJRV3RDT3p0QlFVTjZSU3hYUVVGUExHbENRVUZ4UWp0QlFVRkJMRmxCUVZZc1RVRkJWU3hUUVVGV0xFMUJRVlU3TzBGQlEzaENMRmxCUVVrc09FSkJRVW9zUlVGQmIwTTdRVUZEYUVNN1FVRkRTRHM3UVVGRlJDeHhRa0ZCWVN4TlFVRmlMRVZCUVhGQ0xHVkJRWEpDT3p0QlFVVkJMRmxCUVUwc1YwRkJWeXhaUVVGWkxFMUJRVm9zUTBGQmFrSTdRVUZEUVN4WlFVRk5MR2RDUVVGblFpeG5Ra0ZCWjBJc1RVRkJhRUlzUTBGQmRFSTdPMEZCUlVFc1dVRkJTU3hEUVVGRExGRkJRVXdzUlVGQlpUdEJRVU5ZTERKQ1FVRmxMRmxCUVdZc1EwRkJORUlzVFVGQk5VSXNSVUZCYjBNc1RVRkJjRU03UVVGRFFUdEJRVU5JT3p0QlFVVkVMRmxCUVUwc2EwSkJRV3RDTEV0QlFVc3NVVUZCVEN4RFFVRjRRanM3UVVGRlFTeFpRVUZKTEdWQlFVb3NSVUZCY1VJN1FVRkRha0lzZDBKQlFWa3NZMEZCV2l4RlFVRTBRaXhsUVVFMVFpeEZRVUUyUXl4aFFVRTNRenRCUVVOQkxESkNRVUZsTEdWQlFXWXNRMEZCSzBJc1RVRkJMMEk3TzBGQlJVRTdRVUZEU0RzN1FVRkZSQ3dyUWtGQlVTeFJRVUZTTEVWQlEwc3NTVUZFVEN4RFFVTlZMRlZCUVVNc1VVRkJSQ3hGUVVGak8wRkJRMmhDTzBGQlEwRXNhVUpCUVVzc1VVRkJUQ3hKUVVGcFFpeFRRVUZUTEVsQlFURkNPMEZCUTBFc2QwSkJRVmtzWTBGQldpeEZRVUUwUWl4VFFVRlRMRWxCUVhKRExFVkJRVEpETEdGQlFUTkRPMEZCUTBFc01rSkJRV1VzWlVGQlppeERRVUVyUWl4TlFVRXZRanRCUVVOSUxGTkJUa3dzUlVGUFN5eExRVkJNTEVOQlQxYzdRVUZCUVN4dFFrRkJUU3haUVVGWkxHTkJRVm9zUTBGQlRqdEJRVUZCTEZOQlVGZzdRVUZSU0N4TFFXaERSRHRCUVdsRFNEczdhMEpCUldNc1R6czdPenM3T3pzN08wRkRNMGxtT3pzN096czdRVUZGUVN4SlFVRk5MSEZDUVVGeFFpeHZSVUZCTTBJc1F5eERRVXBCT3p0QlFVMUJMRWxCUVVrc1UwRkJVeXhMUVVGaU96dEJRVVZCTzBGQlEwRXNTVUZCVFN4bFFVRmxPenRCUVVWcVFqczdPenRCUVVsQkxGRkJUbWxDTEd0Q1FVMVdPMEZCUTBnc1dVRkJTU3hOUVVGS0xFVkJRVms3UVVGRFVqdEJRVU5JT3p0QlFVVkVMR3REUVVGWExHdENRVUZZTzBGQlEwRXNhVUpCUVZNc1NVRkJWRHRCUVVOSU8wRkJZbWRDTEVOQlFYSkNPenRyUWtGcFFtVXNXVHM3T3pzN096czdPMEZEZUVKbU96czdPMEZCUTBFN096czdRVUZGUVRzN096dEJRVU5CT3pzN08wRkJRMEU3T3pzN1FVRkRRVHM3T3p0QlFVTkJPenM3TzBGQlEwRTdPenM3UVVGRFFUczdPenM3TzBGQlJVRXNTVUZCVFN4cFFrRkJhVUk3UVVGRGJrSXNaME5CUkcxQ08wRkJSVzVDTERoQ1FVWnRRanRCUVVkdVFpd3dRa0ZJYlVJN1FVRkpia0lzTkVKQlNtMUNPMEZCUzI1Q0xHZERRVXh0UWp0QlFVMXVRaXcwUWtGT2JVSTdRVUZQYmtJN1FVRlFiVUlzUTBGQmRrSXNReXhEUVdKQk96dEJRWFZDUVN4SlFVRk5MR3RDUVVGclFpeERRVUY0UWp0QlFVTkJMRWxCUVUwc2FVSkJRV2xDTEdGQlFYWkNPenRCUVVWQk8wRkJRMEVzU1VGQlRTeFRRVUZUT3p0QlFVVllPenM3T3p0QlFVdEJMRkZCVUZjc1owSkJUMDRzUlVGUVRTeEZRVTlHTzBGQlEwd3NWMEZCUnl4VFFVRklMRWRCUVdVc2IwSkJRV1k3TzBGQlJVRXNXVUZCVFN4UlFVRlJPMEZCUTFZc2MwSkJRVlVzUzBGRVFUdEJRVVZXTEhOQ1FVRlZMRWRCUVVjc2MwSkJRVWdzUTBGQk1FSXNaVUZCTVVJc1JVRkJNa01zUTBGQk0wTTdRVUZHUVN4VFFVRmtPenRCUVV0QkxDdENRVUZSTEVWQlFWSXNSVUZCV1N4VlFVRlRMRXRCUVZRc1JVRkJaMEk3TzBGQlJYaENMR2RDUVVGSkxIVkNRVUZSTEUxQlFVMHNUVUZCWkN4RlFVRnpRaXd5UWtGQmRFSXNRMEZCU2l4RlFVRjNSRHRCUVVOd1JDeHpRa0ZCVFN4alFVRk9PMEZCUTBFc0swSkJRV1VzUzBGQlpqdEJRVU5CTzBGQlEwZzdRVUZGU2l4VFFWSkVPenRCUVZWQk8wRkJRMEVzWlVGQlR6czdRVUZGU0RzN096czdPenM3UVVGUlFTeHZRa0ZXUnl4dlFrRlZUU3hOUVZaT0xFVkJWV003UVVGQlFTeDFRMEZEWVN4TlFVUmlMRU5CUTB3c1VVRkVTenRCUVVGQkxHOUNRVU5NTEZGQlJFc3NiME5CUTAwc1JVRkVUanM3TzBGQlIySXNiMEpCUVVrc1UwRkJVeXhOUVVGVUxFZEJRV3RDTEdWQlFYUkNMRVZCUVhWRE8wRkJRMjVETERCQ1FVRk5MRWxCUVVrc1MwRkJTaXhEUVVGVkxESkRRVUZXTEVOQlFVNDdRVUZEU0RzN1FVRkZSQ3h6UWtGQlRTeFBRVUZPTEVkQlFXZENMR2RDUVVGblFpeE5RVUZvUWl4RFFVRm9RanM3UVVGRlFTdzRRa0ZCWXl4TFFVRmtPMEZCUTBnc1lVRndRa1U3T3p0QlFYTkNTRHM3T3pzN1FVRkxRU3h6UWtFelFrY3NkMEpCTWtKVk8wRkJRMVFzYzBKQlFVMHNUMEZCVGl4SFFVRm5RaXhGUVVGb1FqdEJRVU5CTEhOQ1FVRk5MRkZCUVU0c1IwRkJhVUlzUzBGQmFrSTdPMEZCUlVFc09FSkJRV01zUzBGQlpEdEJRVU5JTzBGQmFFTkZMRk5CUVZBN1FVRnJRMGc3UVVFMVJGVXNRMEZCWmpzN1FVRm5SVUVzVTBGQlV5eGpRVUZVTEVOQlFYZENMRXRCUVhoQ0xFVkJRU3RDTzBGQlF6TkNMRlZCUVUwc1VVRkJUaXhIUVVGcFFpeERRVUZETEUxQlFVMHNVVUZCZUVJN08wRkJSVUVzYlVKQlFXVXNTMEZCWmp0QlFVTklPenRCUVVWRUxGTkJRVk1zWTBGQlZDeFBRVUZuUkR0QlFVRkJMRkZCUVhSQ0xGRkJRWE5DTEZGQlFYUkNMRkZCUVhOQ08wRkJRVUVzVVVGQldpeFJRVUZaTEZGQlFWb3NVVUZCV1RzN1FVRkROVU1zVVVGQlNTeFJRVUZLTEVWQlFXTTdRVUZEVml4cFFrRkJVeXhaUVVGVUxFTkJRWE5DTEdOQlFYUkNMRVZCUVhORExFMUJRWFJETzBGQlEwRTdRVUZEU0RzN1FVRkZSQ3hoUVVGVExHVkJRVlFzUTBGQmVVSXNZMEZCZWtJN1FVRkRTRHM3UVVGRlJDeFRRVUZUTEdGQlFWUXNVVUZCT0VNN1FVRkJRU3hSUVVGeVFpeFJRVUZ4UWl4VFFVRnlRaXhSUVVGeFFqdEJRVUZCTEZGQlFWZ3NUMEZCVnl4VFFVRllMRTlCUVZjN08wRkJRekZETEdGQlFWTXNVMEZCVkN4elJVRkZWeXhSUVVGUkxFZEJRVklzUTBGQldTeFZRVUZhTEVWQlFYZENMRWxCUVhoQ0xFTkJRVFpDTEVWQlFUZENMRU5CUmxnc2IwTkJTMDhzWlVGQlpTeFBRVUZtTEVOQlRGQXNhMEpCVFU4c1kwRkJZeXhQUVVGa0xFTkJUbEE3UVVGUlNEczdRVUZGUkN4VFFVRlRMRlZCUVZRc1EwRkJiMElzVFVGQmNFSXNSVUZCTkVJN1FVRkJRU3gzUWtGRFNTeFBRVUZQTEV0QlJGZzdRVUZCUVN4UlFVTm9RaXhOUVVSblFpeHBRa0ZEYUVJc1RVRkVaMEk3UVVGQlFTeFJRVU5TTEU5QlJGRXNhVUpCUTFJc1QwRkVVVHM3TzBGQlIzaENMRkZCUVUwc2EwSkJRV3RDTEhWQ1FVRnhRaXhOUVVGeVFpeFZRVUZyUXl4RlFVRXhSRHRCUVVOQkxGRkJRVTBzYlVKQlFXMUNMSGxDUVVGMVFpeFBRVUYyUWl4VlFVRnhReXhGUVVFNVJEdEJRVU5CTEZGQlFVMHNhMEpCUVd0Q0xFOUJRVThzVFVGQlVDeHBRa0ZCTkVJc1QwRkJUeXhOUVVGdVF5eFZRVUZuUkN4RlFVRjRSVHM3UVVGRlFTdzRSVUZETUVRc1QwRkJUeXhKUVVScVJTd3JRa0ZGYVVJc1QwRkJUeXhKUVVaNFFpeDNRa0ZIVnl4bFFVaFlMSE5DUVVsWExHZENRVXBZTEhOQ1FVdFhMR1ZCVEZnc2VVVkJUeXRDTEU5QlFVOHNTVUZRZEVNc09FVkJWVmNzVDBGQlR5eFBRVlpzUWp0QlFXRklPenRCUVVWRUxGTkJRVk1zWTBGQlZDeERRVUYzUWl4UFFVRjRRaXhGUVVGcFF6dEJRVU0zUWl4UlFVRkpMRkZCUVZFc1RVRkJVaXhKUVVGclFpeGxRVUYwUWl4RlFVRjFRenRCUVVOdVF5eGxRVUZQTEVWQlFWQTdRVUZEU0RzN1FVRkZSRHRCUVZWSU96dEJRVVZFTEZOQlFWTXNZVUZCVkN4RFFVRjFRaXhQUVVGMlFpeEZRVUZuUXp0QlFVTTFRaXhSUVVGSkxFTkJRVU1zVVVGQlVTeE5RVUZpTEVWQlFYRkNPMEZCUTJwQ0xHVkJRVThzUlVGQlVEdEJRVU5JT3p0QlFVVkVMRmRCUVU4c2QwUkJRVkE3UVVGRFNEczdRVUZGUkN4VFFVRlRMR3RDUVVGVUxFZEJRVGhDTzBGQlF6RkNPMEZCVFVnN08wRkJSVVFzVTBGQlV5eFpRVUZVTEVOQlFYTkNMRWxCUVhSQ0xFVkJRVFJDTEV0QlFUVkNMRVZCUVcxRE8wRkJReTlDTEZGQlFVa3NRMEZCUXl4TFFVRk1MRVZCUVZrN1FVRkRVaXhsUVVGUExFVkJRVkE3UVVGRFNEczdRVUZJT0VJc1VVRkxka0lzUzBGTWRVSXNSMEZMVEN4TFFVeExMRU5CUzNaQ0xFdEJUSFZDTzBGQlFVRXNVVUZMYUVJc1RVRk1aMElzUjBGTFRDeExRVXhMTEVOQlMyaENMRTFCVEdkQ096czdRVUZQTDBJc1YwRkJUenRCUVVOSUxITkRRVUUyUWl4SlFVUXhRanRCUVVWSUxDdEVRVUZ6UkN4SlFVRjBSQ3h4UlVGQk5FZ3NTMEZCTlVnc1owSkJRVGhKTEUxQlFUbEpPMEZCUmtjc1MwRkJVRHRCUVVsSU96dEJRVVZFTEZOQlFWTXNaVUZCVkN4UlFVRnRSRHRCUVVGQkxGRkJRWGhDTEV0QlFYZENMRk5CUVhoQ0xFdEJRWGRDTzBGQlFVRXNVVUZCYWtJc1IwRkJhVUlzVTBGQmFrSXNSMEZCYVVJN1FVRkJRU3hSUVVGYUxGRkJRVmtzVTBGQldpeFJRVUZaT3p0QlFVTXZReXhYUVVGUExGTkJRVk1zUjBGQlZDeERRVUZoTEcxQ1FVRlhPMEZCUXpOQ0xGbEJRVTBzWjBKQlFXZENMRTlCUVU4c1RVRkJVQ3hEUVVGakxFVkJRVVVzV1VGQlJpeEZRVUZUTEZGQlFWUXNSVUZCWkN4RlFVRTRRaXhQUVVFNVFpeERRVUYwUWp0QlFVUXlRaXh2UTBGRk5rSXNaVUZCWlN4UlFVRlJMRWxCUVhaQ0xFTkJSamRDTzBGQlFVRXNXVUZGYmtJc1NVRkdiVUlzZVVKQlJXNUNMRWxCUm0xQ08wRkJRVUVzV1VGRllpeGhRVVpoTEhsQ1FVVmlMR0ZCUm1FN1FVRkJRU3haUVVWRkxFdEJSa1lzZVVKQlJVVXNTMEZHUmp0QlFVRkJMRmxCUlZNc1RVRkdWQ3g1UWtGRlV5eE5RVVpVTzBGQlFVRXNXVUZGYVVJc1QwRkdha0lzZVVKQlJXbENMRTlCUm1wQ096czdRVUZKTTBJc1pVRkJUenRCUVVOSUxITkNRVVJITzBGQlJVZ3NhMEpCUVUwc1kwRkJZeXhoUVVGa0xFTkJSa2c3UVVGSFNDeHRRa0ZCVHl4aFFVRmhMRWxCUVdJc1JVRkJiVUlzUzBGQmJrSXNRMEZJU2p0QlFVbElMREJDUVVwSE8wRkJTMGc3UVVGTVJ5eFRRVUZRTzBGQlQwZ3NTMEZZVFN4RFFVRlFPMEZCV1VnN08ydENRVVZqTEUwN096dEJRM3BOWmpzN096czdhMEpCUldVN1FVRkRXQ3hWUVVGTkxFOUJSRXM3UVVGRldDeGhRVUZUTEZGQlJrVTdRVUZIV0N4cFFrRklWeXdyUWtGSGIwSTdRVUZCUVN4WlFVRm1MRWxCUVdVc1VVRkJaaXhKUVVGbE8wRkJRVUVzV1VGQlZDeExRVUZUTEZGQlFWUXNTMEZCVXpzN1FVRkRNMElzV1VGQlRTeGpRVUZqTEcxQ1FVRnRRaXhKUVVGdVFpeERRVUZ3UWp0QlFVTkJMRmxCUVUwc1pVRkJaU3h0UWtGQmJVSXNTMEZCYmtJc1EwRkJja0k3TzBGQlJVRXNhVU5CUVhkQ0xGZEJRWGhDTEdsQ1FVRnBSQ3haUVVGcVJEdEJRVU5JTzBGQlVsVXNRenM3T3pzN096czdhMEpEUmtFN1FVRkRXQ3hWUVVGTkxGVkJSRXM3UVVGRldDeGhRVUZUTEcxQ1FVWkZPMEZCUjFnc2FVSkJTRmNzSzBKQlIxazdRVUZCUVN4WlFVRlFMRWRCUVU4c1VVRkJVQ3hIUVVGUE96dEJRVU51UWl4WlFVRk5MR0ZCUVdFc2JVSkJRVzFDTEVkQlFXNUNMRU5CUVc1Q096dEJRVVZCTEdkRlFVRjFSQ3hWUVVGMlJEdEJRVU5JTEV0QlVGVTdPMEZCVVZnc1YwRkJUenRCUVVOSUxHVkJRVThzUjBGRVNqdEJRVVZJTEdkQ1FVRlJPMEZCUmt3N1FVRlNTU3hET3pzN1FVTkJaanM3T3pzN2EwSkJSV1U3UVVGRFdDeFZRVUZOTEZGQlJFczdRVUZGV0N4aFFVRlRMR3RDUVVaRk8wRkJSMWdzYVVKQlNGY3NLMEpCUjFrN1FVRkJRU3haUVVGUUxFZEJRVThzVVVGQlVDeEhRVUZQT3p0QlFVTnVRaXhaUVVGTkxHRkJRV0VzYlVKQlFXMUNMRWRCUVc1Q0xFTkJRVzVDT3p0QlFVVkJMSE5FUVVFMlF5eFZRVUUzUXp0QlFVTklMRXRCVUZVN08wRkJVVmdzVjBGQlR6dEJRVU5JTEdWQlFVOHNSMEZFU2p0QlFVVklMR2RDUVVGUk8wRkJSa3c3UVVGU1NTeERPenM3UVVOR1pqczdPenM3YTBKQlJXVTdRVUZEV0N4VlFVRk5MRlZCUkVzN1FVRkZXQ3hoUVVGVExHMUNRVVpGTzBGQlIxZ3NhVUpCU0Zjc0swSkJSMjFDTzBGQlFVRXNXVUZCWkN4TFFVRmpMRkZCUVdRc1MwRkJZenRCUVVGQkxGbEJRVkFzUjBGQlR5eFJRVUZRTEVkQlFVODdPMEZCUXpGQ0xGbEJRVTBzWlVGQlpTeHRRa0ZCYlVJc1MwRkJia0lzUTBGQmNrSTdRVUZEUVN4WlFVRk5MR0ZCUVdFc2JVSkJRVzFDTEVkQlFXNUNMRU5CUVc1Q096dEJRVVZCTEN0RVFVRnpSQ3haUVVGMFJDeGhRVUUwUlN4VlFVRTFSVHRCUVVOSUxFdEJVbFU3TzBGQlUxZ3NWMEZCVHp0QlFVTklMR1ZCUVU4c1IwRkVTanRCUVVWSUxHZENRVUZSTzBGQlJrdzdRVUZVU1N4RE96czdRVU5HWmpzN096czdhMEpCUldVN1FVRkRXQ3hWUVVGTkxGRkJSRXM3UVVGRldDeGhRVUZUTEdsQ1FVWkZPMEZCUjFnc2FVSkJTRmNzSzBKQlIyMUNPMEZCUVVFc1dVRkJaQ3hMUVVGakxGRkJRV1FzUzBGQll6dEJRVUZCTEZsQlFWQXNSMEZCVHl4UlFVRlFMRWRCUVU4N08wRkJRekZDTEZsQlFVMHNaVUZCWlN4dFFrRkJiVUlzUzBGQmJrSXNRMEZCY2tJN1FVRkRRU3haUVVGTkxHRkJRV0VzYlVKQlFXMUNMRWRCUVc1Q0xFTkJRVzVDT3p0QlFVVkJMRzFFUVVFd1F5eFpRVUV4UXl4aFFVRm5SU3hWUVVGb1JUdEJRVU5JTEV0QlVsVTdPMEZCVTFnc1YwRkJUenRCUVVOSUxHVkJRVThzUjBGRVNqdEJRVVZJTEdkQ1FVRlJPMEZCUmt3N1FVRlVTU3hET3pzN1FVTkdaanM3T3pzN2EwSkJSV1U3UVVGRFdDeFZRVUZOTEZOQlJFczdRVUZGV0N4aFFVRlRMR3RDUVVaRk8wRkJSMWdzYVVKQlNGY3NLMEpCUnpCQ08wRkJRVUVzV1VGQmNrSXNSMEZCY1VJc1VVRkJja0lzUjBGQmNVSTdRVUZCUVN4WlFVRm9RaXhKUVVGblFpeFJRVUZvUWl4SlFVRm5RanRCUVVGQkxGbEJRVllzVFVGQlZTeFJRVUZXTEUxQlFWVTdPMEZCUTJwRExHbENRVUZUTEdGQlFWUXNSMEZCZVVJN1FVRkRja0lzWjBKQlFVMHNaVUZCWlN4SFFVRnlRanRCUVVOQkxHZENRVUZOTEhWQ1FVRjFRaXhGUVVFM1FqdEJRVU5CTEdkQ1FVRk5MRmRCUVZjc1MwRkJha0k3UVVGRFFTeG5Ra0ZCVFN3d1FrRkJNRUlzUTBGQmFFTTdRVUZEUVN4blFrRkJUU3cyUWtGQk5rSXNaVUZCWlN4dlFrRkJaaXhIUVVGelF5eFRRVUZUTEUxQlFTOURMRWRCUVhkRUxIVkNRVUV6UmpzN1FVRkZRU3huUWtGQlNTeHJRa0ZCYTBJc1JVRkJkRUk3UVVGRFFTeG5Ra0ZCU1N4RFFVRkRMRWxCUVV3c1JVRkJWenRCUVVOUUxIVkNRVUZQTEVWQlFWQTdRVUZEU0RzN1FVRkZSQ3huUWtGQlNTeE5RVUZLTEVWQlFWazdRVUZEVWl3NFEwRkJOa0lzVFVGQk4wSTdRVUZEU0RzN1FVRkZSQ3huUWtGQlNTeG5Ra0ZCWjBJc1RVRkJhRUlzU1VGQk1FSXNNRUpCUVRsQ0xFVkJRVEJFTzBGQlEzUkVMSFZDUVVGUExFVkJRVkE3UVVGRFNEczdRVUZGUkN4blFrRkJUU3huUWtGQlowSXNaVUZCWlN4dlFrRkJaaXhIUVVGelF5eFRRVUZUTEUxQlFTOURMRWRCUVhkRUxHZENRVUZuUWl4TlFVRTVSanM3UVVGRlFTeG5Ra0ZCU1N4TFFVRkxMRTFCUVV3c1IwRkJZeXhoUVVGc1FpeEZRVUZwUXp0QlFVTTNRaXgxUWtGQlR5eExRVUZMTEUxQlFVd3NRMEZCV1N4RFFVRmFMRVZCUVdVc1lVRkJaaXhKUVVGblF5eFJRVUYyUXp0QlFVTklPenRCUVVWRUxHMUNRVUZQTEVsQlFWQTdRVUZEU0RzN1FVRkZSQ3haUVVGTkxHRkJRV0VzYlVKQlFXMUNMRWRCUVc1Q0xFTkJRVzVDTzBGQlEwRXNXVUZCVFN4alFVRmpMRzFDUVVGdFFpeGxRVUZ1UWl4RFFVRndRanRCUVVOQkxGbEJRVTBzWVVGQllTeHRRa0ZCYlVJc1RVRkJia0lzUTBGQmJrSTdPMEZCUlVFc2VVUkJRV2RFTEZWQlFXaEVMR05CUVhGRkxGZEJRWEpGTEdGQlFUQkdMRlZCUVRGR08wRkJRMGdzUzBGMFExVTdPMEZCZFVOWUxGZEJRVTg3UVVGRFNDeGxRVUZQTEVkQlJFbzdRVUZGU0N4blFrRkJVVHRCUVVaTU8wRkJka05KTEVNN096dEJRMFptT3pzN096dHJRa0ZGWlR0QlFVTllMRlZCUVUwc1ZVRkVTenRCUVVWWUxHRkJRVk1zYlVKQlJrVTdRVUZIV0N4cFFrRklWeXdyUWtGSGJVSTdRVUZCUVN4WlFVRmtMRXRCUVdNc1VVRkJaQ3hMUVVGak8wRkJRVUVzV1VGQlVDeEhRVUZQTEZGQlFWQXNSMEZCVHpzN1FVRkRNVUlzV1VGQlRTeGpRVUZqTEcxQ1FVRjFRaXhMUVVGMlFpeFRRVUZyUXl4SFFVRnNReXhEUVVGd1FqczdRVUZGUVN4NVEwRkJaME1zVjBGQmFFTTdRVUZEU0N4TFFWQlZPenRCUVZGWUxGZEJRVTg3UVVGRFNDeGxRVUZQTEVkQlJFbzdRVUZGU0N4blFrRkJVVHRCUVVaTUxFdEJVa2s3UVVGWldDeFpRVUZSTzBGQldrY3NRenM3T3pzN096czdPMEZEUVdZN096czdPenRCUVVWQkxFbEJRVTBzZVVKQlFYbENMSFZDUVVFdlFqczdRVUZGUVRzN08wRkJUa0U3TzBGQlUwRXNTVUZCVFN4dlFrRkJiMEk3TzBGQlJYUkNPenM3TzBGQlNVRXNaMEpCVG5OQ0xEUkNRVTFNTzBGQlEySXNWMEZCVHl4clFrRkJVU3hIUVVGU0xFTkJRVmtzYzBKQlFWb3NUVUZCZDBNc1RVRkJMME03UVVGRFNDeEhRVkp4UWpzN08wRkJWWFJDT3pzN08wRkJTVUVzWlVGa2MwSXNNa0pCWTA0N1FVRkRXaXhSUVVGTkxFMUJRVTBzUzBGQlN5eEhRVUZNTEVWQlFWbzdRVUZEUVN4UlFVRk5MRmRCUVZjc1NVRkJTU3hKUVVGS0xFVkJRV3BDTzBGQlEwRXNZVUZCVXl4UlFVRlVMRU5CUVd0Q0xFVkJRV3hDTEVWQlFYTkNMRVZCUVhSQ0xFVkJRVEJDTEVWQlFURkNMRVZCUVRoQ0xFZEJRVGxDT3p0QlFVVkJMRkZCUVUwc1owSkJRV2RDTEV0QlFVc3NSMEZCVEN4RFFVRlRMRmRCUVZjc1IwRkJjRUlzU1VGQk1rSXNTVUZCYWtRN1FVRkRRU3h6UWtGQlVTeEhRVUZTTEVOQlFWa3NjMEpCUVZvc1JVRkJiME1zVFVGQmNFTXNSVUZCTkVNc1JVRkJSU3hSUVVGUkxHRkJRVllzUlVGQk5VTTdRVUZEU0R0QlFYSkNjVUlzUTBGQk1VSTdPMnRDUVhkQ1pTeHBRanM3T3pzN096czdPMEZETDBKbU96czdPMEZCUTBFN096czdRVUZEUVRzN096dEJRVU5CT3pzN096czdRVUZNUVRzN1FVRlBRU3hKUVVGTkxHZENRVUZuUWp0QlFVTnNRaXhWUVVGTkxGZEJSRms3UVVGRmJFSXNXVUZCVVN4SlFVWlZPMEZCUjJ4Q0xHZENRVUZaTEV0QlNFMDdRVUZKYkVJc2JVSkJRV1VzZFVKQlNrYzdRVUZMYkVJc1lVRkJVeXhIUVV4VE8wRkJUV3hDTEdOQlFWVXNSVUZPVVR0QlFVOXNRaXgzUWtGQmIwSXNZMEZRUmp0QlFWRnNRaXhuUTBGQk5FSTdRVUZEZUVJc2IwSkJRVmtzVTBGRVdUdEJRVVY0UWl4NVFrRkJhVUlzUTBGR1R6dEJRVWQ0UWl4eFFrRkJZVHRCUVVoWExFdEJVbFk3UVVGaGJFSXNPRUpCUVRCQ0xFbEJZbEk3UVVGamJFSXNhVUpCUVdFc1MwRmtTenRCUVdWc1FpeG5Ra0ZCV1N4TFFXWk5PMEZCWjBKc1Fpd3dRa0ZCYzBJc1MwRm9Ra283UVVGcFFteENMRGhDUVVFd1FqdEJRV3BDVWl4RFFVRjBRanM3UVVGdlFrRXNTVUZCVFN4elFrRkJjMElzVlVGQk5VSTdRVUZEUVN4SlFVRk5MR2xDUVVGcFFpeEpRVUZKTEV0QlFUTkNPMEZCUTBFc1NVRkJUU3gxUWtGQmRVSXNiMFZCUVRkQ08wRkJRMEVzU1VGQlRTeHpRa0ZCYzBJc1owTkJRVFZDT3p0QlFVVkJMRWxCUVUwc2JVSkJRVzFDTzBGQlJYSkNMRmxCUm5GQ0xITkNRVVZXTzBGQlFVRTdPMEZCUTFBc1dVRkJTU3hEUVVGRExFdEJRVXNzWlVGQlRDeEZRVUZNTEVWQlFUWkNPMEZCUTNwQ0xHMUNRVUZQTzBGQlEwZ3NiMEpCUkVjc2EwSkJRMGtzUTBGQlJTeERRVVJPTzBGQlJVZ3NiMEpCUmtjc2EwSkJSVWtzUTBGQlJTeERRVVpPTzBGQlIwZ3NjVUpCU0Vjc2JVSkJSMHNzUTBGQlJUdEJRVWhRTEdGQlFWQTdRVUZMU0RzN1FVRkZSQ3haUVVGSkxHbENRVUZwUWl4VFFVRlRMRzlDUVVGVUxFTkJRVGhDTEdkQ1FVRTVRaXhGUVVGblJDeERRVUZvUkN4RFFVRnlRanM3UVVGRlFTeFpRVUZKTEVOQlFVTXNZMEZCVEN4RlFVRnhRanRCUVVOcVFpdzJRa0ZCYVVJc1UwRkJVeXhoUVVGVUxFTkJRWFZDTEdkQ1FVRjJRaXhEUVVGcVFqdEJRVU5CTEhGQ1FVRlRMRWxCUVZRc1EwRkJZeXhYUVVGa0xFTkJRVEJDTEdOQlFURkNPMEZCUTBnN08wRkJSVVFzZFVKQlFXVXNVMEZCWml4SFFVRXlRaXhuUWtGQk0wSTdPMEZCUlVFc0swSkJRVkVzWTBGQlVpeEZRVUYzUWl4VlFVRkRMRXRCUVVRc1JVRkJWenRCUVVGQkxHZENRVU4yUWl4TlFVUjFRaXhIUVVOYUxFdEJSRmtzUTBGRGRrSXNUVUZFZFVJN096dEJRVWN2UWl4blFrRkJTU3d5UWtGQldTeE5RVUZhTEVWQlFXOUNMSFZDUVVGd1FpeERRVUZLTEVWQlFXdEVPMEZCUXpsRExITkNRVUZMTEZWQlFVd3NRMEZCWjBJc1MwRkJhRUk3UVVGRFFUdEJRVU5JTzBGQlJVb3NVMEZTUkRzN1FVRlZRU3hwUWtGQlV5eG5Ra0ZCVkN4RFFVRXdRaXhwUWtGQk1VSXNSVUZCTmtNc1ZVRkJReXhMUVVGRUxFVkJRVmM3UVVGRGNFUXNhMEpCUVVzc2FVSkJRVXdzUTBGQmRVSXNTMEZCZGtJN1FVRkRTQ3hUUVVaRU96dEJRVWxCTEdGQlFVc3NZMEZCVEN4SFFVRnpRaXhqUVVGMFFqczdRVUZGUVN4aFFVRkxMRXRCUVV3N08wRkJSVUVzWlVGQlR6dEJRVU5JTEd0Q1FVRk5MRXRCUVVzc1NVRkJUQ3hEUVVGVkxFbEJRVllzUTBGQlpTeEpRVUZtTEVOQlJFZzdRVUZGU0N4clFrRkJUU3hMUVVGTExFbEJRVXdzUTBGQlZTeEpRVUZXTEVOQlFXVXNTVUZCWml4RFFVWklPMEZCUjBnc2JVSkJRVThzUzBGQlN5eExRVUZNTEVOQlFWY3NTVUZCV0N4RFFVRm5RaXhKUVVGb1FqdEJRVWhLTEZOQlFWQTdRVUZMU0N4TFFUTkRiMEk3UVVFMlEzSkNMRk5CTjBOeFFpeHRRa0UyUTJJN1FVRkRTaXhoUVVGTExGbEJRVXdzUjBGQmIwSXNTMEZCU3l4alFVRk1MRU5CUVc5Q0xITkNRVUZ3UWl4RFFVRXlReXhsUVVFelF5eEZRVUUwUkN4RFFVRTFSQ3hEUVVGd1FqdEJRVU5CTEdGQlFVc3NaMEpCUVV3c1EwRkJjMElzWVVGQmRFSTdPMEZCUlVFc2JVSkJRVmNzUzBGQlN5eExRVUZNTEVOQlFWY3NTVUZCV0N4RFFVRm5RaXhKUVVGb1FpeERRVUZZTEVWQlFXdERMR05CUVd4RE8wRkJRMGdzUzBGc1JHOUNPMEZCYjBSeVFpeDNRa0Z3UkhGQ0xHdERRVzlFUlR0QlFVTnVRaXgxUWtGQlN5eGxRVUZNTEVOQlFYRkNMRXRCUVVzc1dVRkJNVUlzUlVGQmQwTXNVVUZCZUVNc1JVRkJhMFFzUzBGQlN5eE5RVUYyUkR0QlFVTklMRXRCZEVSdlFqdEJRWGRFY2tJc1kwRjRSSEZDTEhOQ1FYZEVWaXhMUVhoRVZTeEZRWGRFU0R0QlFVTmtMR05CUVUwc1kwRkJUanM3UVVGRlFTeFpRVUZKTEVOQlFVTXNTMEZCU3l4TlFVRldMRVZCUVd0Q08wRkJRMlE3UVVGRFNEczdRVUZGUkN4aFFVRkxMRTFCUVV3c1IwRkJZeXhMUVVGa08wRkJRMEVzWVVGQlN5eHZRa0ZCVERzN1FVRkZRU3haUVVGSkxFdEJRVXNzVFVGQlZDeEZRVUZwUWp0QlFVTmlMR2xDUVVGTExFMUJRVXdzUTBGQldTeEpRVUZhTzBGQlEwZzdRVUZEU2l4TFFYSkZiMEk3UVVGMVJYSkNMRkZCZGtWeFFpeHJRa0YxUldRN1FVRkRTQ3hoUVVGTExHTkJRVXdzUTBGQmIwSXNTMEZCY0VJc1EwRkJNRUlzVDBGQk1VSXNSMEZCYjBNc1JVRkJjRU03UVVGRFNDeExRWHBGYjBJN1FVRXlSWEpDTEZGQk0wVnhRaXhyUWtFeVJXUTdRVUZEU0N4aFFVRkxMRXRCUVV3N1FVRkRRU3hoUVVGTExHTkJRVXdzUTBGQmIwSXNTMEZCY0VJc1EwRkJNRUlzVDBGQk1VSXNSMEZCYjBNc1RVRkJjRU03UVVGRFNDeExRVGxGYjBJN1FVRm5SbkpDTEc5Q1FXaEdjVUlzTkVKQlowWktMRTFCYUVaSkxFVkJaMFpKTzBGQlFVRTdPMEZCUTNKQ0xGbEJRVTBzWlVGQlpTeFRRVUZtTEZsQlFXVXNRMEZCUXl4TFFVRkVMRVZCUVZjN1FVRkROVUlzWjBKQlFVMHNWVUZCVlN4UlFVRlJMRTFCUVUwc1RVRkJUaXhEUVVGaExFOUJRWEpDTEVkQlFTdENMRWxCUVM5RE8wRkJRMEVzWjBKQlFVMHNWVUZCVlN4WFFVRlhMRTlCUVU4c1QwRkJiRU03UVVGRFFTeG5Ra0ZCVFN4VlFVRlZMRTlCUVVzc1kwRkJUQ3hEUVVGdlFpeHpRa0ZCY0VJc1EwRkJNa01zYzBKQlFUTkRMRVZCUVcxRkxFTkJRVzVGTEVOQlFXaENPenRCUVVWQkxHMUNRVUZMTEUxQlFVd3NSMEZCWXl4UlFVRlJMRTFCUVZJc1EwRkRWaXhQUVVSVkxFVkJSVllzVFVGR1ZTeEZRVVZHTzBGQlEwb3NlVUpCUVZNc2JVSkJRVTA3UVVGRFdDd3lRa0ZCU3l4cFFrRkJURHRCUVVOSU8wRkJTRWNzWVVGR1JTeERRVUZrT3p0QlFWTkJMRzFDUVVGUExHMUNRVUZRTEVOQlFUSkNMR1ZCUVROQ0xFVkJRVFJETEZsQlFUVkRPMEZCUTBnc1UwRm1SRHM3UVVGcFFrRXNXVUZCU1N4UFFVRlBMRTlCUVZnc1JVRkJiMEk3UVVGRGFFSTdRVUZEUVR0QlFVTklPenRCUVVWRUxGbEJRVWtzWjBKQlFXZENMRk5CUVZNc1lVRkJWQ3hEUVVGMVFpeFJRVUYyUWl4RFFVRndRanRCUVVOQkxITkNRVUZqTEZsQlFXUXNRMEZCTWtJc1MwRkJNMElzUlVGQmMwTXNVVUZCVVN4SFFVRlNMRU5CUVZrc1owSkJRV3hFTzBGQlEwRXNjMEpCUVdNc1dVRkJaQ3hEUVVFeVFpeE5RVUV6UWl4RlFVRnRReXhwUWtGQmJrTTdRVUZEUVN4elFrRkJZeXhaUVVGa0xFTkJRVEpDTEU5QlFUTkNMRVZCUVc5RExFbEJRWEJETzBGQlEwRXNjMEpCUVdNc1dVRkJaQ3hEUVVFeVFpeGpRVUV6UWl4RlFVRXlReXhKUVVFelF6czdRVUZGUVN4bFFVRlBMR2RDUVVGUUxFTkJRWGRDTEdWQlFYaENMRVZCUVhsRExGbEJRWHBET3p0QlFVVkJMR2xDUVVGVExFbEJRVlFzUTBGQll5eFhRVUZrTEVOQlFUQkNMR0ZCUVRGQ08wRkJRMEVzZDBKQlFXZENMRWxCUVdoQ08wRkJRMGdzUzBGcVNHOUNPMEZCYlVoeVFpeFRRVzVJY1VJc2JVSkJiVWhpTzBGQlEwb3NXVUZCU1N4TFFVRkxMRTFCUVZRc1JVRkJhVUk3UVVGRFlqdEJRVU5JT3p0QlFVVkVMR0ZCUVVzc1RVRkJUQ3hIUVVGakxFbEJRV1E3UVVGRFFTeGhRVUZMTEc5Q1FVRk1PenRCUVVWQkxGbEJRVWtzUzBGQlN5eE5RVUZVTEVWQlFXbENPMEZCUTJJc2FVSkJRVXNzVFVGQlRDeERRVUZaTEV0QlFWbzdRVUZEU0R0QlFVTktMRXRCT1VodlFqdEJRV2RKY2tJc1YwRm9TWEZDTEhGQ1FXZEpXRHRCUVVOT0xGbEJRVWtzUzBGQlN5eE5RVUZVTEVWQlFXbENPMEZCUTJJc2FVSkJRVXNzVFVGQlRDeERRVUZaTEU5QlFWbzdRVUZEU0R0QlFVTktMRXRCY0VsdlFqdEJRWE5KY2tJc2JVSkJkRWx4UWl3MlFrRnpTVWc3UVVGRFpDeFpRVUZOTEZOQlFWTXNUMEZCVHl4VlFVRlFMRU5CUVd0Q0xHOUNRVUZzUWl4RlFVRjNReXhQUVVGMlJEdEJRVU5CTEZsQlFVMHNlVUpCUVhsQ0xFOUJRVThzVlVGQlVDeERRVUZyUWl4dFFrRkJiRUlzUlVGQmRVTXNUMEZCZEVVN08wRkJSVUVzWlVGQlR5eEZRVUZGTEZWQlFWVXNjMEpCUVZvc1EwRkJVRHRCUVVOSUxFdEJNMGx2UWp0QlFUWkpja0lzTUVKQk4wbHhRaXh2UTBFMlNVazdRVUZEY2tJc1pVRkJUeXhQUVVGUExFOUJRVkFzUTBGQlpTeFZRVUZtTEVkQlFUUkNMRzFDUVVFMVFpeERRVUZRTzBGQlEwZ3NTMEV2U1c5Q08wRkJhVXB5UWl4eFFrRnFTbkZDTEN0Q1FXbEtSRHRCUVVOb1FpeFpRVUZKTERSQ1FVRnJRaXhqUVVGc1FpeEZRVUZLTEVWQlFYZERPMEZCUTNCRExHbENRVUZMTEV0QlFVdzdRVUZEU0N4VFFVWkVMRTFCUlU4N1FVRkRTQ3hwUWtGQlN5eE5RVUZNTEVOQlFWa3NTVUZCV2p0QlFVTkJMSGREUVVGclFpeGhRVUZzUWp0QlFVTklPMEZCUTBvN1FVRjRTbTlDTEVOQlFYcENPenRCUVRKS1FTeFRRVUZUTEdOQlFWUXNSMEZCTUVJN1FVRkRkRUk3UVVGRFFUdEJRV2RDU0RzN2EwSkJSV01zWjBJN096czdPenM3T3p0QlEzaE5aanM3T3p0QlFVTkJPenM3T3pzN1FVRlNRVHM3UVVGRlFUczdPenM3UVVGUlFTeEpRVUZOTEdsQ1FVRnBRanRCUVVWdVFpeGpRVVp0UWl4M1FrRkZUanRCUVVOVUxGbEJRVWtzYVVKQlFVb3NSVUZCZFVJN1FVRkRia0k3UVVGRFNEczdRVUZGUkR0QlFVTkJMRzFDUVVGWExGVkJRVmc3UVVGRFNEdEJRVlJyUWl4RFFVRjJRanM3UVVGaFFTeFRRVUZUTEZWQlFWUXNSMEZCYzBJN1FVRkRiRUlzVVVGQlRTeHRRa0ZCYlVJc1UwRkJVeXhoUVVGVUxFTkJRWFZDTEhORVFVRjJRaXhEUVVGNlFqczdRVUZGUVN4UlFVRkpMRU5CUVVNc1owSkJRVXdzUlVGQmRVSTdRVUZEYmtJN1FVRkRTRHM3UVVGRlJDd3lRa0ZCVVN4cFFrRkJhVUlzU1VGQmVrSXNSVUZEU3l4SlFVUk1MRU5CUTFVc1ZVRkJVeXhKUVVGVUxFVkJRV1U3UVVGRGFrSXNXVUZCVFN4TlFVRk5MRk5CUVZNc1lVRkJWQ3hEUVVGMVFpeExRVUYyUWl4RFFVRmFPMEZCUTBFc1dVRkJTU3hUUVVGS0xFZEJRV2RDTEVsQlFXaENPenRCUVVWQkxEWkNRVUZ4UWl4SFFVRnlRanRCUVVOSUxFdEJUa3c3UVVGUFNEczdRVUZGUkN4VFFVRlRMR1ZCUVZRc1IwRkJNa0k3UVVGRGRrSXNWMEZCVHl4WlFVRlpMRk5CUVZNc1lVRkJWQ3hEUVVGMVFpeE5RVUYyUWl4RFFVRnVRanRCUVVOSU96dEJRVVZFT3pzN096dEJRVXRCTEZOQlFWTXNiMEpCUVZRc1EwRkJPRUlzU1VGQk9VSXNSVUZCYjBNN1FVRkRhRU1zVVVGQlNTeERRVUZETEV0QlFVc3NWVUZCVml4RlFVRnpRanRCUVVOc1FqdEJRVU5JT3p0QlFVVkVMRkZCUVUwc1lVRkJZU3hMUVVGTExGZEJRVXdzUTBGQmFVSXNTMEZCU3l4VlFVRjBRaXhEUVVGdVFqczdRVUZGUVN4UlFVRkpMRmRCUVZjc1QwRkJXQ3hMUVVGMVFpeFJRVUV6UWl4RlFVRnhRenRCUVVOcVF5eHBRa0ZCVXl4SlFVRlVMRU5CUVdNc1YwRkJaQ3hEUVVFd1FpeFhRVUZYTEZOQlFWZ3NSVUZCTVVJN1FVRkRRU3cyUWtGQmNVSXNTVUZCY2tJN1FVRkRRVHRCUVVOSU96dEJRVVZFTEZGQlFVMHNhVUpCUVdsQ0xGZEJRVmNzV1VGQldDeERRVUYzUWl4alFVRjRRaXhEUVVGMlFqdEJRVU5CTEZGQlFVa3NVMEZCVXl4VFFVRlRMR0ZCUVZRc1EwRkJkVUlzVVVGQmRrSXNRMEZCWWpzN1FVRkZRU3hYUVVGUExFbEJRVkFzUjBGQll5eHBRa0ZCWkR0QlFVTkJMRmRCUVU4c1IwRkJVQ3hIUVVGaExGZEJRVmNzUjBGQmVFSTdPMEZCUlVFc1VVRkJTU3hqUVVGS0xFVkJRVzlDTzBGQlEyaENMR1ZCUVU4c1dVRkJVQ3hEUVVGdlFpeGpRVUZ3UWl4RlFVRnZReXhKUVVGd1F6dEJRVU5JT3p0QlFVVkVMRzFDUVVGTExHVkJRVXdzUTBGQmNVSXNUVUZCY2tJc1JVRkJOa0lzVDBGQk4wSXNSVUZCYzBNc1YwRkJWeXhaUVVGWUxFTkJRWGRDTEU5QlFYaENMRU5CUVhSRE96dEJRVVZCT3pzN08wRkJTVUVzVjBGQlR5eE5RVUZRTEVkQlFXZENMRmxCUVZjN1FVRkRka0lzTmtKQlFYRkNMRWxCUVhKQ08wRkJRMGdzUzBGR1JEczdRVUZKUVN4aFFVRlRMRWxCUVZRc1EwRkJZeXhYUVVGa0xFTkJRVEJDTEUxQlFURkNPenRCUVVWQkxHRkJRVk1zU1VGQlZEdEJRVU5JT3p0clFrRkZZeXhqT3pzN096czdPenRyUWtOd1JWTXNjMEk3UVVGc1FuaENMRWxCUVUwc2RVSkJRWFZDTzBGQlEzcENMR0ZCUVZNc1dVRkVaMEk3UVVGRmVrSXNaVUZCVnl4alFVWmpPMEZCUjNwQ0xIRkNRVUZwUWp0QlFVaFJMRU5CUVRkQ096dEJRVTFCTEVsQlFVMHNaVUZCWlN4clFrRkJja0k3UVVGRFFTeEpRVUZOTEdkQ1FVRm5RaXhoUVVGMFFqdEJRVU5CTEVsQlFVMHNZVUZCWVN4VlFVRnVRanRCUVVOQkxFbEJRVTBzVDBGQlR5eFhRVUZpT3p0QlFVVkJMRWxCUVVrc1owTkJRVW83UVVGRFFTeEpRVUZKTEhGRFFVRktPMEZCUTBFc1NVRkJTU3h0UWtGQlNqczdRVUZGUVRzN08wRkJSMlVzVTBGQlV5eHpRa0ZCVkN4SFFVRnJRenRCUVVNM1F5eFJRVUZOTEhsQ1FVRjVRaXhWUVVGVkxGbEJRVllzUTBGQmRVSXNXVUZCZGtJc1EwRkJMMEk3TzBGQlJVRXNVVUZCVFN4dlFrRkJiMElzY1VKQlFYRkNMSE5DUVVGeVFpeERRVUV4UWp0QlFVTkJMRkZCUVUwc2JVSkJRVzFDTEhsQ1FVRjVRaXhwUWtGQmVrSXNSVUZCTkVNc2MwSkJRVFZETEVOQlFYcENPenRCUVVWQkxGZEJRVThzWjBKQlFWQXNRMEZCZDBJc1VVRkJlRUlzUlVGQmEwTXNaMEpCUVd4RE8wRkJRMGc3TzBGQlJVUTdPenM3UVVGSlFTeFRRVUZUTEU5QlFWUXNSMEZCYlVJN1FVRkRaaXhYUVVGUExGTkJRVk1zWTBGQlZDeERRVUYzUWl4UlFVRjRRaXhEUVVGUU8wRkJRMGc3TzBGQlJVUTdPenM3UVVGSlFTeFRRVUZUTEZkQlFWUXNSMEZCZFVJN1FVRkRia0lzVVVGQlRTeFZRVUZWTEZkQlFXaENPMEZCUTBFc1YwRkJUeXhSUVVGUkxGVkJRVklzUTBGQmJVSXNVVUZCYmtJc1EwRkJORUlzVFVGQk5VSXNTMEZCZFVNc1EwRkJka01zUjBGQk1rTXNVVUZCVVN4VlFVRnVSQ3hIUVVGblJTeFBRVUYyUlR0QlFVTklPenRCUVVWRU96czdPMEZCU1VFc1UwRkJVeXhUUVVGVUxFZEJRWEZDTzBGQlEycENMRmRCUVU4c1ZVRkJWU3hWUVVGcVFqdEJRVU5JT3p0QlFVVkVPenM3T3pzN1FVRk5RU3hUUVVGVExIZENRVUZVTEVOQlFXdERMR2RDUVVGc1F5eEZRVUZ2UkN4elFrRkJjRVFzUlVGQk5FVTdRVUZEZUVVc1lVRkJVeXhwUWtGQlZDeEhRVUUyUWp0QlFVTjZRaXhyUTBGQk1FSXNUMEZCVHl4UFFVRlFMRWxCUVd0Q0xGTkJRVk1zWlVGQlZDeERRVUY1UWl4VFFVRnlSVHM3UVVGRlFTeFpRVUZOTEhkQ1FVRjNRaXhWUVVGVkxGbEJRVllzUTBGQmRVSXNXVUZCZGtJc1EwRkJPVUk3TzBGQlJVRXNXVUZCU1N3d1FrRkJNRUlzYzBKQlFUbENMRVZCUVhORU8wRkJRMnhFTEcxQ1FVRlBMRzFDUVVGUUxFTkJRVEpDTEZGQlFUTkNMRVZCUVhGRExHbENRVUZ5UXp0QlFVTkJMRzFDUVVGUExIVkNRVUYxUWl4VFFVRjJRaXhEUVVGUU8wRkJRMGc3TzBGQlJVUXNXVUZCU1N4RFFVRkRMRlZCUVVRc1NVRkJaU3huUWtGQmJrSXNSVUZCY1VNN1FVRkRha01zYlVKQlFVOHNjVUpCUVZBc1EwRkJOa0lzV1VGQlRUdEJRVU12UWl4cFEwRkJhVUlzZFVKQlFXcENPMEZCUTBFc05rSkJRV0VzUzBGQllqdEJRVU5JTEdGQlNFUTdRVUZKU0RzN1FVRkZSQ3h4UWtGQllTeEpRVUZpTzBGQlEwZzdPMEZCUlVRc1VVRkJTU3huUWtGQlNpeEZRVUZ6UWp0QlFVTnNRaXg1UWtGQmFVSXNkVUpCUVdwQ08wRkJRMGc3TzBGQlJVUXNWMEZCVHl4cFFrRkJVRHRCUVVOSU96dEJRVVZFT3pzN08wRkJTVUVzVTBGQlV5eHRRa0ZCVkN4RFFVRTJRaXhqUVVFM1FpeEZRVUUyUXp0QlFVRkJMR2REUVVOSUxITkNRVUZ6UWl4alFVRjBRaXhEUVVSSE8wRkJRVUVzVVVGRGFrTXNXVUZFYVVNc2VVSkJRMnBETEZsQlJHbERPMEZCUVVFc1VVRkRia0lzVjBGRWJVSXNlVUpCUTI1Q0xGZEJSRzFDT3p0QlFVVjZReXhSUVVGTkxIRkNRVUZ4UWl4alFVRmpMRmxCUVZrc1dVRkJja1E3TzBGQlJVRXNVVUZCVFN4aFFVRmhMR2xDUVVGcFFpeERRVUZ3UXp0QlFVTkJMRkZCUVUwc1owSkJRV2RDTEdWQlFXVXNRMEZCY2tNN1FVRkRRU3hSUVVGTkxIRkNRVUZ4UWl4cFFrRkJhVUlzYTBKQlFUVkRPMEZCUTBFc1VVRkJUU3h4UWtGQmNVSXNhMEpCUVd0Q0xHdENRVUUzUXpzN1FVRkZRU3hSUVVGSkxGVkJRVW9zUlVGQlowSTdRVUZEV2p0QlFVTklPenRCUVVWRUxGRkJRVWtzYVVKQlFXbENMR3RDUVVGeVFpeEZRVUY1UXp0QlFVTnlReXh2UWtGQldTeFRRVUZhTzBGQlEwRXNhMEpCUVZVc1dVRkJWaXhEUVVGMVFpeEpRVUYyUWl4RlFVRTJRaXhQUVVFM1FqdEJRVU5CTzBGQlEwZzdPMEZCUlVRc1VVRkJTU3hwUWtGQmFVSXNhMEpCUVhKQ0xFVkJRWGxETzBGQlEzSkRMR3RDUVVGVkxGbEJRVllzUTBGQmRVSXNTVUZCZGtJc1JVRkJOa0lzWlVGQk4wSTdRVUZEU0RzN1FVRkZSRHRCUVVOSU96dEJRVVZFT3pzN08wRkJTVUVzVTBGQlV5eFpRVUZVTEVOQlFYTkNMR05CUVhSQ0xFVkJRWE5ETzBGQlFVRXNhVU5CUTBrc2MwSkJRWE5DTEdOQlFYUkNMRU5CUkVvN1FVRkJRU3hSUVVNeFFpeFpRVVF3UWl3d1FrRkRNVUlzV1VGRU1FSTdRVUZCUVN4UlFVTmFMRmRCUkZrc01FSkJRMW9zVjBGRVdUczdRVUZGYkVNc1VVRkJUU3h4UWtGQmNVSXNZMEZCWXl4WlFVRlpMRmxCUVhKRU96dEJRVVZCTEZGQlFVMHNZVUZCWVN4cFFrRkJhVUlzUTBGQmNFTTdRVUZEUVN4UlFVRk5MR2RDUVVGblFpeGxRVUZsTEVOQlFYSkRPMEZCUTBFc1VVRkJUU3h4UWtGQmNVSXNhVUpCUVdsQ0xHdENRVUUxUXp0QlFVTkJMRkZCUVUwc2NVSkJRWEZDTEd0Q1FVRnJRaXhyUWtGQk4wTTdPMEZCUlVFc1VVRkJTU3hWUVVGS0xFVkJRV2RDTzBGQlExbzdRVUZEU0RzN1FVRkZSQ3hSUVVGSkxHbENRVUZwUWl4clFrRkJja0lzUlVGQmVVTTdRVUZEY2tNc1pVRkJUeXhoUVVGUU8wRkJRMGc3TzBGQlJVUXNVVUZCU1N4clFrRkJTaXhGUVVGM1FqdEJRVU53UWl4bFFVRlBMR1ZCUVZBN1FVRkRTRHM3UVVGRlJDeFhRVUZQTEZsQlFWQTdRVUZEU0RzN1FVRkZSRHM3T3p0QlFVbEJMRk5CUVZNc1kwRkJWQ3hEUVVGM1FpeGpRVUY0UWl4RlFVRjNRenRCUVVGQkxHbERRVU5GTEhOQ1FVRnpRaXhqUVVGMFFpeERRVVJHTzBGQlFVRXNVVUZETlVJc1dVRkVORUlzTUVKQlF6VkNMRmxCUkRSQ08wRkJRVUVzVVVGRFpDeFhRVVJqTERCQ1FVTmtMRmRCUkdNN08wRkJSWEJETEZGQlFVMHNZMEZCWXl4WFFVRndRanM3UVVGRlFTeFJRVUZOTEdGQlFXRXNhVUpCUVdsQ0xFTkJRWEJETzBGQlEwRXNVVUZCVFN4dFFrRkJiVUlzYVVKQlFXbENMRmRCUVRGRE8wRkJRMEVzVVVGQlRTeHRRa0ZCYlVJc2EwSkJRV3RDTEZkQlFUTkRPenRCUVVWQkxGRkJRVWtzVlVGQlNpeEZRVUZuUWp0QlFVTmFPMEZCUTBnN08wRkJSVVFzVVVGQlNTeG5Ra0ZCU2l4RlFVRnpRanRCUVVOc1FqdEJRVU5CTEd0Q1FVRlZMRmxCUVZZc1EwRkJkVUlzU1VGQmRrSXNSVUZCTmtJc1UwRkJOMEk3UVVGRFFUdEJRVU5JT3p0QlFVVkVMRkZCUVVrc1owSkJRVW9zUlVGQmMwSTdRVUZEYkVJN1FVRkRRU3hyUWtGQlZTeFpRVUZXTEVOQlFYVkNMRWxCUVhaQ0xFVkJRVFpDTEU5QlFUZENPMEZCUTBFN1FVRkRTRHRCUVVOS096dEJRVVZFT3pzN096dEJRVXRCTEZOQlFWTXNjVUpCUVZRc1EwRkJLMElzWTBGQkwwSXNSVUZCSzBNN1FVRkRNME1zVVVGQlRTeGxRVUZsTEdsQ1FVRnBRaXcwUWtGQmRFTTdRVUZEUVN4UlFVRk5MR05CUVdNc1kwRkJZeXh4UWtGQlpDeEhRVUZ6UXl4TlFVRjBReXhIUVVFclF5eGpRVUZ1UlR0QlFVTkJMRzFEUVVFclFpeGpRVUV2UWpzN1FVRkZRU3hYUVVGUE8wRkJRMGdzYTBOQlJFYzdRVUZGU0R0QlFVWkhMRXRCUVZBN1FVRkpTRHM3UVVGRlJDeFRRVUZUTEdsQ1FVRlVMRWRCUVRaQ08wRkJRM3BDTEZkQlFVOHNXVUZCV1N4VFFVRmFMRU5CUVhOQ0xGRkJRWFJDTEVOQlFTdENMR0ZCUVM5Q0xFTkJRVkE3UVVGRFNEczdRVUZGUkRzN08wRkJSMEVzVTBGQlV5eFhRVUZVTEVkQlFYVkNPMEZCUTI1Q0xGRkJRVWtzYlVKQlFVb3NSVUZCZVVJN1FVRkRja0k3UVVGRFNEczdRVUZGUkN4UlFVRk5MRlZCUVZVc1YwRkJhRUk3TzBGQlJVRXNXVUZCVVN4VFFVRlNMRU5CUVd0Q0xFZEJRV3hDTEVOQlFYTkNMR0ZCUVhSQ08wRkJRMEVzV1VGQlVTeFRRVUZTTEVOQlFXdENMRTFCUVd4Q0xFTkJRWGxDTEZWQlFYcENPMEZCUTBnN08wRkJSVVE3T3p0QlFVZEJMRk5CUVZNc1lVRkJWQ3hIUVVGNVFqdEJRVU55UWl4UlFVRkpMRU5CUVVNc2JVSkJRVXdzUlVGQk1FSTdRVUZEZEVJN1FVRkRTRHM3UVVGRlJDeFJRVUZOTEZWQlFWVXNWMEZCYUVJN08wRkJSVUVzV1VGQlVTeFRRVUZTTEVOQlFXdENMRTFCUVd4Q0xFTkJRWGxDTEdGQlFYcENPMEZCUTBnN08wRkJSVVE3T3p0QlFVZEJMRk5CUVZNc1ZVRkJWQ3hIUVVGelFqczdRVUZGYkVJc1VVRkJTU3hEUVVGRExHMUNRVUZNTEVWQlFUQkNPMEZCUTNSQ08wRkJRMGc3TzBGQlJVUXNVVUZCVFN4VlFVRlZMRmRCUVdoQ096dEJRVVZCTEZsQlFWRXNVMEZCVWl4RFFVRnJRaXhIUVVGc1FpeERRVUZ6UWl4VlFVRjBRanRCUVVOQkxGbEJRVkVzVTBGQlVpeERRVUZyUWl4TlFVRnNRaXhEUVVGNVFpeGhRVUY2UWp0QlFVTklPenM3T3p0QlEzcFBSRHRCUVVOQkxFTkJRVU1zV1VGQlZ6czdRVUZGVWl4UlFVRkpMRTlCUVU4c1QwRkJUeXhYUVVGa0xFdEJRVGhDTEZWQlFXeERMRVZCUVRoRE8wRkJRekZETEdWQlFVOHNTMEZCVUR0QlFVTklPenRCUVVWRUxHRkJRVk1zVjBGQlZDeERRVUZ4UWl4TFFVRnlRaXhGUVVFMFFpeE5RVUUxUWl4RlFVRnZRenRCUVVOb1F5eHBRa0ZCVXl4VlFVRlZPMEZCUTJZc2NVSkJRVk1zUzBGRVRUdEJRVVZtTEhkQ1FVRlpMRXRCUmtjN1FVRkhaaXh2UWtGQlVUdEJRVWhQTEZOQlFXNUNPMEZCUzBFc1dVRkJUU3hOUVVGTkxGTkJRVk1zVjBGQlZDeERRVUZ4UWl4aFFVRnlRaXhEUVVGYU8wRkJRMEVzV1VGQlNTeGxRVUZLTEVOQlFXOUNMRXRCUVhCQ0xFVkJRVEpDTEU5QlFVOHNUMEZCYkVNc1JVRkJNa01zVDBGQlR5eFZRVUZzUkN4RlFVRTRSQ3hQUVVGUExFMUJRWEpGTzBGQlEwRXNaVUZCVHl4SFFVRlFPMEZCUTBnN08wRkJSVVFzWjBKQlFWa3NVMEZCV2l4SFFVRjNRaXhQUVVGUExFdEJRVkFzUTBGQllTeFRRVUZ5UXpzN1FVRkZRU3hYUVVGUExGZEJRVkFzUjBGQmNVSXNWMEZCY2tJN1FVRkRTQ3hEUVhCQ1JEczdPenM3UVVORFFUczdPenM3TzBGQlJVRXNUMEZCVHl4TlFVRlFMRWRCUVdkQ0xFOUJRVThzVFVGQlVDeEhRVUZuUWl4UFFVRlBMRTFCUVhaQ0xHMUNRVUZvUWl4RExFTkJTa0U3T3pzN08wRkRSVUU3T3pzN1FVRkRRVHM3T3p0QlFVTkJPenM3TzBGQlJVRTdPenM3UVVGRFFUczdPenRCUVVOQk96czdPMEZCUTBFN096czdRVUZEUVRzN096dEJRVU5CT3pzN08wRkJRMEU3T3pzN096dEJRVnBCT3p0QlFXTkJMRWxCUVUwc2RVSkJRWFZDTEhOQ1FVRTNRanM3UVVGRlFTdzJRa0ZCWXl4WlFVRlhPMEZCUTNKQ0xGRkJRVTBzVlVGQlZTeFRRVUZUTEdOQlFWUXNRMEZCZDBJc1VVRkJlRUlzUTBGQmFFSTdRVUZEUVN4UlFVRkpMSFZDUVVGS096dEJRVVZCTEZGQlFVa3NRMEZCUXl4UFFVRk1MRVZCUVdNN1FVRkRWanRCUVVOSU96dEJRVVZFTEcxQ1FVRmxMRTlCUVdZN08wRkJSVUVzYTBKQlFVa3NiMEpCUVVvc1EwRkJlVUlzVDBGQmVrSTdPMEZCUlVFc1dVRkJVU3hqUVVGU0xFZEJRWGxDTEZsQlFWYzdRVUZEYUVNc1dVRkJTU3hEUVVGRExHTkJRVXdzUlVGQmNVSTdRVUZEYWtJc05rSkJRV2xDTERKQ1FVRnBRaXhSUVVGcVFpeEZRVUZxUWp0QlFVTkJPMEZCUTBnN08wRkJSVVFzZFVKQlFXVXNTVUZCWmp0QlFVTklMRXRCVUVRN08wRkJVMEVzV1VGQlVTeGpRVUZTTEVkQlFYbENMRmxCUVZjN1FVRkRhRU1zV1VGQlNTeERRVUZETEdOQlFVd3NSVUZCY1VJN1FVRkRha0k3UVVGRFNEczdRVUZGUkN4MVFrRkJaU3hKUVVGbU8wRkJRMGdzUzBGT1JEczdRVUZSUVN4WlFVRlJMR1ZCUVZJc1IwRkJNRUlzV1VGQlZ6dEJRVU5xUXl4WlFVRkpMRU5CUVVNc1kwRkJUQ3hGUVVGeFFqdEJRVU5xUWp0QlFVTklPenRCUVVWRUxIVkNRVUZsTEV0QlFXWTdRVUZEU0N4TFFVNUVPenRCUVZGQkxESkNRVUZSTEU5QlFWSXNSVUZCYVVJc1ZVRkJVeXhMUVVGVUxFVkJRV2RDTzBGQlFVRXNXVUZEY2tJc1RVRkVjVUlzUjBGRFZpeExRVVJWTEVOQlEzSkNMRTFCUkhGQ096czdRVUZITjBJc1dVRkJTU3gxUWtGQlVTeE5RVUZTTEVWQlFXZENMRzlDUVVGb1FpeERRVUZLTEVWQlFUSkRPMEZCUTNaRE8wRkJRMEU3UVVGRFNEdEJRVVZLTEV0QlVrUTdPMEZCVlVFc1dVRkJVU3huUWtGQlVpeERRVUY1UWl4WFFVRjZRaXhGUVVGelF5eG5Ra0ZCZEVNN08wRkJSVUVzWVVGQlV5eG5Ra0ZCVkN4UFFVRnpRenRCUVVGQkxGbEJRVllzVFVGQlZTeFJRVUZXTEUxQlFWVTdPenRCUVVWc1F5eFpRVUZKTEhWQ1FVRlJMRTFCUVZJc1JVRkJaMElzYjBKQlFXaENMRU5CUVVvc1JVRkJNa003UVVGRGRrTXNiVU5CUVdFc1NVRkJZanRCUVVOQkxHOUNRVUZSTEcxQ1FVRlNMRU5CUVRSQ0xGZEJRVFZDTEVWQlFYbERMR2RDUVVGNlF6dEJRVU5CTzBGQlEwZzdRVUZGU2pzN1FVRkZSQ3hoUVVGVExIRkNRVUZVTEVkQlFXbERPMEZCUXpkQ0xGbEJRVTBzYjBKQlFXOUNMRkZCUVZFc1dVRkJVaXhEUVVGeFFpeHJRa0ZCY2tJc1RVRkJOa01zVFVGQmRrVTdRVUZEUVN4WlFVRk5MR2RDUVVGblFpeERRVUZETEdsQ1FVRjJRanM3UVVGRlFTeG5Ra0ZCVVN4WlFVRlNMRU5CUVhGQ0xHdENRVUZ5UWl4RlFVRjVReXhoUVVGNlF6czdRVUZGUVN4WlFVRkpMR0ZCUVVvc1JVRkJiVUk3UVVGRFppd3JRa0ZCVXl4UlFVRlVMRU5CUVd0Q0xGRkJRV3hDTEVWQlFUUkNMRmxCUVZjN1FVRkRia01zZDBKQlFWRXNXVUZCVWl4RFFVRnhRaXhyUWtGQmNrSXNSVUZCZVVNc1MwRkJla003UVVGRFNDeGhRVVpFT3p0QlFVbEJPMEZCUTBnN08wRkJSVVFzTWtKQlFWTXNUMEZCVkR0QlFVTklPenRCUVVWRUxHRkJRVk1zWTBGQlZDeERRVUYzUWl4UFFVRjRRaXhGUVVGcFF6dEJRVU0zUWl4WlFVRk5MR05CUVdNc1VVRkJVU3haUVVGU0xFTkJRWEZDTEdOQlFYSkNMRU5CUVhCQ08wRkJRMEVzV1VGQlNTeERRVUZETEZkQlFVd3NSVUZCYTBJN1FVRkRaRHRCUVVOSU96dEJRVVZFTEd0RFFVRm5RaXhKUVVGb1FpeEZRVUZ6UWl4RlFVRkZMSGRDUVVGR0xFVkJRWFJDTEVWQlFYVkRMR3RDUVVGMlF6dEJRVU5JT3p0QlFVVkVMSEZDUVVGUExHTkJRVkE3TzBGQlJVRXNOa0pCUVdVc1ZVRkJaanRCUVVOSUxFTkJlRVpFT3pzN096czdPenRCUTJoQ1FUczdRVUZGUVN4SlFVRk5MSEZDUVVGeFFpeERRVU4yUWl4TlFVUjFRaXhGUVVWMlFpeFZRVVoxUWl4RlFVZDJRaXhOUVVoMVFpeEZRVWwyUWl4VlFVcDFRaXhGUVV0MlFpeE5RVXgxUWl4RlFVMTJRaXhQUVU1MVFpeEZRVTkyUWl4alFWQjFRaXhGUVZGMlFpeGhRVkoxUWl4RFFVRXpRanM3UVVGWFFTeEpRVUZKTEZGQlFWRXNTVUZCV2p0QlFVTkJMRWxCUVVrc1kwRkJZeXhKUVVGc1FqdEJRVU5CTEVsQlFVa3NVVUZCVVN4SlFVRmFPMEZCUTBFc1NVRkJTU3hwUWtGQmFVSXNTVUZCY2tJN08wRkJSVUVzU1VGQlRTeFhRVUZYTzBGQlJXSXNZMEZHWVN4elFrRkZSaXhQUVVaRkxFVkJSVThzVVVGR1VDeEZRVVZwUWp0QlFVTXhRaXhuUWtGQlVTeHZRa0ZCYjBJc1QwRkJjRUlzUTBGQlVqdEJRVU5CTEhsQ1FVRnBRaXhSUVVGcVFqdEJRVU5JTEV0QlRGazdRVUZQWWl4UFFWQmhMR1ZCVDFRc1IwRlFVeXhGUVU5S0xFdEJVRWtzUlVGUFJ6dEJRVU5hTEZsQlFVa3NUVUZCVFN4SFFVRk9MRTFCUVdVc1MwRkJia0lzUlVGQk1FSTdRVUZEZEVJc2EwSkJRVTBzUjBGQlRpeEpRVUZoTEV0QlFXSTdRVUZEU0RzN1FVRkZSQ3haUVVGSkxIZENRVUYzUWl4SFFVRjRRaXhEUVVGS0xFVkJRV3RETzBGQlF6bENMREpDUVVGbExFZEJRV1lzUlVGQmIwSXNTMEZCY0VJN1FVRkRTRHRCUVVOS0xFdEJabGs3UVVGcFFtSXNaVUZxUW1Fc2RVSkJhVUpFTEU5QmFrSkRMRVZCYVVKUk8wRkJRMnBDTERKQ1FVRnRRaXhQUVVGdVFpeERRVUV5UWl4VlFVRlRMRWRCUVZRc1JVRkJZenRCUVVOeVF5eG5Ra0ZCU1N4M1FrRkJkMElzUjBGQmVFSXNRMEZCU2l4RlFVRnJRenRCUVVNNVFpeHZRa0ZCVFN4UlFVRlJMRkZCUVZFc1dVRkJVaXhYUVVFNFFpeEhRVUU1UWl4RFFVRmtPMEZCUTBFc0swSkJRV1VzUjBGQlppeEZRVUZ2UWl4TFFVRndRanRCUVVOSU8wRkJRMG9zVTBGTVJEdEJRVTFJTEV0QmVFSlpPMEZCTUVKaUxFOUJNVUpoTEdWQk1FSlVMRWRCTVVKVExFVkJNRUpLTzBGQlEwd3NaVUZCVHl4TlFVRk5MRWRCUVU0c1EwRkJVRHRCUVVOSUxFdEJOVUpaTzBGQk9FSmlMRmxCT1VKaExITkNRVGhDUmp0QlFVTlFMR1ZCUVU4c1MwRkJVRHRCUVVOSUxFdEJhRU5aTzBGQmEwTmlMRmxCYkVOaExHOUNRV3REU2l4SlFXeERTU3hGUVd0RFJTeE5RV3hEUml4RlFXdERWVHRCUVVOdVFpeFpRVUZKTEZkQlFVb3NSVUZCYVVJN1FVRkRZanRCUVVOSU96dEJRVVZFTEdkQ1FVRlJMRWxCUVZJN1FVRkRRU3h6UWtGQll5eE5RVUZrTzBGQlEwZ3NTMEY2UTFrN1FVRXlRMklzVjBFelEyRXNjVUpCTWtOSU8wRkJRMDRzWjBKQlFWRXNTVUZCVWp0QlFVTkJMSE5DUVVGakxFbEJRV1E3UVVGRFNDeExRVGxEV1R0QlFXZEVZaXhYUVdoRVlTeHRRa0ZuUkV3c1NVRm9SRXNzUlVGblJFTTdRVUZEVml4bFFVRlBMRk5CUVZNc1MwRkJhRUk3UVVGRFNEdEJRV3hFV1N4RFFVRnFRanM3UVVGelJFRXNVMEZCVXl4MVFrRkJWQ3hEUVVGcFF5eEhRVUZxUXl4RlFVRnpRenRCUVVOc1F5eFhRVUZQTEd0Q1FVRnJRaXhQUVVGUExHVkJRV1VzUjBGQlppeERRVUZRTEV0QlFTdENMRlZCUVhoRU8wRkJRMGc3TzBGQlJVUXNVMEZCVXl4dFFrRkJWQ3hEUVVFMlFpeFBRVUUzUWl4RlFVRnpRenRCUVVOc1F5eFJRVUZOTEdWQlFXVXNSVUZCY2tJN08wRkJSVUVzZFVKQlFXMUNMRTlCUVc1Q0xFTkJRVEpDTEZWQlFWTXNSMEZCVkN4RlFVRmpPMEZCUTNKRExIRkNRVUZoTEVkQlFXSXNTVUZCYjBJc1VVRkJVU3haUVVGU0xGZEJRVGhDTEVkQlFUbENMRU5CUVhCQ08wRkJRMGdzUzBGR1JEczdRVUZKUVN4WFFVRlBMRmxCUVZBN1FVRkRTRHM3YTBKQlJXTXNVVHM3T3pzN096czdRVU4wUm1ZN08wRkJSVUVzU1VGQlRTeFhRVUZYTEVOQlEySXNSVUZFWVN4RlFVVmlMRlZCUm1Fc1JVRkhZaXhOUVVoaExFTkJRV3BDT3p0QlFVMUJMRWxCUVUwc1RVRkJUVHRCUVVWU0xHRkJSbEVzY1VKQlJVVXNTMEZHUml4RlFVVlRPMEZCUTJJc1pVRkJUeXhUUVVGVExFZEJRVlFzUTBGQllUdEJRVUZCTEcxQ1FVRmpMRTFCUVdRc2JVSkJRVzlETEV0QlFYQkRPMEZCUVVFc1UwRkJZaXhGUVVFeVJDeEpRVUV6UkN4RFFVRm5SU3hIUVVGb1JTeERRVUZRTzBGQlEwZzdRVUZLVHl4RFFVRmFPenRyUWtGUlpTeEhPenM3T3pzN096dEJRMmhDWmpzN1FVRkZRU3hKUVVGTkxFOUJRVTg3UVVGRlZDeHRRa0ZHVXl3eVFrRkZUeXhGUVVaUUxFVkJSVmNzVTBGR1dDeEZRVVZ6UWl4SlFVWjBRaXhGUVVVMFFqdEJRVU5xUXl4WlFVRkpMRWxCUVVvc1JVRkJWVHRCUVVOT0xHZENRVUZOTEdkQ1FVRm5RaXhUUVVGVExHVkJRVlFzUTBGQmVVSXNVMEZCZWtJc1EwRkJkRUk3UVVGRFFTeGxRVUZITEdkQ1FVRklMRU5CUVc5Q0xHRkJRWEJDTzBGQlEwRTdRVUZEU0RzN1FVRkZSQ3hYUVVGSExHVkJRVWdzUTBGQmJVSXNVMEZCYmtJN1FVRkRTRHRCUVZaUkxFTkJRV0k3TzJ0Q1FXTmxMRWs3T3pzN096czdPenRCUTJSbU96czdPenM3UVVGRlFTeFRRVUZUTEZkQlFWUXNRMEZCY1VJc1JVRkJja0lzUlVGQmVVSXNVVUZCZWtJc1JVRkJjVVU3UVVGQlFTeFJRVUZzUXl4TFFVRnJReXgxUlVGQk1VSXNVMEZCVXl4bFFVRnBRanM3UVVGRGFrVXNVVUZCU1N4MVFrRkJVU3hGUVVGU0xFVkJRVmtzVVVGQldpeERRVUZLTEVWQlFUSkNPMEZCUTNaQ0xHVkJRVThzU1VGQlVEdEJRVU5JT3p0QlFVVkVMRkZCUVVrc1dVRkJXU3hGUVVGb1FqczdRVUZGUVN4WFFVRlBMR05CUVdNc1MwRkJja0lzUlVGQk5FSTdRVUZEZUVJc2IwSkJRVmtzVlVGQlZTeFZRVUYwUWpzN1FVRkZRU3haUVVGSkxIVkNRVUZSTEZOQlFWSXNSVUZCYlVJc1VVRkJia0lzUTBGQlNpeEZRVUZyUXp0QlFVTTVRaXh0UWtGQlR5eEpRVUZRTzBGQlEwZzdRVUZEU2pzN1FVRkZSQ3hYUVVGUExFdEJRVkE3UVVGRFNDeERMRU5CY0VKRU96dHJRa0Z6UW1Vc1Z6czdPenM3T3pzN096czdRVU4wUW1ZN08wRkJSVUU3T3pzN096czdPenRyUWtGVFpUdEJRVU5ZT3pzN096czdPMEZCVDBFc1QwRlNWeXhsUVZGUUxGVkJVazhzUlVGUlN6dEJRVU5hTEZsQlFVMHNVMEZCVXl4SlFVRkpMRTFCUVVvc1EwRkJWeXhsUVVGbExGVkJRV1lzUjBGQk5FSXNZVUZCZGtNc1EwRkJaanRCUVVOQkxGbEJRVTBzVTBGQlV5eFRRVUZUTEUxQlFWUXNRMEZCWjBJc1MwRkJhRUlzUTBGQmMwSXNUVUZCZEVJc1EwRkJaanM3UVVGRlFTeGxRVUZSTEdOQlFXTXNUVUZCWml4SFFVRjVRaXhWUVVGVkxFOUJRVThzUTBGQlVDeERRVUZXTEVOQlFYcENMRWRCUVdkRUxGTkJRWFpFTzBGQlEwZ3NTMEZpVlRzN08wRkJaVmc3T3pzN096czdPMEZCVVVFc1QwRjJRbGNzWlVGMVFsQXNWVUYyUWs4c1JVRjFRa3NzUzBGMlFrd3NSVUYxUWpCQ08wRkJRVUU3TzBGQlFVRXNXVUZCWkN4UFFVRmpMSFZGUVVGS0xFVkJRVWs3T3p0QlFVVnFReXhaUVVGTkxHMUZRVU5FTEcxQ1FVRnRRaXhWUVVGdVFpeERRVVJETEVWQlEyZERMRzFDUVVGdFFpeExRVUZ1UWl4RFFVUm9ReXd3UTBGRlNTeFJRVUZSTEVsQlJsb3NORU5CUjAwc1VVRkJVU3hOUVVoa0xEUkRRVWxOTEZGQlFWRXNUVUZLWkN3MlEwRkxUeXhSUVVGUkxFOUJUR1lzTkVOQlRVMHNVVUZCVVN4TlFVNWtMR2xDUVVGT096dEJRVk5CTEdsQ1FVRlRMRTFCUVZRc1IwRkJhMElzYzBKQlFYTkNMRmxCUVhSQ0xFTkJRV3hDTzBGQlEwZ3NTMEZ1UTFVN096dEJRWEZEV0N4cFFrRkJZVHRCUVVOVU8wRkJSRk03UVVGeVEwWXNRenM3TzBGQk1FTm1MRk5CUVZNc2NVSkJRVlFzUTBGQkswSXNXVUZCTDBJc1JVRkJOa003UVVGRGVrTXNWMEZCVHl4UFFVRlBMRWxCUVZBc1EwRkJXU3haUVVGYUxFVkJRVEJDTEUxQlFURkNMRU5CUVdsRExGVkJRVU1zVFVGQlJDeEZRVUZUTEZGQlFWUXNSVUZCYzBJN1FVRkRNVVFzV1VGQlNTeG5Ra0ZCWjBJc1lVRkJZU3hSUVVGaUxFTkJRWEJDT3p0QlFVVkJMRmxCUVVrc2EwSkJRV3RDTEZOQlFYUkNMRVZCUVdsRE8wRkJRemRDTEcxQ1FVRlBMRTFCUVZBN1FVRkRTRHM3UVVGRlJDeFpRVUZKTEdOQlFXTXNVVUZCYkVJc1JVRkJORUk3UVVGRGVFSXNaMEpCUVVrc2FVSkJRVW83TzBGQlJVRXNiMEpCUVZFc1kwRkJZeXhYUVVGMFFqdEJRVU5KTEhGQ1FVRkxMRTFCUVV3N1FVRkRTU3dyUWtGQlZ5eGhRVUZZTzBGQlEwRTdRVUZEU2l4eFFrRkJTeXhKUVVGTU8wRkJRMGtzSzBKQlFWY3NZMEZCWXl4WFFVRmtMRVZCUVZnN1FVRkRRVHRCUVU1U096dEJRVk5CTERSQ1FVRm5RaXhSUVVGb1FqdEJRVU5JT3p0QlFVVkVMRmxCUVUwc2VVSkJRVEJDTEdGQlFXRXNVVUZCWkN4SFFVRXdRaXhUUVVFeFFpeEhRVUZ6UXl4UlFVRnlSVHM3UVVGRlFTeHZRa0ZCVnl4TlFVRllMRWRCUVhOQ0xITkNRVUYwUWl4VFFVRnJSQ3hoUVVGc1JEdEJRVU5JTEV0QmVrSk5MRVZCZVVKS0xFVkJla0pKTEVWQmVVSkJMRWxCZWtKQkxFVkJRVkE3UVVFd1FrZzdPenM3T3pzN08wRkRhRVpFT3p0QlFVVkJMRk5CUVZNc1lVRkJWQ3hEUVVGMVFpeFJRVUYyUWl4RlFVRnBRenRCUVVNM1FpeFJRVUZKTEZOQlFWTXNWVUZCVkN4TFFVRjNRaXhoUVVGNFFpeEpRVUY1UXl4VFFVRlRMRlZCUVZRc1MwRkJkMElzVlVGQmNrVXNSVUZCYVVZN1FVRkROMFU3UVVGRFFUdEJRVU5JT3p0QlFVVkVMR0ZCUVZNc1owSkJRVlFzUTBGQk1FSXNhMEpCUVRGQ0xFVkJRVGhETEZGQlFUbERPMEZCUTBnN08ydENRVVZqTEdFN096czdPenM3TzBGRFdHWTdPMEZCUlVFc1UwRkJVeXhKUVVGVUxFTkJRV01zUlVGQlpDeEZRVUZyUWl4VFFVRnNRaXhGUVVFMlFpeEpRVUUzUWl4RlFVRnRRenRCUVVNdlFpeFJRVUZOTEZGQlFWRXNTVUZCU1N4WFFVRktMRU5CUVdkQ0xGTkJRV2hDTEVWQlFUSkNPMEZCUTNKRExHZENRVUZSTEVsQlJEWkNPMEZCUlhKRExHbENRVUZUTEVsQlJqUkNPMEZCUjNKRExHOUNRVUZaTzBGQlNIbENMRXRCUVROQ0xFTkJRV1E3TzBGQlRVRXNUMEZCUnl4aFFVRklMRU5CUVdsQ0xFdEJRV3BDTzBGQlEwZzdPMnRDUVVWakxFazdPenM3T3pzN08ydENRMGxUTEZVN08wRkJaSGhDT3pzN096czdRVUZGUVN4VFFVRlRMRWxCUVZRc1EwRkJZeXhIUVVGa0xFVkJRVzFDTEZGQlFXNUNMRVZCUVRaQ08wRkJRM3BDTEZGQlFVa3NVMEZCVXl4VFFVRlRMR0ZCUVZRc1EwRkJkVUlzVVVGQmRrSXNRMEZCWWpzN1FVRkZRU3hYUVVGUExFbEJRVkFzUjBGQll5eHBRa0ZCWkR0QlFVTkJMRmRCUVU4c1MwRkJVQ3hIUVVGbExFbEJRV1k3UVVGRFFTeFhRVUZQTEVkQlFWQXNSMEZCWVN4SFFVRmlPMEZCUTBFc1YwRkJUeXhOUVVGUUxFZEJRV2RDTEZGQlFXaENPenRCUVVWQkxHRkJRVk1zU1VGQlZDeERRVUZqTEZkQlFXUXNRMEZCTUVJc1RVRkJNVUk3UVVGRFFTeGhRVUZUTEVsQlFWUTdRVUZEU0N4RExFTkJaRVE3TzBGQlowSmxMRk5CUVZNc1ZVRkJWQ3hIUVVFclF6dEJRVUZCTEZGQlFUTkNMRWRCUVRKQ0xIVkZRVUZ5UWl4RlFVRnhRanRCUVVGQkxGRkJRV3BDTEZGQlFXbENPenRCUVVNeFJDeGhRVUZUTEZWQlFWUXNTMEZCZDBJc1UwRkJlRUlzUjBGRFRTeExRVUZMTEVkQlFVd3NSVUZCVlN4UlFVRldMRU5CUkU0c1IwRkZUU3hUUVVGVExHZENRVUZVTEVOQlFUQkNMR3RDUVVFeFFpeEZRVUU0UXp0QlFVRkJMR1ZCUVUwc1MwRkJTeXhIUVVGTUxFVkJRVlVzVVVGQlZpeERRVUZPTzBGQlFVRXNTMEZCT1VNc1EwRkdUanRCUVVkSU96czdPenM3T3pzN1FVTnNRa1E3T3pzN096dEJRVVZCTEVsQlFVMHNlVUpCUVhsQ0xFbEJRUzlDTEVNc1EwRktRVHM3UVVGTFFTeEpRVUZOTEhGQ1FVRnhRaXhOUVVFelFqczdRVUZGUVN4SlFVRk5MR2RDUVVGblFpeFBRVUYwUWp0QlFVTkJMRWxCUVUwc2FVSkJRV2xDTEU5QlFYWkNPMEZCUTBFc1NVRkJUU3h0UWtGQmJVSXNWVUZCZWtJN08wRkJSVUVzU1VGQlRTeFRRVUZUTEd0Q1FVRlJMRWRCUVZJc1EwRkJXU3hoUVVGYUxFTkJRV1k3UVVGRFFTeEpRVUZOTEZWQlFWVXNhMEpCUVZFc1IwRkJVaXhEUVVGWkxHTkJRVm9zUTBGQmFFSTdRVUZEUVN4SlFVRk5MR0ZCUVdFc2EwSkJRVkVzUjBGQlVpeERRVUZaTEdkQ1FVRmFMRU5CUVc1Q096dEJRVVZCTEVsQlFVMHNkVUpCUVhWQ08wRkJRM3BDTEZWQlFVMHNUVUZFYlVJN1FVRkZla0lzV1VGQlVTeE5RVVpwUWp0QlFVZDZRaXhqUVVGVkxFdEJTR1U3UVVGSmVrSXNaVUZCVnl4TFFVcGpPMEZCUzNwQ0xHTkJRVlVzUzBGTVpUdEJRVTE2UWl4alFVRlZPMEZCVG1Vc1EwRkJOMEk3TzBGQlUwRXNTVUZCVFN4M1FrRkJkMEk3UVVGRE1VSXNWVUZCVFR0QlFVUnZRaXhEUVVFNVFqczdhMEpCU1dVN1FVRkRXRHM3T3p0QlFVbEJMR0ZCVEZjc2RVSkJTME03UVVGRFVpeGxRVUZQTEZWQlFWVXNjMEpCUVdwQ08wRkJRMGdzUzBGUVZUczdPMEZCVTFnN096czdRVUZKUVN4cFFrRmlWeXd5UWtGaFN6dEJRVU5hTEdWQlFVOHNZMEZEUVN4elFrRkJjMElzUzBGQlN5eFZRVUZNTEVWQlFYUkNMRU5CUkVFc1NVRkZRU3h4UWtGQmNVSXNTMEZCU3l4VFFVRk1MRVZCUVhKQ0xFTkJSa0VzU1VGSFFTeHJRa0ZJVUR0QlFVbElMRXRCYkVKVk96czdRVUZ2UWxnN096czdRVUZKUVN4alFYaENWeXgzUWtGM1FrVTdRVUZEVkN4bFFVRlBMRmRCUVZjc2MwSkJRV3hDTzBGQlEwZzdRVUV4UWxVc1F6czdPenM3T3pzN1FVTTFRbVk3TzBGQlJVRXNVMEZCVXl4UFFVRlVMRU5CUVdsQ0xFVkJRV3BDTEVWQlFYRkNMRkZCUVhKQ0xFVkJRU3RDTzBGQlF6TkNMRkZCUVUwc1ZVRkJWU3hSUVVGUkxGTkJRWGhDTzBGQlEwRXNVVUZCVFN4VlFVRlZMRkZCUVZFc1QwRkJVaXhKUVVOYUxGRkJRVkVzWlVGRVNTeEpRVVZhTEZGQlFWRXNjVUpCUmtrc1NVRkhXaXhSUVVGUkxHdENRVWhKTEVsQlNWb3NVVUZCVVN4cFFrRktXanM3UVVGTlFTeFhRVUZQTEZGQlFWRXNTVUZCVWl4RFFVRmhMRVZCUVdJc1JVRkJhVUlzVVVGQmFrSXNRMEZCVUR0QlFVTklPenRyUWtGRll5eFBPenM3T3pzN096czdhMEpEV0VFc1dVRkJWeXhEUVVONlFpeERPenM3T3pzN096dEJRMGhFT3p0QlFVVkJMRk5CUVZNc1QwRkJWQ3hEUVVGcFFpeEZRVUZxUWl4RlFVRnhRaXhQUVVGeVFpeEZRVUU0UWp0QlFVTXhRaXhSUVVGTkxHbENRVUZwUWl4VFFVRnFRaXhqUVVGcFFpeERRVUZUTEV0QlFWUXNSVUZCWjBJN1FVRkRia01zV1VGQlNTeE5RVUZOTEdkQ1FVRk9MRWxCUVRCQ0xHbENRVUZwUWl4TFFVRnFRaXhEUVVFNVFpeEZRVUYxUkR0QlFVTnVSRHRCUVVOSU96dEJRVVZFTEdkQ1FVRlJMRWxCUVZJc1EwRkJZU3hKUVVGaUxFVkJRVzFDTEV0QlFXNUNPMEZCUTBnc1MwRk9SRHM3UVVGUlFTeFBRVUZITEdkQ1FVRklMRU5CUVc5Q0xFOUJRWEJDTEVWQlFUWkNMR05CUVRkQ096dEJRVVZCTEZkQlFVOHNZMEZCVUR0QlFVTklPenRCUVVWRUxGTkJRVk1zWjBKQlFWUXNRMEZCTUVJc1MwRkJNVUlzUlVGQmFVTTdRVUZETjBJN096czdRVUZKUVN4WFFVRlBMRTFCUVUwc1RVRkJUaXhKUVVGblFpeE5RVUZOTEUxQlFYUkNMRWxCUVdkRExFMUJRVTBzVDBGQmRFTXNTVUZCYVVRc1RVRkJUU3hQUVVGMlJDeEpRVUZyUlN4TlFVRk5MRkZCUVM5Rk8wRkJRMGc3YTBKQlEyTXNUenM3T3pzN096czdhMEpEVGxNc1R6dEJRV3BDZUVJN08wRkJSVUVzVTBGQlV5eFBRVUZVTEVOQlFXbENMRk5CUVdwQ0xFVkJRVFJDTEVsQlFUVkNMRVZCUVd0RE8wRkJRemxDTEdOQlFWVXNUMEZCVml4RFFVRnJRanRCUVVGQkxHVkJRVmtzVTBGQlV5eEpRVUZVTEVOQlFWbzdRVUZCUVN4TFFVRnNRanRCUVVOSU96dEJRVVZFTEZOQlFWTXNTMEZCVkN4RFFVRmxMRWxCUVdZc1JVRkJjVUk3UVVGRGFrSXNVVUZCU1R0QlFVTkJMR1ZCUVU4c1QwRkJUeXhOUVVGUUxFTkJRV01zUzBGQlN5eExRVUZNTEVOQlFWY3NTVUZCV0N4RFFVRmtMRU5CUVZBN1FVRkRTQ3hMUVVaRUxFTkJSVVVzVDBGQlR5eExRVUZRTEVWQlFXTTdRVUZEV2l4bFFVRlBMRWxCUVZBN1FVRkRTRHRCUVVOS096dEJRVVZFT3pzN1FVRkhaU3hUUVVGVExFOUJRVlFzUTBGQmFVSXNSMEZCYWtJc1JVRkJjMEk3UVVGRGFrTXNVVUZCVFN4alFVRmpMRWxCUVVrc1kwRkJTaXhGUVVGd1FqdEJRVU5CTEZGQlFVMHNjVUpCUVhGQ0xFVkJRVE5DTzBGQlEwRXNVVUZCVFN4dFFrRkJiVUlzUlVGQmVrSTdPMEZCUlVFc1VVRkJTU3hoUVVGS096dEJRVVZCTEdGQlFWTXNXVUZCVkN4SFFVRjNRanRCUVVOd1FpeG5Ra0ZCVVN4blFrRkJVanRCUVVOSU96dEJRVVZFTEdGQlFWTXNaVUZCVkN4SFFVRXlRanRCUVVOMlFpeFpRVUZKTEZsQlFWa3NUVUZCV2l4TFFVRjFRaXhIUVVFelFpeEZRVUZuUXp0QlFVTTFRaXh2UWtGQlVTeG5Ra0ZCVWp0QlFVTkJPMEZCUTBnN08wRkJTbk5DTEZsQlRXWXNXVUZPWlN4SFFVMUZMRmRCVGtZc1EwRk5aaXhaUVU1bE96dEJRVTkyUWl4bFFVRlBMRTFCUVUwc1dVRkJUaXhEUVVGUU96dEJRVVZCTEdkQ1FVRlJMR3RDUVVGU0xFVkJRVFJDTEVsQlFUVkNPMEZCUTBnN08wRkJSVVFzWjBKQlFWa3NaMEpCUVZvc1EwRkJOa0lzVFVGQk4wSXNSVUZCY1VNc1pVRkJja003UVVGRFFTeG5Ra0ZCV1N4blFrRkJXaXhEUVVFMlFpeFBRVUUzUWl4RlFVRnpReXhaUVVGMFF6dEJRVU5CTEdkQ1FVRlpMR2RDUVVGYUxFTkJRVFpDTEU5QlFUZENMRVZCUVhORExGbEJRWFJET3p0QlFVVkJMR2RDUVVGWkxFbEJRVm9zUTBGQmFVSXNTMEZCYWtJc1JVRkJkMElzUjBGQmVFSXNSVUZCTmtJc1NVRkJOMEk3UVVGRFFTeG5Ra0ZCV1N4SlFVRmFPenRCUVVWQkxGZEJRVTg3UVVGRFNDeFpRVVJITEdkQ1FVTkZMRkZCUkVZc1JVRkRXVHRCUVVOWUxHZENRVUZKTEU5QlFVOHNVVUZCVUN4TFFVRnZRaXhWUVVGNFFpeEZRVUZ2UXp0QlFVTm9ReXgxUWtGQlR5eEpRVUZRTzBGQlEwZzdPMEZCUlVRc1owSkJRVWtzU1VGQlNpeEZRVUZWTzBGQlEwNHNlVUpCUVZNc1NVRkJWRHRCUVVOSUxHRkJSa1FzVFVGRlR6dEJRVU5JTEcxRFFVRnRRaXhKUVVGdVFpeERRVUYzUWl4UlFVRjRRanRCUVVOSU96dEJRVVZFTEcxQ1FVRlBMRWxCUVZBN1FVRkRTQ3hUUVdKRk8wRkJaVWdzWVVGbVJ5eHJRa0ZsUnl4UlFXWklMRVZCWldFN1FVRkRXaXhuUWtGQlNTeFBRVUZQTEZGQlFWQXNTMEZCYjBJc1ZVRkJlRUlzUlVGQmIwTTdRVUZEYUVNc2FVTkJRV2xDTEVsQlFXcENMRU5CUVhOQ0xGRkJRWFJDTzBGQlEwZzdPMEZCUlVRc2JVSkJRVThzU1VGQlVEdEJRVU5JTzBGQmNrSkZMRXRCUVZBN1FVRjFRa2dpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpaG1kVzVqZEdsdmJpQmxLSFFzYml4eUtYdG1kVzVqZEdsdmJpQnpLRzhzZFNsN2FXWW9JVzViYjEwcGUybG1LQ0YwVzI5ZEtYdDJZWElnWVQxMGVYQmxiMllnY21WeGRXbHlaVDA5WENKbWRXNWpkR2x2Ymx3aUppWnlaWEYxYVhKbE8ybG1LQ0YxSmlaaEtYSmxkSFZ5YmlCaEtHOHNJVEFwTzJsbUtHa3BjbVYwZFhKdUlHa29ieXdoTUNrN2RtRnlJR1k5Ym1WM0lFVnljbTl5S0Z3aVEyRnVibTkwSUdacGJtUWdiVzlrZFd4bElDZGNJaXR2SzF3aUoxd2lLVHQwYUhKdmR5Qm1MbU52WkdVOVhDSk5UMFJWVEVWZlRrOVVYMFpQVlU1RVhDSXNabjEyWVhJZ2JEMXVXMjlkUFh0bGVIQnZjblJ6T250OWZUdDBXMjlkV3pCZExtTmhiR3dvYkM1bGVIQnZjblJ6TEdaMWJtTjBhVzl1S0dVcGUzWmhjaUJ1UFhSYmIxMWJNVjFiWlYwN2NtVjBkWEp1SUhNb2JqOXVPbVVwZlN4c0xHd3VaWGh3YjNKMGN5eGxMSFFzYml4eUtYMXlaWFIxY200Z2JsdHZYUzVsZUhCdmNuUnpmWFpoY2lCcFBYUjVjR1Z2WmlCeVpYRjFhWEpsUFQxY0ltWjFibU4wYVc5dVhDSW1KbkpsY1hWcGNtVTdabTl5S0haaGNpQnZQVEE3Ynp4eUxteGxibWQwYUR0dkt5c3BjeWh5VzI5ZEtUdHlaWFIxY200Z2MzMHBJaXdpY21WeGRXbHlaU2duTGk0dkxpNHZiVzlrZFd4bGN5OWxjell1YjJKcVpXTjBMbUZ6YzJsbmJpY3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TGk4dUxpOXRiMlIxYkdWekx5UXVZMjl5WlNjcExrOWlhbVZqZEM1aGMzTnBaMjQ3SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlocGRDbDdYRzRnSUdsbUtIUjVjR1Z2WmlCcGRDQWhQU0FuWm5WdVkzUnBiMjRuS1hSb2NtOTNJRlI1Y0dWRmNuSnZjaWhwZENBcklDY2dhWE1nYm05MElHRWdablZ1WTNScGIyNGhKeWs3WEc0Z0lISmxkSFZ5YmlCcGREdGNibjA3SWl3aWRtRnlJSFJ2VTNSeWFXNW5JRDBnZTMwdWRHOVRkSEpwYm1jN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNG9hWFFwZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2hwZENrdWMyeHBZMlVvT0N3Z0xURXBPMXh1ZlRzaUxDSjJZWElnWTI5eVpTQTlJRzF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlM1psY25OcGIyNDZJQ2N4TGpJdU5pZDlPMXh1YVdZb2RIbHdaVzltSUY5ZlpTQTlQU0FuYm5WdFltVnlKeWxmWDJVZ1BTQmpiM0psT3lBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxc2FXNWxJRzV2TFhWdVpHVm1JaXdpTHk4Z2IzQjBhVzl1WVd3Z0x5QnphVzF3YkdVZ1kyOXVkR1Y0ZENCaWFXNWthVzVuWEc1MllYSWdZVVoxYm1OMGFXOXVJRDBnY21WeGRXbHlaU2duTGk4a0xtRXRablZ1WTNScGIyNG5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRvWm00c0lIUm9ZWFFzSUd4bGJtZDBhQ2w3WEc0Z0lHRkdkVzVqZEdsdmJpaG1iaWs3WEc0Z0lHbG1LSFJvWVhRZ1BUMDlJSFZ1WkdWbWFXNWxaQ2x5WlhSMWNtNGdabTQ3WEc0Z0lITjNhWFJqYUNoc1pXNW5kR2dwZTF4dUlDQWdJR05oYzJVZ01Ub2djbVYwZFhKdUlHWjFibU4wYVc5dUtHRXBlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVMbU5oYkd3b2RHaGhkQ3dnWVNrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JqWVhObElESTZJSEpsZEhWeWJpQm1kVzVqZEdsdmJpaGhMQ0JpS1h0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXNJR0lwTzF4dUlDQWdJSDA3WEc0Z0lDQWdZMkZ6WlNBek9pQnlaWFIxY200Z1puVnVZM1JwYjI0b1lTd2dZaXdnWXlsN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWm00dVkyRnNiQ2gwYUdGMExDQmhMQ0JpTENCaktUdGNiaUFnSUNCOU8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlndktpQXVMaTVoY21keklDb3ZLWHRjYmlBZ0lDQnlaWFIxY200Z1ptNHVZWEJ3Ykhrb2RHaGhkQ3dnWVhKbmRXMWxiblJ6S1R0Y2JpQWdmVHRjYm4wN0lpd2lMeThnTnk0eUxqRWdVbVZ4ZFdseVpVOWlhbVZqZEVOdlpYSmphV0pzWlNoaGNtZDFiV1Z1ZENsY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b2FYUXBlMXh1SUNCcFppaHBkQ0E5UFNCMWJtUmxabWx1WldRcGRHaHliM2NnVkhsd1pVVnljbTl5S0Z3aVEyRnVKM1FnWTJGc2JDQnRaWFJvYjJRZ2IyNGdJRndpSUNzZ2FYUXBPMXh1SUNCeVpYUjFjbTRnYVhRN1hHNTlPeUlzSW5aaGNpQm5iRzlpWVd3Z0lDQWdQU0J5WlhGMWFYSmxLQ2N1THlRdVoyeHZZbUZzSnlsY2JpQWdMQ0JqYjNKbElDQWdJQ0FnUFNCeVpYRjFhWEpsS0NjdUx5UXVZMjl5WlNjcFhHNGdJQ3dnWTNSNElDQWdJQ0FnSUQwZ2NtVnhkV2x5WlNnbkxpOGtMbU4wZUNjcFhHNGdJQ3dnVUZKUFZFOVVXVkJGSUQwZ0ozQnliM1J2ZEhsd1pTYzdYRzVjYm5aaGNpQWtaWGh3YjNKMElEMGdablZ1WTNScGIyNG9kSGx3WlN3Z2JtRnRaU3dnYzI5MWNtTmxLWHRjYmlBZ2RtRnlJRWxUWDBaUFVrTkZSQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMa1pjYmlBZ0lDQXNJRWxUWDBkTVQwSkJUQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMa2RjYmlBZ0lDQXNJRWxUWDFOVVFWUkpReUE5SUhSNWNHVWdKaUFrWlhod2IzSjBMbE5jYmlBZ0lDQXNJRWxUWDFCU1QxUlBJQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMbEJjYmlBZ0lDQXNJRWxUWDBKSlRrUWdJQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMa0pjYmlBZ0lDQXNJRWxUWDFkU1FWQWdJQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMbGRjYmlBZ0lDQXNJR1Y0Y0c5eWRITWdJQ0E5SUVsVFgwZE1UMEpCVENBL0lHTnZjbVVnT2lCamIzSmxXMjVoYldWZElIeDhJQ2hqYjNKbFcyNWhiV1ZkSUQwZ2UzMHBYRzRnSUNBZ0xDQjBZWEpuWlhRZ0lDQWdQU0JKVTE5SFRFOUNRVXdnUHlCbmJHOWlZV3dnT2lCSlUxOVRWRUZVU1VNZ1B5Qm5iRzlpWVd4YmJtRnRaVjBnT2lBb1oyeHZZbUZzVzI1aGJXVmRJSHg4SUh0OUtWdFFVazlVVDFSWlVFVmRYRzRnSUNBZ0xDQnJaWGtzSUc5M2Jpd2diM1YwTzF4dUlDQnBaaWhKVTE5SFRFOUNRVXdwYzI5MWNtTmxJRDBnYm1GdFpUdGNiaUFnWm05eUtHdGxlU0JwYmlCemIzVnlZMlVwZTF4dUlDQWdJQzh2SUdOdmJuUmhhVzV6SUdsdUlHNWhkR2wyWlZ4dUlDQWdJRzkzYmlBOUlDRkpVMTlHVDFKRFJVUWdKaVlnZEdGeVoyVjBJQ1ltSUd0bGVTQnBiaUIwWVhKblpYUTdYRzRnSUNBZ2FXWW9iM2R1SUNZbUlHdGxlU0JwYmlCbGVIQnZjblJ6S1dOdmJuUnBiblZsTzF4dUlDQWdJQzh2SUdWNGNHOXlkQ0J1WVhScGRtVWdiM0lnY0dGemMyVmtYRzRnSUNBZ2IzVjBJRDBnYjNkdUlEOGdkR0Z5WjJWMFcydGxlVjBnT2lCemIzVnlZMlZiYTJWNVhUdGNiaUFnSUNBdkx5QndjbVYyWlc1MElHZHNiMkpoYkNCd2IyeHNkWFJwYjI0Z1ptOXlJRzVoYldWemNHRmpaWE5jYmlBZ0lDQmxlSEJ2Y25SelcydGxlVjBnUFNCSlUxOUhURTlDUVV3Z0ppWWdkSGx3Wlc5bUlIUmhjbWRsZEZ0clpYbGRJQ0U5SUNkbWRXNWpkR2x2YmljZ1B5QnpiM1Z5WTJWYmEyVjVYVnh1SUNBZ0lDOHZJR0pwYm1RZ2RHbHRaWEp6SUhSdklHZHNiMkpoYkNCbWIzSWdZMkZzYkNCbWNtOXRJR1Y0Y0c5eWRDQmpiMjUwWlhoMFhHNGdJQ0FnT2lCSlUxOUNTVTVFSUNZbUlHOTNiaUEvSUdOMGVDaHZkWFFzSUdkc2IySmhiQ2xjYmlBZ0lDQXZMeUIzY21Gd0lHZHNiMkpoYkNCamIyNXpkSEoxWTNSdmNuTWdabTl5SUhCeVpYWmxiblFnWTJoaGJtZGxJSFJvWlcwZ2FXNGdiR2xpY21GeWVWeHVJQ0FnSURvZ1NWTmZWMUpCVUNBbUppQjBZWEpuWlhSYmEyVjVYU0E5UFNCdmRYUWdQeUFvWm5WdVkzUnBiMjRvUXlsN1hHNGdJQ0FnSUNCMllYSWdSaUE5SUdaMWJtTjBhVzl1S0hCaGNtRnRLWHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQkRJRDhnYm1WM0lFTW9jR0Z5WVcwcElEb2dReWh3WVhKaGJTazdYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdSbHRRVWs5VVQxUlpVRVZkSUQwZ1ExdFFVazlVVDFSWlVFVmRPMXh1SUNBZ0lDQWdjbVYwZFhKdUlFWTdYRzRnSUNBZ0x5OGdiV0ZyWlNCemRHRjBhV01nZG1WeWMybHZibk1nWm05eUlIQnliM1J2ZEhsd1pTQnRaWFJvYjJSelhHNGdJQ0FnZlNrb2IzVjBLU0E2SUVsVFgxQlNUMVJQSUNZbUlIUjVjR1Z2WmlCdmRYUWdQVDBnSjJaMWJtTjBhVzl1SnlBL0lHTjBlQ2hHZFc1amRHbHZiaTVqWVd4c0xDQnZkWFFwSURvZ2IzVjBPMXh1SUNBZ0lHbG1LRWxUWDFCU1QxUlBLU2hsZUhCdmNuUnpXMUJTVDFSUFZGbFFSVjBnZkh3Z0tHVjRjRzl5ZEhOYlVGSlBWRTlVV1ZCRlhTQTlJSHQ5S1NsYmEyVjVYU0E5SUc5MWREdGNiaUFnZlZ4dWZUdGNiaTh2SUhSNWNHVWdZbWwwYldGd1hHNGtaWGh3YjNKMExrWWdQU0F4T3lBZ0x5OGdabTl5WTJWa1hHNGtaWGh3YjNKMExrY2dQU0F5T3lBZ0x5OGdaMnh2WW1Gc1hHNGtaWGh3YjNKMExsTWdQU0EwT3lBZ0x5OGdjM1JoZEdsalhHNGtaWGh3YjNKMExsQWdQU0E0T3lBZ0x5OGdjSEp2ZEc5Y2JpUmxlSEJ2Y25RdVFpQTlJREUyT3lBdkx5QmlhVzVrWEc0a1pYaHdiM0owTGxjZ1BTQXpNanNnTHk4Z2QzSmhjRnh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0FrWlhod2IzSjBPeUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRvWlhobFl5bDdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUNFaFpYaGxZeWdwTzF4dUlDQjlJR05oZEdOb0tHVXBlMXh1SUNBZ0lISmxkSFZ5YmlCMGNuVmxPMXh1SUNCOVhHNTlPeUlzSWk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOTZiRzlwY205amF5OWpiM0psTFdwekwybHpjM1ZsY3k4NE5pTnBjM04xWldOdmJXMWxiblF0TVRFMU56VTVNREk0WEc1MllYSWdaMnh2WW1Gc0lEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjBlWEJsYjJZZ2QybHVaRzkzSUNFOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUhkcGJtUnZkeTVOWVhSb0lEMDlJRTFoZEdoY2JpQWdQeUIzYVc1a2IzY2dPaUIwZVhCbGIyWWdjMlZzWmlBaFBTQW5kVzVrWldacGJtVmtKeUFtSmlCelpXeG1MazFoZEdnZ1BUMGdUV0YwYUNBL0lITmxiR1lnT2lCR2RXNWpkR2x2YmlnbmNtVjBkWEp1SUhSb2FYTW5LU2dwTzF4dWFXWW9kSGx3Wlc5bUlGOWZaeUE5UFNBbmJuVnRZbVZ5SnlsZlgyY2dQU0JuYkc5aVlXdzdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRkVzVrWldZaUxDSXZMeUJtWVd4c1ltRmpheUJtYjNJZ2JtOXVMV0Z5Y21GNUxXeHBhMlVnUlZNeklHRnVaQ0J1YjI0dFpXNTFiV1Z5WVdKc1pTQnZiR1FnVmpnZ2MzUnlhVzVuYzF4dWRtRnlJR052WmlBOUlISmxjWFZwY21Vb0p5NHZKQzVqYjJZbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdUMkpxWldOMEtDZDZKeWt1Y0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVb01Da2dQeUJQWW1wbFkzUWdPaUJtZFc1amRHbHZiaWhwZENsN1hHNGdJSEpsZEhWeWJpQmpiMllvYVhRcElEMDlJQ2RUZEhKcGJtY25JRDhnYVhRdWMzQnNhWFFvSnljcElEb2dUMkpxWldOMEtHbDBLVHRjYm4wN0lpd2lkbUZ5SUNSUFltcGxZM1FnUFNCUFltcGxZM1E3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0Y2JpQWdZM0psWVhSbE9pQWdJQ0FnSkU5aWFtVmpkQzVqY21WaGRHVXNYRzRnSUdkbGRGQnliM1J2T2lBZ0lDUlBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllzWEc0Z0lHbHpSVzUxYlRvZ0lDQWdJSHQ5TG5CeWIzQmxjblI1U1hORmJuVnRaWEpoWW14bExGeHVJQ0JuWlhSRVpYTmpPaUFnSUNBa1QySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVSR1Z6WTNKcGNIUnZjaXhjYmlBZ2MyVjBSR1Z6WXpvZ0lDQWdKRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVN4Y2JpQWdjMlYwUkdWelkzTTZJQ0FnSkU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGFXVnpMRnh1SUNCblpYUkxaWGx6T2lBZ0lDQWtUMkpxWldOMExtdGxlWE1zWEc0Z0lHZGxkRTVoYldWek9pQWdJQ1JQWW1wbFkzUXVaMlYwVDNkdVVISnZjR1Z5ZEhsT1lXMWxjeXhjYmlBZ1oyVjBVM2x0WW05c2N6b2dKRTlpYW1WamRDNW5aWFJQZDI1UWNtOXdaWEowZVZONWJXSnZiSE1zWEc0Z0lHVmhZMmc2SUNBZ0lDQWdJRnRkTG1admNrVmhZMmhjYm4wN0lpd2lMeThnTVRrdU1TNHlMakVnVDJKcVpXTjBMbUZ6YzJsbmJpaDBZWEpuWlhRc0lITnZkWEpqWlN3Z0xpNHVLVnh1ZG1GeUlDUWdJQ0FnSUNBZ0lEMGdjbVZ4ZFdseVpTZ25MaThrSnlsY2JpQWdMQ0IwYjA5aWFtVmpkQ0E5SUhKbGNYVnBjbVVvSnk0dkpDNTBieTF2WW1wbFkzUW5LVnh1SUNBc0lFbFBZbXBsWTNRZ0lEMGdjbVZ4ZFdseVpTZ25MaThrTG1sdlltcGxZM1FuS1R0Y2JseHVMeThnYzJodmRXeGtJSGR2Y21zZ2QybDBhQ0J6ZVcxaWIyeHpJR0Z1WkNCemFHOTFiR1FnYUdGMlpTQmtaWFJsY20xcGJtbHpkR2xqSUhCeWIzQmxjblI1SUc5eVpHVnlJQ2hXT0NCaWRXY3BYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEpsY1hWcGNtVW9KeTR2SkM1bVlXbHNjeWNwS0daMWJtTjBhVzl1S0NsN1hHNGdJSFpoY2lCaElEMGdUMkpxWldOMExtRnpjMmxuYmx4dUlDQWdJQ3dnUVNBOUlIdDlYRzRnSUNBZ0xDQkNJRDBnZTMxY2JpQWdJQ0FzSUZNZ1BTQlRlVzFpYjJ3b0tWeHVJQ0FnSUN3Z1N5QTlJQ2RoWW1Oa1pXWm5hR2xxYTJ4dGJtOXdjWEp6ZENjN1hHNGdJRUZiVTEwZ1BTQTNPMXh1SUNCTExuTndiR2wwS0NjbktTNW1iM0pGWVdOb0tHWjFibU4wYVc5dUtHc3BleUJDVzJ0ZElEMGdhenNnZlNrN1hHNGdJSEpsZEhWeWJpQmhLSHQ5TENCQktWdFRYU0FoUFNBM0lIeDhJRTlpYW1WamRDNXJaWGx6S0dFb2UzMHNJRUlwS1M1cWIybHVLQ2NuS1NBaFBTQkxPMXh1ZlNrZ1B5Qm1kVzVqZEdsdmJpQmhjM05wWjI0b2RHRnlaMlYwTENCemIzVnlZMlVwZXlBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxc2FXNWxJRzV2TFhWdWRYTmxaQzEyWVhKelhHNGdJSFpoY2lCVUlDQWdJQ0E5SUhSdlQySnFaV04wS0hSaGNtZGxkQ2xjYmlBZ0lDQXNJQ1FrSUNBZ0lEMGdZWEpuZFcxbGJuUnpYRzRnSUNBZ0xDQWtKR3hsYmlBOUlDUWtMbXhsYm1kMGFGeHVJQ0FnSUN3Z2FXNWtaWGdnUFNBeFhHNGdJQ0FnTENCblpYUkxaWGx6SUNBZ0lEMGdKQzVuWlhSTFpYbHpYRzRnSUNBZ0xDQm5aWFJUZVcxaWIyeHpJRDBnSkM1blpYUlRlVzFpYjJ4elhHNGdJQ0FnTENCcGMwVnVkVzBnSUNBZ0lEMGdKQzVwYzBWdWRXMDdYRzRnSUhkb2FXeGxLQ1FrYkdWdUlENGdhVzVrWlhncGUxeHVJQ0FnSUhaaGNpQlRJQ0FnSUNBZ1BTQkpUMkpxWldOMEtDUWtXMmx1WkdWNEt5dGRLVnh1SUNBZ0lDQWdMQ0JyWlhseklDQWdQU0JuWlhSVGVXMWliMnh6SUQ4Z1oyVjBTMlY1Y3loVEtTNWpiMjVqWVhRb1oyVjBVM2x0WW05c2N5aFRLU2tnT2lCblpYUkxaWGx6S0ZNcFhHNGdJQ0FnSUNBc0lHeGxibWQwYUNBOUlHdGxlWE11YkdWdVozUm9YRzRnSUNBZ0lDQXNJR29nSUNBZ0lDQTlJREJjYmlBZ0lDQWdJQ3dnYTJWNU8xeHVJQ0FnSUhkb2FXeGxLR3hsYm1kMGFDQStJR29wYVdZb2FYTkZiblZ0TG1OaGJHd29VeXdnYTJWNUlEMGdhMlY1YzF0cUt5dGRLU2xVVzJ0bGVWMGdQU0JUVzJ0bGVWMDdYRzRnSUgxY2JpQWdjbVYwZFhKdUlGUTdYRzU5SURvZ1QySnFaV04wTG1GemMybG5ianNpTENJdkx5QTNMakV1TVRNZ1ZHOVBZbXBsWTNRb1lYSm5kVzFsYm5RcFhHNTJZWElnWkdWbWFXNWxaQ0E5SUhKbGNYVnBjbVVvSnk0dkpDNWtaV1pwYm1Wa0p5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVLR2wwS1h0Y2JpQWdjbVYwZFhKdUlFOWlhbVZqZENoa1pXWnBibVZrS0dsMEtTazdYRzU5T3lJc0lpOHZJREU1TGpFdU15NHhJRTlpYW1WamRDNWhjM05wWjI0b2RHRnlaMlYwTENCemIzVnlZMlVwWEc1MllYSWdKR1Y0Y0c5eWRDQTlJSEpsY1hWcGNtVW9KeTR2SkM1bGVIQnZjblFuS1R0Y2JseHVKR1Y0Y0c5eWRDZ2taWGh3YjNKMExsTWdLeUFrWlhod2IzSjBMa1lzSUNkUFltcGxZM1FuTENCN1lYTnphV2R1T2lCeVpYRjFhWEpsS0NjdUx5UXViMkpxWldOMExXRnpjMmxuYmljcGZTazdJaXdpTHlvcVhHNGdLaUJzYjJSaGMyZ2dLRU4xYzNSdmJTQkNkV2xzWkNrZ1BHaDBkSEJ6T2k4dmJHOWtZWE5vTG1OdmJTOCtYRzRnS2lCQ2RXbHNaRG9nWUd4dlpHRnphQ0J0YjJSMWJHRnlhWHBsSUdWNGNHOXlkSE05WENKdWNHMWNJaUF0YnlBdUwyQmNiaUFxSUVOdmNIbHlhV2RvZENCcVVYVmxjbmtnUm05MWJtUmhkR2x2YmlCaGJtUWdiM1JvWlhJZ1kyOXVkSEpwWW5WMGIzSnpJRHhvZEhSd2N6b3ZMMnB4ZFdWeWVTNXZjbWN2UGx4dUlDb2dVbVZzWldGelpXUWdkVzVrWlhJZ1RVbFVJR3hwWTJWdWMyVWdQR2gwZEhCek9pOHZiRzlrWVhOb0xtTnZiUzlzYVdObGJuTmxQbHh1SUNvZ1FtRnpaV1FnYjI0Z1ZXNWtaWEp6WTI5eVpTNXFjeUF4TGpndU15QThhSFIwY0RvdkwzVnVaR1Z5YzJOdmNtVnFjeTV2Y21jdlRFbERSVTVUUlQ1Y2JpQXFJRU52Y0hseWFXZG9kQ0JLWlhKbGJYa2dRWE5vYTJWdVlYTXNJRVJ2WTNWdFpXNTBRMnh2ZFdRZ1lXNWtJRWx1ZG1WemRHbG5ZWFJwZG1VZ1VtVndiM0owWlhKeklDWWdSV1JwZEc5eWMxeHVJQ292WEc1Y2JpOHFLaUJWYzJWa0lHRnpJSEpsWm1WeVpXNWpaWE1nWm05eUlIWmhjbWx2ZFhNZ1lFNTFiV0psY21BZ1kyOXVjM1JoYm5SekxpQXFMMXh1ZG1GeUlFMUJXRjlUUVVaRlgwbE9WRVZIUlZJZ1BTQTVNREEzTVRrNU1qVTBOelF3T1RreE8xeHVYRzR2S2lvZ1lFOWlhbVZqZENOMGIxTjBjbWx1WjJBZ2NtVnpkV3gwSUhKbFptVnlaVzVqWlhNdUlDb3ZYRzUyWVhJZ1lYSm5jMVJoWnlBOUlDZGJiMkpxWldOMElFRnlaM1Z0Wlc1MGMxMG5MRnh1SUNBZ0lHWjFibU5VWVdjZ1BTQW5XMjlpYW1WamRDQkdkVzVqZEdsdmJsMG5MRnh1SUNBZ0lHZGxibFJoWnlBOUlDZGJiMkpxWldOMElFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVhTYzdYRzVjYmk4cUtpQlZjMlZrSUhSdklHUmxkR1ZqZENCMWJuTnBaMjVsWkNCcGJuUmxaMlZ5SUhaaGJIVmxjeTRnS2k5Y2JuWmhjaUJ5WlVselZXbHVkQ0E5SUM5ZUtEODZNSHhiTVMwNVhWeGNaQ29wSkM4N1hHNWNiaThxS2x4dUlDb2dRU0JtWVhOMFpYSWdZV3gwWlhKdVlYUnBkbVVnZEc4Z1lFWjFibU4wYVc5dUkyRndjR3g1WUN3Z2RHaHBjeUJtZFc1amRHbHZiaUJwYm5admEyVnpJR0JtZFc1allGeHVJQ29nZDJsMGFDQjBhR1VnWUhSb2FYTmdJR0pwYm1ScGJtY2diMllnWUhSb2FYTkJjbWRnSUdGdVpDQjBhR1VnWVhKbmRXMWxiblJ6SUc5bUlHQmhjbWR6WUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdablZ1WXlCVWFHVWdablZ1WTNScGIyNGdkRzhnYVc1MmIydGxMbHh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjBhR2x6UVhKbklGUm9aU0JnZEdocGMyQWdZbWx1WkdsdVp5QnZaaUJnWm5WdVkyQXVYRzRnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0JoY21keklGUm9aU0JoY21kMWJXVnVkSE1nZEc4Z2FXNTJiMnRsSUdCbWRXNWpZQ0IzYVhSb0xseHVJQ29nUUhKbGRIVnlibk1nZXlwOUlGSmxkSFZ5Ym5NZ2RHaGxJSEpsYzNWc2RDQnZaaUJnWm5WdVkyQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHRndjR3g1S0daMWJtTXNJSFJvYVhOQmNtY3NJR0Z5WjNNcElIdGNiaUFnYzNkcGRHTm9JQ2hoY21kekxteGxibWQwYUNrZ2UxeHVJQ0FnSUdOaGMyVWdNRG9nY21WMGRYSnVJR1oxYm1NdVkyRnNiQ2gwYUdselFYSm5LVHRjYmlBZ0lDQmpZWE5sSURFNklISmxkSFZ5YmlCbWRXNWpMbU5oYkd3b2RHaHBjMEZ5Wnl3Z1lYSm5jMXN3WFNrN1hHNGdJQ0FnWTJGelpTQXlPaUJ5WlhSMWNtNGdablZ1WXk1allXeHNLSFJvYVhOQmNtY3NJR0Z5WjNOYk1GMHNJR0Z5WjNOYk1WMHBPMXh1SUNBZ0lHTmhjMlVnTXpvZ2NtVjBkWEp1SUdaMWJtTXVZMkZzYkNoMGFHbHpRWEpuTENCaGNtZHpXekJkTENCaGNtZHpXekZkTENCaGNtZHpXekpkS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWm5WdVl5NWhjSEJzZVNoMGFHbHpRWEpuTENCaGNtZHpLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhR1VnWW1GelpTQnBiWEJzWlcxbGJuUmhkR2x2YmlCdlppQmdYeTUwYVcxbGMyQWdkMmwwYUc5MWRDQnpkWEJ3YjNKMElHWnZjaUJwZEdWeVlYUmxaU0J6YUc5eWRHaGhibVJ6WEc0Z0tpQnZjaUJ0WVhnZ1lYSnlZWGtnYkdWdVozUm9JR05vWldOcmN5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJRzRnVkdobElHNTFiV0psY2lCdlppQjBhVzFsY3lCMGJ5QnBiblp2YTJVZ1lHbDBaWEpoZEdWbFlDNWNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdsMFpYSmhkR1ZsSUZSb1pTQm1kVzVqZEdsdmJpQnBiblp2YTJWa0lIQmxjaUJwZEdWeVlYUnBiMjR1WEc0Z0tpQkFjbVYwZFhKdWN5QjdRWEp5WVhsOUlGSmxkSFZ5Ym5NZ2RHaGxJR0Z5Y21GNUlHOW1JSEpsYzNWc2RITXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHSmhjMlZVYVcxbGN5aHVMQ0JwZEdWeVlYUmxaU2tnZTF4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUVGeWNtRjVLRzRwTzF4dVhHNGdJSGRvYVd4bElDZ3JLMmx1WkdWNElEd2diaWtnZTF4dUlDQWdJSEpsYzNWc2RGdHBibVJsZUYwZ1BTQnBkR1Z5WVhSbFpTaHBibVJsZUNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRWdkVzVoY25rZ1puVnVZM1JwYjI0Z2RHaGhkQ0JwYm5admEyVnpJR0JtZFc1allDQjNhWFJvSUdsMGN5QmhjbWQxYldWdWRDQjBjbUZ1YzJadmNtMWxaQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1puVnVZeUJVYUdVZ1puVnVZM1JwYjI0Z2RHOGdkM0poY0M1Y2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJSFJ5WVc1elptOXliU0JVYUdVZ1lYSm5kVzFsYm5RZ2RISmhibk5tYjNKdExseHVJQ29nUUhKbGRIVnlibk1nZTBaMWJtTjBhVzl1ZlNCU1pYUjFjbTV6SUhSb1pTQnVaWGNnWm5WdVkzUnBiMjR1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRzkyWlhKQmNtY29ablZ1WXl3Z2RISmhibk5tYjNKdEtTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaWhoY21jcElIdGNiaUFnSUNCeVpYUjFjbTRnWm5WdVl5aDBjbUZ1YzJadmNtMG9ZWEpuS1NrN1hHNGdJSDA3WEc1OVhHNWNiaThxS2lCVmMyVmtJR1p2Y2lCaWRXbHNkQzFwYmlCdFpYUm9iMlFnY21WbVpYSmxibU5sY3k0Z0tpOWNiblpoY2lCdlltcGxZM1JRY205MGJ5QTlJRTlpYW1WamRDNXdjbTkwYjNSNWNHVTdYRzVjYmk4cUtpQlZjMlZrSUhSdklHTm9aV05ySUc5aWFtVmpkSE1nWm05eUlHOTNiaUJ3Y205d1pYSjBhV1Z6TGlBcUwxeHVkbUZ5SUdoaGMwOTNibEJ5YjNCbGNuUjVJRDBnYjJKcVpXTjBVSEp2ZEc4dWFHRnpUM2R1VUhKdmNHVnlkSGs3WEc1Y2JpOHFLbHh1SUNvZ1ZYTmxaQ0IwYnlCeVpYTnZiSFpsSUhSb1pWeHVJQ29nVzJCMGIxTjBjbWx1WjFSaFoyQmRLR2gwZEhBNkx5OWxZMjFoTFdsdWRHVnlibUYwYVc5dVlXd3ViM0puTDJWamJXRXRNall5THpjdU1DOGpjMlZqTFc5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5emRISnBibWNwWEc0Z0tpQnZaaUIyWVd4MVpYTXVYRzRnS2k5Y2JuWmhjaUJ2WW1wbFkzUlViMU4wY21sdVp5QTlJRzlpYW1WamRGQnliM1J2TG5SdlUzUnlhVzVuTzF4dVhHNHZLaW9nUW5WcGJIUXRhVzRnZG1Gc2RXVWdjbVZtWlhKbGJtTmxjeTRnS2k5Y2JuWmhjaUJ3Y205d1pYSjBlVWx6Ulc1MWJXVnlZV0pzWlNBOUlHOWlhbVZqZEZCeWIzUnZMbkJ5YjNCbGNuUjVTWE5GYm5WdFpYSmhZbXhsTzF4dVhHNHZLaUJDZFdsc2RDMXBiaUJ0WlhSb2IyUWdjbVZtWlhKbGJtTmxjeUJtYjNJZ2RHaHZjMlVnZDJsMGFDQjBhR1VnYzJGdFpTQnVZVzFsSUdGeklHOTBhR1Z5SUdCc2IyUmhjMmhnSUcxbGRHaHZaSE11SUNvdlhHNTJZWElnYm1GMGFYWmxTMlY1Y3lBOUlHOTJaWEpCY21jb1QySnFaV04wTG10bGVYTXNJRTlpYW1WamRDa3NYRzRnSUNBZ2JtRjBhWFpsVFdGNElEMGdUV0YwYUM1dFlYZzdYRzVjYmk4cUtpQkVaWFJsWTNRZ2FXWWdjSEp2Y0dWeWRHbGxjeUJ6YUdGa2IzZHBibWNnZEdodmMyVWdiMjRnWUU5aWFtVmpkQzV3Y205MGIzUjVjR1ZnSUdGeVpTQnViMjR0Wlc1MWJXVnlZV0pzWlM0Z0tpOWNiblpoY2lCdWIyNUZiblZ0VTJoaFpHOTNjeUE5SUNGd2NtOXdaWEowZVVselJXNTFiV1Z5WVdKc1pTNWpZV3hzS0hzZ0ozWmhiSFZsVDJZbk9pQXhJSDBzSUNkMllXeDFaVTltSnlrN1hHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhiaUJoY25KaGVTQnZaaUIwYUdVZ1pXNTFiV1Z5WVdKc1pTQndjbTl3WlhKMGVTQnVZVzFsY3lCdlppQjBhR1VnWVhKeVlYa3RiR2xyWlNCZ2RtRnNkV1ZnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJ4ZFdWeWVTNWNiaUFxSUVCd1lYSmhiU0I3WW05dmJHVmhibjBnYVc1b1pYSnBkR1ZrSUZOd1pXTnBabmtnY21WMGRYSnVhVzVuSUdsdWFHVnlhWFJsWkNCd2NtOXdaWEowZVNCdVlXMWxjeTVjYmlBcUlFQnlaWFIxY201eklIdEJjbkpoZVgwZ1VtVjBkWEp1Y3lCMGFHVWdZWEp5WVhrZ2IyWWdjSEp2Y0dWeWRIa2dibUZ0WlhNdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdGeWNtRjVUR2xyWlV0bGVYTW9kbUZzZFdVc0lHbHVhR1Z5YVhSbFpDa2dlMXh1SUNBdkx5QlRZV1poY21rZ09DNHhJRzFoYTJWeklHQmhjbWQxYldWdWRITXVZMkZzYkdWbFlDQmxiblZ0WlhKaFlteGxJR2x1SUhOMGNtbGpkQ0J0YjJSbExseHVJQ0F2THlCVFlXWmhjbWtnT1NCdFlXdGxjeUJnWVhKbmRXMWxiblJ6TG14bGJtZDBhR0FnWlc1MWJXVnlZV0pzWlNCcGJpQnpkSEpwWTNRZ2JXOWtaUzVjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJQ2hwYzBGeWNtRjVLSFpoYkhWbEtTQjhmQ0JwYzBGeVozVnRaVzUwY3loMllXeDFaU2twWEc0Z0lDQWdQeUJpWVhObFZHbHRaWE1vZG1Gc2RXVXViR1Z1WjNSb0xDQlRkSEpwYm1jcFhHNGdJQ0FnT2lCYlhUdGNibHh1SUNCMllYSWdiR1Z1WjNSb0lEMGdjbVZ6ZFd4MExteGxibWQwYUN4Y2JpQWdJQ0FnSUhOcmFYQkpibVJsZUdWeklEMGdJU0ZzWlc1bmRHZzdYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0I3WEc0Z0lDQWdhV1lnS0NocGJtaGxjbWwwWldRZ2ZId2dhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2gyWVd4MVpTd2dhMlY1S1NrZ0ppWmNiaUFnSUNBZ0lDQWdJU2h6YTJsd1NXNWtaWGhsY3lBbUppQW9hMlY1SUQwOUlDZHNaVzVuZEdnbklIeDhJR2x6U1c1a1pYZ29hMlY1TENCc1pXNW5kR2dwS1NrcElIdGNiaUFnSUNBZ0lISmxjM1ZzZEM1d2RYTm9LR3RsZVNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FYTnphV2R1Y3lCZ2RtRnNkV1ZnSUhSdklHQnJaWGxnSUc5bUlHQnZZbXBsWTNSZ0lHbG1JSFJvWlNCbGVHbHpkR2x1WnlCMllXeDFaU0JwY3lCdWIzUWdaWEYxYVhaaGJHVnVkRnh1SUNvZ2RYTnBibWNnVzJCVFlXMWxWbUZzZFdWYVpYSnZZRjBvYUhSMGNEb3ZMMlZqYldFdGFXNTBaWEp1WVhScGIyNWhiQzV2Y21jdlpXTnRZUzB5TmpJdk55NHdMeU56WldNdGMyRnRaWFpoYkhWbGVtVnlieWxjYmlBcUlHWnZjaUJsY1hWaGJHbDBlU0JqYjIxd1lYSnBjMjl1Y3k1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdiMkpxWldOMElIUnZJRzF2WkdsbWVTNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnY0hKdmNHVnlkSGtnZEc4Z1lYTnphV2R1TGx4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWVhOemFXZHVMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmhjM05wWjI1V1lXeDFaU2h2WW1wbFkzUXNJR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdkbUZ5SUc5aWFsWmhiSFZsSUQwZ2IySnFaV04wVzJ0bGVWMDdYRzRnSUdsbUlDZ2hLR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0JyWlhrcElDWW1JR1Z4S0c5aWFsWmhiSFZsTENCMllXeDFaU2twSUh4OFhHNGdJQ0FnSUNBb2RtRnNkV1VnUFQwOUlIVnVaR1ZtYVc1bFpDQW1KaUFoS0d0bGVTQnBiaUJ2WW1wbFkzUXBLU2tnZTF4dUlDQWdJRzlpYW1WamRGdHJaWGxkSUQwZ2RtRnNkV1U3WEc0Z0lIMWNibjFjYmx4dUx5b3FYRzRnS2lCVWFHVWdZbUZ6WlNCcGJYQnNaVzFsYm5SaGRHbHZiaUJ2WmlCZ1h5NXJaWGx6WUNCM2FHbGphQ0JrYjJWemJpZDBJSFJ5WldGMElITndZWEp6WlNCaGNuSmhlWE1nWVhNZ1pHVnVjMlV1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdlltcGxZM1FnVkdobElHOWlhbVZqZENCMGJ5QnhkV1Z5ZVM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRCY25KaGVYMGdVbVYwZFhKdWN5QjBhR1VnWVhKeVlYa2diMllnY0hKdmNHVnlkSGtnYm1GdFpYTXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHSmhjMlZMWlhsektHOWlhbVZqZENrZ2UxeHVJQ0JwWmlBb0lXbHpVSEp2ZEc5MGVYQmxLRzlpYW1WamRDa3BJSHRjYmlBZ0lDQnlaWFIxY200Z2JtRjBhWFpsUzJWNWN5aHZZbXBsWTNRcE8xeHVJQ0I5WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0JiWFR0Y2JpQWdabTl5SUNoMllYSWdhMlY1SUdsdUlFOWlhbVZqZENodlltcGxZM1FwS1NCN1hHNGdJQ0FnYVdZZ0tHaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29iMkpxWldOMExDQnJaWGtwSUNZbUlHdGxlU0FoUFNBblkyOXVjM1J5ZFdOMGIzSW5LU0I3WEc0Z0lDQWdJQ0J5WlhOMWJIUXVjSFZ6YUNoclpYa3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJvWlNCaVlYTmxJR2x0Y0d4bGJXVnVkR0YwYVc5dUlHOW1JR0JmTG5KbGMzUmdJSGRvYVdOb0lHUnZaWE51SjNRZ2RtRnNhV1JoZEdVZ2IzSWdZMjlsY21ObElHRnlaM1Z0Wlc1MGN5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm5WdVl5QlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1lYQndiSGtnWVNCeVpYTjBJSEJoY21GdFpYUmxjaUIwYnk1Y2JpQXFJRUJ3WVhKaGJTQjdiblZ0WW1WeWZTQmJjM1JoY25ROVpuVnVZeTVzWlc1bmRHZ3RNVjBnVkdobElITjBZWEowSUhCdmMybDBhVzl1SUc5bUlIUm9aU0J5WlhOMElIQmhjbUZ0WlhSbGNpNWNiaUFxSUVCeVpYUjFjbTV6SUh0R2RXNWpkR2x2Ym4wZ1VtVjBkWEp1Y3lCMGFHVWdibVYzSUdaMWJtTjBhVzl1TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJpWVhObFVtVnpkQ2htZFc1akxDQnpkR0Z5ZENrZ2UxeHVJQ0J6ZEdGeWRDQTlJRzVoZEdsMlpVMWhlQ2h6ZEdGeWRDQTlQVDBnZFc1a1pXWnBibVZrSUQ4Z0tHWjFibU11YkdWdVozUm9JQzBnTVNrZ09pQnpkR0Z5ZEN3Z01DazdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0IyWVhJZ1lYSm5jeUE5SUdGeVozVnRaVzUwY3l4Y2JpQWdJQ0FnSUNBZ2FXNWtaWGdnUFNBdE1TeGNiaUFnSUNBZ0lDQWdiR1Z1WjNSb0lEMGdibUYwYVhabFRXRjRLR0Z5WjNNdWJHVnVaM1JvSUMwZ2MzUmhjblFzSURBcExGeHVJQ0FnSUNBZ0lDQmhjbkpoZVNBOUlFRnljbUY1S0d4bGJtZDBhQ2s3WEc1Y2JpQWdJQ0IzYUdsc1pTQW9LeXRwYm1SbGVDQThJR3hsYm1kMGFDa2dlMXh1SUNBZ0lDQWdZWEp5WVhsYmFXNWtaWGhkSUQwZ1lYSm5jMXR6ZEdGeWRDQXJJR2x1WkdWNFhUdGNiaUFnSUNCOVhHNGdJQ0FnYVc1a1pYZ2dQU0F0TVR0Y2JpQWdJQ0IyWVhJZ2IzUm9aWEpCY21keklEMGdRWEp5WVhrb2MzUmhjblFnS3lBeEtUdGNiaUFnSUNCM2FHbHNaU0FvS3l0cGJtUmxlQ0E4SUhOMFlYSjBLU0I3WEc0Z0lDQWdJQ0J2ZEdobGNrRnlaM05iYVc1a1pYaGRJRDBnWVhKbmMxdHBibVJsZUYwN1hHNGdJQ0FnZlZ4dUlDQWdJRzkwYUdWeVFYSm5jMXR6ZEdGeWRGMGdQU0JoY25KaGVUdGNiaUFnSUNCeVpYUjFjbTRnWVhCd2JIa29ablZ1WXl3Z2RHaHBjeXdnYjNSb1pYSkJjbWR6S1R0Y2JpQWdmVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRiM0JwWlhNZ2NISnZjR1Z5ZEdsbGN5QnZaaUJnYzI5MWNtTmxZQ0IwYnlCZ2IySnFaV04wWUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITnZkWEpqWlNCVWFHVWdiMkpxWldOMElIUnZJR052Y0hrZ2NISnZjR1Z5ZEdsbGN5Qm1jbTl0TGx4dUlDb2dRSEJoY21GdElIdEJjbkpoZVgwZ2NISnZjSE1nVkdobElIQnliM0JsY25SNUlHbGtaVzUwYVdacFpYSnpJSFJ2SUdOdmNIa3VYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzI5aWFtVmpkRDE3ZlYwZ1ZHaGxJRzlpYW1WamRDQjBieUJqYjNCNUlIQnliM0JsY25ScFpYTWdkRzh1WEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQmJZM1Z6ZEc5dGFYcGxjbDBnVkdobElHWjFibU4wYVc5dUlIUnZJR04xYzNSdmJXbDZaU0JqYjNCcFpXUWdkbUZzZFdWekxseHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WMGRYSnVjeUJnYjJKcVpXTjBZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZMjl3ZVU5aWFtVmpkQ2h6YjNWeVkyVXNJSEJ5YjNCekxDQnZZbXBsWTNRc0lHTjFjM1J2YldsNlpYSXBJSHRjYmlBZ2IySnFaV04wSUh4OElDaHZZbXBsWTNRZ1BTQjdmU2s3WEc1Y2JpQWdkbUZ5SUdsdVpHVjRJRDBnTFRFc1hHNGdJQ0FnSUNCc1pXNW5kR2dnUFNCd2NtOXdjeTVzWlc1bmRHZzdYRzVjYmlBZ2QyaHBiR1VnS0NzcmFXNWtaWGdnUENCc1pXNW5kR2dwSUh0Y2JpQWdJQ0IyWVhJZ2EyVjVJRDBnY0hKdmNITmJhVzVrWlhoZE8xeHVYRzRnSUNBZ2RtRnlJRzVsZDFaaGJIVmxJRDBnWTNWemRHOXRhWHBsY2x4dUlDQWdJQ0FnUHlCamRYTjBiMjFwZW1WeUtHOWlhbVZqZEZ0clpYbGRMQ0J6YjNWeVkyVmJhMlY1WFN3Z2EyVjVMQ0J2WW1wbFkzUXNJSE52ZFhKalpTbGNiaUFnSUNBZ0lEb2dkVzVrWldacGJtVmtPMXh1WEc0Z0lDQWdZWE56YVdkdVZtRnNkV1VvYjJKcVpXTjBMQ0JyWlhrc0lHNWxkMVpoYkhWbElEMDlQU0IxYm1SbFptbHVaV1FnUHlCemIzVnlZMlZiYTJWNVhTQTZJRzVsZDFaaGJIVmxLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdiMkpxWldOME8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeVpXRjBaWE1nWVNCbWRXNWpkR2x2YmlCc2FXdGxJR0JmTG1GemMybG5ibUF1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHRnpjMmxuYm1WeUlGUm9aU0JtZFc1amRHbHZiaUIwYnlCaGMzTnBaMjRnZG1Gc2RXVnpMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwWjFibU4wYVc5dWZTQlNaWFIxY201eklIUm9aU0J1WlhjZ1lYTnphV2R1WlhJZ1puVnVZM1JwYjI0dVhHNGdLaTljYm1aMWJtTjBhVzl1SUdOeVpXRjBaVUZ6YzJsbmJtVnlLR0Z6YzJsbmJtVnlLU0I3WEc0Z0lISmxkSFZ5YmlCaVlYTmxVbVZ6ZENobWRXNWpkR2x2YmlodlltcGxZM1FzSUhOdmRYSmpaWE1wSUh0Y2JpQWdJQ0IyWVhJZ2FXNWtaWGdnUFNBdE1TeGNiaUFnSUNBZ0lDQWdiR1Z1WjNSb0lEMGdjMjkxY21ObGN5NXNaVzVuZEdnc1hHNGdJQ0FnSUNBZ0lHTjFjM1J2YldsNlpYSWdQU0JzWlc1bmRHZ2dQaUF4SUQ4Z2MyOTFjbU5sYzF0c1pXNW5kR2dnTFNBeFhTQTZJSFZ1WkdWbWFXNWxaQ3hjYmlBZ0lDQWdJQ0FnWjNWaGNtUWdQU0JzWlc1bmRHZ2dQaUF5SUQ4Z2MyOTFjbU5sYzFzeVhTQTZJSFZ1WkdWbWFXNWxaRHRjYmx4dUlDQWdJR04xYzNSdmJXbDZaWElnUFNBb1lYTnphV2R1WlhJdWJHVnVaM1JvSUQ0Z015QW1KaUIwZVhCbGIyWWdZM1Z6ZEc5dGFYcGxjaUE5UFNBblpuVnVZM1JwYjI0bktWeHVJQ0FnSUNBZ1B5QW9iR1Z1WjNSb0xTMHNJR04xYzNSdmJXbDZaWElwWEc0Z0lDQWdJQ0E2SUhWdVpHVm1hVzVsWkR0Y2JseHVJQ0FnSUdsbUlDaG5kV0Z5WkNBbUppQnBjMGwwWlhKaGRHVmxRMkZzYkNoemIzVnlZMlZ6V3pCZExDQnpiM1Z5WTJWeld6RmRMQ0JuZFdGeVpDa3BJSHRjYmlBZ0lDQWdJR04xYzNSdmJXbDZaWElnUFNCc1pXNW5kR2dnUENBeklEOGdkVzVrWldacGJtVmtJRG9nWTNWemRHOXRhWHBsY2p0Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SURFN1hHNGdJQ0FnZlZ4dUlDQWdJRzlpYW1WamRDQTlJRTlpYW1WamRDaHZZbXBsWTNRcE8xeHVJQ0FnSUhkb2FXeGxJQ2dySzJsdVpHVjRJRHdnYkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ2MyOTFjbU5sSUQwZ2MyOTFjbU5sYzF0cGJtUmxlRjA3WEc0Z0lDQWdJQ0JwWmlBb2MyOTFjbU5sS1NCN1hHNGdJQ0FnSUNBZ0lHRnpjMmxuYm1WeUtHOWlhbVZqZEN3Z2MyOTFjbU5sTENCcGJtUmxlQ3dnWTNWemRHOXRhWHBsY2lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQnZZbXBsWTNRN1hHNGdJSDBwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUdFZ2RtRnNhV1FnWVhKeVlYa3RiR2xyWlNCcGJtUmxlQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNCVWFHVWdkbUZzZFdVZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY0dGeVlXMGdlMjUxYldKbGNuMGdXMnhsYm1kMGFEMU5RVmhmVTBGR1JWOUpUbFJGUjBWU1hTQlVhR1VnZFhCd1pYSWdZbTkxYm1SeklHOW1JR0VnZG1Gc2FXUWdhVzVrWlhndVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElIWmhiR2xrSUdsdVpHVjRMQ0JsYkhObElHQm1ZV3h6WldBdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdselNXNWtaWGdvZG1Gc2RXVXNJR3hsYm1kMGFDa2dlMXh1SUNCc1pXNW5kR2dnUFNCc1pXNW5kR2dnUFQwZ2JuVnNiQ0EvSUUxQldGOVRRVVpGWDBsT1ZFVkhSVklnT2lCc1pXNW5kR2c3WEc0Z0lISmxkSFZ5YmlBaElXeGxibWQwYUNBbUpseHVJQ0FnSUNoMGVYQmxiMllnZG1Gc2RXVWdQVDBnSjI1MWJXSmxjaWNnZkh3Z2NtVkpjMVZwYm5RdWRHVnpkQ2gyWVd4MVpTa3BJQ1ltWEc0Z0lDQWdLSFpoYkhWbElENGdMVEVnSmlZZ2RtRnNkV1VnSlNBeElEMDlJREFnSmlZZ2RtRnNkV1VnUENCc1pXNW5kR2dwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUIwYUdVZ1oybDJaVzRnWVhKbmRXMWxiblJ6SUdGeVpTQm1jbTl0SUdGdUlHbDBaWEpoZEdWbElHTmhiR3d1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSEJ2ZEdWdWRHbGhiQ0JwZEdWeVlYUmxaU0IyWVd4MVpTQmhjbWQxYldWdWRDNWNiaUFxSUVCd1lYSmhiU0I3S24wZ2FXNWtaWGdnVkdobElIQnZkR1Z1ZEdsaGJDQnBkR1Z5WVhSbFpTQnBibVJsZUNCdmNpQnJaWGtnWVhKbmRXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJRzlpYW1WamRDQlVhR1VnY0c5MFpXNTBhV0ZzSUdsMFpYSmhkR1ZsSUc5aWFtVmpkQ0JoY21kMWJXVnVkQzVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQjBhR1VnWVhKbmRXMWxiblJ6SUdGeVpTQm1jbTl0SUdGdUlHbDBaWEpoZEdWbElHTmhiR3dzWEc0Z0tpQWdaV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBsMFpYSmhkR1ZsUTJGc2JDaDJZV3gxWlN3Z2FXNWtaWGdzSUc5aWFtVmpkQ2tnZTF4dUlDQnBaaUFvSVdselQySnFaV04wS0c5aWFtVmpkQ2twSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSDFjYmlBZ2RtRnlJSFI1Y0dVZ1BTQjBlWEJsYjJZZ2FXNWtaWGc3WEc0Z0lHbG1JQ2gwZVhCbElEMDlJQ2R1ZFcxaVpYSW5YRzRnSUNBZ0lDQWdJRDhnS0dselFYSnlZWGxNYVd0bEtHOWlhbVZqZENrZ0ppWWdhWE5KYm1SbGVDaHBibVJsZUN3Z2IySnFaV04wTG14bGJtZDBhQ2twWEc0Z0lDQWdJQ0FnSURvZ0tIUjVjR1VnUFQwZ0ozTjBjbWx1WnljZ0ppWWdhVzVrWlhnZ2FXNGdiMkpxWldOMEtWeHVJQ0FnSUNBZ0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWeEtHOWlhbVZqZEZ0cGJtUmxlRjBzSUhaaGJIVmxLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdCMllXeDFaV0FnYVhNZ2JHbHJaV3g1SUdFZ2NISnZkRzkwZVhCbElHOWlhbVZqZEM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhJSEJ5YjNSdmRIbHdaU3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCcGMxQnliM1J2ZEhsd1pTaDJZV3gxWlNrZ2UxeHVJQ0IyWVhJZ1EzUnZjaUE5SUhaaGJIVmxJQ1ltSUhaaGJIVmxMbU52Ym5OMGNuVmpkRzl5TEZ4dUlDQWdJQ0FnY0hKdmRHOGdQU0FvZEhsd1pXOW1JRU4wYjNJZ1BUMGdKMloxYm1OMGFXOXVKeUFtSmlCRGRHOXlMbkJ5YjNSdmRIbHdaU2tnZkh3Z2IySnFaV04wVUhKdmRHODdYRzVjYmlBZ2NtVjBkWEp1SUhaaGJIVmxJRDA5UFNCd2NtOTBienRjYm4xY2JseHVMeW9xWEc0Z0tpQlFaWEptYjNKdGN5QmhYRzRnS2lCYllGTmhiV1ZXWVd4MVpWcGxjbTlnWFNob2RIUndPaTh2WldOdFlTMXBiblJsY201aGRHbHZibUZzTG05eVp5OWxZMjFoTFRJMk1pODNMakF2STNObFl5MXpZVzFsZG1Gc2RXVjZaWEp2S1Z4dUlDb2dZMjl0Y0dGeWFYTnZiaUJpWlhSM1pXVnVJSFIzYnlCMllXeDFaWE1nZEc4Z1pHVjBaWEp0YVc1bElHbG1JSFJvWlhrZ1lYSmxJR1Z4ZFdsMllXeGxiblF1WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0EwTGpBdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUV4aGJtZGNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTnZiWEJoY21VdVhHNGdLaUJBY0dGeVlXMGdleXA5SUc5MGFHVnlJRlJvWlNCdmRHaGxjaUIyWVd4MVpTQjBieUJqYjIxd1lYSmxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlIUm9aU0IyWVd4MVpYTWdZWEpsSUdWeGRXbDJZV3hsYm5Rc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ2RtRnlJRzlpYW1WamRDQTlJSHNnSjJFbk9pQXhJSDA3WEc0Z0tpQjJZWElnYjNSb1pYSWdQU0I3SUNkaEp6b2dNU0I5TzF4dUlDcGNiaUFxSUY4dVpYRW9iMkpxWldOMExDQnZZbXBsWTNRcE8xeHVJQ29nTHk4Z1BUNGdkSEoxWlZ4dUlDcGNiaUFxSUY4dVpYRW9iMkpxWldOMExDQnZkR2hsY2lrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDcGNiaUFxSUY4dVpYRW9KMkVuTENBbllTY3BPMXh1SUNvZ0x5OGdQVDRnZEhKMVpWeHVJQ3BjYmlBcUlGOHVaWEVvSjJFbkxDQlBZbXBsWTNRb0oyRW5LU2s3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNwY2JpQXFJRjh1WlhFb1RtRk9MQ0JPWVU0cE8xeHVJQ29nTHk4Z1BUNGdkSEoxWlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJsY1NoMllXeDFaU3dnYjNSb1pYSXBJSHRjYmlBZ2NtVjBkWEp1SUhaaGJIVmxJRDA5UFNCdmRHaGxjaUI4ZkNBb2RtRnNkV1VnSVQwOUlIWmhiSFZsSUNZbUlHOTBhR1Z5SUNFOVBTQnZkR2hsY2lrN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdCMllXeDFaV0FnYVhNZ2JHbHJaV3g1SUdGdUlHQmhjbWQxYldWdWRITmdJRzlpYW1WamRDNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEQXVNUzR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhiaUJnWVhKbmRXMWxiblJ6WUNCdlltcGxZM1FzWEc0Z0tpQWdaV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6UVhKbmRXMWxiblJ6S0daMWJtTjBhVzl1S0NrZ2V5QnlaWFIxY200Z1lYSm5kVzFsYm5Sek95QjlLQ2twTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOQmNtZDFiV1Z1ZEhNb1d6RXNJRElzSUROZEtUdGNiaUFxSUM4dklEMCtJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselFYSm5kVzFsYm5SektIWmhiSFZsS1NCN1hHNGdJQzh2SUZOaFptRnlhU0E0TGpFZ2JXRnJaWE1nWUdGeVozVnRaVzUwY3k1allXeHNaV1ZnSUdWdWRXMWxjbUZpYkdVZ2FXNGdjM1J5YVdOMElHMXZaR1V1WEc0Z0lISmxkSFZ5YmlCcGMwRnljbUY1VEdsclpVOWlhbVZqZENoMllXeDFaU2tnSmlZZ2FHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaDJZV3gxWlN3Z0oyTmhiR3hsWlNjcElDWW1YRzRnSUNBZ0tDRndjbTl3WlhKMGVVbHpSVzUxYldWeVlXSnNaUzVqWVd4c0tIWmhiSFZsTENBblkyRnNiR1ZsSnlrZ2ZId2diMkpxWldOMFZHOVRkSEpwYm1jdVkyRnNiQ2gyWVd4MVpTa2dQVDBnWVhKbmMxUmhaeWs3WEc1OVhHNWNiaThxS2x4dUlDb2dRMmhsWTJ0eklHbG1JR0IyWVd4MVpXQWdhWE1nWTJ4aGMzTnBabWxsWkNCaGN5QmhiaUJnUVhKeVlYbGdJRzlpYW1WamRDNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEQXVNUzR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhiaUJoY25KaGVTd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYa29XekVzSURJc0lETmRLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYa29aRzlqZFcxbGJuUXVZbTlrZVM1amFHbHNaSEpsYmlrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDcGNiaUFxSUY4dWFYTkJjbkpoZVNnbllXSmpKeWs3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNwY2JpQXFJRjh1YVhOQmNuSmhlU2hmTG01dmIzQXBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxTDF4dWRtRnlJR2x6UVhKeVlYa2dQU0JCY25KaGVTNXBjMEZ5Y21GNU8xeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUdGeWNtRjVMV3hwYTJVdUlFRWdkbUZzZFdVZ2FYTWdZMjl1YzJsa1pYSmxaQ0JoY25KaGVTMXNhV3RsSUdsbUlHbDBKM05jYmlBcUlHNXZkQ0JoSUdaMWJtTjBhVzl1SUdGdVpDQm9ZWE1nWVNCZ2RtRnNkV1V1YkdWdVozUm9ZQ0IwYUdGMEozTWdZVzRnYVc1MFpXZGxjaUJuY21WaGRHVnlJSFJvWVc0Z2IzSmNiaUFxSUdWeGRXRnNJSFJ2SUdBd1lDQmhibVFnYkdWemN5QjBhR0Z1SUc5eUlHVnhkV0ZzSUhSdklHQk9kVzFpWlhJdVRVRllYMU5CUmtWZlNVNVVSVWRGVW1BdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRRzFsYldKbGNrOW1JRjljYmlBcUlFQnphVzVqWlNBMExqQXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlFeGhibWRjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lYSnlZWGt0YkdsclpTd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYbE1hV3RsS0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1VEdsclpTaGtiMk4xYldWdWRDNWliMlI1TG1Ob2FXeGtjbVZ1S1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selFYSnlZWGxNYVd0bEtDZGhZbU1uS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selFYSnlZWGxNYVd0bEtGOHVibTl2Y0NrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBGeWNtRjVUR2xyWlNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z2RtRnNkV1VnSVQwZ2JuVnNiQ0FtSmlCcGMweGxibWQwYUNoMllXeDFaUzVzWlc1bmRHZ3BJQ1ltSUNGcGMwWjFibU4wYVc5dUtIWmhiSFZsS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdseklHMWxkR2h2WkNCcGN5QnNhV3RsSUdCZkxtbHpRWEp5WVhsTWFXdGxZQ0JsZUdObGNIUWdkR2hoZENCcGRDQmhiSE52SUdOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnWEc0Z0tpQnBjeUJoYmlCdlltcGxZM1F1WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0EwTGpBdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUV4aGJtZGNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVc0Z1lYSnlZWGt0YkdsclpTQnZZbXBsWTNRc1hHNGdLaUFnWld4elpTQmdabUZzYzJWZ0xseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUJmTG1selFYSnlZWGxNYVd0bFQySnFaV04wS0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1VEdsclpVOWlhbVZqZENoa2IyTjFiV1Z1ZEM1aWIyUjVMbU5vYVd4a2NtVnVLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYbE1hV3RsVDJKcVpXTjBLQ2RoWW1NbktUdGNiaUFxSUM4dklEMCtJR1poYkhObFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaVTlpYW1WamRDaGZMbTV2YjNBcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOQmNuSmhlVXhwYTJWUFltcGxZM1FvZG1Gc2RXVXBJSHRjYmlBZ2NtVjBkWEp1SUdselQySnFaV04wVEdsclpTaDJZV3gxWlNrZ0ppWWdhWE5CY25KaGVVeHBhMlVvZG1Gc2RXVXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJR05zWVhOemFXWnBaV1FnWVhNZ1lTQmdSblZ1WTNScGIyNWdJRzlpYW1WamRDNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEQXVNUzR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhJR1oxYm1OMGFXOXVMQ0JsYkhObElHQm1ZV3h6WldBdVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNwY2JpQXFJRjh1YVhOR2RXNWpkR2x2YmloZktUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtbHpSblZ1WTNScGIyNG9MMkZpWXk4cE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOR2RXNWpkR2x2YmloMllXeDFaU2tnZTF4dUlDQXZMeUJVYUdVZ2RYTmxJRzltSUdCUFltcGxZM1FqZEc5VGRISnBibWRnSUdGMmIybGtjeUJwYzNOMVpYTWdkMmwwYUNCMGFHVWdZSFI1Y0dWdlptQWdiM0JsY21GMGIzSmNiaUFnTHk4Z2FXNGdVMkZtWVhKcElEZ3RPU0IzYUdsamFDQnlaWFIxY201eklDZHZZbXBsWTNRbklHWnZjaUIwZVhCbFpDQmhjbkpoZVNCaGJtUWdiM1JvWlhJZ1kyOXVjM1J5ZFdOMGIzSnpMbHh1SUNCMllYSWdkR0ZuSUQwZ2FYTlBZbXBsWTNRb2RtRnNkV1VwSUQ4Z2IySnFaV04wVkc5VGRISnBibWN1WTJGc2JDaDJZV3gxWlNrZ09pQW5KenRjYmlBZ2NtVjBkWEp1SUhSaFp5QTlQU0JtZFc1alZHRm5JSHg4SUhSaFp5QTlQU0JuWlc1VVlXYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EyaGxZMnR6SUdsbUlHQjJZV3gxWldBZ2FYTWdZU0IyWVd4cFpDQmhjbkpoZVMxc2FXdGxJR3hsYm1kMGFDNWNiaUFxWEc0Z0tpQXFLazV2ZEdVNktpb2dWR2hwY3lCdFpYUm9iMlFnYVhNZ2JHOXZjMlZzZVNCaVlYTmxaQ0J2Ymx4dUlDb2dXMkJVYjB4bGJtZDBhR0JkS0doMGRIQTZMeTlsWTIxaExXbHVkR1Z5Ym1GMGFXOXVZV3d1YjNKbkwyVmpiV0V0TWpZeUx6Y3VNQzhqYzJWakxYUnZiR1Z1WjNSb0tTNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEUXVNQzR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhJSFpoYkdsa0lHeGxibWQwYUN3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFYRzRnS2lCZkxtbHpUR1Z1WjNSb0tETXBPMXh1SUNvZ0x5OGdQVDRnZEhKMVpWeHVJQ3BjYmlBcUlGOHVhWE5NWlc1bmRHZ29UblZ0WW1WeUxrMUpUbDlXUVV4VlJTazdYRzRnS2lBdkx5QTlQaUJtWVd4elpWeHVJQ3BjYmlBcUlGOHVhWE5NWlc1bmRHZ29TVzVtYVc1cGRIa3BPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbWx6VEdWdVozUm9LQ2N6SnlrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzB4bGJtZDBhQ2gyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkhWbElEMDlJQ2R1ZFcxaVpYSW5JQ1ltWEc0Z0lDQWdkbUZzZFdVZ1BpQXRNU0FtSmlCMllXeDFaU0FsSURFZ1BUMGdNQ0FtSmlCMllXeDFaU0E4UFNCTlFWaGZVMEZHUlY5SlRsUkZSMFZTTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUhSb1pWeHVJQ29nVzJ4aGJtZDFZV2RsSUhSNWNHVmRLR2gwZEhBNkx5OTNkM2N1WldOdFlTMXBiblJsY201aGRHbHZibUZzTG05eVp5OWxZMjFoTFRJMk1pODNMakF2STNObFl5MWxZMjFoYzJOeWFYQjBMV3hoYm1kMVlXZGxMWFI1Y0dWektWeHVJQ29nYjJZZ1lFOWlhbVZqZEdBdUlDaGxMbWN1SUdGeWNtRjVjeXdnWm5WdVkzUnBiMjV6TENCdlltcGxZM1J6TENCeVpXZGxlR1Z6TENCZ2JtVjNJRTUxYldKbGNpZ3dLV0FzSUdGdVpDQmdibVYzSUZOMGNtbHVaeWduSnlsZ0tWeHVJQ3BjYmlBcUlFQnpkR0YwYVdOY2JpQXFJRUJ0WlcxaVpYSlBaaUJmWEc0Z0tpQkFjMmx1WTJVZ01DNHhMakJjYmlBcUlFQmpZWFJsWjI5eWVTQk1ZVzVuWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCZ2RtRnNkV1ZnSUdseklHRnVJRzlpYW1WamRDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6VDJKcVpXTjBLSHQ5S1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selQySnFaV04wS0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwOWlhbVZqZENoZkxtNXZiM0FwTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOUFltcGxZM1FvYm5Wc2JDazdYRzRnS2lBdkx5QTlQaUJtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMwOWlhbVZqZENoMllXeDFaU2tnZTF4dUlDQjJZWElnZEhsd1pTQTlJSFI1Y0dWdlppQjJZV3gxWlR0Y2JpQWdjbVYwZFhKdUlDRWhkbUZzZFdVZ0ppWWdLSFI1Y0dVZ1BUMGdKMjlpYW1WamRDY2dmSHdnZEhsd1pTQTlQU0FuWm5WdVkzUnBiMjRuS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnWUhaaGJIVmxZQ0JwY3lCdlltcGxZM1F0YkdsclpTNGdRU0IyWVd4MVpTQnBjeUJ2WW1wbFkzUXRiR2xyWlNCcFppQnBkQ2R6SUc1dmRDQmdiblZzYkdCY2JpQXFJR0Z1WkNCb1lYTWdZU0JnZEhsd1pXOW1ZQ0J5WlhOMWJIUWdiMllnWENKdlltcGxZM1JjSWk1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURRdU1DNHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1RHRnVaMXh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNCVWFHVWdkbUZzZFdVZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWUhaaGJIVmxZQ0JwY3lCdlltcGxZM1F0YkdsclpTd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6VDJKcVpXTjBUR2xyWlNoN2ZTazdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMDlpYW1WamRFeHBhMlVvV3pFc0lESXNJRE5kS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selQySnFaV04wVEdsclpTaGZMbTV2YjNBcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFYRzRnS2lCZkxtbHpUMkpxWldOMFRHbHJaU2h1ZFd4c0tUdGNiaUFxSUM4dklEMCtJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselQySnFaV04wVEdsclpTaDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdJU0YyWVd4MVpTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMGdKMjlpYW1WamRDYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FYTnphV2R1Y3lCdmQyNGdaVzUxYldWeVlXSnNaU0J6ZEhKcGJtY2dhMlY1WldRZ2NISnZjR1Z5ZEdsbGN5QnZaaUJ6YjNWeVkyVWdiMkpxWldOMGN5QjBieUIwYUdWY2JpQXFJR1JsYzNScGJtRjBhVzl1SUc5aWFtVmpkQzRnVTI5MWNtTmxJRzlpYW1WamRITWdZWEpsSUdGd2NHeHBaV1FnWm5KdmJTQnNaV1owSUhSdklISnBaMmgwTGx4dUlDb2dVM1ZpYzJWeGRXVnVkQ0J6YjNWeVkyVnpJRzkyWlhKM2NtbDBaU0J3Y205d1pYSjBlU0JoYzNOcFoyNXRaVzUwY3lCdlppQndjbVYyYVc5MWN5QnpiM1Z5WTJWekxseHVJQ3BjYmlBcUlDb3FUbTkwWlRvcUtpQlVhR2x6SUcxbGRHaHZaQ0J0ZFhSaGRHVnpJR0J2WW1wbFkzUmdJR0Z1WkNCcGN5QnNiMjl6Wld4NUlHSmhjMlZrSUc5dVhHNGdLaUJiWUU5aWFtVmpkQzVoYzNOcFoyNWdYU2hvZEhSd2N6b3ZMMjFrYmk1cGJ5OVBZbXBsWTNRdllYTnphV2R1S1M1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURBdU1UQXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlFOWlhbVZqZEZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdaR1Z6ZEdsdVlYUnBiMjRnYjJKcVpXTjBMbHh1SUNvZ1FIQmhjbUZ0SUhzdUxpNVBZbXBsWTNSOUlGdHpiM1Z5WTJWelhTQlVhR1VnYzI5MWNtTmxJRzlpYW1WamRITXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1QySnFaV04wZlNCU1pYUjFjbTV6SUdCdlltcGxZM1JnTGx4dUlDb2dRSE5sWlNCZkxtRnpjMmxuYmtsdVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNwY2JpQXFJR1oxYm1OMGFXOXVJRVp2YnlncElIdGNiaUFxSUNBZ2RHaHBjeTVoSUQwZ01UdGNiaUFxSUgxY2JpQXFYRzRnS2lCbWRXNWpkR2x2YmlCQ1lYSW9LU0I3WEc0Z0tpQWdJSFJvYVhNdVl5QTlJRE03WEc0Z0tpQjlYRzRnS2x4dUlDb2dSbTl2TG5CeWIzUnZkSGx3WlM1aUlEMGdNanRjYmlBcUlFSmhjaTV3Y205MGIzUjVjR1V1WkNBOUlEUTdYRzRnS2x4dUlDb2dYeTVoYzNOcFoyNG9leUFuWVNjNklEQWdmU3dnYm1WM0lFWnZieXdnYm1WM0lFSmhjaWs3WEc0Z0tpQXZMeUE5UGlCN0lDZGhKem9nTVN3Z0oyTW5PaUF6SUgxY2JpQXFMMXh1ZG1GeUlHRnpjMmxuYmlBOUlHTnlaV0YwWlVGemMybG5ibVZ5S0daMWJtTjBhVzl1S0c5aWFtVmpkQ3dnYzI5MWNtTmxLU0I3WEc0Z0lHbG1JQ2h1YjI1RmJuVnRVMmhoWkc5M2N5QjhmQ0JwYzFCeWIzUnZkSGx3WlNoemIzVnlZMlVwSUh4OElHbHpRWEp5WVhsTWFXdGxLSE52ZFhKalpTa3BJSHRjYmlBZ0lDQmpiM0I1VDJKcVpXTjBLSE52ZFhKalpTd2dhMlY1Y3loemIzVnlZMlVwTENCdlltcGxZM1FwTzF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQm1iM0lnS0haaGNpQnJaWGtnYVc0Z2MyOTFjbU5sS1NCN1hHNGdJQ0FnYVdZZ0tHaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29jMjkxY21ObExDQnJaWGtwS1NCN1hHNGdJQ0FnSUNCaGMzTnBaMjVXWVd4MVpTaHZZbXBsWTNRc0lHdGxlU3dnYzI5MWNtTmxXMnRsZVYwcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlNrN1hHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhiaUJoY25KaGVTQnZaaUIwYUdVZ2IzZHVJR1Z1ZFcxbGNtRmliR1VnY0hKdmNHVnlkSGtnYm1GdFpYTWdiMllnWUc5aWFtVmpkR0F1WEc0Z0tseHVJQ29nS2lwT2IzUmxPaW9xSUU1dmJpMXZZbXBsWTNRZ2RtRnNkV1Z6SUdGeVpTQmpiMlZ5WTJWa0lIUnZJRzlpYW1WamRITXVJRk5sWlNCMGFHVmNiaUFxSUZ0RlV5QnpjR1ZqWFNob2RIUndPaTh2WldOdFlTMXBiblJsY201aGRHbHZibUZzTG05eVp5OWxZMjFoTFRJMk1pODNMakF2STNObFl5MXZZbXBsWTNRdWEyVjVjeWxjYmlBcUlHWnZjaUJ0YjNKbElHUmxkR0ZwYkhNdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRSE5wYm1ObElEQXVNUzR3WEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FHTmhkR1ZuYjNKNUlFOWlhbVZqZEZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdiMkpxWldOMElIUnZJSEYxWlhKNUxseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCaGNuSmhlU0J2WmlCd2NtOXdaWEowZVNCdVlXMWxjeTVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1puVnVZM1JwYjI0Z1JtOXZLQ2tnZTF4dUlDb2dJQ0IwYUdsekxtRWdQU0F4TzF4dUlDb2dJQ0IwYUdsekxtSWdQU0F5TzF4dUlDb2dmVnh1SUNwY2JpQXFJRVp2Ynk1d2NtOTBiM1I1Y0dVdVl5QTlJRE03WEc0Z0tseHVJQ29nWHk1clpYbHpLRzVsZHlCR2IyOHBPMXh1SUNvZ0x5OGdQVDRnV3lkaEp5d2dKMkluWFNBb2FYUmxjbUYwYVc5dUlHOXlaR1Z5SUdseklHNXZkQ0JuZFdGeVlXNTBaV1ZrS1Z4dUlDcGNiaUFxSUY4dWEyVjVjeWduYUdrbktUdGNiaUFxSUM4dklEMCtJRnNuTUNjc0lDY3hKMTFjYmlBcUwxeHVablZ1WTNScGIyNGdhMlY1Y3lodlltcGxZM1FwSUh0Y2JpQWdjbVYwZFhKdUlHbHpRWEp5WVhsTWFXdGxLRzlpYW1WamRDa2dQeUJoY25KaGVVeHBhMlZMWlhsektHOWlhbVZqZENrZ09pQmlZWE5sUzJWNWN5aHZZbXBsWTNRcE8xeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdGemMybG5ianRjYmlJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ0lDQjJZV3gxWlRvZ2RISjFaVnh1ZlNrN1hHNWNiblpoY2lCZlkzSmxZWFJsUTJ4aGMzTWdQU0JtZFc1amRHbHZiaUFvS1NCN0lHWjFibU4wYVc5dUlHUmxabWx1WlZCeWIzQmxjblJwWlhNb2RHRnlaMlYwTENCd2NtOXdjeWtnZXlCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElIQnliM0J6TG14bGJtZDBhRHNnYVNzcktTQjdJSFpoY2lCa1pYTmpjbWx3ZEc5eUlEMGdjSEp2Y0hOYmFWMDdJR1JsYzJOeWFYQjBiM0l1Wlc1MWJXVnlZV0pzWlNBOUlHUmxjMk55YVhCMGIzSXVaVzUxYldWeVlXSnNaU0I4ZkNCbVlXeHpaVHNnWkdWelkzSnBjSFJ2Y2k1amIyNW1hV2QxY21GaWJHVWdQU0IwY25WbE95QnBaaUFvWENKMllXeDFaVndpSUdsdUlHUmxjMk55YVhCMGIzSXBJR1JsYzJOeWFYQjBiM0l1ZDNKcGRHRmliR1VnUFNCMGNuVmxPeUJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2RHRnlaMlYwTENCa1pYTmpjbWx3ZEc5eUxtdGxlU3dnWkdWelkzSnBjSFJ2Y2lrN0lIMGdmU0J5WlhSMWNtNGdablZ1WTNScGIyNGdLRU52Ym5OMGNuVmpkRzl5TENCd2NtOTBiMUJ5YjNCekxDQnpkR0YwYVdOUWNtOXdjeWtnZXlCcFppQW9jSEp2ZEc5UWNtOXdjeWtnWkdWbWFXNWxVSEp2Y0dWeWRHbGxjeWhEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVc0lIQnliM1J2VUhKdmNITXBPeUJwWmlBb2MzUmhkR2xqVUhKdmNITXBJR1JsWm1sdVpWQnliM0JsY25ScFpYTW9RMjl1YzNSeWRXTjBiM0lzSUhOMFlYUnBZMUJ5YjNCektUc2djbVYwZFhKdUlFTnZibk4wY25WamRHOXlPeUI5T3lCOUtDazdYRzVjYm5aaGNpQmZiRzlrWVhOb0lEMGdjbVZ4ZFdseVpTaGNJbXh2WkdGemFDNWhjM05wWjI1Y0lpazdYRzVjYm5aaGNpQmZiRzlrWVhOb01pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gyeHZaR0Z6YUNrN1hHNWNiblpoY2lCZlpHbHpjR0YwWTJoRmRtVnVkQ0E5SUhKbGNYVnBjbVVvWENJdUwzVjBhV3h6TDJScGMzQmhkR05vUlhabGJuUmNJaWs3WEc1Y2JuWmhjaUJmWkdsemNHRjBZMmhGZG1WdWRESWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOWthWE53WVhSamFFVjJaVzUwS1R0Y2JseHVkbUZ5SUY5VmNteENkV2xzWkdWeUlEMGdjbVZ4ZFdseVpTaGNJaTR2ZFhScGJITXZWWEpzUW5WcGJHUmxjbHdpS1R0Y2JseHVkbUZ5SUY5VmNteENkV2xzWkdWeU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gxVnliRUoxYVd4a1pYSXBPMXh1WEc1MllYSWdYMVZ6WlhKSmJtWnZJRDBnY21WeGRXbHlaU2hjSWk0dlZYTmxja2x1Wm05Y0lpazdYRzVjYm5aaGNpQmZWWE5sY2tsdVptOHlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZWWE5sY2tsdVptOHBPMXh1WEc1MllYSWdYMk52Ym5OMFlXNTBjeUE5SUhKbGNYVnBjbVVvWENJdUwyTnZibk4wWVc1MGMxd2lLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU0EvSUc5aWFpQTZJSHNnWkdWbVlYVnNkRG9nYjJKcUlIMDdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gyTnNZWE56UTJGc2JFTm9aV05yS0dsdWMzUmhibU5sTENCRGIyNXpkSEoxWTNSdmNpa2dleUJwWmlBb0lTaHBibk4wWVc1alpTQnBibk4wWVc1alpXOW1JRU52Ym5OMGNuVmpkRzl5S1NrZ2V5QjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLRndpUTJGdWJtOTBJR05oYkd3Z1lTQmpiR0Z6Y3lCaGN5QmhJR1oxYm1OMGFXOXVYQ0lwT3lCOUlIMWNibHh1ZG1GeUlGTkpSMDVGUkY5SlRsOUJWRlJTWDA1QlRVVWdQU0JjSW1SaGRHRXRjMmxuYm1Wa0xXbHVYQ0k3WEc1MllYSWdVRTlRVlZCZlUxUkJWRlZUWDBGVVZGSmZUa0ZOUlNBOUlGd2laR0YwWVMxemRHRjBkWE5jSWp0Y2JuWmhjaUJDVDBSWlgxQlBVRlZRWDFOVVFWUlZVMTlCVkZSU1gwNUJUVVVnUFNCY0ltUmhkR0V0Y21WbkxYVnBMV05zYVdWdWRDMXpkR0YwZFhOY0lqdGNiblpoY2lCUVQxQlZVRjlEVDA1VVFVbE9SVkpmU1VRZ1BTQmNJbkpsWnkxMWFTMWpiR2xsYm5SY0lqdGNiblpoY2lCUVQxQlZVRjlEVDA1VVFVbE9SVkpmUTB4QlUxTWdQU0JRVDFCVlVGOURUMDVVUVVsT1JWSmZTVVE3WEc1MllYSWdVRTlRVlZCZlNVWlNRVTFGWDBOUFRsUkJTVTVGVWw5RFRFRlRVeUE5SUZ3aWNtVm5MWFZwTFdOc2FXVnVkRjlmYVdaeVlXMWxMV052Ym5SaGFXNWxjbHdpTzF4dWRtRnlJRkJQVUZWUVgwbEdVa0ZOUlY5SlJDQTlJRndpY21WbkxYVnBMV05zYVdWdWRGOWZhV1p5WVcxbFhDSTdYRzUyWVhJZ1VFOVFWVkJmU1VaU1FVMUZYME5NUVZOVElEMGdVRTlRVlZCZlNVWlNRVTFGWDBsRU8xeHVkbUZ5SUVOTVQxTkZYMEpWVkZSUFRsOUpSQ0E5SUZ3aWNtVm5MWFZwTFdOc2FXVnVkRjlmWTJ4dmMyVmNJanRjYm5aaGNpQkRURTlUUlY5Q1ZWUlVUMDVmUTB4QlUxTWdQU0JEVEU5VFJWOUNWVlJVVDA1ZlNVUTdYRzUyWVhJZ1JWTkRYMHRGV1Y5RFQwUkZJRDBnTWpjN1hHNTJZWElnVWtWSFJWaFFYMGxQVXlBOUlDOXBVR0ZrZkdsUWFHOXVaWHhwVUc5a0x6dGNiblpoY2lCSVNVUkZYME5NVDFORlgwSlZWRlJQVGw5RFRFRlRVeUE5SUZ3aWFHbGtaUzFqYkc5elpTMWlkWFIwYjI1Y0lqdGNibHh1THlvcVhHNGdLaUJBY0dGeVlXMGdXM1JsZUhSRmJHVnRaVzUwWFZ4dUlDb2dRSEJoY21GdElHOXdkR2x2Ym5OY2JpQXFJRUJqYjI1emRISjFZM1J2Y2x4dUlDb3ZYRzVjYm5aaGNpQlNaV2RWU1VOc2FXVnVkQ0E5SUdaMWJtTjBhVzl1SUNncElIdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJqYjI1emRISjFZM1J2Y2x4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG05a1pVeHBjM1I4Uld4bGJXVnVkSHhCY25KaGVYMGdkR1Y0ZEVWc1pXMWxiblJ6WEc0Z0lDQWdJQ29nUUhCaGNtRnRJRzl3ZEdsdmJuTmNiaUFnSUNBZ0tpOWNiaUFnSUNCbWRXNWpkR2x2YmlCU1pXZFZTVU5zYVdWdWRDaDBaWGgwUld4bGJXVnVkSE1wSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTVNBbUppQmhjbWQxYldWdWRITmJNVjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklIdDlPMXh1WEc0Z0lDQWdJQ0FnSUY5amJHRnpjME5oYkd4RGFHVmpheWgwYUdsekxDQlNaV2RWU1VOc2FXVnVkQ2s3WEc1Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmZEdWNGRFVnNaVzFsYm5SeklEMGdXMTA3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJR1JwYzIxcGMzTnBZbXhsSUQwZ2IzQjBhVzl1Y3k1a2FYTnRhWE56YVdKc1pTeGNiaUFnSUNBZ0lDQWdJQ0FnSUdScGMzQnNZWGxYYUdWdVZXNWhkWFJvWlc1MGFXTmhkR1ZrSUQwZ2IzQjBhVzl1Y3k1a2FYTndiR0Y1VjJobGJsVnVZWFYwYUdWdWRHbGpZWFJsWkN4Y2JpQWdJQ0FnSUNBZ0lDQWdJRjl2Y0hScGIyNXpKR1Z1ZG1seWIyNXRaVzUwSUQwZ2IzQjBhVzl1Y3k1bGJuWnBjbTl1YldWdWRDeGNiaUFnSUNBZ0lDQWdJQ0FnSUdWdWRtbHliMjV0Wlc1MElEMGdYMjl3ZEdsdmJuTWtaVzUyYVhKdmJtMWxiblFnUFQwOUlIVnVaR1ZtYVc1bFpDQS9JRndpWkdWMlpXeHZjRzFsYm5SY0lpQTZJRjl2Y0hScGIyNXpKR1Z1ZG1seWIyNXRaVzUwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjWFZsY25sUVlYSmhiWE1nUFNCdmNIUnBiMjV6TG5GMVpYSjVVR0Z5WVcxek8xeHVYRzRnSUNBZ0lDQWdJSFpoY2lCMWNteHpJRDBnWDJOdmJuTjBZVzUwY3k1VlVreFRYMDFCVUZ0bGJuWnBjbTl1YldWdWRGMGdmSHdnWDJOdmJuTjBZVzUwY3k1VlVreFRYMDFCVUM1d2NtOWtkV04wYVc5dU8xeHVYRzRnSUNBZ0lDQWdJSFJvYVhNdVgyUnBjMjFwYzNOcFlteGxJRDBnSVNoa2FYTnRhWE56YVdKc1pTQTlQVDBnWm1Gc2MyVWdmSHdnWkdsemJXbHpjMmxpYkdVZ1BUMDlJRndpWm1Gc2MyVmNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYMlJwYzNCc1lYbFhhR1Z1Vlc1aGRYUm9aVzUwYVdOaGRHVmtJRDBnUW05dmJHVmhiaWhrYVhOd2JHRjVWMmhsYmxWdVlYVjBhR1Z1ZEdsallYUmxaQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYM0YxWlhKNVVHRnlZVzF6SUQwZ2NYVmxjbmxRWVhKaGJYTTdYRzVjYmlBZ0lDQWdJQ0FnZEdocGN5NWZkWEpzY3lBOUlHNWxkeUJmVlhKc1FuVnBiR1JsY2pJdVpHVm1ZWFZzZENoMWNteHpLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZkWE5sY2tsdVptOGdQU0J1WlhjZ1gxVnpaWEpKYm1adk1pNWtaV1poZFd4MEtIUm9hWE11WDNWeWJITXVaMlYwVlhObGNrbHVabTlWY213b0tTazdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgyOXdaVzVsWkZkcGJtUnZkMUpsWm1WeVpXNWpaU0E5SUc1MWJHdzdYRzVjYmlBZ0lDQWdJQ0FnZEdocGN5NWZkWE5sY2tOc2FXTnJSWFpsYm5SSVlXNWtiR1Z5SUQwZ2RHaHBjeTVmZFhObGNrTnNhV05yUlhabGJuUklZVzVrYkdWeUxtSnBibVFvZEdocGN5azdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgzZHBibVJ2ZDAxbGMzTmhaMlZNYVhOMFpXNWxjaUE5SUhSb2FYTXVYM2RwYm1SdmQwMWxjM05oWjJWTWFYTjBaVzVsY2k1aWFXNWtLSFJvYVhNcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5amJHOXpaVTl1UlhOalJYWmxiblJJWVc1a2JHVnlJRDBnZEdocGN5NWZZMnh2YzJWUGJrVnpZMFYyWlc1MFNHRnVaR3hsY2k1aWFXNWtLSFJvYVhNcE8xeHVYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtWR1Y0ZEVWc1pXMWxiblJ6S0hSbGVIUkZiR1Z0Wlc1MGN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1gyTnlaV0YwWlVOc1lYTnpLRkpsWjFWSlEyeHBaVzUwTENCYmUxeHVJQ0FnSUNBZ0lDQnJaWGs2SUZ3aWFXNXBkR2xoYkdsNlpWd2lMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dablZ1WTNScGIyNGdhVzVwZEdsaGJHbDZaU2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCZmRHaHBjeUE5SUhSb2FYTTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doZEdocGN5NWZkR1Y0ZEVWc1pXMWxiblJ6TG14bGJtZDBhQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmWW1sdVpFTnNiM05sUlhabGJuUklZVzVrYkdWeUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDl6WlhSMWNFMWxjM05oWjJWTWFYTjBaVzVsY2lncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NTJaWEpwWm5sVGFXZHVTVzVUZEdGMGRYTW9ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpMbDkxY0dSaGRHVk1hVzVyY3lncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN3Z1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoZmRHaHBjeTVmWkdsemNHeGhlVmRvWlc1VmJtRjFkR2hsYm5ScFkyRjBaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWJHbHVhMVJ2VTJsbmJrbHVLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBcUlFbHVhWFJwWVhSbGN5QjFjMlZ5SUhabGNtbG1hV05oZEdsdmJpQndjbTlqWlhOeklIZG9hV05vSUdWdGFYUnpJSEpsWjJsemRISmhkR2x2YmlCemRHRjBkWE1nWlhabGJuUnpYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUZ0emFXZHVaV1JKYmtOaVhWeHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JiYm05MFUybG5ibVZrU1c1RFlsMWNiaUFnSUNBZ0lDQWdJQ292WEc1Y2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKMlpYSnBabmxUYVdkdVNXNVRkR0YwZFhOY0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlIWmxjbWxtZVZOcFoyNUpibE4wWVhSMWN5aHphV2R1WldSSmJrTmlMQ0J1YjNSVGFXZHVaV1JKYmtOaUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdYM1JvYVhNeUlEMGdkR2hwY3p0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZkWE5sY2tsdVptOHVabVYwWTJoVmMyVnlTVzVtYnlobWRXNWpkR2x2YmlBb1pYSnliM0lzSUhObGMzTnBiMjVFWlhSaGFXeHpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWMFVtVm5WWE5sY2tsdVptOG9jMlZ6YzJsdmJrUmxkR0ZwYkhNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDZ3dMQ0JmWkdsemNHRjBZMmhGZG1WdWRESXVaR1ZtWVhWc2RDa29kMmx1Wkc5M0xDQmNJbkpsWnkxMWMyVnlMV2x1Wm04dGNtVmhaSGxjSWl3Z2MyVnpjMmx2YmtSbGRHRnBiSE1wTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSE5sYzNOcGIyNUVaWFJoYVd4ekxuVnpaWEpKWkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrYVhOd1lYUmphRk5wWjI1bFpFbHVSWFpsYm5Rb2MyVnpjMmx2YmtSbGRHRnBiSE11ZFhObGNrbGtLVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JSE5wWjI1bFpFbHVRMklnUFQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJsbmJtVmtTVzVEWWk1allXeHNLRjkwYUdsek1pd2djMlZ6YzJsdmJrUmxkR0ZwYkhNdWRYTmxja2xrS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tEQXNJRjlrYVhOd1lYUmphRVYyWlc1ME1pNWtaV1poZFd4MEtTaDNhVzVrYjNjc0lGd2ljbVZuTFhWelpYSXRibTkwTFhOcFoyNWxaQzFwYmx3aUtUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYm05MFUybG5ibVZrU1c1RFlpQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc1dmRGTnBaMjVsWkVsdVEySXVZMkZzYkNoZmRHaHBjeklwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdhMlY1T2lCY0ltTnNaV0Z1ZFhCY0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlHTnNaV0Z1ZFhBb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdYM1JvYVhNeklEMGdkR2hwY3p0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11WDNkcGJtUnZkMDFsYzNOaFoyVk1hWE4wWlc1bGNpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLRndpYldWemMyRm5aVndpTENCMGFHbHpMbDkzYVc1a2IzZE5aWE56WVdkbFRHbHpkR1Z1WlhJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDNkcGJtUnZkMDFsYzNOaFoyVk1hWE4wWlc1bGNpQTlJRzUxYkd3N1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbDkxYzJWeVEyeHBZMnRGZG1WdWRFaGhibVJzWlhJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5MFpYaDBSV3hsYldWdWRITXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9kR1Y0ZEVWc1pXMWxiblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Y0ZEVWc1pXMWxiblF1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2loY0ltTnNhV05yWENJc0lGOTBhR2x6TXk1ZmRYTmxja05zYVdOclJYWmxiblJJWVc1a2JHVnlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDkwWlhoMFJXeGxiV1Z1ZEhNdWJHVnVaM1JvSUQwZ01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5MWMyVnlRMnhwWTJ0RmRtVnVkRWhoYm1Sc1pYSWdQU0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1kyeHZjMlZGYkNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0VOTVQxTkZYMEpWVkZSUFRsOUpSQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTJ4dmMyVkZiQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOc2IzTmxSV3d1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2loY0ltTnNhV05yWENJc0lIUm9hWE11WDJocFpHVlFiM0IxY0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCd2IzQjFjRVZzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvVUU5UVZWQmZRMDlPVkVGSlRrVlNYMGxFS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNod2IzQjFjRVZzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NHOXdkWEJGYkM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtGd2lZMnhwWTJ0Y0lpd2dkR2hwY3k1ZmFHbGtaVkJ2Y0hWd0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWliMlI1TG5KbGJXOTJaVU5vYVd4a0tIQnZjSFZ3Uld3cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVmWTJ4dmMyVlBia1Z6WTBWMlpXNTBTR0Z1Wkd4bGNpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvWENKclpYbDFjRndpTENCMGFHbHpMbDlqYkc5elpVOXVSWE5qUlhabGJuUklZVzVrYkdWeUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5amJHOXpaVTl1UlhOalJYWmxiblJJWVc1a2JHVnlJRDBnYm5Wc2JEdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11WDNWelpYSkpibVp2UlhabGJuUklZVzVrYkdWeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmx1Wkc5M0xuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p5WldjdGRYTmxjaTFwYm1adkxYSmxZV1I1WENJc0lIUm9hWE11WDNWelpYSkpibVp2UlhabGJuUklZVzVrYkdWeUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5MWMyVnlTVzVtYjBWMlpXNTBTR0Z1Wkd4bGNpQTlJRzUxYkd3N1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbDl2Y0dWdVpXUlhhVzVrYjNkU1pXWmxjbVZ1WTJVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5dmNHVnVaV1JYYVc1a2IzZFNaV1psY21WdVkyVWdQU0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JqYkc5elpVVnNJRDBnY0c5d2RYQkZiQ0E5SUc1MWJHdzdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nVDNCbGJuTWdRbXh2YjIxaVpYSm5JSE5wWjI0dGFXNGdjR0ZuWlZ4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2NYVmxjbmxRWVhKaGJYTmNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRnR2Y0hSZFhHNGdJQ0FnSUNBZ0lDQXFMMXh1WEc0Z0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNCclpYazZJRndpYkdsdWExUnZVMmxuYmtsdVhDSXNYRzRnSUNBZ0lDQWdJSFpoYkhWbE9pQm1kVzVqZEdsdmJpQnNhVzVyVkc5VGFXZHVTVzRvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NYVmxjbmxRWVhKaGJYTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTUNBbUppQmhjbWQxYldWdWRITmJNRjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN3WFNBNklIUm9hWE11WDNGMVpYSjVVR0Z5WVcxek8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHOXdkQ0E5SUdGeVozVnRaVzUwYzFzeFhUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmWTNKbFlYUmxVRzl3ZFhBb2RHaHBjeTVmZFhKc2N5NW5aWFJNYjJkcGJsVnliQ2h4ZFdWeWVWQmhjbUZ0Y3l3Z1VtVm5WVWxEYkdsbGJuUXVhWE5KVDFNb0tTa3NJQ2d3TENCZmJHOWtZWE5vTWk1a1pXWmhkV3gwS1NoN0lHaHBaR1ZEYkc5elpVSjFkSFJ2YmpvZ2RISjFaU0I5TENCdmNIUXBLVHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCUGNHVnVjeUJDYkc5dmJXSmxjbWNnY21WbmFYTjBjbUYwYVc5dUlIQmhaMlZjYmlBZ0lDQWdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhGMVpYSjVVR0Z5WVcxelhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJiM0IwWFZ4dUlDQWdJQ0FnSUNBZ0tpOWNibHh1SUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbXhwYm10VWIxSmxaMmx6ZEdWeVhDSXNYRzRnSUNBZ0lDQWdJSFpoYkhWbE9pQm1kVzVqZEdsdmJpQnNhVzVyVkc5U1pXZHBjM1JsY2lncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnhkV1Z5ZVZCaGNtRnRjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dkR2hwY3k1ZmNYVmxjbmxRWVhKaGJYTTdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiM0IwSUQwZ1lYSm5kVzFsYm5Seld6RmRPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5amNtVmhkR1ZRYjNCMWNDaDBhR2x6TGw5MWNteHpMbWRsZEZKbFoybHpkR1Z5VlhKc0tIRjFaWEo1VUdGeVlXMXpMQ0JTWldkVlNVTnNhV1Z1ZEM1cGMwbFBVeWdwS1N3Z0tEQXNJRjlzYjJSaGMyZ3lMbVJsWm1GMWJIUXBLSHNnYUdsa1pVTnNiM05sUW5WMGRHOXVPaUIwY25WbElIMHNJRzl3ZENrcE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQXFJRTl3Wlc1eklGUmxjbTFwYm1Gc0lISmxaMmx6ZEhKaGRHbHZiaUJ3WVdkbFhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnhkV1Z5ZVZCaGNtRnRjMXh1SUNBZ0lDQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzI5d2RGMWNiaUFnSUNBZ0lDQWdJQ292WEc1Y2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKc2FXNXJWRzlVWlhKdGFXNWhiRkpsWjJsemRHVnlYQ0lzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxPaUJtZFc1amRHbHZiaUJzYVc1clZHOVVaWEp0YVc1aGJGSmxaMmx6ZEdWeUtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEYxWlhKNVVHRnlZVzF6SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lEQWdKaVlnWVhKbmRXMWxiblJ6V3pCZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1GMGdPaUIwYUdsekxsOXhkV1Z5ZVZCaGNtRnRjenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ2Y0hRZ1BTQmhjbWQxYldWdWRITmJNVjA3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyTnlaV0YwWlZCdmNIVndLSFJvYVhNdVgzVnliSE11WjJWMFZHVnliV2x1WVd4U1pXZHBjM1JsY2xWeWJDaHhkV1Z5ZVZCaGNtRnRjeXdnVW1WblZVbERiR2xsYm5RdWFYTkpUMU1vS1Nrc0lDZ3dMQ0JmYkc5a1lYTm9NaTVrWldaaGRXeDBLU2g3SUdocFpHVkRiRzl6WlVKMWRIUnZiam9nZEhKMVpTQjlMQ0J2Y0hRcEtUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdLaUJQY0dWdWN5QkNkWE5wYm1WemMzZGxaV3NnY21WbmFYTjBjbUYwYVc5dUlIQmhaMlZjYmlBZ0lDQWdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhGMVpYSjVVR0Z5WVcxelhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJiM0IwWFZ4dUlDQWdJQ0FnSUNBZ0tpOWNibHh1SUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbXhwYm10VWIwSjNVbVZuYVhOMFpYSmNJaXhjYmlBZ0lDQWdJQ0FnZG1Gc2RXVTZJR1oxYm1OMGFXOXVJR3hwYm10VWIwSjNVbVZuYVhOMFpYSW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY1hWbGNubFFZWEpoYlhNZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNQ0FtSmlCaGNtZDFiV1Z1ZEhOYk1GMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3dYU0E2SUhSb2FYTXVYM0YxWlhKNVVHRnlZVzF6TzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUc5d2RDQTlJR0Z5WjNWdFpXNTBjMXN4WFR0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZZM0psWVhSbFVHOXdkWEFvZEdocGN5NWZkWEpzY3k1blpYUkNkMUpsWjJsemRHVnlWWEpzS0hGMVpYSjVVR0Z5WVcxekxDQlNaV2RWU1VOc2FXVnVkQzVwYzBsUFV5Z3BLU3dnS0RBc0lGOXNiMlJoYzJneUxtUmxabUYxYkhRcEtIc2dhR2xrWlVOc2IzTmxRblYwZEc5dU9pQjBjblZsSUgwc0lHOXdkQ2twTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBcUlFOXdaVzV6SUVKVFUwOGdURzluYVc0Z2NHRm5aVnh1SUNBZ0lDQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnY1hWbGNubFFZWEpoYlhOY2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlGdHZjSFJkWEc0Z0lDQWdJQ0FnSUNBcUwxeHVYRzRnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0JyWlhrNklGd2liR2x1YTFSdlFsTlRUMXdpTEZ4dUlDQWdJQ0FnSUNCMllXeDFaVG9nWm5WdVkzUnBiMjRnYkdsdWExUnZRbE5UVHlncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnhkV1Z5ZVZCaGNtRnRjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dkR2hwY3k1ZmNYVmxjbmxRWVhKaGJYTTdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiM0IwSUQwZ1lYSm5kVzFsYm5Seld6RmRPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUNnd0xDQmZiRzlrWVhOb01pNWtaV1poZFd4MEtTaDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdibVYzVjJsdVpHOTNPaUIwY25WbExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIZHBaSFJvT2lBME1EQXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhR1ZwWjJoME9pQTFNalVzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkc5allYUnBiMjQ2SUZ3aWJtOWNJaXhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzYVc1a2IzZE9ZVzFsT2lCY0luUmxjbTFwYm1Gc1hDSmNiaUFnSUNBZ0lDQWdJQ0FnSUgwc0lHOXdkQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyTnlaV0YwWlZCdmNIVndLSFJvYVhNdVgzVnliSE11WjJWMFFuTnpiMVZ5YkNoeGRXVnllVkJoY21GdGN5d2dVbVZuVlVsRGJHbGxiblF1YVhOSlQxTW9LU2tzSUc5d2RHbHZibk1wTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBcUlFTmhiR3h6SUdFZ1kyRnNiR0poWTJzZ2QyaGxibVYyWlhJZ2RYTmxjaUJwYm1adklHSmxZMjl0WlhNZ1lYWmhhV3hoWW14bFhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR05oYkd4aVlXTnJYRzRnSUNBZ0lDQWdJQ0FxTDF4dVhHNGdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQnJaWGs2SUZ3aWIyNVZjMlZ5U1c1bWIxSmxZV1I1WENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCdmJsVnpaWEpKYm1adlVtVmhaSGtvWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoM2FXNWtiM2N1WDNKbFoxVnpaWEpKYm1adktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyc29kMmx1Wkc5M0xsOXlaV2RWYzJWeVNXNW1ieWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDkxYzJWeVNXNW1iMFYyWlc1MFNHRnVaR3hsY2lBOUlIUm9hWE11WDNWelpYSkpibVp2UlhabGJuUklZVzVrYkdWeUlIeDhJSFJvYVhNdVgySnBibVJWYzJWeVNXNW1iMFYyWlc1MEtHTmhiR3hpWVdOcktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpY21WbkxYVnpaWEl0YVc1bWJ5MXlaV0ZrZVZ3aUxDQjBhR2x6TGw5MWMyVnlTVzVtYjBWMlpXNTBTR0Z1Wkd4bGNpazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSHRPYjJSbFRHbHpkSHhGYkdWdFpXNTBmRUZ5Y21GNWZTQjBaWGgwUld4bGJXVnVkSE5jYmlBZ0lDQWdJQ0FnSUNvZ1FISmxkSFZ5Ym5NZ2UxSmxaMVZKUTJ4cFpXNTBmVnh1SUNBZ0lDQWdJQ0FnS2k5Y2JseHVJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdhMlY1T2lCY0ltRmtaRlJsZUhSRmJHVnRaVzUwYzF3aUxGeHVJQ0FnSUNBZ0lDQjJZV3gxWlRvZ1puVnVZM1JwYjI0Z1lXUmtWR1Y0ZEVWc1pXMWxiblJ6S0hSbGVIUkZiR1Z0Wlc1MGN5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJRjkwYUdsek5DQTlJSFJvYVhNN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBaWGgwUld4bGJXVnVkSE5CY25KaGVTQTlJR1ZzWlcxbGJuUkpjMEZ1UVhKeVlYbFBjazV2WkdWTWFYTjBLSFJsZUhSRmJHVnRaVzUwY3lrZ1B5QkJjbkpoZVM1d2NtOTBiM1I1Y0dVdWMyeHBZMlV1WTJGc2JDaDBaWGgwUld4bGJXVnVkSE1wSURvZ1cxMDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwWlhoMFJXeGxiV1Z1ZEhNZ2FXNXpkR0Z1WTJWdlppQjNhVzVrYjNjdVJXeGxiV1Z1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFJGYkdWdFpXNTBjMEZ5Y21GNUlEMGdXM1JsZUhSRmJHVnRaVzUwYzEwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgzUmxlSFJGYkdWdFpXNTBjeUE5SUhSb2FYTXVYM1JsZUhSRmJHVnRaVzUwY3k1amIyNWpZWFFvZEdWNGRFVnNaVzFsYm5SelFYSnlZWGtwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOTBaWGgwUld4bGJXVnVkSE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvZEdWNGRFVnNaVzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBaWGgwUld4bGJXVnVkQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aVkyeHBZMnRjSWl3Z1gzUm9hWE0wTGw5MWMyVnlRMnhwWTJ0RmRtVnVkRWhoYm1Sc1pYSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJsZUhSRmJHVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKamJHbGphMXdpTENCZmRHaHBjelF1WDNWelpYSkRiR2xqYTBWMlpXNTBTR0Z1Wkd4bGNpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSGRwYm1SdmR5NWZjbVZuVlhObGNrbGtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZkWEJrWVhSbFRHbHVhM01vS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKZlltbHVaRU5zYjNObFJYWmxiblJJWVc1a2JHVnlYQ0lzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxPaUJtZFc1amRHbHZiaUJmWW1sdVpFTnNiM05sUlhabGJuUklZVzVrYkdWeUtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxsOWthWE50YVhOemFXSnNaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1pHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltdGxlWFZ3WENJc0lIUm9hWE11WDJOc2IzTmxUMjVGYzJORmRtVnVkRWhoYm1Sc1pYSXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNCclpYazZJRndpWDJKcGJtUlZjMlZ5U1c1bWIwVjJaVzUwWENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCZlltbHVaRlZ6WlhKSmJtWnZSWFpsYm5Rb1kyRnNiR0poWTJzcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqWVd4c1ltRmpheWhsZG1WdWRDNWtaWFJoYVd3cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdhMlY1T2lCY0lsOXpaWFIxY0UxbGMzTmhaMlZNYVhOMFpXNWxjbHdpTEZ4dUlDQWdJQ0FnSUNCMllXeDFaVG9nWm5WdVkzUnBiMjRnWDNObGRIVndUV1Z6YzJGblpVeHBjM1JsYm1WeUtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKdFpYTnpZV2RsWENJc0lIUm9hWE11WDNkcGJtUnZkMDFsYzNOaFoyVk1hWE4wWlc1bGNpazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSFZ5YkZ4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IzQjBYRzRnSUNBZ0lDQWdJQ0FxSUVCd2NtbDJZWFJsWEc0Z0lDQWdJQ0FnSUNBcUwxeHVYRzRnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0JyWlhrNklGd2lYMk55WldGMFpWQnZjSFZ3WENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCZlkzSmxZWFJsVUc5d2RYQW9kWEpzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2IzQjBJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQjdmVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0ZKbFoxVkpRMnhwWlc1MExtbHpTVTlUS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjNhVzVrYjNjdWIzQmxiaWgxY213c0lGd2lYM05sYkdaY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2IzQjBMbTVsZDFkcGJtUnZkeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TGw5dmNHVnVaV1JYYVc1a2IzZFNaV1psY21WdVkyVWdQVDBnYm5Wc2JDQjhmQ0IwYUdsekxsOXZjR1Z1WldSWGFXNWtiM2RTWldabGNtVnVZMlV1WTJ4dmMyVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ1WlhkWGFXNWtiM2RUWlhSMGFXNW5jeUE5SUZ3aWQybGtkR2c5WENJZ0t5QnZjSFF1ZDJsa2RHZ2dLeUJjSWl4b1pXbG5hSFE5WENJZ0t5QnZjSFF1YUdWcFoyaDBJQ3NnWENJc2JHOWpZWFJwYjI0OVhDSWdLeUJ2Y0hRdWJHOWpZWFJwYjI0N1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyOXdaVzVsWkZkcGJtUnZkMUpsWm1WeVpXNWpaU0E5SUhkcGJtUnZkeTV2Y0dWdUtIVnliQ3dnYjNCMExuZHBibVJ2ZDA1aGJXVWdmSHdnWENKemFXZHVYMmx1WENJc0lHNWxkMWRwYm1SdmQxTmxkSFJwYm1kektUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMjl3Wlc1bFpGZHBibVJ2ZDFKbFptVnlaVzVqWlM1bWIyTjFjeWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJRjl2Y0hRa2FHbGtaVU5zYjNObFFuVjBkRzl1SUQwZ2IzQjBMbWhwWkdWRGJHOXpaVUoxZEhSdmJpeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm9hV1JsUTJ4dmMyVkNkWFIwYjI0Z1BTQmZiM0IwSkdocFpHVkRiRzl6WlVKMWRIUnZiaUE5UFQwZ2RXNWtaV1pwYm1Wa0lEOGdabUZzYzJVZ09pQmZiM0IwSkdocFpHVkRiRzl6WlVKMWRIUnZianRjYmx4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYaHBjM1JwYm1kUWIzQjFjRVZzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvVUU5UVZWQmZRMDlPVkVGSlRrVlNYMGxFS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCbGVHbHpkR2x1WjBsbWNtRnRaVVZzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvVUU5UVZWQmZTVVpTUVUxRlgwbEVLVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdaRzlqZFcxbGJuUXVZbTlrZVM1elpYUkJkSFJ5YVdKMWRHVW9RazlFV1Y5UVQxQlZVRjlUVkVGVVZWTmZRVlJVVWw5T1FVMUZMQ0JjSW5Ob2IzZGNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ2d3TENCZlpHbHpjR0YwWTJoRmRtVnVkREl1WkdWbVlYVnNkQ2tvZDJsdVpHOTNMQ0JjSW5KbFp5MTFhUzF6YUc5M0xYQnZjQzExY0Z3aUtUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1Y0YVhOMGFXNW5VRzl3ZFhCRmJDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJ2WjJkc1pVTnNZWE56S0dWNGFYTjBhVzVuVUc5d2RYQkZiQ3dnU0VsRVJWOURURTlUUlY5Q1ZWUlVUMDVmUTB4QlUxTXNJR2hwWkdWRGJHOXpaVUoxZEhSdmJpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmMyaHZkMUJ2Y0hWd1FXWjBaWEpKWm5KaGJXVklaV2xuYUhSU1pXWnlaWE5vS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pYaHBjM1JwYm1kSlpuSmhiV1ZGYkM1elpYUkJkSFJ5YVdKMWRHVW9YQ0p6Y21OY0lpd2dkWEpzS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ3YjNCMWNFVnNJRDBnZEdocGN5NWZaMlZ1WlhKaGRHVlFiM0IxY0VOdmJuUmxiblFvZFhKc0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG1KdlpIa3VZWEJ3Wlc1a1EyaHBiR1FvY0c5d2RYQkZiQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBiMmRuYkdWRGJHRnpjeWh3YjNCMWNFVnNMQ0JJU1VSRlgwTk1UMU5GWDBKVlZGUlBUbDlEVEVGVFV5d2dhR2xrWlVOc2IzTmxRblYwZEc5dUtUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYzJodmQxQnZjSFZ3UVdaMFpYSkpabkpoYldWSVpXbG5hSFJTWldaeVpYTm9LQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbDlrYVhOdGFYTnphV0pzWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJqYkc5elpVSjFkSFJ2YmtWc0lEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb1EweFBVMFZmUWxWVVZFOU9YMGxFS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnZjSFZ3Uld3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltTnNhV05yWENJc0lIUm9hWE11WDJocFpHVlFiM0IxY0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyeHZjMlZDZFhSMGIyNUZiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpWTJ4cFkydGNJaXdnZEdocGN5NWZhR2xrWlZCdmNIVndLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdkWEpzWEc0Z0lDQWdJQ0FnSUNBcUlFQnlaWFIxY201eklIdElWRTFNUkdsMlJXeGxiV1Z1ZEgxY2JpQWdJQ0FnSUNBZ0lDb2dRSEJ5YVhaaGRHVmNiaUFnSUNBZ0lDQWdJQ292WEc1Y2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKZloyVnVaWEpoZEdWUWIzQjFjRU52Ym5SbGJuUmNJaXhjYmlBZ0lDQWdJQ0FnZG1Gc2RXVTZJR1oxYm1OMGFXOXVJRjluWlc1bGNtRjBaVkJ2Y0hWd1EyOXVkR1Z1ZENoMWNtd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJqYkc5elpVSjFkSFJ2YmlBOUlGd2lQR1JwZGlCamJHRnpjejFjWEZ3aVhDSWdLeUJEVEU5VFJWOUNWVlJVVDA1ZlEweEJVMU1nS3lCY0lseGNYQ0lnYVdROVhGeGNJbHdpSUNzZ1EweFBVMFZmUWxWVVZFOU9YMGxFSUNzZ1hDSmNYRndpUGtOc2IzTmxQQzlrYVhZK1hDSTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJvZEcxc1EyOXVkR1Z1ZENBOUlGd2lQR1JwZGlCamJHRnpjejFjWEZ3aVhDSWdLeUJRVDFCVlVGOUpSbEpCVFVWZlEwOU9WRUZKVGtWU1gwTk1RVk5USUNzZ1hDSmNYRndpUGx3aUlDc2dLSFJvYVhNdVgyUnBjMjFwYzNOcFlteGxJRDhnWTJ4dmMyVkNkWFIwYjI0Z09pQmNJbHdpS1NBcklGd2lYRnh1SUNBZ0lDQWdJQ0FnSUNBZ1BHbG1jbUZ0WlNCcFpEMWNYRndpWENJZ0t5QlFUMUJWVUY5SlJsSkJUVVZmU1VRZ0t5QmNJbHhjWENJZ1kyeGhjM005WEZ4Y0lsd2lJQ3NnVUU5UVZWQmZTVVpTUVUxRlgwTk1RVk5USUNzZ1hDSmNYRndpSUhOeVl6MWNYRndpWENJZ0t5QjFjbXdnS3lCY0lseGNYQ0lnWm5KaGJXVmliM0prWlhJOVhGeGNJakJjWEZ3aVBqd3ZhV1p5WVcxbFBqd3ZaR2wyUGx3aU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjRzl3ZFhCRmJDQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSmthWFpjSWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3YjNCMWNFVnNMbk5sZEVGMGRISnBZblYwWlNoY0ltTnNZWE56WENJc0lGQlBVRlZRWDBOUFRsUkJTVTVGVWw5RFRFRlRVeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndiM0IxY0VWc0xuTmxkRUYwZEhKcFluVjBaU2hjSW1sa1hDSXNJRkJQVUZWUVgwTlBUbFJCU1U1RlVsOUpSQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndiM0IxY0VWc0xtbHVibVZ5U0ZSTlRDQTlJR2gwYld4RGIyNTBaVzUwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdjRzl3ZFhCRmJEdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdLaUJJYVdSbGN5QmhJSEJ2Y0MxMWNGeHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdlMFYyWlc1MGZTQmJaWFpsYm5SZFhHNGdJQ0FnSUNBZ0lDQXFJRUJ3Y21sMllYUmxYRzRnSUNBZ0lDQWdJQ0FxTDF4dVhHNGdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQnJaWGs2SUZ3aVgyaHBaR1ZRYjNCMWNGd2lMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dablZ1WTNScGIyNGdYMmhwWkdWUWIzQjFjQ2hsZG1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1YyWlc1MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaWFpsYm5RdWMzUnZjRkJ5YjNCaFoyRjBhVzl1S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbUp2WkhrdWNtVnRiM1psUVhSMGNtbGlkWFJsS0VKUFJGbGZVRTlRVlZCZlUxUkJWRlZUWDBGVVZGSmZUa0ZOUlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYaHBjM1JwYm1kUWIzQjFjRVZzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvVUU5UVZWQmZRMDlPVkVGSlRrVlNYMGxFS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnS0RBc0lGOWthWE53WVhSamFFVjJaVzUwTWk1a1pXWmhkV3gwS1NoM2FXNWtiM2NzSUZ3aWNtVm5MWFZwTFdOc2IzTmxMWEJ2Y0MxMWNGd2lLVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dWNGFYTjBhVzVuVUc5d2RYQkZiQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWNGFYTjBhVzVuVUc5d2RYQkZiQzV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9VRTlRVlZCZlUxUkJWRlZUWDBGVVZGSmZUa0ZOUlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKZmRYQmtZWFJsVEdsdWEzTmNJaXhjYmlBZ0lDQWdJQ0FnZG1Gc2RXVTZJR1oxYm1OMGFXOXVJRjkxY0dSaGRHVk1hVzVyY3lncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYM1JsZUhSRmJHVnRaVzUwY3k1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNoMFpYaDBSV3hsYldWdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJsZUhSRmJHVnRaVzUwTG5ObGRFRjBkSEpwWW5WMFpTaFRTVWRPUlVSZlNVNWZRVlJVVWw5T1FVMUZMQ0JjSW5SeWRXVmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdWNGRFVnNaVzFsYm5RdWRHVjRkRU52Ym5SbGJuUWdQU0JjSWxObGRIUnBibWR6WENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdhMlY1T2lCY0lsOTFjMlZ5UTJ4cFkydEZkbVZ1ZEVoaGJtUnNaWEpjSWl4Y2JpQWdJQ0FnSUNBZ2RtRnNkV1U2SUdaMWJtTjBhVzl1SUY5MWMyVnlRMnhwWTJ0RmRtVnVkRWhoYm1Sc1pYSW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdWMlpXNTBMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMmxuYm1Wa1NXNUJiSEpsWVdSNUlEMGdaWFpsYm5RdWRHRnlaMlYwTG1kbGRFRjBkSEpwWW5WMFpTaFRTVWRPUlVSZlNVNWZRVlJVVWw5T1FVMUZLU0E5UFQwZ1hDSjBjblZsWENJN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hjMmxuYm1Wa1NXNUJiSEpsWVdSNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11YkdsdWExUnZVMmxuYmtsdUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUZKbFoxVkpRMnhwWlc1MExtZHZWRzlWY213b2RHaHBjeTVmZFhKc2N5NW5aWFJUWlhSMGFXNW5jMVZ5YkNncEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbDl6YUc5M1VHOXdkWEJCWm5SbGNrbG1jbUZ0WlVobGFXZG9kRkpsWm5KbGMyaGNJaXhjYmlBZ0lDQWdJQ0FnZG1Gc2RXVTZJR1oxYm1OMGFXOXVJRjl6YUc5M1VHOXdkWEJCWm5SbGNrbG1jbUZ0WlVobGFXZG9kRkpsWm5KbGMyZ29LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY0c5d2RYQkZiQ0E5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLRkJQVUZWUVgwTlBUbFJCU1U1RlVsOUpSQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYVdaeVlXMWxSV3dnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2hRVDFCVlVGOUpSbEpCVFVWZlNVUXBPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVhCdmNIVndSV3dnZkh3Z0lXbG1jbUZ0WlVWc0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWm5KaGJXVkZiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpYkc5aFpGd2lMQ0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWnlZVzFsUld3dWMzUjViR1V1YUdWcFoyaDBJRDBnYVdaeVlXMWxSV3d1YzJOeWIyeHNTR1ZwWjJoME8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjRzl3ZFhCRmJDNXpaWFJCZEhSeWFXSjFkR1VvVUU5UVZWQmZVMVJCVkZWVFgwRlVWRkpmVGtGTlJTd2dYQ0p6YUc5M1hDSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlMQ0I3WEc0Z0lDQWdJQ0FnSUd0bGVUb2dYQ0pmZDJsdVpHOTNUV1Z6YzJGblpVeHBjM1JsYm1WeVhDSXNYRzRnSUNBZ0lDQWdJSFpoYkhWbE9pQm1kVzVqZEdsdmJpQmZkMmx1Wkc5M1RXVnpjMkZuWlV4cGMzUmxibVZ5S0dWMlpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYjNKcFoybHVJRDBnWlhabGJuUXViM0pwWjJsdUlIeDhJR1YyWlc1MExtOXlhV2RwYm1Gc1JYWmxiblF1YjNKcFoybHVPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZTWldkVlNVTnNhV1Z1ZEM1cGMxZG9hWFJsVEdsemRHVmtSRzl0WVdsdUtHOXlhV2RwYmlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCdFpYTnpZV2RsSUQwZ1pYWmxiblF1WkdGMFlUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOM2FYUmphQ0FvYldWemMyRm5aUzUwZVhCbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNCY0lsSkZSeTFJU1VSRkxWQlBVRlZRWENJNlhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyaHBaR1ZRYjNCMWNDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqWVhObElGd2lVa1ZITFZWVFJWSXRVMGxIVGtWRUxVbE9YQ0k2WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDNWd1pHRjBaVXhwYm10ektDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGRGSmxaMVZ6WlhKSmJtWnZLSHNnZFhObGNrbGtPaUJ0WlhOellXZGxMblZ6WlhKSlpDQjlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHbHpjR0YwWTJoVGFXZHVaV1JKYmtWMlpXNTBLRzFsYzNOaFoyVXVkWE5sY2tsa0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNCY0lsSkZSeTFWVTBWU0xVaEpSRVV0VUU5UVZWQmNJanBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdVgyUnBjMjFwYzNOcFlteGxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOW9hV1JsVUc5d2RYQW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdhMlY1T2lCY0lsOWpiRzl6WlU5dVJYTmpSWFpsYm5SSVlXNWtiR1Z5WENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCZlkyeHZjMlZQYmtWelkwVjJaVzUwU0dGdVpHeGxjaWhsZG1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR2x6UlhOallYQmxTMlY1SUQwZ1pYWmxiblF1YTJWNUlEMDlQU0JjSWtWelkyRndaVndpSUh4OElDaGxkbVZ1ZEM1clpYbERiMlJsSUh4OElHVjJaVzUwTG5kb2FXTm9LU0E5UFQwZ1JWTkRYMHRGV1Y5RFQwUkZPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2x6UlhOallYQmxTMlY1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYUdsa1pWQnZjSFZ3S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1FITjBZWFJwWTF4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ1pHOXRZV2x1WEc0Z0lDQWdJQ0FnSUNBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZWeHVJQ0FnSUNBZ0lDQWdLaTljYmx4dUlDQWdJSDFkTENCYmUxeHVJQ0FnSUNBZ0lDQnJaWGs2SUZ3aWFYTlhhR2wwWlV4cGMzUmxaRVJ2YldGcGJsd2lMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dablZ1WTNScGIyNGdhWE5YYUdsMFpVeHBjM1JsWkVSdmJXRnBiaWhrYjIxaGFXNHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCa2IyMWhhVzR1YVc1a1pYaFBaaWhjSWk1aWJHOXZiV0psY21jdVkyOXRYQ0lwSUQ0OUlEQTdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nU1U5VElHUmxkbWxqWlNCa1pYUmxZM1JwYjI1Y2JpQWdJQ0FnSUNBZ0lDb2dRSE4wWVhScFkxeHVJQ0FnSUNBZ0lDQWdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjFjYmlBZ0lDQWdJQ0FnSUNvdlhHNWNiaUFnSUNCOUxDQjdYRzRnSUNBZ0lDQWdJR3RsZVRvZ1hDSnBjMGxQVTF3aUxGeHVJQ0FnSUNBZ0lDQjJZV3gxWlRvZ1puVnVZM1JwYjI0Z2FYTkpUMU1vS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdJU0Z1WVhacFoyRjBiM0l1Y0d4aGRHWnZjbTBnSmlZZ1VrVkhSVmhRWDBsUFV5NTBaWE4wS0c1aGRtbG5ZWFJ2Y2k1d2JHRjBabTl5YlNrN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dRSE4wWVhScFkxeHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdkWEpzWEc0Z0lDQWdJQ0FnSUNBcUwxeHVYRzRnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0JyWlhrNklGd2laMjlVYjFWeWJGd2lMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dablZ1WTNScGIyNGdaMjlVYjFWeWJDaDFjbXdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9jbVZtSUQwZ2RYSnNPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVjBwTzF4dVhHNGdJQ0FnY21WMGRYSnVJRkpsWjFWSlEyeHBaVzUwTzF4dWZTZ3BPMXh1WEc0dktpcGNiaUFxSUVCd1lYSmhiU0I3Uld4bGJXVnVkSDBnWld4Y2JpQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQmpiR0Z6YzA1aGJXVmNiaUFxSUVCd1lYSmhiU0I3UW05dmJHVmhibjBnWm05eVkyVmNiaUFxTDF4dVhHNWNibVoxYm1OMGFXOXVJSFJ2WjJkc1pVTnNZWE56S0dWc0xDQmpiR0Z6YzA1aGJXVXNJR1p2Y21ObEtTQjdYRzRnSUNBZ2FXWWdLR1ZzTG1Oc1lYTnpUR2x6ZEM1MGIyZG5iR1V1YkdWdVozUm9JQ0U5UFNBd0tTQjdYRzRnSUNBZ0lDQWdJR1ZzTG1Oc1lYTnpUR2x6ZEM1MGIyZG5iR1VvWTJ4aGMzTk9ZVzFsTENCbWIzSmpaU2s3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjJZWElnYldWMGFHOWtJRDBnWm05eVkyVWdQeUJjSW1Ga1pGd2lJRG9nWENKeVpXMXZkbVZjSWp0Y2JpQWdJQ0JsYkM1amJHRnpjMHhwYzNSYmJXVjBhRzlrWFNoamJHRnpjMDVoYldVcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0IxYzJWeVNXUmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1pHbHpjR0YwWTJoVGFXZHVaV1JKYmtWMlpXNTBLSFZ6WlhKSlpDa2dlMXh1SUNBZ0lHbG1JQ2doZFhObGNrbGtJSHg4SUhkcGJtUnZkeTVmY21WblZYTmxja2xrSUQwOVBTQjFjMlZ5U1dRcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUNnd0xDQmZaR2x6Y0dGMFkyaEZkbVZ1ZERJdVpHVm1ZWFZzZENrb2QybHVaRzkzTENCY0luSmxaeTExYzJWeUxYTnBaMjVsWkMxcGJsd2lMQ0I3WEc0Z0lDQWdJQ0FnSUhWelpYSkpaRG9nZFhObGNrbGtYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQjNhVzVrYjNjdVgzSmxaMVZ6WlhKSlpDQTlJSFZ6WlhKSlpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1pXeGxiV1Z1ZEVselFXNUJjbkpoZVU5eVRtOWtaVXhwYzNRb1pXeGxiV1Z1ZEhNcElIdGNiaUFnSUNCeVpYUjFjbTRnWld4bGJXVnVkSE1nSmlZZ1pXeGxiV1Z1ZEhNdWJHVnVaM1JvSUNZbUlHVnNaVzFsYm5SekxteGxibWQwYUNBK1BTQXdPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpaWFJTWldkVmMyVnlTVzVtYnlncElIdGNiaUFnSUNCMllYSWdjMlZ6YzJsdmJrUmxkR0ZwYkhNZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNQ0FtSmlCaGNtZDFiV1Z1ZEhOYk1GMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3dYU0E2SUh0OU8xeHVYRzRnSUNBZ2RtRnlJR1Y0YVhOMGFXNW5SR1YwWVdsc2N5QTlJSGRwYm1SdmR5NWZjbVZuVlhObGNrbHVabThnZkh3Z2UzMDdYRzVjYmlBZ0lDQjNhVzVrYjNjdVgzSmxaMVZ6WlhKSmJtWnZJRDBnZTF4dUlDQWdJQ0FnSUNCaFoyVnVkRWxrT2lCbGVHbHpkR2x1WjBSbGRHRnBiSE11WVdkbGJuUkpaQ0I4ZkNCelpYTnphVzl1UkdWMFlXbHNjeTVoWjJWdWRFbGtMRnh1SUNBZ0lDQWdJQ0J6WlhOemFXOXVTV1E2SUdWNGFYTjBhVzVuUkdWMFlXbHNjeTV6WlhOemFXOXVTV1FnZkh3Z2MyVnpjMmx2YmtSbGRHRnBiSE11YzJWemMybHZia2xrTEZ4dUlDQWdJQ0FnSUNCelpYTnphVzl1UzJWNU9pQmxlR2x6ZEdsdVowUmxkR0ZwYkhNdWMyVnpjMmx2Ymt0bGVTQjhmQ0J6WlhOemFXOXVSR1YwWVdsc2N5NXpaWE56YVc5dVMyVjVMRnh1SUNBZ0lDQWdJQ0IxYzJWeVNXUTZJR1Y0YVhOMGFXNW5SR1YwWVdsc2N5NTFjMlZ5U1dRZ2ZId2djMlZ6YzJsdmJrUmxkR0ZwYkhNdWRYTmxja2xrWEc0Z0lDQWdmVHRjYm4xY2JseHVaWGh3YjNKMGN5NWtaV1poZFd4MElEMGdVbVZuVlVsRGJHbGxiblE3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdWNGNHOXlkSE5iWENKa1pXWmhkV3gwWENKZE95SXNJbHdpZFhObElITjBjbWxqZEZ3aU8xeHVYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUh0Y2JpQWdJQ0IyWVd4MVpUb2dkSEoxWlZ4dWZTazdYRzVjYm5aaGNpQmZZM0psWVhSbFEyeGhjM01nUFNCbWRXNWpkR2x2YmlBb0tTQjdJR1oxYm1OMGFXOXVJR1JsWm1sdVpWQnliM0JsY25ScFpYTW9kR0Z5WjJWMExDQndjbTl3Y3lrZ2V5Qm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJSEJ5YjNCekxteGxibWQwYURzZ2FTc3JLU0I3SUhaaGNpQmtaWE5qY21sd2RHOXlJRDBnY0hKdmNITmJhVjA3SUdSbGMyTnlhWEIwYjNJdVpXNTFiV1Z5WVdKc1pTQTlJR1JsYzJOeWFYQjBiM0l1Wlc1MWJXVnlZV0pzWlNCOGZDQm1ZV3h6WlRzZ1pHVnpZM0pwY0hSdmNpNWpiMjVtYVdkMWNtRmliR1VnUFNCMGNuVmxPeUJwWmlBb1hDSjJZV3gxWlZ3aUlHbHVJR1JsYzJOeWFYQjBiM0lwSUdSbGMyTnlhWEIwYjNJdWQzSnBkR0ZpYkdVZ1BTQjBjblZsT3lCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29kR0Z5WjJWMExDQmtaWE5qY21sd2RHOXlMbXRsZVN3Z1pHVnpZM0pwY0hSdmNpazdJSDBnZlNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0VOdmJuTjBjblZqZEc5eUxDQndjbTkwYjFCeWIzQnpMQ0J6ZEdGMGFXTlFjbTl3Y3lrZ2V5QnBaaUFvY0hKdmRHOVFjbTl3Y3lrZ1pHVm1hVzVsVUhKdmNHVnlkR2xsY3loRGIyNXpkSEoxWTNSdmNpNXdjbTkwYjNSNWNHVXNJSEJ5YjNSdlVISnZjSE1wT3lCcFppQW9jM1JoZEdsalVISnZjSE1wSUdSbFptbHVaVkJ5YjNCbGNuUnBaWE1vUTI5dWMzUnlkV04wYjNJc0lITjBZWFJwWTFCeWIzQnpLVHNnY21WMGRYSnVJRU52Ym5OMGNuVmpkRzl5T3lCOU95QjlLQ2s3WEc1Y2JuWmhjaUJmYW5OdmJuQXlJRDBnY21WeGRXbHlaU2hjSWk0dUwzWmxibVJ2Y2k5cWMyOXVjRndpS1R0Y2JseHVkbUZ5SUY5cWMyOXVjRE1nUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlxYzI5dWNESXBPMXh1WEc1MllYSWdYMmRsZEVOdmIydHBaVlpoYkhWbElEMGdjbVZ4ZFdseVpTaGNJaTR2ZFhScGJITXZaMlYwUTI5dmEybGxWbUZzZFdWY0lpazdYRzVjYm5aaGNpQmZaMlYwUTI5dmEybGxWbUZzZFdVeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZloyVjBRMjl2YTJsbFZtRnNkV1VwTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0c5aWFpa2dleUJ5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVmWDJWelRXOWtkV3hsSUQ4Z2IySnFJRG9nZXlCa1pXWmhkV3gwT2lCdlltb2dmVHNnZlZ4dVhHNW1kVzVqZEdsdmJpQmZZMnhoYzNORFlXeHNRMmhsWTJzb2FXNXpkR0Z1WTJVc0lFTnZibk4wY25WamRHOXlLU0I3SUdsbUlDZ2hLR2x1YzNSaGJtTmxJR2x1YzNSaGJtTmxiMllnUTI5dWMzUnlkV04wYjNJcEtTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKRFlXNXViM1FnWTJGc2JDQmhJR05zWVhOeklHRnpJR0VnWm5WdVkzUnBiMjVjSWlrN0lIMGdmVnh1WEc1MllYSWdWRWxOUlU5VlZDQTlJRFV3TURBN1hHNTJZWElnUWtKSFEwOU5YMU5KVkVWZlVrVkhSVmdnUFNBdllteHZiMjFpWlhKblhGd3VZMjl0SkM5cE8xeHVkbUZ5SUVKU1JVZGZWVk5GVWw5SlJGOURUMDlMU1VWZlRrRk5SU0E5SUZ3aVgySnlaV2N0ZFdsa1hDSTdYRzUyWVhJZ1UxVkNVME5TU1ZCVVNVOU9YMUpGUmxKRlUwaGZRMDlQUzBsRlgwNUJUVVVnUFNCY0lsOXNZWE4wTFhKbFpuSmxjMmhjSWp0Y2JuWmhjaUJUUlZOVFNVOU9YMGxFSUQwZ1hDSnpaWE56YVc5dVgybGtYQ0k3WEc1MllYSWdVMFZUVTBsUFRsOUxSVmtnUFNCY0luTmxjM05wYjI1ZmEyVjVYQ0k3WEc1MllYSWdRVWRGVGxSZlNVUWdQU0JjSW1GblpXNTBYMmxrWENJN1hHNWNiaThxS2x4dUlDb2dRR05zWVhOeklGVnpaWEpKYm1adlhHNGdLaTljYmx4dWRtRnlJRlZ6WlhKSmJtWnZJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRR052Ym5OMGNuVmpkRzl5WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSFZ6WlhKSmJtWnZWWEpzWEc0Z0lDQWdJQ292WEc0Z0lDQWdablZ1WTNScGIyNGdWWE5sY2tsdVptOG9kWE5sY2tsdVptOVZjbXdwSUh0Y2JpQWdJQ0FnSUNBZ1gyTnNZWE56UTJGc2JFTm9aV05yS0hSb2FYTXNJRlZ6WlhKSmJtWnZLVHRjYmx4dUlDQWdJQ0FnSUNCMGFHbHpMbDkxYzJWeVNXNW1iMVZ5YkNBOUlIVnpaWEpKYm1adlZYSnNPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR05oYkd4aVlXTnJYRzRnSUNBZ0lDb2dRSEpsZEhWeWJuTWdleXA5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUY5amNtVmhkR1ZEYkdGemN5aFZjMlZ5U1c1bWJ5d2dXM3RjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbVpsZEdOb1ZYTmxja2x1Wm05Y0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlHWmxkR05vVlhObGNrbHVabThvWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoVmMyVnlTVzVtYnk1cGMwOXVRbUpuUTI5dFUybDBaU2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVYMlpsZEdOb1ZYTmxja2x1Wm05R2IzSlRZVzFsVTJsMFpTaGpZV3hzWW1GamF5azdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxsOW1aWFJqYUZWelpYSkpibVp2Um05eVJHbG1abVZ5Wlc1MFUybDBaU2hqWVd4c1ltRmpheWs3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1kyRnNiR0poWTJ0Y2JpQWdJQ0FnSUNBZ0lDb2dRSEJ5YVhaaGRHVmNiaUFnSUNBZ0lDQWdJQ292WEc1Y2JpQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lHdGxlVG9nWENKZlptVjBZMmhWYzJWeVNXNW1iMFp2Y2xOaGJXVlRhWFJsWENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCZlptVjBZMmhWYzJWeVNXNW1iMFp2Y2xOaGJXVlRhWFJsS0dOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2RYTmxja2xrSUQwZ0tEQXNJRjluWlhSRGIyOXJhV1ZXWVd4MVpUSXVaR1ZtWVhWc2RDa29RbEpGUjE5VlUwVlNYMGxFWDBOUFQwdEpSVjlPUVUxRktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQmhaMlZ1ZEVsa0lEMGdLREFzSUY5blpYUkRiMjlyYVdWV1lXeDFaVEl1WkdWbVlYVnNkQ2tvUVVkRlRsUmZTVVFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdselVtVmpaVzUwYkhsU1pXWnlaWE5vWldRZ1BTQWhJU2d3TENCZloyVjBRMjl2YTJsbFZtRnNkV1V5TG1SbFptRjFiSFFwS0ZOVlFsTkRVa2xRVkVsUFRsOVNSVVpTUlZOSVgwTlBUMHRKUlY5T1FVMUZLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJwYzFWelpYSkpibVp2VTJWMElEMGdJU0ZoWjJWdWRFbGtPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVdselVtVmpaVzUwYkhsU1pXWnlaWE5vWldRZ2ZId2dJV2x6VlhObGNrbHVabTlUWlhRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQlZjMlZ5U1c1bWJ5NXFjMjl1Y0NoMGFHbHpMbDkxYzJWeVNXNW1iMVZ5YkN3Z2V5QjBhVzFsYjNWME9pQlVTVTFGVDFWVUlIMHNJR1oxYm1OMGFXOXVJQ2hsY25KdmNpd2daR0YwWVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pYSnliM0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVd4c1ltRmpheWhsY25KdmNpd2dabUZzYzJVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyc29aWEp5YjNJc0lHUmhkR0VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYWmxiblJFWlhSaGFXeHpJRDBnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdGblpXNTBTV1E2SUdGblpXNTBTV1FzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWemMybHZia2xrT2lBb01Dd2dYMmRsZEVOdmIydHBaVlpoYkhWbE1pNWtaV1poZFd4MEtTaFRSVk5UU1U5T1gwbEVLU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6WlhOemFXOXVTMlY1T2lBb01Dd2dYMmRsZEVOdmIydHBaVlpoYkhWbE1pNWtaV1poZFd4MEtTaFRSVk5UU1U5T1gwdEZXU2tzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZFhObGNrbGtPaUIxYzJWeVNXUmNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGJHeGlZV05yS0c1MWJHd3NJR1YyWlc1MFJHVjBZV2xzY3lrN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdZMkZzYkdKaFkydGNiaUFnSUNBZ0lDQWdJQ29nUUhCeWFYWmhkR1ZjYmlBZ0lDQWdJQ0FnSUNvdlhHNWNiaUFnSUNCOUxDQjdYRzRnSUNBZ0lDQWdJR3RsZVRvZ1hDSmZabVYwWTJoVmMyVnlTVzVtYjBadmNrUnBabVpsY21WdWRGTnBkR1ZjSWl4Y2JpQWdJQ0FnSUNBZ2RtRnNkV1U2SUdaMWJtTjBhVzl1SUY5bVpYUmphRlZ6WlhKSmJtWnZSbTl5UkdsbVptVnlaVzUwVTJsMFpTaGpZV3hzWW1GamF5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ZYTmxja2x1Wm04dWFuTnZibkFvZEdocGN5NWZkWE5sY2tsdVptOVZjbXdzSUhzZ2RHbHRaVzkxZERvZ1ZFbE5SVTlWVkNCOUxDQm1kVzVqZEdsdmJpQW9aWEp5YjNJc0lHUmhkR0VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9aWEp5YjNJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oYkd4aVlXTnJLR1Z5Y205eUxDQm1ZV3h6WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyc29aWEp5YjNJc0lHUmhkR0VnZkh3Z2UzMHBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUUhOMFlYUnBZMXh1SUNBZ0lDQWdJQ0FnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4xY2JpQWdJQ0FnSUNBZ0lDb3ZYRzVjYmlBZ0lDQjlYU3dnVzN0Y2JpQWdJQ0FnSUNBZ2EyVjVPaUJjSW1selQyNUNZbWREYjIxVGFYUmxYQ0lzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxPaUJtZFc1amRHbHZiaUJwYzA5dVFtSm5RMjl0VTJsMFpTZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCQ1FrZERUMDFmVTBsVVJWOVNSVWRGV0M1MFpYTjBLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9iM04wYm1GdFpTazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUUhOMFlYUnBZMXh1SUNBZ0lDQWdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnZFhKc1hHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZjSFJwYjI1elhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR05oYkd4aVlXTnJYRzRnSUNBZ0lDQWdJQ0FxSUVCeVpYUjFjbTV6SUhzcWZWeHVJQ0FnSUNBZ0lDQWdLaTljYmx4dUlDQWdJSDBzSUh0Y2JpQWdJQ0FnSUNBZ2EyVjVPaUJjSW1wemIyNXdYQ0lzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxPaUJtZFc1amRHbHZiaUJxYzI5dWNDaDFjbXdzSUc5d2RHbHZibk1zSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdLREFzSUY5cWMyOXVjRE11WkdWbVlYVnNkQ2tvZFhKc0xDQnZjSFJwYjI1ekxDQmpZV3hzWW1GamF5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlYU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdWWE5sY2tsdVptODdYRzU5S0NrN1hHNWNibVY0Y0c5eWRITXVaR1ZtWVhWc2RDQTlJRlZ6WlhKSmJtWnZPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JsZUhCdmNuUnpXMXdpWkdWbVlYVnNkRndpWFRzaUxDSmNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZ3aVgxOWxjMDF2WkhWc1pWd2lMQ0I3WEc0Z0lDQWdkbUZzZFdVNklIUnlkV1ZjYm4wcE8xeHVkbUZ5SUZWU1RGTmZUVUZRSUQwZ2UxeHVJQ0FnSUdSbGRtVnNiM0J0Wlc1ME9pQjdYRzRnSUNBZ0lDQWdJR0poYzJWVmNtdzZJRndpYUhSMGNEb3ZMMnh2WTJGc0xtSnNiMjl0WW1WeVp5NWpiMjA2TkRBd05DOWNJaXhjYmlBZ0lDQWdJQ0FnYkc5bmFXNVZjbXc2SUZ3aWFXWnlZVzFsTDJ4dloybHVYQ0lzWEc0Z0lDQWdJQ0FnSUhKbFoybHpkR1Z5VlhKc09pQmNJbWxtY21GdFpTOXlaV2RwYzNSbGNsd2lMRnh1SUNBZ0lDQWdJQ0IwWlhKdGFXNWhiRkpsWjJsemRHVnlWWEpzT2lCY0ltbG1jbUZ0WlM5MFpYSnRhVzVoYkMxeVpXZHBjM1JsY2x3aUxGeHVJQ0FnSUNBZ0lDQmlkMUpsWjJsemRHVnlWWEpzT2lCY0ltbG1jbUZ0WlM5dFlXZGhlbWx1WlZ3aUxGeHVJQ0FnSUNBZ0lDQnpaWFIwYVc1bmMxVnliRG9nWENKaFkyTnZkVzUwWENJc1hHNGdJQ0FnSUNBZ0lIVnpaWEpKYm1adlZYSnNPaUJjSW5WelpYSXRhVzVtYjF3aUxGeHVJQ0FnSUNBZ0lDQmljM052VlhKc09pQmNJbUZ3YVM5c2IyZHBiaTlpYkc5dmJXSmxjbWN0WVhWMGFDMXlaV1JwY21WamRGd2lYRzRnSUNBZ2ZTeGNiaUFnSUNCemRHRm5hVzVuT2lCN1hHNGdJQ0FnSUNBZ0lHSmhjMlZWY213NklGd2lhSFIwY0hNNkx5OXpkR0ZuYVc1bkxXeHZaMmx1TG1Kc2IyOXRZbVZ5Wnk1amIyMHZYQ0lzWEc0Z0lDQWdJQ0FnSUd4dloybHVWWEpzT2lCY0ltbG1jbUZ0WlM5c2IyZHBibHdpTEZ4dUlDQWdJQ0FnSUNCeVpXZHBjM1JsY2xWeWJEb2dYQ0pwWm5KaGJXVXZjbVZuYVhOMFpYSmNJaXhjYmlBZ0lDQWdJQ0FnZEdWeWJXbHVZV3hTWldkcGMzUmxjbFZ5YkRvZ1hDSnBabkpoYldVdmRHVnliV2x1WVd3dGNtVm5hWE4wWlhKY0lpeGNiaUFnSUNBZ0lDQWdZbmRTWldkcGMzUmxjbFZ5YkRvZ1hDSnBabkpoYldVdmJXRm5ZWHBwYm1WY0lpeGNiaUFnSUNBZ0lDQWdjMlYwZEdsdVozTlZjbXc2SUZ3aVlXTmpiM1Z1ZEZ3aUxGeHVJQ0FnSUNBZ0lDQjFjMlZ5U1c1bWIxVnliRG9nWENKMWMyVnlMV2x1Wm05Y0lpeGNiaUFnSUNBZ0lDQWdZbk56YjFWeWJEb2dYQ0poY0drdmJHOW5hVzR2WW14dmIyMWlaWEpuTFdGMWRHZ3RjbVZrYVhKbFkzUmNJbHh1SUNBZ0lIMHNYRzRnSUNBZ2MyRnVaR05oYzNSc1pUb2dlMXh1SUNBZ0lDQWdJQ0JpWVhObFZYSnNPaUJjSW1oMGRIQnpPaTh2YzJGdVpHTmhjM1JzWlM1aWJHOXZiV0psY21jdVkyOXRMM0psWnpJdlhDSXNYRzRnSUNBZ0lDQWdJR3h2WjJsdVZYSnNPaUJjSW1sbWNtRnRaUzlzYjJkcGJsd2lMRnh1SUNBZ0lDQWdJQ0J5WldkcGMzUmxjbFZ5YkRvZ1hDSnBabkpoYldVdmNtVm5hWE4wWlhKY0lpeGNiaUFnSUNBZ0lDQWdkR1Z5YldsdVlXeFNaV2RwYzNSbGNsVnliRG9nWENKcFpuSmhiV1V2ZEdWeWJXbHVZV3d0Y21WbmFYTjBaWEpjSWl4Y2JpQWdJQ0FnSUNBZ1luZFNaV2RwYzNSbGNsVnliRG9nWENKcFpuSmhiV1V2YldGbllYcHBibVZjSWl4Y2JpQWdJQ0FnSUNBZ2MyVjBkR2x1WjNOVmNtdzZJRndpWVdOamIzVnVkRndpTEZ4dUlDQWdJQ0FnSUNCMWMyVnlTVzVtYjFWeWJEb2dYQ0oxYzJWeUxXbHVabTljSWl4Y2JpQWdJQ0FnSUNBZ1luTnpiMVZ5YkRvZ1hDSmhjR2t2Ykc5bmFXNHZZbXh2YjIxaVpYSm5MV0YxZEdndGNtVmthWEpsWTNSY0lseHVJQ0FnSUgwc1hHNGdJQ0FnY0hKdlpIVmpkR2x2YmpvZ2UxeHVJQ0FnSUNBZ0lDQmlZWE5sVlhKc09pQmNJbWgwZEhCek9pOHZiRzluYVc0dVlteHZiMjFpWlhKbkxtTnZiUzljSWl4Y2JpQWdJQ0FnSUNBZ2JHOW5hVzVWY213NklGd2lhV1p5WVcxbEwyeHZaMmx1WENJc1hHNGdJQ0FnSUNBZ0lISmxaMmx6ZEdWeVZYSnNPaUJjSW1sbWNtRnRaUzl5WldkcGMzUmxjbHdpTEZ4dUlDQWdJQ0FnSUNCMFpYSnRhVzVoYkZKbFoybHpkR1Z5VlhKc09pQmNJbWxtY21GdFpTOTBaWEp0YVc1aGJDMXlaV2RwYzNSbGNsd2lMRnh1SUNBZ0lDQWdJQ0JpZDFKbFoybHpkR1Z5VlhKc09pQmNJbWxtY21GdFpTOXRZV2RoZW1sdVpWd2lMRnh1SUNBZ0lDQWdJQ0J6WlhSMGFXNW5jMVZ5YkRvZ1hDSmhZMk52ZFc1MFhDSXNYRzRnSUNBZ0lDQWdJSFZ6WlhKSmJtWnZWWEpzT2lCY0luVnpaWEl0YVc1bWIxd2lMRnh1SUNBZ0lDQWdJQ0JpYzNOdlZYSnNPaUJjSW1Gd2FTOXNiMmRwYmk5aWJHOXZiV0psY21jdFlYVjBhQzF5WldScGNtVmpkRndpWEc0Z0lDQWdmVnh1ZlR0Y2JseHVaWGh3YjNKMGN5NWtaV1poZFd4MElEMGdlMXh1SUNBZ0lGVlNURk5mVFVGUU9pQlZVa3hUWDAxQlVGeHVmVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWlhod2IzSjBjMXRjSW1SbFptRjFiSFJjSWwwN0lpd2lYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNWNiazlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCY0lsOWZaWE5OYjJSMWJHVmNJaXdnZTF4dUlDQWdJSFpoYkhWbE9pQjBjblZsWEc1OUtUdGNibHh1ZG1GeUlGOTBlWEJsYjJZZ1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2RIbHdaVzltSUZONWJXSnZiQzVwZEdWeVlYUnZjaUE5UFQwZ1hDSnplVzFpYjJ4Y0lpQS9JR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlIUjVjR1Z2WmlCdlltbzdJSDBnT2lCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlHOWlhaTVqYjI1emRISjFZM1J2Y2lBOVBUMGdVM2x0WW05c0lDWW1JRzlpYWlBaFBUMGdVM2x0WW05c0xuQnliM1J2ZEhsd1pTQS9JRndpYzNsdFltOXNYQ0lnT2lCMGVYQmxiMllnYjJKcU95QjlPMXh1WEc1MllYSWdYMk55WldGMFpVTnNZWE56SUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJtZFc1amRHbHZiaUJrWldacGJtVlFjbTl3WlhKMGFXVnpLSFJoY21kbGRDd2djSEp2Y0hNcElIc2dabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J3Y205d2N5NXNaVzVuZEdnN0lHa3JLeWtnZXlCMllYSWdaR1Z6WTNKcGNIUnZjaUE5SUhCeWIzQnpXMmxkT3lCa1pYTmpjbWx3ZEc5eUxtVnVkVzFsY21GaWJHVWdQU0JrWlhOamNtbHdkRzl5TG1WdWRXMWxjbUZpYkdVZ2ZId2dabUZzYzJVN0lHUmxjMk55YVhCMGIzSXVZMjl1Wm1sbmRYSmhZbXhsSUQwZ2RISjFaVHNnYVdZZ0tGd2lkbUZzZFdWY0lpQnBiaUJrWlhOamNtbHdkRzl5S1NCa1pYTmpjbWx3ZEc5eUxuZHlhWFJoWW14bElEMGdkSEoxWlRzZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLSFJoY21kbGRDd2daR1Z6WTNKcGNIUnZjaTVyWlhrc0lHUmxjMk55YVhCMGIzSXBPeUI5SUgwZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNoRGIyNXpkSEoxWTNSdmNpd2djSEp2ZEc5UWNtOXdjeXdnYzNSaGRHbGpVSEp2Y0hNcElIc2dhV1lnS0hCeWIzUnZVSEp2Y0hNcElHUmxabWx1WlZCeWIzQmxjblJwWlhNb1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxMQ0J3Y205MGIxQnliM0J6S1RzZ2FXWWdLSE4wWVhScFkxQnliM0J6S1NCa1pXWnBibVZRY205d1pYSjBhV1Z6S0VOdmJuTjBjblZqZEc5eUxDQnpkR0YwYVdOUWNtOXdjeWs3SUhKbGRIVnliaUJEYjI1emRISjFZM1J2Y2pzZ2ZUc2dmU2dwTzF4dVhHNW1kVzVqZEdsdmJpQmZZMnhoYzNORFlXeHNRMmhsWTJzb2FXNXpkR0Z1WTJVc0lFTnZibk4wY25WamRHOXlLU0I3SUdsbUlDZ2hLR2x1YzNSaGJtTmxJR2x1YzNSaGJtTmxiMllnUTI5dWMzUnlkV04wYjNJcEtTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKRFlXNXViM1FnWTJGc2JDQmhJR05zWVhOeklHRnpJR0VnWm5WdVkzUnBiMjVjSWlrN0lIMGdmVnh1WEc1MllYSWdVa1ZIUlZoUVgxTlVVa2xRWDFOTVFWTklSVk1nUFNBdktGdGVPbDFjWEM4cFhGd3ZLeTluTzF4dVhHNTJZWElnVlhKc1FuVnBiR1JsY2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJBWTI5dWMzUnlkV04wYjNKY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWTI5dVptbG5JRTFoY0NCdlppQjFjbXh6WEc0Z0lDQWdJQ292WEc0Z0lDQWdablZ1WTNScGIyNGdWWEpzUW5WcGJHUmxjaWhqYjI1bWFXY3BJSHRjYmlBZ0lDQWdJQ0FnWDJOc1lYTnpRMkZzYkVOb1pXTnJLSFJvYVhNc0lGVnliRUoxYVd4a1pYSXBPMXh1WEc0Z0lDQWdJQ0FnSUhaaGNpQmlZWE5sVlhKc0lEMGdZMjl1Wm1sbkxtSmhjMlZWY213N1hHNWNiaUFnSUNBZ0lDQWdkR2hwY3k1ZlltRnpaVlZ5YkNBOUlHSmhjMlZWY213N1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDJOdmJtWnBaeUE5SUdOdmJtWnBaenRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdjR0YwYUZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J4ZFdWeWVWQmhjbUZ0YzF4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UW05dmJHVmhibjBnYVhOSlQxTmNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdYMk55WldGMFpVTnNZWE56S0ZWeWJFSjFhV3hrWlhJc0lGdDdYRzRnSUNBZ0lDQWdJR3RsZVRvZ1hDSmZZMjl1YzNSeWRXTjBVR0YwYUZ3aUxGeHVJQ0FnSUNBZ0lDQjJZV3gxWlRvZ1puVnVZM1JwYjI0Z1gyTnZibk4wY25WamRGQmhkR2dvY0dGMGFDd2djWFZsY25sUVlYSmhiWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCcGMwbFBVeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeUlDWW1JR0Z5WjNWdFpXNTBjMXN5WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pKZElEb2dabUZzYzJVN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnViM0p0WVd4cGVtVmtVR0YwYUNBOUlHbHpTVTlUSUQ4Z2NHRjBhQzV5WlhCc1lXTmxLRndpYVdaeVlXMWxYQ0lzSUZ3aVhDSXBJRG9nY0dGMGFEdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjFjbXdnUFNBb1hDSmNJaUFySUhSb2FYTXVYMkpoYzJWVmNtd2dLeUJ1YjNKdFlXeHBlbVZrVUdGMGFDa3VjbVZ3YkdGalpTaFNSVWRGV0ZCZlUxUlNTVkJmVTB4QlUwaEZVeXdnWENJa01Wd2lLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCVmNteENkV2xzWkdWeUxtRndjR1Z1WkZGMVpYSjVVR0Z5WVcxektIVnliQ3dnY1hWbGNubFFZWEpoYlhNcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0JyWlhrNklGd2laMlYwVEc5bmFXNVZjbXhjSWl4Y2JpQWdJQ0FnSUNBZ2RtRnNkV1U2SUdaMWJtTjBhVzl1SUdkbGRFeHZaMmx1VlhKc0tIRjFaWEo1VUdGeVlXMXpMQ0JwYzBsUFV5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR3h2WjJsdVZYSnNJRDBnZEdocGN5NWZZMjl1Wm1sbkxteHZaMmx1VlhKc08xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWZZMjl1YzNSeWRXTjBVR0YwYUNoc2IyZHBibFZ5YkN3Z2NYVmxjbmxRWVhKaGJYTXNJR2x6U1U5VEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbWRsZEZKbFoybHpkR1Z5VlhKc1hDSXNYRzRnSUNBZ0lDQWdJSFpoYkhWbE9pQm1kVzVqZEdsdmJpQm5aWFJTWldkcGMzUmxjbFZ5YkNoeGRXVnllVkJoY21GdGN5d2dhWE5KVDFNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnlaV2RwYzNSbGNsVnliQ0E5SUhSb2FYTXVYMk52Ym1acFp5NXlaV2RwYzNSbGNsVnliRHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WDJOdmJuTjBjblZqZEZCaGRHZ29jbVZuYVhOMFpYSlZjbXdzSUhGMVpYSjVVR0Z5WVcxekxDQnBjMGxQVXlrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxDQjdYRzRnSUNBZ0lDQWdJR3RsZVRvZ1hDSm5aWFJVWlhKdGFXNWhiRkpsWjJsemRHVnlWWEpzWENJc1hHNGdJQ0FnSUNBZ0lIWmhiSFZsT2lCbWRXNWpkR2x2YmlCblpYUlVaWEp0YVc1aGJGSmxaMmx6ZEdWeVZYSnNLSEYxWlhKNVVHRnlZVzF6TENCcGMwbFBVeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSbGNtMXBibUZzVW1WbmFYTjBaWEpWY213Z1BTQjBhR2x6TGw5amIyNW1hV2N1ZEdWeWJXbHVZV3hTWldkcGMzUmxjbFZ5YkR0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVgyTnZibk4wY25WamRGQmhkR2dvZEdWeWJXbHVZV3hTWldkcGMzUmxjbFZ5YkN3Z2NYVmxjbmxRWVhKaGJYTXNJR2x6U1U5VEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnYTJWNU9pQmNJbWRsZEVKM1VtVm5hWE4wWlhKVmNteGNJaXhjYmlBZ0lDQWdJQ0FnZG1Gc2RXVTZJR1oxYm1OMGFXOXVJR2RsZEVKM1VtVm5hWE4wWlhKVmNtd29jWFZsY25sUVlYSmhiWE1zSUdselNVOVRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWW5kU1pXZHBjM1JsY2xWeWJDQTlJSFJvYVhNdVgyTnZibVpwWnk1aWQxSmxaMmx6ZEdWeVZYSnNPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmWTI5dWMzUnlkV04wVUdGMGFDaGlkMUpsWjJsemRHVnlWWEpzTENCeGRXVnllVkJoY21GdGN5d2dhWE5KVDFNcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0JyWlhrNklGd2laMlYwVTJWMGRHbHVaM05WY214Y0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlHZGxkRk5sZEhScGJtZHpWWEpzS0hGMVpYSjVVR0Z5WVcxektTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMlYwZEdsdVozTlZjbXdnUFNCMGFHbHpMbDlqYjI1bWFXY3VjMlYwZEdsdVozTlZjbXc3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TGw5amIyNXpkSEoxWTNSUVlYUm9LSE5sZEhScGJtZHpWWEpzTENCeGRXVnllVkJoY21GdGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlMQ0I3WEc0Z0lDQWdJQ0FnSUd0bGVUb2dYQ0puWlhSVmMyVnlTVzVtYjFWeWJGd2lMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dablZ1WTNScGIyNGdaMlYwVlhObGNrbHVabTlWY213b2NYVmxjbmxRWVhKaGJYTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIxYzJWeVNXNW1iMVZ5YkNBOUlIUm9hWE11WDJOdmJtWnBaeTUxYzJWeVNXNW1iMVZ5YkR0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVgyTnZibk4wY25WamRGQmhkR2dvZFhObGNrbHVabTlWY213c0lIRjFaWEo1VUdGeVlXMXpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDBzSUh0Y2JpQWdJQ0FnSUNBZ2EyVjVPaUJjSW1kbGRFSnpjMjlWY214Y0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlHZGxkRUp6YzI5VmNtd29jWFZsY25sUVlYSmhiWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCaWMzTnZWWEpzSUQwZ2RHaHBjeTVmWTI5dVptbG5MbUp6YzI5VmNtdzdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDlqYjI1emRISjFZM1JRWVhSb0tHSnpjMjlWY213c0lIRjFaWEo1VUdGeVlXMXpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnZFhKc1hHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnhkV1Z5ZVZCaGNtRnRjMXh1SUNBZ0lDQWdJQ0FnS2lCQWNtVjBkWEp1Y3lCN1UzUnlhVzVuZlZ4dUlDQWdJQ0FnSUNBZ0tpOWNibHh1SUNBZ0lIMWRMQ0JiZTF4dUlDQWdJQ0FnSUNCclpYazZJRndpWVhCd1pXNWtVWFZsY25sUVlYSmhiWE5jSWl4Y2JpQWdJQ0FnSUNBZ2RtRnNkV1U2SUdaMWJtTjBhVzl1SUdGd2NHVnVaRkYxWlhKNVVHRnlZVzF6S0hWeWJDd2djWFZsY25sUVlYSmhiWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaGNYVmxjbmxRWVhKaGJYTWdmSHdnS0hSNWNHVnZaaUJ4ZFdWeWVWQmhjbUZ0Y3lBOVBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lGd2lkVzVrWldacGJtVmtYQ0lnT2lCZmRIbHdaVzltS0hGMVpYSjVVR0Z5WVcxektTa2dJVDA5SUZ3aWIySnFaV04wWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RYSnNPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjR0Z5WVcxeklEMGdUMkpxWldOMExtdGxlWE1vY1hWbGNubFFZWEpoYlhNcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jR0Z5WVcxekxteGxibWQwYUNBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIxY213N1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCamIyNXpkSEoxWTNSbFpGVnliQ0E5SUhWeWJDQXJJRndpUDF3aUlDc2dWWEpzUW5WcGJHUmxjaTVqYjI1emRISjFZM1JMWlhsV1lXeDFaVkJoYVhJb2NHRnlZVzF6V3pCZExDQnhkV1Z5ZVZCaGNtRnRjMXR3WVhKaGJYTmJNRjFkS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlERTdJR2tnUENCd1lYSmhiWE11YkdWdVozUm9PeUFySzJrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZEhKMVkzUmxaRlZ5YkNBclBTQmNJaVpjSWlBcklGVnliRUoxYVd4a1pYSXVZMjl1YzNSeWRXTjBTMlY1Vm1Gc2RXVlFZV2x5S0hCaGNtRnRjMXRwWFN3Z2NYVmxjbmxRWVhKaGJYTmJjR0Z5WVcxelcybGRYU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWTI5dWMzUnlkV04wWldSVmNtdzdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJR3RsZVZ4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2RtRnNkV1ZjYmlBZ0lDQWdJQ0FnSUNvZ1FISmxkSFZ5Ym5NZ2UxTjBjbWx1WjMxY2JpQWdJQ0FnSUNBZ0lDb3ZYRzVjYmlBZ0lDQjlMQ0I3WEc0Z0lDQWdJQ0FnSUd0bGVUb2dYQ0pqYjI1emRISjFZM1JMWlhsV1lXeDFaVkJoYVhKY0lpeGNiaUFnSUNBZ0lDQWdkbUZzZFdVNklHWjFibU4wYVc5dUlHTnZibk4wY25WamRFdGxlVlpoYkhWbFVHRnBjaWhyWlhrc0lIWmhiSFZsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhMlY1SUNzZ1hDSTlYQ0lnS3lCbGJtTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb2RtRnNkV1VwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlYwcE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUZWeWJFSjFhV3hrWlhJN1hHNTlLQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlGVnliRUoxYVd4a1pYSTdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1Y0Y0c5eWRITmJYQ0prWldaaGRXeDBYQ0pkT3lJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ0lDQjJZV3gxWlRvZ2RISjFaVnh1ZlNrN1hHNG9ablZ1WTNScGIyNGdjRzlzZVdacGJHeERkWE4wYjIxRmRtVnVkQ2gzTENCa0tTQjdYRzRnSUNBZ2RtRnlJSFJsYzNSRmRtVnVkQ0E5SUhadmFXUWdNRHNnTHk5bGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMWFZ1ZFhObFpDMTJZWEp6WEc1Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQjBaWE4wUlhabGJuUWdQU0J1WlhjZ2R5NURkWE4wYjIxRmRtVnVkQ2hjSW5SbGMzUmNJaWs3SUM4dlpYTnNhVzUwTFdScGMyRmliR1V0YkdsdVpTQnVieTExYm5WelpXUXRkbUZ5YzF4dUlDQWdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRU4xYzNSdmJVVjJaVzUwSUQwZ1puVnVZM1JwYjI0Z1EzVnpkRzl0UlhabGJuUW9aWFpsYm5Rc0lIQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY0dGeVlXMXpJRDBnY0dGeVlXMXpJSHg4SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaWRXSmliR1Z6T2lCbVlXeHpaU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqWVc1alpXeGhZbXhsT2lCbVlXeHpaU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWlhSaGFXdzZJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQmxkblFnUFNCa0xtTnlaV0YwWlVWMlpXNTBLRndpUTNWemRHOXRSWFpsYm5SY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCbGRuUXVhVzVwZEVOMWMzUnZiVVYyWlc1MEtHVjJaVzUwTENCd1lYSmhiWE11WW5WaVlteGxjeXdnY0dGeVlXMXpMbU5oYm1ObGJHRmliR1VzSUhCaGNtRnRjeTVrWlhSaGFXd3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdWMmREdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnUTNWemRHOXRSWFpsYm5RdWNISnZkRzkwZVhCbElEMGdkeTVGZG1WdWRDNXdjbTkwYjNSNWNHVTdYRzRnSUNBZ0lDQWdJSGN1UTNWemRHOXRSWFpsYm5RZ1BTQkRkWE4wYjIxRmRtVnVkRHRjYmlBZ0lDQjlYRzU5S1NoM2FXNWtiM2NzSUdSdlkzVnRaVzUwS1R0Y2JseHVablZ1WTNScGIyNGdaR2x6Y0dGMFkyaEZkbVZ1ZENncElIdGNiaUFnSUNCMllYSWdjMjkxY21ObFJXeGxiV1Z1ZENBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXdJQ1ltSUdGeVozVnRaVzUwYzFzd1hTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6QmRJRG9nZDJsdVpHOTNPMXh1SUNBZ0lIWmhjaUJsZG1WdWRGUjVjR1VnUFNCaGNtZDFiV1Z1ZEhOYk1WMDdYRzRnSUNBZ2RtRnlJR1JsZEdGcGJDQTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF5SUNZbUlHRnlaM1Z0Wlc1MGMxc3lYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXekpkSURvZ2UzMDdYRzVjYmlBZ0lDQjJZWElnWlhabGJuUWdQU0J1WlhjZ2QybHVaRzkzTGtOMWMzUnZiVVYyWlc1MEtHVjJaVzUwVkhsd1pTd2dlMXh1SUNBZ0lDQWdJQ0JrWlhSaGFXdzZJR1JsZEdGcGJGeHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ2MyOTFjbU5sUld4bGJXVnVkQzVrYVhOd1lYUmphRVYyWlc1MEtHVjJaVzUwS1R0Y2JuMWNibHh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnWkdsemNHRjBZMmhGZG1WdWREdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdaWGh3YjNKMGMxdGNJbVJsWm1GMWJIUmNJbDA3SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNBZ0lIWmhiSFZsT2lCMGNuVmxYRzU5S1R0Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlHZGxkRU52YjJ0cFpWWmhiSFZsTzF4dVpuVnVZM1JwYjI0Z1oyVjBRMjl2YTJsbFZtRnNkV1VvWTI5dmEybGxUbUZ0WlNrZ2UxeHVJQ0FnSUhaaGNpQnRZWFJqYUdWeklEMGdaRzlqZFcxbGJuUXVZMjl2YTJsbExtMWhkR05vS0Z3aUtGNThPeWtnUDF3aUlDc2dZMjl2YTJsbFRtRnRaU0FySUZ3aVBTaGJYanNrWFNvcFhDSXBPMXh1SUNBZ0lISmxkSFZ5YmlCdFlYUmphR1Z6SUQ4Z2JXRjBZMmhsYzFzeVhTQTZJRzUxYkd3N1hHNTlYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1Y0Y0c5eWRITmJYQ0prWldaaGRXeDBYQ0pkT3lJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb1hDSXVMMlJwYzNRdlVtVm5WVWxEYkdsbGJuUmNJaWs3WEc0aUxDSXZLaXBjYmlBcUlFMXZaSFZzWlNCbGVIQnZjblJ6TGx4dUlDb3ZYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnYW5OdmJuQTdYRzVjYmk4cUtseHVJQ29nUTJGc2JHSmhZMnNnYVc1a1pYZ3VYRzRnS2k5Y2JseHVkbUZ5SUdOdmRXNTBJRDBnTUR0Y2JseHVMeW9xWEc0Z0tpQk9iMjl3SUdaMWJtTjBhVzl1TGx4dUlDb3ZYRzVjYm1aMWJtTjBhVzl1SUc1dmIzQW9LWHQ5WEc1Y2JpOHFLbHh1SUNvZ1NsTlBUbEFnYUdGdVpHeGxjbHh1SUNwY2JpQXFJRTl3ZEdsdmJuTTZYRzRnS2lBZ0xTQndZWEpoYlNCN1UzUnlhVzVuZlNCeGN5QndZWEpoYldWMFpYSWdLR0JqWVd4c1ltRmphMkFwWEc0Z0tpQWdMU0J3Y21WbWFYZ2dlMU4wY21sdVozMGdjWE1nY0dGeVlXMWxkR1Z5SUNoZ1gxOXFjR0FwWEc0Z0tpQWdMU0J1WVcxbElIdFRkSEpwYm1kOUlIRnpJSEJoY21GdFpYUmxjaUFvWUhCeVpXWnBlR0FnS3lCcGJtTnlLVnh1SUNvZ0lDMGdkR2x0Wlc5MWRDQjdUblZ0WW1WeWZTQm9iM2NnYkc5dVp5QmhablJsY2lCaElIUnBiV1Z2ZFhRZ1pYSnliM0lnYVhNZ1pXMXBkSFJsWkNBb1lEWXdNREF3WUNsY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnZFhKc1hHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIeEdkVzVqZEdsdmJuMGdiM0IwYVc5dVlXd2diM0IwYVc5dWN5QXZJR05oYkd4aVlXTnJYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCdmNIUnBiMjVoYkNCallXeHNZbUZqYTF4dUlDb3ZYRzVjYm1aMWJtTjBhVzl1SUdwemIyNXdLSFZ5YkN3Z2IzQjBjeXdnWm00cGUxeHVJQ0FnSUdsbUlDZ25ablZ1WTNScGIyNG5JRDA5SUhSNWNHVnZaaUJ2Y0hSektTQjdYRzRnSUNBZ0lDQWdJR1p1SUQwZ2IzQjBjenRjYmlBZ0lDQWdJQ0FnYjNCMGN5QTlJSHQ5TzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvSVc5d2RITXBJRzl3ZEhNZ1BTQjdmVHRjYmx4dUlDQWdJSFpoY2lCd2NtVm1hWGdnUFNCdmNIUnpMbkJ5WldacGVDQjhmQ0FuWDE5cWNDYzdYRzVjYmlBZ0lDQXZMeUIxYzJVZ2RHaGxJR05oYkd4aVlXTnJJRzVoYldVZ2RHaGhkQ0IzWVhNZ2NHRnpjMlZrSUdsbUlHOXVaU0IzWVhNZ2NISnZkbWxrWldRdVhHNGdJQ0FnTHk4Z2IzUm9aWEozYVhObElHZGxibVZ5WVhSbElHRWdkVzVwY1hWbElHNWhiV1VnWW5rZ2FXNWpjbVZ0Wlc1MGFXNW5JRzkxY2lCamIzVnVkR1Z5TGx4dUlDQWdJSFpoY2lCcFpDQTlJRzl3ZEhNdWJtRnRaU0I4ZkNBb2NISmxabWw0SUNzZ0tHTnZkVzUwS3lzcEtUdGNibHh1SUNBZ0lIWmhjaUJ3WVhKaGJTQTlJRzl3ZEhNdWNHRnlZVzBnZkh3Z0oyTmhiR3hpWVdOckp6dGNiaUFnSUNCMllYSWdkR2x0Wlc5MWRDQTlJRzUxYkd3Z0lUMGdiM0IwY3k1MGFXMWxiM1YwSUQ4Z2IzQjBjeTUwYVcxbGIzVjBJRG9nTmpBd01EQTdYRzRnSUNBZ2RtRnlJR1Z1WXlBOUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWREdGNiaUFnSUNCMllYSWdkR0Z5WjJWMElEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkSE5DZVZSaFowNWhiV1VvSjNOamNtbHdkQ2NwV3pCZElIeDhJR1J2WTNWdFpXNTBMbWhsWVdRN1hHNGdJQ0FnZG1GeUlITmpjbWx3ZER0Y2JpQWdJQ0IyWVhJZ2RHbHRaWEk3WEc1Y2JseHVJQ0FnSUdsbUlDaDBhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJSFJwYldWeUlEMGdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaWdwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMnhsWVc1MWNDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1p1S1NCbWJpaHVaWGNnUlhKeWIzSW9KMVJwYldWdmRYUW5LU2s3WEc0Z0lDQWdJQ0FnSUgwc0lIUnBiV1Z2ZFhRcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdOc1pXRnVkWEFvS1h0Y2JpQWdJQ0FnSUNBZ2FXWWdLSE5qY21sd2RDNXdZWEpsYm5ST2IyUmxLU0J6WTNKcGNIUXVjR0Z5Wlc1MFRtOWtaUzV5WlcxdmRtVkRhR2xzWkNoelkzSnBjSFFwTzF4dUlDQWdJQ0FnSUNCM2FXNWtiM2RiYVdSZElEMGdibTl2Y0R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJwYldWeUtTQmpiR1ZoY2xScGJXVnZkWFFvZEdsdFpYSXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHWjFibU4wYVc5dUlHTmhibU5sYkNncGUxeHVJQ0FnSUNBZ0lDQnBaaUFvZDJsdVpHOTNXMmxrWFNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJ4bFlXNTFjQ2dwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnZDJsdVpHOTNXMmxrWFNBOUlHWjFibU4wYVc5dUtHUmhkR0VwZTF4dUlDQWdJQ0FnSUNCamJHVmhiblZ3S0NrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2htYmlrZ1ptNG9iblZzYkN3Z1pHRjBZU2s3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzh2SUdGa1pDQnhjeUJqYjIxd2IyNWxiblJjYmlBZ0lDQjFjbXdnS3owZ0tINTFjbXd1YVc1a1pYaFBaaWduUHljcElEOGdKeVluSURvZ0p6OG5LU0FySUhCaGNtRnRJQ3NnSnowbklDc2daVzVqS0dsa0tUdGNiaUFnSUNCMWNtd2dQU0IxY213dWNtVndiR0ZqWlNnblB5WW5MQ0FuUHljcE8xeHVYRzRnSUNBZ0x5OGdZM0psWVhSbElITmpjbWx3ZEZ4dUlDQWdJSE5qY21sd2RDQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0ozTmpjbWx3ZENjcE8xeHVJQ0FnSUhOamNtbHdkQzV6Y21NZ1BTQjFjbXc3WEc0Z0lDQWdkR0Z5WjJWMExuQmhjbVZ1ZEU1dlpHVXVhVzV6WlhKMFFtVm1iM0psS0hOamNtbHdkQ3dnZEdGeVoyVjBLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQmpZVzVqWld3N1hHNTlYRzRpTENJdktpRWdSWFpsYm5SekxtcHpJQ292WEc1Y2JtbHRjRzl5ZENCbWFYSmxJR1p5YjIwZ1hDSXVMaTkxZEdsc0wyWnBjbVZjSWp0Y2JseHVZMjl1YzNRZ1VrVkJSRmxmUlZaRlRsUmZUa0ZOUlNBOUlGd2lZbUp1WVhZNmNtVmhaSGxjSWp0Y2JseHVMeW9xWEc0Z0tpQkVhWE53WVhSamFHVnpJSFJvWlNCY0ltSmlibUYyT25KbFlXUjVYQ0lnWlhabGJuUWdiMjRnZEdobElIZHBibVJ2ZDF4dUlDb2djMjhnZEdoaGRDQmpiMjV6ZFcxbGNuTWdZMkZ1SUd4cGMzUmxiaUJtYjNJZ2QyaGxiaUIwYUdVZ2JtRjJhV2RoZEdsdmJpZHpYRzRnS2lCQlVFa2dhWE1nWVhaaGFXeGhZbXhsWEc0Z0tpOWNibVoxYm1OMGFXOXVJR1Z0YVhSU1pXRmtlVVYyWlc1MEtDa2dlMXh1SUNBZ0lIZHBibVJ2ZDF0U1JVRkVXVjlGVmtWT1ZGOU9RVTFGWFNBOUlIUnlkV1U3WEc0Z0lDQWdabWx5WlNoa2IyTjFiV1Z1ZEN3Z1VrVkJSRmxmUlZaRlRsUmZUa0ZOUlNrN1hHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJSHNnWlcxcGRGSmxZV1I1UlhabGJuUWdmVHRjYmlJc0lpOHFJU0JDUWtOdmJuUmxiblJNYjJkdkxtcHpJQ292WEc1Y2JtTnZibk4wSUZSSVJVMUZYMVJQWDFWU1RDQTlJSHRjYmlBZ0lDQnRZWEpyWlhSek9pQmNJbWgwZEhBNkx5OTNkM2N1WW14dmIyMWlaWEpuTG1OdmJTOXRZWEpyWlhSelhDSXNYRzRnSUNBZ2RHVmphRzV2Ykc5bmVUb2dYQ0pvZEhSd09pOHZkM2QzTG1Kc2IyOXRZbVZ5Wnk1amIyMHZkR1ZqYUc1dmJHOW5lVndpTEZ4dUlDQWdJSEJ2YkdsMGFXTnpPaUJjSW1oMGRIQTZMeTkzZDNjdVlteHZiMjFpWlhKbkxtTnZiUzl3YjJ4cGRHbGpjMXdpTEZ4dUlDQWdJSEIxY25OMWFYUnpPaUJjSW1oMGRIQTZMeTkzZDNjdVlteHZiMjFpWlhKbkxtTnZiUzl3ZFhKemRXbDBjMXdpTEZ4dUlDQWdJSFpwWlhjNklGd2lhSFIwY0hNNkx5OTNkM2N1WW14dmIyMWlaWEpuTG1OdmJTOTJhV1YzWENJc1hHNGdJQ0FnWjJGa1pteDVPaUJjSW1oMGRIQnpPaTh2ZDNkM0xtSnNiMjl0WW1WeVp5NWpiMjB2WjJGa1pteDVYQ0lzWEc0Z0lDQWdZblZ6YVc1bGMzTjNaV1ZyT2lCY0ltaDBkSEE2THk5M2QzY3VZbXh2YjIxaVpYSm5MbU52YlM5aWRYTnBibVZ6YzNkbFpXdGNJbHh1ZlR0Y2JseHViR1YwSUdOdmJuUmxiblJNYjJkdlJXdzdYRzVzWlhRZ1pHVm1ZWFZzZEZSb1pXMWxPMXh1WEc0dktpb2dRR05zWVhOeklFSkNRMjl1ZEdWdWRFeHZaMjhnS2k5Y2JtTnZibk4wSUVKQ1EyOXVkR1Z1ZEV4dloyOGdQU0I3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQWJXVjBhRzlrWEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRJVkUxTVJXeGxiV1Z1ZEgwZ1pXd2dMU0JTYjI5MElHVnNaVzFsYm5RZ1ptOXlJRUpDUTI5dWRHVnVkRXh2WjI5Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JwYm1sMGFXRnNhWHBsS0dWc0tTQjdYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUk1iMmR2Uld3Z1BTQmxiRHRjYmlBZ0lDQWdJQ0FnWkdWbVlYVnNkRlJvWlcxbElEMGdZMjl1ZEdWdWRFeHZaMjlGYkM1blpYUkJkSFJ5YVdKMWRHVW9YQ0pvY21WbVhDSXBPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJBYldWMGFHOWtYRzRnSUNBZ0lDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlIUm9aVzFsSUMwZ1RtVjNJSFJvWlcxbElHWnZjaUIwYUdVZ1kyOXVkR1Z1ZENCc2IyZHZYRzRnSUNBZ0lDb3ZYRzRnSUNBZ2MyVjBWR2hsYldVb2RHaGxiV1VwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZEV4dloyOUZiQzV6WlhSQmRIUnlhV0oxZEdVb1hDSm9jbVZtWENJc0lGUklSVTFGWDFSUFgxVlNURnQwYUdWdFpWMGdmSHdnWkdWbVlYVnNkRlJvWlcxbEtUdGNiaUFnSUNCOVhHNWNibjA3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUVKQ1EyOXVkR1Z1ZEV4dloyODdYRzRpTENJdktpRWdUbUYyTG1weklDb3ZYRzVjYm1sdGNHOXlkQ0JjSWk0dUx5NHVMM0J2YkhsbWFXeHNjeTl2WW1wbFkzUXZZWE56YVdkdVhDSTdYRzVwYlhCdmNuUWdYQ0l1TGk4dUxpOXdiMng1Wm1sc2JITXZRM1Z6ZEc5dFJYWmxiblJjSWp0Y2JseHVhVzF3YjNKMElHeHZZMkZzWlNCbWNtOXRJRndpTGk0dkxpNHZkWFJwYkM5c2IyTmhiR1ZjSWp0Y2JtbHRjRzl5ZENCdmJrTnNhV05ySUdaeWIyMGdYQ0l1TGk4dUxpOTFkR2xzTDI5dVEyeHBZMnRjSWp0Y2JtbHRjRzl5ZENCdFlYUmphR1Z6SUdaeWIyMGdYQ0l1TGk4dUxpOTFkR2xzTDIxaGRHTm9aWE5jSWp0Y2JtbHRjRzl5ZENCdWIyOXdJR1p5YjIwZ1hDSXVMaTh1TGk5MWRHbHNMMjV2YjNCY0lqdGNibWx0Y0c5eWRDQkRjM01nWm5KdmJTQmNJaTR1THk0dUwzVjBhV3d2UTNOelhDSTdYRzVjYm1sdGNHOXlkQ0JPWVhaVGRHRjBaU0JtY205dElGd2lMaTR2TGk0dmMzUmhkR1V2VG1GMlUzUmhkR1ZjSWp0Y2JtbHRjRzl5ZENCQ1FrTnZiblJsYm5STWIyZHZJR1p5YjIwZ1hDSXVMaTh1TGk5dGIyUjFiR1Z6TDJ4dloyOHZRa0pEYjI1MFpXNTBURzluYjF3aU8xeHVhVzF3YjNKMElGTjFZbTFsYm5VZ1puSnZiU0JjSWk0dUx5NHVMMjF2WkhWc1pYTXZibUYyYVdkaGRHbHZiaTlUZFdKdFpXNTFYQ0k3WEc1cGJYQnZjblFnVTI5amFXRnNJR1p5YjIwZ1hDSXVMaTh1TGk5dGIyUjFiR1Z6TDNOdlkybGhiQzlUYjJOcFlXeGNJanRjYm1sdGNHOXlkQ0J3WlhKemFYTjBSbTl5UTNWeWNtVnVkRk4wWVhSbElHWnliMjBnWENJdUxpOHVMaTl3WlhKemFYTjBMMUJsY25OcGMzUmNJanRjYmx4dVkyOXVjM1FnUkZKUFVFUlBWMDVmUVZSVVVpQTlJRndpWkdGMFlTMWtjbTl3Wkc5M2Jsd2lPMXh1WEc0dkx5QlVUMFJQT2lCYlNsQmRJSEpsYlc5MlpTQjBhR2x6SUc5dVkyVWdZblZ6YVc1bGMzTWdZWEJ3SUdseklHRmliR1VnZEc4Z2NHRnpjeUIwYUdWdFpTQjBieUJpWWk1dVlYWmNibU52Ym5OMElGTlZRbE5EVWtsUVZFbFBUbDlWVWt4VFgwWlBVbDlVU0VWTlJTQTlJSHRjYmlBZ0lDQmNJbUoxYzJsdVpYTnpkMlZsYTF3aU9pQmNJbWgwZEhBNkx5OWlkWE5wYm1WemMzZGxaV3R0WVdjdVkyOXRMMjVoZG1KaGNuUmxlSFJzYVc1clhDSXNYRzRnSUNBZ1hDSnRZWEpyWlhSelhDSTZJRndpYUhSMGNEb3ZMMkoxYzJsdVpYTnpkMlZsYTIxaFp5NWpiMjB2Ym1GMlltRnliV0Z5YTJWMGMzUmxlSFJzYVc1clhDSXNYRzRnSUNBZ1hDSjBaV05vYm05c2IyZDVYQ0k2SUZ3aWFIUjBjRG92TDJKMWMybHVaWE56ZDJWbGEyMWhaeTVqYjIwdmJtRjJZbUZ5ZEdWamFIUmxlSFJzYVc1clhDSXNYRzRnSUNBZ1hDSndkWEp6ZFdsMGMxd2lPaUJjSW1oMGRIQTZMeTlpZFhOcGJtVnpjM2RsWld0dFlXY3VZMjl0TDI1aGRtSmhjbkIxY25OMWFYUnpkR1Y0ZEd4cGJtdGNJaXhjYmlBZ0lDQmNJbkJ2YkdsMGFXTnpYQ0k2SUZ3aWFIUjBjRG92TDJKMWMybHVaWE56ZDJWbGEyMWhaeTVqYjIwdmJtRjJZbUZ5Y0c5c2FYUnBZM04wWlhoMGJHbHVhMXdpTEZ4dUlDQWdJRndpZG1sbGQxd2lPaUJjSW1oMGRIQTZMeTlpZFhOcGJtVnpjM2RsWld0dFlXY3VZMjl0TDI1aGRtSmhjbTl3YVc1cGIyNTBaWGgwYkdsdWExd2lMRnh1SUNBZ0lGd2laMkZrWm14NVhDSTZJRndpYUhSMGNEb3ZMMkoxYzJsdVpYTnpkMlZsYTIxaFp5NWpiMjB2Ym1GMlltRnliM0JwYm1sdmJuUmxlSFJzYVc1clhDSmNibjA3WEc1Y2JteGxkQ0J6YjJOcFlXdzdYRzVjYmk4cUtpQkFZMnhoYzNNZ1RtRjJJQ292WEc1amIyNXpkQ0JPWVhZZ1BTQjdYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJCZEhSaFkyZ2daR1ZtWVhWc2RDQm1kVzVqZEdsdmJtRnNhWFI1SUhSdklHNWhkaUJsYkdWdFpXNTBYRzRnSUNBZ0lDb2dRRzFsZEdodlpGeHVJQ0FnSUNBcUlFQndZWEpoYlNCN1NGUk5URVZzWlcxbGJuUjlJR0ppVG1GMlJXd2dMU0JTYjI5MElHNXZaR1VnWm05eUlHSmlUbUYyWEc0Z0lDQWdJQ292WEc0Z0lDQWdaR1ZtWVhWc2RFWjFibU4wYVc5dVlXeHBkSGtvWW1KT1lYWkZiQ2tnZTF4dUlDQWdJQ0FnSUNCamIyNXpkQ0JqYjI1MFpXNTBTR1ZoWkd4cGJtVkZiQ0E5SUdKaVRtRjJSV3d1WjJWMFJXeGxiV1Z1ZEhOQ2VVTnNZWE56VG1GdFpTaGNJbUppTFc1aGRpMW9aV0ZrYkdsdVpWd2lLVnN3WFR0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWTI5dWRHVnVkRXh2WjI5RmJDQTlJR0ppVG1GMlJXd3VaMlYwUld4bGJXVnVkSE5DZVVOc1lYTnpUbUZ0WlNoY0ltSmlMVzVoZGkxamIyNTBaVzUwTFd4dloyOWZYM05wZEdWY0lpbGJNRjA3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR052Ym5SbGJuUlRiMk5wWVd4RmJDQTlJR0ppVG1GMlJXd3VaMlYwUld4bGJXVnVkSE5DZVVOc1lYTnpUbUZ0WlNoY0ltSmlMVzVoZGkxemIyTnBZV3hjSWlsYk1GMDdYRzRnSUNBZ0lDQWdJR052Ym5OMElHTmhkR1ZuYjNKcFpYTkZiQ0E5SUdKaVRtRjJSV3d1WjJWMFJXeGxiV1Z1ZEhOQ2VVTnNZWE56VG1GdFpTaGNJbUppTFc1aGRpMWpZWFJsWjI5eWFXVnpYQ0lwV3pCZE8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCd2NtOW5jbVZ6YzBKaGNrVnNJRDBnWW1KT1lYWkZiQzVuWlhSRmJHVnRaVzUwYzBKNVEyeGhjM05PWVcxbEtGd2lZbUl0Y0hKdlozSmxjM05mWDNOMFlYUjFjMXdpS1Zzd1hUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1kyRjBaV2R2Y25sRmJITWdQU0JpWWs1aGRrVnNMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29YQ0l1WW1JdGJtRjJMV05oZEdWbmIzSnBaWE5mWDJOaGRHVm5iM0o1TG1oaGN5MXpkV0p0Wlc1MVhDSXBPMXh1WEc0Z0lDQWdJQ0FnSUdKaVRtRjJSV3d1YzJWMFFYUjBjbWxpZFhSbEtGd2laR0YwWVMxMWMyVnlMV052ZFc1MGNubGNJaXdnYkc5allXeGxMbWRsZEVOdmRXNTBjbmtvS1NrN1hHNGdJQ0FnSUNBZ0lHSmlUbUYyUld3dWMyVjBRWFIwY21saWRYUmxLRndpWkdGMFlTMTFjMlZ5TFhKbFoybHZibHdpTENCc2IyTmhiR1V1WjJWMFVtVm5hVzl1S0NrcE8xeHVYRzRnSUNBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2ljbVZuTFhWelpYSXRjMmxuYm1Wa0xXbHVYQ0lzSUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdhWE5UYVdkdVNXNVdhWE5wWW14bFNXNUVjbTl3Wkc5M2JpQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2lZbUl0Ym1GMkxXUnliM0JrYjNkdUxYTnBaMjR0YVc1Y0lpa3ViMlptYzJWMFNHVnBaMmgwSUQ0Z01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHBjMU5wWjI1SmJsWnBjMmxpYkdWSmJrUnliM0JrYjNkdUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdUbUYyVTNSaGRHVXVjMlYwUm05amRYTW9YQ0p6YVdkdUlHbHVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ0lDQkNRa052Ym5SbGJuUk1iMmR2TG1sdWFYUnBZV3hwZW1Vb1kyOXVkR1Z1ZEV4dloyOUZiQ2s3WEc1Y2JpQWdJQ0FnSUNBZ1RtRjJVM1JoZEdVdWFXNXBkR2xoYkdsNlpTaGlZazVoZGtWc0xDQjdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHaGxZV1JzYVc1bEtIWmhiSFZsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuUmxiblJJWldGa2JHbHVaVVZzTG1sdWJtVnlTRlJOVENBOUlIWmhiSFZsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDBzWEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEJ5YjJkeVpYTnpLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2NISnZaM0psYzNNZ1BTQk5ZWFJvTG0xcGJpZ3hNREFzSUUxaGRHZ3ViV0Y0S0RBc0lIWmhiSFZsS1NrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndjbTluY21WemMwSmhja1ZzTG5ObGRFRjBkSEpwWW5WMFpTaGNJbk4wZVd4bFhDSXNJRU56Y3k1MGNtRnVjMlp2Y20wb1lIUnlZVzV6YkdGMFpWZ29KSHNnY0hKdlozSmxjM01nZlNVcFlDa3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaGxiV1VvZG1WeWRHbGpZV3dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0IwYUdWdFpTQTlJSFpsY25ScFkyRnNPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUWtKRGIyNTBaVzUwVEc5bmJ5NXpaWFJVYUdWdFpTaDBhR1Z0WlNrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJVVDBSUE9pQmJTbEJkSURBNUx6QTFMekUySUhKbGJXOTJaU0IwYUdseklIUjNaV0ZySUc5dVkyVWdZblZ6YVc1bGMzTWdZWEJ3SUdseklHRmliR1VnZEc4Z2NHRnpjeUIwYUdWdFpTQjBieUJpWWk1dVlYWmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUFnSUNBZ0lDQmJVME5kSURBNUx6RTVMekUySUVsbUlHMWhhMmx1WnlCaElHTm9ZVzVuWlNCb1pYSmxMQ0JoYkhOdklIVndaR0YwWlNBdmMzSmpMM05sY25abGNpOW1hWGgwZFhKbEwyZHNiMkpoYkM1cWMyOXVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0ZOVlFsTkRVa2xRVkVsUFRsOVZVa3hUWDBaUFVsOVVTRVZOUlZ0MGFHVnRaVjBwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2MzVmljMk55YVdKbFRHbHVheUE5SUdKaVRtRjJSV3d1WjJWMFJXeGxiV1Z1ZEhOQ2VVTnNZWE56VG1GdFpTaGNJbUppTFc1aGRpMTBiM1YwYzE5ZmMzVmljMk55YVdKbExXeHBibXRjSWlsYk1GMDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdXMU5EWFNBeE1TOHdPUzh4TmlCRFQwcFFJR1J2WlhNZ2JtOTBJR2hoZG1VZ2RHaGxJSE4xWW5OamNtbGlaVXhwYm1zc0lHRnVaQ0JtWVdsc2FXNW5JSFJvWlNCelpYUkJkSFJ5YVdKMWRHVWdiV1YwYUc5a1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUdKeVpXRnJjeUIwYUdVZ2RHaHBjbVF0YkdWMlpXd2dibUYySUd4dllXUnBibWN1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h6ZFdKelkzSnBZbVZNYVc1cktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpkV0p6WTNKcFltVk1hVzVyTG5ObGRFRjBkSEpwWW5WMFpTaGNJbWh5WldaY0lpd2dVMVZDVTBOU1NWQlVTVTlPWDFWU1RGTmZSazlTWDFSSVJVMUZXM1JvWlcxbFhTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpkV0p6WTNKcFltVk1hVzVyTG1sdWJtVnlTRlJOVENBOUlIUm9aVzFsSUQwOVBTQmNJbUoxYzJsdVpYTnpkMlZsYTF3aUlEOGdYQ0pUZFdKelkzSnBZbVZjSWlBNklGd2lVM1ZpYzJOeWFXSmxJSFJ2SUVKMWMybHVaWE56ZDJWbGExd2lPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lIMHBPMXh1WEc0Z0lDQWdJQ0FnSUU1aGRsTjBZWFJsTG5KMWJraGhibVJzWlhKektHSmlUbUYyUld3cE8xeHVYRzRnSUNBZ0lDQWdJR052Ym5OMElHOWljMlZ5ZG1WeUlEMGdibVYzSUUxMWRHRjBhVzl1VDJKelpYSjJaWElvWm5WdVkzUnBiMjRvYlhWMFlYUnBiMjV6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J0ZFhSaGRHbHZibk11Wm05eVJXRmphQ2htZFc1amRHbHZiaWh0ZFhSaGRHbHZiaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJRzVoYldVZ1BTQnRkWFJoZEdsdmJpNWhkSFJ5YVdKMWRHVk9ZVzFsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJSFpoYkhWbElEMGdZbUpPWVhaRmJDNW5aWFJCZEhSeWFXSjFkR1VvYm1GdFpTazdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JPWVhaVGRHRjBaUzV6WlhRb2JtRnRaUzV5WlhCc1lXTmxLRndpWkdGMFlTMWNJaXdnWENKY0lpa3NJSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnSUNCdlluTmxjblpsY2k1dlluTmxjblpsS0dKaVRtRjJSV3dzSUhzZ1lYUjBjbWxpZFhSbGN6b2dkSEoxWlNCOUtUdGNibHh1SUNBZ0lDQWdJQ0J3WlhKemFYTjBSbTl5UTNWeWNtVnVkRk4wWVhSbEtDazdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z1cxZFhYVnMzTHpJMUx6SXdNVFpkSUc1dmIzQWdZbmtnWkdWbVlYVnNkQ0J6YnlCMGFHRjBJRUZRU1NCa2IyVnpiaWQwSUhSb2NtOTNJR1Z5Y205eVhHNGdJQ0FnSUNBZ0lHSmlUbUYyUld3dVkyOXVabWxuZFhKbFJYaHdaWEpwWlc1alpWTmxiR1ZqZENBOUlHNXZiM0E3WEc1Y2JpQWdJQ0FnSUNBZ1ltSk9ZWFpGYkM1a2FYTndiR0Y1VTI5amFXRnNRblYwZEc5dWN5QTlJR1oxYm1OMGFXOXVLR052Ym1acFp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0Z6YjJOcFlXd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6YjJOcFlXd2dQU0JUYjJOcFlXd3Vabkp2YlNoamIyNTBaVzUwVTI5amFXRnNSV3dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMk5wWVd3dVlXTjBhWFpoZEdVb1kyOXVabWxuS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdJQ0JpWWs1aGRrVnNMbWhwWkdWVGIyTnBZV3hDZFhSMGIyNXpJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lYTnZZMmxoYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjMjlqYVdGc0xtUmxZV04wYVhaaGRHVW9LVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ0lDQnZia05zYVdOcktHSmlUbUYyUld3c0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQjdJSFJoY21kbGRDQjlJRDBnWlhabGJuUTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h0WVhSamFHVnpLSFJoY21kbGRDd2dYQ0l1WW1JdGJtRjJMV052Ym5SbGJuUXRiRzluYjE5ZlpHOTNiaTFoY25KdmR5d2dMbUppTFc1aGRpMXNiMmR2WDE5aGNuSnZkMXdpS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHaGhibVJzWlVOc2FXTnJURzluYjBGeWNtOTNLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHa2dQU0F3TENCc1pXNGdQU0JqWVhSbFoyOXllVVZzY3k1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnWTJGMFpXZHZjbmxGYkNBOUlHTmhkR1ZuYjNKNVJXeHpXMmxkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ1luVnBiR1JUZFdKdFpXNTFJRDBnYldGclpVSjFhV3hrVTNWaWJXVnVkU2hqWVhSbFoyOXllVVZzS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWTJGMFpXZHZjbmxGYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWJXOTFjMlZsYm5SbGNsd2lMQ0JpZFdsc1pGTjFZbTFsYm5VcE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnYldGclpVSjFhV3hrVTNWaWJXVnVkU2hqWVhSbFoyOXllVVZzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJpZFdsc1pGTjFZbTFsYm5Vb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2MzVmliV1Z1ZFVWc0lEMGdZMkYwWldkdmNubEZiQzVuWlhSRmJHVnRaVzUwYzBKNVEyeGhjM05PWVcxbEtGd2lZbUl0Ym1GMkxYTjFZbTFsYm5WY0lpbGJNRjA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdjM1ZpYldWdWRTQTlJRk4xWW0xbGJuVXVabkp2YlNoemRXSnRaVzUxUld3cE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjM1ZpYldWdWRTNW1aWFJqYUVacGNuTjBRMkYwWldkdmNua29LVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGRHVm5iM0o1Uld3dWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpaGNJbTF2ZFhObFpXNTBaWEpjSWl3Z1luVnBiR1JUZFdKdFpXNTFLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdKMWFXeGtVM1ZpYldWdWRUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdoaGJtUnNaVU5zYVdOclRHOW5iMEZ5Y205M0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnWkhKdmNHUnZkMjVKYzA5d1pXNGdQU0JPWVhaVGRHRjBaUzVtYjJOMWMwbHpLRndpWkhKdmNHUnZkMjVjSWlrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGtjbTl3Wkc5M2JrbHpUM0JsYmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnNiM05sUkhKdmNHUnZkMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCT1lYWlRkR0YwWlM1MWJtWnZZM1Z6S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQk9ZWFpUZEdGMFpTNXpaWFJHYjJOMWN5aGNJbVJ5YjNCa2IzZHVYQ0lzSUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnNiM05sUkhKdmNHUnZkMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J2Y0dWdVJISnZjR1J2ZDI0b0tUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUc5d1pXNUVjbTl3Wkc5M2JpZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lITmxkRkJ2YzJsMGFXOXVUMlpWYzJsdVp5aGpZWFJsWjI5eWFXVnpSV3dzSUdKaVRtRjJSV3dwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JpWWs1aGRrVnNMbk5sZEVGMGRISnBZblYwWlNoRVVrOVFSRTlYVGw5QlZGUlNMQ0IwY25WbEtUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdOc2IzTmxSSEp2Y0dSdmQyNG9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmlZazVoZGtWc0xuTmxkRUYwZEhKcFluVjBaU2hFVWs5UVJFOVhUbDlCVkZSU0xDQm1ZV3h6WlNrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGJXOTJaVlJ2Y0VaeWIyMG9ZMkYwWldkdmNtbGxjMFZzS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJSE5sZEZCdmMybDBhVzl1VDJaVmMybHVaeWhsYkdWdFpXNTBNU3dnWld4bGJXVnVkRElwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaEtHVnNaVzFsYm5ReElDWW1JR1ZzWlcxbGJuUXlLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnYjJabWMyVjBJRDBnVG1GMlUzUmhkR1V1WjJWMEtGd2liVzlrWlZ3aUtTQTlQVDBnWENKamIyNTBaVzUwWENKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBL0lESWdMeThnWVd4c2IzY2dabTl5SUhCeWIyZHlaWE56SUhKbFlXUnBibWNnWW1GeUlHOXVJR052Ym5SbGJuUWdjR0ZuWlhNdVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ09pQXdPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCeVpXTjBTR1ZwWjJoMElEMGdaV3hsYldWdWRESXViMlptYzJWMFNHVnBaMmgwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2NtVmpkRUp2ZEhSdmJTQTlJSEpsWTNSSVpXbG5hSFFnS3lCdlptWnpaWFFnS3lCY0luQjRYQ0k3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUXhMbk4wZVd4bExuUnZjQ0E5SUhKbFkzUkNiM1IwYjIwN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJ5WlcxdmRtVlViM0JHY205dEtHVnNaVzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGxiR1Z0Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaV3hsYldWdWRDNXpkSGxzWlM1eVpXMXZkbVZRY205d1pYSjBlU2hjSW5SdmNGd2lLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdmVnh1WEc1OU8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQk9ZWFk3WEc0aUxDSXZLaUVnVTNWaWJXVnVkUzVxY3lBcUwxeHVYRzVwYlhCdmNuUWdjbVZ4ZFdWemRDQm1jbTl0SUZ3aUxpNHZMaTR2ZFhScGJDOXlaWEYxWlhOMFhDSTdYRzVwYlhCdmNuUWdUbUYyVTNSaGRHVWdabkp2YlNCY0lpNHVMeTR1TDNOMFlYUmxMMDVoZGxOMFlYUmxYQ0k3WEc1Y2JtTnZibk4wSUVoSlJFUkZUaUE5SUZ3aWFHbGtaR1Z1WENJN1hHNWpiMjV6ZENCQlExUkpWa1ZmUTB4QlUxTWdQU0JjSW1GamRHbDJaVndpTzF4dVhHNHZLaW9nUUdOc1lYTnpJRk4xWW0xbGJuVWdLaTljYm1OdmJuTjBJRk4xWW0xbGJuVWdQU0I3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQWJXVnRZbVZ5YjJZZ1UzVmliV1Z1ZFZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3U0ZSTlRFVnNaVzFsYm5SOUlITjFZbTFsYm5WRmJDQXRJRkp2YjNRZ2JtOWtaU0J2WmlCMGFHVWdjM1ZpYldWdWRWeHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdFRkV0p0Wlc1MWZTQnBibk4wWVc1alpTQnZaaUJUZFdKdFpXNTFYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1puSnZiU2h6ZFdKdFpXNTFSV3dwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWkdGMFlTQTlJSHQ5TzF4dVhHNGdJQ0FnSUNBZ0lHTnZibk4wSUdOaGRHVm5iM0o1VEdsdWEwVnNjeUE5SUdkbGRFTmhkR1ZuYjNKNVRHbHVhM01vYzNWaWJXVnVkVVZzS1R0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWm1seWMzUkRZWFJsWjI5eWVVeHBibXRGYkNBOUlHTmhkR1ZuYjNKNVRHbHVhMFZzYzFzd1hUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1kyRnlaSE5EYjI1MFlXbHVaWElnUFNCblpYUkRZWEprYzBOdmJuUmhhVzVsY2loemRXSnRaVzUxUld3cE8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCb2IzWmxja05oZEdWbmIzSjVTR0Z1Wkd4bGNpQTlJRzFoYTJWSWIzWmxja05oZEdWbmIzSjVTR0Z1Wkd4bGNpaDdYRzRnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2MzVmliV1Z1ZFVWc0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJGMFpXZHZjbmxNYVc1clJXeHpMRnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnlaSE5EYjI1MFlXbHVaWEpjYmlBZ0lDQWdJQ0FnZlNrN1hHNWNiaUFnSUNBZ0lDQWdabTl5SUNoc1pYUWdhU0E5SURBc0lHeGxibWQwYUNBOUlHTmhkR1ZuYjNKNVRHbHVhMFZzY3k1c1pXNW5kR2c3SUdrZ1BDQnNaVzVuZEdnN0lDc3JhU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkYwWldkdmNubE1hVzVyUld4elcybGRMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p0YjNWelpXVnVkR1Z5WENJc0lHaHZkbVZ5UTJGMFpXZHZjbmxJWVc1a2JHVnlLVHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDOHFLaUJBYkdWdVpITWdVM1ZpYldWdWRTQXFMMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJR1psZEdOb0lHWnBjbk4wSUdOaGRHVm5iM0o1SUdsdUlITjFZbTFsYm5VZ2MyOGdkR2hoZENCM2FHVnVJSFZ6WlhJZ2FHOTJaWEp6TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ29nZEdobGVTQjNhV3hzSUhObFpTQmpiMjUwWlc1MElHbHRiV1ZrYVdGMFpXeDVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1FHMWxkR2h2WkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQm1aWFJqYUVacGNuTjBRMkYwWldkdmNua29LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRm1hWEp6ZEVOaGRHVm5iM0o1VEdsdWEwVnNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm9iM1psY2tOaGRHVm5iM0o1U0dGdVpHeGxjaWg3SUhSaGNtZGxkRG9nWm1seWMzUkRZWFJsWjI5eWVVeHBibXRGYkNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNCOVhHNWNibjA3WEc1Y2JtWjFibU4wYVc5dUlHbHpTRzkyWlhKcGJtZFBiazF2WW1sc1pVSnlaV0ZyY0c5cGJuUW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNWhkbE4wWVhSbExtWnZZM1Z6U1hNb1hDSmtjbTl3Wkc5M2Jsd2lLVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwUTJGMFpXZHZjbmxNYVc1cmN5aHpkV0p0Wlc1MVJXd3BJSHRjYmlBZ0lDQnlaWFIxY200Z2MzVmliV1Z1ZFVWc0xtZGxkRVZzWlcxbGJuUnpRbmxEYkdGemMwNWhiV1VvWENKaVlpMXVZWFl0YzNWaWJXVnVkVjlmWTJGMFpXZHZjbmt0YkdsdWExd2lLVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwUTJGeVpITkRiMjUwWVdsdVpYSW9jM1ZpYldWdWRVVnNLU0I3WEc0Z0lDQWdjbVYwZFhKdUlITjFZbTFsYm5WRmJDNW5aWFJGYkdWdFpXNTBjMEo1UTJ4aGMzTk9ZVzFsS0Z3aVltSXRibUYyTFhOMVltMWxiblZmWDJOaGNtUnpYQ0lwV3pCZE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUlRkV0p5YjNWMFpTaGxiR1Z0Wlc1MEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWc1pXMWxiblF1WkdGMFlYTmxkQzV6ZFdKeWIzVjBaVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwVkhKaFkydGxja3hoWW1Wc0tHVnNaVzFsYm5RcElIdGNiaUFnSUNCeVpYUjFjbTRnWld4bGJXVnVkQzVrWVhSaGMyVjBMblJ5WVdOclpYSk1ZV0psYkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYldGeWEwRnpRV04wYVhabEtHTmhkR1ZuYjNKNVRHbHVhMFZzTENCallYUmxaMjl5ZVV4cGJtdEZiSE1wSUh0Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Dd2diR1Z1SUQwZ1kyRjBaV2R2Y25sTWFXNXJSV3h6TG14bGJtZDBhRHNnYVNBOElHeGxianNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJR052Ym5OMElHTjFjbkpsYm5SRFlYUmxaMjl5ZVV4cGJtdEZiQ0E5SUdOaGRHVm5iM0o1VEdsdWEwVnNjMXRwWFR0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRU5oZEdWbmIzSjVUR2x1YTBWc0xtTnNZWE56VEdsemRDNWpiMjUwWVdsdWN5aEJRMVJKVmtWZlEweEJVMU1wS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBRMkYwWldkdmNubE1hVzVyUld3dVkyeGhjM05NYVhOMExuSmxiVzkyWlNoQlExUkpWa1ZmUTB4QlUxTXBPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JqWVhSbFoyOXllVXhwYm10RmJDNWpiR0Z6YzB4cGMzUXVZV1JrS0VGRFZFbFdSVjlEVEVGVFV5azdYRzU5WEc1Y2JtWjFibU4wYVc5dUlITmxkRU5oY21SRVlYUmhLR05oY21SelEyOXVkR0ZwYm1WeUxDQmtZWFJoSUQwZ1hDSmNJaXdnZEhKaFkydGxja3hoWW1Wc0lEMGdYQ0pjSWlrZ2UxeHVJQ0FnSUdsbUlDZ2hZMkZ5WkhORGIyNTBZV2x1WlhJcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdOaGNtUnpRMjl1ZEdGcGJtVnlMbWx1Ym1WeVNGUk5UQ0E5SUdSaGRHRTdYRzRnSUNBZ2MyVjBWSEpoWTJ0bGNreGhZbVZzS0dOaGNtUnpRMjl1ZEdGcGJtVnlMQ0IwY21GamEyVnlUR0ZpWld3cE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCelpYUlVjbUZqYTJWeVRHRmlaV3dvWTJGeVpITkRiMjUwWVdsdVpYSXNJSFJ5WVdOclpYSk1ZV0psYkNrZ2UxeHVJQ0FnSUdsbUlDaDBjbUZqYTJWeVRHRmlaV3dwSUh0Y2JpQWdJQ0FnSUNBZ1kyRnlaSE5EYjI1MFlXbHVaWEl1WkdGMFlYTmxkQzUwY21GamEyVnlUR0ZpWld3Z1BTQjBjbUZqYTJWeVRHRmlaV3c3WEc0Z0lDQWdmVnh1SUNBZ0lHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCallYSmtjME52Ym5SaGFXNWxjaTVrWVhSaGMyVjBMblJ5WVdOclpYSk1ZV0psYkNBOUlHNTFiR3c3WEc0Z0lDQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnRZV3RsU0c5MlpYSkRZWFJsWjI5eWVVaGhibVJzWlhJb2V5QmtZWFJoTENCallYUmxaMjl5ZVV4cGJtdEZiSE1zSUdOaGNtUnpRMjl1ZEdGcGJtVnlJSDBwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNG9leUIwWVhKblpYUWdmU2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9hWE5JYjNabGNtbHVaMDl1VFc5aWFXeGxRbkpsWVd0d2IybHVkQ2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCdFlYSnJRWE5CWTNScGRtVW9kR0Z5WjJWMExDQmpZWFJsWjI5eWVVeHBibXRGYkhNcE8xeHVYRzRnSUNBZ0lDQWdJR052Ym5OMElITjFZbkp2ZFhSbElEMGdaMlYwVTNWaWNtOTFkR1VvZEdGeVoyVjBLVHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdkSEpoWTJ0cGJtZE1ZV0psYkNBOUlHZGxkRlJ5WVdOclpYSk1ZV0psYkNoMFlYSm5aWFFwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2doYzNWaWNtOTFkR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oY21SelEyOXVkR0ZwYm1WeUxuTmxkRUYwZEhKcFluVjBaU2hJU1VSRVJVNHNJRWhKUkVSRlRpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQmpiMjV6ZENCa1lYUmhSbTl5VTNWaWNtOTFkR1VnUFNCa1lYUmhXM04xWW5KdmRYUmxYVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9aR0YwWVVadmNsTjFZbkp2ZFhSbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCelpYUkRZWEprUkdGMFlTaGpZWEprYzBOdmJuUmhhVzVsY2l3Z1pHRjBZVVp2Y2xOMVluSnZkWFJsTENCMGNtRmphMmx1WjB4aFltVnNLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjbVJ6UTI5dWRHRnBibVZ5TG5KbGJXOTJaVUYwZEhKcFluVjBaU2hJU1VSRVJVNHBPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0J5WlhGMVpYTjBLSE4xWW5KdmRYUmxLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0xuUm9aVzRvS0hKbGMzQnZibk5sS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThnUTJGamFHVWdaR0YwWVNCbWIzSWdibVY0ZENCMGFXMWxYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVZ0emRXSnliM1YwWlYwZ1BTQnlaWE53YjI1elpTNWtZWFJoTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGRFTmhjbVJFWVhSaEtHTmhjbVJ6UTI5dWRHRnBibVZ5TENCeVpYTndiMjV6WlM1a1lYUmhMQ0IwY21GamEybHVaMHhoWW1Wc0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpZWEprYzBOdmJuUmhhVzVsY2k1eVpXMXZkbVZCZEhSeWFXSjFkR1VvU0VsRVJFVk9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBYRzRnSUNBZ0lDQWdJQ0FnSUNBdVkyRjBZMmdvS0NrZ1BUNGdjMlYwUTJGeVpFUmhkR0VvWTJGeVpITkRiMjUwWVdsdVpYSXBLVHRjYmlBZ0lDQjlPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCVGRXSnRaVzUxTzF4dUlpd2lMeW9oSUVkdmIyZHNaVk5sWVhKamFDNXFjeUFxTDF4dVhHNXBiWEJ2Y25RZ2JHOWhaRk5qY21sd2RDQm1jbTl0SUZ3aUxpNHZMaTR2ZFhScGJDOXNiMkZrVTJOeWFYQjBYQ0k3WEc1Y2JtTnZibk4wSUdkdmIyZHNaVU4xYzNSdmJWTmxZWEpqYUNBOUlGd2lhSFIwY0hNNkx5OWpjMlV1WjI5dloyeGxMbU52YlM5amMyVXVhbk0vWTNnOU1ERTJNekk1TXpBMU5qVXpNVE13TmpBME9UZzRPbU50YlhSNWEzRmplbUpsWENJN1hHNWNibXhsZENCc2IyRmtaV1FnUFNCbVlXeHpaVHRjYmx4dUx5b3FJRUJqYkdGemN5QkhiMjluYkdWVFpXRnlZMmdnS2k5Y2JtTnZibk4wSUVkdmIyZHNaVk5sWVhKamFDQTlJSHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUV4dllXUnpJR2R2YjJkc1pTQnpaV0Z5WTJnZ2FXNTBieUIwYUdVZ2NHRm5aUzVjYmlBZ0lDQWdLaUJBYldWMGFHOWtYRzRnSUNBZ0lDb3ZYRzRnSUNBZ2JHOWhaQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR3h2WVdSbFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdiRzloWkZOamNtbHdkQ2huYjI5bmJHVkRkWE4wYjIxVFpXRnlZMmdwTzF4dUlDQWdJQ0FnSUNCc2IyRmtaV1FnUFNCMGNuVmxPMXh1SUNBZ0lIMWNibHh1ZlR0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1IyOXZaMnhsVTJWaGNtTm9PMXh1SWl3aUx5b2hJRk52WTJsaGJDNXFjeUFxTDF4dVhHNXBiWEJ2Y25RZ2IyNURiR2xqYXlCbWNtOXRJRndpTGk0dkxpNHZkWFJwYkM5dmJrTnNhV05yWENJN1hHNXBiWEJ2Y25RZ2JXRjBZMmhsY3lCbWNtOXRJRndpTGk0dkxpNHZkWFJwYkM5dFlYUmphR1Z6WENJN1hHNWNibWx0Y0c5eWRDQm1ZV05sWW05dmF5Qm1jbTl0SUZ3aUxpOXVaWFIzYjNKcmN5OUdZV05sWW05dmF5NXFjMXdpTzF4dWFXMXdiM0owSUhSM2FYUjBaWElnWm5KdmJTQmNJaTR2Ym1WMGQyOXlhM012VkhkcGRIUmxjaTVxYzF3aU8xeHVhVzF3YjNKMElHVnRZV2xzSUdaeWIyMGdYQ0l1TDI1bGRIZHZjbXR6TDBWdFlXbHNMbXB6WENJN1hHNXBiWEJ2Y25RZ1oyOXZaMnhsSUdaeWIyMGdYQ0l1TDI1bGRIZHZjbXR6TDBkdmIyZHNaUzVxYzF3aU8xeHVhVzF3YjNKMElHeHBibXRsWkdsdUlHWnliMjBnWENJdUwyNWxkSGR2Y210ekwweHBibXRsWkdsdUxtcHpYQ0k3WEc1cGJYQnZjblFnY21Wa1pHbDBJR1p5YjIwZ1hDSXVMMjVsZEhkdmNtdHpMMUpsWkdScGRDNXFjMXdpTzF4dWFXMXdiM0owSUhkb1lYUnpZWEJ3SUdaeWIyMGdYQ0l1TDI1bGRIZHZjbXR6TDFkb1lYUnpZWEJ3TG1welhDSTdYRzVjYm1OdmJuTjBJSE52WTJsaGJFNWxkSGR2Y210eklEMGdlMXh1SUNBZ0lHWmhZMlZpYjI5ckxGeHVJQ0FnSUhSM2FYUjBaWElzWEc0Z0lDQWdaVzFoYVd3c1hHNGdJQ0FnWjI5dloyeGxMRnh1SUNBZ0lHeHBibXRsWkdsdUxGeHVJQ0FnSUhKbFpHUnBkQ3hjYmlBZ0lDQjNhR0YwYzJGd2NGeHVmVHRjYmx4dVkyOXVjM1FnVFVsT1NVMVZUVjlDVlZSVVQwNVRJRDBnTWp0Y2JtTnZibk4wSUVsVFgwOVFSVTVGUkY5QlZGUlNJRDBnWENKa1lYUmhMVzl3Wlc1bFpGd2lPMXh1WEc0dktpb2dRR05zWVhOeklGTnZZMmxoYkNBcUwxeHVZMjl1YzNRZ1UyOWphV0ZzSUQwZ2UxeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRRzFsYldKbGNtOW1JRk52WTJsaGJGeHVJQ0FnSUNBcUlFQndZWEpoYlNCN1NGUk5URVZzWlcxbGJuUjlJR1ZzSUMwZ1VtOXZkQ0J1YjJSbElHOW1JSFJvWlNCemIyTnBZV3dnWW5WMGRHOXVjMXh1SUNBZ0lDQXFJRUJ5WlhSMWNtNXpJSHRUYjJOcFlXeDlJR2x1YzNSaGJtTmxJRzltSUZOdlkybGhiRnh1SUNBZ0lDQXFMMXh1SUNBZ0lHWnliMjBvWld3cElIdGNiaUFnSUNBZ0lDQWdaV3d1YVc1dVpYSklWRTFNSUQwZ2MyOWphV0ZzVkdWdGNHeGhkR1ZJVkUxTUtDazdYRzVjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdjM1JoZEdVZ1BTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcGMwOXdaVzVsWkRvZ1ptRnNjMlVzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMk5wWVd4RmJEb2daV3d1WjJWMFJXeGxiV1Z1ZEhOQ2VVTnNZWE56VG1GdFpTaGNJbUppTFc1aGRpMXpiMk5wWVd4Y0lpbGJNRjFjYmlBZ0lDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ0lDQnZia05zYVdOcktHVnNMQ0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYldGMFkyaGxjeWhsZG1WdWRDNTBZWEpuWlhRc0lGd2lMbUppTFc1aGRpMXpiMk5wWVd4ZlgyMXZjbVV0YVdOdmJsd2lLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWMlpXNTBMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkRzluWjJ4bFUyaHZkMDF2Y21Vb2MzUmhkR1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ0lDQXZLaW9nUUd4bGJtUnpJRk52WTJsaGJDQXFMMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJR0ZqZEdsMllYUmxMM1Z3WkdGMFpTQnpiMk5wWVd3Z1luVjBkRzl1YzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJRUJ0WlhSb2IyUmNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCamIyNW1hV2N1ZEdsMGJHVWdMU0JVYVhSc1pTQjBieUJ6YUdGeVpWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUdOdmJtWnBaeTUxY213Z0xTQlZjbXdnZEc4Z2MyaGhjbVZjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdiMkpxWldOMFcxMTlJR052Ym1acFp5NXVaWFIzYjNKcmN5QXRJRTVsZEhkdmNtdHpJSGx2ZFNCM1lXNTBJSFJ2SUdScGMzQnNZWGxjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ1lXTjBhWFpoZEdVb1kyOXVabWxuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnZXlCdVpYUjNiM0pyY3lBOUlGdGRJSDBnUFNCamIyNW1hV2M3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ibVYwZDI5eWEzTXViR1Z1WjNSb0lEd2dUVWxPU1UxVlRWOUNWVlJVVDA1VEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWhjSWxSb1pYSmxJRzExYzNRZ1ltVWdZWFFnYkdWaGMzUWdkSGR2SUhOdlkybGhiQ0JpZFhSMGIyNXpYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITjBZWFJsTG1KMWRIUnZibk1nUFNCamIyNW1hV2RVYjBKMWRIUnZibk1vWTI5dVptbG5LVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhWd1pHRjBaVUoxZEhSdmJuTW9jM1JoZEdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCa1pXRmpkR2wyWVhSbElITnZZMmxoYkNCaWRYUjBiMjV6WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb2dRRzFsZEdodlpGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lDQWdJQ0JrWldGamRHbDJZWFJsS0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITjBZWFJsTG1KMWRIUnZibk1nUFNCYlhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpkR0YwWlM1cGMwOXdaVzVsWkNBOUlHWmhiSE5sTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RYQmtZWFJsUW5WMGRHOXVjeWh6ZEdGMFpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ2ZWeHVYRzU5TzF4dVhHNW1kVzVqZEdsdmJpQjBiMmRuYkdWVGFHOTNUVzl5WlNoemRHRjBaU2tnZTF4dUlDQWdJSE4wWVhSbExtbHpUM0JsYm1Wa0lEMGdJWE4wWVhSbExtbHpUM0JsYm1Wa08xeHVYRzRnSUNBZ2RYQmtZWFJsVTJodmQwMXZjbVVvYzNSaGRHVXBPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFjR1JoZEdWVGFHOTNUVzl5WlNoN0lHbHpUM0JsYm1Wa0xDQnpiMk5wWVd4RmJDQjlLU0I3WEc0Z0lDQWdhV1lnS0dselQzQmxibVZrS1NCN1hHNGdJQ0FnSUNBZ0lITnZZMmxoYkVWc0xuTmxkRUYwZEhKcFluVjBaU2hKVTE5UFVFVk9SVVJmUVZSVVVpd2dYQ0owY25WbFhDSXBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2MyOWphV0ZzUld3dWNtVnRiM1psUVhSMGNtbGlkWFJsS0VsVFgwOVFSVTVGUkY5QlZGUlNLVHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFFuVjBkRzl1Y3loN0lITnZZMmxoYkVWc0xDQmlkWFIwYjI1eklIMHBJSHRjYmlBZ0lDQnpiMk5wWVd4RmJDNXBibTVsY2toVVRVd2dQU0JnWEc0Z0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmlZaTF1WVhZdGMyOWphV0ZzWDE5aWRYUjBiMjV6WENJK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FrZXlCaWRYUjBiMjV6TG0xaGNDaGlkWFIwYjI1SVZFMU1LUzVxYjJsdUtGd2lYQ0lwSUgxY2JpQWdJQ0FnSUNBZ1BDOWthWFkrWEc1Y2JpQWdJQ0FnSUNBZ0pIc2diVzl5WlVKMWRIUnZia2hVVFV3b1luVjBkRzl1Y3lrZ2ZWeHVJQ0FnSUNBZ0lDQWtleUJ6WlhCaGNtRjBiM0pJVkUxTUtHSjFkSFJ2Ym5NcElIMWNiaUFnSUNCZ08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCaWRYUjBiMjVJVkUxTUtHSjFkSFJ2YmlrZ2UxeHVJQ0FnSUdOdmJuTjBJSHNnZEdGeVoyVjBMQ0J2Ym1Oc2FXTnJJSDBnUFNCaWRYUjBiMjR1Y0c5d2RYQTdYRzVjYmlBZ0lDQmpiMjV6ZENCMFlYSm5aWFJCZEhSeWFXSjFkR1VnUFNCMFlYSm5aWFFnUHlCZ2RHRnlaMlYwUFZ3aUpIc2dkR0Z5WjJWMElIMWNJbUFnT2lCY0lsd2lPMXh1SUNBZ0lHTnZibk4wSUc5dVkyeHBZMnRCZEhSeWFXSjFkR1VnUFNCdmJtTnNhV05ySUQ4Z1lHOXVZMnhwWTJzOVhDSWtleUJ2Ym1Oc2FXTnJJSDFjSW1BZ09pQmNJbHdpTzF4dUlDQWdJR052Ym5OMElHRmpkR2x2YmtGMGRISnBZblYwWlNBOUlHSjFkSFJ2Ymk1aFkzUnBiMjRnUHlCZ1lXTjBhVzl1UFZ3aUpIc2dZblYwZEc5dUxtRmpkR2x2YmlCOVhDSmdJRG9nWENKY0lqdGNibHh1SUNBZ0lISmxkSFZ5YmlCZ1hHNGdJQ0FnSUNBZ0lEeGhJR05zWVhOelBWd2lZbUl0Ym1GMkxYTnZZMmxoYkY5ZmJHbHVheUJpWWkxdVlYWXRjMjlqYVdGc1gxOXNhVzVyTFMwa2V5QmlkWFIwYjI0dWJtRnRaU0I5WENKY2JpQWdJQ0FnSUNBZ0lDQWdJR2h5WldZOVhDSWtleUJpZFhSMGIyNHViR2x1YXlCOVhDSmNiaUFnSUNBZ0lDQWdJQ0FnSUNSN0lIUmhjbWRsZEVGMGRISnBZblYwWlNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FrZXlCdmJtTnNhV05yUVhSMGNtbGlkWFJsSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ1I3SUdGamRHbHZia0YwZEhKcFluVjBaU0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaV3c5WENKdWIyWnZiR3h2ZDF3aVhHNGdJQ0FnSUNBZ0lDQWdJQ0JrWVhSaExYUnlZV05yWlhJdGJHRmlaV3c5WENJa2V5QmlkWFIwYjI0dWJtRnRaU0I5WENKY2JpQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdGRISmhZMnRsY2kxaFkzUnBiMjQ5WENKamJHbGphMXdpWEc0Z0lDQWdJQ0FnSUQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ1I3SUdKMWRIUnZiaTVrYVhOd2JHRjVJSDFjYmlBZ0lDQWdJQ0FnUEM5aFBseHVJQ0FnSUdBN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUcxdmNtVkNkWFIwYjI1SVZFMU1LR0oxZEhSdmJuTXBJSHRjYmlBZ0lDQnBaaUFvWW5WMGRHOXVjeTVzWlc1bmRHZ2dQRDBnVFVsT1NVMVZUVjlDVlZSVVQwNVRLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJjSWx3aU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUJnWEc0Z0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmlZaTF1WVhZdGMyOWphV0ZzWDE5dGIzSmxYQ0krWEc0Z0lDQWdJQ0FnSUNBZ0lDQThaR2wyWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJ4aGMzTTlYQ0ppWWkxdVlYWXRjMjlqYVdGc1gxOXRiM0psTFdsamIyNWNJbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdGRISmhZMnRsY2kxc1lXSmxiRDFjSW0xdmNtVmNJbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdGRISmhZMnRsY2kxaFkzUnBiMjQ5WENKamJHbGphMXdpWEc0Z0lDQWdJQ0FnSUNBZ0lDQStYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ1lEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2MyVndZWEpoZEc5eVNGUk5UQ2hpZFhSMGIyNXpLU0I3WEc0Z0lDQWdhV1lnS0NGaWRYUjBiMjV6TG14bGJtZDBhQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWENKY0lqdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnWENJOFpHbDJJR05zWVhOelBWeGNYQ0ppWWkxdVlYWXRjMjlqYVdGc1gxOWpiMjUwWlc1MExYTmxjR0Z5WVhSdmNseGNYQ0krUEM5a2FYWStYQ0k3WEc1OVhHNWNibVoxYm1OMGFXOXVJSE52WTJsaGJGUmxiWEJzWVhSbFNGUk5UQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZRnh1SUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVltSXRibUYyTFhOdlkybGhiRndpSUdSaGRHRXRkSEpoWTJ0bGNpMXNZV0psYkQxY0luTnZZMmxoYkZ3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltSmlMVzVoZGkxemIyTnBZV3hmWDJKMWRIUnZibk5jSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHVJQ0FnSUNBZ0lDQThMMlJwZGo1Y2JpQWdJQ0JnTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ3YjNCMWNFWmhZM1J2Y25rb2JtRnRaU3dnY0c5d2RYQXBJSHRjYmlBZ0lDQnBaaUFvSVhCdmNIVndLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3ZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JqYjI1emRDQjdJSGRwWkhSb0xDQm9aV2xuYUhRZ2ZTQTlJSEJ2Y0hWd08xeHVYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUNBZ2RHRnlaMlYwT2lCZ1ltSXRjMjlqYVdGc0xYQnZjSFZ3TFMwa2V5QnVZVzFsSUgxZ0xGeHVJQ0FnSUNBZ0lDQnZibU5zYVdOck9pQmdkMmx1Wkc5M0xtOXdaVzRvZEdocGN5NW9jbVZtTENBblltSXRjMjlqYVdGc0xYQnZjSFZ3TFMwa2V5QnVZVzFsSUgwbkxDQW5iV1Z1ZFdKaGNqMXVieXgwYjI5c1ltRnlQVzV2TEhKbGMybDZZV0pzWlQxNVpYTXNjMk55YjJ4c1ltRnljejE1WlhNc2QybGtkR2c5SkhzZ2QybGtkR2dnZlN4b1pXbG5hSFE5SkhzZ2FHVnBaMmgwSUgwbktUc2djbVYwZFhKdUlHWmhiSE5sTzJCY2JpQWdJQ0I5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYjI1bWFXZFViMEoxZEhSdmJuTW9leUIwYVhSc1pTd2dkWEpzTENCdVpYUjNiM0pyY3lCOUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUc1bGRIZHZjbXR6TG0xaGNDaHVaWFIzYjNKcklEMCtJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdibVYwZDI5eWEwTnZibVpwWnlBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZXlCMGFYUnNaU3dnZFhKc0lIMHNJRzVsZEhkdmNtc3BPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQjdJRzVoYldVc0lHZGxkRk52WTJsaGJFeHBibXNzSUhCdmNIVndMQ0JoWTNScGIyNHNJR1JwYzNCc1lYa2dmU0E5SUhOdlkybGhiRTVsZEhkdmNtdHpXMjVsZEhkdmNtc3VibUZ0WlYwN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUc1aGJXVXNYRzRnSUNBZ0lDQWdJQ0FnSUNCc2FXNXJPaUJuWlhSVGIyTnBZV3hNYVc1cktHNWxkSGR2Y210RGIyNW1hV2NwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjRzl3ZFhBNklIQnZjSFZ3Um1GamRHOXllU2h1WVcxbExDQndiM0IxY0Nrc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JoWTNScGIyNHNYRzRnSUNBZ0lDQWdJQ0FnSUNCa2FYTndiR0Y1WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnZlNrN1hHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRk52WTJsaGJEdGNiaUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0I3WEc0Z0lDQWdibUZ0WlRvZ1hDSmxiV0ZwYkZ3aUxGeHVJQ0FnSUdScGMzQnNZWGs2SUZ3aVJTMXRZV2xzWENJc1hHNGdJQ0FnWjJWMFUyOWphV0ZzVEdsdWF5aDdJR0p2Wkhrc0lIUnBkR3hsSUgwcElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1ltOWtlVVZ1WTI5a1pXUWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvWW05a2VTazdYRzRnSUNBZ0lDQWdJR052Ym5OMElIUnBkR3hsUlc1amIyUmxaQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoMGFYUnNaU2s3WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdCdFlXbHNkRzg2UDJKdlpIazlKSHNnWW05a2VVVnVZMjlrWldRZ2ZTWnpkV0pxWldOMFBTUjdJSFJwZEd4bFJXNWpiMlJsWkNCOVlEdGNiaUFnSUNCOVhHNTlPMXh1SWl3aVpYaHdiM0owSUdSbFptRjFiSFFnZTF4dUlDQWdJRzVoYldVNklGd2labUZqWldKdmIydGNJaXhjYmlBZ0lDQmthWE53YkdGNU9pQmNJbE5vWVhKbElHOXVJRVpoWTJWaWIyOXJYQ0lzWEc0Z0lDQWdaMlYwVTI5amFXRnNUR2x1YXloN0lIVnliQ0I5S1NCN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUhWeWJFVnVZMjlrWldRZ1BTQmxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9kWEpzS1R0Y2JseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1lHaDBkSEE2THk5M2QzY3VabUZqWldKdmIyc3VZMjl0TDNOb1lYSmxjaTl6YUdGeVpYSXVjR2h3UDNVOUpIc2dkWEpzUlc1amIyUmxaQ0I5WUR0Y2JpQWdJQ0I5TEZ4dUlDQWdJSEJ2Y0hWd09pQjdYRzRnSUNBZ0lDQWdJSGRwWkhSb09pQTJNREFzWEc0Z0lDQWdJQ0FnSUdobGFXZG9kRG9nTmpBd1hHNGdJQ0FnZlZ4dWZUdGNiaUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0I3WEc0Z0lDQWdibUZ0WlRvZ1hDSm5iMjluYkdWY0lpeGNiaUFnSUNCa2FYTndiR0Y1T2lCY0lsTm9ZWEpsSUc5dUlFZHZiMmRzWlN0Y0lpeGNiaUFnSUNCblpYUlRiMk5wWVd4TWFXNXJLSHNnZFhKc0lIMHBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdkWEpzUlc1amIyUmxaQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoMWNtd3BPMXh1WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJnYUhSMGNITTZMeTl3YkhWekxtZHZiMmRzWlM1amIyMHZjMmhoY21VL2RYSnNQU1I3SUhWeWJFVnVZMjlrWldRZ2ZXQTdYRzRnSUNBZ2ZTeGNiaUFnSUNCd2IzQjFjRG9nZTF4dUlDQWdJQ0FnSUNCM2FXUjBhRG9nTlRJd0xGeHVJQ0FnSUNBZ0lDQm9aV2xuYUhRNklEWXdNRnh1SUNBZ0lIMWNibjA3WEc0aUxDSmNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ2UxeHVJQ0FnSUc1aGJXVTZJRndpYkdsdWEyVmthVzVjSWl4Y2JpQWdJQ0JrYVhOd2JHRjVPaUJjSWxOb1lYSmxJRzl1SUV4cGJtdGxaR2x1WENJc1hHNGdJQ0FnWjJWMFUyOWphV0ZzVEdsdWF5aDdJSFJwZEd4bExDQjFjbXdnZlNrZ2UxeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCMGFYUnNaVVZ1WTI5a1pXUWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvZEdsMGJHVXBPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQjFjbXhGYm1OdlpHVmtJRDBnWlc1amIyUmxWVkpKUTI5dGNHOXVaVzUwS0hWeWJDazdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR0JvZEhSd09pOHZkM2QzTG14cGJtdGxaR2x1TG1OdmJTOXphR0Z5WlVGeWRHbGpiR1UvZEdsMGJHVTlKSHNnZEdsMGJHVkZibU52WkdWa0lIMG1kWEpzUFNSN0lIVnliRVZ1WTI5a1pXUWdmV0E3WEc0Z0lDQWdmU3hjYmlBZ0lDQndiM0IxY0RvZ2UxeHVJQ0FnSUNBZ0lDQjNhV1IwYURvZ05qQXdMRnh1SUNBZ0lDQWdJQ0JvWldsbmFIUTZJRFV5T0Z4dUlDQWdJSDFjYm4wN1hHNGlMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdlMXh1SUNBZ0lHNWhiV1U2SUZ3aWNtVmtaR2wwWENJc1hHNGdJQ0FnWkdsemNHeGhlVG9nWENKVGFHRnlaU0J2YmlCU1pXUmthWFJjSWl4Y2JpQWdJQ0JuWlhSVGIyTnBZV3hNYVc1cktIc2dkR2wwYkdVc0lIVnliQ0I5S1NCN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUhScGRHeGxSVzVqYjJSbFpDQTlJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gwYVhSc1pTazdYRzRnSUNBZ0lDQWdJR052Ym5OMElIVnliRVZ1WTI5a1pXUWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvZFhKc0tUdGNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdZR2gwZEhBNkx5OXlaV1JrYVhRdVkyOXRMM04xWW0xcGREOTBhWFJzWlQwa2V5QjBhWFJzWlVWdVkyOWtaV1FnZlNaMWNtdzlKSHNnZFhKc1JXNWpiMlJsWkNCOVlEdGNiaUFnSUNCOUxGeHVJQ0FnSUhCdmNIVndPaUI3WEc0Z0lDQWdJQ0FnSUhkcFpIUm9PaUExTWpBc1hHNGdJQ0FnSUNBZ0lHaGxhV2RvZERvZ05qQXdYRzRnSUNBZ2ZWeHVmVHRjYmlJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCN1hHNGdJQ0FnYm1GdFpUb2dYQ0owZDJsMGRHVnlYQ0lzWEc0Z0lDQWdaR2x6Y0d4aGVUb2dYQ0pUYUdGeVpTQnZiaUJVZDJsMGRHVnlYQ0lzWEc0Z0lDQWdaMlYwVTI5amFXRnNUR2x1YXloN0lIVnliQ3dnZEdWNGRDd2dhR0Z1Wkd4bElIMHBJSHRjYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnZEhKMWJtTmhkR1ZrVkdWNGRDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUZSWFJVVlVYMHhGVGtkVVNDQTlJREUwTUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElGTklUMUpVUlU1RlJGOVZVa3hmVEVWT1IxUklJRDBnTWpNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQkZURXhKVUZOSlV5QTlJRndpTGk0dVhDSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JTUlVGVFQwNUJRa3hGWDFSRldGUmZVRUZFUkVsT1J5QTlJRFk3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCVVQwOWZRa2xIWDFSUFgwWkpWRjlWVTBWR1ZVeGZWRVZZVkNBOUlGUlhSVVZVWDB4RlRrZFVTQ0F0SUZOSVQxSlVSVTVGUkY5VlVreGZURVZPUjFSSUlDMGdSVXhNU1ZCVFNWTXViR1Z1WjNSb0lDMGdVa1ZCVTA5T1FVSk1SVjlVUlZoVVgxQkJSRVJKVGtjN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUd4bGRDQmljbUZ1WkdsdVowTnZiblJsYm5RZ1BTQmNJbHdpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGMFpYaDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRndpWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNob1lXNWtiR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaWNtRnVaR2x1WjBOdmJuUmxiblFnS3owZ1lDQjJhV0VnUUNSN0lHaGhibVJzWlNCOVlEdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHSnlZVzVrYVc1blEyOXVkR1Z1ZEM1c1pXNW5kR2dnUGowZ1ZFOVBYMEpKUjE5VVQxOUdTVlJmVlZORlJsVk1YMVJGV0ZRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1hDSmNJanRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnYldGNFZHVjRkRXhsYm1kMGFDQTlJRlJYUlVWVVgweEZUa2RVU0NBdElGTklUMUpVUlU1RlJGOVZVa3hmVEVWT1IxUklJQzBnUlV4TVNWQlRTVk11YkdWdVozUm9JQzBnWW5KaGJtUnBibWREYjI1MFpXNTBMbXhsYm1kMGFEdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFJsZUhRdWJHVnVaM1JvSUQ0Z2JXRjRWR1Y0ZEV4bGJtZDBhQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwWlhoMExuTjFZbk4wY2lnd0xDQnRZWGhVWlhoMFRHVnVaM1JvS1NBcklFVk1URWxRVTBsVE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR1Y0ZER0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR052Ym5OMElIVnliRVZ1WTI5a1pXUWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvZFhKc0tUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2RHVjRkRVZ1WTI5a1pXUWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvZEhKMWJtTmhkR1ZrVkdWNGRDZ3BLVHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdkbWxoUlc1amIyUmxaQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENob1lXNWtiR1VwTzF4dVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCZ2FIUjBjSE02THk5MGQybDBkR1Z5TG1OdmJTOXBiblJsYm5RdmRIZGxaWFEvZFhKc1BTUjdJSFZ5YkVWdVkyOWtaV1FnZlNaMFpYaDBQU1I3SUhSbGVIUkZibU52WkdWa0lIMG1kbWxoUFNSN0lIWnBZVVZ1WTI5a1pXUWdmV0E3WEc0Z0lDQWdmU3hjYmlBZ0lDQndiM0IxY0RvZ2UxeHVJQ0FnSUNBZ0lDQjNhV1IwYURvZ05qSTJMRnh1SUNBZ0lDQWdJQ0JvWldsbmFIUTZJRFF6T0Z4dUlDQWdJSDFjYm4wN1hHNGlMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdlMXh1SUNBZ0lHNWhiV1U2SUZ3aWQyaGhkSE5oY0hCY0lpeGNiaUFnSUNCa2FYTndiR0Y1T2lCY0lsTm9ZWEpsSUc5dUlGZG9ZWFJ6UVhCd1hDSXNYRzRnSUNBZ1oyVjBVMjlqYVdGc1RHbHVheWg3SUhScGRHeGxMQ0IxY213Z2ZTa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQjBaWGgwUlc1amIyUmxaQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoZ0pIc2dkR2wwYkdVZ2ZTQWtleUIxY213Z2ZXQXBPMXh1WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJnZDJoaGRITmhjSEE2THk5elpXNWtQM1JsZUhROUpIc2dkR1Y0ZEVWdVkyOWtaV1FnZldBN1hHNGdJQ0FnZlN4Y2JpQWdJQ0J3YjNCMWNEb2dlMXh1SUNBZ0lDQWdJQ0IzYVdSMGFEb2dOakF3TEZ4dUlDQWdJQ0FnSUNCb1pXbG5hSFE2SURZd01GeHVJQ0FnSUgwc1hHNGdJQ0FnWVdOMGFXOXVPaUJjSW5Ob1lYSmxMM2RvWVhSellYQndMM05vWVhKbFhDSmNibjA3WEc0aUxDSXZLaUVnUVhSMFpXNWtZVzVqWlVOb1pXTnJaWEl1YW5NZ0tpOWNibHh1YVcxd2IzSjBJRU52YjJ0cFpYTWdabkp2YlNCY0lpNHVMeTR1TDNWMGFXd3ZZMjl2YTJsbGMxd2lPMXh1WEc1amIyNXpkQ0JCVEZKRlFVUlpYMWRCVkVOSVJVUmZRMDlQUzBsRklEMGdYQ0ppWWkxdGFXNXBMWEJzWVhsbGNpMTJhV1YzWldSY0lqdGNibHh1THlvcVhHNGdLaUJBZEhsd1pTQjdiMkpxWldOMGZTQkJkSFJsYm1SaGJtTmxRMmhsWTJ0bGNseHVJQ292WEc1amIyNXpkQ0JCZEhSbGJtUmhibU5sUTJobFkydGxjaUE5SUh0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFQnRaWFJvYjJSY2JpQWdJQ0FnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4xY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JoYkhKbFlXUjVWMkYwWTJobFpDZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRU52YjJ0cFpYTXVaMlYwS0VGTVVrVkJSRmxmVjBGVVEwaEZSRjlEVDA5TFNVVXBJRDA5UFNCY0luUnlkV1ZjSWp0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1UyVjBjeUJqYjI5cmFXVWdkR2hoZENCbGVIQnBjbVZ6SUdGMElFVlBSQ0JoYm1RZ2JXRnlhM01nYldsdWFYQnNZWGxsY2lCamIyNTBaVzUwSUdGeklGd2lkMkYwWTJobFpGd2lYRzRnSUNBZ0lDb2dRRzFsZEdodlpGeHVJQ0FnSUNBcUwxeHVJQ0FnSUcxaGNtdEJjMWRoZEdOb1pXUW9LU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJRzV2ZHlBOUlFUmhkR1V1Ym05M0tDazdYRzRnSUNBZ0lDQWdJR052Ym5OMElHVnVaRTltUkdGNUlEMGdibVYzSUVSaGRHVW9LVHRjYmlBZ0lDQWdJQ0FnWlc1a1QyWkVZWGt1YzJWMFNHOTFjbk1vTWpNc0lEVTVMQ0ExT1N3Z09UazVLVHRjYmx4dUlDQWdJQ0FnSUNCamIyNXpkQ0J0WVhoQloyVlRaV052Ym1SeklEMGdUV0YwYUM1aFluTW9aVzVrVDJaRVlYa2dMU0J1YjNjcElDOGdNVEF3TUR0Y2JpQWdJQ0FnSUNBZ1EyOXZhMmxsY3k1elpYUW9RVXhTUlVGRVdWOVhRVlJEU0VWRVgwTlBUMHRKUlN3Z1hDSjBjblZsWENJc0lIc2diV0Y0UVdkbE9pQnRZWGhCWjJWVFpXTnZibVJ6SUgwcE8xeHVJQ0FnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRUYwZEdWdVpHRnVZMlZEYUdWamEyVnlPMXh1SWl3aUx5b2hJRUpDUTI5cWNFMXBibWxRVEdGNVpYSXVhbk1nS2k5Y2JseHVhVzF3YjNKMElFaDBiV3dnWm5KdmJTQmNJaTR1THk0dUwzVjBhV3d2U0hSdGJGd2lPMXh1YVcxd2IzSjBJRUYwZEdWdVpHRnVZMlZEYUdWamEyVnlJR1p5YjIwZ1hDSXVMMEYwZEdWdVpHRnVZMlZEYUdWamEyVnlYQ0k3WEc1cGJYQnZjblFnYjI1RGJHbGpheUJtY205dElGd2lMaTR2TGk0dmRYUnBiQzl2YmtOc2FXTnJYQ0k3WEc1cGJYQnZjblFnWTI5dWRHRnBibVZrU1c0Z1puSnZiU0JjSWk0dUx5NHVMM1YwYVd3dlkyOXVkR0ZwYm1Wa1NXNWNJanRjYmx4dVkyOXVjM1FnVUV4QldVVlNYME5QVGtaSlJ5QTlJSHRjYmlBZ0lDQmNJbWxrWENJNklGd2lRVk5KUVY5TlNVNUpYQ0lzWEc0Z0lDQWdYQ0pzYVhabFhDSTZJSFJ5ZFdVc1hHNGdJQ0FnWENKaGRYUnZjR3hoZVZ3aU9pQm1ZV3h6WlN4Y2JpQWdJQ0JjSW1oMGJXeERhR2xzWkVsa1hDSTZJRndpWW1JdGJXbHVhUzF3YkdGNVpYSmZYMlZ0WW1Wa1hDSXNYRzRnSUNBZ1hDSjNhV1IwYUZ3aU9pQXhNREFzWEc0Z0lDQWdYQ0pvWldsbmFIUmNJam9nTlRjc1hHNGdJQ0FnWENKamIyMXpZMjl5WlY5dWMxOXphWFJsWENJNklGd2lZbXh2YjIxaVpYSm5MV3B3WENJc1hHNGdJQ0FnWENKamIyMXpZMjl5WlY5d1lXZGxYMnhsZG1Wc1gzUmhaM05jSWpvZ2UxeHVJQ0FnSUNBZ0lDQmNJbUppWDJKeVlXNWtYQ0k2SUZ3aVltSnBlaTFxY0Z3aUxGeHVJQ0FnSUNBZ0lDQmNJbUp6YzE5amIyNTBYM0JzWVhsY0lqb2dNQ3hjYmlBZ0lDQWdJQ0FnWENKaVlsOXlaV2RwYjI1Y0lqb2dYQ0pCVUVGRFhDSmNiaUFnSUNCOUxGeHVJQ0FnSUZ3aWRYTmxYMmR2YjJkc1pWOTBZV2RmYldGdVlXZGxjbHdpT2lCMGNuVmxMRnh1SUNBZ0lGd2liRzluWDJSbFluVm5YQ0k2SUdaaGJITmxMRnh1SUNBZ0lGd2lZMjl1ZEhKdmJITmNJam9nWm1Gc2MyVXNYRzRnSUNBZ1hDSjFhVjlqYjI1MGNtOXNjMTl3YjNCdmRYUmNJam9nWm1Gc2MyVXNYRzRnSUNBZ1hDSjFhVjlqYjI1MGNtOXNjMTltZFd4c2MyTnlaV1Z1WENJNklHWmhiSE5sWEc1OU8xeHVYRzVqYjI1emRDQkJVMGxCWDBWWVVFVlNTVVZPUTBWZlMwVlpJRDBnWENKQlUwbEJUVWxPU1Z3aU8xeHVZMjl1YzNRZ1VFeEJXVUpCUTB0ZlRFbE5TVlFnUFNBMUlDb2dOakF3TURBN1hHNWpiMjV6ZENCSlVFRkVYMHhCVGtSVFEwRlFSVjlOUlVSSlFTQTlJRndpYzJOeVpXVnVJR0Z1WkNBb2JXRjRMV1JsZG1salpTMTNhV1IwYURvZ01UQXlNSEI0S1NCaGJtUWdLRzl5YVdWdWRHRjBhVzl1T2lCc1lXNWtjMk5oY0dVcFhDSTdYRzVqYjI1emRDQlRUVUZNVEY5RVJWTkxWRTlRWDAxRlJFbEJJRDBnWENKelkzSmxaVzRnWVc1a0lDaHRZWGd0ZDJsa2RHZzZJREV3TWpCd2VDbGNJanRjYmx4dVkyOXVjM1FnUWtKRGIycHdUV2x1YVZCTVlYbGxjaUE5SUh0Y2JseHVJQ0FnSUdGamRHbDJZWFJsS0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvSVhSb2FYTXVjMmh2ZFd4a1FtVldhWE5wWW14bEtDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyaHZkeWdwSUh0OUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHaHBaR1VvS1NCN2ZTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndZWFZ6WlNncElIdDlYRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnYkdWMElHSmlUV2x1YVZCc1lYbGxja1ZzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRITkNlVlJoWjA1aGJXVW9YQ0ppWWkxdGFXNXBMWEJzWVhsbGNsd2lLVnN3WFR0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvSVdKaVRXbHVhVkJzWVhsbGNrVnNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmlZazFwYm1sUWJHRjVaWEpGYkNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvWENKaVlpMXRhVzVwTFhCc1lYbGxjbHdpS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbUp2WkhrdVlYQndaVzVrUTJocGJHUW9ZbUpOYVc1cFVHeGhlV1Z5Uld3cE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnWW1KTmFXNXBVR3hoZVdWeVJXd3VhVzV1WlhKSVZFMU1JRDBnYldsdWFWQnNZWGxsY2toVVRVd29LVHRjYmx4dUlDQWdJQ0FnSUNCdmJrTnNhV05yS0dKaVRXbHVhVkJzWVhsbGNrVnNMQ0FvWlhabGJuUXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElIc2dkR0Z5WjJWMElIMGdQU0JsZG1WdWREdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR052Ym5SaGFXNWxaRWx1S0hSaGNtZGxkQ3dnWENJdVltSXRiV2x1YVhCc1lYbGxjbDlmZG1sa1pXOWNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkpsYzNWdFpWQnNZWGtvWlhabGJuUXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWJXbHVhWEJzWVhsbGNsSmxZV1I1WENJc0lDaGxkbVZ1ZENrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV2YmsxcGJtbFFiR0Y1WlhKU1pXRmtlU2hsZG1WdWRDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNBZ0lIUm9hWE11WW1KTmFXNXBVR3hoZVdWeVJXd2dQU0JpWWsxcGJtbFFiR0Y1WlhKRmJEdGNibHh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxZV1I1S0NrN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOb2IzYzZJSFJvYVhNdWMyaHZkeTVpYVc1a0tIUm9hWE1wTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdhR2xrWlRvZ2RHaHBjeTVvYVdSbExtSnBibVFvZEdocGN5a3NYRzRnSUNBZ0lDQWdJQ0FnSUNCd1lYVnpaVG9nZEdocGN5NXdZWFZ6WlM1aWFXNWtLSFJvYVhNcFhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lISmxZV1I1S0NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG0xcGJtbFFiR0Y1WlhKRmJDQTlJSFJvYVhNdVltSk5hVzVwVUd4aGVXVnlSV3d1WjJWMFJXeGxiV1Z1ZEhOQ2VVTnNZWE56VG1GdFpTaGNJbUppTFcxcGJtbHdiR0Y1WlhKY0lpbGJNRjA3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEdsaGJHbDZaVkJzWVhsbGNpaFFURUZaUlZKZlEwOU9Sa2xIS1R0Y2JseHVJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLSFJvYVhNdWNHRjFjMlV1WW1sdVpDaDBhR2x6S1N3Z1VFeEJXVUpCUTB0ZlRFbE5TVlFwTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0IxY0dSaGRHVlFZWFZ6WldSSmJrMWhjbXQxY0NncElIdGNiaUFnSUNBZ0lDQWdTSFJ0YkM1MGIyZG5iR1ZCZEhSeWFXSjFkR1VvZEdocGN5NXRhVzVwVUd4aGVXVnlSV3dzSUZ3aWNHRjFjMlZrWENJc0lIUm9hWE11Y0dGMWMyVmtLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjbVZ6ZFcxbFVHeGhlU2hsZG1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNnaGRHaHBjeTV3WVhWelpXUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSFJvYVhNdWNHRjFjMlZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkWEJrWVhSbFVHRjFjMlZrU1c1TllYSnJkWEFvS1R0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdiR0Y1WlhJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjR3hoZVdWeUxuQnNZWGtvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCemFHOTNLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbUppVFdsdWFWQnNZWGxsY2tWc0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNCY0lsd2lPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQm9hV1JsS0NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5CaGRYTmxLQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZbUpOYVc1cFVHeGhlV1Z5Uld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUZ3aWJtOXVaVndpTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0JwYm1sMGFXRnNhWHBsVUd4aGVXVnlLR052Ym1acFp5a2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQmpjbVZoZEdWUWJHRjVaWElnUFNBb1pYWmxiblFwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJR0p3YkdGNVpYSWdQU0JsZG1WdWRDQS9JR1YyWlc1MExtUmxkR0ZwYkM1aWNHeGhlV1Z5SURvZ2JuVnNiRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUVKUWJHRjVaWElnUFNCaWNHeGhlV1Z5SUh4OElIZHBibVJ2ZHk1Q1VHeGhlV1Z5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2RtbGtaVzlGYkNBOUlIUm9hWE11WW1KTmFXNXBVR3hoZVdWeVJXd3VaMlYwUld4bGJXVnVkSE5DZVVOc1lYTnpUbUZ0WlNoY0ltSmlMVzFwYm1sd2JHRjVaWEpmWDNacFpHVnZYQ0lwV3pCZE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkJzWVhsbGNpQTlJRUpRYkdGNVpYSXVZM0psWVhSbEtGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWnBaR1Z2Uld3c1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVabWxuTENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzl1VW1WaFpIazZJQ2dwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1TmFXNXBVR3hoZVdWeVVtVmhaSGtvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDazdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIZHBibVJ2ZHk1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtGd2lRbEJzWVhsbGNreHZZV1JsWkZ3aUxDQmpjbVZoZEdWUWJHRjVaWElwTzF4dUlDQWdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoM2FXNWtiM2N1UWxCc1lYbGxjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZM0psWVhSbFVHeGhlV1Z5S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCc1pYUWdZbkJzWVhsbGNsTmpjbWx3ZENBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvWENKelkzSnBjSFJjSWlrN1hHNGdJQ0FnSUNBZ0lHSndiR0Y1WlhKVFkzSnBjSFF1YzJWMFFYUjBjbWxpZFhSbEtGd2ljM0pqWENJc0lHQWtleUJ3Y205alpYTnpMbVZ1ZGk1V1NVUkZUMTlRVEVGWlJWSmZVMUpESUgwdlluQnNZWGxsY2k1cWMyQXBPMXh1SUNBZ0lDQWdJQ0JpY0d4aGVXVnlVMk55YVhCMExuTmxkRUYwZEhKcFluVjBaU2hjSW5SNWNHVmNJaXdnWENKMFpYaDBMMnBoZG1GelkzSnBjSFJjSWlrN1hHNGdJQ0FnSUNBZ0lHSndiR0Y1WlhKVFkzSnBjSFF1YzJWMFFYUjBjbWxpZFhSbEtGd2lZWE41Ym1OY0lpd2dkSEoxWlNrN1hHNGdJQ0FnSUNBZ0lHSndiR0Y1WlhKVFkzSnBjSFF1YzJWMFFYUjBjbWxpZFhSbEtGd2laR0YwWVMxbGVHTnNkV1JsWENJc0lIUnlkV1VwTzF4dVhHNGdJQ0FnSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aVFsQnNZWGxsY2t4dllXUmxaRndpTENCamNtVmhkR1ZRYkdGNVpYSXBPMXh1WEc0Z0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG1obFlXUXVZWEJ3Wlc1a1EyaHBiR1FvWW5Cc1lYbGxjbE5qY21sd2RDazdYRzRnSUNBZ0lDQWdJR0p3YkdGNVpYSlRZM0pwY0hRZ1BTQnVkV3hzTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0J3WVhWelpTZ3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11Y0dGMWMyVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0IwYUdsekxuQmhkWE5sWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkWEJrWVhSbFVHRjFjMlZrU1c1TllYSnJkWEFvS1R0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdiR0Y1WlhJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjR3hoZVdWeUxuQmhkWE5sS0NrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ1pHbHpjRzl6WlNncElIdGNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjR3hoZVdWeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkJzWVhsbGNpNWthWE53YjNObEtDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjMmh2ZFd4a1FtVldhWE5wWW14bEtDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnBjMGxRWVdRZ1BTQjNhVzVrYjNjdWJXRjBZMmhOWldScFlTaEpVRUZFWDB4QlRrUlRRMEZRUlY5TlJVUkpRU2t1YldGMFkyaGxjenRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdhWE5NWlhOelZHaGhibE50WVd4c1JHVnphM1J2Y0NBOUlIZHBibVJ2ZHk1dFlYUmphRTFsWkdsaEtGTk5RVXhNWDBSRlUwdFVUMUJmVFVWRVNVRXBMbTFoZEdOb1pYTTdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ0VvYVhOSlVHRmtJSHg4SUdselRHVnpjMVJvWVc1VGJXRnNiRVJsYzJ0MGIzQXBPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQm5aWFJXYVdSbGIxQnNZWGxsY2tsdWMzUmhibU5sS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2QybHVaRzkzTG5acFpHVnZhbk11WjJWMFVHeGhlV1Z5Y3lncFcwRlRTVUZmUlZoUVJWSkpSVTVEUlY5TFJWbGRPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQnZiazFwYm1sUWJHRjVaWEpTWldGa2VTZ3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tFRjBkR1Z1WkdGdVkyVkRhR1ZqYTJWeUxtRnNjbVZoWkhsWFlYUmphR1ZrS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjR0YxYzJVb0tUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjR3hoZVdWeUxuQnNZWGtvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJRUYwZEdWdVpHRnVZMlZEYUdWamEyVnlMbTFoY210QmMxZGhkR05vWldRb0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibjA3WEc1Y2JtWjFibU4wYVc5dUlHMXBibWxRYkdGNVpYSklWRTFNS0NrZ2UxeHVJQ0FnSUM4dklGdFhWMTFiTnk4eU1TOHlNREUyWFNCelpXVWdZMjl0YldWdWRDQnBiaUJDUWtkc2IySmhiRTFwYm1sUWJHRjVaWElnWVdKdmRYUWdZbUl0YldsdWFTMXdiR0Y1WlhJZ1kyeGhjM05jYmlBZ0lDQnlaWFIxY200Z1lGeHVJQ0FnSUNBZ0lDQThaR2wyWEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiR0Z6Y3oxY0ltSmlMVzFwYm1sd2JHRjVaWElnWW1JdGJXbHVhUzF3YkdGNVpYSmNJbHh1SUNBZ0lDQWdJQ0FnSUNBZ1pHRjBZUzEwY21GamEyVnlMV05oZEdWbmIzSjVQVndpY21WamFYSmpYQ0pjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmhkR0V0ZEhKaFkydGxjaTFsZG1WdWRITTlYQ0pqYkdsamExd2lYRzRnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMWFJ5WVdOclpYSXRiR0ZpWld3OVhDSnRhVzVwWDNCc1lYbGxjbHdpWEc0Z0lDQWdJQ0FnSUQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKaVlpMXRhVzVwY0d4aGVXVnlYMTkyYVdSbGIxd2lQand2WkdsMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltSmlMVzFwYm1sd2JHRjVaWEpmWDJOdmJuUmxiblJjSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFlTQm9jbVZtUFZ3aWFIUjBjSE02THk5M2QzY3VZbXh2YjIxaVpYSm5MbU52TG1wd0wyeHBkbVV2WVhOcFlWd2lJR1JoZEdFdGRISmhZMnRsY2kxc1lXSmxiRDFjSW14cGRtVmZkSFpjSWlCY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVMxMGNtRmphMlZ5TFdGamRHbHZiajFjSW1Oc2FXTnJYQ0lnWTJ4aGMzTTlYQ0ppWWkxdGFXNXBjR3hoZVdWeVgxOXNhWFpsTFhSMlhDSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4emNHRnVJR05zWVhOelBWd2lZbUl0YldsdWFYQnNZWGxsY2w5ZmJHbHVhMXdpUHVPRHFlT0NwT09EbGp3dmMzQmhiajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4TDJFK1hHNGdJQ0FnSUNBZ0lDQWdJQ0E4TDJScGRqNWNiaUFnSUNBZ0lDQWdQQzloYzJsa1pUNWNiaUFnSUNCZ08xeHVmVnh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JDUWtOdmFuQk5hVzVwVUV4aGVXVnlPMXh1SWl3aUx5b2hJRXh2WVdSTmFXNXBVR3hoZVdWeUxtcHpJQ292WEc1Y2JpOHFYRzRnS2lCYlYxZGRJRnMzTHpFNEx6SXdNVFpkSUZSUFJFODZJR2gwYld3Z2FXMXdiM0owYVc1bklIUm9aU0J0YVc1cGNHeGhlV1Z5SUdseklHUmxjSEpsWTJGMFpXUXVYRzRnS2lBZ1JHVnNaWFJsSUhSb2FYTWdabWxzWlNCcGJpQjBhR1VnYm1WNGRDQnRZV3B2Y2lCMlpYSnphVzl1WEc0Z0tpOWNibHh1YVcxd2IzSjBJSEpsY1hWbGMzUWdabkp2YlNCY0lpNHVMeTR1TDNWMGFXd3ZjbVZ4ZFdWemRGd2lPMXh1YVcxd2IzSjBJRWgwYld3Z1puSnZiU0JjSWk0dUx5NHVMM1YwYVd3dlNIUnRiRndpTzF4dVhHNWpiMjV6ZENCTWIyRmtUV2x1YVZCc1lYbGxjaUE5SUh0Y2JseHVJQ0FnSUdoMGJXeEpiWEJ2Y25Rb0tTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoemRYQndiM0owYzBsdGNHOXlkSE1vS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0x5OGdXMWRYWFZzM0x6SXhMekl3TVRaZElITmxkRlJwYldWdmRYUWdkRzhnWjNWaGNtRnVkR1ZsSUdGemVXNWpYRzRnSUNBZ0lDQWdJSE5sZEZScGJXVnZkWFFvYkc5aFpFSjFibVJzWlNrN1hHNGdJQ0FnZlZ4dVhHNTlPMXh1WEc1bWRXNWpkR2x2YmlCc2IyRmtRblZ1Wkd4bEtDa2dlMXh1SUNBZ0lHTnZibk4wSUcxcGJtbHdiR0Y1WlhKTWFXNXJSV3dnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpYkdsdWExdHlaV3c5SjJsdGNHOXlkQ2RkVzJoeVpXWWtQU2N2ZG1sa1pXOHZiV2x1YVhCc1lYbGxjaTlpZFc1a2JHVW5YVndpS1R0Y2JseHVJQ0FnSUdsbUlDZ2hiV2x1YVhCc1lYbGxja3hwYm10RmJDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVnhkV1Z6ZENodGFXNXBjR3hoZVdWeVRHbHVhMFZzTG1oeVpXWXBYRzRnSUNBZ0lDQWdJQzUwYUdWdUtHWjFibU4wYVc5dUtHaDBiV3dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElIUnRjQ0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9YQ0prYVhaY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGJYQXVhVzV1WlhKSVZFMU1JRDBnYUhSdGJEdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXdlVTV2WkdWelNXNVBjbVJsY2taeWIyMG9kRzF3S1R0Y2JpQWdJQ0FnSUNBZ2ZTazdYRzU5WEc1Y2JtWjFibU4wYVc5dUlITjFjSEJ2Y25SelNXMXdiM0owY3lncElIdGNiaUFnSUNCeVpYUjFjbTRnWENKcGJYQnZjblJjSWlCcGJpQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Z3aWJHbHVhMXdpS1R0Y2JuMWNibHh1THlvZ1cxZFhYVnMzTHpJd0x6SXdNVFpkSUZKbFkzVnljMmwyWld4NUlHTnZjSGtnYm05a1pYTWdabkp2YlNCdmJtVWdibTlrWlNCMGJ5QmtiMk4xYldWdWRDNGdWMlVnYUdGMlpTQjBieUJrYnlCMGFHbHpYRzRnS2lCM1lYa2dZbVZqWVhWelpTQjBhR1VnYzJOeWFYQjBJSFJoWjNNZ2FHRjJaU0IwYnlCaVpTQnNiMkZrWldRZ2FXNGdiM0prWlhJdUlGUm9aWEpsSUhOb2IzVnNaQ0J2Ym14NUlHSmxJRE10TmlCdWIyUmxjMXh1SUNvZ2FXNGdiV2x1YVhCc1lYbGxjaUJpZFc1a2JHVWdjMjhnZEdobElIQmxjbVp2Y20xaGJtTmxJR052YzNRZ2MyaHZkV3hrSUdKbElISmxiR0YwYVhabGJIa2diRzkzTGlCWFpTQjNZVzUwSUhSdklITjBiM0JjYmlBcUlHaDBiV3dnYVcxd2IzSjBhVzVuSUhSb1pTQnRhVzVwSUhCc1lYbGxjaUJpZFc1a2JHVWdZWE1nYzI5dmJpQmhjeUJ3YjNOemFXSnNaU0JoYm1RZ1pHVnNaWFJsSUhSb2FYTWdZMjlrWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTI5d2VVNXZaR1Z6U1c1UGNtUmxja1p5YjIwb2JtOWtaU2tnZTF4dUlDQWdJR2xtSUNnaGJtOWtaUzVtYVhKemRFTm9hV3hrS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JqYjI1emRDQm1hWEp6ZEVOb2FXeGtJRDBnYm05a1pTNXlaVzF2ZG1WRGFHbHNaQ2h1YjJSbExtWnBjbk4wUTJocGJHUXBPMXh1WEc0Z0lDQWdhV1lnS0dacGNuTjBRMmhwYkdRdWRHRm5UbUZ0WlNBaFBUMGdYQ0pUUTFKSlVGUmNJaWtnZTF4dUlDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aWIyUjVMbUZ3Y0dWdVpFTm9hV3hrS0dacGNuTjBRMmhwYkdRdVkyeHZibVZPYjJSbEtDa3BPMXh1SUNBZ0lDQWdJQ0JqYjNCNVRtOWtaWE5KYms5eVpHVnlSbkp2YlNodWIyUmxLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHTnZibk4wSUdoaGMwUmhkR0ZGZUdOc2RXUmxJRDBnWm1seWMzUkRhR2xzWkM1blpYUkJkSFJ5YVdKMWRHVW9YQ0prWVhSaExXVjRZMngxWkdWY0lpazdYRzRnSUNBZ2JHVjBJSE5qY21sd2RDQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSnpZM0pwY0hSY0lpazdYRzVjYmlBZ0lDQnpZM0pwY0hRdWRIbHdaU0E5SUZ3aWRHVjRkQzlxWVhaaGMyTnlhWEIwWENJN1hHNGdJQ0FnYzJOeWFYQjBMbk55WXlBOUlHWnBjbk4wUTJocGJHUXVjM0pqTzF4dVhHNGdJQ0FnYVdZZ0tHaGhjMFJoZEdGRmVHTnNkV1JsS1NCN1hHNGdJQ0FnSUNBZ0lITmpjbWx3ZEM1elpYUkJkSFJ5YVdKMWRHVW9YQ0prWVhSaExXVjRZMngxWkdWY0lpd2dkSEoxWlNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnU0hSdGJDNTBiMmRuYkdWQmRIUnlhV0oxZEdVb2MyTnlhWEIwTENCY0ltRnplVzVqWENJc0lHWnBjbk4wUTJocGJHUXVhR0Z6UVhSMGNtbGlkWFJsS0Z3aVlYTjVibU5jSWlrcE8xeHVYRzRnSUNBZ0x5b2dXMWRYWFZzM0x6SXdMekl3TVRaZElHSnNiMk5ySUdGa1pHbHVaeUJ0YjNKbElHNXZaR1Z6SUhWdWRHbHNJSE5qY21sd2RDQmpiMjFsY3lCaVlXTnJJSE4xWTJObGMzTm1kV3hzZVM1Y2JpQWdJQ0FnS2lCVWFHbHpJR2x6SUhOaFptVWdkRzhnWkc4Z2QybDBhRzkxZENCaElHSmhZMnQxY0NCbWIzSWdabUZwYkhWeVpTQmlaV05oZFhObElHbG1JR0p3YkdGNVpYSWdjMk55YVhCMElHWmhhV3h6WEc0Z0lDQWdJQ29nWW1WbWIzSmxJRzFwYm1sd2JHRjVaWElnYzJOeWFYQjBMQ0J0YVc1cGNHeGhlV1Z5SUhOamNtbHdkQ0IzYjNWc1pDQm1ZV2xzSUdGdWVYZGhlVnh1SUNBZ0lDQXFMMXh1SUNBZ0lITmpjbWx3ZEM1dmJteHZZV1FnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdZMjl3ZVU1dlpHVnpTVzVQY21SbGNrWnliMjBvYm05a1pTazdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lHUnZZM1Z0Wlc1MExtSnZaSGt1WVhCd1pXNWtRMmhwYkdRb2MyTnlhWEIwS1R0Y2JseHVJQ0FnSUhOamNtbHdkQ0E5SUc1MWJHdzdYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUV4dllXUk5hVzVwVUd4aGVXVnlPMXh1SWl3aVkyOXVjM1FnVUVWU1UwbFRWRVZPUTBWZlRVOUVSVjlOUVZBZ1BTQjdYRzRnSUNBZ1hDSnBibVJsZUZ3aU9pQm1iM0pKYm1SbGVGQmhaMlVzWEc0Z0lDQWdYQ0pqYjI1MFpXNTBYQ0k2SUdadmNrTnZiblJsYm5SUVlXZGxMRnh1SUNBZ0lGd2lZblZ6YVc1bGMzTXRhRzl0WlZ3aU9pQm1iM0pDZFhOcGJtVnpjMGh2YldWd1lXZGxYRzU5TzF4dVhHNWpiMjV6ZENCUVJWSlRTVk5VWDAxUFJFVWdQU0JjSW1SaGRHRXRjR1Z5YzJsemRDMW1iM0pjSWp0Y2JtTnZibk4wSUZCRlVsTkpVMVJmUTB4QlUxTWdQU0JjSW5CbGNuTnBjM1F0Ym1GMlhDSTdYRzVqYjI1emRDQklTVVJGWDBOTVFWTlRJRDBnWENKb2FXUmxMVzVoZGx3aU8xeHVZMjl1YzNRZ1RVOUVSU0E5SUZ3aVpHRjBZUzF0YjJSbFhDSTdYRzVjYm14bGRDQnNZWE4wUzI1dmQyNVRZM0p2Ykd4UWIzTnBkR2x2Ymp0Y2JteGxkQ0J3Y21WMmFXOTFjMng1VlhObFpGTmpjbTlzYkZCdmMybDBhVzl1TzF4dWJHVjBJSEJ5YjJObGMzTnBibWM3WEc1Y2JpOHFLbHh1SUNvZ1FXUmtJSFJvWlNCamIzSnlaV04wSUhOamNtOXNiQ0JvWVc1a2JHVnlJR1p2Y2lCMGFHVWdZM1Z5Y21WdWRDQnpkR0YwWlNCdlppQjBhR1VnYm1GMlhHNGdLaTljYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVJSEJsY25OcGMzUkdiM0pEZFhKeVpXNTBVM1JoZEdVb0tTQjdYRzRnSUNBZ1kyOXVjM1FnWTNWeWNtVnVkRkJsY25OcGMzUmxibU5sVFc5a1pTQTlJR0ppVG1GMlJXd29LUzVuWlhSQmRIUnlhV0oxZEdVb1VFVlNVMGxUVkY5TlQwUkZLVHRjYmx4dUlDQWdJR052Ym5OMElIQmxjbk5wYzNSbGJtTmxUV1YwYUc5a0lEMGdVRVZTVTBsVFZFVk9RMFZmVFU5RVJWOU5RVkJiWTNWeWNtVnVkRkJsY25OcGMzUmxibU5sVFc5a1pWMDdYRzRnSUNBZ1kyOXVjM1FnYm1WM1UyTnliMnhzU0dGdVpHeGxjaUE5SUdkbGJtVnlZWFJsVG1WM1UyTnliMnhzU0dGdVpHeGxjaWh3WlhKemFYTjBaVzVqWlUxbGRHaHZaQ3dnWTNWeWNtVnVkRkJsY25OcGMzUmxibU5sVFc5a1pTazdYRzVjYmlBZ0lDQjNhVzVrYjNjdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0luTmpjbTlzYkZ3aUxDQnVaWGRUWTNKdmJHeElZVzVrYkdWeUtUdGNibjFjYmx4dUx5b3FYRzRnS2lCdVlYWWdaV3hsYldWdWRGeHVJQ29nUUhKbGRIVnliaUI3UkU5TklFVnNaVzFsYm5SOVhHNGdLaTljYm1aMWJtTjBhVzl1SUdKaVRtRjJSV3dvS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2lZbUl0Ym1GMlhDSXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnZiblJoYVc1bGNpQndZWEpsYm5RZ1ptOXlJR0ppTG01aGRseHVJQ29nUUhKbGRIVnliaUI3UkU5TklFVnNaVzFsYm5SOVhHNGdLaTljYm1aMWJtTjBhVzl1SUc1aGRsQmhjbVZ1ZEVWc0tDa2dlMXh1SUNBZ0lHTnZibk4wSUc1aGRsSnZiM1FnUFNCdVlYWlNiMjkwUld3b0tUdGNiaUFnSUNCeVpYUjFjbTRnYm1GMlVtOXZkQzV3WVhKbGJuUk9iMlJsTG1Ob2FXeGtjbVZ1TG14bGJtZDBhQ0E5UFQwZ01TQS9JRzVoZGxKdmIzUXVjR0Z5Wlc1MFRtOWtaU0E2SUc1aGRsSnZiM1E3WEc1OVhHNWNiaThxS2x4dUlDb2dZbUl0Ym1GMkxYSnZiM1FnWkc5dElHVnNaVzFsYm5SY2JpQXFJRUJ5WlhSMWNtNGdlMFJQVFNCRmJHVnRaVzUwZlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJ1WVhaU2IyOTBSV3dvS1NCN1hHNGdJQ0FnY21WMGRYSnVJR0ppVG1GMlJXd29LUzV3WVhKbGJuUk9iMlJsTzF4dWZWeHVYRzR2S2lwY2JpQXFJRWRsYm1WeVlYUmxJSFJvWlNCdVpYY2djMk55YjJ4c0lHaGhibVJzWlhJZ2RHOGdZbVVnWVdSa1pXUWdkRzhnZEdobElIZHBibVJ2ZDF4dUlDb2dRSEJoY21GdElDQjdablZ1WTNScGIyNTlJRzVsZDFOamNtOXNiRWhoYm1Sc1pYSmNiaUFxSUVCd1lYSmhiU0FnZTFOMGNtbHVaMzBnWTNWeWNtVnVkRkJsY25OcGMzUmxibU5sVFc5a1pWeHVJQ29nUUhKbGRIVnliaUI3Wm5WdVkzUnBiMjU5WEc0Z0tpOWNibVoxYm1OMGFXOXVJR2RsYm1WeVlYUmxUbVYzVTJOeWIyeHNTR0Z1Wkd4bGNpaHVaWGRUWTNKdmJHeElZVzVrYkdWeUxDQmpkWEp5Wlc1MFVHVnljMmx6ZEdWdVkyVk5iMlJsS1NCN1hHNGdJQ0FnWm5WdVkzUnBiMjRnYm1GMlUyTnliMnhzVEdsemRHVnVaWElvS1NCN1hHNGdJQ0FnSUNBZ0lHeGhjM1JMYm05M2JsTmpjbTlzYkZCdmMybDBhVzl1SUQwZ2QybHVaRzkzTG5OamNtOXNiRmtnZkh3Z1pHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTG5OamNtOXNiRlJ2Y0R0Y2JseHVJQ0FnSUNBZ0lDQmpiMjV6ZENCc1lYUmxjM1JRWlhKemFYTjBaVzVqWlUxdlpHVWdQU0JpWWs1aGRrVnNLQ2t1WjJWMFFYUjBjbWxpZFhSbEtGQkZVbE5KVTFSZlRVOUVSU2s3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLR3hoZEdWemRGQmxjbk5wYzNSbGJtTmxUVzlrWlNBaFBUMGdZM1Z5Y21WdWRGQmxjbk5wYzNSbGJtTmxUVzlrWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZDJsdVpHOTNMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvWENKelkzSnZiR3hjSWl3Z2JtRjJVMk55YjJ4c1RHbHpkR1Z1WlhJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEJsY25OcGMzUkdiM0pEZFhKeVpXNTBVM1JoZEdVb1ltSk9ZWFpGYkNncEtUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdsbUlDZ2hjSEp2WTJWemMybHVaeUFtSmlCdVpYZFRZM0p2Ykd4SVlXNWtiR1Z5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IzYVc1a2IzY3VjbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsS0NncElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1WlhkVFkzSnZiR3hJWVc1a2JHVnlLR3hoYzNSTGJtOTNibE5qY205c2JGQnZjMmwwYVc5dUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndjbTlqWlhOemFXNW5JRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUhCeWIyTmxjM05wYm1jZ1BTQjBjblZsTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNodVpYZFRZM0p2Ykd4SVlXNWtiR1Z5S1NCN1hHNGdJQ0FnSUNBZ0lHNWxkMU5qY205c2JFaGhibVJzWlhJb2JHRnpkRXR1YjNkdVUyTnliMnhzVUc5emFYUnBiMjRwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQnVZWFpUWTNKdmJHeE1hWE4wWlc1bGNqdGNibjFjYmx4dUx5b3FYRzRnS2lCVGRHbGphM2tnYm1GMklHSmxhR0YyYVc5eUlHWnZjaUJpWW1sNklHaHZiV1Z3WVdkbFhHNGdLaUJBY0dGeVlXMGdJSHRPZFcxaVpYSjlJSE5qY205c2JGQnZjMmwwYVc5dVhHNGdLaTljYm1aMWJtTjBhVzl1SUdadmNrSjFjMmx1WlhOelNHOXRaWEJoWjJVb2MyTnliMnhzVUc5emFYUnBiMjRwSUh0Y2JpQWdJQ0JqYjI1emRDQjdJSE5qY205c2JFTm9ZVzVuWlN3Z1ltOTBkRzl0VDJaT1lYWWdmU0E5SUdOaGJHTjFiR0YwWlZOamNtOXNiRkJ2YVc1MGN5aHpZM0p2Ykd4UWIzTnBkR2x2YmlrN1hHNGdJQ0FnWTI5dWMzUWdkMmhsYmxSdlUzUnZjRk4wYVdOcmFXNW5JRDBnWW05MGRHOXRUMlpPWVhZZ0xTQnVZWFpTYjI5MFJXd29LUzV2Wm1aelpYUklaV2xuYUhRN1hHNWNiaUFnSUNCamIyNXpkQ0JrYVdST2IzUk5iM1psSUQwZ2MyTnliMnhzUTJoaGJtZGxJRDA5UFNBd08xeHVJQ0FnSUdOdmJuTjBJR2x6VTJOeWIyeHNhVzVuVlhBZ1BTQnpZM0p2Ykd4RGFHRnVaMlVnUENBd08xeHVJQ0FnSUdOdmJuTjBJR0psYkc5M1UzUnBZMnRwYm1kUWIybHVkQ0E5SUhOamNtOXNiRkJ2YzJsMGFXOXVJRDRnZDJobGJsUnZVM1J2Y0ZOMGFXTnJhVzVuTzF4dUlDQWdJR052Ym5OMElHRmliM1psVTNScFkydHBibWRRYjJsdWRDQTlJSE5qY205c2JGQnZjMmwwYVc5dUlEdzlJSGRvWlc1VWIxTjBiM0JUZEdsamEybHVaenRjYmx4dUlDQWdJR2xtSUNoa2FXUk9iM1JOYjNabEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9hWE5UWTNKdmJHeHBibWRWY0NBbUppQmlaV3h2ZDFOMGFXTnJhVzVuVUc5cGJuUXBJSHRjYmlBZ0lDQWdJQ0FnYzNScFkydElaV0ZrWlhJb1ltSk9ZWFpGYkNncEtUdGNiaUFnSUNBZ0lDQWdZbUpPWVhaRmJDZ3BMbk5sZEVGMGRISnBZblYwWlNoTlQwUkZMQ0JjSW1sdVpHVjRYQ0lwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0dselUyTnliMnhzYVc1blZYQWdKaVlnWVdKdmRtVlRkR2xqYTJsdVoxQnZhVzUwS1NCN1hHNGdJQ0FnSUNBZ0lHSmlUbUYyUld3b0tTNXpaWFJCZEhSeWFXSjFkR1VvVFU5RVJTd2dYQ0ppZFhOcGJtVnpjeTFvYjIxbFhDSXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lIVnVjM1JwWTJ0SVpXRmtaWElvS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJUZEdsamEza2dibUYySUdKbGFHRjJhVzl5SUdadmNpQnBibVJsZUNCd1lXZGxYRzRnS2lCQWNHRnlZVzBnSUh0T2RXMWlaWEo5SUhOamNtOXNiRkJ2YzJsMGFXOXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHWnZja2x1WkdWNFVHRm5aU2h6WTNKdmJHeFFiM05wZEdsdmJpa2dlMXh1SUNBZ0lHTnZibk4wSUhzZ2MyTnliMnhzUTJoaGJtZGxMQ0JpYjNSMGIyMVBaazVoZGlCOUlEMGdZMkZzWTNWc1lYUmxVMk55YjJ4c1VHOXBiblJ6S0hOamNtOXNiRkJ2YzJsMGFXOXVLVHRjYmlBZ0lDQmpiMjV6ZENCM2FHVnVWRzlUZEc5d1UzUnBZMnRwYm1jZ1BTQmliM1IwYjIxUFprNWhkaUF0SUc1aGRsSnZiM1JGYkNncExtOW1abk5sZEVobGFXZG9kRHRjYmx4dUlDQWdJR052Ym5OMElHUnBaRTV2ZEUxdmRtVWdQU0J6WTNKdmJHeERhR0Z1WjJVZ1BUMDlJREE3WEc0Z0lDQWdZMjl1YzNRZ2FYTlRZM0p2Ykd4cGJtZFZjQ0E5SUhOamNtOXNiRU5vWVc1blpTQThJREE3WEc0Z0lDQWdZMjl1YzNRZ1ltVnNiM2RUZEdsamEybHVaMUJ2YVc1MElEMGdjMk55YjJ4c1VHOXphWFJwYjI0Z1BpQjNhR1Z1Vkc5VGRHOXdVM1JwWTJ0cGJtYzdYRzRnSUNBZ1kyOXVjM1FnWVdKdmRtVlRkR2xqYTJsdVoxQnZhVzUwSUQwZ2MyTnliMnhzVUc5emFYUnBiMjRnUEQwZ2QyaGxibFJ2VTNSdmNGTjBhV05yYVc1bk8xeHVYRzRnSUNBZ2FXWWdLR1JwWkU1dmRFMXZkbVVwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNocGMxTmpjbTlzYkdsdVoxVndJQ1ltSUdKbGJHOTNVM1JwWTJ0cGJtZFFiMmx1ZENrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2MzUnBZMnRJWldGa1pYSW9LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWVdKdmRtVlRkR2xqYTJsdVoxQnZhVzUwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMWJuTjBhV05yU0dWaFpHVnlLQ2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlHaHBaR1ZJWldGa1pYSW9LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlRkR2xqYTNrZ2JtRjJJR0psYUdGMmFXOXlJR1p2Y2lCamIyNTBaVzUwSUhCaFoyVnpYRzRnS2lCQWNHRnlZVzBnSUh0T2RXMWlaWEo5SUhOamNtOXNiRkJ2YzJsMGFXOXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHWnZja052Ym5SbGJuUlFZV2RsS0hOamNtOXNiRkJ2YzJsMGFXOXVLU0I3WEc0Z0lDQWdZMjl1YzNRZ2V5QnpZM0p2Ykd4RGFHRnVaMlVzSUdKdmRIUnZiVTltVG1GMklIMGdQU0JqWVd4amRXeGhkR1ZUWTNKdmJHeFFiMmx1ZEhNb2MyTnliMnhzVUc5emFYUnBiMjRwTzF4dUlDQWdJR052Ym5OMElIZG9aVzVVYjFOMGFXTnJJRDBnWW05MGRHOXRUMlpPWVhZN1hHNWNiaUFnSUNCamIyNXpkQ0JrYVdST2IzUk5iM1psSUQwZ2MyTnliMnhzUTJoaGJtZGxJRDA5UFNBd08xeHVJQ0FnSUdOdmJuTjBJR0psYkc5M1YyaGxibFJ2VTNScFkyc2dQU0J6WTNKdmJHeFFiM05wZEdsdmJpQStJSGRvWlc1VWIxTjBhV05yTzF4dUlDQWdJR052Ym5OMElHRmliM1psVjJobGJsUnZVM1JwWTJzZ1BTQnpZM0p2Ykd4UWIzTnBkR2x2YmlBOFBTQjNhR1Z1Vkc5VGRHbGphenRjYmx4dUlDQWdJR2xtSUNoa2FXUk9iM1JOYjNabEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9ZbVZzYjNkWGFHVnVWRzlUZEdsamF5a2dlMXh1SUNBZ0lDQWdJQ0J6ZEdsamEwaGxZV1JsY2lncE8xeHVJQ0FnSUNBZ0lDQmlZazVoZGtWc0tDa3VjMlYwUVhSMGNtbGlkWFJsS0UxUFJFVXNJRndpWTI5dWRHVnVkRndpS1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNoaFltOTJaVmRvWlc1VWIxTjBhV05yS1NCN1hHNGdJQ0FnSUNBZ0lIVnVjM1JwWTJ0SVpXRmtaWElvS1R0Y2JpQWdJQ0FnSUNBZ1ltSk9ZWFpGYkNncExuTmxkRUYwZEhKcFluVjBaU2hOVDBSRkxDQmNJbWx1WkdWNFhDSXBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUdOaGJHTjFiR0YwWlNCelkzSnZiR3dnWTJoaGJtZGxJR0Z1WkNCaWIzUjBiMjBnYjJZZ2JtRjJJR1p2Y2lCbmFYWmxiaUJ6WTNKdmJHeFFiM05wZEdsdmJseHVJQ29nUUhCaGNtRnRJQ0I3VG5WdFltVnlmU0J6WTNKdmJHeFFiM05wZEdsdmJseHVJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBmU0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkSFZ3YkdVZ2IyWWdjMk55YjJ4c1EyaGhibWRsTENCaWIzUjBiMjFQWms1aGRseHVJQ292WEc1bWRXNWpkR2x2YmlCallXeGpkV3hoZEdWVFkzSnZiR3hRYjJsdWRITW9jMk55YjJ4c1VHOXphWFJwYjI0cElIdGNiaUFnSUNCamIyNXpkQ0J6WTNKdmJHeERhR0Z1WjJVZ1BTQnpZM0p2Ykd4UWIzTnBkR2x2YmlBdElIQnlaWFpwYjNWemJIbFZjMlZrVTJOeWIyeHNVRzl6YVhScGIyNDdYRzRnSUNBZ1kyOXVjM1FnWW05MGRHOXRUMlpPWVhZZ1BTQnVZWFpRWVhKbGJuUkZiQ2dwTG1kbGRFSnZkVzVrYVc1blEyeHBaVzUwVW1WamRDZ3BMbUp2ZEhSdmJTQXJJSE5qY205c2JGQnZjMmwwYVc5dU8xeHVJQ0FnSUhCeVpYWnBiM1Z6YkhsVmMyVmtVMk55YjJ4c1VHOXphWFJwYjI0Z1BTQnpZM0p2Ykd4UWIzTnBkR2x2Ymp0Y2JseHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhOamNtOXNiRU5vWVc1blpTeGNiaUFnSUNBZ0lDQWdZbTkwZEc5dFQyWk9ZWFpjYmlBZ0lDQjlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhiSEpsWVdSNVVHVnljMmx6ZEdsdVp5Z3BJSHRjYmlBZ0lDQnlaWFIxY200Z2JtRjJVbTl2ZEVWc0tDa3VZMnhoYzNOTWFYTjBMbU52Ym5SaGFXNXpLRkJGVWxOSlUxUmZRMHhCVTFNcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVGa1pDQndaWEp6YVhOMGFXNW5JR05zWVhOeklIUnZJRzVoZGxKdmIzUmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2MzUnBZMnRJWldGa1pYSW9LU0I3WEc0Z0lDQWdhV1lnS0dGc2NtVmhaSGxRWlhKemFYTjBhVzVuS0NrcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdOdmJuTjBJRzVoZGxKdmIzUWdQU0J1WVhaU2IyOTBSV3dvS1R0Y2JseHVJQ0FnSUc1aGRsSnZiM1F1WTJ4aGMzTk1hWE4wTG1Ga1pDaFFSVkpUU1ZOVVgwTk1RVk5US1R0Y2JpQWdJQ0J1WVhaU2IyOTBMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9TRWxFUlY5RFRFRlRVeWs3WEc1OVhHNWNiaThxS2x4dUlDb2dVbVZ0YjNabElIQmxjbk5wZEdsdVp5QmpiR0Z6Y3lCbWNtOXRJRzVoZGxKdmIzUmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2RXNXpkR2xqYTBobFlXUmxjaWdwSUh0Y2JpQWdJQ0JwWmlBb0lXRnNjbVZoWkhsUVpYSnphWE4wYVc1bktDa3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHTnZibk4wSUc1aGRsSnZiM1FnUFNCdVlYWlNiMjkwUld3b0tUdGNibHh1SUNBZ0lHNWhkbEp2YjNRdVkyeGhjM05NYVhOMExuSmxiVzkyWlNoUVJWSlRTVk5VWDBOTVFWTlRLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlNaVzF2ZG1VZ2NHVnljMmx6ZEdsdVp5QmpiR0Z6Y3lCaGJtUWdZV1JrSUdocFpHVWdZMnhoYzNNZ2RHOGdibUYyVW05dmRGeHVJQ292WEc1bWRXNWpkR2x2YmlCb2FXUmxTR1ZoWkdWeUtDa2dlMXh1WEc0Z0lDQWdhV1lnS0NGaGJISmxZV1I1VUdWeWMybHpkR2x1WnlncEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCamIyNXpkQ0J1WVhaU2IyOTBJRDBnYm1GMlVtOXZkRVZzS0NrN1hHNWNiaUFnSUNCdVlYWlNiMjkwTG1Oc1lYTnpUR2x6ZEM1aFpHUW9TRWxFUlY5RFRFRlRVeWs3WEc0Z0lDQWdibUYyVW05dmRDNWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtGQkZVbE5KVTFSZlEweEJVMU1wTzF4dWZWeHVJaXdpTHk4Z1cxZFhYVnMzTHpJeEx6SXdNVFpkSUdaeWIyMGdhSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZRVkJKTDBOMWMzUnZiVVYyWlc1MEwwTjFjM1J2YlVWMlpXNTBYRzRvWm5WdVkzUnBiMjRvS1NCN1hHNWNiaUFnSUNCcFppQW9kSGx3Wlc5bUlIZHBibVJ2ZHk1RGRYTjBiMjFGZG1WdWRDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJEZFhOMGIyMUZkbVZ1ZENobGRtVnVkQ3dnY0dGeVlXMXpLU0I3WEc0Z0lDQWdJQ0FnSUhCaGNtRnRjeUE5SUhCaGNtRnRjeUI4ZkNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JpZFdKaWJHVnpPaUJtWVd4elpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGJtTmxiR0ZpYkdVNklHWmhiSE5sTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdaR1YwWVdsc09pQjFibVJsWm1sdVpXUmNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdaWFowSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUlhabGJuUW9YQ0pEZFhOMGIyMUZkbVZ1ZEZ3aUtUdGNiaUFnSUNBZ0lDQWdaWFowTG1sdWFYUkRkWE4wYjIxRmRtVnVkQ2hsZG1WdWRDd2djR0Z5WVcxekxtSjFZbUpzWlhNc0lIQmhjbUZ0Y3k1allXNWpaV3hoWW14bExDQndZWEpoYlhNdVpHVjBZV2xzS1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdWMmREdGNiaUFnSUNCOVhHNWNiaUFnSUNCRGRYTjBiMjFGZG1WdWRDNXdjbTkwYjNSNWNHVWdQU0IzYVc1a2IzY3VSWFpsYm5RdWNISnZkRzkwZVhCbE8xeHVYRzRnSUNBZ2QybHVaRzkzTGtOMWMzUnZiVVYyWlc1MElEMGdRM1Z6ZEc5dFJYWmxiblE3WEc1OUtTZ3BPMXh1SWl3aUx5b2hJSEJ2YkhsbWFXeHNjeTl2WW1wbFkzUXZZWE56YVdkdUxtcHpJQ292WEc1Y2JtbHRjRzl5ZENCZllYTnphV2R1SUdaeWIyMGdYQ0pqYjNKbExXcHpMMnhwWW5KaGNua3ZabTR2YjJKcVpXTjBMMkZ6YzJsbmJsd2lPMXh1WEc1UFltcGxZM1F1WVhOemFXZHVJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpQS9JRTlpYW1WamRDNWhjM05wWjI0Z09pQmZZWE56YVdkdU8xeHVJaXdpTHlvaElHSmlMV052YW5BdGJtRjJMbXB6SUNvdlhHNWNibWx0Y0c5eWRDQnZia05zYVdOcklHWnliMjBnWENJdUxpOHVMaTkxZEdsc0wyOXVRMnhwWTJ0Y0lqdGNibWx0Y0c5eWRDQnRZWFJqYUdWeklHWnliMjBnWENJdUxpOHVMaTkxZEdsc0wyMWhkR05vWlhOY0lqdGNibWx0Y0c5eWRDQmtiMk4xYldWdWRGSmxZV1I1SUdaeWIyMGdYQ0l1TGk4dUxpOTFkR2xzTDJSdlkzVnRaVzUwVW1WaFpIbGNJanRjYmx4dWFXMXdiM0owSUU1aGRsTjBZWFJsSUdaeWIyMGdYQ0l1TGk4dUxpOXpkR0YwWlM5T1lYWlRkR0YwWlZ3aU8xeHVhVzF3YjNKMElFNWhkaUJtY205dElGd2lMaTR2TGk0dmJXOWtkV3hsY3k5dVlYWnBaMkYwYVc5dUwwNWhkbHdpTzF4dWFXMXdiM0owSUVkdmIyZHNaVk5sWVhKamFDQm1jbTl0SUZ3aUxpNHZMaTR2Ylc5a2RXeGxjeTl6WldGeVkyZ3ZSMjl2WjJ4bFUyVmhjbU5vWENJN1hHNXBiWEJ2Y25RZ1JYWmxiblJ6SUdaeWIyMGdYQ0l1TGk4dUxpOWxkbVZ1ZEhNdlJYWmxiblJ6WENJN1hHNXBiWEJ2Y25RZ1RHOWhaRTFwYm1sUWJHRjVaWElnWm5KdmJTQmNJaTR1THk0dUwyMXZaSFZzWlhNdmRtbGtaVzh2VEc5aFpFMXBibWxRYkdGNVpYSmNJanRjYm1sdGNHOXlkQ0JDUWtOdmFuQk5hVzVwVUd4aGVXVnlJR1p5YjIwZ1hDSXVMaTh1TGk5dGIyUjFiR1Z6TDNacFpHVnZMMEpDUTI5cWNFMXBibWxRYkdGNVpYSmNJanRjYm1sdGNHOXlkQ0JTWldkVlNVTnNhV1Z1ZENCbWNtOXRJRndpY21WbkxYVnBMV05zYVdWdWRGd2lPMXh1WEc1amIyNXpkQ0JUUlVGU1EwaGZTVU5QVGw5VFJVeEZRMVJQVWlBOUlGd2lMbUppTFc1aGRpMXpaV0Z5WTJoZlgybGpiMjVjSWp0Y2JseHVaRzlqZFcxbGJuUlNaV0ZrZVNobWRXNWpkR2x2YmlncElIdGNiaUFnSUNCamIyNXpkQ0JpWWs1aGRrVnNJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9YQ0ppWWkxdVlYWmNJaWs3WEc0Z0lDQWdiR1YwSUdOdmFuQk5hVzVwVUd4aGVXVnlPMXh1WEc0Z0lDQWdhV1lnS0NGaVlrNWhka1ZzS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWlhKcFpubFZjMlZ5U1c1bWJ5aGlZazVoZGtWc0tUdGNibHh1SUNBZ0lFNWhkaTVrWldaaGRXeDBSblZ1WTNScGIyNWhiR2wwZVNoaVlrNWhka1ZzS1R0Y2JseHVJQ0FnSUdKaVRtRjJSV3d1YzJodmQwMXBibWxRYkdGNVpYSWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0ZqYjJwd1RXbHVhVkJzWVhsbGNpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXFjRTFwYm1sUWJHRjVaWElnUFNCQ1FrTnZhbkJOYVc1cFVHeGhlV1Z5TG1GamRHbDJZWFJsS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCamIycHdUV2x1YVZCc1lYbGxjaTV6YUc5M0tDazdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lHSmlUbUYyUld3dWFHbGtaVTFwYm1sUWJHRjVaWElnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdhV1lnS0NGamIycHdUV2x1YVZCc1lYbGxjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnWTI5cWNFMXBibWxRYkdGNVpYSXVhR2xrWlNncE8xeHVJQ0FnSUgwN1hHNWNiaUFnSUNCaVlrNWhka1ZzTG5CaGRYTmxUV2x1YVZCc1lYbGxjaUE5SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvSVdOdmFuQk5hVzVwVUd4aGVXVnlLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JqYjJwd1RXbHVhVkJzWVhsbGNpNXdZWFZ6WlNncE8xeHVJQ0FnSUgwN1hHNWNiaUFnSUNCdmJrTnNhV05yS0dKaVRtRjJSV3dzSUdaMWJtTjBhVzl1S0dWMlpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJSHNnZEdGeVoyVjBJSDBnUFNCbGRtVnVkRHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9iV0YwWTJobGN5aDBZWEpuWlhRc0lGTkZRVkpEU0Y5SlEwOU9YMU5GVEVWRFZFOVNLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhR0Z1Wkd4bFEyeHBZMnRUWldGeVkyaEpZMjl1S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJSDBwTzF4dVhHNGdJQ0FnWW1KT1lYWkZiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpYlc5MWMyVnZkbVZ5WENJc0lHeHZZV1JIYjI5bmJHVlRaV0Z5WTJncE8xeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2JHOWhaRWR2YjJkc1pWTmxZWEpqYUNoN0lIUmhjbWRsZENCOUtTQjdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tHMWhkR05vWlhNb2RHRnlaMlYwTENCVFJVRlNRMGhmU1VOUFRsOVRSVXhGUTFSUFVpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFZHZiMmRzWlZObFlYSmphQzVzYjJGa0tDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCaVlrNWhka1ZzTG5KbGJXOTJaVVYyWlc1MFRHbHpkR1Z1WlhJb1hDSnRiM1Z6Wlc5MlpYSmNJaXdnYkc5aFpFZHZiMmRzWlZObFlYSmphQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lIMWNibHh1SUNBZ0lHWjFibU4wYVc5dUlHaGhibVJzWlVOc2FXTnJVMlZoY21Ob1NXTnZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWTNWeWNtVnVkRk5sWVhKamFFMXZaR1VnUFNCaVlrNWhka1ZzTG1kbGRFRjBkSEpwWW5WMFpTaGNJbVJoZEdFdGMyVmhjbU5vTFcxdlpHVmNJaWtnUFQwOUlGd2lkSEoxWlZ3aU8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCdVpYZFRaV0Z5WTJoTmIyUmxJRDBnSVdOMWNuSmxiblJUWldGeVkyaE5iMlJsTzF4dVhHNGdJQ0FnSUNBZ0lHSmlUbUYyUld3dWMyVjBRWFIwY21saWRYUmxLRndpWkdGMFlTMXpaV0Z5WTJndGJXOWtaVndpTENCdVpYZFRaV0Z5WTJoTmIyUmxLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9ibVYzVTJWaGNtTm9UVzlrWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnVG1GMlUzUmhkR1V1YzJWMFJtOWpkWE1vWENKelpXRnlZMmhjSWl3Z1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbUpPWVhaRmJDNXpaWFJCZEhSeWFXSjFkR1VvWENKa1lYUmhMWE5sWVhKamFDMXRiMlJsWENJc0lHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCT1lYWlRkR0YwWlM1MWJtWnZZM1Z6S0NrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnWm5WdVkzUnBiMjRnZG1WeWFXWjVWWE5sY2tsdVptOG9ZbUpPWVhaRmJDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQmxiblpwY205dWJXVnVkQ0E5SUdKaVRtRjJSV3d1WjJWMFFYUjBjbWxpZFhSbEtGd2laR0YwWVMxeVpXY3RaVzUyWENJcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVdWdWRtbHliMjV0Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQnVaWGNnVW1WblZVbERiR2xsYm5Rb2JuVnNiQ3dnZXlCbGJuWnBjbTl1YldWdWRDQjlLUzUyWlhKcFpubFRhV2R1U1c1VGRHRjBkWE1vS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JGZG1WdWRITXVaVzFwZEZKbFlXUjVSWFpsYm5Rb0tUdGNibHh1SUNBZ0lFeHZZV1JOYVc1cFVHeGhlV1Z5TG1oMGJXeEpiWEJ2Y25Rb0tUdGNibjBwTzF4dUlpd2lMeW9oSUU1aGRsTjBZWFJsTG1weklDb3ZYRzVjYm1OdmJuTjBJRXRGV1ZOZlYwVmZRMEZTUlY5QlFrOVZWQ0E5SUZ0Y2JpQWdJQ0JjSW1KaGMyVmNJaXhjYmlBZ0lDQmNJbkJ5YjJkeVpYTnpYQ0lzWEc0Z0lDQWdYQ0p6YVhSbFhDSXNYRzRnSUNBZ1hDSm9aV0ZrYkdsdVpWd2lMRnh1SUNBZ0lGd2liVzlrWlZ3aUxGeHVJQ0FnSUZ3aWRHaGxiV1ZjSWl4Y2JpQWdJQ0JjSW5WelpYSXRZMjkxYm5SeWVWd2lMRnh1SUNBZ0lGd2lkWE5sY2kxeVpXZHBiMjVjSWx4dVhUdGNibHh1YkdWMElHWnZZM1Z6SUQwZ2JuVnNiRHRjYm14bGRDQm1iMk4xYzBOc2IzTmxjaUE5SUc1MWJHdzdYRzVzWlhRZ2MzUmhkR1VnUFNCdWRXeHNPMXh1YkdWMElHTm9ZVzVuWlVoaGJtUnNaWEp6SUQwZ2JuVnNiRHRjYmx4dVkyOXVjM1FnVG1GMlUzUmhkR1VnUFNCN1hHNWNiaUFnSUNCcGJtbDBhV0ZzYVhwbEtHSmlUbUYyUld3c0lHaGhibVJzWlhKektTQjdYRzRnSUNBZ0lDQWdJSE4wWVhSbElEMGdhVzVwZEdsaGJGTjBZWFJsUm5KdmJVUlBUU2hpWWs1aGRrVnNLVHRjYmlBZ0lDQWdJQ0FnWTJoaGJtZGxTR0Z1Wkd4bGNuTWdQU0JvWVc1a2JHVnljenRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjMlYwS0d0bGVTd2dkbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0hOMFlYUmxXMnRsZVYwZ0lUMDlJSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCemRHRjBaVnRyWlhsZElEMGdkbUZzZFdVN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaGxjbVZKYzBOb1lXNW5aVWhoYm1Sc1pYSkdiM0lvYTJWNUtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyaGhibWRsU0dGdVpHeGxjbk5iYTJWNVhTaDJZV3gxWlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ2NuVnVTR0Z1Wkd4bGNuTW9ZbUpPWVhaRmJDa2dlMXh1SUNBZ0lDQWdJQ0JMUlZsVFgxZEZYME5CVWtWZlFVSlBWVlF1Wm05eVJXRmphQ2htZFc1amRHbHZiaWhyWlhrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR1Z5WlVselEyaGhibWRsU0dGdVpHeGxja1p2Y2loclpYa3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdkbUZzZFdVZ1BTQmlZazVoZGtWc0xtZGxkRUYwZEhKcFluVjBaU2hnWkdGMFlTMGtleUJyWlhrZ2ZXQXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR05vWVc1blpVaGhibVJzWlhKelcydGxlVjBvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdaMlYwS0d0bGVTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdjM1JoZEdWYmEyVjVYVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdaMlYwUm05amRYTW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJtYjJOMWN6dGNiaUFnSUNCOUxGeHVYRzRnSUNBZ2MyVjBSbTlqZFhNb2QyaGhkQ3dnWTJ4dmMyVnlLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaG1iMk4xYzBOc2IzTmxjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdabTlqZFhORGJHOXpaWElvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR1p2WTNWeklEMGdkMmhoZER0Y2JpQWdJQ0FnSUNBZ1ptOWpkWE5EYkc5elpYSWdQU0JqYkc5elpYSTdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lIVnVabTlqZFhNb0tTQjdYRzRnSUNBZ0lDQWdJR1p2WTNWeklEMGdiblZzYkR0Y2JpQWdJQ0FnSUNBZ1ptOWpkWE5EYkc5elpYSWdQU0J1ZFd4c08xeHVJQ0FnSUgwc1hHNWNiaUFnSUNCbWIyTjFjMGx6S0hkb1lYUXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSGRvWVhRZ1BUMDlJR1p2WTNWek8xeHVJQ0FnSUgxY2JseHVmVHRjYmx4dVpuVnVZM1JwYjI0Z2RHaGxjbVZKYzBOb1lXNW5aVWhoYm1Sc1pYSkdiM0lvYTJWNUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdOb1lXNW5aVWhoYm1Sc1pYSnpJQ1ltSUhSNWNHVnZaaUJqYUdGdVoyVklZVzVrYkdWeWMxdHJaWGxkSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0k3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2x1YVhScFlXeFRkR0YwWlVaeWIyMUVUMDBvWW1KT1lYWkZiQ2tnZTF4dUlDQWdJR052Ym5OMElHbHVhWFJwWVd4VGRHRjBaU0E5SUh0OU8xeHVYRzRnSUNBZ1MwVlpVMTlYUlY5RFFWSkZYMEZDVDFWVUxtWnZja1ZoWTJnb1puVnVZM1JwYjI0b2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUdsdWFYUnBZV3hUZEdGMFpWdHJaWGxkSUQwZ1ltSk9ZWFpGYkM1blpYUkJkSFJ5YVdKMWRHVW9ZR1JoZEdFdEpIc2dhMlY1SUgxZ0tUdGNiaUFnSUNCOUtUdGNibHh1SUNBZ0lISmxkSFZ5YmlCcGJtbDBhV0ZzVTNSaGRHVTdYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUU1aGRsTjBZWFJsTzF4dUlpd2lMeW9oSUVOemN5NXFjeUFxTDF4dVhHNWpiMjV6ZENCUVVrVkdTVmhGVXlBOUlGdGNiaUFnSUNCY0lsd2lMRnh1SUNBZ0lGd2lMWGRsWW10cGRDMWNJaXhjYmlBZ0lDQmNJaTF0Y3kxY0lseHVYVHRjYmx4dVkyOXVjM1FnUTNOeklEMGdlMXh1WEc0Z0lDQWdkSEpoYm5ObWIzSnRLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlFVa1ZHU1ZoRlV5NXRZWEFvY0hKbFptbDRJRDArSUdBa2V5QndjbVZtYVhnZ2ZYUnlZVzV6Wm05eWJUb2dKSHNnZG1Gc2RXVWdmV0FwTG1wdmFXNG9YQ0k3WENJcE8xeHVJQ0FnSUgxY2JseHVmVHRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnUTNOek8xeHVJaXdpTHlvaElFaDBiV3d1YW5NZ0tpOWNibHh1WTI5dWMzUWdTSFJ0YkNBOUlIdGNibHh1SUNBZ0lIUnZaMmRzWlVGMGRISnBZblYwWlNobGJDd2dZWFIwY21saWRYUmxMQ0JwYzA5dUtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNocGMwOXVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCaGRIUnlhV0oxZEdWT2IyUmxJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxRWFIwY21saWRYUmxLR0YwZEhKcFluVjBaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxiQzV6WlhSQmRIUnlhV0oxZEdWT2IyUmxLR0YwZEhKcFluVjBaVTV2WkdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ1pXd3VjbVZ0YjNabFFYUjBjbWxpZFhSbEtHRjBkSEpwWW5WMFpTazdYRzRnSUNBZ2ZWeHVYRzU5TzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCSWRHMXNPMXh1SWl3aUx5b2hJR052Ym5SaGFXNWxaRWx1TG1weklDb3ZYRzVjYm1sdGNHOXlkQ0J0WVhSamFHVnpJR1p5YjIwZ1hDSXVMMjFoZEdOb1pYTmNJanRjYmx4dVpuVnVZM1JwYjI0Z1kyOXVkR0ZwYm1Wa1NXNG9aV3dzSUhObGJHVmpkRzl5TENCelkyOXdaU0E5SUdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQ2tnZTF4dUlDQWdJR2xtSUNodFlYUmphR1Z6S0dWc0xDQnpaV3hsWTNSdmNpa3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYkdWMElHTjFjbkpsYm5SRmJDQTlJR1ZzTzF4dVhHNGdJQ0FnZDJocGJHVWdLR04xY25KbGJuUkZiQ0FoUFQwZ2MyTnZjR1VwSUh0Y2JpQWdJQ0FnSUNBZ1kzVnljbVZ1ZEVWc0lEMGdZM1Z5Y21WdWRFVnNMbkJoY21WdWRFNXZaR1U3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLRzFoZEdOb1pYTW9ZM1Z5Y21WdWRFVnNMQ0J6Wld4bFkzUnZjaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JqYjI1MFlXbHVaV1JKYmp0Y2JpSXNJaThxSVNCamIyOXJhV1Z6TG1weklDb3ZYRzVjYmk4cUtseHVJQ29nUUhSNWNHVmtaV1lnZTI5aWFtVmpkSDBnUTI5dmEybGxSR1ZtYVc1cGRHbHZibHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUhCaGRHaGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JrYjIxaGFXNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5JSHdnYm5WdFltVnlmU0J0WVhoQloyVmNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5JSHdnUkdGMFpYMGdaWGh3YVhKbGMxeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtY2dmQ0JpYjI5c1pXRnVmU0J6WldOMWNtVmNiaUFxTDF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VtVjBkWEp1Y3lCaElHTnZiMnRwWlNCMllXeDFaVnh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRRzFsZEdodlpGeHVJQ0FnSUNBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCamIyOXJhV1ZPWVcxbFhHNGdJQ0FnSUNvZ1FISmxkSFZ5Ym5NZ2V6OXpkSEpwYm1kOVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMEtHTnZiMnRwWlU1aGJXVXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdjbVZuUlhod0lEMGdibVYzSUZKbFowVjRjQ2hjSWlnL09sNThXenNnWFNsY0lpQXJJR052YjJ0cFpVNWhiV1VnS3lCY0lqMG9XMTVjWEZ4Y2N6dGRLaWxjSWlrN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUhOTllYUmphQ0E5SUdSdlkzVnRaVzUwTG1OdmIydHBaUzV0WVhSamFDaHlaV2RGZUhBcE8xeHVYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQW9ZMjl2YTJsbFRtRnRaU0FtSmlCelRXRjBZMmdwSUQ4Z1pHVmpiMlJsVlZKSktITk5ZWFJqYUZzeFhTa2dPaUIxYm1SbFptbHVaV1E3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZObGRDQmhJRzVsZHlCamIyOXJhV1Z6WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBYldWMGFHOWtYRzRnSUNBZ0lDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHTnZiMnRwWlU1aGJXVmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ2RtRnNkV1ZjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlME52YjJ0cFpVUmxabWx1YVhScGIyNTlJRnR2Y0hScGIyNXpYVnh1SUNBZ0lDQXFMMXh1SUNBZ0lITmxkQ2hqYjI5cmFXVk9ZVzFsTENCMllXeDFaU3dnYjNCMGFXOXVjeUE5SUh0OUtTQjdYRzVjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdZMjl2YTJsbFQySnFaV04wSUQwZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnVzJWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoamIyOXJhV1ZPWVcxbEtWMDZJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyWVd4MVpTa3NYRzRnSUNBZ0lDQWdJQ0FnSUNCd1lYUm9PaUJ2Y0hScGIyNXpMbkJoZEdnc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JrYjIxaGFXNDZJRzl3ZEdsdmJuTXVaRzl0WVdsdUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnYldGNFFXZGxPaUJ2Y0hScGIyNXpMbTFoZUVGblpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUdWNGNHbHlaWE02SUc5d2RHbHZibk11Wlhod2FYSmxjeXhjYmlBZ0lDQWdJQ0FnSUNBZ0lITmxZM1Z5WlRvZ2IzQjBhVzl1Y3k1elpXTjFjbVZjYmlBZ0lDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWpiMjlyYVdVZ1BTQnpaWEpwWVd4cGVtVkRiMjlyYVdWUFltcGxZM1FvWTI5dmEybGxUMkpxWldOMEtUdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ1gxOXdjbWwyWVhSbFgxODZJSHRjYmlBZ0lDQWdJQ0FnYzJWeWFXRnNhWHBsUTI5dmEybGxUMkpxWldOMFhHNGdJQ0FnZlZ4dWZUdGNibHh1Wm5WdVkzUnBiMjRnYzJWeWFXRnNhWHBsUTI5dmEybGxUMkpxWldOMEtHTnZiMnRwWlU5aWFtVmpkQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQlBZbXBsWTNRdWEyVjVjeWhqYjI5cmFXVlBZbXBsWTNRcExuSmxaSFZqWlNnb2NtVnpkV3gwTENCd2NtOXdaWEowZVNrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JzWlhRZ2NISnZjR1Z5ZEhsV1lXeDFaU0E5SUdOdmIydHBaVTlpYW1WamRGdHdjbTl3WlhKMGVWMDdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tIQnliM0JsY25SNVZtRnNkV1VnUFQwOUlIVnVaR1ZtYVc1bFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2hjSW1WNGNHbHlaWE5jSWlBOVBUMGdjSEp2Y0dWeWRIa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHeGxkQ0J6Ulhod2FYSmxjenRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjM2RwZEdOb0lDaHdjbTl3WlhKMGVWWmhiSFZsTG1OdmJuTjBjblZqZEc5eUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNCVGRISnBibWM2WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITkZlSEJwY21WeklEMGdjSEp2Y0dWeWRIbFdZV3gxWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0JFWVhSbE9seHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Ulhod2FYSmxjeUE5SUhCeWIzQmxjblI1Vm1Gc2RXVXVkRzlWVkVOVGRISnBibWNvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEJ5YjNCbGNuUjVWbUZzZFdVZ1BTQnpSWGh3YVhKbGN6dGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJRzV2Y20xaGJHbDZaV1JRY205d1pYSjBlVTVoYldVZ1BTQW9YQ0p0WVhoQloyVmNJaUE5UFQwZ2NISnZjR1Z5ZEhrcElEOGdYQ0p0WVhndFlXZGxYQ0lnT2lCd2NtOXdaWEowZVR0Y2JseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1lDUjdJSEpsYzNWc2RDQjlKSHNnYm05eWJXRnNhWHBsWkZCeWIzQmxjblI1VG1GdFpTQjlQU1I3SUhCeWIzQmxjblI1Vm1Gc2RXVWdmVHNnWUR0Y2JpQWdJQ0I5TENCY0lsd2lLUzUwY21sdEtDazdYRzU5WEc0aUxDSXZLaUVnWkc5amRXMWxiblJTWldGa2VTNXFjeUFxTDF4dVhHNW1kVzVqZEdsdmJpQmtiMk4xYldWdWRGSmxZV1I1S0dOaGJHeGlZV05yS1NCN1hHNGdJQ0FnYVdZZ0tHUnZZM1Z0Wlc1MExuSmxZV1I1VTNSaGRHVWdQVDA5SUZ3aWFXNTBaWEpoWTNScGRtVmNJaUI4ZkNCa2IyTjFiV1Z1ZEM1eVpXRmtlVk4wWVhSbElEMDlQU0JjSW1OdmJYQnNaWFJsWENJcElIdGNiaUFnSUNBZ0lDQWdZMkZzYkdKaFkyc29LVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSkVUMDFEYjI1MFpXNTBURzloWkdWa1hDSXNJR05oYkd4aVlXTnJLVHRjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1pHOWpkVzFsYm5SU1pXRmtlVHRjYmlJc0lpOHFJU0JtYVhKbExtcHpJQ292WEc1Y2JtWjFibU4wYVc5dUlHWnBjbVVvWld3c0lHVjJaVzUwVG1GdFpTd2daR0YwWVNrZ2UxeHVJQ0FnSUdOdmJuTjBJR1YyWlc1MElEMGdibVYzSUVOMWMzUnZiVVYyWlc1MEtHVjJaVzUwVG1GdFpTd2dlMXh1SUNBZ0lDQWdJQ0JrWlhSaGFXdzZJR1JoZEdFc1hHNGdJQ0FnSUNBZ0lHSjFZbUpzWlhNNklIUnlkV1VzWEc0Z0lDQWdJQ0FnSUdOaGJtTmxiR0ZpYkdVNklHWmhiSE5sWEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0JsYkM1a2FYTndZWFJqYUVWMlpXNTBLR1YyWlc1MEtUdGNibjFjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWm1seVpUdGNiaUlzSWk4cUlTQnNiMkZrVTJOeWFYQjBMbXB6SUNvdlhHNWNibWx0Y0c5eWRDQnViMjl3SUdaeWIyMGdYQ0l1TDI1dmIzQmNJanRjYmx4dVpuVnVZM1JwYjI0Z2JHOWhaQ2gxY213c0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ2JHVjBJSE5qY21sd2RDQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSnpZM0pwY0hSY0lpazdYRzVjYmlBZ0lDQnpZM0pwY0hRdWRIbHdaU0E5SUZ3aWRHVjRkQzlxWVhaaGMyTnlhWEIwWENJN1hHNGdJQ0FnYzJOeWFYQjBMbUZ6ZVc1aklEMGdkSEoxWlR0Y2JpQWdJQ0J6WTNKcGNIUXVjM0pqSUQwZ2RYSnNPMXh1SUNBZ0lITmpjbWx3ZEM1dmJteHZZV1FnUFNCallXeHNZbUZqYXp0Y2JseHVJQ0FnSUdSdlkzVnRaVzUwTG1KdlpIa3VZWEJ3Wlc1a1EyaHBiR1FvYzJOeWFYQjBLVHRjYmlBZ0lDQnpZM0pwY0hRZ1BTQnVkV3hzTzF4dWZWeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQnNiMkZrVTJOeWFYQjBLSFZ5YkNBOUlGd2lYQ0lzSUdOaGJHeGlZV05ySUQwZ2JtOXZjQ2tnZTF4dUlDQWdJR1J2WTNWdFpXNTBMbkpsWVdSNVUzUmhkR1VnSVQwOUlGd2liRzloWkdsdVoxd2lYRzRnSUNBZ0lDQWdJRDhnYkc5aFpDaDFjbXdzSUdOaGJHeGlZV05yS1Z4dUlDQWdJQ0FnSUNBNklHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSkVUMDFEYjI1MFpXNTBURzloWkdWa1hDSXNJQ2dwSUQwK0lHeHZZV1FvZFhKc0xDQmpZV3hzWW1GamF5a3BPMXh1ZlZ4dUlpd2lMeW9oSUd4dlkyRnNaUzVxY3lBcUwxeHVYRzVwYlhCdmNuUWdZMjl2YTJsbGN5Qm1jbTl0SUZ3aUxpOWpiMjlyYVdWelhDSTdYRzVjYm1OdmJuTjBJRVJGUmtGVlRGUmZVa1ZIU1U5T1gwTlBWVTVVVWxrZ1BTQmNJbFZUWENJN1hHNWpiMjV6ZENCRVJVWkJWVXhVWDBWWVVFVlNTVVZPUTBVZ1BTQmNJa0ZOUlZKY0lqdGNibHh1WTI5dWMzUWdVa1ZIU1U5T1gwTlBUMHRKUlNBOUlGd2lZV3RmY21kY0lqdGNibU52Ym5OMElFTlBWVTVVVWxsZlEwOVBTMGxGSUQwZ1hDSmhhMTlqYjF3aU8xeHVZMjl1YzNRZ1JWaFFSVkpKUlU1RFJWOURUMDlMUlNBOUlGd2laWGh3WDNCbGNtWmNJanRjYmx4dVkyOXVjM1FnVWtWSFNVOU9JRDBnWTI5dmEybGxjeTVuWlhRb1VrVkhTVTlPWDBOUFQwdEpSU2s3WEc1amIyNXpkQ0JEVDFWT1ZGSlpJRDBnWTI5dmEybGxjeTVuWlhRb1EwOVZUbFJTV1Y5RFQwOUxTVVVwTzF4dVkyOXVjM1FnUlZoUVJWSkpSVTVEUlNBOUlHTnZiMnRwWlhNdVoyVjBLRVZZVUVWU1NVVk9RMFZmUTA5UFMwVXBPMXh1WEc1amIyNXpkQ0JGV0ZCRlVrbEZUa05GWDBKWlgxSkZSMGxQVGlBOUlIdGNiaUFnSUNCY0lsVlRYQ0k2SUZ3aVFVMUZVbHdpTEZ4dUlDQWdJRndpUVhOcFlWd2lPaUJjSWtGUVFVTmNJaXhjYmlBZ0lDQmNJa1YxY205d1pWd2lPaUJjSWtWVlVsd2lMRnh1SUNBZ0lGd2lUV2xrUldGemRGd2lPaUJjSWtWVlVsd2lMRnh1SUNBZ0lGd2lRV1p5YVdOaFhDSTZJRndpUlZWU1hDSXNYRzRnSUNBZ1hDSkRZVzVoWkdGY0lqb2dYQ0pCVFVWU1hDSmNibjA3WEc1Y2JtTnZibk4wSUVWWVVFVlNTVVZPUTBWZlFsbGZRMDlWVGxSU1dTQTlJSHRjYmlBZ0lDQmNJa0ZWWENJNklGd2lRVlZUVkZKQlRFbEJYQ0pjYm4wN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElIdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlNaWFIxY201eklISmxaMmx2YmlCamIyUmxJSE5sZENCaWVTQkJhMkZ0WVdrZ2MyVnlkbVZ5WEc0Z0lDQWdJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzFjYmlBZ0lDQWdLaTljYmlBZ0lDQm5aWFJTWldkcGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJTUlVkSlQwNGdmSHdnUkVWR1FWVk1WRjlTUlVkSlQwNWZRMDlWVGxSU1dUdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVbVYwZFhKdWN5QmhJSFZ6WlhJZ1pYaHdaWEpwWlc1alpTQmpiMlJsWEc0Z0lDQWdJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzFjYmlBZ0lDQWdLaTljYmlBZ0lDQm5aWFJGZUhCbGNtbGxibU5sS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1JWaFFSVkpKUlU1RFJWeHVJQ0FnSUNBZ0lDQWdJQ0FnZkh3Z1JWaFFSVkpKUlU1RFJWOUNXVjlEVDFWT1ZGSlpXM1JvYVhNdVoyVjBRMjkxYm5SeWVTZ3BYVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZId2dSVmhRUlZKSlJVNURSVjlDV1Y5U1JVZEpUMDViZEdocGN5NW5aWFJTWldkcGIyNG9LVjFjYmlBZ0lDQWdJQ0FnSUNBZ0lIeDhJRVJGUmtGVlRGUmZSVmhRUlZKSlJVNURSVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVW1WMGRYSnVjeUJoSUdOdmRXNTBjbmtnWTI5a1pTQnpaWFFnWW5rZ2RHaGxJRUZyWVcxaGFTQnpaWEoyWlhKY2JpQWdJQ0FnS2lCQWNtVjBkWEp1Y3lCN2MzUnlhVzVuZlZ4dUlDQWdJQ0FxTDF4dUlDQWdJR2RsZEVOdmRXNTBjbmtvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCRFQxVk9WRkpaSUh4OElFUkZSa0ZWVEZSZlVrVkhTVTlPWDBOUFZVNVVVbGs3WEc0Z0lDQWdmVnh1ZlR0Y2JpSXNJaThxSVNCdFlYUmphR1Z6TG1weklDb3ZYRzVjYm1aMWJtTjBhVzl1SUcxaGRHTm9aWE1vWld3c0lITmxiR1ZqZEc5eUtTQjdYRzRnSUNBZ1kyOXVjM1FnWld4UWNtOTBieUE5SUVWc1pXMWxiblF1Y0hKdmRHOTBlWEJsTzF4dUlDQWdJR052Ym5OMElHMWhkR05vWlhNZ1BTQmxiRkJ5YjNSdkxtMWhkR05vWlhNZ2ZIeGNiaUFnSUNBZ0lDQWdaV3hRY205MGJ5NXRZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnSUNBZ0lDQWdaV3hRY205MGJ5NTNaV0pyYVhSTllYUmphR1Z6VTJWc1pXTjBiM0lnZkh4Y2JpQWdJQ0FnSUNBZ1pXeFFjbTkwYnk1dGIzcE5ZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnSUNBZ0lDQWdaV3hRY205MGJ5NXRjMDFoZEdOb1pYTlRaV3hsWTNSdmNqdGNibHh1SUNBZ0lISmxkSFZ5YmlCdFlYUmphR1Z6TG1OaGJHd29aV3dzSUhObGJHVmpkRzl5S1R0Y2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdiV0YwWTJobGN6dGNiaUlzSWk4cUlTQnViMjl3TG1weklDb3ZYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVLQ2tnZTF4dWZWeHVJaXdpTHlvaElHOXVRMnhwWTJzdWFuTWdLaTljYmx4dVpuVnVZM1JwYjI0Z2IyNURiR2xqYXlobGJDd2dhR0Z1Wkd4bGNpa2dlMXh1SUNBZ0lHTnZibk4wSUc5dVkyeHBZMnRJWVc1a2JHVnlJRDBnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHVjJaVzUwTG1SbFptRjFiSFJRY21WMlpXNTBaV1FnZkh3Z2FYTlZjMkZpYVd4cGRIbERiR2xqYXlobGRtVnVkQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdoaGJtUnNaWEl1WTJGc2JDaDBhR2x6TENCbGRtVnVkQ2s3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJR1ZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKamJHbGphMXdpTENCdmJtTnNhV05yU0dGdVpHeGxjaWs3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdiMjVqYkdsamEwaGhibVJzWlhJN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselZYTmhZbWxzYVhSNVEyeHBZMnNvWlhabGJuUXBJSHRjYmlBZ0lDQXZLaUJiVjFkZElGczNMekkyTHpJd01UWmRYRzRnSUNBZ0lDb2dTV2R1YjNKbElHTjBjbXdyWTJ4cFkyc3NJR0ZzZEN0amJHbGpheXdnYzJocFpuUXJZMnhwWTJzc0lHMWxkR0VyWTJ4cFkydGNiaUFnSUNBZ0tpQkpaMjV2Y21VZ1JtbHlaV1p2ZUNCaWRXSmliR1Z6SUc1dmJpMXNaV1owSUdKMWRIUnZiaUJqYkdsamEzTWdLR2t1WlM0Z1pTNWlkWFIwYjI0Z1BpQXdLVnh1SUNBZ0lDQXFMMXh1SUNBZ0lISmxkSFZ5YmlCbGRtVnVkQzVpZFhSMGIyNGdmSHdnWlhabGJuUXVZV3gwUzJWNUlIeDhJR1YyWlc1MExtTjBjbXhMWlhrZ2ZId2daWFpsYm5RdWJXVjBZVXRsZVNCOGZDQmxkbVZ1ZEM1emFHbG1kRXRsZVR0Y2JuMWNibVY0Y0c5eWRDQmtaV1poZFd4MElHOXVRMnhwWTJzN1hHNGlMQ0l2S2lFZ2NtVnhkV1Z6ZEM1cWN5QXFMMXh1WEc1bWRXNWpkR2x2YmlCallXeHNRV3hzS0dOaGJHeGlZV05yY3l3Z1pHRjBZU2tnZTF4dUlDQWdJR05oYkd4aVlXTnJjeTVtYjNKRllXTm9LR05oYkd4aVlXTnJJRDArSUdOaGJHeGlZV05yS0dSaGRHRXBLVHRjYm4xY2JseHVablZ1WTNScGIyNGdjR0Z5YzJVb1pHRjBZU2tnZTF4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCUFltcGxZM1F1Wm5KbFpYcGxLRXBUVDA0dWNHRnljMlVvWkdGMFlTa3BPMXh1SUNBZ0lIMGdZMkYwWTJnZ0tHVnljbTl5S1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCa1lYUmhPMXh1SUNBZ0lIMWNibjFjYmx4dUx5b3FYRzRnS2lCQWNtVjBkWEp1Y3lCN1ZHaGxibUZpYkdWOVhHNGdLaTljYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVJSEpsY1hWbGMzUW9kWEpzS1NCN1hHNGdJQ0FnWTI5dWMzUWdZV3BoZUZKbGNYVmxjM1FnUFNCdVpYY2dXRTFNU0hSMGNGSmxjWFZsYzNRb0tUdGNiaUFnSUNCamIyNXpkQ0J2YmxOMVkyTmxjM05EWVd4c1ltRmphM01nUFNCYlhUdGNiaUFnSUNCamIyNXpkQ0J2YmtWeWNtOXlRMkZzYkdKaFkydHpJRDBnVzEwN1hHNWNiaUFnSUNCc1pYUWdaR0YwWVR0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdWeWNtOXlTR0Z1Wkd4bGNpZ3BJSHRjYmlBZ0lDQWdJQ0FnWTJGc2JFRnNiQ2h2YmtWeWNtOXlRMkZzYkdKaFkydHpLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQnlaWE53YjI1elpVaGhibVJzWlhJb0tTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoaGFtRjRVbVZ4ZFdWemRDNXpkR0YwZFhNZ0lUMDlJREl3TUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJGc2JFRnNiQ2h2YmtWeWNtOXlRMkZzYkdKaFkydHpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR052Ym5OMElIc2djbVZ6Y0c5dWMyVlVaWGgwSUgwZ1BTQmhhbUY0VW1WeGRXVnpkRHRjYmlBZ0lDQWdJQ0FnWkdGMFlTQTlJSEJoY25ObEtISmxjM0J2Ym5ObFZHVjRkQ2s3WEc1Y2JpQWdJQ0FnSUNBZ1kyRnNiRUZzYkNodmJsTjFZMk5sYzNORFlXeHNZbUZqYTNNc0lHUmhkR0VwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR0ZxWVhoU1pYRjFaWE4wTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKc2IyRmtYQ0lzSUhKbGMzQnZibk5sU0dGdVpHeGxjaWs3WEc0Z0lDQWdZV3BoZUZKbGNYVmxjM1F1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWhjSW1WeWNtOXlYQ0lzSUdWeWNtOXlTR0Z1Wkd4bGNpazdYRzRnSUNBZ1lXcGhlRkpsY1hWbGMzUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbUZpYjNKMFhDSXNJR1Z5Y205eVNHRnVaR3hsY2lrN1hHNWNiaUFnSUNCaGFtRjRVbVZ4ZFdWemRDNXZjR1Z1S0Z3aVIwVlVYQ0lzSUhWeWJDd2dkSEoxWlNrN1hHNGdJQ0FnWVdwaGVGSmxjWFZsYzNRdWMyVnVaQ2dwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnZEdobGJpaGpZV3hzWW1GamF5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpZV3hzWW1GamF5QWhQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hrWVhSaEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyc29aR0YwWVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzl1VTNWalkyVnpjME5oYkd4aVlXTnJjeTV3ZFhOb0tHTmhiR3hpWVdOcktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJQ0FnSUNBZ0lIMHNYRzVjYmlBZ0lDQWdJQ0FnWTJGMFkyZ29ZMkZzYkdKaFkyc3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdZMkZzYkdKaFkyc2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzl1UlhKeWIzSkRZV3hzWW1GamEzTXVjSFZ6YUNoallXeHNZbUZqYXlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JuMWNiaUpkZlE9PSJ9
