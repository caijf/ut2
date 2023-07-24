import { checkType } from './internals/checkType';
import { mapTag } from './internals/native';
import { nodeIsMap } from './internals/nodeUtil';

/**
 * 检查值是否为 `Map` 对象。
 *
 * @static
 * @alias module:Language.isMap
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Map` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isMap(new Map); // true
 *
 * isMap(new WeakMap); // false
 *
 */
function isMap(value: any): value is Map<any, any> {
  return nodeIsMap ? nodeIsMap(value) : checkType(value, mapTag);
}

export default isMap;
