export const nativeUndefined = void 0;
export const stringUndefined = 'undefined';
export const stringObject = 'object';

export const objectProto = Object.prototype;
export const objectProtoToString = objectProto.toString;
export const objectProtoHasOwnProperty = objectProto.hasOwnProperty;
export const objectProtoPropertyIsEnumerable = objectProto.propertyIsEnumerable;

export const objectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
export const objectGetPrototypeOf = Object.getPrototypeOf;
export const objectKeys = Object.keys;

export const functionProto = Function.prototype;
export const functionProtoToString = functionProto.toString;

const symbolExisted = typeof Symbol !== stringUndefined;
export const symbolProto = symbolExisted ? Symbol.prototype : nativeUndefined;

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

export const globalThisExisted = typeof globalThis === stringObject && globalThis;
// @ts-ignore
export const globalExisted = typeof global === stringObject && global;
export const selfExisted = typeof self === stringObject && self;

/**
 * @summary 最大安全整数。
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER MAX_SAFE_INTEGER}
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * @summary 最小安全整数。
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER MIN_SAFE_INTEGER}
 */
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

/**
 * @summary 最大数组长度 `Math.pow(2,32) - 1`。
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length length}
 */
export const MAX_ARRAY_LENGTH = 4294967295;

const tagPrefix = '[object ';
export const bigIntTag = tagPrefix + 'BigInt]';
export const numberTag = tagPrefix + 'Number]';
export const booleanTag = tagPrefix + 'Boolean]';
export const stringTag = tagPrefix + 'String]';
export const dateTag = tagPrefix + 'Date]';
export const regExpTag = tagPrefix + 'RegExp]';
export const symbolTag = tagPrefix + 'Symbol]';
export const errorTag = tagPrefix + 'Error]';
export const arrayBufferTag = tagPrefix + 'ArrayBuffer]';
export const argumentsTag = tagPrefix + 'Arguments]';
export const arrayTag = tagPrefix + 'Array]';
export const functionTags = ['Function', 'AsyncFunction', 'GeneratorFunction', 'Proxy'].map((item) => tagPrefix + item + ']');
export const weakSetTag = tagPrefix + 'WeakSet]';
export const blobTag = tagPrefix + 'Blob]';
export const fileTag = tagPrefix + 'File]';
export const domExceptionTag = tagPrefix + 'DOMException]';

export const objectTag = tagPrefix + 'Object]';
export const dataViewTag = tagPrefix + 'DataView]';
export const mapTag = tagPrefix + 'Map]';
export const promiseTag = tagPrefix + 'Promise]';
export const setTag = tagPrefix + 'Set]';
export const weakMapTag = tagPrefix + 'WeakMap]';
export const windowTag = tagPrefix + 'Window]';
