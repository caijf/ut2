import isType from './isType';

export const argType = 'Arguments';

// @ts-ignore
export const supportedArgumentsType = isType((() => arguments)(), argType);
