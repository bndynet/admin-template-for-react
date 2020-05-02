const path = require('path');
const webpack = require('webpack');
const app = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrintTimeWebpackPlugin = require('print-time-webpack');
const HeaderInjectionWebpackPlugin = require('@bndynet/header-injection-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

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

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = env => ({
    entry: ['./src/index.tsx'],
    performance: {
        hints: false,
    }, // disable to show warnings about performance
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
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
                    isDevelopment
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     plugins: [
                        //         isDevelopment && 'react-refresh/babel',
                        //     ].filter(Boolean),
                        // },
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
        new BaseHrefWebpackPlugin({
            baseHref: env && env.baseHref,
        }),
        // This makes it possible for us to safely use env vars on our code
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(app.name),
            APP_VERSION: JSON.stringify(app.version),
            APP_BUILD: JSON.stringify(Date.now()),
            APP_BASEHREF: JSON.stringify(
                env && env.baseHref ? env.baseHref : '/',
            ),
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

        // react refresh
        // isDevelopment && new webpack.HotModuleReplacementPlugin(),
        // isDevelopment && new ReactRefreshWebpackPlugin(),
    ],
    // .filter(Boolean)
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
});
