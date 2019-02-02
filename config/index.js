// require 函数的返回值就是模块暴露的东西
const server_config = require('./server_config')
const webpack_config = requie('./webpack_config')

// 全局配置
/* 
    sass最终输出的样式包括下面几种样式风格：
        嵌套输出方式 nested
        展开输出方式 expanded 
        紧凑输出方式 compact 
        压缩输出方式 compressed
*/
const base_config = {
    sass_config: {
        outputStyle: 'compressed'
    },
    webpack_config
}

const build_config = { ...base_config }

const dev_config = {
    server_config, ...base_config
}

module.exports = {
    build_config,
    dev_config
}