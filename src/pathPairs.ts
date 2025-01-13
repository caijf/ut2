import forEach from './forEach';
import { TPath } from './internals/types';
import isObjectLike from './isObjectLike';

/**
 * 将对象转为属性路径/值对的数组。
 *
 * 如果参数是对象，则包含对象自身的可枚举属性（包含 `Symbol` 属性）。
 *
 * 如果参数是数组，则遍历数组。
 *
 * @private
 * @param object 对象或数组
 * @param parentPath 父级属性路径
 * @returns 属性路径/值对的数组。
 */
function basePathPairs(object: Record<string, any> | any[], parentPath: TPath[] = []) {
  const result: [TPath[], any][] = [];
  if (isObjectLike(object)) {
    forEach(object, (v, k) => {
      const currentPath = parentPath.concat([k]);
      if (isObjectLike(v)) {
        result.push(...basePathPairs(v, currentPath));
      } else {
        result.push([currentPath, v]);
      }
    });
  }
  return result;
}

/**
 * 将对象转为属性路径/值对的数组。与 [`fromPathPairs`](#.fromPathPairs) 相反。
 *
 * @alias module:Object.pathPairs
 * @since 1.16.0
 * @param {Object|Array} object 对象或数组。
 * @returns {Array} 属性路径/值对的数组。
 * @example
 * pathPairs({ date: { start: '2024-10-10', end: '2024-12-31' } });
 * // [
 * //   [['date', 'start'], '2024-10-10'],
 * //   [['date', 'end'], '2024-12-31']
 * // ]
 *
 * pathPairs({ date: ['2024-10-10', '2024-12-31'] });
 * // [
 * //   [['date', 0], '2024-10-10'],
 * //   [['date', 1], '2024-12-31']
 * // ]
 *
 * pathPairs([{ date: '2024-10-10' }, { date: '2024-12-31' }]);
 * // [
 * //   [[0, 'date'], '2024-10-10'],
 * //   [[1, 'date'], '2024-12-31']
 * // ]
 *
 */
function pathPairs(object: Record<string, any> | any[]) {
  return basePathPairs(object);
}

export default pathPairs;
