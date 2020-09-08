
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}


const name = 'Yun Fly' // 网址标题

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    name: name
  },
  chainWebpack(config) {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    // 配置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symboId: 'icon-[name]'
      })
      .end()

      // set preserveWhitespace
      // config.module
      //   .rule('vue')
      //   .use('vue-loader')
      //   .loader('vue-loader')
      //   .tap(options => {
      //     console.log(options);
      //     // options.compilerOptions.preserveWhitespace = true;
      //     return options;
      //   })
      //   .end()

      config
        .when(process.env.NODE_ENV === 'development',
          config => config.devtool('cheap-source-map')
        )

      config
        .when(process.env.NODE_ENV !== 'development',
          config => {
            config
              .plugin('ScriptExtHtmlWebpackPlugin')
              .after('html')
              .use('script-ext-html-webpack-plugin', [{
                inline: /runtime\..*\.js$/
              }])
              .end()
            config
              .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'),
                    minChunks: 3,
                    priorty: 5,
                    reuseExistingChunk: true
                  }
                }
              })
            config.optimization.runtimeChunk('single')
          }
        )
  }
}