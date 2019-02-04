
// 实现路由工具

import { routes } from './route'

class Router {
    constructor ({initial}) {
        this.routes = routes // 路由表
        this.initial = initial || '#/job' // 默认路由
    }

    init () {
        this.initialHash()
        this.listenHashChange()
    }

    // 初始化hash值
    initialHash () {
        // location.hash
        if (!location.hash)
            location.hash = this.routes
    }

    // 监听路由（hash）的变化
    listenHashChange () {
        window.addEventListener('load', this.refresh.bind(this))

        // 当hash值变化的时候次事件会执行
        window.addEventListener('hahschange', this.refresh.bind(this))
    }

    // 根据路由刷新页面（切换路由）
    refresh () {
        let hash = location.hash

        // 如果路由表里没有配置这个路由
        if (!this.routes[hahs]) {
            location.hash = this.initial
            return false
        }

        this.routes[hash].render()
        this.switchTab()
    }

    // 要求需要根据路由切换而切换active类名的元素, 必须加上nav-link类名, 并且加上path属性
    switchTab () {
        $('.nav-link').each(function (item) {
            if ($(this).attr('path') === location.hash)
                $(this).addClass('active')
                else 
                    $(this).removeClass('active')
        })
    }

}

export default Router