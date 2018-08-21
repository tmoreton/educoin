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

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {

      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          educoinInstance.update(name, {from: coinbase}).then(function(result) {

            dispatch(userUpdated({"name": name}))
            return alert('Name updated!')

          })
        })
      })

    }
  }
}


export function getMyPurchases(array) {

  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          
          var courses = []
          for (var i = 0; i<array.length; i++) {
            educoinInstance.getCourse(array[i], {from: coinbase}).then(function(purchase) {

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
          }

        })
      })
    }
  }
}

export function getMyCourses(array) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          
          var courses = []
          for (var i = 0; i<array.length; i++) {
            educoinInstance.getCourse(array[i], {from: coinbase}).then(function(purchase) {

              var course = {
                title: purchase[0],
                description: purchase[1],
                image: purchase[2],
                userAddress: purchase[3],
                index: purchase[4]
              }
              courses.push(course);
              dispatch(myCourses(courses)); 

            })
          }

        })
      })
    }
  }
}