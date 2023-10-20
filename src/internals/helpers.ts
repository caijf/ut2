import getTag from './getTag';
import { argumentsTag, functionProtoToString } from './native';

/**
 * ut2 版本号。
 *
 * @static
 * @since 1.0.0
 */
export const VERSION = BUILD_VERSION;

// @ts-ignore
export const supportedArgumentsType = getTag((() => arguments)()) === argumentsTag;

export const FUNC_ERROR_TEXT = 'Expected a function';

export function toSource(func: any) {
  if (func !== null) {
    try {
      return functionProtoToString.call(func);
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

export const stubFlase = () => false;
