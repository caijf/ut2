// 为测试运行时注入 BUILD_VERSION，等价于构建时 @rollup/plugin-replace 的替换
const { version } = module.require('./package.json');

globalThis.BUILD_VERSION = version;
