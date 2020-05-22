module.exports = {
  publicPath:'./',
  devServer: {
    proxy: {
      // '/rest': {
      //   target: 'http://localhost:6000/',
      //   ws: true,
      //   changeOrigin: true
      // },
      '/rest': {
        // target: 'http://218.17.210.115:30117/', //测试服务器
        target: 'http://183.63.53.106:2103/', //正式服务器
        ws: true,
        changeOrigin: true
      },
    }
  },
  lintOnSave: false,
}
