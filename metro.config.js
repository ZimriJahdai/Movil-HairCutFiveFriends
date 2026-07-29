const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// zustand's ESM build (esm/middleware.mjs) uses `import.meta.env`, que Metro
// no puede parsear al empaquetar para web (SyntaxError: Cannot use 'import.meta'
// outside a module). Al desactivar la resolución de "exports" del package.json,
// Metro cae de vuelta al campo "main" y resuelve zustand/middleware al archivo
// CJS (middleware.js), que no usa import.meta.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
