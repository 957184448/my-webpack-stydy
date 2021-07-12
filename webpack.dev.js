'use strict';

const path = require('path');
const webpack = require('webpack');
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
    filename: '[name].js'//打包出的文件名
  },
  mode: 'development',
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
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
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
            loader: 'url-loader',
            options: {
              limit: 10240, // 10k大小 如果10k以下图片 自动打包成base64
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }


};