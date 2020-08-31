import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 标签管理(热门房产 视频看房 商业地产)
 * */
export const getLabelApi = data => axiosG('houseTag', data); // 获取房产类型组
export const addLabelApi = data => axiosJ('houseTag', data); // 添加房产标签
export const editLabelApi = data => axiosU('houseTag', data); // 修改房产标签
export const delLabelApi = data => axiosD('houseTag', data); // 删除房产标签

/**
 * @module 标签管理(咨询 投资指南)
 * */
export const getTagApi = data => axiosG('news/tag', data); // 获取资讯/投资标签
export const addTagApi = data => axiosJ('news/tag', data); // 添加获取资讯/投资标签
export const editTagApi = data => axiosU('news/tag', data); // 修改获取资讯/投资标签名
export const delTagApi = data => axiosD('news/tag', data); // 删除获取资讯/投资标签
