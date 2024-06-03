const reRegExpChar = /[\\^$.*+?\-()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * 转义 `RegExp` 字符串中特殊的字符 `\\` `^` `$` `.` `*` `+` `?` `-` `(` `)` `[` `]` `{` `}` `|` 。
 *
 * @static
 * @alias module:String.escapeRegExp
 * @since 1.0.0
 * @see {@link https://tc39.es/ecma262/multipage/text-processing.html#sec-patterns syntax characters}
 * @param {string} string 要转义的字符串。
 * @returns {string} 转义后的字符串。
 * @example
 *
 * escapeRegExp('\\'); // '\\\\'
 *
 * escapeRegExp('-+='); // '\\-\\+='
 *
 * escapeRegExp('[ut2](https://caijf.github.io/ut2/)'); // '\\[ut2\\]\\(https://caijf\\.github\\.io/ut2/\\)'
 *
 */
function escapeRegExp(string: string) {
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string || '';
}

export default escapeRegExp;
