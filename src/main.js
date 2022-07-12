import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/app.scss';

// Routes
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
const routes = [
  { path: '/', component: Home },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// wallet
import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
}

const app = createApp(App)
app.use(router)
app.use(SolanaWallets, walletOptions)
app.mount('#app')
