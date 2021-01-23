const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://todoapp-cvwo.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
