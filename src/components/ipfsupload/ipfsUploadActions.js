import IpfsStorageContract from '../../../build/contracts/IpfsStorage.json'
import store from '../../store'
import ipfs from '../../util/ipfs';
const contract = require('truffle-contract')

export function ipfsStore(buffer) {
  let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const ipfsStorage = contract(IpfsStorageContract)
      ipfsStorage.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var ipfsInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ipfsStorage.deployed().then(function(instance) {
          ipfsInstance = instance
          ipfs.add(buffer, (err, ipfsHash) => {
            
            console.log(ipfsHash[0].hash);

            ipfsInstance.appendString(ipfsHash[0].hash, {from: coinbase})
              .then(function(result) {
                // If no error, login user.
                console.log(result)

              })
              .catch(function(result) {
                // If error...
              })

          }) 

        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
