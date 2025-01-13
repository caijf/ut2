import isIndex from './internals/isIndex';
import { nativeUndefined } from './internals/native';
import { Many, TPath } from './internals/types';
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
 */
function set<T extends object>(object: T, path: Many<TPath>, value: any, customizer?: TCustomizer) {
  if (!isObject(object)) {
    return object;
  }

  const paths = toPath(path, object);
  const length = paths.length;
  const lastIndex = length - 1;

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
