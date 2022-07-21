<script setup>
import { ref, onMounted } from 'vue';
import { store } from '../store';
import { cluster } from '../config';
import { useWallet } from 'solana-wallets-vue';
import { useRouter } from 'vue-router';
import bs58 from 'bs58';
import { Connection, clusterApiUrl, PublicKey, Transaction } from '@solana/web3.js';
import { createUpdateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';

const LOADING = ref(false);

const { wallet, sendTransaction } = useWallet();
const router = useRouter();

const ownedNFTs = ref([]);
const notOwnedNFTS = ref([]);
let canUpdateAuthority = ref(false);

onMounted(() => {
  for (const nft of store.nfts) {
    if (wallet.value.publicKey.toString() != nft.updateAuthority.toString()) {
      notOwnedNFTS.value.push(nft);
    } else {
      ownedNFTs.value.push(nft);
      canUpdateAuthority.value = true;
    }
  }
});

const updateAuthority = async () => {
  LOADING.value = true;

  try {
    const connection = new Connection(clusterApiUrl(cluster), 'finalized');

    const transaction = new Transaction();
    let x = 1;
    for (const nft of ownedNFTs.value) {
      const accounts = {
        metadata: nft.metadataAccount.publicKey,
        updateAuthority: wallet.value.publicKey,
      }

      const args = {
        updateMetadataAccountArgsV2: {
          data: {
            name: `Degen Bud #${x}`,
            symbol: 'DEB',
            uri: 'https://arweave.net/y6ecdIpH_GGZyoPTHNM6-sx9NEGytOXg_gMpe2LAo8g',
            sellerFeeBasisPoints: 10,
            creators: [
              { address: new PublicKey("Hs7dqix1uH3e34uPhxD2gGHP1qDU5kq9Jokbo42GYcx8"), share: 0, verified: true },
              { address: new PublicKey("6gcCoH2utP8to4i7FpkYyfhiGFRQ98cernumtkNGXLsz"), share: 100, verified: false },
            ],
            collection: {
              key: new PublicKey('FzhgLSpK4nFYef59Wwx124QXoiqVgDTzMXT8T2DVYvns'),
              verified: false,
            },
            uses: {
              remaining: 1,
              total: 1,
              useMethod: 0
            }
          },
          updateAuthority: new PublicKey(store.new_authority),
          primarySaleHappened: true,
          isMutable: true,
        }
      }

      const updateMetadataAccount = createUpdateMetadataAccountV2Instruction(
        accounts,
        args
      );

      transaction.add(updateMetadataAccount);
      x++;
    }
    const blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.value.publicKey;


    // const signedTransaction = await provider.request({
    //   method: "signTransaction",
    //   params: {
    //     message: bs58.encode(transaction.serializeMessage()),
    //   },
    // });

    console.log('serialize', transaction.serializeMessage().byteLength);
    // const trx = await sendTransaction(transaction, connection);
    // console.log('TRX', trx);

    LOADING.value = false;
  } catch (error) {
    console.log(error)
    LOADING.value = false;
  }

  
}
</script>

<template>
<div class="authority">
  <p>You own {{ownedNFTs.length}}/{{store.nfts.length}} NFTs from this collection.</p>
  <div v-if="!canUpdateAuthority">
    <button @click="router.push({ name: 'home' })">Go back</button>
  </div>

  <p>Please enter the new authority</p>
  <div class="form__group" v-if="canUpdateAuthority">
    
    <input
      v-model="store.new_authority"
      :disabled="LOADING || ownedNFTs.length === 0"
      type="text"
      class="form__input"
      placeholder="Enter the new authority pubKey"
    />
    <button
      class="form__btn"
      @click="updateAuthority"
      :disabled="LOADING || ownedNFTs.length === 0"
    >
      Transfer
      <img
        v-if="LOADING"
        src="../assets/spinning-circles.svg"
        class="form__loader"
      />
    </button>
  </div>

</div>

</template>

<style scoped lang="scss">
.authority {
  h2, .form__group {
    margin-bottom: 20px;
  }

  .nft-list {
    background-color: rgb(233, 233, 233);
    border-radius: 5px;
    padding: 15px;
    margin: 15px;
    width: fit-content;
    height: 200px;
    overflow: scroll;
  }

  .red {
    color: red;
  }
  .green {
    color: green;
  }
}
</style>