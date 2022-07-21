import App from './App.vue';
import { createApp } from 'vue';
import './assets/styles/app.scss';
import { SolanaWallets, walletOptions } from './wallet';

// Routes
import Home from './pages/Home.vue';
import Authority from './pages/Authority.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/authority', component: Authority, name: 'authority' },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(SolanaWallets, walletOptions)
  .mount('#app');
