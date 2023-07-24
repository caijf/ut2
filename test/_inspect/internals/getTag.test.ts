const nativeActual = jest.requireActual('../../../src/internals/native.ts');
const typeArray = ['DataView', 'Map', 'Promise', 'Set', 'WeakMap'].map((item) => `[object ${item}]`);

jest.mock('../../../src/internals/native.ts', () => {
  return {
    ...nativeActual,
    objectToString() {
      const result = Object.prototype.toString.call(this);
      if (typeArray.includes(result)) {
        return '[object Object]';
      }
      return result;
    }
  };
});

import { checkType } from '../../../src/internals/checkType';
import '../isMap.test';
import '../isSet.test';
import '../../isDataView.test';
import '../../isWeakMap.test';

describe('dataview & promise', () => {
  it('basic', () => {
    expect(checkType(new DataView(new ArrayBuffer(1)), '[object DataView]')).toBe(true);
    expect(checkType(Promise.resolve(), '[object Promise]')).toBe(true);
  });
});
