import stringToPath from '../../src/internals/stringToPath';

describe('stringToPath', () => {
  test('处理字符为属性路径数组', () => {
    expect(stringToPath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(stringToPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c']);
    expect(stringToPath('a["b"].c')).toEqual(['a', 'b', 'c']);
    expect(stringToPath('.a.b')).toEqual(['', 'a', 'b']);
  });

  test('处理转义字符', () => {
    expect(stringToPath('a\\.b')).toEqual(['a\\', 'b']);
    expect(stringToPath('a[0].b')).toEqual(['a', '0', 'b']);
  });

  test('空字符串返回一个空数组', () => {
    expect(stringToPath('')).toEqual([]);
  });

  test('非字符串类型参数报错', () => {
    // @ts-ignore
    expect(() => stringToPath(123)).toThrow();
    // @ts-ignore
    expect(() => stringToPath(true)).toThrow();
    // @ts-ignore
    expect(() => stringToPath([])).toThrow();
  });
});
