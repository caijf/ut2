import { globalThisExisted, globalExisted, selfExisted } from './native';

const freeGlobalThis = globalThisExisted && globalThis.Object === Object && globalThis;
const freeGlobal = globalExisted && global.Object === Object && global;
const freeSelf = selfExisted && self.Object === Object && self;

/**
 * @summary 全局对象。
 *
 * 不同的 JavaScript 环境都可以获取到对应的全局对象：
 * 1. Web 中等同于 `globalThis` / `window` / `self` / `frames` （兼容旧浏览器）
 * 2. Node.js 中等同于 `globalThis` / `global` （兼容低版本 Node.js）
 * 3. Web Workers 中等同于 `self`
 *
 * @since 1.10.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis globalThis}
 */
const root: typeof globalThis = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

export default root;
