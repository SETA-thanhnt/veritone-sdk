import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import sass from 'node-sass';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

import PropTypes from 'prop-types';

import * as react from 'react'

const sassPreprocessor = (content, id) =>
  new Promise((resolve, reject) => {
    sass.render(
      {
        data: content,
        file: id
      },
      function(err, { css }) {
        if (err) {
          return reject(err);
        }
        resolve({ code: css.toString() });
      }
    );
  });

let cssExportMap = {};

export default [
  {
    input: 'src/build-entry.js',
    output: [
      {
        file: 'dist/bundle-umd.js',
        format: 'umd',
        name: 'veritone-widgets'
      },
      {
        file: 'dist/bundle-es.js',
        format: 'es',
        exports: 'named'
      }
    ],
    external: ['react', 'react-dom', 'redux', 'react-redux', 'veritone-react-common', 'veritone-redux-common'],
    plugins: [
      // replace({
      //   'process.env.NODE_ENV': JSON.stringify('production')
      // }),
      resolve({
        module: true,
        jsnext: true,
        browser: true,
        // main: true,
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
          'react': Object.keys(react),
          'es6-promise': ['Promise']
        }
      }),

      babel({
        include: ['src/**/*.js'],
        // externalHelpers: true
      }),

      postcss({
        preprocessor: sassPreprocessor,
        plugins: [
          postcssModules({
            getJSON(id, exportTokens) {
              cssExportMap[id] = exportTokens;
            }
          })
        ],
        getExportNamed: false, //Default false, when set to true it will also named export alongside default export your class names
        getExport(id) {
          return cssExportMap[id];
        },
        extensions: ['.css', '.scss']
        // extract: 'dist/styles.css'
        // todo: minimize (cssnano?)
      }),

      url({
        limit: 10 * 1024 // inline files < 10k, copy files > 10k
      }),

      json(),

      builtins()
    ]
  }
];
