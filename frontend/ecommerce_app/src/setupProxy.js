const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/auth/google', 
        createProxyMiddleware({ 
            "target" : 'http://localhost:4950/',
            "headers": {
                "Connection": "keep-alive"
            },
            "changeOrigin" : true 
        })
    )
};