import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpUser } from './SignUpFormActions'
import { loginUser } from '../loginbutton/LoginButtonActions'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    // this.props.dispatch(loginUser())
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2){
      return alert('Please fill in your name.')
    }

    this.props.dispatch(signUpUser(this.state.name))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(SignUpForm)