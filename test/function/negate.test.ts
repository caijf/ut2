import { isError, negate } from '../../src';

function isEven(n: number) {
  return n % 2 === 0;
}

describe('negate', () => {
  it('basic', () => {
    const ne = negate(isEven);

    // @ts-ignore
    expect(isEven()).toBe(false);
    // @ts-ignore
    expect(ne()).toBe(true);

    expect(isEven(1)).toBe(false);
    expect(ne(1)).toBe(true);

    expect(isEven(2)).toBe(true);
    expect(ne(2)).toBe(false);

    const nums = [1, 2, 3, 4, 5];
    expect(nums.filter(isEven)).toEqual([2, 4]);
    expect(nums.filter(ne)).toEqual([1, 3, 5]);
  });

  it('测试 this 指向', () => {
    const o1 = { age: 100 };
    const o2 = { age: 1 };

    function ageIsEven(this: any) {
      return isEven(this.age);
    }

    const wrap1 = ageIsEven.bind(o1);
    const ne = negate(wrap1);

    expect(wrap1()).toBe(true);
    expect(ne()).toBe(false);

    const wrap2 = ageIsEven.bind(o2);
    const ne2 = negate(wrap2);

    expect(wrap2()).toBe(false);
    expect(ne2()).toBe(true);
  });

  it('非函数的参数', () => {
    try {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ne = negate({});
    } catch (e) {
      expect(isError(e)).toBe(true);
    }
  });
});
