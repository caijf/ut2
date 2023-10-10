jest.mock('../../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../../src/internals/native.ts');

  return {
    ...originalModule,
    globalThisExisted: false,
    globalExisted: false
  };
});

import '../../internals/root.test';
