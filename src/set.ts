import isIndex from './internals/isIndex';
import { nativeUndefined } from './internals/native';
import { Many, TPath } from './internals/types';
import isUnsafeKey from './internals/unsafeKey';
import isObject from './isObject';
import toPath from './toPath';

type TCustomizer = (objValue: any, key: TPath, nested: any) => any;

/**
 * 设置对象属性路径值。
 *
 * @alias module:Object.set
 * @since 1.16.0
 * @param {Object | Array} object 对象或数组。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @param {*} value 要设置的值。
 * @param {Function} [customizer] 自定义指定值。
 * @returns `object`。
 * @example
 * const obj = {};
 *
 * set(obj, 'a.b', 1);
 * console.log(obj); // { a: { b: 1 } }
 *
 * set(obj, ['x', '0', 'y'], 2);
 * console.log(obj); // { a: { b: 1 }, x: [{ y: 2 }] }
 *
 * // 出于安全考虑，路径中包含 `__proto__`、`constructor` 时不会做任何赋值（防止原型污染），直接返回 `object` 。
 * const obj2 = {};
 * set(obj2, '__proto__', {});
 * console.log(obj2); // {}
 * console.log(obj2.__proto__); // {}
 *
 */
function set<T extends object>(object: T, path: Many<TPath>, value: any, customizer?: TCustomizer) {
  if (!isObject(object)) {
    return object;
  }

  const paths = toPath(path, object);
  const length = paths.length;
  const lastIndex = length - 1;

  // 先校验整个路径，避免不安全的路径产生部分写入
  for (let i = 0; i < length; i++) {
    if (isUnsafeKey(paths[i])) {
      return object;
    }
  }

  let index = -1;
  let nested = object as any;

  while (++index < length) {
    const key = paths[index];

    if (index === lastIndex) {
      nested[key] = value;
    } else {
      const objValue = nested[key];
      let newValue = customizer ? customizer(objValue, key, nested) : nativeUndefined;
      if (!isObject(newValue)) {
        newValue = isObject(objValue) ? objValue : isIndex(paths[index + 1]) ? [] : {};
      }
      nested[key] = newValue;
      nested = nested[key];
    }
  }

  return object;
}

export default set;
