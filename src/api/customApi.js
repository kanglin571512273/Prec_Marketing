
import axios from '@/utils/request'
// 路由管理。 权限控制
// 获取用户列表
export const getCustomList = (params) => {
    return axios.request({
        url: '/v1/app/customer/getCustomers',
        method: 'get',
        params
    })
}
// 获取客户详情
export const getCustomDetail = (params) => {
    return axios.request({
        url: `/v1/app/customer/getCustomer/${params}`,
        method: 'get',
    })
}

// 根据字典类型获取字典
export const getDictList = (params) => {
    return axios.request({
        url: `/v1/app/dict/type/${params}`,
        method: 'get',
    })
}
// 新增客户
export const addCustom = (data) => {
    return axios.request({
        url: `/v1/app/customer`,
        method: 'post',
        data
    })
}
// 编辑客户信息
export const editCustom = (data) => {
    return axios.request({
        url: `/v1/app/customer`,
        method: 'put',
        data
    })
}
// 发起客户分析
export const analysisCustom = (params) => {
    return axios.request({
        url: `/v1/app/customer/custAnalysis/${params}`,
        method: 'get',
        params
    })
}
// 分析历史列表
export const getAnalyList = (params) => {
    return axios.request({
        url: `/v1/app/customer/getAnalysisList`,
        method: 'get',
        params
    })
}
