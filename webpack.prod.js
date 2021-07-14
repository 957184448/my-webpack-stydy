'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//解析css 
//需要用到css-loader 并且转换为commonjs对象插入到样式中
//需要用到style-loader 将央视通过<style>标签插入到head中

//文件监听原理
// webpack会轮询判断文件监听事件是否发生变化，会先存储文件的修改时间
//如果有变化，就会把上一次的修改时间与这一次的修改时间做对比
//如果发现不一致，会把文件的修改缓存起来，等待的时间内如果其他文件也发生变化
//会把变化的文件列表一起构建到打包模块中 build


module.exports = {
  // entry: './src/index.js',//入口  单入口字符串 多入口 { }
  entry: {//多入口
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {//出口
    path: path.join(__dirname, 'dist'),//指定输出文件夹 dist 目录
    filename: '[name]_[chunkhash:8].js',//打包出的文件名 chunkhash:8 文件指纹设置 取前8位 下划线为了区分

  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          //loader是链式调用，执行顺序是从右到左 ，因此需要先治行css-loader，解析css
          //再将解析好的css传递给style-loader
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /.(png|jpg|gif|jpeg)$/,
      //   use: 'file-loader' 
      // },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 10240, // 10k大小 如果10k以下图片 自动打包成base64
              name: '[name]_[hash:8][ext]',// 图片文件指纹
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/, //字体文件指纹
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 10240, // 10k大小 如果10k以下图片 自动打包成base64
              name: '[name]_[hash:8][ext]',// 图片文件指纹
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8]',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    })
  ]
};