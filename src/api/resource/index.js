import {axiosD, axiosG, axiosJ, axiosK, axiosP, axiosU} from "@/api";

/**
 * @description 资源模块
 * */

export const getResourceSectionApi = data => axiosG("resource/section", data); // 获取某类型资源的章节数
export const getResourceApi = data => axiosG("resource", data); // 分页搜索资源信息
export const updateResourceApi = data => axiosP("resource", data); // 修改资源信息
export const delResourceApi = data => axiosD("resource", data); // 删除资源信息
export const uploadResourceApi = data => axiosK("resource/upload", data); // 资源上传


