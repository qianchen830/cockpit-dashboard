const { defineConfig } = require('@vue/cli-service')
const WebpackObfuscator = require('webpack-obfuscator')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    // 跨域代理
    proxy: {
      // 代理，以 /api 开头的请求地址
      '/api': {
        // 转发到目标地址
        target: process.env.VUE_APP_API_URL,
        // 是否代理 websocket
        ws: false,
        // 更改源头
        changeOrigin: true,
        // 路径重写，将请求路径 /api 替换为 空
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // 生产环境 部署代码混淆
  configureWebpack: process.env.NODE_ENV === 'production' ? {
    plugins: [
      new WebpackObfuscator({
        // 压缩代码
        compact: true,
        // 是否启用控制流扁平化(降低1.5倍的运行速度)
        controlFlowFlattening: false,
        // 随机的死代码块(增如了混请代码的大小)
        deadCodeInjection: false,
        // 此选项几乎不可能使用开发者工具的控制台选项卡
        debugProtection: false,
        // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能
        debugProtectionInterval: 0,
        // 通过用空面教誉换它们来禁用console,log， console.info，console,error和console.an。这使得调试器的使用更加困难
        disableConsoleOutput: false,
        // 标识符的混清方式 hexadecimal(十六进制) mangled(短标识符)
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        // 是否启用全局变量和函数名称的混清
        renameGlobals: false,
        // 混清后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        // 删除字符申文字并将它们放在一个特殊的数组中
        stringArray: true,
        stringArrayCallsTransform: false,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: true
      }, [])
    ]
  } : {}

})
