const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const root = path.resolve(__dirname, '../..');
const lib = path.join(root, 'packages/ui');
const pkg = require('../../packages/ui/package.json');
const config = getDefaultConfig(__dirname);
const singletons = ['react', 'react-native', 'react-dom', 'react-native-web'];

config.watchFolders = [root];

// Import the library by its package name, straight from src/, like a real consumer would.
// Singletons resolve from this app so src/ never loads the root's dev copy of react.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === pkg.name)
    return {
      type: 'sourceFile',
      filePath: path.join(lib, 'src/index.ts'),
    };
  // The library's own imports: `@/core/...` is packages/ui/src/core/...
  if (moduleName.startsWith('@/')) return context.resolveRequest(context, path.join(lib, 'src', moduleName.slice(2)), platform);
  const isSingleton = singletons.some((name) => moduleName === name || moduleName.startsWith(`${name}/`));
  const ctx = isSingleton ? { ...context, originModulePath: path.join(__dirname, 'index.tsx') } : context;
  return ctx.resolveRequest(ctx, moduleName, platform);
};

module.exports = config;
