import identity from '../identity';
import isSymbol from '../isSymbol';

export type IterateeParam<T> = ((value: T, ...args: any[]) => any) | keyof T;

/**
 * 创建迭代函数。
 *
 * @private
 * @param {Function} iteratee 迭代函数或对象属性。
 * @returns {Function} 如果参数为函数，返回该函数，否则包装一个返回对象属性的函数。
 */
function createIteratee<T>(iteratee?: IterateeParam<T>) {
  if (typeof iteratee === 'function') {
    return iteratee;
  }

  // 属性键值可能为 Symbol, string, number
  if (typeof iteratee === 'string' || typeof iteratee === 'number' || isSymbol(iteratee)) {
    return (value: any) => value[iteratee];
  }
  return identity;
}

export default createIteratee;
