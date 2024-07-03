/* eslint-disable prefer-rest-params */
import { arrayProtoSlice, mathMax } from './internals/native';
import { FunctionAny } from './internals/types';
import isUndefined from './isUndefined';
import toInteger from './toInteger';

const PLACEHOLDER = {
  __ut2_curry_ph__: null
};

type Placeholder = typeof PLACEHOLDER;

interface Curry {
  <T1, R>(func: (t1: T1) => R, arity?: number): CurriedFunction1<T1, R>;
  <T1, T2, R>(func: (t1: T1, t2: T2) => R, arity?: number): CurriedFunction2<T1, T2, R>;
  <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R, arity?: number): CurriedFunction3<T1, T2, T3, R>;
  <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R, arity?: number): CurriedFunction4<T1, T2, T3, T4, R>;
  <T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R, arity?: number): CurriedFunction5<T1, T2, T3, T4, T5, R>;
  (func: (...args: any[]) => any, arity?: number): (...args: any[]) => any;

  placeholder: Placeholder;
  _: Placeholder;
}

interface CurriedFunction1<T1, R> {
  (t1: T1): R;

  (t1: Placeholder): CurriedFunction1<T1, R>;
  (): CurriedFunction1<T1, R>;
}
interface CurriedFunction2<T1, T2, R> {
  (t1: Placeholder, t2: T2): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2): R;

  (t1: T1): CurriedFunction1<T2, R>;

  (t1: Placeholder): CurriedFunction2<T1, T2, R>;
  (): CurriedFunction2<T1, T2, R>;
}
interface CurriedFunction3<T1, T2, T3, R> {
  (t1: Placeholder, t2: Placeholder, t3: T3): CurriedFunction2<T1, T2, R>;
  (t1: Placeholder, t2: T2, t3: T3): CurriedFunction1<T1, R>;
  (t1: T1, t2: Placeholder, t3: T3): CurriedFunction1<T2, R>;
  (t1: T1, t2: T2, t3: T3): R;

  (t1: Placeholder, t2: T2): CurriedFunction2<T1, T3, R>;
  (t1: T1, t2: T2): CurriedFunction1<T3, R>;

  (t1: T1): CurriedFunction2<T2, T3, R>;

  (t1: Placeholder): CurriedFunction3<T1, T2, T3, R>;
  (): CurriedFunction3<T1, T2, T3, R>;
}
interface CurriedFunction4<T1, T2, T3, T4, R> {
  (t1: Placeholder, t2: Placeholder, t3: Placeholder, t4: T4): CurriedFunction3<T1, T2, T3, R>;
  (t1: Placeholder, t2: Placeholder, t3: T3, t4: T4): CurriedFunction2<T1, T2, R>;
  (t1: Placeholder, t2: T2, t3: Placeholder, t4: T4): CurriedFunction2<T1, T3, R>;
  (t1: T1, t2: Placeholder, t3: Placeholder, t4: T4): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: T2, t3: Placeholder, t4: T4): CurriedFunction1<T3, R>;
  (t1: T1, t2: Placeholder, t3: T3, t4: T4): CurriedFunction1<T2, R>;
  (t1: Placeholder, t2: T2, t3: T3, t4: T4): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;

  (t1: Placeholder, t2: Placeholder, t3: T3): CurriedFunction3<T1, T2, T4, R>;
  (t1: T1, t2: Placeholder, t3: T3): CurriedFunction2<T2, T4, R>;
  (t1: Placeholder, t2: T2, t3: T3): CurriedFunction2<T1, T4, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;

  (t1: Placeholder, t2: T2): CurriedFunction3<T1, T3, T4, R>;
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;

  (t1: T1): CurriedFunction3<T2, T3, T4, R>;

  (t1: Placeholder): CurriedFunction4<T1, T2, T3, T4, R>;
  (): CurriedFunction4<T1, T2, T3, T4, R>;
}
interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
  (t1: Placeholder, t2: Placeholder, t3: Placeholder, t4: Placeholder, t5: T5): CurriedFunction4<T1, T2, T3, T4, R>;
  (t1: Placeholder, t2: Placeholder, t3: Placeholder, t4: T4, t5: T5): CurriedFunction3<T1, T2, T3, R>;
  (t1: Placeholder, t2: Placeholder, t3: T3, t4: Placeholder, t5: T5): CurriedFunction3<T1, T2, T4, R>;
  (t1: Placeholder, t2: T2, t3: Placeholder, t4: Placeholder, t5: T5): CurriedFunction3<T1, T3, T4, R>;
  (t1: T1, t2: Placeholder, t3: Placeholder, t4: Placeholder, t5: T5): CurriedFunction3<T2, T3, T4, R>;
  (t1: Placeholder, t2: Placeholder, t3: T3, t4: T4, t5: T5): CurriedFunction2<T1, T2, R>;
  (t1: Placeholder, t2: T2, t3: Placeholder, t4: T4, t5: T5): CurriedFunction2<T1, T3, R>;
  (t1: Placeholder, t2: T2, t3: T3, t4: Placeholder, t5: T5): CurriedFunction2<T1, T4, R>;
  (t1: T1, t2: Placeholder, t3: Placeholder, t4: T4, t5: T5): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: Placeholder, t3: T3, t4: Placeholder, t5: T5): CurriedFunction2<T2, T4, R>;
  (t1: T1, t2: T2, t3: Placeholder, t4: Placeholder, t5: T5): CurriedFunction2<T3, T4, R>;
  (t1: T1, t2: T2, t3: T3, t4: Placeholder, t5: T5): CurriedFunction1<T4, R>;
  (t1: T1, t2: T2, t3: Placeholder, t4: T4, t5: T5): CurriedFunction1<T3, R>;
  (t1: T1, t2: Placeholder, t3: T3, t4: T4, t5: T5): CurriedFunction1<T2, R>;
  (t1: Placeholder, t2: T2, t3: T3, t4: T4, t5: T5): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;

  (t1: Placeholder, t2: Placeholder, t3: Placeholder, t4: T4): CurriedFunction4<T1, T2, T3, T5, R>;
  (t1: Placeholder, t2: Placeholder, t3: T3, t4: T4): CurriedFunction3<T1, T2, T5, R>;
  (t1: Placeholder, t2: T2, t3: Placeholder, t4: T4): CurriedFunction3<T1, T3, T5, R>;
  (t1: T1, t2: Placeholder, t3: Placeholder, t4: T4): CurriedFunction3<T2, T3, T5, R>;
  (t1: T1, t2: T2, t3: Placeholder, t4: T4): CurriedFunction2<T3, T5, R>;
  (t1: T1, t2: Placeholder, t3: T3, t4: T4): CurriedFunction2<T2, T5, R>;
  (t1: Placeholder, t2: T2, t3: T3, t4: T4): CurriedFunction2<T1, T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction1<T5, R>;

  (t1: Placeholder, t2: Placeholder, t3: T3): CurriedFunction4<T1, T2, T4, T5, R>;
  (t1: T1, t2: Placeholder, t3: T3): CurriedFunction3<T2, T4, T5, R>;
  (t1: Placeholder, t2: T2, t3: T3): CurriedFunction3<T1, T4, T5, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;

  (t1: Placeholder, t2: T2): CurriedFunction4<T1, T3, T4, T5, R>;
  (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;

  (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;

  (t1: Placeholder): CurriedFunction5<T1, T2, T3, T4, T5, R>;
  (): CurriedFunction5<T1, T2, T3, T4, T5, R>;
}

/**
 * 创建一个函数。该函数接受 `func` 参数，在提供的参数数量达到 `arity` 后调用 `func` 并返回其结果。
 *
 *  `curry._` 或 `curry.placeholder` 可用作参数的占位符。
 *
 * @function
 * @alias module:Function.curry
 * @since 1.8.0
 * @param {Function} func 需要柯里化的函数。
 * @param {number} [arity] 指定参数数量。默认值为 `func.length`。
 * @returns {Function} 新的柯里化函数。
 * @example
 *
 * function abc(a, b, c){
 *   return [a, b, c];
 * }
 *
 * var curried = curry(abc);
 *
 * curried(1)(2)(3); // [1, 2, 3]
 *
 * curried(1, 2)(3); // [1, 2, 3]
 *
 * curried(1, 2, 3); // [1, 2, 3]
 *
 * curried(1)(curry._, 3)(2); // [1, 2, 3]
 *
 * curried(curry._, curry._, 3)(curry._, 2)(1); // [1, 2, 3]
 *
 */
const curry: Curry = function (func: FunctionAny, arity?: number) {
  arity = isUndefined(arity) ? func.length : mathMax(toInteger(arity), 0);

  function wrap(this: any) {
    let args: any[] = arrayProtoSlice.call(arguments);
    const context = this;

    function inner() {
      const argsInner = arrayProtoSlice.call(arguments);

      for (let i = 0; i < args.length; i++) {
        args[i] = args[i] === PLACEHOLDER && argsInner.length > 0 ? argsInner.shift() : args[i];
      }
      args = args.concat(argsInner);
      const realArgsLength = args.filter((arg) => arg !== PLACEHOLDER).length;
      if (realArgsLength >= arity!) {
        return func.apply(context, args);
      }
      return inner;
    }

    return inner();
  }

  return wrap;
};

curry.placeholder = curry._ = PLACEHOLDER;

export default curry;
