const { getDefaultConfig } = require('expo/metro-config');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = getDefaultConfig(__dirname);

// 开发环境代理配置
if (process.env.NODE_ENV === 'development') {
  config.server = {
    ...config.server,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // API代理逻辑
        if (req.url.startsWith('/api')) {
          // 创建代理中间件
          const proxy = createProxyMiddleware({
            target: 'http://127.0.0.1:4523/m1/7045660-6765697-default',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '', // 移除 /api 前缀
            },
            onError: (err, req, res) => {
              console.error('代理错误:', err);
              res.status(500).json({ error: '代理服务器错误' });
            },
            onProxyReq: (proxyReq, req, res) => {
              console.log('代理请求:', req.method, req.url);
            },
            onProxyRes: (proxyRes, req, res) => {
              console.log('代理响应:', proxyRes.statusCode, req.url);
            }
          });
          
          return proxy(req, res, next);
        }
        return middleware(req, res, next);
      };
    },
  };
}

module.exports = config;