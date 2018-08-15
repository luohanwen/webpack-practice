const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const util = require("./util");
function venderPath(name) {
    return path.join(__dirname, "src/assets/js/", name);
}
function nodeModulesPath(_path) {
    return path.join(__dirname, "node_modules/", _path);
}
module.exports = {
    entry: {
        app: "./src/main.js",
        vendor: [
            venderPath("test.chunk.js"),
            nodeModulesPath("jquery/dist/jquery")
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: util.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: util.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: util.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
            template: "src/index.html"
        }),
        new CleanWebpackPlugin(["dist"]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
