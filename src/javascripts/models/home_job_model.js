
// 提供职位信息数据
const job_list = (pageNo = 1) => {
    return $.ajax({
        url: '/lagou/listmore.json?pageNo=' + pageNo + '&pageSize=15',
        success: (res) => {
            return res
        }
    })
}

const job_refresh = () => {
    return $.ajax({
        url: `/lagou/listmore.json?pageNo1&pageSize=15`,
        success: (res) => {
            return res
        }
    })
}

export default {
    job_list,
    job_refresh
}