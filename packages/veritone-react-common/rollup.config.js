import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import sass from 'node-sass';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';

import PropTypes from 'prop-types';

import * as react from 'react'
import * as dateFns from 'date-fns'
import * as rfmui from 'redux-form-material-ui'

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
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle-umd.js',
        format: 'umd',
        name: 'veritone-react-common'
      },
      {
        file: 'dist/bundle-es.js',
        format: 'es',
        exports: 'named'
      }
    ],
    // external: ['react', 'react-dom'],
    plugins: [
      resolve({
        module: true,
        jsnext: true,
        // browser: true,
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
          'react': Object.keys(react),
          'react-dnd': ['DragDropContextProvider', 'DropTarget'],
          'date-fns': Object.keys(dateFns),
          'redux-form-material-ui/es': Object.keys(rfmui)
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

      json()
    ]
  }
];
