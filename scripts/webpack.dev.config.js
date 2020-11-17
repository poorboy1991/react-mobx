const { merge } = require("webpack-merge")
const ExtendedDefinePlugin = require('extended-define-webpack-plugin')
const ip = require('ip')

const baseWebpackConfig = require('./webpack.base.config')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8082,
        host: ip.address(),
        contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        proxy: {
            '/api': {
                target: 'https://wbx-test.fapiaoer.cn',
                secure: false,
                changeOrigin: true
            }
        },
        hot: true,
        open: true,
        publicPath: "/", // 访问资源加前缀
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: utils.cssLoader()
    },
    plugins: [
        new ExtendedDefinePlugin({
            // 全局变量
            __LOCAL__: true,
        }),
    ]
})
