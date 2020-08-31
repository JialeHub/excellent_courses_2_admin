import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @description 卖家模块
 * */
export const getSellerApi = data => axiosG("seller", data); // 获取卖家详情
export const addSellerApi = data => axiosJ("seller", data); // 保存卖家详情
export const editSellerApi = data => axiosU("seller", data); // 修改卖家详情
export const delSellerApi = data => axiosD("seller", data); // 删除卖家详情
export const getSellersApi = data => axiosG("sellers", data); // 分页获取卖家类表
