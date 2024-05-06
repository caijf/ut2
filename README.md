# ut2

一个现代 JavaScript 实用工具库。[点击查看在线文档]。

[![npm][npm]][npm-url] [![Build and Deploy Docs](https://github.com/caijf/ut2/actions/workflows/ci.yml/badge.svg)](https://github.com/caijf/ut2/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/caijf/ut2/branch/main/graph/badge.svg?token=XKTS0H7085)](https://codecov.io/gh/caijf/ut2) [![Static Badge](https://img.shields.io/badge/benchmark-online-green)](https://s57jpy.csb.app/) ![npm](https://img.shields.io/npm/dt/ut2) ![GitHub](https://img.shields.io/github/license/caijf/ut2.svg)

## 比较

**与其他工具库对比（[`lodash`]、[`underscore`]）**

- 大部分是基于 ES2015+ 标准实现的纯函数，没有过多的包装嵌套。
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

- [Array](https://caijf.github.io/ut2/module-Array.html) 数组
  - [chunk](https://caijf.github.io/ut2/module-Array.html#.chunk) - 拆分成多个 `size` 长度的区块。
  - [compact](https://caijf.github.io/ut2/module-Array.html#.compact) - 剔除假值元素。
  - [difference](https://caijf.github.io/ut2/module-Array.html#.difference) - 排除部分值。
  - [formPairs](https://caijf.github.io/ut2/module-Array.html#.fromPairs) - 将键值对转为对象。
  - [intersection](https://caijf.github.io/ut2/module-Array.html#.intersection) - 交集去重。
  - [nth](https://caijf.github.io/ut2/module-Array.html#.nth) - 获取第 `n` 个元素。
  - [shuffle](https://caijf.github.io/ut2/module-Array.html#.shuffle) - 打乱数组。
  - [union](https://caijf.github.io/ut2/module-Array.html#.union) - 并集去重。
  - [uniq](https://caijf.github.io/ut2/module-Array.html#.uniq) - 数组去重。
  - [unzip](https://caijf.github.io/ut2/module-Array.html#.unzip) - 数组分组。
  - [xor](https://caijf.github.io/ut2/module-Array.html#.xor) - 先并集再排除交集部分。
  - [zip](https://caijf.github.io/ut2/module-Array.html#.zip) - 数组参数分组。
- [Collection](https://caijf.github.io/ut2/module-Collection.html) 集合
  - [countBy](https://caijf.github.io/ut2/module-Collection.html#.countBy) - 统计数量。
  - [every](https://caijf.github.io/ut2/module-Collection.html#.every) - 检查集合元素都为真值。
  - [filter](https://caijf.github.io/ut2/module-Collection.html#.filter) - 过滤集合元素。
  - [find](https://caijf.github.io/ut2/module-Collection.html#.find) - 查找集合元素。
  - [forEach](https://caijf.github.io/ut2/module-Collection.html#.forEach) - 迭代集合元素。
  - [forEachRight](https://caijf.github.io/ut2/module-Collection.html#.forEachRight) - 迭代集合元素（从右往左的顺序）。
  - [groupBy](https://caijf.github.io/ut2/module-Collection.html#.groupBy) - 对象分组。
  - [keyBy](https://caijf.github.io/ut2/module-Collection.html#.keyBy) - 转为对象。
  - [map](https://caijf.github.io/ut2/module-Collection.html#.map) - 迭代集合元素生成新数组。
  - [orderBy](https://caijf.github.io/ut2/module-Collection.html#.orderBy) - 排序。
  - [partition](https://caijf.github.io/ut2/module-Collection.html#.partition) - 拆分真值和假值。
  - [reduce](https://caijf.github.io/ut2/module-Collection.html#.reduce) - 累计值。
  - [reduceRight](https://caijf.github.io/ut2/module-Collection.html#.reduceRight) - 累计值（从右往左的顺序）。
  - [some](https://caijf.github.io/ut2/module-Collection.html#.some) - 检查集合元素包含真值。
- [Function](https://caijf.github.io/ut2/module-Function.html) 函数
  - [after](https://caijf.github.io/ut2/module-Function.html#.after) - 调用 `n` 或更多次之后触发。
  - [before](https://caijf.github.io/ut2/module-Function.html#.before) - 调用次数少于 `n` 次之前触发。
  - [curry](https://caijf.github.io/ut2/module-Function.html#.curry) - 柯里化函数。
  - [debounce](https://caijf.github.io/ut2/module-Function.html#.debounce) - 防抖函数。
  - [delay](https://caijf.github.io/ut2/module-Function.html#.delay) - 延迟触发。
  - [negate](https://caijf.github.io/ut2/module-Function.html#.negate) - 否定断言。
  - [once](https://caijf.github.io/ut2/module-Function.html#.once) - 只执行一次。
  - [partial](https://caijf.github.io/ut2/module-Function.html#.partial) - 预设部分参数。
  - [throttle](https://caijf.github.io/ut2/module-Function.html#.throttle) - 节流函数。
- [Language](https://caijf.github.io/ut2/module-Language.html) 语言
  - [isArguments](https://caijf.github.io/ut2/module-Language.html#.isArguments) - `arguments` 对象。
  - [isArray](https://caijf.github.io/ut2/module-Language.html#.isArray) - `Array` 对象。
  - [isArrayBuffer](https://caijf.github.io/ut2/module-Language.html#.isArrayBuffer) - `ArrayBuffer` 对象。
  - [isArrayLike](https://caijf.github.io/ut2/module-Language.html#.isArrayLike) - 类数组。
  - [isArrayLikeObject](https://caijf.github.io/ut2/module-Language.html#.isArrayLikeObject) - 类数组对象。
  - [isBigInt](https://caijf.github.io/ut2/module-Language.html#.isBigInt) - `bigint` 类型或对象。
  - [isBlob](https://caijf.github.io/ut2/module-Language.html#.isBlob) - `Blob` 对象。
  - [isBoolean](https://caijf.github.io/ut2/module-Language.html#.isBoolean) - 布尔类型或对象。
  - [isBuffer](https://caijf.github.io/ut2/module-Language.html#.isBuffer) - `Buffer` 对象。
  - [isDataView](https://caijf.github.io/ut2/module-Language.html#.isDataView) - `DataView` 对象。
  - [isDate](https://caijf.github.io/ut2/module-Language.html#.isDate) - `Date` 对象。
  - [isElement](https://caijf.github.io/ut2/module-Language.html#.isElement) - `Dom` 元素。
  - [isEmpty](https://caijf.github.io/ut2/module-Language.html#.isEmpty) - 空对象、数组、`Map`、`Set`。
  - [isEqual](https://caijf.github.io/ut2/module-Language.html#.isEqual) - 深比较。
  - [isError](https://caijf.github.io/ut2/module-Language.html#.isError) - `Error` 对象。
  - [isFinite](https://caijf.github.io/ut2/module-Language.html#.isFinite) - 有限数字。
  - [isFunction](https://caijf.github.io/ut2/module-Language.html#.isFunction) - `Function` 对象。
  - [isInteger](https://caijf.github.io/ut2/module-Language.html#.isInteger) - 整数。
  - [isLength](https://caijf.github.io/ut2/module-Language.html#.isLength) - 有效的类数组长度。
  - [isMap](https://caijf.github.io/ut2/module-Language.html#.isMap) - `Map` 对象。
  - [isMatch](https://caijf.github.io/ut2/module-Language.html#.isMatch) - 普通对象部分匹配的深比较。
  - [isNaN](https://caijf.github.io/ut2/module-Language.html#.isNaN) - `NaN` 。
  - [isNil](https://caijf.github.io/ut2/module-Language.html#.isNil) - `undefined` 或 `null` 。
  - [isNull](https://caijf.github.io/ut2/module-Language.html#.isNull) - `null` 。
  - [isNumber](https://caijf.github.io/ut2/module-Language.html#.isNumber) - 数字类型或对象。
  - [isObject](https://caijf.github.io/ut2/module-Language.html#.isObject) - 对象。
  - [isObjectLike](https://caijf.github.io/ut2/module-Language.html#.isObjectLike) - 类对象。
  - [isPlainObject](https://caijf.github.io/ut2/module-Language.html#.isPlainObject) - 普通对象。
  - [isPromiseLike](https://caijf.github.io/ut2/module-Language.html#.isPromiseLike) - 类 `Promise` 对象。
  - [isRegExp](https://caijf.github.io/ut2/module-Language.html#.isRegExp) - `RegExp` 对象。
  - [isSafeInteger](https://caijf.github.io/ut2/module-Language.html#.isSafeInteger) - 安全整数。
  - [isSet](https://caijf.github.io/ut2/module-Language.html#.isSet) - `Set` 对象。
  - [isString](https://caijf.github.io/ut2/module-Language.html#.isString) - 字符串类型或对象。
  - [isSymbol](https://caijf.github.io/ut2/module-Language.html#.isSymbol) - `Symbol` 类型或对象。
  - [isTypedArray](https://caijf.github.io/ut2/module-Language.html#.isTypedArray) - 类型化数组。
  - [isUndefined](https://caijf.github.io/ut2/module-Language.html#.isUndefined) - `undefined` 。
  - [isWeakMap](https://caijf.github.io/ut2/module-Language.html#.isWeakMap) - `WeakMap` 对象。
  - [isWeakSet](https://caijf.github.io/ut2/module-Language.html#.isWeakSet) - `WeakSet` 对象。
- [Math](https://caijf.github.io/ut2/module-Math.html) 数学
  - [ceil](https://caijf.github.io/ut2/module-Math.html#.ceil) - 向上舍入。
  - [floor](https://caijf.github.io/ut2/module-Math.html#.floor) - 向下舍入。
  - [max](https://caijf.github.io/ut2/module-Math.html#.max) - 取最大值。
  - [min](https://caijf.github.io/ut2/module-Math.html#.min) - 取最小值。
  - [round](https://caijf.github.io/ut2/module-Math.html#.round) - 四舍五入。
- [Number](https://caijf.github.io/ut2/module-Number.html) 数字
  - [clamp](https://caijf.github.io/ut2/module-Number.html#.clamp) - 限制数字范围。
  - [inRange](https://caijf.github.io/ut2/module-Number.html#.inRange) - 是否在范围内。
  - [random](https://caijf.github.io/ut2/module-Number.html#.random) - 随机小数。
  - [randomInt](https://caijf.github.io/ut2/module-Number.html#.randomInt) - 随机整数。
- [Object](https://caijf.github.io/ut2/module-Object.html) 对象
  - [allKeys](https://caijf.github.io/ut2/module-Object.html#.allKeys) - 对象自身的可枚举属性（包含 `Symbol` 属性）。
  - [allKeysIn](https://caijf.github.io/ut2/module-Object.html#.allKeysIn) - 对象自身及继承的可枚举属性（包含 `Symbol` 属性）。
  - [invert](https://caijf.github.io/ut2/module-Object.html#.invert) - 对象自身的可枚举属性（不包含 `Symbol` 属性）和值反转。
  - [keys](https://caijf.github.io/ut2/module-Object.html#.keys) - 对象自身的可枚举属性（不包含 `Symbol` 属性）。
  - [keysIn](https://caijf.github.io/ut2/module-Object.html#.keysIn) - 对象自身及继承的可枚举属性（不包含 `Symbol` 属性）。
  - [merge](https://caijf.github.io/ut2/module-Object.html#.merge) - 递归对象或数组进行合并。
  - [omit](https://caijf.github.io/ut2/module-Object.html#.omit) - 排除部分属性。
  - [omitBy](https://caijf.github.io/ut2/module-Object.html#.omitBy) - 根据方法，排除部分属性。
  - [pick](https://caijf.github.io/ut2/module-Object.html#.pick) - 选择部分属性。
  - [pickBy](https://caijf.github.io/ut2/module-Object.html#.pickBy) - 根据方法，选择部分属性。
- [String](https://caijf.github.io/ut2/module-String.html) 字符串
  - [camelCase](https://caijf.github.io/ut2/module-String.html#.camelCase) - 驼峰小写。
  - [capitalize](https://caijf.github.io/ut2/module-String.html#.capitalize) - 首字母大写，其余小写。
  - [escape](https://caijf.github.io/ut2/module-String.html#.escape) - 转义 `&` `<` `>` `"` `'` 为 HTML 实体字符。
  - [escapeRegExp](https://caijf.github.io/ut2/module-String.html#.escapeRegExp) - 转义为 `RegExp` 字符串中的特殊字符。
  - [kebabCase](https://caijf.github.io/ut2/module-String.html#.kebabCase) - 连接符分隔小写。
  - [lowerCase](https://caijf.github.io/ut2/module-String.html#.lowerCase) - 空格分隔小写。
  - [lowerFirst](https://caijf.github.io/ut2/module-String.html#.lowerFirst) - 首字母小写。
  - [pascalCase](https://caijf.github.io/ut2/module-String.html#.pascalCase) - 帕斯卡小写。又名大驼峰。
  - [snakeCase](https://caijf.github.io/ut2/module-String.html#.snakeCase) - 下划线分隔小写。
  - [unescape](https://caijf.github.io/ut2/module-String.html#.unescape) - 转义字符串中的 HTML 实体字符 `&amp;` `&lt;` `&quot;` `&#39;`。
  - [upperCase](https://caijf.github.io/ut2/module-String.html#.upperCase) - 空格分隔大写。
  - [upperFirst](https://caijf.github.io/ut2/module-String.html#.upperFirst) - 首字母大写。
  - [words](https://caijf.github.io/ut2/module-String.html#.words) - 拆分词组。
- [Util](https://caijf.github.io/ut2/module-Util.html) 实用工具
  - [castArray](https://caijf.github.io/ut2/module-Util.html#.castArray) - 包装成数组。
  - [conforms](https://caijf.github.io/ut2/module-Util.html#.conforms) - 创建断言对象属性的方法。
  - [conformsTo](https://caijf.github.io/ut2/module-Util.html#.conformsTo) - 断言对象属性。
  - [constant](https://caijf.github.io/ut2/module-Util.html#.constant) - 返回自身的函数。
  - [defaultTo](https://caijf.github.io/ut2/module-Util.html#.defaultTo) - 默认值。
  - [eq](https://caijf.github.io/ut2/module-Util.html#.eq) - 等于。
  - [gt](https://caijf.github.io/ut2/module-Util.html#.gt) - 大于。
  - [gte](https://caijf.github.io/ut2/module-Util.html#.gte) - 大于等于
  - [identity](https://caijf.github.io/ut2/module-Util.html#.identity) - 返回第一个参数的函数。
  - [lt](https://caijf.github.io/ut2/module-Util.html#.lt) - 小于。
  - [lte](https://caijf.github.io/ut2/module-Util.html#.lte) - 小于等于。
  - [noop](https://caijf.github.io/ut2/module-Util.html#.noop) - 空函数。
  - [nthArg](https://caijf.github.io/ut2/module-Util.html#.nthArg) - 返回指定位置参数的函数。
  - [range](https://caijf.github.io/ut2/module-Util.html#.range) - 创建升序或降序的数字数组。
  - [sleep](https://caijf.github.io/ut2/module-Util.html#.sleep) - 返回 `promise` 延迟。
  - [times](https://caijf.github.io/ut2/module-Util.html#.times) - 迭代执行次数。
  - [toFinite](https://caijf.github.io/ut2/module-Util.html#.toFinite) - 转为有限数字。
  - [toInteger](https://caijf.github.io/ut2/module-Util.html#.toInteger) - 转为整数。
  - [toLength](https://caijf.github.io/ut2/module-Util.html#.toLength) - 转为数组长度整数。
  - [toNumber](https://caijf.github.io/ut2/module-Util.html#.toNumber) - 转为数字。
  - [toSafeInteger](https://caijf.github.io/ut2/module-Util.html#.toSafeInteger) - 转为安全整数。
  - [toString](https://caijf.github.io/ut2/module-Util.html#.toString) - 转为字符串。
  - [uniqueId](https://caijf.github.io/ut2/module-Util.html#.uniqueId) - 唯一 ID。

[npm]: https://img.shields.io/npm/v/ut2.svg
[npm-url]: https://npmjs.com/package/ut2
[`lodash`]: https://lodash.com/
[`underscore`]: https://underscorejs.org/
[点击查看在线文档]: https://caijf.github.io/ut2/index.html
