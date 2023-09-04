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

import getTagWithBugfix from '../../../src/internals/getTagWithBugfix';
import '../isMap.test';
import '../isSet.test';
import '../../isDataView.test';
import '../../isWeakMap.test';

describe('dataview & promise', () => {
  it('basic', () => {
    expect(getTagWithBugfix(new DataView(new ArrayBuffer(1)))).toBe('[object DataView]');
    expect(getTagWithBugfix(Promise.resolve())).toBe('[object Promise]');
  });
});
