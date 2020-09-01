import {axiosG, axiosJ, axiosP, axiosU} from "@/api";

/**
 * @description 学生管理
 * */

export const getUserApi = data => axiosG("student", data); // 分页搜索学生列表
export const updateUserApi = data => axiosP("student", data); // 禁用/启用学生
export const addUserApi = data => axiosJ("student", data); //新增学生
export const editUserApi = data => axiosU("student/info", data); //修改学生信息

/**
 * @description 学习记录
 * */

export const getUserHistoryApi = data => axiosG("video/history/admin", data); // 分页搜索学生学习记录
export const getUserFulfillApi = data => axiosG("video/fulfill/admin", data); // 管理员获取学生已看列表
export const getUserUndoneApi = data => axiosG("video/undone/admin", data); // 管理员获取学生未看列表

