import { objectKeys, objectValues } from './internals/native';
import isObject from './isObject';
import unescape from './unescape';

/**
 * 创建一个预编译模板字符串方法。
 *
 * @param {string} [string] 模板字符串。可以包含占位符——由美元符号和大括号分隔的嵌入式表达式 `${expression}` 。
 * @returns
 *
 * @example
 * const str = '${name}今年${age}岁。';
 * const compiled = template(str);
 * compiled({ name: '小明', age: 18 }); // 小明今年18岁。
 *
 */
function template(string = '') {
  return function exector(data?: object): string {
    const isObj = isObject(data);
    const keys = isObj ? objectKeys(data) : [];
    const values = isObj ? objectValues(data) : [];
    return new Function(...keys, `return \`${unescape(string)}\``)(...values);
  };
}

export default template;
