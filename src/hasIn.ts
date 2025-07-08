import hasPath from './internals/hasPath';
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
function baseHasIn(object: object, key: TPath) {
  return key in Object(object);
}

/**
 * 判断对象自身及继承的属性是否包含路径属性。
 *
 * @alias module:Object.hasIn
 * @since 1.20.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in | in}
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @returns {boolean} 对象自身及继承的属性是否包含路径属性。
 * @example
 * const obj = { a: [{ b: { c: 1 } }] };
 *
 * hasIn(obj, 'a[0].b.c'); // true
 *
 * hasIn(obj, 'a.0.b.c'); // true
 *
 * hasIn(obj, ['a', '0', 'b', 'c']); // true
 *
 * hasIn(obj, 'a.b.c'); // false
 *
 * hasIn(obj, 'a.0.b.c.d'); // false
 *
 * // 包含继承属性
 * hasIn(obj, 'toString'); // true
 */
function hasIn(object: any, key: Many<TPath>) {
  return !isNil(object) && hasPath(object, key, baseHasIn);
}

export default hasIn;
