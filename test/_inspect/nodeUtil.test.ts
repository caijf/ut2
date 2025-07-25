jest.mock('util', () => {
  return {
    types: null
  };
});

afterAll(() => {
  jest.unmock('util');
});

import '../isArrayBuffer.test';
import '../isDate.test';
import '../isMap.test';
import '../isRegExp.test';
import '../isSet.test';
import '../isTypedArray.test';
