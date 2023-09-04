import root from './root';

// `exports`
const freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports;

// @ts-ignore
// `module`
const freeModule = freeExports && typeof module === 'object' && module && !module.nodeType && module;

// `module.exports`
const moduleExports = freeModule && freeModule.exports === freeExports;

// `process` from Node.js
const freeProcess = moduleExports && root.process;

const nodeUtil = (function () {
  try {
    const types = freeModule && freeModule.require && freeModule.require('util').types;
    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {
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
