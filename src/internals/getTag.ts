import {
  hasOwnProperty,
  objectToString,
  toSource,
  objectTag,
  dataViewTag,
  mapTag,
  promiseTag,
  setTag,
  weakMapTag,
  dataViewExisted,
  mapExisted,
  promiseExisted,
  setExisted,
  weakMapExisted,
  dataViewCtorString,
  mapCtorString,
  promiseCtorString,
  setCtorString,
  weakMapCtorString
} from './native';

/**
 * 获取值的 `Object.prototype.toString` ，并且忽略 `Symbol.toStringTag` 影响。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function getRawTag(value: any) {
  const isOwn = hasOwnProperty.call(value, Symbol.toStringTag);
  const tag = value[Symbol.toStringTag];
  let unmasked = false;

  try {
    value[Symbol.toStringTag] = undefined;
    unmasked = true;
  } catch (e) {
    /* empty */
  }

  const result = objectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[Symbol.toStringTag] = tag;
    } else {
      delete value[Symbol.toStringTag];
    }
  }
  return result;
}

/**
 * 获取值的 `Object.prototype.toString` ，忽略 `Symbol.toStringTag` 影响。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function _getTag(value: any) {
  return Symbol && Symbol.toStringTag && Symbol.toStringTag in Object(value)
    ? getRawTag(value)
    : objectToString.call(value);
}

let getTag = _getTag;

// 以下数据类型执行 `Object.prototype.toString` 返回错误结果 `[object Object]`：
// ie11 的 DataView、Map、Set、WeakMap ，node.js 版本 < 6 的 Promise 。
if (
  (dataViewExisted && objectToString.call(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  (mapExisted && objectToString.call(new Map()) !== mapTag) ||
  (promiseExisted && objectToString.call(Promise.resolve()) !== promiseTag) ||
  (setExisted && objectToString.call(new Set()) !== setTag) ||
  (weakMapExisted && objectToString.call(new WeakMap()) !== weakMapTag)
) {
  getTag = function (value: any) {
    const result = _getTag(value);
    const Ctor = result === objectTag ? value.constructor : undefined;
    const ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

export default getTag;
