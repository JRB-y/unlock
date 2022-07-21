<script setup>
import { WalletMultiButton } from 'solana-wallets-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => router.push({ name: 'home' })

</script>

<template>
  <header>
    <div class="logo" @click="goHome">
      <img alt="Unlock logo" src="../assets/logo.png" /> 
    </div>
    <div class="auth-btn">
      <WalletMultiButton />
    </div>
  </header>
</template>

<style lang="scss">
  header {
    width: 100%;
    background: black;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .logo {
      width: 180px;
      display: flex;
      align-items: center;
    }
  }
  // Wallet button
  .swv-button {
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 8px 25px;
    border-radius: 3px;
    font-size: 16px;
    display: flex;
    gap: 20px;
    align-items: center;

    &:hover{
      cursor: pointer;
      background: white;
      color: black;
    }
  }
  .logo {
    cursor: pointer;
  }
</style>
