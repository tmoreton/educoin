import EducoinContract from '../../../build/contracts/Educoin.json'
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

      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        educoin.deployed().then(function(educoinInstance) {

          educoinInstance.update(name, {from: coinbase})
            .then(function(result) {

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
      
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error);
        }

        educoin.deployed().then(function(educoinInstance) {
          
          var courses = []
          educoinInstance.getPurchaseCount({from: coinbase}).then(function(result) {

            for (var i = 0; i<result.toNumber(); i++) {

              educoinInstance.getPurchaseId(i, {from: coinbase}).then(function(hash) {
                  
                  educoinInstance.getCourse(hash, {from: coinbase}).then(function(purchase) {

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
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        educoin.deployed().then(function(educoinInstance) {
          
          var courses = []
          educoinInstance.getCount({from: coinbase}).then(function(result) {

            for (var i = 0; i<result.toNumber(); i++) {
              educoinInstance.getCourse(i, {from: coinbase}).then(function(hash) {
                
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