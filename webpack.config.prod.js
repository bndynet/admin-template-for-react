const merge = require('webpack-merge');
const globalConfig = require('./webpack.config.js');

module.exports = env => merge(globalConfig(env), {
    mode: 'production',
    devtool: 'source-map',
});