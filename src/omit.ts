import castArray from './castArray';

/**
 * 创建一个对象，该对象由忽略属性之外的 `object` 自身和继承的可枚举属性组成。与 [`pick`](#.pick) 相反。
 *
 * @static
 * @alias module:Object.omit
 * @since 1.0.0
 * @param {object} obj 来源对象。
 * @param {string|string[]} [fields] 要被忽略的属性。
 * @returns {object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * // 浅拷贝对象
 * omit(obj); // { name: "jeff", age: 18 }
 *
 * // 排除单个属性
 * omit(obj, 'name'); // { age: 18 }
 *
 * // 排除多个属性
 * omit(obj, ['name', 'age']); // {}
 *
 */
function omit<T extends object, K extends keyof T>(obj: T, fields: K | K[] = []) {
  const shallowCopy = { ...obj };
  const fieldArr = castArray(fields);

  for (let i = 0; i < fieldArr.length; i++) {
    const field = fieldArr[i];
    delete shallowCopy[field];
  }

  return shallowCopy as Omit<T, K>;
}

export default omit;
