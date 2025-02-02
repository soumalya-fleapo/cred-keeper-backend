import { KnipConfig } from 'knip';

const config: KnipConfig = {
  rules: {
    dependencies: 'off',
    devDependencies: 'off',
    unlisted: 'off',
  },
  ignore: [
    // TODO: Remove after these properties are imported.
    '*index.ts',
    '**/enums/**',
    '**/guards/**',
    '**/decorators/**',
  ],
};

export default config;
