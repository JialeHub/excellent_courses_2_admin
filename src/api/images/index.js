import {axiosD, axiosG, axiosJ, axiosP} from "@/api";

/**
 * @module 图片
 * */
export const getImagesApi = data => axiosG('images', data); //获取图片列表
export const saveImagesApi = data => axiosJ('images', data); //保存图片
export const uploadImagesApi = data => axiosP('images', data); //修改图片
export const delImagesApi = data => axiosD('images', data); //删除图片

export const getImagesBoardApi = data => axiosG('images/board', data); //获取某板块图片
