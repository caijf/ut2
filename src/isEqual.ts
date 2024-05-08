import isEqualDeep from './internals/isEqualDeep';
import { nativeUndefined } from './internals/native';

/**
 * 深度比较两个值是否相等。
 *
 * 支持比较 `boolean` `number` `string` `symbol` `array` `array buffer` `date` `error` `map` `object` `regexp` `set` `typed array` 类型。对象只比较自身的属性，不包括继承和不可枚举的属性。
 *
 * 如果 `strictCheck=true` , 以下值不相等：
 *
 * 1. `0` `-0`
 * 2. `typeof` 不同类型，如 `1` `Object(1)`
 * 3. 无效日期对象，如 `new Date('')` `new Date('abc')`
 *
 * @static
 * @alias module:Language.isEqual
 * @since 1.3.0
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @param {Function} [customizer] 自定义比较。
 * @param {boolean} [strictCheck=false] 严格比较，默认 `false` 。
 * @returns {boolean} 如果两个值相等，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * const value = { a: 1, b: -0 }
 * const other = { a: 1, b: 0 }
 *
 * isEqual(value, other); // true
 * value === other // false
 *
 * // 严格比较
 * isEqual(value, other, undefined, true); // false
 *
 * // 自定义比较
 * function customizer(value, other){
 *   if(typeof value === 'string' && typeof other === 'string'){
 *     return true;
 *   }
 * }
 * isEqual('a', 'b', customizer); // true
 * isEqual(['a'], ['b'], customizer); // true
 * isEqual({foo: 'a'}, {foo: 'b'}, customizer); // true
 *
 */
function isEqual(value: any, other: any, customizer?: Parameters<typeof isEqualDeep>[2], strictCheck = false) {
  // 自定义比较
  if (typeof customizer === 'function') {
    const result = customizer(value, other);
    if (result !== nativeUndefined) {
      return !!result;
    }
  }
  return isEqualDeep(value, other, customizer, strictCheck);
}

export default isEqual;
