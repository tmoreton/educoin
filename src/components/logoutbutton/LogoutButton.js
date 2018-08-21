import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from './LogoutButtonActions'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <a href="#" onClick={(event) => onLogoutUserClick(event)}>
      <small>Logout</small>
    </a>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();
      dispatch(logoutUser())
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(LogoutButton)