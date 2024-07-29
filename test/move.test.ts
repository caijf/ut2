import { move } from '../src';

describe('move', () => {
  it('basic', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(move(arr, 0, 1)).toEqual(['b', 'a', 'c', 'd']);
    expect(move(arr, -2, 0)).toEqual(['c', 'a', 'b', 'd']);
  });

  it('非数组报错', () => {
    const obj = { a: 1, b: 2, c: 3 };
    function ExpectedError() {
      move(obj as any, 0, 1);
    }
    expect(ExpectedError).toThrow('array.slice is not a function');
  });
});
