import {axiosD, axiosG, axiosJ, axiosK, axiosP, axiosU} from "@/api";

/**
 * @description 资源模块
 * */

export const getResourceApi = data => axiosG("resource", data); // 分页搜索资源信息
export const getResourceDownloadOneApi = data => axiosG("resource/download/one", data); // 单资源下载
export const getResourceDownloadsApi = data => axiosG("resource/downloads", data); // 多资源下载
export const updateResourceApi = data => axiosP("resource", data); // 修改资源信息
export const delResourceApi = data => axiosD("resource", data); // 删除资源信息
export const uploadResourceApi = data => axiosK("resource/upload", data); // 资源上传





