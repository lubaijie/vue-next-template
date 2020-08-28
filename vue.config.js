

const name = 'YunFly' // 网址标题

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
  }
}