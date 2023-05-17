/* eslint-disable prefer-rest-params */

// ref: https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
// eslint-disable-next-line no-sparse-arrays
export const falsy = [, false, 0, -0, 0n, , '', '', ``, null, undefined, NaN];

// ref: https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy
export const truthy = [
  true,
  {},
  [],
  42,
  '0',
  'false',
  new Date(),
  -42,
  12n,
  3.14,
  -3.14,
  Infinity,
  -Infinity
];

export const noop = () => {};

export const symbol = Symbol('abc');

export const args = (function () {
  return arguments;
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const args2 = (function (a, b, c) {
  return arguments;
})(1, 2, 3);

export const strictArgs = (function () {
  'use strict';
  return arguments;
  // @ts-ignore
})(1, 2, 3);
