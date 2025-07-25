import { stringObject } from './native';

// @ts-ignore
// `exports`
const freeExports = typeof exports === stringObject && exports && !exports.nodeType && exports;

// @ts-ignore
// `module`
const freeModule = freeExports && typeof module === stringObject && module && !module.nodeType && module;

const nodeUtil = (function () {
  try {
    const types = freeModule && freeModule.require && freeModule.require('util').types;
    if (types) {
      return types;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    /* empty */
  }
})();

type CheckTypeMethod = undefined | ((value: any) => boolean);

export const nodeIsArrayBuffer: CheckTypeMethod = nodeUtil && nodeUtil.isArrayBuffer;
export const nodeIsDate: CheckTypeMethod = nodeUtil && nodeUtil.isDate;
export const nodeIsMap: CheckTypeMethod = nodeUtil && nodeUtil.isMap;
export const nodeIsRegExp: CheckTypeMethod = nodeUtil && nodeUtil.isRegExp;
export const nodeIsSet: CheckTypeMethod = nodeUtil && nodeUtil.isSet;
export const nodeIsTypedArray: CheckTypeMethod = nodeUtil && nodeUtil.isTypedArray;
