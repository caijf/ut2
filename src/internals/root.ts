const freeGlobalThis = typeof globalThis === 'object' && globalThis && globalThis.Object === Object;
const freeGlobal = typeof global === 'object' && global && global.Object === Object;
const freeSelf = typeof self === 'object' && self && self.Object === Object;

const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

export default root;
