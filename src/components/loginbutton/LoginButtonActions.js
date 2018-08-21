import EducoinContract from '../../../build/contracts/Educoin.json'
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

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {

      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          educoinInstance.login({from: coinbase}).then(function(userObject) {

            var user = {
              name: web3.toUtf8(userObject[0]),
              about: userObject[1],
              image: userObject[2],
              userAddress: userObject[3],
              myCourses: userObject[4],
              myPurchases: userObject[5],
              balance: userObject[6].toNumber(),
            }
            dispatch(userLoggedIn(user))
            browserHistory.push('/profile')

            // Used a manual redirect here as opposed to a wrapper.
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
  }
}

export function purchaseCourse(seller, amount, courseId) {

  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {

      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {

          educoinInstance.transfer(seller, amount, courseId, {from: coinbase}).then(function(result) {
            educoinInstance.watchCourse( courseId, {from: coinbase}).then(function(course) {

              var course = {
                title: course[0],
                description: course[1],
                image: course[2],
                video: course[3],
                lessons: JSON.parse(course[6]),
              }
              dispatch(watchCourseFunction(course))
              return browserHistory.push('/course')

            })
          })
        
        })
      })
    }
  }
}

export function watchCourse(courseId) {

  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {

      const educoin = contract(EducoinContract)
      educoin.setProvider(web3.currentProvider)

      web3.eth.getCoinbase((error, coinbase) => {
        educoin.deployed().then(function(educoinInstance) {
          educoinInstance.watchCourse( courseId, {from: coinbase}).then(function(course) {

            var course = {
              title: course[0],
              description: course[1],
              image: course[2],
              video: course[3],
              lessons: JSON.parse(course[6]),
            }
            dispatch(watchCourseFunction(course))
            return browserHistory.push('/course')

          })
        })

      })
    }
  }
}
