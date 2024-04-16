/* eslint-disable prefer-rest-params */
import { arrayProtoSlice } from './internals/native';

interface PartialPlaceholder {
  __ut2_partial__: number;
}

const PLACEHOLDER: PartialPlaceholder = {
  __ut2_partial__: 1
};

type Placeholder = PartialPlaceholder;
type Function0<R> = () => R;
type Function1<T1, R> = (t1: T1) => R;
type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
type Function4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

interface Partial {
  <T1, T2, R>(func: Function2<T1, T2, R>, plc1: Placeholder, arg2: T2): Function1<T1, R>;
  <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2): Function0<R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: Placeholder, arg2: T2): Function2<T1, T3, R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: Placeholder, plc2: Placeholder, arg3: T3): Function2<T1, T2, R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, plc2: Placeholder, arg3: T3): Function1<T2, R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: Placeholder, arg2: T2, arg3: T3): Function1<T1, R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, arg3: T3): Function0<R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, arg2: T2): Function3<T1, T3, T4, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, plc2: Placeholder, arg3: T3): Function3<T1, T2, T4, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: Placeholder, arg3: T3): Function2<T2, T4, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, arg2: T2, arg3: T3): Function2<T1, T4, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3): Function1<T4, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, plc2: Placeholder, plc3: Placeholder, arg4: T4): Function3<T1, T2, T3, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: Placeholder, plc3: Placeholder, arg4: T4): Function2<T2, T3, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, arg2: T2, plc3: Placeholder, arg4: T4): Function2<T1, T3, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, plc3: Placeholder, arg4: T4): Function1<T3, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, plc2: Placeholder, arg3: T3, arg4: T4): Function2<T1, T2, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: Placeholder, arg3: T3, arg4: T4): Function1<T2, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: Placeholder, arg2: T2, arg3: T3, arg4: T4): Function1<T1, R>;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, arg4: T4): Function0<R>;
  <TS extends any[], R>(func: (...ts: TS) => R): (...ts: TS) => R;
  <TS extends any[], T1, R>(func: (t1: T1, ...ts: TS) => R, arg1: T1): (...ts: TS) => R;
  <TS extends any[], T1, T2, R>(func: (t1: T1, t2: T2, ...ts: TS) => R, t1: T1, t2: T2): (...ts: TS) => R;
  <TS extends any[], T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3, ...ts: TS) => R, t1: T1, t2: T2, t3: T3): (...ts: TS) => R;
  <TS extends any[], T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, ...ts: TS) => R, t1: T1, t2: T2, t3: T3, t4: T4): (...ts: TS) => R;
  placeholder: Placeholder;
  _: Placeholder;
}

/**
 * 创建一个函数。该函数调用 `func` ，并传入预设的 `args` 参数。
 *
 *  `partial._` 或 `partial.placeholder` 可用作部分参数的占位符。
 *
 * @function
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
 * sayHelloTo('jeff'); // 'hello jeff'
 *
 * const greetJeff = partial(greet, partial._, 'jeff');
 * greetJeff('hi'); // 'hi jeff'
 *
 */
const partial: Partial = function (func: any) {
  const argsOrig = arrayProtoSlice.call(arguments, 1);

  return function () {
    const args = [];
    const argsPartial = arrayProtoSlice.call(arguments);

    for (let i = 0; i < argsOrig.length; i++) {
      args[i] = argsOrig[i] === PLACEHOLDER ? argsPartial.shift() : argsOrig[i];
    }

    // @ts-ignore
    return func.apply(this, args.concat(argsPartial));
  };
};

partial.placeholder = partial._ = PLACEHOLDER;

export default partial;
