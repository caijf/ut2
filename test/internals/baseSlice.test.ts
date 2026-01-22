import baseSlice from '../../src/internals/baseSlice';

describe('baseSlice', () => {
  it('basic', () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(baseSlice(array, 0, 3)).toEqual([0, 1, 2]);
    expect(baseSlice(array, 3, 6)).toEqual([3, 4, 5]);
  });

  it('negative index', () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(baseSlice(array, -3, -1)).toEqual([3, 4]);
  });

  it('start greater than end', () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(baseSlice(array, 10, 5)).toEqual([]);
  });

  it('out of range index', () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(baseSlice(array, 0, 10)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(baseSlice(array, -10, 10)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
