<script setup>
import { ref } from 'vue';
import { store } from '../store';
import { cluster } from '../config';
import { useRouter } from 'vue-router';

import { useWallet } from 'solana-wallets-vue';
import { Metaplex, keypairIdentity, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const router = useRouter();
const KEY_TYPES = ['candy_machine', 'first_creator'];
const LOADING = ref(false);

const fetchMintHandler = async () => {
  LOADING.value = true;
  const { connected, wallet } = useWallet();

  if (!connected.value) throw new Error('Please connect with your solana wallet.');
  if (!store.key) throw new Error('Please enter the key');
  console.log('store.key_type ', store.key_type);
  if (!KEY_TYPES.includes(store.key_type)) throw new Error('Invalid key_type');

  try {
    // init wallet, solanaConnection and metaplex
    wallet.value._wallet.connect();
    const connection = new Connection(clusterApiUrl(cluster));
    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet.value._wallet))

    // TODO: check if he is the CM owner
    let nfts;
    switch (store.key_type) {
      case 'candy_machine':
        nfts = await metaplex.nfts().findAllByCandyMachine(new PublicKey(store.key))
        break;
      case 'first_creator':
        nfts = await metaplex.nfts().findAllByCreator(new PublicKey(store.key))
        break;
    
      default:
        break;
    }

    if (!nfts.length) throw new Error('No items found');

    // fetch the collection
    const response = await fetch(nfts[0].uri)
    const data = await response.json();


    store.nfts = nfts;
    // store.collection = data.collection.name;
    // store.collection.key = nfts[0].collection.key.toString();

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