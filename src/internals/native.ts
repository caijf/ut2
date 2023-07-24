const freeGlobalThis = typeof globalThis === 'object' && globalThis && globalThis.Object === Object && globalThis;
const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
const freeSelf = typeof self === 'object' && self && self.Object === Object && self;

export const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')() || {};

export const objectProto = Object.prototype;

export const objectToString = objectProto.toString;

export const hasOwnProperty = objectProto.hasOwnProperty;

export const propertyIsEnumerable = objectProto.propertyIsEnumerable;

export const functionToString = Function.prototype.toString;

export const objectCtorString = functionToString.call(Object);

export const symbolProto = Symbol ? Symbol.prototype : undefined;
export const symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
export const symbolToString = symbolProto ? symbolProto.toString : undefined;
export const symToStringTag = Symbol ? Symbol.toStringTag : undefined;

export const arrayProto = Array.prototype;
export const arrSlice = Array.prototype.slice;

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

// Blob 对象是否存在
export const blobExisted = typeof Blob !== 'undefined';

export function toSource(func: any) {
  if (func !== null) {
    try {
      return functionToString.call(func);
    } catch (e) {
      /* empty */
    }
    try {
      return func + '';
    } catch (e) {
      /* empty */
    }
  }
  return '';
}

function wrapTags(tags: string[]) {
  return tags.map((item) => '[object ' + item + ']');
}

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
export const typedArrayTags = wrapTags(['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'BigInt64Array', 'BigUint64Array']);
export const functionTags = wrapTags(['Function', 'AsyncFunction', 'GeneratorFunction', 'Proxy']);
export const weakSetTag = '[object WeakSet]';
export const blobTag = '[object Blob]';
export const fileTag = '[object Blob]';
export const domExceptionTag = '[object DOMException]';

export const objectTag = '[object Object]';
export const dataViewTag = '[object DataView]';
export const mapTag = '[object Map]';
export const promiseTag = '[object Promise]';
export const setTag = '[object Set]';
export const weakMapTag = '[object WeakMap]';

export const dataViewExisted = typeof DataView !== 'undefined';
export const mapExisted = typeof Map !== 'undefined';
export const promiseExisted = typeof Promise !== 'undefined';
export const setExisted = typeof Set !== 'undefined';
export const weakMapExisted = typeof WeakMap !== 'undefined';

export const initSource = (existed: boolean, str: string) => (existed ? str : '');

export const dataViewCtorString = initSource(dataViewExisted, toSource(DataView));
export const mapCtorString = initSource(mapExisted, toSource(Map));
export const promiseCtorString = initSource(promiseExisted, toSource(Promise));
export const setCtorString = initSource(setExisted, toSource(Set));
export const weakMapCtorString = initSource(weakMapExisted, toSource(WeakMap));
