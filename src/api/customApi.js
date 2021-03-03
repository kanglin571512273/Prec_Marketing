
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
// 根据id查询客户分析列表
export const analysisCustomByIds = (params) => {
    return axios.request({
        url: `/v1/app/customer/getAnalysisListByIds/${params}`,
        method: 'get',
        params
    })
}
// 分析历史列表
export const getOneAnalyHistory = (params) => {
    return axios.request({
        url: `/v1/app/customer/getAnalysisList/${params}`,
        method: 'get',
    })
}
//分析之后推荐产品是否有变化
export const isUpdata = () => {
    return axios.request({
        url: `/v1/app/customer/getChangeCount`,
        method: 'get',
    })
}
//查询营销活动列表
export const getActiveList = () => {
    return axios.request({
        url: `/v1/app/marketing/act/getActive`,
        method: 'get',
    })
}
// 查看活动客户信息
export const getActiveCusList = (params) => {
    return axios.request({
        url: `/v1/app/marketing/act/getCustom`,
        method: 'get',
        params
    })
}
// 更新客户表推荐产品和推荐时间
export const getNewHisList = () => {
    return axios.request({
        url: `/v1/app/customer/updateRecord`,
        method: 'get',
    })
}
// 添加跟进信息
export const followUp = (data) => {
    return axios.request({
        url: `/v1/app/marketing/act/addMarketingStatus`,
        method: 'post',
        data
    })
}
// 继续跟进信息
export const continueFollowUp = (data) => {
    return axios.request({
        url: `/v1/app/marketing/act/updateMarketingStatus`,
        method: 'post',
        data
    })
}
