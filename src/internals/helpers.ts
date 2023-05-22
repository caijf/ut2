// 主要是为了便于一些方法测试

import isType from './isType';

export const argType = 'Arguments';

// @ts-ignore
export const supportedArgumentsType = isType((() => arguments)(), argType);

export const numberIsFinite = Number.isFinite;
export const numberIsInteger = Number.isInteger;
export const numberIsSafeInteger = Number.isSafeInteger;

export const objectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
