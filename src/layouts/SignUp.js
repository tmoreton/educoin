import React, { Component } from 'react'
import SignUpForm from '../components/signupform/SignUpForm'

class SignUp extends Component {
  render() {
    return(
      <div>
        <h3 className="text-center">Sign Up</h3>
        <br/>
        <div className="flex center">
          <div>
            <SignUpForm />
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
