import { globalThisExisted, globalExisted, selfExisted } from './native';

const freeGlobalThis = globalThisExisted && globalThis.Object === Object && globalThis;
const freeGlobal = globalExisted && global.Object === Object && global;
const freeSelf = selfExisted && self.Object === Object && self;

const root: typeof globalThis = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

export default root;
