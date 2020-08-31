import {axiosD, axiosG, axiosJ} from "@/api";

/**
 * @module 图片管理
 * */
export const getPictureApi = data => axiosG("picture", data); // 获取所有XX类型图片
export const addPictureApi = data => axiosJ("picture", data); // 添加XX类型图片
export const delPictureApi = data => axiosD("picture", data); // 删除图片
