import isIndex from './internals/isIndex';
import { nativeUndefined } from './internals/native';
import isArray from './isArray';
import isObject from './isObject';
import set from './set';

// 调用函数时，参数难以断言元祖类型
// type TPathPair = [Many<TPath>, any];

/**
 * 将属性路径/值对的数组转为对象。与 [`pathPairs`](#.pathPairs) 相反。
 *
 * 如果属性路径为有效索引数字（数字或字符串）且没有值时，将创建数组，否则创建对象。例如：
 *
 * ```typescript
 * fromPathPairs([[[0], 42], [["foo"], "baz"]]);
 * // [42, foo: 'baz']
 *
 * // 调整顺序后
 * fromPathPairs([[["foo"], "baz"], [[0], 42]]);
 * // { foo: 'baz', '0': 42 }
 * ```
 *
 * @alias module:Object.fromPathPairs
 * @since 1.16.0
 * @param {Array} value 属性路径/值对的数组。
 * @returns {Object | Array} 转换后的对象或数组。
 * @param {Function} [customizer] 自定义指定值。
 * @example
 * fromPathPairs([
 *   [['date', 'start'], '2024-10-10'],
 *   [['date', 'end'], '2024-12-31']
 * ]);
 * // { date: { start: '2024-10-10', end: '2024-12-31' } }
 *
 * fromPathPairs([
 *   [['date', 0], '2024-10-10'],
 *   [['date', 1], '2024-12-31']
 * ]);
 * // { date: ['2024-10-10', '2024-12-31'] }
 *
 * fromPathPairs([
 *   [[0, 'date'], '2024-10-10'],
 *   [[1, 'date'], '2024-12-31']
 * ]);
 * // [{ date: '2024-10-10' }, { date: '2024-12-31' }]
 *
 */
function fromPathPairs(value: any[], customizer?: Parameters<typeof set>[3]) {
  const valueIsArray = isArray(value);
  const firstPairPath = valueIsArray && isArray(value[0]) && isArray(value[0][0]) ? value[0][0] : [];
  const firstNode = customizer ? customizer(nativeUndefined, firstPairPath[0], nativeUndefined) : nativeUndefined;
  const result: any = isObject(firstNode) ? firstNode : isIndex(firstPairPath[0]) ? [] : {};

  const length = valueIsArray ? value.length : 0;
  let index = -1;

  while (++index < length) {
    const pathPair = value[index];

    if (isArray(pathPair)) {
      const [paths, val] = pathPair;
      set(result, paths, val, customizer);
    }
  }

  return result;
}

export default fromPathPairs;
