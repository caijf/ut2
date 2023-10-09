const freeGlobalThis = typeof globalThis === 'object' && globalThis && globalThis.Object === Object && globalThis;
const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
const freeSelf = typeof self === 'object' && self && self.Object === Object && self;

const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')() || {};

export default root;
