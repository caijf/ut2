const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * 拆分字符串中的词为数组。
 *
 * @static
 * @alias module:String.words
 * @since 1.0.0
 * @see {@link https://zh.wikipedia.org/wiki/ASCII ASCII}
 * @param {string} string 要拆分的字符串。
 * @param {RegExp | string} [pattern=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g] 匹配模式。默认 `/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g`。
 * @returns {string[]} 拆分后的数组。
 * @example
 *
 * words('fred, barney, & pebbles'); // ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g); // ['fred', 'barney', '&', 'pebbles']
 *
 */
function words(string: string, pattern: RegExp | string = reAsciiWord): string[] {
  return string.match(pattern) || [];
}

export default words;
