import {axiosD, axiosG, axiosJ, axiosU} from "@/api";

/**
 * @description 房产大数据
 * */
export const getBigDataApi = data => axiosG("bigData", data); // 获取房产大数据
export const addBigDataApi = data => axiosJ("bigData", data); // 添加房产大数据
export const editBigDataApi = data => axiosU("bigData", data); // 修改房产大数据
export const delBigDataApi = data => axiosD("bigData", data); // 删除房产大数据
