/**
 * Created by Administrator on 2020/9/13 0013.
 */
/*import Vue from "vue";
import VueRouter from "vue.router";

import fenye from "../components/fenye.vue"

Vue.use(VueRouter)

const routers=[
    {
        path: "/home",
        component:fenye
    }
]
const router=new VueRouter({
    routers
})
export default router
    */
import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/about",
                name: "About",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                import(/* webpackChunkName: "about" */ "../views/About.vue")
            },
            {
                path: "/",
                    name: "Shouye",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                import(/* webpackChunkName: "about" */ "../views/shouye.vue"),
                    children: [
                    {
                        path: "/cidan1",
                        name: "cidan1",
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                        import(/* webpackChunkName: "about" */ "../views/cidan1.vue")
                    }
                   ]
            },
            {
                path: "/shouye",
                    name: "Shouye",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
            import(/* webpackChunkName: "about" */ "../views/shouye.vue")
            }

        ]
    },
    {
        path: "/",
        name: "Login",
        component: login
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
export default router;