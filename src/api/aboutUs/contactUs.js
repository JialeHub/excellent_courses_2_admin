import {axiosG, axiosU} from "@/api";

/**
 * @description 联系我们
 * */
export const getContactApi = data => axiosG("contact", data); // 获取联系我们
export const editContactApi = data => axiosU("contact", data); // 修改联系我们
