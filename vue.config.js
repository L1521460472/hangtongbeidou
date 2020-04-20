module.exports = {
  devServer: {
    proxy: {
      '/rest': {
        target: 'http://localhost:8000/',
        ws: true,
        changeOrigin: true
      },
    }
  },
  lintOnSave: false
}
