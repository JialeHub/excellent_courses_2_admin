import {axiosD, axiosG, axiosJ, axiosU} from "@/api";
// import {citys} from "@/utils/global_city";


/**
 * @module 城市管理
 * */
export const getCityApi = data => axiosG('city', data); // 获取城市列表
export const addCityApi = data => axiosJ('city', data); // 添加城市
export const editCityApi = data => axiosU('city', data); // 编辑城市
export const delCityApi = data => axiosD('city', data); // 删除城市
export const getCityDetailApi = data => axiosG('city/detail', data); // 获取城市详情

/*
/!**
 * @author 王业鹏
 * @param {String} param 搜索参数
 * @param {Number} length 返回数量
 * @description 搜索城市
 * *!/
export const searchCityApi = (param, length = 20) => {
  console.log(param)
  return new Promise(resolve => {
    let arr = [];
    param = param.toLowerCase();
    for (let i = 0; i < 3770; i++) {
      if (
        citys[i]['C'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['S'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['G'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['c'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['s'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['g'].toLowerCase().indexOf(param) >= 0
      ) {
        citys[i].id = i;
        arr.push(citys[i]);
      }
      if (arr.length === length) break;
    }

    arr.forEach(item => {
      if (!item.S) {
        item.S = item.C;
        item.s = item.c;
        item.C = '';
        item.c = '';
      }
    })

    let first = [];
    let second = [];
    let one = [];
    let two = [];

    arr.forEach(item => {
      if (first.indexOf(item.G) < 0) {
        first.push(item.G)
        one.push({name: item.G, nameEn: item.g});
      }
      if (second.indexOf(item.S) < 0) {
        second.push(item.S)
        two.push({name: item.S, nameEn: item.s, G: item.G});
      }
    })

    // 三级插入二级
    two.forEach(item => {
      item.children = [];
      arr.forEach(obj => {
        if (obj.C && obj.S === item.name) {
          item.children.push({name: obj.C, nameEn: obj.c})
        }
      })
      if (item.children.length === 0) delete item.children
    })

    // 二级插入一级
    one.forEach(item => {
      item.children = [];
      two.forEach(obj => {
        if (obj.G === item.name) {
          delete obj.G
          item.children.push(obj)
        }
      })
      if (item.children.length === 0) delete item.children
    })

    resolve(one);
  })
};
*/


/*
/!**
 * @author 王业鹏
 * @param {String} param 搜索参数
 * @param {Number} length 返回数量
 * @description 搜索城市
 **!/
export const searchCityApi = (param, length = 20) => {
  return new Promise(resolve => {
    let arr = [];
    param = param.toLowerCase();
    for (let i = 0; i < 3770; i++) {
      if (
        citys[i]['C'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['S'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['G'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['c'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['s'].toLowerCase().indexOf(param) >= 0 ||
        citys[i]['g'].toLowerCase().indexOf(param) >= 0
      ) {
        citys[i].id = i;
        arr.push(citys[i]);
      }
      if (arr.length === length) break;
    }
    resolve(arr);
  })
};
*/
