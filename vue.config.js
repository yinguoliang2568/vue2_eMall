const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    lintOnSave: false, //关闭eslint检查
    // 默认情况下 babel-loader 会忽略所有 node_modules中的文件
    transpileDependencies: false, // 配置devServer
    devServer: {
        // 自动打开浏览器配置
        open: true,
        // 配置ip
        host: "127.0.0.1",
        // 配置端口号
        port: 8980,
        proxy: {
            "/dev-api": {
                // 目标服务器地址
                target: "http://gmall-h5-api.atguigu.cn/",
                // 是否开启webStock协议
                ws: true,
                // 是否在跨域的时候，把请求的地址改为目标地址（一般写true），这样目标地址就会放行
                changeOrigin: true,
                // 如果去请求代理，则把请求地址的前缀替换（前缀的作用只是找到对应的代理）
                pathRewrite: {
                    "^/dev-api": "",
                },
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@comp": "@/components",
            },
        },
    },
});