const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const publicPath = path.join(__dirname, 'public');

require('dotenv').config({
    path: '.env'
});

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    });
    return {
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
          },
        entry: './src/app.js',
        output: {
            path: publicPath,
            filename: 'bundle.js'
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                'process.env': {
                    MARVEL_API_URL: JSON.stringify(process.env.MARVEL_API_URL),
                    MARVEL_PUBLIC_KEY: JSON.stringify(process.env.MARVEL_PUBLIC_KEY),
                    MARVEL_HASH: JSON.stringify(process.env.MARVEL_HASH),
                },
            }),
        ],
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                          sourceMap: true
                        }
                      },
                      {
                        loader: 'sass-loader',
                        options: {
                          sourceMap: true
                        }
                      }
                ],
            }]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: publicPath,
            historyApiFallback: true
        },
    };
};
