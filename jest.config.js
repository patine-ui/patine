module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/packages/ui/src', '<rootDir>/packages/mcp/src', '<rootDir>/apps/example/src'],
  // The website imports the library by its package name; Docusaurus aliases it to the source, so Jest does too.
  // React resolves from the root too: the example app pins its own copy, and hooks there must share the renderer's.
  moduleNameMapper: {
    '^patine-ui$': '<rootDir>/packages/ui/src/index.ts',
    '^patine-ui/core$': '<rootDir>/packages/ui/src/core/index.ts',
    // The library's own imports: `@/core/...` is packages/ui/src/core/...
    '^@/(.*)$': '<rootDir>/packages/ui/src/$1',
    '^react$': '<rootDir>/node_modules/react',
  },
  // pnpm nests packages under node_modules/.pnpm/<id>/node_modules, which the preset's default pattern doesn't expect.
  transformIgnorePatterns: ['node_modules/(?!(\\.pnpm/[^/]+/node_modules/)?((jest-)?react-native|@react-native(-community)?)/)'],
  // A file's first test also pays for loading React Native, which can pass 5s on a busy CI runner.
  testTimeout: 30000,
};
