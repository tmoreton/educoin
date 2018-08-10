import React, { Component } from 'react'
import SignUpForm from '../components/signupform/SignUpForm'

class SignUp extends Component {
  render() {
    return(
      <div>
        <h1 className="text-center">Sign Up</h1>
        <div className="flex center">
          <p>We have got your wallet information, simply input your name and your account is made!</p>
          <SignUpForm />
        </div>
      </div>
    )
  }
}

export default SignUp
