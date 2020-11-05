import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 教学团队
 * */
export const getTeamApi = data => axiosG('student/get', data); //获得详情
export const getTeamPageApi = data => axiosG('student/page', data); //分页查询
export const saveTeamApi = data => axiosJ('student/add', data); //新增教学团队
export const uploadTeamApi = data => axiosU('student/edit', data); //修改简介信息
export const delTeamApi = data => axiosD('student/del', data); //删除教学团队


