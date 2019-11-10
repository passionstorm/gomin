const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = dir => {
  return path.join(__dirname, dir);
};
const fs = require('fs');
const iconFiles = fs.readdirSync(resolve('js/vue/assets/images/icons'))
const icons = iconFiles.map(e => e.replace(/\.[^/.]+$/, ""))

module.exports = {
  mode: 'development',
  node: {
    fs: 'empty',
  },
  stats: {
    errors: true,
    // errorDetails: true,
    // hash: false,
    version: false,
    builtAt: false,
    chunkModules: false,
    // entrypoints: false,
    modules: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // filename: resolve( 'index.html'),
      template: resolve('index.html'),
      'hash': false,
      'compile': false,
      'favicon': false,
      'showErrors': true,
      'chunks': 'all',
      'minify': true,
      // chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      "ICON_LIST": JSON.stringify(icons)
    })
  ],
  devServer: {
    clientLogLevel: 'silent',
    contentBase: resolve('.'),
    historyApiFallback: true,
    hot: true,
    overlay: {warnings: false, errors: true},
    compress: true,
    port: 8080,
  },
  entry: {
    'app': './admin/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../../public/js/admin'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '_c': resolve('js/vue/components'),
      '_w': resolve('js/vue/widgets'),
      '_u': resolve('js/vue/utils'),
      '_v': resolve('js/vue/views'),
    },
    extensions: ['.js', '.vue'],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {},
          hotReload: true,
        },
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: {
              limit: 10000,
              name: 'assets/images/icons/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: false,
        extractComments: false,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          minChunks: 2,
          // enforce: true,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'initial',
          priority: 10,
          reuseExistingChunk: true,
          // enforce: true
        },
      },
    },
  };
}