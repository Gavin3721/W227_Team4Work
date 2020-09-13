module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8888",//设置调用的接口域名和端口号，不要忘了http
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" //这里理解用'/api'代替target里面的地址
                }
            }
        }
    }
}