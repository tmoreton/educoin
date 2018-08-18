import AuthenticationContract from '../../../build/contracts/Authentication.json'
import TokenContract from '../../../build/contracts/Token.json'
import IpfsContract from '../../../build/contracts/IpfsStorage.json'
import { browserHistory } from 'react-router'
import store from '../../store'
const contract = require('truffle-contract')

var authInstance;
var tokenInstance;

function userLoggedIn(user) {
  return {
    type: 'USER_LOGGED_IN',
    payload: user
  }
}

function userBalance(balance) {
  return {
    type: 'USER_BALANCE',
    payload: balance
  }
}

function watchCourseFunction(course) {
  return {
    type: 'WATCH_COURSE',
    payload: course
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Get Token Contract
      const token = contract(TokenContract)
      token.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          // Attempt to login user.
          authInstance = instance
          authInstance.login({from: coinbase}).then(function(userObject) {
            
            token.deployed().then(function(tokenInstance) {
              tokenInstance.getBalance({from: coinbase}).then(function(result) {
                console.log("logging in")
                var user = {
                  name: web3.toUtf8(userObject[0]),
                  about: userObject[1],
                  image: userObject[2],
                  userAddress: userObject[3],
                  courses: userObject[4],
                  balance: result.toNumber(),
                }
                dispatch(userLoggedIn(user))
                browserHistory.push('/profile')
              })
            })
            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query){
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')
            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function purchaseCourse(seller, amount, courseId) {

  let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {

      const token = contract(TokenContract)
      token.setProvider(web3.currentProvider)

      // Get Token Contract
      const ipfs = contract(IpfsContract)
      ipfs.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        token.deployed().then(function(tokenInstance) {

          tokenInstance.transfer(seller, amount, courseId, {from: coinbase}).then(function(result) {

            ipfs.deployed().then(function(ipfsInstance) {
              ipfsInstance.watchCourse( courseId, {from: coinbase}).then(function(course) {

                var course = {
                  title: course[0],
                  description: course[1],
                  image: course[2],
                  video: course[3],
                }
                dispatch(watchCourseFunction(course))

                return browserHistory.push('/course')
              })
            })

          })
        
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function watchCourse(courseId) {

  let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {

      // Get Token Contract
      const ipfs = contract(IpfsContract)
      ipfs.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        ipfs.deployed().then(function(ipfsInstance) {
          ipfsInstance.watchCourse( courseId, {from: coinbase}).then(function(hash) {

            var course = {
              title: hash[0],
              description: hash[1],
              image: hash[2],
              video: hash[3],
            }
            dispatch(watchCourseFunction(course))

            return browserHistory.push('/course')
          })
        })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
