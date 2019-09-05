const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack-base-config');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const ENVIRONMENT = process.env.ENVIRONMENT;

// 一定要记得要不要在nginx上或者其他地方 缓存 .html 文件
const obj = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    // chunkhash 与 hash是有区别的 项目涉及到拆包，分模块进行加载等等，
    // 那么需要用 chunkhash，来保证每次更新之后只有相关的文件 hash 值发生改变。
    filename: 'js/[name]-[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: '../',
      //       },
      //     },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
    }),
    // new CompressionWebpackPlugin({ //gzip 压缩 // https://www.npmjs.com/package/compression-webpack-plugin
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css)$/i,
    //   threshold: 10240,
    //   // minRatio: 0.8 // 默认0.8
    // }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all', // 同时分割同步和异步代码
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      },
    },
    minimizer: [
      new TerserPlugin({ // 开启js压缩
        cache: true, // 开去缓存OptimizeCSSAssetsPlugin
        parallel: true, // 开启并行压缩，充分利用cpu (相当于 os.length - 1)
        // sourceMap: false, // 移除源地址
        // extractComments: false, // 移除注释
      }),
      new OptimizeCSSAssetsPlugin({ // 压缩css
        cssProcessorOptions: {
          map: { inline: false }
        }
      }),
    ],
  },
});

// 只有预环境、正式环境 才需要 存档一份.tar.gz的文件
// (方便预环境、正式环境上传到服务器) (测试环境就自己直接复制dist目录就好了)
if (ENVIRONMENT === 'pre' || ENVIRONMENT === 'runtime') {
  let version = '';

  if (ENVIRONMENT === 'pre') { // 测试环境
    version = new Date().getTime() // moment().format('YYYY-MM-DD')
  } else {
    version = require('../package.json').version
  }

  obj.plugins.push(new FileManagerPlugin({
    onEnd: {
      archive: [
        {
          source: 'dist',
          destination: 'dist/cps-web-' + version + '.tar.gz',
          format: 'tar',
          options: {
            gzip: true,
            gzipOptions: {
              level: 1
            },
            globOptions: {
              nomount: true
            }
          }
        }
      ],
    }
  }));
}

module.exports = obj;
