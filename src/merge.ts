import allKeysIn from './allKeysIn';
import isArray from './isArray';
import isObject from './isObject';
import isObjectLike from './isObjectLike';
import isPlainObject from './isPlainObject';

type GetKeysMethod = typeof allKeysIn;
type Customizer = (objValue: any, srcValue: any, key: string | symbol, object: any, source: any) => any;

// 内部处理合并和循环引用
function baseMerge<TObject, TSource>(object: TObject, source: TSource, getKeys: GetKeysMethod, customizer?: Customizer, stack = new WeakMap()) {
  const obj = Object(object);

  if (!isObject(source) || obj === source) {
    return obj;
  }
  const keys = getKeys(source as object);
  const hasCustomizer = typeof customizer === 'function';

  keys.forEach((key) => {
    // @ts-ignore
    const srcValue = source[key];
    const srcIsObj = isObject(srcValue);

    if (srcIsObj && stack.has(srcValue)) {
      obj[key] = srcValue;
    } else {
      const newValue = hasCustomizer ? customizer(obj[key], srcValue, key, obj, source) : undefined;
      if (newValue !== undefined) {
        obj[key] = newValue;
      } else {
        const objValue = obj[key];
        let newObjValue: any;

        if (srcIsObj) {
          stack.set(srcValue, true);
          if (isArray(srcValue)) {
            newObjValue = isArray(objValue) ? objValue : [];
          } else if (isPlainObject(srcValue)) {
            newObjValue = isObjectLike(objValue) ? objValue : {};
          }
        }

        if (newObjValue) {
          obj[key] = baseMerge(newObjValue, srcValue, getKeys, customizer, stack);
        } else if (srcValue !== undefined || !(key in obj)) {
          obj[key] = srcValue;
        }
      }
    }
  });

  return obj;
}

/**
 * 递归合并 `source` 来源对象自身和继承的可枚举属性（包含 `Symbol` 属性）到 `object` 目标对象。
 *
 * 如果目标值存在，被解析为 `undefined` 的 `source` 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。
 *
 * 如果你不需要 `Symbol` 属性，可以传入 {@link https://caijf.github.io/ut2/module-Object.html#.keysIn | keysIn} 方法。
 *
 * @static
 * @alias module:Object.merge
 * @since 1.0.0
 * @param {Object | Array} object 目标对象。
 * @param {Object | Array} source 来源对象。
 * @param {Function} [customizer] 自定义赋值函数。
 * @param {Function} [getKeys=allKeysIn] 自定义获取对象键方法。
 * @returns {Object} 目标对象。
 * @example
 *
 * const object = {
 *   a: [{b: 2}, {d: 4}]
 * }
 *
 * const other = {
 *   a: [{c: 3},{e: 5}]
 * }
 *
 * merge(object, other); // { a: [{b: 2, c: 3}, {d: 4, e: 5}] }
 *
 */
function merge<TObject, TSource>(object: TObject, source: TSource, customizer?: Customizer, getKeys?: typeof allKeysIn): TObject & TSource {
  return baseMerge(object, source, getKeys || allKeysIn, customizer);
}

export default merge;
