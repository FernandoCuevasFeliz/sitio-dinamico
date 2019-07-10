const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports ={
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/main.bundle.js'
  },
  
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env'
                ]
            }
        }
      },
      {                
        test: [/\.css$|.scss$/],
        exclude: /node_modules/,
        use:[   
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              sourceMap: true,
            },
          }                 
        //   MiniCssExtractPlugin.loader,                
        //  'style-loader',                  
        //  'css-loader',
        //  'postcss-loader',
        //  'resolve-url-loader',
        //  'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|web)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './src/assets/img'
            }
          }
        ]
      }

    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin ({  
        template: './src/views/index.pug', 
        inject: true, 
        minify: { 
            removeComments: true, 
            collapseWhitespace: false 
        } 
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      
     }),
     new CopyWebpackPlugin([{
      from:'./src/assets/img',
       to:'assets/img'
    }])
] 
}
