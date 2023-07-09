import toString from '../toString';
import words from '../words';

/**
 * 拆分字符串词组。
 *
 * @private
 * @param {string} string 要拆分的字符串。
 * @param {RegExp | string} [pattern] 拆分词组的匹配模式。
 * @returns {string[]} 拆分后的数组。
 */
function splitCaseWords(string: string, pattern?: RegExp | string) {
  return words(toString(string).replace(/['\u2019]/g, ''), pattern);
}

export default splitCaseWords;
