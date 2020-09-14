import  Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Home.vue'

Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        name:'Home',
        component:Login
    },
    {
        path:'/home',
        name:'Home',
        component:Login
    },
    {
        children: [
            {
                path: '/',
                name: 'Index',
                component:() => import('../views/Index.vue'),
            },
            {
                path: '/deptMange',
                name: 'Dept',
                component:() => import('../views/DeptManage.vue'),
            }

        ]
    }
]

const router = new VueRouter({
    mode:'hostory',
    base:process.env.BASE_URL,
    routes
})
export default router
