const path = require("path"); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const config = {
    entry: ["@babel/polyfill", "./src/index.js"], // Точка входа для сборки проекта

    output: {
        filename: "bundle.js", // Имя выходного файла сборки
        path: path.resolve(__dirname, "dist"), // Путь для выходного файла сборки
    },

    module: {
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

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
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
