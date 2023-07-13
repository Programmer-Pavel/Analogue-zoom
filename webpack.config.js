const path = require("path"); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// const devMode = process.env.NODE_ENV !== "production";
const devMode = false;

const config = {
    entry: ["@babel/polyfill", "./src/index.tsx"], // Точка входа для сборки проекта

    output: {
        filename: "[name].[contenthash].js", // Имя выходного файла сборки
        path: path.resolve(__dirname, "dist"), // Путь для выходного файла сборки
    },

    module: {
        strictExportPresence: true, // Включаем строгий режим, чтобы попытка импортировать несуществующие объекты приводила к падению билда
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode
                        ? "style-loader"
                        : {
                              loader: MiniCssExtractPlugin.loader,
                              options: {},
                          },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]--[hash:base64:5]",
                            },
                            // esModule: true, // Говорим о том, что хотим использовать ES Modules
                            // modules: {
                            //     namedExport: true, // Указываем, что предпочитаем именованый экспорт дефолтному
                            // },
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env"]],
                            },
                        },
                    },
                    "sass-loader",
                ],
                include: /\.module\.(c|sa|sc)ss$/,
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode
                        ? "style-loader"
                        : {
                              loader: MiniCssExtractPlugin.loader,
                              options: {},
                          },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env"]],
                            },
                        },
                    },
                    "sass-loader",
                ],
                exclude: /\.module\.(c|sa|sc)ss$/,
            },
            // {
            //     test: /\.module.css$/,
            //     use: [
            //         "css-loader",
            //         {
            //             options: {
            //                 esModule: true, // Говорим о том, что хотим использовать ES Modules
            //                 modules: {
            //                     namedExport: true, // Указываем, что предпочитаем именованый экспорт дефолтному
            //                 },
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },

    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references",
            },
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[contenthash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
        }),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true,
        // }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"), // Каталог для статики
        },
        open: true, // Автоматически открывать браузер
    },

    mode: "development", // Режим сборки
};

module.exports = () => {
    if (devMode) {
        config.mode = "development";
    } else {
        config.mode = "production";
    }
    return config;
};
