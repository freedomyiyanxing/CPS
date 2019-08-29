const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 判断当前打包环境 （dev = 开发，test = 测试，pre = 预环境）BundleAnalyzerPlugin
const ENVIRONMENT = process.env.ENVIRONMENT;
console.log(` ======   当前是 ${ENVIRONMENT} 环境   ==== `);
// 获取骨架屏
const loading = {
  html: fs.readFileSync(path.join(__dirname, '../src/common/skeleton/skeleton.html')),
  css: `<style id="skeleton-id">${fs.readFileSync(path.join(__dirname, '../src/common/skeleton/skeleton.css'))}</style>`,
};

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
          'thread-loader',  // 加速编译
          'cache-loader', // 缓存
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
            limit: 500,
            outputPath: 'images',
          }
        }]
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      loading,
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
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
      'process.env.SERVER_URL': serverUrls(ENVIRONMENT),
      // (ENVIRONMENT === 'dev' || ENVIRONMENT === 'test')
      //   ? JSON.stringify("https://cdn.influmonsters.com")
      //   : JSON.stringify("https://img.influmonsters.com"),
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
  let serverUrl = '';
  switch (env) {
    case 'dev':
      serverUrl = 'http://192.168.1.20:8768';
      break;
    case 'test':
      serverUrl = 'http://192.168.1.20:8768';
      break;
    case 'pre':
      serverUrl = 'https://cps-api.yingshuxinxi.com';
      break;
    case 'runtime':
      serverUrl = 'https://cps-api.influmonster.com';
      break;
  }
  return JSON.stringify(serverUrl);
}
