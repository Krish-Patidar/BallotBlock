const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { infuraProjectId, mnemonic } = require('./secrets.json'); // Store your mnemonic and Infura ID in secrets.json

module.exports = {
    networks: {
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
            network_id: 4,       // Rinkeby's id
            gas: 5500000,        // Rinkeby has a lower block limit than mainnet
        },
    },
    compilers: {
        solc: {
            version: "0.8.0",    // Specify the Solidity version
        }
    }
};