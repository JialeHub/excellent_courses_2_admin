import {axiosG, axiosJ} from "@/api";

const getCode = "admin/login/getCode"; // 获取验证码(无该接口)
const login = "auth/login"; // 管理员登陆

export const getCodeApi = () => axiosG(getCode);
export const loginApi = data => axiosJ(login, data);
