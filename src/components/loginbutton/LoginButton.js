import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from './LoginButtonActions'


class LoginButton extends Component {
  constructor(props) {
    super(props)
  }

  onLoginUserClick = (event) => {
    event.preventDefault();
    this.props.dispatch(loginUser())
  }

  render(){
  	return (
  		<a href="#" onClick={(event) => this.onLoginUserClick(event)}>Login</a>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(LoginButton)