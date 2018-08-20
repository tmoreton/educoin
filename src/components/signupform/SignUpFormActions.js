import EducoinContract from '../../../build/contracts/Educoin.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../store'

const contract = require('truffle-contract')

export function signUpUser(name, about, image) {
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

          educoinInstance.signup(name, about, image, {from: coinbase}).then(function(result) {

            return dispatch(loginUser())
            
          }).catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
