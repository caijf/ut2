import isObjectLike from '../isObjectLike';
import getTag from './getTag';
import { argumentsTag, functionProtoToString, stringUndefined } from './native';

/**
 * @summary ut2 版本号。
 * @since 1.0.0
 */
export const VERSION = BUILD_VERSION;

/**
 * @summary 当前运行环境是否为浏览器。
 * @since 1.10.0
 */
export const isBrowser = typeof window !== stringUndefined && isObjectLike(window) && typeof document !== stringUndefined && isObjectLike(document) && window.document === document;

// @ts-ignore
export const supportedArgumentsType = getTag((() => arguments)()) === argumentsTag;

export const FUNC_ERROR_TEXT = 'Expected a function';

export function toSource(func: any) {
  if (func !== null) {
    try {
      return functionProtoToString.call(func);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      /* empty */
    }
    try {
      return func + '';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      /* empty */
    }
  }
  return '';
}

export const stubFalse = () => false;
export const stubTrue = () => true;
