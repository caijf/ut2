import { MAX_SAFE_INTEGER } from './internals/native';

// 计数器
let idCounter = 0;

// 前缀计数器
let prefixCounter = 10;

// 进制
const RADIX = 32;

// 默认前缀
const defaultPrefix = '_ut';

/**
 * 生成唯一ID。如果提供了 `prefix`，会被添加到ID前缀上。
 *
 * 前缀+前缀计数器+计数器组合。
 *
 * 规则如下：
 *  1. 前缀计数器和计数器都是`32进制`。
 *  2. 计数器超过 `MAX_SAFE_INTEGER` 且前缀计数器超过 `MAX_SAFE_INTEGER` 后，前缀计数器会重置为 `10`。
 *  3. 计数器超过 `MAX_SAFE_INTEGER` 后，会重置为`0`。
 *
 * 理论上调用次数超过 `MAX_SAFE_INTEGER * MAX_SAFE_INTEGER = 8.112963841460666e+31` 次，会导致前缀计数器和计数器产生重复。
 *
 * 注：`MAX_SAFE_INTEGER` 为 `9007199254740991`。
 *
 * @alias module:Util.uniqueId
 * @since 1.0.0
 * @see {@link https://stackoverflow.com/questions/29183818/why-use-tostring32-and-not-tostring36 | Why use .toString(32) and not .toString(36)?}
 * @param {string} [prefix] 要添加到ID前缀的值。默认 `_ut`。
 * @returns {string} 唯一ID。
 * @example
 *
 * uniqueId(); // '_uta1'
 *
 * uniqueId(); // '_uta2'
 *
 * uniqueId('abc_'); // 'abc_a3'
 *
 */
function uniqueId(prefix = defaultPrefix) {
  if (idCounter >= MAX_SAFE_INTEGER) {
    prefixCounter = prefixCounter >= MAX_SAFE_INTEGER ? 10 : prefixCounter + 1;
  }
  idCounter = idCounter >= MAX_SAFE_INTEGER ? 0 : idCounter + 1;
  return prefix + prefixCounter.toString(RADIX) + idCounter.toString(RADIX);
}

export default uniqueId;
