import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 文章管理(咨询 投资指南)
 * */
export const getNewsApi = data => axiosG('news', data); // 获取资讯/投资列表
export const addNewsApi = data => axiosJ('news', data); // 添加资讯/投资
export const editNewsApi = data => axiosU('news', data); // 修改资讯
export const delNewsApi = data => axiosD('news', data); // 删除资讯/投资
export const getNewsDetailApi = data => axiosG('news/detail', data); // 获取资讯/投资

/**
 * @module 文章管理(物业/贷款/购房//售房)
 * @description 物业管理 --- 物业 0
 * @description 贷款流程 --- 贷款 1
 * @description 购房流程 --- 购房 2
 * @description 卖房流程 --- 售房 3
 * */
export const getMsgApi = data => axiosG('message', data); // 获取XX类型富文本信息
export const editMsgApi = data => axiosU('message', data); // 修改XX类型富文本信息
