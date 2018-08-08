import IpfsStorageContract from '../../../build/contracts/IpfsStorage.json'
import store from '../../store'
import ipfs from '../../util/ipfs';
const contract = require('truffle-contract')



function showCourses(courses) {
  return {
    type: 'SET_COURSES',
    payload: courses
  }
}

export function addCourse(name, image, video,) {
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
            
          ipfsInstance.addCourse(name, image, video, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            console.log(result)
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}


export function getCourses() {
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
          

          ipfsInstance.getCount({from: coinbase}).then(function(result) {

            for (var i = 0; i<result.toNumber(); i++) {
              ipfsInstance.getCourse(i, {from: coinbase}).then(function(hash) {
                // If no error, login user.
                dispatch(showCourses(hash))
              })
            }
            
          })

        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
