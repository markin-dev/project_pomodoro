const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: join(__dirname, 'app.js'),
    output: {
        filename: 'main.js',
        path: join(__dirname, 'dist'),
    },
    devServer : {
        port : 9999,
        hot : true,
        open : true,
        historyApiFallback : true,
    },
    module : {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    presets: ['@babel/reset-env'],
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            inject: true,
            title: 'Project Pomodoro',
            favicon: join(__dirname, 'favicon.png'),
            template: join(__dirname, 'index.html'),
        })
    ],
};
