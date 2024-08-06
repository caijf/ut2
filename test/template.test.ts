import template from '../src/template';

describe('template', () => {
  it('basic', () => {
    const tpl = '${name}今年${age}岁。';
    const data = { age: 18, name: 'jeff' };

    const result1 = template(tpl)(data);
    expect(result1).toBe('jeff今年18岁。');

    const tpl2 = `\${name}今年\${age}岁。`;
    const result2 = template(tpl2)(data);
    expect(result2).toBe('jeff今年18岁。');
  });

  it('包含函数', () => {
    const tpl = 'before ${render()} after.';
    const compiled = template(tpl);
    const result = compiled({
      render() {
        return 'abc';
      }
    });
    expect(result).toBe('before abc after.');
  });

  it('箭头函数', () => {
    const tpl = `\${data.map((item, i) => {
      return item + i;
    })}`;
    const compiled = template(tpl);
    const result = compiled({ data: ['a', 'b', 'c'] });
    expect(result).toBe('a0,b1,c2');
  });

  it('html', () => {
    const tpl = `\${data.map((item, i) => {
      return \`<tr>\${item + i}</tr>\`;
    }).join('')}`;

    const compiled = template(tpl);
    const result = compiled({ data: ['a', 'b', 'c'] });
    expect(result).toBe('<tr>a0</tr><tr>b1</tr><tr>c2</tr>');
  });
});
