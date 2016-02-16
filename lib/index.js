const babel = require('babel-core');

const result = babel.transform(`
  const b = () => {
    return 1;
  }
`);

console.log(result);
