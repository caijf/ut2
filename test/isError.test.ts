/**
 * @jest-environment jsdom
 */
import { isError } from '../src';
import { args, falsy, symbol, truthy } from './_utils';

describe('isError', () => {
  it('correct', () => {
    const errors = [new Error(), new EvalError(), new RangeError(), new ReferenceError(), new SyntaxError(), new TypeError(), new URIError(), new AggregateError([])];

    errors.forEach((item) => {
      expect(isError(item)).toBe(true);
    });

    expect(isError(new DOMException())).toBe(true);

    function CustomError(this: any, message = '') {
      this.name = 'CustomError';
      this.message = message;
      Error.call(this, message);
    }
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.prototype.constructor = CustomError;

    expect(isError(new (CustomError as any)())).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isError(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isError(item)).toBe(false);
    });

    expect(isError(Error)).toBe(false);
    expect(isError(args)).toBe(false);
    expect(isError([1, 2, 3])).toBe(false);
    expect(isError({ a: 1, b: 2 })).toBe(false);
    expect(isError(/x/)).toBe(false);
    expect(isError(symbol)).toBe(false);
    expect(isError({ name: 'Error', message: '' })).toBe(false);
  });
});
