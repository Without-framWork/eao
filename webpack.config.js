/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const nunjuckspages = require('./nunjuckspages');

module.exports = (env, argv) => {
   // Webpack 5 reads mode from argv.mode
   const isProduction = argv.mode === 'production';

   return {
      mode: isProduction ? 'production' : 'development',
      entry: {
         main: './src/index.js',
         typescript_demo: './src/ts/typescript_demo.ts',
         vendor: './src/vendor.js',
      },
      output: {
         path: path.join(__dirname, 'dist'),
         filename: 'assets/js/[name].js',
         library: '[name]Module',
         clean: true, // Replaces CleanWebpackPlugin natively
      },
      // Webpack 5 replacement for BrowserSync live reloading & file watching
      devServer: {
         static: {
            directory: path.join(__dirname, 'dist'),
         },
         compress: true,
         port: 3000,
         hot: true,
         watchFiles: ['src/**/*', 'templates/**/*'], // Replaces ExtraWatchWebpackPlugin
      },
      module: {
         rules: [
            {
               test: /\.(sa|sc|c)ss$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { sourceMap: true } },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
                  {
                     loader: 'sass-loader',
                     options: {
                        sourceMap: true,
                        sassOptions: {
                           silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
                        },
                     },
                  },
               ],
            },
            {
               test: /\.ts(x?)$/,
               exclude: /node_modules/,
               use: [
                  {
                     loader: 'babel-loader',
                     options: {
                        presets: ['@babel/preset-env'],
                     },
                  },
                  {
                     loader: 'ts-loader',
                  },
               ],
            },
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                  },
               },
            },
            {
               test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/i,
               type: 'asset/resource', // Replaces url-loader/file-loader in Webpack 5
               generator: {
                  filename: 'assets/media/[name][ext]',
               },
            },
         ],
      },
      stats: {
         colors: true,
      },
      devtool: isProduction ? 'source-map' : 'eval-source-map',
      plugins: [
         new NunjucksWebpackPlugin({
            templates: nunjuckspages,
         }),
         new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
         }),
         new CopyWebpackPlugin({
            patterns: [
               {
                  from: path.resolve(__dirname, 'assets'),
                  to: path.resolve(__dirname, 'dist/assets'),
                  noErrorOnMissing: true,
                  globOptions: {
                     ignore: [
                        '**/main.css',
                        '**/main.css.map',
                        '**/main.js',
                        '**/main.js.map',
                        '**/typescript_demo.*',
                        '**/vendor.js',
                        '**/vendor.js.map',
                     ],
                  },
               },
            ],
         }),
      ],
      optimization: {
         minimize: isProduction,
         minimizer: [
            new TerserPlugin({
               parallel: true,
            }),
            // Old CSS minimizer dropped. Webpack 5 optimizes production CSS natively out of the box.
         ],
      },
   };
};
