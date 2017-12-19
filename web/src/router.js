import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Home/Login';
import Register from './pages/Home/Register';
import Main from './pages/Home/Main';
import User from './pages/User';
import DashBoard from './pages/User/DashBoard';
import History from './pages/User/History';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '',
            name: 'Main',
            component: Main
        },{
            path: 'login',
            name: 'Login',
            component: Login
        }, {
            path: 'register',
            name: 'Register',
            component: Register
        },]
    },{
        path: '/user',
        name: 'User',
        component: User,
        children: [{
            path: '',
            name: 'DashBoard',
            component: DashBoard,
            alias: 'dashboard'
        },{
            path: 'start',
            name: 'History',
            component: History,
            alias: 'dashboard'
        },]
    }]
});

Vue.use(VueRouter);
store.dispatch("whoami");

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        let user = store.getters.user();
        if (user) {
            if (to.meta.requireAdmin && user.role != "admin") {
                // next();
            } else {
                next();
            }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;