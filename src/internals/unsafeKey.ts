/**
 * 判断属性键是否为可能引发原型污染（或破坏原型链）的危险键。
 *
 * - `__proto__` 会改写对象原型；
 * - `constructor` 可经 `constructor.prototype` 触达并修改原型对象。
 *
 * 路径写入/删除类方法（如 `set` `unset` `merge`）应忽略这类键。
 *
 * @private
 * @param {*} key 属性键。
 * @returns {boolean} 如果为危险键返回 `true` 。
 */
function isUnsafeKey(key: any) {
  return key === '__proto__' || key === 'constructor';
}

export default isUnsafeKey;
