import { partition } from '../src';

describe('partition', () => {
  it('basic', () => {
    expect(partition([1, 0, 1])).toEqual([[1, 1], [0]]);

    const array = [
      [1, 0],
      [0, 1],
      [1, 0]
    ];
    expect(partition(array, 0)).toEqual([[array[0], array[2]], [array[1]]]);
    expect(partition(array, 1)).toEqual([[array[1]], [array[0], array[2]]]);

    const array2 = [1.3, 1.7, 0.2];
    expect(partition(array2, Math.floor)).toEqual([[1.3, 1.7], [0.2]]);

    const array3 = [{ n: 1.3 }, { n: 1.7 }, { n: 0.2 }];
    expect(partition(array3, (item) => Math.floor(item.n))).toEqual([
      [{ n: 1.3 }, { n: 1.7 }],
      [{ n: 0.2 }]
    ]);

    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false }
    ];

    expect(partition(users, 'active')).toEqual([[users[1]], [users[0], users[2]]]);
    expect(partition(users, (item) => item.active)).toEqual([[users[1]], [users[0], users[2]]]);
    expect(partition(users, (item) => !item.active && item.age === 1)).toEqual([
      [users[2]],
      [users[0], users[1]]
    ]);
  });
});
