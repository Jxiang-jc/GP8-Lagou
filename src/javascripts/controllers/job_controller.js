import {
    job_template
} from "../views/homt-job.html";
import job_content_template from '../views/home-job-content.html'
import job_model from '../models/home_job_model'

import BScroll from 'better-scroll'

// 当前加载的职位信息的页数
let _pageNo = 1
// job页面显示的所有数据
let datasources = []

const render = () => {
    // 初始加载一下, 首页的框架
    let _template = Handlebars.compile(job_template)

    let _html = _template()

    $('.home-container main').html(_html)

    handleContentScroll()
}

// 处理整个程序滚动等逻辑
const handleContentScroll = async () => {

    // 实例化BScroll
    let _job_scroll = new BScroll('main', {
        startY: -80,
        probeType: 2
    })

    // 初始加载第一页
    await getJobList()
    // 异步加载完成后, 让better-scroll重新计算
    job_scroll.refresh()

    // 下拉刷新的dom元素
    let _o_scroll_info_top = $('.scroll-info--top')
    // 下拉刷新的文字dom
    let _o_scroll_info_top_title = _o_scroll_info_top.find('.scroll-info__title')

    // 上拉刷新的dom元素
    let _o_scroll_info_bottom = $('.scroll-info--bottom')
    // 上拉刷新的文字dom
    let _o_scroll_info_bottom_title = _o_scroll_info_bottom.find('.scroll-info__title')

    // 下拉刷新元素的初始类名
    let _top_class = 'scroll-info--top scroll-info'
    // 下拉刷新的状态
    let _scroll_y_sta = 'go'

    let _scroll_bottom_sta = false

    _job_scroll.on('scroll', ({
        x,
        y
    }) => {
        // 放手就刷新
        if (y > 0 && _scroll_y_sta !== 'release') {
            // 使用状态判断是符合条件再更改视图
            _scroll_y_sta = 'release'
            _o_scroll_info_top.prop('class', _top_class + 'release-refresh')
            _o_scroll_info_top_title.html('放开手就刷新')
        }

        _scroll_bottom_sta = false
        if (_job_scroll.maxScrollY - y > 0) {
            _scroll_bottom_sta = true
            _o_scroll_info_bottom_title.html('放开去加载')
        }
    })

    _job_scroll.on('scrollEnd', async ({
        x,
        y
    }) => {
        // 没有完全拉出刷新元素
        if (y > -80 && y < 0) {
            // 塞回去
            _job_scroll.scrollTo(0, -80, 300)
        } else if (y === 0) { // 说明该获取数据去了

            if (_scroll_y_sta === 'release') {
                _o_scroll_info_top.prop('class', _top_class + 'loading')
                _o_scroll_info_top_title.html('正在加载')
                await refreshJobList()
                _o_scroll_info_top.prop('class', _top_class + 'go-refresh')
                _o_scroll_info_top_title.html('下拉就刷新')
                _scroll_y_sta = 'go'
                _job_scroll.refresh()
            }
            _job_scroll.scrollTo(0, -80, 300)
        }
        if (_job_scroll.maxScrollY - y === 0 && _scroll_bottom_sta) {

            _o_scroll_info_bottom_title.html('正在加载')
            _o_scroll_info_bottom.addClass('loading')
            _pageNo++
            await getJobList()
            _o_scroll_info_bottom_title.html('上拉去加载')
            _o_scroll_info_bottom.removeClass('loading')
            _job_scroll.refresh()
        }
    })
}

// 下拉刷新的时候去获取数据
const refreshJobList = async () => {
    let _job_data = await job_model.job_refresh()
    let _job_list = _job_data.content.data.page.result

    // 刷新, 新数据放在前面
    datasources = [..._job_list, ...datasources]
    renderJobList()
}

// 获取某一页数据
const getJobList = async () => {

    let _job_data = await job_model.job_list(_pageNo)

    // 多个职位信息数组
    let _job_list = _job_data.content.data.page.result

    datasources = [...datasources, ..._job_list]

    // 每次获取到新的数据后重新渲染
    renderJobList()
}

// 渲染job-content
const renderJobList = () => {
    // 将html字符串处理成编译函数
    let _template = Handlebars.compile(job_content_template)

    // 将handlebar模板编译成html格式的字符串
    let _html = _template({_job_list: datasources})

    $('.home-container main .job-content').html(_html)
}

export default {
    render
}