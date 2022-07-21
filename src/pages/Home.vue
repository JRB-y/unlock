<script setup>
import { ref } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import { cluster, KEY_TYPES } from '../config';

import { useWallet } from 'solana-wallets-vue';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

const router = useRouter();
const LOADING = ref(false);

const fetchMintHandler = async () => {
  LOADING.value = true;
  const { connected, wallet } = useWallet();

  if (!connected.value) throw new Error('Please connect with your solana wallet.');
  if (!store.key) throw new Error('Please enter the key');
  if (!KEY_TYPES.includes(store.key_type)) throw new Error('Invalid key_type');

  try {
    // init wallet, solanaConnection and metaplex
    wallet.value._wallet.connect();
    const connection = new Connection(clusterApiUrl(cluster));
    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet.value._wallet))

    // TODO#1 check if the user is the CM owner
    let nfts;
    switch (store.key_type) {
      case KEY_TYPES[0]:
        nfts = await metaplex.nfts().findAllByCandyMachine(new PublicKey(store.key))
        break;
      case KEY_TYPES[1]: 
        nfts = await metaplex.nfts().findAllByCreator(new PublicKey(store.key))
        break;
    }
    if (!nfts.length) throw new Error('No items found');

    store.nfts = nfts;
    router.push({ name: 'authority' })
    LOADING.value = false;
  } catch (error) {
    console.error(error);
    LOADING.value = false;
    return null;
  }
}
</script>

<template>
  <div class="content">
    <div class="banner">
      <h1>NFT Ownership Transfer, Simplified</h1>
      <p>We support founders in transferring ownership of their NFT collections to new owners on the Solana mainnet.</p>
      <div class="form">

        <div class="form__group">
          <input class="form__input" type="text" placeholder="Enter first Verified Creator / CM PubKey" v-model="store.key" :disabled="LOADING"/>
          <button class="form__btn" @click="fetchMintHandler" :disabled="LOADING">
            Fetch mints
            <img
              v-if="LOADING"
              src="../assets/spinning-circles.svg"
              class="form__loader"
            />
          </button>
        </div>
        <div class="form__radio">
          <div>
            <input type="radio" id="candy_machine_input" checked v-model="store.key_type" value="candy_machine" :disabled="LOADING">
            <label for="candy_machine_input">Candy Machine ID</label>
          </div>
          <div>
            <input type="radio" id="first_creator_input" v-model="store.key_type" value="first_creator" :disabled="LOADING">
            <label for="first_creator_input">First Creator ID</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  .form {
    width: 100%;
    margin-top: 30px;

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

    &__loader {
      filter: invert(1);
    }
  }
}
</style>