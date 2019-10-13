module.exports = function(wallaby) {
  return {
    debug: false,
    files: [
      'package.json',
      'tsconfig.json',
      '!src/**/*.spec.ts',
      'src/**/*.ts',
      'src/**/expected/*.js',
      'src/**/*.tsx',
      'src/**/*.scss',
      'src/**/*.css'
    ],
    tests: ['!src/templates/tests/expected/*.spec.ts', 'src/**/*.spec.ts'],
    env: {
      type: 'node'
    },
    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({
        typescript: require('typescript')
      })
    },
    testFramework: 'jest',
    setup: function() {
      wallaby.testFramework.configure(require('./package.json').jest);
    }
  };
};
