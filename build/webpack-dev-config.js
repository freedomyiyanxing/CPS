const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack-base-config');

// 在入口注入热更新
Object.keys(webpackBaseConfig.entry).forEach((name) => {
  webpackBaseConfig.entry[name].push('react-hot-loader/patch');
});

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.join(__dirname, '../node_modules'),
          path.join(__dirname, '../src/common/react-intl-tel-input')
        ],
        use: [
          'thread-loader',
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: true,
            },
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, '../node_modules'),
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      // {
      //   test: /\.less$/,
      //   exclude: path.join(__dirname, '../node_modules'),
      //   use: [
      //     'thread-loader',  // 加速编译 (基本没效果, 因为项目不够大)
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           mode: 'local',
      //           localIdentName: '[name]-[local]-[hash:base64:5]',
      //           context: path.resolve(__dirname, 'src'),
      //           hashPrefix: 'my-custom-hash',
      //         }
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //       },
      //     },
      //     'less-loader',
      //   ]
      // },
    ],
  },
  devServer: {
    port: '8899',
    host: '0.0.0.0',
    hot: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    publicPath: '/',
    // historyApiFallback 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    // react-router-dom 就是使用 HTML5的History API实现的
    // 防止跳转路由时 刷新会出现404页面
    historyApiFallback: {
      index: '/index.html',
    },
    compress: true, // 开启gzip压缩
    contentBase: path.join(__dirname, '../dist'), // 打包文件目录
    proxy: { //解决跨域 代理有请求 /api的全部代理到 'http://192.168.1.20:8768'
      '/api': {
        target: 'http://192.168.1.20:8768',
      },
    }
  },
});
