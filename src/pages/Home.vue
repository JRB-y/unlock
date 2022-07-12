<script setup>
const pubKey = null;

</script>

<template>
  <div class="content">
    <div class="banner">
      <h1>NFT Ownership Transfer, Simplified</h1>
      <p>We support founders in transferring ownership of their NFT colelctions to new owners on the Solana mainnet.</p>
      <div class="form">
        <input class="form__input" type="text" placeholder="Enter first Verified Creator / CM PubKey" v-model="pubKey" />
        <button class="form__btn">Fetch mints</button>
        <div class="form__radio">
          <div>
            <input type="radio" id="candy_machine_input" name="input-type" checked>
            <label for="candy_machine_input">Candy Machine ID</label>
          </div>
          <div>
            <input type="radio" id="first_creator_input" name="input-type" >
            <label for="first_creator_input">First Creator ID</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  width: 50%;
  float: right;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 51px;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
    font-size: 20px;
  }

  .form {
    width: 100%;

    input {
      border: none;
      font-size: 14px;
      background: #e5e5e5;
      width: 70%;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      padding: 15px 30px 15px 30px;
    }

    button {
      border: none;
      font-size: 14px;
      background: black;
      color: white;
      padding: 15px 30px 15px 15px;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
    }

    &__radio {
      margin-top: 10px;
      display: flex;
      gap: 20px;
      div {
        display: flex;
        align-items: baseline;
        input {
          width: 18px;
        }
      }
    }
  }
}
</style>