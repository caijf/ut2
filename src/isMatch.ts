import allKeys from './allKeys';
import { checkType } from './internals/checkType';
import { objectTag } from './internals/native';
import isEqual from './isEqual';

// 是否需要深比较
function isDeepComparable(object: any, source: any) {
  return checkType(object, objectTag) && checkType(source, objectTag);
}

type Customizer = (objValue: any, srcValue: any, key?: number | string | symbol, object?: any, source?: any, objStack?: any[], srcStack?: any[]) => void | undefined | boolean;

function baseIsMatch(object: Record<string | symbol, any>, source: Record<string | symbol, any>, customizer?: Customizer, strictCheck?: boolean, objStack?: any[], srcStack?: any[], executedCustomizer = false) {
  const hasCustomizer = typeof customizer === 'function';

  if (isDeepComparable(object, source)) {
    // 假设循环结构是相等的。
    objStack = objStack || [];
    srcStack = srcStack || [];
    let stackLen = objStack.length;

    while (stackLen--) {
      // 遍历对象的堆栈，如果存在循环依赖，立即进行比较。
      // 相等才退出，否则必须匹配。
      if (objStack[stackLen] === object && srcStack[stackLen] === source) {
        return true;
      }
    }

    // 将对象添加到遍历对象的堆栈中。
    objStack.push(object);
    srcStack.push(source);

    const keys = allKeys(source);
    let length = keys.length;

    while (length--) {
      const key = keys[length];
      if (!(key in object)) {
        return false;
      }

      let compared: void | undefined | boolean;

      if (hasCustomizer) {
        compared = customizer(object[key], source[key], key, object, source, objStack, srcStack);
      }

      if (compared !== undefined) {
        if (!compared) {
          return false;
        }
        continue;
      }

      // 循环对象
      if (!baseIsMatch(object[key], source[key], customizer, strictCheck, objStack, srcStack, true)) {
        return false;
      }
    }

    // 从遍历对象的堆栈中删除
    objStack.pop();
    srcStack.pop();
    return true;
  }

  // 非对象比较
  const result = isEqual(
    object,
    source,
    (objValue, srcValue, k, obj, src) => {
      if (!executedCustomizer && hasCustomizer) {
        const compared = customizer(objValue, srcValue, k, obj, src, objStack, srcStack);
        if (compared !== undefined) {
          return compared;
        }
      }
      executedCustomizer = false;
      if (isDeepComparable(objValue, srcValue)) {
        return baseIsMatch(objValue, srcValue, customizer, strictCheck, objStack, srcStack);
      }
    },
    strictCheck
  );

  return result;
}

/**
 * 执行一个深比较，确定 `object` 是否含有和 `source` 完全相等的属性值。
 *
 * 注意：只有普通对象才会执行部分匹配，函数、数组不会执行部分匹配。
 *
 * 如果 `strictCheck=true` , 以下值不相等：
 *
 * 1. `0` `-0`
 * 2. `typeof` 不同类型，如 `1` `Object(1)`
 * 3. 无效日期对象，如 `new Date('')` `new Date('abc')`
 *
 * @static
 * @alias module:Language.isMatch
 * @since 1.4.0
 * @requires module:Language.isEqual
 * @param {Object} object 要检查的对象。
 * @param {Object} source 属性值相匹配的对象。
 * @param {Function} [customizer] 自定义比较。
 * @param {boolean} [strictCheck=false] 严格比较。
 * @returns {boolean} 如果 `object` 匹配，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * const object = { a: 1, b: -0 }
 *
 * isMatch(object, { a: 1 }); // true
 * isMatch(object, { b: 0 }); // true
 *
 * // 严格比较
 * isMatch(object, { b: 0 }, undefined, true); // false
 *
 * // 自定义比较
 * function customizer(objValue, srcValue){
 *   if(typeof objValue === 'string' && typeof srcValue === 'string'){
 *     return true;
 *   }
 * }
 * isMatch({ foo: 'a' }, { foo: 'b' }, customizer); // true
 * isMatch({ foo: ['a'] }, { foo: ['b'] }, customizer); // true
 * isMatch({ foo: 'a' }, { foo: 'b' }, customizer); // true
 *
 */
function isMatch(object: object, source: object, customizer?: Customizer, strictCheck = false) {
  if (typeof customizer === 'function') {
    const compared = customizer(object, source);
    if (compared !== undefined) {
      return !!compared;
    }
  }

  return baseIsMatch(object, source, customizer, strictCheck, undefined, undefined, true);
}

export default isMatch;
