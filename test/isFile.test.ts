/**
 * @jest-environment jsdom
 */
import { isFile } from '../src';
import { falsy, symbol, truthy } from './_utils';

describe('isFile', () => {
  it('correct', () => {
    expect(isFile(new File([], 'test.txt'))).toBe(true);

    // 继承 File 的实例
    class SuperFile extends File {
      custom() {
        return 'hello world';
      }
    }
    const f1 = new SuperFile([], 'abc.js');
    expect(isFile(f1)).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isFile(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isFile(item)).toBe(false);
    });

    expect(isFile('abc')).toBe(false);
    expect(isFile(1)).toBe(false);
    expect(isFile([1])).toBe(false);
    expect(isFile(['a'])).toBe(false);
    expect(isFile(symbol)).toBe(false);
    expect(isFile(new ArrayBuffer(8))).toBe(false);
    expect(isFile(new Date())).toBe(false);
    expect(isFile(new Error())).toBe(false);
    expect(isFile(/x/)).toBe(false);

    expect(isFile(new Blob())).toBe(false);
    expect(isFile(new Blob(['1']))).toBe(false);
    expect(isFile(new Blob(['<a>html</a>'], { type: 'html/plain' }))).toBe(false);
    expect(isFile(new Blob([new ArrayBuffer(8)]))).toBe(false);

    // 带名称的 Blob 对象，也被认定为 file
    const blob = new Blob([]);
    // @ts-ignore
    blob.name = 'abc';
    expect(isFile(blob)).toBe(false);
  });
});
