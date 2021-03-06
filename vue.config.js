const fs = require('fs');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./server.crt')
    },
    watchOptions: {
      poll: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/foundation/variables.scss";
          @import "@/assets/scss/foundation/functions.scss";
          @import "@/assets/scss/foundation/mixins.scss";
        `
      }
    }
  },
  pwa: {
    name: 'Sketch WebCam',
    themeColor: '#000000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(glsl|fs|vs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'glslify-import-loader'
          }
        },
        {
          test: /\.(glsl|fs|vs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'raw-loader'
          }
        },
        {
          test: /\.(glsl|fs|vs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'glslify-loader'
          }
        },
        {
          test: /\.(obj)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch');
  }
};
