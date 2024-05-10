import { orderBy } from '../src';
import { symbol } from './_utils';

describe('orderBy', () => {
  const objects = [
    { a: 'x', b: 3 },
    { a: 'y', b: 4 },
    { a: 'x', b: 1 },
    { a: 'y', b: 2 }
  ];

  const nestedObj = [
    { id: '4', address: { zipCode: 4, streetName: 'Beta' } },
    { id: '3', address: { zipCode: 3, streetName: 'Alpha' } },
    { id: '1', address: { zipCode: 1, streetName: 'Alpha' } },
    { id: '2', address: { zipCode: 2, streetName: 'Alpha' } },
    { id: '5', address: { zipCode: 4, streetName: 'Alpha' } }
  ];

  it('单属性排序', () => {
    const expected1 = orderBy(objects, 'a', 'desc');
    expect(expected1).toEqual([objects[1], objects[3], objects[0], objects[2]]);

    const expected2 = orderBy(objects, ['a'], ['desc']);
    expect(expected2).toEqual([objects[1], objects[3], objects[0], objects[2]]);

    // 默认参数
    const expected3 = orderBy([4, 1, 3, 2, 5]);
    expect(expected3).toEqual([1, 2, 3, 4, 5]);

    const expected4 = orderBy(objects, 'a');
    expect(expected4).toEqual([objects[0], objects[2], objects[1], objects[3]]);

    const expected5 = orderBy([-1, -2, -0]);
    expect(expected5).toEqual([-2, -1, -0]);

    const expected6 = orderBy(['-1', '-2', '-0']);
    expect(expected6).toEqual(['-0', '-1', '-2']);
  });

  it('多属性排序', () => {
    const expected1 = orderBy(objects, ['a', 'b'], ['desc', 'asc']);
    expect(expected1).toEqual([objects[3], objects[1], objects[2], objects[0]]);

    const expected2 = orderBy(objects, ['a', 'b'], ['asc', 'asc']);
    expect(expected2).toEqual([objects[2], objects[0], objects[3], objects[1]]);
  });

  it('嵌套对象', () => {
    const expected1 = orderBy(nestedObj, [(item) => item.address.zipCode, (item) => item.address.streetName], ['asc', 'desc']);
    expect(expected1).toEqual([nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]]);
  });

  it('自定义排序比较方法', () => {
    // 降序
    const expected1 = orderBy(objects, 'b', (a, b) => (a > b ? -1 : a < b ? 1 : 0));
    expect(expected1).toEqual([objects[1], objects[0], objects[3], objects[2]]);
  });

  it('含有 `Symbol` 值排序', () => {
    // symbol 类型值升序排最后
    expect(orderBy([symbol, {}, []])).toEqual([[], {}, symbol]);
    expect(orderBy([{}, symbol, []])).toEqual([[], {}, symbol]);
    expect(orderBy([{}, [], symbol])).toEqual([[], {}, symbol]);
    expect(orderBy([[], {}, symbol])).toEqual([[], {}, symbol]);

    // symbol 类型值降序排前面
    expect(orderBy([symbol, {}, []], (item) => item, 'desc')).toEqual([symbol, {}, []]);
    expect(orderBy([{}, symbol, []], (item) => item, 'desc')).toEqual([symbol, {}, []]);
    expect(orderBy([{}, [], symbol], (item) => item, 'desc')).toEqual([symbol, {}, []]);
    expect(orderBy([[], {}, symbol], (item) => item, 'desc')).toEqual([symbol, {}, []]);

    // symbol 和 symbol 顺序不变
    const s1 = Symbol.for('a');
    const s2 = Symbol.for('b');
    expect(orderBy([3, s2, 1, 5, s1, 4, 'z', 2])).toEqual([1, 2, 3, 4, 5, 'z', s2, s1]);
    expect(orderBy([3, s1, 1, 5, s2, 4, 'z', 2])).toEqual([1, 2, 3, 4, 5, 'z', s1, s2]);

    expect(orderBy([3, s2, 1, 5, s1, 4, 'z', 2], (item) => item, 'desc')).toEqual([s2, s1, 'z', 5, 4, 3, 2, 1]);
    expect(orderBy([3, s1, 1, 5, s2, 4, 'z', 2], (item) => item, 'desc')).toEqual([s1, s2, 'z', 5, 4, 3, 2, 1]);
  });

  it('对象', () => {
    const expected1 = orderBy({ a: 1, b: 1, c: 2, [symbol]: 3 });
    expect(expected1).toEqual([1, 1, 2, 3]);

    const expected2 = orderBy({ a: 'one', b: 'two', c: 'three' }, 'length');
    expect(expected2).toEqual(['one', 'two', 'three']);

    const expected3 = orderBy({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n));
    expect(expected3).toEqual([{ n: 4.2 }, { n: 6.1 }, { n: 6.3 }]);
  });

  it('使用索引或键值', () => {
    const array = [6.1, 4.2, 6.3];
    const object = { a: 1, b: 1, c: 2 };

    const expected1 = orderBy(array, (_, i) => -i);
    expect(expected1).toEqual([6.3, 4.2, 6.1]);

    const expected2 = orderBy(object, (_, k) => k.indexOf('b'));
    expect(expected2).toEqual([1, 2, 1]);
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      expect(orderBy(item)).toEqual([]);
    });
  });
});
