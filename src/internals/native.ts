export const objectProto = Object.prototype;
export const objectProtoToString = objectProto.toString;
export const objectProtoHasOwnProperty = objectProto.hasOwnProperty;
export const objectProtoPropertyIsEnumerable = objectProto.propertyIsEnumerable;

export const objectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
export const objectGetPrototypeOf = Object.getPrototypeOf;
export const objectKeys = Object.keys;

export const functionProto = Function.prototype;
export const functionProtoToString = functionProto.toString;

const symbolExisted = typeof Symbol !== 'undefined';
export const symbolProto = symbolExisted ? Symbol.prototype : undefined;

export const arrayProto = Array.prototype;
export const arrayProtoSlice = arrayProto.slice;

export const mathMin = Math.min;
export const mathMax = Math.max;
export const mathRandom = Math.random;
export const mathFloor = Math.floor;
export const mathCeil = Math.ceil;
export const mathAbs = Math.abs;

export const numberIsFinite = Number.isFinite;
export const numberIsInteger = Number.isInteger;
export const numberIsSafeInteger = Number.isSafeInteger;

export const globalThisExisted = typeof globalThis === 'object' && globalThis;
export const globalExisted = typeof global === 'object' && global;
export const selfExisted = typeof self === 'object' && self;

/**
 * 最大安全整数。
 *
 * @static
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | MAX_SAFE_INTEGER}
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * 最小安全整数。
 *
 * @static
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER | MIN_SAFE_INTEGER}
 */
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

/**
 * 最大数组长度 `Math.pow(2,32) - 1` 。
 *
 * @static
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length | length}
 */
export const MAX_ARRAY_LENGTH = 4294967295;

export const numberTag = '[object Number]';
export const booleanTag = '[object Boolean]';
export const stringTag = '[object String]';
export const dateTag = '[object Date]';
export const regExpTag = '[object RegExp]';
export const symbolTag = '[object Symbol]';
export const errorTag = '[object Error]';
export const arrayBufferTag = '[object ArrayBuffer]';
export const argumentsTag = '[object Arguments]';
export const arrayTag = '[object Array]';
export const typedArrayTags = ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'BigInt64Array', 'BigUint64Array'].map((item) => '[object ' + item + ']');
export const functionTags = ['Function', 'AsyncFunction', 'GeneratorFunction', 'Proxy'].map((item) => '[object ' + item + ']');
export const weakSetTag = '[object WeakSet]';
export const blobTag = '[object Blob]';
export const domExceptionTag = '[object DOMException]';

export const objectTag = '[object Object]';
export const dataViewTag = '[object DataView]';
export const mapTag = '[object Map]';
export const promiseTag = '[object Promise]';
export const setTag = '[object Set]';
export const weakMapTag = '[object WeakMap]';
