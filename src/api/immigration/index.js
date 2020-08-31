import {axiosD, axiosG, axiosJ, axiosP, axiosU} from "@/api";

/**
 * @module 移民类型
 * */
export const getImmigrantTypeApi = data => axiosG('immigrant/type/all', data); // 分页获取移民类型列表
export const addImmigrantTypeApi = data => axiosJ('immigrant/type', data); // 添加移民类型
export const editImmigrantTypeApi = data => axiosU('immigrant/type', data); // 修改移民类型
export const delImmigrantTypeApi = data => axiosD('immigrant/type', data); // 删除移民类型

/**
 * @module 移民详情
 * */
export const getImmigrantApi = data => axiosG('immigrant', data); // 获取移民项目详情
export const addImmigrantApi = data => axiosJ('immigrant', data); // 添加移民详情
export const editImmigrantApi = data => axiosU('immigrant', data); // 修改移民详情
export const delImmigrantApi = data => axiosD('immigrant', data); // 删除移民详情
export const editImmigrantStateApi = data => axiosP('immigrant/state', data); // 列表中修改移民详情状态
export const getImmigrantsApi = data => axiosG('immigrants', data); // 分页获取移民列表
