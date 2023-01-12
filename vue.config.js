const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    // babel会忽略node_modules里面的代码，你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。false是关闭
    transpileDependencies: false,
    devServer: {
        // 自动开启浏览器
        open: true,
        // 地址n
        host: "127.0.0.1",
        // 端口
        port: 8888,
        // 是否压缩服务器
        compress: true,
        // 配置代理
        proxy: {
            "/dev-api": {
                // 目标地址
                target: "http://gmall-h5-api.atguigu.cn/",
                // 是否开启WEBSTOCKET协议
                // ws: false,
                // 是否在跨域的时候将请求的源换成目标地址，这样目标就会换行
                changeOrigin: true,
                // 如果需要代理，需要把请求地址的前缀替换（前缀的作用只是为了找到代理）
                pathRewrite: {
                    "^/dev-api": "",
                },
            },
        },
    },
    // 用来的配置路径别名
    configureWebpack: {
        resolve: {
            alias: {
                "@comp": "@/components",
            },
        },
    },
});