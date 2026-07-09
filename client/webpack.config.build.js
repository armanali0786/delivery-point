const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|avif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets/images',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets/fonts',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'https://delivery-point.onrender.com': JSON.stringify("https://delivery-point.onrender.com")
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    mode: 'production'
  };
};
