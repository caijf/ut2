import hasPath from './internals/hasPath';
import { objectProtoHasOwnProperty } from './internals/native';
import { Many, TPath } from './internals/types';
import isNil from './isNil';

/**
 * 对象自身是否包含属性。
 *
 * @private
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @returns {boolean} 对象自身是否包含属性。
 */
function baseHas(object: object, key: TPath) {
  return objectProtoHasOwnProperty.call(object, key);
}

/**
 * 判断对象自身的属性是否包含路径属性。
 *
 * @alias module:Object.has
 * @since 1.20.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty | hasOwnProperty}
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @returns {boolean} 对象自身的属性是否包含路径属性。
 * @example
 * const obj = { a: [{ b: { c: 1 } }] };
 *
 * has(obj, 'a[0].b.c'); // true
 *
 * has(obj, 'a.0.b.c'); // true
 *
 * has(obj, ['a', '0', 'b', 'c']); // true
 *
 * has(obj, 'a.b.c'); // false
 *
 * has(obj, 'a.0.b.c.d'); // false
 *
 * // 不包含继承属性
 * has(obj, 'toString'); // false
 */
function has(object: any, key: Many<TPath>) {
  return !isNil(object) && hasPath(object, key, baseHas);
}

export default has;
