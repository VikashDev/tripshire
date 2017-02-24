var webpack = require('webpack');
var path = require('path');
var compressPlugin = require('compression-webpack-plugin');
var glob = require('glob');
console.log(path.join(__dirname, 'app/admin/main.js'));

// console.log(pics);
module.exports = {
    // entry: {
    //     // user: [path.join(__dirname, 'public/js/bootcards.js'), path.join(__dirname, 'public/js/ngapp.js'), path.join(__dirname, 'public/js/nouislider.min.js'), path.join(__dirname, 'public/js/controllers/pageHeaderCtrl.js'),path.join(__dirname, 'public/owl_assets/owl.carousel.min.js')],
    //     // admin: [path.join(__dirname, 'app/admin/controllers.js'),path.join(__dirname, 'app/admin/main.js'),path.join(__dirname, 'app/admin/services.js')]
    // },glob.sync('./public/images/**/*.jpg')
    entry: glob.sync('./public/dist/images/cloudinary/*.png'),
    output: {
        path: path.join(__dirname + 'public/dist/finalImages/cloudinary'),
        filename: '[name].build.js',
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'script-loader'

        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file-loader', {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-80',
                            speed: 3
                        },
                        mozjpeg: {
                            quality: '75',
                        }
                    }
                }
            ]
        }]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    resolve: {
        extensions: ['.js']
    },
    watch: true

};