const merge = require('webpack-merge');
const globalConfig = require('./webpack.config.js');

// printing warning details to catch where throw it
process.traceDeprecation = true;

module.exports = env =>
    merge(globalConfig(env), {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            // openPage: globalConfig(env).output.publicPath.startsWith('/')
            //     ? globalConfig(env).output.publicPath.substr(
            //           1,
            //           globalConfig(env).output.publicPath.length - 1,
            //       )
            //     : globalConfig(env).output.publicPath,
        },
    });
