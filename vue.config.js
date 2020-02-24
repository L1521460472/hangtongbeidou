module.exports = {
  devServer: {
    proxy: {
      '/rest': {
        target: 'http://183.63.53.106:2103',
        ws: true,
        changeOrigin: true
      },
    }
  },
  lintOnSave: false
}
