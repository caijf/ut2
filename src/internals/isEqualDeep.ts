import allKeys from '../allKeys';
import eq from '../eq';
import getTagWithBugfix from './getTagWithBugfix';
import { argumentsTag, arrayProtoSlice, arrayBufferTag, arrayTag, booleanTag, dataViewTag, dateTag, errorTag, objectProtoHasOwnProperty, mapTag, numberTag, objectTag, regExpTag, setTag, stringTag, symbolProto, symbolTag, nativeUndefined } from './native';
import isBuffer from '../isBuffer';
import isFunction from '../isFunction';
import isNil from '../isNil';
import isObjectLike from '../isObjectLike';
import isTypedArray from '../isTypedArray';
import orderBy from '../orderBy';

const symbolValueOf = symbolProto ? symbolProto.valueOf : nativeUndefined;

function mapToArray(map: Map<any, any>) {
  const result: [any, any][] = [];
  map.forEach((value, key) => {
    result.push([key, value]);
  });
  return orderBy(result, [0, 1]);
}

function setToArray(set: Set<any>) {
  const result: any[] = [];
  set.forEach((value) => {
    result.push(value);
  });
  return orderBy(result);
}

function argToArray(arg: IArguments) {
  return arrayProtoSlice.call(arg);
}

function toBufferView(bufferSource: any) {
  return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, bufferSource.byteLength);
}

function isDomNode(obj: any) {
  return isObjectLike(obj) && typeof (obj as Element).nodeType === 'number' && typeof (obj as Element).nodeName === 'string' && typeof (obj as Element).isEqualNode === 'function';
}

type Customizer = (objValue: any, othValue: any, key?: number | string | symbol, object?: any, other?: any, valueStack?: any[], otherStack?: any[]) => void | boolean;

/**
 *
 * 深度比较两个值是否相等。
 *
 * 支持比较 `boolean` `number` `string` `symbol` `array` `array buffer` `date` `error` `map` `object` `regexp` `set` `typed array` 类型。对象只比较自身的属性，不包括继承和不可枚举的属性。
 *
 * 如果 `strictCheck=true`， 以下值不相等：
 *
 * 1. `0` `-0`
 * 2. `typeof` 不同类型，如 `1` `Object(1)`
 * 3. 无效日期对象，如 `new Date('')` `new Date('abc')`
 *
 * @private
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @param {Function} [customizer] 自定义比较。
 * @param {boolean} [strictCheck=false] 严格比较。默认 `false`。
 * @param {Array} [valueStack] 值的堆栈。
 * @param {Array} [otherStack] 另一个值的堆栈。
 * @returns {boolean} 如果两个值相等，返回 `true`，否则返回 `false`。
 */
function isEqualDeep(value: any, other: any, customizer?: Customizer, strictCheck?: boolean, valueStack?: any[], otherStack?: any[]): boolean {
  // 如果两个值相等，直接返回 true
  if (eq(value, other, strictCheck)) {
    return true;
  }

  const valType = typeof value;
  const othType = typeof other;

  // 严格比较时，不同类型返回 false
  // 例如，`1` `Object(1)` 不相等
  if (strictCheck && valType !== othType) {
    return false;
  }

  // 存在 null 或 undefined 或 都不是对象类型
  if (isNil(value) || isNil(other) || (valType !== 'object' && othType !== 'object')) {
    return false;
  }

  // 对象标签
  const tag = getTagWithBugfix(value);
  if (tag !== getTagWithBugfix(other)) {
    return false;
  }

  let convert: undefined | ((arg: any) => any);

  switch (tag) {
    case numberTag:
      return eq(+value, +other, strictCheck);
    case booleanTag:
    case dateTag:
      // 日期转为毫秒数进行比较，而无效日期转为 `NaN`。如果是严格比较，无效日期不相等。
      return strictCheck ? +value === +other : eq(+value, +other);
    case stringTag:
    case regExpTag:
      return '' + value === '' + other;
    case symbolTag:
      return symbolValueOf ? symbolValueOf.call(value) === symbolValueOf.call(other) : false;
    case errorTag:
      return value.name === other.name && value.message === other.message;
    case dataViewTag:
    case arrayBufferTag:
      if (value.byteLength !== other.byteLength || (value.byteOffset && value.byteOffset !== other.byteOffset)) {
        return false;
      }
      convert = toBufferView;
      break;
    case mapTag:
      convert = mapToArray;
      break;
    case setTag:
      convert = setToArray;
      break;
    case argumentsTag:
      convert = argToArray;
      break;
  }

  if (convert) {
    return isEqualDeep(convert(value), convert(other), customizer, strictCheck, valueStack, otherStack);
  }

  // 使用 DOM3 isEqualNode 方法比较 （IE>=9）
  if (isDomNode(value) && isDomNode(other)) {
    return value.isEqualNode(other);
  }

  let areArrays = tag === arrayTag;
  if (!areArrays && isTypedArray(value)) {
    if (value.byteLength !== other.byteLength) {
      return false;
    }
    if (value.buffer === other.buffer && value.byteOffset === other.byteOffset) {
      return true;
    }
    areArrays = true;
  }

  // Buffer 对象处理
  if (isBuffer(value)) {
    if (!isBuffer(other)) {
      return false;
    }
    areArrays = true;
  }

  // 假设循环结构是相等的。
  valueStack = valueStack || [];
  otherStack = otherStack || [];
  let length = valueStack.length;

  while (length--) {
    // 遍历对象的堆栈，如果存在循环依赖，立即进行比较。
    if (valueStack[length] === value) {
      return otherStack[length] === other;
    }
  }

  // 将对象添加到遍历对象的堆栈中。
  valueStack.push(value);
  otherStack.push(other);

  let result = true;
  const hasCustomizer = typeof customizer === 'function';

  // 递归比较对象和数组
  if (areArrays) {
    // 比较数组长度
    length = value.length;
    if (length !== other.length) {
      return false;
    }
    // 深度比较数组
    while (length--) {
      if (hasCustomizer) {
        const compared = customizer(value[length], other[length], length, value, other, valueStack, otherStack);
        if (compared !== nativeUndefined) {
          if (!compared) {
            return false;
          }
          continue;
        }
      }
      if (!isEqualDeep(value[length], other[length], customizer, strictCheck, valueStack, otherStack)) {
        return false;
      }
    }
  } else if (tag === objectTag) {
    // 深度比较对象
    const keys = allKeys(value);
    length = keys.length;
    if (allKeys(other).length !== length) {
      return false;
    }
    // 跳过构造函数比较
    let skipCtor = false;
    while (length--) {
      const key = keys[length];
      if (hasCustomizer) {
        const compared = customizer(value[key], other[key], key, value, other, valueStack, otherStack);
        if (compared !== nativeUndefined) {
          if (!compared) {
            return false;
          }
          continue;
        }
      }
      if (!(objectProtoHasOwnProperty.call(other, key) && isEqualDeep(value[key], other[key], customizer, strictCheck, valueStack, otherStack))) {
        return false;
      }

      // constructor 作为属性，非构建函数时
      if (!skipCtor && key === 'constructor') {
        skipCtor = true;
      }
    }

    if (!skipCtor) {
      // 不同构造函数的对象不是等价的。
      const valCtor = value.constructor;
      const othCtor = other.constructor;
      if (valCtor !== othCtor && !(isFunction(valCtor) && valCtor instanceof valCtor && isFunction(othCtor) && othCtor instanceof othCtor) && 'constructor' in value && 'constructor' in other) {
        return false;
      }
    }
  } else {
    result = false;
  }

  // 从遍历对象的堆栈中删除
  valueStack.pop();
  otherStack.pop();

  return result;
}

export default isEqualDeep;
