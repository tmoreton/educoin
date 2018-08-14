import AuthenticationContract from '../../../build/contracts/Authentication.json'
import TokenContract from '../../../build/contracts/Token.json'
import { browserHistory } from 'react-router'
import store from '../../store'

const contract = require('truffle-contract')

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
      const token = contract(TokenContract)
      token.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(authInstance) {
          // Attempt to login user.
          authInstance.login({from: coinbase}).then(function(userObject) {
            // If no error, login user.
            token.deployed().then(function(tokenInstance) {
              // Attempt to login user.
              tokenInstance.getBalance({from: coinbase}).then(function(balanceObject) {
                console.log(balanceObject)
                var user = {
                  name: web3.toUtf8(userObject[0]),
                  about: userObject[1],
                  image: userObject[2],
                  userAddress: userObject[3],
                  balance: balanceObject.toNumber()
                }
                dispatch(userLoggedIn(user))

              })
            })

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