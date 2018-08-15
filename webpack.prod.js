"use strict";
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("./config.js");
const util = require("./util.js");

const extractCss = new ExtractTextPlugin({
    filename: util.assetsPath("css/vendor.[contenthash].css")
});
const extractLess = new ExtractTextPlugin({
    filename: util.assetsPath("css/app.[contenthash].css")
});

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        plugins: () => [
            require("autoprefixer")({
                browsers: [
                    "last 2 versions",
                    "> 0.1%",
                    "> 5% in US",
                    "ie 6-8",
                    "Firefox < 20",
                    "iOS 7"
                ]
            })
        ]
    }
};

module.exports = function(env, argv) {
    return merge(common, {
        output: {
            filename: util.assetsPath("js/[name].[chunkhash].js"),
            path: config.build.assetsRoot,
            publicPath: config.build.assetsPublicPath
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: extractLess.extract({
                        use: ["css-loader", postcssLoader, "less-loader"],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.css$/,
                    use: extractCss.extract({
                        use: ["css-loader", postcssLoader],
                        fallback: "style-loader"
                    })
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production")
            }),
            extractCss,
            extractLess,
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                names: ["vendor","manifest"]
            })
        ]
    });
};
