import forEach from './forEach';
import { stubFlase } from './internals/helpers';
import { MapKey, MapPredicate, ObjectPredicate, WithNullable } from './internals/types';
import isMap from './isMap';
import isObject from './isObject';

interface FindKey {
  <T extends Map<any, any>>(map: WithNullable<T>, predicate?: MapPredicate<T>): MapKey<T> | undefined;
  <T extends object, K extends keyof T = keyof T>(object: WithNullable<T>, predicate?: ObjectPredicate<T>): K | undefined;
}

/**
 * 查找对象的键。
 *
 * @alias module:Object.findKey
 * @since 1.13.0
 * @param {Object | Map} obj 对象或 Map 对象
 * @param {Function} [predicate] 迭代对象自身的可枚举属性（包含 `Symbol` 属性）调用的函数，返回 `Truthy` 表示要查找该值对应的键。
 * @returns 如果对象存在要查找的值，返回该值的键，否则返回 `undefined`。
 * @example
 * const obj = { foo: 'bar', baz: 42 }
 * findKey(obj, isNumber); // 'baz'
 * findKey(obj, v => typeof v === 'bar'); // 'foo'
 *
 * const map = new Map([['foo', 'bar'], ['baz', 42]]);
 * findKey(map, isNumber); // 'baz'
 * findKey(map, v => typeof v === 'bar'); // 'foo'
 */
const findKey: FindKey = (obj: object | Map<any, any>, predicate: MapPredicate<any> | ObjectPredicate<any> = stubFlase) => {
  let key;

  if (isMap(obj)) {
    for (const [k, v] of obj) {
      if (predicate(v, k)) {
        key = k;
        break;
      }
    }
  } else if (isObject(obj)) {
    forEach(obj, (v, k) => {
      if (predicate(v, k)) {
        key = k;
        return false;
      }
    });
  }

  return key;
};

export default findKey;
