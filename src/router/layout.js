module.exports = {
  layout: {
    name: 'layout',
    path: '/layout',
    redirect: "/home",
    component: () => import('@/layout'),
    children: [
      {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: () => import('@/views/home')
      },
      {
        name: 'person',
        path: '/person',
        meta: {title: '个人中心'},
        component: () => import('@/views/person')
      },
      {
        name: 'error403',
        path: '/403',
        meta: {title: '403'},
        component: () => import('@/views/error/error403')
      },
      {
        name: 'redirect',
        path: '/redirect',
        meta: {title: ""},
        component: () => import('@/views/redirect')
      }
    ]
  }
}
