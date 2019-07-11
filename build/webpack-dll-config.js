const path = require('path');
const webpack = require('webpack');

// 抽离 vendor 数组中的第三方插件, 只打包一次, 优化打包速度
module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-router-dom',
      '@material-ui/core',
      '@material-ui/icons',
      'jss',
      'react-jss',
      'prop-types',
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      // path: path.join(__dirname, '../static/json', '[name]-manifest.json'),
      // name: '[name]_library',
      // context: path.join(__dirname, '..'),
      path: path.join(__dirname, '.', '[name]-manifest.json'), // vendor-manifest.json 输出在当前目录下
      name: '[name]_library', // 暴露出的函数名, 同 output.library 一致即可,
      context: path.join(__dirname, '..'), // manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
    })
  ]
};
