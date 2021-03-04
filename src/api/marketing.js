import axios from "@/utils/request";

// 登录接口
export const addLogin = data => {
  return axios.request({
    url: `/v1/app/cusManager/login`,
    method: "post",
    data
  });
};
// 根据今日情况
export const getTodayHappen = params => {
  return axios.request({
    url: `/v1/index/count/getTodayHappen`,
    method: "get",
    params
  });
};
// 根据每日概况
export const getDailyOverview = params => {
  return axios.request({
    url: `/v1/index/count/getDailyOverview`,
    method: "get",
    params
  });
};
// 根据查看意向产品分布
export const getProductDistribution = params => {
  return axios.request({
    url: `/v1/index/count/getProductDistribution`,
    method: "get",
    params
  });
};
// 根据字典类型获取字典
export const getDictList = params => {
  return axios.request({
    url: `/v1/app/dict/type/${params}`,
    method: "get"
  });
};

// 获取客户列表
export const getCustomList = params => {
  return axios.request({
    url: "/v1/app/customer/getCustomers",
    method: "get",
    params
  });
};

// // 获取客户详情
export const getCustomDetail = params => {
  return axios.request({
    url: `/v1/app/customer/getCustomer/${params}`,
    method: "get"
  });
};
// // 获取客户推荐产品列表
export const getAnalysisDetail = params => {
  return axios.request({
    url: `/v1/app/customer/getAnalysisDetail/${params}`,
    method: "get"
  });
};
// // 获取本行业务办理
export const getOurBankBuss = params => {
  return axios.request({
    url: `/v1/app/customer/getOurBankBuss/${params}`,
    method: "get"
  });
};
// // 获取本行业务办理
export const getCustomStatusHistory = params => {
  return axios.request({
    url: `/v1/app/marketing/custom/getCustomStatusHistory/`,
    method: "get",
    params
  });
};
// // 获取所有标签
export const tagList = params => {
  return axios.request({
    url: `/v1/app/customer/tagList`,
    method: "get",
    params
  });
};
// 添加标签
export const setCustTags = (data) => {
  return axios.request({
      url: `/v1/app/customer/setCustTags`,
      method: 'put',
      data
  })
}
