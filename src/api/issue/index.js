import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @module 问题管理
 * */
export const getQuestionsApi = data => axiosG('questions', data); // 分页获取问题列表
export const addQuestionsApi = data => axiosJ('questions', data); // 保存问题
export const editQuestionsApi = data => axiosU('questions', data); // 修改问题
export const delQuestionsApi = data => axiosD('questions', data); // 删除问题
export const getQuestionApi = data => axiosG('questions/detail', data); // 获取问题详情

/**
 * @module 问题分类
 * */
export const getQuestionTagApi = data => axiosG('questionTag', data); // 获取某页面的问题栏目
export const addQuestionTagApi = data => axiosJ('questionTag', data); // 保存问题栏目
export const editQuestionTagApi = data => axiosU('questionTag', data); // 编辑问题栏目
export const delQuestionTagApi = data => axiosD('questionTag', data); // 删除问题栏目
