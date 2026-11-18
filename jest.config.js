/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  coveragePathIgnorePatterns: ['/test/'],
  ...(process.env.COVERAGE_LOCAL === '1' ? {} : { coverageReporters: ['text', 'cobertura'] })
};
