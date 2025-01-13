import get from './get';
import { Many, TPath } from './internals/types';
import isNil from './isNil';
import nth from './nth';
import toPath from './toPath';

/**
 * 删除对象路径的属性。
 *
 * @alias module:Object.unset
 * @since 1.16.0
 * @param {*} object 要修改的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @returns {boolean} 如果删除成功返回`true`，否则返回`false`。
 * @example
 * const obj = { a: [{ b: { c: 1 } }] };
 *
 * unset(obj, 'a[0].b.c'); // true
 * console.log(obj); // { a: [{ b: {} }] }
 *
 * unset(obj, ['a', '0', 'b', 'c']); // true
 * console.log(obj); // { a: [{ b: {} }] }
 */
function unset(object: any, path: Many<TPath>) {
  if (isNil(object)) {
    return true;
  }

  const paths = toPath(path, object);
  const parent = paths.length < 2 ? object : get<any>(object, paths.slice(0, -1));
  return isNil(parent) ? true : delete parent[nth(paths, -1)];
}

export default unset;
