import EducoinContract from '../../../build/contracts/Educoin.json'
import store from '../../store'
import { browserHistory } from 'react-router'
const contract = require('truffle-contract')

function showCourses(courses) {
  return {
    type: 'SET_COURSES',
    payload: courses
  }
}

export function addCourse(title, description, image, video, lessons) {

  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
            
          educoinInstance.addCourse(title, description, image, video, lessons, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            return browserHistory.push('/')
          })
        })
      })
    }
  }
}


export function getCourses(userId) {

  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          
          var courses = []
          educoinInstance.getCount({from: coinbase}).then(function(result) {
            for (var i = 0; i<result.toNumber(); i++) {
              educoinInstance.getCourse(i, {from: coinbase}).then(function(hash) {
                console.log(hash)
                var course = {
                  title: hash[0],
                  description: hash[1],
                  image: hash[2],
                  userAddress: hash[3],
                  index: hash[4],
                  video: hash[5]
                }
                courses.push(course);
                dispatch(showCourses(courses));   

              })
            }
            
          })

        })
      })
    }
  }
}