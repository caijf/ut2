import { objectTag, dataViewTag, mapTag, promiseTag, setTag, weakMapTag, nativeUndefined, stringUndefined } from './native';
import { toSource } from './helpers';
import getTag from './getTag';

const dataViewExisted = typeof DataView !== stringUndefined;
const mapExisted = typeof Map !== stringUndefined;
const promiseExisted = typeof Promise !== stringUndefined;
const setExisted = typeof Set !== stringUndefined;
const weakMapExisted = typeof WeakMap !== stringUndefined;

const dataViewCtorString = toSource(DataView);
const mapCtorString = toSource(Map);
const promiseCtorString = toSource(Promise);
const setCtorString = toSource(Set);
const weakMapCtorString = toSource(WeakMap);

let getTagWithBugfix = getTag;

// 以下数据类型执行 `Object.prototype.toString` 返回错误结果 `[object Object]`：
// ie11 的 DataView、Map、Set、WeakMap ，node.js 版本 < 6 的 Promise 。
if (
  (dataViewExisted && getTag(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  (mapExisted && getTag(new Map()) !== mapTag) ||
  (promiseExisted && getTag(Promise.resolve()) !== promiseTag) ||
  (setExisted && getTag(new Set()) !== setTag) ||
  (weakMapExisted && getTag(new WeakMap()) !== weakMapTag)
) {
  getTagWithBugfix = function (value: any) {
    const result = getTag(value);
    const Ctor = result === objectTag ? value.constructor : nativeUndefined;
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

export default getTagWithBugfix;
