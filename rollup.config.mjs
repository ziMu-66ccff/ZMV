import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts', // 打包入口
  output: [
    {
      file: 'lib/zmv.js', // 对于 Nodejs，打包成 commonjs
      format: 'cjs',
    },
    {
      file: 'esm/zmv.js', // 对于浏览器，打包成 ES module
      format: 'es',
    },
    {
      file: 'dist/zmv.min.js',
      name: 'zmv',
      format: 'umd', // 对于 Nodejs 和浏览器，打包成混合模式
    },
  ],
  plugins: [typescript(), resolve(), babel()],
};
