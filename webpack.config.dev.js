const merge = require('webpack-merge');
const globalConfig = require('./webpack.config.js');

module.exports = merge(globalConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
});