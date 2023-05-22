import getSymbols from '../../src/internals/getSymbols';

describe('getSymbols', () => {
  it('只获取自身的可枚举 `Symbol` 属性', () => {
    const obj = Object.create({
      [Symbol.for('a')]: 1
    });

    obj[Symbol.for('b')] = 2;
    obj.c = 3;

    Object.defineProperties(obj, {
      [Symbol.for('d')]: {
        value: 4,
        enumerable: false
      },
      [Symbol.for('e')]: {
        value: 5,
        enumerable: true
      }
    });

    expect(getSymbols(obj)).toEqual([Symbol.for('b'), Symbol.for('e')]);
  });

  it('null', () => {
    // @ts-ignore
    expect(getSymbols(null)).toEqual([]);
  });
});
