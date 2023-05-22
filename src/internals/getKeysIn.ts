/**
 * 创建一个数组，包含对象自身及继承的可枚举属性（不包含 `Symbol` 属性）。
 *
 * @param {object} obj 要查询的对象
 * @returns {string[]} 对象可枚举的属性
 */
function getKeysIn(obj: object) {
  const result = [];
  for (const key in obj) {
    result.push(key);
  }
  return result;
}

export default getKeysIn;
