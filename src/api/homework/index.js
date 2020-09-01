import {axiosD, axiosG, axiosJ, axiosK, axiosU} from "@/api";

/**
 * @module 作业
 * */
export const getHomeworkApi = data => axiosG('homework', data); //学生/管理员分页获取作业列表
export const saveHomeworkApi = data => axiosJ('homework', data); //保存作业
export const updateHomeworkApi = data => axiosU('homework', data); //修改作业
export const delHomeworkApi = data => axiosD('homework', data); //删除作业

/**
 * @module 作业提交情况
 * */
export const getHomeworkInfoApi = data => axiosG('info/homework', data); //管理员获取某位学生的作业完成情况

