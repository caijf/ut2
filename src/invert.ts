import allKeys from './allKeys';
import { stubTrue } from './internals/helpers';
import { objectProtoToString } from './internals/native';
import { ObjectPredicate, PropertyName, WithNullable } from './internals/types';

/**
 * 创建一个对象，该对象由 `object` 自身可枚举属性（包含 `Symbol` 属性）和值反转组成。
 *
 * @static
 * @alias module:Object.invert
 * @since 1.8.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy Truthy}
 * @param {Object} object 来源对象。
 * @param {Function} [predicate] 调用每一个属性的函数，返回 `Truthy` 表示要反转，否则不反转。
 * @returns {Object} 新对象。
 * @example
 *
 * invert({ a: 1, b: 2 }); // { 1: 'a', 2: 'b' }
 *
 * invert({ a: undefined, b: null }); // { undefined: 'a', null: 'b' }
 *
 */
function invert<T extends object>(object: WithNullable<T>, predicate: ObjectPredicate<T> = stubTrue) {
  const _keys = allKeys(object);
  const result: Record<PropertyName, any> = {};

  _keys.forEach((key) => {
    const value = object![key as keyof T];
    if (predicate(value, key as keyof T)) {
      const valueStr = value != null && typeof value.toString != 'function' ? objectProtoToString.call(value) : value;
      result[valueStr as any] = key;
    } else {
      result[key] = value;
    }
  });
  return result;
}

export default invert;
