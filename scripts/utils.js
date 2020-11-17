const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.join = (src) => {
    return path.join(__dirname, '..', src)
}

exports.cssLoader = (options) => {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader, 'postcss-loader']
        if(loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options:  Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        
        if(options.extract) {
            return [
                {loader: MiniCssExtractPlugin.loader}
            ].concat(loaders)
        } else {
            return ['style-loader'].concat(loaders)
        }
    }
    const obj = {
        css: generateLoaders(),
        less: generateLoaders('less', {lessOptions: {javascriptEnabled: true}})
    }
    
    const output = [];
    for (let key in obj) {
        const loader = obj[key];
        output.push({
            test: new RegExp('\\.' + key + '$'),
            use: loader
        })
    }
    return output;
}
