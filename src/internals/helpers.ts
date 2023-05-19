import isType from './isType';

export const argType = 'Arguments';

// @ts-ignore
export const supportedArgumentsType = isType((() => arguments)(), argType);

export const numberIsFinite = Number.isFinite;
export const numberIsInteger = Number.isInteger;
export const numberIsSafeInteger = Number.isSafeInteger;
