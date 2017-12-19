import babel from 'rollup-plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle-umd.js',
        format: 'umd',
        name: 'veritone-functional-permissions'
      },
      {
        file: 'dist/bundle-es.js',
        format: 'es',
        exports: 'named'
      }
    ],
    plugins: [
      babel({
        include: ['src/*.js'],
        // externalHelpers: true
      })
    ]
  }
];
