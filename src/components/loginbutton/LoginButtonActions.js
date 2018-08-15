import AuthenticationContract from '../../../build/contracts/Authentication.json'
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

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

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
            // If no error, login user.

                var user = {
                  name: web3.toUtf8(userObject[0]),
                  about: userObject[1],
                  image: userObject[2],
                  userAddress: userObject[3],
                  courses: userObject[4],
                }
                dispatch(userLoggedIn(user))



            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query){
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            return browserHistory.push('/upload')

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

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

          tokenInstance.transfer(seller, amount, courseId, {from: coinbase}).then(function(result) {
            console.log(result)
            // if(result){
            //   authInstance.addCourse(courseId)
            // } else {
            //   console.error('Transaction failed');
            // }
          })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
