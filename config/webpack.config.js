const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "../", 'build'),
        filename: "[name]-[contenthash:4].js",
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, "public")
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node-modules/,
                options: {
                    presets: [
                        "@babel/preset-env"
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: "chinczyk! The game",
            template: "./src/html/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}