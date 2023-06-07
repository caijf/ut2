/**
 * 创建迭代函数。
 *
 * @private
 * @param iteratee 迭代函数或对象属性。
 * @returns 如果参数为函数，返回该函数，否则包装一个返回对象属性的函数。
 */
function createIteratee<T, F extends (value: T) => any, K extends keyof T>(iteratee?: F | K) {
  if (typeof iteratee === 'function') {
    return iteratee;
  }
  if (typeof iteratee === 'string') {
    return (value: any) => value[iteratee];
  }
  return (value: any) => value;
}

export default createIteratee;
