import axios from "@/utils/request";
// // 获取客户详情
// export const getCustomDetail = params => {
//   return axios.request({
//     url: `/v1/app/customer/getCustomer/${params}`,
//     method: "get"
//   });
// };

// 登录接口
export const addLogin = data => {
  return axios.request({
    url: `/v1/app/cusManager/login`,
    method: "post",
    data
  });
};
