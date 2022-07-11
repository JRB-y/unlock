<script setup>

</script>

<template>
  <header>
    <div class="logo">
      <img alt="Unlock logo" src="../assets/logo.png" /> 
    </div>
    <div class="auth-btn">
      <button>Connect Wallet</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
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

    .auth-btn {
      button {
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 8px 25px;
        border-radius: 3px;
        font-size: 16px;

        &:hover{
          cursor: pointer;
          background: white;
          color: black;
        }
      }
    }
  }
</style>
