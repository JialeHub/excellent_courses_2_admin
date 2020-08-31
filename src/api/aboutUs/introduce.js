import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @description 世帆介绍
 * */
export const getCompanyApi = data => axiosG("company", data); // 获取世帆介绍文字信息
export const editCompanyApi = data => axiosU("company", data); // 修改世帆介绍文字信息
export const addMemberApi = data => axiosJ("member", data); // 添加成员
export const editMemberApi = data => axiosU("member", data); // 修改成员
export const delMemberApi = data => axiosD("member", data); // 删除成员
export const getMemberApi = data => axiosG("members", data); // 获取成员列表
