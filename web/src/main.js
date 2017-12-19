import Vue from 'vue';
import App from './pages/app.vue';
import router from './router.js';
import plugin from './components';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './pages/app.less';
import store from './store';

Vue.use(ElementUI);
Vue.use(plugin);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});