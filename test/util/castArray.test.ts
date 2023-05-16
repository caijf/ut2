import { castArray } from '../../src';

describe('castArray', () => {
  it('包装非数组选项', () => {
    const values = [false, '', undefined, null, true, 1, 'a', { a: 1 }];
    const expected = values.map((value) => [value]);
    expect(expected).toEqual(values.map(castArray));

    expect(castArray()).toEqual([]);
  });

  it('如果是数组，返回原值', () => {
    const arr1: any[] = [];
    const arr2 = [1, undefined];
    const arr3 = [{ a: 1 }];

    expect(arr1).toBe(castArray(arr1));
    expect(arr2).toBe(castArray(arr2));
    expect(arr3).toBe(castArray(arr3));
  });
});
