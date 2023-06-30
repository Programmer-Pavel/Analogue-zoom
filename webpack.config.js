const path = require("path"); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === "production";

const config = {
    entry: ["@babel/polyfill", "./src/index.tsx"], // Точка входа для сборки проекта

    output: {
        filename: "bundle.js", // Имя выходного файла сборки
        path: path.resolve(__dirname, "dist"), // Путь для выходного файла сборки
    },

    module: {
        strictExportPresence: true, // Включаем строгий режим, чтобы попытка импортировать несуществующие объекты приводила к падению билда
        rules: [
            {
                test: /\.(png|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            // esModule: true, // Говорим о том, что хотим использовать ES Modules
                            // modules: {
                            //     namedExport: true, // Указываем, что предпочитаем именованый экспорт дефолтному
                            // },
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
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
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
