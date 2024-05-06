const fs = require('fs');
const { ethers } = require("ethers");

function generateAddresses() {
    const seedPhrase = "pumpkin future casual pledge mother stand frost ship figure puppy garden busy bright cousin minor guitar maze what brisk proof enrich next arrest ski"; // Replace with your seed phrase
    
    const wallet = ethers.HDNodeWallet.fromPhrase(seedPhrase);
    console.log('Base Wallet Address:', wallet.address);

    const mnemonic = wallet.mnemonic;

    const numOfAddresses = 10000;
    const derivationPathBase = "m/44'/60'/0'/0/";
    
    const addresses = new Array(numOfAddresses);  // Preallocate the array

    // Open a write stream to write addresses to a file incrementally
    const writeStream = fs.createWriteStream('EVM_addresses.json');
    
    // Start the JSON file with an array opening
    writeStream.write('[\n');

    for (let i = 0; i < numOfAddresses; i++) {
        const derivationPath = `${derivationPathBase}${i}`;
        const derivedWallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, derivationPath);
        
        // Create an object with address information
        const addressInfo = { address: derivedWallet.address };
        addresses[i] = addressInfo;
        
        // Write the address to the file
        if (i < numOfAddresses - 1) {
            writeStream.write(`${JSON.stringify(addressInfo)},\n`);
        } else {
            writeStream.write(`${JSON.stringify(addressInfo)}\n`);
        }

        // Log progress every 1000 iterations to avoid excessive logging
        if (i % 1000 === 0) {
            console.log(`Processed ${i} addresses`);
        }
    }

    // End the JSON array and close the write stream
    writeStream.write(']');
    writeStream.end();

    writeStream.on('finish', () => {
        console.log('Addresses saved to EVM_addresses.json');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to file:', err);
    });
}

generateAddresses();
