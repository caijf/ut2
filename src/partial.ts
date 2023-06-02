function partial<TS extends any[], R>(func: (...ts: TS) => R): (...ts: TS) => R;
function partial<TS extends any[], T1, R>(
  func: (t1: T1, ...ts: TS) => R,
  arg1: T1
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, R>(
  func: (t1: T1, t2: T2, ...ts: TS) => R,
  t1: T1,
  t2: T2
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, R>(
  func: (t1: T1, t2: T2, t3: T3, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, T6, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, T6, T7, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, T6, T7, T8, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7,
  t8: T8
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9, ...ts: TS) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7,
  t8: T8,
  t9: T9
): (...ts: TS) => R;
function partial<TS extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
  func: (
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
    t5: T5,
    t6: T6,
    t7: T7,
    t8: T8,
    t9: T9,
    t10: T10,
    ...ts: TS
  ) => R,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7,
  t8: T8,
  t9: T9,
  t10: T10
): (...ts: TS) => R;
/**
 * 创建一个函数。该函数调用 `func` ，并传入预设的 `args` 参数。
 *
 * @static
 * @alias module:Function.partial
 * @since 1.0.0
 * @param {Function} func 需要预设的函数。
 * @param {...*} [args] 预设的参数。
 * @returns {Function} 预设参数的函数。
 * @example
 *
 * function greet(greeting, name){
 *   return greeting + ' ' + name;
 * }
 *
 * const sayHelloTo = partial(greet, 'hello');
 *
 * sayHelloTo('jeff'); // 'hello jeff'
 *
 */
function partial(func: any, ...args: any[]) {
  return function (...remainingArgs: any[]) {
    // @ts-ignore
    return func.apply(this, [...args, ...remainingArgs]);
  };
}

export default partial;
