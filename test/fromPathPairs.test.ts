import { fromPathPairs, list } from '../src';
import { symbol } from './_utils';

describe('fromPathPairs', () => {
  // 正面测试用例
  test('应正确转换路径对为对象', () => {
    const input = [
      [['start'], '2024-10-10'],
      [['end'], '2024-12-31']
    ];
    const expectedOutput = { start: '2024-10-10', end: '2024-12-31' };
    expect(fromPathPairs(input)).toEqual(expectedOutput);

    expect(
      fromPathPairs([
        [['date', 'start'], '2024-10-10'],
        [['date', 'end'], '2024-12-31']
      ])
    ).toEqual({ date: { start: '2024-10-10', end: '2024-12-31' } });

    expect(
      fromPathPairs([
        [['date', 0], '2024-10-10'],
        [['date', 1], '2024-12-31']
      ])
    ).toEqual({ date: ['2024-10-10', '2024-12-31'] });

    expect(
      fromPathPairs([
        [[0, 'date'], '2024-10-10'],
        [[1, 'date'], '2024-12-31']
      ])
    ).toEqual([{ date: '2024-10-10' }, { date: '2024-12-31' }]);
  });

  test('应处理数组嵌套转换', () => {
    expect(
      fromPathPairs([
        [[0, 'name'], 'jack'],
        [[1, 'name'], 'freedom']
      ])
    ).toEqual([{ name: 'jack' }, { name: 'freedom' }]);

    expect(
      fromPathPairs([
        [[0, 0], null],
        [[0, 1, 'users', 0, 'foo'], 1],
        [[0, 1, 'users', 1, 0, 'bar'], 'baz'],
        [[0, 2], null],
        [[0, 3, 'name'], 'jack'],
        [[1, 'name'], 'freedom']
      ])
    ).toEqual([[null, { users: [{ foo: 1 }, [{ bar: 'baz' }]] }, null, { name: 'jack' }], { name: 'freedom' }]);

    expect(fromPathPairs([[[5, 1], 0]])).toEqual([undefined, undefined, undefined, undefined, undefined, [undefined, 0]]);
  });

  test('应支持嵌套路径', () => {
    const input = [
      [['user', 'details', 'name'], 'Alice'],
      [['user', 'details', 'age'], 30]
    ];
    const expectedOutput = { user: { details: { name: 'Alice', age: 30 } } };
    expect(fromPathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理空输入', () => {
    const input: any[] = [];
    const expectedOutput = {};
    expect(fromPathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理只有一个路径对的情况', () => {
    const input = [[['singleKey'], 'singleValue']];
    const expectedOutput = { singleKey: 'singleValue' };
    expect(fromPathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理同一属性路径同时存在字符串和数字', () => {
    expect(
      fromPathPairs([
        [['date'], '2024-10-10'],
        [[0], '2024-12-31']
      ])
    ).toEqual({ date: '2024-10-10', '0': '2024-12-31' });

    const result = ['2024-12-31'] as any;
    result.date = '2024-10-10';
    expect(
      fromPathPairs([
        [[0], '2024-12-31'],
        [['date'], '2024-10-10']
      ])
    ).toEqual(result);

    expect(
      fromPathPairs([
        [['foo'], 'baz'],
        [[0], 42]
      ])
    ).toEqual({ foo: 'baz', '0': 42 });

    const result2 = [42] as any;
    result2.foo = 'baz';
    expect(
      fromPathPairs([
        [[0], 42],
        [['foo'], 'baz']
      ])
    ).toEqual(result2);
  });

  test('应处理 symbol 属性', () => {
    expect(fromPathPairs([[[symbol], 42]])).toEqual({ [symbol]: 42 });
    expect(fromPathPairs([[[0, symbol], symbol]])).toEqual([{ [symbol]: symbol }]);
  });

  // 负面测试用例
  test('应处理无效输入', () => {
    const input = null;
    // @ts-ignore
    expect(fromPathPairs(input)).toEqual({});
  });

  test('应处理不正确格式的路径对', () => {
    const input = [[123, 'value']];
    const expectedOutput = {};
    expect(fromPathPairs(input)).toEqual(expectedOutput);
  });

  test('应处理路径对中缺少值的情况', () => {
    const input = [[['keyMissingValue']]];
    const expectedOutput = {};
    expect(fromPathPairs(input)).toEqual(expectedOutput);
  });

  // 性能测试（简单示例）
  test('应在合理时间内处理大数据集', () => {
    const input = list(10000, (i) => [[`key${i}`], `value${i}`]);
    const startTime = performance.now();
    fromPathPairs(input);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // 期望在100毫秒内完成
  });
});
