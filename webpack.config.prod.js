const merge = require('webpack-merge');
const globalConfig = require('./webpack.config.js');

module.exports = merge(globalConfig, {
    mode: 'production',
    devtool: 'source-map',
});