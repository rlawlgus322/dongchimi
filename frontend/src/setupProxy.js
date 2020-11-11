const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'https://k3a409.p.ssafy.io:9999',
      changeOrigin: true,
    })
  )
}