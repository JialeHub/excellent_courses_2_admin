import {axiosD, axiosG, axiosJ} from "@/api";

/**
 * @module 专家评价
 * */
export const getExpertRemarkApi = data => axiosG('expertRemark', data); //专家评价列表
export const saveExpertRemarkApi = data => axiosJ('expertRemark', data); //保存专家评价
export const delExpertRemarkApi = data => axiosD('expertRemark', data); //删除专家评价
