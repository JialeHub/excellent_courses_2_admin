import {axiosF, axiosFs} from "@/api";

/**
 * @module 文件
 * */
export const uploadBazaarApi = data => axiosF('file/bazaar', data); //上传市场报告
export const uploadBazaarPlusApi = data => axiosFs('file/bazaar', data); //上传市场报告
export const uploadDownloadApi = data => axiosF('file/download', data); //下载市场报告

export const uploadFileApi = data => axiosF('file/upload', data);
export const uploadFilePlusApi = data => axiosFs('file/upload', data);
export const uploadFileMaxPlusApi = (data, callback, source) => axiosFs('file/upload', data, callback, source);
