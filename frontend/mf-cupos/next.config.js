const { withModuleFederation } = require('@module-federation/nextjs-mf');
const { mfConfig } = require('./module-federation.config.ts');

module.exports = withModuleFederation({
  ...mfConfig,
});