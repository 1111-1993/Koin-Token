// web3 library
const fs = require('fs');
const { Web3 } = require('web3');

async function sendRandomTokens() {
    // Replace the following with your provider URL, such as Infura, Alchemy.
    const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/G2UYE7QBZx0KMBYCuFYxlinanDSQsEFt');
    
    // Replace this with your sender wallet's private key.
    const senderPrivateKey = '0x8bdf72fefb57232b6a3624a395fe45a9f246baf877be4a2a0446850176d8fa5e';
    
    // Get the sender address from the private key.
    const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPrivateKey);
    web3.eth.accounts.wallet.add(senderAccount);
    web3.eth.defaultAccount = senderAccount.address;
    
    // Read the addresses from the file.
    const addresses = JSON.parse(fs.readFileSync('EVM_addresses.json'));
    
    // Define the token contract address and ABI.
    const tokenContractAddress = '0xcc523a292233c3054eaf32461cb797393a55ac7a';
    const tokenContractAbi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function"
        }
    ];
    
    // Create a contract instance for the token contract.
    const tokenContract = new web3.eth.Contract(tokenContractAbi, tokenContractAddress);
    
    // Iterate over the addresses and send a random amount of tokens to each one.
    for (let i = 0; i < addresses.length; i++) {
        const recipientAddress = addresses[i].address;
        const randomAmount = 1;
        
        const randomUnits = web3.utils.toWei(randomAmount.toString(), 'ether');
        
        try {
            // Send the random amount of tokens to the recipient address.
            const tx = await tokenContract.methods.transfer(recipientAddress, randomUnits).send({
                from: senderAccount.address,
                gas: 200000
            });
            
            console.log(`Sent ${randomAmount} tokens to ${recipientAddress} (Transaction Hash: ${tx.transactionHash})`);
        } catch (err) {
            console.error(`Error sending tokens to ${recipientAddress}:`, err);
        }
    }
}

sendRandomTokens();
