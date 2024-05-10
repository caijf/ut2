import { partition } from '../src';
import { symbol } from './_utils';

describe('partition', () => {
  it('basic', () => {
    const expected1 = partition([1, 0, 1]);
    expect(expected1).toEqual([[1, 1], [0]]);

    const array = [
      [1, 0],
      [0, 1],
      [1, 0]
    ];

    const expected2 = partition(array, 0);
    expect(expected2).toEqual([[array[0], array[2]], [array[1]]]);

    const expected3 = partition(array, 1);
    expect(expected3).toEqual([[array[1]], [array[0], array[2]]]);

    const array2 = [1.3, 1.7, 0.2];

    const expected4 = partition(array2, Math.floor);
    expect(expected4).toEqual([[1.3, 1.7], [0.2]]);

    const array3 = [{ n: 1.3 }, { n: 1.7 }, { n: 0.2 }];

    const expected5 = partition(array3, (item) => Math.floor(item.n));
    expect(expected5).toEqual([[{ n: 1.3 }, { n: 1.7 }], [{ n: 0.2 }]]);

    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false }
    ];

    const expected6 = partition(users, 'active');
    expect(expected6).toEqual([[users[1]], [users[0], users[2]]]);

    const expected7 = partition(users, (item) => item.active);
    expect(expected7).toEqual([[users[1]], [users[0], users[2]]]);

    const expected8 = partition(users, (item) => !item.active && item.age === 1);
    expect(expected8).toEqual([[users[2]], [users[0], users[1]]]);
  });

  it('对象', () => {
    const expected1 = partition({ a: 1, b: 1, c: 2, [symbol]: 3 }, (item) => item > 1);
    expect(expected1).toEqual([
      [2, 3],
      [1, 1]
    ]);

    const expected2 = partition({ a: 'one', b: 'two', c: 'three' }, (item) => item.length === 3);
    expect(expected2).toEqual([['one', 'two'], ['three']]);

    const expected3 = partition({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n) === 6);
    expect(expected3).toEqual([[{ n: 6.1 }, { n: 6.3 }], [{ n: 4.2 }]]);
  });

  it('使用索引或键值', () => {
    const array = [6.1, 4.2, 6.3];
    const object = { a: 1, b: 1, c: 2 };

    const expected1 = partition(array, (_, i) => i % 2 === 0);
    expect(expected1).toEqual([[6.1, 6.3], [4.2]]);

    const expected2 = partition(object, (_, k) => k.indexOf('b') === -1);
    expect(expected2).toEqual([[1, 2], [1]]);
  });
});
