// 实现路由工具

import {
    routes
} from './route'

class Router {
    constructor({
        initial
    }) {
        // 路由表
        this.routes = routes

        // 默认路由/hash
        this.initial = initial || '#/job'

    }

    // 初始化
    init() {
        this.initialHash()

        this.listenHashChange()
    }

    // 初始化hash值
    initialHash() {
        // location.hash
        if (!location.hash)
            location.hash = this.initial
    }

    // 监听hash值变化
    listenHashChange() {
        // 页面加载完成, 根据路由渲染页面
        window.addEventListener('load', this.refresh.bind(this))

        // 当hash值变化的时候此事件会执行
        window.addEventListener('hashchange', this.refresh.bind(this))
    }

    // 根据当前路径来切换/渲染路由
    refresh() {
        let hash = location.hash

        // 如果路由表里没有配置这个路由
        // 则回到默认路由
        if (!this.routes[hash]) {
            location.hash = this.initial
            return false
        }

        this.routes[hash].render()

        this.switchTab()
    }

    switchTab() {
        // 要求需要根据路由切换而切换active类名的元素,
        // 必须加上nav-link类名, 并且加上path属性
        $('.nav-link').each(function (item) {
            if ($(this).attr('path') === location.hash)
                $(this).addClass('active')
            else
                $(this).removeClass('active')
        })
    }
}

export default Router