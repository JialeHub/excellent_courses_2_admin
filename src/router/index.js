import router from './routers';
import store from '@/store';
import NProgress from 'nprogress';
import {menu} from './menu';
import {layout} from './layout';
import {title, titleEn} from '@/settings';
import {TraverseTree} from './TraverseTree';
import {deepClone} from "@/utils/common";
import {startLoading, stopLoading} from '@/utils/EUI';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

// 动态路由
export function generateRouter() {
  return new Promise((resolve) => {
    startLoading();
    setTimeout(() => {
      let tree = new TraverseTree(menu, deepClone(layout))
      store.dispatch('setMenu', menu);
      store.dispatch('setSearchMenu', tree.getData());
      store.dispatch('setHasGenerateRouter');
      router.addRoutes([tree.getLayout()]);
      router.addRoutes([{path: "*", redirect: "/404"}]);
      stopLoading();
      resolve()
    }, 200)
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) { // 标题
    if (store.getters.setting.language === 'zh') {
      document.title = to.meta.title + ' - ' + title
    } else {
      document.title = to.name + ' - ' + titleEn
    }
  }
  let isLogin = store.getters.token;
  if (to.path === "/") {
    isLogin
      ? next('/home')
      : next('/login');
    return
  }
  if (to.path === "/login") {
    next();
    return;
  }
  if (!isLogin) {
    next('/login');
    return;
  }
  // if (
  //   process.env.NODE_ENV === 'production'
  //   && (to.path === "/system/menu" || to.path === "/system/role")
  // ) {
  //   next('/404');
  //   return
  // }
  if (store.getters.hasGenerateRouter) {
    next()
  } else {
    generateRouter();
    next()
  }
});

router.afterEach(() => {
  NProgress.done()
});

export default router
