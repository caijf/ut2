import toPath from '../src/toPath';
import { symbol } from './_utils';

describe('toPath', () => {
  it('将字符串转为数组', () => {
    expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(toPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c']);
    expect(toPath('.a.b')).toEqual(['', 'a', 'b']);
    expect(toPath('')).toEqual([]);
  });

  it('设置键为属性路径', () => {
    const obj = { 'a.b': 1 };
    expect(toPath('a.b', obj)).toEqual(['a.b']);
    expect(toPath('a.b')).toEqual(['a', 'b']);
  });

  it('强制数组元素为属性类型', () => {
    const array = ['a', 'b', 'c'];
    const arrObject = array.map((item) => Object(item));

    expect(toPath(array)).toEqual(array);
    expect(toPath(array)).not.toBe(array);
    expect(toPath(arrObject)).toEqual(array);
  });

  it('不强制将 symbol 转为字符串', () => {
    expect(toPath(symbol)).toEqual([symbol]);
    expect(toPath([symbol])).toEqual([symbol]);
  });

  it('处理复杂路径', () => {
    const actual = toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
    expect(actual).toEqual(['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
  });

  it('处理连续空括号和点', () => {
    let expected = ['', 'a'];
    expect(toPath('.a')).toEqual(expected);
    expect(toPath('[].a')).toEqual(expected);

    expected = ['', '', 'a'];
    expect(toPath('..a')).toEqual(expected);
    expect(toPath('[][].a')).toEqual(expected);

    expected = ['a', '', 'b'];
    expect(toPath('a..b')).toEqual(expected);
    expect(toPath('a[].b')).toEqual(expected);

    expected = ['a', '', '', 'b'];
    expect(toPath('a...b')).toEqual(expected);
    expect(toPath('a[][].b')).toEqual(expected);

    expected = ['a', ''];
    expect(toPath('a.')).toEqual(expected);
    expect(toPath('a[]')).toEqual(expected);

    expected = ['a', '', ''];
    expect(toPath('a..')).toEqual(expected);
    expect(toPath('a[][]')).toEqual(expected);
  });

  it('非字符串或数组参数类型', () => {
    expect(toPath(null)).toEqual([]);
    expect(toPath(undefined)).toEqual([]);
    expect(toPath(123)).toEqual(['123']);
    expect(toPath(true)).toEqual(['true']);
    function fn() {}
    fn.toString = () => 'fn';
    expect(toPath(fn)).toEqual(['fn']);
    expect(toPath({})).toEqual(['object Object']); // {} 转为字符串等于 `[object Object]`

    expect(toPath([null])).toEqual(['null']);
    expect(toPath([undefined])).toEqual(['undefined']);
    expect(toPath([{}])).toEqual(['[object Object]']);
  });
});
