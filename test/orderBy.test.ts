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
    expect(orderBy(objects, 'a', 'desc')).toEqual([objects[1], objects[3], objects[0], objects[2]]);
    expect(orderBy(objects, ['a'], ['desc'])).toEqual([
      objects[1],
      objects[3],
      objects[0],
      objects[2]
    ]);

    // 默认参数
    expect(orderBy([4, 1, 3, 2, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(orderBy(objects, 'a')).toEqual([objects[0], objects[2], objects[1], objects[3]]);
  });

  it('多属性排序', () => {
    expect(orderBy(objects, ['a', 'b'], ['desc', 'asc'])).toEqual([
      objects[3],
      objects[1],
      objects[2],
      objects[0]
    ]);
    expect(orderBy(objects, ['a', 'b'], ['asc', 'asc'])).toEqual([
      objects[2],
      objects[0],
      objects[3],
      objects[1]
    ]);
  });

  it('嵌套对象', () => {
    expect(
      orderBy(
        nestedObj,
        [(item) => item.address.zipCode, (item) => item.address.streetName],
        ['asc', 'desc']
      )
    ).toEqual([nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]]);
  });

  it('自定义排序比较方法', () => {
    // 降序
    expect(orderBy(objects, 'b', (a, b) => (a > b ? -1 : a < b ? 1 : 0))).toEqual([
      objects[1],
      objects[0],
      objects[3],
      objects[2]
    ]);
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      // @ts-ignore
      expect(orderBy(item)).toEqual([]);
    });
  });
});
