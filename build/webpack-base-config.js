const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dllName = require('./vendor-manifest.json').name;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 判断当前打包环境 （dev = 开发，test = 测试，pre = 预环境）
const ENVIRONMENT = process.env.ENVIRONMENT;
console.log(` ======   当前是 ${ENVIRONMENT} 环境   ==== `);

// 获取骨架屏 loading
const loading = fs.readFileSync(path.join(__dirname, '../src/common/skeleton/skeleton.html'));

module.exports = {
  entry: {
    app: [path.join(__dirname, '../src/app.js'),]
  },
  output: {
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 省略文件后缀名;
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: path.join(__dirname, '../node_modules'), // 排除路径,
        include: path.resolve(__dirname, '../src'), // 精确需要处理的路径,
        use: [
          'cache-loader', // 缓存
          'thread-loader',  // 加速编译
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: path.join(__dirname, '../babel/babel.js'),
            },
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        exclude: path.join(__dirname, '../node_modules'), // 排除路径,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[contenthash]',
            limit: 500,
            outputPath: 'images',
          }
        }]
      },
    ],
  },

  optimization: {
    // runtimeChunk: {
    //   name: 'manifest',
    // },
    splitChunks: { // 分块打包
      chunks: 'all', // 同时分割同步和异步代码
      cacheGroups: {
        vendors: { // 打包 node_modules 下的第三方包, 打入vendors.js (除按需加载的)
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000, // 生成包的大小 以字节为单位
          // maxInitialRequests: 3, // 初始页面加载时并行请求的最大数量将小于或等于4 默认是3 (意思打开第一个页面的js不许超过3个请求)
          minChunks: 1,
          chunks: 'initial', // 设置为 all 会导致异步加载的库如果满足了当前 cacheGroups 的条件也会导致被打包到一起
          // priority: 1 // 该配置项是设置 cacheGroups 分组处理的优先级，数值越大越优先处理 (默认 -10)
        },
        rcCalendarBase: { // 把 rc-calendar、moment 打入  calender-moment-base.js
          name: 'calender-moment-base',
          test: (module) => {
            return /rc-calendar|moment/.test(module.context)
          },
          chunks: 'initial',
          priority: 2, // 优先 rcCalendarBase 打包
        },
        // commons: { // 达不到 30kb 所以先注释
        //   test: /[\\/]src[\\/]common[\\/]/,
        //   name: 'commons',
        //   minSize: 30000,
        //   minChunks: 3,
        //   chunks: 'initial',
        //   priority: 1,
        //   reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        // },
        // momentBase: {
        //   name: 'moment-base',
        //   test: (module) => {
        //     return /moment/.test(module.context);
        //   },
        //   chunks: 'initial',
        //   priority: 1,
        // },
      },
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      loading,
      title: 'Gps',
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      vendorName: `<script src="/js/${dllName}.js"></script>`,
      favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
      }
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      //包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
      manifest: require('./vendor-manifest.json'),
    }),
    new CopyWebpackPlugin([ // 复制
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist'),
      }
    ]),
    new webpack.DefinePlugin({
      // 根据打包环境 匹配相对应的图片路径
      'process.env.IMG_BASE': imgUrls(ENVIRONMENT),
      'process.env.PAYPAL_RETURN_URL': serverUrls(ENVIRONMENT),
    }),
    new webpack.ContextReplacementPlugin( // 按需加载第三方包 (详细说明 请看官网)
      /moment[/\\]locale$/,
      /en-gb/,
    ),
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
  ],
};

function imgUrls(env) {
  let imgUrl = '';
  if (env === 'dev' || env === 'test') {
    imgUrl = 'https://cdn.influmonsters.com';
  } else if (env === 'pre' || env === 'runtime') {
    imgUrl = 'https://img.influmonsters.com';
  }
  return JSON.stringify(imgUrl);
}

function serverUrls(env) {
  let paypalReturnUrl = '';
  switch (env) {
    case 'dev':
      paypalReturnUrl = 'http://192.168.1.22:8899';
      break;
    case 'test':
      paypalReturnUrl = 'http://192.168.1.20:8800';
      break;
    case 'pre':
      paypalReturnUrl = 'https://imtribe.yingshuxinxi.com';
      break;
    case 'runtime':
      paypalReturnUrl = 'https://imtribe.influmonster.com';
      break;
  }
  return JSON.stringify(paypalReturnUrl + '/my/account-payment');
}
