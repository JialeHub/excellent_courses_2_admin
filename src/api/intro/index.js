import { axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 简介
 * */
export const getIntroApi = data => axiosG('intro', data); //获取简介信息
export const saveIntroApi = data => axiosJ('intro', data); //保存简介信息
export const uploadIntroApi = data => axiosU('intro', data); //修改简介信息
