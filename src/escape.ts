import toString from './toString';

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * 转义字符串中的 `&` `<` `>` `"` `'` 字符为 HTML 实体字符。
 *
 * 注意：不会转义其他字符。如果需要，可以使用第三方库，如 [he](https://github.com/mathiasbynens/he) 。
 *
 * 虽然 ">" 是对称转义的，字符如 ">" 和 "/" 没有特殊的意义，所以不需要在 HTML 转义。 除非它们是标签的一部分，或者是不带引号的属性值。
 *
 * 当解析 HTML 时，总应该在[属性值上使用引号](http://wonko.com/post/html-escaping)以减少 XSS 的可能性。
 *
 * @static
 * @alias module:String.escape
 * @since 1.0.0
 * @see {@link https://mathiasbynens.be/notes/ambiguous-ampersands | ambiguous-ampersands}
 * @param {string} string 要转义的字符串。
 * @returns {string} 转义后的字符串。
 * @example
 *
 * escape('<script></script>'); // '&lt;script&gt;&lt;/script&gt;'
 *
 * escape('&'); // '&amp;'
 *
 */
function escape(string: string) {
  string = toString(string);
  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, (chr) => {
        // @ts-ignore
        return htmlEscapes[chr];
      })
    : string || '';
}

export default escape;
