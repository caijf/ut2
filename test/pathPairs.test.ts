import { pathPairs } from '../src';

describe('pathPairs 函数测试', () => {
  test('应正确转换简单对象', () => {
    const input = { start: '2024-10-10', end: '2024-12-31' };
    const expectedOutput = [
      [['start'], '2024-10-10'],
      [['end'], '2024-12-31']
    ];
    expect(pathPairs(input)).toEqual(expectedOutput);

    expect(pathPairs({ date: { start: '2024-10-10', end: '2024-12-31' } })).toEqual([
      [['date', 'start'], '2024-10-10'],
      [['date', 'end'], '2024-12-31']
    ]);

    expect(pathPairs({ date: ['2024-10-10', '2024-12-31'] })).toEqual([
      [['date', 0], '2024-10-10'],
      [['date', 1], '2024-12-31']
    ]);

    expect(pathPairs([{ date: '2024-10-10' }, { date: '2024-12-31' }])).toEqual([
      [[0, 'date'], '2024-10-10'],
      [[1, 'date'], '2024-12-31']
    ]);
  });

  test('应处理数字转换为数组', () => {
    expect(pathPairs([{ name: 'jack' }, { name: 'freedom' }])).toEqual([
      [[0, 'name'], 'jack'],
      [[1, 'name'], 'freedom']
    ]);
    expect(pathPairs([[null, { users: [{ foo: 1 }, [{ bar: 'baz' }]] }, null, { name: 'jack' }], { name: 'freedom' }])).toEqual([
      [[0, 0], null],
      [[0, 1, 'users', 0, 'foo'], 1],
      [[0, 1, 'users', 1, 0, 'bar'], 'baz'],
      [[0, 2], null],
      [[0, 3, 'name'], 'jack'],
      [[1, 'name'], 'freedom']
    ]);
  });

  test('应正确处理嵌套对象', () => {
    const input = { date: { start: '2024-10-10', end: '2025-12-31' } };
    const expectedOutput = [
      [['date', 'start'], '2024-10-10'],
      [['date', 'end'], '2025-12-31']
    ];
    expect(pathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理空对象', () => {
    const input = {};
    const expectedOutput: any[] = [];
    expect(pathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理数组', () => {
    const input = ['2024-10-10', '2025-12-31'];
    const expectedOutput = [
      [[0], '2024-10-10'],
      [[1], '2025-12-31']
    ];
    expect(pathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理复杂结构', () => {
    const input = { a: { b: { c: 1 } }, d: 2 };
    const expectedOutput = [
      [['a', 'b', 'c'], 1],
      [['d'], 2]
    ];
    expect(pathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理非对象和非数组的输入', () => {
    const input = null;
    // @ts-ignore
    expect(pathPairs(input)).toEqual([]);

    const input2 = 42;
    // @ts-ignore
    expect(pathPairs(input2)).toEqual([]);

    const input3 = 'string';
    // @ts-ignore
    expect(pathPairs(input3)).toEqual([]);
  });
});
