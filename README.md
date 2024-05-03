
# Token creation and distribution

1. Solidity Smart Contract for ERC20 Token.
2. Script to Generate 10,000 EVM Addresses from a Seed Phrase.
3. Script to Send a random Number of Tokens between 1 to 999 to all 10,000 EVM Addresses. 


## Testing

To deploy the Smart Contract and Test the Script.

```bash
git clone https://github.com/1111-1993/Koin-Token.git
```

First,
Deploy the Smart Contract `Koin.sol` on Remix IDE on Sepolia Testnet. Then

### Test Script
1. Script to Generate 10,000 EVM Addresses from a Seed Phrase, run 

```bash
  npm install
```
Note: Check `ethers` version. It sould be letest(version @6.12.1) for `./addresses.js`, make sure `npm list ethers`  

After running `node addresses.js`file `EVM_addresses.json` will be created.

2. Script to Send a Random Number of Tokens Between 1 to 999 to All
10,000 EVM Addresses.

After Deploying smart contract we have following Details:
For Example:

`RPC URL (Alchemy)`
```bash
https://eth-sepolia.g.alchemy.com/v2/API_KEY
```
`Sender wallet's private key`
```bash
8bdf72fefb57232b6a3624a395fe45a9f246baf877be4a2a0446850176d8fa5e
```
`Token contract address`
```bash
0xD428400908042f2ef721C14150F645B76ffaac1a
```

Make sure `ethers` version downgrade to `@5.7.2`

```bash
npm install ethers@5.7.2
```
Now run the `node distributes_tokens.js`
