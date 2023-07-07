var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        code:[
            './src/App.ts'
        ],

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    devtool: 'source-map',
    mode: "development",
    watch: true,
    resolve: {
        extensions: [".js",".json",".ts"]
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};
