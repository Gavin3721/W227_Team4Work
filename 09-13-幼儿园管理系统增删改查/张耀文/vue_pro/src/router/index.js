import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
        children: [
            {
                path: "/",
                name: "Index",
                component: () => import("../views/Index.vue")
            },
            {
                path: "/deptManage",
                name: "DeptManage",
                component: () => import("../views/DeptManage.vue")
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;