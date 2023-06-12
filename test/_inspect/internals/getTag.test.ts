const nativeActual = jest.requireActual('../../../src/internals/native.ts');
const typeArray = ['DataView', 'Map', 'Promise', 'Set', 'WeakMap'].map(
  (item) => `[object ${item}]`
);

// @ts-ignore
jest.spyOn(globalThis, 'Symbol').mockImplementation(undefined);

jest.mock('../../../src/internals/native.ts', () => {
  return {
    ...nativeActual,
    objectToString() {
      const result = Object.prototype.toString.call(this);
      if (typeArray.includes(result)) {
        return '[object Object]';
      }
      return Object.prototype.toString;
    }
  };
});

import isType from '../../../src/internals/isType';
import '../../isMap.test';
import '../../isSet.test';
import '../../isWeakMap.test';

describe('dataview & promise', () => {
  it('basic', () => {
    expect(isType(new DataView(new ArrayBuffer(1)), 'DataView')).toBe(true);
    expect(isType(Promise.resolve(), 'Promise')).toBe(true);
  });
});
