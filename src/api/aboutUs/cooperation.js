import {axiosD, axiosG, axiosJ, axiosP, axiosU} from "@/api";

/**
 * @description 合作成员
 * */

export const getPartnerTextApi = data => axiosG("partnerText", data); // 获取合作洽谈富文本
export const editPartnerTextApi = data => axiosP("partnerText", data); //修改合作洽谈富文本

export const getPartnerApi = data => axiosG("partner", data); // 获取所有合作伙伴
export const addPartnerApi = data => axiosJ("partner", data); // 添加合作伙伴
export const editPartnerApi = data => axiosU("partner", data); // 修改合作伙伴信息
export const delPartnerApi = data => axiosD("partner", data); // 删除合作伙伴信息
