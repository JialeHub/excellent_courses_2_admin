import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @description 表单
 * */
export const getFooterApi = data => axiosG('bottom', data); // 获取底部栏信息
export const editFooterApi = data => axiosU('bottom', data); // 修改底部栏基本信息
export const delFooterApi = data => axiosD('bottom', data); // 删除站内/站外跳转
export const addFooterInnerApi = data => axiosJ('bottom/inner', data); // 添加站内跳转
export const editFooterInnerApi = data => axiosU('bottom/inner', data); // 修改站内跳转
export const addFooterOuterApi = data => axiosJ('bottom/outer', data); // 添加站外跳转
export const editFooterOuterApi = data => axiosU('bottom/outer', data); // 修改站外跳转
