import isObjectLike from '../isObjectLike';
import getTag from './getTag';
import { argumentsTag, functionProtoToString, stringUndefined } from './native';

/**
 * ut2 版本号。
 *
 * @static
 * @since 1.0.0
 */
export const VERSION = BUILD_VERSION;

/**
 * 当前运行环境是否为浏览器
 *
 * @static
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
export const stubTrue = () => true;
