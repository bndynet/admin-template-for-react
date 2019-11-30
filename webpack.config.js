const path = require('path');
const webpack = require('webpack');
const app = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrintTimeWebpackPlugin = require('print-time-webpack');
const HeaderInjectionWebpackPlugin = require('@bndynet/header-injection-webpack-plugin');

function resolveTsconfigPathsToAlias({
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = './',
} = {}) {
    const { paths } = require(tsconfigPath).compilerOptions;

    const aliases = {};

    Object.keys(paths).forEach(item => {
        const key = item.replace('/*', '');
        const value = path.resolve(
            webpackConfigBasePath,
            paths[item][0].replace('/*', ''),
        );

        aliases[key] = value;
    });

    return aliases;
}

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: ['./src/index.tsx'],
    performance: {
        hints: false,
    }, // disable to show warnings about performance
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ASSET_PATH,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', 'css'],
        alias: {
            ...resolveTsconfigPathsToAlias(),
            react: path.join(__dirname, 'node_modules/react'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    failOnWarning: false,
                    failOnError: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new PrintTimeWebpackPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: app.title,
            meta: {
                author: app.author,
                description: app.description,
            },
            inject: true,
            template: './assets/index.html',
        }),
        // This makes it possible for us to safely use env vars on our code
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(app.name),
            APP_VERSION: JSON.stringify(app.version),
            APP_BUILD: JSON.stringify(Date.now()),
            APP_ROOT: JSON.stringify(ASSET_PATH),
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new CopyWebpackPlugin([
            {
                from: './assets',
            },
            {
                from: './README.md',
            },
            {
                from: './README.zh-CN.md',
            },
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HeaderInjectionWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
    },
};
