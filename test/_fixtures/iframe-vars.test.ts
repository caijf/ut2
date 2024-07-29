/**
 * @jest-environment jsdom
 */
import { isArguments, isArray, isBlob, isBoolean, isDataView, isDate, isElement, isEmpty, isEqual, isError, isFile, isFunction, isMap, isObject, isObjectLike, isPlainObject, isRegExp, isString, isSymbol, isTypedArray, isUndefined, isWeakMap, isWeakSet } from '../../src';
import { toArgs } from '../_utils';
import './iframe-vars.js';

declare const childObject: any;

describe('iframe vars', () => {
  it('isArguments', () => {
    expect(isArguments(childObject.args)).toBe(true);
  });

  it('isArray', () => {
    expect(isArray(childObject.array)).toBe(true);
  });

  it('isBlob', () => {
    expect(isBlob(childObject.blob)).toBe(true);
  });

  it('isBoolean', () => {
    expect(isBoolean(childObject.boolean)).toBe(true);
  });

  it('isDataView', () => {
    if (typeof DataView !== 'undefined') {
      expect(isDataView(childObject.dataView)).toBe(true);
    }
  });

  it('isDate', () => {
    expect(isDate(childObject.date)).toBe(true);
  });

  it('isElement', () => {
    expect(isElement(childObject.element)).toBe(true);
  });

  it('isEmpty', () => {
    expect(isEmpty(childObject.map)).toBe(true);
    expect(isEmpty(childObject.set)).toBe(true);
    expect(isEmpty(childObject.args)).toBe(true);
    expect(isEmpty(childObject.array)).toBe(false);
  });

  it('isEqual', () => {
    expect(isEqual(childObject.map, new Map())).toBe(true);
    expect(isEqual(childObject.set, new Set())).toBe(true);
    expect(isEqual(childObject.args, toArgs([]))).toBe(true);
    expect(isEqual(childObject.array, [1])).toBe(true);
    expect(isEqual(childObject.object, { a: 1 })).toBe(true);
  });

  it('isError', () => {
    expect(isError(childObject.error)).toBe(true);
    expect(isError(childObject.evalError)).toBe(true);
    expect(isError(childObject.rangeError)).toBe(true);
    expect(isError(childObject.referenceError)).toBe(true);
    expect(isError(childObject.syntaxError)).toBe(true);
    expect(isError(childObject.typeError)).toBe(true);
    expect(isError(childObject.uriError)).toBe(true);
    expect(isError(childObject.aggregateError)).toBe(true);
  });

  it('isFile', () => {
    expect(isFile(childObject.file)).toBe(true);
  });

  it('isFunction', () => {
    expect(isFunction(document.body)).toBe(false);
    expect(isFunction(childObject.function)).toBe(true);
  });

  it('isMap', () => {
    expect(isMap(childObject.map)).toBe(true);
    expect(isMap(childObject.weakMap)).toBe(false);
    expect(isMap(document.body)).toBe(false);
  });

  it('isNaN', () => {
    expect(isNaN(childObject.nan)).toBe(true);
  });

  it('isObject', () => {
    expect(isObject(document)).toBe(true);
    expect(isObject(document.body)).toBe(true);
    expect(isObject(childObject.element)).toBe(true);
    expect(isObject(childObject.object)).toBe(true);
    expect(isObject(childObject.date)).toBe(true);
    expect(isObject(childObject.function)).toBe(true);
    expect(isObject(childObject.regexp)).toBe(true);
    expect(isObject(childObject.string)).toBe(true);
    expect(isObject(childObject.number)).toBe(true);
  });

  it('isObjectLike', () => {
    expect(isObjectLike(document)).toBe(true);
    expect(isObjectLike(document.body)).toBe(true);
    expect(isObjectLike(childObject.element)).toBe(true);
    expect(isObjectLike(childObject.object)).toBe(true);
    expect(isObjectLike(childObject.date)).toBe(true);
    expect(isObjectLike(childObject.regexp)).toBe(true);
    expect(isObjectLike(childObject.string)).toBe(true);
    expect(isObjectLike(childObject.number)).toBe(true);
  });

  it('isPlainObject', () => {
    expect(isPlainObject(childObject.object)).toBe(true);
    expect(isPlainObject(document)).toBe(false);
    expect(isPlainObject(document.body)).toBe(false);
    expect(isPlainObject(childObject.element)).toBe(false);
    expect(isPlainObject(childObject.date)).toBe(false);
    expect(isPlainObject(childObject.function)).toBe(false);
    expect(isPlainObject(childObject.regexp)).toBe(false);
    expect(isPlainObject(childObject.string)).toBe(false);
    expect(isPlainObject(childObject.number)).toBe(false);
  });

  it('isRegExp', () => {
    expect(isRegExp(childObject.regexp)).toBe(true);
  });

  it('isString', () => {
    expect(isString(childObject.string)).toBe(true);
  });

  it('isSymbol', () => {
    expect(isSymbol(childObject.symbol)).toBe(true);
  });

  it('isTypedArray', () => {
    expect(isTypedArray(childObject.float32Array)).toBe(true);
    expect(isTypedArray(childObject.float64Array)).toBe(true);
    expect(isTypedArray(childObject.int8Array)).toBe(true);
    expect(isTypedArray(childObject.int16Array)).toBe(true);
    expect(isTypedArray(childObject.int32Array)).toBe(true);
    expect(isTypedArray(childObject.uint8Array)).toBe(true);
    expect(isTypedArray(childObject.uint8ClampedArray)).toBe(true);
    expect(isTypedArray(childObject.uint16Array)).toBe(true);
    expect(isTypedArray(childObject.uint32Array)).toBe(true);
    expect(isTypedArray(childObject.bigInt64Array)).toBe(true);
    expect(isTypedArray(childObject.bigUint64Array)).toBe(true);
  });

  it('isUndefined', () => {
    expect(isUndefined(childObject.undefined)).toBe(true);
  });

  it('isWeakMap', () => {
    expect(isWeakMap(childObject.weakMap)).toBe(true);
  });

  it('isWeakSet', () => {
    expect(isWeakSet(childObject.weakSet)).toBe(true);
  });
});
