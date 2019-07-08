const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: isDev ? 'development' : 'production', //开发模式 || 生产模式,
  entry: {
    app: path.join(__dirname, '../src/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: isDev ? '/public/' : './',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "thread-loader", // 开启多核 编译babel-loader eslint-loader
            options: {
              workers: os.cpus().length
            }
          },
          'babel-loader',
          'eslint-loader',
        ],
        exclude: path.join(__dirname, '../node_modules'),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev, // 热重载
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[name]__[local]-[hash:base64:10]',
            // }
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 8192,
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 8192,
        }
      }
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 映射到第三包的外部链接
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('../static/json/vendor-manifest.json')
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  optimization: {
    splitChunks: {
    minSize: 300000,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          filename: 'js/[name].bundle.js',
          enforce: true,
        }
      },
      chunks: 'all',
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
};

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: 8899,
    hot: true,
    overlay: {
      errors: true
    },
    contentBase: [path.join(__dirname, '../dist'), path.join(__dirname, '../static')],
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html',
    },
    proxy: { //解决跨域 代理有请求 /api的全部代理到 'http://192.168.1.20:8768'
      '/api': {
        target: 'http://192.168.1.20:8768',
      },
    }
  };
  config.plugins.push(new webpack.HashedModuleIdsPlugin());
}

module.exports = config;
