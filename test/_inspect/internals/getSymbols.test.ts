jest.mock('../../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../../src/internals/native.ts');

  return {
    ...originalModule,
    objectGetOwnPropertySymbols: undefined
  };
});

import getSymbols from '../../../src/internals/getSymbols';

describe('getSymbols', () => {
  it('兼容不支持 Object.getOwnPropertySymbols ', () => {
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

    expect(getSymbols(obj)).toEqual([]);
  });

  it('null', () => {
    // @ts-ignore
    expect(getSymbols(null)).toEqual([]);
  });
});
