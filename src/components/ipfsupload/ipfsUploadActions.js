import IpfsStorageContract from '../../../build/contracts/IpfsStorage.json'
import Token from '../../../build/contracts/Token.json'
import store from '../../store'
import ipfs from '../../util/ipfs';
const contract = require('truffle-contract')
var ipfsInstance

function showCourses(courses) {
  return {
    type: 'SET_COURSES',
    payload: courses
  }
}

function myCourses(courses) {
  return {
    type: 'MY_COURSES',
    payload: courses
  }
}

export function addCourse(title, description, image, video,) {
  let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const ipfsStorage = contract(IpfsStorageContract)
      ipfsStorage.setProvider(web3.currentProvider)


      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ipfsStorage.deployed().then(function(instance) {
          ipfsInstance = instance
            
          ipfsInstance.addCourse(title, description, image, video, {from: coinbase})
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


export function getCourses(userId) {
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
                
                if(userId === null || userId === undefined){
                  console.log('inside if')
                  var course = {
                    title: hash[0],
                    description: hash[1],
                    image: hash[2],
                    video: hash[3],
                    userAddress: hash[4],
                    index: hash[5]
                  }
                  courses.push(course);
                  
                  dispatch(showCourses(courses));   
                } else if (userId === hash[4]) {
                  console.log('inside match')
                  var course = {
                    title: hash[0],
                    description: hash[1],
                    image: hash[2],
                    video: hash[3],
                    userAddress: hash[4],
                    index: hash[5]
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