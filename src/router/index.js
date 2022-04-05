import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'
import Menu from '../views/Menu.vue'
import GWC from '../views/GWC.vue'
import BrandShow from '../views/BrandShow.vue' //品牌列表
import BrandAdd from '../views/BrandAdd.vue'   //新建品牌
import ClassifyShow from '../views/ClassifyShow.vue'   //新建品牌
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/Order',
        name: 'Order',
        component: Order
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: Menu,
        children:[
            {
                 //品牌显示
                 path: '/BrandShow',
                 name: 'BrandShow',
                 component: BrandShow
            },
            {
                //新建品牌
                path: '/BrandAdd',
                name: 'BrandAdd',
                component: BrandAdd
           },
           {
            //添加分类
            path: '/ClassifyShow',
            name: 'ClassifyShow',
            component: ClassifyShow
       }
        ]
    },
    {
        path: '/GWC',
        name: 'GWC',
        component: GWC
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//路由导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path == '/login') {
//         next();
//     } else {
//         let token = window.sessionStorage["token"];
//         //如果token为空就跳转到Login界面
//         if (token == null || token == '') {
//             next('/login');
//             alert("请先登录");
//         } else {
//             next();
//         }
//     }
// })

export default router
