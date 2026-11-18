import get from './get';
import { Many, TPath } from './internals/types';
import isUnsafeKey from './internals/unsafeKey';
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
 *
 * // 出于安全考虑，包含 `__proto__`、`constructor` 的路径不会被删除（防止破坏原型链），返回 `false`
 * unset(obj, '__proto__.toString'); // false
 */
function unset(object: any, path: Many<TPath>) {
  if (isNil(object)) {
    return true;
  }

  const paths = toPath(path, object);

  // 禁止删除原型链上的属性，防止原型污染或全局对象被破坏
  for (let i = 0; i < paths.length; i++) {
    if (isUnsafeKey(paths[i])) {
      return false;
    }
  }

  const parent = paths.length < 2 ? object : get<any>(object, paths.slice(0, -1));
  return isNil(parent) ? true : delete parent[nth(paths, -1)];
}

export default unset;
