import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 视频管理
 * */
export const getVideoApi = data => axiosG('video', data); // 获取视频详情
export const addVideoApi = data => axiosJ('video', data); // 添加视频
export const editVideoApi = data => axiosU('video', data); // 修改问题
export const delVideoApi = data => axiosD('video', data); // 删除视频
export const getVideosApi = data => axiosG('videos', data); // 获取视频列表
