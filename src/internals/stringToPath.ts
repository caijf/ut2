const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * 将字符串路径转为数组路径
 *
 * @private
 * @param {string} value 字符串路径
 * @returns {string[]} 路径数组
 */
function stringToPath(value: string) {
  const result = [];
  // . symbol
  if (value.charCodeAt(0) === 46) {
    result.push('');
  }
  value.replace(rePropName, (match, number, quote, subString) => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    return match;
  });
  return result;
}

export default stringToPath;
