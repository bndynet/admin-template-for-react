const webpack = require('webpack');
const merge = require('webpack-merge');
const globalConfig = require('./webpack.config.js');

module.exports = merge(globalConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});