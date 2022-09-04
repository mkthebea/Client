const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://www.mat-ching.kro.kr:8000",
      changeOrigin: true,
    })
  );
};
