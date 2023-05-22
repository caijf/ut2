import getSymbolsIn from '../../src/internals/getSymbolsIn';

describe('getSymbolsIn', () => {
  it('获取自身及继承的可枚举的 `Symbol` 属性', () => {
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

    expect(getSymbolsIn(obj)).toEqual([Symbol.for('b'), Symbol.for('e'), Symbol.for('a')]);
  });
});
