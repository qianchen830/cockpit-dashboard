import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'industryProperty',
        component: () => import('../views/largeSizeScreen/industryProperty.vue'),
        meta: {
            title: '资产驾驶舱'
        }
    },
    {
        path: '/HomeView',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: '资产地图'
        }
    },
    {
        path: '/home3',
        name: 'home3',
        component: () => import('../views/HomeView3')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },

]

const router = new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
