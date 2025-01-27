import { KnipConfig } from 'knip';

const config: KnipConfig = {
  rules: {
    dependencies: 'off',
    devDependencies: 'off',
    unlisted: 'off',
  },
  ignore: [
    // TODO: Remove after entities, migrations and repositories are imported in database module.
    '**/index.ts',
  ],
};

export default config;
