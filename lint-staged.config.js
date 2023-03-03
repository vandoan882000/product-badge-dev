const packageJson = require('./package.json');

module.exports = {
  '**/*.{js,ts,jsx,tsx}': [
    packageJson.scripts['eslint:frontend'],
    () => packageJson.scripts['tsc:frontend'], // https://github.com/okonet/lint-staged/blob/master/README.md#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
    packageJson.scripts['eslint:backend'],
    () => packageJson.scripts['tsc:backend'], // https://github.com/okonet/lint-staged/blob/master/README.md#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
  ],
};
