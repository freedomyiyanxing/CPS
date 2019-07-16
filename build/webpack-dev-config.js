// const path = require('path');
// const webpack = require('webpack');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//
// const isDev = process.env.NODE_ENV === 'development';
//
// const config = {
//   mode: isDev ? 'development' : 'production', //开发模式 || 生产模式,
//   entry: {
//     app: path.join(__dirname, '../src/app.js')
//   },
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: 'js/[name].[hash].js',
//     publicPath: isDev ? '/public/' : './',
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: [
//           'babel-loader',
//           'eslint-loader',
//         ],
//         exclude: path.join(__dirname, '../node_modules'),
//       },
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//               hmr: isDev, // 热重载
//               reloadAll: true,
//             }
//           },
//           {
//             loader: 'css-loader',
//           },
//           'postcss-loader',
//         ],
//       },
//       {
//         test: /\.(jpg|png|gif|jpeg)$/,
//         loader: 'file-loader',
//         options: {
//           name: '[name].[ext]?[hash]',
//           limit: 8192,
//         }
//       },
//       {
//         test: /\.(ttf|eot|woff|woff2|svg)$/,
//         loader: 'url-loader',
//         options: {
//           name: '[name].[ext]?[hash]',
//           limit: 8192,
//         }
//       }
//     ],
//   },
//   plugins: [
//     new HTMLWebpackPlugin({
//       inject: true,
//       filename: 'index.html',
//       template: path.resolve(__dirname, '../src/index.html'),
//     }),
//     new MiniCssExtractPlugin({
//       filename: 'css/[name].css',
//     }),
//     // 映射到第三包的外部链接
//     new webpack.DllReferencePlugin({
//       context: path.join(__dirname, '..'),
//       manifest: require('../static/json/vendor-manifest.json')
//     }),
//     new OptimizeCssAssetsPlugin(),
//   ],
//   optimization: {
//     splitChunks: {
//     minSize: 300000,
//       cacheGroups: {
//         vendors: {
//           test: /node_modules/,
//           name: 'vendors',
//           filename: 'js/[name].bundle.js',
//           enforce: true,
//         }
//       },
//       chunks: 'all',
//     },
//     runtimeChunk: {
//       name: 'runtime'
//     }
//   }
// };
//
// if (isDev) {
//   config.devServer = {
//     host: '0.0.0.0',
//     port: 8899,
//     hot: true,
//     overlay: {
//       errors: true
//     },
//     contentBase: [path.join(__dirname, '../dist'), path.join(__dirname, '../static')],
//     publicPath: '/public/',
//     historyApiFallback: {
//       index: '/public/index.html',
//     },
//     proxy: { //解决跨域 代理有请求 /api的全部代理到 'http://192.168.1.20:8768'
//       '/api': {
//         target: 'http://192.168.1.20:8768',
//       },
//     }
//   };
//   config.plugins.push(new webpack.HashedModuleIdsPlugin());
// }
//
// module.exports = config;

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
        target: 'http://192.168.1.25:8768',
      },
    }
  },
});
