import { range } from '../src';

describe('range', () => {
  it('basic', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(-4)).toEqual([0, -1, -2, -3]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
    expect(range(1, 4, 0)).toEqual([1, 2, 3]);
    expect(range(0)).toEqual([]);
  });

  it('升序数组', () => {
    expect(range(5, 8)).toEqual([5, 6, 7]);
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it('降序数组', () => {
    expect(range(8, 5)).toEqual([8, 7, 6]);
    expect(range(-3)).toEqual([0, -1, -2]);
  });

  it('保留 -0 符号', () => {
    expect(1 / range(0, 1)[0]).toBe(Infinity);
    expect(1 / range(-0, 1)[0]).toBe(-Infinity);
  });

  it('1 个参数时，该参数为结束值，开始值默认为 0 ，步进值默认为 1 或 -1', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it('2 个参数时，表示为开始值和结束值，步进值默认为 1 或 -1', () => {
    expect(range(0, 3)).toEqual([0, 1, 2]);
    expect(range(0, -3)).toEqual([0, -1, -2]);
  });

  it('自定义增加或减小的值', () => {
    expect(range(3, 10, 3)).toEqual([3, 6, 9]);
    expect(range(-3, -10, -3)).toEqual([-3, -6, -9]);
  });

  it('如果步进值为 "0" "" null undefined，默认为 1 或 -1', () => {
    expect(range(0, 3, 0)).toEqual([0, 1, 2]);
    expect(range(0, -3, 0)).toEqual([0, -1, -2]);
    // @ts-ignore
    expect(range(0, 3, '')).toEqual([0, 1, 2]);
    // @ts-ignore
    expect(range(0, -3, '')).toEqual([0, -1, -2]);

    // @ts-ignore
    expect(range(0, 3, undefined)).toEqual([0, 1, 2]);
    // @ts-ignore
    expect(range(0, 3, null)).toEqual([0, 1, 2]);
    // @ts-ignore
    expect(range(0, 3, 'a')).toEqual([0, 1, 2]);
  });

  it('步进值升序大于结束值，或降序小于开始值', () => {
    expect(range(0, 10, 100)).toEqual([0]);
    expect(range(0, -10, -100)).toEqual([0]);
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(range('a', 'b', 'c')).toEqual([]);
    expect(range(0, 0, 0)).toEqual([]);
    expect(range(1, 1, 1)).toEqual([]);

    // 超出数组长度
    function exception() {
      return range(Infinity);
    }
    expect(exception).toThrow('Invalid array length');
  });
});
