const { entropyToMnemonic } = require("@ethersproject/hdnode");
const { ethers } = require("ethers");

function generateSeedPhrase() {
    // 16 bytes / 128 bits => 12 words
    // 32 bytes / 256 bits => 24 words
    const mnemonic = entropyToMnemonic(ethers.utils.randomBytes(32)) 
    console.log(`Generated seed phrase: ${mnemonic}`);

}

generateSeedPhrase();