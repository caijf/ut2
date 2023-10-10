/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');
const { COVERAGE_LOCAL } = process.env;

const coverageConfig =
  COVERAGE_LOCAL === '1'
    ? {}
    : {
        coverageReporters: ['text', 'cobertura']
      };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    BUILD_VERSION: version
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  ...coverageConfig
};
