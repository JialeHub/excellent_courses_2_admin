import {axiosD, axiosG, axiosJ, axiosK} from "@/api";

/**
 * @module 课程评价模块
 * */

export const getEvaluateApi = data => axiosG('evaluate', data); //分页获取评价列表
export const saveEvaluateApi = data => axiosJ('evaluate', data); //学生保存评价
export const delEvaluateApi = data => axiosD('evaluate', data); //学生保存评价

export const getPraiseByEvalApi = data => axiosG('praiseByEval', data); //分页获取某条评价的赞列表
export const savePraiseByEvalApi = data => axiosK('praiseByEval', data); //学生点赞评价
export const delPraiseByEvalApi = data => axiosD('praiseByEval', data); //管理员删除点赞

export const getWriteBackApi = data => axiosG('writeBack', data); //分页获取某条评价的回复列表
export const saveWriteBackApi = data => axiosK('writeBack', data); //学生回复评价
export const delWriteBackApi = data => axiosD('writeBack', data); //管理员删除回复

export const getPraiseByWBApi = data => axiosG('praiseByWB', data); //分页获取某条回复的赞列表
export const savePraiseByWBApi = data => axiosK('praiseByWB', data); //学生点赞回复
