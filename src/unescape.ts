const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * 转义字符串中的 HTML 实体字符 `&amp;` `&lt;` `&quot;` `&#39;` 为对应的字符。
 *
 * 注意：不会转换其他的 HTML 实体。如果需要，可以使用第三方库，如 [he](https://github.com/mathiasbynens/he) 。
 *
 * @static
 * @alias module:String.unescape
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * unescape('&lt;script&gt;&lt;/script&gt;'); // '<script></script>'
 *
 * unescape('&amp;'); // '&'
 */
function unescape(string: string) {
  string = String(string);
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, (chr) => {
        // @ts-ignore
        return htmlUnescapes[chr] || "'";
      })
    : string || '';
}

export default unescape;
