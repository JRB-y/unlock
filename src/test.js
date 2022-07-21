import { Connection, clusterApiUrl, PublicKey, Transaction } from '@solana/web3.js';
import { createUpdateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
const { wallet, sendTransaction } = useWallet();

const connection = new Connection(clusterApiUrl(cluster), 'finalized');
const accounts = {
  metadata: nft.metadataAccount.publicKey,
  updateAuthority: wallet.publicKey,
}

const args = {
  updateMetadataAccountArgsV2: {
    data: {
      name: 'XX',
      symbol: 'XX',
      uri: 'xxx',
      sellerFeeBasisPoints: 10,
      creators: [
        { address: new PublicKey("Hs7dqix1uH3e34uPhxD2gGHP1qDU5kq9Jokbo42GYcx8"), shares: 0, verified: true },
        { address: new PublicKey("6gcCoH2utP8to4i7FpkYyfhiGFRQ98cernumtkNGXLsz"), shares: 100, verified: false },
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
    updateAuthority: new PublicKey(new_authority),
    primarySaleHappened: true,
    isMutable: true,
  }
}

const updateMetadataAccount = createUpdateMetadataAccountV2Instruction(
  accounts,
  args
);

const transaction = new Transaction();
transaction.add(updateMetadataAccount);
const trx = await sendTransaction(transaction, connection);
console.log(trx);