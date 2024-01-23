# ut2

一个现代 JavaScript 实用工具库。[点击查看在线文档]。

[![npm][npm]][npm-url] [![Build and Deploy Docs](https://github.com/caijf/ut2/actions/workflows/ci.yml/badge.svg)](https://github.com/caijf/ut2/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/caijf/ut2/branch/main/graph/badge.svg?token=XKTS0H7085)](https://codecov.io/gh/caijf/ut2) [![Static Badge](https://img.shields.io/badge/benchmark-online-green)](https://s57jpy.csb.app/) ![npm](https://img.shields.io/npm/dt/ut2) ![GitHub](https://img.shields.io/github/license/caijf/ut2.svg)

## 比较

**与其他工具库对比（[`lodash`]、[`underscore`]）**

- 基于 ES2015+ 标准，无需原生支持的方法（`forEach`、`filter`、`Object.keys`、`Object.entries` ……）。
- 使用 TypeScript 实现，提供类型定义。
- 导出 `es`、`cjs`、`umd` 模块格式，支持不同开发环境使用。

## 兼容性

兼容现代浏览器 [Firefox](https://www.firefox.com.cn/)、[Chrome](https://www.google.cn/chrome/index.html)、[Safari](https://www.apple.com.cn/safari/)、[Opera](https://www.opera.com/zh-cn)，以及 [Node.js >= 10](https://nodejs.org/) 。

如果要兼容 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) 设置对应的 `targets` 。

## 使用

### `es` 或 `node` 开发环境

安装依赖

```shell
npm install ut2
```

```shell
yarn add ut2
```

```shell
pnpm add ut2
```

### 浏览器原生开发环境

如果你的项目使用的是原生方式开发，可以在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `ut2` 。

`npm` 包的 `ut2/dist` 目录下提供了 `UMD` 包 `ut2.js` 以及 `ut2.min.js`。你也可以通过 [UNPKG](https://unpkg.com/browse/ut2/dist/) 下载到本地进行使用。或者直接使用 [UNPKG 线上版本](https://unpkg.com/ut2/dist/ut2.min.js)<sup> _注意版本_ </sup>。

### 示例

所有方法都在 `ut2` 模块中。

```javascript
import { debounce } from 'ut2';

const debounced = debounce(() => {
  // do something
}, 300);
```

## API

> 下列方法全部在 `ut2` 模块直接导出，分类只是为了可读性。你可以[点击查看在线文档]，了解更多信息。
>
> `import { throttle, chunk, max } from 'ut2'`

- Array 数组
  - chunk - 拆分成多个 `size` 长度的区块。
  - compact - 剔除假值元素。
  - difference - 排除部分值。
  - formPairs - 将键值对转为对象。
  - intersection - 交集去重。
  - nth - 获取第 `n` 个元素。
  - shuffle - 打乱数组。
  - union - 并集去重。
  - uniq - 数组去重。
  - unzip - 数组分组。
  - xor - 先并集再排除交集部分。
  - zip - 数组参数分组。
- Collection 集合
  - countBy - 统计数量。
  - every - 检查集合元素都为真值。
  - filter - 过滤集合元素。
  - forEach - 迭代集合元素。
  - groupBy - 对象分组。
  - keyBy - 转为对象。
  - orderBy - 排序。
  - partition - 拆分真值和假值。
  - some - 检查集合元素包含真值。
- Function 函数
  - after - 调用 `n` 或更多次之后触发。
  - before - 调用次数少于 `n` 次之前触发。
  - debounce - 防抖函数。
  - delay - 延迟触发。
  - negate - 否定断言。
  - once - 只执行一次。
  - partial - 预设部分参数。
  - throttle - 节流函数。
- Language 语言
  - isArguments - `arguments` 对象。
  - isArray - `Array` 对象。
  - isArrayBuffer - `ArrayBuffer` 对象。
  - isArrayLike - 类数组。
  - isArrayLikeObject - 类数组对象。
  - isBlob - `Blob` 对象。
  - isBoolean - 布尔类型或对象。
  - isBuffer - `Buffer` 对象。
  - isDataView - `DataView` 对象。
  - isDate - `Date` 对象。
  - isElement - `Dom` 元素。
  - isEqual - 深比较。
  - isEmpty - 空对象、数组、`Map`、`Set`。
  - isError - `Error` 对象。
  - isFinite - 有限数字。
  - isFunction - `Function` 对象。
  - isInteger - 整数。
  - isLength - 有效的类数组长度。
  - isMap - `Map` 对象。
  - isMatch - 普通对象部分匹配的深比较。
  - isNaN - `NaN` 。
  - isNil - `undefined` 或 `null` 。
  - isNull - `null` 。
  - isNumber - 数字类型或对象。
  - isObject - 对象。
  - isObjectLike - 类对象。
  - isPlainObject - 普通对象。
  - isPromiseLike - 类 `Promise` 对象。
  - isRegExp - `RegExp` 对象。
  - isSafeInteger - 安全整数。
  - isSet - `Set` 对象。
  - isString - 字符串类型或对象。
  - isSymbol - `Symbol` 类型或对象。
  - isTypedArray - 类型化数组。
  - isUndefined - `undefined` 。
  - isWeakMap - `WeakMap` 对象。
  - isWeakSet - `WeakSet` 对象。
- Math 数学
  - ceil - 向上舍入。
  - floor - 向下舍入。
  - max - 取最大值。
  - min - 取最小值。
  - round - 四舍五入。
- Number 数字
  - clamp - 限制数字范围。
  - inRange - 是否在范围内。
  - random - 随机小数。
  - randomInt - 随机整数。
- Object 对象
  - allKeys - 对象自身的可枚举属性（包含 `Symbol` 属性）。
  - allKeysIn - 对象自身及继承的可枚举属性（包含 `Symbol` 属性）。
  - keys - 对象自身的可枚举属性（不包含 `Symbol` 属性）。
  - keysIn - 对象自身及继承的可枚举属性（不包含 `Symbol` 属性）。
  - merge - 递归对象或数组进行合并。
  - omit - 排除部分属性。
  - omitBy - 根据方法，排除部分属性。
  - pick - 选择部分属性。
  - pickBy - 根据方法，选择部分属性。
- String 字符串
  - camelCase - 驼峰小写。
  - capitalize - 首字母大写，其余小写。
  - escape - 转义 `&` `<` `>` `"` `'` 为 HTML 实体字符。
  - escapeRegExp - 转义为 `RegExp` 字符串中的特殊字符。
  - kebabCase - 连接符分隔小写。
  - lowerCase - 空格分隔小写。
  - lowerFirst - 首字母小写。
  - snakeCase - 下划线分隔小写
  - unescape - 转义字符串中的 HTML 实体字符 `&amp;` `&lt;` `&quot;` `&#39;`。
  - upperCase - 空格分隔大写。
  - upperFirst - 首字母大写。
  - words - 拆分词组。
- Util 实用工具
  - castArray - 包装成数组。
  - conforms - 创建断言对象属性的方法。
  - conformsTo - 断言对象属性。
  - constant - 返回自身的函数。
  - defaultTo - 默认值。
  - eq - 等于。
  - gt - 大于。
  - gte - 大于等于
  - identity - 返回第一个参数的函数。
  - lt - 小于。
  - lte - 小于等于。
  - noop - 空函数。
  - nthArg - 返回指定位置参数的函数。
  - range - 创建升序或降序的数字数组。
  - sleep - 返回 `promise` 延迟。
  - times - 迭代执行次数。
  - toFinite - 转为有限数字。
  - toInteger - 转为整数。
  - toLength - 转为数组长度整数。
  - toNumber - 转为数字。
  - toSafeInteger - 转为安全整数。
  - toString - 转为字符串。
  - uniqueId - 唯一 ID。

[npm]: https://img.shields.io/npm/v/ut2.svg
[npm-url]: https://npmjs.com/package/ut2
[`lodash`]: https://lodash.com/
[`underscore`]: https://underscorejs.org/
[点击查看在线文档]: https://caijf.github.io/ut2/index.html
