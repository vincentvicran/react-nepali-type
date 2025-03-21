const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const commonConfig = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            name: "ReactNepaliType",
            type: "umd",
        },
        globalObject: "this",
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "reactNepaliType.css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/NepaliType/fonts",
                    to: "fonts",
                },
            ],
        }),
    ],
}

const productionConfig = {
    optimization: {
        minimizer: [new CssMinimizerPlugin(), "..."],
    },
}

const developmentConfig = {
    devServer: {
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, "example"),
        },
    },
}

module.exports = (env, argv) => {
    return merge(commonConfig, argv.mode === "production" ? productionConfig : developmentConfig)
}
