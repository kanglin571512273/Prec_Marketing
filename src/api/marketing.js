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
