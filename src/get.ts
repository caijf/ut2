import { Many, TPath } from './internals/types';
import isNil from './isNil';
import isUndefined from './isUndefined';
import toPath from './toPath';

/**
 * 获取对象路径的值。
 *
 * @private
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @returns {*} 属性值。
 */
function baseGet(object: object, key: Many<TPath>) {
  const paths = toPath(key, object);
  const length = paths.length;
  let index = 0;

  while (!isNil(object) && index < length) {
    object = (object as Record<string | symbol, any>)[paths[index++]];
  }
  return index && index === length ? object : undefined;
}

/**
 * 获取对象路径的值。
 *
 * @alias module:Object.get
 * @since 1.16.0
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @param {*} [defaultValue] 替代返回 `undefined` 的默认值。
 * @returns {*} 属性值。
 * @example
 * const obj = { a: [{ b: { c: 1 } }] };
 *
 * get(obj, 'a[0].b.c'); // 1
 *
 * get(obj, ['a', '0', 'b', 'c']); // 1
 *
 * get(obj, 'a.b.c', 'default'); // 'default'
 */
function get<TDefault = unknown>(object: any, key: Many<TPath>, defaultValue?: TDefault) {
  const result = isNil(object) ? undefined : baseGet(object, key);
  return isUndefined(result) ? defaultValue : (result as TDefault);
}

export default get;
