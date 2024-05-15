const path = require('node:path');

module.exports = {
  ignore: [
    '**/*.d.ts',
  ],
  env: {
    cjs: {
      browserslistEnv: "isomorphic-production",
      presets: [
        [
          '@babel/preset-typescript',
          {
            allowDeclareFields: true,
          }
        ],
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: "commonjs",
            loose: true,
            useBuiltIns: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
          },
        ],
      ],
      plugins: [
        process.env.NODE_ENV !== 'test'
          ? [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), { extension: 'cjs' }]
          : false
      ].filter(Boolean)
    },
    es: {
      browserslistEnv: "isomorphic-production",
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            useBuiltIns: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
          },
        ],
        [
          '@babel/preset-typescript',
          {
            allowDeclareFields: true,
          }
        ],
      ],
      plugins: [
        [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), {extension: 'mjs'}],
      ],
    },
  },
};
