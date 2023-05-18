const freeGlobalThis = typeof globalThis === 'object' && globalThis && globalThis.Object === Object;
const freeGlobal = typeof global === 'object' && global && global.Object === Object;
const freeSelf = typeof self === 'object' && self && self.Object === Object;

export const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')() || {};

export const objectProto = Object.prototype;

export const objectToString = objectProto.toString;

export const hasOwnProperty = objectProto.hasOwnProperty;

export const propertyIsEnumerable = objectProto.propertyIsEnumerable;

export const functionToString = Function.prototype.toString;

export const objectCtorString = functionToString.call(Object);

// 最大安全数字
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// 最小安全数字
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

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

export const objectTag = '[object Object]';
export const dataViewTag = '[object DateView]';
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
