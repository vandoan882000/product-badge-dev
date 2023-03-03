const fixedVariables = [
  'HOST',
  'SHOPIFY_API_KEY',
  'SHOPIFY_API_SECRET',
  'SCOPES',
  'API_VERSION',
  'BACKEND_PORT',
  'PORT',
  'NODE_ENV',
];

// WARNING: Update nếu có sự thay đổi trong vite.config.js
const prefixOfAdditionalVariables = '_____ADDITIONAL_VARIABLE______';

// WARNING: Update nếu có sự thay đổi cấu trúc thư mục
const frontendDirectory = process.cwd() + '/web/frontend';
const backendDirectory = process.cwd() + '/web';

module.exports = {
  fixedVariables,
  prefixOfAdditionalVariables,
  frontendDirectory,
  backendDirectory,
};
