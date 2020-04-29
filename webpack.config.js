const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: join(__dirname, 'app.js'),
        background: join(__dirname, './ext/background.js'),
    },
    output: {
        filename: '[name].js',
        path: join(__dirname, 'dist'),
    },
    devServer: {
        port: 9999,
        hot: true,
        open: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.mp3$/,
                loader: 'file-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    presets: ['@babel/reset-env'],
                },
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
            favicon: join(__dirname, 'assets/favicon.png'),
            template: join(__dirname, 'index.html'),
        }),
        new CopyPlugin([
            { from: join(__dirname, 'ext/manifest.json') },
            { from: join(__dirname, 'ext/popup.html') },
            { from: join(__dirname, 'ext/img/icon16.png') },
            { from: join(__dirname, 'ext/img/icon48.png') },
            { from: join(__dirname, 'ext/img/icon128.png') },
        ]),
    ],
};
