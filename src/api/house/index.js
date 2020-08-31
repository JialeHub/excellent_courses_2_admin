import {axiosD, axiosG, axiosJ, axiosP, axiosU} from "@/api";

/**
 * @description 房源
 * */
export const getHouseDetailApi = data => axiosG("house", data); // 获取房产详情
export const addHouseApi = data => axiosJ("house", data); // 保存房产
export const editHouseApi = data => axiosU("house", data); // 修改房产
export const delHouseApi = data => axiosD("house", data); // 删除房产
export const getHouseApi = data => axiosG("house/list", data); // 获取所有房源列表
export const updateHouseApi = data => axiosP("house/type", data); // 修改列表房产所属类型
