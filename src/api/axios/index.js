import axios from "axios";
import store from "@/store";
import router from "@/router";
import {timeout} from "@/settings";
import {errorMessage, successMsg, errorMsg, msgBox} from "@/utils/EUI";

let errorCode = null;
const service = axios.create({
  timeout: timeout,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});

//请求拦截
service.interceptors.request.use(
  config => {
    let token = store.getters.token;
    let url = config.url;
    if (isAddToken(url)) config.headers.Authorization = token;
    return config;
  },
  error => {
    errorMessage("请求错误！");
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const method = response.config.method;
    const {message, code} = response.data;
    if (message && code === 200 && method !== 'get') successMsg(message);
    if (message && code !== 200) errorMsg(message);
    return response.data;
  },
  error => {
    /* 请求超时！*/
    if (error.toString().includes("timeout")) {
      errorMessage("网络请求超时！");
      return Promise.reject(error);
    }
    /* 请求中断 */
    if (
      Object.prototype.hasOwnProperty.call(error, 'message') &&
      error.message === "Request Interruption"
    ) {
      return Promise.reject(error);
    }
    /* 网络错误 */
    if (
      Object.prototype.hasOwnProperty.call(error, 'statusText') &&
      error.response.statusText === "Internal Server Error"
    ) {
      errorMessage("网络错误，无法连接到服务器！");
      return Promise.reject(error);
    }
    const {code, message} = error.response.data;
    /* 403 */
    if (code === 403) {
      if (errorCode === code) return;
      errorCode = code;
      msgBox("登录状态已过期，您可以继续留在该页面，或者重新登录", "重新登录", "系统提示")
        .then(() => {
          router.push({name: 'login'})
        })
        .catch(() => (errorCode = null))
    } else {
      /* elseStatus */
      if (message) errorMsg(message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description 白名单，不添加token的接口
 * */
const isAddToken = url =>
  ["auth/login"].every(item => url !== item);

export default service;
