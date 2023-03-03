/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync } = require('fs');
const { frontendDirectory, backendDirectory } = require('./consts/index.js');
const { getEnvVariablesContentFile } = require('./utils/getEnvVariablesContentFile.js');

const isDev = process.env.NODE_ENV === 'development';
const envVariables = getEnvVariablesContentFile(isDev);

writeFileSync(`${frontendDirectory}/.env`, envVariables);
writeFileSync(`${backendDirectory}/.env`, envVariables);
