import {axiosG, axiosJ} from "@/api";

const editAvatar = ""; // 修改头像（无该接口）
const getUser = "admin/login/getUserInfo"; // 获取用户信息（无该接口）
const updatePass = "auth/reset"; // 修改密码

export const getUserInfoApi = () => axiosG(getUser);
export const updatePassApi = data => axiosJ(updatePass, data);
export const editAvatarApi = data => axiosJ(editAvatar, data);
