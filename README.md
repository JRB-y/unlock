## REFERENCES
GET candy machine from an NFT.
https://stackoverflow.com/questions/72484886/how-to-get-the-candy-machine-id-using-a-nft-created-by-the-candy-machine


# What we build?
A UI for transfering ownership of an NFT Collection.
The owner needs to login with his Phantom Wallet, entre the First Creator or a his Candy Machine ID.
and in one press He can pass the ownership of his full collection.

# Authentication
Simple wallet based authentication using Phantom Wallet.
We can use multiple adapters in future versions.

# Inputs
  The use has 2 inputs:
  1. Text field for the first creator or candy machine id.
  2. A checkbox for the creators array (**in this part need a little of your help how you see the project**)
      1. Don't overide creators array (default value)
      2. Replace all creators with new owner.
      3. Remove the old owner if exists.
      4. Replace the old owner (if exists) with new owner.

# Retrieve collection
   1. Input: Candy Machine ID
   We use the [findallbycandymachine](https://github.com/metaplex-foundation/js#findallbycandymachine) from metaplex sdk to get the full list of NFT Objects.
   ref: 

   1. Input: First Creator ID
   We use the [findallbycreator](https://github.com/metaplex-foundation/js#findallbycreator) from metaplex sdk to get the full list of NFT Objects.

# Update NFTs newAuthority
  1. Some collections have more than 10k NFTs so we need to run this in a worker with queue management.
  using the metaplex [update](https://github.com/metaplex-foundation/js#update) function.
  2. The update of the creotors will match the input of the user.


# Find Candy Machine (if first creator used)
  1. INPUT: CANDY MACHINE ID
  If a CM ID is provided this step will be ignored and we jump strict to UPDATE CANDY MACHINE AUTHORITY

  1. If a First Creator ID is provided
  If we use first creator id we need to get his all ProgramAccounts using [getProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts).
  This feature is disabled on major free RPCs. We need to pay an RPC.

  But there is another way :)
  The first transaction of any NFT has a list of accounts and the 5th account is the Candy Machine.
  So we can get the first signature [getSignaturesForAddress](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getSignaturesForAddress) of any nft,
  fetch the transaction [getTransaction](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getTransaction) and get the 5th account.

# Update Candy Machine authority
  This part is not documented in the metaplex sdk. There is a tool called metaboss, but it's a cli tool no web sdk provided.
  When reading the metaplex code source I found a [CandyMachine Module](https://github.com/metaplex-foundation/js/tree/main/src/plugins/candyMachineModule)
  We can find and [UpdateCandyMachine](https://github.com/metaplex-foundation/js/blob/main/src/plugins/candyMachineModule/updateCandyMachine.ts) it accepts a newAuthority.

  ```js
  export type UpdateCandyMachineInputWithoutConfigs = {
    // Models and accounts.
    candyMachine: CandyMachine;
    authority?: Signer;
    newAuthority?: PublicKey;

    // Transaction Options.
    confirmOptions?: ConfirmOptions;
  };
  ```
  I can Tweak the functions to make it working.

# Send message Success or Error
  1. Send a success message if all is OK.
  2. Send an error message if error occured.
  3. if success attach the trx id.