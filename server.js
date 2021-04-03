const express = require('express');
const favicon = require('express-favicon');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const URL_3 = '/tankstellen?searchText=84174&brand=0&fuel=2&range=15';

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(
  '/api',
  createProxyMiddleware(URL_3, {
    target: 'https://mehr-tanken.de',
    changeOrigin: true,
  })
);
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
