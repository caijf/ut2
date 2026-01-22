# Benchmark

测试 `ut2` 与 `lodash`、`underscore` 性能

## 浏览器

全局安装 `serve`

```bash
npm install -g serve
```

运行

```bash
serve
```

打开浏览器访问 <http://localhost:3000/browser/>

## Node.js 端

安装依赖

```bash
pnpm install
```

运行测试

```bash
pnpm test
```

支持过滤分类或方法

```bash
node index.mjs [--category <category>] [--method <method>]
```
