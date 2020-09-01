import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @description 客观题
 * */

export const getChoiceApi = data => axiosG("choice", data); // 获取客观题
export const saveChoiceApi = data => axiosJ("choice", data); // 保存客观题
export const updateChoiceApi = data => axiosU("choice", data); // 修改客观题
export const delChoiceApi = data => axiosD("choice", data); // 删除客观题

/**
 * @description 主观题
 * */

export const getSubjectApi = data => axiosG("subject/ques", data); // 获取主观题
export const saveSubjectApi = data => axiosJ("subject/ques", data); // 保存主观题
export const updateSubjectApi = data => axiosU("subject/ques", data); // 修改主观题
export const delSubjectApi = data => axiosD("subject/ques", data); // 删除主观题


/**
 * @description 测试题
 * */

export const getTestingApi = data => axiosG("testing/admin", data); // 管理员获取测试题







