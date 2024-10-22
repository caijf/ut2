import isObject from './isObject';

/**
 * 检测值是否类似 `Promise` 对象。
 *
 * 如果一个对象包含 `then` 方法，它就是类似 `Promise` 对象。
 *
 * @alias module:Language.isPromiseLike
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值类似 `Promise` 对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isPromiseLike(Promise.resolve()); // true
 *
 * isPromiseLike({ then: () => { } }); // true
 *
 * isPromiseLike([]); // false
 *
 */
function isPromiseLike(value: any): value is Promise<any> | PromiseLike<any> {
  return isObject(value) && typeof (value as Promise<any>).then === 'function';
}

export default isPromiseLike;
