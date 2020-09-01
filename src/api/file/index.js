import {axiosF, axiosFs} from "@/api";

/**
 * @module 文件
 * */
export const uploadFileApi = data => axiosF('file/upload', data);
export const uploadFilePlusApi = data => axiosFs('file/upload', data);
export const uploadFileMaxPlusApi = (data, callback, source) => axiosFs('file/upload', data, callback, source);
