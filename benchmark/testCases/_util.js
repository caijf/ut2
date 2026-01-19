export const createScriptWithSrc = (src) => `\x3Cscript src="${src}">\x3C/script>`;
export const createScriptWithText = (text) => `\x3Cscript>
${text}
\x3C/script>`;

export const preCodeScript = `${createScriptWithSrc('https://cdn.jsdelivr.net/npm/underscore@1')}
${createScriptWithText('var underscore = _.noConflict();')}
${createScriptWithSrc('https://cdn.jsdelivr.net/npm/lodash@4')}
${createScriptWithSrc('https://cdn.jsdelivr.net/npm/ut2@1')}`;

export const preCodeFoo = createScriptWithText(`function Foo() {
    this.a = 1;
    this[Symbol.for('b')] = 2;
  }
  Foo.prototype.c = 3;
  Foo.prototype[Symbol.for('d')] = 4;`);

export const libConfig = [
  {
    name: 'ut2'
  },
  {
    name: 'underscore'
  },
  {
    name: 'lodash',
    alias: '_'
  }
];
