const path = require('path');
const webpack = require('webpack');

// 抽离 vendor 数组中的第三方插件, 只打包一次, 优化打包速度
module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vendor: ['axios', 'babel-polyfill', 'react', 'react-dom', '@hot-loader/react-dom', 'react-router-dom', 'antd']
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/json', '[name]-manifest.json'),
      name: '[name]_library',
      context: path.join(__dirname, '..'),
    })
  ]
};
