import { argumentsTag, functionToString, objectToString } from './native';

/**
 * ut2 版本号。
 *
 * @static
 * @since 1.0.0
 */
export const VERSION = BUILD_VERSION;

// @ts-ignore
export const supportedArgumentsType = objectToString.call((() => arguments)()) === argumentsTag;

export const FUNC_ERROR_TEXT = 'Expected a function';

export function toSource(func: any) {
  if (func !== null) {
    try {
      return functionToString.call(func);
    } catch (e) {
      /* empty */
    }
    try {
      return func + '';
    } catch (e) {
      /* empty */
    }
  }
  return '';
}
