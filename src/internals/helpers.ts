// 主要是为了便于一些方法测试，比如一些方法要检测是否存在。

import isType from './isType';

export const argType = 'Arguments';

// @ts-ignore
export const supportedArgumentsType = isType((() => arguments)(), argType);

export const FUNC_ERROR_TEXT = 'Expected a function';

export const numberIsFinite = Number.isFinite;
export const numberIsInteger = Number.isInteger;
export const numberIsSafeInteger = Number.isSafeInteger;

export const objectGetOwnPropertySymbols = Object.getOwnPropertySymbols;

export const arrayAt = Array.prototype.at;

/**
 * ut2 版本号
 *
 * @static
 * @since 1.0.0
 */
export const VERSION = BUILD_VERSION;
