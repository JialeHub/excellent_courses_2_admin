import {axiosD, axiosG} from "@/api";

/**
 * @description 表单
 * */
export const getFormApi = data => axiosG('applyTable', data); // 分页获取表单列表表单
export const disposeFormApi = data => axiosD('applyTable', {...data, ...{dispose: true}}); // 处理表单
export const delFormApi = data => axiosD('applyTable', {...data, ...{delete: true}}); // 删除表单
