<script setup>
// import Header from './components/Header.vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Header />
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
  .wrapper {
    width: 90%;
    margin: auto;
  }
</style>