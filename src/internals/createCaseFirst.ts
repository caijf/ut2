import toString from '../toString';

/**
 * 生成一个首个字符串处理的函数。
 *
 * @private
 * @param {string} methodName 首个字符串的大小写方法。
 * @returns {string} 新的大小写函数。
 */
function createCaseFirst(methodName: 'toLowerCase' | 'toUpperCase') {
  return (string: string) => {
    const str = toString(string);
    if (!str) {
      return '';
    }
    return str[0][methodName]() + str.slice(1);
  };
}

export default createCaseFirst;
