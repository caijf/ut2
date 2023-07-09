import allKeysIn from './allKeysIn';
import isArray from './isArray';
import isObject from './isObject';
import isObjectLike from './isObjectLike';

type Customizer = (objValue: any, srcValue: any, key: string | symbol, object: any, source: any) => any;

// 内部处理合并和循环引用
function baseMerge<TObject, TSource>(object: TObject, source: TSource, customizer?: Customizer, storage = new WeakMap()) {
  const obj = Object(object);

  if (!isObject(source) || obj === source) {
    return obj;
  }

  const keys = allKeysIn(source as object);

  keys.forEach((key) => {
    // @ts-ignore
    const srcValue = source[key];
    let newValue = typeof customizer === 'function' ? customizer(obj[key], srcValue, key, obj, source) : undefined;

    if (newValue === undefined) {
      newValue = srcValue;
    }

    // 递归处理对象和数组
    if (isObjectLike(newValue) && key in obj && !storage.has(newValue as object)) {
      storage.set(newValue as object, true);

      const objValue = obj[key];
      let newObjValue: any;

      if (isArray(newValue)) {
        newObjValue = isArray(objValue) ? objValue : [];
      } else {
        newObjValue = isObjectLike(objValue) ? objValue : {};
      }

      obj[key] = baseMerge(newObjValue, newValue as any, customizer, storage);
    } else {
      if (newValue !== undefined || (newValue === undefined && !(key in obj))) {
        obj[key] = newValue;
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
 * @static
 * @alias module:Object.merge
 * @since 1.0.0
 * @param {Object | Array} object 目标对象。
 * @param {Object | Array} source 来源对象。
 * @param {Function} [customizer] 自定义赋值函数。
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
function merge<TObject, TSource>(object: TObject, source: TSource, customizer?: Customizer): TObject & TSource {
  return baseMerge(object, source, customizer);
}

export default merge;
