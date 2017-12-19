import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

import PropTypes from 'prop-types';

import * as react from 'react'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle-umd.js',
        format: 'umd',
        name: 'veritone-redux-common'
      },
      {
        file: 'dist/bundle-es.js',
        format: 'es',
        exports: 'named'
      }
    ],
    external: ['react', 'react-dom', 'react-redux'],
    plugins: [
      // replace({
      //   'process.env.NODE_ENV': JSON.stringify('production')
      // }),
      resolve({
        module: true,
        jsnext: true,
        browser: true,
        main: true,
        // customResolveOptions: {
        //   moduleDirectory: ['../../node_modules', 'node_modules']
        // }
        // modulesOnly: true
      }),

      commonjs({
        include: ['../../node_modules/**', 'node_modules/**'],
        namedExports: {
          'prop-types': Object.keys(PropTypes),
          'react-dom': ['findDOMNode'],
          'react': Object.keys(react)
        }
      }),

      babel({
        include: ['src/**/*.js'],
        // externalHelpers: true
      }),

      url({
        limit: 10 * 1024 // inline files < 10k, copy files > 10k
      }),

      json(),

      builtins()
    ]
  }
];
