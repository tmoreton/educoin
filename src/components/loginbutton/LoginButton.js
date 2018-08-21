import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from './LoginButtonActions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)

class LoginButton extends Component {

  onLoginUserClick = (event) => {
    event.preventDefault();
    this.props.dispatch(loginUser())
  }

  render(){
  	return (
  		<a href="#" onClick={(event) => this.onLoginUserClick(event)}>
        <FontAwesomeIcon icon="user" />
      </a>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect( mapStateToProps )(LoginButton)