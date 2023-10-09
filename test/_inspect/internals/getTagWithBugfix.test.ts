const typeArray = ['DataView', 'Map', 'Promise', 'Set', 'WeakMap'].map((item) => `[object ${item}]`);

jest.mock('../../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../../src/internals/native.ts');

  return {
    ...originalModule,
    objectProtoToString() {
      const result = Object.prototype.toString.call(this);
      if (typeArray.includes(result)) {
        return '[object Object]';
      }
      return result;
    }
  };
});

jest.mock('../../../src/internals/nodeUtil.ts', () => {
  const originalModule = jest.requireActual('../../../src/internals/nodeUtil.ts');

  return {
    ...originalModule,
    nodeIsMap: undefined,
    nodeIsSet: undefined
  };
});

import getTagWithBugfix from '../../../src/internals/getTagWithBugfix';
import '../../isMap.test';
import '../../isSet.test';
import '../../isDataView.test';
import '../../isWeakMap.test';

describe('dataview & promise', () => {
  it('basic', () => {
    expect(getTagWithBugfix(new DataView(new ArrayBuffer(1)))).toBe('[object DataView]');
    expect(getTagWithBugfix(Promise.resolve())).toBe('[object Promise]');
  });
});
