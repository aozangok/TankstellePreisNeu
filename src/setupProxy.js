const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mehr-tanken.de',
      secure: false,
      changeOrigin: true,
    })
  );
};
