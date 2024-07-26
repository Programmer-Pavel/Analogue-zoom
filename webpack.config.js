import path from 'node:path' // Импортируем модуль "path" для работы с путями файлов
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const { loader: _loader } = MiniCssExtractPlugin
const { resolve: _resolve, join, dirname } = path

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// eslint-disable-next-line node/prefer-global/process
const devMode = process.env.NODE_ENV !== 'production'

const config = {
  entry: ['@babel/polyfill', './src/app/index.tsx'], // Точка входа для сборки проекта

  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js', // Имя выходного файла сборки
    path: _resolve(__dirname, 'build'), // Путь для выходного файла сборки
    clean: true,
  },

  module: {
    strictExportPresence: true, // Включаем строгий режим, чтобы попытка импортировать несуществующие объекты приводила к падению билда
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode
            ? 'style-loader'
            : {
                loader: _loader,
                options: {},
              },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'sass-loader',
        ],
        include: /\.module\.(c|sa|sc)ss$/,
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode
            ? 'style-loader'
            : {
                loader: _loader,
                options: {},
              },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'sass-loader',
        ],
        exclude: /\.module\.(c|sa|sc)ss$/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: _resolve(__dirname, 'assets'),
          to: _resolve(__dirname, 'build/assets'),
        },
      ],
    }),
  ],

  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(__dirname, 'build'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}

export default () => {
  if (devMode) {
    config.mode = 'development'
    config.devtool = 'source-map'
  }
  else {
    config.mode = 'production'
  }
  return config
}
