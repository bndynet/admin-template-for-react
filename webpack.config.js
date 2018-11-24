const path = require('path');
const webpack = require('webpack');
const app = require("./package.json");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrintTimeWebpackPlugin = require('print-time-webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    entry: './src/index.tsx',
    performance: {
        hints: false
    }, // disable to show warnings about performance
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", "css"]
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }, {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new PrintTimeWebpackPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: true,
            template: './assets/index.html',
        }),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(app.name),
            APP_VERSION: JSON.stringify(app.version),
            APP_BUILD: JSON.stringify(Date.now()),
        }),
        new webpack.BannerPlugin({
            banner: app.name + ' ' + app.version,
        }),
        new webpack.ProvidePlugin({
            // _: 'lodash',
            // $: 'jquery',
            // jQuery: 'jquery',
            // 'window.jQuery': 'jquery',
            // moment: 'moment/moment.js',
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new CopyWebpackPlugin([{
            from: './assets',
        }]),
        new WebpackAutoInject({
            SHORT: 'By ' + app.author,
            SILENT: false,
            PACKAGE_JSON_PATH: './package.json',
            PACKAGE_JSON_INDENT: 4,
            components: {
                InjectAsComment: true
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: 'v{version} - {date}',
                    dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT'
                }
            }
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
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
                    priority: -10
                }
            }
        }
    },
};