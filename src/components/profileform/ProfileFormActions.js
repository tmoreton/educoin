import AuthenticationContract from '../../../build/contracts/Authentication.json'
import IpfsStorageContract from '../../../build/contracts/IpfsStorage.json'
import TokenContract from '../../../build/contracts/Token.json'
import store from '../../store'

const contract = require('truffle-contract')

function userUpdated(user) {
  return {
    type: 'USER_UPDATED',
    payload: user
  }
}

function myPurchases(courses) {
  return {
    type: 'MY_PURCHASES',
    payload: courses
  }
}

function myCourses(courses) {
  return {
    type: 'MY_COURSES',
    payload: courses
  }
}


export function updateUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          authenticationInstance.update(name, {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            dispatch(userUpdated({"name": name}))

            return alert('Name updated!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}


export function getPurchases() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const token = contract(TokenContract)
      token.setProvider(web3.currentProvider)
      const ipfsStorage = contract(IpfsStorageContract)
      ipfsStorage.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error);
        }

        token.deployed().then(function(tokenInstance) {
          
          var courses = []
          tokenInstance.getPurchaseCount({from: coinbase}).then(function(result) {

            for (var i = 0; i<result.toNumber(); i++) {

              tokenInstance.getPurchaseId(i, {from: coinbase}).then(function(hash) {
                ipfsStorage.deployed().then(function(ipfsInstance) {
                  
                  ipfsInstance.getCourse(hash, {from: coinbase}).then(function(purchase) {
                    console.log(purchase)
                    var course = {
                      title: purchase[0],
                      description: purchase[1],
                      image: purchase[2],
                      userAddress: purchase[3],
                      index: purchase[4]
                    }
                    courses.push(course);

                    dispatch(myPurchases(courses)); 

                  })
                })

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

export function getMyCourses(userId) {
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
          
          var courses = []
          instance.getCount({from: coinbase}).then(function(result) {
            for (var i = 0; i<result.toNumber(); i++) {
              instance.getCourse(i, {from: coinbase}).then(function(hash) {
                
                if (userId === hash[3]) {

                  var course = {
                    title: hash[0],
                    description: hash[1],
                    image: hash[2],
                    userAddress: hash[3],
                    index: hash[4]
                  }
                  courses.push(course);
                  dispatch(myCourses(courses)); 

                }

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