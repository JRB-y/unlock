import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
// import { useWallet, initWallet } from "solana-wallets-vue";

const { wallet } = useWallet();
console.log('wallet: ', wallet);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
// .use(keypairIdentity(wallet))
//   .use(bundlrStorage())

console.log('connection: ', connection)
console.log('metaplex: ', metaplex)

// const KEY_TYPES = {
//   'candy_machine': _getByCandyMachine,
//   'first_creator': _getByFirstCreator,
// }
const fetchMints = (key, key_type) => {
  console.log(key, key_type)
  if (!Object.keys().includes(key_type)) {
    return { error: true, reason:`unexpected type of key: ${key_type}` };
  }

  // await KEY_TYPES[key_type](key);
}

// const _getByCandyMachine = async (key) => {
//   const nfts = await metaplex.nfts().findAllByCandyMachine(new PublicKey(key))
//   console.log('NFT', nfts);
// }

// const _getByFirstCreator = (key) => {

// }

export {
  fetchMints
}