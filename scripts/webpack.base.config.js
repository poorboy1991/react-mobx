const HappyPack = require('happypack')
const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})

const utils = require('./utils')

module.exports = {
    entry: {
        app: utils.join('/src/index')
    },
    output: {
        path: utils.join('dist'),
        filename: 'js/[hash].[name].js',
        chunkFilename: 'js/[hash].[name].js',
        publicPath: '/'
    },
    stats: "errors-only",
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': utils.join('src'),
            '@ant-design/icons/lib/dist$': utils.join('src/utils/antdIcon.js')
        }
    },
    module: {
        noParse: /node_modules\/(moment|chart\.js)/,
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: utils.join('src'),
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf|svg)$/,
                exclude: /node_modules/,
                include: utils.join('src/assets/images'),
                use: [{
                    loader: 'url-loader?limit=8024',
                    options: {
                        name: 'static/images/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            // loaders: ['cache-loader', 'babel-loader?cacheDirectory'],
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: false
        }),
        new MiniCssExtractPlugin({
            chunkFilename: 'css/[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            template: utils.join('public/index.html'),
            inject: 'body',
            favicon: './public/favicon.ico',
            filename: 'index.html',
            hash: true,
            showErrors: false
        }),
        
    ]
}
