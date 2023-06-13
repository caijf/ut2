import conformsTo from './conformsTo';

/**
 * 创建一个函数，调用 `source` 的属性名对应的断言函数与传入对象相对应属性名的值进行断言处理。如果都符合返回 `true`，否则返回 `false` 。
 *
 * @static
 * @alias module:Util.conforms
 * @since 1.0.0
 * @param {Object} source 要断言属性是否符合的对象。
 * @returns {Function} 新的函数。
 * @example
 *
 * const objs =  [
 *   { a: 1, b: 1 },
 *   { a: 2, b: 2 }
 * ]
 *
 * objs.filter(conforms({ b: value => value > 1 })); // [{ a: 2: b: 2 }]
 */
function conforms<
  T extends object,
  K extends keyof T,
  S extends object = Record<string, (value: T[K]) => any>
>(source: S) {
  return function (object: T) {
    return conformsTo(object, source);
  };
}

export default conforms;
