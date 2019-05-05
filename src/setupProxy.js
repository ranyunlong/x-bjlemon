const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    // app 是express
    app.use(proxy('/bjlemon', {
        target: "http://center.bjlemon.com",
        changeOrigin: true,
        pathRewrite: {
            '^/bjlemon': "/"
        }
    }))

    app.use(proxy('/xbjlemon', {
        target: 'http://x.bjlemon.com',
        changeOrigin: true,
        pathRewrite: {
            '^/xbjlemon': '/'
        }
    }))
}