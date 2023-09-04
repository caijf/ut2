import { objectToString, objectTag, dataViewTag, mapTag, promiseTag, setTag, weakMapTag } from './native';
import { toSource } from './helpers';
import getTag from './getTag';

const dataViewExisted = typeof DataView !== 'undefined';
const mapExisted = typeof Map !== 'undefined';
const promiseExisted = typeof Promise !== 'undefined';
const setExisted = typeof Set !== 'undefined';
const weakMapExisted = typeof WeakMap !== 'undefined';

const dataViewCtorString = toSource(DataView);
const mapCtorString = toSource(Map);
const promiseCtorString = toSource(Promise);
const setCtorString = toSource(Set);
const weakMapCtorString = toSource(WeakMap);

let getTagWithBugfix = getTag;

// 以下数据类型执行 `Object.prototype.toString` 返回错误结果 `[object Object]`：
// ie11 的 DataView、Map、Set、WeakMap ，node.js 版本 < 6 的 Promise 。
if (
  (dataViewExisted && objectToString.call(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  (mapExisted && objectToString.call(new Map()) !== mapTag) ||
  (promiseExisted && objectToString.call(Promise.resolve()) !== promiseTag) ||
  (setExisted && objectToString.call(new Set()) !== setTag) ||
  (weakMapExisted && objectToString.call(new WeakMap()) !== weakMapTag)
) {
  getTagWithBugfix = function (value: any) {
    const result = getTag(value);
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

export default getTagWithBugfix;
