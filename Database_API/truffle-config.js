const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { infuraProjectId, mnemonic } = require('./secrets.json'); 

module.exports = {
    networks: {
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
            network_id: 4,       
            gas: 5500000,        
        },
    },
    compilers: {
        solc: {
            version: "0.8.0",    
        }
    }
};