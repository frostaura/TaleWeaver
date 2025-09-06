import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'twui',
  globalScript: 'src/global.ts',
  globalStyle: 'src/css/global.scss',
  minifyJs: true,
  minifyCss: true,
  outputTargets: [
    reactOutputTarget({
      outDir: './dist/react-components/',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'css' }],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'docs.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'css' }, { src: 'images' }, { src: '*.html' }],
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
  plugins: [sass()],
  extras: {
    experimentalSlotFixes: true,
  },
};
