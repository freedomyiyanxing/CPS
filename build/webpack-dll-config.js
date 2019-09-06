const path = require('path');
const webpack = require('webpack');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 抽离 vendor 数组中的第三方插件, 只打包一次, 优化打包速度
module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: {
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-router-dom',
      '@material-ui/core',
      'jss',
      'react-jss',
      'prop-types',
      'mobx',
      'mobx-react',
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name]_library_[chunkhash].js', // 文件名 vendors.dll-hash.js
    library: '[name]_library_[chunkhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'), // vendor-manifest.json 输出在当前目录下
      name: '[name]_library_[chunkhash]', // 暴露出的函数名, 同 output.library 一致即可,
      context: path.join(__dirname, '..'), // manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
    }),
    // new CompressionWebpackPlugin({ //gzip 压缩 // https://www.npmjs.com/package/compression-webpack-plugin
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js(\?.*)?$/i,
    //   threshold: 10240,
    //   // minRatio: 0.8 // 默认0.8
    // }),
    // new BundleAnalyzerPlugin({ // 可视化工具 http://127.0.0.1:8888
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8899,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   logLevel: 'info'
    // })
  ]
};
