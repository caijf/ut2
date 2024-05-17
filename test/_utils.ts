/* eslint-disable prefer-rest-params */

// ref: https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
// eslint-disable-next-line no-sparse-arrays
export const falsy = [, false, 0, -0, 0n, , '', '', ``, null, undefined, NaN];

// ref: https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy
export const truthy = [true, {}, [], 42, '0', 'false', new Date(), -42, 12n, 3.14, -3.14, Infinity, -Infinity];

export const noop = () => {};

export const symbol = Symbol('abc');

export const toArgs = function (arr: any[]) {
  // eslint-disable-next-line prefer-spread
  return function () {
    return arguments;
    // @ts-ignore
  }.apply(undefined, arr);
};

export const args = toArgs([1, 2, 3]);

export const strictArgs = (function () {
  'use strict';
  return arguments;
  // @ts-ignore
})(1, 2, 3);
